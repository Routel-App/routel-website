import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { privacy } from "@/lib/legal/privacy";
import { getLocale } from "@/lib/locale-server";

export async function generateMetadata(): Promise<Metadata> {
  const t = privacy[await getLocale()];
  return { title: t.metaTitle, description: t.metaDescription };
}

export default async function Page() {
  const locale = await getLocale();
  return <LegalPage locale={locale} doc={privacy[locale]} other="terms" />;
}
