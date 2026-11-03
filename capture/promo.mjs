// Renders the promo (promo.html) frame by frame and encodes it to
// ../public/media/promo.mp4 (1920×1080, 30 fps), plus a poster image. In
// Romanian, ../public/media/ro/.
//   node promo.mjs [lang]             full render (en or ro; default en)
//   node promo.mjs [lang] 3 7.5 16    stills at those seconds, for checking
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const LANG = process.argv[2] ?? "en";
const OUT = path.resolve(HERE, "../public/media", LANG === "en" ? "" : LANG);
const FRAMES = path.join(HERE, ".frames");
const FPS = 30;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto(`${pathToFileURL(path.join(HERE, "promo.html")).href}?lang=${LANG}`);
await page.evaluate(() => document.fonts.ready);
await page.waitForLoadState("networkidle");

const stills = process.argv.slice(3).map(Number);
if (stills.length) {
  fs.mkdirSync(path.join(HERE, "stills"), { recursive: true });
  for (const t of stills) {
    await page.evaluate((t) => window.render(t), t);
    await page.screenshot({ path: path.join(HERE, "stills", `t${t}.jpg`), type: "jpeg", quality: 85 });
  }
  await browser.close();
  console.log("stills →", path.join(HERE, "stills"));
  process.exit(0);
}

fs.rmSync(FRAMES, { recursive: true, force: true });
fs.mkdirSync(FRAMES);
fs.mkdirSync(OUT, { recursive: true });
const duration = await page.evaluate(() => window.DURATION);
const count = Math.round(duration * FPS);
for (let n = 0; n < count; n++) {
  await page.evaluate((t) => window.render(t), n / FPS);
  await page.screenshot({ path: path.join(FRAMES, `${String(n).padStart(5, "0")}.jpg`), type: "jpeg", quality: 92 });
  if (n % 150 === 0) console.log(`frame ${n}/${count}`);
}
// Poster: the end card.
await page.evaluate((t) => window.render(t), duration - 0.1);
await page.screenshot({ path: path.join(OUT, "promo-poster.jpg"), type: "jpeg", quality: 88 });
await browser.close();

const encoder = path.join(FRAMES, "encode");
execFileSync("swiftc", ["-O", path.join(HERE, "encode.swift"), "-o", encoder], { stdio: "inherit" });
execFileSync(encoder, [FRAMES, String(count), String(FPS), path.join(OUT, "promo.mp4"), "1920", "1080"], { stdio: "inherit" });
fs.rmSync(FRAMES, { recursive: true, force: true });
