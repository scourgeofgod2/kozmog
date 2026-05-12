import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  colorFrom: string;
  colorTo: string;
  borderColor?: string;
  bgFrom?: string;
  bgTo?: string;
  external?: boolean;
}

export default function FeatureCard({
  href,
  icon,
  title,
  description,
  colorFrom,
  colorTo,
  external = false,
}: FeatureCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center justify-between p-3.5 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))]",
        "hover:border-violet-200 dark:hover:border-violet-800/60 hover:shadow-md hover:shadow-violet-100/60 dark:hover:shadow-violet-950/40",
        "transition-all cursor-pointer group"
      )}
    >
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 bg-gradient-to-br ${colorFrom} ${colorTo} rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm`}>
          {icon}
        </div>
        <div>
          <h3 className="font-medium text-[hsl(var(--foreground))] text-sm leading-tight">{title}</h3>
          <p className="text-[hsl(var(--muted-foreground))] text-xs mt-0.5 leading-tight">{description}</p>
        </div>
      </div>
      {external ? (
        <ExternalLink className="w-3.5 h-3.5 text-[hsl(var(--muted-foreground))] group-hover:text-violet-500 flex-shrink-0 transition-colors ml-2" />
      ) : (
        <ArrowRight className="w-3.5 h-3.5 text-[hsl(var(--muted-foreground))] group-hover:text-violet-500 flex-shrink-0 transition-colors ml-2 group-hover:translate-x-0.5" />
      )}
    </Link>
  );
}