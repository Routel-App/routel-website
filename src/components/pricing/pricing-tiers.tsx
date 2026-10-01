import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/**
 * Real tiers and limits, mirrored from the product's plan source of truth
 * (artifacts/api-server/src/lib/plan.ts). If the two ever disagree, the code wins —
 * update this file to match it, not the other way around.
 */
export const tiers = [
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
    name: "Growth",
    blurb: "For a team ready to run day-to-day operations without limits.",
    price: "$79",
    period: "per month",
    features: [
      "Unlimited jobs and invoices",
      "Staff accounts with role-based access",
      "10 GB document storage",
    ],
    cta: "Request a demo",
    href: "/demo?plan=growth",
  },
  {
    name: "Pro",
    blurb: "Everything in Growth, plus the AI assistant and your own branding.",
    price: "$149",
    period: "per month",
    features: [
      "Everything in Growth",
      "AI assistant — chat & document extraction (Arabic & English)",
      "Email sync (Zoho, Microsoft, Google)",
      "100 GB document storage",
      "Custom domain and branded documents",
      "Website visitor tracking",
    ],
    cta: "Request a demo",
    href: "/demo?plan=pro",
    highlighted: true,
  },
  {
    name: "Enterprise",
    blurb: "For operations that want their own dedicated infrastructure.",
    price: "$300",
    period: "per month",
    features: [
      "Everything in Pro",
      "Dedicated server (own VPS)",
      "Unlimited document storage",
      "Own database on your own server",
    ],
    cta: "Contact sales",
    href: "/demo?plan=enterprise",
  },
];

export function PricingTiers() {
  return (
    <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
      {tiers.map((t) => (
        <RevealItem
          key={t.name}
          className={cn(
            "relative flex h-full flex-col rounded-2xl border p-6",
            t.highlighted
              ? "border-ink-900 bg-ink-900 text-white shadow-float"
              : "border-fog-200 bg-white text-ink-900 shadow-card",
          )}
        >
          {t.highlighted ? (
            <span className="absolute -top-3 left-6 rounded-full bg-teal-400 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink-950">
              Most popular
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
