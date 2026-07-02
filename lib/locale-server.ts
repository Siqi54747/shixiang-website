/**
 * Server-only locale reader.
 *
 * Reads the `lang` cookie in Server Components / route handlers and
 * returns the active Locale. Importing `next/headers` makes any route
 * that calls this dynamically rendered — acceptable here: the site is
 * low-traffic and the default-locale (zh, no cookie) render is what
 * crawlers see, so primary SEO is unaffected.
 *
 * Do NOT import this from a "use client" file — use the LocaleProvider
 * context (`useLocale`) there instead.
 */

import { cookies } from "next/headers";
import { LOCALE_COOKIE, normalizeLocale, type Locale } from "./i18n";

export function getLocale(): Locale {
  return normalizeLocale(cookies().get(LOCALE_COOKIE)?.value);
}
