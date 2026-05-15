import { tr } from "@/content/tr";
import { Sparkles, Stars } from "lucide-react";

interface ReadingDisplayProps {
  interpretation: string;
  model?: string;
}

export default function ReadingDisplay({ interpretation, model }: ReadingDisplayProps) {
  return (
    <div className="border-2 border-black bg-white overflow-hidden" style={{ boxShadow: "7px 7px 0px #000" }}>
      {/* Header */}
      <div className="bg-[#6D28D9] text-white p-5 border-b-2 border-black">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 bg-[#FFCB00] border-2 border-white/20 flex items-center justify-center flex-shrink-0"
              style={{ boxShadow: "2px 2px 0px rgba(0,0,0,0.3)" }}
            >
              <Sparkles className="w-5 h-5 text-black" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight uppercase leading-tight">
                {tr.yourPersonalReading}
              </h2>
              <p className="text-violet-300 text-[11px] font-medium mt-0.5 uppercase tracking-[0.12em]">
                {tr.aiGeneratedInsights}
              </p>
            </div>
          </div>

          {model && (
            <div className="hidden sm:flex items-center gap-1.5 bg-white/10 border border-white/20 px-2.5 py-1.5 flex-shrink-0">
              <Stars className="w-3 h-3 text-violet-300" />
              <span className="text-[10px] text-violet-300 font-bold uppercase tracking-wider">
                {model.includes("claude") ? "Claude AI" : model.includes("gemini") ? "Gemini AI" : "AI"}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Top accent stripe */}
      <div className="flex h-1">
        <div className="flex-1 bg-[#FFCB00]" />
        <div className="flex-1 bg-[#FF4F1F]" />
        <div className="flex-1 bg-[#6D28D9]" />
        <div className="flex-1 bg-[#059669]" />
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        <div
          className="prose max-w-none text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: interpretation }}
        />
      </div>

      {/* Footer */}
      <div className="border-t-2 border-black/8 bg-gray-50 px-6 py-3 flex items-center justify-between">
        <span className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">
          ✦ Kişisel numeroloji yorumu
        </span>
        <span className="text-[10px] text-gray-400 font-medium">
          Yalnızca kişisel keşif amaçlıdır
        </span>
      </div>
    </div>
  );
}