import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Cta } from "@/components/home/cta";
import type { Locale } from "@/lib/i18n";
import { getLocale } from "@/lib/locale-server";

type CaseStudy = {
  company: string;
  industry: string;
  since: string;
  challenge: string;
  solution: string;
  results: string[];
};

/**
 * PLACEHOLDER CONTENT — real case studies pending.
 * Two customers are live on Routel today and have agreed to be featured;
 * their actual numbers, quotes and details are not yet written up here.
 * Structure is real and ready — replace every [bracketed] field below with
 * the real customer's details and results before this page goes live
 * (in both the English and the Arabic copy).
 * Do not fill these in with invented numbers.
 */
const copy = {
  en: {
    metaTitle: "Case Studies",
    metaDescription: "How real forwarders run on Routel today — case studies are being written up with two live customers.",
    heroTitle: "Real forwarders, running on Routel today",
    heroLead:
      "Two customers are live on Routel’s full system right now. We’re writing up their numbers properly rather than publishing anything before it’s verified — the structure below is ready, and the real figures are coming.",
    eyebrow: "Coming soon",
    title: "These two write-ups are in progress",
    description:
      "Every field below is a placeholder for a real customer's real numbers — not a projection, not an example. Check back, or ask us directly when you request a demo.",
    challenge: "The challenge",
    solution: "The solution",
    results: "The results",
    ask: "Want the real detail now, ahead of publication? Ask for it directly.",
    demo: "Request a demo",
    caseStudies: [
      {
        company: "[Customer A — company name pending]",
        industry: "[Industry / trade lane]",
        since: "[Live on Routel since]",
        challenge:
          "[What their operation looked like before Routel — the specific bottleneck or patchwork of tools they were running on.]",
        solution: "[Which Routel modules they actually run on day to day, and how their team adopted them.]",
        results: [
          "[Real, measured result #1 — e.g. time saved on a specific task]",
          "[Real, measured result #2 — e.g. change in invoicing turnaround]",
          "[Real, measured result #3 — e.g. reduction in a specific error type]",
        ],
      },
      {
        company: "[Customer B — company name pending]",
        industry: "[Industry / trade lane]",
        since: "[Live on Routel since]",
        challenge:
          "[What their operation looked like before Routel — the specific bottleneck or patchwork of tools they were running on.]",
        solution: "[Which Routel modules they actually run on day to day, and how their team adopted them.]",
        results: ["[Real, measured result #1]", "[Real, measured result #2]", "[Real, measured result #3]"],
      },
    ],
  },
  ar: {
    metaTitle: "دراسات الحالة",
    metaDescription: "كيف تعمل شركات شحن حقيقية على Routel اليوم — نعمل على إعداد دراسات حالة مع عميلين يستخدمان النظام فعلياً.",
    heroTitle: "شركات شحن حقيقية تعمل على Routel اليوم",
    heroLead:
      "يعمل عميلان حالياً على نظام Routel الكامل. نحن نوثّق أرقامهما بعناية بدلاً من نشر أي شيء قبل التحقق منه — الهيكل أدناه جاهز، والأرقام الحقيقية في الطريق.",
    eyebrow: "قريباً",
    title: "هاتان الدراستان قيد الإعداد",
    description:
      "كل حقل أدناه مكان مخصص لأرقام حقيقية لعميل حقيقي — ليست توقعات ولا أمثلة. عُد لاحقاً، أو اسألنا مباشرة عندما تطلب عرضاً تجريبياً.",
    challenge: "التحدي",
    solution: "الحل",
    results: "النتائج",
    ask: "هل تريد التفاصيل الحقيقية الآن، قبل النشر؟ اطلبها منا مباشرة.",
    demo: "اطلب عرضاً تجريبياً",
    caseStudies: [
      {
        company: "[العميل أ — اسم الشركة قيد التأكيد]",
        industry: "[القطاع / خط التجارة]",
        since: "[يعمل على Routel منذ]",
        challenge: "[كيف كانت عملياتهم قبل Routel — نقطة الاختناق المحددة أو خليط الأدوات الذي كانوا يعملون به.]",
        solution: "[وحدات Routel التي يستخدمونها فعلياً يوماً بيوم، وكيف تبنّاها فريقهم.]",
        results: [
          "[نتيجة حقيقية مُقاسة رقم 1 — مثلاً: الوقت الموفَّر في مهمة محددة]",
          "[نتيجة حقيقية مُقاسة رقم 2 — مثلاً: التغيّر في سرعة إصدار الفواتير]",
          "[نتيجة حقيقية مُقاسة رقم 3 — مثلاً: انخفاض نوع محدد من الأخطاء]",
        ],
      },
      {
        company: "[العميل ب — اسم الشركة قيد التأكيد]",
        industry: "[القطاع / خط التجارة]",
        since: "[يعمل على Routel منذ]",
        challenge: "[كيف كانت عملياتهم قبل Routel — نقطة الاختناق المحددة أو خليط الأدوات الذي كانوا يعملون به.]",
        solution: "[وحدات Routel التي يستخدمونها فعلياً يوماً بيوم، وكيف تبنّاها فريقهم.]",
        results: ["[نتيجة حقيقية مُقاسة رقم 1]", "[نتيجة حقيقية مُقاسة رقم 2]", "[نتيجة حقيقية مُقاسة رقم 3]"],
      },
    ],
  },
} satisfies Record<
  Locale,
  {
    metaTitle: string;
    metaDescription: string;
    heroTitle: string;
    heroLead: string;
    eyebrow: string;
    title: string;
    description: string;
    challenge: string;
    solution: string;
    results: string;
    ask: string;
    demo: string;
    caseStudies: CaseStudy[];
  }
>;

export async function generateMetadata(): Promise<Metadata> {
  const t = copy[await getLocale()];
  return { title: t.metaTitle, description: t.metaDescription };
}

export default async function CaseStudiesPage() {
  const t = copy[await getLocale()];
  return (
    <>
      <section className="border-b border-fog-200 bg-fog-50 pb-14 pt-16 sm:pt-24">
        <Container>
          <Reveal className="max-w-3xl">
            <h1 className="font-display text-balance text-4xl font-bold leading-[1.05] text-ink-900 sm:text-5xl">
              {t.heroTitle}
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-fog-600">{t.heroLead}</p>
          </Reveal>
        </Container>
      </section>

      <Section className="py-16 sm:py-20">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.description} />
        <RevealGroup className="mt-10 grid gap-6 lg:grid-cols-2" stagger={0.08}>
          {t.caseStudies.map((c) => (
            <RevealItem key={c.company} className="flex flex-col rounded-2xl border border-dashed border-fog-300 bg-fog-50 p-7">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-fog-500">{c.industry}</p>
              <h3 className="font-display mt-2 text-xl font-bold text-ink-900">{c.company}</h3>
              <p className="mt-1 text-xs text-fog-500">{c.since}</p>

              <div className="mt-5">
                <p className="text-[13px] font-semibold text-ink-900">{t.challenge}</p>
                <p className="mt-1 text-sm leading-relaxed text-fog-600">{c.challenge}</p>
              </div>
              <div className="mt-4">
                <p className="text-[13px] font-semibold text-ink-900">{t.solution}</p>
                <p className="mt-1 text-sm leading-relaxed text-fog-600">{c.solution}</p>
              </div>
              <div className="mt-4">
                <p className="text-[13px] font-semibold text-ink-900">{t.results}</p>
                <ul className="mt-1 space-y-1">
                  {c.results.map((r) => (
                    <li key={r} className="text-sm leading-relaxed text-fog-600">
                      • {r}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal className="mx-auto mt-10 max-w-xl text-center">
          <p className="text-sm text-fog-500">{t.ask}</p>
          <Button href="/demo" variant="secondary" className="mt-4">
            {t.demo}
          </Button>
        </Reveal>
      </Section>

      <Cta />
    </>
  );
}
