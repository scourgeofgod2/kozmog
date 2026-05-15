import { isMasterNumber } from "@/lib/numerology";

interface NumberBadgeProps {
  number: number;
  label: string;
  subtitle?: string;
  size?: "sm" | "md" | "lg";
}

const COLORS = [
  { bg: "bg-[#FFCB00]", text: "text-black", border: "border-black" },
  { bg: "bg-blue-400", text: "text-black", border: "border-black" },
  { bg: "bg-[#FF4F1F]", text: "text-white", border: "border-black" },
  { bg: "bg-emerald-400", text: "text-black", border: "border-black" },
  { bg: "bg-[#6D28D9]", text: "text-white", border: "border-black" },
  { bg: "bg-pink-400", text: "text-black", border: "border-black" },
  { bg: "bg-orange-400", text: "text-black", border: "border-black" },
  { bg: "bg-cyan-400", text: "text-black", border: "border-black" },
  { bg: "bg-lime-400", text: "text-black", border: "border-black" },
];

function getColor(num: number) {
  return COLORS[(num - 1) % COLORS.length] ?? COLORS[0];
}

export default function NumberBadge({
  number,
  label,
  subtitle,
  size = "md",
}: NumberBadgeProps) {
  const color = getColor(number);
  const master = isMasterNumber(number);

  const sizeMap = {
    sm: { badge: "w-12 h-12 text-xl", card: "p-3" },
    md: { badge: "w-14 h-14 text-2xl", card: "p-4" },
    lg: { badge: "w-18 h-18 text-4xl", card: "p-5" },
  };

  const s = sizeMap[size];

  return (
    <div
      className={`bg-white border-2 border-black ${s.card} flex items-center gap-4 neo-hover`}
      style={{ boxShadow: master ? "4px 4px 0px #FFCB00" : "4px 4px 0px #000" }}
    >
      <div
        className={`${s.badge} ${color.bg} ${color.border} border-2 flex items-center justify-center font-black flex-shrink-0 ${color.text} tracking-tight font-display`}
      >
        {number}
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.18em] truncate">
          {label}
        </p>
        {subtitle && (
          <p className="text-sm text-black mt-0.5 font-bold leading-tight">
            {subtitle}
          </p>
        )}
        {master && (
          <span
            className="inline-block mt-2 text-[9px] bg-[#FFCB00] text-black border-2 border-black px-2 py-0.5 font-black uppercase tracking-widest"
            style={{ boxShadow: "1px 1px 0px #000" }}
          >
            ✦ Usta Sayı
          </span>
        )}
      </div>
    </div>
  );
}