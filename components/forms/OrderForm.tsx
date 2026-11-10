"use client";

import { useState } from "react";
import Link from "next/link";
import DateInput from "@/components/forms/DateInput";
import { buttonStyles } from "@/components/ds";
import type { Package } from "@/lib/content/packages";

const inputCls =
  "h-[54px] w-full rounded-[14px] border border-line bg-ink px-4 text-[17px] text-text placeholder:text-faint outline-none focus:border-gold";

interface Payment {
  code: string;
  amountText: string;
  packageName: string;
  paymentPhone: string;
  whatsappUrl: string;
  delivery: string;
}

function CopyRow({ label, value, copyValue }: { label: string; value: string; copyValue?: string }) {
  const [ok, setOk] = useState(false);
  return (
    <div className="flex items-center justify-between gap-3 rounded-[14px] bg-surface-2 px-4 py-3">
      <div>
        <p className="text-[12px] text-muted">{label}</p>
        <p className="font-display text-2xl font-semibold text-text">{value}</p>
      </div>
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(copyValue ?? value);
            setOk(true);
            setTimeout(() => setOk(false), 1500);
          } catch {
            /* pano yok */
          }
        }}
        className="min-h-[44px] rounded-full border border-line-strong px-4 text-[13px] font-semibold text-text hover:border-gold hover:text-gold"
      >
        <span aria-live="polite">{ok ? "Kopyalandı" : "Kopyala"}</span>
      </button>
    </div>
  );
}

export default function OrderForm({ pkg }: { pkg: Package }) {
  const today = new Date().toISOString().split("T")[0];
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [partnerBirthDate, setPartnerBirthDate] = useState("");
  const [contact, setContact] = useState("");
  const [consent, setConsent] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [payment, setPayment] = useState<Payment | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pkg: pkg.slug, name, birthDate, partnerName, partnerBirthDate, contact, consent }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error ?? "Sipariş oluşturulamadı.");
        return;
      }
      setPayment(data as Payment);
      requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
    } catch {
      setError("Bağlantı hatası. Tekrar dene.");
    } finally {
      setPending(false);
    }
  }

  if (payment) {
    return (
      <div className="flex flex-col gap-4 koz-fade-up">
        <div className="rounded-[var(--radius-card)] bg-gold p-6 text-gold-ink">
          <p className="text-[13px] font-semibold">Siparişin oluşturuldu</p>
          <p className="mt-1 font-display text-5xl font-semibold">{payment.code}</p>
          <p className="mt-2 text-[15px]">
            {payment.packageName} · {payment.amountText}
          </p>
        </div>

        <ol className="flex flex-col gap-3">
          <li className="rounded-[var(--radius-card)] border border-line bg-surface p-5">
            <p className="text-[13px] font-semibold text-gold">1. Ödemeyi yap</p>
            <p className="mt-1 text-[15px] text-muted">
              Banka uygulamanda <strong className="text-text">Para Gönder → Kolay Adres (Telefon numarası)</strong>{" "}
              seçeneğini kullan. Açıklamaya sipariş kodunu yaz.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <CopyRow label="Kolay Adres (telefon)" value={payment.paymentPhone} copyValue={payment.paymentPhone.replace(/\s/g, "")} />
              <CopyRow label="Tutar" value={payment.amountText} copyValue={payment.amountText.replace(/\D/g, "")} />
              <CopyRow label="Açıklama" value={payment.code} />
            </div>
          </li>
          <li className="rounded-[var(--radius-card)] border border-line bg-surface p-5">
            <p className="text-[13px] font-semibold text-gold">2. Dekontu WhatsApp&apos;tan gönder</p>
            <p className="mt-1 text-[15px] text-muted">Mesaj sipariş bilgilerinle hazır açılır; dekontu ekleyip gönder.</p>
            <a
              href={payment.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex min-h-[54px] items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 text-[15px] font-semibold text-[#06210f]"
            >
              WhatsApp&apos;tan bildir
            </a>
          </li>
          <li className="rounded-[var(--radius-card)] border border-line bg-surface p-5">
            <p className="text-[13px] font-semibold text-gold">3. Raporun {payment.delivery} gelsin</p>
            <p className="mt-1 text-[15px] text-muted">
              Ödemen onaylanınca raporun PDF olarak {contact.includes("@") ? "e-postana" : "WhatsApp'ına"} gönderilir.
            </p>
          </li>
        </ol>
        <p className="text-[13px] text-faint">Sipariş kodunu not al: {payment.code}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-4">
      <fieldset className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-line bg-surface p-5">
        <legend className="px-1 text-[13px] font-semibold text-gold">{pkg.needsPartner ? "Senin bilgilerin" : "Bilgilerin"}</legend>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="s-ad" className="text-[13px] font-medium text-muted">
            Ad soyad (doğumdaki tam adın)
          </label>
          <input id="s-ad" autoComplete="name" maxLength={60} value={name} onChange={(e) => setName(e.target.value)} placeholder="Adın ve soyadın" className={inputCls} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="s-tarih" className="text-[13px] font-medium text-muted">
            Doğum tarihin
          </label>
          <DateInput id="s-tarih" value={birthDate} onChange={setBirthDate} max={today} />
        </div>
      </fieldset>

      {pkg.needsPartner && (
        <fieldset className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-line bg-surface p-5">
          <legend className="px-1 text-[13px] font-semibold text-gold">Partnerinin bilgileri</legend>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="s-p-ad" className="text-[13px] font-medium text-muted">
              Ad soyad
            </label>
            <input id="s-p-ad" maxLength={60} value={partnerName} onChange={(e) => setPartnerName(e.target.value)} placeholder="Onun adı ve soyadı" className={inputCls} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="s-p-tarih" className="text-[13px] font-medium text-muted">
              Doğum tarihi
            </label>
            <DateInput id="s-p-tarih" value={partnerBirthDate} onChange={setPartnerBirthDate} max={today} />
          </div>
        </fieldset>
      )}

      <fieldset className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-line bg-surface p-5">
        <legend className="px-1 text-[13px] font-semibold text-gold">Rapor nereye gelsin?</legend>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="s-iletisim" className="text-[13px] font-medium text-muted">
            WhatsApp numaran ya da e-postan
          </label>
          <input id="s-iletisim" inputMode="email" autoComplete="tel" maxLength={80} value={contact} onChange={(e) => setContact(e.target.value)} placeholder="05xx xxx xx xx" className={inputCls} />
        </div>
        <label className="flex items-start gap-3 text-[14px] leading-relaxed text-muted">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 h-5 w-5 flex-none accent-[var(--color-gold)]" />
          <span>
            <Link href="/gizlilik" className="text-gold underline underline-offset-2" target="_blank">
              Gizlilik ve KVKK metnini
            </Link>{" "}
            ve{" "}
            <Link href="/paketler#iade" className="text-gold underline underline-offset-2" target="_blank">
              ön bilgilendirmeyi
            </Link>{" "}
            okudum. Raporun dijital içerik olarak hemen hazırlanmasını istiyorum.
          </span>
        </label>
      </fieldset>

      {error && (
        <p role="alert" className="rounded-[12px] border border-rose/40 bg-rose/10 px-4 py-3 text-[14px] text-rose">
          {error}
        </p>
      )}

      <button type="submit" disabled={pending} className={buttonStyles("primary", "w-full disabled:opacity-70")}>
        {pending ? "Sipariş oluşturuluyor…" : `Siparişi oluştur · ${pkg.price} TL`}
      </button>
      <p className="text-center text-[12px] text-faint">Bir sonraki adımda ödeme bilgilerini göreceksin.</p>
    </form>
  );
}
