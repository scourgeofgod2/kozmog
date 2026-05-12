import Link from "next/link";
import { Infinity } from "lucide-react";
import { Separator } from "@/components/ui/separator";
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

const socialLinks = [
  { label: "Facebook", path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
  { label: "Twitter/X", path: "M4 4l16 16M4 20L20 4" },
  { label: "Instagram", path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" },
  { label: "YouTube", path: "M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[hsl(224,71%,4%)] dark:bg-[hsl(224,71%,3%)] text-white mt-16 border-t border-white/5">
      <div className="container mx-auto px-4 max-w-7xl py-14">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5 group w-fit">
              <div className="w-9 h-9 bg-gradient-to-br from-violet-500 to-purple-700 rounded-xl flex items-center justify-center shadow-md shadow-violet-900/50">
                <Infinity className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="text-[15px] font-semibold leading-tight block tracking-tight">Kozmograf</span>
                <span className="text-[10px] font-medium text-white/40 leading-none uppercase tracking-widest">Numeroloji</span>
              </div>
            </Link>
            <p className="text-white/50 text-sm mb-5 leading-relaxed">
              {tr.siteDescription}
            </p>
            <div className="flex gap-2">
              {socialLinks.map(({ label, path }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">{tr.quickLinks}</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Numbers */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">{tr.navNumbers}</h4>
            <ul className="space-y-2.5">
              {numberLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">{tr.contactSupport}</h4>
            <ul className="space-y-2.5">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-white/8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/40">
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
    </footer>
  );
}