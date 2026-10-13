import Link from "@/components/i18n/link";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { adjacentGlossaryTerms, type GlossaryFrontmatter } from "@/lib/glossary";
import { compileContentMdx } from "@/lib/mdx";
import { getLocale } from "@/lib/locale-server";
import type { Locale } from "@/lib/i18n";

const copy = {
  en: { glossary: "Glossary", previous: "Previous", next: "Next", pagination: "Pagination" },
  ar: { glossary: "المصطلحات", previous: "السابق", next: "التالي", pagination: "التنقل بين المصطلحات" },
} satisfies Record<Locale, { glossary: string; previous: string; next: string; pagination: string }>;

export async function GlossaryTermPage({
  slug,
  source,
  frontmatter,
}: {
  slug: string;
  source: string;
  frontmatter: GlossaryFrontmatter;
}) {
  const locale = await getLocale();
  const t = copy[locale];
  const content = await compileContentMdx(source);
  const { prev, next } = adjacentGlossaryTerms(slug, locale);

  return (
    <article className="min-w-0">
      <Link href="/glossary" className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-700 hover:text-teal-800">
        <BookOpen className="h-3.5 w-3.5" /> {t.glossary}
      </Link>
      <header className="mt-4 border-b border-fog-200 pb-6">
        <h1 className="font-display text-balance text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">{frontmatter.term}</h1>
        {frontmatter.description ? <p className="mt-3 text-pretty text-lg text-fog-600">{frontmatter.description}</p> : null}
      </header>

      <div className="prose prose-slate mt-8 max-w-none prose-headings:font-display prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-ink-900 prose-h2:mt-12 prose-h2:text-2xl prose-h3:mt-8 prose-h3:text-lg prose-p:text-fog-700 prose-p:leading-relaxed prose-a:font-medium prose-a:text-teal-700 prose-a:decoration-teal-200 prose-a:underline-offset-4 hover:prose-a:decoration-teal-600 prose-strong:text-ink-900 prose-li:text-fog-700 prose-li:marker:text-fog-400">
        {content}
      </div>

      <nav aria-label={t.pagination} className="mt-16 grid gap-3 border-t border-fog-200 pt-6 sm:grid-cols-2">
        {prev ? (
          <Link href={prev.href} className="group rounded-xl border border-fog-200 p-4 transition-colors hover:border-fog-300 hover:bg-fog-50">
            <span className="flex items-center gap-1 text-xs text-fog-500">
              <ArrowLeft className="h-3.5 w-3.5" /> {t.previous}
            </span>
            <span className="mt-1 block text-sm font-medium text-ink-900">{prev.term}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={next.href} className="group rounded-xl border border-fog-200 p-4 text-end transition-colors hover:border-fog-300 hover:bg-fog-50">
            <span className="flex items-center justify-end gap-1 text-xs text-fog-500">
              {t.next} <ArrowRight className="h-3.5 w-3.5" />
            </span>
            <span className="mt-1 block text-sm font-medium text-ink-900">{next.term}</span>
          </Link>
        ) : null}
      </nav>
    </article>
  );
}
