import { Quote } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { getLocale } from "@/lib/locale-server";
import type { Locale } from "@/lib/i18n";

/**
 * PLACEHOLDER CONTENT.
 * Replace these with real, attributed quotes before launch. Names and
 * companies are intentionally generic so nothing here reads as a real
 * endorsement.
 */
type Testimonial = { quote: string; name: string; role: string };

type Copy = {
  eyebrow: string;
  title: string;
  description: string;
  testimonials: Testimonial[];
};

const testimonialsEn: Testimonial[] = [
  {
    quote:
      "Placeholder quote. Replace with a real customer's words about getting operations and accounting into one system.",
    name: "Customer name",
    role: "Operations Manager, freight forwarder",
  },
  {
    quote:
      "Placeholder quote. Replace with a real comment about the AI assistant proposing invoices or reading vendor bills.",
    name: "Customer name",
    role: "Finance Lead, NVOCC",
  },
  {
    quote:
      "Placeholder quote. Replace with a real comment about generating a House B/L directly from the booking.",
    name: "Customer name",
    role: "Founder, regional forwarder",
  },
];

const testimonialsAr: Testimonial[] = [
  {
    quote: "اقتباس مؤقت. يُستبدل بكلمات عميل حقيقي عن جمع العمليات والمحاسبة في نظام واحد.",
    name: "اسم العميل",
    role: "مدير العمليات، شركة شحن",
  },
  {
    quote: "اقتباس مؤقت. يُستبدل بتعليق حقيقي عن المساعد الذكي وهو يقترح الفواتير أو يقرأ فواتير الموردين.",
    name: "اسم العميل",
    role: "مسؤول المالية، NVOCC",
  },
  {
    quote: "اقتباس مؤقت. يُستبدل بتعليق حقيقي عن إصدار بوليصة الشحن الفرعية (House B/L) مباشرة من الحجز.",
    name: "اسم العميل",
    role: "المؤسس، شركة شحن إقليمية",
  },
];

const copy = {
  en: {
    eyebrow: "From the floor",
    title: "What forwarders say after the first month",
    description:
      "Early-access customers are onboarding now. Quotes below are placeholders until we can share their words.",
    testimonials: testimonialsEn,
  },
  ar: {
    eyebrow: "من الميدان",
    title: "ماذا يقول وكلاء الشحن بعد الشهر الأول",
    description: "نعمل الآن على تجهيز عملاء الوصول المبكر. الاقتباسات أدناه مؤقتة إلى أن نتمكن من مشاركة كلماتهم.",
    testimonials: testimonialsAr,
  },
} satisfies Record<Locale, Copy>;

export async function Testimonials() {
  const locale = await getLocale();
  const t = copy[locale];
  return (
    <Section tone="cream">
      <SectionHeading eyebrowTone="spark" eyebrow={t.eyebrow} title={t.title} description={t.description} />
      <RevealGroup className="mt-12 grid gap-4 md:grid-cols-3" stagger={0.08}>
        {t.testimonials.map((q, i) => (
          <RevealItem key={i} className="flex h-full flex-col rounded-2xl border border-spark-100 bg-white p-6 shadow-card">
            <Quote className="h-5 w-5 text-spark-400" />
            <p className="mt-4 flex-1 text-[15px] leading-relaxed text-fog-700">{q.quote}</p>
            <div className="mt-6 flex items-center gap-3">
              <span className="h-9 w-9 rounded-full bg-[linear-gradient(135deg,var(--color-spark-300),var(--color-ink-700))]" />
              <div>
                <p className="text-sm font-semibold text-ink-900">{q.name}</p>
                <p className="text-xs text-fog-500">{q.role}</p>
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
