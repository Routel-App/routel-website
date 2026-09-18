import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * Docs live in /content/docs/<slug>.mdx. Adding a page:
 *   1. create content/docs/<slug>.mdx with frontmatter (title, description, status)
 *   2. add { slug } to a group below so it appears in the sidebar
 */
export type DocStatus = "complete" | "stub";

export type DocFrontmatter = {
  title: string;
  description?: string;
  status?: DocStatus;
};

export type DocNavItem = { slug: string; title: string; href: string; status: DocStatus };
export type DocNavGroup = { title: string; items: DocNavItem[] };

const CONTENT_DIR = path.join(process.cwd(), "content", "docs");

/** Slug of the page rendered at /docs itself. */
export const INDEX_SLUG = "introduction";

const groups: Array<{ title: string; slugs: string[] }> = [
  { title: "Getting started", slugs: ["introduction", "roles"] },
  {
    title: "Modules",
    slugs: [
      "shipments",
      "quotations",
      "bookings",
      "invoicing",
      "accounting",
      "bill-of-lading",
      "expenses",
      "partners",
      "documents",
    ],
  },
  { title: "AI Assistant", slugs: ["ai-assistant"] },
];

export function docPath(slug: string) {
  return path.join(CONTENT_DIR, `${slug}.mdx`);
}

export function docExists(slug: string) {
  return /^[a-z0-9-]+$/.test(slug) && fs.existsSync(docPath(slug));
}

export function readDoc(slug: string): { source: string; frontmatter: DocFrontmatter } | null {
  if (!docExists(slug)) return null;
  const raw = fs.readFileSync(docPath(slug), "utf8");
  const { content, data } = matter(raw);
  return { source: content, frontmatter: data as DocFrontmatter };
}

export function hrefFor(slug: string) {
  return slug === INDEX_SLUG ? "/docs" : `/docs/${slug}`;
}

let navCache: DocNavGroup[] | null = null;

export function docsNav(): DocNavGroup[] {
  if (navCache && process.env.NODE_ENV === "production") return navCache;
  navCache = groups.map((g) => ({
    title: g.title,
    items: g.slugs
      .map((slug) => {
        const doc = readDoc(slug);
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
  return navCache;
}

export function allDocPages(): DocNavItem[] {
  return docsNav().flatMap((g) => g.items);
}

export function adjacentDocs(slug: string): { prev: DocNavItem | null; next: DocNavItem | null } {
  const all = allDocPages();
  const i = all.findIndex((d) => d.slug === slug);
  return { prev: i > 0 ? all[i - 1] : null, next: i >= 0 && i < all.length - 1 ? all[i + 1] : null };
}
