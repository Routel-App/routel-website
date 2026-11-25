"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";
import type { Copy, Currency, Tier } from "./pricing-tiers";

function TierCard({ t, currency, badge }: { t: Tier; currency: Currency; badge?: string }) {
  const dark = t.highlighted;
  return (
    <div className={cn("relative flex h-full flex-col rounded-2xl border p-6", dark ? "border-ink-900 bg-ink-900 text-white shadow-float" : "border-fog-200 bg-white text-ink-900 shadow-card")}>
      {badge ? <span className="absolute -top-3 start-6 rounded-full bg-spark-400 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink-950">{badge}</span> : null}
      <h3 className="font-display text-lg font-bold leading-tight">{t.name}</h3>
      <p className={cn("mt-1.5 text-[13px] leading-relaxed", dark ? "text-white/65" : "text-fog-600")}>{t.who}</p>
      <div className="mt-5">
        <p className="font-display text-3xl font-bold">{t.price[currency]}</p>
        <p className={cn("mt-1 text-xs", dark ? "text-white/55" : "text-fog-500")}>{t.period}</p>
      </div>
      <ul className="mt-5 flex-1 space-y-2.5">
        {t.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-[13.5px]">
            <Check className={cn("mt-0.5 h-4 w-4 shrink-0", dark ? "text-spark-300" : "text-spark-600")} strokeWidth={2.5} />
            <span className={dark ? "text-white/85" : "text-fog-700"}>{f}</span>
          </li>
        ))}
      </ul>
      <Button href={t.href} variant={dark ? "inverse" : "secondary"} className="mt-7 w-full">
        {t.cta}
      </Button>
    </div>
  );
}

/**
 * The plan cards with the price list switch: US dollars (Qatar and other
 * markets), Saudi riyals for Saudi Arabia. Arabic opens on riyals, English on
 * dollars; either
 * list is one click away.
 */
export function PricingGrid({ t, initial }: { t: Copy; initial: Currency }) {
  const [currency, setCurrency] = useState<Currency>(initial);
  return (
    <div>
      <div className="mb-8 flex flex-col items-center gap-2">
        <div role="radiogroup" aria-label={t.currencyNote} className="inline-flex rounded-full bg-fog-100 p-1 ring-1 ring-fog-200">
          {(["usd", "sar"] as const).map((c) => (
            <button
              key={c}
              type="button"
              role="radio"
              aria-checked={currency === c}
              onClick={() => setCurrency(c)}
              className={cn(
                "rounded-full px-4 py-1.5 text-[13px] font-semibold transition-colors",
                currency === c ? "bg-ink-900 text-white shadow-card" : "text-fog-600 hover:text-ink-900",
              )}
            >
              {t.currency[c]}
            </button>
          ))}
        </div>
        <p className="text-[12.5px] text-fog-500">{t.currencyNote}</p>
      </div>
      <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5" stagger={0.06}>
        {t.tiers.map((tier) => (
          <RevealItem key={tier.slug} className="h-full">
            <TierCard t={tier} currency={currency} badge={tier.highlighted ? t.badge : undefined} />
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
