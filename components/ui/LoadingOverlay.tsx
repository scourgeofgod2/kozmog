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
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div
        className="bg-yellow-400 border-2 border-black p-8 max-w-sm w-full mx-auto text-center"
        style={{ boxShadow: "8px 8px 0px #000" }}
      >
        {/* Animated numbers */}
        <div className="flex justify-center gap-3 mb-6">
          {[
            { n: 1, bg: "bg-black", text: "text-yellow-400", delay: "0s" },
            { n: 2, bg: "bg-white", text: "text-black", delay: "0.15s" },
            { n: 3, bg: "bg-black", text: "text-yellow-400", delay: "0.3s" },
          ].map(({ n, bg, text, delay }) => (
            <span
              key={n}
              className={`w-12 h-12 border-2 border-black ${bg} ${text} flex items-center justify-center text-2xl font-black animate-bounce`}
              style={{ animationDelay: delay }}
            >
              {n}
            </span>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mb-5">
          <div className="bg-black/20 border-2 border-black h-4 overflow-hidden">
            <div className="h-full bg-black loading-progress" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-black text-black mb-1.5 min-h-[1.75rem] tracking-tight uppercase">
          {titles[titleIndex]}
        </h3>

        {/* Message */}
        <p className="text-black/70 text-sm font-bold mb-5 min-h-[1.25rem]">
          {messages[messageIndex]}
        </p>

        {/* Wisdom */}
        <div
          className="text-black italic text-sm p-4 bg-white border-2 border-black min-h-[4rem] flex items-center justify-center font-medium"
        >
          {tr.numerologyWisdoms[wisdomIndex]}
        </div>
      </div>

      <style>{`
        .loading-progress {
          animation: neoBrutalProgress 8s ease-in-out forwards;
        }
        @keyframes neoBrutalProgress {
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
