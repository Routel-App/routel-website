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
