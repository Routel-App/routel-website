import { ArrowRight, ArrowUpRight, BookOpen, Bot, Check, ChevronRight, Clock, Minus, Sparkles } from "lucide-react";
import Link from "@/components/i18n/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Faq } from "@/components/ui/faq";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Cta } from "@/components/home/cta";
import { ServiceScene } from "./service-scene";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import type { Locale } from "@/lib/i18n";
import type { Service } from "@/lib/services";
import type { Mock, ServicePageCopy } from "@/lib/service-pages/types";

const copy = {
  en: {
    solutions: "Solutions",
    stage: { live: "Available now", development: "In development", planned: "Planned" },
    demo: "Request a demo",
    interest: "Register interest",
    module: "See the module",
    guide: "Read the guide",
    comingTitle: { development: "This service is in development", planned: "This service is planned" },
    comingText: {
      development: "What follows is its approved design. Details may change before launch; register interest and we'll open it to you first.",
      planned: "What follows is its approved design. It will be built with a first client who needs it; register interest to be that client.",
    },
    preview: "Design preview",
    featuresEyebrow: "What it does",
    featuresTitle: "Everything the work needs, on one record",
    flowEyebrow: "How it flows",
    flowTitle: "From the first step to the last",
    aiEyebrow: "AI at work",
    assistant: "ROUTEL Assistant",
    you: "You",
    confirm: "Waits for your confirmation",
    versusEyebrow: "ROUTEL vs traditional systems",
    versusTitle: "Where the difference shows",
    cols: ["", "Traditional systems", "ROUTEL"],
    audienceEyebrow: "Who it's for",
    audienceTitle: "Built for the people who do the work",
    faqTitle: "Questions",
    relatedTitle: "Related solutions",
  },
  ar: {
    solutions: "الحلول",
    stage: { live: "متاحة الآن", development: "قيد التطوير", planned: "مخطط" },
    demo: "اطلب عرضاً تجريبياً",
    interest: "سجّل اهتمامك",
    module: "شاهد الوحدة",
    guide: "اقرأ الدليل",
    comingTitle: { development: "هذه الخدمة قيد التطوير", planned: "هذه الخدمة مخططة" },
    comingText: {
      development: "ما يلي تصميمها المعتمد، وقد تتغير التفاصيل قبل الإطلاق. سجّل اهتمامك وسنفتحها لك أولاً.",
      planned: "ما يلي تصميمها المعتمد، وتُبنى مع أول عميل يحتاجها. سجّل اهتمامك لتكون ذلك العميل.",
    },
    preview: "معاينة التصميم",
    featuresEyebrow: "ماذا تفعل",
    featuresTitle: "كل ما يحتاجه العمل، على سجل واحد",
    flowEyebrow: "كيف يسير العمل",
    flowTitle: "من أول خطوة حتى آخرها",
    aiEyebrow: "الذكاء الاصطناعي يعمل",
    assistant: "مساعد ROUTEL",
    you: "أنت",
    confirm: "ينتظر تأكيدك",
    versusEyebrow: "ROUTEL مقابل الأنظمة التقليدية",
    versusTitle: "أين يظهر الفرق",
    cols: ["", "الأنظمة التقليدية", "ROUTEL"],
    audienceEyebrow: "لمن صُمّمت",
    audienceTitle: "مبنية لمن ينجز العمل",
    faqTitle: "أسئلة",
    relatedTitle: "حلول ذات صلة",
  },
} as const;

/** A feature's picture: a small product card in a framed, dotted panel. */
function MockCard({ mock, preview }: { mock: Mock; preview?: string }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-fog-50 p-6 ring-1 ring-fog-200 sm:p-10">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle,var(--color-fog-300)_1px,transparent_1.2px)] [background-size:14px_14px] opacity-60 [mask-image:radial-gradient(circle_at_70%_30%,#000,transparent_70%)]" />
      <div aria-hidden className="absolute -end-16 -top-16 h-48 w-48 rounded-full bg-spark-200/50 blur-3xl" />
      <div className="relative mx-auto max-w-sm rounded-2xl bg-white shadow-float ring-1 ring-fog-200">
        <div className="flex items-center justify-between gap-3 border-b border-fog-100 px-4 py-3">
          <div className="flex items-center gap-1.5" aria-hidden>
            <span className="h-2 w-2 rounded-full bg-fog-200" />
            <span className="h-2 w-2 rounded-full bg-fog-200" />
            <span className="h-2 w-2 rounded-full bg-spark-400" />
          </div>
          {preview ? <span className="rounded-full bg-fog-100 px-2 py-0.5 text-[10.5px] font-semibold text-fog-500">{preview}</span> : null}
        </div>
        <div className="px-5 pb-5 pt-4">
          <div className="flex items-start justify-between gap-3">
            <p className="font-display text-[15px] font-bold leading-snug text-ink-900" dir="auto">{mock.title}</p>
            {mock.badge ? (
              <span className="shrink-0 rounded-full bg-spark-50 px-2.5 py-0.5 text-[11px] font-semibold text-spark-700 ring-1 ring-spark-200">{mock.badge}</span>
            ) : null}
          </div>
          <dl className="mt-4 divide-y divide-fog-100 rounded-xl bg-fog-50/70 ring-1 ring-fog-100">
            {mock.rows.map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-4 px-3.5 py-2.5 text-[13px]">
                <dt className="text-fog-500" dir="auto">{k}</dt>
                <dd className="text-end font-semibold text-ink-900" dir="auto">{v}</dd>
              </div>
            ))}
          </dl>
          {mock.foot ? (
            <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-ink-900 px-3.5 py-1.5 text-[12px] font-semibold text-white">
              <Check className="h-3.5 w-3.5 text-spark-300" strokeWidth={3} />
              {mock.foot}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function ServicePageTemplate({
  locale,
  service,
  content,
  related,
}: {
  locale: Locale;
  service: Service;
  content: ServicePageCopy;
  related: Service[];
}) {
  const t = copy[locale];
  const live = service.stage === "live";
  const stage = service.stage;
  const Icon = service.icon;
  const primary = live ? { href: `/demo?service=${service.slug}`, label: t.demo } : { href: `/demo?service=${service.slug}&interest=1`, label: t.interest };
  const url = `${site.url}${locale === "ar" ? "/ar" : ""}/solutions/${service.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t.solutions, item: `${site.url}${locale === "ar" ? "/ar" : ""}/solutions` },
          { "@type": "ListItem", position: 2, name: service.name, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        inLanguage: locale,
        mainEntity: content.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-white">
        <div aria-hidden className="grid-fade absolute inset-0" />
        <Container className="relative grid items-center gap-12 pb-28 pt-10 sm:pt-14 lg:grid-cols-[1.02fr_1fr] lg:gap-10 lg:pb-28 lg:pt-16">
          <div>
            <Reveal>
              <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[13px] text-fog-500">
                <Link href="/solutions" className="hover:text-ink-900">{t.solutions}</Link>
                <ChevronRight className="h-3.5 w-3.5 rtl:-scale-x-100" />
                <span className="text-ink-900">{service.name}</span>
              </nav>
            </Reveal>
            <Reveal delay={0.04}>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink-900 text-spark-400">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12.5px] font-semibold",
                    live ? "bg-spark-50 text-spark-700 ring-1 ring-spark-200" : "bg-fog-100 text-fog-700",
                  )}
                >
                  {live ? <Sparkles className="h-3.5 w-3.5" /> : <Clock className="h-3.5 w-3.5" />}
                  {t.stage[stage]}
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="font-display mt-5 max-w-2xl text-balance text-[2.4rem] font-extrabold leading-[1.04] text-ink-900 sm:text-[3.1rem] lg:text-[3.5rem]">
                {content.headline}
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-fog-600">{content.lead}</p>
            </Reveal>
            <Reveal delay={0.16} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Button href={primary.href} size="lg" variant="inverse">
                {primary.label}
                <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
              </Button>
              {service.module ? (
                <Button href={service.module} size="lg" variant="secondary">
                  {t.module}
                </Button>
              ) : null}
              {service.doc ? (
                <Link href={service.doc} className="inline-flex items-center gap-1.5 px-2 text-[14px] font-semibold text-ink-900 hover:text-spark-700">
                  <BookOpen className="h-4 w-4" />
                  {t.guide}
                </Link>
              ) : null}
            </Reveal>
          </div>

          <Reveal delay={0.1} className="relative">
            <ServiceScene slug={service.slug} locale={locale} />
            <div className="absolute bottom-0 start-4 w-[min(80%,320px)] translate-y-[62%] rounded-2xl bg-white/95 p-4 shadow-float ring-1 ring-fog-200 backdrop-blur sm:start-8 sm:p-5">
              <p className="font-display text-4xl font-extrabold leading-none text-ink-900 sm:text-5xl">
                {content.stat.value}
              </p>
              <p className="mt-2 text-[13px] font-medium leading-snug text-fog-600">{content.stat.label}</p>
              <span aria-hidden className="mt-3 block h-1 w-12 rounded-full bg-spark-400" />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── The figures, Kpler-style ── */}
      <section className="border-y border-fog-200 bg-fog-50">
        <Container>
          <RevealGroup className="grid sm:grid-cols-3" stagger={0.06}>
            {content.figures.map((f) => (
              <RevealItem key={f.label} className="border-fog-200 px-2 py-8 [&:not(:first-child)]:border-t sm:px-8 sm:py-10 sm:[&:not(:first-child)]:border-s sm:[&:not(:first-child)]:border-t-0">
                <p className="font-display text-4xl font-extrabold text-ink-900 sm:text-[2.75rem]">
                  {f.value}
                </p>
                <p className="mt-2 max-w-xs text-[14px] leading-relaxed text-fog-600">{f.label}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {!live ? (
        <Container className="pt-14">
          <Reveal className="flex items-start gap-4 rounded-2xl border border-dashed border-fog-300 bg-white p-5 sm:p-6">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-fog-100 text-fog-600">
              <Clock className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-[16px] font-bold text-ink-900">{t.comingTitle[stage as "development" | "planned"]}</p>
              <p className="mt-1 text-[14px] leading-relaxed text-fog-600">{t.comingText[stage as "development" | "planned"]}</p>
            </div>
          </Reveal>
        </Container>
      ) : null}

      {/* ── What it does: features with their pictures ── */}
      <Section className="pt-16 sm:pt-20">
        <SectionHeading eyebrow={t.featuresEyebrow} title={t.featuresTitle} />
        <div className="mt-16 space-y-20 sm:space-y-24">
          {content.features.map((f, i) => (
            <div key={f.title} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <Reveal className={cn(i % 2 === 1 && "lg:order-2")}>
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-spark-600">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display mt-3 text-balance text-[1.75rem] font-bold leading-tight text-ink-900 sm:text-[2rem]">{f.title}</h3>
                <p className="mt-4 max-w-lg text-pretty text-[16px] leading-relaxed text-fog-600">{f.text}</p>
                <ul className="mt-6 space-y-2.5">
                  {f.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-[14.5px] text-ink-900">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-spark-100 text-spark-700">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.08} className={cn(i % 2 === 1 && "lg:order-1")}>
                <MockCard mock={f.mock} preview={live ? undefined : t.preview} />
              </Reveal>
            </div>
          ))}
        </div>
      </Section>

      {/* ── How it flows ── */}
      <Section tone="dark">
        <SectionHeading eyebrow={t.flowEyebrow} eyebrowTone="dark" title={t.flowTitle} tone="dark" />
        <RevealGroup
          className={cn("mt-14 grid gap-4 sm:grid-cols-2", content.flow.length > 5 ? "lg:grid-cols-6" : "lg:grid-cols-5")}
          stagger={0.06}
        >
          {content.flow.map((s, i) => (
            <RevealItem key={s.title} className="relative rounded-2xl bg-white/[0.04] p-5 ring-1 ring-white/10">
              <span className="font-display flex h-9 w-9 items-center justify-center rounded-full bg-spark-400 text-[14px] font-bold text-ink-950">{i + 1}</span>
              <p className="font-display mt-4 text-[17px] font-bold text-white">{s.title}</p>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-white/60">{s.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* ── AI at work ── */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading eyebrow={t.aiEyebrow} eyebrowTone="spark" title={content.ai.title} description={content.ai.text} align="left" />
            {content.ai.tools?.length ? (
              <ul className="mt-6 flex flex-wrap gap-2">
                {content.ai.tools.map((tool) => (
                  <li key={tool} className="rounded-lg bg-fog-50 px-2.5 py-1 font-mono text-[12px] text-fog-700 ring-1 ring-fog-200" dir="ltr">
                    {tool}
                  </li>
                ))}
              </ul>
            ) : null}
          </Reveal>
          <Reveal delay={0.08}>
            <div className="relative rounded-3xl bg-[linear-gradient(160deg,var(--color-spark-50),#fff_55%)] p-5 ring-1 ring-fog-200 sm:p-8">
              <div className="mx-auto max-w-md overflow-hidden rounded-2xl bg-white shadow-float ring-1 ring-fog-200">
                <div className="flex items-center gap-2.5 border-b border-fog-100 px-4 py-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-900 text-spark-400">
                    <Bot className="h-4 w-4" />
                  </span>
                  <span className="text-[13.5px] font-semibold text-ink-900">{t.assistant}</span>
                  <span className="ms-auto h-2 w-2 rounded-full bg-spark-400" />
                </div>
                <div className="space-y-3 px-4 py-5">
                  <div className="flex justify-end">
                    <p className="max-w-[85%] rounded-2xl rounded-ee-md bg-ink-900 px-3.5 py-2.5 text-[13.5px] leading-relaxed text-white" dir="auto">
                      {content.ai.prompt}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-spark-100 text-spark-700">
                      <Sparkles className="h-3.5 w-3.5" />
                    </span>
                    <div className="max-w-[85%]">
                      <p className="rounded-2xl rounded-es-md bg-fog-50 px-3.5 py-2.5 text-[13.5px] leading-relaxed text-ink-900 ring-1 ring-fog-100" dir="auto">
                        {content.ai.reply}
                      </p>
                      <p className="mt-2 inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-spark-700">
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                        {t.confirm}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ── ROUTEL vs traditional systems ── */}
      <Section tone="muted">
        <SectionHeading eyebrow={t.versusEyebrow} title={t.versusTitle} />
        <Reveal className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-fog-200">
          <div className="hidden grid-cols-[0.8fr_1fr_1fr] border-b border-fog-200 bg-fog-50 text-[12px] font-semibold uppercase tracking-[0.1em] md:grid">
            <span className="px-6 py-4 text-fog-500">{t.cols[0]}</span>
            <span className="px-6 py-4 text-fog-500">{t.cols[1]}</span>
            <span className="bg-ink-900 px-6 py-4 text-spark-400">{t.cols[2]}</span>
          </div>
          <ul>
            {content.versus.map((r) => (
              <li key={r.topic} className="grid border-b border-fog-100 last:border-b-0 md:grid-cols-[0.8fr_1fr_1fr]">
                <p className="px-6 pb-1 pt-5 font-display text-[15px] font-bold text-ink-900 md:py-5">{r.topic}</p>
                <p className="flex items-start gap-2.5 px-6 py-2 text-[14px] leading-relaxed text-fog-600 md:py-5">
                  <Minus className="mt-1 h-4 w-4 shrink-0 text-fog-400" aria-hidden />
                  <span>
                    <span className="sr-only md:hidden">{t.cols[1]}: </span>
                    {r.them}
                  </span>
                </p>
                <p className="flex items-start gap-2.5 bg-spark-50/60 px-6 pb-5 pt-2 text-[14px] font-medium leading-relaxed text-ink-900 md:py-5">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-spark-600" strokeWidth={3} aria-hidden />
                  <span>
                    <span className="sr-only md:hidden">{t.cols[2]}: </span>
                    {r.us}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      {/* ── Who it's for ── */}
      <Section>
        <SectionHeading eyebrow={t.audienceEyebrow} title={t.audienceTitle} />
        <RevealGroup className="mt-12 grid gap-5 md:grid-cols-3" stagger={0.06}>
          {content.audience.map((a, i) => (
            <RevealItem key={a.title} className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-fog-200">
              <span className="font-display text-[13px] font-bold text-spark-600">{String(i + 1).padStart(2, "0")}</span>
              <p className="font-display mt-3 text-lg font-bold text-ink-900">{a.title}</p>
              <p className="mt-1.5 text-[14px] leading-relaxed text-fog-600">{a.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* ── Questions ── */}
      <Section tone="muted" className="py-16 sm:py-20">
        <SectionHeading title={t.faqTitle} />
        <Faq items={content.faqs} className="mt-10" />
      </Section>

      {/* ── Related ── */}
      <Section className="py-16 sm:py-20">
        <h2 className="font-display text-2xl font-bold text-ink-900">{t.relatedTitle}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {related.map((r) => {
            const RIcon = r.icon;
            return (
              <Link key={r.slug} href={r.href} className="group flex items-start gap-4 rounded-2xl bg-white p-5 ring-1 ring-fog-200 transition-shadow hover:shadow-float">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink-900 text-spark-400">
                  <RIcon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="font-display text-[15.5px] font-bold text-ink-900">{r.name}</span>
                    {r.stage !== "live" ? <span className="rounded-full bg-fog-100 px-2 py-0.5 text-[10.5px] font-semibold text-fog-500">{t.stage[r.stage]}</span> : null}
                  </span>
                  <span className="mt-1 block text-[13px] leading-relaxed text-fog-600">{r.short}</span>
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-fog-400 transition-transform group-hover:text-spark-600 rtl:-scale-x-100" />
              </Link>
            );
          })}
        </div>
      </Section>

      <div className="pt-6">
        <Cta />
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}
