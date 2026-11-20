import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { terms } from "@/lib/legal/terms";
import { getLocale } from "@/lib/locale-server";

export async function generateMetadata(): Promise<Metadata> {
  const t = terms[await getLocale()];
  return { title: t.metaTitle, description: t.metaDescription };
}

export default async function Page() {
  const locale = await getLocale();
  return <LegalPage locale={locale} doc={terms[locale]} other="privacy" />;
}
