import NumberBadge from "@/components/ui/NumberBadge";
import { tr } from "@/content/tr";
import { isMasterNumber } from "@/lib/numerology";
import type { NumerologyCalculations } from "@/types/numerology";

interface ResultCardProps {
  calculations: NumerologyCalculations;
  fullName?: string;
}

export default function ResultCard({ calculations, fullName }: ResultCardProps) {
  const { lifePath, birthDay, personalYear, destinyNumber, soulUrge, personalityNumber } = calculations;

  const hasMaster =
    isMasterNumber(lifePath) ||
    (destinyNumber !== undefined && isMasterNumber(destinyNumber)) ||
    (soulUrge !== undefined && isMasterNumber(soulUrge));

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
        background: "linear-gradient(90deg, transparent, var(--koz-gold) 40%, var(--koz-violet) 70%, transparent)",
      }} />

      <div style={{
        padding: "20px 24px 16px",
        borderBottom: "1px solid var(--koz-border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
      }}>
        <div>
          <p style={{
            fontSize: "9px",
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--koz-gold)",
            margin: 0,
            fontFamily: "var(--font-inter), sans-serif",
          }}>
            {tr.yourCoreNumbers}
          </p>
          {fullName && (
            <p style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: "1rem",
              fontWeight: 500,
              fontStyle: "italic",
              color: "var(--koz-text-muted)",
              margin: "4px 0 0",
              letterSpacing: "0.01em",
            }}>
              {fullName}
            </p>
          )}
        </div>

        <div style={{ display: "flex", gap: "4px", flexShrink: 0 }}>
          {[
            "var(--koz-gold)",
            "var(--koz-violet)",
            "var(--koz-star)",
          ].map((c) => (
            <div key={c} style={{
              width: "8px",
              height: "8px",
              background: c,
              opacity: 0.7,
            }} />
          ))}
        </div>
      </div>

      {hasMaster && (
        <div style={{
          margin: "16px 16px 0",
          padding: "12px 16px",
          background: "rgba(245,200,66,0.06)",
          border: "1px solid rgba(245,200,66,0.25)",
          display: "flex",
          alignItems: "flex-start",
          gap: "10px",
        }}>
          <span style={{ color: "var(--koz-gold)", fontSize: "14px", flexShrink: 0 }}>✦</span>
          <div>
            <p style={{
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--koz-gold)",
              margin: 0,
              fontFamily: "var(--font-inter), sans-serif",
            }}>
              {tr.masterNumberDetected}
            </p>
            <p style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: "0.8rem",
              fontStyle: "italic",
              color: "var(--koz-text-muted)",
              margin: "3px 0 0",
              lineHeight: 1.5,
            }}>
              Bu, yüksek ruhsal potansiyeli ve daha büyük yaşam zorluklarını gösterir.
            </p>
          </div>
        </div>
      )}

      <div style={{
        padding: "16px",
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "8px",
      }}>
        <NumberBadge number={lifePath} label={tr.lifePathNumber} subtitle={tr.yourLifePurpose} />
        <NumberBadge number={birthDay} label={tr.birthDayNumber} subtitle={tr.yourSpecialTalents} />
        <NumberBadge number={personalYear} label={tr.personalYearNumber} subtitle={tr.yearTheme} />
        {destinyNumber !== undefined && (
          <NumberBadge number={destinyNumber} label={tr.destinyNumber} subtitle={tr.yourLifeMission} />
        )}
        {soulUrge !== undefined && (
          <NumberBadge number={soulUrge} label={tr.soulUrgeNumber} subtitle={tr.yourInnerDesires} />
        )}
        {personalityNumber !== undefined && (
          <NumberBadge number={personalityNumber} label={tr.personalityNumber} subtitle={tr.howOthersSeeYou} />
        )}
      </div>
    </div>
  );
}