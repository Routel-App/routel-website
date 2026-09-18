import { Quote } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";

/**
 * PLACEHOLDER CONTENT.
 * Replace these with real, attributed quotes before launch. Names and
 * companies are intentionally generic so nothing here reads as a real
 * endorsement.
 */
const testimonials = [
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
      "Placeholder quote. Replace with a real comment about generating a House B/L directly from the job.",
    name: "Customer name",
    role: "Founder, regional forwarder",
  },
];

export function Testimonials() {
  return (
    <Section tone="muted">
      <SectionHeading
        eyebrow="From the floor"
        title="What forwarders say after the first month"
        description="Early-access customers are onboarding now. Quotes below are placeholders until we can share their words."
      />
      <RevealGroup className="mt-12 grid gap-4 md:grid-cols-3" stagger={0.08}>
        {testimonials.map((t, i) => (
          <RevealItem key={i} className="flex h-full flex-col rounded-2xl border border-fog-200 bg-white p-6 shadow-card">
            <Quote className="h-5 w-5 text-teal-500" />
            <p className="mt-4 flex-1 text-[15px] leading-relaxed text-fog-700">{t.quote}</p>
            <div className="mt-6 flex items-center gap-3">
              <span className="h-9 w-9 rounded-full bg-[linear-gradient(135deg,var(--color-teal-300),var(--color-ink-700))]" />
              <div>
                <p className="text-sm font-semibold text-ink-900">{t.name}</p>
                <p className="text-xs text-fog-500">{t.role}</p>
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
