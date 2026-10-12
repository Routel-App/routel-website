import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocPage } from "@/components/docs/doc-page";
import { INDEX_SLUG, readDoc } from "@/lib/docs";
import { getLocale } from "@/lib/locale-server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const doc = readDoc(INDEX_SLUG, locale);
  const docs = locale === "ar" ? "التوثيق" : "Docs";
  return { title: doc ? `${doc.frontmatter.title} · ${docs}` : docs, description: doc?.frontmatter.description };
}

export default async function DocsIndexPage() {
  const doc = readDoc(INDEX_SLUG, await getLocale());
  if (!doc) notFound();
  return <DocPage slug={INDEX_SLUG} source={doc.source} frontmatter={doc.frontmatter} />;
}
