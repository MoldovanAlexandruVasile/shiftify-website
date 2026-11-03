// Raw app screens for the marketing slides, taken from Tivren's real web
// build (the one inside the Mac app). Demo data is entered through the UI.
//
//   node capture.mjs [lang] [appUrl]   (en or ro; default en, http://localhost:8091)
//
// The web build must be served with cross-origin isolation headers (SQLite
// runs as WebAssembly): `node serve.mjs ../../tivren/desktop/app 8091`.
// Writes raw/<screen>.png (2880×1800) and raw/crops.json: where each card
// sits in those images, so slides can lift real UI out of them. In Romanian
// (the app in Romanian too), raw/ro/.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const LANG = process.argv[2] ?? "en";
const APP = process.argv[3] ?? "http://localhost:8091";
const HERE = path.dirname(fileURLToPath(import.meta.url));
const RAW = path.join(HERE, "raw", LANG === "en" ? "" : LANG);

// What the script types and clicks, as the app shows it in each language.
const TEXT = {
  en: {
    locale: "en-RO",
    namePlaceholder: "e.g. Popescu Ion PFA",
    continue: "Continue",
    clientPlaceholder: "e.g. Acme SRL",
    payPlaceholder: "Not set",
    start: "Start using Tivren",
    markDays: /Mark \d+ days?/,
    dayOff: "Day off / Leave",
    vacation: "Vacation",
    sick: "Sick leave",
    saveDay: /^(Save day|Mark \d+ days?)$/,
    notePlaceholder: "Project, client or reason",
    saveNote: /^(Save|Update)/,
    note: "Release day, on call until late",
    lock: "Lock",
    skip: {
      september: ["Monday, 14 September", "Tuesday, 15 September"],
      october: ["Thursday, 8 October"],
      november: ["Monday, 9 November", "Tuesday, 10 November", "Wednesday, 18 November", "Thursday, 19 November"],
    },
    summary: "NOVEMBER SUMMARY",
    earned: "Earned so far",
    today: "TODAY",
    holidays: "Bank holidays · Romania",
    month: "November 2026",
    worked: "Total worked",
    daysOff: "Days off",
    preview: "Preview",
    previewDocument: "Preview document",
    documentPreview: "Document preview",
    fill: "Fill",
    fillMissing: "Fill missing days",
    logDay: "Log day",
    kindOfLeave: "Kind of leave",
  },
  ro: {
    locale: "ro-RO",
    namePlaceholder: "ex. Popescu Ion PFA",
    continue: "Continuă",
    clientPlaceholder: "ex. Acme SRL",
    payPlaceholder: "Nesetat",
    start: "Începe să folosești Tivren",
    markDays: /Marchează \d+ (de )?zi(le)?/,
    dayOff: "Zi liberă / Concediu",
    vacation: "Concediu de odihnă",
    sick: "Concediu medical",
    saveDay: /^(Salvează ziua|Marchează \d+ (de )?zi(le)?)$/,
    notePlaceholder: "Proiect, client sau motiv",
    saveNote: /^(Salvează)/,
    note: "Zi de lansare, de gardă până seara târziu",
    lock: "Blochează",
    skip: {
      september: ["luni, 14 septembrie", "marți, 15 septembrie"],
      october: ["joi, 8 octombrie"],
      november: ["luni, 9 noiembrie", "marți, 10 noiembrie", "miercuri, 18 noiembrie", "joi, 19 noiembrie"],
    },
    summary: "Rezumat noiembrie",
    earned: "Câștigat până acum",
    today: "Azi",
    // The country as the holiday service names it.
    holidays: "Sărbători legale · România",
    month: "noiembrie 2026",
    worked: "Total lucrat",
    daysOff: "Zile libere",
    preview: "Previzualizare",
    previewDocument: "Previzualizează documentul",
    documentPreview: "Previzualizare document",
    fill: "Completează",
    fillMissing: "Completează zilele lipsă",
    logDay: "Înregistrează ziua",
    kindOfLeave: "Tipul concediului",
  },
}[LANG];
const VIEWPORT = { width: 1440, height: 900 };
const SCALE = 2;
const TODAY = new Date("2026-11-20T10:00:00");

fs.mkdirSync(RAW, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: VIEWPORT,
  deviceScaleFactor: SCALE,
  locale: TEXT.locale,
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
await page.getByPlaceholder(TEXT.namePlaceholder).fill("Ion Popescu PFA");
await page.getByText(TEXT.continue, { exact: true }).click();
await pause(600);
await page.getByPlaceholder(TEXT.clientPlaceholder).fill("Acme SRL");
await page.locator('input[type="date"]').first().fill("2026-09-01");
await page.getByPlaceholder(TEXT.payPlaceholder).fill("45");
await page.getByText(TEXT.start).click();
await pause(2500);

const fillMonth = async (month, skip = []) => {
  await go(`/missing-days?month=${month}`);
  for (const label of skip) await page.getByText(label, { exact: true }).click();
  await page.getByText(TEXT.markDays).click();
  await pause(1200);
};
const takeLeave = async (date, kind, last) => {
  await go(`/day/${date}`);
  await page.getByText(TEXT.dayOff).click();
  await page.getByText(kind, { exact: true }).click();
  if (last) await page.locator('input[type="date"]').nth(1).fill(last);
  await page.getByText(TEXT.saveDay).click();
  await pause(1200);
};
const addNote = async (date, note) => {
  await go(`/day/${date}`);
  await page.getByPlaceholder(TEXT.notePlaceholder).fill(note);
  await page.getByText(TEXT.saveNote).last().click();
  await pause(1200);
};

await fillMonth("2026-09", TEXT.skip.september);
await takeLeave("2026-09-14", TEXT.vacation, "2026-09-15");
await fillMonth("2026-10", TEXT.skip.october);
await takeLeave("2026-10-08", TEXT.sick);
await fillMonth("2026-11", TEXT.skip.november);
await takeLeave("2026-11-09", TEXT.vacation, "2026-11-10");
await addNote("2026-11-12", TEXT.note);
// 18–19 Nov stay empty, so "Missing days" has something to fill.

// October was sent: lock it (Export opens on last month).
await go("/export");
await page.getByText(TEXT.lock, { exact: true }).click();
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
  summary: () => cardOf(TEXT.summary),
  earned: () => cardOf(TEXT.earned, { minWidth: 400 }),
  today: () => cardOf(TEXT.today),
  holidays: () => cardOf(TEXT.holidays),
  month: () => cardOf(TEXT.month),
};
await shot("calendar", calendarCards);
await page.emulateMedia({ colorScheme: "dark" });
await shot("calendar-dark", calendarCards);
await page.emulateMedia({ colorScheme: "light" });

await go("/history");
await shot("history", {
  worked: () => cardOf(TEXT.worked, { minWidth: 100 }),
  daysOff: () => cardOf(TEXT.daysOff, { minWidth: 100 }),
});

await go("/export");
await page.getByText("PDF", { exact: true }).click();
await shot("export", { preview: () => cardOf(TEXT.preview) });
await page.getByText(TEXT.previewDocument).click();
await pause(1500);
await shot("export-preview", { document: () => cardOf(TEXT.documentPreview) });

await go("/calendar");
await page.getByText(TEXT.fill, { exact: true }).click();
await shot("missing-days", { modal: () => cardOf(TEXT.fillMissing) });

await go("/day/2026-11-20");
await page.getByText(TEXT.dayOff).click();
await page.locator('input[type="date"]').nth(1).fill("2026-11-27");
await shot("day-off", { modal: () => cardOf(TEXT.logDay), kind: () => cardOf(TEXT.kindOfLeave) });

fs.writeFileSync(path.join(RAW, "crops.json"), JSON.stringify(crops, null, 2));
await browser.close();
console.log("done →", RAW);
