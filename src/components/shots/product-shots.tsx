import { AlertTriangle, Anchor, Bell, Check, Clock, FileWarning, Ship, UserX } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Ltr, ShotFrame, arrowFor } from "./frame";

/* ─── Shipment: one booking with its timeline, charges and live profit ─── */

const shipmentCopy = {
  en: {
    no: "NXS-24118",
    status: "In transit",
    customer: "Straits Electronics Sdn Bhd",
    from: "Port Klang",
    to: "Shanghai",
    meta: "MSC ISABELLA 412E · 2 × 40HC · FOB",
    steps: ["Confirmed", "SI submitted", "Loaded", "In transit", "Arrived", "Closed"],
    current: 3,
    sell: "Sell",
    cost: "Cost",
    profit: "Profit",
    lines: [
      ["Ocean freight", "USD 2,400.00", "USD 1,850.00"],
      ["Terminal handling", "MYR 1,300.00", "MYR 1,040.00"],
      ["Customs clearance", "MYR 850.00", "MYR 600.00"],
    ],
    margin: ["Margin", "MYR 2,968.50", "23.1%"],
  },
  ar: {
    no: "NXS-24118",
    status: "قيد النقل",
    customer: "شركة الرواد للتجارة",
    from: "جدة",
    to: "شنغهاي",
    meta: "MSC ISABELLA 412E · 2 × 40HC · FOB",
    steps: ["تأكيد الحجز", "تعليمات الشحن", "التحميل", "قيد النقل", "الوصول", "الإغلاق"],
    current: 3,
    sell: "البيع",
    cost: "التكلفة",
    profit: "الربح",
    lines: [
      ["شحن بحري", "USD 2,400.00", "USD 1,850.00"],
      ["مناولة المحطة", "SAR 1,100.00", "SAR 880.00"],
      ["تخليص جمركي", "SAR 750.00", "SAR 520.00"],
    ],
    margin: ["الهامش", "SAR 2,512.50", "23.2%"],
  },
} as const;

export function ShipmentShot({ locale, className }: { locale: Locale; className?: string }) {
  const t = shipmentCopy[locale];
  return (
    <ShotFrame locale={locale} className={className}>
      <div className="p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="flex items-center gap-2">
              <Ltr className="font-mono text-[13px] font-semibold">{t.no}</Ltr>
              <span className="rounded-full bg-sky-50 px-2 py-0.5 text-[10px] font-medium text-sky-700 ring-1 ring-sky-200">{t.status}</span>
            </p>
            <p className="mt-1 text-[12px] font-medium">{t.customer}</p>
          </div>
          <div className="text-end">
            <p className="flex items-center justify-end gap-1.5 text-[13px] font-semibold">
              <Anchor className="h-3.5 w-3.5 text-teal-600" />
              {t.from} {arrowFor(locale)} {t.to}
            </p>
            <Ltr className="mt-1 block font-mono text-[10px] text-fog-500">{t.meta}</Ltr>
          </div>
        </div>

        {/* Timeline */}
        <ol className="mt-5 grid grid-cols-6">
          {t.steps.map((s, i) => (
            <li key={s} className="relative flex flex-col items-center text-center">
              {i > 0 ? (
                <span className={cn("absolute end-1/2 top-2.5 h-0.5 w-full", i <= t.current ? "bg-teal-400" : "bg-fog-200")} />
              ) : null}
              <span
                className={cn(
                  "relative z-10 flex h-5 w-5 items-center justify-center rounded-full",
                  i < t.current ? "bg-teal-500 text-white" : i === t.current ? "bg-white ring-4 ring-teal-100" : "bg-fog-100 ring-1 ring-fog-200",
                )}
              >
                {i < t.current ? <Check className="h-3 w-3" strokeWidth={3} /> : i === t.current ? <Ship className="h-3 w-3 text-teal-600" /> : null}
              </span>
              <span className={cn("mt-1.5 text-[9.5px]", i === t.current ? "font-semibold text-ink-900" : "text-fog-500")}>{s}</span>
            </li>
          ))}
        </ol>

        {/* Charges with live profit */}
        <div className="mt-5 overflow-hidden rounded-xl border border-fog-200">
          <div className="grid grid-cols-[1.3fr_1fr_1fr] bg-fog-50 px-3 py-1.5 text-[10px] font-medium text-fog-500">
            <span />
            <span className="text-end">{t.sell}</span>
            <span className="text-end">{t.cost}</span>
          </div>
          {t.lines.map(([label, sell, cost]) => (
            <div key={label} className="grid grid-cols-[1.3fr_1fr_1fr] border-t border-fog-100 px-3 py-1.5 text-[10.5px]">
              <span className="font-medium">{label}</span>
              <Ltr className="text-end font-mono">{sell}</Ltr>
              <Ltr className="text-end font-mono text-fog-500">{cost}</Ltr>
            </div>
          ))}
          <div className="flex items-center justify-between border-t border-fog-200 bg-teal-50/70 px-3 py-2 text-[11px]">
            <span className="font-semibold text-teal-800">
              {t.profit} · {t.margin[0]} <Ltr>{t.margin[2]}</Ltr>
            </span>
            <Ltr className="font-mono font-semibold text-teal-700">{t.margin[1]}</Ltr>
          </div>
        </div>
      </div>
    </ShotFrame>
  );
}

/* ─── Tax invoice: ZATCA (KSA) on the Arabic site, SST (Malaysia) on the English one ─── */

const invoiceCopy = {
  en: {
    title: "TAX INVOICE",
    seller: "Nexus Freight Sdn Bhd",
    sellerMeta: "SST No. W10-1808-32000123",
    buyer: "Straits Electronics Sdn Bhd",
    no: ["Invoice No.", "INV-NXS-26-0418"],
    date: ["Date", "14 Oct 2026"],
    head: ["Description", "Qty", "Amount", "SST"],
    lines: [
      ["Ocean freight (USD 2,400 @ 4.47)", "1", "10,728.00", "0%"],
      ["Terminal handling", "2", "1,300.00", "8%"],
      ["Customs clearance", "1", "850.00", "8%"],
    ],
    totals: [["Subtotal", "MYR 12,878.00"], ["SST 8%", "MYR 172.00"], ["Total", "MYR 13,050.00"]],
    note: "Printed with your logo · two print styles",
  },
  ar: {
    title: "فاتورة ضريبية · Tax Invoice",
    seller: "شركة نكسس لحلول الشحن",
    sellerMeta: "الرقم الضريبي 310123456700003",
    buyer: "شركة الرواد للتجارة · 300984512700003",
    no: ["رقم الفاتورة", "INV-NXS-26-0418"],
    date: ["تاريخ الإصدار", "14/10/2026 10:24"],
    head: ["الوصف", "الكمية", "المبلغ", "الضريبة"],
    lines: [
      ["شحن بحري (USD 2,400 × 3.75)", "1", "9,000.00", "0%"],
      ["مناولة المحطة", "2", "1,100.00", "15%"],
      ["تخليص جمركي", "1", "750.00", "15%"],
    ],
    totals: [["الإجمالي غير شامل الضريبة", "SAR 10,850.00"], ["ضريبة القيمة المضافة 15%", "SAR 277.50"], ["الإجمالي شامل الضريبة", "SAR 11,127.50"]],
    note: "رمز QR وفق متطلبات هيئة الزكاة والضريبة والجمارك (ZATCA)",
  },
} as const;

/** A decorative QR-like pattern (not a scannable code). */
function QrPattern() {
  const cells = Array.from({ length: 121 }, (_, i) => ((i * 37) % 7 < 3 || (i * 13) % 11 === 0 ? 1 : 0));
  return (
    <div dir="ltr" className="relative grid h-[76px] w-[76px] grid-cols-11 gap-px rounded bg-white p-1 ring-1 ring-fog-200">
      {cells.map((c, i) => (
        <span key={i} className={c ? "bg-ink-900" : ""} />
      ))}
      {[["top-1 left-1"], ["top-1 right-1"], ["bottom-1 left-1"]].map(([pos]) => (
        <span key={pos} className={cn("absolute h-5 w-5 rounded-[2px] border-[3px] border-ink-900 bg-white", pos)} />
      ))}
    </div>
  );
}

export function TaxInvoiceShot({ locale, className }: { locale: Locale; className?: string }) {
  const t = invoiceCopy[locale];
  const saudi = locale === "ar";
  return (
    <ShotFrame locale={locale} url="Print preview" className={className}>
      <div className="bg-fog-100 p-4 sm:p-5">
        <div className="mx-auto max-w-md rounded-lg bg-white p-4 shadow-card ring-1 ring-fog-200">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[12px] font-bold">{t.seller}</p>
              <p className="text-[9.5px] text-fog-500">{t.sellerMeta}</p>
            </div>
            <span className="h-8 w-8 rounded-md bg-teal-500/15 ring-1 ring-teal-200" />
          </div>
          <p className="mx-auto mt-3 w-fit rounded border-2 border-ink-900 px-3 py-0.5 text-[11px] font-bold">{t.title}</p>
          <div className="mt-3 grid grid-cols-2 gap-2 text-[9.5px]">
            <p className="text-fog-500">{t.buyer}</p>
            <div className="space-y-0.5 text-end">
              {[t.no, t.date].map(([k, v]) => (
                <p key={k}>
                  <span className="text-fog-500">{k}: </span>
                  <Ltr className="font-mono">{v}</Ltr>
                </p>
              ))}
            </div>
          </div>
          <div className="mt-3 overflow-hidden rounded border border-fog-200 text-[9.5px]">
            <div className="grid grid-cols-[1fr_auto_auto_auto] gap-3 bg-ink-900 px-2 py-1 text-white">
              {t.head.map((h) => (
                <span key={h} className="text-end first:text-start">{h}</span>
              ))}
            </div>
            {t.lines.map(([d, q, a, v]) => (
              <div key={d} className="grid grid-cols-[1fr_auto_auto_auto] gap-3 border-t border-fog-100 px-2 py-1">
                <span>{d}</span>
                <span className="text-end">{q}</span>
                <Ltr className="text-end font-mono">{a}</Ltr>
                <Ltr className="text-end font-mono">{v}</Ltr>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-end justify-between gap-3">
            {saudi ? <QrPattern /> : <span />}
            <div className="min-w-[60%] space-y-0.5 text-[9.5px]">
              {t.totals.map(([k, v], i) => (
                <p key={k} className={cn("flex justify-between gap-3", i === t.totals.length - 1 && "border-t border-ink-900 pt-1 font-bold")}>
                  <span>{k}</span>
                  <Ltr className="font-mono">{v}</Ltr>
                </p>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-3 text-center text-[10.5px] text-fog-500">{t.note}</p>
      </div>
    </ShotFrame>
  );
}

/* ─── Alerts center: five lists that keep every shipment and payment in view ─── */

const alertsCopy = {
  en: {
    title: "Alerts",
    tabs: [
      { icon: Clock, label: "Arriving soon", n: 14 },
      { icon: AlertTriangle, label: "Payment overdue", n: 9 },
      { icon: UserX, label: "Unassigned", n: 3 },
      { icon: FileWarning, label: "Missing B/L", n: 2 },
      { icon: Bell, label: "Follow-ups due", n: 6 },
    ],
    rows: [
      ["NXS-24121", "PT Harbour Textiles", "Jakarta → Port Klang", "Tomorrow"],
      ["NXS-24118", "Straits Electronics Sdn Bhd", "Port Klang → Shanghai", "16 Oct"],
      ["NXS-24116", "Meridian Furniture Sdn Bhd", "Rotterdam → Penang", "17 Oct"],
      ["NXS-24113", "PT Nusantara Foods", "Singapore → Surabaya", "18 Oct"],
    ],
    head: ["Booking", "Customer", "Route", "ETA"],
  },
  ar: {
    title: "التنبيهات",
    tabs: [
      { icon: Clock, label: "قريبة الوصول", n: 11 },
      { icon: AlertTriangle, label: "دفعات متأخرة", n: 7 },
      { icon: UserX, label: "بلا موظف", n: 3 },
      { icon: FileWarning, label: "بلا بوليصة", n: 2 },
      { icon: Bell, label: "متابعات مستحقة", n: 5 },
    ],
    rows: [
      ["NXS-24121", "مصنع الخليج للأغذية", "جبل علي ← الدمام", "غداً"],
      ["NXS-24118", "شركة الرواد للتجارة", "شنغهاي ← جدة", "16 أكتوبر"],
      ["NXS-24116", "مؤسسة الأفق للمعدات", "روتردام ← الدمام", "17 أكتوبر"],
      ["NXS-24113", "شركة النخبة للمنسوجات", "نهافا شيفا ← جدة", "18 أكتوبر"],
    ],
    head: ["الحجز", "العميل", "المسار", "الوصول"],
  },
} as const;

export function AlertsShot({ locale, className }: { locale: Locale; className?: string }) {
  const t = alertsCopy[locale];
  return (
    <ShotFrame locale={locale} className={className}>
      <div className="grid grid-cols-[170px_1fr] gap-4 p-4 sm:p-5">
        <div>
          <p className="font-display text-[15px] font-bold">{t.title}</p>
          <ul className="mt-3 space-y-1">
            {t.tabs.map(({ icon: Icon, label, n }, i) => (
              <li
                key={label}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-2 py-1.5 text-[11px]",
                  i === 0 ? "bg-teal-50 font-semibold text-teal-800 ring-1 ring-teal-100" : "text-fog-600",
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                <span className="flex-1">{label}</span>
                <span className={cn("rounded-full px-1.5 text-[10px] font-semibold", i === 1 ? "bg-red-100 text-red-700" : "bg-fog-100 text-fog-600")}>{n}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="overflow-hidden rounded-xl border border-fog-200">
          <div className="grid grid-cols-[0.9fr_1.4fr_1.3fr_0.6fr] gap-2 bg-fog-50 px-3 py-1.5 text-[10px] font-medium text-fog-500">
            {t.head.map((h) => (
              <span key={h}>{h}</span>
            ))}
          </div>
          {t.rows.map(([no, c, r, eta]) => (
            <div key={no} className="grid grid-cols-[0.9fr_1.4fr_1.3fr_0.6fr] gap-2 border-t border-fog-100 px-3 py-2 text-[10.5px]">
              <Ltr className="font-mono font-medium">{no}</Ltr>
              <span className="truncate">{c}</span>
              <span className="truncate text-fog-500">{r}</span>
              <span className="font-medium text-spark-600">{eta}</span>
            </div>
          ))}
        </div>
      </div>
    </ShotFrame>
  );
}
