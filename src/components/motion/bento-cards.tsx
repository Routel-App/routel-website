"use client";

import { useRef, type ReactNode } from "react";
import { Check, FileText, Mail, MousePointer2, Receipt, ScanLine } from "lucide-react";
import { useLocale } from "@/components/i18n/locale-provider";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { gsap, useGSAP, MOTION_OK, playWhileVisible } from "./gsap";
import { ContainerBox, Doc, paint } from "./sprites";

/**
 * Small animated product vignettes ("bento" cards), each showing one real
 * Routel behaviour. Every card is a still, readable frame in the HTML; with
 * motion allowed, a GSAP loop plays while the card is on screen.
 *
 * Used on the home page (FeatureBento) and on the platform pages (via
 * `vignetteFor(slug)`).
 */

type Tone = "dark" | "light" | "teal" | "cream";

const surface: Record<Tone, string> = {
  dark: "bg-ink-900 text-white ring-white/10",
  light: "bg-white text-ink-900 ring-fog-200",
  teal: "bg-teal-50 text-ink-900 ring-teal-100",
  cream: "bg-spark-50 text-ink-900 ring-spark-100",
};

function Card({ tone = "light", title, text, children, className }: { tone?: Tone; title: string; text: string; children: ReactNode; className?: string }) {
  const dark = tone === "dark";
  return (
    <div className={cn("flex h-full flex-col overflow-hidden rounded-3xl p-5 ring-1 ring-inset sm:p-6", surface[tone], className)}>
      <p className="font-display text-[17px] font-bold">{title}</p>
      <p className={cn("mt-1 text-[13.5px] leading-relaxed", dark ? "text-white/60" : "text-fog-600")}>{text}</p>
      <div className="mt-5 flex flex-1 items-end">{children}</div>
    </div>
  );
}

/** A GSAP loop, built only with motion allowed, paused off screen. */
function useLoop(build: (el: HTMLDivElement) => gsap.core.Timeline | void) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = build(el);
        if (tl) {
          const st = playWhileVisible(tl, el);
          return () => st.kill();
        }
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return ref;
}

const L = <T,>(locale: Locale, v: Record<Locale, T>) => v[locale];

/* ─── 1. Containers on the booking, moving through their statuses ─── */

export function ContainersCard({ className }: { className?: string }) {
  const locale = useLocale();
  const t = L(locale, {
    en: { title: "Every container, on its booking", text: "Container numbers and types live on the booking, with the status everyone sees.", steps: ["Gate In", "Loaded", "Departed"] },
    ar: { title: "كل حاوية في حجزها", text: "أرقام الحاويات وأنواعها في الحجز نفسه، مع حالة يراها الجميع.", steps: ["دخول البوابة", "تم التحميل", "غادرت"] },
  });
  const boxes = [
    ["MSCU 482113 7", "40HC", "hero"],
    ["MSKU 920114 5", "40HC", paint.teal],
    ["TGHU 771020 3", "20GP", paint.fog],
  ];
  const ref = useLoop((el) => {
    const pills = gsap.utils.toArray<HTMLElement>("[data-pill]", el);
    const bars = gsap.utils.toArray<HTMLElement>("[data-bar]", el);
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    tl.set(bars, { scaleX: 0 });
    t.steps.forEach((step, s) => {
      pills.forEach((p, i) => {
        tl.add(() => {
          p.textContent = step;
        }, s * 1.6 + i * 0.25);
        tl.fromTo(p, { y: 6, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3 }, s * 1.6 + i * 0.25);
        tl.to(bars[i], { scaleX: (s + 1) / t.steps.length, duration: 0.5, ease: "power2.out" }, s * 1.6 + i * 0.25);
      });
    });
    tl.to({}, { duration: 1.2 });
    return tl;
  });
  return (
    <Card tone="dark" title={t.title} text={t.text} className={className}>
      <div ref={ref} className="w-full space-y-2.5">
        {boxes.map(([no, type, color]) => (
          <div key={no} className="rounded-xl bg-white/[0.05] p-3 ring-1 ring-inset ring-white/10">
            <div className="flex items-center gap-3">
              <svg viewBox="0 0 56 26" className="h-5 w-11 shrink-0" aria-hidden>
                <ContainerBox x={0} y={0} hero={color === "hero"} color={color} />
              </svg>
              <span dir="ltr" className="font-mono text-[12.5px] font-semibold">{no}</span>
              <span className="font-mono text-[11px] text-white/50">{type}</span>
              <span data-pill="" className="ms-auto rounded-full bg-teal-400/15 px-2 py-0.5 text-[11px] font-semibold text-teal-300">
                {t.steps[t.steps.length - 1]}
              </span>
            </div>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
              <span data-bar="" className="block h-full origin-[left_center] rounded-full bg-teal-400 rtl:origin-[right_center]" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ─── 2. Two currencies, converted at the booking's rate ─── */

export function CurrencyCard({ className }: { className?: string }) {
  const locale = useLocale();
  const t = L(locale, {
    en: { title: "Two currencies, one rate per booking", text: "Charge in USD or your base currency; profit converts at the booking's own rate.", base: "MYR", rate: 4.47, label: "Ocean freight · cost" },
    ar: { title: "عملتان وسعر صرف واحد لكل حجز", text: "رسوم بالدولار أو بالريال، والربح يُحسب بسعر الحجز نفسه.", base: "SAR", rate: 3.75, label: "شحن بحري · تكلفة" },
  });
  const usd = 4200;
  const ref = useLoop((el) => {
    const num = el.querySelector<HTMLElement>("[data-num]");
    const conv = el.querySelector<HTMLElement>("[data-conv]");
    const chips = gsap.utils.toArray<HTMLElement>("[data-chip]", el);
    if (!num || !conv) return;
    const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const o = { v: 0 };
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.6 });
    tl.set(chips, { opacity: 0.45 })
      .to(chips[0], { opacity: 1, duration: 0.2 })
      .fromTo(o, { v: 0 }, { v: usd, duration: 1.2, ease: "power2.out", onUpdate: () => (num.textContent = `USD ${fmt(o.v)}`) })
      .to(chips[0], { opacity: 0.45, duration: 0.2 }, "+=0.6")
      .to(chips[1], { opacity: 1, duration: 0.2 }, "<")
      .fromTo(conv, { y: 8, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 })
      .to({}, { duration: 1.4 });
    return tl;
  });
  return (
    <Card tone="teal" title={t.title} text={t.text} className={className}>
      <div ref={ref} className="w-full">
        <div className="rounded-2xl bg-white p-4 shadow-card ring-1 ring-teal-100">
          <p className="text-[11.5px] text-fog-500">{t.label}</p>
          <p dir="ltr" data-num="" className="mt-1 font-mono text-2xl font-semibold tabular-nums rtl:text-end">USD 4,200.00</p>
          <p dir="ltr" data-conv="" className="mt-1 font-mono text-[12.5px] text-teal-700 rtl:text-end">
            ≈ {t.base} {(usd * t.rate).toLocaleString("en-US", { minimumFractionDigits: 2 })} @ {t.rate.toFixed(4)}
          </p>
        </div>
        <div dir="ltr" className="mt-3 flex gap-2">
          {["USD", t.base].map((c) => (
            <span key={c} data-chip="" className="rounded-full bg-ink-900 px-3 py-1 font-mono text-[12px] font-semibold text-white">
              {c}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}

/* ─── 3. The AI reads the carrier's confirmation ─── */

export function ReadsPdfCard({ className }: { className?: string }) {
  const locale = useLocale();
  const t = L(locale, {
    en: {
      title: "The AI reads the carrier's confirmation",
      text: "Drop in the PDF or a linked e-mail; you tick what goes on the booking.",
      fields: [["Vessel / voyage", "MSC ISABELLA 412E"], ["Port of loading", "Port Klang"], ["Containers", "2 × 40HC"], ["Carrier booking no.", "MSCUKL4471"]],
    },
    ar: {
      title: "الذكاء الاصطناعي يقرأ تأكيد الناقل",
      text: "ارفع ملف PDF أو رسالة مربوطة، واختر ما يُحفظ في الحجز.",
      fields: [["السفينة / الرحلة", "MSC ISABELLA 412E"], ["ميناء الشحن", "جدة"], ["الحاويات", "2 × 40HC"], ["رقم حجز الناقل", "MSCJED4471"]],
    },
  });
  const ref = useLoop((el) => {
    const beam = el.querySelector<HTMLElement>("[data-beam]");
    const rows = gsap.utils.toArray<HTMLElement>("[data-field]", el);
    const ticks = gsap.utils.toArray<HTMLElement>("[data-tick]", el);
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.4 });
    tl.set(rows, { opacity: 0, x: 10 }).set(ticks, { scale: 0 }).set(beam, { top: "6%" });
    tl.to(beam, { top: "88%", duration: 2.4, ease: "none" }, 0);
    rows.forEach((r, i) => {
      tl.to(r, { opacity: 1, x: 0, duration: 0.35 }, 0.4 + i * 0.5).to(ticks[i], { scale: 1, duration: 0.25, ease: "back.out(3)" }, 2.6 + i * 0.15);
    });
    tl.to({}, { duration: 1 });
    return tl;
  });
  return (
    <Card tone="light" title={t.title} text={t.text} className={className}>
      <div ref={ref} className="grid w-full grid-cols-[0.8fr_1.2fr] gap-3">
        <div className="relative overflow-hidden rounded-xl bg-fog-50 p-3 ring-1 ring-fog-200">
          <FileText className="h-5 w-5 text-red-500" />
          <div className="mt-2 space-y-1.5">
            {[90, 70, 80, 55, 75, 60, 85].map((w, i) => (
              <span key={i} className="block h-1.5 rounded-full bg-fog-200" style={{ width: `${w}%` }} />
            ))}
          </div>
          <span data-beam="" className="absolute inset-x-0 top-[88%] h-6 bg-gradient-to-b from-transparent via-teal-400/35 to-transparent" aria-hidden />
          <ScanLine className="absolute bottom-2 end-2 h-4 w-4 text-teal-600" />
        </div>
        <ul className="space-y-1.5">
          {t.fields.map(([k, v]) => (
            <li key={k} data-field="" className="flex items-center gap-2 rounded-lg bg-fog-50 px-2.5 py-1.5 ring-1 ring-fog-100">
              <span data-tick="" className="flex h-4 w-4 shrink-0 items-center justify-center rounded bg-teal-500 text-white">
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              <span className="min-w-0">
                <span className="block text-[10px] text-fog-500">{k}</span>
                <span dir="auto" className="block truncate text-[12px] font-semibold">{v}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

/* ─── 4. Booking Confirmation, revised ─── */

export function RevisionsCard({ className }: { className?: string }) {
  const locale = useLocale();
  const t = L(locale, {
    en: { title: "Booking Confirmation, with revisions", text: "Change a detail after it's issued and the next one is a numbered revision, logged.", doc: "Booking Confirmation", orig: "Original", rev: "Revision", change: "ETD 18 Oct → 20 Oct" },
    ar: { title: "تأكيد الحجز بمراجعات مرقّمة", text: "أي تعديل بعد الإصدار يجعل التأكيد التالي مراجعة مرقّمة ومسجّلة.", doc: "تأكيد الحجز", orig: "الأصل", rev: "مراجعة", change: "المغادرة 18 ← 20 أكتوبر" },
  });
  const ref = useLoop((el) => {
    const docs = gsap.utils.toArray<HTMLElement>("[data-doc]", el);
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.8 });
    // docs[2] is the front (latest). Replay: front cards arrive one by one.
    tl.set(docs, { y: 18, opacity: 0 });
    docs.forEach((d, i) => tl.to(d, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, 0.2 + i * 0.9));
    tl.fromTo(el.querySelector("[data-flag]"), { scale: 0 }, { scale: 1, duration: 0.35, ease: "back.out(2.5)" }, "+=0.1").to({}, { duration: 1.6 });
    return tl;
  });
  return (
    <Card tone="cream" title={t.title} text={t.text} className={className}>
      <div ref={ref} className="relative h-44 w-full">
        {[0, 1, 2].map((n) => (
          <div
            key={n}
            data-doc=""
            className="absolute inset-x-0 rounded-2xl bg-white p-3.5 shadow-card ring-1 ring-spark-100"
            style={{ top: `${n * 14}px`, marginInline: `${(2 - n) * 12}px`, zIndex: n }}
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-[12.5px] font-semibold">{t.doc}</p>
              <span className={cn("rounded-full px-2 py-0.5 text-[10.5px] font-semibold", n === 2 ? "bg-spark-400 text-ink-950" : "bg-fog-100 text-fog-500")}>
                {n === 0 ? t.orig : `${t.rev} ${n}`}
              </span>
            </div>
            {n === 2 ? (
              <div className="mt-2.5 space-y-1.5">
                <p dir="ltr" className="font-mono text-[11.5px] text-fog-500 rtl:text-end">NXS26000412 · MSC ISABELLA 412E</p>
                <p data-flag="" className="inline-flex rounded-md bg-spark-100 px-2 py-0.5 text-[11.5px] font-semibold text-spark-600">{t.change}</p>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ─── 5. Every AI suggestion approved by a person ─── */

export function ApprovalsCard({ className }: { className?: string }) {
  const locale = useLocale();
  const t = L(locale, {
    en: { title: "Suggested by AI, approved by a person", text: "Incoming documents are matched to bookings; nothing is saved until someone approves.", pending: "Pending", ok: "Approved", rows: ["B/L → NXS26000412", "Vendor invoice → NXS26000398", "Booking confirmation → NXS26000415"] },
    ar: { title: "يقترح الذكاء الاصطناعي ويعتمد شخص", text: "المستندات الواردة تُطابق مع الحجوزات، ولا شيء يُحفظ قبل الاعتماد.", pending: "بانتظار الاعتماد", ok: "معتمد", rows: ["بوليصة ← NXS26000412", "فاتورة مورد ← NXS26000398", "تأكيد حجز ← NXS26000415"] },
  });
  const ref = useLoop((el) => {
    const rows = gsap.utils.toArray<HTMLElement>("[data-ap]", el);
    const cursor = el.querySelector<HTMLElement>("[data-cursor]");
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.2 });
    rows.forEach((r) => {
      tl.add(() => r.setAttribute("data-state", "pending"), 0);
    });
    tl.set(cursor, { opacity: 0 });
    rows.forEach((r, i) => {
      const at = 0.6 + i * 1.1;
      tl.to(cursor, { opacity: 1, top: r.offsetTop + r.offsetHeight / 2, duration: 0.5, ease: "power2.inOut" }, at)
        .to(cursor, { scale: 0.85, duration: 0.1, yoyo: true, repeat: 1 }, at + 0.55)
        .add(() => r.setAttribute("data-state", "ok"), at + 0.65);
    });
    tl.to(cursor, { opacity: 0, duration: 0.3 }, "+=0.4").to({}, { duration: 1.2 });
    return tl;
  });
  return (
    <Card tone="light" title={t.title} text={t.text} className={className}>
      <div ref={ref} className="relative w-full space-y-2">
        {t.rows.map((r) => (
          <div key={r} data-ap="" data-state="ok" className="group/ap flex items-center gap-3 rounded-xl bg-fog-50 px-3 py-2.5 ring-1 ring-fog-100">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-300 text-amber-950 transition-colors duration-300 group-data-[state=ok]/ap:bg-teal-500 group-data-[state=ok]/ap:text-white">
              <Check className="hidden h-3.5 w-3.5 group-data-[state=ok]/ap:block" strokeWidth={3} />
              <span className="block h-0.5 w-2.5 rounded bg-current group-data-[state=ok]/ap:hidden" />
            </span>
            <span dir="auto" className="min-w-0 flex-1 truncate text-[12.5px] font-medium">{r}</span>
            <span className="text-[11px] font-semibold text-amber-700 group-data-[state=ok]/ap:hidden">{t.pending}</span>
            <span className="hidden text-[11px] font-semibold text-teal-700 group-data-[state=ok]/ap:inline">{t.ok}</span>
          </div>
        ))}
        <MousePointer2 data-cursor="" className="pointer-events-none absolute end-6 h-5 w-5 -translate-y-1/2 fill-ink-900 text-white opacity-0 drop-shadow" style={{ top: 0 }} aria-hidden />
      </div>
    </Card>
  );
}

/* ─── 6. A payment e-mail matched to its invoice ─── */

export function PaymentMatchCard({ className }: { className?: string }) {
  const locale = useLocale();
  const t = L(locale, {
    en: { title: "Payments matched from the finance mailbox", text: "Routel proposes the invoice a payment belongs to. A person confirms.", mail: "Payment advice · Straits Electronics", inv: "INV-26-0418", amt: "MYR 13,050.00", match: "Suggested match", confirm: "Confirm" },
    ar: { title: "مطابقة الدفعات من بريد المالية", text: "يقترح Routel الفاتورة التي تخص الدفعة، ويؤكدها شخص.", mail: "إشعار دفع · شركة الرواد للتجارة", inv: "INV-26-0418", amt: "SAR 18,250.00", match: "مطابقة مقترحة", confirm: "تأكيد" },
  });
  const ref = useLoop((el) => {
    const line = el.querySelector<SVGPathElement>("[data-link]");
    const badge = el.querySelector<HTMLElement>("[data-match]");
    if (!line || !badge) return;
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.4 });
    tl.set(line, { strokeDashoffset: 1 })
      .set(badge, { scale: 0.6, opacity: 0 })
      .to(line, { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut" }, 0.4)
      .to(badge, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)" })
      .to({}, { duration: 1.8 });
    return tl;
  });
  return (
    <Card tone="dark" title={t.title} text={t.text} className={className}>
      <div ref={ref} className="relative w-full">
        <div className="flex items-center gap-2.5 rounded-xl bg-white/[0.06] p-3 ring-1 ring-white/10">
          <Mail className="h-4 w-4 shrink-0 text-sky-300" />
          <span className="truncate text-[12.5px]">{t.mail}</span>
        </div>
        <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="h-10 w-full rtl:-scale-x-100" aria-hidden>
          <path data-link="" d="M20 0 C 20 22, 80 18, 80 40" fill="none" stroke="var(--color-teal-400)" strokeWidth="1.6" strokeDasharray="1" pathLength={1} />
        </svg>
        <div className="flex items-center gap-2.5 rounded-xl bg-white p-3 text-ink-900">
          <Receipt className="h-4 w-4 shrink-0 text-teal-600" />
          <span dir="ltr" className="font-mono text-[12px] font-semibold">{t.inv}</span>
          <span dir="ltr" className="ms-auto font-mono text-[12px]">{t.amt}</span>
        </div>
        <div data-match="" className="mt-3 flex items-center justify-between gap-2 rounded-xl bg-teal-400/15 px-3 py-2 ring-1 ring-teal-400/30">
          <span className="text-[12px] font-semibold text-teal-200">{t.match}</span>
          <span className="rounded-full bg-teal-400 px-3 py-0.5 text-[11.5px] font-semibold text-ink-950">{t.confirm}</span>
        </div>
      </div>
    </Card>
  );
}

/* ─── 7. Books that keep themselves ─── */

export function LedgerCard({ className }: { className?: string }) {
  const locale = useLocale();
  const t = L(locale, {
    en: { title: "Books that keep themselves", text: "Every invoice, cost and expense posts as it happens: P&L, GL and aging are always current.", cur: "MYR", rows: [["Revenue", 412860], ["Cost of sales", -268915], ["Gross profit", 143945]], months: ["May", "Jun", "Jul", "Aug", "Sep", "Oct"] },
    ar: { title: "دفاتر تكتب نفسها", text: "كل فاتورة وتكلفة ومصروف يُرحَّل لحظة تسجيله: الأرباح والخسائر ودفتر الأستاذ وأعمار الذمم محدّثة دائماً.", cur: "SAR", rows: [["الإيرادات", 412860], ["تكلفة المبيعات", -268915], ["إجمالي الربح", 143945]], months: ["مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر"] },
  });
  const heights = [44, 52, 49, 61, 70, 82];
  const ref = useLoop((el) => {
    const bars = gsap.utils.toArray<HTMLElement>("[data-lbar]", el);
    const nums = gsap.utils.toArray<HTMLElement>("[data-lnum]", el);
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });
    tl.fromTo(bars, { scaleY: 0 }, { scaleY: 1, duration: 0.7, stagger: 0.08, ease: "power3.out" }, 0);
    nums.forEach((n) => {
      const target = Number(n.dataset.v);
      const o = { v: 0 };
      tl.fromTo(
        o,
        { v: 0 },
        { v: target, duration: 1.2, ease: "power2.out", onUpdate: () => (n.textContent = fmtSigned(o.v)) },
        0.2,
      );
    });
    tl.to({}, { duration: 1.5 });
    return tl;
  });
  return (
    <Card tone="light" title={t.title} text={t.text} className={className}>
      <div ref={ref} className="w-full">
        <div className="flex h-24 items-end gap-1.5" aria-hidden>
          {heights.map((h, i) => (
            <span key={i} data-lbar="" className="block flex-1 origin-bottom rounded-t bg-teal-400" style={{ height: `${h}%` }} />
          ))}
        </div>
        <dl className="mt-4 space-y-1.5 text-[12px]">
          {t.rows.map(([k, v], i) => (
            <div key={String(k)} className={cn("flex justify-between gap-2", i === 2 && "border-t border-fog-200 pt-1.5 font-semibold")}>
              <dt className="text-fog-600">{k}</dt>
              <dd dir="ltr" data-lnum="" data-v={String(v)} className="font-mono tabular-nums">
                {fmtSigned(Number(v))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Card>
  );
}

function fmtSigned(n: number) {
  const s = Math.round(Math.abs(n)).toLocaleString("en-US");
  return n < 0 ? `(${s})` : s;
}

/* ─── 8. The House B/L, filled from the booking ─── */

export function BillOfLadingCard({ className }: { className?: string }) {
  const locale = useLocale();
  const t = L(locale, {
    en: {
      title: "A House B/L from the booking, in one click",
      text: "Generate Bill of Lading lays out the booking's own data the way a carrier's B/L looks, with its container annexure.",
      doc: "BILL OF LADING",
      annex: "Container annexure",
      fields: [["Shipper", "Straits Electronics Sdn Bhd"], ["Consignee", "Shanghai Huatai Trading Co."], ["Vessel / voyage", "MSC ISABELLA 412E"], ["Port of loading → discharge", "Port Klang → Shanghai"], ["Containers", "MSCU 482113 7 · 40HC"]],
    },
    ar: {
      title: "بوليصة شحن فرعية من الحجز بنقرة",
      text: "زر «إنشاء بوليصة الشحن» يرتّب بيانات الحجز نفسه بشكل بوليصة الناقل، مع ملحق الحاويات.",
      doc: "BILL OF LADING",
      annex: "ملحق الحاويات",
      fields: [["الشاحن", "شركة الرواد للتجارة"], ["المرسل إليه", "Shanghai Huatai Trading Co."], ["السفينة / الرحلة", "MSC ISABELLA 412E"], ["ميناء الشحن ← التفريغ", "جدة ← شنغهاي"], ["الحاويات", "MSCU 482113 7 · 40HC"]],
    },
  });
  const ref = useLoop((el) => {
    const vals = gsap.utils.toArray<HTMLElement>("[data-bl]", el);
    const annex = el.querySelector<HTMLElement>("[data-annex]");
    const stamp = el.querySelector<HTMLElement>("[data-stamp]");
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.6 });
    tl.set(vals, { opacity: 0, x: -6 }).set(annex, { y: 0, rotation: 0 }).set(stamp, { scale: 0, opacity: 0 });
    vals.forEach((v, i) => tl.to(v, { opacity: 1, x: 0, duration: 0.3 }, 0.3 + i * 0.32));
    tl.to(annex, { y: -10, rotation: 3, duration: 0.5, ease: "power2.out" }, "+=0.1")
      .to(stamp, { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(2.5)" })
      .to({}, { duration: 1.4 });
    return tl;
  });
  return (
    <Card tone="light" title={t.title} text={t.text} className={className}>
      <div ref={ref} className="relative w-full pt-3">
        <div data-annex="" className="absolute inset-x-6 top-0 h-full rounded-xl bg-fog-100 ring-1 ring-fog-200" aria-hidden>
          <p className="px-3 pt-1.5 text-[10px] font-semibold text-fog-500">{t.annex}</p>
        </div>
        <div className="relative rounded-xl bg-white p-3.5 shadow-card ring-1 ring-fog-200">
          <div className="flex items-center justify-between border-b border-fog-200 pb-2">
            <p className="font-mono text-[12px] font-bold tracking-wider">{t.doc}</p>
            <p dir="ltr" className="font-mono text-[10.5px] text-fog-500">HBL NXS-HBL-0412</p>
          </div>
          <dl className="mt-2 grid grid-cols-2 gap-x-3 gap-y-2">
            {t.fields.map(([k, v], i) => (
              <div key={k} className={cn("min-w-0", i >= 3 && "col-span-2")}>
                <dt className="text-[9.5px] uppercase text-fog-400">{k}</dt>
                <dd data-bl="" dir="auto" className="truncate text-[11.5px] font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
          <span data-stamp="" className="absolute bottom-3 end-3 rotate-[-8deg] rounded-md border-2 border-teal-600 px-2 py-0.5 font-mono text-[10px] font-bold text-teal-700">ORIGINAL</span>
        </div>
      </div>
    </Card>
  );
}

/* ─── 9. The eleven statuses, as a ring the booking moves around ─── */

export function StatusRingCard({ className }: { className?: string }) {
  const locale = useLocale();
  const t = L(locale, {
    en: { title: "Eleven statuses, one lifecycle", text: "Booking Pending to Shipment Closed, shown the same way everywhere the booking appears.", steps: ["Booking Pending", "Booking Confirmed", "Gate In", "SI Submitted", "Vessel Loaded", "Departed", "In Transit", "Arrived", "Telex Status", "Shipment Closed"] },
    ar: { title: "إحدى عشرة حالة، دورة واحدة", text: "من «الحجز قيد الانتظار» حتى «الشحنة مغلقة»، بالشكل نفسه أينما ظهر الحجز.", steps: ["الحجز قيد الانتظار", "تم تأكيد الحجز", "دخول البوابة", "تم تقديم تعليمات الشحن", "تم التحميل على السفينة", "غادرت", "قيد النقل", "وصلت", "حالة التلكس", "الشحنة مغلقة"] },
  });
  const n = t.steps.length;
  const R = 62;
  const ref = useLoop((el) => {
    const dots = gsap.utils.toArray<SVGCircleElement>("[data-dot]", el);
    const arc = el.querySelector<SVGCircleElement>("[data-arc]");
    const label = el.querySelector<HTMLElement>("[data-label]");
    const box = el.querySelector<SVGGElement>("[data-box]");
    if (!arc || !label || !box) return;
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.2 });
    tl.set(arc, { strokeDashoffset: 1 }).set(dots, { fill: "rgb(255 255 255 / 0.15)" });
    t.steps.forEach((step, i) => {
      const at = i * 0.55;
      const a = (i / n) * Math.PI * 2 - Math.PI / 2;
      tl.to(arc, { strokeDashoffset: 1 - (i + 1) / n, duration: 0.5, ease: "power1.inOut" }, at)
        .to(dots[i], { fill: i === n - 1 ? "var(--color-spark-400)" : "var(--color-teal-400)", duration: 0.2 }, at + 0.3)
        .to(box, { attr: { transform: `translate(${80 + Math.cos(a) * R - 9} ${80 + Math.sin(a) * R - 4})` }, duration: 0.5, ease: "power1.inOut" }, at)
        .add(() => {
          label.textContent = step;
        }, at + 0.25);
    });
    tl.to({}, { duration: 1.4 });
    return tl;
  });
  return (
    <Card tone="dark" title={t.title} text={t.text} className={className}>
      <div ref={ref} className="grid w-full grid-cols-[160px_1fr] items-center gap-4">
        <svg viewBox="0 0 160 160" className="h-40 w-40" aria-hidden>
          <circle cx="80" cy="80" r={R} fill="none" stroke="rgb(255 255 255 / 0.1)" strokeWidth="3" />
          <circle data-arc="" cx="80" cy="80" r={R} fill="none" stroke="var(--color-teal-400)" strokeWidth="3" strokeLinecap="round" pathLength={1} strokeDasharray="1" transform="rotate(-90 80 80)" style={{ strokeDashoffset: 1 }} />
          {t.steps.map((st, i) => {
            const a = (i / n) * Math.PI * 2 - Math.PI / 2;
            return <circle key={st} data-dot="" cx={80 + Math.cos(a) * R} cy={80 + Math.sin(a) * R} r="4" fill="rgb(255 255 255 / 0.15)" />;
          })}
          <g data-box="" transform={`translate(${80 - 9} ${80 - R - 4})`}>
            <ContainerBox x={0} y={0} w={18} h={8} hero />
          </g>
          <text x="80" y="76" textAnchor="middle" fill="white" fontSize="22" fontWeight="700" fontFamily="var(--font-display)">11</text>
          <text x="80" y="94" textAnchor="middle" fill="rgb(255 255 255 / 0.55)" fontSize="9" fontFamily="var(--font-sans)">{locale === "ar" ? "حالة" : "statuses"}</text>
        </svg>
        <div>
          <p className="text-[11px] text-white/50">{locale === "ar" ? "الحالة الآن" : "Current status"}</p>
          <p data-label="" className="mt-1 text-[15px] font-semibold text-teal-300">{t.steps[4]}</p>
          <ul className="mt-3 space-y-1 text-[11px] text-white/55">
            {t.steps.slice(0, 4).map((st) => (
              <li key={st} className="truncate">· {st}</li>
            ))}
            <li>…</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

/* ─── 10. Everything that arrives orbits the booking; the assistant reads it ─── */

export function DocumentOrbitCard({ className }: { className?: string }) {
  const locale = useLocale();
  const t = L(locale, {
    en: { title: "Everything lands on the booking", text: "E-mails, carrier PDFs, vendor invoices and B/Ls are read, classified and filed on the right booking, after a person approves.", items: ["E-mail", "Carrier PDF", "Vendor invoice", "B/L"], center: "Booking" },
    ar: { title: "كل شيء يصل إلى الحجز", text: "رسائل البريد وملفات الناقل وفواتير الموردين والبوالص تُقرأ وتُصنَّف وتُحفظ في الحجز الصحيح، بعد اعتماد شخص.", items: ["بريد", "PDF الناقل", "فاتورة مورد", "بوليصة"], center: "الحجز" },
  });
  const ref = useLoop((el) => {
    const sats = gsap.utils.toArray<SVGGElement>("[data-sat]", el);
    const beams = gsap.utils.toArray<SVGLineElement>("[data-beam]", el);
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    tl.set(beams, { strokeDashoffset: 1 });
    sats.forEach((sv, i) => {
      const at = i * 0.8;
      tl.fromTo(sv, { scale: 0.6, opacity: 0, transformOrigin: "center" }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)" }, at)
        .to(beams[i], { strokeDashoffset: 0, duration: 0.5, ease: "power2.inOut" }, at + 0.35);
    });
    tl.to({}, { duration: 1.2 });
    return tl;
  });
  const pos = [
    [30, 34],
    [170, 34],
    [30, 146],
    [170, 146],
  ];
  return (
    <Card tone="teal" title={t.title} text={t.text} className={className}>
      <div ref={ref} className="w-full">
      <svg viewBox="0 0 200 180" className="mx-auto h-44 w-full max-w-[260px]" aria-hidden>
        <ellipse cx="100" cy="90" rx="82" ry="62" fill="none" stroke="var(--color-teal-200)" strokeWidth="1.5" strokeDasharray="3 6" />
        {pos.map(([x, y], i) => (
          <line key={i} data-beam="" x1={x} y1={y} x2="100" y2="90" stroke="var(--color-teal-500)" strokeWidth="2" pathLength={1} strokeDasharray="1" style={{ strokeDashoffset: 1 }} />
        ))}
        <g>
          <rect x="62" y="62" width="76" height="56" rx="10" fill="var(--color-ink-900)" />
          <ContainerBox x={72} y={70} w={56} h={24} hero />
          <text x="100" y="110" textAnchor="middle" fill="white" fontSize="9" fontFamily="var(--font-sans)" fontWeight="600">{t.center}</text>
        </g>
        {pos.map(([x, y], i) => (
          <g key={i} data-sat="" transform={`translate(${x} ${y})`}>
            <Doc x={-16} y={-20} w={32} h={40} stamp={i === 3} />
            <text x="0" y="34" textAnchor="middle" fill="var(--color-ink-900)" fontSize="8.5" fontFamily="var(--font-sans)" fontWeight="600">{t.items[i]}</text>
          </g>
        ))}
      </svg>
      </div>
    </Card>
  );
}

export const bentoCards = { ContainersCard, CurrencyCard, ReadsPdfCard, RevisionsCard, ApprovalsCard, PaymentMatchCard, LedgerCard, BillOfLadingCard, StatusRingCard, DocumentOrbitCard };
