"use client";

import { useRouter } from "next/navigation";
import { LOCALE_COOKIE, type Locale } from "@/lib/i18n";
import { useLocale } from "./LocaleProvider";

/**
 * 中 / EN language toggle (header, top-right).
 *
 * Writes the `lang` cookie then router.refresh() so the server
 * components re-render in the chosen locale — no full reload, scroll
 * position preserved. Default 中文; choice persists for a year.
 */
export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();

  const choose = (next: Locale) => {
    if (next === locale) return;
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    router.refresh();
  };

  const base =
    "text-[13px] md:text-[14px] tracking-wide transition-colors px-[2px]";
  const active = "text-crimson";
  const idle = "text-meta hover:text-ink";

  return (
    <div
      className="flex items-center gap-1 whitespace-nowrap"
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        onClick={() => choose("zh")}
        aria-pressed={locale === "zh"}
        className={`${base} ${locale === "zh" ? active : idle}`}
      >
        中
      </button>
      <span className="text-rule" aria-hidden="true">
        /
      </span>
      <button
        type="button"
        onClick={() => choose("en")}
        aria-pressed={locale === "en"}
        className={`${base} ${locale === "en" ? active : idle}`}
      >
        EN
      </button>
    </div>
  );
}
