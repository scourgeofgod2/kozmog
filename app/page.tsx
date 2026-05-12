import type { Metadata } from "next";
import { Route, Heart, Briefcase, Gem, Star, BookOpen } from "lucide-react";
import NumerologyForm from "@/components/forms/NumerologyForm";
import FeatureCard from "@/components/ui/FeatureCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
    icon: <Route className="w-4 h-4 text-white" />,
    title: tr.quickLifePath,
    description: tr.discoverPurpose,
    colorFrom: "from-blue-500",
    colorTo: "to-indigo-600",
  },
  {
    href: "/uyumluluk",
    icon: <Heart className="w-4 h-4 text-white" />,
    title: tr.loveCompatibility,
    description: tr.checkPartnerMatch,
    colorFrom: "from-pink-500",
    colorTo: "to-rose-600",
    external: true,
  },
  {
    href: "/kariyer",
    icon: <Briefcase className="w-4 h-4 text-white" />,
    title: tr.careerGuide,
    description: tr.findIdealCareer,
    colorFrom: "from-violet-500",
    colorTo: "to-purple-600",
    external: true,
  },
  {
    href: "/gucler",
    icon: <Gem className="w-4 h-4 text-white" />,
    title: tr.strengthsTalents,
    description: tr.discoverHiddenTalents,
    colorFrom: "from-amber-500",
    colorTo: "to-orange-500",
    external: true,
  },
  {
    href: "/yorumlar",
    icon: <BookOpen className="w-4 h-4 text-white" />,
    title: tr.detailedReadings,
    description: tr.deepPersonalityInsights,
    colorFrom: "from-emerald-500",
    colorTo: "to-teal-600",
    external: true,
  },
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
      <div className="text-center mb-10">
        <Badge
          variant="secondary"
          className="mb-4 px-3 py-1 text-xs font-medium bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-800"
        >
          ✦ Ücretsiz Numeroloji Analizi
        </Badge>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[hsl(var(--foreground))] mb-4">
          {tr.siteTagline}
        </h1>
        <p className="text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          {tr.siteDescription}
        </p>
      </div>

      {/* 2 column layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Form + SEO Article */}
        <main className="w-full lg:w-2/3 space-y-8">
          <NumerologyForm />

          {/* SEO Article */}
          <Card className="overflow-hidden border-[hsl(var(--border))] shadow-sm">
            <CardHeader className="p-0">
              <div className="bg-gradient-to-br from-violet-600 via-purple-600 to-purple-700 p-6 text-white">
                <h2 className="text-xl font-semibold tracking-tight mb-1">{tr.seoArticleTitle}</h2>
                <div
                  className="text-violet-200 text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: tr.seoArticleIntro }}
                />
              </div>
            </CardHeader>

            <CardContent className="p-6 md:p-8 space-y-8">
              {/* Numeroloji Nedir */}
              <article>
                <h3 className="text-base font-semibold text-[hsl(var(--foreground))] mb-3 flex items-center gap-2">
                  <Star className="w-4 h-4 text-violet-500" />
                  {tr.whatIsNumerology}
                </h3>
                <div
                  className="bg-violet-50/60 dark:bg-violet-950/20 p-4 rounded-xl border-l-[3px] border-violet-400 prose dark:prose-invert max-w-none text-sm"
                  dangerouslySetInnerHTML={{ __html: tr.whatIsNumerologyContent }}
                />
              </article>

              <Separator className="bg-[hsl(var(--border))]" />

              {/* Yaşam Yolu */}
              <article>
                <h3 className="text-base font-semibold text-[hsl(var(--foreground))] mb-3 flex items-center gap-2">
                  <Route className="w-4 h-4 text-blue-500" />
                  {tr.lifePathNumberGuide}
                </h3>
                <div
                  className="bg-blue-50/60 dark:bg-blue-950/20 p-4 rounded-xl border-l-[3px] border-blue-400 prose dark:prose-invert max-w-none text-sm"
                  dangerouslySetInnerHTML={{ __html: tr.lifePathNumberGuideContent }}
                />
              </article>

              <Separator className="bg-[hsl(var(--border))]" />

              {/* Usta Sayılar */}
              <article>
                <h3 className="text-base font-semibold text-[hsl(var(--foreground))] mb-3 flex items-center gap-2">
                  <Star className="w-4 h-4 text-pink-500" />
                  {tr.masterNumbersSection}
                </h3>
                <div
                  className="bg-pink-50/60 dark:bg-pink-950/20 p-4 rounded-xl border-l-[3px] border-pink-400 prose dark:prose-invert max-w-none text-sm"
                  dangerouslySetInnerHTML={{ __html: tr.masterNumbersContent }}
                />
              </article>

              <Separator className="bg-[hsl(var(--border))]" />

              {/* Uyumluluk */}
              <article>
                <h3 className="text-base font-semibold text-[hsl(var(--foreground))] mb-3 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-emerald-500" />
                  {tr.numerologyCompatibilityGuide}
                </h3>
                <div
                  className="bg-emerald-50/60 dark:bg-emerald-950/20 p-4 rounded-xl border-l-[3px] border-emerald-400 prose dark:prose-invert max-w-none text-sm"
                  dangerouslySetInnerHTML={{ __html: tr.numerologyCompatibilityContent }}
                />
              </article>

              <Separator className="bg-[hsl(var(--border))]" />

              {/* 2 columns */}
              <div className="grid md:grid-cols-2 gap-6">
                <article>
                  <h3 className="text-sm font-semibold text-[hsl(var(--foreground))] mb-2">
                    {tr.birthdayNumerology}
                  </h3>
                  <div
                    className="bg-sky-50/60 dark:bg-sky-950/20 p-4 rounded-xl border-l-[3px] border-sky-400 prose dark:prose-invert max-w-none text-sm"
                    dangerouslySetInnerHTML={{ __html: tr.birthdayNumerologyContent }}
                  />
                </article>
                <article>
                  <h3 className="text-sm font-semibold text-[hsl(var(--foreground))] mb-2">
                    {tr.nameNumerology}
                  </h3>
                  <div
                    className="bg-teal-50/60 dark:bg-teal-950/20 p-4 rounded-xl border-l-[3px] border-teal-400 prose dark:prose-invert max-w-none text-sm"
                    dangerouslySetInnerHTML={{ __html: tr.nameNumerologyContent }}
                  />
                </article>
              </div>

              <Separator className="bg-[hsl(var(--border))]" />

              {/* Nasıl Hesaplanır */}
              <article>
                <h3 className="text-base font-semibold text-[hsl(var(--foreground))] mb-3">
                  {tr.howToCalculate}
                </h3>
                <div
                  className="bg-orange-50/60 dark:bg-orange-950/20 p-4 rounded-xl border-l-[3px] border-orange-400 prose dark:prose-invert max-w-none text-sm"
                  dangerouslySetInnerHTML={{ __html: tr.howToCalculateContent }}
                />
              </article>

              <Separator className="bg-[hsl(var(--border))]" />

              {/* Faydalar */}
              <article>
                <h3 className="text-base font-semibold text-[hsl(var(--foreground))] mb-3">
                  {tr.numerologyBenefits}
                </h3>
                <div
                  className="bg-violet-50/60 dark:bg-violet-950/20 p-4 rounded-xl border-l-[3px] border-violet-400 prose dark:prose-invert max-w-none text-sm"
                  dangerouslySetInnerHTML={{ __html: tr.numerologyBenefitsContent }}
                />
              </article>
            </CardContent>
          </Card>
        </main>

        {/* Right: Sidebar */}
        <aside className="w-full lg:w-1/3 space-y-5">
          {/* Numeroloji Araçları */}
          <Card className="overflow-hidden border-[hsl(var(--border))] shadow-sm">
            <CardHeader className="p-0">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-4 text-white">
                <h2 className="text-base font-semibold">{tr.numerologyTools}</h2>
                <p className="text-emerald-100 text-xs mt-0.5">{tr.exploreFeatures}</p>
              </div>
            </CardHeader>
            <CardContent className="p-3 space-y-2">
              {featureCards.map((card) => (
                <FeatureCard key={card.href} {...card} />
              ))}
            </CardContent>
          </Card>

          {/* Numeroloji Temelleri */}
          <Card className="overflow-hidden border-[hsl(var(--border))] shadow-sm">
            <CardHeader className="p-0">
              <div className="bg-gradient-to-br from-violet-600 to-purple-700 p-4 text-white">
                <h2 className="text-base font-semibold">{tr.numerologyBasics}</h2>
                <p className="text-violet-200 text-xs mt-0.5">{tr.numerologyBasicsSubtitle}</p>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <h3 className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-widest mb-3">
                {tr.numberTypes}
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Route className="w-3.5 h-3.5 text-blue-500" />
                  </div>
                  <span className="text-sm text-[hsl(var(--foreground))] leading-snug">{tr.lifePathDescription}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-violet-100 dark:bg-violet-950/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Star className="w-3.5 h-3.5 text-violet-500" />
                  </div>
                  <span className="text-sm text-[hsl(var(--foreground))] leading-snug">{tr.destinyNumberDescription}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-pink-100 dark:bg-pink-950/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Heart className="w-3.5 h-3.5 text-pink-500" />
                  </div>
                  <span className="text-sm text-[hsl(var(--foreground))] leading-snug">{tr.soulUrgeDescription}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-950/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Gem className="w-3.5 h-3.5 text-amber-500" />
                  </div>
                  <span className="text-sm text-[hsl(var(--foreground))] leading-snug">{tr.masterNumbersDescription}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </aside>
      </div>
    </>
  );
}