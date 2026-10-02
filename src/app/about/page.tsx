import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { site } from "@/lib/site";
import { Cta } from "@/components/home/cta";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} started as ${site.companyShort}'s own internal system for running freight forwarding operations, before it was offered to other forwarders as a hosted service.`,
};

const principles = [
  {
    title: "Built from real operations, not a spec sheet",
    text: "Every module exists because a freight forwarder actually needed it day to day — not because it looked good on a features page.",
  },
  {
    title: "One record, not a patchwork",
    text: "A spreadsheet of rates, a template for quotations, a separate accounting package and a shared drive of PDFs is how a number gets re-typed or a document gets lost. Routel keeps one job record that every department works from.",
  },
  {
    title: "AI that proposes, a person who decides",
    text: "The assistant can read and report freely, but every write — a job, an invoice, an expense — stops as a proposal until someone confirms it. Nothing gets created on a misread sentence.",
  },
  {
    title: "Arabic is not an afterthought",
    text: "The assistant works fully in Arabic or English, switchable mid-conversation, because a meaningful part of the freight-forwarding world runs its business in Arabic.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-fog-200 bg-fog-50 pb-14 pt-16 sm:pt-24">
        <Container>
          <Reveal className="max-w-3xl">
            <h1 className="font-display text-balance text-4xl font-bold leading-[1.05] text-ink-900 sm:text-5xl">
              Built inside a working freight forwarder, not a product lab
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-fog-600">
              {site.name} grew out of the internal system {site.companyShort}, a freight forwarder in Malaysia, uses
              to run its own shipments every day. It was running on real jobs before it had a name — now it&rsquo;s
              offered to other forwarders as a hosted service.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/demo" size="lg">Request a demo</Button>
              <Button href="/platform" variant="secondary" size="lg">See the platform</Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <Section className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="Where it came from"
          title="A system that had to work before it could be sold"
          description={`Most software gets built for a market first and a real customer second. ${site.name} ran the other way: ${site.companyShort} built it to run its own operations, used it on real shipments, and only then opened it up to other forwarders.`}
        />
        <Reveal className="mx-auto mt-10 max-w-3xl text-pretty text-base leading-relaxed text-fog-600">
          That order matters. A feature only made it into the product because a real job needed it — not because it
          would look good on a comparison chart. The result is a platform shaped by how a forwarding office actually
          works: one job, many hands, and a ledger that has to be right at the end of the month.
        </Reveal>
      </Section>

      <Section tone="muted" className="py-16 sm:py-20">
        <SectionHeading eyebrow="What we build around" title="A few things we don't compromise on" />
        <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2" stagger={0.06}>
          {principles.map((p) => (
            <RevealItem key={p.title} className="rounded-2xl border border-fog-200 bg-white p-6 shadow-card">
              <h3 className="font-display text-[16px] font-semibold text-ink-900">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fog-600">{p.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="Where we are now"
          title="Running on real shipments, offered as a hosted service"
          description={`${site.name} is a hosted service run by ${site.company}. See what that looks like on real customer data in our case studies.`}
        />
        <Reveal className="mx-auto mt-6 max-w-2xl text-center">
          <Button href="/case-studies" variant="secondary">Read our case studies</Button>
        </Reveal>
      </Section>

      <Cta />
    </>
  );
}
