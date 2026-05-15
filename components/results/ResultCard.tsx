import NumberBadge from "@/components/ui/NumberBadge";
import { tr } from "@/content/tr";
import { isMasterNumber } from "@/lib/numerology";
import type { NumerologyCalculations } from "@/types/numerology";
import { Zap } from "lucide-react";

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
    <div className="border-2 border-black bg-white overflow-hidden" style={{ boxShadow: "7px 7px 0px #000" }}>
      {/* Header */}
      <div className="bg-[#0a0a0a] text-white p-5 border-b-2 border-black">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black tracking-tight uppercase">{tr.yourCoreNumbers}</h2>
            {fullName && (
              <p className="text-white/50 text-[11px] font-medium mt-0.5 uppercase tracking-[0.12em]">{fullName}</p>
            )}
          </div>
          <div className="flex gap-1">
            {["bg-[#FFCB00]", "bg-[#FF4F1F]", "bg-[#6D28D9]"].map((bg, i) => (
              <div key={i} className={`w-3 h-3 border border-white/20 ${bg}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="p-5">
        {hasMaster && (
          <div
            className="mb-5 flex items-start gap-3 p-4 bg-[#FFCB00] border-2 border-black"
            style={{ boxShadow: "3px 3px 0px #000" }}
          >
            <Zap className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-black text-black text-sm uppercase tracking-wide">
                {tr.masterNumberDetected}
              </p>
              <p className="text-black/60 text-xs mt-0.5 leading-relaxed font-medium">
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