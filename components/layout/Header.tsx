"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { tr } from "@/content/tr";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: tr.navHome },
  { href: "/sayilarin-anlami", label: "Sayılar" },
  { href: "/yasam-yolu", label: "Yaşam Yolu" },
  { href: "/usta-sayilar", label: "11·22·33" },
  { href: "/uyumluluk", label: tr.navCompatibility },
  { href: "/saat-anlami", label: "Saatler" },
  { href: "/isim-numeroloji", label: "İsim" },
  { href: "/kariyer-numerolojisi", label: "Kariyer" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-[rgba(8,8,16,0.92)] backdrop-blur-xl border-b border-[#1E1E3A]"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-[68px]">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="relative w-9 h-9 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 rounded-full border border-[--koz-gold]/30 group-hover:border-[--koz-gold]/60 transition-colors" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#1E1040] to-[#080810]" />
              <span
                className="relative font-display text-[--koz-gold] text-xl leading-none select-none"
                style={{ fontWeight: 400 }}
              >
                ∞
              </span>
            </div>
            <div>
              <span
                className="text-[15px] font-black text-[#EAE6FF] leading-tight block tracking-wide uppercase"
                style={{ letterSpacing: "0.08em" }}
              >
                Kozmograf
              </span>
              <span className="text-[9px] font-medium text-[#7B7A9E] leading-none hidden sm:block uppercase tracking-[0.22em]">
                Numeroloji
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors",
                    isActive
                      ? "text-[--koz-gold]"
                      : "text-[#7B7A9E] hover:text-[#EAE6FF]"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <Link
              href="/#numerology-form"
              className="hidden sm:inline-flex items-center gap-2 text-[#080810] bg-[--koz-gold] text-[11px] font-black px-5 py-2.5 uppercase tracking-[0.14em] hover:bg-[--sun-btn-hover] transition-colors"
              style={{ letterSpacing: "0.14em" }}
            >
              <span>✦</span>
              Hesapla
            </Link>
            <button
              className="lg:hidden w-9 h-9 border border-[#2D2D55] text-[#7B7A9E] flex items-center justify-center hover:text-[#EAE6FF] hover:border-[#7B7A9E] transition-colors"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Menü"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0B0B18] border-b border-[#1E1E3A]">
          <nav className="container mx-auto px-4 max-w-7xl py-3">
            <div className="flex flex-col gap-0.5">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "px-3 py-3 text-sm font-semibold uppercase tracking-[0.1em] border-b border-[#1E1E3A]/60 transition-colors",
                      isActive
                      ? "text-[--koz-gold]"
                      : "text-[#7B7A9E] hover:text-[#EAE6FF]"
                    )}
                  >
                    {isActive && <span className="mr-2 text-[--koz-gold]/60">◦</span>}
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/#numerology-form"
                onClick={() => setMobileOpen(false)}
                className="mt-3 mb-1 text-center bg-[--koz-gold] text-[#080810] text-sm font-black px-4 py-3 uppercase tracking-[0.14em] hover:bg-[--sun-btn-hover] transition-colors"
              >
                ✦ Ücretsiz Hesapla
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}