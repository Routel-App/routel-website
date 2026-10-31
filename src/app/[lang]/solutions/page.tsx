import type { Metadata } from "next";
import Link from "@/components/i18n/link";
import { ArrowRight, ArrowUpRight, Bot, CheckCircle2, Clock } from "lucide-react";
import { Section, SectionHeading, Eyebrow } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { getServices, getSegments, type Service } from "@/lib/services";
import { getLocale } from "@/lib/locale-server";
import type { Locale } from "@/lib/i18n";
import { Cta } from "@/components/home/cta";
import { cn } from "@/lib/utils";

const copy = {
  en: {
    metaTitle: "Solutions",
    metaDescription:
      "Routel, the Maritime & Logistics Operating System: sea and air freight forwarding, consolidation and LCL, arrival notices and delivery orders today; NVOCC, land transport, warehousing, shipping agency, customs brokerage and 3PL inventory next.",
    eyebrow: "Solutions",
    title: "Every line of the trade, on one AI operating system",
    lead: "Routel automates the daily work of maritime and logistics companies end to end: one booking at the centre, every document generated from it, and an AI assistant that runs the operation with you. Open the services your company offers; each one switches on as a module.",
    live: "Available now",
    liveTitle: "Running on Routel today",
    liveLead: "Built, working and open to every company today.",
    coming: "Rolling out",
    comingTitle: "The next modules on the platform",
    comingLead: "On the roadmap. Each switches on as a module of the same platform, without changing how your team already works.",
    learn: "Learn more",
    soon: "Coming soon",
    who: "Who it's for",
    whoTitle: "Built for the companies that move the world's cargo",
    aiTitle: "One AI assistant across every service",
    aiText: "Whatever the mode, the assistant reads the carrier's documents, prepares the booking, the waybill or the invoice, and waits for your confirmation before anything is saved.",
    aiLink: "See the AI assistant",
    demo: "Request a demo",
    pricing: "See pricing",
  },
  ar: {
    metaTitle: "الحلول",
    metaDescription:
      "Routel، نظام التشغيل البحري واللوجستي: الشحن البحري والجوي والتجميع وLCL وإشعارات الوصول وأوامر التسليم اليوم، والناقل غير المالك للسفن والنقل البري والمستودعات والوكالة الملاحية والتخليص الجمركي ومخزون 3PL قريباً.",
    eyebrow: "الحلول",
    title: "كل خطوط التجارة، على نظام تشغيل واحد يقوده الذكاء الاصطناعي",
    lead: "يؤتمت Routel العمل اليومي لشركات الشحن البحري والخدمات اللوجستية من البداية إلى النهاية: حجز واحد في المركز، وكل مستند يُنشأ منه، ومساعد ذكي يدير العملية معك. افتح الخدمات التي تقدمها شركتك، وكل خدمة تعمل كوحدة.",
    live: "متاحة الآن",
    liveTitle: "تعمل على Routel اليوم",
    liveLead: "مبنية وتعمل ومتاحة لكل شركة اليوم.",
    coming: "قيد الإطلاق",
    comingTitle: "الوحدات التالية على المنصة",
    comingLead: "على خارطة الطريق. كل خدمة تعمل كوحدة في المنصة نفسها، دون أن تغيّر طريقة عمل فريقك الحالية.",
    learn: "اعرف المزيد",
    soon: "قريباً",
    who: "لمن صُمّم",
    whoTitle: "مبني للشركات التي تنقل بضائع العالم",
    aiTitle: "مساعد ذكي واحد في كل الخدمات",
    aiText: "أياً كان نمط الشحن، يقرأ المساعد مستندات الناقل، ويجهّز الحجز أو البوليصة الجوية أو الفاتورة، وينتظر تأكيدك قبل حفظ أي شيء.",
    aiLink: "تعرّف على المساعد الذكي",
    demo: "اطلب عرضاً تجريبياً",
    pricing: "اطلع على الأسعار",
  },
} satisfies Record<Locale, Record<string, string>>;

export async function generateMetadata(): Promise<Metadata> {
  const t = copy[await getLocale()];
  return { title: t.metaTitle, description: t.metaDescription };
}

function ServiceCard({ s, t }: { s: Service; t: (typeof copy)["en"] }) {
  const Icon = s.icon;
  const live = s.status === "live";
  const body = (
    <>
      <div className="flex items-start justify-between gap-3">
        <span className={cn("flex h-11 w-11 items-center justify-center rounded-xl", live ? "bg-ink-900 text-spark-400" : "bg-fog-100 text-fog-500")}>
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </span>
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold",
            live ? "bg-spark-50 text-spark-700 ring-1 ring-spark-200" : "bg-fog-100 text-fog-600",
          )}
        >
          {live ? <CheckCircle2 className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
          {live ? t.live : t.soon}
        </span>
      </div>
      <h3 className="font-display mt-5 text-xl font-bold text-ink-900">{s.name}</h3>
      <p className="mt-2 text-[14px] leading-relaxed text-fog-600">{s.short}</p>
      <ul className="mt-4 space-y-1.5">
        {s.points.map((p) => (
          <li key={p} className="flex items-start gap-2 text-[13px] text-fog-700">
            <span className={cn("mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full", live ? "bg-spark-500" : "bg-fog-300")} />
            {p}
          </li>
        ))}
      </ul>
      <span className={cn("mt-auto inline-flex items-center gap-1 pt-5 text-[13.5px] font-semibold", live ? "text-spark-700" : "text-ink-900")}>
        {t.learn}
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 ltr:group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
      </span>
    </>
  );
  const cls = cn(
    "group flex h-full flex-col rounded-2xl p-6 transition-shadow",
    live ? "bg-white shadow-card ring-1 ring-fog-200 hover:shadow-float" : "border border-dashed border-fog-300 bg-fog-50 hover:bg-white",
  );
  return (
    <Link href={s.href} id={s.slug} className={cls}>
      {body}
    </Link>
  );
}

export default async function SolutionsPage() {
  const locale = await getLocale();
  const t = copy[locale];
  const services = getServices(locale);
  const live = services.filter((s) => s.status === "live");
  const coming = services.filter((s) => s.status === "coming");
  const segments = getSegments(locale);
  const byslug = Object.fromEntries(services.map((s) => [s.slug, s]));

  return (
    <>
      <section className="relative overflow-hidden border-b border-fog-200 bg-white">
        <div aria-hidden className="grid-fade absolute inset-0" />
        <Container className="relative grid gap-10 py-16 sm:py-24 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <Reveal>
            <Eyebrow tone="spark">{t.eyebrow}</Eyebrow>
            <h1 className="font-display mt-5 max-w-3xl text-balance text-4xl font-extrabold leading-[1.04] text-ink-900 sm:text-5xl lg:text-[3.6rem]">{t.title}</h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-fog-600">{t.lead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/demo" size="lg">
                {t.demo}
                <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
              </Button>
              <Button href="/pricing" size="lg" variant="secondary">
                {t.pricing}
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="grid grid-cols-2 gap-3">
            {[
              { v: String(live.length), l: t.live },
              { v: String(coming.length), l: t.coming },
            ].map((x) => (
              <div key={x.l} className="rounded-2xl bg-ink-900 p-5 text-white">
                <p className="font-display text-5xl font-extrabold text-spark-400">{x.v}</p>
                <p className="mt-2 text-sm text-white/70">{x.l}</p>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      <Section>
        <SectionHeading align="left" eyebrow={t.live} title={t.liveTitle} description={t.liveLead} className="max-w-3xl" />
        <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
          {live.map((s) => (
            <RevealItem key={s.slug} className="h-full">
              <ServiceCard s={s} t={t} />
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-8">
          <Link href="/platform/ai-assistant" className="group flex flex-col gap-4 rounded-2xl bg-ink-950 p-6 text-white sm:flex-row sm:items-center sm:p-8">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-spark-400 text-ink-950">
              <Bot className="h-6 w-6" />
            </span>
            <div className="flex-1">
              <p className="font-display text-xl font-bold">{t.aiTitle}</p>
              <p className="mt-1 max-w-3xl text-[14.5px] leading-relaxed text-white/70">{t.aiText}</p>
            </div>
            <span className="inline-flex items-center gap-1 text-[14px] font-semibold text-spark-300">
              {t.aiLink}
              <ArrowRight className="h-4 w-4 transition-transform ltr:group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
            </span>
          </Link>
        </Reveal>
      </Section>

      <Section tone="muted">
        <SectionHeading align="left" eyebrow={t.coming} title={t.comingTitle} description={t.comingLead} className="max-w-3xl" />
        <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
          {coming.map((s) => (
            <RevealItem key={s.slug} className="h-full">
              <ServiceCard s={s} t={t} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section>
        <SectionHeading eyebrow={t.who} title={t.whoTitle} />
        <RevealGroup className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-5" stagger={0.05}>
          {segments.map((g) => (
            <RevealItem key={g.slug} className="h-full">
              <div id={`for-${g.slug}`} className="flex h-full flex-col rounded-2xl bg-white p-5 shadow-card ring-1 ring-fog-200">
                <p className="font-display text-[17px] font-bold text-ink-900">{g.name}</p>
                <p className="mt-2 text-[13.5px] leading-relaxed text-fog-600">{g.text}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {g.services.map((sl) => {
                    const s = byslug[sl];
                    return (
                      <li key={sl} className={cn("rounded-full px-2.5 py-1 text-[11.5px] font-medium", s.status === "live" ? "bg-spark-50 text-spark-800" : "bg-fog-100 text-fog-600")}>
                        {s.name}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Cta />
    </>
  );
}
