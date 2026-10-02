import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * Glossary terms live in /content/glossary/<slug>.mdx. Adding one:
 *   1. create content/glossary/<slug>.mdx with frontmatter (term, description)
 *   2. that's it — the index and nav are built from the directory listing
 */
export type GlossaryFrontmatter = { term: string; description?: string };
export type GlossaryNavItem = { slug: string; term: string; href: string };

const CONTENT_DIR = path.join(process.cwd(), "content", "glossary");

export function glossaryPath(slug: string) {
  return path.join(CONTENT_DIR, `${slug}.mdx`);
}

export function glossaryExists(slug: string) {
  return /^[a-z0-9-]+$/.test(slug) && fs.existsSync(glossaryPath(slug));
}

export function readGlossaryTerm(slug: string): { source: string; frontmatter: GlossaryFrontmatter } | null {
  if (!glossaryExists(slug)) return null;
  const raw = fs.readFileSync(glossaryPath(slug), "utf8");
  const { content, data } = matter(raw);
  return { source: content, frontmatter: data as GlossaryFrontmatter };
}

export function hrefForTerm(slug: string) {
  return `/glossary/${slug}`;
}

let navCache: GlossaryNavItem[] | null = null;

export function glossaryNav(): GlossaryNavItem[] {
  if (navCache && process.env.NODE_ENV === "production") return navCache;
  const files = fs.existsSync(CONTENT_DIR) ? fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx")) : [];
  const items = files
    .map((f) => {
      const slug = f.replace(/\.mdx$/, "");
      const doc = readGlossaryTerm(slug);
      if (!doc) return null;
      return { slug, term: doc.frontmatter.term, href: hrefForTerm(slug) } satisfies GlossaryNavItem;
    })
    .filter((x): x is GlossaryNavItem => x !== null)
    .sort((a, b) => a.term.localeCompare(b.term));
  navCache = items;
  return navCache;
}

export function adjacentGlossaryTerms(slug: string): { prev: GlossaryNavItem | null; next: GlossaryNavItem | null } {
  const all = glossaryNav();
  const i = all.findIndex((d) => d.slug === slug);
  return { prev: i > 0 ? all[i - 1] : null, next: i >= 0 && i < all.length - 1 ? all[i + 1] : null };
}
