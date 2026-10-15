import { ArrowRight, Banknote, ChartColumn, Download, FileText, Receipt, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { getLocale } from "@/lib/locale-server";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const pnlValues: Array<[string, "row" | "sub" | "total"]> = [
  ["412,860", "row"],
  ["(268,915)", "row"],
  ["143,945", "sub"],
  ["(48,000)", "row"],
  ["(11,350)", "row"],
  ["(6,420)", "row"],
  ["(1,184)", "row"],
  ["76,991", "total"],
];

const agingValues = [
  { pct: 46, amt: "84,120", cls: "bg-spark-500" },
  { pct: 29, amt: "53,900", cls: "bg-spark-400" },
  { pct: 17, amt: "31,240", cls: "bg-spark-400" },
  { pct: 8, amt: "14,610", cls: "bg-spark-500" },
];

type FinanceCopy = {
  eyebrow: string;
  title: string;
  description: string;
  reports: string[];
  pnlTitle: string;
  pnlLabels: string[];
  pnlNote: string;
  agingTitle: string;
  agingLabels: string[];
  invoiceTitle: string;
  invoiceNote: string;
  statementTitle: string;
  statementMeta: string;
  statementBalance: string;
  download: string;
  cashTitle: string;
  bankCash: string;
  receivable: string;
  payable: string;
  cashNote: string;
  expensesTitle: string;
  expenseCategories: string[];
  expensesNote: string;
  cta: string;
  /** Base currency shown in the mock figures. */
  currency: string;
  fxLine: string;
};

const copy = {
  en: {
    eyebrow: "Finance & accounting",
    title: "Books that write themselves from the work you already do.",
    description:
      "Invoices, vendor costs and overheads post to a real General Ledger the moment they're recorded. Every report is computed live from those entries.",
    reports: ["General Ledger", "Trial Balance", "Cash Position", "P&L", "AR Aging", "Overdue invoices", "Customer profitability"],
    pnlTitle: "Profit & Loss · Aug 2026",
    pnlLabels: [
      "Revenue",
      "Cost of sales",
      "Gross profit",
      "Salaries",
      "Rent & utilities",
      "Commissions",
      "Currency exchange",
      "Net income",
    ],
    pnlNote: "Gross profit on bookings, then net income after overheads. Computed from source transactions.",
    agingTitle: "AR aging",
    agingLabels: ["Current", "1–30 days", "31–60 days", "60+ days"],
    invoiceTitle: "Multi-currency invoice",
    invoiceNote: "Presented and paid in USD. The ledger keeps both.",
    statementTitle: "Statement of account",
    statementMeta: "01–31 Aug 2026 · 7 invoices · 2 payments",
    statementBalance: "Balance",
    download: "Download PDF",
    cashTitle: "Cash position",
    bankCash: "Bank & cash",
    receivable: "Receivable, 30 days",
    payable: "Payable, 30 days",
    cashNote: "Ask the assistant “what’s our cash position?” and get this, live.",
    expensesTitle: "Expenses & payroll",
    expenseCategories: ["Rent", "Salaries", "Utilities", "Commissions", "Currency exchange", "+ your own"],
    expensesNote: "Each category maps to an operating-expense account. Salary lines link to registered staff.",
    cta: "Explore invoicing & finance",
    currency: "MYR",
    fxLine: "≈ MYR 17,934.00 @ 4.2700",
  },
  ar: {
    eyebrow: "المالية والمحاسبة",
    title: "دفاتر تكتب نفسها من العمل الذي تقوم به أصلاً.",
    description:
      "تُرحَّل الفواتير وتكاليف المورّدين والمصاريف العامة إلى دفتر أستاذ عام حقيقي لحظة تسجيلها. وكل تقرير يُحتسب مباشرة من تلك القيود.",
    reports: [
      "دفتر الأستاذ العام",
      "ميزان المراجعة",
      "الوضع النقدي",
      "P&L",
      "أعمار الذمم المدينة",
      "الفواتير المتأخرة",
      "ربحية العملاء",
    ],
    pnlTitle: "الأرباح والخسائر · أغسطس 2026",
    pnlLabels: [
      "الإيرادات",
      "تكلفة المبيعات",
      "إجمالي الربح",
      "الرواتب",
      "الإيجار والمرافق",
      "العمولات",
      "فروق صرف العملات",
      "صافي الدخل",
    ],
    pnlNote: "إجمالي الربح على الحجوزات، ثم صافي الدخل بعد المصاريف العامة. محسوب من المعاملات الأصلية.",
    agingTitle: "أعمار الذمم المدينة",
    agingLabels: ["الحالية", "1–30 يوماً", "31–60 يوماً", "فوق 60 يوماً"],
    invoiceTitle: "فاتورة بعملتين",
    invoiceNote: "تُصدر وتُسدَّد بالدولار الأمريكي، ودفتر الأستاذ يحتفظ بالريال والدولار معاً.",
    statementTitle: "كشف حساب",
    statementMeta: "01–31 أغسطس 2026 · 7 فواتير · 2 دفعات",
    statementBalance: "الرصيد",
    download: "تنزيل PDF",
    cashTitle: "الوضع النقدي",
    bankCash: "النقد والبنوك",
    receivable: "مستحق القبض خلال 30 يوماً",
    payable: "مستحق الدفع خلال 30 يوماً",
    cashNote: "اسأل المساعد «ما وضعنا النقدي؟» واحصل على هذا مباشرة.",
    expensesTitle: "المصروفات والرواتب",
    expenseCategories: ["الإيجار", "الرواتب", "المرافق", "العمولات", "فروق صرف العملات", "+ فئاتك الخاصة"],
    expensesNote: "كل فئة مرتبطة بحساب مصروفات تشغيلية. وبنود الرواتب مرتبطة بالموظفين المسجّلين.",
    cta: "استكشف الفوترة والمالية",
    currency: "SAR",
    fxLine: "≈ SAR 15,750.00 @ 3.7500",
  },
} satisfies Record<Locale, FinanceCopy>;

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
        <Icon className={cn("h-4 w-4", dark ? "text-spark-300" : "text-spark-600")} strokeWidth={1.9} />
        <p className={cn("text-[13px] font-semibold", dark ? "text-white" : "text-ink-900")}>{title}</p>
      </div>
      <div className="mt-4 flex-1">{children}</div>
    </RevealItem>
  );
}

export async function Finance() {
  const locale = await getLocale();
  const t = copy[locale];
  const pnl = pnlValues.map(([v, kind], i) => [t.pnlLabels[i], v, kind] as const);
  const aging = agingValues.map((a, i) => ({ ...a, label: t.agingLabels[i] }));
  return (
    <Section id="finance" tone="teal">
      <div className="grid items-end gap-8 lg:grid-cols-[1.1fr_1fr]">
        <SectionHeading align="left" eyebrow={t.eyebrow} title={t.title} description={t.description} />
        <Reveal delay={0.1} className="flex flex-wrap gap-2 lg:justify-end">
          {t.reports.map((r) => (
            <span key={r} className="rounded-full border border-spark-200/70 bg-white px-3 py-1.5 text-[12.5px] font-medium text-spark-900">
              {r}
            </span>
          ))}
        </Reveal>
      </div>

      <RevealGroup className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
        {/* P&L */}
        <Card title={t.pnlTitle} icon={ChartColumn} className="md:row-span-2 lg:col-span-2 lg:row-span-2">
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
                <dd dir="ltr" className={kind === "total" ? "text-spark-700" : undefined}>
                  {kind !== "row" ? `${t.currency} ` : ""}
                  {v}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-[11.5px] text-fog-500">{t.pnlNote}</p>
        </Card>

        {/* Aging */}
        <Card title={t.agingTitle} icon={Receipt} className="lg:col-span-2">
          <div className="space-y-2.5">
            {aging.map((a) => (
              <div key={a.label} className="grid grid-cols-[76px_1fr_64px] items-center gap-3 text-[12px]">
                <span className="text-fog-600">{a.label}</span>
                <div className="h-2.5 rounded-full bg-fog-100">
                  <div className={cn("h-full rounded-full", a.cls)} style={{ width: `${a.pct}%` }} />
                </div>
                <span className="text-end font-mono text-ink-900">{a.amt}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Multi-currency */}
        <Card title={t.invoiceTitle} icon={Banknote}>
          <p dir="ltr" className="font-mono text-[11px] text-fog-500 rtl:text-end">
            INV-2026-0918 · Al Noor Trading
          </p>
          <p dir="ltr" className="font-display mt-2 text-2xl font-bold text-ink-900 rtl:text-end">
            USD 4,200.00
          </p>
          <p dir="ltr" className="mt-1 font-mono text-[11.5px] text-fog-600 rtl:text-end">
            {t.fxLine}
          </p>
          <p className="mt-3 text-[11.5px] text-fog-500">{t.invoiceNote}</p>
        </Card>

        {/* Statement */}
        <Card title={t.statementTitle} icon={FileText}>
          <div className="rounded-lg border border-fog-200 bg-fog-50 p-3">
            <p className="text-[12px] font-semibold text-ink-900">Al Noor Trading LLC</p>
            <p className="font-mono text-[11px] text-fog-500">{t.statementMeta}</p>
            <p className="mt-2 font-mono text-[12px] text-ink-900">
              {t.statementBalance} <span dir="ltr">{t.currency} 52,180.00</span>
            </p>
          </div>
          <span className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-medium text-spark-700">
            <Download className="h-3.5 w-3.5" /> {t.download}
          </span>
        </Card>

        {/* Cash position */}
        <Card title={t.cashTitle} icon={Wallet} dark className="lg:col-span-2">
          <div className="grid grid-cols-3 gap-4 text-[11.5px]">
            <div>
              <p className="text-white/50">{t.bankCash}</p>
              <p dir="ltr" className="font-display mt-1 text-lg font-bold text-white rtl:text-end">
                {t.currency} 212,400
              </p>
            </div>
            <div>
              <p className="text-white/50">{t.receivable}</p>
              <p dir="ltr" className="font-display mt-1 text-lg font-bold text-spark-300 rtl:text-end">
                +138,020
              </p>
            </div>
            <div>
              <p className="text-white/50">{t.payable}</p>
              <p dir="ltr" className="font-display mt-1 text-lg font-bold text-spark-300 rtl:text-end">
                −96,410
              </p>
            </div>
          </div>
          <p className="mt-3 text-[11.5px] text-white/45">{t.cashNote}</p>
        </Card>

        {/* Expenses */}
        <Card title={t.expensesTitle} icon={Wallet} className="lg:col-span-2">
          <div className="flex flex-wrap gap-1.5">
            {t.expenseCategories.map((c, i) => (
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
          <p className="mt-3 text-[11.5px] text-fog-500">{t.expensesNote}</p>
        </Card>
      </RevealGroup>

      <Reveal delay={0.1} className="mt-10">
        <Button href="/docs/invoicing" variant="secondary">
          {t.cta}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Reveal>
    </Section>
  );
}
