import Link from "@/components/i18n/link";
import { ArrowUpRight } from "lucide-react";
import { getModules } from "@/lib/modules";
import { getLocale } from "@/lib/locale-server";
import type { Locale } from "@/lib/i18n";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const copy = {
  en: {
    eyebrow: "Everything in one system",
    title: "A full platform's worth of modules that already talk to each other",
    description:
      "Each one is built and working today. A quotation becomes a job, a job produces a B/L and an invoice, and the invoice lands in your ledger. Nothing is re-keyed.",
    cta: "View the full platform",
  },
  ar: {
    eyebrow: "كل شيء في نظام واحد",
    title: "وحدات بحجم منصة كاملة، مترابطة فيما بينها بالفعل",
    description:
      "كل وحدة منها مبنية وتعمل اليوم. عرض السعر يتحول إلى ملف شحن، وملف الشحن يُصدر بوليصة الشحن (B/L) والفاتورة، والفاتورة تصل إلى دفتر الأستاذ. لا شيء يُعاد إدخاله.",
    cta: "استعرض المنصة كاملة",
  },
} satisfies Record<Locale, { eyebrow: string; title: string; description: string; cta: string }>;

export async function Modules() {
  const locale = await getLocale();
  const t = copy[locale];
  const modules = getModules(locale);
  return (
    <Section id="modules" tone="muted">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.description} />
      <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
        {modules.map((m, i) => {
          const Icon = m.icon;
          const tint =
            m.slug === "ai-assistant"
              ? "bg-spark-50 text-spark-600 ring-spark-200/70"
              : i % 3 === 0
                ? "bg-teal-50 text-teal-700 ring-teal-100"
                : i % 3 === 1
                  ? "bg-fog-100 text-ink-800 ring-fog-200"
                  : "bg-ink-900 text-teal-300 ring-ink-800";
          const inner = (
            <>
              <div className="flex items-start justify-between">
                <span className={cn("flex h-11 w-11 items-center justify-center rounded-xl ring-1 ring-inset", tint)}>
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                {m.docs ? (
                  <ArrowUpRight className="h-4 w-4 text-fog-300 transition-colors group-hover:text-ink-900" />
                ) : null}
              </div>
              <h3 className="font-display mt-5 text-[17px] font-semibold text-ink-900">{m.name}</h3>
              <p className="mt-1 text-sm font-medium text-fog-600">{m.short}</p>
              <p className="mt-3 text-sm leading-relaxed text-fog-500">{m.description}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {m.bullets.map((b) => (
                  <li key={b} className="rounded-full bg-fog-100 px-2.5 py-1 text-[11.5px] font-medium text-fog-700">
                    {b}
                  </li>
                ))}
              </ul>
            </>
          );
          const cls =
            "group flex h-full flex-col rounded-2xl border border-fog-200 bg-white p-6 shadow-card transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-fog-300 hover:shadow-float";
          return (
            <RevealItem key={m.slug} className="h-full">
              <Link href={`/platform/${m.slug}`} className={cls}>
                {inner}
              </Link>
            </RevealItem>
          );
        })}
      </RevealGroup>
      <Reveal className="mt-10 text-center">
        <Button href="/platform" variant="secondary">
          {t.cta}
        </Button>
      </Reveal>
    </Section>
  );
}
