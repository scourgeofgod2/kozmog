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
      <div style={{
        padding: "20px 24px",
        background: "rgba(239,68,68,0.06)",
        border: "1px solid rgba(239,68,68,0.25)",
        display: "flex",
        alignItems: "flex-start",
        gap: "10px",
      }}>
        <span style={{ color: "#EF4444", fontSize: "14px", flexShrink: 0, marginTop: "2px" }}>⚠</span>
        <div>
          <p style={{
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#EF4444",
              margin: 0,
              fontFamily: "var(--font-inter), sans-serif",
            }}>
              {tr.calculationErrorTitle}
            </p>
          <p style={{
              color: "#F87171",
              fontSize: "13px",
              fontWeight: 400,
              margin: "4px 0 0",
              lineHeight: 1.6,
              fontFamily: "var(--font-inter), sans-serif",
            }}>
            {errorMsg || tr.calculationError}
          </p>
        </div>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div style={{
        background: "var(--koz-card)",
        border: "1px solid var(--koz-border)",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent, var(--koz-violet) 40%, var(--koz-gold) 70%, transparent)",
        }} />

        <div style={{
          padding: "20px 24px 16px",
          borderBottom: "1px solid var(--koz-border)",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}>
          <div style={{
            width: "32px",
            height: "32px",
            border: "1px solid rgba(124,58,237,0.4)",
            background: "rgba(124,58,237,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}>
            <Sparkles style={{ width: "14px", height: "14px", color: "var(--koz-violet-bright)" }} />
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
            <div className="skeleton-shimmer" style={{ height: "10px", width: "160px", borderRadius: "2px" }} />
            <div className="skeleton-shimmer" style={{ height: "8px", width: "100px", borderRadius: "2px", opacity: 0.6 }} />
          </div>
        </div>

        <div style={{ padding: "24px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div className="skeleton-shimmer" style={{ height: "12px", width: "100%", borderRadius: "2px" }} />
            <div className="skeleton-shimmer" style={{ height: "12px", width: "92%", borderRadius: "2px" }} />
            <div className="skeleton-shimmer" style={{ height: "12px", width: "78%", borderRadius: "2px" }} />
          </div>
          <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <div className="skeleton-shimmer" style={{ height: "12px", width: "100%", borderRadius: "2px" }} />
            <div className="skeleton-shimmer" style={{ height: "12px", width: "85%", borderRadius: "2px" }} />
            <div className="skeleton-shimmer" style={{ height: "12px", width: "70%", borderRadius: "2px" }} />
            <div className="skeleton-shimmer" style={{ height: "12px", width: "100%", borderRadius: "2px" }} />
            <div className="skeleton-shimmer" style={{ height: "12px", width: "60%", borderRadius: "2px" }} />
          </div>
          <div style={{ marginTop: "24px", display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ display: "flex", gap: "5px" }}>
              {[0, 1, 2].map((i) => (
              <span
                key={`dot-${i}`}
                  style={{
                    display: "inline-block",
                    width: "5px",
                    height: "5px",
                    background: "var(--koz-violet-bright)",
                    borderRadius: "50%",
                    animation: "bounce3 1.2s ease-in-out infinite",
                    animationDelay: `${i * 0.18}s`,
                  }}
                />
              ))}
            </div>
            <span style={{
              fontSize: "10px",
              color: "var(--koz-text-faint)",
              letterSpacing: "0.08em",
              fontFamily: "var(--font-inter), sans-serif",
            }}>
              Kişisel yorumunuz hazırlanıyor…
            </span>
          </div>
        </div>
      </div>
    );
  }

  const html = markdownToHtml(rawText);

  return (
    <div style={{
      background: "var(--koz-card)",
      border: "1px solid var(--koz-border)",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: "1px",
        background: "linear-gradient(90deg, transparent, var(--koz-violet) 40%, var(--koz-gold) 70%, transparent)",
      }} />

      <div style={{
        position: "absolute",
        top: "-60px",
        right: "-60px",
        width: "180px",
        height: "180px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{
        padding: "20px 24px 16px",
        borderBottom: "1px solid var(--koz-border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "32px",
            height: "32px",
            border: "1px solid rgba(124,58,237,0.35)",
            background: "rgba(124,58,237,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}>
            <Sparkles style={{ width: "13px", height: "13px", color: "var(--koz-violet-bright)" }} />
          </div>
          <div>
            <p style={{
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--koz-violet-bright)",
              margin: 0,
              fontFamily: "var(--font-inter), sans-serif",
            }}>
              {tr.yourPersonalReading}
            </p>
            <p style={{
              fontSize: "9px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--koz-text-faint)",
              margin: "2px 0 0",
              fontWeight: 500,
              fontFamily: "var(--font-inter), sans-serif",
            }}>
              {tr.aiGeneratedInsights}
            </p>
          </div>
        </div>

        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          background: "rgba(124,58,237,0.08)",
          border: "1px solid rgba(124,58,237,0.2)",
          padding: "4px 10px",
          flexShrink: 0,
        }}>
          <Stars style={{ width: "10px", height: "10px", color: "var(--koz-star)" }} />
          <span style={{
            fontSize: "8px",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--koz-star)",
            fontFamily: "var(--font-inter), sans-serif",
          }}>
            Gemini AI
          </span>
        </div>
      </div>

      <div style={{ padding: "24px 28px" }}>
        <div
          className="prose"
          style={{ maxWidth: "none" }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
        {status === "streaming" && (
          <span style={{
            display: "inline-block",
            width: "2px",
            height: "16px",
            background: "var(--koz-violet-bright)",
            animation: "pulseGold 1s ease-in-out infinite",
            marginLeft: "2px",
            verticalAlign: "middle",
          }} />
        )}
      </div>

      <div style={{
        borderTop: "1px solid var(--koz-border)",
        padding: "10px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(8,8,16,0.4)",
      }}>
        <span style={{
          fontSize: "9px",
          color: "var(--koz-text-faint)",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          fontWeight: 600,
          fontFamily: "var(--font-inter), sans-serif",
        }}>
          ◦ Kişisel numeroloji yorumu
        </span>
        <span style={{
          fontSize: "9px",
          color: "var(--koz-text-faint)",
          letterSpacing: "0.06em",
          fontFamily: "var(--font-inter), sans-serif",
        }}>
          Yalnızca kişisel keşif amaçlıdır
        </span>
      </div>
    </div>
  );
}