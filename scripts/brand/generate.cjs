/* eslint-disable @typescript-eslint/no-require-imports -- Node betiği (CommonJS) */
// Kozmograf marka dosyaları üretici ("Yörüngedeki K" logosu)
// Çalıştır:  npm i --no-save opentype.js@1.3.4 && node scripts/brand/generate.cjs
// Çıktı:     lib/brand.generated.ts, public/brand/*, app/icon.png, app/apple-icon.png, app/favicon.ico

const fs = require("node:fs");
const path = require("node:path");
const opentype = require("opentype.js");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..", "..");
const OUT = path.join(ROOT, "public", "brand");
fs.mkdirSync(OUT, { recursive: true });

const C = { ink: "#07070d", gold: "#e9c46a", text: "#ece8f5", violet: "#7b5cff" };
const font = opentype.loadSync(path.join(ROOT, "public", "fonts", "CormorantGaramond-600.ttf"));

// ─── K harfi: 100×100 kutuda, ortası (50, 51) ─────────────────────────────
const K_SIZE = 78;
const kb = font.charToGlyph("K").getPath(0, 0, K_SIZE).getBoundingBox();
const kx = 50 - (kb.x1 + kb.x2) / 2;
const ky = 51 - (kb.y1 + kb.y2) / 2;
const K_PATH = font.charToGlyph("K").getPath(kx, ky, K_SIZE).toPathData(2);

// Yörünge: normal ve küçük boyut (kalın) varyantı
const ORBIT = { rotate: -24, rx: 45, ry: 14, stroke: 2.4, dot: 5 };
const ORBIT_SMALL = { rotate: -24, rx: 43, ry: 15, stroke: 5, dot: 7.5 };

function markInner(color, o = ORBIT) {
  return (
    `<path d="${K_PATH}" fill="${color}"/>` +
    `<g transform="rotate(${o.rotate} 50 50)"><ellipse cx="50" cy="50" rx="${o.rx}" ry="${o.ry}" fill="none" stroke="${color}" stroke-width="${o.stroke}"/>` +
    `<circle cx="${50 + o.rx}" cy="50" r="${o.dot}" fill="${color}"/></g>`
  );
}
const markSvg = (color, o) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${markInner(color, o)}</svg>`;

// ─── Yazı ("Kozmograf") ve yatay logo ─────────────────────────────────────
const W_SIZE = 64;
const wordPath = font.getPath("Kozmograf", 0, 0, W_SIZE);
const wb = wordPath.getBoundingBox();
const WORD_X = 118; // işaretten sonra boşluk
const WORD_BASELINE = 70;
const WORD_PATH = font.getPath("Kozmograf", WORD_X - wb.x1, WORD_BASELINE, W_SIZE).toPathData(2);
const LOCKUP_W = Math.ceil(WORD_X + (wb.x2 - wb.x1) + 4);

const lockupSvg = (markColor, textColor) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${LOCKUP_W} 100">${markInner(markColor)}<path d="${WORD_PATH}" fill="${textColor}"/></svg>`;

// ─── Kare (ikon) kompozisyonu: zemin + ortalanmış işaret ──────────────────
function squareSvg(size, bg, color, { pad = 0.16, radius = 0, small = false, kOnly = false } = {}) {
  const inner = size * (1 - pad * 2);
  const off = size * pad;
  // 16 px'te yörünge K ile karışıyor: yalnızca K, biraz büyütülmüş
  const body = kOnly
    ? `<g transform="translate(50 51) scale(1.45) translate(-50 -51)"><path d="${K_PATH}" fill="${color}"/></g>`
    : markInner(color, small ? ORBIT_SMALL : ORBIT);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
<rect width="${size}" height="${size}" rx="${radius}" fill="${bg}"/>
<g transform="translate(${off} ${off}) scale(${inner / 100})">${body}</g></svg>`;
}

const png = (svg, size) => sharp(Buffer.from(svg), { density: 300 }).resize(size, size).png({ compressionLevel: 9 }).toBuffer();

// PNG'leri tek bir .ico içine paketler (PNG sıkıştırmalı ICO)
function ico(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  let offset = 6 + 16 * pngs.length;
  const dir = [];
  for (const { size, buf } of pngs) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt8(0, 2);
    e.writeUInt8(0, 3);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(buf.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += buf.length;
    dir.push(e);
  }
  return Buffer.concat([header, ...dir, ...pngs.map((p) => p.buf)]);
}

(async () => {
  const w = (name, data) => {
    fs.writeFileSync(name, data);
    console.log(path.relative(ROOT, name), `${(data.length / 1024).toFixed(1)}KB`);
  };

  // Vektörler
  w(path.join(OUT, "kozmograf-isaret-altin.svg"), markSvg(C.gold));
  w(path.join(OUT, "kozmograf-isaret-koyu.svg"), markSvg(C.ink));
  w(path.join(OUT, "kozmograf-isaret-beyaz.svg"), markSvg("#ffffff"));
  w(path.join(OUT, "kozmograf-logo-koyu-zemin.svg"), lockupSvg(C.gold, C.text));
  w(path.join(OUT, "kozmograf-logo-acik-zemin.svg"), lockupSvg(C.ink, C.ink));

  // Site ikonları (Next dosya kuralları)
  w(path.join(ROOT, "app", "icon.png"), await png(squareSvg(512, C.ink, C.gold, { pad: 0.14, radius: 96 }), 512));
  w(path.join(ROOT, "app", "apple-icon.png"), await png(squareSvg(180, C.ink, C.gold, { pad: 0.16 }), 180));
  const icoPngs = [];
  for (const s of [16, 32, 48])
    icoPngs.push({ size: s, buf: await png(squareSvg(s * 8, C.ink, C.gold, { pad: 0.06, radius: s * 1.6, small: true, kOnly: s === 16 }), s) });
  w(path.join(ROOT, "app", "favicon.ico"), ico(icoPngs));

  // Instagram / sosyal profil (1080, daire kırpmaya uygun boşluk)
  w(path.join(OUT, "instagram-profil-koyu.png"), await png(squareSvg(1080, C.ink, C.gold, { pad: 0.15 }), 1080));
  w(path.join(OUT, "instagram-profil-altin.png"), await png(squareSvg(1080, C.gold, C.ink, { pad: 0.15 }), 1080));
  w(path.join(OUT, "instagram-profil-mor.png"), await png(squareSvg(1080, C.violet, C.ink, { pad: 0.15 }), 1080));
  // E-posta başlığı için küçük işaret
  w(path.join(OUT, "kozmograf-isaret-96.png"), await png(squareSvg(96, C.ink, C.gold, { pad: 0.08 }), 96));
  // Yatay logo PNG (sunum/şablonlar için)
  w(
    path.join(OUT, "kozmograf-logo-koyu-zemin.png"),
    await sharp(Buffer.from(lockupSvg(C.gold, C.text).replace("<svg ", `<svg width="${LOCKUP_W * 4}" height="400" `)))
      .png()
      .toBuffer()
  );

  // Site kodu için path verisi
  fs.writeFileSync(
    path.join(ROOT, "lib", "brand.generated.ts"),
    `// scripts/brand/generate.cjs tarafından üretilir. Elle düzenleme.
export const K_PATH = ${JSON.stringify(K_PATH)};
export const ORBIT = ${JSON.stringify(ORBIT)};
export const ORBIT_SMALL = ${JSON.stringify(ORBIT_SMALL)};
export const WORD_PATH = ${JSON.stringify(WORD_PATH)};
export const LOCKUP_WIDTH = ${LOCKUP_W};
`
  );
  console.log("lib/brand.generated.ts");
})();
