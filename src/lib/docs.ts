import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { defaultLocale, type Locale } from "./i18n";

/**
 * Docs live in /content/docs/<slug>.mdx. Adding a page:
 *   1. create content/docs/<slug>.mdx with frontmatter (title, description, status)
 *   2. add { slug } to a group below so it appears in the sidebar
 *   3. add the Arabic translation at content/ar/docs/<slug>.mdx (same slug);
 *      until it exists, the Arabic site falls back to the English page.
 */
export type DocStatus = "complete" | "stub";

export type DocFrontmatter = {
  title: string;
  description?: string;
  status?: DocStatus;
};

export type DocNavItem = { slug: string; title: string; href: string; status: DocStatus };
export type DocNavGroup = { title: string; items: DocNavItem[] };

function contentDir(locale: Locale) {
  return locale === defaultLocale
    ? path.join(process.cwd(), "content", "docs")
    : path.join(process.cwd(), "content", locale, "docs");
}

/** Slug of the page rendered at /docs itself. */
export const INDEX_SLUG = "introduction";

/** The sidebar mirrors the app's own menu: Dashboard, Daily operations, Partners, Finance, Files, Reports, Admin, then the top bar. */
const groups: Array<{ title: Record<Locale, string>; slugs: string[] }> = [
  { title: { en: "Getting started", ar: "البداية" }, slugs: ["introduction", "getting-started", "roles"] },
  { title: { en: "Dashboard & daily operations", ar: "لوحة التحكم والعمليات اليومية" }, slugs: ["dashboard", "bookings", "quotations", "routes"] },
  { title: { en: "Partners", ar: "الشركاء" }, slugs: ["business-partners"] },
  {
    title: { en: "Finance", ar: "المالية" },
    slugs: ["invoicing", "finance-receivables", "credit-notes", "credit-applications", "expenses"],
  },
  { title: { en: "Files", ar: "الملفات" }, slugs: ["documents", "email-sync"] },
  { title: { en: "Reports & Group", ar: "التقارير والمجموعة" }, slugs: ["accounting", "group"] },
  { title: { en: "Admin", ar: "الإدارة" }, slugs: ["admin", "visitor-tracking"] },
  { title: { en: "Top bar", ar: "الشريط العلوي" }, slugs: ["ai-assistant", "alerts", "labeling-center"] },
  { title: { en: "For your customers", ar: "لعملائك" }, slugs: ["tracking"] },
];

export function docPath(slug: string, locale: Locale = defaultLocale) {
  return path.join(contentDir(locale), `${slug}.mdx`);
}

export function docExists(slug: string) {
  return /^[a-z0-9-]+$/.test(slug) && fs.existsSync(docPath(slug));
}

/** Reads the page in the requested locale, falling back to English if it hasn't been translated yet. */
export function readDoc(slug: string, locale: Locale = defaultLocale): { source: string; frontmatter: DocFrontmatter } | null {
  if (!docExists(slug)) return null;
  const localized = docPath(slug, locale);
  const file = fs.existsSync(localized) ? localized : docPath(slug);
  const raw = fs.readFileSync(file, "utf8");
  const { content, data } = matter(raw);
  return { source: content, frontmatter: data as DocFrontmatter };
}

export function hrefFor(slug: string) {
  return slug === INDEX_SLUG ? "/docs" : `/docs/${slug}`;
}

const navCache = new Map<Locale, DocNavGroup[]>();

export function docsNav(locale: Locale = defaultLocale): DocNavGroup[] {
  const cached = navCache.get(locale);
  if (cached && process.env.NODE_ENV === "production") return cached;
  const nav = groups.map((g) => ({
    title: g.title[locale],
    items: g.slugs
      .map((slug) => {
        const doc = readDoc(slug, locale);
        if (!doc) return null;
        return {
          slug,
          title: doc.frontmatter.title,
          href: hrefFor(slug),
          status: doc.frontmatter.status ?? "complete",
        } satisfies DocNavItem;
      })
      .filter((x): x is DocNavItem => x !== null),
  }));
  navCache.set(locale, nav);
  return nav;
}

export function allDocPages(locale: Locale = defaultLocale): DocNavItem[] {
  return docsNav(locale).flatMap((g) => g.items);
}

export function adjacentDocs(slug: string, locale: Locale = defaultLocale): { prev: DocNavItem | null; next: DocNavItem | null } {
  const all = allDocPages(locale);
  const i = all.findIndex((d) => d.slug === slug);
  return { prev: i > 0 ? all[i - 1] : null, next: i >= 0 && i < all.length - 1 ? all[i + 1] : null };
}
