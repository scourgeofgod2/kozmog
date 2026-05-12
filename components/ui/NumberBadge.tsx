import { getNumberColor, isMasterNumber } from "@/lib/numerology";

interface NumberBadgeProps {
  number: number;
  label: string;
  subtitle?: string;
  size?: "sm" | "md" | "lg";
}

export default function NumberBadge({
  number,
  label,
  subtitle,
  size = "md",
}: NumberBadgeProps) {
  const gradient = getNumberColor(number);
  const master = isMasterNumber(number);

  const sizeClasses = {
    sm: { badge: "w-12 h-12 text-xl", card: "p-3" },
    md: { badge: "w-16 h-16 text-3xl", card: "p-4" },
    lg: { badge: "w-20 h-20 text-4xl", card: "p-5" },
  };

  return (
    <div
      className={`bg-white dark:bg-slate-800 rounded-xl shadow border border-indigo-100 dark:border-slate-700 ${sizeClasses[size].card} flex items-center gap-4`}
    >
      <div
        className={`${sizeClasses[size].badge} bg-gradient-to-br ${gradient} rounded-full flex items-center justify-center text-white font-bold shadow-lg flex-shrink-0 ${master ? "ring-2 ring-yellow-400 ring-offset-2" : ""}`}
      >
        {number}
      </div>
      <div>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
          {label}
        </p>
        {subtitle && (
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-0.5">
            {subtitle}
          </p>
        )}
        {master && (
          <span className="inline-block mt-1 text-xs bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-400 px-2 py-0.5 rounded-full font-medium">
            ✦ Usta Sayı
          </span>
        )}
      </div>
    </div>
  );
}