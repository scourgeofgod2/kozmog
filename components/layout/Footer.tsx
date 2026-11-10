import Link from "next/link";
import { guideGroups, legalNav } from "@/lib/nav";
import { Wordmark } from "./Header";

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-line bg-surface/40">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.3fr_repeat(4,1fr)]">
          <div className="max-w-xs">
            <Link href="/" aria-label="Kozmograf ana sayfa" className="inline-flex min-h-[44px] items-center">
              <Wordmark />
            </Link>
            <p className="mt-3 text-[14px] leading-relaxed text-muted">
              Doğum tarihin ve isminle Pisagor numerolojisi. Ücretsiz hesapla, kişisel yorumunu oku.
            </p>
          </div>

          {guideGroups.map((g) => (
            <nav key={g.title} aria-label={g.title}>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-faint">{g.title}</p>
              <ul className="space-y-1">
                {g.items.map((it) => (
                  <li key={it.href}>
                    <Link href={it.href} className="inline-flex min-h-[36px] items-center text-[14px] text-muted hover:text-gold">
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 text-[13px] text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Kozmograf. Numeroloji yorumları eğlence ve kişisel keşif amaçlıdır.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex min-h-[36px] items-center hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
