"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { copy } from "@/content/copy";
import { WechatModal } from "./WechatModal";

export function Header() {
  const [showWechat, setShowWechat] = useState(false);
  const pathname = usePathname();
  const onReports = pathname?.startsWith("/reports") ?? false;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-[50px] bg-cream/90 backdrop-blur-sm border-b border-rule">
        <nav className="h-full px-4 md:px-24 flex items-center justify-between">
          <Link href="/" className="flex items-center" aria-label={copy.site.name}>
            <Image
              src="/images/logo-horizontal-brand.png"
              alt={copy.site.name}
              width={94}
              height={30}
              priority
            />
          </Link>
          <div className="flex items-center gap-3 md:gap-9">
            <Link
              href="/reports"
              aria-current={onReports ? "page" : undefined}
              className={
                onReports
                  ? "text-crimson text-[13px] md:text-[14px] uppercase tracking-wide whitespace-nowrap border-b border-crimson pb-[2px]"
                  : "bg-crimson text-rule text-[13px] md:text-[14px] uppercase tracking-wide whitespace-nowrap px-3 md:px-4 py-[4px] rounded-md hover:bg-[#8B1B25] transition-colors"
              }
            >
              {copy.nav.reports}
            </Link>
            <button
              type="button"
              onClick={() => setShowWechat(true)}
              className="text-[13px] md:text-[14px] text-ink hover:text-crimson transition-colors"
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
