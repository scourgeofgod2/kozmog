import Link from "next/link";
import { Infinity } from "lucide-react";
import { tr } from "@/content/tr";

const quickLinks = [
  { href: "/", label: tr.navHome },
  { href: "/hakkimizda", label: tr.navAbout },
  { href: "/yorumlar", label: tr.navReadings },
  { href: "/uyumluluk", label: tr.navCompatibility },
  { href: "/blog", label: tr.navBlog },
];

const numberLinks = [
  { href: "/sayilar", label: tr.allNumbersTitle },
  { href: "/sayilar/11", label: "11 Sayısının Anlamı" },
  { href: "/sayilar/22", label: "22 Sayısının Anlamı" },
  { href: "/sayilar/33", label: "33 Sayısının Anlamı" },
  { href: "/saat-anlami", label: "Saat Anlamları" },
  { href: "/isim-numeroloji", label: "İsim Numerolojisi" },
];

const supportLinks = [
  { href: "/iletisim", label: tr.navContact },
  { href: "/gizlilik", label: tr.privacyPolicy },
  { href: "/kullanim-sartlari", label: tr.termsService },
  { href: "/melek-numeroloji", label: "Melek Numerolojisi" },
  { href: "/karmik-numeroloji", label: "Karmik Numeroloji" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white mt-16">
      <div className="container mx-auto px-4 max-w-7xl py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Marka */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Infinity className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold leading-tight">Kozmograf</h3>
                <span className="text-xs text-slate-400">Numeroloji</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm mb-4 leading-relaxed">
              {tr.siteDescription}
            </p>
            <div className="flex gap-3">
              {[
                { label: "Facebook", path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
                { label: "Twitter/X", path: "M4 4l16 16M4 20L20 4" },
                { label: "Instagram", path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" },
                { label: "YouTube", path: "M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" },
              ].map(({ label, path }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Hızlı Bağlantılar */}
          <div>
            <h4 className="text-base font-semibold mb-4">{tr.quickLinks}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sayılar */}
          <div>
            <h4 className="text-base font-semibold mb-4">{tr.navNumbers}</h4>
            <ul className="space-y-2">
              {numberLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destek */}
          <div>
            <h4 className="text-base font-semibold mb-4">{tr.contactSupport}</h4>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Alt çizgi */}
        <div className="border-t border-slate-700 mt-10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
            <p>© {currentYear} Kozmograf. Tüm hakları saklıdır.</p>
            <p className="text-center italic">
              Numeroloji yorumları yalnızca eğlence ve kişisel keşif amaçlıdır.
            </p>
            <div className="flex gap-4">
              <Link href="/gizlilik" className="hover:text-white transition-colors">
                Gizlilik
              </Link>
              <Link href="/kullanim-sartlari" className="hover:text-white transition-colors">
                Şartlar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}