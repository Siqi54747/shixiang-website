"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { copy } from "@/content/copy";
import { useLocale } from "./LocaleProvider";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { WechatModal } from "./WechatModal";

export function Header() {
  const [showWechat, setShowWechat] = useState(false);
  const pathname = usePathname();
  const onReports = pathname?.startsWith("/reports") ?? false;
  const t = copy[useLocale()];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-[50px] bg-cream/90 backdrop-blur-sm border-b border-rule">
        <nav className="h-full px-4 md:px-24 max-w-[1600px] mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center" aria-label={t.site.name}>
            <Image
              src="/images/logo-horizontal-brand.png"
              alt={t.site.name}
              width={94}
              height={30}
              priority
            />
          </Link>
          <div className="flex items-center gap-3 md:gap-7">
            <Link
              href="/reports"
              aria-current={onReports ? "page" : undefined}
              className={
                onReports
                  ? "text-crimson text-[13px] md:text-[14px] uppercase tracking-wide whitespace-nowrap border-b border-crimson pb-[2px]"
                  : "bg-crimson text-rule text-[13px] md:text-[14px] uppercase tracking-wide whitespace-nowrap px-3 md:px-4 py-[4px] rounded-md hover:bg-[#8B1B25] transition-colors"
              }
            >
              {t.nav.reports}
            </Link>
            <button
              type="button"
              onClick={() => setShowWechat(true)}
              className="text-[13px] md:text-[14px] text-ink hover:text-crimson transition-colors"
            >
              {t.nav.insights}
            </button>
            <LanguageSwitcher />
          </div>
        </nav>
      </header>
      <WechatModal open={showWechat} onClose={() => setShowWechat(false)} />
    </>
  );
}
