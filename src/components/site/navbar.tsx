"use client";

import NextLink from "next/link";
import Link from "@/components/i18n/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Languages, Menu, Sparkles, X } from "lucide-react";
import { site, siteCopy } from "@/lib/site";
import { localeNames, localizeHref, stripLocale, type Locale } from "@/lib/i18n";
import { useLocale } from "@/components/i18n/locale-provider";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { ProductMenu } from "./product-menu";
import { SolutionsMenu } from "./solutions-menu";
import { getServices } from "@/lib/services";
import { getModules } from "@/lib/modules";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

/** Routes whose top section is dark; the navbar starts in its inverse (light-on-dark) look there. */
const DARK_HERO_ROUTES = new Set<string>([]);

const copy = {
  en: { home: "Routel home", docs: "Documentation", product: "Platform", solutions: "Solutions", more: "More", open: "Open menu", close: "Close menu", switchTo: "Switch to Arabic" },
  ar: { home: "الصفحة الرئيسية لـ Routel", docs: "التوثيق", product: "المنصة", solutions: "الحلول", more: "المزيد", open: "فتح القائمة", close: "إغلاق القائمة", switchTo: "التبديل إلى الإنجليزية" },
} satisfies Record<Locale, Record<string, string>>;

/**
 * Links to the current page in the other language. Uses next/link directly:
 * the localized Link would re-prefix the target with the current locale.
 */
function LanguageSwitch({ path, inverse, className }: { path: string; inverse: boolean; className?: string }) {
  const locale = useLocale();
  const target: Locale = locale === "ar" ? "en" : "ar";
  return (
    <NextLink
      href={localizeHref(path, target)}
      hrefLang={target}
      lang={target}
      aria-label={copy[locale].switchTo}
      className={cn(
        "inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-sm font-medium transition-colors",
        inverse ? "text-white/85 ring-1 ring-white/15 hover:bg-white/10 hover:text-white" : "text-ink-900 ring-1 ring-fog-200 hover:bg-fog-100",
        className,
      )}
    >
      <Languages className="h-4 w-4" aria-hidden />
      {localeNames[target]}
    </NextLink>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const t = copy[locale];
  const nav = siteCopy[locale].nav;
  const ctaLabel = siteCopy[locale].ctaLabel;
  const modules = getModules(locale);
  const services = getServices(locale);
  // The browser URL carries the locale prefix on Arabic pages; compare against the bare path.
  const pathname = stripLocale(usePathname());
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const inverse = DARK_HERO_ROUTES.has(pathname) && !scrolled && !open;

  const isActive = (href: string) => {
    const path = href.split("#")[0];
    if (!path || path === "/") return false;
    return pathname === path || pathname.startsWith(path + "/");
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,box-shadow,border-color,color] duration-300",
        scrolled || open
          ? "border-b border-fog-200/80 bg-white/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" aria-label={t.home} className="shrink-0">
          <Logo inverse={inverse} tagline="Maritime & Logistics" taglineClassName="hidden xl:block" />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          <SolutionsMenu inverse={inverse} />
          <ProductMenu inverse={inverse} />
          {nav.map((item) => (
            <div key={item.href} className="group/nav relative">
              <Link
                href={item.href}
                className={cn(
                  "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  inverse
                    ? "text-white/80 hover:bg-white/10 hover:text-white"
                    : isActive(item.href)
                      ? "bg-fog-100 text-ink-900"
                      : "text-fog-700 hover:bg-fog-100 hover:text-ink-900",
                )}
              >
                {item.hint ? <Sparkles className="h-3.5 w-3.5 text-spark-400" aria-hidden /> : null}
                {item.label}
              </Link>
              {item.hint ? (
                // The assistant's pitch, shown under the link on hover / keyboard focus.
                <div className="pointer-events-none absolute start-1/2 top-full z-50 w-64 pt-2 opacity-0 transition-opacity duration-150 ltr:-translate-x-1/2 rtl:translate-x-1/2 group-focus-within/nav:opacity-100 group-hover/nav:opacity-100">
                  <p className="rounded-xl bg-ink-950 px-3.5 py-2.5 text-center text-[12.5px] leading-relaxed text-white shadow-float ring-1 ring-white/10">
                    {item.hint}
                  </p>
                </div>
              ) : null}
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <LanguageSwitch path={pathname} inverse={inverse} />
          <Button href="/docs" variant={inverse ? "inverse-ghost" : "ghost"} size="sm">
            {t.docs}
          </Button>
          <Button href={site.cta.href} variant={inverse ? "inverse" : "primary"} size="sm">
            {ctaLabel}
          </Button>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <LanguageSwitch path={pathname} inverse={inverse} className="h-10" />
          <button
            type="button"
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full lg:hidden",
              inverse ? "text-white hover:bg-white/10" : "text-ink-900 hover:bg-fog-100",
            )}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.close : t.open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={reduce ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="border-t border-fog-200 bg-white lg:hidden"
          >
            <Container className="flex max-h-[calc(100svh-4rem)] flex-col gap-1 overflow-y-auto py-4">
              <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-fog-500">{t.solutions}</p>
              <div className="grid grid-cols-2 gap-1">
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    href={s.href}
                    className={cn("rounded-xl px-3 py-2 text-[13.5px] font-medium hover:bg-fog-100", s.status === "live" ? "text-ink-900" : "text-fog-500")}
                    onClick={() => setOpen(false)}
                  >
                    {s.name}
                  </Link>
                ))}
              </div>
              <p className="px-3 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-fog-500">{t.product}</p>
              <div className="grid grid-cols-2 gap-1">
                {modules
                  .filter((m) => m.slug !== "ai-assistant")
                  .map((m) => (
                    <Link
                      key={m.slug}
                      href={`/platform/${m.slug}`}
                      className="rounded-xl px-3 py-2 text-[13.5px] font-medium text-ink-900 hover:bg-fog-100"
                      onClick={() => setOpen(false)}
                    >
                      {m.name}
                    </Link>
                  ))}
              </div>
              <p className="px-3 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-fog-500">{t.more}</p>
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-3 py-3 text-base font-medium text-ink-900 hover:bg-fog-100"
                  onClick={() => setOpen(false)}
                >
                  <span className="flex items-center gap-1.5">
                    {item.hint ? <Sparkles className="h-4 w-4 text-spark-400" aria-hidden /> : null}
                    {item.label}
                  </span>
                  {item.hint ? <span className="mt-0.5 block text-[13px] font-normal text-fog-500">{item.hint}</span> : null}
                </Link>
              ))}
              <div className="mt-3 flex flex-col gap-2">
                <Button href="/docs" variant="secondary">
                  {t.docs}
                </Button>
                <Button href={site.cta.href}>{ctaLabel}</Button>
              </div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
