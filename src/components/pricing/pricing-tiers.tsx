import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";
import { getLocale } from "@/lib/locale-server";

type Tier = {
  name: string;
  blurb: string;
  price: string;
  period: string;
  features: string[];
  cta: string;
  href: string;
  highlighted?: boolean;
};

/**
 * Real tiers and limits, mirrored from the product's plan source of truth
 * (artifacts/api-server/src/lib/plan.ts). If the two ever disagree, the code wins —
 * update this file to match it, not the other way around.
 * The Arabic copy must state exactly the same prices and limits as the English.
 */
const tierCopy = {
  en: [
    {
      name: "Free",
      blurb: "Try Routel on a few real jobs before you commit.",
      price: "$0",
      period: "forever",
      features: [
        "3 jobs, lifetime (not monthly)",
        "Up to 2 invoices per job",
        "Dashboard, Jobs, Invoices, Customers",
        "Single admin user",
        "Every other page is visible, locked until you upgrade",
      ],
      cta: "Get started free",
      href: "/demo?plan=free",
    },
    {
      name: "Starter",
      blurb: "For a team ready to run day-to-day operations without limits.",
      price: "$79",
      period: "per month",
      features: [
        "Unlimited jobs and invoices",
        "Staff accounts with role-based access",
        "10 GB document storage",
      ],
      cta: "Request a demo",
      href: "/demo?plan=starter",
    },
    {
      name: "Growth",
      blurb: "Everything in Starter, plus the AI assistant and your own branding.",
      price: "$149",
      period: "per month",
      features: [
        "Everything in Starter",
        "AI assistant — chat & document extraction (Arabic & English)",
        "Email sync (Zoho, Microsoft, Google)",
        "100 GB document storage",
        "Custom domain and branded documents",
        "Website visitor tracking",
      ],
      cta: "Request a demo",
      href: "/demo?plan=growth",
      highlighted: true,
    },
    {
      name: "Enterprise",
      blurb: "For operations that want their own dedicated infrastructure.",
      price: "Let's talk",
      period: "custom agreement",
      features: [
        "Everything in Growth",
        "Dedicated server (own VPS)",
        "Unlimited document storage",
        "Own database on your own server",
      ],
      cta: "Contact sales",
      href: "/demo?plan=enterprise",
    },
  ],
  ar: [
    {
      name: "المجانية",
      blurb: "جرّب Routel على عدد من الشحنات الحقيقية قبل أن تلتزم.",
      price: "$0",
      period: "مجاناً دائماً",
      features: [
        "3 ملفات شحن طوال مدة الاستخدام (وليس شهرياً)",
        "حتى فاتورتين لكل ملف شحن",
        "لوحة التحكم، والشحنات، والفواتير، والعملاء",
        "مستخدم واحد بصلاحية مدير النظام",
        "جميع الصفحات الأخرى ظاهرة، ومقفلة حتى الترقية",
      ],
      cta: "ابدأ مجاناً",
      href: "/demo?plan=free",
    },
    {
      name: "الانطلاق",
      blurb: "لفريق جاهز لإدارة العمليات اليومية دون قيود.",
      price: "$79",
      period: "شهرياً",
      features: [
        "ملفات شحن وفواتير بلا حدود",
        "حسابات للموظفين مع صلاحيات حسب الدور",
        "مساحة 10 GB لتخزين المستندات",
      ],
      cta: "اطلب عرضاً تجريبياً",
      href: "/demo?plan=starter",
    },
    {
      name: "النمو",
      blurb: "كل ما في باقة الانطلاق، مع المساعد الذكي وهويتك التجارية الخاصة.",
      price: "$149",
      period: "شهرياً",
      features: [
        "كل ما في باقة الانطلاق",
        "المساعد الذكي — محادثة واستخراج بيانات المستندات (بالعربية والإنجليزية)",
        "مزامنة البريد الإلكتروني (Zoho وMicrosoft وGoogle)",
        "مساحة 100 GB لتخزين المستندات",
        "نطاق مخصص ومستندات تحمل هويتك التجارية",
        "تتبّع زوار الموقع الإلكتروني",
      ],
      cta: "اطلب عرضاً تجريبياً",
      href: "/demo?plan=growth",
      highlighted: true,
    },
    {
      name: "المؤسسات",
      blurb: "للعمليات التي تريد بنية تحتية مخصصة لها وحدها.",
      price: "لنتحدث",
      period: "اتفاقية مخصصة",
      features: [
        "كل ما في باقة النمو",
        "خادم مخصص (VPS خاص بك)",
        "تخزين مستندات بلا حدود",
        "قاعدة بيانات خاصة بك على خادمك",
      ],
      cta: "تواصل مع المبيعات",
      href: "/demo?plan=enterprise",
    },
  ],
} satisfies Record<Locale, Tier[]>;

const badgeCopy: Record<Locale, string> = { en: "Most popular", ar: "الأكثر طلباً" };

export function getTiers(locale: Locale): Tier[] {
  return tierCopy[locale];
}

/** Plan display names keyed by the `?plan=` slug used in demo links. */
export function planName(slug: string, locale: Locale): string | undefined {
  const i = tierCopy.en.findIndex((t) => t.href === `/demo?plan=${slug.toLowerCase()}`);
  return i === -1 ? undefined : tierCopy[locale][i].name;
}

export async function PricingTiers() {
  const locale = await getLocale();
  const tiers = getTiers(locale);
  return (
    <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
      {tiers.map((t) => (
        <RevealItem
          key={t.href}
          className={cn(
            "relative flex h-full flex-col rounded-2xl border p-6",
            t.highlighted
              ? "border-ink-900 bg-ink-900 text-white shadow-float"
              : "border-fog-200 bg-white text-ink-900 shadow-card",
          )}
        >
          {t.highlighted ? (
            <span className="absolute -top-3 start-6 rounded-full bg-teal-400 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink-950">
              {badgeCopy[locale]}
            </span>
          ) : null}
          <h3 className="font-display text-xl font-bold">{t.name}</h3>
          <p className={cn("mt-1.5 text-sm", t.highlighted ? "text-white/65" : "text-fog-600")}>{t.blurb}</p>
          <div className="mt-6">
            <p className="font-display text-3xl font-bold">{t.price}</p>
            <p className={cn("mt-1 text-xs", t.highlighted ? "text-white/55" : "text-fog-500")}>{t.period}</p>
          </div>
          <ul className="mt-6 flex-1 space-y-2.5">
            {t.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm">
                <Check
                  className={cn("mt-0.5 h-4 w-4 shrink-0", t.highlighted ? "text-teal-300" : "text-teal-600")}
                  strokeWidth={2.5}
                />
                <span className={t.highlighted ? "text-white/85" : "text-fog-700"}>{f}</span>
              </li>
            ))}
          </ul>
          <Button href={t.href} variant={t.highlighted ? "inverse" : "secondary"} className="mt-8 w-full">
            {t.cta}
          </Button>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
