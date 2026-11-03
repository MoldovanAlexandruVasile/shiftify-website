// Raw app screens for the marketing slides, taken from Tivren's real web
// build (the one inside the Mac app). Demo data is entered through the UI.
//
//   node capture.mjs [appUrl]      (default http://localhost:8091)
//
// The web build must be served with cross-origin isolation headers (SQLite
// runs as WebAssembly): `node serve.mjs ../../tivren/desktop/app 8091`.
// Writes raw/<screen>.png (2880×1800) and raw/crops.json: where each card
// sits in those images, so slides can lift real UI out of them.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const APP = process.argv[2] ?? "http://localhost:8091";
const HERE = path.dirname(fileURLToPath(import.meta.url));
const RAW = path.join(HERE, "raw");
const VIEWPORT = { width: 1440, height: 900 };
const SCALE = 2;
const TODAY = new Date("2026-11-20T10:00:00");

fs.mkdirSync(RAW, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: VIEWPORT,
  deviceScaleFactor: SCALE,
  locale: "en-RO",
  timezoneId: "Europe/Bucharest",
});
const page = await context.newPage();
await page.clock.setFixedTime(TODAY);

const pause = (ms) => page.waitForTimeout(ms);
const go = async (route) => {
  await page.goto(APP + route);
  await pause(1500);
};

// ---------- Demo data ----------
await go("/");
await page.getByPlaceholder("e.g. Popescu Ion PFA").fill("Ion Popescu PFA");
await page.getByText("Continue", { exact: true }).click();
await pause(600);
await page.getByPlaceholder("e.g. Acme SRL").fill("Acme SRL");
await page.locator('input[type="date"]').first().fill("2026-09-01");
await page.getByPlaceholder("Not set").fill("45");
await page.getByText("Start using Tivren").click();
await pause(2500);

const fillMonth = async (month, skip = []) => {
  await go(`/missing-days?month=${month}`);
  for (const label of skip) await page.getByText(label, { exact: true }).click();
  await page.getByText(/Mark \d+ days?/).click();
  await pause(1200);
};
const takeLeave = async (date, kind, last) => {
  await go(`/day/${date}`);
  await page.getByText("Day off / Leave").click();
  await page.getByText(kind, { exact: true }).click();
  if (last) await page.locator('input[type="date"]').nth(1).fill(last);
  await page.getByText(/^(Save day|Mark \d+ days?)$/).click();
  await pause(1200);
};
const addNote = async (date, note) => {
  await go(`/day/${date}`);
  await page.getByPlaceholder("Project, client or reason").fill(note);
  await page.getByText(/^(Save|Update)/).last().click();
  await pause(1200);
};

await fillMonth("2026-09", ["Monday, 14 September", "Tuesday, 15 September"]);
await takeLeave("2026-09-14", "Vacation", "2026-09-15");
await fillMonth("2026-10", ["Thursday, 8 October"]);
await takeLeave("2026-10-08", "Sick leave");
await fillMonth("2026-11", ["Monday, 9 November", "Tuesday, 10 November", "Wednesday, 18 November", "Thursday, 19 November"]);
await takeLeave("2026-11-09", "Vacation", "2026-11-10");
await addNote("2026-11-12", "Release day, on call until late");
// 18–19 Nov stay empty, so "Missing days" has something to fill.

// October was sent: lock it (Export opens on last month).
await go("/export");
await page.getByText("Lock", { exact: true }).click();
await pause(1200);

// ---------- Screens ----------
// The card around a text: the nearest rounded, filled ancestor.
const cardOf = (text, { index = 0, minWidth = 200 } = {}) =>
  page.getByText(new RegExp(`^${text}$`, "i")).nth(index).evaluate((el, minWidth) => {
    for (let n = el; n && n !== document.body; n = n.parentElement) {
      const s = getComputedStyle(n);
      const r = n.getBoundingClientRect();
      const filled = s.backgroundColor !== "rgba(0, 0, 0, 0)" || s.borderTopWidth !== "0px";
      if (parseFloat(s.borderTopLeftRadius) >= 10 && filled && r.width >= minWidth) {
        return { x: r.x, y: r.y, w: r.width, h: r.height, radius: parseFloat(s.borderTopLeftRadius) };
      }
    }
    return null;
  }, minWidth);

const crops = {};
const shot = async (name, cards = {}) => {
  await pause(900);
  await page.screenshot({ path: path.join(RAW, `${name}.png`) });
  for (const [key, find] of Object.entries(cards)) {
    const box = await find().catch(() => null);
    if (!box) {
      console.warn(`  card not found: ${name}.${key}`);
      continue;
    }
    crops[`${name}.${key}`] = { screen: name, ...Object.fromEntries(Object.entries(box).map(([k, v]) => [k, Math.round(v * SCALE)])) };
  }
  console.log("screen", name);
};

await go("/calendar");
const calendarCards = {
  summary: () => cardOf("NOVEMBER SUMMARY"),
  earned: () => cardOf("Earned so far", { minWidth: 400 }),
  today: () => cardOf("TODAY"),
  holidays: () => cardOf("Bank holidays · Romania"),
  month: () => cardOf("November 2026"),
};
await shot("calendar", calendarCards);
await page.emulateMedia({ colorScheme: "dark" });
await shot("calendar-dark", calendarCards);
await page.emulateMedia({ colorScheme: "light" });

await go("/history");
await shot("history", { worked: () => cardOf("Total worked", { minWidth: 100 }), daysOff: () => cardOf("Days off", { minWidth: 100 }) });

await go("/export");
await page.getByText("PDF", { exact: true }).click();
await shot("export", { preview: () => cardOf("Preview") });
await page.getByText("Preview document").click();
await pause(1500);
await shot("export-preview", { document: () => cardOf("Document preview") });

await go("/calendar");
await page.getByText("Fill", { exact: true }).click();
await shot("missing-days", { modal: () => cardOf("Fill missing days") });

await go("/day/2026-11-20");
await page.getByText("Day off / Leave").click();
await page.locator('input[type="date"]').nth(1).fill("2026-11-27");
await shot("day-off", { modal: () => cardOf("Log day"), kind: () => cardOf("Kind of leave") });

fs.writeFileSync(path.join(RAW, "crops.json"), JSON.stringify(crops, null, 2));
await browser.close();
console.log("done →", RAW);
