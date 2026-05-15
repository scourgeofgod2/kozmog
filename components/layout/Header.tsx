"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { tr } from "@/content/tr";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: tr.navHome },
  { href: "/sayilar", label: tr.navNumbers },
  { href: "/uyumluluk", label: tr.navCompatibility },
  { href: "/isim-numeroloji", label: tr.navNameNumerology },
  { href: "/saat-anlami", label: tr.navMirrorHours },
  { href: "/yorumlar", label: tr.navReadings },
  { href: "/blog", label: tr.navBlog },
  { href: "/iletisim", label: tr.navContact },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="bg-[#FFCB00] border-b-[3px] border-black">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between h-[60px]">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-9 h-9 bg-black border-2 border-black flex items-center justify-center overflow-hidden group-hover:bg-[#111] transition-colors" style={{ boxShadow: "2px 2px 0px rgba(0,0,0,0.25)" }}>
                <span className="font-display text-[#FFCB00] font-black text-xl leading-none select-none">∞</span>
              </div>
              <div>
                <span className="text-[15px] font-black text-black leading-tight block tracking-tight uppercase" style={{ letterSpacing: "0.04em" }}>
                  Kozmograf
                </span>
                <span className="text-[9px] font-bold text-black/60 leading-none hidden sm:block uppercase tracking-[0.18em]">
                  Numeroloji
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center">
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
                      "px-3 py-1.5 text-[13px] font-bold uppercase tracking-wide transition-colors",
                      isActive
                        ? "bg-black text-[#FFCB00]"
                        : "text-black hover:bg-black/10"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="hidden sm:inline-flex items-center gap-1.5 bg-black text-[#FFCB00] text-[13px] font-black px-4 py-2 border-2 border-black uppercase tracking-wide hover:bg-[#111] transition-colors"
                style={{ boxShadow: "2px 2px 0px rgba(0,0,0,0.3)" }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Hesapla
              </Link>
              <button
                className="lg:hidden w-9 h-9 border-2 border-black bg-black text-[#FFCB00] flex items-center justify-center hover:bg-[#111] transition-colors"
                onClick={() => setMobileOpen((o) => !o)}
                aria-label="Menü"
              >
                {mobileOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#FFCB00] border-b-[3px] border-black">
          <nav className="container mx-auto px-4 max-w-7xl py-2">
            <div className="flex flex-col">
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
                      "px-3 py-3 text-sm font-black uppercase tracking-wide border-b border-black/15 transition-colors",
                      isActive
                        ? "bg-black text-[#FFCB00] pl-4"
                        : "text-black hover:bg-black/10"
                    )}
                  >
                    {isActive && <span className="mr-2 text-[#FFCB00]">▸</span>}
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="mx-0 mt-3 mb-2 text-center bg-black text-[#FFCB00] text-sm font-black px-4 py-3 border-2 border-black uppercase tracking-wide hover:bg-[#111] transition-colors"
                style={{ boxShadow: "3px 3px 0px rgba(0,0,0,0.25)" }}
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