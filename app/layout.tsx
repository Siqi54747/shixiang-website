import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { copy } from "@/content/copy";
import "./globals.css";

export const metadata: Metadata = {
  title: copy.site.name,
  description: copy.hero.slogan,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="font-sans antialiased text-quantum-950 bg-white">
        <Header />
        <main className="pt-[50px] min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
