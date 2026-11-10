"use client";

import { useMemo, useState } from "react";
import {
  LETTER_VALUES,
  VOWELS,
  cleanName,
  calculateDestinyNumber,
  calculateSoulUrge,
  calculatePersonalityNumber,
} from "@/lib/numerology";

export default function NameCalculator() {
  const [name, setName] = useState("");

  const result = useMemo(() => {
    const letters = cleanName(name).split("").filter(Boolean);
    if (!letters.length) return null;
    return {
      letters,
      destiny: calculateDestinyNumber(name),
      soul: calculateSoulUrge(name),
      personality: calculatePersonalityNumber(name),
      total: letters.reduce((s, ch) => s + (LETTER_VALUES[ch] ?? 0), 0),
    };
  }, [name]);

  return (
    <div className="flex max-w-2xl flex-col gap-4 rounded-[var(--radius-card)] border border-line bg-surface p-4 sm:p-5">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="isim-hesap" className="text-[13px] font-medium text-muted">
          Ad soyad (yazdıkça hesaplanır)
        </label>
        <input
          id="isim-hesap"
          type="text"
          autoComplete="name"
          maxLength={60}
          placeholder="Örn. Elif Yılmaz"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-[54px] w-full rounded-[14px] border border-line bg-ink px-4 text-[17px] text-text placeholder:text-faint outline-none focus:border-gold"
        />
      </div>

      {result && (
        <>
          <div className="flex flex-wrap gap-1.5" aria-label="Harf değerleri">
            {result.letters.map((ch, i) => (
              <span
                key={i}
                className={
                  "flex w-9 flex-col items-center rounded-[10px] py-1.5 text-center " +
                  (VOWELS.has(ch) ? "bg-violet/20 text-violet-soft" : "bg-surface-2 text-text")
                }
              >
                <span className="text-[14px] font-semibold">{ch}</span>
                <span className="text-[12px] text-gold">{LETTER_VALUES[ch]}</span>
              </span>
            ))}
          </div>
          <p className="text-[13px] text-faint">
            Toplam {result.total} · <span className="text-violet-soft">mor</span> harfler sesli (ruh sayısı), diğerleri sessiz
            (kişilik sayısı)
          </p>
          <div className="grid grid-cols-3 gap-2" aria-live="polite">
            {[
              { l: "Kader", v: result.destiny, cls: "bg-gold text-gold-ink" },
              { l: "Ruh", v: result.soul, cls: "bg-violet text-violet-ink" },
              { l: "Kişilik", v: result.personality, cls: "bg-surface-2 text-text border border-line" },
            ].map((x) => (
              <a key={x.l} href={x.v ? `#sayi-${x.v}` : undefined} className={"flex flex-col rounded-[16px] p-3 " + x.cls}>
                <span className="text-[12px] font-medium opacity-80">{x.l}</span>
                <span className="font-display text-4xl font-semibold leading-none">{x.v ?? "–"}</span>
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
