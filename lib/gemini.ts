// Gemini API istemcisi
// PHP numerology_api.php makeApiRequest() fonksiyonundan TypeScript'e aktarılmıştır

import type { ReadingFocus, ReadingResult } from "@/types/numerology";
import type { NumerologyCalculations } from "@/types/numerology";
import { getSystemPrompt, buildUserQuery } from "./prompts";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY ?? "";
const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

// ─── Gemini'ye istek at ───────────────────────────────────────────────────

async function callGemini(prompt: string, userQuery: string): Promise<string> {
  const body = {
    contents: [
      {
        parts: [{ text: `${prompt}\n\n${userQuery}` }],
      },
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 8000,
      topP: 0.95,
      topK: 40,
    },
  };

  const res = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    // Next.js cache: her kullanıcı için farklı yanıt, 24 saat cache
    next: { revalidate: 86400 },
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    const message =
      errData?.error?.message ?? `HTTP ${res.status}`;
    throw new Error(`Gemini API hatası: ${message}`);
  }

  const data = await res.json();
  const text: string =
    data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

  if (!text) throw new Error("Gemini API boş yanıt döndürdü.");
  return text;
}

// ─── Markdown → HTML dönüşümü ─────────────────────────────────────────────
// PHP'deki formatNumerologyReading() fonksiyonunun TypeScript karşılığı

function formatReading(raw: string): string {
  // Satır sonlarını normalize et
  let text = raw.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  // ## Başlıkları → <h3>
  text = text.replace(
    /^##\s+(.+)$/gm,
    '<h3 class="text-xl font-bold text-indigo-600 dark:text-indigo-400 mt-6 mb-3">$1</h3>'
  );

  // ### Alt başlıklar → <h4>
  text = text.replace(
    /^###\s+(.+)$/gm,
    '<h4 class="text-lg font-semibold text-purple-600 dark:text-purple-400 mt-4 mb-2">$1</h4>'
  );

  // **kalın** → <strong>
  text = text.replace(
    /\*\*(.+?)\*\*/g,
    '<strong class="text-indigo-700 dark:text-indigo-300">$1</strong>'
  );

  // *italik* → <em>
  text = text.replace(/\*(.+?)\*/g, "<em>$1</em>");

  // Madde işaretleri: "- " veya "* " ile başlayan satırlar
  text = text.replace(
    /^[-*]\s+(.+)$/gm,
    '<li class="mb-2 flex items-start gap-2"><span class="text-indigo-500 mt-1">✦</span><span>$1</span></li>'
  );

  // Numara sıralı liste: "1. " ile başlayan satırlar
  text = text.replace(
    /^\d+\.\s+(.+)$/gm,
    '<li class="mb-2 ml-4 list-decimal">$1</li>'
  );

  // Ardışık <li> öğelerini <ul> içine al
  text = text.replace(
    /(<li[\s\S]*?<\/li>)(\s*<li[\s\S]*?<\/li>)+/g,
    (match) => `<ul class="space-y-1 my-3">${match}</ul>`
  );

  // Boş satırları paragraf ayırıcısı olarak kullan
  const paragraphs = text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  const formatted = paragraphs
    .map((p) => {
      // Zaten HTML etiketi varsa olduğu gibi bırak
      if (/^<(h[1-6]|ul|ol|li|div|p)/.test(p)) return p;
      // Düz metin → <p>
      return `<p class="mb-4 leading-relaxed">${p}</p>`;
    })
    .join("\n");

  return formatted;
}

// ─── Okuma türünü belirle ─────────────────────────────────────────────────

function extractReadingType(text: string): string {
  if (/\b(11|22|33)\b/.test(text) && /usta|master/i.test(text)) {
    return "master_number";
  }
  const count = (
    text.match(/yaşam yolu|kader|ruh sayısı|kişilik sayısı/gi) ?? []
  ).length;
  if (count >= 3) return "comprehensive";
  if (/yaşam yolu/i.test(text)) return "life_path";
  if (/kader/i.test(text)) return "destiny";
  return "general";
}

// ─── Ana fonksiyon: Numeroloji yorumu al ─────────────────────────────────

export async function getNumerologyReading(params: {
  birthDate: string;
  fullName?: string;
  calculations: NumerologyCalculations;
  focus?: ReadingFocus;
  retries?: number;
}): Promise<ReadingResult> {
  const { birthDate, fullName, calculations, focus, retries = 3 } = params;

  const systemPrompt = getSystemPrompt(focus);
  const userQuery = buildUserQuery({
    birthDate,
    fullName,
    lifePath: calculations.lifePath,
    birthDay: calculations.birthDay,
    personalYear: calculations.personalYear,
    destinyNumber: calculations.destinyNumber,
    soulUrge: calculations.soulUrge,
    personalityNumber: calculations.personalityNumber,
  });

  let lastError: Error | null = null;

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const rawText = await callGemini(systemPrompt, userQuery);
      const formatted = formatReading(rawText);
      const readingType = extractReadingType(rawText);

      return {
        calculations,
        interpretation: formatted,
        readingType,
        model: GEMINI_MODEL,
      };
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      if (attempt < retries - 1) {
        // Exponential backoff: 2s, 4s, 8s
        await new Promise((r) => setTimeout(r, Math.pow(2, attempt + 1) * 1000));
      }
    }
  }

  throw lastError ?? new Error("Numeroloji yorumu alınamadı.");
}