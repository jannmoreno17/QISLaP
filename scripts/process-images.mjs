// One-time (re-runnable) image pipeline.
// Reads the raw assets in ../QISLaP_Raw_Images and writes web-ready WebP files to public/images.
//   npm run images
// Re-run after adding new photos to the raw folder, then reference them from src/data/*.
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const RAW = path.resolve(process.argv[2] ?? "../QISLaP_Raw_Images");
const OUT = path.resolve("public/images");

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)],
  );
const isImage = (f) => /\.(png|jpe?g|webp)$/i.test(f);
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const ensure = (f) => fs.mkdirSync(path.dirname(f), { recursive: true });

async function member(src, out) {
  // Flatten transparency onto white, trim surrounding white space, square-crop biased to the face.
  const flat = await sharp(src).flatten({ background: "#ffffff" }).toBuffer();
  const trimmed = await sharp(flat)
    .trim({ background: "#ffffff", threshold: 12 })
    .toBuffer()
    .catch(() => flat);
  ensure(out);
  await sharp(trimmed)
    .resize(480, 480, { fit: "cover", position: "top", withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(out);
}

async function photo(src, outBase) {
  ensure(outBase);
  await sharp(src).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 78 }).toFile(`${outBase}.webp`);
  await sharp(src).resize({ width: 640, withoutEnlargement: true }).webp({ quality: 72 }).toFile(`${outBase}-sm.webp`);
}

async function logo(src, out) {
  ensure(out);
  await sharp(src)
    .trim({ threshold: 8 })
    .resize({ width: 480, height: 240, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 90, alphaQuality: 100 })
    .toFile(out)
    .catch(() =>
      sharp(src).resize({ width: 480, height: 240, fit: "inside", withoutEnlargement: true }).webp({ quality: 90 }).toFile(out),
    );
}

const files = walk(RAW).filter(isImage);
let n = 0;
for (const f of files) {
  const rel = path.relative(RAW, f).split(path.sep);
  const name = path.parse(f).name;
  if (/Members$/.test(rel[0])) {
    // Qriente_01_Apolinario-Gerard-Francesco_Project-Leader -> qriente-apolinario-gerard-francesco
    const [proj, , who] = name.split("_");
    await member(f, path.join(OUT, "team", `${slug(proj)}-${slug(who)}.webp`));
  } else if (/^Partners/.test(rel[0])) {
    // Qriente_Partner_01_DOE_logo -> doe
    const who = name.split("_").slice(3, -1).join("-");
    await logo(f, path.join(OUT, "partners", `${slug(who)}.webp`));
  } else if (/^Events/.test(rel[0])) {
    // Events_page06/<event-folder>/<event-folder>_photo1 -> events/<event-folder>/photo1
    const event = slug(rel[1]);
    const idx = name.match(/photo(\d+)$/)?.[1] ?? "1";
    await photo(f, path.join(OUT, "events", event, `photo${idx}`));
  } else continue;
  n++;
}

// Hero + Open Graph image
const heroSrc = path.join(
  RAW,
  "Events_page07/2026-08-27_QISLaP-Student-Workshop-Day2-TIP-Manila/2026-08-27_QISLaP-Student-Workshop-Day2-TIP-Manila_photo4.png",
);
await sharp(heroSrc).resize({ width: 1920, withoutEnlargement: true }).webp({ quality: 75 }).toFile(path.join(OUT, "hero.webp"));

const ogSrc = path.join(
  RAW,
  "Events_page06/2025-03-21_DOST-QISLaP-Grand-MOU-Signing-and-Inauguration/2025-03-21_DOST-QISLaP-Grand-MOU-Signing-and-Inauguration_photo5.png",
);
const ogOverlay = Buffer.from(`
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#2D2D2D" stop-opacity="0.25"/>
    <stop offset="0.55" stop-color="#2D2D2D" stop-opacity="0.8"/>
    <stop offset="1" stop-color="#2D2D2D" stop-opacity="0.95"/></linearGradient></defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="64" y="392" width="72" height="8" fill="#F9C433"/>
  <text x="64" y="470" font-family="Arial, Helvetica, sans-serif" font-size="76" font-weight="800" fill="#FAF8F4">QISLaP</text>
  <text x="64" y="520" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="#FAF8F4">Quantum and Intelligent Systems Laboratory for Power Engineering</text>
  <text x="64" y="562" font-family="Arial, Helvetica, sans-serif" font-size="22" fill="#F9C433">T.I.P. · TechnoCoRe · DOST-PCIEERD</text>
</svg>`);
await sharp(ogSrc)
  .resize(1200, 630, { fit: "cover", position: "top" })
  .composite([{ input: ogOverlay }])
  .jpeg({ quality: 82 })
  .toFile(path.resolve("public/og.jpg"));

console.log(`Processed ${n} images from ${RAW} -> ${OUT} (+ hero.webp, og.jpg)`);
