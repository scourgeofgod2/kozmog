import Link from "next/link";
import { NumberTile } from "@/components/ds";
import { getProfile, numberHref } from "@/lib/content/profiles";
import { isMasterNumber } from "@/lib/numerology";
import type { NumerologyCalculations } from "@/types/numerology";

export default function ResultCard({ calculations }: { calculations: NumerologyCalculations }) {
  const { lifePath, birthDay, personalYear, destinyNumber, soulUrge, personalityNumber } = calculations;
  const lp = getProfile(lifePath);
  const year = new Date().getFullYear();

  const tiles: { label: string; value?: number }[] = [
    { label: "Kader", value: destinyNumber },
    { label: "Ruh", value: soulUrge },
    { label: "Kişilik", value: personalityNumber },
    { label: "Doğum Günü", value: birthDay },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      <Link
        href={numberHref(lifePath)}
        className="col-span-2 row-span-2 flex min-h-[300px] flex-col justify-between rounded-[var(--radius-card)] bg-gold p-6 text-gold-ink transition-opacity hover:opacity-95"
      >
        <div>
          <p className="text-[13px] font-semibold">
            Yaşam Yolu Sayın {isMasterNumber(lifePath) && "· Usta Sayı ✦"}
          </p>
          <p className="mt-1 font-display text-4xl font-semibold">{lp?.title}</p>
          <p className="mt-2 max-w-[260px] text-[15px] leading-snug">{lp?.keyword}</p>
        </div>
        <div className="flex items-end justify-between">
          <span className="text-[13px] font-semibold underline underline-offset-4">Anlamını oku →</span>
          <span className="font-display text-[9rem] font-semibold leading-[0.75]">{lifePath}</span>
        </div>
      </Link>

      {tiles.map((t) =>
        t.value !== undefined ? (
          <NumberTile
            key={t.label}
            label={t.label}
            value={t.value}
            sub={getProfile(t.value)?.title}
            href={numberHref(t.value)}
            tone={isMasterNumber(t.value) ? "violet" : "default"}
          />
        ) : (
          <Link
            key={t.label}
            href="/#hesapla"
            className="flex min-h-[132px] flex-col justify-between rounded-[var(--radius-tile)] border border-dashed border-line-strong p-4 text-faint transition-colors hover:border-gold hover:text-gold"
          >
            <span className="text-[12px] font-medium">{t.label}</span>
            <span className="font-display text-5xl leading-none">?</span>
            <span className="text-[12px]">İsminle hesapla</span>
          </Link>
        )
      )}

      <Link
        href="/kisisel-yil"
        className="col-span-2 flex items-center gap-4 rounded-[var(--radius-tile)] border border-line bg-surface-2 p-4 transition-colors hover:border-gold/70 md:col-span-4"
      >
        <span className="grid h-14 w-14 flex-none place-items-center rounded-[14px] bg-ink font-display text-3xl font-semibold text-gold">
          {personalYear}
        </span>
        <span className="flex flex-col">
          <span className="text-[15px] font-semibold text-text">
            {year} kişisel yılın: {getProfile(personalYear)?.title}
          </span>
          <span className="text-[13px] text-muted">Bu yılın teması ve {year + 1} için hazırlık →</span>
        </span>
      </Link>
    </div>
  );
}
