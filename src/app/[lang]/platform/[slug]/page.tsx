import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getModules } from "@/lib/modules";
import { getPlatformContent, platformContent } from "@/lib/platform-content";
import { getLocale } from "@/lib/locale-server";
import { PlatformPageTemplate } from "@/components/platform/platform-page";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(platformContent).map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/[lang]/platform/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const content = getPlatformContent(await getLocale())[slug];
  if (!content) return {};
  return { title: content.title, description: content.description };
}

export default async function PlatformSlugPage(props: PageProps<"/[lang]/platform/[slug]">) {
  const { slug } = await props.params;
  const locale = await getLocale();
  const content = getPlatformContent(locale)[slug];
  const mod = getModules(locale).find((m) => m.slug === slug);
  if (!content || !mod) notFound();
  return <PlatformPageTemplate module={mod} content={content} />;
}
