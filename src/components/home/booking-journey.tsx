"use client";

import { useEffect, useRef, useState } from "react";
import { Anchor, Bot, FileCheck2, Receipt, Ship, Wallet } from "lucide-react";
import { useLocale } from "@/components/i18n/locale-provider";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";

/**
 * "Follow one booking": a scroll-driven story on large screens. The section
 * is tall; its inner stage sticks while the visitor scrolls, and the scroll
 * position moves the booking through its statuses: the ship sails the route
 * once it's loaded, the milestones light up in turn, and the money appears
 * once the invoice is made. Phones and prefers-reduced-motion get the same
 * milestones as a plain timeline. Scroll handling writes CSS variables
 * straight to the DOM (no re-render per frame); React state only changes
 * when the milestone does.
 */

type Milestone = { status: string; title: string; text: string };

type Copy = {
  eyebrow: string;
  title: string;
  lead: string;
  from: string;
  to: string;
  booking: string;
  customer: string;
  statuses: string[];
  milestones: Milestone[];
  money: { sale: string; cost: string; profit: string; values: [string, string, string, string] };
  hint: string;
};

const copy: Record<Locale, Copy> = {
  en: {
    eyebrow: "Follow one booking",
    title: "From quotation to closed, on one record",
    lead: "Scroll to move the shipment. At every stage you see what Routel does, and who doesn't have to do it by hand.",
    from: "Port Klang",
    to: "Rotterdam",
    booking: "NXS26000412",
    customer: "Meridian Furniture Sdn Bhd",
    statuses: ["Booking Pending", "Booking Confirmed", "Gate In", "SI Submitted", "Vessel Loaded", "Departed", "In Transit", "Arrived", "Telex Status", "Shipment Closed"],
    milestones: [
      { status: "Booking Pending", title: "Quotation becomes a booking", text: "Convert the accepted quotation in one click. The chosen route's charges come across, and the quotation locks with a link to its booking." },
      { status: "Booking Confirmed", title: "Carrier confirmed, customer informed", text: "The AI reads the shipping line's confirmation and you tick what to save. Issue the Booking Confirmation; any later change makes the next one a numbered revision." },
      { status: "Gate In · SI Submitted", title: "Cut-offs met", text: "Containers gate in and the SI is filed before the cut-off. The alerts page flags any booking past SI that still has no B/L." },
      { status: "Vessel Loaded · Departed", title: "Bills of lading from the booking", text: "Generate the House B/L from the booking's own data, and record the master B/L, or upload it and let the AI read the number." },
      { status: "In Transit · Arrived", title: "Invoiced while it sails", text: "Create Invoice turns the sale lines into a draft that finalises once the MBL is on the booking. Your customer follows the status on the tracking page." },
      { status: "Telex Status · Shipment Closed", title: "Paid, closed, in the books", text: "Payments are matched from the finance mailbox and confirmed by a person. The booking closes with its profit already in the P&L." },
    ],
    money: { sale: "Sale (AR)", cost: "Cost (AP)", profit: "Profit", values: ["MYR 21,480.00", "MYR 16,520.00", "MYR 4,960.00", "23.1%"] },
    hint: "Scroll",
  },
  ar: {
    eyebrow: "تابع حجزاً واحداً",
    title: "من عرض السعر حتى الإغلاق، في سجل واحد",
    lead: "مرّر لتتحرك الشحنة. في كل مرحلة ترى ما يقوم به Routel، وما لم يعد فريقك يحتاج إلى عمله يدوياً.",
    from: "جدة",
    to: "شنغهاي",
    booking: "NXS26000412",
    customer: "شركة الرواد للتجارة",
    statuses: ["الحجز قيد الانتظار", "تم تأكيد الحجز", "دخول البوابة", "تم تقديم تعليمات الشحن", "تم التحميل على السفينة", "غادرت", "قيد النقل", "وصلت", "حالة التلكس", "الشحنة مغلقة"],
    milestones: [
      { status: "الحجز قيد الانتظار", title: "عرض السعر يصير حجزاً", text: "حوّل عرض السعر المقبول بنقرة واحدة، فتنتقل رسوم المسار المختار، ويُقفل العرض مع رابط للحجز." },
      { status: "تم تأكيد الحجز", title: "الناقل أكّد، والعميل عَلِم", text: "يقرأ الذكاء الاصطناعي تأكيد الخط الملاحي وتختار ما يُحفظ، ثم تُصدر «تأكيد الحجز» لعميلك. وأي تعديل بعدها يجعل التأكيد التالي مراجعة مرقّمة." },
      { status: "دخول البوابة · تعليمات الشحن", title: "المواعيد محفوظة", text: "تدخل الحاويات وتُقدَّم تعليمات الشحن قبل موعد الإغلاق، وصفحة التنبيهات تُظهر أي حجز تجاوز تعليمات الشحن بلا بوليصة." },
      { status: "التحميل · المغادرة", title: "البوالص من بيانات الحجز", text: "أنشئ بوليصة الشحن الفرعية من بيانات الحجز نفسه، وسجّل البوليصة الرئيسية، أو ارفعها ودع الذكاء الاصطناعي يقرأ رقمها." },
      { status: "قيد النقل · الوصول", title: "الفاتورة جاهزة والشحنة في البحر", text: "زر «إنشاء فاتورة» يحوّل بنود البيع إلى مسودة تُعتمد عند وجود البوليصة الرئيسية في الحجز، وعميلك يتابع الحالة من صفحة التتبّع." },
      { status: "حالة التلكس · الشحنة مغلقة", title: "دُفعت، وأُغلقت، وفي الدفاتر", text: "تُطابَق الدفعات من بريد المالية ويؤكدها شخص، ويُغلق الحجز وربحه في قائمة الأرباح والخسائر." },
    ],
    money: { sale: "البيع (للعميل)", cost: "التكلفة (للمورد)", profit: "الربح", values: ["SAR 18,250.00", "SAR 14,010.00", "SAR 4,240.00", "23.2%"] },
    hint: "مرّر",
  },
};

const icons = [Receipt, Bot, Anchor, FileCheck2, Ship, Wallet];
/** The status (0-9) each milestone starts at. */
const starts = [0, 1, 2, 4, 6, 8];
/** Status reached at scroll progress p (0..1): the stage spends a little time on each one. */
const statusAt = (p: number) => Math.min(9, Math.max(0, p * 10.4 - 0.2));
const milestoneFor = (s: number) => starts.reduce((m, start, i) => (s >= start ? i : m), 0);
const ease = (x: number) => x * x * (3 - 2 * x);
/** Where along the route the ship is: at the quay until loaded, sailing until it arrives. */
const routeAt = (s: number) => ease(Math.min(1, Math.max(0, (s - 4.6) / 2.6)));

/* The route, drawn left-to-right (mirrored for Arabic). */
const ROUTE = "M70 262 C 170 250, 210 150, 300 160 S 450 210, 530 80";

export function BookingJourney() {
  const locale = useLocale();
  const t = copy[locale];
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <section className="relative bg-ink-950 text-white" id="journey">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="grid-fade-dark absolute inset-0" />
        <div className="absolute -top-40 start-1/3 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl" />
      </div>
      {reduce ? <Timeline t={t} /> : (
        <>
          <div className="lg:hidden"><Timeline t={t} /></div>
          <div className="hidden lg:block"><Stage t={t} locale={locale} /></div>
        </>
      )}
    </section>
  );
}

function Heading({ t, className }: { t: Copy; className?: string }) {
  return (
    <div className={className}>
      <Eyebrow tone="dark">{t.eyebrow}</Eyebrow>
      <h2 className="font-display mt-4 text-balance text-3xl font-bold leading-[1.1] sm:text-4xl lg:text-[2.6rem]">{t.title}</h2>
      <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-white/65 sm:text-lg">{t.lead}</p>
    </div>
  );
}

/* ─── Phones and reduced motion: the milestones as a timeline ─── */

function Timeline({ t }: { t: Copy }) {
  return (
    <Container className="relative py-20 sm:py-28">
      <Heading t={t} className="max-w-2xl" />
      <RevealGroup className="relative mt-12 space-y-8 ps-12" stagger={0.07}>
        <span aria-hidden className="absolute bottom-2 start-[19px] top-2 w-px bg-gradient-to-b from-teal-400/70 via-white/15 to-spark-400/60" />
        {t.milestones.map((m, i) => {
          const Icon = icons[i];
          return (
            <RevealItem key={m.title} className="relative">
              <span className="absolute -start-12 top-0 flex h-10 w-10 items-center justify-center rounded-xl bg-ink-800 text-teal-300 ring-1 ring-white/10">
                <Icon className="h-[18px] w-[18px]" />
              </span>
              <p className="text-[12.5px] font-semibold text-teal-300">{m.status}</p>
              <p className="mt-1 text-lg font-semibold">{m.title}</p>
              <p className="mt-1.5 text-[15px] leading-relaxed text-white/65">{m.text}</p>
            </RevealItem>
          );
        })}
      </RevealGroup>
      <div className="mt-12 grid grid-cols-3 gap-3 rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/10">
        {[t.money.sale, t.money.cost, t.money.profit].map((label, i) => (
          <div key={label}>
            <p className="text-[11px] text-white/50">{label}</p>
            <p dir="ltr" className={cn("mt-1 font-mono text-[13px] font-semibold rtl:text-end sm:text-[15px]", i === 2 && "text-teal-300")}>{t.money.values[i]}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}

/* ─── Large screens: the scroll-driven stage ─── */

function Stage({ t, locale }: { t: Copy; locale: Locale }) {
  const wrap = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);
  const ship = useRef<SVGGElement>(null);
  const [milestone, setMilestone] = useState(0);
  const [status, setStatus] = useState(0);

  useEffect(() => {
    const w = wrap.current;
    const st = stage.current;
    const p = path.current;
    const sh = ship.current;
    if (!w || !st || !p || !sh) return;
    const length = p.getTotalLength();
    let frame = 0;
    let lastStatus = -1;
    let lastMilestone = -1;

    const draw = () => {
      frame = 0;
      const r = w.getBoundingClientRect();
      const travel = r.height - window.innerHeight;
      const progress = travel > 0 ? Math.min(1, Math.max(0, -r.top / travel)) : 0;
      const s = statusAt(progress);
      const along = routeAt(s);
      const pt = p.getPointAtLength(along * length);
      const ahead = p.getPointAtLength(Math.min(length, along * length + 2));
      const angle = (Math.atan2(ahead.y - pt.y, ahead.x - pt.x) * 180) / Math.PI;
      sh.setAttribute("transform", `translate(${pt.x} ${pt.y}) rotate(${along >= 1 ? 0 : angle})`);
      st.style.setProperty("--route", String(along));
      st.style.setProperty("--progress", String(progress));
      st.style.setProperty("--money", String(Math.min(1, Math.max(0, (s - 6) / 1.2))));
      const whole = Math.floor(s);
      if (whole !== lastStatus) {
        lastStatus = whole;
        setStatus(whole);
      }
      const m = milestoneFor(s);
      if (m !== lastMilestone) {
        lastMilestone = m;
        setMilestone(m);
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const rtl = locale === "ar";
  const closed = status >= 9;

  return (
    <div ref={wrap} className="relative h-[330vh]">
      <div ref={stage} className="sticky top-0 flex h-screen items-center" style={{ ["--route" as string]: 0, ["--progress" as string]: 0, ["--money" as string]: 0 }}>
        <Container className="grid grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] items-center gap-14 pt-16">
          {/* Milestones */}
          <div>
            <Heading t={t} />
            <ol className="relative mt-9 space-y-1">
              {t.milestones.map((m, i) => {
                const Icon = icons[i];
                const on = i === milestone;
                const done = i < milestone;
                return (
                  <li
                    key={m.title}
                    className={cn(
                      "relative rounded-2xl px-4 py-3 transition-[background-color,opacity] duration-500",
                      on ? "bg-white/[0.06] opacity-100 ring-1 ring-inset ring-white/10" : done ? "opacity-55" : "opacity-35",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-500",
                          on ? "bg-teal-400 text-ink-950" : done ? "bg-teal-400/20 text-teal-300" : "bg-white/[0.06] text-white/60",
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <p className="text-[15px] font-semibold">{m.title}</p>
                      <span className="ms-auto text-[11.5px] font-medium text-teal-300/90">{m.status}</span>
                    </div>
                    <div className={cn("grid transition-[grid-template-rows] duration-500", on ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                      <p className="min-h-0 overflow-hidden ps-11 text-[14px] leading-relaxed text-white/65">
                        <span className="block pt-1.5">{m.text}</span>
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* The route and the booking */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl bg-ink-900/80 p-6 ring-1 ring-white/10">
              <div aria-hidden className="absolute inset-0 bg-[radial-gradient(rgb(255_255_255/0.07)_1px,transparent_1px)] [background-size:18px_18px]" />
              <div className="relative">
                <svg viewBox="0 0 600 330" className={cn("w-full", rtl && "-scale-x-100")} aria-hidden>
                  <defs>
                    <linearGradient id="journey-route" x1="0" x2="1" y1="0" y2="0">
                      <stop offset="0%" stopColor="var(--color-teal-300)" />
                      <stop offset="100%" stopColor="var(--color-spark-400)" />
                    </linearGradient>
                  </defs>
                  <path d={ROUTE} fill="none" stroke="rgb(255 255 255 / 0.16)" strokeWidth="2" strokeDasharray="2 7" strokeLinecap="round" />
                  <path
                    ref={path}
                    d={ROUTE}
                    fill="none"
                    stroke="url(#journey-route)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    pathLength={1}
                    style={{ strokeDasharray: 1, strokeDashoffset: "calc(1 - var(--route))" }}
                  />
                  {/* Ports */}
                  {[[70, 262], [530, 80]].map(([x, y], i) => (
                    <g key={i} transform={`translate(${x} ${y})`}>
                      <circle r="14" fill="rgb(71 188 172 / 0.12)" className="animate-pulse-soft" />
                      <circle r="6" fill={i === 0 ? "var(--color-teal-300)" : "var(--color-spark-400)"} />
                    </g>
                  ))}
                  {/* Ship */}
                  <g ref={ship} transform="translate(70 262)">
                    <circle r="17" fill="var(--color-ink-950)" stroke="rgb(255 255 255 / 0.25)" />
                    <path d="M-9 1 h18 l-3.5 6 h-11 z M-5 1 v-6 h8 v6 M-1 -5 v-4" fill="none" stroke="white" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
                  </g>
                </svg>
                {/* Port labels: HTML, so Arabic shapes and sits right in either direction. */}
                <span className="absolute bottom-[3%] start-[2%] rounded-md bg-ink-950/80 px-2 py-1 text-[12px] font-semibold ring-1 ring-white/10">{t.from}</span>
                <span className="absolute end-[1%] top-[7%] rounded-md bg-ink-950/80 px-2 py-1 text-[12px] font-semibold ring-1 ring-white/10">{t.to}</span>
              </div>

              {/* The booking itself */}
              <div className="relative mt-4 rounded-2xl bg-white p-4 text-ink-900 shadow-float">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p dir="ltr" className="font-mono text-[13px] font-semibold rtl:text-end">{t.booking}</p>
                    <p className="truncate text-[12px] text-fog-500">{t.customer}</p>
                  </div>
                  <span
                    key={status}
                    className={cn(
                      "journey-pill shrink-0 rounded-full px-2.5 py-1 text-[11.5px] font-semibold ring-1",
                      closed ? "bg-teal-500 text-white ring-teal-500" : "bg-teal-50 text-teal-700 ring-teal-200",
                    )}
                  >
                    {t.statuses[status]}
                  </span>
                </div>
                {/* Status rail */}
                <div className="mt-3 flex gap-1" aria-hidden>
                  {t.statuses.map((s, i) => (
                    <span key={s} className={cn("h-1.5 flex-1 rounded-full transition-colors duration-300", i <= status ? "bg-teal-400" : "bg-fog-100")} />
                  ))}
                </div>
                {/* Money appears once the invoice exists */}
                <div className="mt-4 grid grid-cols-3 gap-3 border-t border-fog-100 pt-3 transition-opacity duration-300" style={{ opacity: "calc(0.25 + var(--money) * 0.75)" }}>
                  {[t.money.sale, t.money.cost, t.money.profit].map((label, i) => (
                    <div key={label}>
                      <p className="text-[10.5px] text-fog-500">{label}</p>
                      <p dir="ltr" className={cn("mt-0.5 font-mono text-[13px] font-semibold rtl:text-end", i === 2 && "text-teal-600")}>
                        {t.money.values[i]}
                        {i === 2 ? <span className="ms-1.5 text-[11px] text-fog-500">{t.money.values[3]}</span> : null}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Overall progress */}
            <div aria-hidden className="mx-auto mt-5 h-1 w-40 overflow-hidden rounded-full bg-white/10">
              <span className="block h-full origin-[left_center] bg-teal-400 rtl:origin-[right_center]" style={{ transform: "scaleX(var(--progress))" }} />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
