"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { primaryNav, guideGroups } from "@/lib/nav";
import { cn } from "@/lib/utils";
import LogoMark from "@/components/brand/LogoMark";

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <LogoMark size={34} className="text-gold" />
      <span className="font-display text-[22px] font-semibold tracking-[0.02em] text-text">Kozmograf</span>
    </span>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Sayfa değişince mobil menüyü kapat
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
    <header className="sticky top-0 z-50 border-b border-line/70 bg-ink/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" aria-label="Kozmograf ana sayfa" className="flex min-h-[44px] items-center">
          <Wordmark />
        </Link>

        <nav aria-label="Ana menü" className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-full px-3.5 py-2 text-[14px] transition-colors",
                isActive(l.href) ? "bg-surface-2 text-gold" : "text-muted hover:text-text"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/#hesapla"
            className="hidden min-h-[44px] items-center rounded-full bg-gold px-5 text-[14px] font-semibold text-ink transition-colors hover:bg-gold-strong sm:inline-flex"
          >
            Sayımı bul
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobil-menu"
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            className="grid h-11 w-11 place-items-center rounded-full border border-line text-text transition-colors hover:border-gold lg:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </div>

    </header>

    {/* Menü header'ın DIŞINDA: header'daki backdrop-blur, içindeki fixed
        öğeleri header yüksekliğine hapseder (mobilde menü sıkışıyordu). */}
      {open && (
        <div id="mobil-menu" className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto overscroll-contain bg-ink px-4 pb-10 pt-4 lg:hidden">
          <Link
            href="/#hesapla"
            className="mb-6 flex min-h-[52px] items-center justify-center rounded-full bg-gold text-[15px] font-semibold text-ink"
          >
            Ücretsiz sayımı bul
          </Link>
          {guideGroups.map((g) => (
            <div key={g.title} className="mb-6">
              <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-faint">{g.title}</p>
              <ul className="overflow-hidden rounded-[var(--radius-tile)] border border-line bg-surface">
                {g.items.map((it) => (
                  <li key={it.href} className="border-b border-line last:border-0">
                    <Link
                      href={it.href}
                      className={cn(
                        "flex min-h-[52px] items-center justify-between px-4 text-[15px]",
                        isActive(it.href) && it.href !== "/" ? "text-gold" : "text-text"
                      )}
                    >
                      {it.label}
                      <span aria-hidden="true" className="text-gold">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
