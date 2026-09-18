import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { PricingTiers } from "@/components/pricing/pricing-tiers";
import { Cta } from "@/components/home/cta";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Routel plans for freight forwarders: Starter, Growth and Enterprise. Early-access pricing announced at launch.",
};

const faqs = [
  {
    q: "When will prices be published?",
    a: "At general availability. Early-access customers are onboarded on an agreed rate and keep it after launch.",
  },
  {
    q: "Is the AI assistant an add-on?",
    a: "No. It's included in Growth and Enterprise. It uses the same permissions as your users' roles and never saves anything without a confirmation.",
  },
  {
    q: "Which currencies are supported?",
    a: "Invoicing and books run in MYR and USD today, with vendor costs converted at the exchange rate you record on the job.",
  },
  {
    q: "Can we migrate from spreadsheets or another system?",
    a: "Yes. Enterprise includes data migration; on Growth we provide import templates for customers, vendors and route rates.",
  },
  {
    q: "Where is Routel hosted?",
    a: "Routel is a hosted service run by Flamingo Global. Ask us about regional hosting requirements when you request a demo.",
  },
  {
    q: "What does 'user' mean?",
    a: "A named login with a role (Admin, Management, Accounting, Operations or Sales). Roles decide what each user sees and can do.",
  },
];

export default function PricingPage() {
  return (
    <>
      <Section className="pb-10 pt-16 sm:pt-24">
        <SectionHeading
          eyebrow="Pricing"
          title="Plans that grow with the number of people, not the number of shipments"
          description="No per-shipment fees. Pick the plan that matches your team and add users as you grow."
        />
        <div className="mt-14">
          <PricingTiers />
        </div>
      </Section>

      <Section tone="muted" className="py-16 sm:py-20">
        <SectionHeading title="Questions we get asked" />
        <Reveal className="mx-auto mt-10 grid max-w-4xl gap-x-10 gap-y-8 sm:grid-cols-2">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-display text-[16px] font-semibold text-ink-900">{f.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fog-600">{f.a}</p>
            </div>
          ))}
        </Reveal>
      </Section>
      <div className="pt-16">
        <Cta />
      </div>
    </>
  );
}
