import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import {
  ApprovalsCard,
  BillOfLadingCard,
  ContainersCard,
  CurrencyCard,
  LedgerCard,
  PaymentMatchCard,
  ReadsPdfCard,
  RevisionsCard,
} from "@/components/motion/bento-cards";
import { PromptTyper } from "@/components/motion/prompt-typer";
import { Lottie } from "@/components/motion/lottie";
import { RoutesShot, TrackingShot } from "@/components/shots/tour-shots";

/**
 * The animated picture in a platform page's hero: the vignette that shows
 * this module doing its job, or a Lottie where no vignette fits yet.
 */
export function moduleVisual(slug: string, locale: Locale): ReactNode {
  const lottie = (src: string) => (
    <div className="flex aspect-[4/3] items-center justify-center rounded-3xl bg-[linear-gradient(135deg,var(--color-fog-100),var(--color-teal-50))] p-6 ring-1 ring-fog-200">
      <Lottie src={src} className="h-full w-full" />
    </div>
  );
  switch (slug) {
    case "bookings":
      return (
        <div className="grid gap-4">
          <ContainersCard />
          <RevisionsCard />
        </div>
      );
    case "quotations":
      return <RoutesShot locale={locale} className="shadow-float" />;
    case "invoicing":
      return <CurrencyCard />;
    case "finance-receivables":
      return <PaymentMatchCard />;
    case "accounting":
    case "expenses":
      return <LedgerCard />;
    case "documents":
      return <ApprovalsCard />;
    case "email-sync":
      return <ReadsPdfCard />;
    case "tracking":
      return <TrackingShot locale={locale} className="shadow-float" />;
    case "ai-assistant":
      return (
        <div className="rounded-3xl bg-ink-950 p-5 ring-1 ring-white/10 sm:p-7">
          <PromptTyper />
        </div>
      );
    case "bill-of-lading":
      return <BillOfLadingCard />;
    case "labeling-center":
      return lottie("/lottie/containers-stack.json");
    case "visitor-tracking":
    case "compliance":
      return lottie("/lottie/ship-wave.json");
    default:
      return lottie("/lottie/docs-merge.json");
  }
}
