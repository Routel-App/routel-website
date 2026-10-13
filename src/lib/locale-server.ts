import { lang } from "next/root-params";
import { defaultLocale, isLocale, type Locale } from "./i18n";

/** Current locale for Server Components and server utilities (not Client Components). */
export async function getLocale(): Promise<Locale> {
  const value = await lang();
  return isLocale(value) ? value : defaultLocale;
}
