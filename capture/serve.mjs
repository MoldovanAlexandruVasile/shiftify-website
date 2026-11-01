// Serves a static dir with the cross-origin isolation headers SQLite WASM needs; SPA fallback.
import http from "node:http"; import fs from "node:fs"; import path from "node:path";
const root = path.resolve(process.argv[2]); const port = +process.argv[3] || 8090;
const types = { ".html":"text/html", ".js":"text/javascript", ".css":"text/css", ".wasm":"application/wasm", ".json":"application/json", ".png":"image/png", ".ico":"image/x-icon", ".ttf":"font/ttf", ".svg":"image/svg+xml" };
http.createServer((req, res) => {
  let p = path.join(root, decodeURIComponent(req.url.split("?")[0]));
  if (!p.startsWith(root)) { res.writeHead(403).end(); return; }
  if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) { const html = p + ".html"; p = fs.existsSync(html) ? html : path.join(root, "index.html"); }
  res.writeHead(200, { "Content-Type": types[path.extname(p)] || "application/octet-stream", "Cross-Origin-Opener-Policy": "same-origin", "Cross-Origin-Embedder-Policy": "credentialless" });
  fs.createReadStream(p).pipe(res);
}).listen(port, () => console.log("serving", root, "on", port));
