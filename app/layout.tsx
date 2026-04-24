import type { Metadata } from "next";
import {
  Inter,
  EB_Garamond,
  JetBrains_Mono,
  Noto_Sans_SC,
  Noto_Serif_SC,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { copy } from "@/content/copy";
import "./globals.css";

// Self-hosted via next/font/google so the browser doesn't block on a
// fonts.googleapis.com CSS round-trip (used to cost ~8s on mobile).
// Latin fonts preload; CJK fonts skip preload because each subset
// shard is too large to ship eagerly.
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-inter",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-eb-garamond",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

// `Epunda Sans` (the display face on the eyebrow text) isn't in
// next/font's typed list. The eyebrow is small-cap, tracked, and only
// appears once on the homepage — falling back to Inter is a wash at
// that size. Drop the explicit display font load entirely; the
// `font-display` Tailwind utility falls back to var(--font-inter)
// (see tailwind.config.ts).
const notoSansSC = Noto_Sans_SC({
  weight: ["400", "500"],
  display: "swap",
  preload: false,
  variable: "--font-noto-sans-sc",
});

const notoSerifSC = Noto_Serif_SC({
  weight: ["400", "500"],
  display: "swap",
  preload: false,
  variable: "--font-noto-serif-sc",
});

const fontVars = [
  inter.variable,
  ebGaramond.variable,
  jetbrainsMono.variable,
  notoSansSC.variable,
  notoSerifSC.variable,
].join(" ");

export const metadata: Metadata = {
  title: `${copy.site.name} · ${copy.site.tagline}`,
  description: copy.site.description,
  openGraph: {
    title: `${copy.site.name} · ${copy.site.tagline}`,
    description: copy.site.description,
    images: [{ url: "/api/og", width: 1200, height: 630, alt: copy.site.name }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${copy.site.name} · ${copy.site.tagline}`,
    description: copy.site.description,
    images: ["/api/og"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={fontVars}>
      <body className="font-sans antialiased text-ink bg-cream min-h-screen flex flex-col">
        <Header />
        <main className="pt-[50px] flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
