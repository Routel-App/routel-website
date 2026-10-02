import Link from "next/link";
import { site } from "@/lib/site";
import { modules } from "@/lib/modules";
import { Container } from "@/components/ui/container";
import { Logo } from "./logo";

const platformSlugs = ["shipments", "business-partners", "quotations", "invoicing", "accounting", "bill-of-lading", "ai-assistant"];

const columns = [
  {
    heading: "Platform",
    links: [
      ...platformSlugs
        .map((slug) => modules.find((m) => m.slug === slug))
        .filter((m): m is NonNullable<typeof m> => Boolean(m))
        .map((m) => ({ label: m.name, href: `/platform/${m.slug}` })),
      { label: "All modules", href: "/platform" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Introduction", href: "/docs" },
      { label: "Glossary", href: "/glossary" },
      { label: "Case studies", href: "/case-studies" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Routel", href: "/about" },
      { label: "Pricing", href: "/pricing" },
      { label: "Request a demo", href: "/demo" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-ink-950 pt-16 text-white/70">
      <Container className="pb-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="max-w-xs">
            <Logo inverse />
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              {site.tagline}. Built from the system that runs a working freight forwarder every day.
            </p>
            <p className="mt-6 font-mono text-xs text-white/50">
              <a href={`mailto:${site.contactEmail}`} className="transition-colors hover:text-white">
                {site.contactEmail}
              </a>
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-sm font-semibold text-white">{col.heading}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link href={l.href} className="text-sm text-white/60 transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.company}. All rights reserved.
          </p>
          <p>Routel is a product of {site.companyShort}, Malaysia.</p>
        </div>
      </Container>
    </footer>
  );
}
