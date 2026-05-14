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
    <div className="border-2 border-black bg-white overflow-hidden" style={{ boxShadow: "6px 6px 0px #000" }}>
      {/* Header */}
      <div className="bg-black text-white p-5 border-b-2 border-black">
        <h2 className="text-xl font-black tracking-tight uppercase">{tr.yourCoreNumbers}</h2>
        {fullName && (
          <p className="text-white/60 text-sm font-medium mt-0.5">{fullName}</p>
        )}
      </div>

      <div className="p-5">
        {hasMaster && (
          <div
            className="mb-5 flex items-start gap-3 p-4 bg-yellow-400 border-2 border-black"
            style={{ boxShadow: "3px 3px 0px #000" }}
          >
            <span className="text-black text-lg font-black flex-shrink-0">⚡</span>
            <div>
              <p className="font-black text-black text-sm uppercase tracking-wide">
                {tr.masterNumberDetected}
              </p>
              <p className="text-black/70 text-xs mt-0.5 leading-relaxed font-medium">
                Bu, yüksek ruhsal potansiyeli ve daha büyük yaşam zorluklarını gösterir.
              </p>
            </div>
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-3">
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
    </div>
  );
}