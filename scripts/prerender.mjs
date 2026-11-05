// After `vite build`: renders each page to HTML (src/entry-server.tsx) and
// writes it into dist/*.html, so search engines and link previews see the
// real content without running JavaScript. Also writes sitemap.xml and
// robots.txt from VITE_SITE_URL (.env).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { build, loadEnv } from "vite";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrOut = path.join(root, "dist-ssr");
const { VITE_SITE_URL: site } = loadEnv("production", root, "VITE_");
if (!site) throw new Error("VITE_SITE_URL is not set (see .env)");

const PAGES = [
  { page: "home", file: "index.html", url: `${site}/`, priority: "1.0" },
  { page: "privacy", file: "privacy.html", url: `${site}/privacy.html`, priority: "0.3" },
  { page: "terms", file: "terms.html", url: `${site}/terms.html`, priority: "0.3" },
];

// 1. A Node build of the pages.
await build({
  root,
  logLevel: "warn",
  // Bundled in, not loaded by Node: its dist imports files without ".js",
  // which bundlers accept and Node's ESM loader doesn't.
  ssr: { noExternal: ["@moldovanalexandruvasile/unity-marketing"] },
  build: {
    ssr: "src/entry-server.tsx",
    outDir: ssrOut,
    emptyOutDir: true,
    rollupOptions: { input: "src/entry-server.tsx" },
  },
});
const { render } = await import(pathToFileURL(path.join(ssrOut, "entry-server.js")).href);

// 2. Their HTML into the built pages.
const EMPTY_ROOT = '<div id="root"></div>';
for (const { page, file } of PAGES) {
  const target = path.join(dist, file);
  const html = fs.readFileSync(target, "utf8");
  if (!html.includes(EMPTY_ROOT)) throw new Error(`${file}: no empty #root to fill`);
  fs.writeFileSync(target, html.replace(EMPTY_ROOT, `<div id="root">${render(page)}</div>`));
  console.log(`prerendered ${file}`);
}
fs.rmSync(ssrOut, { recursive: true, force: true });

// 3. sitemap.xml and robots.txt.
const today = new Date().toISOString().slice(0, 10);
const urls = PAGES.map(
  ({ url, priority }) => `  <url><loc>${url}</loc><lastmod>${today}</lastmod><priority>${priority}</priority></url>`,
).join("\n");
fs.writeFileSync(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);
// Only read by crawlers at a domain's root (a custom domain); harmless under /tivren-website/.
fs.writeFileSync(path.join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`);
console.log("wrote sitemap.xml and robots.txt");
