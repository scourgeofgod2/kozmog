# Kozmograf

Türkçe numeroloji sitesi (kozmograf.com). Next.js 16 · React 19 · Tailwind 4 · Coolify (Docker).

## Geliştirme

```bash
npm ci
npm run dev          # http://localhost:3000
npm run build && npm start
npm run gorseller    # illüstrasyonları yeniden üret (global playwright gerekir)
```

## Ortam değişkenleri (Coolify → Environment Variables, runtime)

| Değişken | Zorunlu | Açıklama |
|---|---|---|
| `INWORLD_API_KEY` | Evet | Yapay zekâ yorum/rapor servisi anahtarı |
| `PAYMENT_PHONE` | Satış için | Kolay Adres telefon numarası (yalnızca ödeme ekranında gösterilir, kodda yer almaz) |
| `ADMIN_TOKEN` | Satış için | Rapor stüdyosu anahtarı, en az 16 karakter, rastgele |
| `READING_DAILY_CAP` | Hayır | Günlük toplam ücretsiz yorum üst sınırı (varsayılan 3000) |

## Sipariş ve rapor akışı

1. Müşteri `/paketler` → `/siparis?paket=…` formunu doldurur; `/api/order` sipariş kodu (`KZ-XXXXX`) üretir ve ödeme bilgisini döner.
2. Müşteri Kolay Adres ile öder, "WhatsApp'tan bildir" butonuyla dekontu gönderir. Mesajda sipariş özeti ve **rapor linki** bulunur.
3. Ödemeyi bankadan kontrol et → mesajdaki rapor linkine dokun (`/yonetim/rapor#o=…`) → `ADMIN_TOKEN` gir → bölümleri üret.
4. "PDF olarak kaydet" → "Müşteriye WhatsApp aç" → PDF'i ekle, gönder. Söz verilen teslim süresi: 1 saat.

Sipariş verisi veritabanında tutulmaz; rapor linkinin `#` sonrası kısmında taşınır (sunucu kayıtlarına düşmez). Sunucu logunda yalnızca `[siparis] KOD paket tutar` satırı bulunur.

## Yapı

- `app/` sayfalar; `app/api/reading` ücretsiz yorum, `app/api/order` sipariş, `app/api/admin/report` ücretli rapor, `app/api/og` paylaşım görselleri
- `components/ds` tasarım sistemi bileşenleri
- `lib/content/` tüm içerik verileri (sayılar, melek sayıları, paketler…)
- `lib/prompts.ts` ücretsiz yorum promptu, `lib/reportPrompts.ts` rapor promptları
- `scripts/gorseller/generate.mjs` illüstrasyon üretici → `public/gorseller`
