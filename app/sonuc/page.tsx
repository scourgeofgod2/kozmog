import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, RefreshCw, Heart } from "lucide-react";
import { calculateAll } from "@/lib/numerology";
import ResultCard from "@/components/results/ResultCard";
import AIStreamingReading from "@/components/results/AIStreamingReading";
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
        <div className="border-2 border-red-500 bg-red-50 p-8" style={{ boxShadow: "4px 4px 0px #000" }}>
          <h1 className="text-xl font-black text-red-700 mb-3 uppercase tracking-wide">
            {tr.calculationErrorTitle}
          </h1>
          <p className="text-red-600 mb-6 text-sm font-medium">
            {tr.calculationError}
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#FFCB00] border-2 border-black font-black px-5 py-2.5 text-black text-sm uppercase tracking-wide neo-hover"
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
      <div className="mb-7">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-black border-2 border-black bg-white px-3 py-1.5 uppercase tracking-wide hover:bg-[#FFCB00] transition-colors neo-hover"
          style={{ boxShadow: "2px 2px 0px #000" }}
        >
          <ArrowLeft className="w-4 h-4" />
          {tr.backToCalculator}
        </Link>
      </div>

      {/* Page title */}
      <div className="text-center mb-9">
        <h1 className="font-display text-3xl md:text-4xl font-black tracking-tight text-black italic">
          {tr.numerologyReadingTitle}
        </h1>
        {fullName && (
          <p className="text-gray-500 mt-2 text-sm font-medium">
            <span className="font-black text-black">{fullName}</span>
            <span className="mx-2 text-gray-300">·</span>
            {birthDate}
          </p>
        )}
      </div>

      <div className="space-y-6">
        <ResultCard calculations={calculations} fullName={fullName} />

        <AIStreamingReading
          birthDate={birthDate}
          fullName={fullName}
          calculations={calculations}
        />

        {/* Quick Actions */}
        <div className="border-2 border-black bg-white p-5" style={{ boxShadow: "5px 5px 0px #000" }}>
          <p className="text-[10px] font-black text-gray-400 mb-4 uppercase tracking-[0.2em]">
            {tr.quickActions}
          </p>
          <div className="grid sm:grid-cols-3 gap-3">
            <Link
              href="/uyumluluk"
              className="flex items-center justify-center gap-2 p-3 border-2 border-black bg-pink-50 font-bold text-black text-sm uppercase tracking-wide hover:bg-pink-200 neo-hover"
              style={{ boxShadow: "3px 3px 0px #000" }}
            >
              <Heart className="w-4 h-4" />
              {tr.checkCompatibility}
            </Link>
            <Link
              href="/"
              className="flex items-center justify-center gap-2 p-3 border-2 border-black bg-violet-50 font-bold text-black text-sm uppercase tracking-wide hover:bg-violet-200 neo-hover"
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