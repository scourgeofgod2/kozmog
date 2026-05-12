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
import { Card, CardContent, CardHeader } from "@/components/ui/card";

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

      <Card className="overflow-hidden border-[hsl(var(--border))] shadow-lg shadow-violet-100/50 dark:shadow-violet-950/30">
        {/* Header */}
        <CardHeader className="p-0">
          <div className="bg-gradient-to-br from-violet-600 via-purple-600 to-purple-700 p-6 text-white">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold tracking-tight">{tr.calculateNumbers}</h2>
                <p className="text-violet-200 text-sm mt-0.5">{tr.calculateNumbersSubtitle}</p>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Doğum Tarihi */}
            <div className="space-y-2">
              <Label
                htmlFor="birthDate"
                className="flex items-center gap-1.5 text-sm font-medium text-[hsl(var(--foreground))]"
              >
                <Calendar className="w-3.5 h-3.5 text-violet-500" />
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
                className="h-11 text-base border-[hsl(var(--border))] focus-visible:ring-violet-500 focus-visible:ring-offset-0 bg-[hsl(var(--background))]"
              />
            </div>

            {/* Tam Ad */}
            <div className="space-y-2">
              <Label
                htmlFor="fullName"
                className="flex items-center gap-1.5 text-sm font-medium text-[hsl(var(--foreground))]"
              >
                <User className="w-3.5 h-3.5 text-violet-500" />
                {tr.fullNameLabel}
                <span className="text-xs font-normal text-[hsl(var(--muted-foreground))] ml-1">
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
                className="h-11 text-base border-[hsl(var(--border))] focus-visible:ring-violet-500 focus-visible:ring-offset-0 bg-[hsl(var(--background))]"
              />
            </div>

            {/* Hata mesajı */}
            {error && (
              <div className="p-3 rounded-lg border border-destructive/30 bg-destructive/5 text-destructive text-sm flex items-start gap-2">
                <span className="mt-0.5">⚠</span>
                <span>{error}</span>
              </div>
            )}

            {/* Butonlar */}
            <div className="flex gap-3 pt-1">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 h-11 bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-700 hover:to-purple-800 text-white font-semibold shadow-md shadow-violet-200 dark:shadow-violet-900/40 hover:shadow-lg hover:shadow-violet-300 dark:hover:shadow-violet-900/50 hover:-translate-y-px transition-all border-0"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {tr.calculateButton}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleClear}
                className="h-11 px-4 font-medium border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
              >
                <Eraser className="w-4 h-4 mr-1.5" />
                {tr.clearButton}
              </Button>
            </div>

            <p className="text-[hsl(var(--muted-foreground))] text-xs text-right leading-relaxed">
              ℹ {tr.numerologyPrinciplesNote}
            </p>
          </form>
        </CardContent>
      </Card>
    </>
  );
}