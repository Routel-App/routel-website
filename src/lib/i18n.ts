/**
 * Locales the site is published in. English is the default and is served at
 * unprefixed URLs (/pricing); every other locale lives under its own prefix
 * (/ar/pricing). src/proxy.ts rewrites unprefixed requests to /en internally.
 */
export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string | undefined | null): value is Locale {
  return (locales as readonly string[]).includes(value ?? "");
}

export function dirFor(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

/** Label for the language switcher: the name of the *other* language, in that language. */
export const localeNames: Record<Locale, string> = { en: "English", ar: "العربية" };

/** Remove a leading locale segment: "/ar/pricing" -> "/pricing", "/ar" -> "/". */
export function stripLocale(pathname: string): string {
  const seg = pathname.split("/")[1];
  if (!isLocale(seg)) return pathname || "/";
  const rest = pathname.slice(seg.length + 1);
  return rest === "" ? "/" : rest;
}

/**
 * Prefix an internal href with the locale. External links, mailto:, hash-only
 * and already-prefixed hrefs pass through untouched.
 */
export function localizeHref(href: string, locale: Locale): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  const seg = href.split(/[/?#]/)[1];
  if (isLocale(seg)) return href;
  if (locale === defaultLocale) return href;
  if (href === "/") return `/${locale}`;
  if (href.startsWith("/#") || href.startsWith("/?")) return `/${locale}${href.slice(1)}`;
  return `/${locale}${href}`;
}

/** Pick the value for the current locale from a { en, ar } map. */
export function pick<T>(copy: Record<Locale, T>, locale: Locale): T {
  return copy[locale] ?? copy[defaultLocale];
}
