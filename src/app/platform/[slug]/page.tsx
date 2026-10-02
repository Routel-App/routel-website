import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { modules } from "@/lib/modules";
import { platformContent } from "@/lib/platform-content";
import { PlatformPageTemplate } from "@/components/platform/platform-page";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(platformContent).map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/platform/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const content = platformContent[slug];
  if (!content) return {};
  return { title: content.title, description: content.description };
}

export default async function PlatformSlugPage(props: PageProps<"/platform/[slug]">) {
  const { slug } = await props.params;
  const content = platformContent[slug];
  const mod = modules.find((m) => m.slug === slug);
  if (!content || !mod) notFound();
  return <PlatformPageTemplate module={mod} content={content} />;
}
