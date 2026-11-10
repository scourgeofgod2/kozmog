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
| `ADMIN_EMAIL` | Satış için | Sipariş bildirimlerinin geleceği adres |
| `RESEND_API_KEY` | Satış için | Resend API anahtarı (`re_…`) |
| `MAIL_FROM` | Satış için | Gönderen, doğrulanmış alan adından: `Kozmograf <rapor@kozmograf.com>` |
| `DATABASE_PATH` | Hayır | SQLite dosyası (Docker'da `/app/data/kozmograf.db`, Dockerfile ayarlar) |
| `READING_DAILY_CAP` | Hayır | Günlük toplam ücretsiz yorum üst sınırı (varsayılan 3000) |

## Sipariş ve rapor akışı

1. Müşteri `/paketler` → `/siparis?paket=…` formunu doldurur (e-posta zorunlu). `/api/order` sipariş kodu (`KZ-XXXXX`) üretir;
   **sana** (`ADMIN_EMAIL`) sipariş + rapor stüdyosu linki, **müşteriye** ödeme talimatı e-postası gider. Yönetici e-postası
   gönderilemezse sipariş alınmaz (sipariş kaybolmasın diye).
2. Müşteri Kolay Adres ile öder, açıklamaya sipariş kodunu yazar.
3. Bankada ödemeyi gör → e-postadaki "Rapor stüdyosunu aç" → `ADMIN_TOKEN` gir → bölümleri üret.
4. "PDF'i önizle" ile kontrol et → "Müşteriye e-postayla gönder": PDF sunucuda üretilir, Resend ile ek olarak gider.

Sipariş verisi veritabanında tutulmaz; stüdyo linkinin `#` sonrası kısmında taşınır (sunucu kayıtlarına düşmez).

## Sipariş veritabanı (SQLite)

- Node 22'nin yerleşik `node:sqlite` modülü; ek paket yok. Tablo ilk istekte otomatik oluşur.
- **Coolify:** Uygulama → Persistent Storage → Volume ekle, Destination Path: `/app/data`. Eklemezsen veriler her
  redeploy'da silinir.
- Yönetim: `kozmograf.com/yonetim` → `ADMIN_TOKEN` → sipariş listesi, durum (Bekliyor/Ödendi/Gönderildi/İptal),
  stüdyo. Rapor e-postayla gönderilince durum otomatik "Gönderildi" olur.
- Veritabanı hatası siparişi düşürmez (e-posta asıl kayıttır); hata `[db]` önekiyle loglanır.
- Yedek: Coolify'da volume yedeği ya da konteynerde `/app/data/kozmograf.db` dosyasını kopyala.

## Resend kurulumu

1. resend.com → Domains → `kozmograf.com` ekle (bölge: eu-west-1 önerilir).
2. Verilen DNS kayıtlarını (MX + TXT/SPF + DKIM) alan adının DNS paneline ekle, "Verify" de.
3. API Keys → yalnızca "Sending access" yetkili anahtar oluştur → Coolify'da `RESEND_API_KEY`.
4. `MAIL_FROM="Kozmograf <rapor@kozmograf.com>"`, `ADMIN_EMAIL=<senin adresin>` ekle, redeploy.

## Yapı

- `app/` sayfalar; `app/api/reading` ücretsiz yorum, `app/api/order` sipariş, `app/api/admin/report` ücretli rapor, `app/api/og` paylaşım görselleri
- `components/ds` tasarım sistemi bileşenleri
- `lib/content/` tüm içerik verileri (sayılar, melek sayıları, paketler…)
- `lib/prompts.ts` ücretsiz yorum promptu, `lib/reportPrompts.ts` rapor promptları
- `scripts/gorseller/generate.mjs` illüstrasyon üretici → `public/gorseller`
