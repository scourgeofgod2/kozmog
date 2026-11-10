"use client";

import { cn } from "@/lib/utils";

/**
 * Yerel tarih seçici + boşken görünen ipucu. Android Chrome boş
 * <input type="date"> içinde hiçbir şey göstermediği için gerekli.
 */
export default function DateInput({
  id,
  value,
  onChange,
  max,
  className,
  ...rest
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  max: string;
  className?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "type" | "id" | "max">) {
  return (
    <div className="relative">
      <input
        id={id}
        type="date"
        min="1900-01-01"
        max={max}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "peer h-[54px] w-full rounded-[14px] border border-line bg-ink px-4 text-[17px] text-text outline-none transition-colors focus:border-gold [color-scheme:dark]",
          !value && "text-transparent focus:text-text",
          className
        )}
        {...rest}
      />
      {!value && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-[17px] text-faint peer-focus:hidden"
        >
          gg.aa.yyyy · tarih seç
        </span>
      )}
    </div>
  );
}
