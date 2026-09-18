import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { allDocPages } from "@/lib/docs";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: MetadataRoute.Sitemap = [
    { url: site.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/demo`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/docs`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ];
  for (const page of allDocPages()) {
    pages.push({ url: `${site.url}${page.href}`, lastModified: now, changeFrequency: "weekly", priority: 0.6 });
  }
  return pages;
}
