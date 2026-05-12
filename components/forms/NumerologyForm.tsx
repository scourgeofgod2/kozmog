"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calculator, User, Calendar, Eraser } from "lucide-react";
import { tr } from "@/content/tr";
import { calculateNumerology } from "@/actions/calculate";
import LoadingOverlay from "@/components/ui/LoadingOverlay";

export default function NumerologyForm() {
  const router = useRouter();
  const [birthDate, setBirthDate] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const today = new Date().toISOString().split("T")[0];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!birthDate) {
      setError(tr.birthDateRequired);
      return;
    }
    if (birthDate > today) {
      setError(tr.futureDateError);
      return;
    }

    setLoading(true);

    try {
      const result = await calculateNumerology({ birthDate, fullName: fullName.trim() || undefined });

      if (!result.success || !result.calculations) {
        setError(result.error ?? tr.calculationError);
        setLoading(false);
        return;
      }

      // Verileri URL params olarak taşı
      const params = new URLSearchParams({
        d: birthDate,
        ...(fullName.trim() ? { n: fullName.trim() } : {}),
      });

      // Kısa bekleme — animasyon görünsün
      setTimeout(() => {
        router.push(`/sonuc?${params.toString()}`);
      }, 2000);
    } catch {
      setError(tr.networkError);
      setLoading(false);
    }
  }

  function handleClear() {
    setBirthDate("");
    setFullName("");
    setError(null);
  }

  return (
    <>
      <LoadingOverlay visible={loading} />

      <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden border border-indigo-100 dark:border-slate-700">
        {/* Başlık */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Calculator className="w-6 h-6" />
            {tr.calculateNumbers}
          </h2>
          <p className="opacity-90 mt-1">{tr.calculateNumbersSubtitle}</p>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Doğum Tarihi */}
            <div>
              <label
                htmlFor="birthDate"
                className="flex items-center gap-2 mb-2 text-indigo-700 dark:text-indigo-300 font-semibold"
              >
                <Calendar className="w-4 h-4" />
                {tr.birthDateLabel}
              </label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                required
                max={today}
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full p-4 bg-indigo-50 dark:bg-slate-700 border-2 border-indigo-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-indigo-800 dark:text-slate-200 text-lg"
              />
            </div>

            {/* Tam Ad (isteğe bağlı) */}
            <div>
              <label
                htmlFor="fullName"
                className="flex items-center gap-2 mb-2 text-indigo-700 dark:text-indigo-300 font-semibold"
              >
                <User className="w-4 h-4" />
                {tr.fullNameLabel}
                <span className="text-sm font-normal text-slate-400">
                  ({tr.optional})
                </span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                maxLength={100}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={tr.fullNamePlaceholder}
                className="w-full p-4 bg-indigo-50 dark:bg-slate-700 border-2 border-indigo-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-indigo-800 dark:text-slate-200 text-lg"
              />
            </div>

            {/* Hata mesajı */}
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Butonlar */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:opacity-70 text-white font-semibold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <Calculator className="w-5 h-5" />
                {tr.calculateButton}
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="border-2 border-indigo-300 dark:border-slate-600 hover:bg-indigo-50 dark:hover:bg-slate-700 text-indigo-600 dark:text-slate-300 font-medium py-4 px-5 rounded-xl transition-all flex items-center gap-2"
              >
                <Eraser className="w-4 h-4" />
                {tr.clearButton}
              </button>
            </div>

            {/* Not */}
            <p className="text-slate-400 dark:text-slate-500 text-xs text-right">
              ℹ {tr.numerologyPrinciplesNote}
            </p>
          </form>
        </div>
      </section>
    </>
  );
}