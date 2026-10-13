import type { Locale } from "./i18n";

export const site = {
  name: "Routel",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://routel.app",
  cta: { href: "/demo" },
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

export const siteCopy: Record<Locale, SiteCopy> = {
  en: {
    tagline: "The operating system for freight forwarders",
    description:
      "Routel is a freight forwarding platform that runs shipments, quotations, bookings, invoicing and live accounting in one place, with an AI assistant that does the paperwork with you.",
    nav: [
      { label: "Features", href: "/features" },
      { label: "AI Assistant", href: "/platform/ai-assistant", hint: "An AI assistant that calls tools and runs operations automatically" },
      { label: "Pricing", href: "/pricing" },
      { label: "About", href: "/about" },
    ],
    ctaLabel: "Request a demo",
    aiTagline: "An AI assistant that calls tools and runs operations automatically",
  },
  ar: {
    tagline: "نظام التشغيل لشركات الشحن والتخليص",
    description:
      "Routel منصة لشركات الشحن تدير الشحنات وعروض الأسعار والحجوزات والفواتير والمحاسبة الفورية في مكان واحد، مع مساعد ذكي ينجز الأعمال الورقية معك.",
    nav: [
      { label: "الميزات", href: "/features" },
      { label: "المساعد الذكي", href: "/platform/ai-assistant", hint: "مساعد ذكي يستدعي أدوات وينفّذ عمليات تلقائيًا" },
      { label: "الأسعار", href: "/pricing" },
      { label: "من نحن", href: "/about" },
    ],
    ctaLabel: "اطلب عرضاً تجريبياً",
    aiTagline: "مساعد ذكي يستدعي أدوات وينفّذ عمليات تلقائيًا",
  },
};
