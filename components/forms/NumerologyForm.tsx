"use client";

import DateInput from "@/components/forms/DateInput";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { buttonStyles } from "@/components/ds";

const inputCls =
  "h-[54px] w-full rounded-[14px] border border-line bg-ink px-4 text-[17px] text-text placeholder:text-faint outline-none transition-colors focus:border-gold [color-scheme:dark]";

export default function NumerologyForm({
  submitLabel = "Sayımı göster",
  showName = true,
}: {
  submitLabel?: string;
  showName?: boolean;
}) {
  const router = useRouter();
  const [birthDate, setBirthDate] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!birthDate) return setError("Doğum tarihini seçmelisin.");
    if (birthDate > today) return setError("Doğum tarihi gelecekte olamaz.");
    if (birthDate < "1900-01-01") return setError("Geçerli bir doğum tarihi gir.");

    setPending(true);
    const params = new URLSearchParams({ d: birthDate });
    if (fullName.trim()) params.set("n", fullName.trim());
    router.push(`/sonuc?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="dogum-tarihi" className="text-[13px] font-medium text-muted">
          Doğum tarihin
        </label>
        <DateInput id="dogum-tarihi" value={birthDate} onChange={setBirthDate} max={today} aria-invalid={!!error} aria-describedby={error ? "form-hata" : undefined} required />
      </div>

      {showName && (
        <div className="flex flex-col gap-1.5">
          <label htmlFor="ad-soyad" className="text-[13px] font-medium text-muted">
            Ad soyad <span className="text-faint">(isteğe bağlı, kader sayın için)</span>
          </label>
          <input
            id="ad-soyad"
            type="text"
            autoComplete="name"
            maxLength={60}
            placeholder="Adın ve soyadın"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={inputCls}
          />
        </div>
      )}

      {error && (
        <p id="form-hata" role="alert" className="rounded-[12px] border border-rose/40 bg-rose/10 px-4 py-3 text-[14px] text-rose">
          {error}
        </p>
      )}

      <button type="submit" disabled={pending} className={buttonStyles("primary", "w-full disabled:opacity-70")}>
        {pending ? "Hesaplanıyor…" : submitLabel}
      </button>
      <p className="text-center text-[12px] text-faint">Ücretsiz · Üyelik yok · Bilgilerin kaydedilmez</p>
    </form>
  );
}
