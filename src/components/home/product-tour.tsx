import { BellRing, FileSearch, Landmark, MapPin, Receipt, Route, Ship } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { getLocale } from "@/lib/locale-server";
import type { Locale } from "@/lib/i18n";
import { DocumentReadShot } from "@/components/shots/ai-shots";
import { TrackingShot } from "@/components/shots/tour-shots";
import { RealShot, type Crop } from "@/components/shots/real-shot";
import { TourTabs, type TourItem } from "./tour-tabs";

type Copy = {
  eyebrow: string;
  title: string;
  lead: string;
  label: string;
  cta: string;
  tabs: Record<
    "bookings" | "routes" | "invoicing" | "customs" | "documents" | "control" | "tracking",
    { title: string; short: string; body: string; bullets: [string, string, string] }
  >;
};

const copy: Record<Locale, Copy> = {
  en: {
    eyebrow: "Product tour",
    title: "One system for every desk in your forwarding office",
    lead: "Sales, operations and accounts work on the same records, so a rate becomes a booking, a booking becomes an invoice, and the invoice is already in the books.",
    label: "Routel product tour",
    cta: "See how it works",
    tabs: {
      bookings: {
        title: "Bookings",
        short: "One record from quote to close",
        body: "The booking is the shipment's single record: parties, ports, vessel, containers, cut-offs and every date to ATA, with charges and live profit on the same page.",
        bullets: ["11 statuses, Booking Pending to Shipment Closed", "Booking Confirmation with numbered revisions", "Every change in the activity log"],
      },
      routes: {
        title: "Quotations & Routes",
        short: "Buying rates in, quotes out",
        body: "Keep vendor buying rates per lane and container with their validity, quote on top of a current rate, and convert the accepted quotation straight into a booking.",
        bullets: ["Rates flag 14 days before they expire", "Import a whole rate sheet from Excel", "Route analytics: volume, revenue and margin"],
      },
      invoicing: {
        title: "Invoicing & tax",
        short: "From the booking's sale lines",
        body: "Create Invoice turns the booking's sale charges into drafts. Finalising numbers and locks the invoice; corrections go through credit and debit notes.",
        bullets: ["Base currency and USD on one invoice", "SST, PPN or VAT by country", "Saudi tax invoices with the ZATCA QR code"],
      },
      customs: {
        title: "Customs clearance",
        short: "One file per declaration",
        body: "Each declaration is a file: import, export or transit, the importer with its CR and VAT numbers, 12-digit HS codes, the customs value (CIF) worked out for you, the documents it needs and the status it has reached.",
        bullets: ["The commercial invoice read into lines by AI", "HS codes suggested; the broker confirms each", "Duty and VAT estimated from your own tariff"],
      },
      documents: {
        title: "Documents & AI",
        short: "Attachments read, matched, filed",
        body: "Incoming e-mail attachments are classified (B/L, booking confirmation, vendor invoice) and matched to the right booking by number, B/L or container. A person approves each one.",
        bullets: ["Reads PDFs and scans", "Suggests the booking it belongs to", "Nothing is saved without approval"],
      },
      control: {
        title: "Daily control",
        short: "What needs attention today",
        body: "One alerts page keeps five lists current through the day: arrivals in the next 7 days, overdue payments, bookings with no one assigned, bookings past SI without a B/L, and follow-ups due. The team starts with a list instead of a search.",
        bullets: ["Five alert lists, refreshed all day", "Labels with a follow-up date and owner", "A morning brief from the assistant"],
      },
      tracking: {
        title: "Customer tracking",
        short: "A status page with no login",
        body: "Your customers look up their shipment with two pieces of information, the booking, B/L or container number plus their company name or account ID, and see its status only.",
        bullets: ["No account needed", "Can't be used to fish for other shipments", "Never shows vessel, MBL or exact dates"],
      },
    },
  },
  ar: {
    eyebrow: "جولة في النظام",
    title: "نظام واحد لكل مكتب في شركة الشحن",
    lead: "المبيعات والعمليات والحسابات يعملون على السجلات نفسها: السعر يصير حجزاً، والحجز يصير فاتورة، والفاتورة تكون في الدفاتر مباشرة.",
    label: "جولة في نظام Routel",
    cta: "اعرف كيف يعمل",
    tabs: {
      bookings: {
        title: "الحجوزات",
        short: "سجل واحد من عرض السعر حتى الإغلاق",
        body: "الحجز هو السجل الوحيد للشحنة: الأطراف والموانئ والسفينة والحاويات ومواعيد الإغلاق وكل التواريخ حتى الوصول الفعلي، ومعها الرسوم والربح المباشر في الصفحة نفسها.",
        bullets: ["11 حالة، من «الحجز قيد الانتظار» حتى «الشحنة مغلقة»", "تأكيد الحجز مع مراجعات مرقّمة", "كل تغيير في سجل النشاط"],
      },
      routes: {
        title: "عروض الأسعار والمسارات",
        short: "أسعار الشراء تدخل، وعروض الأسعار تخرج",
        body: "احفظ أسعار شراء الموردين لكل مسار وحاوية مع مدة صلاحيتها، وابنِ عرض السعر على سعر ساري، ثم حوّل العرض المقبول إلى حجز مباشرة.",
        bullets: ["تنبيه قبل انتهاء السعر بـ14 يوماً", "استيراد قائمة أسعار كاملة من Excel", "تحليلات المسارات: الحجم والإيراد والهامش"],
      },
      invoicing: {
        title: "الفواتير والضريبة",
        short: "من بنود البيع في الحجز",
        body: "زر «إنشاء فاتورة» يحوّل رسوم البيع في الحجز إلى مسودات. الاعتماد يرقّم الفاتورة ويقفلها، والتصحيح يتم بإشعار دائن أو مدين.",
        bullets: ["الريال والدولار في فاتورة واحدة", "ضريبة القيمة المضافة 15%", "فاتورة ضريبية برمز QR وفق متطلبات هيئة الزكاة والضريبة والجمارك"],
      },
      customs: {
        title: "التخليص الجمركي",
        short: "ملف لكل بيان",
        body: "كل بيان ملف: استيراد أو تصدير أو عبور (ترانزيت)، والمستورد بسجله التجاري ورقمه الضريبي، ورموز HS من 12 خانة، والقيمة الجمركية CIF محسوبة لك، والمستندات المطلوبة، والحالة التي بلغها.",
        bullets: ["الذكاء الاصطناعي يقرأ الفاتورة التجارية إلى بنود", "رموز HS مقترحة، ويؤكد المخلّص كل رمز", "تقدير الرسوم والضريبة من جدول التعرفة الخاص بك"],
      },
      documents: {
        title: "المستندات والذكاء الاصطناعي",
        short: "المرفقات تُقرأ وتُطابق وتُحفظ",
        body: "مرفقات البريد الواردة تُصنَّف (بوليصة، تأكيد حجز، فاتورة مورد) وتُطابق مع الحجز الصحيح برقم الحجز أو البوليصة أو الحاوية، ويعتمد شخص كل واحدة منها.",
        bullets: ["يقرأ ملفات PDF والصور الممسوحة", "يقترح الحجز الذي يتبع له المستند", "لا شيء يُحفظ دون اعتماد"],
      },
      control: {
        title: "المتابعة اليومية",
        short: "ما يحتاج انتباهك اليوم",
        body: "صفحة تنبيهات واحدة بخمس قوائم تتحدث طوال اليوم: الشحنات التي تصل خلال 7 أيام، والدفعات المتأخرة، والحجوزات بلا موظف، والحجوزات التي تجاوزت تعليمات الشحن بلا بوليصة، والمتابعات المستحقة. فيبدأ الفريق يومه بقائمة بدل البحث.",
        bullets: ["خمس قوائم تنبيهات تتحدث طوال اليوم", "تصنيفات بتاريخ متابعة ومسؤول", "ملخص صباحي من المساعد الذكي"],
      },
      tracking: {
        title: "تتبّع العملاء",
        short: "صفحة حالة دون تسجيل دخول",
        body: "يتتبّع عميلك شحنته بمعلومتين: رقم الحجز أو البوليصة أو الحاوية، مع اسم شركته أو رقم حسابه، ويرى حالتها فقط.",
        bullets: ["دون حساب أو تسجيل دخول", "لا يمكن استخدامها لمعرفة شحنات الآخرين", "لا تظهر السفينة ولا البوليصة الرئيسية ولا التواريخ الدقيقة"],
      },
    },
  },
};

const icons = {
  bookings: <Ship />,
  routes: <Route />,
  invoicing: <Receipt />,
  customs: <Landmark />,
  documents: <FileSearch />,
  control: <BellRing />,
  tracking: <MapPin />,
};

const hrefs = {
  bookings: "/platform/bookings",
  routes: "/platform/quotations",
  invoicing: "/platform/invoicing",
  customs: "/solutions/customs-brokerage",
  documents: "/platform/documents",
  control: "/platform/labeling-center",
  tracking: "/platform/tracking",
};

export async function ProductTour() {
  const locale = await getLocale();
  const t = copy[locale];
  const shot = "mx-auto w-full";
  // Real screens where we have them; the e-mail reading and the public tracking page stay illustrations.
  // Each shows the part of the screen that matters at a readable size (no sidebar), and opens the whole screen on click.
  const crops: Record<"booking" | "quotes" | "invoice" | "customs-file" | "alerts", { crop: Crop; mobile: Crop }> = {
    booking: { crop: { x: 262, y: 62, w: 880, h: 560 }, mobile: { x: 270, y: 62, w: 450, h: 450 } },
    quotes: { crop: { x: 266, y: 62, w: 1000, h: 640 }, mobile: { x: 270, y: 190, w: 480, h: 480 } },
    invoice: { crop: { x: 262, y: 62, w: 880, h: 560 }, mobile: { x: 270, y: 62, w: 450, h: 450 } },
    "customs-file": { crop: { x: 262, y: 62, w: 880, h: 560 }, mobile: { x: 270, y: 62, w: 450, h: 450 } },
    alerts: { crop: { x: 266, y: 62, w: 1000, h: 640 }, mobile: { x: 480, y: 140, w: 480, h: 480 } },
  };
  const real = (name: keyof typeof crops) => <RealShot name={name} locale={locale} crop={crops[name].crop} cropMobile={crops[name].mobile} />;
  const panels = {
    bookings: real("booking"),
    routes: real("quotes"),
    invoicing: real("invoice"),
    customs: real("customs-file"),
    documents: <DocumentReadShot locale={locale} className={`${shot} max-w-[620px]`} />,
    control: real("alerts"),
    tracking: <TrackingShot locale={locale} className={`${shot} max-w-[520px]`} />,
  };
  const items: TourItem[] = (Object.keys(t.tabs) as Array<keyof Copy["tabs"]>).map((id) => ({
    id,
    icon: icons[id],
    ...t.tabs[id],
    href: hrefs[id],
    cta: t.cta,
    panel: panels[id],
  }));

  return (
    <Section tone="muted" id="tour">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.lead} />
      <Reveal amount={0.08} className="mt-12 sm:mt-16">
        <TourTabs items={items} label={t.label} />
      </Reveal>
    </Section>
  );
}
