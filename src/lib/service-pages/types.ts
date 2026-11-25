import type { FaqItem } from "@/components/ui/faq";

/** A small product card drawn in HTML: the "screenshot" next to a feature. */
export type Mock = {
  title: string;
  badge?: string;
  rows: Array<[string, string]>;
  foot?: string;
};

/**
 * One service's own page under /solutions/[slug]: what the module does, from
 * the system's code.
 */
export type ServicePageCopy = {
  metaTitle: string;
  metaDescription: string;
  headline: string;
  lead: string;
  /** The one big figure, Kpler-style, beside the picture. */
  stat: { value: string; label: string };
  figures: Array<{ value: string; label: string }>;
  features: Array<{ title: string; text: string; points: string[]; mock: Mock }>;
  flow: Array<{ title: string; text: string }>;
  ai: { title: string; text: string; prompt: string; reply: string; tools?: string[]; /** The reply proposes a write, shown as waiting for the person's confirmation. Read answers leave it out. */ confirm?: boolean };
  versus: Array<{ topic: string; them: string; us: string }>;
  audience: Array<{ title: string; text: string }>;
  faqs: FaqItem[];
};
