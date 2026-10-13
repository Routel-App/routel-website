import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Locale } from "./i18n";
import { slugify } from "@/components/docs/mdx-components";

/**
 * The /features page renders content/features/<locale>.mdx. Those files are the
 * product's own feature write-up (supplied from the Routel system itself) —
 * update them when the product changes, keeping English and Arabic in step.
 */
export type FeaturesFrontmatter = { title: string; lead: string; tagline: string };

export function readFeatures(locale: Locale): {
  source: string;
  frontmatter: FeaturesFrontmatter;
  sections: Array<{ id: string; title: string }>;
} {
  const raw = fs.readFileSync(path.join(process.cwd(), "content", "features", `${locale}.mdx`), "utf8");
  const { content, data } = matter(raw);
  // Same ids the MDX heading component generates, so the table of contents links line up.
  const sections = [...content.matchAll(/^## (.+)$/gm)].map((m) => ({ id: slugify(m[1].trim()), title: m[1].trim() }));
  return { source: content, frontmatter: data as FeaturesFrontmatter, sections };
}
