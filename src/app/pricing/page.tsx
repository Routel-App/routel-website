import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { PricingTiers } from "@/components/pricing/pricing-tiers";
import { Cta } from "@/components/home/cta";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Routel plans for freight forwarders: Free, Growth ($79/mo), Pro ($149/mo) and Enterprise ($300/mo).",
};

const faqs = [
  {
    q: "What do I get on the Free plan?",
    a: "A single admin user, up to 3 jobs total (a lifetime cap, not monthly) with up to 2 invoices per job — enough to try Routel on real shipments before you commit.",
  },
  {
    q: "What happens when I outgrow a plan?",
    a: "Nothing is hidden. Every page in the product is visible on every plan — anything beyond your tier shows a lock icon and an upgrade prompt instead of the real page, so you always see the whole product.",
  },
  {
    q: "Is the AI assistant an add-on?",
    a: "No — it's included in Pro and Enterprise. It uses the same permissions as your users' roles and never saves anything without a confirmation.",
  },
  {
    q: "Which currencies are supported?",
    a: "Invoicing and books run in MYR and USD today, with vendor costs converted at the exchange rate you record on the job.",
  },
  {
    q: "Can we migrate from spreadsheets or another system?",
    a: "Talk to us when you request a demo — our team can help bring over your customers, vendors and route rates.",
  },
  {
    q: "Where is Routel hosted?",
    a: "Free, Growth and Pro run on a shared Routel server with your own isolated database. Enterprise gets a fully dedicated server. Ask us about regional hosting requirements when you request a demo.",
  },
  {
    q: "What does 'user' mean?",
    a: "A named login with a role suited to their job, such as Accounting or Operations. Free is single-admin only; Growth and up add staff accounts with role-based permissions.",
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
