"use client";

import { useEffect, useState } from "react";
import { tr } from "@/content/tr";

interface LoadingOverlayProps {
  visible: boolean;
}

const DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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

  return (
    <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 backdrop-blur-[2px]">
      <div
        className="bg-[#FFCB00] border-2 border-black p-7 max-w-sm w-full mx-auto"
        style={{ boxShadow: "10px 10px 0px #000" }}
      >
        {/* Number grid */}
        <div className="grid grid-cols-9 gap-1 mb-6">
          {DIGITS.map((n) => (
            <div
              key={n}
              className={`h-7 flex items-center justify-center text-xs font-black border transition-all duration-300 ${
                n === activeDigit
                  ? "bg-black text-[#FFCB00] border-black scale-110"
                  : "bg-white/40 text-black/50 border-black/20"
              }`}
            >
              {n}
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mb-5">
          <div className="bg-black/20 border-2 border-black h-3 overflow-hidden">
            <div className="h-full bg-black loading-progress" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-black text-black mb-1 min-h-[1.5rem] tracking-tight uppercase">
          {titles[titleIndex]}
        </h3>

        {/* Message */}
        <p className="text-black/60 text-sm font-bold mb-5 min-h-[1.25rem]">
          {messages[messageIndex]}
        </p>

        {/* Wisdom */}
        <div className="bg-[#0a0a0a] border-2 border-black p-4 min-h-[4.5rem] flex items-center">
          <p className="text-[#FFCB00] italic text-sm leading-relaxed font-medium">
            {tr.numerologyWisdoms[wisdomIndex]}
          </p>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1.5 mt-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 bg-black animate-bounce"
              style={{ animationDelay: `${i * 0.12}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}