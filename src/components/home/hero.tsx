import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { getLocale } from "@/lib/locale-server";
import type { Locale } from "@/lib/i18n";
import { HeroMockup } from "./hero-mockup";

const copy = {
  en: {
    eyebrow: "Now with an AI assistant that speaks Arabic and English",
    titleBefore: "Run your ",
    titleHighlight: "freight forwarding",
    titleAfter: " business from one place.",
    lead: "Quotation to booking, Bill of Lading, invoice and live P&L, with every number flowing into books that stay current on their own. No journal entries, no spreadsheets on the side.",
    demo: "Request a demo",
    docs: "Read the docs",
  },
  ar: {
    eyebrow: "الآن مع مساعد ذكي يتحدث العربية والإنجليزية",
    titleBefore: "أدِر شركة ",
    titleHighlight: "الشحن",
    titleAfter: " الخاصة بك من مكان واحد.",
    lead: "من عرض السعر إلى الحجز وبوليصة الشحن والفاتورة وقائمة الأرباح والخسائر (P&L) المباشرة، وكل رقم يتدفق إلى دفاتر تبقى محدّثة من تلقاء نفسها. لا قيود محاسبية يدوية، ولا جداول بيانات جانبية.",
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
          <Eyebrow tone="dark">
            <Sparkles className="h-3.5 w-3.5 text-spark-300" />
            {t.eyebrow}
          </Eyebrow>
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
        <HeroMockup />
      </Container>
    </section>
  );
}
