"use client";

import { useEffect, useState } from "react";
import { tr } from "@/content/tr";

interface LoadingOverlayProps {
  visible: boolean;
}

const DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const DIGIT_COLORS = [
  { hex: "#F5C842", dim: "rgba(245,200,66,0.15)", border: "rgba(245,200,66,0.4)" },
  { hex: "#7C3AED", dim: "rgba(124,58,237,0.15)", border: "rgba(124,58,237,0.4)" },
  { hex: "#C4B5FD", dim: "rgba(196,181,253,0.12)", border: "rgba(196,181,253,0.3)" },
  { hex: "#F5C842", dim: "rgba(245,200,66,0.15)", border: "rgba(245,200,66,0.4)" },
  { hex: "#7C3AED", dim: "rgba(124,58,237,0.15)", border: "rgba(124,58,237,0.4)" },
  { hex: "#C4B5FD", dim: "rgba(196,181,253,0.12)", border: "rgba(196,181,253,0.3)" },
  { hex: "#F5C842", dim: "rgba(245,200,66,0.15)", border: "rgba(245,200,66,0.4)" },
  { hex: "#7C3AED", dim: "rgba(124,58,237,0.15)", border: "rgba(124,58,237,0.4)" },
  { hex: "#C4B5FD", dim: "rgba(196,181,253,0.12)", border: "rgba(196,181,253,0.3)" },
];

export default function LoadingOverlay({ visible }: LoadingOverlayProps) {
  const [wisdomIndex, setWisdomIndex] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [titleIndex, setTitleIndex] = useState(0);
  const [tick, setTick] = useState(0);

  const titles = [
    tr.calculatingNumbers,
    tr.analyzingDestiny,
    tr.unveilingMysteries,
    tr.cosmicAlignment,
  ];

  const messages = [
    tr.pleaseWaitCalculating,
    tr.analyzingBirthDate,
    tr.calculatingLifePath,
    tr.generatingReading,
    tr.preparingInsights,
    tr.connectingCosmos,
  ];

  useEffect(() => {
    if (!visible) return;

    const msgInterval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % messages.length);
    }, 2000);

    const wisdomInterval = setInterval(() => {
      setWisdomIndex((i) => (i + 1) % tr.numerologyWisdoms.length);
    }, 4000);

    const titleInterval = setInterval(() => {
      setTitleIndex((i) => (i + 1) % titles.length);
    }, 6000);

    const tickInterval = setInterval(() => {
      setTick((t) => t + 1);
    }, 900);

    return () => {
      clearInterval(msgInterval);
      clearInterval(wisdomInterval);
      clearInterval(titleInterval);
      clearInterval(tickInterval);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  if (!visible) return null;

  const activeDigit = DIGITS[tick % DIGITS.length];
  const activeColor = DIGIT_COLORS[tick % DIGIT_COLORS.length];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(4,4,10,0.88)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <style>{`
        @keyframes kozPulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        @keyframes kozFadeSlide {
          0% { opacity: 0; transform: translateY(6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes kozProgressBar {
          0%   { width: 0%; }
          15%  { width: 18%; }
          35%  { width: 42%; }
          60%  { width: 65%; }
          80%  { width: 83%; }
          100% { width: 100%; }
        }
        @keyframes kozOrbit {
          0% { transform: rotate(0deg) translateX(22px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(22px) rotate(-360deg); }
        }
      `}</style>

      <div
        style={{
          background: "var(--koz-card, #0d0d1a)",
          border: "1px solid var(--koz-border, rgba(255,255,255,0.08))",
          borderRadius: "4px",
          padding: "2rem",
          maxWidth: "400px",
          width: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: `linear-gradient(90deg, transparent, ${activeColor.hex} 40%, var(--koz-violet, #7C3AED) 70%, transparent)`,
            transition: "background 0.9s ease",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "200px",
            height: "200px",
            background: `radial-gradient(circle, ${activeColor.dim} 0%, transparent 70%)`,
            pointerEvents: "none",
            transition: "background 0.9s ease",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.875rem",
            marginBottom: "1.5rem",
          }}
        >
          <div style={{ position: "relative", width: "36px", height: "36px", flexShrink: 0 }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: activeColor.dim,
                border: `1px solid ${activeColor.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.9s ease",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-playfair), 'Cormorant Garamond', serif",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: activeColor.hex,
                  lineHeight: 1,
                  transition: "color 0.9s ease",
                }}
              >
                {activeDigit}
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: activeColor.hex,
                marginTop: "-3px",
                marginLeft: "-3px",
                animation: "kozOrbit 2s linear infinite",
                transition: "background 0.9s ease",
              }}
            />
          </div>

          <div>
            <div
              style={{
                fontSize: "9px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--koz-text-faint, rgba(255,255,255,0.3))",
                fontFamily: "var(--font-inter), sans-serif",
                fontWeight: 500,
                marginBottom: "4px",
              }}
            >
              Kozmograf Numeroloji
            </div>
            <h3
              style={{
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: activeColor.hex,
                fontFamily: "var(--font-inter), sans-serif",
                margin: 0,
                animation: "kozFadeSlide 0.4s ease forwards",
                transition: "color 0.9s ease",
              }}
              key={titleIndex}
            >
              {titles[titleIndex]}
            </h3>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(9, 1fr)", gap: "4px", marginBottom: "1.25rem" }}>
          {DIGITS.map((n) => {
            const isActive = n === activeDigit;
            const col = DIGIT_COLORS[n - 1];
            return (
              <div
                key={n}
                style={{
                  height: "28px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "2px",
                  border: isActive ? `1px solid ${col.border}` : "1px solid rgba(255,255,255,0.06)",
                  background: isActive ? col.dim : "transparent",
                  transform: isActive ? "scale(1.12)" : "scale(1)",
                  transition: "all 0.3s ease",
                  fontFamily: "var(--font-playfair), 'Cormorant Garamond', serif",
                  fontSize: "13px",
                  fontWeight: isActive ? 700 : 400,
                  color: isActive ? col.hex : "rgba(255,255,255,0.2)",
                  animation: isActive ? "kozPulse 0.9s ease-in-out" : "none",
                }}
              >
                {n}
              </div>
            );
          })}
        </div>

        <div style={{ marginBottom: "1.25rem" }}>
          <div
            style={{
              height: "2px",
              background: "rgba(255,255,255,0.06)",
              borderRadius: "1px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                background: `linear-gradient(90deg, ${activeColor.hex}, var(--koz-violet, #7C3AED))`,
                animation: "kozProgressBar 10s ease-in-out forwards",
                transition: "background 0.9s ease",
              }}
            />
          </div>
        </div>

        <p
          style={{
            fontSize: "11px",
            letterSpacing: "0.04em",
            color: "var(--koz-text-muted, rgba(255,255,255,0.45))",
            fontFamily: "var(--font-inter), sans-serif",
            fontWeight: 400,
            margin: "0 0 1.25rem",
            minHeight: "1.2rem",
            animation: "kozFadeSlide 0.3s ease forwards",
          }}
          key={messageIndex}
        >
          {messages[messageIndex]}
        </p>

        <div
          style={{
            background: "rgba(255,255,255,0.025)",
            border: `1px solid ${activeColor.border}`,
            borderRadius: "2px",
            padding: "1rem 1.125rem",
            minHeight: "72px",
            display: "flex",
            alignItems: "center",
            transition: "border-color 0.9s ease",
          }}
          key={wisdomIndex}
        >
          <p
            style={{
              fontFamily: "var(--font-playfair), 'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "13px",
              lineHeight: 1.65,
              color: "var(--koz-text-muted, rgba(255,255,255,0.55))",
              margin: 0,
              animation: "kozFadeSlide 0.5s ease forwards",
            }}
          >
            {tr.numerologyWisdoms[wisdomIndex]}
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "1.25rem" }}>
          {[0, 1, 2, 3].map((i) => (
            <div
              key={`dot-${i}`}
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: i % 2 === 0 ? "var(--koz-gold, #F5C842)" : "var(--koz-violet, #7C3AED)",
                opacity: 0.6,
                animation: "bounce3 1.2s ease-in-out infinite",
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}