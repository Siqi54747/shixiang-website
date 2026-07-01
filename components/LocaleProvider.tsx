"use client";

import { createContext, useContext } from "react";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n";

/**
 * Client-side locale context. The value is fed from the root layout
 * (a Server Component that read the `lang` cookie), so after the
 * language switcher sets the cookie + router.refresh(), the layout
 * re-renders with the new locale and this provider hands the new value
 * to every client component below it.
 */
const LocaleContext = createContext<Locale>(DEFAULT_LOCALE);

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}
