import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/lib/i18n";

/**
 * English is served at unprefixed URLs, so "/pricing" is rewritten to the
 * "/en/pricing" route internally. "/en/..." itself redirects to the
 * unprefixed URL so there is only one public address per page. Other locales
 * ("/ar/...") pass straight through to the [lang] segment.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];

  if (first === defaultLocale) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  if (isLocale(first)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals and any path with a file extension (icon.svg, sitemap.xml, robots.txt, ...).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
