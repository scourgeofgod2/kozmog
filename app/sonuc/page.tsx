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
      <div style={{ maxWidth: "480px", margin: "0 auto", textAlign: "center", padding: "64px 24px" }}>
        <div style={{
          background: "rgba(239,68,68,0.06)",
          border: "1px solid rgba(239,68,68,0.25)",
          padding: "32px",
        }}>
          <p style={{
            fontSize: "9px",
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#EF4444",
            margin: "0 0 8px",
            fontFamily: "var(--font-inter), sans-serif",
          }}>
            {tr.calculationErrorTitle}
          </p>
          <p style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: "1rem",
            fontStyle: "italic",
            color: "var(--koz-text-muted)",
            margin: "0 0 24px",
            lineHeight: 1.6,
          }}>
            {tr.calculationError}
          </p>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "var(--koz-gold)",
              color: "var(--koz-void)",
              fontWeight: 900,
              fontSize: "10px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              padding: "10px 20px",
              textDecoration: "none",
              fontFamily: "var(--font-inter), sans-serif",
            }}
          >
            <ArrowLeft style={{ width: "12px", height: "12px" }} />
            {tr.backToCalculator}
          </Link>
        </div>
      </div>
    );
  }

  const calculations = calculateAll(birthDate, fullName);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 0 64px" }}>
      <div style={{ marginBottom: "32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            color: "var(--koz-text-muted)",
            fontWeight: 700,
            fontSize: "10px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            textDecoration: "none",
            padding: "8px 14px",
            border: "1px solid var(--koz-border)",
            background: "transparent",
            transition: "border-color 180ms ease, color 180ms ease",
            fontFamily: "var(--font-inter), sans-serif",
          }}
          >
          <ArrowLeft style={{ width: "11px", height: "11px" }} />
          {tr.backToCalculator}
        </Link>

        {fullName && (
          <p style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: "0.875rem",
            fontStyle: "italic",
            color: "var(--koz-text-faint)",
            margin: 0,
          }}>
            {fullName}
            <span style={{ margin: "0 8px", opacity: 0.4 }}>·</span>
            {birthDate}
          </p>
        )}
      </div>

      <div style={{ marginBottom: "36px" }}>
        <p style={{
          fontSize: "9px",
          fontWeight: 700,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: "var(--koz-gold)",
          margin: "0 0 8px",
          fontFamily: "var(--font-inter), sans-serif",
        }}>
          Kozmograf Numeroloji
        </p>
        <h1 style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
          fontWeight: 600,
          fontStyle: "italic",
          color: "var(--koz-text)",
          margin: 0,
          letterSpacing: "-0.01em",
          lineHeight: 1.1,
        }}>
          {tr.numerologyReadingTitle}
        </h1>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <ResultCard calculations={calculations} fullName={fullName} />

        <AIStreamingReading
          birthDate={birthDate}
          fullName={fullName}
          calculations={calculations}
        />

        <div style={{
          background: "var(--koz-card)",
          border: "1px solid var(--koz-border)",
          padding: "20px 24px",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: "1px",
            background: "linear-gradient(90deg, transparent, var(--koz-border-bright) 50%, transparent)",
          }} />

          <p style={{
            fontSize: "9px",
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--koz-text-faint)",
            margin: "0 0 16px",
            fontFamily: "var(--font-inter), sans-serif",
          }}>
            {tr.quickActions}
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "8px",
          }}>
            <Link
              href="/uyumluluk"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                padding: "12px",
                border: "1px solid var(--koz-border)",
                background: "rgba(245,200,66,0.04)",
                color: "var(--koz-text-muted)",
                fontWeight: 700,
                fontSize: "9px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "border-color 180ms ease, color 180ms ease, background 180ms ease",
                fontFamily: "var(--font-inter), sans-serif",
              }}
            >
              <Heart style={{ width: "11px", height: "11px", color: "var(--koz-gold)" }} />
              {tr.checkCompatibility}
            </Link>

            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                padding: "12px",
                border: "1px solid var(--koz-border)",
                background: "rgba(124,58,237,0.04)",
                color: "var(--koz-text-muted)",
                fontWeight: 700,
                fontSize: "9px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "border-color 180ms ease, color 180ms ease, background 180ms ease",
                fontFamily: "var(--font-inter), sans-serif",
              }}
            >
              <RefreshCw style={{ width: "11px", height: "11px", color: "var(--koz-violet-bright)" }} />
              {tr.newCalculation}
            </Link>

            <ShareButton label={tr.shareResult} />
          </div>
        </div>
      </div>
    </div>
  );
}