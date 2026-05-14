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
    <header className="sticky top-0 z-40 w-full border-b-2 border-black bg-yellow-400">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 bg-black flex items-center justify-center border-2 border-black group-hover:bg-yellow-300 transition-colors">
              <span className="text-yellow-400 font-black text-lg group-hover:text-black transition-colors">∞</span>
            </div>
            <div>
              <span className="text-[16px] font-black text-black leading-tight block tracking-tight uppercase">
                Kozmograf
              </span>
              <span className="text-[10px] font-bold text-black/70 leading-none hidden sm:block uppercase tracking-widest">
                Numeroloji
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0">
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
                    "px-3 py-2 text-sm font-bold uppercase tracking-wide border-b-2 transition-colors",
                    isActive
                      ? "border-black bg-black text-yellow-400"
                      : "border-transparent text-black hover:border-black hover:bg-black/5"
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
              className="hidden sm:inline-flex items-center gap-1.5 bg-black text-yellow-400 text-sm font-black px-4 py-2 border-2 border-black uppercase tracking-wide hover:bg-yellow-300 hover:text-black transition-colors"
              style={{ boxShadow: "2px 2px 0px rgba(0,0,0,0.3)" }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Hesapla
            </Link>
            <button
              className="lg:hidden p-2 border-2 border-black bg-black text-yellow-400 hover:bg-yellow-300 hover:text-black transition-colors"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Menü"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav className="lg:hidden py-3 border-t-2 border-black bg-yellow-400">
            <div className="flex flex-col gap-0">
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
                      "px-4 py-3 text-sm font-black uppercase tracking-wide border-b border-black/20 transition-colors",
                      isActive
                        ? "bg-black text-yellow-400"
                        : "text-black hover:bg-black/10"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="mx-4 mt-3 text-center bg-black text-yellow-400 text-sm font-black px-4 py-3 border-2 border-black uppercase tracking-wide hover:bg-yellow-300 hover:text-black transition-colors"
              >
                ✦ Ücretsiz Hesapla
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}