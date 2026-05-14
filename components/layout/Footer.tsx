import Link from "next/link";
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
    <footer className="bg-black text-white mt-16 border-t-4 border-black">
      <div className="container mx-auto px-4 max-w-7xl py-14">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5 group w-fit">
              <div className="w-10 h-10 bg-yellow-400 border-2 border-yellow-400 flex items-center justify-center group-hover:bg-white transition-colors">
                <span className="text-black font-black text-lg">∞</span>
              </div>
              <div>
                <span className="text-[16px] font-black leading-tight block tracking-tight uppercase text-white">
                  Kozmograf
                </span>
                <span className="text-[10px] font-bold text-white/50 leading-none uppercase tracking-widest">
                  Numeroloji
                </span>
              </div>
            </Link>
            <p className="text-white/60 text-sm mb-5 leading-relaxed font-medium">
              {tr.siteDescription}
            </p>
            <div className="inline-block bg-yellow-400 border-2 border-yellow-400 px-3 py-1.5">
              <span className="text-black font-black text-xs uppercase tracking-widest">
                ✦ Ücretsiz & Reklamsız
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-yellow-400 mb-4 border-b-2 border-yellow-400/30 pb-2">
              {tr.quickLinks}
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-yellow-400 text-sm font-medium transition-colors"
                  >
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Numbers */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-yellow-400 mb-4 border-b-2 border-yellow-400/30 pb-2">
              {tr.navNumbers}
            </h4>
            <ul className="space-y-2">
              {numberLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-yellow-400 text-sm font-medium transition-colors"
                  >
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-yellow-400 mb-4 border-b-2 border-yellow-400/30 pb-2">
              {tr.contactSupport}
            </h4>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-yellow-400 text-sm font-medium transition-colors"
                  >
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t-2 border-white/10 mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p className="font-bold uppercase tracking-wide">© {currentYear} Kozmograf. Tüm hakları saklıdır.</p>
          <p className="text-center italic text-white/30">
            Numeroloji yorumları yalnızca eğlence ve kişisel keşif amaçlıdır.
          </p>
          <div className="flex gap-4">
            <Link href="/gizlilik" className="hover:text-yellow-400 font-bold uppercase tracking-wide transition-colors">
              Gizlilik
            </Link>
            <Link href="/kullanim-sartlari" className="hover:text-yellow-400 font-bold uppercase tracking-wide transition-colors">
              Şartlar
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}