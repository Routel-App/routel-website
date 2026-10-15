import { Check, X } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { getLocale } from "@/lib/locale-server";
import type { Locale } from "@/lib/i18n";

type Row = { task: string; before: string; after: string };

type Copy = { eyebrow: string; title: string; lead: string; cols: [string, string, string]; rows: Row[] };

const copy: Record<Locale, Copy> = {
  en: {
    eyebrow: "Before and after",
    title: "What changes when the office runs on one system",
    lead: "Most forwarders start with spreadsheets, e-mail and a separate accounting package. Here's the same work in Routel.",
    cols: ["The job", "Spreadsheets, e-mail, separate accounts", "With Routel"],
    rows: [
      { task: "Quoting", before: "Hunt the latest rate in a file, check whether it's still valid", after: "Current rates per lane, flagged 14 days before they expire" },
      { task: "Booking", before: "Details spread over e-mails and a sheet", after: "One booking record from quotation to closed" },
      { task: "Carrier confirmation", before: "Re-type the PDF into your system", after: "The AI reads it; you tick what to save" },
      { task: "Bill of Lading", before: "Fill a template by hand", after: "House B/L generated from the booking" },
      { task: "Invoicing", before: "Copy charges into an invoice file", after: "Drafts from the booking's sale lines, locked when final" },
      { task: "Getting paid", before: "Check the inbox against a list of unpaid invoices", after: "Payment matches proposed from the finance mailbox, confirmed by a person" },
      { task: "The books", before: "Re-enter everything for the accountant", after: "GL, P&L and aging computed live from the same records" },
      { task: "Who changed what", before: "Nobody's sure", after: "Every change in the booking's activity log" },
    ],
  },
  ar: {
    eyebrow: "قبل وبعد",
    title: "ما الذي يتغير حين يعمل المكتب على نظام واحد",
    lead: "تبدأ معظم شركات الشحن بجداول Excel والبريد الإلكتروني وبرنامج محاسبة منفصل. هذا العمل نفسه في Routel.",
    cols: ["المهمة", "جداول وبريد ومحاسبة منفصلة", "مع Routel"],
    rows: [
      { task: "عروض الأسعار", before: "البحث عن آخر سعر في ملف، والتأكد هل ما زال سارياً", after: "أسعار سارية لكل مسار، مع تنبيه قبل انتهائها بـ14 يوماً" },
      { task: "الحجز", before: "التفاصيل موزعة بين الرسائل وجدول بيانات", after: "سجل حجز واحد من عرض السعر حتى الإغلاق" },
      { task: "تأكيد الناقل", before: "إعادة كتابة ملف PDF يدوياً", after: "الذكاء الاصطناعي يقرؤه، وأنت تختار ما يُحفظ" },
      { task: "بوليصة الشحن", before: "تعبئة نموذج يدوياً", after: "بوليصة شحن فرعية تُنشأ من بيانات الحجز" },
      { task: "الفوترة", before: "نسخ الرسوم إلى ملف فاتورة", after: "مسودات من بنود البيع في الحجز، وتُقفل عند الاعتماد" },
      { task: "التحصيل", before: "مراجعة البريد مقابل قائمة الفواتير غير المدفوعة", after: "مطابقات دفعات مقترحة من بريد المالية، يؤكدها شخص" },
      { task: "الدفاتر", before: "إعادة إدخال كل شيء للمحاسب", after: "دفتر الأستاذ والأرباح والخسائر وأعمار الذمم محسوبة مباشرة من السجلات نفسها" },
      { task: "من غيّر ماذا", before: "لا أحد متأكد", after: "كل تغيير في سجل نشاط الحجز" },
    ],
  },
};

export async function Compare() {
  const locale = await getLocale();
  const t = copy[locale];
  return (
    <Section tone="muted" id="compare">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.lead} />
      <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-fog-200">
        <div className="hidden grid-cols-[0.8fr_1.1fr_1.3fr] bg-fog-50 px-6 py-3 text-[12.5px] font-semibold text-fog-500 sm:grid">
          <span>{t.cols[0]}</span>
          <span>{t.cols[1]}</span>
          <span className="text-spark-700">{t.cols[2]}</span>
        </div>
        <RevealGroup className="divide-y divide-fog-100" stagger={0.05} amount={0.1}>
          {t.rows.map((r) => (
            <RevealItem key={r.task} className="grid gap-2 px-6 py-4 sm:grid-cols-[0.8fr_1.1fr_1.3fr] sm:items-center sm:gap-6">
              <p className="font-semibold text-ink-900">{r.task}</p>
              <p className="flex items-start gap-2 text-[14px] leading-snug text-fog-500">
                <X className="mt-0.5 h-4 w-4 shrink-0 text-fog-300" />
                {r.before}
              </p>
              <p className="flex items-start gap-2 text-[14px] font-medium leading-snug text-ink-900">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-spark-500" />
                {r.after}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
