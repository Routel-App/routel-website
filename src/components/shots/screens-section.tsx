import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import type { Locale } from "@/lib/i18n";
import type { ScreenName } from "@/lib/screens";
import { RealShot } from "./real-shot";

const copy = {
  en: { eyebrow: "In the app", title: "The real screens", lead: "Taken from Routel itself, in a demo company with demo data." },
  ar: { eyebrow: "داخل النظام", title: "الشاشات الحقيقية", lead: "لقطات من Routel نفسه، في شركة تجريبية ببيانات تجريبية." },
} satisfies Record<Locale, Record<string, string>>;

/** One or two real screenshots of a module or solution, under a short heading. */
export function ScreensSection({ names, locale, tone = "light" }: { names: ScreenName[]; locale: Locale; tone?: "light" | "muted" }) {
  if (!names.length) return null;
  const t = copy[locale];
  const two = names.length > 1;
  return (
    <Section tone={tone} className="py-16 sm:py-20">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.lead} />
      {two ? (
        <RevealGroup className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-10" stagger={0.08}>
          {names.map((n) => (
            <RevealItem key={n} className="min-w-0">
              <RealShot name={n} locale={locale} sizes="(min-width: 1024px) 600px, 100vw" />
            </RevealItem>
          ))}
        </RevealGroup>
      ) : (
        <Reveal className="mx-auto mt-10 max-w-5xl">
          <RealShot name={names[0]} locale={locale} sizes="(min-width: 1024px) 1024px, 100vw" />
        </Reveal>
      )}
    </Section>
  );
}
