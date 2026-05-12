"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Infinity } from "lucide-react";
import { tr } from "@/content/tr";

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
    <header className="bg-white dark:bg-slate-900 shadow-sm border-b border-indigo-100 dark:border-slate-700 sticky top-0 z-40">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow group-hover:shadow-md transition-shadow">
              <Infinity className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold text-indigo-700 dark:text-indigo-300 leading-tight block">
                Kozmograf
              </span>
              <span className="text-xs text-indigo-500 dark:text-indigo-400 leading-none hidden sm:block">
                Numeroloji
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300"
                      : "text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-slate-800 hover:text-indigo-700 dark:hover:text-indigo-300"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Sağ taraf: Hesapla butonu + hamburger */}
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow transition-all hover:shadow-md"
            >
              Hesapla
            </Link>
            <button
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Menü"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav className="lg:hidden py-3 border-t border-indigo-100 dark:border-slate-700">
            <div className="flex flex-col gap-1">
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
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300"
                        : "text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="mx-4 mt-2 text-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold px-4 py-2.5 rounded-lg shadow"
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