import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocPage } from "@/components/docs/doc-page";
import { INDEX_SLUG, readDoc } from "@/lib/docs";

export function generateMetadata(): Metadata {
  const doc = readDoc(INDEX_SLUG);
  return { title: doc ? `${doc.frontmatter.title} · Docs` : "Docs", description: doc?.frontmatter.description };
}

export default function DocsIndexPage() {
  const doc = readDoc(INDEX_SLUG);
  if (!doc) notFound();
  return <DocPage slug={INDEX_SLUG} source={doc.source} frontmatter={doc.frontmatter} />;
}
