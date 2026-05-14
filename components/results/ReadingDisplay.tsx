import { tr } from "@/content/tr";
import { Sparkles } from "lucide-react";

interface ReadingDisplayProps {
  interpretation: string;
  model?: string;
}

export default function ReadingDisplay({ interpretation }: ReadingDisplayProps) {
  return (
    <div className="border-2 border-black bg-white overflow-hidden" style={{ boxShadow: "6px 6px 0px #000" }}>
      {/* Header */}
      <div className="bg-violet-600 text-white p-5 border-b-2 border-black">
        <h2 className="text-xl font-black tracking-tight uppercase flex items-center gap-2">
          <div className="w-8 h-8 bg-yellow-400 border-2 border-white flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-4 h-4 text-black" />
          </div>
          {tr.yourPersonalReading}
        </h2>
        <p className="text-violet-200 text-sm font-medium mt-1">{tr.aiGeneratedInsights}</p>
      </div>

      <div className="p-6 md:p-8">
        <div
          className="prose max-w-none text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: interpretation }}
        />
      </div>
    </div>
  );
}
