import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

interface FeatureCardProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  colorFrom: string;
  colorTo: string;
  borderColor: string;
  bgFrom: string;
  bgTo: string;
  external?: boolean;
}

export default function FeatureCard({
  href,
  icon,
  title,
  description,
  colorFrom,
  colorTo,
  borderColor,
  bgFrom,
  bgTo,
  external = false,
}: FeatureCardProps) {
  return (
    <Link
      href={href}
      className={`flex items-center justify-between p-4 rounded-xl border ${borderColor} bg-gradient-to-r ${bgFrom} ${bgTo} hover:shadow-md transition-all cursor-pointer group`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 bg-gradient-to-r ${colorFrom} ${colorTo} rounded-full flex items-center justify-center flex-shrink-0 shadow`}>
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-slate-700 dark:text-slate-200 text-sm">{title}</h3>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">{description}</p>
        </div>
      </div>
      {external ? (
        <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 flex-shrink-0 transition-colors" />
      ) : (
        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 flex-shrink-0 transition-colors" />
      )}
    </Link>
  );
}