import { tr } from "@/content/tr";
import { Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ReadingDisplayProps {
  interpretation: string;
  model?: string;
}

export default function ReadingDisplay({ interpretation, model }: ReadingDisplayProps) {
  return (
    <Card className="overflow-hidden border-[hsl(var(--border))] shadow-lg shadow-violet-100/50 dark:shadow-violet-950/30">
      <CardHeader className="p-0">
        <div className="bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-600 p-6 text-white">
          <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            {tr.yourPersonalReading}
          </h2>
          <p className="text-violet-200 text-sm mt-1">{tr.aiGeneratedInsights}</p>
        </div>
      </CardHeader>

      <CardContent className="p-6 md:p-8">
        <div
          className="prose dark:prose-invert max-w-none text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: interpretation }}
        />

        {model && (
          <div className="mt-6 flex justify-end">
            <Badge
              variant="secondary"
              className="text-xs text-[hsl(var(--muted-foreground))] bg-[hsl(var(--muted))] border-[hsl(var(--border))]"
            >
              AI: {model}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
