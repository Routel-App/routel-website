"use client";

import { useRef, type ReactNode } from "react";
import {
  ArrowRight,
  ArrowUp,
  BarChart3,
  Bot,
  Check,
  FilePlus2,
  FileSearch,
  FileText,
  ListChecks,
  Paperclip,
  PenLine,
  Search,
  Sparkles,
} from "lucide-react";
import Link from "@/components/i18n/link";
import { useLocale } from "@/components/i18n/locale-provider";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { gsap, useGSAP, MOTION_OK, REDUCED } from "@/components/motion/gsap";
import { BOX, ContainerBox, Crane, Doc, ShipSide, Truck, boxColor, ink, paint, wavePath } from "@/components/motion/sprites";

/**
 * "One container, one booking": the home page's scroll story, told twice at
 * once. On the stage, one orange container (booking NXS26000412) arrives on
 * a truck, is lifted by the crane onto the ship, sails to the destination
 * quay, and the books rise at dusk. Beside it, the Routel Assistant's chat
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

type Step = { tool: string; label: string; detail: string };
type Item =
  | { at: number; kind: "module"; module: string; href: string }
  | { at: number; kind: "user"; text: string; file?: string }
  | { at: number; kind: "assistant"; text: string }
  | { at: number; kind: "tools"; steps: Step[] }
  | { at: number; kind: "card"; title: string; rows: Array<[string, string]>; confirm?: string; confirmedAt?: number }
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

const copy: Record<Locale, Copy> = {
  en: {
    eyebrow: "One container, one booking",
    title: "Follow a container through Routel",
    lead: "The ship on the left, the system on the right: every stage of the shipment is done in the assistant's chat, and all of it lands on one record.",
    scroll: "Scroll",
    booking: "Booking",
    statuses: ["Booking Pending", "Booking Confirmed", "Gate In", "SI Submitted", "Vessel Loaded", "Departed", "In Transit", "Arrived", "Telex Status", "Shipment Closed"],
    header: "Routel Assistant",
    sub: "Calls the system's tools · writes only after you confirm",
    input: "Ask in English or Arabic…",
    more: "See the module",
    confirmed: "Confirmed",
    items: [
      { at: 0, kind: "module", module: "Quotations & Bookings", href: "/platform/quotations" },
      { at: 0.004, kind: "user", text: "Quote Straits Electronics for 1 × 40HC, Port Klang to Jebel Ali, shipping next week." },
      {
        at: 0.02,
        kind: "tools",
        steps: [
          { tool: "search_route_rates", label: "Searched route rates", detail: "Port Klang → Jebel Ali · 40HC · MSC · buying USD 1,900 · valid to 30 Nov" },
          { tool: "create_quotation", label: "Prepared the quotation", detail: "Q-26-0412 · Straits Electronics Sdn Bhd" },
        ],
      },
      { at: 0.035, kind: "card", title: "Proposed quotation · Q-26-0412", rows: [["Ocean freight 1 × 40HC", "USD 2,400.00"], ["Local charges & documentation", "MYR 1,770.00"], ["Validity", "14 days"]], confirm: "Confirm & send", confirmedAt: 0.05 },
      { at: 0.06, kind: "assistant", text: "Sent to Straits Electronics. I'll tell you when they accept." },
      { at: 0.075, kind: "status", text: "Customer accepted quotation Q-26-0412" },
      { at: 0.085, kind: "user", text: "Turn it into a booking." },
      { at: 0.095, kind: "tools", steps: [{ tool: "convert_quotation", label: "Converted the quotation", detail: "Booking NXS26000412 · sale lines carried over" }] },
      { at: 0.105, kind: "assistant", text: "Booking NXS26000412 is created from the quotation, with the same charges. Status: Booking Pending until the carrier confirms." },
      { at: 0.12, kind: "module", module: "Carrier booking · AI", href: "/platform/ai-assistant" },
      { at: 0.125, kind: "user", text: "This is MSC's confirmation. Record its details on the booking.", file: "MSC booking confirmation.pdf" },
      {
        at: 0.14,
        kind: "tools",
        steps: [
          { tool: "read_uploaded_document", label: "Read the PDF", detail: "MSC ISABELLA · voyage 412E · cargo cut-off 14 Nov, 12:00" },
          { tool: "update_job", label: "Prepared the update", detail: "Booking NXS26000412" },
        ],
      },
      { at: 0.15, kind: "card", title: "Update booking · from the carrier's confirmation", rows: [["Carrier booking no.", "MSCUKL4471"], ["Vessel / voyage", "MSC ISABELLA · 412E"], ["Cargo cut-off", "14 Nov 2026, 12:00"], ["Status", "Booking Confirmed"]], confirm: "Confirm", confirmedAt: 0.165 },
      { at: 0.175, kind: "assistant", text: "Saved. The Booking Confirmation is issued and sent to your customer." },
      { at: 0.18, kind: "doc", name: "Booking Confirmation · NXS26000412.pdf", meta: "Sent to Straits Electronics" },
      { at: 0.2, kind: "module", module: "Bookings · statuses", href: "/platform/bookings" },
      { at: 0.205, kind: "status", text: "Gate In · MSCU 442118-0 · 14 Nov, 09:20" },
      { at: 0.3, kind: "status", text: "SI Submitted" },
      { at: 0.33, kind: "user", text: "Where is the booking now?" },
      { at: 0.345, kind: "assistant", text: "The container is in the terminal and the shipping instructions are submitted. It loads on MSC ISABELLA today and sails tomorrow." },
      { at: 0.5, kind: "module", module: "Bill of Lading · Documents", href: "/platform/bill-of-lading" },
      { at: 0.505, kind: "status", text: "Vessel Loaded" },
      { at: 0.515, kind: "user", text: "Issue the House B/L and record master B/L MSCUKL4471." },
      { at: 0.53, kind: "tools", steps: [{ tool: "create_bill_of_lading", label: "Prepared the House B/L", detail: "Shipper, consignee, container and goods from the booking" }] },
      { at: 0.545, kind: "card", title: "Proposed House B/L · HBL-26000412", rows: [["Shipper", "Straits Electronics Sdn Bhd"], ["Consignee", "Gulf Horizon FZE"], ["Container", "MSCU4421180 · 1 × 40HC"], ["Master B/L", "MSCUKL4471"]], confirm: "Confirm & issue", confirmedAt: 0.56 },
      { at: 0.575, kind: "doc", name: "House B/L · HBL-26000412.pdf", meta: "Ready to sign and send" },
      { at: 0.6, kind: "module", module: "Tracking", href: "/platform/tracking" },
      { at: 0.605, kind: "status", text: "Departed · MSC ISABELLA 412E · 15 Nov" },
      { at: 0.62, kind: "assistant", text: "She has sailed. Your customer can follow the shipment by booking, B/L or container number, with no login, and sees the status timeline only." },
      { at: 0.68, kind: "status", text: "In Transit · ETA Jebel Ali 22 Nov" },
      { at: 0.7, kind: "module", module: "Invoicing · Finance", href: "/platform/invoicing" },
      { at: 0.705, kind: "user", text: "What's the profit on this booking? And issue the invoice." },
      {
        at: 0.72,
        kind: "tools",
        steps: [
          { tool: "get_job_charges", label: "Read the booking's charges", detail: "Sale MYR 13,050.00 · cost MYR 10,035.00" },
          { tool: "create_invoice_from_charges", label: "Prepared the tax invoice", detail: "From the sale lines, in MYR and USD" },
        ],
      },
      { at: 0.735, kind: "card", title: "Proposed invoice · INV-26-0412", rows: [["Ocean freight 1 × 40HC", "USD 2,400.00"], ["Local charges & documentation", "MYR 1,770.00"], ["Tax · international freight", "0%"], ["Total", "MYR 13,050.00"]], confirm: "Confirm & issue", confirmedAt: 0.75 },
      { at: 0.765, kind: "assistant", text: "Tax invoice INV-26-0412 is issued in MYR and USD and sent. Expected profit on the booking: MYR 3,015.00 (23.1%)." },
      { at: 0.77, kind: "doc", name: "Tax Invoice · INV-26-0412.pdf", meta: "MYR 13,050.00 · USD 2,776.60" },
      { at: 0.86, kind: "module", module: "Receivables & Payables", href: "/platform/finance-receivables" },
      { at: 0.865, kind: "status", text: "Arrived · Jebel Ali · 22 Nov" },
      { at: 0.875, kind: "tools", steps: [{ tool: "list_payment_suggestions", label: "Matched a payment from the finance mailbox", detail: "Remittance of MYR 13,050.00 matches INV-26-0412" }] },
      { at: 0.885, kind: "card", title: "Match payment · INV-26-0412", rows: [["Amount", "MYR 13,050.00"], ["Source", "Remittance advice · finance mailbox"], ["Match", "Exact"]], confirm: "Confirm match", confirmedAt: 0.9 },
      { at: 0.915, kind: "status", text: "Telex Status · cargo released" },
      { at: 0.93, kind: "module", module: "Accounting", href: "/platform/accounting" },
      { at: 0.935, kind: "user", text: "Close the shipment." },
      {
        at: 0.95,
        kind: "tools",
        steps: [
          { tool: "update_job", label: "Updated the status", detail: "Shipment Closed" },
          { tool: "run_report", label: "Ran the P&L", detail: "November 2026" },
        ],
      },
      { at: 0.965, kind: "assistant", text: "Closed. The booking's profit is in November's P&L, the receivable is cleared, and nobody re-typed a number along the way." },
      { at: 0.975, kind: "card", title: "Booking NXS26000412 · in the books", rows: [["Revenue", "MYR 13,050.00"], ["Cost", "MYR 10,035.00"], ["Profit", "MYR 3,015.00 · 23.1%"]] },
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
    input: "اطلب بالعربي أو الإنجليزي…",
    more: "اعرف الوحدة",
    confirmed: "تم التأكيد",
    items: [
      { at: 0, kind: "module", module: "عروض الأسعار والحجوزات", href: "/platform/quotations" },
      { at: 0.004, kind: "user", text: "جهّز عرض سعر لشركة النور للتجارة: حاوية 40HC من جدة إلى جبل علي، الشحن الأسبوع القادم." },
      {
        at: 0.02,
        kind: "tools",
        steps: [
          { tool: "search_route_rates", label: "بحثت في أسعار المسارات", detail: "جدة ← جبل علي · 40HC · MSC · شراء USD 3,350 · ساري حتى 30 نوفمبر" },
          { tool: "create_quotation", label: "جهّزت عرض السعر", detail: "عرض السعر Q-26-0412 · شركة النور للتجارة" },
        ],
      },
      { at: 0.035, kind: "card", title: "عرض سعر مقترح · Q-26-0412", rows: [["شحن بحري 1 × 40HC", "USD 4,200.00"], ["رسوم محلية ومستندات", "SAR 2,500.00"], ["الصلاحية", "14 يوماً"]], confirm: "تأكيد وإرسال", confirmedAt: 0.05 },
      { at: 0.06, kind: "assistant", text: "أُرسل عرض السعر إلى شركة النور. سأخبرك حين يقبلونه." },
      { at: 0.075, kind: "status", text: "العميل قبل عرض السعر Q-26-0412" },
      { at: 0.085, kind: "user", text: "حوّله إلى حجز." },
      { at: 0.095, kind: "tools", steps: [{ tool: "convert_quotation", label: "حوّلت عرض السعر", detail: "الحجز NXS26000412 · بنود البيع منقولة" }] },
      { at: 0.105, kind: "assistant", text: "أنشأت الحجز NXS26000412 من عرض السعر بالبنود نفسها. الحالة: الحجز قيد الانتظار حتى يصل تأكيد الناقل." },
      { at: 0.12, kind: "module", module: "حجز الناقل · الذكاء الاصطناعي", href: "/platform/ai-assistant" },
      { at: 0.125, kind: "user", text: "هذا تأكيد MSC. سجّل بياناته على الحجز.", file: "تأكيد حجز MSC.pdf" },
      {
        at: 0.14,
        kind: "tools",
        steps: [
          { tool: "read_uploaded_document", label: "قرأت الملف", detail: "السفينة MSC ISABELLA · الرحلة 412E · إغلاق الحمولة 14 نوفمبر، 12:00" },
          { tool: "update_job", label: "جهّزت التحديث", detail: "الحجز NXS26000412" },
        ],
      },
      { at: 0.15, kind: "card", title: "تحديث الحجز · من تأكيد الناقل", rows: [["رقم حجز الناقل", "MSCJED4471"], ["السفينة / الرحلة", "MSC ISABELLA · 412E"], ["إغلاق الحمولة", "14 نوفمبر 2026، 12:00"], ["الحالة", "تم تأكيد الحجز"]], confirm: "تأكيد", confirmedAt: 0.165 },
      { at: 0.175, kind: "assistant", text: "حُفظت البيانات، وصدر «تأكيد الحجز» وأُرسل إلى عميلك." },
      { at: 0.18, kind: "doc", name: "تأكيد الحجز · NXS26000412.pdf", meta: "أُرسل إلى شركة النور للتجارة" },
      { at: 0.2, kind: "module", module: "الحجوزات · الحالات", href: "/platform/bookings" },
      { at: 0.205, kind: "status", text: "دخول البوابة · MSCU 442118-0 · 14 نوفمبر، 09:20" },
      { at: 0.3, kind: "status", text: "تم تقديم تعليمات الشحن" },
      { at: 0.33, kind: "user", text: "وين الحجز الآن؟" },
      { at: 0.345, kind: "assistant", text: "الحاوية داخل الميناء وتعليمات الشحن مقدَّمة. التحميل على MSC ISABELLA اليوم، والإبحار غداً." },
      { at: 0.5, kind: "module", module: "بوليصة الشحن · المستندات", href: "/platform/bill-of-lading" },
      { at: 0.505, kind: "status", text: "تم التحميل على السفينة" },
      { at: 0.515, kind: "user", text: "أصدر البوليصة الفرعية وسجّل رقم البوليصة الرئيسية MSCJED4471." },
      { at: 0.53, kind: "tools", steps: [{ tool: "create_bill_of_lading", label: "جهّزت البوليصة الفرعية", detail: "الشاحن والمرسل إليه والحاوية والبضاعة من بيانات الحجز" }] },
      { at: 0.545, kind: "card", title: "بوليصة فرعية مقترحة · HBL-26000412", rows: [["الشاحن", "شركة النور للتجارة"], ["المرسل إليه", "Gulf Horizon FZE"], ["الحاوية", "MSCU4421180 · 1 × 40HC"], ["البوليصة الرئيسية", "MSCJED4471"]], confirm: "تأكيد وإصدار", confirmedAt: 0.56 },
      { at: 0.575, kind: "doc", name: "البوليصة الفرعية · HBL-26000412.pdf", meta: "جاهزة للتوقيع والإرسال" },
      { at: 0.6, kind: "module", module: "التتبّع", href: "/platform/tracking" },
      { at: 0.605, kind: "status", text: "غادرت · MSC ISABELLA 412E · 15 نوفمبر" },
      { at: 0.62, kind: "assistant", text: "أبحرت السفينة. عميلك يتابع الشحنة بنفسه برقم الحجز أو البوليصة أو الحاوية، دون تسجيل دخول، ويرى تسلسل الحالة فقط." },
      { at: 0.68, kind: "status", text: "قيد النقل · الوصول المتوقع جبل علي 22 نوفمبر" },
      { at: 0.7, kind: "module", module: "الفواتير · المالية", href: "/platform/invoicing" },
      { at: 0.705, kind: "user", text: "كم الربح على هذا الحجز؟ وأصدر الفاتورة." },
      {
        at: 0.72,
        kind: "tools",
        steps: [
          { tool: "get_job_charges", label: "قرأت رسوم الحجز", detail: "البيع SAR 18,250.00 · التكلفة SAR 14,010.00" },
          { tool: "create_invoice_from_charges", label: "جهّزت الفاتورة الضريبية", detail: "من بنود البيع، بالريال والدولار" },
        ],
      },
      { at: 0.735, kind: "card", title: "فاتورة مقترحة · INV-26-0412", rows: [["شحن بحري 1 × 40HC", "USD 4,200.00"], ["رسوم محلية ومستندات", "SAR 2,500.00"], ["ضريبة القيمة المضافة · نقل دولي", "0%"], ["الإجمالي", "SAR 18,250.00"]], confirm: "تأكيد وإصدار", confirmedAt: 0.75 },
      { at: 0.765, kind: "assistant", text: "صدرت الفاتورة الضريبية INV-26-0412 بالريال والدولار وأُرسلت. الربح المتوقع على الحجز: SAR 4,240.00 (23.2%)." },
      { at: 0.77, kind: "doc", name: "فاتورة ضريبية · INV-26-0412.pdf", meta: "SAR 18,250.00 · USD 4,866.67" },
      { at: 0.86, kind: "module", module: "الذمم المدينة والدائنة", href: "/platform/finance-receivables" },
      { at: 0.865, kind: "status", text: "وصلت · جبل علي · 22 نوفمبر" },
      { at: 0.875, kind: "tools", steps: [{ tool: "list_payment_suggestions", label: "طابقت دفعة من بريد المالية", detail: "إشعار تحويل بقيمة SAR 18,250.00 يطابق INV-26-0412" }] },
      { at: 0.885, kind: "card", title: "مطابقة دفعة · INV-26-0412", rows: [["المبلغ", "SAR 18,250.00"], ["المصدر", "إشعار تحويل · بريد المالية"], ["المطابقة", "كاملة"]], confirm: "تأكيد المطابقة", confirmedAt: 0.9 },
      { at: 0.915, kind: "status", text: "حالة التلكس · أُفرج عن البضاعة" },
      { at: 0.93, kind: "module", module: "المحاسبة", href: "/platform/accounting" },
      { at: 0.935, kind: "user", text: "أغلق الشحنة." },
      {
        at: 0.95,
        kind: "tools",
        steps: [
          { tool: "update_job", label: "حدّثت الحالة", detail: "الشحنة مغلقة" },
          { tool: "run_report", label: "شغّلت قائمة الأرباح والخسائر", detail: "نوفمبر 2026" },
        ],
      },
      { at: 0.965, kind: "assistant", text: "أُغلقت الشحنة. ربح الحجز في قائمة الأرباح والخسائر لنوفمبر، والذمة مسدّدة، ولم يُعد أحد كتابة رقم واحد في الطريق." },
      { at: 0.975, kind: "card", title: "الحجز NXS26000412 · في الدفاتر", rows: [["الإيراد", "SAR 18,250.00"], ["التكلفة", "SAR 14,010.00"], ["الربح", "SAR 4,240.00 · 23.2%"]] },
    ],
  },
};

/** The booking's status at a point of the story, in step with the chat. */
const statusAt = (p: number) => {
  if (p < 0.165) return 0;
  if (p < 0.205) return 1;
  if (p < 0.3) return 2;
  if (p < 0.505) return 3;
  if (p < 0.605) return 4;
  if (p < 0.68) return 5;
  if (p < 0.865) return 6;
  if (p < 0.915) return 7;
  if (p < 0.95) return 8;
  return 9;
};

/** Which icon a tool call shows, by what the tool does. */
function toolIcon(tool: string) {
  if (tool.startsWith("search_")) return Search;
  if (tool.startsWith("read_")) return FileSearch;
  if (tool.startsWith("list_") || tool.startsWith("get_")) return ListChecks;
  if (tool.startsWith("update_")) return PenLine;
  if (tool.startsWith("run_")) return BarChart3;
  return FilePlus2;
}

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
      const bars = Array.from(el.querySelectorAll<SVGRectElement>("[data-bar]"));
      const hbl = q<SVGGElement>("[data-hbl]");
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
          books: 0,
          hblOut: 0,
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
          bars.forEach((b, i) => b.setAttribute("transform", `translate(0 ${(1 - s.books) * (60 + i * 14)}) scale(1 ${Math.max(0.001, s.books)})`));
          hbl.setAttribute("transform", `translate(${s.hblOut * 70} ${-s.hblOut * 40})`);
          hbl.style.opacity = String(Math.min(1, s.hblOut * 2));
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
          scrollTrigger: { trigger: el, start: "top top", end: "+=760%", scrub: 0.6, pin: true, anticipatePin: 1, invalidateOnRefresh: true },
          onUpdate: draw,
        });
        tl.to(s, { p: 1, duration: 1 }, 0);
        // 0. The quotation is made while the port waits; the camera drifts in.
        tl.to(s, { z: 1.02, fx: 940, fy: 500, duration: 0.12, ease: "power1.inOut" }, 0);
        // 1. The truck brings the container to the quay (Gate In).
        tl.to(s, { truckX: TRUCK_X, heroX: TRUCK_X + 12, duration: 0.08, ease: "power2.out" }, 0.1);
        tl.to(s, { z: 1.45, fx: TRUCK_X + 60, fy: QUAY_Y - 60, duration: 0.1, ease: "power2.inOut" }, 0.13);
        // 2. The crane: trolley over, spreader down, lift, carry, lower into the slot.
        tl.to(s, { trolleyX: TRUCK_X + 12 + BOX.w / 2, duration: 0.05, ease: "power2.inOut" }, 0.22);
        tl.to(s, { drop: QUAY_Y - 12 - BOX.h - 6 - (BOOM_Y + TROLLEY_H), duration: 0.05, ease: "power2.inOut" }, 0.26);
        tl.to(s, { drop: 40, heroY: BOOM_Y + TROLLEY_H + 46, duration: 0.06, ease: "power2.inOut" }, 0.31);
        tl.to(s, { truckX: -420, duration: 0.08, ease: "power2.in" }, 0.34);
        tl.to(s, { trolleyX: SLOT_X + BOX.w / 2, heroX: SLOT_X, fx: 620, fy: BOOM_Y + 90, duration: 0.09, ease: "power2.inOut" }, 0.37);
        tl.to(s, { drop: SLOT_Y - 6 - (BOOM_Y + TROLLEY_H), heroY: SLOT_Y, duration: 0.05, ease: "power2.inOut" }, 0.455);
        tl.to(s, { drop: 24, duration: 0.03, ease: "power2.inOut" }, 0.505);
        // 3. Pull back to the loaded ship; the B/L slides out of the container.
        tl.to(s, { z: 0.95, fx: 1000, fy: 520, duration: 0.08, ease: "power2.inOut" }, 0.5);
        tl.to(s, { hblOut: 1, duration: 0.04, ease: "power2.out" }, 0.545);
        // 4. The ship leaves; the camera starts to travel with it.
        tl.to(s, { shipDx: SAIL, heroX: `+=${SAIL}`, duration: 0.3, ease: "power1.inOut" }, 0.59);
        tl.to(s, { hblOut: 0, duration: 0.03 }, 0.59);
        tl.to(s, { z: 0.85, fx: SHIP_X + 380, fy: 500, follow: 1, duration: 0.1, ease: "power2.inOut" }, 0.59);
        // 5. At sea: open water, slowly zooming out.
        tl.to(s, { z: 0.78, fy: 480, duration: 0.2, ease: "none" }, 0.69);
        // 6. Arrived at the destination quay, then dusk and out to the books.
        tl.to(s, { z: 0.62, fy: 470, dusk: 0.75, duration: 0.12, ease: "power2.inOut" }, 0.88);
        tl.to(s, { books: 1, duration: 0.08, ease: "power2.out" }, 0.92);

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

        {/* The heading, in the sky */}
        <div className="odyssey-heading pointer-events-none absolute start-5 top-20 z-10 max-w-md sm:start-8 sm:top-24 lg:start-10">
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-teal-300 sm:text-[12.5px]">{t.eyebrow}</p>
          <h2 className="font-display mt-2 text-balance text-2xl font-bold leading-[1.1] text-white sm:text-3xl lg:text-[2.4rem]">{t.title}</h2>
          <p className="odyssey-lead mt-3 max-w-sm text-pretty text-[14px] leading-relaxed text-white/65 sm:text-[15px]">{t.lead}</p>
        </div>

        {/* Scroll hint and progress */}
        <p data-hint="" className="odyssey-hint pointer-events-none absolute bottom-6 start-1/2 z-10 -translate-x-1/2 text-[12px] font-medium text-white/50 rtl:translate-x-1/2">
          {t.scroll} ↓
        </p>
        <div className="odyssey-progress absolute inset-x-0 bottom-0 z-10 h-[3px] bg-white/10" aria-hidden>
          <span data-progress="" className="block h-full origin-[left_center] bg-teal-400 rtl:origin-[right_center]" style={{ transform: "scaleX(0)" }} />
        </div>
      </div>

      {/* The assistant's chat: the same shipment, done in the system */}
      <div className="odyssey-panel z-10 flex flex-col bg-ink-950">
        <div className="odyssey-chat flex min-h-0 flex-1 flex-col">
          {/* Header: the assistant, and the booking it is working on */}
          <div className="odyssey-chat-head shrink-0 border-b border-white/10 px-4 py-3 sm:px-5">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-spark-400/15 text-spark-400">
                <Bot className="h-4.5 w-4.5" />
              </span>
              <div className="min-w-0">
                <p className="text-[13px] font-semibold">{t.header}</p>
                <p className="truncate text-[10.5px] text-white/50">{t.sub}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-white/[0.04] px-3 py-2 ring-1 ring-white/10">
              <div className="min-w-0">
                <p className="text-[10px] font-medium text-white/45">{t.booking}</p>
                <p dir="ltr" className="font-mono text-[12.5px] font-semibold rtl:text-end">NXS26000412</p>
              </div>
              <div className="min-w-0 text-end">
                <p data-status="" className="truncate text-[12px] font-semibold text-teal-300">{t.statuses[4]}</p>
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
            <div data-list="" className="odyssey-list space-y-2.5 py-4">
              {t.items.map((it, i) => (
                <Message key={i} item={it} t={t} />
              ))}
              <div data-dots="" className="ody-msg flex justify-start">
                <span className="odyssey-typing inline-flex items-center gap-1 rounded-2xl rounded-ss-sm bg-white/[0.06] px-3 py-2.5 ring-1 ring-white/10" aria-hidden>
                  <i className="block h-1.5 w-1.5 rounded-full bg-white/60" />
                  <i className="block h-1.5 w-1.5 rounded-full bg-white/60" />
                  <i className="block h-1.5 w-1.5 rounded-full bg-white/60" />
                </span>
              </div>
            </div>
          </div>

          {/* Composer */}
          <div className="shrink-0 px-4 pb-4 pt-2 sm:px-5">
            <div className="flex items-center justify-between rounded-full bg-white/[0.05] px-4 py-2.5 text-[12px] text-white/45 ring-1 ring-white/10">
              {t.input}
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-500 text-white">
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
  const base = "ody-msg";
  const wrap = (cls: string, children: ReactNode, typing = false) => (
    <div data-at={item.at} data-typing={typing ? "1" : undefined} className={cn(base, cls)}>
      {children}
    </div>
  );

  switch (item.kind) {
    case "module":
      return wrap(
        "flex items-center gap-2 pt-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-spark-300",
        <>
          <span className="h-px flex-1 bg-white/10" />
          <span className="inline-flex items-center gap-1.5">
            {item.module}
            <Link href={item.href} className="group inline-flex items-center gap-1 normal-case tracking-normal text-teal-300 hover:text-teal-200" title={t.more}>
              <span className="sr-only">{t.more}</span>
              <ArrowRight className="h-3 w-3 transition-transform ltr:group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
            </Link>
          </span>
          <span className="h-px flex-1 bg-white/10" />
        </>,
      );
    case "user":
      return wrap(
        "flex justify-end",
        <div className="max-w-[88%] rounded-2xl rounded-se-sm bg-teal-500/20 px-3.5 py-2.5 ring-1 ring-teal-400/20">
          <p className="text-[13px] leading-relaxed">{item.text}</p>
          {item.file ? (
            <p className="mt-2 inline-flex max-w-full items-center gap-1.5 break-all rounded-md bg-white/10 px-2 py-1 text-[10.5px]">
              <Paperclip className="h-3 w-3 shrink-0" />
              {item.file}
            </p>
          ) : null}
        </div>,
      );
    case "assistant":
      return wrap(
        "flex justify-start",
        <div className="max-w-[92%] rounded-2xl rounded-ss-sm bg-white/[0.06] px-3.5 py-2.5 ring-1 ring-white/10">
          <p className="text-[13px] leading-relaxed text-white/90">{item.text}</p>
        </div>,
        true,
      );
    case "tools":
      return wrap(
        "",
        <ul className="space-y-2 rounded-xl bg-white/[0.04] p-3 ring-1 ring-white/10">
          {item.steps.map((st) => {
            const Icon = toolIcon(st.tool);
            return (
              <li key={st.tool + st.label} className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-white/[0.07] text-teal-300">
                  <Icon className="h-3 w-3" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="flex flex-wrap items-baseline gap-x-2 text-[12px] font-medium">
                    {st.label}
                    <code dir="ltr" className="font-mono text-[10px] text-white/40">{st.tool}</code>
                  </p>
                  <p dir="auto" className="text-[11px] leading-snug text-white/55">{st.detail}</p>
                </div>
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal-400" strokeWidth={3} />
              </li>
            );
          })}
        </ul>,
        true,
      );
    case "card":
      return wrap(
        "",
        <div className={cn("rounded-xl p-3 ring-1", item.confirm ? "bg-spark-400/[0.07] ring-spark-400/40" : "bg-teal-500/10 ring-teal-400/30")}>
          <p className="flex items-center gap-1.5 text-[12px] font-semibold">
            {item.confirm ? <Sparkles className="h-3.5 w-3.5 text-spark-400" /> : <BarChart3 className="h-3.5 w-3.5 text-teal-300" />}
            {item.title}
          </p>
          <ul className="mt-2 space-y-1">
            {item.rows.map(([k, v], i) => (
              <li key={k} className={cn("flex justify-between gap-3 text-[11.5px]", i === item.rows.length - 1 && !item.confirm && "font-semibold")}>
                <span className="text-white/55">{k}</span>
                <span dir="auto" className="font-mono text-white/90">{v}</span>
              </li>
            ))}
          </ul>
          {item.confirm ? (
            <div data-confirm-at={item.confirmedAt} className="odyssey-confirm mt-3 flex items-center gap-2">
              <span className="odyssey-confirm-pending rounded-full bg-teal-500 px-3.5 py-1 text-[11px] font-semibold text-white">{item.confirm}</span>
              <span className="odyssey-confirm-done inline-flex items-center gap-1 rounded-full bg-teal-400/20 px-3 py-1 text-[11px] font-semibold text-teal-300 ring-1 ring-teal-400/30">
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
        "flex justify-start",
        <div className="flex max-w-[92%] items-center gap-2.5 rounded-xl bg-white px-3 py-2.5 text-ink-900 shadow-float">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
            <FileText className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p dir="auto" className="truncate text-[12px] font-semibold">{item.name}</p>
            <p dir="auto" className="truncate text-[10.5px] text-fog-500">{item.meta}</p>
          </div>
        </div>,
      );
    case "status":
      return wrap(
        "flex justify-center",
        <span dir="auto" className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-ink-900 px-3 py-1 text-[11px] font-semibold text-teal-200 ring-1 ring-white/10">
          <Check className="h-3 w-3 shrink-0 text-teal-400" strokeWidth={3} />
          <span className="truncate">{item.text}</span>
        </span>,
      );
  }
}
