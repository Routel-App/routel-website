"use client";

import { useRef } from "react";
import { ArrowRight, Check, X } from "lucide-react";
import { useLocale } from "@/components/i18n/locale-provider";
import type { Locale } from "@/lib/i18n";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section";
import { Lottie } from "@/components/motion/lottie";
import { gsap, useGSAP, MOTION_OK } from "@/components/motion/gsap";
import { cn } from "@/lib/utils";

/**
 * "The spreadsheet was never built for this": an infographic. On the left,
 * the cells of a spreadsheet fly into the booking's container (Lottie). On
 * the right, four things a shared sheet can't do, each crossing a spine
 * into what Routel does instead; the connectors draw and the answers light
 * up as the section scrolls in.
 */

type Row = { pain: string; painNote: string; answer: string; module: string };
type Copy = { eyebrow: string; title: string; lead: string; left: string; right: string; rows: Row[]; foot: string };

const copy: Record<Locale, Copy> = {
  en: {
    eyebrow: "From Excel to one system",
    title: "The spreadsheet was never built for this",
    lead: "A shared sheet is where a forwarder's rates, bookings and invoices usually start. It can't tell you which copy is current, who changed a cell, or what the month looks like before the accountant is done.",
    left: "A shared spreadsheet",
    right: "In Routel",
    rows: [
      { pain: "Which file is current?", painNote: "rates_2026_FINAL_v3 (1).xlsx", answer: "One buying rate per lane, with a validity date", module: "Routes" },
      { pain: "The same booking typed into three tabs", painNote: "Tracker · Invoicing · Accounts", answer: "One record that every module reads", module: "Bookings" },
      { pain: "Who changed this cell?", painNote: "Last edited by … 14 people", answer: "An activity log on every booking", module: "Audit" },
      { pain: "The month closes when the accountant finishes", painNote: "Export · re-key · reconcile", answer: "P&L, aging and cash computed live", module: "Accounting" },
    ],
    foot: "Fewer files, fewer handovers, nothing re-typed: the same team handles more bookings.",
  },
  ar: {
    eyebrow: "من Excel إلى نظام واحد",
    title: "جدول البيانات لم يُصمَّم لهذا",
    lead: "الجدول المشترك هو ما تبدأ به معظم شركات الشحن: الأسعار والحجوزات والفواتير فيه. لكنه لا يعرف أي نسخة هي الصحيحة، ولا من غيّر الخلية، ولا كيف يبدو الشهر قبل أن ينتهي المحاسب.",
    left: "جدول بيانات مشترك",
    right: "في Routel",
    rows: [
      { pain: "أي ملف هو الحالي؟", painNote: "rates_2026_FINAL_v3 (1).xlsx", answer: "سعر شراء واحد لكل مسار، بتاريخ صلاحية", module: "المسارات" },
      { pain: "الحجز نفسه يُكتب في ثلاث صفحات", painNote: "متابعة · فواتير · حسابات", answer: "سجل واحد تقرؤه كل الوحدات", module: "الحجوزات" },
      { pain: "من غيّر هذه الخلية؟", painNote: "آخر تعديل بواسطة… 14 شخصاً", answer: "سجل نشاط في كل حجز", module: "التدقيق" },
      { pain: "الشهر يُقفل حين ينتهي المحاسب", painNote: "تصدير · إعادة إدخال · مطابقة", answer: "الأرباح والخسائر وأعمار الذمم والنقد محسوبة مباشرة", module: "المحاسبة" },
    ],
    foot: "ملفات أقل، وتسليم أقل بين الموظفين، ولا إعادة كتابة: الفريق نفسه يدير حجوزات أكثر.",
  },
};

export function SheetToSystem() {
  const locale = useLocale();
  const t = copy[locale];
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const rows = gsap.utils.toArray<HTMLElement>("[data-row]", el);
        rows.forEach((row, i) => {
          const link = row.querySelector<SVGPathElement>("[data-link]");
          const answer = row.querySelector<HTMLElement>("[data-answer]");
          const pain = row.querySelector<HTMLElement>("[data-pain]");
          if (!link || !answer || !pain) return;
          gsap
            .timeline({ scrollTrigger: { trigger: row, start: "top 80%", once: true } })
            .from(pain, { x: -16, opacity: 0, duration: 0.45, ease: "power2.out" }, i * 0.05)
            .fromTo(link, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.6, ease: "power2.inOut" }, "+=0.05")
            .from(answer, { x: 16, opacity: 0, duration: 0.45, ease: "power2.out" }, "-=0.25")
            .fromTo(answer.querySelector("[data-tick]"), { scale: 0 }, { scale: 1, duration: 0.3, ease: "back.out(2.5)" }, "-=0.1");
        });
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [locale] },
  );

  return (
    <section ref={root} id="sheet" className="relative bg-spark-50 py-20 sm:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <Eyebrow tone="spark">{t.eyebrow}</Eyebrow>
            <h2 className="font-display mt-4 text-balance text-3xl font-bold leading-[1.1] text-ink-900 sm:text-4xl lg:text-[2.75rem]">{t.title}</h2>
            <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-fog-600 sm:text-lg">{t.lead}</p>
            <div className="mt-8 overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-spark-100">
              <Lottie src="/lottie/sheet-to-system.json" className="aspect-[4/3] w-full" />
            </div>
          </div>

          {/* The crossing: pain on the start side, answer on the end side */}
          <div>
            <div className="mb-3 hidden grid-cols-[1fr_56px_1fr] text-[12px] sm:grid font-semibold uppercase tracking-[0.1em] sm:text-[12.5px]">
              <span className="text-fog-500">{t.left}</span>
              <span />
              <span className="text-teal-700">{t.right}</span>
            </div>
            <ol className="space-y-3">
              {t.rows.map((r, i) => (
                <li key={r.pain} data-row="" className="grid grid-cols-1 items-stretch sm:grid-cols-[1fr_56px_1fr]">
                  <div data-pain="" className="rounded-2xl bg-white p-4 ring-1 ring-fog-200">
                    <p className="flex items-start gap-2 text-[14px] font-semibold text-ink-900">
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-spark-500" />
                      {r.pain}
                    </p>
                    <p dir="auto" className="mt-1.5 truncate font-mono text-[11px] text-fog-500">{r.painNote}</p>
                  </div>
                  <span className="mx-auto block h-6 w-0.5 bg-teal-400 sm:hidden" aria-hidden />
                  <svg viewBox="0 0 56 60" preserveAspectRatio="none" className="hidden h-full w-full rtl:-scale-x-100 sm:block" aria-hidden>
                    <path data-link="" d="M0 30 C 20 30, 36 30, 56 30" fill="none" stroke="var(--color-teal-400)" strokeWidth="2.5" strokeDasharray="1" pathLength={1} style={{ strokeDashoffset: 0 }} />
                    <circle cx="28" cy="30" r="5" fill="var(--color-teal-400)" />
                  </svg>
                  <div data-answer="" className={cn("rounded-2xl bg-ink-900 p-4 text-white ring-1 ring-ink-800", i === 3 && "bg-teal-700 ring-teal-600")}>
                    <p className="flex items-start gap-2 text-[14px] font-semibold">
                      <span data-tick="" className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-teal-400 text-ink-950">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      {r.answer}
                    </p>
                    <p className="mt-1.5 text-[11.5px] font-medium text-teal-200">{r.module}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-6 flex items-start gap-2 border-s-2 border-spark-400 ps-4 text-[15px] font-medium leading-relaxed text-ink-900">
              <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-spark-500" />
              {t.foot}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
