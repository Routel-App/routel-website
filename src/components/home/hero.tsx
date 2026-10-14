import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import Link from "@/components/i18n/link";
import { Replay, Reveal } from "@/components/motion/reveal";
import { getLocale } from "@/lib/locale-server";
import type { Locale } from "@/lib/i18n";
import { DashboardShot } from "@/components/shots/dashboard-shot";
import { AssistantChatShot } from "@/components/shots/ai-shots";
import { ShotScaler } from "@/components/shots/scaler";

const copy = {
  en: {
    eyebrow: "Routel's built-in AI assistant calls tools and runs your operations automatically",
    eyebrowBadge: "New",
    titleBefore: "Run your ",
    titleHighlight: "freight forwarding",
    titleAfter: " business from one place.",
    lead: "Quotation to booking, Bill of Lading, invoice and live P&L, with every number flowing into books that stay current on their own. No journal entries, no spreadsheets on the side, and an AI assistant inside the system that does the work when you ask.",
    demo: "Request a demo",
    docs: "Read the docs",
  },
  ar: {
    eyebrow: "مساعد ذكي مدمج في Routel يستدعي الأدوات وينفّذ عملياتك تلقائيًا",
    eyebrowBadge: "جديد",
    titleBefore: "أدِر شركة ",
    titleHighlight: "الشحن",
    titleAfter: " الخاصة بك من مكان واحد.",
    lead: "من عرض السعر إلى الحجز وبوليصة الشحن والفاتورة وقائمة الأرباح والخسائر (P&L) المباشرة، وكل رقم يتدفق إلى دفاتر تبقى محدّثة من تلقاء نفسها. لا قيود محاسبية يدوية، ولا جداول بيانات جانبية، ومعك داخل النظام مساعد ذكي ينجز العمل بطلب منك.",
    demo: "اطلب عرضاً تجريبياً",
    docs: "اقرأ التوثيق",
  },
} satisfies Record<Locale, Record<string, string>>;

/**
 * Full-bleed dark hero. The product mockup hangs over the bottom edge into
 * the next (white) section, which reserves space for it with top padding.
 */
export async function Hero() {
  const locale = await getLocale();
  const t = copy[locale];
  // overflow-x-clip: the mockup glow is wider than a phone screen; clip (not hidden) lets the mockup still hang into the next section.
  return (
    <section className="relative -mt-16 overflow-x-clip pt-16">
      <div aria-hidden className="hero-aurora absolute inset-x-0 top-0 -z-10 h-full overflow-hidden">
        <div className="grid-fade-dark absolute inset-0" />
      </div>

      <Container className="flex flex-col items-center pt-16 text-center sm:pt-24">
        <Reveal>
          <Link
            href="/platform/ai-assistant"
            className="group inline-flex items-center gap-2 rounded-full bg-white/[0.06] py-1.5 pe-4 ps-1.5 text-[13.5px] font-medium text-white/90 ring-1 ring-inset ring-spark-400/35 transition-colors hover:bg-white/10 sm:text-sm"
          >
            <span className="inline-flex items-center gap-1 rounded-full bg-spark-400 px-2.5 py-0.5 text-[11.5px] font-semibold text-ink-950">
              <Sparkles className="h-3 w-3" />
              {t.eyebrowBadge}
            </span>
            {t.eyebrow}
            <ArrowRight className="h-3.5 w-3.5 text-spark-300 transition-transform ltr:group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
          </Link>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="font-display mt-6 max-w-4xl text-balance text-[2.6rem] font-extrabold leading-[1.02] text-white sm:text-6xl lg:text-[4.4rem]">
            {t.titleBefore}
            <span className="text-gradient-brand">{t.titleHighlight}</span>
            {t.titleAfter}
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-white/70 sm:text-xl">{t.lead}</p>
        </Reveal>
        <Reveal delay={0.24} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button href="/demo" size="lg" variant="inverse">
            {t.demo}
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button href="/docs" size="lg" variant="inverse-ghost">
            {t.docs}
          </Button>
        </Reveal>
      </Container>

      {/* Negative bottom margin lets the mockup hang over the section's edge into the next one. */}
      <Container className="relative mt-14 -mb-28 sm:mt-20 sm:-mb-36">
        <Reveal amount={0.1} className="relative mx-auto max-w-6xl">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-16 -top-10 bottom-10 -z-10 rounded-[48px] bg-[radial-gradient(60%_50%_at_50%_0%,rgb(71_188_172/0.28),transparent_70%)] blur-3xl"
          />
          <ShotScaler>
            <DashboardShot locale={locale} />
          </ShotScaler>
          {/* The assistant at work, floating over the dashboard's corner. */}
          <Replay amount={0.2} className="absolute end-0 top-6 hidden w-[400px] [zoom:0.5] md:block lg:-end-4 lg:[zoom:0.64]">
            <AssistantChatShot locale={locale} />
          </Replay>
        </Reveal>
      </Container>
    </section>
  );
}
