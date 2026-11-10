"use client";

import { useState } from "react";
import DateInput from "@/components/forms/DateInput";
import { buttonStyles } from "@/components/ds";
import { packages, getPackage } from "@/lib/content/packages";
import { orderToHash } from "@/lib/orderHash";

const inputCls =
  "h-[52px] w-full rounded-[14px] border border-line bg-ink px-4 text-[16px] text-text placeholder:text-faint outline-none focus:border-gold";

/** Sipariş linki olmadan girildiğinde: siparişi elle girip stüdyoyu açar. */
export default function ManualOrder() {
  const today = new Date().toISOString().split("T")[0];
  const [pkg, setPkg] = useState(packages.find((p) => p.featured)!.slug);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [partnerBirthDate, setPartnerBirthDate] = useState("");
  const [contact, setContact] = useState("");
  const [error, setError] = useState<string | null>(null);
  const needsPartner = getPackage(pkg)!.needsPartner;

  function open(e: React.FormEvent) {
    e.preventDefault();
    const c = code.trim().toUpperCase();
    if (!/^KZ-[A-Z0-9]{5}$/.test(c)) return setError("Sipariş kodu KZ-XXXXX biçiminde olmalı.");
    if (!name.trim() || !birthDate || !contact.trim()) return setError("Ad soyad, doğum tarihi ve e-posta gerekli.");
    if (needsPartner && (!partnerName.trim() || !partnerBirthDate)) return setError("Bu paket için partner bilgisi gerekli.");
    const order = {
      pkg,
      name: name.trim(),
      birthDate,
      ...(needsPartner ? { partnerName: partnerName.trim(), partnerBirthDate } : {}),
      contact: contact.trim().toLowerCase(),
      code: c,
      createdAt: new Date().toISOString(),
    };
    window.location.hash = orderToHash(order);
  }

  return (
    <div>
      <p className="text-[14px] text-muted">
        Listede olmayan bir sipariş için (ör. veritabanı kurulmadan önce gelenler) bilgileri buraya gir.
      </p>

      <form onSubmit={open} noValidate className="mt-6 flex flex-col gap-4 rounded-[var(--radius-card)] border border-line bg-surface p-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="m-paket" className="text-[13px] font-medium text-muted">Paket</label>
          <select id="m-paket" value={pkg} onChange={(e) => setPkg(e.target.value as typeof pkg)} className={inputCls}>
            {packages.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name} · {p.price} TL
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="m-kod" className="text-[13px] font-medium text-muted">Sipariş kodu (ödeme açıklamasından)</label>
          <input id="m-kod" value={code} onChange={(e) => setCode(e.target.value)} placeholder="KZ-XXXXX" autoCapitalize="characters" className={inputCls} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="m-ad" className="text-[13px] font-medium text-muted">Ad soyad</label>
          <input id="m-ad" value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="m-tarih" className="text-[13px] font-medium text-muted">Doğum tarihi</label>
          <DateInput id="m-tarih" value={birthDate} onChange={setBirthDate} max={today} />
        </div>
        {needsPartner && (
          <>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="m-p-ad" className="text-[13px] font-medium text-muted">Partner ad soyad</label>
              <input id="m-p-ad" value={partnerName} onChange={(e) => setPartnerName(e.target.value)} className={inputCls} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="m-p-tarih" className="text-[13px] font-medium text-muted">Partner doğum tarihi</label>
              <DateInput id="m-p-tarih" value={partnerBirthDate} onChange={setPartnerBirthDate} max={today} />
            </div>
          </>
        )}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="m-eposta" className="text-[13px] font-medium text-muted">Müşteri e-postası</label>
          <input id="m-eposta" type="email" value={contact} onChange={(e) => setContact(e.target.value)} className={inputCls} />
        </div>
        {error && (
          <p role="alert" className="rounded-[12px] border border-rose/40 bg-rose/10 px-4 py-3 text-[14px] text-rose">
            {error}
          </p>
        )}
        <button type="submit" className={buttonStyles("primary")}>
          Stüdyoyu aç
        </button>
      </form>
    </div>
  );
}
