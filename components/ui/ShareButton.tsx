"use client";

import { useState } from "react";
import { buttonStyles } from "@/components/ds";

export default function ShareButton({
  label = "Sonucu paylaş",
  text = "Numeroloji sonucuma bak!",
  className,
}: {
  label?: string;
  text?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = window.location.href;
    // Telefonda yerel paylaşım menüsü (Instagram, WhatsApp…), yoksa linki kopyala
    if (navigator.share) {
      try {
        await navigator.share({ title: "Kozmograf", text, url });
        return;
      } catch {
        // kullanıcı vazgeçti — kopyalamaya düş
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // panoya erişim yok
    }
  }

  return (
    <button type="button" onClick={handleShare} className={buttonStyles("secondary", className)}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M12 3v12M7 8l5-5 5 5M5 14v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5" />
      </svg>
      <span aria-live="polite">{copied ? "Link kopyalandı" : label}</span>
    </button>
  );
}
