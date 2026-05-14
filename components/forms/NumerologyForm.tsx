"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calculator, User, Calendar, Eraser, Sparkles } from "lucide-react";
import { tr } from "@/content/tr";
import { calculateNumerology } from "@/actions/calculate";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

      const params = new URLSearchParams({
        d: birthDate,
        ...(fullName.trim() ? { n: fullName.trim() } : {}),
      });

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

      <div className="border-2 border-black bg-white" style={{ boxShadow: "6px 6px 0px #000" }}>
        {/* Header */}
        <div className="bg-black text-white p-5 border-b-2 border-black">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-400 border-2 border-yellow-400 flex items-center justify-center flex-shrink-0">
              <Calculator className="w-5 h-5 text-black" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight uppercase">{tr.calculateNumbers}</h2>
              <p className="text-white/60 text-sm font-medium mt-0.5">{tr.calculateNumbersSubtitle}</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Doğum Tarihi */}
            <div className="space-y-2">
              <Label
                htmlFor="birthDate"
                className="flex items-center gap-1.5 text-sm font-black text-black uppercase tracking-wide"
              >
                <Calendar className="w-3.5 h-3.5" />
                {tr.birthDateLabel}
              </Label>
              <Input
                type="date"
                id="birthDate"
                name="birthDate"
                required
                max={today}
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </div>

            {/* Tam Ad */}
            <div className="space-y-2">
              <Label
                htmlFor="fullName"
                className="flex items-center gap-1.5 text-sm font-black text-black uppercase tracking-wide"
              >
                <User className="w-3.5 h-3.5" />
                {tr.fullNameLabel}
                <span className="text-xs font-medium text-gray-500 ml-1 normal-case">
                  ({tr.optional})
                </span>
              </Label>
              <Input
                type="text"
                id="fullName"
                name="fullName"
                maxLength={100}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={tr.fullNamePlaceholder}
              />
            </div>

            {/* Hata mesajı */}
            {error && (
              <div className="p-3 border-2 border-red-500 bg-red-50 text-red-700 text-sm font-bold flex items-start gap-2" style={{ boxShadow: "2px 2px 0px #ef4444" }}>
                <span>⚠</span>
                <span>{error}</span>
              </div>
            )}

            {/* Butonlar */}
            <div className="flex gap-3 pt-1">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 h-11 bg-yellow-400 text-black font-black border-2 border-black uppercase tracking-wide hover:bg-yellow-300 disabled:opacity-50"
                style={{ boxShadow: "4px 4px 0px #000" }}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {tr.calculateButton}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleClear}
                className="h-11 px-4 font-black border-2 border-black bg-white text-black uppercase tracking-wide hover:bg-gray-100"
                style={{ boxShadow: "4px 4px 0px #000" }}
              >
                <Eraser className="w-4 h-4 mr-1.5" />
                {tr.clearButton}
              </Button>
            </div>

            <p className="text-gray-500 text-xs text-right leading-relaxed font-medium">
              ℹ {tr.numerologyPrinciplesNote}
            </p>
          </form>
        </div>
      </div>
    </>
  );
}