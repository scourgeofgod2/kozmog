import { isMasterNumber } from "@/lib/numerology";

interface NumberBadgeProps {
  number: number;
  label: string;
  subtitle?: string;
  size?: "sm" | "md" | "lg";
}

const KOZ_ACCENTS = [
  { hex: "#F5C842", dim: "rgba(245,200,66,0.12)", border: "rgba(245,200,66,0.3)", text: "#080810" },
  { hex: "#7C3AED", dim: "rgba(124,58,237,0.12)", border: "rgba(124,58,237,0.3)", text: "#fff" },
  { hex: "#C4B5FD", dim: "rgba(196,181,253,0.10)", border: "rgba(196,181,253,0.25)", text: "#080810" },
  { hex: "#F5C842", dim: "rgba(245,200,66,0.08)", border: "rgba(245,200,66,0.2)", text: "#080810" },
  { hex: "#9B59F5", dim: "rgba(155,89,245,0.12)", border: "rgba(155,89,245,0.3)", text: "#fff" },
  { hex: "#EAE6FF", dim: "rgba(234,230,255,0.08)", border: "rgba(234,230,255,0.2)", text: "#080810" },
  { hex: "#A8882B", dim: "rgba(168,136,43,0.12)", border: "rgba(168,136,43,0.25)", text: "#fff" },
  { hex: "#7C3AED", dim: "rgba(124,58,237,0.08)", border: "rgba(124,58,237,0.2)", text: "#fff" },
  { hex: "#F5C842", dim: "rgba(245,200,66,0.10)", border: "rgba(245,200,66,0.25)", text: "#080810" },
];

function getAccent(num: number) {
  return KOZ_ACCENTS[(num - 1) % KOZ_ACCENTS.length] ?? KOZ_ACCENTS[0];
}

export default function NumberBadge({
  number,
  label,
  subtitle,
}: NumberBadgeProps) {
  const accent = getAccent(number);
  const master = isMasterNumber(number);

  return (
    <div
      style={{
        background: "var(--koz-card)",
        border: master
          ? "1px solid rgba(245,200,66,0.4)"
          : "1px solid var(--koz-border)",
        padding: "16px",
        display: "flex",
        alignItems: "center",
        gap: "16px",
        transition: "border-color 200ms ease, background 200ms ease",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {master && (
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent, var(--koz-gold) 50%, transparent)",
        }} />
      )}

      <div
        style={{
          width: "52px",
          height: "52px",
          background: accent.dim,
          border: `1px solid ${accent.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          position: "relative",
        }}
      >
        <span style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontSize: number >= 10 ? "1.4rem" : "1.75rem",
          fontWeight: 700,
          color: accent.hex,
          lineHeight: 1,
          letterSpacing: "-0.02em",
        }}>
          {number}
        </span>
      </div>

      <div style={{ minWidth: 0, flex: 1 }}>
        <p style={{
          fontSize: "9px",
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--koz-text-muted)",
          margin: 0,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          fontFamily: "var(--font-inter), sans-serif",
        }}>
          {label}
        </p>
        {subtitle && (
          <p style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "0.75rem",
            fontWeight: 400,
            color: "var(--koz-text)",
            margin: "3px 0 0",
            lineHeight: 1.4,
          }}>
            {subtitle}
          </p>
        )}
        {master && (
          <span style={{
            display: "inline-block",
            marginTop: "6px",
            fontSize: "8px",
            fontWeight: 700,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--koz-void)",
            background: "var(--koz-gold)",
            padding: "2px 6px",
            fontFamily: "var(--font-inter), sans-serif",
          }}>
            ✦ Usta Sayı
          </span>
        )}
      </div>
    </div>
  );
}