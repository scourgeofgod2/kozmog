import { isMasterNumber } from "@/lib/numerology";

interface NumberBadgeProps {
  number: number;
  label: string;
  subtitle?: string;
  size?: "sm" | "md" | "lg";
}

// NeoBrutal renk paleti — sayıya göre canlı düz renkler
function getNeoBrutalColor(num: number): { bg: string; text: string } {
  const colors = [
    { bg: "bg-yellow-400", text: "text-black" },
    { bg: "bg-blue-400", text: "text-black" },
    { bg: "bg-red-400", text: "text-white" },
    { bg: "bg-green-400", text: "text-black" },
    { bg: "bg-purple-500", text: "text-white" },
    { bg: "bg-pink-400", text: "text-black" },
    { bg: "bg-orange-400", text: "text-black" },
    { bg: "bg-cyan-400", text: "text-black" },
    { bg: "bg-lime-400", text: "text-black" },
  ];
  return colors[(num - 1) % colors.length] ?? colors[0];
}

export default function NumberBadge({
  number,
  label,
  subtitle,
  size = "md",
}: NumberBadgeProps) {
  const color = getNeoBrutalColor(number);
  const master = isMasterNumber(number);

  const sizeClasses = {
    sm: { badge: "w-12 h-12 text-xl", card: "p-3" },
    md: { badge: "w-16 h-16 text-3xl", card: "p-4" },
    lg: { badge: "w-20 h-20 text-4xl", card: "p-5" },
  };

  return (
    <div
      className={`bg-white border-2 border-black ${sizeClasses[size].card} flex items-center gap-4 hover:translate-x-[1px] hover:translate-y-[1px] transition-transform`}
      style={{ boxShadow: master ? "4px 4px 0px #FFD600" : "4px 4px 0px #000" }}
    >
      {/* Number box */}
      <div
        className={`${sizeClasses[size].badge} ${color.bg} border-2 border-black flex items-center justify-center font-black flex-shrink-0 ${color.text} tracking-tight`}
        style={{ boxShadow: "inset 0 -3px 0 rgba(0,0,0,0.2)" }}
      >
        {number}
      </div>

      <div>
        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
          {label}
        </p>
        {subtitle && (
          <p className="text-sm text-black mt-0.5 font-bold">
            {subtitle}
          </p>
        )}
        {master && (
          <span className="inline-block mt-1.5 text-[10px] bg-yellow-400 text-black border-2 border-black px-2 py-0.5 font-black uppercase tracking-wide">
            ✦ Usta Sayı
          </span>
        )}
      </div>
    </div>
  );
}
