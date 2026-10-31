"use client";

import Link from "@/components/i18n/link";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { getServices, getSegments } from "@/lib/services";
import { Eyebrow } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { useLocale } from "@/components/i18n/locale-provider";
import type { Locale } from "@/lib/i18n";

const copy = {
  en: { label: "Solutions", live: "Available now", coming: "Rolling out", soon: "Soon", who: "Who it's for", all: "All solutions", allText: "Every service on one Maritime & Logistics Operating System." },
  ar: { label: "الحلول", live: "متاحة الآن", coming: "قيد الإطلاق", soon: "قريباً", who: "لمن صُمّم", all: "كل الحلول", allText: "كل الخدمات على نظام تشغيل بحري ولوجستي واحد." },
} satisfies Record<Locale, Record<string, string>>;

/** "Solutions" mega menu: the services Routel runs, by status, and who it's for. */
export function SolutionsMenu({ inverse }: { inverse: boolean }) {
  const locale = useLocale();
  const t = copy[locale];
  const services = getServices(locale);
  const segments = getSegments(locale);
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const reduce = useReducedMotion();
  const id = useId();

  const cancelClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpen(false), 120);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);
  const live = services.filter((s) => s.status === "live");
  const coming = services.filter((s) => s.status === "coming");

  return (
    <div onMouseEnter={() => (cancelClose(), setOpen(true))} onMouseLeave={scheduleClose}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
          inverse
            ? cn("text-white/80 hover:bg-white/10 hover:text-white", open && "bg-white/10 text-white")
            : cn("text-fog-700 hover:bg-fog-100 hover:text-ink-900", open && "bg-fog-100 text-ink-900"),
        )}
      >
        {t.label}
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            id={id}
            initial={reduce ? false : { opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-1/2 top-[52px] z-50 w-[min(92vw,1040px)] -translate-x-1/2 pt-3"
          >
            <div className="grid grid-cols-[1fr_1fr_0.9fr] gap-6 rounded-2xl border border-fog-200 bg-white p-6 text-start shadow-float">
              <div>
                <Eyebrow tone="teal" className="mb-3">{t.live}</Eyebrow>
                <ul className="space-y-0.5">
                  {live.map((s) => {
                    const Icon = s.icon;
                    return (
                      <li key={s.slug}>
                        <Link href={s.href ?? "/solutions"} onClick={close} className="group flex items-start gap-3 rounded-xl px-2.5 py-2 transition-colors hover:bg-fog-50">
                          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ink-900 text-spark-400">
                            <Icon className="h-4 w-4" strokeWidth={1.75} />
                          </span>
                          <span>
                            <span className="block text-[13.5px] font-semibold text-ink-900">{s.name}</span>
                            <span className="block text-[12px] leading-snug text-fog-500">{s.short}</span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div>
                <Eyebrow tone="ink" className="mb-3">{t.coming}</Eyebrow>
                <ul className="grid grid-cols-1 gap-0.5">
                  {coming.map((s) => {
                    const Icon = s.icon;
                    return (
                      <li key={s.slug}>
                        <Link href={`/solutions#${s.slug}`} onClick={close} className="flex items-center gap-3 rounded-xl px-2.5 py-2 transition-colors hover:bg-fog-50">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-fog-100 text-fog-500">
                            <Icon className="h-4 w-4" strokeWidth={1.75} />
                          </span>
                          <span className="flex-1 text-[13.5px] font-medium text-fog-700">{s.name}</span>
                          <span className="rounded-full bg-fog-100 px-2 py-0.5 text-[10.5px] font-semibold text-fog-500">{t.soon}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="flex flex-col gap-3">
                <div className="rounded-xl bg-fog-50 p-4">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-fog-500">{t.who}</p>
                  <ul className="space-y-1">
                    {segments.map((g) => (
                      <li key={g.slug}>
                        <Link href={`/solutions#for-${g.slug}`} onClick={close} className="block rounded-lg px-2 py-1.5 text-[13px] font-medium text-ink-900 hover:bg-white">
                          {g.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href="/solutions" onClick={close} className="group relative flex flex-col overflow-hidden rounded-xl bg-ink-950 p-4 text-white">
                  <span className="font-display text-[15px] font-semibold">{t.all}</span>
                  <span className="mt-1 text-[12.5px] leading-relaxed text-white/65">{t.allText}</span>
                  <ArrowRight className="mt-3 h-4 w-4 text-spark-300 transition-transform ltr:group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
