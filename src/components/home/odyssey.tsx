"use client";

import { useRef, type ReactNode } from "react";
import { ArrowRight, ArrowUp, Check, FileText, Paperclip, RotateCcw, Sparkles, X } from "lucide-react";
import Link from "@/components/i18n/link";
import { useLocale } from "@/components/i18n/locale-provider";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { gsap, useGSAP, MOTION_OK, REDUCED } from "@/components/motion/gsap";
import { BOX, ContainerBox, Crane, ShipSide, Truck, boxColor, ink, paint, wavePath } from "@/components/motion/sprites";

/**
 * "One container, one booking": the home page's scroll story, told twice at
 * once. On the stage, one orange container (booking NXS26000412) arrives on
 * a truck, is lifted by the crane onto the ship, sails to the destination
 * quay, and is lifted off onto a truck there. Beside it, the Routel Assistant's chat
 * does the same shipment's work in the system: the quotation, the booking,
 * the carrier's confirmation read from its PDF, the House B/L, the tax
 * invoice, the matched payment and the closed booking in the P&L. Every
 * tool it calls is one the assistant really has, every write waits for a
 * confirmation, and each message is timed to the ship.
 *
 * One SVG world under a camera group; a scrubbed GSAP timeline tweens a
 * state object and draw() writes it to the DOM each frame (no React
 * re-render per frame). Chat messages are HTML revealed by the same
 * progress; the transcript scrolls itself so the latest message is in
 * view. Without JS or with prefers-reduced-motion the section is a still
 * (ship loaded) with the whole transcript under it.
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
/** The destination crane and the truck that collects the container there. */
const DEST_CRANE_X = DEST_X + 100;
const DEST_TRUCK_X = DEST_X + 220;
const DEST_SLOT_X = SLOT_X + SAIL;

type Item =
  | { at: number; kind: "module"; module: string; href: string }
  | { at: number; kind: "user"; text: string; file?: string }
  | { at: number; kind: "assistant"; text: string }
  | { at: number; kind: "card"; title: string; tools: string[]; rows: Array<[string, string]>; big?: string; confirm?: string; confirmedAt?: number }
  | { at: number; kind: "doc"; name: string; meta: string }
  | { at: number; kind: "status"; text: string };

type Copy = {
  eyebrow: string;
  title: string;
  lead: string;
  scroll: string;
  booking: string;
  statuses: string[];
  header: string;
  sub: string;
  input: string;
  more: string;
  confirmed: string;
  items: Item[];
};

/**
 * The transcript, timed to the stage (`at` is the scroll progress). Each
 * turn answers a move on the stage: the truck for Gate In, the crane for
 * loading, the ship leaving for the B/L, the arrival for the payment. The
 * tools named are the assistant's real ones; every write is a card that
 * waits for its confirmation.
 */
const copy: Record<Locale, Copy> = {
  en: {
    eyebrow: "One container, one booking",
    title: "Follow a container through Routel",
    lead: "The ship on one side, the system on the other: every stage of the shipment is done in the assistant's chat, and all of it lands on one record.",
    scroll: "Scroll",
    booking: "Booking",
    statuses: ["Booking Pending", "Booking Confirmed", "Gate In", "SI Submitted", "Vessel Loaded", "Departed", "In Transit", "Arrived", "Telex Status", "Shipment Closed"],
    header: "Routel Assistant",
    sub: "Calls the system's tools · writes only after you confirm",
    input: "Ask in any language…",
    more: "See the module",
    confirmed: "Confirmed",
    items: [
      { at: 0, kind: "module", module: "Quotations & Bookings", href: "/platform/quotations" },
      { at: 0.01, kind: "user", text: "Quote Port Klang to Jebel Ali, 1 × 40HC." },
      { at: 0.025, kind: "card", title: "Quotation · Q-26-0412", tools: ["search_route_rates", "create_quotation"], rows: [["Ocean freight 40HC", "USD 2,400"], ["Local charges", "MYR 1,770"]], confirm: "Confirm & send", confirmedAt: 0.045 },
      { at: 0.06, kind: "status", text: "Customer accepted · now booking NXS26000412" },
      { at: 0.09, kind: "module", module: "Carrier booking · AI", href: "/platform/ai-assistant" },
      { at: 0.095, kind: "user", text: "Record the carrier's confirmation on the booking.", file: "MSC confirmation.pdf" },
      { at: 0.11, kind: "card", title: "Read from the carrier's file", tools: ["read_uploaded_document", "update_job"], rows: [["Vessel", "MSC ISABELLA · 412E"], ["Cargo cut-off", "14 Nov, 12:00"], ["Carrier ref.", "MSCUKL4471"]], confirm: "Confirm", confirmedAt: 0.13 },
      { at: 0.14, kind: "doc", name: "Booking Confirmation.pdf", meta: "Sent to the customer" },
      { at: 0.165, kind: "status", text: "Gate In · MSCU 442118-0" },
      { at: 0.23, kind: "status", text: "SI Submitted" },
      { at: 0.33, kind: "assistant", text: "The container is on the crane. Loading onto MSC ISABELLA now." },
      { at: 0.45, kind: "status", text: "Vessel Loaded" },
      { at: 0.46, kind: "module", module: "Bill of Lading · Documents", href: "/platform/bill-of-lading" },
      { at: 0.47, kind: "card", title: "House B/L · HBL-26000412", tools: ["create_bill_of_lading"], rows: [["Consignee", "Gulf Horizon FZE"], ["Master B/L", "MSCUKL4471"]], confirm: "Confirm & issue", confirmedAt: 0.49 },
      { at: 0.505, kind: "doc", name: "House B/L.pdf", meta: "Ready to sign" },
      { at: 0.545, kind: "status", text: "Departed · 15 Nov" },
      { at: 0.56, kind: "module", module: "Tracking", href: "/platform/tracking" },
      { at: 0.58, kind: "assistant", text: "Your customer follows it by booking or container number, with no login." },
      { at: 0.62, kind: "status", text: "In Transit · arriving 22 Nov" },
      { at: 0.64, kind: "module", module: "Invoicing · Finance", href: "/platform/invoicing" },
      { at: 0.645, kind: "user", text: "Issue the invoice." },
      { at: 0.66, kind: "card", title: "Tax invoice · INV-26-0412", tools: ["create_invoice_from_charges"], rows: [["Ocean freight 40HC", "USD 2,400"], ["Local charges", "MYR 1,770"]], big: "MYR 13,050.00", confirm: "Confirm & issue", confirmedAt: 0.68 },
      { at: 0.7, kind: "doc", name: "Tax Invoice.pdf", meta: "MYR 13,050.00 · USD 2,776.60" },
      { at: 0.755, kind: "status", text: "Arrived · Jebel Ali" },
      { at: 0.77, kind: "card", title: "Payment from the finance mailbox", tools: ["list_payment_suggestions"], rows: [["Amount", "MYR 13,050.00"], ["Matches", "INV-26-0412"]], confirm: "Confirm match", confirmedAt: 0.8 },
      { at: 0.84, kind: "status", text: "Telex Status · cargo released" },
      { at: 0.9, kind: "module", module: "Accounting", href: "/platform/accounting" },
      { at: 0.905, kind: "user", text: "Close the shipment." },
      { at: 0.925, kind: "card", title: "The booking, in the books", tools: ["update_job", "run_report"], rows: [["Revenue", "MYR 13,050"], ["Cost", "MYR 10,035"]], big: "Profit MYR 3,015 · 23.1%" },
      { at: 0.965, kind: "assistant", text: "Shipment Closed. Nobody re-typed a number along the way." },
    ],
  },
  ar: {
    eyebrow: "حاوية واحدة، حجز واحد",
    title: "تابع حاوية عبر Routel",
    lead: "السفينة على جهة، والنظام على الجهة الأخرى: كل مرحلة في الشحنة تُنجز في محادثة المساعد، وكلها تصب في سجل واحد.",
    scroll: "مرّر",
    booking: "الحجز",
    statuses: ["الحجز قيد الانتظار", "تم تأكيد الحجز", "دخول البوابة", "تم تقديم تعليمات الشحن", "تم التحميل على السفينة", "غادرت", "قيد النقل", "وصلت", "حالة التلكس", "الشحنة مغلقة"],
    header: "مساعد Routel",
    sub: "يستدعي أدوات النظام · ولا يحفظ شيئاً قبل تأكيدك",
    input: "اطلب بأي لغة…",
    more: "اعرف الوحدة",
    confirmed: "تم التأكيد",
    items: [
      { at: 0, kind: "module", module: "عروض الأسعار والحجوزات", href: "/platform/quotations" },
      { at: 0.01, kind: "user", text: "جهّز عرض سعر: جدة ← جبل علي، 1 × 40HC." },
      { at: 0.025, kind: "card", title: "عرض سعر · Q-26-0412", tools: ["search_route_rates", "create_quotation"], rows: [["شحن بحري 40HC", "USD 4,200"], ["رسوم محلية", "SAR 2,500"]], confirm: "تأكيد وإرسال", confirmedAt: 0.045 },
      { at: 0.06, kind: "status", text: "قبِل العميل العرض · صار الحجز NXS26000412" },
      { at: 0.09, kind: "module", module: "حجز الناقل · الذكاء الاصطناعي", href: "/platform/ai-assistant" },
      { at: 0.095, kind: "user", text: "سجّل تأكيد الناقل على الحجز.", file: "تأكيد MSC.pdf" },
      { at: 0.11, kind: "card", title: "قُرئ من ملف الناقل", tools: ["read_uploaded_document", "update_job"], rows: [["السفينة", "MSC ISABELLA · 412E"], ["إغلاق الحمولة", "14 نوفمبر، 12:00"], ["رقم الناقل", "MSCJED4471"]], confirm: "تأكيد", confirmedAt: 0.13 },
      { at: 0.14, kind: "doc", name: "تأكيد الحجز.pdf", meta: "أُرسل إلى العميل" },
      { at: 0.165, kind: "status", text: "دخول البوابة · MSCU 442118-0" },
      { at: 0.23, kind: "status", text: "تم تقديم تعليمات الشحن" },
      { at: 0.33, kind: "assistant", text: "الحاوية في الرافعة. التحميل على MSC ISABELLA الآن." },
      { at: 0.45, kind: "status", text: "تم التحميل على السفينة" },
      { at: 0.46, kind: "module", module: "بوليصة الشحن · المستندات", href: "/platform/bill-of-lading" },
      { at: 0.47, kind: "card", title: "بوليصة فرعية · HBL-26000412", tools: ["create_bill_of_lading"], rows: [["المرسل إليه", "Gulf Horizon FZE"], ["البوليصة الرئيسية", "MSCJED4471"]], confirm: "تأكيد وإصدار", confirmedAt: 0.49 },
      { at: 0.505, kind: "doc", name: "البوليصة الفرعية.pdf", meta: "جاهزة للتوقيع" },
      { at: 0.545, kind: "status", text: "غادرت · 15 نوفمبر" },
      { at: 0.56, kind: "module", module: "التتبّع", href: "/platform/tracking" },
      { at: 0.58, kind: "assistant", text: "عميلك يتابعها بنفسه، برقم الحجز أو الحاوية، دون تسجيل دخول." },
      { at: 0.62, kind: "status", text: "قيد النقل · الوصول 22 نوفمبر" },
      { at: 0.64, kind: "module", module: "الفواتير · المالية", href: "/platform/invoicing" },
      { at: 0.645, kind: "user", text: "أصدر الفاتورة." },
      { at: 0.66, kind: "card", title: "فاتورة ضريبية · INV-26-0412", tools: ["create_invoice_from_charges"], rows: [["شحن بحري 40HC", "USD 4,200"], ["رسوم محلية", "SAR 2,500"]], big: "SAR 18,250.00", confirm: "تأكيد وإصدار", confirmedAt: 0.68 },
      { at: 0.7, kind: "doc", name: "فاتورة ضريبية.pdf", meta: "SAR 18,250.00 · USD 4,866.67" },
      { at: 0.755, kind: "status", text: "وصلت · جبل علي" },
      { at: 0.77, kind: "card", title: "دفعة من بريد المالية", tools: ["list_payment_suggestions"], rows: [["المبلغ", "SAR 18,250.00"], ["تطابق", "INV-26-0412"]], confirm: "تأكيد المطابقة", confirmedAt: 0.8 },
      { at: 0.84, kind: "status", text: "حالة التلكس · أُفرج عن البضاعة" },
      { at: 0.9, kind: "module", module: "المحاسبة", href: "/platform/accounting" },
      { at: 0.905, kind: "user", text: "أغلق الشحنة." },
      { at: 0.925, kind: "card", title: "الحجز في الدفاتر", tools: ["update_job", "run_report"], rows: [["الإيراد", "SAR 18,250"], ["التكلفة", "SAR 14,010"]], big: "الربح SAR 4,240 · 23.2%" },
      { at: 0.965, kind: "assistant", text: "أُغلقت الشحنة، ولم يُعد أحد كتابة رقم واحد في الطريق." },
    ],
  },
};

/** The booking's status at a point of the story, in step with the chat. */
const statusAt = (p: number) => {
  if (p < 0.13) return 0;
  if (p < 0.165) return 1;
  if (p < 0.23) return 2;
  if (p < 0.45) return 3;
  if (p < 0.545) return 4;
  if (p < 0.62) return 5;
  if (p < 0.755) return 6;
  if (p < 0.84) return 7;
  if (p < 0.925) return 8;
  return 9;
};

/** A little before an assistant turn, the typing dots show. */
const TYPING_LEAD = 0.012;

export function Odyssey() {
  const locale = useLocale();
  const t = copy[locale];
  const root = useRef<HTMLElement>(null);

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
      const truck2 = q<SVGGElement>("[data-truck2]");
      const trolley2 = q<SVGRectElement>("[data-trolley2]");
      const cable2 = q<SVGLineElement>("[data-cable2]");
      const spreader2 = q<SVGRectElement>("[data-spreader2]");
      const waves = Array.from(el.querySelectorAll<SVGPathElement>("[data-wave]"));
      const msgs = Array.from(el.querySelectorAll<HTMLElement>("[data-at]"));
      const confirms = Array.from(el.querySelectorAll<HTMLElement>("[data-confirm-at]"));
      const typing = q<HTMLElement>("[data-dots]");
      const feed = q<HTMLElement>("[data-feed]");
      const list = q<HTMLElement>("[data-list]");
      const statusEl = q<HTMLElement>("[data-status]");
      const rail = Array.from(el.querySelectorAll<HTMLElement>("[data-rail]"));
      const progressEl = q<HTMLElement>("[data-progress]");
      const hint = q<HTMLElement>("[data-hint]");
      if (!svg || !cam || !feed || !list) return;

      const mm = gsap.matchMedia();

      mm.add(REDUCED, () => {
        el.setAttribute("data-mode", "static");
      });

      mm.add(MOTION_OK, () => {
        el.setAttribute("data-mode", "scroll");
        const s = {
          p: 0,
          z: 0.95,
          fx: 1000,
          fy: 520,
          truckX: -420,
          heroX: -408,
          heroY: QUAY_Y - 12 - BOX.h,
          trolleyX: 1008,
          drop: 24,
          shipDx: 0,
          follow: 0,
          dusk: 0,
          truck2X: 4400,
          trolley2X: DEST_CRANE_X - 360,
          drop2: 24,
        };
        let lastStatus = -1;
        let lastShown = -1;

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
          // The destination crane and truck
          truck2.setAttribute("transform", `translate(${s.truck2X} ${QUAY_Y})`);
          trolley2.setAttribute("x", String(s.trolley2X - 20));
          cable2.setAttribute("x1", String(s.trolley2X));
          cable2.setAttribute("x2", String(s.trolley2X));
          cable2.setAttribute("y2", String(top0 + s.drop2));
          spreader2.setAttribute("x", String(s.trolley2X - 32));
          spreader2.setAttribute("y", String(top0 + s.drop2));
          progressEl.style.transform = `scaleX(${s.p})`;
          hint.style.opacity = String(gsap.utils.clamp(0, 1, 1 - s.p / 0.04));

          // The booking's status in the chat header.
          const st = statusAt(s.p);
          if (st !== lastStatus) {
            lastStatus = st;
            statusEl.textContent = t.statuses[st];
            rail.forEach((r, i) => r.classList.toggle("is-on", i <= st));
          }

          // The transcript: messages up to this point are in, the typing dots
          // show just before an assistant turn, and the feed keeps the latest
          // message in view.
          let shown = -1;
          let typingOn = false;
          msgs.forEach((m, i) => {
            const at = Number(m.dataset.at);
            if (s.p >= at) shown = i;
            else if (!typingOn && m.dataset.typing === "1" && s.p >= at - TYPING_LEAD) typingOn = true;
          });
          if (shown !== lastShown) {
            msgs.forEach((m, i) => m.classList.toggle("is-in", i <= shown));
            lastShown = shown;
          }
          typing.classList.toggle("is-in", typingOn);
          confirms.forEach((c) => c.classList.toggle("is-done", s.p >= Number(c.dataset.confirmAt)));
          const tail = typingOn ? typing : shown >= 0 ? msgs[shown] : null;
          const bottom = tail ? tail.offsetTop + tail.offsetHeight : 0;
          list.style.transform = `translateY(${-Math.max(0, bottom - feed.clientHeight)}px)`;
        };

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: el, start: "top top", end: "+=900%", scrub: 0.6, pin: true, anticipatePin: 1, invalidateOnRefresh: true },
          onUpdate: draw,
        });
        const LIFT = BOOM_Y + TROLLEY_H + 46;
        const ON_TRUCK = QUAY_Y - 12 - BOX.h;
        const dropTo = (y: number) => y - 6 - (BOOM_Y + TROLLEY_H);
        tl.to(s, { p: 1, duration: 1 }, 0);
        // 0. The quotation is made while the port waits; the camera drifts in.
        tl.to(s, { z: 1.02, fx: 940, fy: 500, duration: 0.1, ease: "power1.inOut" }, 0);
        // 1. The truck brings the container to the quay (Gate In).
        tl.to(s, { truckX: TRUCK_X, heroX: TRUCK_X + 12, duration: 0.07, ease: "power2.out" }, 0.08);
        tl.to(s, { z: 1.45, fx: TRUCK_X + 60, fy: QUAY_Y - 60, duration: 0.09, ease: "power2.inOut" }, 0.1);
        // 2. The crane: trolley over, spreader down, lift, carry, lower into the slot.
        tl.to(s, { trolleyX: TRUCK_X + 12 + BOX.w / 2, duration: 0.04, ease: "power2.inOut" }, 0.18);
        tl.to(s, { drop: dropTo(ON_TRUCK), duration: 0.04, ease: "power2.inOut" }, 0.22);
        tl.to(s, { drop: 40, heroY: LIFT, duration: 0.05, ease: "power2.inOut" }, 0.26);
        tl.to(s, { truckX: -420, duration: 0.07, ease: "power2.in" }, 0.29);
        tl.to(s, { trolleyX: SLOT_X + BOX.w / 2, heroX: SLOT_X, fx: 620, fy: BOOM_Y + 90, duration: 0.08, ease: "power2.inOut" }, 0.31);
        tl.to(s, { drop: dropTo(SLOT_Y), heroY: SLOT_Y, duration: 0.05, ease: "power2.inOut" }, 0.39);
        tl.to(s, { drop: 24, duration: 0.03, ease: "power2.inOut" }, 0.44);
        // 3. Pull back to the loaded ship.
        tl.to(s, { z: 0.95, fx: 1000, fy: 520, duration: 0.08, ease: "power2.inOut" }, 0.44);
        // 4. The ship leaves; the camera travels with it across open water.
        tl.to(s, { shipDx: SAIL, heroX: `+=${SAIL}`, duration: 0.22, ease: "power1.inOut" }, 0.52);
        tl.to(s, { z: 0.85, fx: SHIP_X + 380, fy: 500, follow: 1, duration: 0.08, ease: "power2.inOut" }, 0.52);
        tl.to(s, { z: 0.78, fy: 480, duration: 0.12, ease: "none" }, 0.6);
        // 5. Docked: the camera closes in on the destination crane.
        tl.to(s, { z: 1.3, fx: DEST_CRANE_X - 300 - SAIL, fy: QUAY_Y - 80, duration: 0.06, ease: "power2.inOut" }, 0.74);
        // 6. Unloading: trolley over, spreader down, lift, the truck arrives, carry, lower, drive away.
        tl.to(s, { trolley2X: DEST_SLOT_X + BOX.w / 2, duration: 0.04, ease: "power2.inOut" }, 0.78);
        tl.to(s, { drop2: dropTo(SLOT_Y), duration: 0.04, ease: "power2.inOut" }, 0.82);
        tl.to(s, { drop2: 40, heroY: LIFT, duration: 0.04, ease: "power2.inOut" }, 0.86);
        tl.to(s, { truck2X: DEST_TRUCK_X, duration: 0.06, ease: "power2.out" }, 0.86);
        tl.to(s, { trolley2X: DEST_TRUCK_X + 12 + BOX.w / 2, heroX: DEST_TRUCK_X + 12, fx: DEST_CRANE_X - 120 - SAIL, duration: 0.06, ease: "power2.inOut" }, 0.9);
        tl.to(s, { drop2: dropTo(ON_TRUCK), heroY: ON_TRUCK, duration: 0.03, ease: "power2.inOut" }, 0.955);
        tl.to(s, { drop2: 24, duration: 0.02, ease: "power2.inOut" }, 0.965);
        tl.to(s, { truck2X: 4400, heroX: 4412, duration: 0.03, ease: "power2.in" }, 0.97);
        tl.to(s, { z: 1.05, fx: DEST_CRANE_X - SAIL, dusk: 0.3, duration: 0.04, ease: "power2.inOut" }, 0.96);

        draw();
        const sea = gsap.to(waves, { x: -120, duration: 7, repeat: -1, ease: "none" });
        return () => sea.kill();
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [locale] },
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
                <ContainerBox key={i} x={DEST_X + 560 + i * 60} y={QUAY_Y - BOX.h} color={boxColor(i + 1)} opacity={0.85} />
              ))}
              {[0, 1].map((i) => (
                <ContainerBox key={`r${i}`} x={DEST_X + 620 + i * 60} y={QUAY_Y - 2 * BOX.h} color={boxColor(i + 4)} opacity={0.85} />
              ))}
              {/* The destination crane reaches back over the ship; its truck waits off-stage. */}
              <Truck data-truck2="" x={4400} y={QUAY_Y} />
              <Crane x={DEST_CRANE_X} y={QUAY_Y} reach={220} back={720} />
              <rect data-trolley2="" x={DEST_CRANE_X - 360 - 20} y={BOOM_Y} width={40} height={TROLLEY_H} rx={2} fill={paint.amber} />
              <line data-cable2="" x1={DEST_CRANE_X - 360} x2={DEST_CRANE_X - 360} y1={BOOM_Y + TROLLEY_H} y2={BOOM_Y + TROLLEY_H + 24} stroke={paint.fog} strokeWidth="2" />
              <rect data-spreader2="" x={DEST_CRANE_X - 360 - 32} y={BOOM_Y + TROLLEY_H + 24} width={64} height={6} rx={1} fill={paint.amber} />
            </g>

            {/* ── Dusk at the end ── */}
            <rect data-dusk="" x={-800} y={-800} width={6000} height={2600} fill={ink.bg} style={{ opacity: 0 }} />
          </g>
        </svg>

        {/* The heading, in the sky */}
        <div className="odyssey-heading pointer-events-none absolute start-5 top-20 z-10 max-w-md sm:start-8 sm:top-24 lg:start-10">
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-spark-300 sm:text-[12.5px]">{t.eyebrow}</p>
          <h2 className="font-display mt-2 text-balance text-2xl font-bold leading-[1.1] text-white sm:text-3xl lg:text-[2.4rem]">{t.title}</h2>
          <p className="odyssey-lead mt-3 max-w-sm text-pretty text-[14px] leading-relaxed text-white/65 sm:text-[15px]">{t.lead}</p>
        </div>

        {/* Scroll hint and progress */}
        <p data-hint="" className="odyssey-hint pointer-events-none absolute bottom-6 start-1/2 z-10 -translate-x-1/2 text-[12px] font-medium text-white/50 rtl:translate-x-1/2">
          {t.scroll} ↓
        </p>
        <div className="odyssey-progress absolute inset-x-0 bottom-0 z-10 h-[3px] bg-white/10" aria-hidden>
          <span data-progress="" className="block h-full origin-[left_center] bg-spark-400 rtl:origin-[right_center]" style={{ transform: "scaleX(0)" }} />
        </div>
      </div>

      {/* The assistant's window: the same shipment, done in the system */}
      <div className="odyssey-panel z-10 flex flex-col">
        <div className="odyssey-chat flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl bg-white text-ink-900 shadow-float ring-1 ring-black/5">
          {/* Window bar: the assistant, and the booking it is working on */}
          <div className="shrink-0 border-b border-fog-200 bg-[linear-gradient(180deg,var(--color-fog-50),white)] px-4 pb-3 pt-3.5 sm:px-5">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-spark-400 text-ink-950">
                <Sparkles className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] font-semibold">{t.header}</p>
                <p className="truncate text-[10.5px] text-fog-500">{t.sub}</p>
              </div>
              <span className="flex items-center gap-1 text-fog-400" aria-hidden>
                <RotateCcw className="h-3.5 w-3.5" />
                <X className="ms-1.5 h-4 w-4" />
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-ink-900 px-3 py-2 text-white ring-1 ring-ink-800">
              <div className="min-w-0">
                <p className="text-[10px] font-medium text-white/45">{t.booking}</p>
                <p dir="ltr" className="font-mono text-[12.5px] font-semibold rtl:text-end">NXS26000412</p>
              </div>
              <div className="min-w-0 text-end">
                <p data-status="" className="truncate text-[12px] font-semibold text-spark-300">{t.statuses[4]}</p>
                <div className="mt-1.5 flex justify-end gap-[3px]" aria-hidden>
                  {t.statuses.map((st, i) => (
                    <span key={st} data-rail="" className={cn("odyssey-rail h-1 w-3 rounded-full bg-white/10 sm:w-3.5", i <= 4 && "is-on")} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* The transcript */}
          <div data-feed="" className="odyssey-feed relative min-h-0 flex-1 overflow-hidden px-4 sm:px-5">
            <div data-list="" className="odyssey-list space-y-3 py-4">
              {t.items.map((it, i) => (
                <Message key={i} item={it} t={t} />
              ))}
              <div data-dots="" className="ody-msg flex justify-start">
                <span className="odyssey-typing inline-flex items-center gap-1 rounded-2xl rounded-ss-sm bg-fog-100 px-3 py-2.5" aria-hidden>
                  <i className="block h-1.5 w-1.5 rounded-full bg-fog-500" />
                  <i className="block h-1.5 w-1.5 rounded-full bg-fog-500" />
                  <i className="block h-1.5 w-1.5 rounded-full bg-fog-500" />
                </span>
              </div>
            </div>
          </div>

          {/* Composer */}
          <div className="shrink-0 border-t border-fog-200 px-3 py-3 sm:px-4">
            <div className="flex items-center gap-2 rounded-full bg-fog-50 py-1.5 pe-1.5 ps-3 text-[12px] text-fog-500 ring-1 ring-fog-200">
              <Paperclip className="h-3.5 w-3.5 shrink-0" />
              <span className="flex-1 truncate">{t.input}</span>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-spark-500 text-white">
                <ArrowUp className="h-3.5 w-3.5" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** One turn of the transcript. `data-at` is the progress it appears at; `data-typing` asks for the dots before it. */
function Message({ item, t }: { item: Item; t: Copy }) {
  const wrap = (cls: string, children: ReactNode, typing = false) => (
    <div data-at={item.at} data-typing={typing ? "1" : undefined} className={cn("ody-msg", cls)}>
      {children}
    </div>
  );

  switch (item.kind) {
    case "module":
      return wrap(
        "flex items-center gap-2.5 pt-1.5",
        <>
          <span className="h-px flex-1 bg-fog-200" />
          <Link href={item.href} className="group inline-flex items-center gap-1.5 rounded-full bg-spark-50 px-2.5 py-1 text-[11px] font-semibold text-spark-600 ring-1 ring-spark-200 hover:bg-spark-100" title={t.more}>
            {item.module}
            <ArrowRight className="h-3 w-3 transition-transform ltr:group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
            <span className="sr-only">{t.more}</span>
          </Link>
          <span className="h-px flex-1 bg-fog-200" />
        </>,
      );
    case "user":
      return wrap(
        "flex justify-end",
        <div className="max-w-[86%] rounded-2xl rounded-se-sm bg-[linear-gradient(135deg,var(--color-spark-500),var(--color-spark-700))] px-3.5 py-2.5 text-white shadow-card">
          <p className="text-[13.5px] font-medium leading-relaxed">{item.text}</p>
          {item.file ? (
            <p className="mt-2 inline-flex max-w-full items-center gap-1.5 break-all rounded-md bg-white/15 px-2 py-1 text-[10.5px]">
              <Paperclip className="h-3 w-3 shrink-0" />
              {item.file}
            </p>
          ) : null}
        </div>,
      );
    case "assistant":
      return wrap(
        "flex justify-start",
        <div className="max-w-[90%] rounded-2xl rounded-ss-sm bg-fog-100 px-3.5 py-2.5">
          <p className="text-[13.5px] leading-relaxed text-ink-900">{item.text}</p>
        </div>,
        true,
      );
    case "card":
      return wrap(
        "",
        <div className={cn("rounded-2xl rounded-ss-sm p-3.5 shadow-card ring-1", item.confirm ? "bg-white ring-spark-300" : "bg-spark-50 ring-spark-200")}>
          <p className="flex items-center gap-1.5 text-[13px] font-semibold">
            <Sparkles className={cn("h-3.5 w-3.5", item.confirm ? "text-spark-500" : "text-spark-600")} />
            {item.title}
          </p>
          <p className="mt-2 flex flex-wrap gap-1.5" aria-label="tools">
            {item.tools.map((tool) => (
              <span key={tool} dir="ltr" className="inline-flex items-center gap-1 rounded-md bg-spark-50 px-1.5 py-0.5 font-mono text-[10px] text-spark-700 ring-1 ring-spark-100">
                <Check className="h-2.5 w-2.5" strokeWidth={3} />
                {tool}
              </span>
            ))}
          </p>
          <ul className="mt-2.5 space-y-1">
            {item.rows.map(([k, v]) => (
              <li key={k} className="flex justify-between gap-3 text-[12px]">
                <span className="text-fog-500">{k}</span>
                <span dir="auto" className="font-mono text-ink-900">{v}</span>
              </li>
            ))}
          </ul>
          {item.big ? (
            <p dir="auto" className="font-display mt-2.5 border-t border-fog-200 pt-2.5 text-[17px] font-bold text-spark-600">{item.big}</p>
          ) : null}
          {item.confirm ? (
            <div data-confirm-at={item.confirmedAt} className="odyssey-confirm mt-3 flex items-center gap-2">
              <span className="odyssey-confirm-pending rounded-full bg-spark-500 px-3.5 py-1.5 text-[11.5px] font-semibold text-white shadow-card">{item.confirm}</span>
              <span className="odyssey-confirm-done inline-flex items-center gap-1 rounded-full bg-spark-50 px-3 py-1.5 text-[11.5px] font-semibold text-spark-700 ring-1 ring-spark-200">
                <Check className="h-3 w-3" strokeWidth={3} />
                {t.confirmed}
              </span>
            </div>
          ) : null}
        </div>,
        true,
      );
    case "doc":
      return wrap(
        "ody-doc flex justify-start",
        <div className="flex max-w-[90%] items-center gap-2.5 rounded-xl bg-ink-900 px-3 py-2.5 text-white shadow-float ring-1 ring-ink-800">
          <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-ink-900">
            <FileText className="h-4.5 w-4.5" />
            <span className="absolute -end-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-spark-400 text-ink-950 ring-2 ring-ink-900">
              <Check className="h-2.5 w-2.5" strokeWidth={3} />
            </span>
          </span>
          <div className="min-w-0">
            <p dir="auto" className="truncate text-[12.5px] font-semibold">{item.name}</p>
            <p dir="auto" className="truncate text-[10.5px] text-white/55">{item.meta}</p>
          </div>
        </div>,
      );
    case "status":
      return wrap(
        "flex justify-center",
        <span dir="auto" className="inline-flex max-w-full items-center gap-2 rounded-full bg-fog-100 py-1 pe-3 ps-2 text-[11.5px] font-semibold text-spark-700">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-spark-500 shadow-[0_0_0_3px_rgb(247_148_29_/_0.25)]" />
          <span className="truncate">{item.text}</span>
        </span>,
      );
  }
}
