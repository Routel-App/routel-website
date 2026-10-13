import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { getLocale } from "@/lib/locale-server";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type IllustrationCopy = {
  chain: string[];
  bars: { revenue: string; cost: string; profit: string };
  margin: string;
  trialBalance: string;
  period: string;
  debits: string;
  credits: string;
  balanced: string;
  roles: string[];
  proposed: string;
  postsTo: string;
  confirm: string;
  edit: string;
};

type OutcomeCopy = { title: string; text: string };

const copy = {
  en: {
    eyebrow: "Why forwarders switch",
    title: "Less chasing, fewer spreadsheets, a margin you can see",
    description:
      "Routel is built around the way a forwarding office actually works: one job, many hands, and a ledger that has to be right.",
    outcomes: [
      {
        title: "One record, zero re-keying",
        text: "The quotation becomes the job. The job produces the B/L and the invoice. Nobody types a container number twice.",
      },
      {
        title: "Margin on every job, as it happens",
        text: "Vendor costs land against the job in their own currency, converted at the rate you recorded. Gross profit is visible before the file closes.",
      },
      {
        title: "Close the month in minutes",
        text: "Every invoice, payment and expense posts to the ledger when it is saved. Reports read from there.",
      },
      {
        title: "Everyone sees their part",
        text: "Six roles decide who sees what, in every screen and in the assistant.",
      },
      {
        title: "AI you can trust with the books",
        text: "It proposes. A person confirms. Nothing is saved on a misread sentence.",
      },
    ],
    illustrations: {
      chain: ["Quote", "Job", "B/L", "Invoice"],
      bars: { revenue: "Revenue", cost: "Cost", profit: "Profit" },
      margin: "33.3% margin · updates as costs land",
      trialBalance: "Trial balance",
      period: "Aug 2026",
      debits: "Debits",
      credits: "Credits",
      balanced: "balanced, no journal entries",
      roles: ["Admin", "Management", "Accounting", "Operations", "Sales", "Pricing"],
      proposed: "Proposed: record rent, MYR 6,500",
      postsTo: "posts to 6100 · Rent & utilities",
      confirm: "Confirm",
      edit: "Edit",
    },
  },
  ar: {
    eyebrow: "لماذا تنتقل شركات الشحن إلى Routel",
    title: "متابعة أقل، جداول بيانات أقل، وهامش ربح واضح أمامك",
    description:
      "صُمّم Routel على طريقة عمل مكتب الشحن الفعلية: ملف شحن واحد، وأيدٍ كثيرة، ودفتر أستاذ يجب أن يكون صحيحاً.",
    outcomes: [
      {
        title: "سجل واحد، دون إعادة إدخال",
        text: "عرض السعر يتحول إلى ملف شحن. وملف الشحن يُصدر بوليصة الشحن (B/L) والفاتورة. لا أحد يكتب رقم الحاوية مرتين.",
      },
      {
        title: "هامش الربح على كل شحنة، لحظة بلحظة",
        text: "تُسجَّل تكاليف المورّدين على ملف الشحن بعملتها، وتُحوَّل بسعر الصرف الذي سجّلته. يظهر إجمالي الربح قبل إغلاق الملف.",
      },
      {
        title: "أغلق الشهر في دقائق",
        text: "كل فاتورة ودفعة ومصروف يُرحَّل إلى دفتر الأستاذ لحظة حفظه. والتقارير تُقرأ من هناك.",
      },
      {
        title: "كلٌّ يرى ما يخصه",
        text: "ستة أدوار تحدد من يرى ماذا، في كل شاشة وفي المساعد الذكي.",
      },
      {
        title: "ذكاء اصطناعي تأتمنه على دفاترك",
        text: "هو يقترح، وشخص يؤكد. لا شيء يُحفظ بسبب جملة أُسيء فهمها.",
      },
    ],
    illustrations: {
      chain: ["عرض سعر", "ملف شحن", "B/L", "فاتورة"],
      bars: { revenue: "الإيرادات", cost: "التكلفة", profit: "الربح" },
      margin: "هامش 33.3% · يتحدّث مع وصول التكاليف",
      trialBalance: "ميزان المراجعة",
      period: "أغسطس 2026",
      debits: "مدين",
      credits: "دائن",
      balanced: "متوازن، دون قيود محاسبية يدوية",
      roles: ["المدير", "الإدارة العليا", "المحاسبة", "العمليات", "المبيعات", "التسعير"],
      proposed: "مقترح: تسجيل الإيجار، MYR 6,500",
      postsTo: "يُرحَّل إلى 6100 · الإيجار والمرافق",
      confirm: "تأكيد",
      edit: "تعديل",
    },
  },
} satisfies Record<
  Locale,
  { eyebrow: string; title: string; description: string; outcomes: OutcomeCopy[]; illustrations: IllustrationCopy }
>;

/* Small, hand-drawn "illustrations" built from markup so they stay crisp
   and match the palette. Each one hints at the real screen behind it. */

function ChainIllustration({ t }: { t: IllustrationCopy }) {
  const chips = t.chain;
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

function MarginIllustration({ t }: { t: IllustrationCopy }) {
  const bars = [
    { label: t.bars.revenue, w: "100%", cls: "bg-ink-900" },
    { label: t.bars.cost, w: "66%", cls: "bg-spark-300" },
    { label: t.bars.profit, w: "34%", cls: "bg-teal-500" },
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
      <p className="pt-1 font-mono text-[11px] text-teal-800">{t.margin}</p>
    </div>
  );
}

function BalancedIllustration({ t }: { t: IllustrationCopy }) {
  return (
    <div className="rounded-lg border border-fog-200 bg-white p-3 font-mono text-[11px]">
      <div className="flex justify-between text-fog-500">
        <span>{t.trialBalance}</span>
        <span>{t.period}</span>
      </div>
      <div className="mt-2 flex justify-between text-ink-900">
        <span>{t.debits}</span>
        <span dir="ltr">1,284,310.00</span>
      </div>
      <div className="flex justify-between text-ink-900">
        <span>{t.credits}</span>
        <span dir="ltr">1,284,310.00</span>
      </div>
      <div className="mt-2 flex items-center gap-1.5 border-t border-fog-200 pt-2 text-teal-700">
        <Check className="h-3 w-3" strokeWidth={3} /> {t.balanced}
      </div>
    </div>
  );
}

function RolesIllustration({ t }: { t: IllustrationCopy }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {t.roles.map((r, i) => (
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

function ConfirmIllustration({ t }: { t: IllustrationCopy }) {
  return (
    <div className="rounded-lg border border-spark-200 bg-white p-3">
      <p className="text-[11px] font-semibold text-ink-900">{t.proposed}</p>
      <p className="text-[10.5px] text-fog-500">{t.postsTo}</p>
      <div className="mt-2 flex gap-1.5">
        <span className="rounded-md bg-ink-900 px-2.5 py-1 text-[10.5px] font-semibold text-white">{t.confirm}</span>
        <span className="rounded-md bg-fog-100 px-2.5 py-1 text-[10.5px] font-medium text-ink-900">{t.edit}</span>
      </div>
    </div>
  );
}

const layout: Array<{ tint: string; Illustration: (props: { t: IllustrationCopy }) => ReactNode; large?: boolean }> = [
  { tint: "bg-teal-50 border-teal-100", Illustration: ChainIllustration, large: true },
  { tint: "bg-spark-50 border-spark-100", Illustration: MarginIllustration, large: true },
  { tint: "bg-fog-50 border-fog-200", Illustration: BalancedIllustration },
  { tint: "bg-white border-fog-200", Illustration: RolesIllustration },
  { tint: "bg-spark-50/60 border-spark-100", Illustration: ConfirmIllustration },
];

export async function Outcomes() {
  const locale = await getLocale();
  const t = copy[locale];
  return (
    <Section className="pt-20 sm:pt-24">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.description} />
      <RevealGroup className="mt-14 grid gap-4 md:grid-cols-6" stagger={0.07}>
        {t.outcomes.map((o, i) => {
          const { tint, Illustration, large } = layout[i];
          return (
            <RevealItem
              key={o.title}
              className={cn(
                "flex flex-col rounded-2xl border p-6 transition-transform duration-300 ease-out hover:-translate-y-0.5",
                tint,
                large ? "md:col-span-3" : "md:col-span-2",
              )}
            >
              <h3 className="font-display text-xl font-bold text-ink-900">{o.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fog-600">{o.text}</p>
              <div className="mt-6 flex-1" />
              <div className="mt-4">
                <Illustration t={t.illustrations} />
              </div>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
