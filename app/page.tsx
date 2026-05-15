import type { Metadata } from "next";
import { Route, Heart, Briefcase, Gem, Star, BookOpen, ArrowRight } from "lucide-react";
import NumerologyForm from "@/components/forms/NumerologyForm";
import { tr } from "@/content/tr";

export const metadata: Metadata = {
  title: tr.seoTitle,
  description: tr.seoDescription,
  keywords: tr.seoKeywords,
  alternates: { canonical: "/" },
};

const featureCards = [
  {
    href: "/yasam-yolu",
    icon: <Route className="w-4 h-4" />,
    title: tr.quickLifePath,
    description: tr.discoverPurpose,
    bg: "bg-blue-400",
    accent: "#3B82F6",
  },
  {
    href: "/uyumluluk",
    icon: <Heart className="w-4 h-4" />,
    title: tr.loveCompatibility,
    description: tr.checkPartnerMatch,
    bg: "bg-pink-400",
    accent: "#EC4899",
  },
  {
    href: "/kariyer",
    icon: <Briefcase className="w-4 h-4" />,
    title: tr.careerGuide,
    description: tr.findIdealCareer,
    bg: "bg-violet-500",
    accent: "#8B5CF6",
  },
  {
    href: "/gucler",
    icon: <Gem className="w-4 h-4" />,
    title: tr.strengthsTalents,
    description: tr.discoverHiddenTalents,
    bg: "bg-orange-400",
    accent: "#F97316",
  },
  {
    href: "/yorumlar",
    icon: <BookOpen className="w-4 h-4" />,
    title: tr.detailedReadings,
    description: tr.deepPersonalityInsights,
    bg: "bg-emerald-400",
    accent: "#10B981",
  },
];

const numberTypes = [
  { icon: <Route className="w-4 h-4" />, bg: "bg-blue-400", desc: tr.lifePathDescription },
  { icon: <Star className="w-4 h-4" />, bg: "bg-violet-500", desc: tr.destinyNumberDescription },
  { icon: <Heart className="w-4 h-4" />, bg: "bg-pink-400", desc: tr.soulUrgeDescription },
  { icon: <Gem className="w-4 h-4" />, bg: "bg-[#FFCB00]", desc: tr.masterNumbersDescription },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Kozmograf Numeroloji",
      description: tr.siteDescription,
    },
    {
      "@type": "WebSite",
      name: "Kozmograf Numeroloji",
    },
    {
      "@type": "WebApplication",
      name: "Ücretsiz Numeroloji Hesaplayıcı",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web Browser",
      offers: { "@type": "Offer", price: "0", priceCurrency: "TRY" },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="text-center mb-12 fade-in-up">
        <div
          className="inline-flex items-center gap-2 bg-[#FFCB00] border-2 border-black px-4 py-1.5 mb-5"
          style={{ boxShadow: "3px 3px 0px #000" }}
        >
          <span className="text-black font-black text-[11px] uppercase tracking-[0.2em]">
            ✦ Ücretsiz Numeroloji Analizi
          </span>
        </div>

        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-black mb-5 leading-[1.05]">
          <span className="italic text-[#6D28D9]">{tr.siteTagline.split(" ").slice(0, 2).join(" ")}</span>
          {" "}
          <span className="not-italic">{tr.siteTagline.split(" ").slice(2).join(" ")}</span>
        </h1>

        <p className="text-gray-600 max-w-xl mx-auto text-base md:text-lg leading-relaxed font-medium">
          {tr.siteDescription}
        </p>

        {/* Stat row */}
        <div className="flex items-center justify-center gap-6 mt-7 flex-wrap">
          {[
            { val: "100%", label: "Ücretsiz" },
            { val: "6+", label: "Numeroloji Sayısı" },
            { val: "AI", label: "Destekli Yorum" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-2">
              <span
                className="text-sm font-black text-black bg-[#FFCB00] border-2 border-black px-2.5 py-0.5"
                style={{ boxShadow: "2px 2px 0px #000" }}
              >
                {stat.val}
              </span>
              <span className="text-sm text-gray-500 font-medium">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2 column layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Form + SEO Article */}
        <main id="numerology-form" className="w-full lg:w-2/3 space-y-8">
          <NumerologyForm />

          {/* SEO Article */}
          <div className="border-2 border-black bg-white overflow-hidden" style={{ boxShadow: "7px 7px 0px #000" }}>
            <div className="bg-[#0a0a0a] text-white p-6 border-b-2 border-black">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#FFCB00] border-2 border-[#FFCB00] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Star className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h2 className="text-xl font-black tracking-tight uppercase mb-1 font-display italic">
                    {tr.seoArticleTitle}
                  </h2>
                  <div
                    className="text-white/50 text-sm leading-relaxed font-medium"
                    dangerouslySetInnerHTML={{ __html: tr.seoArticleIntro }}
                  />
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-8">
              {/* Numeroloji Nedir */}
              <article>
                <h3 className="text-base font-black text-black mb-3 flex items-center gap-2 uppercase tracking-tight">
                  <span className="w-7 h-7 bg-[#FFCB00] border-2 border-black flex items-center justify-center flex-shrink-0">
                    <Star className="w-3.5 h-3.5 text-black" />
                  </span>
                  {tr.whatIsNumerology}
                </h3>
                <div
                  className="bg-yellow-50 p-4 border-l-4 border-[#FFCB00] border border-black/10 prose max-w-none text-sm"
                  dangerouslySetInnerHTML={{ __html: tr.whatIsNumerologyContent }}
                />
              </article>

              <div className="border-t-2 border-black/10" />

              {/* Yaşam Yolu */}
              <article>
                <h3 className="text-base font-black text-black mb-3 flex items-center gap-2 uppercase tracking-tight">
                  <span className="w-7 h-7 bg-blue-400 border-2 border-black flex items-center justify-center flex-shrink-0">
                    <Route className="w-3.5 h-3.5 text-black" />
                  </span>
                  {tr.lifePathNumberGuide}
                </h3>
                <div
                  className="bg-blue-50 p-4 border-l-4 border-blue-400 border border-black/10 prose max-w-none text-sm"
                  dangerouslySetInnerHTML={{ __html: tr.lifePathNumberGuideContent }}
                />
              </article>

              <div className="border-t-2 border-black/10" />

              {/* Usta Sayılar */}
              <article>
                <h3 className="text-base font-black text-black mb-3 flex items-center gap-2 uppercase tracking-tight">
                  <span className="w-7 h-7 bg-pink-400 border-2 border-black flex items-center justify-center flex-shrink-0">
                    <Star className="w-3.5 h-3.5 text-black" />
                  </span>
                  {tr.masterNumbersSection}
                </h3>
                <div
                  className="bg-pink-50 p-4 border-l-4 border-pink-400 border border-black/10 prose max-w-none text-sm"
                  dangerouslySetInnerHTML={{ __html: tr.masterNumbersContent }}
                />
              </article>

              <div className="border-t-2 border-black/10" />

              {/* Uyumluluk */}
              <article>
                <h3 className="text-base font-black text-black mb-3 flex items-center gap-2 uppercase tracking-tight">
                  <span className="w-7 h-7 bg-emerald-400 border-2 border-black flex items-center justify-center flex-shrink-0">
                    <Heart className="w-3.5 h-3.5 text-black" />
                  </span>
                  {tr.numerologyCompatibilityGuide}
                </h3>
                <div
                  className="bg-emerald-50 p-4 border-l-4 border-emerald-400 border border-black/10 prose max-w-none text-sm"
                  dangerouslySetInnerHTML={{ __html: tr.numerologyCompatibilityContent }}
                />
              </article>

              <div className="border-t-2 border-black/10" />

              {/* 2 columns */}
              <div className="grid md:grid-cols-2 gap-6">
                <article>
                  <h3 className="text-sm font-black text-black mb-2 uppercase tracking-tight">{tr.birthdayNumerology}</h3>
                  <div
                    className="bg-sky-50 p-4 border-l-4 border-sky-400 border border-black/10 prose max-w-none text-sm"
                    dangerouslySetInnerHTML={{ __html: tr.birthdayNumerologyContent }}
                  />
                </article>
                <article>
                  <h3 className="text-sm font-black text-black mb-2 uppercase tracking-tight">{tr.nameNumerology}</h3>
                  <div
                    className="bg-teal-50 p-4 border-l-4 border-teal-400 border border-black/10 prose max-w-none text-sm"
                    dangerouslySetInnerHTML={{ __html: tr.nameNumerologyContent }}
                  />
                </article>
              </div>

              <div className="border-t-2 border-black/10" />

              {/* Nasıl Hesaplanır */}
              <article>
                <h3 className="text-base font-black text-black mb-3 uppercase tracking-tight">{tr.howToCalculate}</h3>
                <div
                  className="bg-orange-50 p-4 border-l-4 border-orange-400 border border-black/10 prose max-w-none text-sm"
                  dangerouslySetInnerHTML={{ __html: tr.howToCalculateContent }}
                />
              </article>

              <div className="border-t-2 border-black/10" />

              {/* Faydalar */}
              <article>
                <h3 className="text-base font-black text-black mb-3 uppercase tracking-tight">{tr.numerologyBenefits}</h3>
                <div
                  className="bg-violet-50 p-4 border-l-4 border-violet-400 border border-black/10 prose max-w-none text-sm"
                  dangerouslySetInnerHTML={{ __html: tr.numerologyBenefitsContent }}
                />
              </article>
            </div>
          </div>
        </main>

        {/* Right: Sidebar */}
        <aside className="w-full lg:w-1/3 space-y-5">
          {/* Numeroloji Araçları */}
          <div className="border-2 border-black bg-white overflow-hidden" style={{ boxShadow: "6px 6px 0px #000" }}>
            <div className="bg-emerald-500 text-black p-4 border-b-2 border-black">
              <h2 className="text-sm font-black uppercase tracking-[0.12em] text-white">{tr.numerologyTools}</h2>
              <p className="text-white/70 text-xs mt-0.5 font-medium">{tr.exploreFeatures}</p>
            </div>
            <div className="p-3 space-y-2">
              {featureCards.map((card) => (
                <a
                  key={card.href}
                  href={card.href}
                  className="flex items-center gap-3 p-3 border-2 border-black bg-white neo-hover group"
                  style={{ boxShadow: "3px 3px 0px #000" }}
                >
                  <div className={`w-8 h-8 ${card.bg} border-2 border-black flex items-center justify-center flex-shrink-0`}>
                    {card.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black text-black uppercase tracking-tight truncate">{card.title}</p>
                    <p className="text-xs text-gray-500 font-medium truncate mt-0.5">{card.description}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-black/40 group-hover:text-black flex-shrink-0 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Numeroloji Temelleri */}
          <div className="border-2 border-black bg-white overflow-hidden" style={{ boxShadow: "6px 6px 0px #000" }}>
            <div className="bg-[#6D28D9] text-white p-4 border-b-2 border-black">
              <h2 className="text-sm font-black uppercase tracking-[0.12em]">{tr.numerologyBasics}</h2>
              <p className="text-violet-300 text-xs mt-0.5 font-medium">{tr.numerologyBasicsSubtitle}</p>
            </div>
            <div className="p-4">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">
                {tr.numberTypes}
              </p>
              <ul className="space-y-3">
                {numberTypes.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <div className={`w-7 h-7 ${item.bg} border-2 border-black flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      {item.icon}
                    </div>
                    <span className="text-sm text-black leading-snug font-medium">{item.desc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA band */}
            <div className="border-t-2 border-black bg-[#0a0a0a] p-4">
              <p className="text-white/50 text-xs font-medium mb-3 leading-relaxed">
                Tüm sayılarınızı tek seferde hesaplayın — ücretsiz ve sınırsız.
              </p>
              <a
                href="#numerology-form"
                className="flex items-center justify-center gap-2 w-full bg-[#FFCB00] border-2 border-[#FFCB00] text-black font-black text-xs uppercase tracking-widest py-2.5 hover:bg-yellow-300 transition-colors"
                style={{ boxShadow: "3px 3px 0px rgba(255,203,0,0.3)" }}
              >
                ✦ Şimdi Hesapla
              </a>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}