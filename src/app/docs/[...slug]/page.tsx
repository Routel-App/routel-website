import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocPage } from "@/components/docs/doc-page";
import { allDocPages, INDEX_SLUG, readDoc } from "@/lib/docs";

export const dynamicParams = false;

export function generateStaticParams() {
  return allDocPages()
    .filter((d) => d.slug !== INDEX_SLUG)
    .map((d) => ({ slug: [d.slug] }));
}

export async function generateMetadata(props: PageProps<"/docs/[...slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const doc = readDoc(slug.join("/"));
  if (!doc) return {};
  return { title: `${doc.frontmatter.title} · Docs`, description: doc.frontmatter.description };
}

export default async function DocsSlugPage(props: PageProps<"/docs/[...slug]">) {
  const { slug } = await props.params;
  const key = slug.join("/");
  const doc = readDoc(key);
  if (!doc) notFound();
  return <DocPage slug={key} source={doc.source} frontmatter={doc.frontmatter} />;
}
