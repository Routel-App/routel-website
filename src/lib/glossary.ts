import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { defaultLocale, type Locale } from "./i18n";

/**
 * Glossary terms live in /content/glossary/<slug>.mdx. Adding one:
 *   1. create content/glossary/<slug>.mdx with frontmatter (term, description)
 *   2. that's it — the index and nav are built from the directory listing
 *   3. add the Arabic translation at content/ar/glossary/<slug>.mdx (same slug);
 *      until it exists, the Arabic site falls back to the English term.
 */
export type GlossaryFrontmatter = { term: string; description?: string };
export type GlossaryNavItem = { slug: string; term: string; href: string };

const CONTENT_DIR = path.join(process.cwd(), "content", "glossary");

export function glossaryPath(slug: string, locale: Locale = defaultLocale) {
  const dir = locale === defaultLocale ? CONTENT_DIR : path.join(process.cwd(), "content", locale, "glossary");
  return path.join(dir, `${slug}.mdx`);
}

export function glossaryExists(slug: string) {
  return /^[a-z0-9-]+$/.test(slug) && fs.existsSync(glossaryPath(slug));
}

/** Reads the term in the requested locale, falling back to English if it hasn't been translated yet. */
export function readGlossaryTerm(
  slug: string,
  locale: Locale = defaultLocale,
): { source: string; frontmatter: GlossaryFrontmatter } | null {
  if (!glossaryExists(slug)) return null;
  const localized = glossaryPath(slug, locale);
  const raw = fs.readFileSync(fs.existsSync(localized) ? localized : glossaryPath(slug), "utf8");
  const { content, data } = matter(raw);
  return { source: content, frontmatter: data as GlossaryFrontmatter };
}

export function hrefForTerm(slug: string) {
  return `/glossary/${slug}`;
}

const navCache = new Map<Locale, GlossaryNavItem[]>();

export function glossaryNav(locale: Locale = defaultLocale): GlossaryNavItem[] {
  const cached = navCache.get(locale);
  if (cached && process.env.NODE_ENV === "production") return cached;
  const files = fs.existsSync(CONTENT_DIR) ? fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx")) : [];
  const items = files
    .map((f) => {
      const slug = f.replace(/\.mdx$/, "");
      const doc = readGlossaryTerm(slug, locale);
      if (!doc) return null;
      return { slug, term: doc.frontmatter.term, href: hrefForTerm(slug) } satisfies GlossaryNavItem;
    })
    .filter((x): x is GlossaryNavItem => x !== null)
    .sort((a, b) => a.term.localeCompare(b.term, locale));
  navCache.set(locale, items);
  return items;
}

export function adjacentGlossaryTerms(
  slug: string,
  locale: Locale = defaultLocale,
): { prev: GlossaryNavItem | null; next: GlossaryNavItem | null } {
  const all = glossaryNav(locale);
  const i = all.findIndex((d) => d.slug === slug);
  return { prev: i > 0 ? all[i - 1] : null, next: i >= 0 && i < all.length - 1 ? all[i + 1] : null };
}
