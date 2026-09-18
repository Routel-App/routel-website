import { Check } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/* Small, hand-drawn "illustrations" built from markup so they stay crisp
   and match the palette. Each one hints at the real screen behind it. */

function ChainIllustration() {
  const chips = ["Quote", "Job", "B/L", "Invoice"];
  return (
    <div className="flex items-center gap-2">
      {chips.map((c, i) => (
        <div key={c} className="flex items-center gap-2">
          <span
            className={cn(
              "rounded-lg border px-2.5 py-1.5 font-mono text-[11px] font-medium",
              i === chips.length - 1 ? "border-teal-300 bg-teal-100 text-teal-900" : "border-teal-200/70 bg-white text-teal-800",
            )}
          >
            {c}
          </span>
          {i < chips.length - 1 ? <span className="h-px w-4 bg-teal-300" /> : null}
        </div>
      ))}
    </div>
  );
}

function MarginIllustration() {
  const bars = [
    { label: "Revenue", w: "100%", cls: "bg-ink-900" },
    { label: "Cost", w: "66%", cls: "bg-spark-300" },
    { label: "Profit", w: "34%", cls: "bg-teal-500" },
  ];
  return (
    <div className="space-y-2">
      {bars.map((b) => (
        <div key={b.label} className="grid grid-cols-[52px_1fr] items-center gap-3 text-[11px]">
          <span className="text-fog-600">{b.label}</span>
          <div className="h-2.5 rounded-full bg-white/70">
            <div className={cn("h-full rounded-full", b.cls)} style={{ width: b.w }} />
          </div>
        </div>
      ))}
      <p className="pt-1 font-mono text-[11px] text-teal-800">33.3% margin · updates as costs land</p>
    </div>
  );
}

function BalancedIllustration() {
  return (
    <div className="rounded-lg border border-fog-200 bg-white p-3 font-mono text-[11px]">
      <div className="flex justify-between text-fog-500">
        <span>Trial balance</span>
        <span>Aug 2026</span>
      </div>
      <div className="mt-2 flex justify-between text-ink-900">
        <span>Debits</span>
        <span>1,284,310.00</span>
      </div>
      <div className="flex justify-between text-ink-900">
        <span>Credits</span>
        <span>1,284,310.00</span>
      </div>
      <div className="mt-2 flex items-center gap-1.5 border-t border-fog-200 pt-2 text-teal-700">
        <Check className="h-3 w-3" strokeWidth={3} /> balanced, no journal entries
      </div>
    </div>
  );
}

function RolesIllustration() {
  return (
    <div className="flex flex-wrap gap-1.5">
      {["Admin", "Management", "Accounting", "Operations", "Sales"].map((r, i) => (
        <span
          key={r}
          className={cn(
            "rounded-full px-2.5 py-1 font-mono text-[10.5px] font-semibold",
            i === 3 ? "bg-ink-900 text-white" : "bg-white text-fog-700 ring-1 ring-fog-200",
          )}
        >
          {r}
        </span>
      ))}
    </div>
  );
}

function ConfirmIllustration() {
  return (
    <div className="rounded-lg border border-spark-200 bg-white p-3">
      <p className="text-[11px] font-semibold text-ink-900">Proposed: record rent, MYR 6,500</p>
      <p className="text-[10.5px] text-fog-500">posts to 6100 · Rent &amp; utilities</p>
      <div className="mt-2 flex gap-1.5">
        <span className="rounded-md bg-ink-900 px-2.5 py-1 text-[10.5px] font-semibold text-white">Confirm</span>
        <span className="rounded-md bg-fog-100 px-2.5 py-1 text-[10.5px] font-medium text-ink-900">Edit</span>
      </div>
    </div>
  );
}

const outcomes = [
  {
    title: "One record, zero re-keying",
    text: "The quotation becomes the job. The job produces the B/L and the invoice. Nobody types a container number twice.",
    tint: "bg-teal-50 border-teal-100",
    illustration: <ChainIllustration />,
    large: true,
  },
  {
    title: "Margin on every job, as it happens",
    text: "Vendor costs land against the job in their own currency, converted at the rate you recorded. Gross profit is visible before the file closes.",
    tint: "bg-spark-50 border-spark-100",
    illustration: <MarginIllustration />,
    large: true,
  },
  {
    title: "Close the month in minutes",
    text: "Every invoice, payment and expense posts to the ledger when it is saved. Reports read from there.",
    tint: "bg-fog-50 border-fog-200",
    illustration: <BalancedIllustration />,
  },
  {
    title: "Everyone sees their part",
    text: "Five roles decide who sees what, in every screen and in the assistant.",
    tint: "bg-white border-fog-200",
    illustration: <RolesIllustration />,
  },
  {
    title: "AI you can trust with the books",
    text: "It proposes. A person confirms. Nothing is saved on a misread sentence.",
    tint: "bg-spark-50/60 border-spark-100",
    illustration: <ConfirmIllustration />,
  },
];

export function Outcomes() {
  return (
    <Section className="pt-20 sm:pt-24">
      <SectionHeading
        eyebrow="Why forwarders switch"
        title="Less chasing, fewer spreadsheets, a margin you can see"
        description="Routel is built around the way a forwarding office actually works: one job, many hands, and a ledger that has to be right."
      />
      <RevealGroup className="mt-14 grid gap-4 md:grid-cols-6" stagger={0.07}>
        {outcomes.map((o) => (
          <RevealItem
            key={o.title}
            className={cn(
              "flex flex-col rounded-2xl border p-6 transition-transform duration-300 ease-out hover:-translate-y-0.5",
              o.tint,
              o.large ? "md:col-span-3" : "md:col-span-2",
            )}
          >
            <h3 className="font-display text-xl font-bold text-ink-900">{o.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-fog-600">{o.text}</p>
            <div className="mt-6 flex-1" />
            <div className="mt-4">{o.illustration}</div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
