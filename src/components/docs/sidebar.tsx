"use client";

import Link from "@/components/i18n/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, Search, X } from "lucide-react";
import type { DocNavGroup, DocNavItem } from "@/lib/docs";
import { cn } from "@/lib/utils";
import { useLocale } from "@/components/i18n/locale-provider";
import { stripLocale, type Locale } from "@/lib/i18n";

/**
 * Docs navigation. Desktop: a sticky rail with a filter box. Phones and
 * tablets: a sticky bar under the site navbar that is always in view while
 * reading: a labelled "Guides" button that opens the full list (with the
 * same filter), the current page and its position, and previous / next.
 */

type Copy = {
  documentation: string;
  guides: string;
  filter: string;
  noMatch: string;
  close: string;
  previous: string;
  next: string;
  of: (i: number, n: number) => string;
  soon: string;
};

const copy: Record<Locale, Copy> = {
  en: {
    documentation: "Documentation",
    guides: "Guides",
    filter: "Find a guide…",
    noMatch: "No guide matches",
    close: "Close",
    previous: "Previous guide",
    next: "Next guide",
    of: (i, n) => `${i} of ${n}`,
    soon: "soon",
  },
  ar: {
    documentation: "التوثيق",
    guides: "الأدلة",
    filter: "ابحث عن دليل…",
    noMatch: "لا يوجد دليل مطابق",
    close: "إغلاق",
    previous: "الدليل السابق",
    next: "الدليل التالي",
    of: (i, n) => `${i} من ${n}`,
    soon: "قريباً",
  },
};

/** Normalises for a forgiving match: case, Arabic diacritics and alef/yeh/teh-marbuta variants. */
function norm(s: string) {
  return s
    .toLowerCase()
    .replace(/[ً-ْـ]/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه");
}

function filterNav(nav: DocNavGroup[], q: string): DocNavGroup[] {
  const needle = norm(q.trim());
  if (!needle) return nav;
  return nav
    .map((g) => ({ ...g, items: g.items.filter((i) => norm(i.title).includes(needle) || norm(g.title).includes(needle)) }))
    .filter((g) => g.items.length > 0);
}

function NavList({ nav, isCurrent, onPick, t }: { nav: DocNavGroup[]; isCurrent: (href: string) => boolean; onPick?: () => void; t: Copy }) {
  if (nav.length === 0) return <p className="px-2.5 py-2 text-sm text-fog-500">{t.noMatch}</p>;
  return (
    <nav aria-label={t.documentation} className="space-y-6">
      {nav.map((group) => (
        <div key={group.title}>
          <p className="mb-1.5 px-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-fog-500">{group.title}</p>
          <ul className="space-y-0.5">
            {group.items.map((item) => {
              const active = isCurrent(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={onPick}
                    className={cn(
                      "flex items-center justify-between gap-2 rounded-lg border-s-2 px-2.5 py-1.5 text-[13.5px] transition-colors",
                      active
                        ? "border-spark-500 bg-spark-50 font-semibold text-spark-800"
                        : "border-transparent text-fog-700 hover:bg-fog-100 hover:text-ink-900",
                    )}
                  >
                    <span>{item.title}</span>
                    {item.status === "stub" ? (
                      <span className="rounded-full bg-fog-100 px-1.5 py-px text-[10px] font-medium text-fog-500">{t.soon}</span>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function FilterBox({ value, onChange, placeholder, autoFocus }: { value: string; onChange: (v: string) => void; placeholder: string; autoFocus?: boolean }) {
  return (
    <label className="relative block">
      <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-fog-400" />
      <input
        type="search"
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="h-10 w-full rounded-xl border border-fog-200 bg-white pe-3 ps-9 text-sm text-ink-900 placeholder:text-fog-400 focus:border-spark-400 focus:outline-none focus:ring-2 focus:ring-spark-100"
      />
    </label>
  );
}

/** Previous / next as icon buttons; arrows mirror in Arabic. */
function Pager({ prev, next, t, className }: { prev: DocNavItem | null; next: DocNavItem | null; t: Copy; className?: string }) {
  const btn = "flex h-9 w-9 items-center justify-center rounded-lg border border-fog-200 bg-white text-ink-900 transition-colors hover:border-spark-300 hover:bg-spark-50";
  const off = "flex h-9 w-9 items-center justify-center rounded-lg border border-fog-100 text-fog-300";
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      {prev ? (
        <Link href={prev.href} className={btn} aria-label={`${t.previous}: ${prev.title}`} title={prev.title}>
          <ArrowLeft className="h-4 w-4 rtl:-scale-x-100" />
        </Link>
      ) : (
        <span className={off} aria-hidden>
          <ArrowLeft className="h-4 w-4 rtl:-scale-x-100" />
        </span>
      )}
      {next ? (
        <Link href={next.href} className={btn} aria-label={`${t.next}: ${next.title}`} title={next.title}>
          <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
        </Link>
      ) : (
        <span className={off} aria-hidden>
          <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
        </span>
      )}
    </div>
  );
}

export function DocsSidebar({ nav }: { nav: DocNavGroup[] }) {
  const locale = useLocale();
  const t = copy[locale];
  // Strip the locale: Arabic URLs carry "/ar", and English pages can report the internal "/en" rewrite.
  const pathname = stripLocale(usePathname());
  const isCurrent = (href: string) => pathname === href;
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [qMobile, setQMobile] = useState("");
  const drawer = useRef<HTMLDivElement>(null);

  const all = useMemo(() => nav.flatMap((g) => g.items), [nav]);
  const index = all.findIndex((i) => i.href === pathname);
  const current = index >= 0 ? all[index] : null;
  const prev = index > 0 ? all[index - 1] : null;
  const next = index >= 0 && index < all.length - 1 ? all[index + 1] : null;
  const group = nav.find((g) => g.items.some((i) => i.href === pathname));

  // The drawer: close on Escape, lock the page behind it, and reset its filter when it closes.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    drawer.current?.querySelector<HTMLElement>("[aria-current=page]")?.scrollIntoView({ block: "center" });
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      setQMobile("");
    };
  }, [open]);

  return (
    <>
      {/* Phones and tablets: a bar that stays under the navbar while reading */}
      <div className="sticky top-16 z-30 -mx-5 border-b border-fog-200 bg-white/95 px-5 py-2.5 backdrop-blur sm:-mx-8 sm:px-8 lg:hidden">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-haspopup="dialog"
            className="flex h-9 shrink-0 items-center gap-1.5 rounded-lg bg-ink-900 px-3 text-[13px] font-semibold text-white"
          >
            <BookOpen className="h-4 w-4" />
            {t.guides}
          </button>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[11px] font-medium text-fog-500">
              {group?.title ?? t.documentation}
              {index >= 0 ? <span className="text-fog-400"> · {t.of(index + 1, all.length)}</span> : null}
            </p>
            <p className="truncate text-[13.5px] font-semibold text-ink-900">{current?.title ?? t.documentation}</p>
          </div>
          <Pager prev={prev} next={next} t={t} />
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label={t.guides}>
          <button type="button" aria-label={t.close} onClick={() => setOpen(false)} className="absolute inset-0 bg-ink-950/40" />
          <div ref={drawer} className="absolute inset-y-0 start-0 flex w-[min(22rem,88vw)] flex-col bg-white shadow-float">
            <div className="flex items-center justify-between border-b border-fog-200 px-4 py-3">
              <p className="flex items-center gap-2 text-[15px] font-semibold text-ink-900">
                <BookOpen className="h-4 w-4 text-spark-600" />
                {t.guides}
                <span className="text-[12px] font-medium text-fog-500">({all.length})</span>
              </p>
              <button type="button" onClick={() => setOpen(false)} aria-label={t.close} className="flex h-9 w-9 items-center justify-center rounded-lg text-fog-600 hover:bg-fog-100">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="border-b border-fog-100 p-3">
              <FilterBox value={qMobile} onChange={setQMobile} placeholder={t.filter} />
            </div>
            <div className="flex-1 overflow-y-auto p-3">
              <NavList nav={filterNav(nav, qMobile)} isCurrent={isCurrent} onPick={() => setOpen(false)} t={t} />
            </div>
          </div>
        </div>
      ) : null}

      {/* Desktop: sticky rail with a filter */}
      <aside className="hidden lg:block">
        <div className="sticky top-24 flex max-h-[calc(100vh-7rem)] flex-col gap-4">
          <FilterBox value={q} onChange={setQ} placeholder={t.filter} />
          <div className="-mx-1 overflow-y-auto px-1 pb-4 pe-3">
            <NavList nav={filterNav(nav, q)} isCurrent={isCurrent} t={t} />
          </div>
        </div>
      </aside>
    </>
  );
}
