import type { Locale } from "./i18n";

export const site = {
  name: "ROUTEL",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://routel.app",
  cta: { href: "/demo" },
  /** The public contact address, shown in the footer and on the About page. */
  email: "musheer@routel.app",
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
      "ROUTEL is the Maritime & Logistics Operating System, run by AI: sea and air freight forwarding, consolidation and LCL, documents, finance and accounting on one platform, with an AI assistant that reads, drafts and acts after you confirm.",
    nav: [
      { label: "AI Assistant", href: "/platform/ai-assistant", hint: "Built into Routel: reads, drafts and acts after you confirm" },
      { label: "Pricing", href: "/pricing" },
      { label: "Company", href: "/about" },
    ],
    ctaLabel: "Request a demo",
    aiTagline: "Routel's built-in AI assistant reads, drafts and acts after you confirm",
  },
  ar: {
    tagline: "نظام التشغيل البحري واللوجستي",
    description:
      "ROUTEL نظام التشغيل البحري واللوجستي بقيادة الذكاء الاصطناعي: الشحن البحري والجوي، والتجميع وLCL، والمستندات، والمالية والمحاسبة على منصة واحدة، مع مساعد ذكي يقرأ ويجهّز وينفّذ بعد تأكيدك.",
    nav: [
      { label: "المساعد الذكي", href: "/platform/ai-assistant", hint: "مدمج داخل Routel: يقرأ ويجهّز وينفّذ بعد تأكيدك" },
      { label: "الأسعار", href: "/pricing" },
      { label: "الشركة", href: "/about" },
    ],
    ctaLabel: "اطلب عرضاً تجريبياً",
    aiTagline: "مساعد ذكي مدمج في Routel يقرأ ويجهّز وينفّذ بعد تأكيدك",
  },
};
