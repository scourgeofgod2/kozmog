import NumberBadge from "@/components/ui/NumberBadge";
import { tr } from "@/content/tr";
import { isMasterNumber } from "@/lib/numerology";
import type { NumerologyCalculations } from "@/types/numerology";
import { AlertTriangle } from "lucide-react";

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
    <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-indigo-100 dark:border-slate-700 overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6">
        <h2 className="text-2xl font-bold">{tr.yourCoreNumbers}</h2>
        {fullName && <p className="opacity-80 mt-1 text-sm">{fullName}</p>}
      </div>

      <div className="p-6">
        {hasMaster && (
          <div className="mb-6 flex items-start gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
            <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-yellow-800 dark:text-yellow-300 text-sm">
                {tr.masterNumberDetected}
              </p>
              <p className="text-yellow-700 dark:text-yellow-400 text-xs mt-0.5">
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
    </section>
  );
}