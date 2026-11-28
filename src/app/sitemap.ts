import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { allDocPages } from "@/lib/docs";
import { glossaryNav } from "@/lib/glossary";
import { platformContent } from "@/lib/platform-content";
import { serviceSlugs } from "@/lib/services";
import { localizeHref, locales } from "@/lib/i18n";
import { legalTranslations } from "@/lib/legal/types";

type Entry = { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number };

/** Every page is listed once per locale, with hreflang alternates pointing at its translations. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: Entry[] = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/platform", changeFrequency: "weekly", priority: 0.9 },
    { path: "/solutions", changeFrequency: "weekly", priority: 0.9 },
    { path: "/features", changeFrequency: "weekly", priority: 0.9 },
    { path: "/pricing", changeFrequency: "monthly", priority: 0.8 },
    { path: "/demo", changeFrequency: "monthly", priority: 0.8 },
    { path: "/about", changeFrequency: "monthly", priority: 0.6 },
    { path: "/docs", changeFrequency: "weekly", priority: 0.7 },
    { path: "/glossary", changeFrequency: "weekly", priority: 0.6 },
    { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  ];
  for (const page of allDocPages()) {
    if (page.href !== "/docs") entries.push({ path: page.href, changeFrequency: "weekly", priority: 0.6 });
  }
  for (const slug of serviceSlugs) {
    entries.push({ path: `/solutions/${slug}`, changeFrequency: "weekly", priority: 0.85 });
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

  const localized = entries.flatMap((e) =>
    locales.map((locale) => ({
      url: url(e.path, locale),
      lastModified: now,
      changeFrequency: e.changeFrequency,
      priority: e.priority,
      alternates: { languages: Object.fromEntries(locales.map((l) => [l, url(e.path, l)])) },
    })),
  );

  // The privacy policy and terms also have Malay and Indonesian versions (/privacy/ms …), outside the en/ar locales.
  const legal = (["/privacy", "/terms"] as const).flatMap((path) => {
    const languages = {
      ...Object.fromEntries(locales.map((l) => [l, url(path, l)])),
      ...Object.fromEntries(legalTranslations.map((tl) => [tl, `${site.url}${path}/${tl}`])),
    };
    return legalTranslations.map((tl) => ({
      url: `${site.url}${path}/${tl}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3,
      alternates: { languages },
    }));
  });

  return [...localized, ...legal];
}
