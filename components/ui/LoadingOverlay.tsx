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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-md w-full mx-auto text-center shadow-2xl">
        {/* Animasyonlu sayılar */}
        <div className="flex justify-center gap-3 mb-6">
          {[
            { n: 1, color: "text-indigo-600 dark:text-indigo-400", delay: "0s" },
            { n: 2, color: "text-purple-600 dark:text-purple-400", delay: "0.2s" },
            { n: 3, color: "text-pink-600 dark:text-pink-400", delay: "0.4s" },
          ].map(({ n, color, delay }) => (
            <span
              key={n}
              className={`text-5xl font-bold ${color} animate-bounce`}
              style={{ animationDelay: delay }}
            >
              {n}
            </span>
          ))}
        </div>

        {/* Cosmic Wheel */}
        <div className="flex justify-center mb-6">
          <div className="relative w-14 h-14">
            <div className="absolute inset-0 rounded-full border-4 border-indigo-200 dark:border-indigo-800 border-t-indigo-500 border-r-purple-500 animate-spin" />
            <div className="absolute top-1/2 left-1/2 w-7 h-7 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-purple-200 dark:border-purple-800 border-l-purple-500 animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.2s" }} />
          </div>
        </div>

        {/* Başlık */}
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2 min-h-[1.75rem]">
          {titles[titleIndex]}
        </h3>

        {/* Mesaj */}
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 min-h-[1.25rem]">
          {messages[messageIndex]}
        </p>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="bg-gray-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 loading-progress" />
          </div>
        </div>

        {/* Bilgelik mesajı */}
        <div className="text-slate-500 dark:text-slate-400 italic text-sm p-4 bg-indigo-50 dark:bg-slate-700/50 rounded-xl min-h-[4rem] flex items-center justify-center border border-indigo-100 dark:border-slate-600">
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