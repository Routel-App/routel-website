/** A legal page: sections of paragraphs and bullet lists, in one language. */
export type LegalSection = {
  title: string;
  /** Paragraphs; a string that starts with "- " begins a bullet list, one item per line. */
  body: string[];
};

export type LegalCopy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  lead: string;
  updated: string;
  entity: string;
  sections: LegalSection[];
};

/** The legal pages also published in Malay and Indonesian (/privacy/ms, /terms/id …). */
export const legalTranslations = ["ms", "id"] as const;
export type LegalTranslation = (typeof legalTranslations)[number];

export function isLegalTranslation(value: string): value is LegalTranslation {
  return (legalTranslations as readonly string[]).includes(value);
}

/** A translation of a legal page: the page's copy plus which version prevails. */
export type LegalTranslationCopy = LegalCopy & {
  /** States that the English version prevails unless the law requires this one to. */
  prevails: string;
};
