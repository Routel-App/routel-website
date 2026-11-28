import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/legal/legal-page";
import { privacyMs } from "@/lib/legal/privacy.ms";
import { privacyId } from "@/lib/legal/privacy.id";
import { isLegalTranslation, legalTranslations, type LegalTranslation, type LegalTranslationCopy } from "@/lib/legal/types";
import { site } from "@/lib/site";

/** The privacy page in Malay (/privacy/ms) and Indonesian (/privacy/id), in the English site shell only. */
const docs: Record<LegalTranslation, LegalTranslationCopy> = { ms: privacyMs, id: privacyId };

export const dynamicParams = false;

/** English shell only: /ar/privacy/ms is not a page. */
export function generateStaticParams() {
  return legalTranslations.map((tl) => ({ lang: "en", tl }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/privacy/[tl]">): Promise<Metadata> {
  const { tl } = await params;
  if (!isLegalTranslation(tl)) return {};
  const t = docs[tl];
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: {
      canonical: `${site.url}/privacy/${tl}`,
      languages: { en: `${site.url}/privacy`, ar: `${site.url}/ar/privacy`, ms: `${site.url}/privacy/ms`, id: `${site.url}/privacy/id` },
    },
  };
}

export default async function Page({ params }: PageProps<"/[lang]/privacy/[tl]">) {
  const { lang, tl } = await params;
  if (lang !== "en" || !isLegalTranslation(tl)) notFound();
  return <LegalPage locale="en" doc={docs[tl]} other="terms" translation={tl} />;
}
