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
      "Routel is the freight forwarding system with a built-in AI assistant that calls tools and runs your operations automatically: quotations, bookings, route rates, invoicing and live accounting in one place.",
    nav: [
      { label: "Features", href: "/features" },
      { label: "AI Assistant", href: "/platform/ai-assistant", hint: "Built into Routel: calls tools and runs your operations automatically" },
      { label: "Pricing", href: "/pricing" },
      { label: "About", href: "/about" },
    ],
    ctaLabel: "Request a demo",
    aiTagline: "Routel's built-in AI assistant calls tools and runs your operations automatically",
  },
  ar: {
    tagline: "نظام التشغيل لشركات الشحن والتخليص",
    description:
      "Routel نظام شحن متكامل بمساعد ذكي مدمج يستدعي الأدوات وينفّذ عملياتك تلقائيًا: عروض الأسعار والحجوزات وأسعار المسارات والفواتير والمحاسبة الفورية في مكان واحد.",
    nav: [
      { label: "الميزات", href: "/features" },
      { label: "المساعد الذكي", href: "/platform/ai-assistant", hint: "مدمج داخل Routel: يستدعي الأدوات وينفّذ عملياتك تلقائيًا" },
      { label: "الأسعار", href: "/pricing" },
      { label: "من نحن", href: "/about" },
    ],
    ctaLabel: "اطلب عرضاً تجريبياً",
    aiTagline: "مساعد ذكي مدمج في Routel يستدعي الأدوات وينفّذ عملياتك تلقائيًا",
  },
};
