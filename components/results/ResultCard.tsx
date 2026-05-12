import NumberBadge from "@/components/ui/NumberBadge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
    <Card className="overflow-hidden border-[hsl(var(--border))] shadow-lg shadow-violet-100/50 dark:shadow-violet-950/30">
      <CardHeader className="p-0">
        <div className="bg-gradient-to-br from-violet-600 via-purple-600 to-purple-700 p-6 text-white">
          <h2 className="text-xl font-semibold tracking-tight">{tr.yourCoreNumbers}</h2>
          {fullName && (
            <p className="text-violet-200 text-sm mt-0.5">{fullName}</p>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-5">
        {hasMaster && (
          <div className="mb-5 flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200/70 dark:border-amber-800/40">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-800 dark:text-amber-300 text-sm">
                {tr.masterNumberDetected}
              </p>
              <p className="text-amber-700 dark:text-amber-500 text-xs mt-0.5 leading-relaxed">
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
      </CardContent>
    </Card>
  );
}