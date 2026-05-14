import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowLeft, RefreshCw, Heart, Sparkles } from "lucide-react";
import { calculateAll } from "@/lib/numerology";
import { getReading } from "@/actions/getReading";
import ResultCard from "@/components/results/ResultCard";
import ReadingDisplay from "@/components/results/ReadingDisplay";
import ShareButton from "@/components/ui/ShareButton";
import { tr } from "@/content/tr";

// Vercel / Next.js route max duration (seconds)
export const maxDuration = 120;

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

// ─── AI Reading — ayrı async bileşen (Suspense ile sarılacak) ─────────────
async function AIReadingSection({
  birthDate,
  fullName,
  calculations,
}: {
  birthDate: string;
  fullName?: string;
  calculations: ReturnType<typeof calculateAll>;
}) {
  const readingResult = await getReading({
    birthDate,
    fullName,
    calculations,
    focus: "general",
  });

  if (readingResult.success && readingResult.data) {
    return (
      <ReadingDisplay
        interpretation={readingResult.data.interpretation}
        model={readingResult.data.model}
      />
    );
  }

  return (
    <div className="border-2 border-red-500 bg-red-50 p-6" style={{ boxShadow: "4px 4px 0px #000" }}>
      <h2 className="text-base font-black text-red-700 mb-1.5 uppercase tracking-wide">
        ⚠ {tr.calculationErrorTitle}
      </h2>
      <p className="text-red-600 text-sm font-medium">
        {readingResult.error ?? tr.calculationError}
      </p>
    </div>
  );
}

// ─── AI Loading Skeleton ──────────────────────────────────────────────────
function AIReadingSkeleton() {
  return (
    <div className="border-2 border-black bg-white p-6 animate-pulse" style={{ boxShadow: "4px 4px 0px #000" }}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-yellow-400 border-2 border-black flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-black" />
        </div>
        <div>
          <div className="h-5 bg-gray-200 rounded w-48 mb-1" />
          <div className="h-3 bg-gray-100 rounded w-32" />
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-100 rounded w-full" />
        <div className="h-4 bg-gray-100 rounded w-5/6" />
        <div className="h-4 bg-gray-100 rounded w-4/6" />
        <div className="h-4 bg-gray-100 rounded w-full" />
        <div className="h-4 bg-gray-100 rounded w-3/4" />
      </div>
      <p className="mt-6 text-xs text-gray-500 font-medium uppercase tracking-widest">
        AI yorumu hazırlanıyor...
      </p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────
export default async function SonucPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const birthDate = params.d;
  const fullName = params.n;

  if (!birthDate) {
    return (
      <div className="max-w-lg mx-auto text-center py-16">
        <div className="border-2 border-red-500 bg-red-50 p-8" style={{ boxShadow: "4px 4px 0px #000" }}>
          <h1 className="text-xl font-black text-red-700 mb-3 uppercase tracking-wide">
            {tr.calculationErrorTitle}
          </h1>
          <p className="text-red-600 mb-6 text-sm font-medium">
            {tr.calculationError}
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-yellow-400 border-2 border-black font-black px-5 py-2.5 text-black text-sm uppercase tracking-wide hover:translate-x-[2px] hover:translate-y-[2px] transition-transform"
            style={{ boxShadow: "3px 3px 0px #000" }}
          >
            <ArrowLeft className="w-4 h-4" />
            {tr.backToCalculator}
          </Link>
        </div>
      </div>
    );
  }

  const calculations = calculateAll(birthDate, fullName);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-black border-2 border-black bg-white px-3 py-1.5 uppercase tracking-wide hover:bg-yellow-400 transition-colors"
          style={{ boxShadow: "2px 2px 0px #000" }}
        >
          <ArrowLeft className="w-4 h-4" />
          {tr.backToCalculator}
        </Link>
      </div>

      {/* Page title */}
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-black uppercase">
          {tr.numerologyReadingTitle}
        </h1>
        {fullName && (
          <p className="text-gray-700 mt-1.5 text-sm font-medium">
            {fullName} · {birthDate}
          </p>
        )}
      </div>

      <div className="space-y-6">
        {/* Number cards — anlık render */}
        <ResultCard calculations={calculations} fullName={fullName} />

        {/* AI Reading — Suspense ile sarıldı */}
        <Suspense fallback={<AIReadingSkeleton />}>
          <AIReadingSection
            birthDate={birthDate}
            fullName={fullName}
            calculations={calculations}
          />
        </Suspense>

        {/* Quick Actions */}
        <div className="border-2 border-black bg-white p-5" style={{ boxShadow: "4px 4px 0px #000" }}>
          <h2 className="text-xs font-black text-black mb-4 uppercase tracking-widest">
            {tr.quickActions}
          </h2>
          <div className="grid sm:grid-cols-3 gap-3">
            <Link
              href="/uyumluluk"
              className="flex items-center justify-center gap-2 p-3 border-2 border-black bg-pink-100 font-bold text-black text-sm uppercase tracking-wide hover:bg-pink-300 hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              style={{ boxShadow: "3px 3px 0px #000" }}
            >
              <Heart className="w-4 h-4" />
              {tr.checkCompatibility}
            </Link>
            <Link
              href="/"
              className="flex items-center justify-center gap-2 p-3 border-2 border-black bg-violet-100 font-bold text-black text-sm uppercase tracking-wide hover:bg-violet-300 hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              style={{ boxShadow: "3px 3px 0px #000" }}
            >
              <RefreshCw className="w-4 h-4" />
              {tr.newCalculation}
            </Link>
            <ShareButton label={tr.shareResult} />
          </div>
        </div>
      </div>
    </div>
  );
}