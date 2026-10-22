import Link from "@/components/i18n/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { adjacentDocs, docsNav, type DocFrontmatter } from "@/lib/docs";
import { compileContentMdx } from "@/lib/mdx";
import { Callout, slugify } from "./mdx-components";
import { Toc, type TocItem } from "./toc";
import { getLocale } from "@/lib/locale-server";
import type { Locale } from "@/lib/i18n";

const copy = {
  en: {
    stubTitle: "This page is a stub",
    stubBody:
      "The module is built and working in Routel; the detailed guide is still being written. The summary below is accurate, just short.",
    previous: "Previous",
    next: "Next",
    pagination: "Pagination",
    onThisPage: "On this page",
    of: (i: number, n: number) => `Guide ${i} of ${n}`,
  },
  ar: {
    stubTitle: "هذه الصفحة مختصرة",
    stubBody: "الوحدة مبنية وتعمل في Routel، والدليل المفصّل قيد الكتابة. الملخص أدناه دقيق، لكنه قصير.",
    previous: "السابق",
    next: "التالي",
    pagination: "التنقل بين الصفحات",
    onThisPage: "في هذه الصفحة",
    of: (i: number, n: number) => `الدليل ${i} من ${n}`,
  },
} satisfies Record<Locale, { stubTitle: string; stubBody: string; previous: string; next: string; pagination: string; onThisPage: string; of: (i: number, n: number) => string }>;

/** The page's "## " headings (outside code fences), as the ids the Heading component gives them. */
function headingsOf(source: string): TocItem[] {
  const out: TocItem[] = [];
  let fenced = false;
  for (const line of source.split("\n")) {
    if (/^\s*```/.test(line)) fenced = !fenced;
    if (fenced) continue;
    const m = /^##\s+(.+?)\s*#*\s*$/.exec(line);
    if (!m) continue;
    const text = m[1]
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/[*_`]/g, "")
      .trim();
    out.push({ id: slugify(text), text });
  }
  return out;
}

export async function DocPage({ slug, source, frontmatter }: { slug: string; source: string; frontmatter: DocFrontmatter }) {
  const locale = await getLocale();
  const t = copy[locale];
  const content = await compileContentMdx(source);
  const { prev, next } = adjacentDocs(slug, locale);
  const nav = docsNav(locale);
  const all = nav.flatMap((g) => g.items);
  const index = all.findIndex((d) => d.slug === slug);
  const group = nav.find((g) => g.items.some((d) => d.slug === slug));
  const toc = headingsOf(source);
  const pill = "flex items-center gap-1.5 rounded-lg border border-fog-200 px-3 py-1.5 text-[12.5px] font-medium text-ink-900 transition-colors hover:border-spark-300 hover:bg-spark-50";

  return (
    <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_200px] xl:gap-12">
    <article className="min-w-0">
      {/* Where you are, and the way on: desktop only (phones and tablets have the sticky bar) */}
      <div className="mb-5 hidden items-center justify-between gap-4 lg:flex">
        <p className="text-[12.5px] font-medium text-fog-500">
          {group ? <span className="text-spark-700">{group.title}</span> : null}
          {index >= 0 ? <span> · {t.of(index + 1, all.length)}</span> : null}
        </p>
        <div className="flex items-center gap-2">
          {prev ? (
            <Link href={prev.href} className={pill} title={prev.title}>
              <ArrowLeft className="h-3.5 w-3.5 rtl:-scale-x-100" /> {t.previous}
            </Link>
          ) : null}
          {next ? (
            <Link href={next.href} className={pill} title={next.title}>
              {t.next} <ArrowRight className="h-3.5 w-3.5 rtl:-scale-x-100" />
            </Link>
          ) : null}
        </div>
      </div>
      <header className="border-b border-fog-200 pb-6">
        <h1 className="font-display text-balance text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">{frontmatter.title}</h1>
        {frontmatter.description ? <p className="mt-3 text-pretty text-lg text-fog-600">{frontmatter.description}</p> : null}
      </header>

      {/* On this page, folded, where there is no side column */}
      {toc.length >= 2 ? (
        <details className="group mt-6 rounded-xl border border-fog-200 bg-fog-50 px-4 py-3 xl:hidden">
          <summary className="cursor-pointer list-none text-[13px] font-semibold text-ink-900 marker:hidden">
            {t.onThisPage} <span className="text-fog-500">({toc.length})</span>
          </summary>
          <ul className="mt-2 space-y-1 text-[13.5px]">
            {toc.map((h) => (
              <li key={h.id}>
                <a href={`#${h.id}`} className="text-fog-700 hover:text-spark-700">
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        </details>
      ) : null}

      {frontmatter.status === "stub" ? (
        <Callout kind="note" title={t.stubTitle}>
          {t.stubBody}
        </Callout>
      ) : null}

      <div className="prose prose-slate mt-8 max-w-none prose-headings:font-display prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-ink-900 prose-h2:mt-12 prose-h2:text-2xl prose-h3:mt-8 prose-h3:text-lg prose-p:text-fog-700 prose-p:leading-relaxed prose-a:font-medium prose-a:text-spark-700 prose-a:decoration-spark-200 prose-a:underline-offset-4 hover:prose-a:decoration-spark-600 prose-strong:text-ink-900 prose-code:rounded prose-code:bg-fog-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-[0.85em] prose-code:font-normal prose-code:text-ink-900 prose-code:before:content-none prose-code:after:content-none prose-pre:rounded-xl prose-pre:bg-ink-950 prose-li:text-fog-700 prose-li:marker:text-fog-400">
        {content}
      </div>

      <nav aria-label={t.pagination} className="mt-16 grid gap-3 border-t border-fog-200 pt-6 sm:grid-cols-2">
        {prev ? (
          <Link href={prev.href} className="group rounded-xl border border-fog-200 p-4 transition-colors hover:border-spark-300 hover:bg-spark-50">
            <span className="flex items-center gap-1 text-xs text-fog-500">
              <ArrowLeft className="h-3.5 w-3.5 rtl:-scale-x-100" /> {t.previous}
            </span>
            <span className="mt-1 block text-sm font-medium text-ink-900">{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={next.href} className="group rounded-xl border border-fog-200 p-4 text-end transition-colors hover:border-spark-300 hover:bg-spark-50">
            <span className="flex items-center justify-end gap-1 text-xs text-fog-500">
              {t.next} <ArrowRight className="h-3.5 w-3.5 rtl:-scale-x-100" />
            </span>
            <span className="mt-1 block text-sm font-medium text-ink-900">{next.title}</span>
          </Link>
        ) : null}
      </nav>
    </article>

    {/* On this page: sticky column on wide screens */}
    <aside className="hidden xl:block">
      <div className="sticky top-24">
        <Toc items={toc} label={t.onThisPage} />
      </div>
    </aside>
    </div>
  );
}
