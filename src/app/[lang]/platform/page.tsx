import type { Metadata } from "next";
import Link from "@/components/i18n/link";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { getModules } from "@/lib/modules";
import { getLocale } from "@/lib/locale-server";
import type { Locale } from "@/lib/i18n";
import { Cta } from "@/components/home/cta";

type Group = { title: string; description: string; slugs: string[] };

const copy = {
  en: {
    metaTitle: "Platform",
    metaDescription:
      "Every Routel module, from the first quotation to the last payment — one platform, nineteen modules that already talk to each other.",
    title: "One platform, nineteen modules that already talk to each other",
    intro:
      "Every module below is built and working in Routel today. A quotation becomes a job, a job produces a B/L and an invoice, and the invoice lands in your ledger — nothing re-keyed between them.",
    demo: "Request a demo",
    docs: "Read the docs",
    groups: [
      {
        title: "Operations",
        description: "The job, from quote to delivered.",
        slugs: ["shipments", "bookings", "quotations", "bill-of-lading", "documents", "tracking"],
      },
      {
        title: "Finance & accounting",
        description: "Invoices, payments and books that stay current on their own.",
        slugs: ["invoicing", "finance-receivables", "credit-notes", "credit-applications", "expenses", "accounting"],
      },
      {
        title: "Sales & partners",
        description: "One record for every company you work with, and anything that needs a flag.",
        slugs: ["business-partners", "labeling-center"],
      },
      {
        title: "Trust, access & AI",
        description: "Who can do what, how correspondence stays attached, and a chat assistant that respects it all.",
        slugs: ["roles", "email-sync", "visitor-tracking", "compliance", "ai-assistant"],
      },
    ],
  },
  ar: {
    metaTitle: "المنصة",
    metaDescription:
      "كل وحدات Routel، من أول عرض سعر إلى آخر دفعة — منصة واحدة وتسع عشرة وحدة مترابطة فيما بينها أصلاً.",
    title: "منصة واحدة، وتسع عشرة وحدة مترابطة فيما بينها أصلاً",
    intro:
      "كل وحدة أدناه مبنية وتعمل في Routel اليوم. عرض السعر يتحول إلى ملف شحن، وملف الشحن يُنتج بوليصة الشحن (B/L) والفاتورة، والفاتورة تصل إلى دفتر الأستاذ — دون إعادة إدخال أي بيانات بينها.",
    demo: "اطلب عرضاً تجريبياً",
    docs: "اقرأ التوثيق",
    groups: [
      {
        title: "العمليات",
        description: "ملف الشحن، من عرض السعر حتى التسليم.",
        slugs: ["shipments", "bookings", "quotations", "bill-of-lading", "documents", "tracking"],
      },
      {
        title: "المالية والمحاسبة",
        description: "فواتير ومدفوعات ودفاتر محاسبية تبقى محدّثة تلقائياً.",
        slugs: ["invoicing", "finance-receivables", "credit-notes", "credit-applications", "expenses", "accounting"],
      },
      {
        title: "المبيعات والشركاء",
        description: "سجل واحد لكل شركة تتعامل معها، ولكل ما يحتاج إلى تمييز.",
        slugs: ["business-partners", "labeling-center"],
      },
      {
        title: "الثقة والصلاحيات والذكاء الاصطناعي",
        description: "من يحق له فعل ماذا، وكيف تبقى المراسلات مرتبطة بملفاتها، ومساعد محادثة يلتزم بكل ذلك.",
        slugs: ["roles", "email-sync", "visitor-tracking", "compliance", "ai-assistant"],
      },
    ],
  },
} satisfies Record<
  Locale,
  { metaTitle: string; metaDescription: string; title: string; intro: string; demo: string; docs: string; groups: Group[] }
>;

export async function generateMetadata(): Promise<Metadata> {
  const t = copy[await getLocale()];
  return { title: t.metaTitle, description: t.metaDescription };
}

export default async function PlatformIndexPage() {
  const locale = await getLocale();
  const t = copy[locale];
  const modules = getModules(locale);
  return (
    <>
      <section className="border-b border-fog-200 bg-fog-50 pb-14 pt-16 sm:pt-24">
        <Container>
          <Reveal className="max-w-3xl">
            <h1 className="font-display text-balance text-4xl font-bold leading-[1.05] text-ink-900 sm:text-5xl">
              {t.title}
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-fog-600">
              {t.intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/demo" size="lg">{t.demo}</Button>
              <Button href="/docs" variant="secondary" size="lg">{t.docs}</Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {t.groups.map((group, i) => {
        const groupModules = group.slugs
          .map((slug) => modules.find((m) => m.slug === slug))
          .filter((m): m is NonNullable<typeof m> => Boolean(m));
        return (
          <Section key={group.title} tone={i % 2 === 0 ? "light" : "muted"} className="py-16 sm:py-20">
            <SectionHeading align="left" eyebrow={group.title} title={group.description} />
            <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
              {groupModules.map((m) => {
                const Icon = m.icon;
                return (
                  <RevealItem key={m.slug}>
                    <Link
                      href={`/platform/${m.slug}`}
                      className="group flex h-full flex-col rounded-2xl border border-fog-200 bg-white p-6 shadow-card transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-fog-300 hover:shadow-float"
                    >
                      <div className="flex items-start justify-between">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700 ring-1 ring-inset ring-teal-100">
                          <Icon className="h-5 w-5" strokeWidth={1.75} />
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-fog-300 transition-colors group-hover:text-ink-900" />
                      </div>
                      <h3 className="font-display mt-5 text-[17px] font-semibold text-ink-900">{m.name}</h3>
                      <p className="mt-1 text-sm font-medium text-fog-600">{m.short}</p>
                      <p className="mt-3 text-sm leading-relaxed text-fog-500">{m.description}</p>
                    </Link>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </Section>
        );
      })}

      <Cta />
    </>
  );
}
