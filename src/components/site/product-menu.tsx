"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Bot, ChevronDown } from "lucide-react";
import { modules } from "@/lib/modules";
import { Eyebrow } from "@/components/ui/section";
import { cn } from "@/lib/utils";

const groups: Array<{ label: string; tone: "teal" | "ink"; slugs: string[] }> = [
  { label: "Operations", tone: "teal", slugs: ["shipments", "bookings", "quotations", "bill-of-lading", "documents", "tracking"] },
  { label: "Finance & accounting", tone: "ink", slugs: ["invoicing", "finance-receivables", "credit-notes", "credit-applications", "expenses", "accounting"] },
  { label: "Sales, partners & access", tone: "teal", slugs: ["business-partners", "labeling-center", "roles", "email-sync", "visitor-tracking", "compliance"] },
];

/**
 * "Product" mega menu. Opens on hover or click on desktop; the mobile nav
 * lists the same links inline instead.
 */
export function ProductMenu({ inverse, onNavigate }: { inverse: boolean; onNavigate?: () => void }) {
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

  const close = () => {
    setOpen(false);
    onNavigate?.();
  };

  return (
    <div className="relative" onMouseEnter={() => (cancelClose(), setOpen(true))} onMouseLeave={scheduleClose}>
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
        Product
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
            className="absolute left-1/2 top-full z-50 w-[min(92vw,1040px)] -translate-x-1/2 pt-3"
          >
            <div className="grid grid-cols-[1fr_1fr_1fr_0.85fr] gap-6 rounded-2xl border border-fog-200 bg-white p-6 text-left shadow-float">
              {groups.map((g) => (
                <div key={g.label}>
                  <Eyebrow tone={g.tone} className="mb-3">
                    {g.label}
                  </Eyebrow>
                  <ul className="space-y-0.5">
                    {g.slugs.map((slug) => {
                      const m = modules.find((x) => x.slug === slug);
                      if (!m) return null;
                      const Icon = m.icon;
                      return (
                        <li key={slug}>
                          <Link
                            href={`/platform/${m.slug}`}
                            onClick={close}
                            className="group flex items-start gap-3 rounded-xl px-2.5 py-2 transition-colors hover:bg-fog-50"
                          >
                            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700 ring-1 ring-inset ring-teal-100 transition-colors group-hover:bg-teal-100">
                              <Icon className="h-4 w-4" strokeWidth={1.75} />
                            </span>
                            <span>
                              <span className="block text-[13.5px] font-semibold text-ink-900">{m.name}</span>
                              <span className="block text-[12px] leading-snug text-fog-500">{m.short}</span>
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}

              <div className="flex flex-col gap-3">
                <Link
                  href="/platform/ai-assistant"
                  onClick={close}
                  className="group relative flex flex-1 flex-col overflow-hidden rounded-xl bg-ink-950 p-5 text-white transition-transform hover:-translate-y-0.5"
                >
                  <div aria-hidden className="grid-fade-dark absolute inset-0" />
                  <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-spark-400/20 text-spark-300">
                    <Bot className="h-5 w-5" />
                  </span>
                  <span className="font-display relative mt-4 text-[16px] font-semibold">AI Assistant</span>
                  <span className="relative mt-1 text-[12.5px] leading-relaxed text-white/65">
                    Create jobs, invoices and reports by chatting in Arabic or English. Every write needs your confirmation.
                  </span>
                  <span className="relative mt-4 inline-flex items-center gap-1 text-[12.5px] font-medium text-teal-300">
                    See it work <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
                <Link
                  href="/docs"
                  onClick={close}
                  className="flex items-center justify-between rounded-xl border border-fog-200 px-4 py-2.5 text-[13px] font-medium text-ink-900 transition-colors hover:bg-fog-50"
                >
                  Documentation
                  <ArrowRight className="h-4 w-4 text-fog-400" />
                </Link>
                <Link
                  href="/glossary"
                  onClick={close}
                  className="flex items-center justify-between rounded-xl border border-fog-200 px-4 py-2.5 text-[13px] font-medium text-ink-900 transition-colors hover:bg-fog-50"
                >
                  Glossary
                  <ArrowRight className="h-4 w-4 text-fog-400" />
                </Link>
                <Link
                  href="/case-studies"
                  onClick={close}
                  className="flex items-center justify-between rounded-xl border border-fog-200 px-4 py-2.5 text-[13px] font-medium text-ink-900 transition-colors hover:bg-fog-50"
                >
                  Case studies
                  <ArrowRight className="h-4 w-4 text-fog-400" />
                </Link>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
