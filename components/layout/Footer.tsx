import Link from "next/link";
import { tr } from "@/content/tr";

const quickLinks = [
  { href: "/", label: tr.navHome },
  { href: "/sayilarin-anlami", label: "Sayıların Anlamı" },
  { href: "/yasam-yolu", label: "Yaşam Yolu" },
  { href: "/uyumluluk", label: tr.navCompatibility },
  { href: "/kariyer-numerolojisi", label: "Kariyer Rehberi" },
  { href: "/gucler-ve-yetenekler", label: "Güçler & Yetenekler" },
  { href: "/isim-numeroloji", label: "İsim Numerolojisi" },
];

const numberLinks = [
  { href: "/usta-sayilar", label: "Usta Sayılar 11·22·33" },
  { href: "/saat-anlami", label: "Saatlerin Anlamı" },
  { href: "/isim-numeroloji", label: "İsim Numerolojisi" },
  { href: "/sayilarin-anlami", label: "1'den 9'a Sayılar" },
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
  "Melek Sayıları", "Karmik Borç", "Ruh Sayısı", "Numeroloji",
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: "var(--koz-void)", borderTop: "1px solid var(--koz-border)" }}>

      {/* Gold rule gradient */}
      <div className="koz-rule" />

      {/* Marquee band */}
      <div
        className="overflow-hidden py-3"
        style={{ borderBottom: "1px solid var(--koz-border)", background: "var(--koz-deep)" }}
      >
        <div className="marquee-track flex gap-0 whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-4 px-6"
              style={{
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--koz-text-muted)",
              }}
            >
              {item}
              <span style={{ color: "var(--koz-gold)", opacity: 0.4 }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Main footer body */}
      <div className="container mx-auto px-4 max-w-7xl py-16">
        <div className="grid md:grid-cols-4 gap-12">

          {/* Brand col */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 group w-fit">
              <div
                className="relative w-10 h-10 flex items-center justify-center"
                style={{
                  border: "1px solid rgba(245,200,66,0.3)",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #1E1040, #080810)",
                }}
              >
                <span
                  className="font-display text-[#F5C842] text-2xl leading-none select-none"
                  style={{ fontWeight: 400 }}
                >
                  ∞
                </span>
              </div>
              <div>
                <span
                  className="text-[15px] font-black leading-tight block text-[#EAE6FF] uppercase"
                  style={{ letterSpacing: "0.08em" }}
                >
                  Kozmograf
                </span>
                <span
                  className="text-[9px] font-medium leading-none uppercase text-[#7B7A9E]"
                  style={{ letterSpacing: "0.22em" }}
                >
                  Numeroloji
                </span>
              </div>
            </Link>

            <p
              className="text-sm mb-8 leading-relaxed max-w-[220px]"
              style={{ color: "var(--koz-text-muted)", fontWeight: 400 }}
            >
              {tr.siteDescription}
            </p>

            <div
              className="inline-flex items-center gap-2 px-3 py-1.5"
              style={{
                border: "1px solid rgba(245,200,66,0.2)",
                background: "rgba(245,200,66,0.04)",
              }}
            >
              <span style={{ color: "var(--koz-gold)", fontSize: "10px" }}>✦</span>
              <span
                style={{
                  color: "var(--koz-gold)",
                  fontSize: "9px",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                Ücretsiz &amp; Reklamsız
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--koz-gold)",
                marginBottom: "1.25rem",
                paddingBottom: "0.75rem",
                borderBottom: "1px solid rgba(245,200,66,0.12)",
              }}
            >
              {tr.quickLinks}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2"
                    style={{
                      color: "var(--koz-text-muted)",
                      fontSize: "13px",
                      fontWeight: 400,
                      transition: "color 160ms ease",
                    }}
                  >
                    <span
                      style={{
                        color: "var(--koz-gold)",
                        opacity: 0.3,
                        fontSize: "10px",
                        transition: "opacity 160ms ease",
                      }}
                    >
                      →
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Number Links */}
          <div>
            <h4
              style={{
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--koz-gold)",
                marginBottom: "1.25rem",
                paddingBottom: "0.75rem",
                borderBottom: "1px solid rgba(245,200,66,0.12)",
              }}
            >
              {tr.navNumbers}
            </h4>
            <ul className="space-y-3">
              {numberLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2"
                    style={{
                      color: "var(--koz-text-muted)",
                      fontSize: "13px",
                      fontWeight: 400,
                      transition: "color 160ms ease",
                    }}
                  >
                    <span
                      style={{
                        color: "var(--koz-gold)",
                        opacity: 0.3,
                        fontSize: "10px",
                      }}
                    >
                      →
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4
              style={{
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--koz-gold)",
                marginBottom: "1.25rem",
                paddingBottom: "0.75rem",
                borderBottom: "1px solid rgba(245,200,66,0.12)",
              }}
            >
              {tr.contactSupport}
            </h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2"
                    style={{
                      color: "var(--koz-text-muted)",
                      fontSize: "13px",
                      fontWeight: 400,
                      transition: "color 160ms ease",
                    }}
                  >
                    <span
                      style={{
                        color: "var(--koz-gold)",
                        opacity: 0.3,
                        fontSize: "10px",
                      }}
                    >
                      →
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-3 mt-16 pt-8"
          style={{ borderTop: "1px solid var(--koz-border)" }}
        >
          <p
            style={{
              color: "var(--koz-text-faint)",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            © {currentYear} Kozmograf. Tüm hakları saklıdır.
          </p>
          <p
            className="text-center italic"
            style={{
              color: "var(--koz-text-faint)",
              fontSize: "11px",
              fontFamily: "Cormorant Garamond, Georgia, serif",
              fontWeight: 400,
            }}
          >
            Numeroloji yorumları yalnızca kişisel keşif amaçlıdır.
          </p>
          <div className="flex gap-5">
            <Link
              href="/gizlilik"
              style={{
                color: "var(--koz-text-faint)",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                transition: "color 160ms ease",
              }}
            >
              Gizlilik
            </Link>
            <Link
              href="/kullanim-sartlari"
              style={{
                color: "var(--koz-text-faint)",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                transition: "color 160ms ease",
              }}
            >
              Şartlar
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}