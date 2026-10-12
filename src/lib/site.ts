import type { Locale } from "./i18n";

export const site = {
  name: "Routel",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://routel.app",
  cta: { href: "/demo" },
} as const;

type SiteCopy = {
  tagline: string;
  description: string;
  nav: Array<{ label: string; href: string }>;
  ctaLabel: string;
};

export const siteCopy: Record<Locale, SiteCopy> = {
  en: {
    tagline: "The operating system for freight forwarders",
    description:
      "Routel is a freight forwarding platform that runs shipments, quotations, bookings, invoicing and live accounting in one place, with an AI assistant that does the paperwork with you.",
    nav: [
      { label: "AI Assistant", href: "/#assistant" },
      { label: "Pricing", href: "/pricing" },
      { label: "About", href: "/about" },
    ],
    ctaLabel: "Request a demo",
  },
  ar: {
    tagline: "نظام التشغيل لشركات الشحن والتخليص",
    description:
      "Routel منصة لشركات الشحن تدير الشحنات وعروض الأسعار والحجوزات والفواتير والمحاسبة الفورية في مكان واحد، مع مساعد ذكي ينجز الأعمال الورقية معك.",
    nav: [
      { label: "المساعد الذكي", href: "/#assistant" },
      { label: "الأسعار", href: "/pricing" },
      { label: "من نحن", href: "/about" },
    ],
    ctaLabel: "اطلب عرضاً تجريبياً",
  },
};
