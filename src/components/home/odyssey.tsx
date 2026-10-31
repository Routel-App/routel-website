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
 * "From the berth to the shelf": the home page's scroll story. One ship
 * calls at Jeddah and one orange container (MSCU 442118-0) goes from its
 * deck to a client's shelf. On the stage the ship comes alongside, the crane
 * discharges the container to the yard, the gate opens, a truck takes it to
 * the warehouse, its cartons go onto the racks, and the ship sails. Beside
 * it, the ROUTEL Assistant's chat shows each desk's work in turn: the
 * shipping agency, the NVOCC, the customs broker, the forwarder, the
 * trucker, the warehouse, 3PL inventory, and the port call settled.
 * Modules still being built carry an "in development" mark; tools are named
 * only where the assistant really has them.
 *
 * One SVG world under a camera group; a scrubbed GSAP timeline tweens a
 * state object and draw() writes it to the DOM each frame (no React
 * re-render per frame). Chat messages are HTML revealed by the same
 * progress; the transcript scrolls itself so the latest message is in
 * view. Without JS or with prefers-reduced-motion the section is a still
 * (ship alongside) with the whole transcript under it.
 */

const W = 1600;
const H = 900;
const QUAY_Y = 620;
const BOOM_Y = QUAY_Y - 190;
const TROLLEY_H = 14;
/** Sea to the left of the quay edge, the port to its right. */
const QUAY_X = 1200;
const SHIP_X = 400;
const SHIP_LEN = 760;
/** How far out the ship starts, and where it goes when it leaves. */
const SEA_RUN = 1900;
const HERO_SLOT = { col: 4, row: 3 };
const SLOT_X = SHIP_X + 40 + HERO_SLOT.col * 60;
const SLOT_Y = QUAY_Y - (HERO_SLOT.row + 1) * BOX.h;
const CRANE_X = QUAY_X + 100;
/** The crane's trolley at rest, over the quay. */
const TROLLEY_REST = CRANE_X + 60;
/** The yard spot the container is set down on, and the truck lane beside it. */
const YARD_X = QUAY_X + 160;
const TRUCK_STOP = YARD_X + 70;
const TRUCK_PARK = 2500;
/** Customs house, the gate, the warehouse and its dock. */
const CUSTOMS_X = 1800;
const GATE_X = 2200;
const WH_X = 3150;
const WH_W = 760;
const DOCK_X = WH_X - 190;
const ON_GROUND = QUAY_Y - BOX.h;
const ON_TRUCK = QUAY_Y - 12 - BOX.h;
/** The rack slots the cartons go to: level (0 is the floor) and bay. */
const CARTONS = [
  { level: 0, bay: 3 },
  { level: 0, bay: 4 },
  { level: 1, bay: 3 },
  { level: 1, bay: 4 },
  { level: 2, bay: 3 },
  { level: 2, bay: 4 },
];
const RACK_X0 = WH_X + 120;
const BAY_W = 100;
const LEVEL_H = 86;
const cartonHome = (c: (typeof CARTONS)[number]) => ({ x: RACK_X0 + c.bay * BAY_W + 26, y: QUAY_Y - 8 - c.level * LEVEL_H - 34 });

type Item =
  | { at: number; kind: "module"; module: string; href: string; soon?: boolean }
  | { at: number; kind: "user"; text: string; file?: string }
  | { at: number; kind: "assistant"; text: string }
  | { at: number; kind: "card"; title: string; tools?: string[]; rows: Array<[string, string]>; big?: string; confirm?: string; confirmedAt?: number }
  | { at: number; kind: "doc"; name: string; meta: string }
  | { at: number; kind: "status"; text: string };

type Copy = {
  eyebrow: string;
  title: string;
  lead: string;
  scroll: string;
  container: string;
  stages: string[];
  header: string;
  sub: string;
  input: string;
  more: string;
  soon: string;
  confirmed: string;
  items: Item[];
};

/**
 * The transcript, timed to the stage (`at` is the scroll progress). Each
 * desk takes over when the container reaches it: the agency as the ship
 * comes in, the NVOCC at discharge, customs in the yard, the forwarder at
 * the gate, the trucker on the road, the warehouse at the dock, 3PL on the
 * racks, and the agency again when the ship leaves.
 */
const copy: Record<Locale, Copy> = {
  en: {
    eyebrow: "One vessel, every desk",
    title: "From the berth to the shelf",
    lead: "A ship calls at Jeddah. The agency, the NVOCC, the customs broker, the forwarder, the trucker and the warehouse each do their part, in one system and one chat.",
    scroll: "Scroll",
    container: "Container",
    stages: ["Port call", "Alongside", "Discharged", "Customs", "Released", "On the road", "In the warehouse", "On the shelf", "Settled"],
    header: "ROUTEL Assistant",
    sub: "Calls the system's tools · writes only after you confirm",
    input: "Ask in any language…",
    more: "See the solution",
    soon: "In development",
    confirmed: "Confirmed",
    items: [
      { at: 0, kind: "module", module: "Shipping agency", href: "/solutions/shipping-agency", soon: true },
      { at: 0.01, kind: "user", text: "Open the port call for MSC ISABELLA, voyage 412E, at Jeddah." },
      { at: 0.03, kind: "card", title: "Port call · Jeddah · 412E", rows: [["ETA", "21 Nov, 06:00"], ["Berth", "12"]], confirm: "Confirm", confirmedAt: 0.05 },
      { at: 0.065, kind: "doc", name: "PDA.pdf", meta: "Sent to the principal · USD 48,000" },
      { at: 0.1, kind: "status", text: "Alongside · berth 12" },
      { at: 0.115, kind: "user", text: "Read the import manifest.", file: "manifest.pdf" },
      { at: 0.135, kind: "card", title: "Import manifest · 412E", rows: [["B/Ls", "148"], ["Containers", "312"]], confirm: "Confirm", confirmedAt: 0.155 },
      { at: 0.2, kind: "module", module: "NVOCC", href: "/solutions/nvocc", soon: true },
      { at: 0.215, kind: "assistant", text: "MSCU 442118-0 is off the ship. It's on your B/L RTL-JED-26-0102, so the free time starts now." },
      { at: 0.27, kind: "card", title: "Demurrage & detention · MSCU 442118-0", rows: [["Free days", "4 · until 25 Nov"], ["Then", "USD 25 a day"]] },
      { at: 0.31, kind: "module", module: "Customs brokerage", href: "/solutions/customs-brokerage", soon: true },
      { at: 0.32, kind: "user", text: "Prepare the import declaration.", file: "commercial invoice.pdf" },
      { at: 0.34, kind: "card", title: "Import declaration · CD-26-0077", rows: [["Lines", "8"], ["HS codes", "8 suggested, with reasons"]], confirm: "Broker confirms", confirmedAt: 0.37 },
      { at: 0.395, kind: "module", module: "Arrival notice & delivery order", href: "/solutions/import-release" },
      { at: 0.405, kind: "doc", name: "Arrival Notice.pdf", meta: "E-mailed to Al Noor Trading · SAR 3,450.00 due" },
      { at: 0.43, kind: "card", title: "Payment from the finance mailbox", tools: ["list_payment_suggestions"], rows: [["Amount", "SAR 3,450.00"], ["Matches", "INV-26-0412"]], confirm: "Confirm match", confirmedAt: 0.45 },
      { at: 0.47, kind: "doc", name: "Delivery Order.pdf", meta: "Released and paid · valid until 28 Nov" },
      { at: 0.49, kind: "status", text: "Gate open · cargo released" },
      { at: 0.51, kind: "module", module: "Land transport", href: "/solutions/land-transport", soon: true },
      { at: 0.52, kind: "card", title: "Transport order · TO-26-0244", rows: [["From → To", "Berth 12 → Al Noor DC"], ["Truck", "4721"]] },
      { at: 0.64, kind: "doc", name: "Proof of delivery", meta: "Signed on the driver's phone · 10:42" },
      { at: 0.665, kind: "module", module: "Warehouse receipts & CFS", href: "/solutions/warehousing", soon: true },
      { at: 0.675, kind: "user", text: "Receive the container. Here's the packing list.", file: "packing list.pdf" },
      { at: 0.695, kind: "card", title: "Warehouse receipt · WR-26-0519", rows: [["Cartons", "12 · 1.84 CBM"], ["Scanned", "12 / 12"]], confirm: "Confirm", confirmedAt: 0.735 },
      { at: 0.775, kind: "module", module: "Inventory (3PL)", href: "/solutions/contract-logistics", soon: true },
      { at: 0.79, kind: "card", title: "AN-SKU-1042 · Al Noor", rows: [["Received", "+600 cartons"], ["On hand", "1,280"], ["Location", "B-03-2"]] },
      { at: 0.86, kind: "module", module: "Shipping agency · Finance", href: "/solutions/shipping-agency", soon: true },
      { at: 0.87, kind: "user", text: "The ship has sailed. Settle the port call." },
      { at: 0.89, kind: "card", title: "FDA · Jeddah · 412E", rows: [["PDA advance", "USD 48,000"], ["Actual costs", "USD 46,320"]], big: "Due to the principal USD 1,680", confirm: "Confirm & send", confirmedAt: 0.92 },
      { at: 0.95, kind: "assistant", text: "One ship, one container, seven desks. All of it on one system, and nobody typed it twice." },
    ],
  },
  ar: {
    eyebrow: "سفينة واحدة، كل المكاتب",
    title: "من الرصيف إلى الرف",
    lead: "سفينة ترسو في جدة. الوكالة والـ NVOCC والمخلّص الجمركي ووكيل الشحن والناقل البري والمستودع، كلٌّ يؤدي دوره، في نظام واحد ومحادثة واحدة.",
    scroll: "مرّر",
    container: "الحاوية",
    stages: ["زيارة السفينة", "على الرصيف", "تم التفريغ", "الجمارك", "أُفرج عنها", "على الطريق", "في المستودع", "على الرف", "تمت التسوية"],
    header: "مساعد ROUTEL",
    sub: "يستدعي أدوات النظام · ولا يحفظ شيئاً قبل تأكيدك",
    input: "اطلب بأي لغة…",
    more: "اعرف الحل",
    soon: "قيد التطوير",
    confirmed: "تم التأكيد",
    items: [
      { at: 0, kind: "module", module: "الوكالة الملاحية", href: "/solutions/shipping-agency", soon: true },
      { at: 0.01, kind: "user", text: "افتح زيارة السفينة MSC ISABELLA، الرحلة 412E، في جدة." },
      { at: 0.03, kind: "card", title: "زيارة سفينة · جدة · 412E", rows: [["الوصول المتوقع", "21 نوفمبر، 06:00"], ["الرصيف", "12"]], confirm: "تأكيد", confirmedAt: 0.05 },
      { at: 0.065, kind: "doc", name: "PDA.pdf", meta: "أُرسل إلى الخط الأصيل · USD 48,000" },
      { at: 0.1, kind: "status", text: "على الرصيف · رقم 12" },
      { at: 0.115, kind: "user", text: "اقرأ مانيفست الاستيراد.", file: "manifest.pdf" },
      { at: 0.135, kind: "card", title: "مانيفست استيراد · 412E", rows: [["البوالص", "148"], ["الحاويات", "312"]], confirm: "تأكيد", confirmedAt: 0.155 },
      { at: 0.2, kind: "module", module: "NVOCC", href: "/solutions/nvocc", soon: true },
      { at: 0.215, kind: "assistant", text: "نزلت MSCU 442118-0 من السفينة. هي على بوليصتك RTL-JED-26-0102، فبدأت أيام السماح الآن." },
      { at: 0.27, kind: "card", title: "أرضيات وتأخير · MSCU 442118-0", rows: [["أيام السماح", "4 · حتى 25 نوفمبر"], ["بعدها", "USD 25 يومياً"]] },
      { at: 0.31, kind: "module", module: "التخليص الجمركي", href: "/solutions/customs-brokerage", soon: true },
      { at: 0.32, kind: "user", text: "جهّز بيان الاستيراد.", file: "الفاتورة التجارية.pdf" },
      { at: 0.34, kind: "card", title: "بيان استيراد · CD-26-0077", rows: [["البنود", "8"], ["رموز HS", "8 مقترحة مع أسبابها"]], confirm: "يؤكد المخلّص", confirmedAt: 0.37 },
      { at: 0.395, kind: "module", module: "إشعار الوصول وأمر التسليم", href: "/solutions/import-release" },
      { at: 0.405, kind: "doc", name: "إشعار الوصول.pdf", meta: "أُرسل بالبريد إلى النور للتجارة · مستحق SAR 3,450.00" },
      { at: 0.43, kind: "card", title: "دفعة من بريد المالية", tools: ["list_payment_suggestions"], rows: [["المبلغ", "SAR 3,450.00"], ["تطابق", "INV-26-0412"]], confirm: "تأكيد المطابقة", confirmedAt: 0.45 },
      { at: 0.47, kind: "doc", name: "أمر التسليم.pdf", meta: "أُفرج عنها وسُددت · ساري حتى 28 نوفمبر" },
      { at: 0.49, kind: "status", text: "البوابة مفتوحة · أُفرج عن البضاعة" },
      { at: 0.51, kind: "module", module: "النقل البري", href: "/solutions/land-transport", soon: true },
      { at: 0.52, kind: "card", title: "أمر نقل · TO-26-0244", rows: [["من ← إلى", "الرصيف 12 ← مستودع النور"], ["الشاحنة", "4721"]] },
      { at: 0.64, kind: "doc", name: "إثبات التسليم", meta: "وُقّع على جوال السائق · 10:42" },
      { at: 0.665, kind: "module", module: "إيصالات المستودع ومحطة الحاويات", href: "/solutions/warehousing", soon: true },
      { at: 0.675, kind: "user", text: "استلم الحاوية. هذه قائمة التعبئة.", file: "قائمة التعبئة.pdf" },
      { at: 0.695, kind: "card", title: "إيصال مستودع · WR-26-0519", rows: [["الكراتين", "12 · 1.84 CBM"], ["الممسوح", "12 / 12"]], confirm: "تأكيد", confirmedAt: 0.735 },
      { at: 0.775, kind: "module", module: "المخزون لعملائك 3PL", href: "/solutions/contract-logistics", soon: true },
      { at: 0.79, kind: "card", title: "AN-SKU-1042 · النور", rows: [["المستلم", "+600 كرتون"], ["الرصيد", "1,280"], ["الموقع", "B-03-2"]] },
      { at: 0.86, kind: "module", module: "الوكالة الملاحية · المالية", href: "/solutions/shipping-agency", soon: true },
      { at: 0.87, kind: "user", text: "أبحرت السفينة. سوِّ حساب الزيارة." },
      { at: 0.89, kind: "card", title: "FDA · جدة · 412E", rows: [["دفعة PDA المقدمة", "USD 48,000"], ["المصاريف الفعلية", "USD 46,320"]], big: "مستحق للخط الأصيل USD 1,680", confirm: "تأكيد وإرسال", confirmedAt: 0.92 },
      { at: 0.95, kind: "assistant", text: "سفينة واحدة، وحاوية واحدة، وسبعة مكاتب. كلها على نظام واحد، ولم يكتب أحد شيئاً مرتين." },
    ],
  },
};

/** The container's stage at a point of the story, in step with the chat. */
const stageAt = (p: number) => {
  if (p < 0.1) return 0;
  if (p < 0.2) return 1;
  if (p < 0.31) return 2;
  if (p < 0.49) return 3;
  if (p < 0.58) return 4;
  if (p < 0.665) return 5;
  if (p < 0.775) return 6;
  if (p < 0.86) return 7;
  return 8;
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
      const gate = q<SVGGElement>("[data-gate]");
      const dusk = q<SVGRectElement>("[data-dusk]");
      const cartons = Array.from(el.querySelectorAll<SVGGElement>("[data-carton]"));
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
          z: 0.8,
          fx: SHIP_X + 420,
          fy: 470,
          shipDx: -SEA_RUN,
          follow: 1,
          heroX: SLOT_X - SEA_RUN,
          heroY: SLOT_Y,
          trolleyX: TROLLEY_REST,
          drop: 24,
          truckX: TRUCK_PARK,
          gate: 0,
          unload: 0,
          dusk: 0,
        };
        let lastStage = -1;
        let lastShown = -1;
        const dock = { x: DOCK_X + 12 + BOX.w / 2 - 14, y: ON_TRUCK + 4 };

        const draw = () => {
          // While the ship moves, the camera can ride with it.
          const fx = s.fx + s.follow * s.shipDx;
          cam.setAttribute("transform", `translate(${W / 2} ${H / 2}) scale(${s.z}) translate(${-fx} ${-s.fy})`);
          shipSide.setAttribute("transform", `translate(${SHIP_X + s.shipDx} ${QUAY_Y})`);
          hero.setAttribute("transform", `translate(${s.heroX} ${s.heroY})`);
          truck.setAttribute("transform", `translate(${s.truckX} ${QUAY_Y})`);
          const top0 = BOOM_Y + TROLLEY_H;
          trolley.setAttribute("x", String(s.trolleyX - 20));
          cable.setAttribute("x1", String(s.trolleyX));
          cable.setAttribute("x2", String(s.trolleyX));
          cable.setAttribute("y2", String(top0 + s.drop));
          spreader.setAttribute("x", String(s.trolleyX - 32));
          spreader.setAttribute("y", String(top0 + s.drop));
          gate.setAttribute("transform", `rotate(${-80 * s.gate})`);
          dusk.style.opacity = String(s.dusk);
          // The cartons leave the container one after another for their rack slot.
          cartons.forEach((c, i) => {
            const k = gsap.utils.clamp(0, 1, s.unload * CARTONS.length - i * 0.85);
            const home = cartonHome(CARTONS[i]);
            const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
            const x = dock.x + (home.x - dock.x) * e;
            const y = dock.y + (home.y - dock.y) * e - Math.sin(Math.PI * e) * 60;
            c.setAttribute("transform", `translate(${x} ${y})`);
            c.style.opacity = k > 0 ? "1" : "0";
          });
          progressEl.style.transform = `scaleX(${s.p})`;
          hint.style.opacity = String(gsap.utils.clamp(0, 1, 1 - s.p / 0.04));

          // The container's stage in the chat header.
          const st = stageAt(s.p);
          if (st !== lastStage) {
            lastStage = st;
            statusEl.textContent = t.stages[st];
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
        const dropTo = (y: number) => y - 6 - (BOOM_Y + TROLLEY_H);
        tl.to(s, { p: 1, duration: 1 }, 0);
        // 1. The agency: the ship comes in from the sea and berths; the camera rides with it.
        tl.to(s, { shipDx: 0, heroX: SLOT_X, duration: 0.1, ease: "power2.out" }, 0);
        tl.to(s, { z: 0.95, fx: 940, fy: 500, duration: 0.1, ease: "power1.inOut" }, 0.06);
        // 2. Alongside: close in on the crane over the ship.
        tl.to(s, { z: 1.15, fx: 980, fy: QUAY_Y - 150, follow: 0, duration: 0.06, ease: "power2.inOut" }, 0.1);
        // 3. Discharge: trolley over the slot, spreader down, lift, carry to the yard, set down.
        tl.to(s, { trolleyX: SLOT_X + BOX.w / 2, duration: 0.03, ease: "power2.inOut" }, 0.16);
        tl.to(s, { drop: dropTo(SLOT_Y), duration: 0.03, ease: "power2.inOut" }, 0.19);
        tl.to(s, { drop: 40, heroY: LIFT, duration: 0.03, ease: "power2.inOut" }, 0.22);
        tl.to(s, { trolleyX: YARD_X + BOX.w / 2, heroX: YARD_X, fx: YARD_X - 80, duration: 0.04, ease: "power2.inOut" }, 0.25);
        tl.to(s, { drop: dropTo(ON_GROUND), heroY: ON_GROUND, duration: 0.025, ease: "power2.inOut" }, 0.29);
        tl.to(s, { drop: 24, duration: 0.02, ease: "power2.inOut" }, 0.315);
        // 4. Customs: the camera moves across the yard to the customs house and the gate.
        tl.to(s, { z: 1.2, fx: CUSTOMS_X + 40, fy: QUAY_Y - 130, duration: 0.07, ease: "power2.inOut" }, 0.32);
        // 5. The forwarder: the release is recorded and paid, and the gate opens.
        tl.to(s, { fx: GATE_X - 40, duration: 0.07, ease: "power2.inOut" }, 0.41);
        tl.to(s, { gate: 1, duration: 0.025, ease: "power2.out" }, 0.47);
        // 6. The truck backs under the crane, which moves the container onto it.
        tl.to(s, { z: 1.05, fx: YARD_X + 160, fy: QUAY_Y - 140, duration: 0.03, ease: "power2.inOut" }, 0.5);
        tl.to(s, { truckX: TRUCK_STOP, duration: 0.025, ease: "power2.out" }, 0.5);
        tl.to(s, { trolleyX: YARD_X + BOX.w / 2, duration: 0.012, ease: "power2.inOut" }, 0.52);
        tl.to(s, { drop: dropTo(ON_GROUND), duration: 0.012, ease: "power2.inOut" }, 0.532);
        tl.to(s, { drop: 40, heroY: LIFT, duration: 0.012, ease: "power2.inOut" }, 0.544);
        tl.to(s, { trolleyX: TRUCK_STOP + 12 + BOX.w / 2, heroX: TRUCK_STOP + 12, duration: 0.012, ease: "power2.inOut" }, 0.556);
        tl.to(s, { drop: dropTo(ON_TRUCK), heroY: ON_TRUCK, duration: 0.01, ease: "power2.inOut" }, 0.568);
        tl.to(s, { drop: 24, duration: 0.008, ease: "power2.inOut" }, 0.578);
        // 7. On the road: through the gate to the warehouse dock; the camera follows.
        tl.to(s, { truckX: DOCK_X, heroX: DOCK_X + 12, fx: DOCK_X + 260, z: 0.9, duration: 0.08, ease: "power1.inOut" }, 0.585);
        // 8. The warehouse: the cartons go from the container to the racks.
        tl.to(s, { z: 1.12, fx: WH_X + 300, fy: QUAY_Y - 170, duration: 0.04, ease: "power2.inOut" }, 0.665);
        tl.to(s, { unload: 1, duration: 0.09, ease: "none" }, 0.69);
        // 9. 3PL: close in on the racks.
        tl.to(s, { z: 1.45, fx: RACK_X0 + 3.2 * BAY_W, fy: QUAY_Y - 185, duration: 0.05, ease: "power2.inOut" }, 0.78);
        // 10. Back at the berth: the ship sails, and the port call is settled.
        tl.to(s, { z: 0.85, fx: 1050, fy: 470, duration: 0.05, ease: "power2.inOut" }, 0.85);
        tl.to(s, { shipDx: -SEA_RUN * 0.7, duration: 0.11, ease: "power1.in" }, 0.88);
        tl.to(s, { dusk: 0.3, duration: 0.06 }, 0.93);

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
          <g data-cam="" transform={`translate(${W / 2} ${H / 2}) scale(0.44) translate(-2050 -470)`}>
            {/* ── The sea, to the quay edge ── */}
            <rect x={-2600} y={QUAY_Y + 46} width={QUAY_X + 2600} height={500} fill="url(#ody-sea)" opacity="0.95" />
            <g fill="none" stroke="rgb(124 214 199 / 0.3)" strokeWidth="2" strokeLinecap="round">
              {[QUAY_Y + 60, QUAY_Y + 84, QUAY_Y + 110].map((y, i) => (
                <path key={y} data-wave="" opacity={1 - i * 0.25} d={wavePath(-2600, y, 66, 60, 6 - i)} />
              ))}
            </g>

            {/* ── The port: quay, yard, customs house, gate, road, warehouse ── */}
            <rect x={QUAY_X} y={QUAY_Y} width={WH_X + WH_W + 1400 - QUAY_X} height={500} fill={ink.deep} />
            <rect x={QUAY_X} y={QUAY_Y} width={WH_X + WH_W + 1400 - QUAY_X} height={6} fill={ink.line} />
            {/* the road past the gate */}
            <path d={`M${GATE_X + 60} ${QUAY_Y + 30} H${WH_X + WH_W + 600}`} stroke={ink.line} strokeWidth="3" strokeDasharray="26 18" />

            {/* yard stacks */}
            {[0, 1].map((r) => (
              <ContainerBox key={`a${r}`} x={QUAY_X + 15} y={QUAY_Y - (r + 1) * BOX.h} color={boxColor(r + 2)} opacity={0.85} />
            ))}
            {[0, 1, 2].map((r) => (
              <ContainerBox key={`b${r}`} x={YARD_X + 270} y={QUAY_Y - (r + 1) * BOX.h} color={boxColor(r + 4)} opacity={0.85} />
            ))}
            {[0, 1].map((r) => (
              <ContainerBox key={`c${r}`} x={YARD_X + 330} y={QUAY_Y - (r + 1) * BOX.h} color={boxColor(r + 1)} opacity={0.85} />
            ))}

            {/* the customs house */}
            <g transform={`translate(${CUSTOMS_X} ${QUAY_Y})`}>
              <path d="M-10 -170 L100 -210 L210 -170 Z" fill={ink.line} />
              <rect x={-10} y={-170} width={220} height={10} fill={paint.fog} opacity="0.5" />
              {[8, 52, 96, 140, 184].map((x) => (
                <rect key={x} x={x} y={-160} width={16} height={150} fill={paint.fog} opacity="0.35" />
              ))}
              <rect x={-20} y={-10} width={240} height={10} fill={paint.fog} opacity="0.5" />
              <circle cx={100} cy={-186} r={9} fill={paint.hero} />
            </g>

            {/* the gate: a booth and its barrier, which lifts on release */}
            <g transform={`translate(${GATE_X} ${QUAY_Y})`}>
              <rect x={-46} y={-64} width={40} height={64} rx={3} fill={ink.steel} />
              <rect x={-40} y={-56} width={28} height={16} rx={2} fill={paint.fogLight} opacity="0.5" />
              <rect x={-4} y={-40} width={10} height={40} fill={ink.line} />
              <g transform="translate(1 -36)">
                <g data-gate="">
                  <rect x={0} y={-4} width={150} height={8} rx={4} fill={paint.hero} />
                  {[30, 70, 110].map((x) => (
                    <rect key={x} x={x} y={-4} width={14} height={8} fill={paint.white} />
                  ))}
                </g>
              </g>
            </g>

            {/* the warehouse, cut away to show its racks */}
            <g>
              <path d={`M${WH_X} ${QUAY_Y} V${QUAY_Y - 330} L${WH_X + WH_W / 2} ${QUAY_Y - 420} L${WH_X + WH_W} ${QUAY_Y - 330} V${QUAY_Y} Z`} fill={ink.hull} />
              <path d={`M${WH_X} ${QUAY_Y - 330} L${WH_X + WH_W / 2} ${QUAY_Y - 420} L${WH_X + WH_W} ${QUAY_Y - 330}`} fill="none" stroke={ink.line} strokeWidth="10" strokeLinejoin="round" />
              {/* the dock door */}
              <rect x={WH_X - 4} y={QUAY_Y - 120} width={14} height={120} fill={ink.bg} />
              {/* racks: three levels, five bays */}
              {[0, 1, 2, 3].map((lvl) => (
                <rect key={lvl} x={RACK_X0} y={QUAY_Y - 8 - lvl * LEVEL_H} width={5 * BAY_W} height={5} fill={paint.fog} opacity="0.55" />
              ))}
              {[0, 1, 2, 3, 4, 5].map((b) => (
                <rect key={b} x={RACK_X0 + b * BAY_W - 2} y={QUAY_Y - 8 - 3 * LEVEL_H} width={5} height={3 * LEVEL_H + 8} fill={paint.fog} opacity="0.55" />
              ))}
              {/* the stock already there */}
              {[0, 1, 2].map((lvl) =>
                [0, 1, 2].map((b) => (
                  <g key={`${lvl}-${b}`} opacity="0.85">
                    <rect x={RACK_X0 + b * BAY_W + 14} y={QUAY_Y - 8 - lvl * LEVEL_H - 40} width={34} height={40} rx={2} fill={boxColor(lvl + b * 2)} />
                    <rect x={RACK_X0 + b * BAY_W + 52} y={QUAY_Y - 8 - lvl * LEVEL_H - 30} width={34} height={30} rx={2} fill={boxColor(lvl * 2 + b + 1)} />
                  </g>
                )),
              )}
            </g>

            {/* ── The ship, the crane and the booking's container ── */}
            <ShipSide
              data-ship-side=""
              x={SHIP_X}
              y={QUAY_Y}
              length={SHIP_LEN}
              slots={Array.from({ length: 10 }, (_, col) => [0, 1, 2, 3].map((row) => ({ col, row }))).flat().filter((c) => !(c.col === HERO_SLOT.col && c.row === HERO_SLOT.row))}
            />
            <Truck data-truck="" x={TRUCK_PARK} y={QUAY_Y} />
            <g data-hero="" transform={`translate(${SLOT_X} ${SLOT_Y})`}>
              <ContainerBox x={0} y={0} hero />
            </g>
            <Crane x={CRANE_X} y={QUAY_Y} height={190} reach={260} back={780} />
            <rect data-trolley="" x={TROLLEY_REST - 20} y={BOOM_Y} width={40} height={TROLLEY_H} rx={2} fill={paint.amber} />
            <line data-cable="" x1={TROLLEY_REST} x2={TROLLEY_REST} y1={BOOM_Y + TROLLEY_H} y2={BOOM_Y + TROLLEY_H + 24} stroke={paint.fog} strokeWidth="2" />
            <rect data-spreader="" x={TROLLEY_REST - 32} y={BOOM_Y + TROLLEY_H + 24} width={64} height={6} rx={1} fill={paint.amber} />

            {/* the container's cartons, on their way to the racks (still: already shelved) */}
            {CARTONS.map((c, i) => {
              const home = cartonHome(c);
              return (
                <g key={i} data-carton="" transform={`translate(${home.x} ${home.y})`}>
                  <rect width={30} height={34} rx={2} fill={paint.hero} />
                  <rect x={12} width={6} height={14} fill={paint.heroDark} opacity="0.45" />
                </g>
              );
            })}

            {/* ── Dusk at the end ── */}
            <rect data-dusk="" x={-3000} y={-1200} width={9000} height={3200} fill={ink.bg} style={{ opacity: 0 }} />
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

      {/* The assistant's window: every desk's work on the same container */}
      <div className="odyssey-panel z-10 flex flex-col">
        <div className="odyssey-chat flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl bg-white text-ink-900 shadow-float ring-1 ring-black/5">
          {/* Window bar: the assistant, and the container it is following */}
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
                <p className="text-[10px] font-medium text-white/45">{t.container}</p>
                <p dir="ltr" className="font-mono text-[12.5px] font-semibold rtl:text-end">MSCU 442118-0</p>
              </div>
              <div className="min-w-0 text-end">
                <p data-status="" className="truncate text-[12px] font-semibold text-spark-300">{t.stages[1]}</p>
                <div className="mt-1.5 flex justify-end gap-[3px]" aria-hidden>
                  {t.stages.map((st, i) => (
                    <span key={st} data-rail="" className={cn("odyssey-rail h-1 w-3 rounded-full bg-white/10 sm:w-3.5", i <= 1 && "is-on")} />
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
          {item.soon ? <span className="rounded-full bg-fog-100 px-2 py-0.5 text-[10px] font-semibold text-fog-500">{t.soon}</span> : null}
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
          {item.tools?.length ? (
          <p className="mt-2 flex flex-wrap gap-1.5" aria-label="tools">
            {item.tools.map((tool) => (
              <span key={tool} dir="ltr" className="inline-flex items-center gap-1 rounded-md bg-spark-50 px-1.5 py-0.5 font-mono text-[10px] text-spark-700 ring-1 ring-spark-100">
                <Check className="h-2.5 w-2.5" strokeWidth={3} />
                {tool}
              </span>
            ))}
          </p>
          ) : null}
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
