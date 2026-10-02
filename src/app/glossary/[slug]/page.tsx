import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { GlossaryTermPage } from "@/components/docs/glossary-term-page";
import { glossaryNav, readGlossaryTerm } from "@/lib/glossary";

export const dynamicParams = false;

export function generateStaticParams() {
  return glossaryNav().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata(props: PageProps<"/glossary/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const term = readGlossaryTerm(slug);
  if (!term) return {};
  return { title: `${term.frontmatter.term} · Glossary`, description: term.frontmatter.description };
}

export default async function GlossarySlugPage(props: PageProps<"/glossary/[slug]">) {
  const { slug } = await props.params;
  const term = readGlossaryTerm(slug);
  if (!term) notFound();
  return (
    <Container className="max-w-3xl py-10 lg:py-14">
      <GlossaryTermPage slug={slug} source={term.source} frontmatter={term.frontmatter} />
    </Container>
  );
}
