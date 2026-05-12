import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, RefreshCw, Heart } from "lucide-react";
import { calculateAll } from "@/lib/numerology";
import { getReading } from "@/actions/getReading";
import ResultCard from "@/components/results/ResultCard";
import ReadingDisplay from "@/components/results/ReadingDisplay";
import { Card, CardContent } from "@/components/ui/card";
import ShareButton from "@/components/ui/ShareButton";
import { tr } from "@/content/tr";

interface PageProps {
  searchParams: Promise<{ d?: string; n?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const name = params.n;
  const title = name
    ? `${name} — ${tr.numerologyReadingTitle}`
    : tr.numerologyReadingTitle;

  return {
    title,
    description: tr.numerologyReadingDescription,
    robots: { index: false },
  };
}

export default async function SonucPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const birthDate = params.d;
  const fullName = params.n;

  if (!birthDate) {
    return (
      <div className="max-w-lg mx-auto text-center py-16">
        <Card className="border-destructive/30 bg-destructive/5">
          <CardContent className="p-8">
            <h1 className="text-xl font-semibold text-destructive mb-3">
              {tr.calculationErrorTitle}
            </h1>
            <p className="text-[hsl(var(--muted-foreground))] mb-6 text-sm">
              {tr.calculationError}
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-700 hover:to-purple-800 text-white font-semibold px-5 py-2.5 rounded-lg transition-all text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              {tr.backToCalculator}
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const calculations = calculateAll(birthDate, fullName);

  const readingResult = await getReading({
    birthDate,
    fullName,
    calculations,
    focus: "general",
  });

  return (
    <div className="max-w-5xl mx-auto">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {tr.backToCalculator}
        </Link>
      </div>

      {/* Page title */}
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          {tr.numerologyReadingTitle}
        </h1>
        {fullName && (
          <p className="text-[hsl(var(--muted-foreground))] mt-1.5 text-sm">
            {fullName} · {birthDate}
          </p>
        )}
      </div>

      <div className="space-y-6">
        {/* Number cards */}
        <ResultCard calculations={calculations} fullName={fullName} />

        {/* AI Reading or error */}
        {readingResult.success && readingResult.data ? (
          <ReadingDisplay
            interpretation={readingResult.data.interpretation}
            model={readingResult.data.model}
          />
        ) : (
          <Card className="border-destructive/30 bg-destructive/5">
            <CardContent className="p-6">
              <h2 className="text-base font-semibold text-destructive mb-1.5">
                {tr.calculationErrorTitle}
              </h2>
              <p className="text-[hsl(var(--muted-foreground))] text-sm">
                {readingResult.error ?? tr.calculationError}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <Card className="border-[hsl(var(--border))] shadow-sm">
          <CardContent className="p-5">
            <h2 className="text-sm font-semibold text-[hsl(var(--foreground))] mb-4 uppercase tracking-widest text-[hsl(var(--muted-foreground))]">
              {tr.quickActions}
            </h2>
            <div className="grid sm:grid-cols-3 gap-3">
              <Link
                href="/uyumluluk"
                className="flex items-center justify-center gap-2 p-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--muted))] hover:bg-pink-50 dark:hover:bg-pink-950/20 hover:border-pink-200 dark:hover:border-pink-800/60 text-[hsl(var(--foreground))] font-medium text-sm transition-all group"
              >
                <Heart className="w-4 h-4 text-pink-500 group-hover:scale-110 transition-transform" />
                {tr.checkCompatibility}
              </Link>
              <Link
                href="/"
                className="flex items-center justify-center gap-2 p-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--muted))] hover:bg-violet-50 dark:hover:bg-violet-950/20 hover:border-violet-200 dark:hover:border-violet-800/60 text-[hsl(var(--foreground))] font-medium text-sm transition-all group"
              >
                <RefreshCw className="w-4 h-4 text-violet-500 group-hover:rotate-180 transition-transform duration-300" />
                {tr.newCalculation}
              </Link>
              <ShareButton label={tr.shareResult} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}