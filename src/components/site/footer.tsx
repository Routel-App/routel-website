import Link from "@/components/i18n/link";
import { site, siteCopy } from "@/lib/site";
import { getModules } from "@/lib/modules";
import type { Locale } from "@/lib/i18n";
import { getLocale } from "@/lib/locale-server";
import { Container } from "@/components/ui/container";
import { Logo } from "./logo";

const platformSlugs = ["shipments", "business-partners", "quotations", "invoicing", "accounting", "bill-of-lading", "ai-assistant"];

const copy = {
  en: {
    platform: "Platform",
    allModules: "All modules",
    allFeatures: "All features",
    resources: "Resources",
    introduction: "Introduction",
    glossary: "Glossary",
    caseStudies: "Case studies",
    company: "Company",
    about: "About Routel",
    pricing: "Pricing",
    demo: "Request a demo",
    blurb: "Built from the system that runs a working freight forwarder every day.",
    rights: "All rights reserved.",
    origin: "Built and run from Malaysia.",
  },
  ar: {
    platform: "المنصة",
    allModules: "جميع الوحدات",
    allFeatures: "جميع الميزات",
    resources: "الموارد",
    introduction: "مقدمة",
    glossary: "المصطلحات",
    caseStudies: "قصص العملاء",
    company: "الشركة",
    about: "عن Routel",
    pricing: "الأسعار",
    demo: "اطلب عرضاً تجريبياً",
    blurb: "مبني من النظام الذي يدير شركة شحن حقيقية كل يوم.",
    rights: "جميع الحقوق محفوظة.",
    origin: "طُوّر ويُدار من ماليزيا.",
  },
} satisfies Record<Locale, Record<string, string>>;

export async function Footer() {
  const locale = await getLocale();
  const t = copy[locale];
  const modules = getModules(locale);

  const columns = [
    {
      heading: t.platform,
      links: [
        ...platformSlugs
          .map((slug) => modules.find((m) => m.slug === slug))
          .filter((m): m is NonNullable<typeof m> => Boolean(m))
          .map((m) => ({ label: m.name, href: `/platform/${m.slug}` })),
        { label: t.allModules, href: "/platform" },
        { label: t.allFeatures, href: "/features" },
      ],
    },
    {
      heading: t.resources,
      links: [
        { label: t.introduction, href: "/docs" },
        { label: t.glossary, href: "/glossary" },
        { label: t.caseStudies, href: "/case-studies" },
      ],
    },
    {
      heading: t.company,
      links: [
        { label: t.about, href: "/about" },
        { label: t.pricing, href: "/pricing" },
        { label: t.demo, href: "/demo" },
      ],
    },
  ];

  return (
    <footer className="bg-ink-950 pt-16 text-white/70">
      <Container className="pb-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="max-w-xs">
            <Logo inverse />
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              {siteCopy[locale].tagline}. {t.blurb}
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
            © {new Date().getFullYear()} {site.name}. {t.rights}
          </p>
          <p>{t.origin}</p>
        </div>
      </Container>
    </footer>
  );
}
