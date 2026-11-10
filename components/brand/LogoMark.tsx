import { K_PATH, ORBIT } from "@/lib/brand.generated";

/** "Yörüngedeki K" işareti. Renk currentColor'dan gelir (text-gold vb.). */
export default function LogoMark({ size = 28, className, title }: { size?: number; className?: string; title?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <path d={K_PATH} fill="currentColor" />
      <g transform={`rotate(${ORBIT.rotate} 50 50)`}>
        <ellipse cx="50" cy="50" rx={ORBIT.rx} ry={ORBIT.ry} fill="none" stroke="currentColor" strokeWidth={ORBIT.stroke} />
        <circle cx={50 + ORBIT.rx} cy="50" r={ORBIT.dot} fill="currentColor" />
      </g>
    </svg>
  );
}
