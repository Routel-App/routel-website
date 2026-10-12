"use client";

import { createContext, useContext, type ReactNode } from "react";
import { defaultLocale, type Locale } from "@/lib/i18n";

const LocaleContext = createContext<Locale>(defaultLocale);

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

/** Current locale for Client Components. Server Components use getLocale() instead. */
export function useLocale(): Locale {
  return useContext(LocaleContext);
}
