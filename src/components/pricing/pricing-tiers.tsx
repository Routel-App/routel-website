import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/**
 * PLACEHOLDER TIERS. Prices are intentionally not shown until they are
 * decided. Structure and feature lists are real; edit freely.
 */
export const tiers = [
  {
    name: "Starter",
    blurb: "For a small forwarding team getting off spreadsheets.",
    price: "Early access",
    period: "pricing announced at launch",
    features: [
      "Shipments, quotations, bookings",
      "Invoicing in MYR and USD",
      "Bill of Lading generation",
      "Document management",
      "Up to 5 users",
    ],
    cta: "Join the waitlist",
    href: "/demo?plan=starter",
  },
  {
    name: "Growth",
    blurb: "For forwarders who want live accounting and the assistant.",
    price: "Early access",
    period: "pricing announced at launch",
    features: [
      "Everything in Starter",
      "Live GL, Trial Balance, P&L, aging",
      "Expenses & payroll into the ledger",
      "AI assistant (Arabic & English)",
      "Role-based access, 5 roles",
      "Up to 20 users",
    ],
    cta: "Request a demo",
    href: "/demo?plan=growth",
    highlighted: true,
  },
  {
    name: "Enterprise",
    blurb: "For multi-branch operations with their own requirements.",
    price: "Let's talk",
    period: "custom agreement",
    features: [
      "Everything in Growth",
      "Unlimited users",
      "Dedicated onboarding and data migration",
      "Custom document templates",
      "Priority support",
    ],
    cta: "Contact sales",
    href: "/demo?plan=enterprise",
  },
];

export function PricingTiers() {
  return (
    <RevealGroup className="grid gap-5 lg:grid-cols-3" stagger={0.08}>
      {tiers.map((t) => (
        <RevealItem
          key={t.name}
          className={cn(
            "relative flex h-full flex-col rounded-2xl border p-7",
            t.highlighted
              ? "border-ink-900 bg-ink-900 text-white shadow-float"
              : "border-fog-200 bg-white text-ink-900 shadow-card",
          )}
        >
          {t.highlighted ? (
            <span className="absolute -top-3 left-7 rounded-full bg-teal-400 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink-950">
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
