"use client";

import { useEffect, useRef, useState } from "react";
import { Ship } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The same booking card in English and in Arabic, flipping between the two
 * every few seconds while on screen (a toggle lets the visitor choose; no
 * auto-flip with prefers-reduced-motion). Shows that the whole interface
 * mirrors, not just the words.
 */

const sides = {
  en: {
    dir: "ltr" as const,
    label: "English",
    booking: "Booking",
    status: "Booking Confirmed",
    customer: "Al Noor Trading Co.",
    route: ["Jeddah", "Shanghai"],
    arrow: "→",
    rows: [
      ["Shipping line", "MSC"],
      ["Containers", "2 × 40HC"],
      ["ETD", "18 Oct 2026"],
    ],
    total: ["Invoice total", "SAR 18,250.00"],
    vat: "incl. VAT 15%",
  },
  ar: {
    dir: "rtl" as const,
    label: "العربية",
    booking: "الحجز",
    status: "تم تأكيد الحجز",
    customer: "شركة النور للتجارة",
    route: ["جدة", "شنغهاي"],
    arrow: "←",
    rows: [
      ["الخط الملاحي", "MSC"],
      ["الحاويات", "2 × 40HC"],
      ["تاريخ المغادرة المتوقع", "18 أكتوبر 2026"],
    ],
    total: ["إجمالي الفاتورة", "SAR 18,250.00"],
    vat: "شاملة ضريبة القيمة المضافة 15%",
  },
};

type Side = keyof typeof sides;

export function LanguageFlip({ start = "ar", hint }: { start?: Side; hint: string }) {
  const [side, setSide] = useState<Side>(start);
  const [auto, setAuto] = useState(true);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!auto || !inView || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setSide((s) => (s === "ar" ? "en" : "ar")), 3200);
    return () => window.clearInterval(id);
  }, [auto, inView]);

  const t = sides[side];
  return (
    <div ref={ref}>
      <div className="flex items-center justify-between gap-3">
        <p className="text-[13px] font-medium text-white/60">{hint}</p>
        <div role="group" className="flex rounded-full bg-white/[0.06] p-1 ring-1 ring-white/10">
          {(Object.keys(sides) as Side[]).map((k) => (
            <button
              key={k}
              type="button"
              aria-pressed={side === k}
              onClick={() => {
                setSide(k);
                setAuto(false);
              }}
              className={cn(
                "rounded-full px-3.5 py-1 text-[13px] font-semibold transition-colors duration-300",
                side === k ? "bg-teal-400 text-ink-950" : "text-white/70 hover:text-white",
              )}
            >
              {sides[k].label}
            </button>
          ))}
        </div>
      </div>

      <div
        key={side}
        dir={t.dir}
        lang={side}
        className="lang-flip mt-4 rounded-2xl bg-white p-5 text-ink-900 shadow-float"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-medium text-fog-500">{t.booking}</p>
            <p dir="ltr" className="font-mono text-[14px] font-semibold [unicode-bidi:plaintext]">NXS26000412</p>
            <p className="mt-0.5 truncate text-[13px] text-fog-600">{t.customer}</p>
          </div>
          <span className="shrink-0 rounded-full bg-teal-50 px-2.5 py-1 text-[11.5px] font-semibold text-teal-700 ring-1 ring-teal-200">{t.status}</span>
        </div>
        <p className="mt-4 flex items-center gap-2 text-[15px] font-semibold">
          <Ship className="h-4 w-4 text-teal-600" />
          {t.route[0]} <span className="text-fog-400">{t.arrow}</span> {t.route[1]}
        </p>
        <dl className="mt-3 grid grid-cols-3 gap-3 border-t border-fog-100 pt-3">
          {t.rows.map(([k, v]) => (
            <div key={k} className="min-w-0">
              <dt className="truncate text-[11px] text-fog-500">{k}</dt>
              <dd className="mt-0.5 text-[13px] font-medium">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-4 flex items-end justify-between gap-3 rounded-xl bg-fog-50 px-3.5 py-2.5">
          <div>
            <p className="text-[11px] text-fog-500">{t.total[0]}</p>
            <p className="text-[10.5px] text-fog-400">{t.vat}</p>
          </div>
          <p dir="ltr" className="font-mono text-[16px] font-semibold">{t.total[1]}</p>
        </div>
      </div>
    </div>
  );
}
