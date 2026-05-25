"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, User, Sparkles, X } from "lucide-react";
import { tr } from "@/content/tr";
import { calculateNumerology } from "@/actions/calculate";
import LoadingOverlay from "@/components/ui/LoadingOverlay";

export default function NumerologyForm() {
  const router = useRouter();
  const [birthDate, setBirthDate] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const today = new Date().toISOString().split("T")[0];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!birthDate) {
      setError(tr.birthDateRequired);
      return;
    }
    if (birthDate > today) {
      setError(tr.futureDateError);
      return;
    }

    setLoading(true);

    try {
      const result = await calculateNumerology({ birthDate, fullName: fullName.trim() || undefined });

      if (!result.success || !result.calculations) {
        setError(result.error ?? tr.calculationError);
        setLoading(false);
        return;
      }

      const params = new URLSearchParams({
        d: birthDate,
        ...(fullName.trim() ? { n: fullName.trim() } : {}),
      });

      setTimeout(() => {
        router.push(`/sonuc?${params.toString()}`);
      }, 2000);
    } catch {
      setError(tr.networkError);
      setLoading(false);
    }
  }

  function handleClear() {
    setBirthDate("");
    setFullName("");
    setError(null);
  }

  return (
    <span>
      <LoadingOverlay visible={loading} />

      <style>{`
        .koz-form-input {
          width: 100%;
          background: rgba(8, 8, 16, 0.6);
          border: none;
          border-bottom: 1px solid var(--koz-border-bright);
          color: var(--koz-text);
          font-family: var(--font-dm-sans), "DM Sans", sans-serif;
          font-size: 1rem;
          font-weight: 400;
          padding: 12px 0;
          outline: none;
          transition: border-color 200ms ease;
          caret-color: var(--koz-gold);
          appearance: none;
          -webkit-appearance: none;
          border-radius: 0;
        }
        .koz-form-input:focus {
          border-bottom-color: var(--koz-gold);
        }
        .koz-form-input::placeholder {
          color: var(--koz-text-faint);
        }
        .koz-form-input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(0.4) sepia(1) saturate(3) hue-rotate(5deg);
          cursor: pointer;
          opacity: 0.6;
        }
        .koz-form-input[type="date"]::-webkit-calendar-picker-indicator:hover {
          opacity: 1;
        }
        .koz-submit-btn {
          position: relative;
          overflow: hidden;
        }
        .koz-submit-btn::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%);
          transform: translateX(-100%);
          transition: transform 500ms ease;
        }
        .koz-submit-btn:hover::after {
          transform: translateX(100%);
        }
        .koz-field-label-line {
          width: 0;
          height: 1px;
          background: var(--koz-gold);
          transition: width 300ms ease;
        }
        .koz-field-label-line.active {
          width: 100%;
        }
      `}</style>

      <div style={{
        background: "var(--koz-card)",
        border: "1px solid var(--koz-border)",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent, var(--koz-gold) 40%, var(--koz-violet) 70%, transparent)",
        }} />

        <div style={{
          position: "absolute",
          top: "-80px",
          right: "-80px",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ padding: "28px 28px 0" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{
              width: "32px",
              height: "32px",
              border: "1px solid var(--koz-gold)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--koz-gold)" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
            </span>
            <span>
              <p style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: "1.2rem",
                fontWeight: 600,
                fontStyle: "italic",
                color: "var(--koz-text)",
                margin: 0,
                letterSpacing: "0.01em",
              }}>{tr.calculateNumbers}</p>
              <p style={{
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--koz-text-faint)",
                margin: "2px 0 0",
              }}>{tr.calculateNumbersSubtitle}</p>
            </span>
          </span>
        </div>

        <div style={{ padding: "24px 28px 28px" }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>

              <div>
                <span style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
                  <Calendar style={{ width: "11px", height: "11px", color: "var(--koz-gold)", flexShrink: 0 }} />
                  <label
                    htmlFor="birthDate"
                    style={{
                      fontSize: "9px",
                      fontWeight: 700,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: focusedField === "birthDate" ? "var(--koz-gold)" : "var(--koz-text-muted)",
                      transition: "color 200ms ease",
                      cursor: "pointer",
                    }}
                  >
                    {tr.birthDateLabel}
                  </label>
                </span>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  required
                  max={today}
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  onFocus={() => setFocusedField("birthDate")}
                  onBlur={() => setFocusedField(null)}
                  className="koz-form-input"
                />
              </div>

              <div>
                <span style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
                  <User style={{ width: "11px", height: "11px", color: "var(--koz-text-faint)", flexShrink: 0 }} />
                  <label
                    htmlFor="fullName"
                    style={{
                      fontSize: "9px",
                      fontWeight: 700,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: focusedField === "fullName" ? "var(--koz-gold)" : "var(--koz-text-muted)",
                      transition: "color 200ms ease",
                      cursor: "pointer",
                    }}
                  >
                    {tr.fullNameLabel}
                    <span style={{ marginLeft: "6px", fontSize: "8px", letterSpacing: "0.1em", opacity: 0.5, fontWeight: 500, textTransform: "none" }}>
                      ({tr.optional})
                    </span>
                  </label>
                </span>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  maxLength={100}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  onFocus={() => setFocusedField("fullName")}
                  onBlur={() => setFocusedField(null)}
                  placeholder={tr.fullNamePlaceholder}
                  className="koz-form-input"
                />
              </div>

              {error && (
                <div style={{
                  padding: "12px 14px",
                  background: "rgba(239,68,68,0.06)",
                  border: "1px solid rgba(239,68,68,0.25)",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px",
                }}>
                  <span style={{ color: "#EF4444", fontSize: "12px", flexShrink: 0, marginTop: "1px" }}>⚠</span>
                  <span style={{ color: "#F87171", fontSize: "13px", fontWeight: 500, lineHeight: 1.5 }}>{error}</span>
                </div>
              )}

              <div style={{ display: "flex", gap: "10px", paddingTop: "4px" }}>
                <button
                  type="submit"
                  disabled={loading}
                  className="koz-submit-btn"
                  style={{
                    flex: 1,
                    height: "46px",
                    background: "var(--koz-gold)",
                    color: "var(--koz-void)",
                    border: "none",
                    fontFamily: 'var(--font-dm-sans), "DM Sans", sans-serif',
                    fontWeight: 900,
                    fontSize: "11px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    cursor: loading ? "not-allowed" : "pointer",
                    opacity: loading ? 0.5 : 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    transition: "background 180ms ease, box-shadow 180ms ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      (e.currentTarget as HTMLButtonElement).style.background = "#FFD966";
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 32px rgba(245,200,66,0.2)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "var(--koz-gold)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                  }}
                >
                  <Sparkles style={{ width: "13px", height: "13px" }} />
                  {tr.calculateButton}
                </button>

                <button
                  type="button"
                  onClick={handleClear}
                  style={{
                    height: "46px",
                    paddingLeft: "16px",
                    paddingRight: "16px",
                    background: "transparent",
                    color: "var(--koz-text-muted)",
                    border: "1px solid var(--koz-border)",
                    fontFamily: 'var(--font-dm-sans), "DM Sans", sans-serif',
                    fontWeight: 700,
                    fontSize: "11px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "border-color 180ms ease, color 180ms ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--koz-border-bright)";
                    (e.currentTarget as HTMLButtonElement).style.color = "var(--koz-text)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--koz-border)";
                    (e.currentTarget as HTMLButtonElement).style.color = "var(--koz-text-muted)";
                  }}
                >
                  <X style={{ width: "12px", height: "12px" }} />
                  {tr.clearButton}
                </button>
              </div>

              <p style={{
                fontSize: "10px",
                color: "var(--koz-text-faint)",
                textAlign: "right",
                margin: 0,
                letterSpacing: "0.04em",
                lineHeight: 1.6,
              }}>
                ◦ {tr.numerologyPrinciplesNote}
              </p>
            </div>
          </form>
        </div>
      </div>
    </span>
  );
}