"use client";

import { useRef } from "react";
import { ArrowUp, Sparkles } from "lucide-react";
import { useLocale } from "@/components/i18n/locale-provider";
import type { Locale } from "@/lib/i18n";
import { gsap, useGSAP, MOTION_OK, playWhileVisible } from "./gsap";

/**
 * A command bar that types real requests to the assistant, one after the
 * other, each followed by what it produces. Every example is something the
 * assistant does today (modules.ts, "ai-assistant"). The first prompt and
 * its result are in the HTML; all prompts are listed as chips below, so the
 * content is there without JavaScript.
 */

type P = { ask: string; result: string };

const prompts: Record<Locale, { label: string; examples: string; items: P[] }> = {
  en: {
    label: "Ask in a sentence, in English or Arabic",
    examples: "Things teams ask it",
    items: [
      { ask: "Create a booking for Al Noor Trading, Jeddah to Shanghai, 2 × 40HC", result: "Booking proposed · confirm to save" },
      { ask: "Read this rate sheet and add the routes", result: "Route rates proposed from the attachment" },
      { ask: "Who owes us the most?", result: "AR aging · top customers by balance" },
      { ask: "Invoice NXS26000412 from its sale lines", result: "Draft invoice proposed" },
      { ask: "Add the customs charge from this vendor invoice", result: "Cost line proposed on the booking" },
      { ask: "What needs me today?", result: "Your daily brief" },
    ],
  },
  ar: {
    label: "اطلب بجملة، بالعربي أو الإنجليزي",
    examples: "أمثلة مما يطلبه الفريق",
    items: [
      { ask: "أنشئ حجزاً لشركة النور للتجارة من جدة إلى شنغهاي، 2 × 40HC", result: "حجز مقترح · أكّد للحفظ" },
      { ask: "اقرأ قائمة الأسعار هذه وأضف المسارات", result: "أسعار مسارات مقترحة من المرفق" },
      { ask: "مين أكثر عميل يطلبنا فلوس؟", result: "أعمار الذمم · العملاء الأعلى رصيداً" },
      { ask: "أصدر فاتورة الحجز NXS26000412 من بنود البيع", result: "مسودة فاتورة مقترحة" },
      { ask: "أضف رسوم التخليص من فاتورة المورد هذه", result: "بند تكلفة مقترح في الحجز" },
      { ask: "وش يحتاجني اليوم؟", result: "ملخصك اليومي" },
    ],
  },
};

export function PromptTyper() {
  const locale = useLocale();
  const t = prompts[locale];
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const ask = el.querySelector<HTMLElement>("[data-ask]");
      const result = el.querySelector<HTMLElement>("[data-result]");
      const resultText = el.querySelector<HTMLElement>("[data-result-text]");
      const caret = el.querySelector<HTMLElement>("[data-caret]");
      const chips = gsap.utils.toArray<HTMLElement>("[data-example]", el);
      if (!ask || !result || !resultText || !caret) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const blink = gsap.to(caret, { opacity: 0, duration: 0.5, repeat: -1, yoyo: true, ease: "steps(1)" });
        const tl = gsap.timeline({ repeat: -1 });
        t.items.forEach((p, i) => {
          const chars = Array.from(p.ask);
          const o = { n: 0 };
          tl.add(() => {
            ask.textContent = "";
            resultText.textContent = p.result;
            chips.forEach((c, k) => c.toggleAttribute("data-on", k === i));
          })
            .set(result, { opacity: 0, y: 8 })
            .to(o, {
              n: chars.length,
              duration: Math.min(2.4, chars.length * 0.045),
              ease: "none",
              onUpdate: () => (ask.textContent = chars.slice(0, Math.round(o.n)).join("")),
            })
            .to(result, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "+=0.35")
            .to({}, { duration: 1.8 });
        });
        const st = playWhileVisible(tl, el);
        return () => {
          st.kill();
          blink.kill();
        };
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [locale] },
  );

  return (
    <div ref={root} className="mx-auto max-w-3xl">
      <p className="text-center text-[13px] font-semibold text-spark-300">{t.label}</p>
      <div className="mt-4 rounded-2xl bg-white/[0.06] p-2 ring-1 ring-white/15 backdrop-blur">
        <div className="flex items-center gap-3 rounded-xl bg-ink-950/70 px-4 py-3.5">
          <Sparkles className="h-4 w-4 shrink-0 text-spark-400" />
          <p className="min-h-[1.5em] flex-1 text-[15px] text-white sm:text-base">
            <span data-ask="" dir="auto">{t.items[0].ask}</span>
            <span data-caret="" className="ms-0.5 inline-block h-[1.1em] w-[2px] translate-y-[3px] bg-spark-300" aria-hidden />
          </p>
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-spark-400 text-ink-950">
            <ArrowUp className="h-4 w-4" />
          </span>
        </div>
        <div data-result="" className="flex items-center gap-2 px-4 py-2.5 text-[13px] text-spark-200">
          <span className="h-1.5 w-1.5 rounded-full bg-spark-300" />
          <span data-result-text="">{t.items[0].result}</span>
        </div>
      </div>
      <ul className="mt-4 flex flex-wrap justify-center gap-2" aria-label={t.examples}>
        {t.items.map((p, i) => (
          <li
            key={p.ask}
            data-example=""
            data-on={i === 0 ? "" : undefined}
            dir="auto"
            className="rounded-full bg-white/[0.04] px-3 py-1 text-[12px] text-white/55 ring-1 ring-white/10 transition-colors duration-300 data-[on]:bg-spark-400/15 data-[on]:text-spark-200 data-[on]:ring-spark-400/30"
          >
            {p.ask}
          </li>
        ))}
      </ul>
    </div>
  );
}
