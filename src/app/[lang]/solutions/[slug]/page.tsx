import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServices, serviceSlugs } from "@/lib/services";
import { servicePagesEn } from "@/lib/service-pages/en";
import { servicePagesAr } from "@/lib/service-pages/ar";
import { getLocale } from "@/lib/locale-server";
import type { Locale } from "@/lib/i18n";
import { ServicePageTemplate } from "@/components/services/service-page";

export const dynamicParams = false;

const pages = { en: servicePagesEn, ar: servicePagesAr } satisfies Record<Locale, unknown>;

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/[lang]/solutions/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const content = pages[await getLocale()][slug];
  if (!content) return {};
  return { title: content.metaTitle, description: content.metaDescription };
}

export default async function ServicePage(props: PageProps<"/[lang]/solutions/[slug]">) {
  const { slug } = await props.params;
  const locale = await getLocale();
  const services = getServices(locale);
  const service = services.find((s) => s.slug === slug);
  const content = pages[locale][slug];
  if (!service || !content) notFound();
  const related = service.related.map((r) => services.find((s) => s.slug === r)).filter((s) => s !== undefined);
  return <ServicePageTemplate locale={locale} service={service} content={content} related={related} />;
}
