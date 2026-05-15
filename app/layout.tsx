import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { tr } from "@/content/tr";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-dm-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: tr.seoTitle,
    template: `%s | Kozmograf Numeroloji`,
  },
  description: tr.seoDescription,
  keywords: tr.seoKeywords,
  authors: [{ name: "Kozmograf" }],
  creator: "Kozmograf",
  publisher: "Kozmograf",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Kozmograf Numeroloji",
    title: tr.ogTitle,
    description: tr.ogDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: tr.ogTitle,
    description: tr.ogDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${dmSans.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="font-sans bg-[hsl(var(--background))] text-[hsl(var(--foreground))] min-h-screen antialiased">
        <div className="relative min-h-screen">
          <Header />
          <main className="container mx-auto px-4 max-w-7xl py-10">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}