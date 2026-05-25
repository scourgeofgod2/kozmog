import type { Metadata } from "next";
import { Heart, Briefcase, Gem, Star, ArrowRight, Route, Sparkles } from "lucide-react";
import NumerologyForm from "@/components/forms/NumerologyForm";
import { tr } from "@/content/tr";

export const metadata: Metadata = {
  title: tr.seoTitle,
  description: tr.seoDescription,
  keywords: tr.seoKeywords,
  alternates: { canonical: "https://kozmograf.com" },
};

const featureCards = [
  {
    href: "/yasam-yolu",
    icon: <Route className="w-4 h-4" />,
    title: tr.quickLifePath,
    description: tr.discoverPurpose,
    accent: "#7C3AED",
  },
  {
    href: "/uyumluluk",
    icon: <Heart className="w-4 h-4" />,
    title: tr.loveCompatibility,
    description: tr.checkPartnerMatch,
    accent: "#DB2777",
  },
  {
    href: "/kariyer-numerolojisi",
    icon: <Briefcase className="w-4 h-4" />,
    title: tr.careerGuide,
    description: tr.findIdealCareer,
    accent: "#F5C842",
  },
  {
    href: "/gucler-ve-yetenekler",
    icon: <Gem className="w-4 h-4" />,
    title: tr.strengthsTalents,
    description: tr.discoverHiddenTalents,
    accent: "#059669",
  },
];

const numberTypes = [
  {
    icon: <Route className="w-3.5 h-3.5" />,
    label: "Yaşam Yolu",
    desc: tr.lifePathDescription,
    accent: "#7C3AED",
  },
  {
    icon: <Star className="w-3.5 h-3.5" />,
    label: "Kader Sayısı",
    desc: tr.destinyNumberDescription,
    accent: "#F5C842",
  },
  {
    icon: <Heart className="w-3.5 h-3.5" />,
    label: "Ruh Arzusu",
    desc: tr.soulUrgeDescription,
    accent: "#DB2777",
  },
  {
    icon: <Gem className="w-3.5 h-3.5" />,
    label: "Usta Sayılar",
    desc: tr.masterNumbersDescription,
    accent: "#059669",
  },
];

const cosmicStats = [
  { val: "100%", label: "Ücretsiz" },
  { val: "6+", label: "Sayı Türü" },
  { val: "AI", label: "Destekli" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Kozmograf Numeroloji",
      url: "https://kozmograf.com",
      description: tr.siteDescription,
      sameAs: ["https://kozmograf.com"],
    },
    {
      "@type": "WebSite",
      name: "Kozmograf Numeroloji",
      url: "https://kozmograf.com",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://kozmograf.com/?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "WebApplication",
      name: "Ücretsiz Numeroloji Hesaplayıcı",
      url: "https://kozmograf.com",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web Browser",
      offers: { "@type": "Offer", price: "0", priceCurrency: "TRY" },
    },
    {
      "@type": "Article",
      headline: "Numeroloji Nedir? Doğum Tarihi ile Ücretsiz Numeroloji Analizi Yap",
      description:
        "Numeroloji, sayıların mistik anlamlarını ve yaşamınızdaki etkilerini inceleyen kadim bir bilimdir. Doğum tarihi numeroloji hesaplama ile yaşam yolu sayınızı anında ücretsiz öğrenin.",
      url: "https://kozmograf.com",
      author: { "@type": "Organization", name: "Kozmograf", url: "https://kozmograf.com" },
      publisher: {
        "@type": "Organization",
        name: "Kozmograf Numeroloji",
        url: "https://kozmograf.com",
      },
      datePublished: "2024-01-01",
      dateModified: "2026-05-24",
      inLanguage: "tr",
      about: {
        "@type": "Thing",
        name: "Numeroloji",
        description:
          "Sayıların mistik anlamlarını ve yaşam üzerindeki etkilerini inceleyen kadim bilim dalı",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Numeroloji nedir?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Numeroloji, sayıların mistik anlamlarını ve evrenle olan bağlantılarını inceleyen kadim bir bilim dalıdır. Doğum tarihiniz ve isminiz gibi kişisel verileri sayılara dönüştürerek kişiliğiniz, yaşam amacınız ve potansiyeliniz hakkında derin içgörüler sunar.",
          },
        },
        {
          "@type": "Question",
          name: "Yaşam yolu sayısı nasıl hesaplanır?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yaşam yolu sayısı doğum tarihinizin tüm rakamları toplanarak hesaplanır. Örneğin 15.03.1990 için: 1+5+0+3+1+9+9+0=28, ardından 2+8=10, son olarak 1+0=1. Yaşam yolu sayınız 1'dir. 11, 22 ve 33 usta sayılar olduğundan bu sayılara ulaşıldığında indirgeme yapılmaz.",
          },
        },
        {
          "@type": "Question",
          name: "Numeroloji analizi ücretsiz mi?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Evet, Kozmograf Numeroloji üzerindeki tüm analizler tamamen ücretsizdir. Doğum tarihinizi ve adınızı girerek yaşam yolu sayısı, kader sayısı, ruh arzusu sayısı ve usta sayı analizlerini anında ve ücretsiz alabilirsiniz.",
          },
        },
        {
          "@type": "Question",
          name: "Kader sayısı ve yaşam yolu sayısı aynı mı?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Hayır, bunlar farklı sayılardır. Yaşam yolu sayısı doğum tarihinizden hesaplanır ve hayatta izlemeniz gereken yolu gösterir. Kader sayısı ise adınızın harflerinden elde edilir ve potansiyelinizi ile kişiliğinizi yansıtır.",
          },
        },
        {
          "@type": "Question",
          name: "Usta sayılar (master numbers) nedir?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Usta sayılar 11, 22 ve 33'tür. Bu sayılar, diğer sayıların taşıdığı enerjinin iki katını barındırır ve daha yüksek bir ruhsal potansiyele işaret eder. Hesaplama sırasında bu sayılara ulaşıldığında tek basamağa indirgeme yapılmaz.",
          },
        },
      ],
    },
  ],
};

export default function HomePage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ──────────────────────────────────────────────────────────
          CHAPTER 1 — HERO (deep void, radial glow from top)
      ────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden pb-20 pt-4"
        style={{
          background: "linear-gradient(180deg, rgba(124,58,237,0.08) 0%, transparent 60%)",
        }}
      >
        {/* Decorative orbit rings */}
        <div
          className="pointer-events-none absolute top-[-120px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] opacity-[0.07]"
          aria-hidden="true"
        >
          <div
            className="absolute inset-0 rounded-full orbit-spin"
            style={{ border: "1px solid #F5C842" }}
          />
          <div
            className="absolute inset-[50px] rounded-full orbit-spin-reverse"
            style={{ border: "1px solid #7C3AED" }}
          />
          <div
            className="absolute inset-[110px] rounded-full orbit-spin-slow"
            style={{ border: "1px solid #C4B5FD" }}
          />
        </div>

        {/* Floating star particles */}
        {[
          { top: "18%", left: "8%", delay: "0s", size: 3 },
          { top: "32%", left: "91%", delay: "1.2s", size: 2 },
          { top: "55%", left: "5%", delay: "0.6s", size: 2 },
          { top: "12%", left: "78%", delay: "1.8s", size: 3 },
          { top: "72%", left: "88%", delay: "0.9s", size: 2 },
        ].map((star, i) => (
          <div
            key={i}
            className="pointer-events-none absolute star-float"
            style={{
              top: star.top,
              left: star.left,
              animationDelay: star.delay,
            }}
            aria-hidden="true"
          >
            <div
              style={{
                width: star.size + "px",
                height: star.size + "px",
                borderRadius: "50%",
                background: "#F5C842",
                boxShadow: `0 0 ${star.size * 3}px rgba(245,200,66,0.6)`,
              }}
            />
          </div>
        ))}

        <div className="text-center fade-up relative z-10">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 mb-8 fade-up-d1">
            <div
              className="px-4 py-1.5 inline-flex items-center gap-2"
              style={{
                border: "1px solid rgba(245,200,66,0.25)",
                background: "rgba(245,200,66,0.05)",
              }}
            >
              <span style={{ color: "#F5C842", fontSize: "9px" }}>✦</span>
              <span
                style={{
                  color: "#F5C842",
                  fontSize: "9px",
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                }}
              >
                Ücretsiz Numeroloji Analizi
              </span>
            </div>
          </div>

          {/* Main headline */}
          <h1
            className="font-display fade-up-d2"
            style={{
              fontSize: "clamp(2.6rem, 7vw, 5.5rem)",
              fontWeight: 400,
              fontStyle: "italic",
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              color: "#EAE6FF",
              marginBottom: "0.3em",
              textShadow: "0 0 80px rgba(124,58,237,0.3)",
            }}
          >
            {tr.siteTagline.split(" ").slice(0, 2).join(" ")}
          </h1>
          <p
            className="font-display fade-up-d3"
            style={{
              fontSize: "clamp(2.6rem, 7vw, 5.5rem)",
              fontWeight: 600,
              fontStyle: "normal",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#F5C842",
              marginBottom: "1.5rem",
              textShadow: "0 0 60px rgba(245,200,66,0.2)",
            }}
          >
            {tr.siteTagline.split(" ").slice(2).join(" ")}
          </p>

          <p
            className="fade-up-d4 mx-auto"
            style={{
              color: "var(--koz-text-muted)",
              maxWidth: "520px",
              fontSize: "1rem",
              lineHeight: 1.8,
              fontWeight: 400,
              marginBottom: "2.5rem",
            }}
          >
            {tr.siteDescription}
          </p>

          {/* Cosmic stats row */}
          <div
            className="inline-flex items-center gap-8 fade-up-d5"
            style={{
              padding: "12px 28px",
              border: "1px solid var(--koz-border-bright)",
              background: "rgba(16,16,34,0.5)",
            }}
          >
            {cosmicStats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-0.5">
                <span
                  className="font-display"
                  style={{
                    color: "#F5C842",
                    fontSize: "1.4rem",
                    fontWeight: 600,
                    lineHeight: 1,
                  }}
                >
                  {stat.val}
                </span>
                <span
                  style={{
                    color: "var(--koz-text-muted)",
                    fontSize: "9px",
                    fontWeight: 600,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          CHAPTER 2 — FORM + SIDEBAR (dark surface)
      ────────────────────────────────────────────────────────── */}
      <section
        id="numerology-form"
        style={{
          background: "var(--koz-deep)",
          borderTop: "1px solid var(--koz-border)",
          borderBottom: "1px solid var(--koz-border)",
        }}
      >
        <div className="container mx-auto px-4 max-w-7xl py-16">
          <div className="flex flex-col lg:flex-row gap-10">

            {/* LEFT: Form */}
            <main className="w-full lg:w-[58%]">
              <div className="mb-6">
                <span
                  style={{
                    fontSize: "9px",
                    fontWeight: 700,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--koz-gold)",
                  }}
                >
                  ✦ Analizi Başlat
                </span>
                <h2
                  className="font-display mt-2"
                  style={{
                    fontSize: "1.8rem",
                    fontWeight: 500,
                    fontStyle: "italic",
                    color: "#EAE6FF",
                    lineHeight: 1.2,
                  }}
                >
                  Numeroloji Haritanı Keşfet
                </h2>
              </div>
              <NumerologyForm />
            </main>

            {/* RIGHT: Sidebar */}
            <aside className="w-full lg:w-[42%] space-y-5">

              {/* Araçlar kartı */}
              <div
                style={{
                  background: "var(--koz-card)",
                  border: "1px solid var(--koz-border)",
                }}
              >
                <div
                  className="px-5 py-4"
                  style={{ borderBottom: "1px solid var(--koz-border)" }}
                >
                  <span
                    style={{
                      fontSize: "9px",
                      fontWeight: 700,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "var(--koz-gold)",
                    }}
                  >
                    {tr.numerologyTools}
                  </span>
                  <p
                    style={{
                      color: "var(--koz-text-muted)",
                      fontSize: "12px",
                      marginTop: "2px",
                    }}
                  >
                    {tr.exploreFeatures}
                  </p>
                </div>
                <div className="p-3 space-y-1.5">
                  {featureCards.map((card) => (
                    <a
                      key={card.href}
                      href={card.href}
                      className="koz-card-hover flex items-center gap-3 p-3 group"
                      style={{
                        border: "1px solid var(--koz-border)",
                        background: "var(--koz-surface)",
                      }}
                    >
                      <div
                        className="w-7 h-7 flex items-center justify-center flex-shrink-0"
                        style={{
                          background: card.accent + "18",
                          border: `1px solid ${card.accent}40`,
                          color: card.accent,
                        }}
                      >
                        {card.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          style={{
                            fontSize: "12px",
                            fontWeight: 700,
                            color: "var(--koz-text)",
                            letterSpacing: "0.04em",
                            textTransform: "uppercase",
                          }}
                          className="truncate"
                        >
                          {card.title}
                        </p>
                        <p
                          style={{
                            fontSize: "11px",
                            color: "var(--koz-text-muted)",
                            marginTop: "1px",
                          }}
                          className="truncate"
                        >
                          {card.description}
                        </p>
                      </div>
                      <ArrowRight
                        className="w-3.5 h-3.5 flex-shrink-0 transition-transform group-hover:translate-x-1"
                        style={{ color: "var(--koz-text-faint)" }}
                      />
                    </a>
                  ))}
                </div>
              </div>

              {/* Numeroloji Temelleri */}
              <div
                style={{
                  background: "var(--koz-card)",
                  border: "1px solid var(--koz-border)",
                }}
              >
                <div
                  className="px-5 py-4"
                  style={{ borderBottom: "1px solid var(--koz-border)" }}
                >
                  <span
                    style={{
                      fontSize: "9px",
                      fontWeight: 700,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "var(--koz-gold)",
                    }}
                  >
                    {tr.numerologyBasics}
                  </span>
                  <p
                    style={{
                      color: "var(--koz-text-muted)",
                      fontSize: "12px",
                      marginTop: "2px",
                    }}
                  >
                    {tr.numerologyBasicsSubtitle}
                  </p>
                </div>
                <div className="p-4 space-y-4">
                  {numberTypes.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div
                        className="w-7 h-7 flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{
                          background: item.accent + "18",
                          border: `1px solid ${item.accent}40`,
                          color: item.accent,
                        }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <p
                          style={{
                            fontSize: "10px",
                            fontWeight: 700,
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            color: "var(--koz-text)",
                            marginBottom: "2px",
                          }}
                        >
                          {item.label}
                        </p>
                        <p
                          style={{
                            fontSize: "12px",
                            color: "var(--koz-text-muted)",
                            lineHeight: 1.6,
                          }}
                        >
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div
                  className="p-4"
                  style={{ borderTop: "1px solid var(--koz-border)" }}
                >
                  <p
                    style={{
                      fontSize: "12px",
                      color: "var(--koz-text-muted)",
                      marginBottom: "12px",
                      lineHeight: 1.6,
                    }}
                  >
                    Tüm sayılarınızı tek seferde hesaplayın — ücretsiz ve sınırsız.
                  </p>
                  <a href="#numerology-form" className="koz-btn-primary w-full">
                    <Sparkles className="w-3.5 h-3.5" />
                    Şimdi Hesapla
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          CHAPTER 2.5 — AI-EXTRACTABLE DEFINITION BLOCK
      ────────────────────────────────────────────────────────── */}
      <section
        style={{
          background: "var(--koz-void)",
          borderTop: "1px solid var(--koz-border)",
          borderBottom: "1px solid var(--koz-border)",
        }}
      >
        <div className="container mx-auto px-4 max-w-4xl py-16">
          <div className="fade-up">
            <span
              style={{
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--koz-gold)",
              }}
            >
              ✦ Numeroloji Nedir?
            </span>
            <h2
              className="font-display mt-3 mb-6"
              style={{
                fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
                fontWeight: 400,
                fontStyle: "italic",
                color: "#EAE6FF",
                lineHeight: 1.2,
              }}
            >
              Doğum Tarihinizle Ücretsiz Numeroloji Analizi Yapın
            </h2>

            <p
              style={{
                color: "var(--koz-text-muted)",
                fontSize: "1rem",
                lineHeight: 1.85,
                marginBottom: "1.25rem",
                maxWidth: "720px",
              }}
            >
              <strong style={{ color: "#EAE6FF" }}>Numeroloji</strong>, sayıların evrenle ve insan yaşamıyla olan mistik bağlantısını inceleyen kadim bir bilim dalıdır. Doğum tarihiniz ve isminiz sayılara dönüştürülerek kişiliğiniz, yaşam amacınız ve gizli potansiyeliniz ortaya çıkarılır.
            </p>

            <p
              style={{
                color: "var(--koz-text-muted)",
                fontSize: "1rem",
                lineHeight: 1.85,
                marginBottom: "1.25rem",
                maxWidth: "720px",
              }}
            >
              <strong style={{ color: "#EAE6FF" }}>Doğum tarihi numeroloji hesaplama</strong> yönteminde, doğum tarihinizdeki tüm rakamlar tek basamağa indirgenene kadar toplanır. Elde edilen sayı, yaşam yolu sayınızdır ve hayatta size rehberlik eden temel enerjiyi temsil eder. 11, 22 ve 33 usta sayılar bu kuralın istisnasıdır; bunlar indirgenmez.
            </p>

            <p
              style={{
                color: "var(--koz-text-muted)",
                fontSize: "1rem",
                lineHeight: 1.85,
                maxWidth: "720px",
              }}
            >
              Kozmograf'ta <strong style={{ color: "#EAE6FF" }}>numeroloji analizi</strong> tamamen ücretsizdir. Doğum tarihinizi ve adınızı girerek yaşam yolu sayısı, kader sayısı ve ruh arzusu sayısı analizlerinizi anında, kayıt gerektirmeden alabilirsiniz.
            </p>

            <div
              className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {[
                { label: "Yaşam Yolu Sayısı", desc: "Doğum tarihinden", accent: "#7C3AED" },
                { label: "Kader Sayısı", desc: "İsim harflerinden", accent: "#F5C842" },
                { label: "Ruh Arzusu", desc: "Sesli harflerden", accent: "#DB2777" },
                { label: "Usta Sayılar", desc: "11, 22 ve 33", accent: "#10B981" },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    background: "var(--koz-surface)",
                    border: `1px solid ${item.accent}30`,
                    padding: "14px 16px",
                  }}
                >
                  <div
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: item.accent,
                      marginBottom: "10px",
                    }}
                  />
                  <p
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#EAE6FF",
                      marginBottom: "3px",
                    }}
                  >
                    {item.label}
                  </p>
                  <p
                    style={{
                      fontSize: "11px",
                      color: "var(--koz-text-faint)",
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          CHAPTER 3 — SEO ARTICLE (void, editorial)
      ────────────────────────────────────────────────────────── */}
      <section style={{ background: "var(--koz-void)" }}>
        <div className="container mx-auto px-4 max-w-7xl py-20">

          {/* Chapter header */}
          <div className="mb-16 max-w-2xl">
            <span
              style={{
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--koz-gold)",
              }}
            >
              ✦ Numeroloji Rehberi
            </span>
            <h2
              className="font-display mt-3"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 400,
                fontStyle: "italic",
                color: "#EAE6FF",
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
              }}
            >
              {tr.seoArticleTitle}
            </h2>
            <div className="koz-rule mt-6" style={{ maxWidth: "200px" }} />
            <div
              className="mt-5 prose max-w-none"
              dangerouslySetInnerHTML={{ __html: tr.seoArticleIntro }}
            />
          </div>

          {/* Article grid */}
          <div className="space-y-0">

            {/* Numeroloji Nedir */}
            <article
              className="py-10"
              style={{ borderTop: "1px solid var(--koz-border)" }}
            >
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-7 h-7 flex items-center justify-center flex-shrink-0"
                      style={{
                        background: "rgba(245,200,66,0.1)",
                        border: "1px solid rgba(245,200,66,0.3)",
                        color: "#F5C842",
                      }}
                    >
                      <Star className="w-3.5 h-3.5" />
                    </div>
                    <h3
                      className="font-display"
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: 500,
                        fontStyle: "italic",
                        color: "#EAE6FF",
                      }}
                    >
                      {tr.whatIsNumerology}
                    </h3>
                  </div>
                </div>
                <div
                  className="md:w-2/3 prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: tr.whatIsNumerologyContent }}
                />
              </div>
            </article>

            {/* Yaşam Yolu */}
            <article
              className="py-10"
              style={{ borderTop: "1px solid var(--koz-border)" }}
            >
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-7 h-7 flex items-center justify-center flex-shrink-0"
                      style={{
                        background: "rgba(124,58,237,0.15)",
                        border: "1px solid rgba(124,58,237,0.35)",
                        color: "#9B59F5",
                      }}
                    >
                      <Route className="w-3.5 h-3.5" />
                    </div>
                    <h3
                      className="font-display"
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: 500,
                        fontStyle: "italic",
                        color: "#EAE6FF",
                      }}
                    >
                      {tr.lifePathNumberGuide}
                    </h3>
                  </div>
                </div>
                <div
                  className="md:w-2/3 prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: tr.lifePathNumberGuideContent }}
                />
              </div>
            </article>

            {/* Usta Sayılar */}
            <article
              className="py-10"
              style={{ borderTop: "1px solid var(--koz-border)" }}
            >
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-7 h-7 flex items-center justify-center flex-shrink-0"
                      style={{
                        background: "rgba(219,39,119,0.12)",
                        border: "1px solid rgba(219,39,119,0.3)",
                        color: "#EC4899",
                      }}
                    >
                      <Star className="w-3.5 h-3.5" />
                    </div>
                    <h3
                      className="font-display"
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: 500,
                        fontStyle: "italic",
                        color: "#EAE6FF",
                      }}
                    >
                      {tr.masterNumbersSection}
                    </h3>
                  </div>
                </div>
                <div
                  className="md:w-2/3 prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: tr.masterNumbersContent }}
                />
              </div>
            </article>

            {/* Uyumluluk */}
            <article
              className="py-10"
              style={{ borderTop: "1px solid var(--koz-border)" }}
            >
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-7 h-7 flex items-center justify-center flex-shrink-0"
                      style={{
                        background: "rgba(5,150,105,0.12)",
                        border: "1px solid rgba(5,150,105,0.3)",
                        color: "#10B981",
                      }}
                    >
                      <Heart className="w-3.5 h-3.5" />
                    </div>
                    <h3
                      className="font-display"
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: 500,
                        fontStyle: "italic",
                        color: "#EAE6FF",
                      }}
                    >
                      {tr.numerologyCompatibilityGuide}
                    </h3>
                  </div>
                </div>
                <div
                  className="md:w-2/3 prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: tr.numerologyCompatibilityContent }}
                />
              </div>
            </article>

            {/* 2-col: Doğum Günü + İsim */}
            <div
              className="py-10 grid md:grid-cols-2 gap-8"
              style={{ borderTop: "1px solid var(--koz-border)" }}
            >
              <article>
                <h3
                  className="font-display mb-4"
                  style={{
                    fontSize: "1rem",
                    fontWeight: 500,
                    fontStyle: "italic",
                    color: "#EAE6FF",
                    paddingBottom: "0.75rem",
                    borderBottom: "1px solid var(--koz-border)",
                  }}
                >
                  {tr.birthdayNumerology}
                </h3>
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: tr.birthdayNumerologyContent }}
                />
              </article>
              <article>
                <h3
                  className="font-display mb-4"
                  style={{
                    fontSize: "1rem",
                    fontWeight: 500,
                    fontStyle: "italic",
                    color: "#EAE6FF",
                    paddingBottom: "0.75rem",
                    borderBottom: "1px solid var(--koz-border)",
                  }}
                >
                  {tr.nameNumerology}
                </h3>
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: tr.nameNumerologyContent }}
                />
              </article>
            </div>

            {/* Nasıl Hesaplanır */}
            <article
              className="py-10"
              style={{ borderTop: "1px solid var(--koz-border)" }}
            >
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <h3
                    className="font-display"
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 500,
                      fontStyle: "italic",
                      color: "#EAE6FF",
                    }}
                  >
                    {tr.howToCalculate}
                  </h3>
                </div>
                <div
                  className="md:w-2/3 prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: tr.howToCalculateContent }}
                />
              </div>
            </article>

            {/* Faydalar */}
            <article
              className="py-10"
              style={{ borderTop: "1px solid var(--koz-border)" }}
            >
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <h3
                    className="font-display"
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 500,
                      fontStyle: "italic",
                      color: "#EAE6FF",
                    }}
                  >
                    {tr.numerologyBenefits}
                  </h3>
                </div>
                <div
                  className="md:w-2/3 prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: tr.numerologyBenefitsContent }}
                />
              </div>
            </article>

          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          CHAPTER 4 — CTA CLOSING (surface, violet glow)
      ────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "var(--koz-surface)",
          borderTop: "1px solid var(--koz-border)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background: "radial-gradient(ellipse 60% 80% at 50% 120%, rgba(124,58,237,0.14) 0%, transparent 70%)",
          }}
        />
        <div className="container mx-auto px-4 max-w-7xl py-24 text-center relative z-10">
          <span
            style={{
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--koz-gold)",
            }}
          >
            ✦ Başlamaya Hazır Mısın?
          </span>
          <h2
            className="font-display mt-4 mb-4"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 400,
              fontStyle: "italic",
              color: "#EAE6FF",
              lineHeight: 1.15,
            }}
          >
            Sayılarında Yazılı Olanı Keşfet
          </h2>
          <p
            className="mx-auto mb-10"
            style={{
              color: "var(--koz-text-muted)",
              maxWidth: "420px",
              fontSize: "0.95rem",
              lineHeight: 1.8,
            }}
          >
            Doğum tarihin ve ismin, yaşam yolun hakkında neler söylüyor?
          </p>
          <a href="#numerology-form" className="koz-btn-primary">
            <Sparkles className="w-4 h-4" />
            Ücretsiz Analiz Al
          </a>
        </div>
      </section>
    </div>
  );
}