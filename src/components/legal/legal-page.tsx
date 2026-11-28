import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section";
import Link from "@/components/i18n/link";
import type { Locale } from "@/lib/i18n";
import { legalTranslations, type LegalCopy, type LegalTranslation, type LegalTranslationCopy } from "@/lib/legal/types";
import { LEGAL_UPDATED } from "@/lib/legal/terms";

const copy = {
  en: { terms: "Terms of use", privacy: "Privacy policy", also: "See also" },
  ar: { terms: "شروط الاستخدام", privacy: "سياسة الخصوصية", also: "انظر أيضاً" },
} satisfies Record<Locale, Record<string, string>>;

/** One section's body: paragraphs, and bullet lists written as lines that start with "- ". */
function Body({ text }: { text: string }) {
  if (text.startsWith("- ")) {
    return (
      <ul className="my-3 list-disc space-y-1.5 ps-6 text-[15px] leading-relaxed text-fog-700">
        {text.split("\n").map((line) => (
          <li key={line}>{line.replace(/^- /, "")}</li>
        ))}
      </ul>
    );
  }
  return <p className="my-3 text-[15px] leading-relaxed text-fog-700">{text}</p>;
}

const docNames: Record<LegalTranslation, { terms: string; privacy: string; also: string; versions: string }> = {
  ms: { terms: "Terma Penggunaan", privacy: "Notis Privasi", also: "Lihat juga", versions: "Juga tersedia dalam" },
  id: { terms: "Ketentuan Penggunaan", privacy: "Kebijakan Privasi", also: "Lihat juga", versions: "Juga tersedia dalam" },
};
const versionsLabel: Record<Locale, string> = { en: "Also available in", ar: "متاح أيضاً بـ" };
const languageNames: Record<"en" | LegalTranslation, string> = { en: "English", ms: "Bahasa Melayu", id: "Bahasa Indonesia" };

/**
 * A legal page. `translation` renders the Malay or Indonesian version
 * (/privacy/ms, /terms/id …) inside the English site shell; every version
 * links to the others. Those links are plain anchors: the translations
 * live only at unprefixed URLs.
 */
export function LegalPage({
  locale,
  doc,
  other,
  translation,
}: {
  locale: Locale;
  doc: LegalCopy | LegalTranslationCopy;
  other: "terms" | "privacy";
  translation?: LegalTranslation;
}) {
  const self = other === "terms" ? "/privacy" : "/terms";
  const names = translation ? docNames[translation] : null;
  const t = names ? { terms: names.terms, privacy: names.privacy, also: names.also } : copy[locale];
  const otherHref = translation ? `/${other}/${translation}` : other === "terms" ? "/terms" : "/privacy";
  const versions: Array<"en" | LegalTranslation> = translation ? ["en", ...legalTranslations.filter((l) => l !== translation)] : [...legalTranslations];
  return (
    <article className="relative bg-white" lang={translation} dir={translation ? "ltr" : undefined}>
      <div aria-hidden className="grid-fade absolute inset-x-0 top-0 h-80" />
      <Container className="relative max-w-3xl py-16 sm:py-20">
        <p className="mb-6 text-[13px] text-fog-600">
          {names ? names.versions : versionsLabel[locale]}:{" "}
          {versions.map((l, i) => (
            <span key={l}>
              {i > 0 ? " · " : null}
              <a href={l === "en" ? self : `${self}/${l}`} hrefLang={l} lang={l} dir="ltr" className="font-semibold text-ink-900 hover:text-spark-700">
                {languageNames[l]}
              </a>
            </span>
          ))}
        </p>
        <Eyebrow tone="ink">{doc.eyebrow}</Eyebrow>
        <h1 className="font-display mt-4 text-balance text-4xl font-extrabold leading-[1.05] text-ink-900 sm:text-5xl">{doc.title}</h1>
        <p className="mt-5 text-pretty text-lg leading-relaxed text-fog-600">{doc.lead}</p>
        <p className="mt-4 text-[13px] text-fog-500">
          {doc.updated}: <time dateTime={LEGAL_UPDATED}>{LEGAL_UPDATED}</time>
        </p>
        <p className="mt-6 rounded-2xl bg-fog-50 px-5 py-4 text-[14px] leading-relaxed text-ink-900 ring-1 ring-fog-200">{doc.entity}</p>
        {"prevails" in doc ? <p className="mt-4 text-[13px] leading-relaxed text-fog-600">{doc.prevails}</p> : null}

        <nav aria-label={doc.title} className="mt-10 rounded-2xl border border-fog-200 p-5">
          <ol className="grid gap-1.5 text-[14px] sm:grid-cols-2">
            {doc.sections.map((s, i) => (
              <li key={s.title}>
                <a href={`#s${i + 1}`} className="text-fog-700 hover:text-spark-700">
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {doc.sections.map((s, i) => (
          <section key={s.title} id={`s${i + 1}`} className="mt-12 scroll-mt-24">
            <h2 className="font-display text-xl font-bold text-ink-900">{s.title}</h2>
            {s.body.map((b) => (
              <Body key={b} text={b} />
            ))}
          </section>
        ))}

        <p className="mt-16 border-t border-fog-200 pt-6 text-[14px] text-fog-600">
          {t.also}:{" "}
          {translation ? (
            <a href={otherHref} className="font-semibold text-ink-900 hover:text-spark-700">
              {other === "terms" ? t.terms : t.privacy}
            </a>
          ) : (
            <Link href={otherHref} className="font-semibold text-ink-900 hover:text-spark-700">
              {other === "terms" ? t.terms : t.privacy}
            </Link>
          )}
        </p>
      </Container>
    </article>
  );
}
