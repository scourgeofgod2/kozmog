"use client";

import DateInput from "@/components/forms/DateInput";
import { useState } from "react";
import { findKarmicDebts, type KarmicFinding } from "@/lib/numerology";
import { buttonStyles } from "@/components/ds";

const inputCls =
  "h-[54px] w-full rounded-[14px] border border-line bg-ink px-4 text-[17px] text-text placeholder:text-faint outline-none focus:border-gold [color-scheme:dark]";

export default function KarmicCalculator() {
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [found, setFound] = useState<KarmicFinding[] | null>(null);
  const today = new Date().toISOString().split("T")[0];

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!date || date > today || date < "1900-01-01") return;
    setFound(findKarmicDebts(date, name));
  }

  return (
    <div className="flex max-w-2xl flex-col gap-3">
      <form onSubmit={submit} className="grid gap-3 rounded-[var(--radius-card)] border border-line bg-surface p-4 sm:grid-cols-2 sm:p-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="karmik-tarih" className="text-[13px] font-medium text-muted">
            Doğum tarihin
          </label>
          <DateInput id="karmik-tarih" value={date} onChange={setDate} max={today} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="karmik-isim" className="text-[13px] font-medium text-muted">
            Ad soyad <span className="text-faint">(isteğe bağlı)</span>
          </label>
          <input id="karmik-isim" type="text" maxLength={60} placeholder="Adın ve soyadın" value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
        </div>
        <button type="submit" className={buttonStyles("primary", "sm:col-span-2")}>
          Karmik borcum var mı?
        </button>
      </form>

      <div aria-live="polite">
        {found &&
          (found.length ? (
            <div className="rounded-[var(--radius-card)] bg-violet p-5 text-violet-ink">
              <p className="text-[13px] font-semibold">Haritanda karmik borç sayısı var</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {found.map((f) => (
                  <li key={f.source}>
                    <a href={`#borc-${f.debt}`} className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-violet-ink px-4 text-[14px] text-text">
                      <strong className="font-display text-2xl text-gold">{f.debt}</strong> {f.source} →
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="rounded-[var(--radius-card)] border border-line bg-surface p-5">
              <p className="font-display text-2xl font-semibold text-gold">Karmik borç sayın yok</p>
              <p className="mt-1 text-[14px] text-muted">
                Doğum günün, yaşam yolu ara toplamın{name.trim() ? " ve isim toplamın" : ""} 13, 14, 16 ya da 19 içermiyor.
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
