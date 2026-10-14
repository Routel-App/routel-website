import { Check, Lock, Search, Ship } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Ltr, ShotFrame, arrowFor } from "./frame";

/* ─── Routes: buying rates per lane, with validity, and the lanes' performance ─── */

type RateStatus = "active" | "expiring" | "expired";

const rateTone: Record<RateStatus, string> = {
  active: "bg-teal-50 text-teal-700 ring-teal-200",
  expiring: "bg-spark-50 text-spark-600 ring-spark-200",
  expired: "bg-fog-100 text-fog-500 ring-fog-200",
};

const routesCopy = {
  en: {
    title: "Routes",
    sub: "Pricing and performance for every shipping route",
    tabs: ["Route Rates", "Route Analytics"],
    head: ["Route", "Shipping line", "Container", "Valid until", "Buying"],
    status: { active: "Active", expiring: "Expiring", expired: "Expired" },
    rows: [
      ["Port Klang", "Shanghai", "MSC", "40HC", "30 Nov", "USD 1,850", "active"],
      ["Penang", "Rotterdam", "Maersk", "40HC", "21 Oct", "USD 2,940", "expiring"],
      ["Jakarta", "Port Klang", "CMA CGM", "20GP", "15 Dec", "USD 420", "active"],
      ["Surabaya", "Singapore", "COSCO", "20GP", "02 Oct", "USD 380", "expired"],
    ] as const,
    topTitle: "Top routes by volume",
    top: [["Port Klang → Shanghai", 92], ["Jakarta → Port Klang", 71], ["Penang → Rotterdam", 48]] as const,
    margin: ["Margin, last 6 months", "21.4%"],
    importLabel: "Import from Excel",
  },
  ar: {
    title: "المسارات",
    sub: "التسعير والأداء لكل مسار شحن",
    tabs: ["أسعار المسارات", "تحليلات المسارات"],
    head: ["المسار", "الخط الملاحي", "الحاوية", "صالح حتى", "سعر الشراء"],
    status: { active: "سارٍ", expiring: "قارب الانتهاء", expired: "منتهٍ" },
    rows: [
      ["جدة", "شنغهاي", "MSC", "40HC", "30 نوفمبر", "USD 1,850", "active"],
      ["الدمام", "روتردام", "Maersk", "40HC", "21 أكتوبر", "USD 2,940", "expiring"],
      ["جدة", "جبل علي", "CMA CGM", "20GP", "15 ديسمبر", "USD 420", "active"],
      ["الدمام", "نهافا شيفا", "COSCO", "20GP", "02 أكتوبر", "USD 610", "expired"],
    ] as const,
    topTitle: "أكثر المسارات حجماً",
    top: [["جدة ← شنغهاي", 92], ["جدة ← جبل علي", 71], ["الدمام ← روتردام", 48]] as const,
    margin: ["الهامش، آخر 6 أشهر", "21.4%"],
    importLabel: "استيراد من Excel",
  },
} as const;

export function RoutesShot({ locale, className }: { locale: Locale; className?: string }) {
  const t = routesCopy[locale];
  const arrow = arrowFor(locale);
  return (
    <ShotFrame locale={locale} className={className}>
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-display text-[15px] font-bold">{t.title}</p>
            <p className="mt-0.5 text-[11px] text-fog-500">{t.sub}</p>
          </div>
          <span className="rounded-lg bg-fog-50 px-2.5 py-1 text-[10.5px] font-medium text-fog-600 ring-1 ring-fog-200">{t.importLabel}</span>
        </div>
        <div className="mt-3 flex gap-1 border-b border-fog-200 text-[11px] font-medium">
          {t.tabs.map((tab, i) => (
            <span key={tab} className={cn("-mb-px border-b-2 px-2.5 pb-1.5", i === 0 ? "border-teal-500 text-ink-900" : "border-transparent text-fog-500")}>
              {tab}
            </span>
          ))}
        </div>
        <table className="mt-2 w-full text-[11px]">
          <thead>
            <tr className="text-start text-[10px] text-fog-500">
              {t.head.map((h) => (
                <th key={h} className="py-1.5 text-start font-medium">{h}</th>
              ))}
              <th />
            </tr>
          </thead>
          <tbody className="divide-y divide-fog-100">
            {t.rows.map(([from, to, line, box, until, price, status]) => (
              <tr key={from + to}>
                <td className="py-2 font-medium">
                  {from} <span className="text-fog-400">{arrow}</span> {to}
                </td>
                <td className="py-2 text-fog-600">{line}</td>
                <td className="py-2"><Ltr className="font-mono text-[10.5px]">{box}</Ltr></td>
                <td className="py-2 text-fog-600">{until}</td>
                <td className="py-2"><Ltr className="font-mono text-[10.5px] font-semibold">{price}</Ltr></td>
                <td className="py-2 text-end">
                  <span className={cn("rounded-full px-2 py-0.5 text-[9.5px] font-medium ring-1", rateTone[status as RateStatus])}>
                    {t.status[status as RateStatus]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-3 grid grid-cols-[1.6fr_1fr] gap-3">
          <div className="rounded-xl border border-fog-200 p-3">
            <p className="text-[10.5px] font-semibold">{t.topTitle}</p>
            <ul className="mt-2 space-y-1.5">
              {t.top.map(([lane, share]) => (
                <li key={lane} className="grid grid-cols-[1fr_1.2fr] items-center gap-2 text-[10px]">
                  <span className="truncate text-fog-600">{lane}</span>
                  <span className="h-1.5 rounded-full bg-fog-100">
                    <span className="block h-full rounded-full bg-teal-400" style={{ width: `${share}%` }} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col justify-center rounded-xl bg-ink-900 p-3 text-white">
            <p className="text-[10px] text-white/60">{t.margin[0]}</p>
            <Ltr className="mt-1 font-mono text-[20px] font-semibold text-teal-300">{t.margin[1]}</Ltr>
          </div>
        </div>
      </div>
    </ShotFrame>
  );
}

/* ─── Public tracking: two pieces of information in, a status timeline out ─── */

const trackingCopy = {
  en: {
    title: "Track your shipment",
    q: ["Booking, B/L or container number", "NXS26000412"],
    verify: ["Company name or account ID", "Straits Electronics"],
    go: "Track",
    steps: ["Booking Confirmed", "Gate In", "Vessel Loaded", "Departed", "In Transit", "Arrived", "Shipment Closed"],
    current: 4,
    privacy: "Status only: no vessel, master B/L, container list or exact dates are shown.",
  },
  ar: {
    title: "تتبّع شحنتك",
    q: ["رقم الحجز أو البوليصة أو الحاوية", "NXS26000412"],
    verify: ["اسم الشركة أو رقم الحساب", "شركة الرواد للتجارة"],
    go: "تتبّع",
    steps: ["تم تأكيد الحجز", "دخول البوابة", "تم التحميل على السفينة", "غادرت", "قيد النقل", "وصلت", "الشحنة مغلقة"],
    current: 4,
    privacy: "الحالة فقط: لا تظهر السفينة ولا البوليصة الرئيسية ولا قائمة الحاويات ولا التواريخ الدقيقة.",
  },
} as const;

export function TrackingShot({ locale, className }: { locale: Locale; className?: string }) {
  const t = trackingCopy[locale];
  return (
    <ShotFrame locale={locale} url="app.routel.app/track" className={className}>
      <div className="p-4 sm:p-5">
        <p className="flex items-center gap-2 font-display text-[15px] font-bold">
          <Ship className="h-4 w-4 text-teal-600" />
          {t.title}
        </p>
        <div className="mt-3 grid grid-cols-[1fr_1fr_auto] gap-2">
          {[t.q, t.verify].map(([label, value]) => (
            <div key={label} className="rounded-lg border border-fog-200 px-2.5 py-1.5">
              <p className="text-[9.5px] text-fog-500">{label}</p>
              <p className="mt-0.5 truncate text-[11px] font-medium">{value}</p>
            </div>
          ))}
          <span className="flex items-center gap-1 self-stretch rounded-lg bg-teal-500 px-3 text-[11px] font-semibold text-white">
            <Search className="h-3 w-3" />
            {t.go}
          </span>
        </div>
        <ol className="mt-4 space-y-0">
          {t.steps.map((step, i) => {
            const done = i < t.current;
            const now = i === t.current;
            return (
              <li key={step} className="relative flex items-center gap-3 pb-2.5 last:pb-0">
                {i < t.steps.length - 1 ? (
                  <span aria-hidden className={cn("absolute start-[9px] top-5 h-[calc(100%-12px)] w-px", done ? "bg-teal-300" : "bg-fog-200")} />
                ) : null}
                <span
                  className={cn(
                    "relative z-10 flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-full",
                    done ? "bg-teal-500 text-white" : now ? "bg-white ring-2 ring-teal-500" : "bg-white ring-1 ring-fog-300",
                  )}
                >
                  {done ? <Check className="h-3 w-3" /> : now ? <span className="h-2 w-2 animate-pulse-soft rounded-full bg-teal-500" /> : null}
                </span>
                <span className={cn("text-[11.5px]", done ? "text-fog-600" : now ? "font-semibold text-ink-900" : "text-fog-400")}>{step}</span>
              </li>
            );
          })}
        </ol>
        <p className="mt-3 flex items-start gap-1.5 rounded-lg bg-fog-50 p-2 text-[10px] leading-relaxed text-fog-600">
          <Lock className="mt-0.5 h-3 w-3 shrink-0" />
          {t.privacy}
        </p>
      </div>
    </ShotFrame>
  );
}
