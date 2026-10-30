import type { LucideIcon } from "lucide-react";
import { Anchor, Boxes, Container, FileCheck2, Landmark, PackageCheck, Plane, Ship, Truck, Warehouse } from "lucide-react";
import type { Locale } from "./i18n";

/**
 * The lines of business Routel runs, as the business activities a company
 * opens in Settings → Business activities (lib/activities.ts in the system).
 * `live` services have their module built; the others are on the roadmap
 * (docs/routel-central.md, section 3) and are shown as coming, never as
 * available.
 */
export type ServiceStatus = "live" | "coming";

export type Service = {
  slug: string;
  status: ServiceStatus;
  icon: LucideIcon;
  /** Where "Learn more" goes: the module page for a live service. */
  href?: string;
  name: string;
  short: string;
  points: string[];
};

type Base = { slug: string; status: ServiceStatus; icon: LucideIcon; href?: string };

const base: Base[] = [
  { slug: "sea-freight", status: "live", icon: Ship, href: "/platform/bookings" },
  { slug: "air-freight", status: "live", icon: Plane, href: "/platform/air-freight" },
  { slug: "consolidation", status: "live", icon: Boxes, href: "/platform/consolidation" },
  { slug: "import-release", status: "live", icon: FileCheck2, href: "/platform/arrival-notice" },
  { slug: "nvocc", status: "coming", icon: Container },
  { slug: "land-transport", status: "coming", icon: Truck },
  { slug: "warehousing", status: "coming", icon: Warehouse },
  { slug: "shipping-agency", status: "coming", icon: Anchor },
  { slug: "customs-brokerage", status: "coming", icon: Landmark },
  { slug: "contract-logistics", status: "coming", icon: PackageCheck },
];

const text: Record<Locale, Record<string, { name: string; short: string; points: string[] }>> = {
  en: {
    "sea-freight": {
      name: "Sea freight forwarding",
      short: "FCL from quotation to closed: carrier booking, House B/L, invoices and the books.",
      points: ["Route rates, quotations and bookings", "Carrier booking and confirmation, read by AI", "House B/L, finalised and surrendered", "Invoices, payments and the general ledger"],
    },
    "air-freight": {
      name: "Air freight forwarding",
      short: "Express and airline shipments, with MAWB and HAWB, block space and chargeable weight.",
      points: ["Express or through an airline", "Master and House Air Waybills", "Air allocations (block space)", "Charges by chargeable weight"],
    },
    consolidation: {
      name: "Consolidation and LCL",
      short: "Many shippers in one container: one consolidation, one manifest, costs shared fairly.",
      points: ["Sea LCL or air, own master or co-loader", "Suggested bookings on the same route", "Cargo manifest", "Costs shared by CBM, W/M or chargeable weight, to the cent"],
    },
    "import-release": {
      name: "Arrival notice and delivery order",
      short: "Tell the consignee the cargo has landed and release it, with the documents sent from the system.",
      points: ["Arrival notice, due on time", "Delivery order once released and paid", "Sent by e-mail with the PDF attached", "New ETA read by AI from the line's notice"],
    },
    nvocc: {
      name: "NVOCC",
      short: "Bills of Lading in your own name, demurrage and detention, agents and profit share.",
      points: ["Own-name Bills of Lading", "Demurrage and detention", "Agents and profit share"],
    },
    "land-transport": {
      name: "Land transport",
      short: "Trucking jobs with proof of delivery, on the same booking.",
      points: ["Trucking orders", "Proof of delivery"],
    },
    warehousing: {
      name: "Warehouse receipts and CFS",
      short: "Receive cargo into the warehouse or the container freight station, with a receipt.",
      points: ["Warehouse receipts", "Container freight station (CFS)"],
    },
    "shipping-agency": {
      name: "Shipping agency",
      short: "Agency work for lines in Saudi Arabia, Malaysia and Indonesia.",
      points: ["Line agency operations", "Saudi Arabia, Malaysia and Indonesia"],
    },
    "customs-brokerage": {
      name: "Customs brokerage",
      short: "Customs declarations with HS codes suggested by AI.",
      points: ["Declarations", "AI-suggested HS codes", "Links to FASAH, CEISA and uCustoms, awaiting government approval"],
    },
    "contract-logistics": {
      name: "Inventory (3PL)",
      short: "Stock held for your clients, for warehousing and distribution companies.",
      points: ["Client inventory", "Receipts and releases"],
    },
  },
  ar: {
    "sea-freight": {
      name: "الشحن البحري",
      short: "الحاويات الكاملة من عرض السعر حتى الإغلاق: حجز الناقل، والبوليصة الفرعية، والفواتير، والدفاتر.",
      points: ["أسعار المسارات وعروض الأسعار والحجوزات", "حجز الناقل وتأكيده، يقرؤه الذكاء الاصطناعي", "البوليصة الفرعية، اعتمادها وإصدار Surrender", "الفواتير والدفعات ودفتر الأستاذ"],
    },
    "air-freight": {
      name: "الشحن الجوي",
      short: "الشحن السريع والشحن عبر شركات الطيران، بالبوليصة الجوية الرئيسية والفرعية والمساحات المحجوزة والوزن المحتسب.",
      points: ["سريع أو عبر شركة طيران", "البوليصة الجوية الرئيسية MAWB والفرعية HAWB", "المساحات المحجوزة لدى شركات الطيران", "الرسوم حسب الوزن المحتسب"],
    },
    consolidation: {
      name: "التجميع والشحن الجزئي LCL",
      short: "عدة شاحنين في حاوية واحدة: تجميع واحد، وبيان حمولة واحد، وتوزيع عادل للتكلفة.",
      points: ["بحري LCL أو جوي، ببوليصتك الرئيسية أو عبر مجمّع آخر", "حجوزات مقترحة على المسار نفسه", "بيان الحمولة", "توزيع التكلفة بالحجم أو W/M أو الوزن المحتسب، حتى السنت"],
    },
    "import-release": {
      name: "إشعار الوصول وأمر التسليم",
      short: "أبلغ المرسل إليه بوصول البضاعة وأفرج عنها، والمستندات تُرسل من النظام.",
      points: ["إشعار الوصول في موعده", "أمر التسليم بعد الإفراج والسداد", "يُرسل بالبريد مع ملف PDF مرفق", "موعد الوصول الجديد يقرؤه الذكاء الاصطناعي من إشعار الخط"],
    },
    nvocc: {
      name: "الناقل غير المالك للسفن NVOCC",
      short: "بوالص شحن باسم شركتك، والأرضيات والتأخير، والوكلاء وتقاسم الربح.",
      points: ["بوالص شحن باسم شركتك", "الأرضيات والتأخير", "الوكلاء وتقاسم الربح"],
    },
    "land-transport": {
      name: "النقل البري",
      short: "أوامر النقل بالشاحنات مع إثبات التسليم، على الحجز نفسه.",
      points: ["أوامر النقل", "إثبات التسليم"],
    },
    warehousing: {
      name: "إيصالات المستودع ومحطة الحاويات",
      short: "استلام البضاعة في المستودع أو محطة تجميع الحاويات CFS، بإيصال.",
      points: ["إيصالات المستودع", "محطة تجميع الحاويات CFS"],
    },
    "shipping-agency": {
      name: "الوكالة الملاحية",
      short: "أعمال الوكالة للخطوط الملاحية في السعودية وماليزيا وإندونيسيا.",
      points: ["عمليات وكالة الخطوط", "السعودية وماليزيا وإندونيسيا"],
    },
    "customs-brokerage": {
      name: "التخليص الجمركي",
      short: "البيانات الجمركية برموز HS يقترحها الذكاء الاصطناعي.",
      points: ["البيانات الجمركية", "رموز HS يقترحها الذكاء الاصطناعي", "الربط مع فسح وCEISA وuCustoms بانتظار الموافقات الحكومية"],
    },
    "contract-logistics": {
      name: "المخزون لعملائك 3PL",
      short: "المخزون المحفوظ لعملائك، لشركات المستودعات والتوزيع.",
      points: ["مخزون العملاء", "الاستلام والإفراج"],
    },
  },
};

export function getServices(locale: Locale): Service[] {
  return base.map((b) => ({ ...b, ...text[locale][b.slug] }));
}

/** Who Routel is built for, used by the Solutions menu and page. */
export type Segment = { slug: string; name: string; text: string; services: string[] };

const segments: Record<Locale, Segment[]> = {
  en: [
    { slug: "forwarders", name: "Freight forwarders", text: "Sea, air and LCL on one booking, with the books kept as you work.", services: ["sea-freight", "air-freight", "consolidation", "import-release"] },
    { slug: "nvocc", name: "NVOCCs and carriers' agents", text: "Your own Bills of Lading, equipment and agent network.", services: ["nvocc", "sea-freight"] },
    { slug: "agencies", name: "Shipping agencies", text: "Line agency operations, document flows and finance in one system.", services: ["shipping-agency", "import-release"] },
    { slug: "customs", name: "Customs brokers", text: "Declarations prepared with AI, next to the shipment they belong to.", services: ["customs-brokerage", "import-release"] },
    { slug: "3pl", name: "3PL and warehousing", text: "Receipts, trucking and client inventory on the same platform.", services: ["warehousing", "land-transport", "contract-logistics"] },
  ],
  ar: [
    { slug: "forwarders", name: "شركات الشحن والوساطة", text: "البحري والجوي والتجميع على حجز واحد، والدفاتر تُكتب وأنت تعمل.", services: ["sea-freight", "air-freight", "consolidation", "import-release"] },
    { slug: "nvocc", name: "الناقلون غير المالكين للسفن ووكلاء الخطوط", text: "بوالصك الخاصة، ومعداتك، وشبكة وكلائك.", services: ["nvocc", "sea-freight"] },
    { slug: "agencies", name: "الوكالات الملاحية", text: "عمليات وكالة الخطوط ومستنداتها وماليتها في نظام واحد.", services: ["shipping-agency", "import-release"] },
    { slug: "customs", name: "المخلّصون الجمركيون", text: "بيانات جمركية يجهّزها الذكاء الاصطناعي، بجانب الشحنة التي تخصها.", services: ["customs-brokerage", "import-release"] },
    { slug: "3pl", name: "المستودعات والخدمات اللوجستية 3PL", text: "الإيصالات والنقل البري ومخزون العملاء على المنصة نفسها.", services: ["warehousing", "land-transport", "contract-logistics"] },
  ],
};

export function getSegments(locale: Locale): Segment[] {
  return segments[locale];
}
