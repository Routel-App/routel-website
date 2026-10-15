import { Anchor, CalendarCheck, ChartColumn, Receipt, Route, Ship } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { getLocale } from "@/lib/locale-server";
import type { Locale } from "@/lib/i18n";

const icons = [Route, Ship, CalendarCheck, Anchor, Receipt, ChartColumn];

type Copy = {
  eyebrow: string;
  title: string;
  description: string;
  steps: { title: string; text: string }[];
};

const copy = {
  en: {
    eyebrow: "One thread from enquiry to cash",
    title: "A shipment moves through Routel the way it moves through your office",
    description:
      "Every step reuses the data from the one before it. Operations, sales and accounting look at the same booking, not three versions of it.",
    steps: [
      { title: "Quote", text: "Pick the vendor rate for the route and container type. Send the quotation." },
      { title: "Booking", text: "Convert the accepted quotation into a booking. The chosen route’s charges come with it." },
      { title: "Carrier booking", text: "Let the AI read the carrier’s confirmation, then issue your Booking Confirmation." },
      { title: "Bill of Lading", text: "Generate the House B/L and container annexure from the booking." },
      { title: "Invoice", text: "Invoice the booking’s sale charges in MYR or USD. Track payment and credit." },
      { title: "Report", text: "Margin, aging and cash position update themselves." },
    ],
  },
  ar: {
    eyebrow: "مسار واحد من الاستفسار إلى التحصيل",
    title: "تنتقل الشحنة في Routel بالطريقة نفسها التي تنتقل بها في مكتبك",
    description:
      "كل خطوة تعيد استخدام بيانات الخطوة التي قبلها. فرق العمليات والمبيعات والمحاسبة تعمل على الحجز نفسه، لا على ثلاث نسخ منه.",
    steps: [
      { title: "عرض السعر", text: "اختر سعر المورّد للمسار ونوع الحاوية، ثم أرسل عرض السعر." },
      { title: "الحجز", text: "حوّل عرض السعر المقبول إلى حجز، فتنتقل معه رسوم المسار الذي اخترته." },
      { title: "حجز الناقل", text: "دع الذكاء الاصطناعي يقرأ تأكيد الناقل، ثم أصدر تأكيد الحجز لعميلك." },
      { title: "بوليصة الشحن", text: "أصدر بوليصة الشحن الفرعية (House B/L) وملحق الحاويات من الحجز." },
      { title: "الفاتورة", text: "أصدر فاتورة برسوم البيع في الحجز، بالريال أو الدولار، وتابع المدفوعات والائتمان." },
      { title: "التقارير", text: "هامش الربح وأعمار الذمم والوضع النقدي تتحدّث تلقائياً." },
    ],
  },
} satisfies Record<Locale, Copy>;

export async function Workflow() {
  const locale = await getLocale();
  const t = copy[locale];
  const steps = t.steps.map((s, i) => ({ ...s, icon: icons[i] }));
  return (
    <Section tone="muted">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.description} />
      <RevealGroup className="relative mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-6" stagger={0.08}>
        <div aria-hidden className="absolute left-0 right-0 top-[38px] hidden h-px bg-fog-300 lg:block" />
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <RevealItem key={s.title} className="relative">
              <div className="flex items-center gap-3 lg:flex-col lg:items-start">
                <span className="relative z-10 flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-2xl border border-fog-200 bg-white text-spark-700 shadow-card">
                  <Icon className="h-6 w-6" strokeWidth={1.6} />
                  <span className="absolute -end-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-ink-900 font-mono text-[11px] font-semibold text-white">
                    {i + 1}
                  </span>
                </span>
                <div>
                  <h3 className="font-display mt-0 text-[16px] font-semibold text-ink-900 lg:mt-4">{s.title}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-fog-600">{s.text}</p>
                </div>
              </div>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
