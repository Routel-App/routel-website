import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { planName } from "@/components/pricing/pricing-tiers";
import type { Locale } from "@/lib/i18n";
import { getLocale } from "@/lib/locale-server";
import { DemoForm } from "./demo-form";

const copy = {
  en: {
    metaTitle: "Request a demo",
    metaDescription: "See Routel run a real freight booking from quotation to ledger, on your routes and rates.",
    eyebrow: "Request a demo",
    title: "Twenty minutes, one real shipment, your numbers.",
    lead: "We don’t do slide decks. Bring a route you ship often and we’ll run it through Routel end to end, live.",
    interested: "Interested in:",
    agenda: [
      "A quotation on your own route and container type, converted into a booking",
      "Booking Confirmation, House B/L and invoice generated from that booking",
      "The assistant proposing an invoice and reading a vendor bill",
      "Live P&L, aging and cash position after the invoice posts",
      "Roles: what Operations, Sales and Accounting each see",
    ],
  },
  ar: {
    metaTitle: "اطلب عرضاً تجريبياً",
    metaDescription: "شاهد Routel يدير حجزاً حقيقياً من عرض السعر حتى دفتر الأستاذ، على خطوطك وأسعارك.",
    eyebrow: "اطلب عرضاً تجريبياً",
    title: "عشرون دقيقة، شحنة حقيقية واحدة، وأرقامك أنت.",
    lead: "لا نعرض شرائح تقديمية. أحضر خط شحن تتعامل معه كثيراً، وسنمرّره عبر Routel من البداية إلى النهاية، مباشرةً.",
    interested: "الباقة التي تهمك:",
    agenda: [
      "عرض سعر على مسارك ونوع الحاوية الخاص بك، يتحول إلى حجز",
      "تأكيد الحجز وبوليصة الشحن الفرعية (House B/L) والفاتورة، تُنشأ كلها من الحجز نفسه",
      "المساعد الذكي يقترح فاتورة ويقرأ فاتورة مورّد",
      "الربح والخسارة (P&L) وأعمار الذمم والوضع النقدي مباشرةً بعد ترحيل الفاتورة",
      "الأدوار: ما يراه كل من فريق العمليات والمبيعات والمحاسبة",
    ],
  },
} satisfies Record<
  Locale,
  {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    title: string;
    lead: string;
    interested: string;
    agenda: string[];
  }
>;

export async function generateMetadata(): Promise<Metadata> {
  const t = copy[await getLocale()];
  return { title: t.metaTitle, description: t.metaDescription };
}

export default async function DemoPage(props: PageProps<"/[lang]/demo">) {
  const locale = await getLocale();
  const t = copy[locale];
  const search = await props.searchParams;
  const plan = typeof search.plan === "string" ? search.plan : undefined;
  const planLabel = plan && locale !== "en" ? (planName(plan, locale) ?? plan) : plan;

  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="grid-fade absolute inset-0 -z-10" />
      <Container className="grid gap-14 py-16 sm:py-24 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <Reveal>
          <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-teal-600">{t.eyebrow}</p>
          <h1 className="font-display text-balance text-4xl font-extrabold leading-[1.05] text-ink-900 sm:text-5xl">
            {t.title}
          </h1>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-fog-600">{t.lead}</p>
          <ul className="mt-8 space-y-3">
            {t.agenda.map((a) => (
              <li key={a} className="flex items-start gap-3 text-[15px] text-fog-700">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {a}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="relative rounded-3xl border border-fog-200 bg-white p-6 shadow-float sm:p-8">
          {plan ? (
            <p className="mb-5 inline-flex rounded-full bg-fog-100 px-3 py-1 text-xs font-medium capitalize text-fog-700">
              {t.interested} {planLabel}
            </p>
          ) : null}
          <DemoForm plan={plan} />
        </Reveal>
      </Container>
    </section>
  );
}
