# Kozmograf Numeroloji — Code Wiki

> **Proje Adı:** Kozmograf Numeroloji  
> **Stack:** Next.js 16 (App Router) · React 19 · TypeScript 5 · Tailwind CSS 4  
> **Dil:** Türkçe (UI + prompt sistemi)  
> **Amaç:** Doğum tarihi ve isim bazlı Pisagor numeroloji hesaplamaları yapan, AI destekli kişisel yorumlar sunan ücretsiz web uygulaması.

---

## İçindekiler

1. [Genel Mimari](#1-genel-mimari)
2. [Dizin Yapısı](#2-dizin-yapısı)
3. [Modüller ve Sorumlulukları](#3-modüller-ve-sorumlulukları)
4. [Tip Sistemi — `types/`](#4-tip-sistemi--types)
5. [Kütüphane Katmanı — `lib/`](#5-kütüphane-katmanı--lib)
6. [Server Actions — `actions/`](#6-server-actions--actions)
7. [Sayfa Bileşenleri — `app/`](#7-sayfa-bileşenleri--app)
8. [UI Bileşenleri — `components/`](#8-ui-bileşenleri--components)
9. [İçerik Katmanı — `content/`](#9-içerik-katmanı--content)
10. [Bağımlılık Grafiği](#10-bağımlılık-grafiği)
11. [Ortam Değişkenleri](#11-ortam-değişkenleri)
12. [Projeyi Çalıştırma](#12-projeyi-çalıştırma)

---

## 1. Genel Mimari

```
Kullanıcı Tarayıcısı
        │
        ▼
┌──────────────────────────────────────────────────────┐
│                  Next.js App Router                  │
│                                                      │
│   app/layout.tsx  ──►  Header + Footer sarmalayıcı  │
│   app/page.tsx    ──►  Ana sayfa (Form + SEO içerik) │
│   app/sonuc/      ──►  Sonuç sayfası (SSR + Suspense)│
└──────────┬───────────────────────┬───────────────────┘
           │ Server Action          │ Server Component
           ▼                        ▼
  actions/calculate.ts      actions/getReading.ts
  (Hesaplama & doğrulama)   (AI yorum üretimi)
           │                        │
           ▼                        ▼
   lib/numerology.ts          lib/claude.ts
   (Pisagor algoritmaları)    (claude.gg → OpenAI-compat API)
                                    │
                              lib/prompts.ts
                              (Türkçe sistem promptları)
```

**Akış özeti:**

1. Kullanıcı `NumerologyForm`'a doğum tarihi ve (opsiyonel) tam adını girer.
2. **`calculateNumerology`** server action çağrılır → `lib/numerology.ts` içindeki saf fonksiyonlar ile sayılar hesaplanır.
3. Başarılı hesaplama sonrası kullanıcı `/sonuc?d=YYYY-MM-DD&n=Ad` rotasına yönlendirilir.
4. `/sonuc` sayfası iki katmanda render olur:
   - `ResultCard` → hesaplanan sayıları anında gösterir (senkron).
   - `AIReadingSection` → `getReading` server action'ı üzerinden Claude API'ye istek atar; `<Suspense>` ile skeleton gösterilir.
5. Claude API yanıtı Markdown → HTML'e dönüştürülür ve `ReadingDisplay` bileşeni içinde sunulur.

---

## 2. Dizin Yapısı

```
kozmog/
├── actions/               # Next.js Server Actions ("use server")
│   ├── calculate.ts       # Numeroloji hesaplama ve doğrulama
│   └── getReading.ts      # Claude AI yorum üretimi
│
├── app/                   # Next.js App Router sayfaları
│   ├── layout.tsx         # Kök layout (metadata, Header, Footer)
│   ├── page.tsx           # Ana sayfa
│   └── sonuc/
│       ├── page.tsx       # Sonuç sayfası (SSR + Suspense)
│       └── loading.tsx    # Suspense fallback
│
├── components/
│   ├── forms/
│   │   └── NumerologyForm.tsx     # Ana giriş formu (Client Component)
│   ├── layout/
│   │   ├── Header.tsx             # Navigasyon başlığı (Client)
│   │   └── Footer.tsx             # Alt bilgi
│   ├── results/
│   │   ├── ResultCard.tsx         # Hesaplanan sayı kartları
│   │   └── ReadingDisplay.tsx     # AI yorum görüntüleyici
│   └── ui/                        # shadcn/ui temel bileşenler
│       ├── NumberBadge.tsx        # Sayı gösterme kartı
│       ├── ShareButton.tsx        # Paylaş butonu (Client)
│       ├── LoadingOverlay.tsx     # Yükleme bindirmesi
│       ├── FeatureCard.tsx        # Özellik kartı
│       ├── button.tsx / input.tsx / label.tsx / card.tsx / ...
│
├── content/
│   └── tr.ts              # Tüm Türkçe UI metinleri (i18n sabiti)
│
├── lib/
│   ├── numerology.ts      # Pisagor hesaplama algoritmaları
│   ├── claude.ts          # Claude API istemcisi
│   ├── gemini.ts          # Gemini API istemcisi (alternatif)
│   ├── prompts.ts         # AI sistem promptları (ReadingFocus'a göre)
│   ├── errors.ts          # Hata sınıflandırma (APIClientError)
│   ├── retry.ts           # Exponential backoff retry yardımcısı
│   ├── utils.ts           # cn() Tailwind sınıf birleştirici
│   ├── errors.test.ts     # errors.ts testleri
│   ├── retry.test.ts      # retry.ts testleri
│   └── utils.test.ts      # utils.ts testleri
│
├── types/
│   └── numerology.ts      # Uygulama geneli TypeScript arayüzleri
│
├── public/                # Statik dosyalar (SVG ikonlar)
├── Dockerfile             # Multi-stage production image
├── docker-compose.yml     # Docker Compose servisi
├── next.config.ts         # Next.js yapılandırması
├── tsconfig.json          # TypeScript yapılandırması
└── package.json           # Bağımlılıklar ve npm scriptleri
```

---

## 3. Modüller ve Sorumlulukları

| Modül | Katman | Temel Sorumluluk |
|---|---|---|
| `lib/numerology.ts` | Pure functions | Pisagor algoritmaları, uyumluluk matrisi |
| `lib/claude.ts` | API client | claude.gg gateway üzerinden OpenAI-compat istek |
| `lib/gemini.ts` | API client | Google Gemini API, Markdown→HTML dönüşümü |
| `lib/prompts.ts` | Content | `ReadingFocus`'a göre Türkçe sistem prompt seçimi |
| `lib/errors.ts` | Infrastructure | `APIClientError` sınıfı, hata tipi enum'ları |
| `lib/retry.ts` | Infrastructure | Exponential backoff ile yeniden deneme mantığı |
| `lib/utils.ts` | Utility | `cn()` — clsx + tailwind-merge |
| `actions/calculate.ts` | Server Action | Girdi doğrulama + numeroloji hesaplama |
| `actions/getReading.ts` | Server Action | Claude API çağrısı, ham metin → HTML dönüşümü |
| `content/tr.ts` | i18n | Tüm UI label, mesaj ve SEO metinleri |
| `types/numerology.ts` | Types | Uygulama geneli TypeScript arayüzleri |

---

## 4. Tip Sistemi — `types/`

### `types/numerology.ts`

Uygulamanın tüm veri sözleşmelerini tanımlar.

```typescript
// Kullanıcı giriş verisi
interface NumerologyInput {
  birthDate: string;   // "YYYY-MM-DD"
  fullName?: string;
}

// Hesaplanan sayılar
interface NumerologyCalculations {
  lifePath: number;            // Yaşam Yolu Sayısı (zorunlu)
  birthDay: number;            // Doğum Günü Sayısı (zorunlu)
  personal