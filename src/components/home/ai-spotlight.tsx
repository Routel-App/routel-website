import { ArrowRight, FileSearch, Languages, Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ChatMockup } from "./chat-mockup";

const capabilities = [
  "Create and update jobs and bookings",
  "Generate quotations and route rates",
  "Create customer invoices",
  "Record expenses",
  "Read an uploaded vendor invoice and propose the cost lines",
  "Generate customer and vendor statements as PDF",
  "Run overdue, aging, profitability and cash-position reports",
  "Search and download shipment documents",
];

const guarantees = [
  {
    icon: ShieldCheck,
    title: "Propose, review, confirm",
    text: "Every write goes through a proposal card. Nothing is saved until a person confirms it. There is no silent auto-execution.",
  },
  {
    icon: Lock,
    title: "Same permissions as the UI",
    text: "The assistant is gated by the same role-based access as every screen. Sales can't post to the ledger by asking nicely.",
  },
  {
    icon: Languages,
    title: "Arabic and English",
    text: "Staff talk to it in whichever language they think in. Mixed sentences work too.",
  },
  {
    icon: FileSearch,
    title: "Reads your paperwork",
    text: "Upload a vendor invoice and it extracts the line items into a proposed vendor cost, ready to check.",
  },
];

export function AiSpotlight() {
  return (
    <Section id="assistant" tone="dark" className="overflow-hidden">
      <div aria-hidden className="grid-fade-dark absolute inset-0 -z-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-10 h-[560px] w-[560px] rounded-full bg-[radial-gradient(closest-side,rgb(245_133_11/0.14),transparent)]"
      />
      <div className="relative grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div>
          <Reveal>
            <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-spark-300">AI Assistant</p>
            <h2 className="font-display text-balance text-3xl font-bold leading-[1.08] text-white sm:text-4xl lg:text-[2.75rem]">
              An assistant that does the work, not just the talking.
            </h2>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-white/70">
              Most “AI features” summarise. Routel’s assistant is wired into the same actions your team performs by hand:
              it drafts the job, the invoice, the vendor cost or the report, shows you exactly what it will save, and waits
              for your confirmation.
            </p>
          </Reveal>

          <RevealGroup className="mt-8 grid gap-x-8 gap-y-2 sm:grid-cols-2" stagger={0.05}>
            {capabilities.map((c) => (
              <RevealItem key={c} className="flex items-start gap-2.5 text-sm text-white/80">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-spark-400" />
                {c}
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1} className="mt-8">
            <Button href="/docs/ai-assistant" variant="inverse">
              How the assistant works
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Reveal>
        </div>

        <Reveal amount={0.15} className="relative">
          <ChatMockup />
        </Reveal>
      </div>

      <RevealGroup className="relative mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
        {guarantees.map((g) => {
          const Icon = g.icon;
          return (
            <RevealItem
              key={g.title}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-6 backdrop-blur-sm transition-colors hover:bg-white/[0.06]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06] text-teal-300 ring-1 ring-inset ring-white/10">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <h3 className="font-display mt-4 text-[16px] font-semibold text-white">{g.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{g.text}</p>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
