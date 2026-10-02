import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { glossaryNav } from "@/lib/glossary";

export const metadata: Metadata = {
  title: "Freight Glossary",
  description: "Plain-English definitions for the shipping and freight-forwarding terms that show up on every job.",
};

export default function GlossaryIndexPage() {
  const terms = glossaryNav();
  const groups = new Map<string, typeof terms>();
  for (const t of terms) {
    const letter = t.term[0]?.toUpperCase() ?? "#";
    if (!groups.has(letter)) groups.set(letter, []);
    groups.get(letter)!.push(t);
  }
  const letters = [...groups.keys()].sort();

  return (
    <Section className="pb-20 pt-16 sm:pt-24">
      <SectionHeading
        eyebrow="Glossary"
        title="Freight terms, in plain English"
        description="The shorthand every forwarder, carrier and customs broker uses — explained once, linked everywhere it matters in Routel."
      />
      <div className="mx-auto mt-14 max-w-4xl">
        {letters.map((letter) => (
          <div key={letter} className="mb-10">
            <h2 className="font-mono text-sm font-semibold uppercase tracking-wider text-teal-700">{letter}</h2>
            <RevealGroup className="mt-4 grid gap-x-8 gap-y-3 border-t border-fog-200 pt-4 sm:grid-cols-2" stagger={0.03}>
              {groups.get(letter)!.map((t) => (
                <RevealItem key={t.slug}>
                  <Link href={t.href} className="text-[15px] font-medium text-ink-900 underline decoration-fog-300 underline-offset-4 hover:decoration-teal-500">
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
