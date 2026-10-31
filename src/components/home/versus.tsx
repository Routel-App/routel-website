import { Check, Minus } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { getLocale } from "@/lib/locale-server";
import type { Locale } from "@/lib/i18n";

type Row = { topic: string; them: string; us: string };
type Copy = { eyebrow: string; title: string; lead: string; cols: [string, string, string]; rows: Row[]; note: string };

/**
 * Routel against the traditional freight and logistics systems, as a
 * category. Built from the approved pitch points in the Routel system
 * repository (docs/business-context.md): no vendor named, no unconfirmed
 * competitor prices, no implementation durations.
 */
const copy: Record<Locale, Copy> = {
  en: {
    eyebrow: "ROUTEL vs traditional systems",
    title: "Built for how logistics companies work now",
    lead: "Traditional freight and logistics software was built for an era of forms, menus and implementation projects. ROUTEL starts from an AI that does the work, under your control.",
    cols: ["", "Traditional systems", "ROUTEL"],
    rows: [
      { topic: "Prices", them: "The big systems don't publish prices: you start with a demo and a quote", us: "Published prices, from $149 a month, never per shipment" },
      { topic: "Getting started", them: "An implementation project, with its fees", us: "Set up by chat with the AI assistant, no implementation fees" },
      { topic: "Data entry", them: "Typed in by hand, or scanned and re-checked", us: "AI reads carrier confirmations, B/Ls, vendor bills and agreements; a person confirms" },
      { topic: "Daily work", them: "Menus and forms to learn screen by screen", us: "Ask in a sentence; the assistant calls the system's own tools" },
      { topic: "How it's sold", them: "Each line of business as a separate product", us: "One system; each service opens as a module of your activities" },
      { topic: "The books", them: "Finance reconciled against operations after the fact", us: "Every invoice, payment and cost posts to the ledger as it happens" },
      { topic: "Control over automation", them: "Rules and integrations running in the background", us: "Every AI write waits for a person's confirmation, and is logged" },
      { topic: "Arabic and local tax", them: "Varies by vendor", us: "Full Arabic, right to left; Saudi VAT invoices with the ZATCA QR code" },
    ],
    note: "Compared with traditional systems as a category, not with any one vendor.",
  },
  ar: {
    eyebrow: "ROUTEL مقابل الأنظمة التقليدية",
    title: "مبني لطريقة عمل شركات الشحن اليوم",
    lead: "بُنيت أنظمة الشحن والخدمات اللوجستية التقليدية لعصر النماذج والقوائم ومشاريع التطبيق. أما ROUTEL فيبدأ من ذكاء اصطناعي ينجز العمل، تحت سيطرتك.",
    cols: ["", "الأنظمة التقليدية", "ROUTEL"],
    rows: [
      { topic: "الأسعار", them: "الأنظمة الكبيرة لا تنشر أسعارها: تبدأ بعرض تجريبي وطلب تسعير", us: "أسعار منشورة، تبدأ من 149 دولاراً شهرياً، ولا رسوم على كل شحنة" },
      { topic: "البداية", them: "مشروع تطبيق، برسومه", us: "تجهيز بالمحادثة مع المساعد الذكي، بلا رسوم تطبيق" },
      { topic: "إدخال البيانات", them: "يُكتب يدوياً، أو يُمسح ضوئياً ثم يُراجع", us: "الذكاء الاصطناعي يقرأ تأكيدات الناقل والبوالص وفواتير الموردين والاتفاقيات، ويؤكد شخص" },
      { topic: "العمل اليومي", them: "قوائم ونماذج تُتعلَّم شاشة بشاشة", us: "اطلب بجملة، والمساعد يستدعي أدوات النظام نفسه" },
      { topic: "طريقة البيع", them: "كل نشاط منتج منفصل", us: "نظام واحد، وكل خدمة تُفتح وحدةً حسب أنشطتك" },
      { topic: "الدفاتر", them: "المالية تُطابَق مع العمليات بعد وقوعها", us: "كل فاتورة ودفعة وتكلفة تُرحَّل إلى دفتر الأستاذ لحظة تسجيلها" },
      { topic: "السيطرة على الأتمتة", them: "قواعد وتكاملات تعمل في الخلفية", us: "كل عملية كتابة بالذكاء الاصطناعي تنتظر تأكيد شخص، وتُسجَّل" },
      { topic: "العربية والضرائب المحلية", them: "تختلف من مزوّد لآخر", us: "عربية كاملة من اليمين لليسار، وفواتير ضريبة القيمة المضافة السعودية برمز ZATCA" },
    ],
    note: "المقارنة مع الأنظمة التقليدية كفئة، لا مع مزوّد بعينه.",
  },
};

/** `withPrices` keeps the prices row; the home page leaves it out, prices live on the pricing page. */
export async function Versus({ withPrices = true }: { withPrices?: boolean }) {
  const t = copy[await getLocale()];
  const rows = withPrices ? t.rows : t.rows.slice(1);
  return (
    <Section id="versus" tone="muted">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.lead} />
      <Reveal className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-fog-200">
        <div className="hidden grid-cols-[9.5rem_1fr_1fr] border-b border-fog-200 bg-fog-50 text-[12px] font-semibold uppercase tracking-[0.1em] md:grid">
          <span className="px-6 py-4 text-fog-500">{t.cols[0]}</span>
          <span className="px-6 py-4 text-fog-500">{t.cols[1]}</span>
          <span className="bg-ink-900 px-6 py-4 text-spark-400">{t.cols[2]}</span>
        </div>
        <ul>
          {rows.map((r) => (
            <li key={r.topic} className="grid border-b border-fog-100 last:border-b-0 md:grid-cols-[9.5rem_1fr_1fr]">
              <p className="px-6 pb-1 pt-5 font-display text-[15px] font-bold text-ink-900 md:py-5">{r.topic}</p>
              <p className="flex items-start gap-2.5 px-6 py-2 text-[14px] leading-relaxed text-fog-600 md:py-5">
                <Minus className="mt-1 h-4 w-4 shrink-0 text-fog-400" aria-hidden />
                <span>
                  <span className="sr-only md:hidden">{t.cols[1]}: </span>
                  {r.them}
                </span>
              </p>
              <p className="flex items-start gap-2.5 bg-spark-50/60 px-6 pb-5 pt-2 text-[14px] font-medium leading-relaxed text-ink-900 md:py-5">
                <Check className="mt-1 h-4 w-4 shrink-0 text-spark-600" strokeWidth={3} aria-hidden />
                <span>
                  <span className="sr-only md:hidden">{t.cols[2]}: </span>
                  {r.us}
                </span>
              </p>
            </li>
          ))}
        </ul>
      </Reveal>
      <p className="mt-5 text-center text-[12.5px] text-fog-500">{t.note}</p>
    </Section>
  );
}
