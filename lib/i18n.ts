/**
 * i18n core — locale type, constants, cookie contract.
 *
 * Safe to import from BOTH server and client code: this file has no
 * `next/headers` or React dependency. Server components read the cookie
 * via `lib/locale-server.ts`; client components read the value from the
 * `LocaleProvider` context (`components/LocaleProvider.tsx`).
 *
 * Site is in-place bilingual (no /en URL segment — decision 2026-06-30):
 * the active locale lives in a cookie, default 中文. The language
 * switcher writes the cookie and calls router.refresh(), which re-runs
 * the server components with the new cookie so the whole page (chrome +
 * deck content) re-renders without a Chinese→English flash.
 */

export type Locale = "zh" | "en";

export const LOCALES: readonly Locale[] = ["zh", "en"] as const;

export const DEFAULT_LOCALE: Locale = "zh";

/** Cookie that persists the visitor's language choice (1-year max-age). */
export const LOCALE_COOKIE = "lang";

/** Coerce any raw cookie value into a known locale, defaulting to 中文. */
export function normalizeLocale(value: string | undefined | null): Locale {
  return value === "en" ? "en" : DEFAULT_LOCALE;
}

/** `<html lang>` value for a locale (zh → zh-CN for correct CJK handling). */
export function htmlLang(locale: Locale): string {
  return locale === "en" ? "en" : "zh-CN";
}
