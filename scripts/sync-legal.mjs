// Copies the app's legal texts (Privacy policy, Terms of use) from the
// shiftify repo, so the website shows exactly what the app shows.
//   npm run sync:legal            (expects ../shiftify next to this repo)
//   npm run sync:legal -- <path>  (or the path to the shiftify repo)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const app = path.resolve(process.argv[2] ?? path.join(root, "../shiftify"));
const from = path.join(app, "src/features/legal");
const to = path.join(root, "src/legal");

const FILES = ["content/en.ts", "types/legal.types.ts", "constants/legal.constants.ts"];

for (const file of FILES) {
  const source = path.join(from, file);
  if (!fs.existsSync(source)) throw new Error(`Not found: ${source}`);
  fs.mkdirSync(path.dirname(path.join(to, file)), { recursive: true });
  fs.copyFileSync(source, path.join(to, file));
  console.log("synced", file);
}
