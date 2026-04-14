"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { copy } from "@/content/copy";
import { WechatModal } from "./WechatModal";

export function Header() {
  const [showWechat, setShowWechat] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-[50px] bg-cream/90 backdrop-blur-sm border-b border-rule">
        <nav className="h-full px-6 md:px-24 flex items-center justify-between">
          <Link href="/" className="flex items-center" aria-label={copy.site.name}>
            <Image
              src="/images/logo-horizontal-brand.png"
              alt={copy.site.name}
              width={94}
              height={30}
              priority
            />
          </Link>
          <div className="flex items-center gap-6 md:gap-9">
            <Link
              href="/reports"
              className="bg-crimson text-rule text-[14px] uppercase tracking-wide px-4 py-[4px] rounded-md hover:bg-[#8B1B25] transition-colors"
            >
              {copy.nav.reports}
            </Link>
            <button
              type="button"
              onClick={() => setShowWechat(true)}
              className="text-[14px] text-ink hover:text-crimson transition-colors"
            >
              {copy.nav.insights}
            </button>
          </div>
        </nav>
      </header>
      <WechatModal open={showWechat} onClose={() => setShowWechat(false)} />
    </>
  );
}
