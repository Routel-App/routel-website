import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { Cta } from "@/components/home/cta";
import { compileContentMdx } from "@/lib/mdx";
import { readFeatures } from "@/lib/features";
import type { Locale } from "@/lib/i18n";
import { getLocale } from "@/lib/locale-server";

const copy = {
  en: {
    metaTitle: "Features",
    eyebrow: "Features",
    demo: "Request a demo",
    pricing: "See pricing",
    onThisPage: "On this page",
  },
  ar: {
    metaTitle: "الميزات",
    eyebrow: "الميزات",
    demo: "اطلب عرضاً تجريبياً",
    pricing: "اطّلع على الأسعار",
    onThisPage: "في هذه الصفحة",
  },
} satisfies Record<Locale, Record<string, string>>;

/** "Routel — the freight forwarding ERP…" → "The freight forwarding ERP…" for the page heading. */
function headline(title: string) {
  const rest = title.split(" — ").slice(1).join(" — ") || title;
  return rest.charAt(0).toUpperCase() + rest.slice(1);
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { frontmatter } = readFeatures(locale);
  return { title: copy[locale].metaTitle, description: frontmatter.lead };
}

export default async function FeaturesPage() {
  const locale = await getLocale();
  const t = copy[locale];
  const { source, frontmatter, sections } = readFeatures(locale);
  const content = await compileContentMdx(source);

  return (
    <>
      <section className="relative overflow-hidden border-b border-fog-200">
        <div aria-hidden className="grid-fade absolute inset-0 -z-10" />
        <Container className="py-16 sm:py-24">
          <Reveal className="max-w-3xl">
            <Eyebrow className="mb-4">{t.eyebrow}</Eyebrow>
            <h1 className="font-display text-balance text-4xl font-extrabold leading-[1.05] text-ink-900 sm:text-5xl">
              {headline(frontmatter.title)}
            </h1>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-fog-600">{frontmatter.lead}</p>
            <p className="mt-3 text-pretty text-base font-medium text-teal-700">{frontmatter.tagline}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/demo" size="lg">
                {t.demo}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/pricing" size="lg" variant="secondary">
                {t.pricing}
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <Container className="grid gap-10 py-14 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16 lg:py-20">
        <nav aria-label={t.onThisPage} className="hidden lg:block">
          <div className="sticky top-24">
            <p className="mb-3 px-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-fog-500">{t.onThisPage}</p>
            <ul className="space-y-0.5">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="block rounded-lg px-2 py-1.5 text-sm text-fog-600 transition-colors hover:bg-fog-100 hover:text-ink-900"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="prose prose-slate min-w-0 max-w-3xl prose-headings:font-display prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-ink-900 prose-h2:mt-16 prose-h2:border-t prose-h2:border-fog-200 prose-h2:pt-10 prose-h2:text-3xl [&>h2:first-child]:mt-0 [&>h2:first-child]:border-0 [&>h2:first-child]:pt-0 prose-h3:mt-8 prose-h3:text-lg prose-p:text-fog-700 prose-p:leading-relaxed prose-a:font-medium prose-a:text-teal-700 prose-a:decoration-teal-200 prose-a:underline-offset-4 hover:prose-a:decoration-teal-600 prose-strong:text-ink-900 prose-li:text-fog-700 prose-li:marker:text-teal-500">
          {content}
        </div>
      </Container>

      <Cta />
    </>
  );
}
