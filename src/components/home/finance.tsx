import { ArrowRight, Receipt, Wallet, Users, ChartColumn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";

const sources = [
  { icon: Receipt, label: "Customer invoices", sub: "MYR · USD" },
  { icon: Users, label: "Vendor costs", sub: "per job, FX converted" },
  { icon: Wallet, label: "Expenses & payroll", sub: "rent, salaries, utilities" },
];

const reports = [
  "General Ledger",
  "Trial Balance",
  "Cash Position",
  "P&L (gross + net)",
  "AR Aging",
  "Overdue invoices",
  "Customer profitability",
  "Statements of account",
];

const pnl: Array<[string, string, "head" | "row" | "sub" | "total"]> = [
  ["Revenue", "MYR 412,860", "row"],
  ["Cost of sales", "(268,915)", "row"],
  ["Gross profit", "MYR 143,945", "sub"],
  ["Salaries", "(48,000)", "row"],
  ["Rent & utilities", "(11,350)", "row"],
  ["Commissions", "(6,420)", "row"],
  ["Currency exchange", "(1,184)", "row"],
  ["Net income", "MYR 76,991", "total"],
];

export function Finance() {
  return (
    <Section id="finance">
      <div className="grid items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div className="order-2 lg:order-1">
          <Reveal className="relative">
            {/* Source cards feeding the ledger */}
            <div className="grid gap-3 sm:grid-cols-3">
              {sources.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="rounded-xl border border-fog-200 bg-white p-4 shadow-card">
                    <Icon className="h-4.5 w-4.5 text-teal-600" strokeWidth={1.75} />
                    <p className="mt-2.5 text-[13px] font-semibold text-ink-900">{s.label}</p>
                    <p className="text-[11.5px] text-fog-500">{s.sub}</p>
                  </div>
                );
              })}
            </div>
            <div className="mx-auto my-3 flex w-fit flex-col items-center text-fog-400">
              <span className="h-5 w-px bg-fog-300" />
              <span className="rounded-full border border-fog-200 bg-white px-2.5 py-0.5 font-mono text-[10.5px] text-fog-600">
                posts to General Ledger
              </span>
              <span className="h-5 w-px bg-fog-300" />
            </div>

            {/* P&L statement */}
            <div className="overflow-hidden rounded-2xl border border-fog-200 bg-white shadow-float">
              <div className="flex items-center justify-between border-b border-fog-200 bg-fog-50 px-5 py-3">
                <div className="flex items-center gap-2">
                  <ChartColumn className="h-4 w-4 text-teal-600" />
                  <p className="text-[13px] font-semibold text-ink-900">Profit &amp; Loss</p>
                </div>
                <p className="font-mono text-[11px] text-fog-500">Aug 2026 · live</p>
              </div>
              <dl className="px-5 py-2">
                {pnl.map(([k, v, kind]) => (
                  <div
                    key={k}
                    className={
                      kind === "total"
                        ? "mt-1 flex items-baseline justify-between border-t-2 border-ink-900 py-2.5"
                        : kind === "sub"
                          ? "flex items-baseline justify-between border-t border-fog-200 py-2"
                          : "flex items-baseline justify-between py-1.5"
                    }
                  >
                    <dt
                      className={
                        kind === "total"
                          ? "text-[13px] font-bold text-ink-900"
                          : kind === "sub"
                            ? "text-[13px] font-semibold text-ink-900"
                            : "text-[13px] text-fog-600"
                      }
                    >
                      {k}
                    </dt>
                    <dd
                      className={
                        kind === "total"
                          ? "font-mono text-[13px] font-bold text-teal-700"
                          : kind === "sub"
                            ? "font-mono text-[13px] font-semibold text-ink-900"
                            : "font-mono text-[13px] text-fog-700"
                      }
                    >
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>

        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-teal-600">Finance &amp; accounting</p>
            <h2 className="font-display text-balance text-3xl font-bold leading-[1.08] text-ink-900 sm:text-4xl lg:text-[2.75rem]">
              Books that write themselves from the work you already do.
            </h2>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-fog-600">
              Invoices, vendor costs and overheads post to a real General Ledger the moment they’re recorded. Reports are
              computed live from those source transactions, so there are no month-end journal entries and no second set of
              numbers to reconcile.
            </p>
          </Reveal>
          <RevealGroup className="mt-8 flex flex-wrap gap-2" stagger={0.04}>
            {reports.map((r) => (
              <RevealItem
                key={r}
                className="rounded-full border border-fog-200 bg-white px-3 py-1.5 text-[13px] font-medium text-ink-900 shadow-card"
              >
                {r}
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal delay={0.1} className="mt-8 space-y-3 text-[15px] text-fog-600">
            <p>
              <span className="font-semibold text-ink-900">Gross profit and net income.</span> P&amp;L shows margin on
              shipments and true profit after operating expenses.
            </p>
            <p>
              <span className="font-semibold text-ink-900">Receivables &amp; Payables hub.</span> Payments, credit and debit
              notes, credit limits and applications in one place.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="mt-8">
            <Button href="/docs/invoicing" variant="secondary">
              Explore invoicing &amp; finance
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
