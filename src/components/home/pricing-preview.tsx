import Link from "@/components/i18n/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { PricingTiers } from "@/components/pricing/pricing-tiers";
import { getLocale } from "@/lib/locale-server";
import type { Locale } from "@/lib/i18n";

const copy = {
  en: {
    eyebrow: "Pricing",
    title: "Priced by what your company does",
    description: "No per-shipment fees. The first 20 companies get 30% off, with their price locked for two years.",
    compare: "Compare plans in detail",
  },
  ar: {
    eyebrow: "الأسعار",
    title: "بسعر يناسب نشاط شركتك",
    description: "لا رسوم على كل شحنة. أول 20 شركة تحصل على خصم 30% مع تثبيت السعر لسنتين.",
    compare: "قارن الخطط بالتفصيل",
  },
} satisfies Record<Locale, { eyebrow: string; title: string; description: string; compare: string }>;

export async function PricingPreview() {
  const locale = await getLocale();
  const t = copy[locale];
  return (
    <Section id="pricing" tone="muted">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.description} />
      <div className="mt-14">
        <PricingTiers withComing={false} />
      </div>
      <Reveal className="mt-8 text-center text-sm text-fog-500">
        <Link href="/pricing" className="inline-flex items-center gap-1.5 font-medium text-ink-900 hover:text-spark-700">
          {t.compare}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Reveal>
    </Section>
  );
}
