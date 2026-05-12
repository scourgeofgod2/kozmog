"use client";

import { useEffect, useState } from "react";
import { tr } from "@/content/tr";

interface LoadingOverlayProps {
  visible: boolean;
}

export default function LoadingOverlay({ visible }: LoadingOverlayProps) {
  const [wisdomIndex, setWisdomIndex] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [titleIndex, setTitleIndex] = useState(0);

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

    return () => {
      clearInterval(msgInterval);
      clearInterval(wisdomInterval);
      clearInterval(titleInterval);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-2xl p-8 max-w-sm w-full mx-auto text-center shadow-2xl shadow-black/20">
        {/* Animated numbers */}
        <div className="flex justify-center gap-4 mb-6">
          {[
            { n: 1, color: "text-violet-500", delay: "0s" },
            { n: 2, color: "text-purple-500", delay: "0.15s" },
            { n: 3, color: "text-pink-500", delay: "0.3s" },
          ].map(({ n, color, delay }) => (
            <span
              key={n}
              className={`text-4xl font-bold ${color} animate-bounce`}
              style={{ animationDelay: delay }}
            >
              {n}
            </span>
          ))}
        </div>

        {/* Spinner */}
        <div className="flex justify-center mb-6">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-[3px] border-[hsl(var(--muted))] border-t-violet-500 border-r-purple-500 animate-spin" />
            <div
              className="absolute top-1/2 left-1/2 w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[hsl(var(--muted))] border-l-purple-500 animate-spin"
              style={{ animationDirection: "reverse", animationDuration: "1.2s" }}
            />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-1.5 min-h-[1.75rem] tracking-tight">
          {titles[titleIndex]}
        </h3>

        {/* Message */}
        <p className="text-[hsl(var(--muted-foreground))] text-sm mb-5 min-h-[1.25rem]">
          {messages[messageIndex]}
        </p>

        {/* Progress bar */}
        <div className="mb-5">
          <div className="bg-[hsl(var(--muted))] rounded-full h-1.5 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 loading-progress" />
          </div>
        </div>

        {/* Wisdom */}
        <div className="text-[hsl(var(--muted-foreground))] italic text-sm p-4 bg-[hsl(var(--muted))] rounded-xl min-h-[4rem] flex items-center justify-center border border-[hsl(var(--border))]">
          {tr.numerologyWisdoms[wisdomIndex]}
        </div>
      </div>

      <style>{`
        .loading-progress {
          animation: mysticalProgress 8s ease-in-out forwards;
        }
        @keyframes mysticalProgress {
          0% { width: 0%; }
          15% { width: 25%; }
          35% { width: 50%; }
          65% { width: 75%; }
          85% { width: 90%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}
