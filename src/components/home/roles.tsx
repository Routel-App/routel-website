import { Section, SectionHeading } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { getLocale } from "@/lib/locale-server";
import type { Locale } from "@/lib/i18n";

type Copy = {
  eyebrow: string;
  title: string;
  description: string;
  roles: { name: string; sees: string }[];
  assistantName: string;
  assistantText: string;
};

const copy = {
  en: {
    eyebrow: "Role-based access",
    title: "Everyone sees their job. Nobody sees more.",
    description:
      "Six named roles, enforced the same way in every module and in the assistant. Permissions aren't a setting on a screen; they're a rule the whole system follows.",
    roles: [
      { name: "Admin", sees: "Everything, plus users, roles and expense categories." },
      { name: "Management", sees: "All jobs and every report: P&L, cash position, profitability." },
      { name: "Accounting", sees: "Invoices, payments, notes, statements, the ledger and reports." },
      { name: "Operations", sees: "Jobs, bookings, containers, B/Ls and shipment documents." },
      { name: "Sales", sees: "Quotations, built on current rates, and their customers' jobs." },
      { name: "Pricing", sees: "Vendor buying rates by route, container type and validity window." },
    ],
    assistantName: "AI assistant",
    assistantText: "Inherits the role of whoever is chatting. Ask for something outside your role and it says so.",
  },
  ar: {
    eyebrow: "صلاحيات حسب الدور",
    title: "كل شخص يرى ما يخص عمله، ولا أحد يرى أكثر.",
    description:
      "ستة أدوار محددة، تُطبَّق بالطريقة نفسها في كل وحدة وفي المساعد الذكي. الصلاحيات ليست إعداداً على شاشة، بل قاعدة يلتزم بها النظام كله.",
    roles: [
      { name: "مدير النظام", sees: "كل شيء، إضافة إلى المستخدمين والأدوار وفئات المصروفات." },
      { name: "الإدارة", sees: "جميع ملفات الشحن وكل التقارير: الأرباح والخسائر (P&L) والوضع النقدي والربحية." },
      {
        name: "المحاسبة",
        sees: "الفواتير والمدفوعات والإشعارات الدائنة والمدينة وكشوف الحساب ودفتر الأستاذ والتقارير.",
      },
      { name: "العمليات", sees: "ملفات الشحن والحجوزات والحاويات وبوالص الشحن (B/L) ومستندات الشحنات." },
      { name: "المبيعات", sees: "عروض الأسعار المبنية على الأسعار الحالية، وملفات الشحن الخاصة بعملائهم." },
      { name: "التسعير", sees: "أسعار الشراء من الموردين حسب المسار ونوع الحاوية وفترة الصلاحية." },
    ],
    assistantName: "المساعد الذكي",
    assistantText: "يأخذ دور الشخص الذي يحادثه. وإذا طلبت شيئاً خارج صلاحياتك، يخبرك بذلك.",
  },
} satisfies Record<Locale, Copy>;

export async function Roles() {
  const locale = await getLocale();
  const t = copy[locale];
  const roles = t.roles;
  return (
    <Section>
      <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.4fr]">
        <SectionHeading
          align="left"
          eyebrow={t.eyebrow}
          title={t.title}
          description={t.description}
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
            <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-fog-500">{t.assistantName}</p>
            <p className="mt-2 text-sm leading-relaxed text-fog-600">{t.assistantText}</p>
          </RevealItem>
        </RevealGroup>
      </div>
    </Section>
  );
}
