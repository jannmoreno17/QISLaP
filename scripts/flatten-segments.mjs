// Next 16's static export writes route-segment prefetch payloads as nested folders
// (e.g. out/about/__next.about/__PAGE__.txt) while the client router requests the
// dot-joined file name (out/about/__next.about.__PAGE__.txt). Static hosts like
// GitHub Pages can't rewrite URLs, so we add flat copies to avoid 404s on prefetch.
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve("out");
let n = 0;

function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!e.isDirectory()) continue;
    const full = path.join(dir, e.name);
    if (e.name.startsWith("__next.")) flatten(full, dir);
    else walk(full);
  }
}

function flatten(segDir, parent) {
  const files = (d) =>
    fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? files(path.join(d, e.name)) : [path.join(d, e.name)]));
  for (const f of files(segDir)) {
    const flat = path.relative(parent, f).split(path.sep).join(".");
    fs.copyFileSync(f, path.join(parent, flat));
    n++;
  }
}

if (fs.existsSync(OUT)) {
  walk(OUT);
  console.log(`flatten-segments: wrote ${n} prefetch payload copies`);
}
