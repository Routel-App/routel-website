import { ArrowRight, Banknote, ChartColumn, Download, FileText, Receipt, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

const pnl: Array<[string, string, "row" | "sub" | "total"]> = [
  ["Revenue", "412,860", "row"],
  ["Cost of sales", "(268,915)", "row"],
  ["Gross profit", "143,945", "sub"],
  ["Salaries", "(48,000)", "row"],
  ["Rent & utilities", "(11,350)", "row"],
  ["Commissions", "(6,420)", "row"],
  ["Currency exchange", "(1,184)", "row"],
  ["Net income", "76,991", "total"],
];

const aging = [
  { label: "Current", pct: 46, amt: "84,120", cls: "bg-teal-500" },
  { label: "1–30 days", pct: 29, amt: "53,900", cls: "bg-teal-400" },
  { label: "31–60 days", pct: 17, amt: "31,240", cls: "bg-spark-400" },
  { label: "60+ days", pct: 8, amt: "14,610", cls: "bg-spark-500" },
];

const reports = ["General Ledger", "Trial Balance", "Cash Position", "P&L", "AR Aging", "Overdue invoices", "Customer profitability"];

function Card({ title, icon: Icon, className, children, dark = false }: { title: string; icon: typeof Receipt; className?: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <RevealItem
      className={cn(
        "flex flex-col rounded-2xl border p-5 shadow-card transition-transform duration-300 ease-out hover:-translate-y-0.5",
        dark ? "border-ink-800 bg-ink-900 text-white" : "border-fog-200 bg-white",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <Icon className={cn("h-4 w-4", dark ? "text-teal-300" : "text-teal-600")} strokeWidth={1.9} />
        <p className={cn("text-[13px] font-semibold", dark ? "text-white" : "text-ink-900")}>{title}</p>
      </div>
      <div className="mt-4 flex-1">{children}</div>
    </RevealItem>
  );
}

export function Finance() {
  return (
    <Section id="finance" tone="teal">
      <div className="grid items-end gap-8 lg:grid-cols-[1.1fr_1fr]">
        <SectionHeading
          align="left"
          eyebrow="Finance & accounting"
          title="Books that write themselves from the work you already do."
          description="Invoices, vendor costs and overheads post to a real General Ledger the moment they're recorded. Every report is computed live from those entries."
        />
        <Reveal delay={0.1} className="flex flex-wrap gap-2 lg:justify-end">
          {reports.map((r) => (
            <span key={r} className="rounded-full border border-teal-200/70 bg-white px-3 py-1.5 text-[12.5px] font-medium text-teal-900">
              {r}
            </span>
          ))}
        </Reveal>
      </div>

      <RevealGroup className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
        {/* P&L */}
        <Card title="Profit & Loss · Aug 2026" icon={ChartColumn} className="md:row-span-2 lg:col-span-2 lg:row-span-2">
          <dl className="font-mono text-[12.5px]">
            {pnl.map(([k, v, kind]) => (
              <div
                key={k}
                className={cn(
                  "flex items-baseline justify-between py-1.5",
                  kind === "sub" && "border-t border-fog-200 font-semibold text-ink-900",
                  kind === "total" && "mt-1 border-t-2 border-ink-900 py-2.5 font-bold text-ink-900",
                  kind === "row" && "text-fog-600",
                )}
              >
                <dt className="font-sans">{k}</dt>
                <dd className={kind === "total" ? "text-teal-700" : undefined}>
                  {kind !== "row" ? "MYR " : ""}
                  {v}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-[11.5px] text-fog-500">Gross profit on shipments, then net income after overheads. Computed from source transactions.</p>
        </Card>

        {/* Aging */}
        <Card title="AR aging" icon={Receipt} className="lg:col-span-2">
          <div className="space-y-2.5">
            {aging.map((a) => (
              <div key={a.label} className="grid grid-cols-[76px_1fr_64px] items-center gap-3 text-[12px]">
                <span className="text-fog-600">{a.label}</span>
                <div className="h-2.5 rounded-full bg-fog-100">
                  <div className={cn("h-full rounded-full", a.cls)} style={{ width: `${a.pct}%` }} />
                </div>
                <span className="text-right font-mono text-ink-900">{a.amt}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Multi-currency */}
        <Card title="Multi-currency invoice" icon={Banknote}>
          <p className="font-mono text-[11px] text-fog-500">INV-2026-0918 · Al Noor Trading</p>
          <p className="font-display mt-2 text-2xl font-bold text-ink-900">USD 4,200.00</p>
          <p className="mt-1 font-mono text-[11.5px] text-fog-600">≈ MYR 17,934.00 @ 4.2700</p>
          <p className="mt-3 text-[11.5px] text-fog-500">Presented and paid in USD. The ledger keeps both.</p>
        </Card>

        {/* Statement */}
        <Card title="Statement of account" icon={FileText}>
          <div className="rounded-lg border border-fog-200 bg-fog-50 p-3">
            <p className="text-[12px] font-semibold text-ink-900">Al Noor Trading LLC</p>
            <p className="font-mono text-[11px] text-fog-500">01–31 Aug 2026 · 7 invoices · 2 payments</p>
            <p className="mt-2 font-mono text-[12px] text-ink-900">Balance MYR 52,180.00</p>
          </div>
          <span className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-medium text-teal-700">
            <Download className="h-3.5 w-3.5" /> Download PDF
          </span>
        </Card>

        {/* Cash position */}
        <Card title="Cash position" icon={Wallet} dark className="lg:col-span-2">
          <div className="grid grid-cols-3 gap-4 text-[11.5px]">
            <div>
              <p className="text-white/50">Bank &amp; cash</p>
              <p className="font-display mt-1 text-lg font-bold text-white">MYR 212,400</p>
            </div>
            <div>
              <p className="text-white/50">Receivable, 30 days</p>
              <p className="font-display mt-1 text-lg font-bold text-teal-300">+138,020</p>
            </div>
            <div>
              <p className="text-white/50">Payable, 30 days</p>
              <p className="font-display mt-1 text-lg font-bold text-spark-300">−96,410</p>
            </div>
          </div>
          <p className="mt-3 text-[11.5px] text-white/45">Ask the assistant &ldquo;what&rsquo;s our cash position?&rdquo; and get this, live.</p>
        </Card>

        {/* Expenses */}
        <Card title="Expenses & payroll" icon={Wallet} className="lg:col-span-2">
          <div className="flex flex-wrap gap-1.5">
            {["Rent", "Salaries", "Utilities", "Commissions", "Currency exchange", "+ your own"].map((c, i) => (
              <span
                key={c}
                className={cn(
                  "rounded-full px-2.5 py-1 text-[11.5px] font-medium",
                  i === 5 ? "border border-dashed border-fog-300 text-fog-500" : "bg-fog-100 text-fog-700",
                )}
              >
                {c}
              </span>
            ))}
          </div>
          <p className="mt-3 text-[11.5px] text-fog-500">Each category maps to an operating-expense account. Salary lines link to registered staff.</p>
        </Card>
      </RevealGroup>

      <Reveal delay={0.1} className="mt-10">
        <Button href="/docs/invoicing" variant="secondary">
          Explore invoicing &amp; finance
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Reveal>
    </Section>
  );
}
