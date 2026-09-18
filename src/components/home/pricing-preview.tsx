import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { PricingTiers } from "@/components/pricing/pricing-tiers";

export function PricingPreview() {
  return (
    <Section id="pricing">
      <SectionHeading
        eyebrow="Pricing"
        title="Simple plans, priced per team"
        description="We're onboarding early-access customers now. Final pricing will be published at general availability; early-access teams keep their rate."
      />
      <div className="mt-14">
        <PricingTiers />
      </div>
      <Reveal className="mt-8 text-center text-sm text-fog-500">
        <Link href="/pricing" className="inline-flex items-center gap-1.5 font-medium text-ink-900 hover:text-teal-700">
          Compare plans in detail
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Reveal>
    </Section>
  );
}
