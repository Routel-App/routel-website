import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { getLocale } from "@/lib/locale-server";
import type { Locale } from "@/lib/i18n";
import {
  ApprovalsCard,
  ContainersCard,
  CurrencyCard,
  DocumentOrbitCard,
  StatusRingCard,
  LedgerCard,
  PaymentMatchCard,
  ReadsPdfCard,
  RevisionsCard,
} from "@/components/motion/bento-cards";

const copy: Record<Locale, { eyebrow: string; title: string; lead: string }> = {
  en: {
    eyebrow: "Watch it work",
    title: "The work your team does every day, done in one place",
    lead: "Each card is a piece of Routel doing its job: containers moving, documents read, payments matched and books kept, without a spreadsheet in sight.",
  },
  ar: {
    eyebrow: "شاهده يعمل",
    title: "العمل الذي يقوم به فريقك كل يوم، في مكان واحد",
    lead: "كل بطاقة جزء من Routel يؤدي عمله: حاويات تتحرك، ومستندات تُقرأ، ودفعات تُطابق، ودفاتر تُحدَّث، دون أي جدول بيانات.",
  },
};

export async function FeatureBento() {
  const locale = await getLocale();
  const t = copy[locale];
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,var(--color-teal-900)_0%,var(--color-ink-950)_70%)] py-20 text-white sm:py-28" id="bento">
      <div aria-hidden className="grid-fade-dark pointer-events-none absolute inset-0" />
      <Container className="relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow tone="dark">{t.eyebrow}</Eyebrow>
          <h2 className="font-display mt-4 text-balance text-3xl font-bold leading-[1.1] sm:text-4xl lg:text-[2.75rem]">{t.title}</h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-white/65 sm:text-lg">{t.lead}</p>
        </Reveal>
        <RevealGroup className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3" stagger={0.06} amount={0.05}>
          <RevealItem>
            <ContainersCard />
          </RevealItem>
          <RevealItem className="lg:col-span-2">
            <ReadsPdfCard />
          </RevealItem>
          <RevealItem>
            <CurrencyCard />
          </RevealItem>
          <RevealItem>
            <RevisionsCard />
          </RevealItem>
          <RevealItem>
            <PaymentMatchCard />
          </RevealItem>
          <RevealItem className="lg:col-span-2">
            <ApprovalsCard />
          </RevealItem>
          <RevealItem>
            <LedgerCard />
          </RevealItem>
          <RevealItem className="lg:col-span-2">
            <StatusRingCard />
          </RevealItem>
          <RevealItem>
            <DocumentOrbitCard />
          </RevealItem>
        </RevealGroup>
      </Container>
    </section>
  );
}
