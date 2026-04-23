import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { copy } from "@/content/copy";
import "./globals.css";

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
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500&family=Epunda+Sans:wght@400;500&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&family=Noto+Sans+SC:wght@400;500&family=Noto+Serif+SC:wght@400;500&display=swap"
        />
      </head>
      <body className="font-sans antialiased text-ink bg-cream min-h-screen flex flex-col">
        <Header />
        <main className="pt-[50px] flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
