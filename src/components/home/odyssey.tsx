"use client";

import { useRef } from "react";
import { ArrowRight, Bot, Check } from "lucide-react";
import Link from "@/components/i18n/link";
import { useLocale } from "@/components/i18n/locale-provider";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { gsap, useGSAP, MOTION_OK, REDUCED } from "@/components/motion/gsap";
import { BOX, ContainerBox, Crane, Doc, ShipSide, Truck, boxColor, ink, paint, wavePath } from "@/components/motion/sprites";

/**
 * "One container, one booking": the home page's scroll story. One orange
 * container (booking NXS26000412) arrives on a truck, is lifted by the
 * crane onto the ship, the camera follows the ship across the sea to the
 * destination port, and the view pulls back to the books. At
 * each stage the system's work attaches to the container as chips, and a
 * chapter names the module.
 *
 * One SVG world (1600×900) under a camera group; a scrubbed GSAP timeline
 * tweens a state object and draw() writes it to the DOM each frame (no
 * React re-render per frame). Chips are HTML, positioned from world
 * coordinates through the camera's matrix. Without JS or with
 * prefers-reduced-motion the section is a still (ship loaded) with the
 * chapters as a plain list.
 */

const W = 1600;
const H = 900;
const QUAY_Y = 620;
const BOOM_Y = QUAY_Y - 190;
const TROLLEY_H = 14;
const SHIP_X = 700;
const HERO_SLOT = { col: 4, row: 3 };
const SLOT_X = SHIP_X + 40 + HERO_SLOT.col * 60;
const SLOT_Y = QUAY_Y - (HERO_SLOT.row + 1) * BOX.h;
const TRUCK_X = 150;
/** How far the ship sails, and where the destination quay begins. */
const SAIL = 1700;
const DEST_X = 3200;

type Stage = "quote" | "carrier" | "loaded" | "sea" | "arrived" | "closed";

type Chapter = { id: Stage; module: string; title: string; text: string; href: string };
type Copy = {
  eyebrow: string;
  title: string;
  lead: string;
  scroll: string;
  chapters: Chapter[];
  chips: Record<string, string>;
  statuses: string[];
  booking: string;
  more: string;
};

const copy: Record<Locale, Copy> = {
  en: {
    eyebrow: "One container, one booking",
    title: "Follow a container through Routel",
    lead: "From the gate to the books, every stage of the shipment is a module, and all of it lands on one record.",
    scroll: "Scroll",
    chapters: [
      { id: "quote", module: "Quotations & Bookings", title: "A rate becomes a booking", text: "The quotation is built on a current buying rate for the lane. When the customer accepts, one click turns it into booking NXS26000412, charges included.", href: "/platform/quotations" },
      { id: "carrier", module: "Carrier booking · AI", title: "The assistant reads the carrier", text: "The shipping line's confirmation PDF goes in; the assistant reads vessel, voyage, cut-offs and the carrier reference, and you tick what to save. Then you issue the Booking Confirmation.", href: "/platform/ai-assistant" },
      { id: "loaded", module: "Bill of Lading · Documents", title: "Loaded, with its papers", text: "Gate In, SI Submitted, Vessel Loaded: the status moves on the booking. The House B/L is generated from the same data, and the master B/L number is recorded.", href: "/platform/bill-of-lading" },
      { id: "sea", module: "Tracking", title: "Your customer follows it", text: "Departed, In Transit. The customer looks the shipment up by booking, B/L or container number, with no login, and sees the status timeline only.", href: "/platform/tracking" },
      { id: "arrived", module: "Invoicing · Finance", title: "Invoiced before it lands", text: "Create Invoice turns the booking's sale lines into a tax invoice in your base currency and USD. The payment is matched from the finance mailbox and confirmed by a person.", href: "/platform/invoicing" },
      { id: "closed", module: "Accounting", title: "Closed, and already in the books", text: "Shipment Closed. The booking's profit is in the P&L, the receivable is cleared, and nobody re-typed a number along the way.", href: "/platform/accounting" },
    ],
    chips: {
      quote: "Quotation accepted",
      booking: "Booking NXS26000412",
      read: "Read by the assistant · MSC ISABELLA 412E",
      confirm: "Booking Confirmation issued",
      hbl: "House B/L generated",
      mbl: "MBL MSCUKL4471",
      track: "Customer tracking · no login",
      invoice: "Tax invoice · MYR 13,050.00",
      paid: "Payment matched",
      profit: "Profit MYR 2,968.50 · 23.1%",
      closed: "Shipment Closed",
    },
    statuses: ["Booking Pending", "Booking Confirmed", "Gate In", "SI Submitted", "Vessel Loaded", "Departed", "In Transit", "Arrived", "Telex Status", "Shipment Closed"],
    booking: "Booking",
    more: "See the module",
  },
  ar: {
    eyebrow: "حاوية واحدة، حجز واحد",
    title: "تابع حاوية عبر Routel",
    lead: "من البوابة حتى الدفاتر، كل مرحلة في الشحنة وحدة في النظام، وكلها تصب في سجل واحد.",
    scroll: "مرّر",
    chapters: [
      { id: "quote", module: "عروض الأسعار والحجوزات", title: "السعر يصير حجزاً", text: "يُبنى عرض السعر على سعر شراء ساري للمسار. وحين يقبله العميل، تحوّله نقرة واحدة إلى الحجز NXS26000412 مع رسومه.", href: "/platform/quotations" },
      { id: "carrier", module: "حجز الناقل · الذكاء الاصطناعي", title: "المساعد يقرأ تأكيد الناقل", text: "يدخل ملف تأكيد الخط الملاحي، فيقرأ المساعد السفينة والرحلة ومواعيد الإغلاق ورقم الناقل، وتختار أنت ما يُحفظ. ثم تُصدر «تأكيد الحجز» لعميلك.", href: "/platform/ai-assistant" },
      { id: "loaded", module: "بوليصة الشحن · المستندات", title: "على السفينة، بأوراقها", text: "دخول البوابة، تعليمات الشحن، التحميل: الحالة تتقدم في الحجز. وتُنشأ البوليصة الفرعية من البيانات نفسها، ويُسجَّل رقم البوليصة الرئيسية.", href: "/platform/bill-of-lading" },
      { id: "sea", module: "التتبّع", title: "عميلك يتابعها بنفسه", text: "غادرت، قيد النقل. يبحث العميل عن شحنته برقم الحجز أو البوليصة أو الحاوية، دون تسجيل دخول، ويرى تسلسل الحالة فقط.", href: "/platform/tracking" },
      { id: "arrived", module: "الفواتير · المالية", title: "الفاتورة جاهزة قبل الوصول", text: "زر «إنشاء فاتورة» يحوّل بنود البيع إلى فاتورة ضريبية بالريال والدولار. وتُطابَق الدفعة من بريد المالية ويؤكدها شخص.", href: "/platform/invoicing" },
      { id: "closed", module: "المحاسبة", title: "أُغلقت، وهي في الدفاتر", text: "الشحنة مغلقة. ربح الحجز في قائمة الأرباح والخسائر، والذمة مسدّدة، ولم يُعد أحد كتابة رقم واحد في الطريق.", href: "/platform/accounting" },
    ],
    chips: {
      quote: "عرض السعر مقبول",
      booking: "الحجز NXS26000412",
      read: "قرأه المساعد · MSC ISABELLA 412E",
      confirm: "صدر تأكيد الحجز",
      hbl: "أُنشئت البوليصة الفرعية",
      mbl: "MBL MSCJED4471",
      track: "تتبّع العميل · دون تسجيل دخول",
      invoice: "فاتورة ضريبية · SAR 18,250.00",
      paid: "الدفعة مطابَقة",
      profit: "الربح SAR 4,240.00 · 23.2%",
      closed: "الشحنة مغلقة",
    },
    statuses: ["الحجز قيد الانتظار", "تم تأكيد الحجز", "دخول البوابة", "تم تقديم تعليمات الشحن", "تم التحميل على السفينة", "غادرت", "قيد النقل", "وصلت", "حالة التلكس", "الشحنة مغلقة"],
    booking: "الحجز",
    more: "اعرف الوحدة",
  },
};

/** Chips: when they show (progress), what they follow (world point or the hero), and their offset. */
type ChipDef = { id: string; from: number; to: number; anchor: "hero" | "ship" | [number, number]; dx: number; dy: number; tone?: "ai" | "money" | "done" };
const chipDefs: ChipDef[] = [
  { id: "quote", from: 0.07, to: 0.12, anchor: "hero", dx: 40, dy: -70 },
  { id: "booking", from: 0.11, to: 0.5, anchor: "hero", dx: 40, dy: -70 },
  { id: "read", from: 0.2, to: 0.33, anchor: "hero", dx: 40, dy: -118, tone: "ai" },
  { id: "confirm", from: 0.3, to: 0.42, anchor: "hero", dx: 40, dy: -166, tone: "done" },
  { id: "hbl", from: 0.42, to: 0.55, anchor: "hero", dx: 40, dy: -118, tone: "done" },
  { id: "mbl", from: 0.46, to: 0.55, anchor: "hero", dx: 40, dy: -166 },
  { id: "track", from: 0.63, to: 0.78, anchor: "ship", dx: 30, dy: -60 },
  { id: "invoice", from: 0.78, to: 0.9, anchor: "ship", dx: 30, dy: -60, tone: "money" },
  { id: "paid", from: 0.83, to: 0.93, anchor: "ship", dx: 30, dy: -108, tone: "done" },
  { id: "profit", from: 0.9, to: 1.01, anchor: "ship", dx: 30, dy: -60, tone: "money" },
  { id: "closed", from: 0.94, to: 1.01, anchor: "ship", dx: 30, dy: -108, tone: "done" },
];

const chapterAt: Array<[number, number]> = [
  [0.02, 0.17],
  [0.17, 0.4],
  [0.4, 0.56],
  [0.56, 0.78],
  [0.78, 0.9],
  [0.9, 1.0],
];

const statusAt = (p: number) => {
  if (p < 0.11) return 0;
  if (p < 0.3) return 1;
  if (p < 0.36) return 2;
  if (p < 0.4) return 3;
  if (p < 0.55) return 4;
  if (p < 0.62) return 5;
  if (p < 0.78) return 6;
  if (p < 0.9) return 7;
  if (p < 0.94) return 8;
  return 9;
};

export function Odyssey() {
  const locale = useLocale();
  const t = copy[locale];
  const root = useRef<HTMLElement>(null);
  const rtl = locale === "ar";

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const q = <T extends Element>(sel: string) => el.querySelector(sel) as T;
      const svg = q<SVGSVGElement>("svg[data-world]");
      const cam = q<SVGGElement>("[data-cam]");
      const truck = q<SVGGElement>("[data-truck]");
      const hero = q<SVGGElement>("[data-hero]");
      const trolley = q<SVGRectElement>("[data-trolley]");
      const cable = q<SVGLineElement>("[data-cable]");
      const spreader = q<SVGRectElement>("[data-spreader]");
      const shipSide = q<SVGGElement>("[data-ship-side]");
      const dusk = q<SVGRectElement>("[data-dusk]");
      const bars = Array.from(el.querySelectorAll<SVGRectElement>("[data-bar]"));
      const hbl = q<SVGGElement>("[data-hbl]");
      const waves = Array.from(el.querySelectorAll<SVGPathElement>("[data-wave]"));
      const chips = Array.from(el.querySelectorAll<HTMLElement>("[data-chip]"));
      const chapters = Array.from(el.querySelectorAll<HTMLElement>("[data-chapter]"));
      const statusEl = q<HTMLElement>("[data-status]");
      const rail = Array.from(el.querySelectorAll<HTMLElement>("[data-rail]"));
      const progressEl = q<HTMLElement>("[data-progress]");
      const stage = q<HTMLElement>("[data-stage]");
      const hint = q<HTMLElement>("[data-hint]");
      if (!svg || !cam) return;

      const pt = svg.createSVGPoint();

      const mm = gsap.matchMedia();

      mm.add(REDUCED, () => {
        el.setAttribute("data-mode", "static");
      });

      mm.add(MOTION_OK, () => {
        el.setAttribute("data-mode", "scroll");
        const s = {
          p: 0,
          z: 1,
          fx: 800,
          fy: 460,
          truckX: -420,
          heroX: -408,
          heroY: QUAY_Y - 12 - BOX.h,
          trolleyX: 1008,
          drop: 24,
          shipDx: 0,
          follow: 0,
          dusk: 0,
          books: 0,
          hblOut: 0,
        };
        let lastStatus = -1;

        const draw = () => {
          // Once the ship sails, the camera's focus travels with it.
          const fx = s.fx + s.follow * s.shipDx;
          cam.setAttribute("transform", `translate(${W / 2} ${H / 2}) scale(${s.z}) translate(${-fx} ${-s.fy})`);
          truck.setAttribute("transform", `translate(${s.truckX} ${QUAY_Y})`);
          hero.setAttribute("transform", `translate(${s.heroX} ${s.heroY})`);
          const top0 = BOOM_Y + TROLLEY_H;
          trolley.setAttribute("x", String(s.trolleyX - 20));
          cable.setAttribute("x1", String(s.trolleyX));
          cable.setAttribute("x2", String(s.trolleyX));
          cable.setAttribute("y2", String(top0 + s.drop));
          spreader.setAttribute("x", String(s.trolleyX - 32));
          spreader.setAttribute("y", String(top0 + s.drop));
          shipSide.setAttribute("transform", `translate(${SHIP_X + s.shipDx} ${QUAY_Y})`);
          dusk.style.opacity = String(s.dusk);
          bars.forEach((b, i) => b.setAttribute("transform", `translate(0 ${(1 - s.books) * (60 + i * 14)}) scale(1 ${Math.max(0.001, s.books)})`));
          hbl.setAttribute("transform", `translate(${s.hblOut * 70} ${-s.hblOut * 40})`);
          hbl.style.opacity = String(Math.min(1, s.hblOut * 2));
          progressEl.style.transform = `scaleX(${s.p})`;

          // Chips follow their anchors through the camera.
          const m = cam.getScreenCTM();
          const box = stage.getBoundingClientRect();
          if (m) {
            for (const c of chips) {
              const def = chipDefs.find((d) => d.id === c.dataset.chip)!;
              let wx: number;
              let wy: number;
              if (def.anchor === "hero") {
                wx = s.heroX + BOX.w / 2;
                wy = s.heroY;
              } else if (def.anchor === "ship") {
                wx = SHIP_X + s.shipDx + 380;
                wy = QUAY_Y - 3 * BOX.h - 10;
              } else {
                [wx, wy] = def.anchor;
              }
              pt.x = wx;
              pt.y = wy;
              const sp = pt.matrixTransform(m);
              const on = s.p >= def.from && s.p < def.to;
              c.style.opacity = on ? "1" : "0";
              // Keep the chip inside the stage: it sits beside its anchor, on the reading side.
              const cw = c.offsetWidth;
              const raw = sp.x - box.left + (rtl ? -def.dx * s.z - cw : def.dx * s.z);
              const x = gsap.utils.clamp(8, Math.max(8, box.width - cw - 8), raw);
              c.style.transform = `translate(${x}px, ${sp.y - box.top + def.dy * s.z}px) scale(${on ? 1 : 0.9})`;
            }
          }
          const st = statusAt(s.p);
          if (st !== lastStatus) {
            lastStatus = st;
            statusEl.textContent = t.statuses[st];
            rail.forEach((r, i) => r.classList.toggle("is-on", i <= st));
          }
          chapters.forEach((ch, i) => {
            const [a, b] = chapterAt[i];
            const fadeIn = gsap.utils.clamp(0, 1, (s.p - a) / 0.03);
            const fadeOut = gsap.utils.clamp(0, 1, (b - s.p) / 0.03);
            const o = i === chapters.length - 1 ? fadeIn : Math.min(fadeIn, fadeOut);
            ch.style.opacity = String(o);
            ch.style.transform = `translateY(${(1 - o) * 14}px)`;
            ch.style.pointerEvents = o > 0.5 ? "auto" : "none";
          });
          hint.style.opacity = String(gsap.utils.clamp(0, 1, 1 - s.p / 0.04));
        };

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: el, start: "top top", end: "+=720%", scrub: 0.6, pin: true, anticipatePin: 1, invalidateOnRefresh: true },
          onUpdate: draw,
        });
        tl.to(s, { p: 1, duration: 1 }, 0);
        // 1. The truck brings the container to the quay.
        tl.to(s, { truckX: TRUCK_X, heroX: TRUCK_X + 12, duration: 0.08, ease: "power2.out" }, 0);
        tl.to(s, { z: 1.45, fx: TRUCK_X + 60, fy: QUAY_Y - 60, duration: 0.1, ease: "power2.inOut" }, 0.04);
        // 2. The crane: trolley over, spreader down, lift, carry, lower into the slot.
        tl.to(s, { trolleyX: TRUCK_X + 12 + BOX.w / 2, duration: 0.05, ease: "power2.inOut" }, 0.1);
        tl.to(s, { drop: QUAY_Y - 12 - BOX.h - 6 - (BOOM_Y + TROLLEY_H), duration: 0.05, ease: "power2.inOut" }, 0.15);
        tl.to(s, { drop: 40, heroY: BOOM_Y + TROLLEY_H + 46, duration: 0.07, ease: "power2.inOut" }, 0.2);
        tl.to(s, { truckX: -420, duration: 0.08, ease: "power2.in" }, 0.24);
        tl.to(s, { trolleyX: SLOT_X + BOX.w / 2, heroX: SLOT_X, fx: 620, fy: BOOM_Y + 90, duration: 0.09, ease: "power2.inOut" }, 0.27);
        tl.to(s, { drop: SLOT_Y - 6 - (BOOM_Y + TROLLEY_H), heroY: SLOT_Y, duration: 0.06, ease: "power2.inOut" }, 0.36);
        tl.to(s, { drop: 24, duration: 0.04, ease: "power2.inOut" }, 0.42);
        // 3. Pull back to the loaded ship; the B/L slides out of the container.
        tl.to(s, { z: 0.95, fx: 1000, fy: 520, duration: 0.1, ease: "power2.inOut" }, 0.4);
        tl.to(s, { hblOut: 1, duration: 0.05, ease: "power2.out" }, 0.43);
        // 4. The ship leaves; the camera starts to travel with it.
        tl.to(s, { shipDx: SAIL, heroX: `+=${SAIL}`, duration: 0.36, ease: "power1.inOut" }, 0.5);
        tl.to(s, { hblOut: 0, duration: 0.04 }, 0.5);
        tl.to(s, { z: 0.85, fx: SHIP_X + 380, fy: 500, follow: 1, duration: 0.1, ease: "power2.inOut" }, 0.5);
        // 5. At sea: open water, slowly zooming out.
        tl.to(s, { z: 0.78, fy: 480, duration: 0.26 }, 0.6);
        // 6. Arrived at the destination quay, then dusk and out to the books.
        tl.to(s, { z: 0.62, fy: 470, dusk: 0.75, duration: 0.14, ease: "power2.inOut" }, 0.86);
        tl.to(s, { books: 1, duration: 0.1, ease: "power2.out" }, 0.9);

        draw();
        const sea = gsap.to(waves, { x: -120, duration: 7, repeat: -1, ease: "none" });
        return () => sea.kill();
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [locale] },
  );

  const stageText = (
    <>
      <p className="text-[12.5px] font-semibold uppercase tracking-[0.14em] text-teal-300">{t.eyebrow}</p>
      <h2 className="font-display mt-3 text-balance text-3xl font-bold leading-[1.1] text-white sm:text-4xl lg:text-[2.6rem]">{t.title}</h2>
      <p className="mt-3 max-w-md text-pretty text-[15px] leading-relaxed text-white/65 sm:text-base">{t.lead}</p>
    </>
  );

  return (
    <section ref={root} id="odyssey" data-mode="static" className="odyssey relative bg-ink-950 text-white">
      {/* The stage: pinned at scroll mode, a tall still otherwise. */}
      <div data-stage="" className="odyssey-stage relative overflow-hidden">
        <svg data-world="" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
          <defs>
            <linearGradient id="ody-sky" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor={ink.bg} />
              <stop offset="1" stopColor={ink.hull} />
            </linearGradient>
            <linearGradient id="ody-sea" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor={paint.sea} />
              <stop offset="1" stopColor={ink.bg} />
            </linearGradient>
          </defs>
          <rect width={W} height={H} fill="url(#ody-sky)" />
          <g data-cam="" transform={`translate(${W / 2} ${H / 2}) scale(0.95) translate(-1000 -520)`}>
            {/* ── Side view: quay, crane, truck, ship ── */}
            <g data-side="">
              <rect x={-600} y={QUAY_Y} width={1240} height={400} fill={ink.deep} />
              <rect x={-600} y={QUAY_Y} width={1240} height={6} fill={ink.line} />
              {/* the destination port's far cranes */}
              <g opacity="0.14" stroke={paint.fog} strokeWidth="2" fill="none">
                {[DEST_X + 420, DEST_X + 510, DEST_X + 600].map((x) => (
                  <path key={x} d={`M${x} ${QUAY_Y + 40} V${QUAY_Y - 140} M${x + 24} ${QUAY_Y + 40} V${QUAY_Y - 140} M${x - 30} ${QUAY_Y - 140} H${x + 70}`} />
                ))}
              </g>
              {/* quay stack */}
              {[-160, -100, -40].map((x, i) => (
                <ContainerBox key={x} x={x} y={QUAY_Y - BOX.h} color={boxColor(i + 2)} opacity={0.85} />
              ))}
              <Truck data-truck="" x={TRUCK_X} y={QUAY_Y} />
              <ShipSide
                data-ship-side=""
                x={SHIP_X}
                y={QUAY_Y}
                length={760}
                slots={Array.from({ length: 10 }, (_, col) => [0, 1, 2].map((row) => ({ col, row }))).flat()}
              />
              <Crane x={560} y={QUAY_Y} />
              <rect data-trolley="" x={1008 - 20} y={BOOM_Y} width={40} height={TROLLEY_H} rx={2} fill={paint.amber} />
              <line data-cable="" x1={1008} x2={1008} y1={BOOM_Y + TROLLEY_H} y2={BOOM_Y + TROLLEY_H + 24} stroke={paint.fog} strokeWidth="2" />
              <rect data-spreader="" x={1008 - 32} y={BOOM_Y + TROLLEY_H + 24} width={64} height={6} rx={1} fill={paint.amber} />
              {/* The booking's container (still: in its slot on the ship) */}
              <g data-hero="" transform={`translate(${SLOT_X} ${SLOT_Y})`}>
                <ContainerBox x={0} y={0} hero />
                <g data-hbl="" style={{ opacity: 0 }}>
                  <Doc x={BOX.w + 4} y={-30} w={36} h={44} stamp />
                </g>
              </g>
              {/* sea, all the way to the destination */}
              <rect x={640} y={QUAY_Y + 46} width={DEST_X - 640 + 40} height={400} fill="url(#ody-sea)" opacity="0.95" />
              <g fill="none" stroke="rgb(124 214 199 / 0.3)" strokeWidth="2" strokeLinecap="round">
                {[QUAY_Y + 60, QUAY_Y + 84, QUAY_Y + 110].map((y, i) => (
                  <path key={y} data-wave="" opacity={1 - i * 0.25} d={wavePath(520, y, 48, 60, 6 - i)} />
                ))}
              </g>
              {/* the destination quay */}
              <rect x={DEST_X} y={QUAY_Y} width={1400} height={400} fill={ink.deep} />
              <rect x={DEST_X} y={QUAY_Y} width={1400} height={6} fill={ink.line} />
              {[0, 1, 2, 3].map((i) => (
                <ContainerBox key={i} x={DEST_X + 180 + i * 60} y={QUAY_Y - BOX.h} color={boxColor(i + 1)} opacity={0.85} />
              ))}
              {[0, 1].map((i) => (
                <ContainerBox key={`r${i}`} x={DEST_X + 240 + i * 60} y={QUAY_Y - 2 * BOX.h} color={boxColor(i + 4)} opacity={0.85} />
              ))}
              <Crane x={DEST_X + 120} y={QUAY_Y} reach={520} back={140} />
            </g>

            {/* ── The finale: dusk, then the books ── */}
            <g data-finale="">
              <rect data-dusk="" x={-800} y={-800} width={6000} height={2600} fill={ink.bg} style={{ opacity: 0 }} />
              <g transform={`translate(${SHIP_X + 380 + SAIL - 140} 400)`}>
                {[44, 52, 49, 61, 70, 82].map((h, i) => (
                  <rect key={i} data-bar="" x={i * 46} y={-h * 2.2} width={32} height={h * 2.2} rx={4} fill={i === 5 ? paint.hero : paint.teal} transform="translate(0 60) scale(1 0.001)" opacity="0.9" />
                ))}
                <path d="M-10 4 H290" stroke={paint.fog} strokeWidth="2" opacity="0.4" />
              </g>
            </g>

          </g>
        </svg>

        {/* Chips: the system's work, attached to the container */}
        {chipDefs.map((c) => (
          <span
            key={c.id}
            data-chip={c.id}
            className={cn(
              "odyssey-chip pointer-events-none absolute left-0 top-0 inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-[12px] font-semibold shadow-float ring-1 transition-[opacity,transform] duration-300",
              c.tone === "ai" && "bg-spark-400 text-ink-950 ring-spark-300",
              c.tone === "money" && "bg-white text-ink-900 ring-fog-200",
              c.tone === "done" && "bg-teal-400 text-ink-950 ring-teal-300",
              !c.tone && "bg-ink-900/95 text-white ring-white/15",
            )}
            style={{ opacity: 0 }}
          >
            {c.tone === "ai" ? <Bot className="h-3.5 w-3.5" /> : c.tone === "done" ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : null}
            <span dir="auto">{t.chips[c.id]}</span>
          </span>
        ))}

        {/* The booking's status, top corner */}
        <div className="absolute end-4 top-20 z-10 rounded-2xl bg-ink-900/90 p-3 text-start ring-1 ring-white/10 backdrop-blur sm:end-8 sm:top-24 sm:p-4">
          <p className="text-[10.5px] font-medium text-white/50">{t.booking}</p>
          <p dir="ltr" className="font-mono text-[13px] font-semibold rtl:text-end">NXS26000412</p>
          <p data-status="" className="mt-1 text-[12.5px] font-semibold text-teal-300">{t.statuses[4]}</p>
          <div className="mt-2 flex gap-[3px]" aria-hidden>
            {t.statuses.map((st, i) => (
              <span key={st} data-rail="" className={cn("odyssey-rail h-1 w-4 rounded-full bg-white/10 sm:w-5", i <= 4 && "is-on")} />
            ))}
          </div>
        </div>

        {/* Scroll hint and progress */}
        <p data-hint="" className="odyssey-hint pointer-events-none absolute bottom-6 start-1/2 z-10 -translate-x-1/2 text-[12px] font-medium text-white/50 rtl:translate-x-1/2">
          {t.scroll} ↓
        </p>
        <div className="odyssey-progress absolute inset-x-0 bottom-0 z-10 h-[3px] bg-white/10" aria-hidden>
          <span data-progress="" className="block h-full origin-[left_center] bg-teal-400 rtl:origin-[right_center]" style={{ transform: "scaleX(0)" }} />
        </div>
      </div>

      {/* Heading and chapters (overlay in scroll mode) */}
      <div className="odyssey-panel absolute inset-x-0 bottom-0 z-10 p-5 sm:p-8 lg:inset-y-0 lg:end-auto lg:flex lg:w-[420px] lg:flex-col lg:justify-center lg:p-12">
        <div className="odyssey-heading">{stageText}</div>
        <div className="odyssey-chapters relative mt-6 lg:mt-10">
          {t.chapters.map((ch) => (
            <article key={ch.id} data-chapter={ch.id} className="odyssey-chapter rounded-2xl bg-ink-950/70 p-4 ring-1 ring-white/10 backdrop-blur-md sm:p-5">
              <p className="text-[11.5px] font-semibold uppercase tracking-[0.12em] text-spark-300">{ch.module}</p>
              <h3 className="font-display mt-1.5 text-xl font-bold text-white sm:text-2xl">{ch.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-white/70">{ch.text}</p>
              <Link href={ch.href} className="group mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-teal-300 hover:text-teal-200">
                {t.more}
                <ArrowRight className="h-3.5 w-3.5 transition-transform ltr:group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
              </Link>
            </article>
          ))}
        </div>
      </div>

    </section>
  );
}
