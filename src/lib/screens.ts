import type { Locale } from "@/lib/i18n";

/**
 * Real screenshots of the app (public/screens/<name>-<locale>.webp, 1600×1000,
 * the whole app window with its sidebar). Taken from a demo company with demo
 * data — never a customer's. The Arabic site shows the Arabic app.
 */
export const screens = {
  bookings: {
    en: { label: "Bookings", alt: "The Bookings list in ROUTEL: booking number, AR, route, assigned staff, ETD and ETA, invoice and status for each shipment, with the AP cost" },
    ar: { label: "الحجوزات", alt: "قائمة الحجوزات في ROUTEL: رقم الحجز والعميل والمسار والموظف المسؤول وموعد المغادرة والوصول والفاتورة والحالة لكل شحنة، مع تكلفة المورد" },
  },
  booking: {
    en: { label: "One booking", alt: "A booking in ROUTEL: shipment details, the carrier booking with Read Carrier Confirmation, the shipping timeline from cut-offs to arrival, land transport, demurrage and detention, and the booking's invoices" },
    ar: { label: "حجز واحد", alt: "حجز في ROUTEL: تفاصيل الشحنة، وحجز الناقل مع «قراءة تأكيد الناقل»، والجدول الزمني من مواعيد الإغلاق حتى الوصول، والنقل البري، والأرضيات والتأخير، وفواتير الحجز" },
  },
  quotes: {
    en: { label: "Quotations", alt: "The Quotations list in ROUTEL: each quotation's AR, validity, status (draft, sent, accepted, expired) and total in USD or the base currency" },
    ar: { label: "عروض الأسعار", alt: "قائمة عروض الأسعار في ROUTEL: العميل وصلاحية كل عرض وحالته (مسودة، مُرسل، مقبول، منتهي) وإجماليه بالدولار أو بالعملة الأساسية" },
  },
  invoice: {
    en: { label: "Invoice", alt: "An issued invoice in ROUTEL: invoice details, its line items with tax, the totals and the receipt voucher that paid it" },
    ar: { label: "الفاتورة", alt: "فاتورة معتمدة في ROUTEL: بيانات الفاتورة، وبنودها مع الضريبة، والإجماليات" },
  },
  alerts: {
    en: { label: "Alerts", alt: "The Alerts page in ROUTEL: lists for arriving soon, cut-offs, overdue payments, unassigned bookings, missing MBL numbers, follow-ups, arrival notices, demurrage and detention, container free time and fleet papers" },
    ar: { label: "التنبيهات", alt: "صفحة التنبيهات في ROUTEL: قوائم الشحنات القادمة ومواعيد الإغلاق والدفعات المتأخرة والحجوزات بلا موظف والبوالص الناقصة والمتابعات وإشعارات الوصول والأرضيات والتأخير والأيام المجانية للحاويات وأوراق الأسطول" },
  },
  customs: {
    en: { label: "Customs clearance", alt: "The Customs clearance page in ROUTEL: counters per status (draft, documents complete, declared, under inspection, on hold, duties paid, released) and one file per declaration with its importer, office, BL and customs value" },
    ar: { label: "التخليص الجمركي", alt: "صفحة التخليص الجمركي في ROUTEL: عدّاد لكل حالة (مسودة، المستندات مكتملة، قُدّم البيان، تحت الفحص، موقوف، سُددت الرسوم، تم الفسح) وملف لكل بيان بمستورده ومنفذه وبوليصته وقيمته الجمركية" },
  },
  "customs-file": {
    en: { label: "A clearance file", alt: "A customs clearance file in ROUTEL: the importer with CR and VAT numbers, office of entry, declaration and release order, the customs value (CIF) worked out in SAR, the status path and the documents checklist" },
    ar: { label: "ملف تخليص", alt: "ملف تخليص جمركي في ROUTEL: المستورد بسجله التجاري ورقمه الضريبي، ومنفذ الدخول، والبيان وإذن الفسح، والقيمة الجمركية CIF محسوبة بالريال، ومسار الحالات، وقائمة المستندات" },
  },
  reports: {
    en: { label: "Profit & Loss", alt: "The Profit & Loss report in ROUTEL: revenue, cost, gross profit, net income and gross margin for the period, with a monthly chart of revenue against cost" },
    ar: { label: "الأرباح والخسائر", alt: "تقرير الأرباح والخسائر في ROUTEL: الإيرادات والتكلفة وإجمالي الربح وصافي الدخل وهامش الربح للفترة، مع رسم شهري للإيرادات مقابل التكلفة" },
  },
  assistant: {
    en: { label: "ROUTEL Assistant", alt: "The ROUTEL Assistant open on a booking, guiding company setup step by step: each step is confirmed before anything is saved" },
    ar: { label: "مساعد ROUTEL", alt: "مساعد ROUTEL مفتوحاً على حجز، يرشد إلى إعداد الشركة خطوة بخطوة: تُؤكَّد كل خطوة قبل حفظ أي شيء" },
  },
} satisfies Record<string, Record<Locale, { label: string; alt: string }>>;

export type ScreenName = keyof typeof screens;

export const screenCaption: Record<Locale, string> = {
  en: "Real screen, demo data",
  ar: "لقطة حقيقية من النظام، ببيانات تجريبية",
};

/** The link on a cropped screenshot that opens the whole screen. */
export const screenOpen: Record<Locale, string> = {
  en: "Open full screen",
  ar: "افتح الشاشة كاملة",
};
