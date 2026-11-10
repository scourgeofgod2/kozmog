"use client";

import { useEffect, useState } from "react";
import type { ReadingFocus } from "@/types/numerology";
import { markdownToHtml } from "@/lib/markdown";

interface Props {
  birthDate: string;
  fullName?: string;
  focus?: ReadingFocus;
}

export default function AIStreamingReading({ birthDate, fullName, focus }: Props) {
  const [rawText, setRawText] = useState("");
  const [status, setStatus] = useState<"loading" | "streaming" | "done" | "error">("loading");
  const [errorMsg, setErrorMsg] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function stream() {
      try {
        const res = await fetch("/api/reading", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ birthDate, fullName, focus: focus ?? "general" }),
          signal: controller.signal,
        });

        if (!res.ok || !res.body) {
          const data = await res.json().catch(() => ({}));
          setErrorMsg(data?.error ?? "Yorum şu anda hazırlanamadı.");
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
              if (parsed.text) setRawText((prev) => prev + parsed.text);
            } catch {
              // eksik satır
            }
          }
        }
        setStatus("done");
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        setErrorMsg("Bağlantı koptu. Tekrar dene.");
        setStatus("error");
      }
    }

    stream();
    return () => controller.abort();
  }, [birthDate, fullName, focus, attempt]);

  function retry() {
    setRawText("");
    setErrorMsg("");
    setStatus("loading");
    setAttempt((a) => a + 1);
  }

  return (
    <section aria-labelledby="yorum-baslik" className="rounded-[var(--radius-card)] border border-line bg-surface p-5 sm:p-8">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">Kişisel yorum</p>
          <h2 id="yorum-baslik" className="mt-1 font-display text-3xl font-semibold">
            Kozmograf diyor ki…
          </h2>
        </div>
        {status === "streaming" && (
          <span className="flex items-center gap-2 text-[13px] text-muted">
            <span className="h-2 w-2 animate-pulse rounded-full bg-gold" aria-hidden="true" />
            Yazıyor
          </span>
        )}
      </div>

      {status === "loading" && (
        <div className="space-y-3" aria-label="Yorum hazırlanıyor">
          <p className="text-[15px] text-muted">Sayıların okunuyor, yorumun hazırlanıyor…</p>
          {[92, 78, 86, 64, 88].map((w, i) => (
            <div key={i} className="koz-skeleton h-4 rounded-full" style={{ width: `${w}%` }} />
          ))}
        </div>
      )}

      {status === "error" && (
        <div role="alert" className="rounded-[var(--radius-tile)] border border-rose/40 bg-rose/10 p-5">
          <p className="text-[15px] text-text">{errorMsg}</p>
          <button
            type="button"
            onClick={retry}
            className="mt-4 inline-flex min-h-[44px] items-center rounded-full border border-line-strong px-5 text-[14px] font-semibold text-text hover:border-gold hover:text-gold"
          >
            Tekrar dene
          </button>
        </div>
      )}

      {(status === "streaming" || status === "done") && (
        <div className="koz-prose koz-fade-up">
          <div dangerouslySetInnerHTML={{ __html: markdownToHtml(rawText) }} />
          {status === "streaming" && <span className="koz-caret" aria-hidden="true" />}
        </div>
      )}

      {status === "done" && (
        <p className="mt-6 border-t border-line pt-4 text-[12px] text-faint">
          Bu yorum Pisagor numerolojisine dayanır ve yapay zekâ ile hazırlanır. Eğlence ve kişisel keşif amaçlıdır.
        </p>
      )}
    </section>
  );
}
