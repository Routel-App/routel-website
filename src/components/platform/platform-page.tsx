import Link from "@/components/i18n/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Section, SectionHeading, Eyebrow } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Faq } from "@/components/ui/faq";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { getModules, type Module } from "@/lib/modules";
import type { PlatformContent } from "@/lib/platform-content";
import { getLocale } from "@/lib/locale-server";
import { AiShowcase } from "./ai-showcase";
import { AiTrust } from "./ai-trust";
import { moduleVisual } from "./module-visual";
import type { Locale } from "@/lib/i18n";

const copy = {
  en: {
    demo: "Request a demo",
    docs: "Read the docs",
    problemEyebrow: "Without it",
    problemTitle: "What this usually looks like",
    featuresEyebrow: "What's built in",
    featuresTitle: "Everything this module does",
    workflowEyebrow: "How it works",
    workflowTitle: "From first step to done",
    personasEyebrow: "Who uses this",
    personasTitle: "Built around real roles, not generic permissions",
    faqTitle: "Questions we get asked",
    relatedEyebrow: "Keep going",
    relatedTitle: (name: string) => `Connect ${name} with the rest of Routel`,
    ctaTitle: (name: string) => `See ${name} running on a real booking`,
    ctaBody: "A 30-minute walkthrough on your own routes and workflow, not a generic slide deck.",
  },
  ar: {
    demo: "اطلب عرضاً تجريبياً",
    docs: "اقرأ التوثيق",
    problemEyebrow: "من دونها",
    problemTitle: "كيف يبدو الوضع عادةً",
    featuresEyebrow: "ما تتضمنه",
    featuresTitle: "كل ما تقوم به هذه الوحدة",
    workflowEyebrow: "كيف تعمل",
    workflowTitle: "من الخطوة الأولى حتى الإنجاز",
    personasEyebrow: "من يستخدمها",
    personasTitle: "مصممة حول أدوار حقيقية، لا صلاحيات عامة",
    faqTitle: "أسئلة تصلنا كثيراً",
    relatedEyebrow: "تابع الاستكشاف",
    relatedTitle: (name: string) => `اربط ${name} ببقية Routel`,
    ctaTitle: (name: string) => `شاهد ${name} يعمل على حجز حقيقي`,
    ctaBody: "جولة مدتها 30 دقيقة على مساراتك وطريقة عملك الفعلية، لا عرض شرائح عام.",
  },
} satisfies Record<
  Locale,
  {
    demo: string;
    docs: string;
    problemEyebrow: string;
    problemTitle: string;
    featuresEyebrow: string;
    featuresTitle: string;
    workflowEyebrow: string;
    workflowTitle: string;
    personasEyebrow: string;
    personasTitle: string;
    faqTitle: string;
    relatedEyebrow: string;
    relatedTitle: (name: string) => string;
    ctaTitle: (name: string) => string;
    ctaBody: string;
  }
>;

export async function PlatformPageTemplate({ module: mod, content }: { module: Module; content: PlatformContent }) {
  const locale = await getLocale();
  const t = copy[locale];
  const modules = getModules(locale);
  const related = content.related
    .map((slug) => modules.find((m) => m.slug === slug))
    .filter((m): m is Module => Boolean(m));

  return (
    <>
      {/* Hero */}
      <section className="border-b border-fog-200 bg-fog-50 pb-14 pt-16 sm:pt-24">
        <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <Reveal className="max-w-3xl">
            <Eyebrow tone="teal" className="mb-4">
              {content.eyebrow}
            </Eyebrow>
            <h1 className="font-display text-balance text-4xl font-bold leading-[1.05] text-ink-900 sm:text-5xl">{content.title}</h1>
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-fog-600">{content.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={`/demo?plan=${mod.slug}`} size="lg">
                {t.demo}
              </Button>
              {mod.docs ? (
                <Button href={mod.docs} variant="secondary" size="lg">
                  {t.docs}
                </Button>
              ) : null}
            </div>
          </Reveal>
          <Reveal delay={0.1} amount={0.1} className="min-w-0">
            {moduleVisual(mod.slug, locale)}
          </Reveal>
          {content.stats.length ? (
            <Reveal delay={0.1} className="grid grid-cols-2 gap-6 border-t border-fog-200 pt-8 sm:grid-cols-3 lg:col-span-2">
              {content.stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">{s.value}</p>
                  <p className="mt-1 text-sm text-fog-500">{s.label}</p>
                </div>
              ))}
            </Reveal>
          ) : null}
        </Container>
      </section>

      {mod.slug === "ai-assistant" ? <AiShowcase locale={locale} /> : null}
      {mod.slug === "ai-assistant" ? <AiTrust locale={locale} /> : null}

      {/* Problem */}
      <Section className="py-16 sm:py-20">
        <SectionHeading
          eyebrow={t.problemEyebrow}
          eyebrowTone="ink"
          align="left"
          title={t.problemTitle}
        />
        <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-3" stagger={0.06}>
          {content.painPoints.map((p) => (
            <RevealItem key={p} className="rounded-2xl border border-fog-200 bg-white p-5 text-sm leading-relaxed text-fog-600 shadow-card">
              {p}
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal className="mt-8 max-w-2xl text-pretty text-base leading-relaxed text-fog-600">{content.solutionIntro}</Reveal>
      </Section>

      {/* Features */}
      <Section tone="muted" className="py-16 sm:py-20">
        <SectionHeading eyebrow={t.featuresEyebrow} title={t.featuresTitle} />
        <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2" stagger={0.06}>
          {content.features.map((f) => (
            <RevealItem key={f.title} className="rounded-2xl border border-fog-200 bg-white p-6 shadow-card">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <div>
                  <h3 className="font-display text-[16px] font-semibold text-ink-900">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-fog-600">{f.description}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Workflow */}
      <Section className="py-16 sm:py-20">
        <SectionHeading eyebrow={t.workflowEyebrow} title={t.workflowTitle} />
        <RevealGroup className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
          {content.workflow.map((step, i) => (
            <RevealItem key={step.title} className="relative rounded-2xl border border-fog-200 bg-white p-5 shadow-card">
              <span className="font-mono text-xs font-semibold text-teal-700">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-display mt-2 text-[15px] font-semibold text-ink-900">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-fog-500">{step.description}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Personas */}
      <Section tone="muted" className="py-16 sm:py-20">
        <SectionHeading eyebrow={t.personasEyebrow} title={t.personasTitle} />
        <RevealGroup className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-2" stagger={0.06}>
          {content.personas.map((p) => (
            <RevealItem key={p.role} className="rounded-xl border border-fog-200 bg-white p-5 shadow-card">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-teal-700">{p.role}</p>
              <p className="mt-2 text-sm leading-relaxed text-fog-600">{p.detail}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* FAQ */}
      <Section className="py-16 sm:py-20">
        <SectionHeading title={t.faqTitle} />
        <Faq items={content.faqs} className="mt-10" />
      </Section>

      {/* Related modules */}
      {related.length ? (
        <Section tone="muted" className="py-16 sm:py-20">
          <SectionHeading eyebrow={t.relatedEyebrow} title={t.relatedTitle(mod.name)} />
          <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-3" stagger={0.06}>
            {related.map((m) => {
              const Icon = m.icon;
              return (
                <RevealItem key={m.slug}>
                  <Link
                    href={`/platform/${m.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-fog-200 bg-white p-5 shadow-card transition-colors hover:border-fog-300"
                  >
                    <div className="flex items-start justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700 ring-1 ring-inset ring-teal-100">
                        <Icon className="h-5 w-5" strokeWidth={1.75} />
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-fog-300 transition-colors group-hover:text-ink-900" />
                    </div>
                    <h3 className="font-display mt-4 text-[15px] font-semibold text-ink-900">{m.name}</h3>
                    <p className="mt-1 text-sm text-fog-500">{m.short}</p>
                  </Link>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </Section>
      ) : null}

      {/* CTA */}
      <Section className="py-16 sm:py-20">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-3xl bg-ink-950 px-8 py-14 text-center text-white sm:px-14">
          <h2 className="font-display text-balance text-2xl font-bold sm:text-3xl">{t.ctaTitle(mod.name)}</h2>
          <p className="max-w-xl text-pretty text-white/70">
            {t.ctaBody}
          </p>
          <Button href={`/demo?plan=${mod.slug}`} variant="inverse" size="lg">
            {t.demo}
          </Button>
        </Reveal>
      </Section>
    </>
  );
}
