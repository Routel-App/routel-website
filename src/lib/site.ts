import type { Locale } from "./i18n";

export const site = {
  name: "ROUTEL",
  /**
   * The platform's one legal name (founder's decision, 2026-11-28): used
   * wherever the site names the legal party — the terms, the privacy
   * policy, the footer's copyright line and the organization data. Kept in
   * Latin script on the Arabic pages too. "ROUTEL" stays the short brand.
   */
  legalName: "ROUTEL – Logistics & Supply Chain Platform",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://routel.app",
  cta: { href: "/demo" },
  /** The public contact address, shown in the footer and on the About page. */
  email: "info@routel.app",
} as const;

type SiteCopy = {
  tagline: string;
  description: string;
  /** `hint` shows as a hover card under the link (and under it in the mobile menu). */
  nav: Array<{ label: string; href: string; hint?: string }>;
  /** The assistant's one-line pitch, used in the hero, the navbar and the product menu. */
  aiTagline: string;
  ctaLabel: string;
};

/** The product line under the wordmark in the navbar and footer. */
export const logoTagline: Record<Locale, string> = { en: "Maritime & Logistics", ar: "البحري واللوجستي" };

export const siteCopy: Record<Locale, SiteCopy> = {
  en: {
    tagline: "Maritime & Logistics Operating System",
    description:
      "ROUTEL is the Maritime & Logistics Operating System, with the rules of the trade built in: sea and air freight, consolidation and LCL, customs, documents, finance and accounting on one platform, and an AI assistant that acts after you confirm.",
    nav: [
      { label: "AI Assistant", href: "/platform/ai-assistant", hint: "Built into ROUTEL: reads, drafts and acts after you confirm" },
      { label: "Pricing", href: "/pricing" },
      { label: "Company", href: "/about" },
    ],
    ctaLabel: "Request a demo",
    aiTagline: "ROUTEL's built-in AI assistant reads, drafts and acts after you confirm",
  },
  ar: {
    tagline: "نظام التشغيل البحري واللوجستي",
    description:
      "ROUTEL نظام التشغيل البحري واللوجستي، وقواعد المهنة مدمجة فيه: الشحن البحري والجوي، والتجميع وLCL، والتخليص الجمركي، والمستندات، والمالية والمحاسبة على منصة واحدة، ومساعد ذكي ينفّذ بعد تأكيدك.",
    nav: [
      { label: "المساعد الذكي", href: "/platform/ai-assistant", hint: "مدمج في ROUTEL: يقرأ ويجهّز وينفّذ بعد تأكيدك" },
      { label: "الأسعار", href: "/pricing" },
      { label: "الشركة", href: "/about" },
    ],
    ctaLabel: "اطلب عرضاً تجريبياً",
    aiTagline: "مساعد ذكي مدمج في ROUTEL يقرأ ويجهّز وينفّذ بعد تأكيدك",
  },
};
