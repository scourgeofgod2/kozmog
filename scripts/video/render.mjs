// Kozmograf video üretici: HTML sahnesi (window.RENDER(t)) → kare kare Chromium → ffmpeg.
//
//   node scripts/video/render.mjs scripts/video/specs/1111.json out/1111.mp4
//        [--audio ses.mp3]      sesi karıştırır (loudnorm -14 LUFS, AAC)
//        [--test 1.5,4.5,...]   yalnızca bu anların PNG'lerini üretir (tasarım kontrolü)
//        [--workers 3]          paralel sayfa sayısı
//        [--cover 1.7]          kapak görseli (PNG) anı (varsayılan 1.7 sn)
//
// Gerekli: global playwright (Chromium), ffmpeg. Fontlar public/fonts'tan yüklenir.

import { createRequire } from "node:module";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { spawnSync } from "node:child_process";

const { chromium } = createRequire(import.meta.url)("playwright");
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..", "..");

const args = process.argv.slice(2);
const [specPath, outPath] = args;
const flag = (name, def) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : def;
};
if (!specPath || !outPath) {
  console.error("Kullanım: node scripts/video/render.mjs <spec.json> <out.mp4> [--audio f] [--test t1,t2] [--workers n]");
  process.exit(1);
}

const spec = JSON.parse(fs.readFileSync(specPath, "utf8"));
const FPS = spec.fps ?? 30;
const DUR = spec.duration;
const FRAMES = Math.round(DUR * FPS);
const WORKERS = Number(flag("workers", 3));
const tpl = fs.readFileSync(path.join(path.dirname(specPath), "..", spec.template), "utf8");
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "kzvideo-"));
const html = path.join(tmp, "scene.html");
fs.writeFileSync(html, tpl.replaceAll("__ROOT__", pathToFileURL(ROOT).href).replace("__SPEC__", JSON.stringify(spec)));

async function openPage(browser) {
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(html).href);
  await page.evaluate(async () => {
    await Promise.all([
      document.fonts.load("600 100px Cormorant"),
      document.fonts.load("italic 500 100px Cormorant"),
      document.fonts.load("400 40px Inter"),
      document.fonts.load("600 40px Inter"),
    ]);
    await document.fonts.ready;
    await Promise.all([...document.images].map((i) => i.decode().catch(() => {})));
  });
  return page;
}

const browser = await chromium.launch();
fs.mkdirSync(path.dirname(path.resolve(outPath)), { recursive: true });

const test = flag("test");
if (test) {
  const page = await openPage(browser);
  for (const t of test.split(",").map(Number)) {
    await page.evaluate((x) => window.RENDER(x), t);
    const f = path.join(path.dirname(path.resolve(outPath)), `test-${String(t).replace(".", "_")}.png`);
    await page.screenshot({ path: f });
    console.log(f);
  }
  await browser.close();
  process.exit(0);
}

// Kapak
{
  const page = await openPage(browser);
  const ct = Number(flag("cover", 1.7));
  await page.evaluate((x) => window.RENDER(x), ct);
  const f = path.resolve(outPath).replace(/\.mp4$/, "-kapak.png");
  await page.screenshot({ path: f });
  console.log("kapak:", f);
  await page.close();
}

const frames = path.join(tmp, "frames");
fs.mkdirSync(frames);
const t0 = Date.now();
let done = 0;
await Promise.all(
  Array.from({ length: WORKERS }, async (_, w) => {
    const page = await openPage(browser);
    for (let i = w; i < FRAMES; i += WORKERS) {
      await page.evaluate((x) => window.RENDER(x), i / FPS);
      await page.screenshot({ path: path.join(frames, `${String(i).padStart(5, "0")}.jpg`), type: "jpeg", quality: 92 });
      if (++done % 100 === 0) process.stdout.write(`${done}/${FRAMES} kare (${((Date.now() - t0) / 1000).toFixed(0)} sn)\n`);
    }
    await page.close();
  })
);
await browser.close();

const audio = flag("audio");
const ff = [
  "-y", "-v", "error", "-framerate", String(FPS), "-i", path.join(frames, "%05d.jpg"),
  ...(audio ? ["-i", audio] : []),
  "-t", String(DUR),
  "-c:v", "libx264", "-preset", "slow", "-crf", "18", "-profile:v", "high", "-pix_fmt", "yuv420p", "-r", String(FPS),
  ...(audio ? ["-af", "loudnorm=I=-14:TP=-1.5:LRA=11,apad", "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-ac", "2"] : []),
  "-movflags", "+faststart", path.resolve(outPath),
];
const r = spawnSync("ffmpeg", ff, { stdio: "inherit" });
fs.rmSync(tmp, { recursive: true, force: true });
if (r.status !== 0) process.exit(r.status ?? 1);
console.log(`\n${outPath} hazır (${FRAMES} kare, ${((Date.now() - t0) / 1000).toFixed(0)} sn)`);
