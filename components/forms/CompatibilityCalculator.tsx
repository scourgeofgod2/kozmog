"use client";

import DateInput from "@/components/forms/DateInput";
import { useState } from "react";
import Link from "next/link";
import { calculateLifePath } from "@/lib/numerology";
import { getCompatibility } from "@/lib/content/compatibility";
import { getProfile, numberHref } from "@/lib/content/profiles";
import { buttonStyles } from "@/components/ds";

// Matris 1–9 için tanımlı; usta sayılar temel sayılarıyla eşleştirilir.
const toBase = (n: number) => (n === 11 ? 2 : n === 22 ? 4 : n === 33 ? 6 : n);


export default function CompatibilityCalculator() {
  const [d1, setD1] = useState("");
  const [d2, setD2] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [res, setRes] = useState<{ a: number; b: number; c: ReturnType<typeof getCompatibility> } | null>(null);
  const today = new Date().toISOString().split("T")[0];

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!d1 || !d2) return setError("İki doğum tarihini de girmelisin.");
    if (d1 > today || d2 > today) return setError("Doğum tarihi gelecekte olamaz.");
    const a = calculateLifePath(d1);
    const b = calculateLifePath(d2);
    setRes({ a, b, c: getCompatibility(toBase(a), toBase(b)) });
  }

  const level = res ? (res.c.score >= 80 ? "Yüksek uyum" : res.c.score >= 65 ? "İyi uyum" : "Gelişime açık uyum") : "";

  return (
    <div className="grid gap-3 lg:grid-cols-[1fr_1.1fr]">
      <form onSubmit={submit} noValidate className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-line bg-surface p-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="uyum-1" className="text-[13px] font-medium text-muted">
            Senin doğum tarihin
          </label>
          <DateInput id="uyum-1" value={d1} onChange={setD1} max={today} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="uyum-2" className="text-[13px] font-medium text-muted">
            Onun doğum tarihi
          </label>
          <DateInput id="uyum-2" value={d2} onChange={setD2} max={today} />
        </div>
        {error && (
          <p role="alert" className="rounded-[12px] border border-rose/40 bg-rose/10 px-4 py-3 text-[14px] text-rose">
            {error}
          </p>
        )}
        <button type="submit" className={buttonStyles("primary", "w-full")}>
          Uyumumuzu hesapla ♥
        </button>
      </form>

      <div aria-live="polite">
        {res ? (
          <div className="grid h-full grid-cols-2 gap-3">
            <div className="col-span-2 flex flex-col justify-between rounded-[var(--radius-card)] bg-violet p-6 text-violet-ink">
              <p className="text-[13px] font-semibold">{level}</p>
              <p className="font-display text-[7rem] font-semibold leading-[0.85]">
                %{res.c.score}
              </p>
              <p className="font-display text-2xl font-semibold leading-tight">{res.c.summary}</p>
            </div>
            {[res.a, res.b].map((n, i) => (
              <Link
                key={i}
                href={numberHref(n)}
                className="flex flex-col rounded-[var(--radius-tile)] border border-line bg-surface p-4 transition-colors hover:border-gold/70"
              >
                <span className="text-[12px] text-muted">{i === 0 ? "Sen" : "O"}</span>
                <span className="font-display text-5xl font-semibold text-gold">{n}</span>
                <span className="text-[13px] text-muted">{getProfile(n)?.title}</span>
              </Link>
            ))}
            <div className="rounded-[var(--radius-tile)] bg-surface-2 p-4">
              <p className="text-[12px] font-semibold text-gold">Güçlü yanlar</p>
              <p className="mt-1 text-[14px] text-muted">{res.c.strengths}</p>
            </div>
            <div className="rounded-[var(--radius-tile)] bg-surface-2 p-4">
              <p className="text-[12px] font-semibold text-gold">Dikkat</p>
              <p className="mt-1 text-[14px] text-muted">{res.c.challenges}</p>
            </div>
          </div>
        ) : (
          <div className="flex h-full min-h-[260px] flex-col items-center justify-center rounded-[var(--radius-card)] border border-dashed border-line-strong p-6 text-center">
            <p className="font-display text-6xl text-gold" aria-hidden="true">♥</p>
            <p className="mt-3 max-w-xs text-[15px] text-muted">İki doğum tarihini gir, yaşam yolu sayılarınızın uyumunu hemen gör.</p>
          </div>
        )}
      </div>
    </div>
  );
}
