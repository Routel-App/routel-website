import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { adjacentDocs, type DocFrontmatter } from "@/lib/docs";
import { mdxComponents, Callout } from "./mdx-components";

export async function DocPage({ slug, source, frontmatter }: { slug: string; source: string; frontmatter: DocFrontmatter }) {
  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    // Docs are authored in this repo, so JSX expressions in props (e.g. <Fields rows={[...]} />)
    // are trusted. next-mdx-remote strips them by default for untrusted content.
    options: { blockJS: false, mdxOptions: { remarkPlugins: [remarkGfm] } },
  });
  const { prev, next } = adjacentDocs(slug);

  return (
    <article className="min-w-0">
      <header className="border-b border-fog-200 pb-6">
        <h1 className="font-display text-balance text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">{frontmatter.title}</h1>
        {frontmatter.description ? <p className="mt-3 text-pretty text-lg text-fog-600">{frontmatter.description}</p> : null}
      </header>

      {frontmatter.status === "stub" ? (
        <Callout kind="note" title="This page is a stub">
          The module is built and working in Routel; the detailed guide is still being written. The summary below is
          accurate, just short.
        </Callout>
      ) : null}

      <div className="prose prose-slate mt-8 max-w-none prose-headings:font-display prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-ink-900 prose-h2:mt-12 prose-h2:text-2xl prose-h3:mt-8 prose-h3:text-lg prose-p:text-fog-700 prose-p:leading-relaxed prose-a:font-medium prose-a:text-teal-700 prose-a:decoration-teal-200 prose-a:underline-offset-4 hover:prose-a:decoration-teal-600 prose-strong:text-ink-900 prose-code:rounded prose-code:bg-fog-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-[0.85em] prose-code:font-normal prose-code:text-ink-900 prose-code:before:content-none prose-code:after:content-none prose-pre:rounded-xl prose-pre:bg-ink-950 prose-li:text-fog-700 prose-li:marker:text-fog-400">
        {content}
      </div>

      <nav aria-label="Pagination" className="mt-16 grid gap-3 border-t border-fog-200 pt-6 sm:grid-cols-2">
        {prev ? (
          <Link href={prev.href} className="group rounded-xl border border-fog-200 p-4 transition-colors hover:border-fog-300 hover:bg-fog-50">
            <span className="flex items-center gap-1 text-xs text-fog-500">
              <ArrowLeft className="h-3.5 w-3.5" /> Previous
            </span>
            <span className="mt-1 block text-sm font-medium text-ink-900">{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={next.href} className="group rounded-xl border border-fog-200 p-4 text-right transition-colors hover:border-fog-300 hover:bg-fog-50">
            <span className="flex items-center justify-end gap-1 text-xs text-fog-500">
              Next <ArrowRight className="h-3.5 w-3.5" />
            </span>
            <span className="mt-1 block text-sm font-medium text-ink-900">{next.title}</span>
          </Link>
        ) : null}
      </nav>
    </article>
  );
}
