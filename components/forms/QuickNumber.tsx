"use client";

import { useState } from "react";
import { calculateLifePath, calculatePersonalYear } from "@/lib/numerology";

/**
 * Rehber sayfalarındaki mini hesaplayıcı: tarihi girince sayıyı gösterir
 * ve sayfadaki ilgili bölüme (#{anchorPrefix}{n}) kaydırır.
 */
export default function QuickNumber({
  anchorPrefix = "sayi-",
  mode = "lifePath",
  year,
  label = "Doğum tarihin",
  cta = "Sayımı bul",
  resultLabel = "Yaşam yolu sayın",
}: {
  anchorPrefix?: string;
  mode?: "lifePath" | "personalYear";
  year?: number;
  label?: string;
  cta?: string;
  resultLabel?: string;
}) {
  const [date, setDate] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const today = new Date().toISOString().split("T")[0];

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!date || date > today || date < "1900-01-01") return;
    const n = mode === "personalYear" ? calculatePersonalYear(date, year) : calculateLifePath(date);
    setResult(n);
    requestAnimationFrame(() => {
      document.getElementById(`${anchorPrefix}${n}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  return (
    <form
      onSubmit={submit}
      className="flex max-w-xl flex-col gap-3 rounded-[var(--radius-card)] border border-line bg-surface p-4 sm:flex-row sm:items-end"
    >
      <div className="flex flex-1 flex-col gap-1.5">
        <label htmlFor="hizli-tarih" className="text-[13px] font-medium text-muted">
          {label}
        </label>
        <input
          id="hizli-tarih"
          type="date"
          min="1900-01-01"
          max={today}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="h-[52px] w-full rounded-[14px] border border-line bg-ink px-4 text-[17px] text-text outline-none focus:border-gold [color-scheme:dark]"
        />
      </div>
      <button
        type="submit"
        className="min-h-[52px] rounded-full bg-gold px-6 text-[15px] font-semibold text-ink transition-colors hover:bg-gold-strong"
      >
        {cta}
      </button>
      <p aria-live="polite" className="sr-only">
        {result !== null ? `${resultLabel}: ${result}` : ""}
      </p>
      {result !== null && (
        <a
          href={`#${anchorPrefix}${result}`}
          className="flex min-h-[52px] items-center gap-2 rounded-full border border-gold/60 px-5 text-[15px] text-text"
        >
          {resultLabel}: <strong className="font-display text-2xl text-gold">{result}</strong> →
        </a>
      )}
    </form>
  );
}
