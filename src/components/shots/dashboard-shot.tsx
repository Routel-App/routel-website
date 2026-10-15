import { Bell, Bot, ChartColumn, FileText, LayoutDashboard, Search, Ship, Users } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Wordmark } from "@/components/site/logo";
import { ShotFrame } from "./frame";

/**
 * A stylised "screenshot" of the Routel dashboard for marketing. Not a real
 * capture: simplified on purpose, with illustrative figures — Saudi data on
 * the Arabic site, Malaysian / Indonesian data on the English one.
 */
type Status = "transit" | "arrived" | "loading" | "customs";

const statusStyle: Record<Status, string> = {
  transit: "bg-sky-50 text-sky-700 ring-sky-200",
  arrived: "bg-spark-50 text-spark-700 ring-spark-200",
  loading: "bg-spark-50 text-spark-600 ring-spark-200",
  customs: "bg-violet-50 text-violet-700 ring-violet-200",
};

const copy = {
  en: {
    nav: ["Dashboard", "Bookings", "Partners", "Invoices", "Reports", "Assistant"],
    title: "Good morning, Aisyah",
    subtitle: "Here's how the month is going.",
    search: "Search bookings, B/L, containers…",
    kpis: [
      { label: "Revenue this month", value: "MYR 482,300", delta: "+12.4%" },
      { label: "Gross profit", value: "MYR 96,450", delta: "20.0% margin" },
      { label: "Active shipments", value: "128", delta: "14 arriving this week" },
    ],
    chartTitle: "Revenue vs cost",
    months: ["May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    listTitle: "Live shipments",
    shipments: [
      { no: "NXS-24118", customer: "Straits Electronics Sdn Bhd", from: "Port Klang", to: "Shanghai", status: "transit" as Status, label: "In transit" },
      { no: "NXS-24117", customer: "PT Nusantara Foods", from: "Jakarta", to: "Port Klang", status: "arrived" as Status, label: "Arrived" },
      { no: "NXS-24115", customer: "Meridian Furniture Sdn Bhd", from: "Penang", to: "Rotterdam", status: "loading" as Status, label: "Vessel loading" },
      { no: "NXS-24112", customer: "PT Harbour Textiles", from: "Surabaya", to: "Singapore", status: "customs" as Status, label: "Customs" },
    ],
  },
  ar: {
    nav: ["لوحة التحكم", "الحجوزات", "الشركاء", "الفواتير", "التقارير", "المساعد"],
    title: "صباح الخير، سارة",
    subtitle: "هذا ملخص أداء الشهر.",
    search: "ابحث في الحجوزات والبوالص والحاويات…",
    kpis: [
      { label: "إيرادات الشهر", value: "SAR 1,284,500", delta: "⁦+12.4%⁩" },
      { label: "إجمالي الربح", value: "SAR 256,900", delta: "هامش ⁦20.0%⁩" },
      { label: "الشحنات النشطة", value: "96", delta: "11 تصل هذا الأسبوع" },
    ],
    chartTitle: "الإيرادات مقابل التكلفة",
    months: ["مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر"],
    listTitle: "الشحنات الجارية",
    shipments: [
      { no: "NXS-24118", customer: "شركة الرواد للتجارة", from: "جدة", to: "شنغهاي", status: "transit" as Status, label: "قيد النقل" },
      { no: "NXS-24117", customer: "مصنع الخليج للأغذية", from: "جبل علي", to: "الدمام", status: "arrived" as Status, label: "وصلت" },
      { no: "NXS-24115", customer: "مؤسسة الأفق للمعدات", from: "الدمام", to: "روتردام", status: "loading" as Status, label: "قيد التحميل" },
      { no: "NXS-24112", customer: "شركة النخبة للمنسوجات", from: "نهافا شيفا", to: "جدة", status: "customs" as Status, label: "التخليص الجمركي" },
    ],
  },
} satisfies Record<Locale, unknown>;

const navIcons = [LayoutDashboard, Ship, Users, FileText, ChartColumn, Bot];
// Revenue / cost per month, as a share of the chart height.
const bars = [
  [62, 44], [70, 50], [66, 47], [78, 55], [84, 60], [92, 64],
];

export function DashboardShot({ locale, className }: { locale: Locale; className?: string }) {
  const t = copy[locale];
  return (
    <ShotFrame locale={locale} className={className}>
      <div className="grid grid-cols-[150px_1fr] text-ink-900">
        {/* Sidebar */}
        <aside className="border-e border-fog-200 bg-fog-50/60 p-3">
          <div dir="ltr" className="mb-4 px-2 rtl:text-end">
            <Wordmark className="inline-block !h-auto w-16 text-black" />
          </div>
          <ul className="space-y-1">
            {t.nav.map((label, i) => {
              const Icon = navIcons[i];
              return (
                <li
                  key={label}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-2 py-1.5 text-[11.5px] font-medium",
                    i === 0 ? "bg-white text-ink-900 shadow-card ring-1 ring-fog-200" : "text-fog-600",
                  )}
                >
                  <Icon className={cn("h-3.5 w-3.5", i === 5 && "text-spark-500")} />
                  {label}
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Main */}
        <div className="min-w-0 p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-display text-[17px] font-bold">{t.title}</p>
              <p className="mt-0.5 text-[11.5px] text-fog-500">{t.subtitle}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden items-center gap-1.5 rounded-full bg-fog-50 px-3 py-1.5 text-[10.5px] text-fog-500 ring-1 ring-fog-200 sm:flex">
                <Search className="h-3 w-3" />
                {t.search}
              </span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-fog-50 ring-1 ring-fog-200">
                <Bell className="h-3.5 w-3.5 text-fog-600" />
              </span>
            </div>
          </div>

          {/* KPIs */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            {t.kpis.map((k, i) => (
              <div key={k.label} className="rounded-xl border border-fog-200 p-3">
                <p className="text-[10.5px] text-fog-500">{k.label}</p>
                <p dir="ltr" className="mt-1 font-mono text-[15px] font-semibold tracking-tight [unicode-bidi:plaintext] rtl:text-end">
                  {k.value}
                </p>
                <p className={cn("mt-1 text-[10px] font-medium", i === 0 ? "text-spark-600" : "text-fog-500")}>{k.delta}</p>
              </div>
            ))}
          </div>

          <div className="mt-3 grid grid-cols-[1.05fr_1fr] gap-3">
            {/* Chart */}
            <div className="flex flex-col rounded-xl border border-fog-200 p-3">
              <p className="text-[11px] font-semibold">{t.chartTitle}</p>
              <div className="mt-3 flex flex-1 items-end justify-between gap-2">
                {bars.map(([rev, cost], i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                    <div className="flex h-36 w-full items-end justify-center gap-1">
                      <span className="w-2.5 rounded-t bg-spark-400" style={{ height: `${rev}%` }} />
                      <span className="w-2.5 rounded-t bg-ink-700/20" style={{ height: `${cost}%` }} />
                    </div>
                    <span className="text-[9px] text-fog-500">{t.months[i]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipments */}
            <div className="rounded-xl border border-fog-200 p-3">
              <p className="text-[11px] font-semibold">{t.listTitle}</p>
              <ul className="mt-2 divide-y divide-fog-100">
                {t.shipments.map((s) => (
                  <li key={s.no} className="flex items-center justify-between gap-2 py-1.5">
                    <div className="min-w-0">
                      <p className="truncate text-[10.5px] font-medium">{s.customer}</p>
                      <p className="text-[9.5px] text-fog-500">
                        <span dir="ltr" className="font-mono">{s.no}</span> · {s.from} {locale === "ar" ? "←" : "→"} {s.to}
                      </p>
                    </div>
                    <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-[9.5px] font-medium ring-1", statusStyle[s.status])}>
                      {s.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ShotFrame>
  );
}
