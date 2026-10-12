import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { allDocPages } from "@/lib/docs";
import { glossaryNav } from "@/lib/glossary";
import { platformContent } from "@/lib/platform-content";
import { localizeHref, locales } from "@/lib/i18n";

type Entry = { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number };

/** Every page is listed once per locale, with hreflang alternates pointing at its translations. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: Entry[] = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/platform", changeFrequency: "weekly", priority: 0.9 },
    { path: "/pricing", changeFrequency: "monthly", priority: 0.8 },
    { path: "/demo", changeFrequency: "monthly", priority: 0.8 },
    { path: "/about", changeFrequency: "monthly", priority: 0.6 },
    { path: "/case-studies", changeFrequency: "monthly", priority: 0.6 },
    { path: "/docs", changeFrequency: "weekly", priority: 0.7 },
    { path: "/glossary", changeFrequency: "weekly", priority: 0.6 },
  ];
  for (const page of allDocPages()) {
    if (page.href !== "/docs") entries.push({ path: page.href, changeFrequency: "weekly", priority: 0.6 });
  }
  for (const slug of Object.keys(platformContent)) {
    entries.push({ path: `/platform/${slug}`, changeFrequency: "weekly", priority: 0.8 });
  }
  for (const term of glossaryNav()) {
    entries.push({ path: term.href, changeFrequency: "monthly", priority: 0.5 });
  }

  const url = (path: string, locale: (typeof locales)[number]) => {
    const href = localizeHref(path, locale);
    return href === "/" ? site.url : `${site.url}${href}`;
  };

  return entries.flatMap((e) =>
    locales.map((locale) => ({
      url: url(e.path, locale),
      lastModified: now,
      changeFrequency: e.changeFrequency,
      priority: e.priority,
      alternates: { languages: Object.fromEntries(locales.map((l) => [l, url(e.path, l)])) },
    })),
  );
}
