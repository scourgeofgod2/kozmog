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
    sm: { badge: "w-11 h-11 text-lg", card: "p-3" },
    md: { badge: "w-14 h-14 text-2xl", card: "p-4" },
    lg: { badge: "w-18 h-18 text-3xl", card: "p-5" },
  };

  return (
    <div
      className={`bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] ${sizeClasses[size].card} flex items-center gap-3.5 hover:border-violet-200 dark:hover:border-violet-800/60 transition-colors`}
    >
      <div
        className={`${sizeClasses[size].badge} bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center text-white font-bold shadow-md flex-shrink-0 ${master ? "ring-2 ring-amber-400/70 ring-offset-2 ring-offset-[hsl(var(--card))]" : ""}`}
      >
        {number}
      </div>
      <div>
        <p className="text-[10px] font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-widest">
          {label}
        </p>
        {subtitle && (
          <p className="text-sm text-[hsl(var(--foreground))] mt-0.5 font-medium">
            {subtitle}
          </p>
        )}
        {master && (
          <span className="inline-block mt-1.5 text-[10px] bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60 px-2 py-0.5 rounded-full font-semibold tracking-wide">
            ✦ Usta Sayı
          </span>
        )}
      </div>
    </div>
  );
}
