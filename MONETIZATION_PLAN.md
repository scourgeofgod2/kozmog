# Kozmograf — Monetizasyon & Auth Planı

## Kullanıcı Katmanları

| Katman     | Durum              | Yorum Hakkı                        | PDF İndirme |
|------------|--------------------|------------------------------------|-------------|
| Misafir    | Üye değil          | Mini yorum (2-3 cümle, jenerik)    | ❌           |
| Ücretsiz   | Kayıtlı            | 1 tam detaylı yorum                | ❌           |
| Başlangıç  | 99 TL / 10 kredi   | 10 tam yorum                       | ❌           |
| Popüler    | 249 TL / 30 kredi  | 30 tam yorum                       | ✅           |
| Premium    | 399 TL / 75 kredi  | 75 tam yorum                       | ✅           |

## Tech Stack

- **Auth**: Supabase Auth + Google OAuth
- **Veritabanı**: Supabase (PostgreSQL)
- **Ödeme**: Polar.sh
- **PDF**: @react-pdf/renderer (sunucu taraflı)

## Supabase Tablo Yapısı

### profiles
```sql
id          uuid references auth.users primary key
email       text
full_name   text
avatar_url  text
credits     integer default 1  -- kayıt bonusu: 1 kredi
has_pdf     boolean default false
created_at  timestamptz default now()
```

### credit_transactions
```sql
id              uuid primary key default gen_random_uuid()
user_id         uuid references profiles(id)
amount          integer          -- pozitif: yükleme, negatif: harcama
type            text             -- 'purchase' | 'usage' | 'signup_bonus'
polar_order_id  text             -- Polar.sh order referansı
package_slug    text             -- 'starter' | 'popular' | 'premium'
created_at      timestamptz default now()
```

### readings
```sql
id           uuid primary key default gen_random_uuid()
user_id      uuid references profiles(id)
birth_date   date
name         text
result_json  jsonb            -- AI yorum verisi (PDF için de kullanılır)
pdf_url      text             -- opsiyonel: storage'a yüklendiyse
created_at   timestamptz default now()
```

## Polar.sh Paket Tanımları

| Slug                    | Fiyat   | Kredi |
|-------------------------|---------|-------|
| kozmograf_starter       | 99 TL   | 10    |
| kozmograf_popular       | 249 TL  | 30    |
| kozmograf_premium       | 399 TL  | 75    |

## API Route Yapısı

```
POST /api/reading
  - Misafir     → mini yorum (prompt lite)
  - Üye, kredi > 0 → tam yorum + credits--
  - Üye, kredi = 0 → 402 Payment Required

POST /api/webhooks/polar
  - order.created event → credits += package.credits
  - has_pdf = true (popular & premium)

GET /api/reading/[id]/pdf
  - Auth kontrolü
  - has_pdf = true kontrolü
  - PDF generate → stream
```

## UI Bileşenleri (Yapılacaklar)

- [ ] `AuthModal` — Google OAuth butonu + email/password
- [ ] `CreditBadge` — header'da kredi göstergesi
- [ ] `PricingPage` — /fiyatlar sayfası, 3 paket kartı
- [ ] `PdfDownloadButton` — sonuç sayfasında, has_pdf kontrolü
- [ ] `AccountPage` — /hesabim, kredi geçmişi

## Uygulama Sırası

1. Supabase tabloları + RLS policy'leri
2. Google OAuth entegrasyonu (Supabase Auth)
3. API route kredi middleware
4. Polar.sh webhook endpoint
5. AuthModal + CreditBadge UI
6. Pricing sayfası
7. PDF generate + indirme

## Gerekli Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
POLAR_ACCESS_TOKEN=
POLAR_WEBHOOK_SECRET=
NEXT_PUBLIC_POLAR_ORG_ID=
```

## Notlar

- Polar.sh Türkiye kart ödemeleri için Stripe altyapısı kullanır — genellikle sorunsuz çalışır
- PDF özelliği Popüler (30 kredi) ve üzeri paketlerde açık
- Misafir yorumu için ayrı bir "lite" prompt kullanılacak — detay yok, merak uyandıran ton
- Kayıt bonusu 1 kredi otomatik yüklenir (signup trigger via Supabase function)