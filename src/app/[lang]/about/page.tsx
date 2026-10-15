import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { site } from "@/lib/site";
import { Cta } from "@/components/home/cta";
import type { Locale } from "@/lib/i18n";
import { getLocale } from "@/lib/locale-server";
import { Lottie } from "@/components/motion/lottie";
import { Ocean } from "@/components/home/ocean";

type Principle = { title: string; text: string };

const copy = {
  en: {
    metaTitle: "About",
    metaDescription: `${site.name} started as a working freight forwarder's own internal system for running its operations, before it was offered to other forwarders as a hosted service.`,
    heroTitle: "Built inside a working freight forwarder, not a product lab",
    heroLead: `${site.name} grew out of the internal system a working freight forwarder in Malaysia built to run its own shipments every day. It was running on real bookings before it had a name — now it’s offered to other forwarders as a hosted service.`,
    demo: "Request a demo",
    platform: "See the platform",
    originEyebrow: "Where it came from",
    originTitle: "A system that had to work before it could be sold",
    originDescription: `Most software gets built for a market first and a real customer second. ${site.name} ran the other way: a working freight forwarder built it to run its own operations, used it on real shipments, and only then opened it up to other forwarders.`,
    originBody:
      "That order matters. A feature only made it into the product because a real shipment needed it — not because it would look good on a comparison chart. The result is a platform shaped by how a forwarding office actually works: one booking, many hands, and a ledger that has to be right at the end of the month.",
    principlesEyebrow: "What we build around",
    principlesTitle: "A few things we don't compromise on",
    principles: [
      {
        title: "Built from real operations, not a spec sheet",
        text: "Every module exists because a freight forwarder actually needed it day to day — not because it looked good on a features page.",
      },
      {
        title: "One record, not a patchwork",
        text: "A spreadsheet of rates, a template for quotations, a separate accounting package and a shared drive of PDFs is how a number gets re-typed or a document gets lost. Routel keeps one booking record that every department works from.",
      },
      {
        title: "AI that proposes, a person who decides",
        text: "The assistant can read and report freely, but every write — a booking, an invoice, an expense — stops as a proposal until someone confirms it. Nothing gets created on a misread sentence.",
      },
      {
        title: "Arabic is not an afterthought",
        text: "The assistant works fully in Arabic or English, switchable mid-conversation, because a meaningful part of the freight-forwarding world runs its business in Arabic.",
      },
    ],
    nowEyebrow: "Where we are now",
    nowTitle: "Running on real shipments, offered as a hosted service",
    nowDescription: `${site.name} is a hosted service, run by the same team that built it for its own operations first. See what that looks like on real customer data in our case studies.`,
    caseStudies: "Read our case studies",
    forEyebrow: "Who it's built for",
    forTitle: "For the forwarding office, from the owner to the accounts desk",
    forItems: [
      { title: "Owners and managers", text: "Every booking's margin, the month's P&L, cash and who owes what, live, without waiting for the accountant." },
      { title: "Operations", text: "Bookings, carrier confirmations, cut-offs, containers and B/Ls on one record, with alerts for what's slipping." },
      { title: "Sales and pricing", text: "Current buying rates per lane, quotations in minutes, and a click to turn the accepted one into a booking." },
      { title: "Finance", text: "Invoices from the booking's charges, payments matched from the mailbox, and books that are always up to date." },
    ],
  },
  ar: {
    metaTitle: "من نحن",
    metaDescription: `بدأ ${site.name} نظاماً داخلياً لشركة شحن عاملة تدير به عملياتها، قبل أن يُقدَّم لشركات الشحن الأخرى كخدمة مستضافة.`,
    heroTitle: "بُني داخل شركة شحن عاملة، لا في مختبر منتجات",
    heroLead: `نشأ ${site.name} من النظام الداخلي الذي بنته شركة شحن عاملة في ماليزيا لإدارة شحناتها اليومية. كان يعمل على حجوزات حقيقية قبل أن يحمل اسماً — وهو اليوم متاح لشركات الشحن الأخرى كخدمة مستضافة.`,
    demo: "اطلب عرضاً تجريبياً",
    platform: "تعرّف على المنصة",
    originEyebrow: "من أين جاء",
    originTitle: "نظام كان عليه أن يعمل قبل أن يُباع",
    originDescription: `تُبنى معظم البرمجيات للسوق أولاً ثم لعميل حقيقي لاحقاً. أما ${site.name} فسار في الاتجاه المعاكس: بنته شركة شحن عاملة لإدارة عملياتها، واستخدمته على شحنات حقيقية، ثم فتحته بعد ذلك فقط لشركات الشحن الأخرى.`,
    originBody:
      "هذا الترتيب مهم. لم تدخل أي ميزة إلى المنتج إلا لأن شحنة حقيقية احتاجت إليها — لا لأنها ستبدو جيدة في جدول مقارنة. والنتيجة منصة تشكّلت وفق طريقة عمل مكتب الشحن فعلاً: حجز واحد، وأيادٍ كثيرة، ودفتر أستاذ يجب أن يكون صحيحاً في نهاية الشهر.",
    principlesEyebrow: "ما نبني حوله",
    principlesTitle: "أمور لا نتهاون فيها",
    principles: [
      {
        title: "مبني من عمليات حقيقية، لا من قائمة مواصفات",
        text: "كل وحدة موجودة لأن شركة شحن احتاجت إليها فعلاً في عملها اليومي — لا لأنها بدت جيدة في صفحة الميزات.",
      },
      {
        title: "سجل واحد، لا خليط من الأدوات",
        text: "جدول بيانات للأسعار، وقالب لعروض الأسعار، وبرنامج محاسبة منفصل، ومجلد مشترك مليء بملفات PDF — هكذا يُعاد إدخال رقم يدوياً أو يضيع مستند. أما Routel فيحتفظ بسجل حجز واحد تعمل منه كل الأقسام.",
      },
      {
        title: "ذكاء اصطناعي يقترح، وإنسان يقرر",
        text: "يستطيع المساعد الذكي القراءة وإعداد التقارير بحرية، لكن كل عملية كتابة — حجز أو فاتورة أو مصروف — تتوقف كاقتراح حتى يؤكدها شخص ما. لا يُنشأ أي شيء بسبب جملة أُسيء فهمها.",
      },
      {
        title: "العربية ليست فكرة لاحقة",
        text: "يعمل المساعد الذكي بالكامل بالعربية أو الإنجليزية، مع إمكانية التبديل بينهما في منتصف المحادثة، لأن جزءاً مهماً من عالم الشحن يدير أعماله بالعربية.",
      },
    ],
    nowEyebrow: "أين نحن اليوم",
    nowTitle: "يعمل على شحنات حقيقية، ومتاح كخدمة مستضافة",
    nowDescription: `${site.name} خدمة مستضافة يديرها الفريق نفسه الذي بناها لعملياته الخاصة أولاً. اطّلع على شكل ذلك مع بيانات عملاء حقيقيين في دراسات الحالة لدينا.`,
    caseStudies: "اقرأ دراسات الحالة",
    forEyebrow: "لمن صُمّم",
    forTitle: "لمكتب الشحن كله، من المالك حتى المحاسبة",
    forItems: [
      { title: "الملاك والمديرون", text: "هامش كل حجز، وأرباح الشهر، والنقد، ومن يدين لكم بماذا، مباشرة ودون انتظار المحاسب." },
      { title: "العمليات", text: "الحجوزات وتأكيدات الناقلين ومواعيد الإغلاق والحاويات والبوالص في سجل واحد، مع تنبيهات لما يتأخر." },
      { title: "المبيعات والتسعير", text: "أسعار شراء سارية لكل مسار، وعروض أسعار في دقائق، ونقرة تحوّل العرض المقبول إلى حجز." },
      { title: "المالية", text: "فواتير من رسوم الحجز، ودفعات تُطابق من البريد، ودفاتر محدّثة دائماً." },
    ],
  },
} satisfies Record<
  Locale,
  {
    metaTitle: string;
    metaDescription: string;
    heroTitle: string;
    heroLead: string;
    demo: string;
    platform: string;
    originEyebrow: string;
    originTitle: string;
    originDescription: string;
    originBody: string;
    principlesEyebrow: string;
    principlesTitle: string;
    principles: Principle[];
    nowEyebrow: string;
    nowTitle: string;
    nowDescription: string;
    caseStudies: string;
    forEyebrow: string;
    forTitle: string;
    forItems: Principle[];
  }
>;

export async function generateMetadata(): Promise<Metadata> {
  const t = copy[await getLocale()];
  return { title: t.metaTitle, description: t.metaDescription };
}

export default async function AboutPage() {
  const t = copy[await getLocale()];
  return (
    <>
      <section className="border-b border-fog-200 bg-fog-50 pb-14 pt-16 sm:pt-24">
        <Container className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <Reveal className="max-w-3xl">
            <h1 className="font-display text-balance text-4xl font-bold leading-[1.05] text-ink-900 sm:text-5xl">
              {t.heroTitle}
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-fog-600">{t.heroLead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/demo" size="lg">{t.demo}</Button>
              <Button href="/platform" variant="secondary" size="lg">{t.platform}</Button>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="overflow-hidden rounded-3xl bg-ink-950 ring-1 ring-ink-800">
            <Lottie src="/lottie/ship-wave.json" className="aspect-[4/3] w-full" />
          </Reveal>
        </Container>
      </section>

      <Section className="py-16 sm:py-20">
        <SectionHeading eyebrow={t.originEyebrow} title={t.originTitle} description={t.originDescription} />
        <Reveal className="mx-auto mt-10 max-w-3xl text-pretty text-base leading-relaxed text-fog-600">
          {t.originBody}
        </Reveal>
      </Section>

      <Ocean />

      <Section className="py-16 sm:py-20">
        <SectionHeading eyebrow={t.forEyebrow} title={t.forTitle} />
        <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
          {t.forItems.map((p, i) => (
            <RevealItem key={p.title} className="rounded-2xl border border-fog-200 bg-white p-6 shadow-card">
              <span dir="ltr" className="font-mono text-[12px] font-semibold text-spark-600">0{i + 1}</span>
              <h3 className="font-display mt-2 text-[16px] font-semibold text-ink-900">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fog-600">{p.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section tone="muted" className="py-16 sm:py-20">
        <SectionHeading eyebrow={t.principlesEyebrow} title={t.principlesTitle} />
        <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2" stagger={0.06}>
          {t.principles.map((p) => (
            <RevealItem key={p.title} className="rounded-2xl border border-fog-200 bg-white p-6 shadow-card">
              <h3 className="font-display text-[16px] font-semibold text-ink-900">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fog-600">{p.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section className="py-16 sm:py-20">
        <SectionHeading eyebrow={t.nowEyebrow} title={t.nowTitle} description={t.nowDescription} />
        <Reveal className="mx-auto mt-6 max-w-2xl text-center">
          <Button href="/case-studies" variant="secondary">{t.caseStudies}</Button>
        </Reveal>
      </Section>

      <Cta />
    </>
  );
}
