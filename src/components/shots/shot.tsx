import { getLocale } from "@/lib/locale-server";
import { DashboardShot } from "./dashboard-shot";
import { AssistantChatShot, DocumentReadShot, SetupShot, TodayBriefShot } from "./ai-shots";
import { AlertsShot, ShipmentShot, TaxInvoiceShot } from "./product-shots";
import { ShotScaler } from "./scaler";

const shots = {
  dashboard: { Component: DashboardShot, wide: true, max: "" },
  alerts: { Component: AlertsShot, wide: false, max: "max-w-[760px]" },
  today: { Component: TodayBriefShot, wide: false, max: "max-w-[460px]" },
  shipment: { Component: ShipmentShot, wide: false, max: "max-w-[660px]" },
  assistant: { Component: AssistantChatShot, wide: false, max: "max-w-[480px]" },
  documents: { Component: DocumentReadShot, wide: false, max: "max-w-[640px]" },
  invoice: { Component: TaxInvoiceShot, wide: false, max: "max-w-[560px]" },
  setup: { Component: SetupShot, wide: false, max: "max-w-[520px]" },
} as const;

export type ShotName = keyof typeof shots;

/**
 * A marketing shot dropped into MDX content: `<Shot name="alerts" />`. Picks
 * the page's language itself, and steps out of the prose styles.
 */
export async function Shot({ name }: { name: ShotName }) {
  const locale = await getLocale();
  const shot = shots[name];
  if (!shot) return null;
  const { Component } = shot;
  return (
    <figure className="not-prose my-10 rounded-3xl bg-[linear-gradient(135deg,var(--color-fog-100),var(--color-teal-50))] p-4 sm:p-8">
      {shot.wide ? (
        // The features column is ~700px at its widest.
        <ShotScaler zoom="[zoom:0.3] min-[420px]:[zoom:0.33] sm:[zoom:0.52] md:[zoom:0.66] lg:[zoom:0.68]">
          <Component locale={locale} />
        </ShotScaler>
      ) : (
        <Component locale={locale} className={`mx-auto ${shot.max}`} />
      )}
    </figure>
  );
}
