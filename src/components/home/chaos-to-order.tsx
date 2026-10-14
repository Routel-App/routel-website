"use client";

import { useRef } from "react";
import { Check, FileSpreadsheet, FileText, Mail, MessageCircle, StickyNote, Table2, FileType2 } from "lucide-react";
import { useLocale } from "@/components/i18n/locale-provider";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section";
import { gsap, useGSAP, MOTION_OK } from "@/components/motion/gsap";

/**
 * "Seven places for one shipment": the files a forwarder juggles (rate
 * sheet, shared tracker, carrier PDF, an e-mail chain, a chat, a Word
 * invoice, a sticky note) fly into one Routel booking, and each lands as
 * the line of the booking that replaces it.
 *
 * Large screens: the stage is pinned and scrubbed by scroll. Smaller
 * screens: it plays once on entering. The markup is the end state readable
 * on its own (no JS / reduced motion): the booking, with the files faint
 * around it.
 */

type Item = { file: string; app: string; becomes: string };

type Copy = { eyebrow: string; title: string; lead: string; before: string; after: string; card: string; items: Item[]; outro: string };

const copy: Record<Locale, Copy> = {
  en: {
    eyebrow: "Less chaos",
    title: "Seven places for one shipment. Or one booking.",
    lead: "Rates in one spreadsheet, status in another, the carrier's PDF in someone's inbox, the invoice in Word and the reminder on a sticky note. Routel puts all of it on the booking, so nobody re-types, hunts or asks twice.",
    before: "places to look",
    after: "record",
    card: "Booking",
    items: [
      { file: "rates_2026_FINAL_v3.xlsx", app: "Excel", becomes: "Route rates, with validity" },
      { file: "Bookings tracker (shared)", app: "Google Sheets", becomes: "Status: 11 stages on the booking" },
      { file: "MSC_confirmation.pdf", app: "PDF", becomes: "Carrier booking, read by the AI" },
      { file: "RE: RE: FW: container no.?", app: "E-mail", becomes: "E-mails linked to the booking" },
      { file: "Gate in done? ETD?", app: "Chat", becomes: "Shipping timeline, gate-in to ATA" },
      { file: "Invoice_template_new.docx", app: "Word", becomes: "Invoice from the sale lines" },
      { file: "Call carrier re: ETD!!", app: "Note", becomes: "Follow-up with an owner and a date" },
    ],
    outro: "Fewer files, fewer handovers, less re-typing: the same team handles more bookings.",
  },
  ar: {
    eyebrow: "فوضى أقل",
    title: "سبعة أماكن لشحنة واحدة. أو حجز واحد.",
    lead: "الأسعار في ملف Excel، والحالة في جدول آخر، وملف الناقل في بريد أحد الموظفين، والفاتورة في Word، والتذكير على ورقة لاصقة. Routel يجمع كل ذلك في الحجز، فلا أحد يعيد الكتابة أو يبحث أو يسأل مرتين.",
    before: "أماكن للبحث",
    after: "سجل",
    card: "الحجز",
    items: [
      { file: "rates_2026_FINAL_v3.xlsx", app: "Excel", becomes: "أسعار المسارات مع الصلاحية" },
      { file: "متابعة الحجوزات (مشترك)", app: "Google Sheets", becomes: "الحالة: 11 مرحلة في الحجز" },
      { file: "MSC_confirmation.pdf", app: "PDF", becomes: "حجز الناقل، يقرؤه الذكاء الاصطناعي" },
      { file: "RE: RE: FW: رقم الحاوية؟", app: "البريد", becomes: "رسائل البريد مربوطة بالحجز" },
      { file: "دخلت البوابة؟ متى المغادرة؟", app: "محادثة", becomes: "الجدول الزمني من البوابة حتى الوصول" },
      { file: "Invoice_template_new.docx", app: "Word", becomes: "فاتورة من بنود البيع" },
      { file: "كلّم الناقل بخصوص ETD!!", app: "ملاحظة", becomes: "متابعة بمسؤول وتاريخ" },
    ],
    outro: "ملفات أقل، وتسليم أقل بين الموظفين، وإعادة كتابة أقل: الفريق نفسه يدير حجوزات أكثر.",
  },
};

const apps = [
  { Icon: FileSpreadsheet, tone: "bg-emerald-600 text-white" },
  { Icon: Table2, tone: "bg-green-500 text-white" },
  { Icon: FileText, tone: "bg-red-500 text-white" },
  { Icon: Mail, tone: "bg-sky-500 text-white" },
  { Icon: MessageCircle, tone: "bg-emerald-500 text-white" },
  { Icon: FileType2, tone: "bg-blue-600 text-white" },
  { Icon: StickyNote, tone: "bg-amber-300 text-amber-950" },
];

/** Scattered positions (percent of the stage) and tilt for each file card. */
const scatter = [
  { x: 2, y: 4, r: -7 },
  { x: 58, y: 0, r: 5 },
  { x: 66, y: 34, r: -4 },
  { x: 0, y: 40, r: 6 },
  { x: 8, y: 76, r: -5 },
  { x: 60, y: 72, r: 7 },
  { x: 34, y: 86, r: -3 },
];

export function ChaosToOrder() {
  const locale = useLocale();
  const t = copy[locale];
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const files = gsap.utils.toArray<HTMLElement>("[data-file]", el);
      const card = el.querySelector<HTMLElement>("[data-card]");
      const rows = gsap.utils.toArray<HTMLElement>("[data-row]", el);
      const checks = gsap.utils.toArray<HTMLElement>("[data-check]", el);
      const count = el.querySelector<HTMLElement>("[data-count]");
      const stage = el.querySelector<HTMLElement>("[data-stage]");
      if (!card || !count || !stage) return;

      const build = (tl: gsap.core.Timeline) => {
        const counter = { n: 7 };
        tl.add(() => (count.textContent = "7"), 0)
          .set(files, { opacity: 1 })
          .set(card, { opacity: 0, scale: 0.92, y: 24 })
          .set(rows, { opacity: 0.25 })
          .set(checks, { scale: 0 })
          .to(card, { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.2);
        files.forEach((f, i) => {
          const r = f.getBoundingClientRect();
          const row = rows[i].getBoundingClientRect();
          const at = 0.6 + i * 0.45;
          tl.to(
            f,
            {
              x: row.left + row.width / 2 - (r.left + r.width / 2),
              y: row.top + row.height / 2 - (r.top + r.height / 2),
              rotation: 0,
              scale: 0.4,
              opacity: 0,
              duration: 0.7,
              ease: "power2.in",
            },
            at,
          )
            .to(rows[i], { opacity: 1, duration: 0.25 }, at + 0.55)
            .to(checks[i], { scale: 1, duration: 0.3, ease: "back.out(2.5)" }, at + 0.6)
            .to(counter, { n: 7 - i, duration: 0.2, onUpdate: () => (count.textContent = String(Math.max(1, Math.round(counter.n)))) }, at + 0.55);
        });
        return tl;
      };

      const mm = gsap.matchMedia();
      mm.add(`${MOTION_OK} and (min-width: 1024px)`, () => {
        // Idle drift before the scroll takes over.
        files.forEach((f, i) => gsap.to(f, { y: "+=8", duration: 2 + (i % 3) * 0.4, yoyo: true, repeat: -1, ease: "sine.inOut" }));
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top top", end: "+=1400", scrub: 0.8, pin: true, anticipatePin: 1, invalidateOnRefresh: true },
        });
        build(tl);
      });
      mm.add(`${MOTION_OK} and (max-width: 1023px)`, () => {
        const tl = gsap.timeline({ paused: true });
        build(tl);
        const st = gsap.timeline({ scrollTrigger: { trigger: stage, start: "top 70%", onEnter: () => tl.play() } });
        return () => st.kill();
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [locale] },
  );

  return (
    <section ref={root} className="relative overflow-hidden bg-white" id="chaos">
      <Container className="grid min-h-screen items-center gap-12 py-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:py-0">
        <div>
          <Eyebrow tone="spark">{t.eyebrow}</Eyebrow>
          <h2 className="font-display mt-4 text-balance text-3xl font-bold leading-[1.1] text-ink-900 sm:text-4xl lg:text-[2.75rem]">{t.title}</h2>
          <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-fog-600 sm:text-lg">{t.lead}</p>
          <div className="mt-8 flex items-end gap-5">
            <div>
              <p dir="ltr" className="font-display text-6xl font-extrabold leading-none text-ink-900 rtl:text-end">
                <span data-count="">1</span>
              </p>
              <p className="mt-2 text-sm font-medium text-fog-500">
                <span className="line-through decoration-spark-400">7 {t.before}</span> → 1 {t.after}
              </p>
            </div>
          </div>
          <p className="mt-8 max-w-md border-s-2 border-teal-400 ps-4 text-[15px] font-medium leading-relaxed text-ink-900">{t.outro}</p>
        </div>

        {/* The stage: files around, the booking in the middle */}
        <div data-stage="" className="relative mx-auto aspect-[1/1.05] w-full max-w-[560px] sm:aspect-[1.1/1]">
          {t.items.map((it, i) => {
            const { Icon, tone } = apps[i];
            const p = scatter[i];
            return (
              <div
                key={it.file}
                data-file=""
                className="absolute w-[46%] max-w-[230px] rounded-xl bg-white p-2.5 opacity-40 shadow-float ring-1 ring-fog-200 sm:p-3 [.js_&]:opacity-100"
                style={{ insetInlineStart: `${p.x}%`, top: `${p.y}%`, transform: `rotate(${p.r}deg)` }}
                aria-hidden
              >
                <div className="flex items-center gap-2">
                  <span className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-md", tone)}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-fog-400">{it.app}</p>
                    <p dir="auto" className="truncate text-[12px] font-medium text-ink-900">{it.file}</p>
                  </div>
                </div>
              </div>
            );
          })}

          <div data-card="" className="absolute inset-x-[10%] top-1/2 -translate-y-1/2 rounded-2xl bg-ink-900 p-4 text-white shadow-float ring-1 ring-white/10 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] text-white/50">{t.card}</p>
                <p dir="ltr" className="font-mono text-[14px] font-semibold rtl:text-end">NXS26000412</p>
              </div>
              <span className="rounded-full bg-teal-400/15 px-2.5 py-1 text-[11px] font-semibold text-teal-300 ring-1 ring-teal-400/30">Routel</span>
            </div>
            <ul className="mt-3 space-y-1.5">
              {t.items.map((it) => (
                <li key={it.becomes} data-row="" className="flex items-center gap-2.5 rounded-lg bg-white/[0.04] px-2.5 py-1.5 text-[12.5px]">
                  <span data-check="" className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-teal-400 text-ink-950">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {it.becomes}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
