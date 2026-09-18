import { Anchor, CalendarCheck, ChartColumn, Receipt, Route, Ship } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";

const steps = [
  { icon: Route, title: "Quote", text: "Pick the vendor rate for the route and container type. Send the quotation." },
  { icon: Ship, title: "Job", text: "Convert the quote. POL, POD, containers and B/L numbers live on the job." },
  { icon: CalendarCheck, title: "Book", text: "Record the vessel booking and attach the carrier’s confirmation." },
  { icon: Anchor, title: "Bill of Lading", text: "Generate the House B/L and container annexure from the job." },
  { icon: Receipt, title: "Invoice", text: "Bill the customer in MYR or USD. Track payment and credit." },
  { icon: ChartColumn, title: "Report", text: "Margin, aging and cash position update themselves." },
];

export function Workflow() {
  return (
    <Section tone="muted">
      <SectionHeading
        eyebrow="One thread from enquiry to cash"
        title="A shipment moves through Routel the way it moves through your office"
        description="Every step reuses the data from the one before it. Operations, sales and accounting look at the same job, not three versions of it."
      />
      <RevealGroup className="relative mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-6" stagger={0.08}>
        <div aria-hidden className="absolute left-0 right-0 top-[38px] hidden h-px bg-fog-300 lg:block" />
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <RevealItem key={s.title} className="relative">
              <div className="flex items-center gap-3 lg:flex-col lg:items-start">
                <span className="relative z-10 flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-2xl border border-fog-200 bg-white text-teal-700 shadow-card">
                  <Icon className="h-6 w-6" strokeWidth={1.6} />
                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-ink-900 font-mono text-[11px] font-semibold text-white">
                    {i + 1}
                  </span>
                </span>
                <div>
                  <h3 className="font-display mt-0 text-[16px] font-semibold text-ink-900 lg:mt-4">{s.title}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-fog-600">{s.text}</p>
                </div>
              </div>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
