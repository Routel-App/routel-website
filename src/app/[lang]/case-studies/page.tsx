import { notFound } from "next/navigation";

/**
 * Case studies are not published yet. The route stays so old links get a
 * proper 404 instead of a template; write real, approved customer stories
 * before linking it from the nav, the footer, the sitemap or the About page.
 */
export default function CaseStudiesPage() {
  notFound();
}
