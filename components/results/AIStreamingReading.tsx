"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles, Stars } from "lucide-react";
import { tr } from "@/content/tr";
import type { NumerologyCalculations, ReadingFocus } from "@/types/numerology";

interface Props {
  birthDate: string;
  fullName?: string;
  calculations: NumerologyCalculations;
  focus?: ReadingFocus;
}

function markdownToHtml(text: string): string {
  return text
    .replace(/^## (.+)$/gm, "<h3>$1</h3>")
    .replace(/^### (.+)$/gm, "<h4>$1</h4>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>\n?)+/g, "<ul>$&</ul>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/^(?!<[hul])(.+)$/gm, "<p>$1</p>")
    .replace(/<p><\/p>/g, "");
}

export default function AIStreamingReading({ birthDate, fullName, calculations, focus }: Props) {
  const [rawText, setRawText] = useState("");
  const [status, setStatus] = useState<"loading" | "streaming" | "done" | "error">("loading");
  const [errorMsg, setErrorMsg] = useState("");
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    abortRef.current = controller;

    async function stream() {
      try {
        const res = await fetch("/api/reading", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ birthDate, fullName, calculations, focus: focus ?? "general" }),
          signal: controller.signal,
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          setErrorMsg(data?.error ?? `HTTP ${res.status}`);
          setStatus("error");
          return;
        }

        if (!res.body) {
          setErrorMsg("Yanıt gövdesi boş.");
          setStatus("error");
          return;
        }

        setStatus("streaming");

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data: ")) continue;

            const data = trimmed.slice(6);
            if (data === "[DONE]") {
              setStatus("done");
              return;
            }

            try {
              const parsed = JSON.parse(data);
              if (parsed.error) {
                setErrorMsg(parsed.error);
                setStatus("error");
                return;
              }
              if (parsed.text) {
                setRawText((prev) => prev + parsed.text);
              }
            } catch {
              // skip malformed lines
            }
          }
        }

        setStatus("done");
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        setErrorMsg(err instanceof Error ? err.message : "Bilinmeyen hata.");
        setStatus("error");
      }
    }

    stream();

    return () => {
      controller.abort();
    };
  }, [birthDate, fullName, calculations, focus]);

  if (status === "error") {
    return (
      <div
        className="border-2 border-red-500 bg-red-50 p-6"
        style={{ boxShadow: "4px 4px 0px #000" }}
      >
        <h2 className="text-base font-black text-red-700 mb-1.5 uppercase tracking-wide">
          ⚠ {tr.calculationErrorTitle}
        </h2>
        <p className="text-red-600 text-sm font-medium">{errorMsg || tr.calculationError}</p>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div
        className="border-2 border-black bg-white overflow-hidden"
        style={{ boxShadow: "6px 6px 0px #000" }}
      >
        <div className="bg-[#6D28D9] p-5 border-b-2 border-black">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#FFCB00] border-2 border-white/30 flex items-center justify-center flex-shrink-0 pulse-ring">
              <Sparkles className="w-4 h-4 text-black" />
            </div>
            <div className="space-y-2">
              <div className="h-4 skeleton-shimmer w-44" />
              <div className="h-3 skeleton-shimmer w-28 opacity-60" />
            </div>
          </div>
        </div>
        <div className="p-6 md:p-8">
          <div className="space-y-3">
            <div className="h-4 skeleton-shimmer w-full" />
            <div className="h-4 skeleton-shimmer w-[92%]" />
            <div className="h-4 skeleton-shimmer w-[78%]" />
          </div>
          <div className="mt-6 space-y-3">
            <div className="h-4 skeleton-shimmer w-full" />
            <div className="h-4 skeleton-shimmer w-[85%]" />
            <div className="h-4 skeleton-shimmer w-[70%]" />
            <div className="h-4 skeleton-shimmer w-full" />
            <div className="h-4 skeleton-shimmer w-[60%]" />
          </div>
          <div className="mt-8 flex items-center gap-3">
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-2 h-2 bg-[#6D28D9] rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
            <span className="text-xs text-gray-400 font-medium">
              Kişisel yorumunuz hazırlanıyor
            </span>
          </div>
        </div>
      </div>
    );
  }

  const html = markdownToHtml(rawText);

  return (
    <div
      className="border-2 border-black bg-white overflow-hidden"
      style={{ boxShadow: "7px 7px 0px #000" }}
    >
      <div className="bg-[#6D28D9] text-white p-5 border-b-2 border-black">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 bg-[#FFCB00] border-2 border-white/20 flex items-center justify-center flex-shrink-0"
              style={{ boxShadow: "2px 2px 0px rgba(0,0,0,0.3)" }}
            >
              <Sparkles className="w-5 h-5 text-black" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight uppercase leading-tight">
                {tr.yourPersonalReading}
              </h2>
              <p className="text-violet-300 text-[11px] font-medium mt-0.5 uppercase tracking-[0.12em]">
                {tr.aiGeneratedInsights}
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 bg-white/10 border border-white/20 px-2.5 py-1.5 flex-shrink-0">
            <Stars className="w-3 h-3 text-violet-300" />
            <span className="text-[10px] text-violet-300 font-bold uppercase tracking-wider">
              Gemini AI
            </span>
          </div>
        </div>
      </div>

      <div className="flex h-1">
        <div className="flex-1 bg-[#FFCB00]" />
        <div className="flex-1 bg-[#FF4F1F]" />
        <div className="flex-1 bg-[#6D28D9]" />
        <div className="flex-1 bg-[#059669]" />
      </div>

      <div className="p-6 md:p-8">
        <div
          className="prose max-w-none text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        {status === "streaming" && (
          <span className="inline-block w-0.5 h-4 bg-[#6D28D9] animate-pulse ml-0.5 align-middle" />
        )}
      </div>

      <div className="border-t-2 border-black/8 bg-gray-50 px-6 py-3 flex items-center justify-between">
        <span className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">
          ✦ Kişisel numeroloji yorumu
        </span>
        <span className="text-[10px] text-gray-400 font-medium">
          Yalnızca kişisel keşif amaçlıdır
        </span>
      </div>
    </div>
  );
}
