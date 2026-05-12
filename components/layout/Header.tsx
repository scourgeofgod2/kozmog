"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Infinity, Sparkles } from "lucide-react";
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
    <header className="sticky top-0 z-40 w-full border-b border-[hsl(var(--border))] bg-[hsl(var(--background)/0.8)] backdrop-blur-md supports-[backdrop-filter]:bg-[hsl(var(--background)/0.6)]">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 bg-gradient-to-br from-violet-500 to-purple-700 rounded-xl flex items-center justify-center shadow-md shadow-violet-200 dark:shadow-violet-900/40 group-hover:shadow-lg group-hover:shadow-violet-300 dark:group-hover:shadow-violet-800/50 transition-shadow">
              <Infinity className="w-4.5 h-4.5 text-white" />
            </div>
            <div>
              <span className="text-[15px] font-semibold text-[hsl(var(--foreground))] leading-tight block tracking-tight">
                Kozmograf
              </span>
              <span className="text-[10px] font-medium text-[hsl(var(--muted-foreground))] leading-none hidden sm:block uppercase tracking-widest">
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
                    "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]"
                      : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]"
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
              className="hidden sm:inline-flex items-center gap-1.5 bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-700 hover:to-purple-800 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-sm shadow-violet-300 dark:shadow-violet-900/50 transition-all hover:shadow-md hover:shadow-violet-300 dark:hover:shadow-violet-900/60 hover:-translate-y-px"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Hesapla
            </Link>
            <button
              className="lg:hidden p-2 rounded-lg text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] transition-colors"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Menü"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav className="lg:hidden py-3 border-t border-[hsl(var(--border))]">
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
                      "px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]"
                        : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="mx-4 mt-2 text-center bg-gradient-to-r from-violet-600 to-purple-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg shadow-sm"
              >
                Ücretsiz Hesapla
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}