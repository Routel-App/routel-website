export const site = {
  name: "Routel",
  tagline: "The operating system for freight forwarders",
  description:
    "Routel is a freight forwarding platform that runs shipments, quotations, bookings, invoicing and live accounting in one place, with an AI assistant that does the paperwork with you.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://routel.io",
  company: "Flamingo Global Sdn Bhd",
  companyShort: "Flamingo Global",
  contactEmail: "hello@routel.io",
  nav: [
    { label: "AI Assistant", href: "/#assistant" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
  ],
  cta: { label: "Request a demo", href: "/demo" },
} as const;
