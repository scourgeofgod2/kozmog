import type { Metadata } from "next";
import { Route, Heart, Briefcase, Gem, Star, BookOpen } from "lucide-react";
import NumerologyForm from "@/components/forms/NumerologyForm";
import FeatureCard from "@/components/ui/FeatureCard";
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
    icon: <Route className="w-5 h-5 text-white" />,
    title: tr.quickLifePath,
    description: tr.discoverPurpose,
    colorFrom: "from-blue-500",
    colorTo: "to-indigo-600",
    borderColor: "border-blue-100 dark:border-slate-600",
    bgFrom: "from-blue-50",
    bgTo: "to-indigo-50 dark:from-slate-700 dark:to-slate-600",
  },
  {
    href: "/uyumluluk",
    icon: <Heart className="w-5 h-5 text-white" />,
    title: tr.loveCompatibility,
    description: tr.checkPartnerMatch,
    colorFrom: "from-pink-500",
    colorTo: "to-rose-600",
    borderColor: "border-pink-100 dark:border-slate-600",
    bgFrom: "from-pink-50",
    bgTo: "to-rose-50 dark:from-slate-700 dark:to-slate-600",
    external: true,
  },
  {
    href: "/kariyer",
    icon: <Briefcase className="w-5 h-5 text-white" />,
    title: tr.careerGuide,
    description: tr.findIdealCareer,
    colorFrom: "from-purple-500",
    colorTo: "to-violet-600",
    borderColor: "border-purple-100 dark:border-slate-600",
    bgFrom: "from-purple-50",
    bgTo: "to-violet-50 dark:from-slate-700 dark:to-slate-600",
    external: true,
  },
  {
    href: "/gucler",
    icon: <Gem className="w-5 h-5 text-white" />,
    title: tr.strengthsTalents,
    description: tr.discoverHiddenTalents,
    colorFrom: "from-amber-500",
    colorTo: "to-yellow-500",
    borderColor: "border-amber-100 dark:border-slate-600",
    bgFrom: "from-amber-50",
    bgTo: "to-yellow-50 dark:from-slate-700 dark:to-slate-600",
    external: true,
  },
  {
    href: "/yorumlar",
    icon: <BookOpen className="w-5 h-5 text-white" />,
    title: tr.detailedReadings,
    description: tr.deepPersonalityInsights,
    colorFrom: "from-emerald-500",
    colorTo: "to-teal-600",
    borderColor: "border-emerald-100 dark:border-slate-600",
    bgFrom: "from-emerald-50",
    bgTo: "to-teal-50 dark:from-slate-700 dark:to-slate-600",
    external: true,
  },
];

// JSON-LD Schema
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Kozmograf Numeroloji",
      url: "https://kozmograf.com",
      description: tr.siteDescription,
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
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero başlık */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-indigo-700 dark:text-indigo-300 mb-3">
          {tr.siteTagline}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          {tr.siteDescription}
        </p>
      </div>

      {/* 2 sütun layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sol: Form + SEO Makalesi */}
        <main className="w-full lg:w-2/3 space-y-8">
          <NumerologyForm />

          {/* SEO Makalesi */}
          <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden border border-indigo-100 dark:border-slate-700">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-6">
              <h2 className="text-2xl font-bold mb-1">{tr.seoArticleTitle}</h2>
              <div
                className="opacity-90"
                dangerouslySetInnerHTML={{ __html: tr.seoArticleIntro }}
              />
            </div>

            <div className="p-6 md:p-8 space-y-8">
              {/* Numeroloji Nedir */}
              <article>
                <h3 className="text-xl font-semibold text-indigo-700 dark:text-indigo-300 mb-3 flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  {tr.whatIsNumerology}
                </h3>
                <div
                  className="bg-indigo-50 dark:bg-slate-700/50 p-4 rounded-xl border-l-4 border-indigo-500 prose dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: tr.whatIsNumerologyContent }}
                />
              </article>

              {/* Yaşam Yolu */}
              <article>
                <h3 className="text-xl font-semibold text-purple-700 dark:text-purple-300 mb-3 flex items-center gap-2">
                  <Route className="w-5 h-5" />
                  {tr.lifePathNumberGuide}
                </h3>
                <div
                  className="bg-purple-50 dark:bg-slate-700/50 p-4 rounded-xl border-l-4 border-purple-500 prose dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: tr.lifePathNumberGuideContent }}
                />
              </article>

              {/* Usta Sayılar */}
              <article>
                <h3 className="text-xl font-semibold text-pink-700 dark:text-pink-300 mb-3 flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  {tr.masterNumbersSection}
                </h3>
                <div
                  className="bg-pink-50 dark:bg-slate-700/50 p-4 rounded-xl border-l-4 border-pink-500 prose dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: tr.masterNumbersContent }}
                />
              </article>

              {/* Uyumluluk */}
              <article>
                <h3 className="text-xl font-semibold text-emerald-700 dark:text-emerald-300 mb-3 flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  {tr.numerologyCompatibilityGuide}
                </h3>
                <div
                  className="bg-emerald-50 dark:bg-slate-700/50 p-4 rounded-xl border-l-4 border-emerald-500 prose dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: tr.numerologyCompatibilityContent }}
                />
              </article>

              {/* 2 kolon */}
              <div className="grid md:grid-cols-2 gap-6">
                <article>
                  <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-2">
                    {tr.birthdayNumerology}
                  </h3>
                  <div
                    className="bg-blue-50 dark:bg-slate-700/50 p-4 rounded-xl border-l-4 border-blue-500 prose dark:prose-invert max-w-none text-sm"
                    dangerouslySetInnerHTML={{ __html: tr.birthdayNumerologyContent }}
                  />
                </article>
                <article>
                  <h3 className="text-lg font-semibold text-teal-700 dark:text-teal-300 mb-2">
                    {tr.nameNumerology}
                  </h3>
                  <div
                    className="bg-teal-50 dark:bg-slate-700/50 p-4 rounded-xl border-l-4 border-teal-500 prose dark:prose-invert max-w-none text-sm"
                    dangerouslySetInnerHTML={{ __html: tr.nameNumerologyContent }}
                  />
                </article>
              </div>

              {/* Nasıl Hesaplanır */}
              <article>
                <h3 className="text-xl font-semibold text-orange-700 dark:text-orange-300 mb-3">
                  {tr.howToCalculate}
                </h3>
                <div
                  className="bg-orange-50 dark:bg-slate-700/50 p-4 rounded-xl border-l-4 border-orange-500 prose dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: tr.howToCalculateContent }}
                />
              </article>

              {/* Faydalar */}
              <article>
                <h3 className="text-xl font-semibold text-violet-700 dark:text-violet-300 mb-3">
                  {tr.numerologyBenefits}
                </h3>
                <div
                  className="bg-violet-50 dark:bg-slate-700/50 p-4 rounded-xl border-l-4 border-violet-500 prose dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: tr.numerologyBenefitsContent }}
                />
              </article>
            </div>
          </section>
        </main>

        {/* Sağ: Araçlar + Temel Bilgiler */}
        <aside className="w-full lg:w-1/3 space-y-6">
          {/* Numeroloji Araçları */}
          <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden border border-indigo-100 dark:border-slate-700">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-4">
              <h2 className="text-lg font-bold">{tr.numerologyTools}</h2>
              <p className="opacity-80 text-sm">{tr.exploreFeatures}</p>
            </div>
            <div className="p-4 space-y-3">
              {featureCards.map((card) => (
                <FeatureCard key={card.href} {...card} />
              ))}
            </div>
          </section>

          {/* Numeroloji Temelleri */}
          <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden border border-purple-100 dark:border-slate-700">
            <div className="bg-purple-600 text-white p-4">
              <h2 className="text-lg font-bold">{tr.numerologyBasics}</h2>
              <p className="opacity-80 text-sm">{tr.numerologyBasicsSubtitle}</p>
            </div>
            <div className="p-4 space-y-3 text-indigo-700 dark:text-indigo-300">
              <h3 className="font-semibold">{tr.numberTypes}</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Route className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                  <span>{tr.lifePathDescription}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                  <span>{tr.destinyNumberDescription}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Heart className="w-4 h-4 text-pink-500 mt-0.5 flex-shrink-0" />
                  <span>{tr.soulUrgeDescription}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Gem className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <span>{tr.masterNumbersDescription}</span>
                </li>
              </ul>
            </div>
          </section>
        </aside>
      </div>
    </>
  );
}
