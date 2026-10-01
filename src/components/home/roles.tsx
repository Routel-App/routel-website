import { Section, SectionHeading } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";

const roles = [
  { name: "Admin", sees: "Everything, plus users, roles and expense categories." },
  { name: "Management", sees: "All jobs and every report: P&L, cash position, profitability." },
  { name: "Accounting", sees: "Invoices, payments, notes, statements, the ledger and reports." },
  { name: "Operations", sees: "Jobs, bookings, containers, B/Ls and shipment documents." },
  { name: "Sales", sees: "Quotations, built on current rates, and their customers' jobs." },
  { name: "Pricing", sees: "Vendor buying rates by route, container type and validity window." },
];

export function Roles() {
  return (
    <Section>
      <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.4fr]">
        <SectionHeading
          align="left"
          eyebrow="Role-based access"
          title="Everyone sees their job. Nobody sees more."
          description="Six named roles, enforced the same way in every module and in the assistant. Permissions aren't a setting on a screen; they're a rule the whole system follows."
        />
        <RevealGroup className="grid gap-3 sm:grid-cols-2" stagger={0.06}>
          {roles.map((r) => (
            <RevealItem
              key={r.name}
              className="rounded-xl border border-fog-200 bg-white p-5 shadow-card transition-colors hover:border-fog-300"
            >
              <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-teal-700">{r.name}</p>
              <p className="mt-2 text-sm leading-relaxed text-fog-600">{r.sees}</p>
            </RevealItem>
          ))}
          <RevealItem className="rounded-xl border border-dashed border-fog-300 bg-fog-50 p-5">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-fog-500">AI assistant</p>
            <p className="mt-2 text-sm leading-relaxed text-fog-600">
              Inherits the role of whoever is chatting. Ask for something outside your role and it says so.
            </p>
          </RevealItem>
        </RevealGroup>
      </div>
    </Section>
  );
}
