import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { allDocPages } from "@/lib/docs";
import { glossaryNav } from "@/lib/glossary";
import { platformContent } from "@/lib/platform-content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: MetadataRoute.Sitemap = [
    { url: site.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/platform`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/demo`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.url}/case-studies`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.url}/docs`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${site.url}/glossary`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
  ];
  for (const page of allDocPages()) {
    pages.push({ url: `${site.url}${page.href}`, lastModified: now, changeFrequency: "weekly", priority: 0.6 });
  }
  for (const slug of Object.keys(platformContent)) {
    pages.push({ url: `${site.url}/platform/${slug}`, lastModified: now, changeFrequency: "weekly", priority: 0.8 });
  }
  for (const term of glossaryNav()) {
    pages.push({ url: `${site.url}${term.href}`, lastModified: now, changeFrequency: "monthly", priority: 0.5 });
  }
  return pages;
}
