import { getModules } from "@/lib/modules";
import { getLocale } from "@/lib/locale-server";
import type { Locale } from "@/lib/i18n";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { ModuleGrid, type GridArea } from "./module-grid";

const copy = {
  en: {
    eyebrow: "Everything in one system",
    title: "A full platform's worth of modules that already talk to each other",
    description:
      "Each one is built and working today. A quotation becomes a booking, the booking produces a B/L and an invoice, and the invoice lands in your ledger. Nothing is re-keyed.",
    cta: "View the full platform",
    all: "All modules",
    areas: { operations: "Operations", finance: "Finance & accounting", ai: "AI & automation", control: "Customers & control" },
  },
  ar: {
    eyebrow: "كل شيء في نظام واحد",
    title: "وحدات بحجم منصة كاملة، مترابطة فيما بينها بالفعل",
    description:
      "كل وحدة منها مبنية وتعمل اليوم. عرض السعر يتحول إلى حجز، والحجز يُصدر بوليصة الشحن (B/L) والفاتورة، والفاتورة تصل إلى دفتر الأستاذ. لا شيء يُعاد إدخاله.",
    cta: "استعرض المنصة كاملة",
    all: "كل الوحدات",
    areas: { operations: "العمليات", finance: "المالية والمحاسبة", ai: "الذكاء الاصطناعي والأتمتة", control: "العملاء والرقابة" },
  },
} satisfies Record<Locale, { eyebrow: string; title: string; description: string; cta: string; all: string; areas: Record<string, string> }>;

/** Which chip each module sits under. */
const areaOf: Record<string, keyof (typeof copy)["en"]["areas"]> = {
  bookings: "operations",
  quotations: "operations",
  "bill-of-lading": "operations",
  "labeling-center": "operations",
  "business-partners": "operations",
  invoicing: "finance",
  "finance-receivables": "finance",
  "credit-notes": "finance",
  "credit-applications": "finance",
  accounting: "finance",
  expenses: "finance",
  "ai-assistant": "ai",
  documents: "ai",
  "email-sync": "ai",
  tracking: "control",
  roles: "control",
  compliance: "control",
  "visitor-tracking": "control",
};

export async function Modules() {
  const locale = await getLocale();
  const t = copy[locale];
  const modules = getModules(locale).map((m) => {
    const Icon = m.icon;
    return { slug: m.slug, name: m.name, short: m.short, icon: <Icon strokeWidth={1.75} />, area: areaOf[m.slug] ?? "operations" };
  });
  const areas: GridArea[] = (Object.keys(t.areas) as Array<keyof typeof t.areas>).map((id) => ({ id, label: t.areas[id] }));
  return (
    <Section id="modules">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.description} />
      <Reveal amount={0.05} className="mt-12">
        <ModuleGrid modules={modules} areas={areas} allLabel={t.all} />
      </Reveal>
      <Reveal className="mt-10 text-center">
        <Button href="/platform" variant="secondary">
          {t.cta}
        </Button>
      </Reveal>
    </Section>
  );
}
