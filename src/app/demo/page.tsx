import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { site } from "@/lib/site";
import { DemoForm } from "./demo-form";

export const metadata: Metadata = {
  title: "Request a demo",
  description: "See Routel run a real freight job from quotation to ledger, on your routes and rates.",
};

const agenda = [
  "A job created from your own route and container type",
  "Booking, House B/L and invoice generated from that job",
  "The assistant proposing an invoice and reading a vendor bill",
  "Live P&L, aging and cash position after the invoice posts",
  "Roles: what Operations, Sales and Accounting each see",
];

export default async function DemoPage(props: PageProps<"/demo">) {
  const search = await props.searchParams;
  const plan = typeof search.plan === "string" ? search.plan : undefined;

  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="grid-fade absolute inset-0 -z-10" />
      <Container className="grid gap-14 py-16 sm:py-24 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <Reveal>
          <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-teal-600">Request a demo</p>
          <h1 className="font-display text-balance text-4xl font-extrabold leading-[1.05] text-ink-900 sm:text-5xl">
            Twenty minutes, one real shipment, your numbers.
          </h1>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-fog-600">
            We don&rsquo;t do slide decks. Bring a route you ship often and we&rsquo;ll run it through Routel end to end, live.
          </p>
          <ul className="mt-8 space-y-3">
            {agenda.map((a) => (
              <li key={a} className="flex items-start gap-3 text-[15px] text-fog-700">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {a}
              </li>
            ))}
          </ul>
          <p className="mt-10 text-sm text-fog-500">
            Prefer email? Write to{" "}
            <a href={`mailto:${site.contactEmail}`} className="font-medium text-ink-900 underline decoration-fog-300 underline-offset-4 hover:decoration-ink-900">
              {site.contactEmail}
            </a>
            .
          </p>
        </Reveal>

        <Reveal delay={0.1} className="relative rounded-3xl border border-fog-200 bg-white p-6 shadow-float sm:p-8">
          {plan ? (
            <p className="mb-5 inline-flex rounded-full bg-fog-100 px-3 py-1 text-xs font-medium capitalize text-fog-700">
              Interested in: {plan}
            </p>
          ) : null}
          <DemoForm plan={plan} />
        </Reveal>
      </Container>
    </section>
  );
}
