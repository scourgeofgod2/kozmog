import { tr } from "@/content/tr";
import { Sparkles } from "lucide-react";

interface ReadingDisplayProps {
  interpretation: string;
  model?: string;
}

export default function ReadingDisplay({ interpretation, model }: ReadingDisplayProps) {
  return (
    <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-indigo-100 dark:border-slate-700 overflow-hidden">
      {/* Başlık */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Sparkles className="w-6 h-6" />
          {tr.yourPersonalReading}
        </h2>
        <p className="opacity-80 text-sm mt-1">{tr.aiGeneratedInsights}</p>
      </div>

      {/* İçerik */}
      <div className="p-6 md:p-8">
        <div
          className="prose prose-indigo dark:prose-invert max-w-none
            prose-h3:text-indigo-700 prose-h3:dark:text-indigo-300
            prose-h4:text-purple-700 prose-h4:dark:text-purple-300
            prose-strong:text-indigo-800 prose-strong:dark:text-indigo-200
            prose-p:text-slate-700 prose-p:dark:text-slate-300
            prose-li:text-slate-700 prose-li:dark:text-slate-300
            prose-ul:my-3 prose-li:my-1"
          dangerouslySetInnerHTML={{ __html: interpretation }}
        />
      </div>

      {/* AI Model etiketi */}
      {model && (
        <div className="px-6 pb-4 flex justify-end">
          <span className="text-xs text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-full">
            AI: {model}
          </span>
        </div>
      )}
    </section>
  );
}