import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, RefreshCw, Heart, Share2 } from "lucide-react";
import { calculateAll } from "@/lib/numerology";
import { getReading } from "@/actions/getReading";
import ResultCard from "@/components/results/ResultCard";
import ReadingDisplay from "@/components/results/ReadingDisplay";
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

  // Parametre eksikse hata göster
  if (!birthDate) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-8">
          <h1 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-4">
            {tr.calculationErrorTitle}
          </h1>
          <p className="text-red-600 dark:text-red-300 mb-6">
            {tr.calculationError}
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {tr.backToCalculator}
          </Link>
        </div>
      </div>
    );
  }

  // Sayıları hesapla
  const calculations = calculateAll(birthDate, fullName);

  // Gemini'den yorum al
  const readingResult = await getReading({
    birthDate,
    fullName,
    calculations,
    focus: "general",
  });

  return (
    <div className="max-w-5xl mx-auto">
      {/* Geri butonu */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {tr.backToCalculator}
        </Link>
      </div>

      {/* Sayfa başlığı */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-indigo-700 dark:text-indigo-300">
          {tr.numerologyReadingTitle}
        </h1>
        {fullName && (
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            {fullName} • {birthDate}
          </p>
        )}
      </div>

      <div className="space-y-8">
        {/* Sayı kartları */}
        <ResultCard calculations={calculations} fullName={fullName} />

        {/* AI Yorumu veya Hata */}
        {readingResult.success && readingResult.data ? (
          <ReadingDisplay
            interpretation={readingResult.data.interpretation}
            model={readingResult.data.model}
          />
        ) : (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-2">
              {tr.calculationErrorTitle}
            </h2>
            <p className="text-red-600 dark:text-red-300 text-sm">
              {readingResult.error ?? tr.calculationError}
            </p>
          </div>
        )}

        {/* Hızlı İşlemler */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl shadow border border-indigo-100 dark:border-slate-700 p-6">
          <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-4">
            {tr.quickActions}
          </h2>
          <div className="grid sm:grid-cols-3 gap-3">
            <Link
              href="/uyumluluk"
              className="flex items-center justify-center gap-2 p-3 bg-pink-50 dark:bg-pink-900/20 hover:bg-pink-100 dark:hover:bg-pink-900/40 border border-pink-200 dark:border-pink-800 rounded-xl text-pink-700 dark:text-pink-300 font-medium text-sm transition-colors"
            >
              <Heart className="w-4 h-4" />
              {tr.checkCompatibility}
            </Link>
            <Link
              href="/"
              className="flex items-center justify-center gap-2 p-3 bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 border border-indigo-200 dark:border-indigo-800 rounded-xl text-indigo-700 dark:text-indigo-300 font-medium text-sm transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              {tr.newCalculation}
            </Link>
            <button
              onClick={() => {
                if (typeof window !== "undefined") {
                  navigator.clipboard.writeText(window.location.href);
                }
              }}
              className="flex items-center justify-center gap-2 p-3 bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-700 dark:text-emerald-300 font-medium text-sm transition-colors"
            >
              <Share2 className="w-4 h-4" />
              {tr.shareResult}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}