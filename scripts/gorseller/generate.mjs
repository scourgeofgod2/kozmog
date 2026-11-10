// Kozmograf illüstrasyon üretici.
// Çalıştır:  node scripts/gorseller/generate.mjs
// Çıktı:     public/gorseller/*.webp  +  lib/content/images.generated.ts
//
// Görseller koddan (SVG) üretilir, Playwright ile Cormorant fontuyla
// çizilir ve sharp ile WebP'ye sıkıştırılır. Marka renkleri globals.css ile aynı.

import { createRequire } from "node:module";
import sharp from "sharp";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Playwright projeye bağımlılık olarak eklenmez; global kurulumdan yüklenir
// (npm i -g playwright  veya  NODE_PATH ile).
const { chromium } = createRequire(import.meta.url)("playwright");

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const OUT = join(ROOT, "public", "gorseller");
mkdirSync(OUT, { recursive: true });

const C = {
  ink: "#07070d",
  surface: "#0e0d18",
  line: "#2a2840",
  text: "#ece8f5",
  muted: "#a6a2bc",
  gold: "#e9c46a",
  goldSoft: "#f4d98b",
  violet: "#7b5cff",
  violetSoft: "#a594ff",
  rose: "#ff7ab6",
};

// ─── Yardımcılar ──────────────────────────────────────────────────────────

function rng(seed) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

function stars(w, h, count, seed) {
  const r = rng(seed);
  let out = "";
  for (let i = 0; i < count; i++) {
    const x = (r() * w).toFixed(1);
    const y = (r() * h).toFixed(1);
    const size = r() < 0.08 ? 1.8 : r() < 0.3 ? 1.1 : 0.7;
    const col = r() < 0.12 ? C.gold : r() < 0.2 ? C.violetSoft : C.text;
    out += `<circle cx="${x}" cy="${y}" r="${size}" fill="${col}" opacity="${(0.25 + r() * 0.6).toFixed(2)}"/>`;
  }
  return out;
}

function bg(w, h, seed, tint = C.violet) {
  return `
  <defs>
    <radialGradient id="glow" cx="50%" cy="45%" r="60%">
      <stop offset="0%" stop-color="${tint}" stop-opacity="0.22"/>
      <stop offset="60%" stop-color="${tint}" stop-opacity="0.04"/>
      <stop offset="100%" stop-color="${C.ink}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="goldglow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${C.gold}" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="${C.gold}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="${C.ink}"/>
  <rect width="${w}" height="${h}" fill="url(#glow)"/>
  ${stars(w, h, Math.round((w * h) / 2600), seed)}`;
}

const pt = (cx, cy, r, a) => [cx + r * Math.cos(a), cy + r * Math.sin(a)];

/** {n/k} yıldız çokgeni (k=1 düz çokgen) */
function starPolygon(cx, cy, r, n, k, rot = -Math.PI / 2) {
  const pts = [];
  for (let i = 0; i < n; i++) pts.push(pt(cx, cy, r, rot + (2 * Math.PI * i) / n));
  const g = gcd(n, k);
  let d = "";
  for (let s = 0; s < g; s++) {
    let i = s;
    d += `M${pts[i][0].toFixed(1)} ${pts[i][1].toFixed(1)}`;
    for (let step = 0; step < n / g; step++) {
      i = (i + k) % n;
      d += `L${pts[i][0].toFixed(1)} ${pts[i][1].toFixed(1)}`;
    }
  }
  return { d, pts };
}
const gcd = (a, b) => (b ? gcd(b, a % b) : a);

function dots(pts, r, fill) {
  return pts.map(([x, y]) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" fill="${fill}"/>`).join("");
}

function rings(cx, cy, radii, color, opacity = 0.35, dash = "") {
  return radii
    .map(
      (r, i) =>
        `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="${i === 0 ? 1.4 : 0.8}" opacity="${opacity}" ${dash && i % 2 ? `stroke-dasharray="${dash}"` : ""}/>`
    )
    .join("");
}

function text(x, y, str, { size = 40, color = C.text, weight = 600, family = "Cormorant Garamond", anchor = "middle", italic = false, spacing = 0, opacity = 1 } = {}) {
  return `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="'${family}', serif" font-size="${size}" font-weight="${weight}" ${italic ? 'font-style="italic"' : ""} letter-spacing="${spacing}" fill="${color}" opacity="${opacity}" style="font-variant-numeric: lining-nums">${str}</text>`;
}

function label(x, y, str, color = C.gold) {
  return text(x, y, str.toLocaleUpperCase("tr-TR"), { size: 22, family: "Inter", weight: 600, color, spacing: 6 });
}

// ─── Sayı sembolleri ──────────────────────────────────────────────────────

const STAR_K = { 3: 1, 4: 1, 5: 2, 6: 2, 7: 3, 8: 3, 9: 4 };

function numberSigil(n, cx, cy, R) {
  const master = n > 9;
  const col = master ? C.violetSoft : C.gold;
  let g = rings(cx, cy, [R, R * 0.86, R * 0.6], col, 0.35, "2 6");

  if (n === 1) {
    g += `<line x1="${cx}" y1="${cy - R * 0.86}" x2="${cx}" y2="${cy + R * 0.86}" stroke="${col}" stroke-width="1.4" opacity="0.7"/>`;
    g += `<circle cx="${cx}" cy="${cy}" r="${R * 0.12}" fill="${col}" opacity="0.9"/>`;
  } else if (n === 2) {
    const o = R * 0.3;
    g += `<circle cx="${cx - o}" cy="${cy}" r="${R * 0.55}" fill="none" stroke="${col}" stroke-width="1.4" opacity="0.75"/>`;
    g += `<circle cx="${cx + o}" cy="${cy}" r="${R * 0.55}" fill="none" stroke="${col}" stroke-width="1.4" opacity="0.75"/>`;
    g += dots([[cx - o, cy], [cx + o, cy]], 5, col);
  } else if (n <= 9) {
    const { d, pts } = starPolygon(cx, cy, R * 0.86, n, STAR_K[n]);
    g += `<path d="${d}" fill="none" stroke="${col}" stroke-width="1.5" opacity="0.8" stroke-linejoin="round"/>`;
    if (STAR_K[n] > 1) {
      const poly = starPolygon(cx, cy, R * 0.86, n, 1);
      g += `<path d="${poly.d}" fill="none" stroke="${col}" stroke-width="0.8" opacity="0.35"/>`;
    }
    g += dots(pts, 6, col);
  } else {
    // Usta sayılar: iç içe iki/üç şekil
    const base = n === 11 ? 2 : n === 22 ? 4 : 3;
    const layers = n === 33 ? 3 : 2;
    for (let l = 0; l < layers; l++) {
      const rr = R * (0.86 - l * 0.2);
      if (base === 2) {
        g += `<line x1="${cx - rr * 0.35}" y1="${cy - rr}" x2="${cx - rr * 0.35}" y2="${cy + rr}" stroke="${col}" stroke-width="1.4" opacity="${0.8 - l * 0.2}"/>`;
        g += `<line x1="${cx + rr * 0.35}" y1="${cy - rr}" x2="${cx + rr * 0.35}" y2="${cy + rr}" stroke="${col}" stroke-width="1.4" opacity="${0.8 - l * 0.2}"/>`;
      } else {
        const { d, pts } = starPolygon(cx, cy, rr, base, 1, -Math.PI / 2 + (l * Math.PI) / base);
        g += `<path d="${d}" fill="none" stroke="${col}" stroke-width="1.4" opacity="${0.8 - l * 0.2}"/>`;
        g += dots(pts, 5, col);
      }
    }
  }
  return g;
}

function numberCard(n, title) {
  const W = 800,
    H = 800;
  const master = n > 9;
  return svg(
    W,
    H,
    `${bg(W, H, n * 97, master ? C.violet : C.gold)}
    <circle cx="400" cy="370" r="230" fill="url(#goldglow)" opacity="${master ? 0.3 : 0.6}"/>
    ${numberSigil(n, 400, 370, 290)}
    ${text(400, 370 + (n > 9 ? 95 : 105), String(n), { size: n > 9 ? 280 : 320, color: master ? C.text : C.goldSoft })}
    ${label(400, 730, `${title} · ${master ? "usta sayı" : "numeroloji"}`, master ? C.violetSoft : C.gold)}`
  );
}

// ─── Melek sayıları ───────────────────────────────────────────────────────

function wing(cx, cy, dir, col) {
  let g = "";
  for (let i = 0; i < 6; i++) {
    const r = 120 + i * 34;
    const a0 = dir > 0 ? -Math.PI * 0.42 : Math.PI * 1.42;
    const a1 = dir > 0 ? Math.PI * 0.18 : Math.PI * 0.82;
    const [x0, y0] = pt(cx, cy, r, a0);
    const [x1, y1] = pt(cx, cy, r, a1);
    g += `<path d="M${x0.toFixed(1)} ${y0.toFixed(1)} A${r} ${r} 0 0 ${dir > 0 ? 1 : 0} ${x1.toFixed(1)} ${y1.toFixed(1)}" fill="none" stroke="${col}" stroke-width="${1.6 - i * 0.18}" opacity="${0.75 - i * 0.1}"/>`;
  }
  return g;
}

function angelCard(slug, title, idx) {
  const W = 800,
    H = 800;
  const col = idx % 3 === 1 ? C.violetSoft : C.gold;
  const size = slug.length >= 4 ? 190 : 230;
  return svg(
    W,
    H,
    `${bg(W, H, 3000 + idx * 31, idx % 3 === 1 ? C.violet : C.gold)}
    <circle cx="400" cy="380" r="240" fill="url(#goldglow)" opacity="0.45"/>
    ${wing(250, 380, -1, col)}
    ${wing(550, 380, 1, col)}
    ${rings(400, 380, [175, 150], col, 0.4, "2 6")}
    ${dots(Array.from({ length: 12 }, (_, i) => pt(400, 380, 175, (i * Math.PI) / 6)), 3.5, col)}
    ${text(400, 380 + size * 0.33, slug, { size, color: C.text })}
    ${label(400, 730, `${slug} · ${title}`, col)}`
  );
}

// ─── Sayfa motifleri (1200×800) ───────────────────────────────────────────

const PW = 1200,
  PH = 800;

const pages = {
  "ana-sayfa-numeroloji-haritasi": {
    alt: "Numeroloji haritası: 1'den 9'a sayılar bir çember üzerinde, merkezde enneagram yıldızı",
    draw: () => {
      const cx = 600,
        cy = 400,
        R = 300;
      const { d, pts } = starPolygon(cx, cy, R, 9, 4);
      const nums = Array.from({ length: 9 }, (_, i) => {
        const [x, y] = pt(cx, cy, R + 52, -Math.PI / 2 + (2 * Math.PI * i) / 9);
        return text(x, y + 18, String(i + 1), { size: 52, color: i === 6 ? C.gold : C.text });
      }).join("");
      return `${bg(PW, PH, 11)}
        <circle cx="${cx}" cy="${cy}" r="200" fill="url(#goldglow)" opacity="0.5"/>
        ${rings(cx, cy, [R, R - 40, 120], C.gold, 0.35, "2 6")}
        <path d="${d}" fill="none" stroke="${C.gold}" stroke-width="1.4" opacity="0.75"/>
        ${dots(pts, 6, C.gold)}${nums}
        ${text(cx, cy + 40, "✦", { size: 110, color: C.goldSoft, family: "Inter" })}`;
    },
  },
  "yasam-yolu-sayisi": {
    alt: "Yaşam yolu sayısı: yıldızların arasından geçen, dokuz durağı olan kıvrımlı altın bir yol",
    draw: () => {
      const r = rng(5);
      const pts = Array.from({ length: 9 }, (_, i) => [140 + i * 115, 400 + Math.sin(i * 0.9) * 170 + (r() - 0.5) * 30]);
      let d = `M${pts[0][0]} ${pts[0][1]}`;
      for (let i = 1; i < pts.length; i++) {
        const [px, py] = pts[i - 1],
          [x, y] = pts[i];
        d += ` C${px + 55} ${py} ${x - 55} ${y} ${x} ${y}`;
      }
      return `${bg(PW, PH, 21)}
        <path d="${d}" fill="none" stroke="${C.gold}" stroke-width="2.5" opacity="0.85"/>
        <path d="${d}" fill="none" stroke="${C.gold}" stroke-width="14" opacity="0.08"/>
        ${pts.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${i === 8 ? 26 : 18}" fill="${i === 8 ? C.gold : C.surface}" stroke="${C.gold}" stroke-width="1.5"/>${text(x, y + 9, String(i + 1), { size: 26, color: i === 8 ? C.ink : C.text })}`).join("")}`;
    },
  },
  "kisisel-yil-2027": {
    alt: "2027 kişisel yıl döngüsü: 1'den 9'a dokuz dilimli kozmik çark, merkezde 2027",
    draw: (hl = 2, sub = "evrensel yıl 11") => {
      const cx = 600,
        cy = 400,
        R = 310,
        r0 = 170;
      let seg = "";
      for (let i = 0; i < 9; i++) {
        const a0 = -Math.PI / 2 + (2 * Math.PI * i) / 9 + 0.02,
          a1 = -Math.PI / 2 + (2 * Math.PI * (i + 1)) / 9 - 0.02;
        const [x0, y0] = pt(cx, cy, R, a0),
          [x1, y1] = pt(cx, cy, R, a1),
          [x2, y2] = pt(cx, cy, r0, a1),
          [x3, y3] = pt(cx, cy, r0, a0);
        const hi = i === hl - 1;
        seg += `<path d="M${x0} ${y0} A${R} ${R} 0 0 1 ${x1} ${y1} L${x2} ${y2} A${r0} ${r0} 0 0 0 ${x3} ${y3} Z" fill="${hi ? C.violet : C.surface}" stroke="${hi ? C.violetSoft : C.line}" stroke-width="1.5" opacity="${hi ? 0.95 : 0.9}"/>`;
        const [tx, ty] = pt(cx, cy, (R + r0) / 2, (a0 + a1) / 2);
        seg += text(tx, ty + 18, String(i + 1), { size: 52, color: hi ? C.text : C.gold });
      }
      return `${bg(PW, PH, 2027)}${rings(cx, cy, [R + 30], C.gold, 0.3)}${seg}
        <circle cx="${cx}" cy="${cy}" r="${r0 - 14}" fill="url(#goldglow)" opacity="0.6"/>
        ${text(cx, cy + 30, "2027", { size: 100, color: C.goldSoft })}
        ${label(cx, cy + 75, sub, C.violetSoft)}`;
    },
  },
  "ask-uyumu-numeroloji": {
    alt: "Numeroloji aşk uyumu: kesişen iki altın ve mor yörünge, ortada kalp",
    draw: (withNumbers = true) =>
      `${bg(PW, PH, 33, C.rose)}
      ${rings(480, 400, [230, 190], C.gold, 0.6, "2 6")}
      ${rings(720, 400, [230, 190], C.violetSoft, 0.6, "2 6")}
      <circle cx="480" cy="400" r="14" fill="${C.gold}"/><circle cx="720" cy="400" r="14" fill="${C.violetSoft}"/>
      ${text(600, 440, "♥", { size: 120, color: C.rose, family: "Inter" })}
      ${withNumbers ? text(400, 420, "7", { size: 90, color: C.gold, opacity: 0.9 }) + text(800, 420, "2", { size: 90, color: C.violetSoft, opacity: 0.9 }) : ""}`,
  },
  "ayna-saatler-11-11": {
    alt: "Ayna saatler: yıldızlı gece göğünde saat kadranı, 11:11 gösteriyor",
    draw: () => {
      const cx = 600,
        cy = 400,
        R = 280;
      let ticks = "";
      for (let i = 0; i < 60; i++) {
        const a = (2 * Math.PI * i) / 60;
        const [x0, y0] = pt(cx, cy, R, a),
          [x1, y1] = pt(cx, cy, R - (i % 5 ? 10 : 26), a);
        ticks += `<line x1="${x0}" y1="${y0}" x2="${x1}" y2="${y1}" stroke="${i % 5 ? C.muted : C.gold}" stroke-width="${i % 5 ? 1 : 2.4}" opacity="0.8"/>`;
      }
      const hA = -Math.PI / 2 + (2 * Math.PI * (11 + 11 / 60)) / 12,
        mA = -Math.PI / 2 + (2 * Math.PI * 11) / 60;
      const [hx, hy] = pt(cx, cy, 150, hA),
        [mx, my] = pt(cx, cy, 230, mA);
      return `${bg(PW, PH, 1111)}
        <circle cx="${cx}" cy="${cy}" r="${R + 20}" fill="${C.surface}" opacity="0.7"/>
        ${rings(cx, cy, [R + 20], C.gold, 0.5)}${ticks}
        <line x1="${cx}" y1="${cy}" x2="${hx}" y2="${hy}" stroke="${C.gold}" stroke-width="8" stroke-linecap="round"/>
        <line x1="${cx}" y1="${cy}" x2="${mx}" y2="${my}" stroke="${C.text}" stroke-width="5" stroke-linecap="round"/>
        <circle cx="${cx}" cy="${cy}" r="12" fill="${C.gold}"/>
        ${text(cx, cy + 170, "11:11", { size: 72, color: C.goldSoft })}`;
    },
  },
  "isim-numerolojisi-harf-tablosu": {
    alt: "İsim numerolojisi: Pisagor harf-sayı tablosu, A=1'den I=9'a harfler ve değerleri",
    draw: () => {
      const letters = "ABCDEFGHI".split("");
      let g = "";
      letters.forEach((l, i) => {
        const x = 150 + i * 112;
        g += `<rect x="${x - 46}" y="250" width="92" height="230" rx="22" fill="${C.surface}" stroke="${i === 4 ? C.gold : C.line}" stroke-width="1.5"/>`;
        g += text(x, 350, l, { size: 70, color: C.text });
        g += text(x, 440, String(i + 1), { size: 54, color: C.gold });
      });
      return `${bg(PW, PH, 44)}${g}${label(600, 600, "Pisagor sistemi · Türkçe harfler dahil")}`;
    },
  },
  "karmik-borc-sayilari": {
    alt: "Karmik borç sayıları 13, 14, 16 ve 19 sonsuzluk düğümü etrafında",
    draw: () => {
      const d = "M600 400 C 700 260, 900 260, 900 400 C 900 540, 700 540, 600 400 C 500 260, 300 260, 300 400 C 300 540, 500 540, 600 400 Z";
      return `${bg(PW, PH, 1314)}
        <path d="${d}" fill="none" stroke="${C.violetSoft}" stroke-width="3" opacity="0.8"/>
        <path d="${d}" fill="none" stroke="${C.violet}" stroke-width="18" opacity="0.15"/>
        ${[["13", 300, 220], ["14", 900, 220], ["16", 300, 640], ["19", 900, 640]].map(([s, x, y]) => text(x, y, s, { size: 96, color: C.text })).join("")}
        <circle cx="600" cy="400" r="10" fill="${C.gold}"/>`;
    },
  },
  "dogum-gunu-sayisi-takvim": {
    alt: "Doğum günü sayısı: ayın 31 gününü gösteren yıldızlı takvim, usta günler 11 ve 22 vurgulu",
    draw: () => {
      let g = "";
      for (let d = 1; d <= 31; d++) {
        const i = d - 1,
          x = 255 + (i % 7) * 115,
          y = 165 + Math.floor(i / 7) * 115;
        const m = d === 11 || d === 22;
        const k = [13, 14, 16, 19].includes(d);
        g += `<rect x="${x - 46}" y="${y - 46}" width="92" height="92" rx="20" fill="${m ? C.violet : C.surface}" stroke="${m ? C.violetSoft : C.line}" stroke-width="1.5" opacity="${k ? 0.6 : 1}"/>`;
        g += text(x, y + 16, String(d), { size: 44, color: m ? C.text : k ? C.muted : C.gold });
      }
      return `${bg(PW, PH, 31)}${g}`;
    },
  },
  "usta-sayilar-11-22-33": {
    alt: "Usta sayılar 11, 22 ve 33 mor bir üçgenin köşelerinde, merkezde ışık",
    draw: () => {
      const { d, pts } = starPolygon(600, 430, 300, 3, 1);
      return `${bg(PW, PH, 112233)}
        <circle cx="600" cy="430" r="160" fill="url(#goldglow)" opacity="0.5"/>
        ${rings(600, 430, [300, 200], C.violetSoft, 0.4, "2 6")}
        <path d="${d}" fill="none" stroke="${C.violetSoft}" stroke-width="2" opacity="0.85"/>
        ${pts.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="70" fill="${C.violet}"/>${text(x, y + 26, ["11", "22", "33"][i], { size: 76, color: C.text })}`).join("")}`;
    },
  },
  "kariyer-numerolojisi": {
    alt: "Kariyer numerolojisi: yıldızlara uzanan dokuz basamaklı altın merdiven",
    draw: () => {
      let g = "";
      for (let i = 0; i < 9; i++) {
        const x = 170 + i * 105,
          y = 640 - i * 55;
        g += `<rect x="${x}" y="${y}" width="95" height="${700 - y}" rx="14" fill="${i === 8 ? C.gold : C.surface}" stroke="${C.gold}" stroke-width="1.2" opacity="${0.5 + i * 0.06}"/>`;
        g += text(x + 47, y + 50, String(i + 1), { size: 40, color: i === 8 ? C.ink : C.gold });
      }
      return `${bg(PW, PH, 808)}${g}${text(1105, 150, "✦", { size: 80, color: C.goldSoft, family: "Inter" })}`;
    },
  },
  "gucler-ve-yetenekler": {
    alt: "Güçler ve yetenekler: merkezden dokuz yöne ışık saçan altın yıldız patlaması",
    draw: () => {
      let g = "";
      for (let i = 0; i < 36; i++) {
        const a = (2 * Math.PI * i) / 36;
        const len = i % 4 === 0 ? 320 : i % 2 ? 180 : 250;
        const [x0, y0] = pt(600, 400, 70, a),
          [x1, y1] = pt(600, 400, len, a);
        g += `<line x1="${x0}" y1="${y0}" x2="${x1}" y2="${y1}" stroke="${i % 4 === 0 ? C.gold : C.violetSoft}" stroke-width="${i % 4 === 0 ? 2.2 : 1}" opacity="${i % 4 === 0 ? 0.85 : 0.45}"/>`;
      }
      return `${bg(PW, PH, 999)}<circle cx="600" cy="400" r="220" fill="url(#goldglow)"/>${g}<circle cx="600" cy="400" r="62" fill="${C.gold}"/>${text(600, 425, "✦", { size: 70, color: C.ink, family: "Inter" })}`;
    },
  },
  "sayilarin-anlami-rehberi": {
    alt: "Sayıların anlamı: 1'den 9'a sayılar ve usta sayılar 11, 22, 33 bento ızgarasında",
    draw: () => {
      const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33];
      let g = "";
      nums.forEach((n, i) => {
        const x = 180 + (i % 6) * 168,
          y = 250 + Math.floor(i / 6) * 230;
        const m = n > 9;
        const hi = n === 7;
        g += `<rect x="${x - 72}" y="${y - 95}" width="144" height="190" rx="26" fill="${hi ? C.gold : m ? C.violet : C.surface}" stroke="${C.line}" stroke-width="1.2"/>`;
        g += text(x, y + 30, String(n), { size: 92, color: hi ? C.ink : m ? C.text : C.gold });
      });
      return `${bg(PW, PH, 123)}${g}`;
    },
  },
  "melek-sayilari": {
    alt: "Melek sayıları: kanat şeklindeki altın yaylar arasında 111, 222, 333, 444 dizileri",
    draw: () =>
      `${bg(PW, PH, 444)}
      <circle cx="600" cy="400" r="240" fill="url(#goldglow)" opacity="0.45"/>
      ${wing(420, 400, -1, C.gold)}${wing(780, 400, 1, C.gold)}
      ${text(600, 330, "111 · 222", { size: 70, color: C.muted })}
      ${text(600, 470, "444", { size: 170, color: C.text })}
      ${text(600, 560, "333 · 555", { size: 56, color: C.muted, opacity: 0.8 })}`,
  },
};

function svg(w, h, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${body}</svg>`;
}

// ─── İçerik listeleri (lib/content ile aynı tutulmalı) ────────────────────

const NUMBERS = [
  [1, "Öncü"], [2, "Arabulucu"], [3, "İfadeci"], [4, "Kurucu"], [5, "Özgür Ruh"], [6, "Bakıcı"],
  [7, "Bilge"], [8, "Güç Odağı"], [9, "Evrensel Bilge"], [11, "Aydınlanmış Sezgici"], [22, "Usta İnşaatçı"], [33, "Usta Öğretmen"],
];
const ANGELS = [
  ["000", "Sonsuz Potansiyel"], ["111", "Yeni Başlangıçlar"], ["222", "Denge ve Güven"], ["333", "Yaratıcılık ve Destek"],
  ["444", "Koruma ve Sağlam Temel"], ["555", "Büyük Değişim"], ["666", "Denge ve Öz Şefkat"], ["777", "Ruhsal Uyanış"],
  ["888", "Bolluk ve Hasat"], ["999", "Tamamlanma"], ["1010", "Kişisel Gelişim"], ["1212", "Konfor Alanından Çık"], ["1234", "Adım Adım İlerleme"],
];

const slugify = (s) =>
  s
    .toLocaleLowerCase("tr-TR")
    .replace(/ç/g, "c").replace(/ğ/g, "g").replace(/ı/g, "i").replace(/ö/g, "o").replace(/ş/g, "s").replace(/ü/g, "u")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

// ─── Üretim ───────────────────────────────────────────────────────────────

const jobs = [];
for (const [n, title] of NUMBERS)
  jobs.push({
    key: `sayi-${n}`,
    file: `numeroloji-${n}-sayisi-${slugify(title)}.webp`,
    w: 800,
    h: 800,
    alt: `Numerolojide ${n} sayısı: ${title}. ${n > 9 ? "Usta sayı sembolü" : `${n} köşeli kutsal geometri sembolü`}`,
    svg: numberCard(n, title),
  });
ANGELS.forEach(([slug, title], i) =>
  jobs.push({
    key: `melek-${slug}`,
    file: `${slug}-melek-sayisi-anlami.webp`,
    w: 800,
    h: 800,
    alt: `${slug} melek sayısı: ${title}`,
    svg: angelCard(slug, title, i),
  })
);
for (const [slug, p] of Object.entries(pages))
  jobs.push({ key: `sayfa-${slug}`, file: `${slug}.webp`, w: PW, h: PH, alt: p.alt, svg: svg(PW, PH, p.draw()) });

// Yalnızca PDF raporlar için kişiye özel varyantlar (JPEG, manifest'e girmez)
const pdfOnly = [
  ...[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => ({
    name: `pdf-yil-${n}`,
    svg: svg(PW, PH, pages["kisisel-yil-2027"].draw(n, `kişisel yıl ${n}`)),
  })),
  { name: "pdf-ask", svg: svg(PW, PH, pages["ask-uyumu-numeroloji"].draw(false)) },
];

const html = (s) => `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600&family=Inter:wght@600&display=block" rel="stylesheet">
<style>html,body{margin:0;background:${C.ink}}svg{display:block}</style></head><body>${s}</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage();
const manifest = {};
for (const j of jobs) {
  await page.setViewportSize({ width: j.w, height: j.h });
  await page.setContent(html(j.svg), { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const png = await page.screenshot({ type: "png" });
  const webp = await sharp(png).webp({ quality: 84, effort: 6 }).toBuffer();
  writeFileSync(join(OUT, j.file), webp);
  // PDF raporlar için JPEG kopyası (react-pdf WebP desteklemez)
  if (j.key.startsWith("sayi-") || ["sayfa-ana-sayfa-numeroloji-haritasi", "sayfa-kisisel-yil-2027", "sayfa-ask-uyumu-numeroloji"].includes(j.key)) {
    mkdirSync(join(OUT, "pdf"), { recursive: true });
    await sharp(png).resize({ width: j.key.startsWith("sayi-") ? 360 : 1000 }).jpeg({ quality: 82, mozjpeg: true }).toFile(join(OUT, "pdf", `${j.key}.jpg`));
  }
  manifest[j.key] = { src: `/gorseller/${j.file}`, alt: j.alt, width: j.w, height: j.h };
  process.stdout.write(`${j.file} ${(webp.length / 1024).toFixed(0)}KB\n`);
}
for (const j of pdfOnly) {
  await page.setViewportSize({ width: PW, height: PH });
  await page.setContent(html(j.svg), { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const png = await page.screenshot({ type: "png" });
  mkdirSync(join(OUT, "pdf"), { recursive: true });
  await sharp(png).resize({ width: 1000 }).jpeg({ quality: 82, mozjpeg: true }).toFile(join(OUT, "pdf", `${j.name}.jpg`));
  process.stdout.write(`pdf/${j.name}.jpg\n`);
}
await browser.close();

writeFileSync(
  join(ROOT, "lib", "content", "images.generated.ts"),
  `// Bu dosya scripts/gorseller/generate.mjs tarafından üretilir. Elle düzenleme.\n\nexport interface SiteImage {\n  src: string;\n  alt: string;\n  width: number;\n  height: number;\n}\n\nexport const images = ${JSON.stringify(manifest, null, 2)} as const satisfies Record<string, SiteImage>;\n\nexport type ImageKey = keyof typeof images;\n`
);
console.log(`\n${jobs.length} görsel üretildi.`);
