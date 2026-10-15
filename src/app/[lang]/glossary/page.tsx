import type { Metadata } from "next";
import Link from "@/components/i18n/link";
import { Section, SectionHeading } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { glossaryNav } from "@/lib/glossary";
import { getLocale } from "@/lib/locale-server";
import type { Locale } from "@/lib/i18n";

const copy = {
  en: {
    metaTitle: "Freight Glossary",
    metaDescription: "Plain-English definitions for the shipping and freight-forwarding terms that show up on every booking.",
    eyebrow: "Glossary",
    title: "Freight terms, in plain English",
    description:
      "The shorthand every forwarder, carrier and customs broker uses — explained once, linked everywhere it matters in Routel.",
  },
  ar: {
    metaTitle: "مصطلحات الشحن",
    metaDescription: "تعريفات واضحة وبسيطة لمصطلحات الشحن والتخليص التي تظهر في كل حجز.",
    eyebrow: "المصطلحات",
    title: "مصطلحات الشحن، بلغة واضحة",
    description:
      "الاختصارات التي يستخدمها كل وكيل شحن وناقل ومخلّص جمركي — مشروحة مرة واحدة، ومرتبطة بكل موضع تهمّ فيه داخل Routel.",
  },
} satisfies Record<Locale, { metaTitle: string; metaDescription: string; eyebrow: string; title: string; description: string }>;

export async function generateMetadata(): Promise<Metadata> {
  const t = copy[await getLocale()];
  return { title: t.metaTitle, description: t.metaDescription };
}

/** Index letter for a term. Arabic terms are filed under the letter after the definite article "ال". */
function indexLetter(term: string, locale: Locale) {
  const word = locale === "ar" && term.startsWith("ال") && term.length > 2 ? term.slice(2) : term;
  return word[0]?.toUpperCase() ?? "#";
}

export default async function GlossaryIndexPage() {
  const locale = await getLocale();
  const text = copy[locale];
  const terms = glossaryNav(locale);
  const groups = new Map<string, typeof terms>();
  for (const t of terms) {
    const letter = indexLetter(t.term, locale);
    if (!groups.has(letter)) groups.set(letter, []);
    groups.get(letter)!.push(t);
  }
  const letters = locale === "en" ? [...groups.keys()].sort() : [...groups.keys()].sort((a, b) => a.localeCompare(b, locale));

  return (
    <Section className="pb-20 pt-16 sm:pt-24">
      <SectionHeading
        eyebrow={text.eyebrow}
        title={text.title}
        description={text.description}
      />
      <div className="mx-auto mt-14 max-w-4xl">
        {letters.map((letter) => (
          <div key={letter} className="mb-10">
            <h2 className="font-mono text-sm font-semibold uppercase tracking-wider text-spark-700">{letter}</h2>
            <RevealGroup className="mt-4 grid gap-x-8 gap-y-3 border-t border-fog-200 pt-4 sm:grid-cols-2" stagger={0.03}>
              {groups.get(letter)!.map((t) => (
                <RevealItem key={t.slug}>
                  <Link href={t.href} className="text-[15px] font-medium text-ink-900 underline decoration-fog-300 underline-offset-4 hover:decoration-spark-500">
                    {t.term}
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        ))}
      </div>
    </Section>
  );
}
