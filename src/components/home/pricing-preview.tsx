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
    title: "Simple plans, priced per team",
    description:
      "We're onboarding early-access customers now. Final pricing will be published at general availability; early-access teams keep their rate.",
    compare: "Compare plans in detail",
  },
  ar: {
    eyebrow: "الأسعار",
    title: "خطط بسيطة، بسعر لكل فريق",
    description:
      "نعمل الآن على تجهيز عملاء الوصول المبكر. ستُنشر الأسعار النهائية عند الإطلاق العام، وتحتفظ فرق الوصول المبكر بأسعارها.",
    compare: "قارن الخطط بالتفصيل",
  },
} satisfies Record<Locale, { eyebrow: string; title: string; description: string; compare: string }>;

export async function PricingPreview() {
  const locale = await getLocale();
  const t = copy[locale];
  return (
    <Section id="pricing">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.description} />
      <div className="mt-14">
        <PricingTiers />
      </div>
      <Reveal className="mt-8 text-center text-sm text-fog-500">
        <Link href="/pricing" className="inline-flex items-center gap-1.5 font-medium text-ink-900 hover:text-teal-700">
          {t.compare}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Reveal>
    </Section>
  );
}
