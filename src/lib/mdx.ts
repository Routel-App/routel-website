import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/docs/mdx-components";

/**
 * Shared MDX compile step for both /docs and /glossary content. Both are
 * authored in this repo, so JSX expressions in props (e.g. <Fields rows={[...]} />)
 * are trusted — next-mdx-remote strips them by default for untrusted content.
 */
export async function compileContentMdx(source: string) {
  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: { blockJS: false, mdxOptions: { remarkPlugins: [remarkGfm] } },
  });
  return content;
}
