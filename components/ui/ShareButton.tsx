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
      className="flex items-center justify-center gap-2 p-3 border-2 border-black bg-emerald-400 font-black text-black text-sm uppercase tracking-wide hover:translate-x-[2px] hover:translate-y-[2px] transition-transform cursor-pointer w-full"
      style={{ boxShadow: "3px 3px 0px #000" }}
    >
      {copied ? (
        <Check className="w-4 h-4" />
      ) : (
        <Share2 className="w-4 h-4" />
      )}
      {copied ? "✓ Kopyalandı!" : label}
    </button>
  );
}