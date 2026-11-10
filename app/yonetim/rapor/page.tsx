import type { Metadata } from "next";
import ReportStudio from "./ReportStudio";

export const metadata: Metadata = {
  title: "Rapor stüdyosu",
  robots: { index: false, follow: false },
  alternates: { canonical: null },
};

export default function RaporPage() {
  return <ReportStudio />;
}
