"use client";

import { Share2, Check } from "lucide-react";
import { useState } from "react";

interface ShareButtonProps {
  label: string;
}

export default function ShareButton({ label }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center justify-center gap-2 p-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--muted))] hover:bg-emerald-50 dark:hover:bg-emerald-950/20 hover:border-emerald-200 dark:hover:border-emerald-800/60 text-[hsl(var(--foreground))] font-medium text-sm transition-all group cursor-pointer w-full"
    >
      {copied ? (
        <Check className="w-4 h-4 text-emerald-500" />
      ) : (
        <Share2 className="w-4 h-4 text-emerald-500 group-hover:scale-110 transition-transform" />
      )}
      {copied ? "Kopyalandı!" : label}
    </button>
  );
}