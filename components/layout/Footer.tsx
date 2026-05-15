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

const marqueeItems = [
  "Yaşam Yolu", "Kader Sayısı", "Ruh Arzusu", "Usta Sayılar",
  "Uyumluluk", "Kişisel Yıl", "İsim Numerolojisi", "Doğum Günü",
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] text-white mt-20 border-t-4 border-[#FFCB00]">
      {/* Marquee band */}
      <div className="bg-[#FFCB00] border-b-2 border-black overflow-hidden py-2.5">
        <div className="marquee-track flex gap-0 whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-4 px-6 text-black font-black text-xs uppercase tracking-widest">
              {item}
              <span className="text-black/40">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl py-14">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 group w-fit">
              <div
                className="w-10 h-10 bg-[#FFCB00] border-2 border-[#FFCB00] flex items-center justify-center group-hover:bg-white transition-colors"
                style={{ boxShadow: "3px 3px 0px rgba(255,203,0,0.3)" }}
              >
                <span className="text-black font-black text-xl font-display">∞</span>
              </div>
              <div>
                <span className="text-[16px] font-black leading-tight block tracking-tight uppercase text-white">
                  Kozmograf
                </span>
                <span className="text-[9px] font-bold text-white/40 leading-none uppercase tracking-[0.18em]">
                  Numeroloji
                </span>
              </div>
            </Link>

            <p className="text-white/50 text-sm mb-6 leading-relaxed font-medium max-w-[220px]">
              {tr.siteDescription}
            </p>

            <div
              className="inline-block bg-[#FFCB00] border-2 border-[#FFCB00] px-3 py-1.5"
              style={{ boxShadow: "3px 3px 0px rgba(255,203,0,0.2)" }}
            >
              <span className="text-black font-black text-xs uppercase tracking-widest">
                ✦ Ücretsiz &amp; Reklamsız
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.18em] text-[#FFCB00] mb-5 pb-2 border-b border-[#FFCB00]/20">
              {tr.quickLinks}
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-[#FFCB00] text-sm font-medium transition-colors flex items-center gap-2 group"
                  >
                    <span className="text-[#FFCB00]/40 group-hover:text-[#FFCB00] transition-colors">→</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Numbers */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.18em] text-[#FFCB00] mb-5 pb-2 border-b border-[#FFCB00]/20">
              {tr.navNumbers}
            </h4>
            <ul className="space-y-2.5">
              {numberLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-[#FFCB00] text-sm font-medium transition-colors flex items-center gap-2 group"
                  >
                    <span className="text-[#FFCB00]/40 group-hover:text-[#FFCB00] transition-colors">→</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.18em] text-[#FFCB00] mb-5 pb-2 border-b border-[#FFCB00]/20">
              {tr.contactSupport}
            </h4>
            <ul className="space-y-2.5">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-[#FFCB00] text-sm font-medium transition-colors flex items-center gap-2 group"
                  >
                    <span className="text-[#FFCB00]/40 group-hover:text-[#FFCB00] transition-colors">→</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <p className="font-bold uppercase tracking-wide">© {currentYear} Kozmograf. Tüm hakları saklıdır.</p>
          <p className="text-center italic text-white/20">
            Numeroloji yorumları yalnızca eğlence ve kişisel keşif amaçlıdır.
          </p>
          <div className="flex gap-5">
            <Link href="/gizlilik" className="hover:text-[#FFCB00] font-bold uppercase tracking-wide transition-colors">
              Gizlilik
            </Link>
            <Link href="/kullanim-sartlari" className="hover:text-[#FFCB00] font-bold uppercase tracking-wide transition-colors">
              Şartlar
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}