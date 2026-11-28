import type { LucideIcon } from "lucide-react";
import { Anchor, Boxes, Container, FileCheck2, Landmark, PackageCheck, Plane, Ship, Truck, Warehouse } from "lucide-react";
import type { Locale } from "./i18n";

/**
 * The lines of business ROUTEL runs, as the business activities a company
 * opens in Settings → Business activities (lib/activities.ts in the system).
 * Every one of them is built and open to companies. Customs clearance covers
 * the clearance file, the AI reading of the commercial invoice with HS
 * suggestions, and the duty and VAT estimate with the deposit request.
 */
export type Service = {
  slug: string;
  icon: LucideIcon;
  /** The service's own page. */
  href: string;
  /** The module page and the user guide, for a live service. */
  module?: string;
  doc?: string;
  /** Services to read next. */
  related: string[];
  name: string;
  short: string;
  points: string[];
};

type Base = Omit<Service, "href" | "name" | "short" | "points">;

const base: Base[] = [
  { slug: "sea-freight", icon: Ship, module: "/platform/bookings", doc: "/docs/bookings", related: ["air-freight", "consolidation", "import-release"] },
  { slug: "air-freight", icon: Plane, module: "/platform/air-freight", doc: "/docs/air-freight", related: ["sea-freight", "consolidation", "import-release"] },
  { slug: "consolidation", icon: Boxes, module: "/platform/consolidation", doc: "/docs/consolidation", related: ["sea-freight", "air-freight", "warehousing"] },
  { slug: "import-release", icon: FileCheck2, module: "/platform/arrival-notice", doc: "/docs/arrival-notice", related: ["sea-freight", "land-transport", "customs-brokerage"] },
  { slug: "nvocc", icon: Container, related: ["sea-freight", "shipping-agency", "consolidation"] },
  { slug: "land-transport", icon: Truck, related: ["warehousing", "import-release", "contract-logistics"] },
  { slug: "warehousing", icon: Warehouse, related: ["consolidation", "land-transport", "contract-logistics"] },
  { slug: "shipping-agency", icon: Anchor, related: ["nvocc", "import-release", "customs-brokerage"] },
  { slug: "customs-brokerage", icon: Landmark, related: ["import-release", "sea-freight", "shipping-agency"] },
  { slug: "contract-logistics", icon: PackageCheck, related: ["warehousing", "land-transport", "consolidation"] },
];

const text: Record<Locale, Record<string, { name: string; short: string; points: string[] }>> = {
  en: {
    "sea-freight": {
      name: "Sea freight forwarding",
      short: "FCL from quotation to closed: carrier booking, House B/L, invoices and the books.",
      points: ["Route rates, quotations and bookings", "Carrier booking and confirmation, read by AI", "House B/L, finalised and surrendered", "Invoices, payments and the books"],
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
      points: ["Arrival notice, due on time", "Delivery order once released and paid", "Sent by email with the PDF attached", "New ETA read by AI from the line's notice"],
    },
    nvocc: {
      name: "NVOCC",
      short: "Bills of Lading in your own name, demurrage and detention, agents and profit share.",
      points: ["Own-name Bills of Lading and Sea Waybills", "Demurrage and detention, both sides", "Agents, profit share and statements"],
    },
    "land-transport": {
      name: "Land transport",
      short: "Container trucking on the same booking, reported from the driver's phone.",
      points: ["Transport orders, fleet and drivers", "Driver's phone link, no app", "Trip expenses, fuel checks and billing"],
    },
    warehousing: {
      name: "Warehouse receipts and CFS",
      short: "Receive cargo into the warehouse or the container freight station, with a receipt.",
      points: ["Warehouse receipts, received on the phone", "Labels and loading by scan", "Your own storage tariff"],
    },
    "shipping-agency": {
      name: "Shipping agency",
      short: "Agency work for lines in Saudi Arabia, Malaysia and Indonesia.",
      points: ["Line agency operations", "Saudi Arabia, Malaysia and Indonesia"],
    },
    "customs-brokerage": {
      name: "Customs clearance",
      short: "One clearance file per declaration, with HS-coded lines and the customs value worked out.",
      points: ["Import, export and transit; sea, air and land", "HS codes to the full 12-digit Saudi tariff line, and the customs value (CIF)", "Invoice read by AI; duty and VAT estimated"],
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
      points: ["أسعار المسارات وعروض الأسعار والحجوزات", "حجز الناقل، وتأكيده يقرؤه الذكاء الاصطناعي", "البوليصة الفرعية، من الاعتماد حتى التسليم (Surrender)", "الفواتير والدفعات والدفاتر"],
    },
    "air-freight": {
      name: "الشحن الجوي",
      short: "الشحن السريع والشحن عبر شركات الطيران: البوليصة الجوية الرئيسية والفرعية، والمساحات المحجوزة، والوزن المحتسب.",
      points: ["سريع أو عبر شركة طيران", "البوليصة الجوية الرئيسية MAWB والفرعية HAWB", "المساحات المحجوزة لدى شركات الطيران", "الرسوم حسب الوزن المحتسب"],
    },
    consolidation: {
      name: "التجميع والشحن الجزئي LCL",
      short: "عدة شاحنين في حاوية واحدة: تجميع واحد، وبيان حمولة واحد، وتوزيع عادل للتكلفة.",
      points: ["بحري LCL أو جوي، ببوليصتك الرئيسية أو عبر مجمّع آخر", "حجوزات مقترحة على المسار نفسه", "بيان الحمولة", "توزيع التكلفة بالحجم أو W/M أو الوزن المحتسب، حتى آخر سنت"],
    },
    "import-release": {
      name: "إشعار الوصول وإذن التسليم",
      short: "أبلغ المرسل إليه بوصول البضاعة وأفرج عنها، والمستندات تُرسل من النظام.",
      points: ["إشعار الوصول في موعده", "إذن التسليم بعد الإفراج والسداد", "يُرسل بالبريد مع ملف PDF مرفق", "موعد الوصول الجديد يقرؤه الذكاء الاصطناعي من إشعار الخط"],
    },
    nvocc: {
      name: "الناقل غير المالك للسفن NVOCC",
      short: "بوالص شحن باسم شركتك، والأرضيات والتأخير، والوكلاء وتقاسم الربح.",
      points: ["بوالص الشحن وبوالص Sea Waybill باسم شركتك", "الأرضيات والتأخير، على العميل ومن الخط", "الوكلاء وتقاسم الربح والكشوف"],
    },
    "land-transport": {
      name: "النقل البري",
      short: "نقل الحاويات بالشاحنات على الحجز نفسه، والسائق يبلّغ من جواله.",
      points: ["أوامر النقل والأسطول والسائقون", "رابط جوال السائق، بلا تطبيق", "مصروفات الرحلة وفحوص الوقود والفوترة"],
    },
    warehousing: {
      name: "إيصالات المستودع ومحطة التعبئة والتفريغ (CFS)",
      short: "استلام البضاعة في المستودع أو في محطة التعبئة والتفريغ (CFS)، بإيصال استلام.",
      points: ["إيصالات المستودع، تُستلم من الجوال", "الملصقات والتحميل بالمسح", "تعرفة تخزين خاصة بك"],
    },
    "shipping-agency": {
      name: "الوكالة الملاحية",
      short: "أعمال الوكالة للخطوط الملاحية في السعودية وماليزيا وإندونيسيا.",
      points: ["عمليات وكالة الخطوط", "السعودية وماليزيا وإندونيسيا"],
    },
    "customs-brokerage": {
      name: "التخليص الجمركي",
      short: "ملف تخليص لكل بيان، ببنود برموز HS وقيمة جمركية محسوبة.",
      points: ["استيراد وتصدير وعبور (ترانزيت)؛ بحري وجوي وبري", "رموز HS حتى البند الكامل من 12 خانة في التعرفة السعودية، والقيمة الجمركية (CIF)", "قراءة الفاتورة بالذكاء الاصطناعي وتقدير الرسوم والضريبة"],
    },
    "contract-logistics": {
      name: "مخزون العملاء (3PL)",
      short: "المخزون المحفوظ لعملائك، لشركات المستودعات والتوزيع.",
      points: ["مخزون العملاء", "الاستلام والإفراج"],
    },
  },
};

export function getServices(locale: Locale): Service[] {
  return base.map((b) => ({
    ...b,
    href: `/solutions/${b.slug}`,
    ...text[locale][b.slug],
  }));
}

export const serviceSlugs = base.map((b) => b.slug);

/** Who ROUTEL is built for, used by the Solutions menu and page. */
export type Segment = { slug: string; name: string; text: string; services: string[] };

const segments: Record<Locale, Segment[]> = {
  en: [
    { slug: "forwarders", name: "Freight forwarders", text: "Sea, air and LCL on one booking, the arrival notice and the delivery order, with the books kept as you work.", services: ["sea-freight", "air-freight", "consolidation", "import-release"] },
    { slug: "nvocc", name: "NVOCCs and carriers' agents", text: "Your own Bills of Lading, equipment and agent network.", services: ["nvocc", "sea-freight"] },
    { slug: "customs", name: "Customs brokers", text: "Clearance files with HS-coded lines and the customs value worked out, next to the shipment they belong to.", services: ["customs-brokerage", "import-release"] },
    { slug: "agencies", name: "Shipping agencies", text: "Line agency operations, document flows and finance in one system.", services: ["shipping-agency", "import-release"] },
    { slug: "transport", name: "Land transport", text: "Transport orders, fleet and drivers, on the same booking as the shipment.", services: ["land-transport"] },
    { slug: "3pl", name: "Warehouse, CFS and 3PL", text: "Warehouse receipts, the CFS and your clients' inventory on the same platform.", services: ["warehousing", "contract-logistics", "land-transport"] },
  ],
  ar: [
    { slug: "forwarders", name: "وكلاء الشحن", text: "البحري والجوي والتجميع على حجز واحد، مع إشعار الوصول وإذن التسليم، والدفاتر تُكتب وأنت تعمل.", services: ["sea-freight", "air-freight", "consolidation", "import-release"] },
    { slug: "nvocc", name: "الناقلون غير المالكين للسفن ووكلاء الخطوط", text: "بوالص شحن باسمك، ومعداتك، وشبكة وكلائك.", services: ["nvocc", "sea-freight"] },
    { slug: "customs", name: "المخلّصون الجمركيون", text: "ملفات تخليص ببنود مرمّزة برموز HS وقيمة جمركية محسوبة، بجانب الشحنة التي تخصها.", services: ["customs-brokerage", "import-release"] },
    { slug: "agencies", name: "الوكالات الملاحية", text: "عمليات وكالة الخطوط ومستنداتها وماليتها في نظام واحد.", services: ["shipping-agency", "import-release"] },
    { slug: "transport", name: "النقل البري", text: "أوامر النقل والأسطول والسائقون، على حجز الشحنة نفسه.", services: ["land-transport"] },
    { slug: "3pl", name: "المستودعات ومحطات التعبئة والتفريغ و3PL", text: "إيصالات المستودع ومحطة التعبئة والتفريغ (CFS) ومخزون عملائك على المنصة نفسها.", services: ["warehousing", "contract-logistics", "land-transport"] },
  ],
};

export function getSegments(locale: Locale): Segment[] {
  return segments[locale];
}

/**
 * The Solutions menu (desktop and mobile): each type of business with its
 * services, each service listed once, under the first business it serves.
 */
export function getSolutionMenu(locale: Locale): Array<Segment & { items: Service[] }> {
  const services = getServices(locale);
  const shown = new Set<string>();
  return getSegments(locale).map((g) => {
    const items = g.services
      .filter((slug) => !shown.has(slug))
      .map((slug) => services.find((s) => s.slug === slug))
      .filter((s): s is Service => Boolean(s));
    items.forEach((s) => shown.add(s.slug));
    return { ...g, items };
  });
}
