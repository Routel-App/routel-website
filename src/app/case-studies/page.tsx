import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Cta } from "@/components/home/cta";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "How real forwarders run on Routel today — case studies are being written up with two live customers.",
};

/**
 * PLACEHOLDER CONTENT — real case studies pending.
 * Two customers are live on Routel today and have agreed to be featured;
 * their actual numbers, quotes and details are not yet written up here.
 * Structure is real and ready — replace every [bracketed] field below with
 * the real customer's details and results before this page goes live.
 * Do not fill these in with invented numbers.
 */
const caseStudies = [
  {
    company: "[Customer A — company name pending]",
    industry: "[Industry / trade lane]",
    since: "[Live on Routel since]",
    challenge:
      "[What their operation looked like before Routel — the specific bottleneck or patchwork of tools they were running on.]",
    solution:
      "[Which Routel modules they actually run on day to day, and how their team adopted them.]",
    results: [
      "[Real, measured result #1 — e.g. time saved on a specific task]",
      "[Real, measured result #2 — e.g. change in invoicing turnaround]",
      "[Real, measured result #3 — e.g. reduction in a specific error type]",
    ],
  },
  {
    company: "[Customer B — company name pending]",
    industry: "[Industry / trade lane]",
    since: "[Live on Routel since]",
    challenge:
      "[What their operation looked like before Routel — the specific bottleneck or patchwork of tools they were running on.]",
    solution:
      "[Which Routel modules they actually run on day to day, and how their team adopted them.]",
    results: [
      "[Real, measured result #1]",
      "[Real, measured result #2]",
      "[Real, measured result #3]",
    ],
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <section className="border-b border-fog-200 bg-fog-50 pb-14 pt-16 sm:pt-24">
        <Container>
          <Reveal className="max-w-3xl">
            <h1 className="font-display text-balance text-4xl font-bold leading-[1.05] text-ink-900 sm:text-5xl">
              Real forwarders, running on Routel today
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-fog-600">
              Two customers are live on Routel&rsquo;s full system right now. We&rsquo;re writing up their numbers
              properly rather than publishing anything before it&rsquo;s verified — the structure below is ready,
              and the real figures are coming.
            </p>
          </Reveal>
        </Container>
      </section>

      <Section className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="Coming soon"
          title="These two write-ups are in progress"
          description="Every field below is a placeholder for a real customer's real numbers — not a projection, not an example. Check back, or ask us directly when you request a demo."
        />
        <RevealGroup className="mt-10 grid gap-6 lg:grid-cols-2" stagger={0.08}>
          {caseStudies.map((c) => (
            <RevealItem key={c.company} className="flex flex-col rounded-2xl border border-dashed border-fog-300 bg-fog-50 p-7">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-fog-500">{c.industry}</p>
              <h3 className="font-display mt-2 text-xl font-bold text-ink-900">{c.company}</h3>
              <p className="mt-1 text-xs text-fog-500">{c.since}</p>

              <div className="mt-5">
                <p className="text-[13px] font-semibold text-ink-900">The challenge</p>
                <p className="mt-1 text-sm leading-relaxed text-fog-600">{c.challenge}</p>
              </div>
              <div className="mt-4">
                <p className="text-[13px] font-semibold text-ink-900">The solution</p>
                <p className="mt-1 text-sm leading-relaxed text-fog-600">{c.solution}</p>
              </div>
              <div className="mt-4">
                <p className="text-[13px] font-semibold text-ink-900">The results</p>
                <ul className="mt-1 space-y-1">
                  {c.results.map((r) => (
                    <li key={r} className="text-sm leading-relaxed text-fog-600">
                      • {r}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal className="mx-auto mt-10 max-w-xl text-center">
          <p className="text-sm text-fog-500">
            Want the real detail now, ahead of publication? Ask for it directly.
          </p>
          <Button href="/demo" variant="secondary" className="mt-4">
            Request a demo
          </Button>
        </Reveal>
      </Section>

      <Cta />
    </>
  );
}
