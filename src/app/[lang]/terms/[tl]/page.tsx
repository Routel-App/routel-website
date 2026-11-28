import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/legal/legal-page";
import { termsMs } from "@/lib/legal/terms.ms";
import { termsId } from "@/lib/legal/terms.id";
import { isLegalTranslation, legalTranslations, type LegalTranslation, type LegalTranslationCopy } from "@/lib/legal/types";
import { site } from "@/lib/site";

/** The terms page in Malay (/terms/ms) and Indonesian (/terms/id), in the English site shell only. */
const docs: Record<LegalTranslation, LegalTranslationCopy> = { ms: termsMs, id: termsId };

export const dynamicParams = false;

/** English shell only: /ar/privacy/ms is not a page. */
export function generateStaticParams() {
  return legalTranslations.map((tl) => ({ lang: "en", tl }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/terms/[tl]">): Promise<Metadata> {
  const { tl } = await params;
  if (!isLegalTranslation(tl)) return {};
  const t = docs[tl];
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: {
      canonical: `${site.url}/terms/${tl}`,
      languages: { en: `${site.url}/terms`, ar: `${site.url}/ar/terms`, ms: `${site.url}/terms/ms`, id: `${site.url}/terms/id` },
    },
  };
}

export default async function Page({ params }: PageProps<"/[lang]/terms/[tl]">) {
  const { lang, tl } = await params;
  if (lang !== "en" || !isLegalTranslation(tl)) notFound();
  return <LegalPage locale="en" doc={docs[tl]} other="privacy" translation={tl} />;
}
