import {
  ArrowUp,
  Bot,
  Check,
  CircleDashed,
  FileSearch,
  FileText,
  Paperclip,
  Receipt,
  Search,
  Sparkles,
  Sun,
  Wand2,
} from "lucide-react";
import type { CSSProperties } from "react";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Ltr, ShotFrame, arrowFor } from "./frame";

/* ─── 1. Assistant chat: the assistant calls the system's tools, then proposes ─── */

const chatCopy = {
  en: {
    header: "Routel Assistant",
    sub: "Calls tools · acts on your confirmation",
    user: "Invoice NXS-24118 for the customer and add the customs charges from the attached vendor bill.",
    file: "vendor-bill-KLX-0931.pdf",
    tools: [
      { icon: Search, label: "Opened booking NXS-24118", detail: "Port Klang → Shanghai · 2 × 40HC" },
      { icon: FileSearch, label: "Read vendor bill", detail: "3 lines · MYR 4,850.00" },
      { icon: Receipt, label: "Added vendor cost to the booking", detail: "Customs clearance · MYR 4,850.00" },
      { icon: FileText, label: "Prepared invoice draft", detail: "Straits Electronics Sdn Bhd" },
    ],
    proposal: "Proposed invoice",
    lines: [
      ["Ocean freight", "USD 2,400.00"],
      ["Customs clearance", "MYR 5,600.00"],
      ["Documentation fee", "MYR 250.00"],
    ],
    total: ["Subtotal before SST (MYR eq.)", "MYR 16,578.00"],
    confirm: "Confirm",
    edit: "Edit",
    input: "Ask in any language…",
  },
  ar: {
    header: "مساعد Routel",
    sub: "يستدعي الأدوات · وينفّذ بعد تأكيدك",
    user: "جهّز فاتورة للعميل على الحجز NXS-24118 وأضف رسوم التخليص من فاتورة المورد المرفقة.",
    file: "فاتورة-المورد-JD-0931.pdf",
    tools: [
      { icon: Search, label: "فتح الحجز NXS-24118", detail: "جدة ← شنغهاي · 2 × 40HC" },
      { icon: FileSearch, label: "قراءة فاتورة المورد", detail: "3 بنود · SAR 4,850.00" },
      { icon: Receipt, label: "إضافة تكلفة المورد للحجز", detail: "تخليص جمركي · SAR 4,850.00" },
      { icon: FileText, label: "تجهيز مسودة الفاتورة", detail: "شركة الرواد للتجارة" },
    ],
    proposal: "فاتورة مقترحة",
    lines: [
      ["شحن بحري", "USD 2,400.00"],
      ["تخليص جمركي", "SAR 5,600.00"],
      ["رسوم مستندات", "SAR 250.00"],
    ],
    total: ["الإجمالي قبل الضريبة (بالريال)", "SAR 14,850.00"],
    confirm: "تأكيد",
    edit: "تعديل",
    input: "اسأل بأي لغة…",
  },
} as const;

export function AssistantChatShot({
  locale,
  tone = "light",
  className,
}: {
  locale: Locale;
  tone?: "light" | "dark";
  className?: string;
}) {
  const t = chatCopy[locale];
  const dark = tone === "dark";
  const muted = dark ? "text-white/55" : "text-fog-500";
  const card = dark ? "border-white/10 bg-white/[0.04]" : "border-fog-200 bg-white";
  return (
    <ShotFrame locale={locale} tone={tone} className={className}>
      <div className="p-4 sm:p-5">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-spark-400/15 text-spark-500">
            <Bot className="h-4.5 w-4.5" />
          </span>
          <div>
            <p className="text-[13px] font-semibold">{t.header}</p>
            <p className={cn("text-[10.5px]", muted)}>{t.sub}</p>
          </div>
        </div>

        {/* The request. data-step / --step: the order a <Replay> wrapper plays the chat in (globals.css). */}
        <div data-step="" style={{ "--step": 0 } as CSSProperties} className="mt-4 flex justify-end">
          <div className={cn("max-w-[85%] rounded-2xl rounded-se-sm px-3.5 py-2.5", dark ? "bg-spark-500/20" : "bg-ink-900 text-white")}>
            <p className="text-[12px] leading-relaxed">{t.user}</p>
            <p className="mt-2 inline-flex max-w-full items-center gap-1.5 break-all rounded-md bg-white/10 px-2 py-1 text-[10.5px]">
              <Paperclip className="h-3 w-3" />
              {t.file}
            </p>
          </div>
        </div>

        {/* Tool calls */}
        <div className={cn("mt-3 rounded-xl border p-3", card)}>
          <ul className="space-y-2">
            {t.tools.map(({ icon: Icon, label, detail }, i) => (
              <li key={label} data-step="" style={{ "--step": i + 1 } as CSSProperties} className="flex items-start gap-2.5">
                <span
                  className={cn(
                    "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md",
                    dark ? "bg-white/[0.07] text-spark-300" : "bg-spark-50 text-spark-700",
                  )}
                >
                  <Icon className="h-3 w-3" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[11.5px] font-medium">{label}</p>
                  <p className={cn("text-[10.5px]", muted)}>{detail}</p>
                </div>
                {i < t.tools.length - 1 ? (
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-spark-500" strokeWidth={3} />
                ) : (
                  <CircleDashed className="mt-0.5 h-3.5 w-3.5 shrink-0 text-spark-500" />
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* The proposal waiting for confirmation */}
        <div
          data-step=""
          style={{ "--step": t.tools.length + 1 } as CSSProperties}
          className={cn("mt-3 rounded-xl border-2 p-3", dark ? "border-spark-400/40 bg-spark-400/[0.06]" : "border-spark-200 bg-spark-50/60")}
        >
          <p className="flex items-center gap-1.5 text-[11.5px] font-semibold">
            <Sparkles className="h-3.5 w-3.5 text-spark-500" />
            {t.proposal}
          </p>
          <ul className="mt-2 space-y-1">
            {t.lines.map(([label, amount]) => (
              <li key={label} className="flex justify-between gap-3 text-[11px]">
                <span className={muted}>{label}</span>
                <Ltr className="font-mono">{amount}</Ltr>
              </li>
            ))}
          </ul>
          <div className={cn("mt-2 flex justify-between gap-3 border-t pt-2 text-[11.5px] font-semibold", dark ? "border-white/10" : "border-spark-200")}>
            <span>{t.total[0]}</span>
            <Ltr className="font-mono">{t.total[1]}</Ltr>
          </div>
          <div className="mt-3 flex gap-2">
            <span data-confirm="" style={{ "--step": t.tools.length + 2 } as CSSProperties} className="rounded-full bg-spark-500 px-3.5 py-1 text-[11px] font-semibold text-white">
              {t.confirm}
            </span>
            <span className={cn("rounded-full px-3.5 py-1 text-[11px] font-medium ring-1", dark ? "ring-white/15" : "ring-fog-300")}>{t.edit}</span>
          </div>
        </div>

        <div className={cn("mt-3 flex items-center justify-between rounded-full border px-3.5 py-2 text-[11px]", card, muted)}>
          {t.input}
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-spark-500 text-white">
            <ArrowUp className="h-3 w-3" />
          </span>
        </div>
      </div>
    </ShotFrame>
  );
}

/* ─── 2. Document reading: a carrier confirmation becomes booking fields ─── */

const docCopy = {
  en: {
    file: "MSC booking confirmation.pdf",
    reading: "Read by the assistant",
    fields: [
      ["Vessel / voyage", "MSC ISABELLA · 412E"],
      ["Port of loading", "Port Klang (MYPKG)"],
      ["Port of discharge", "Jebel Ali (AEJEA)"],
      ["Containers", "2 × 40HC"],
      ["Cut-off", "17 Oct 2026, 12:00"],
      ["Carrier booking no.", "MSCUKL4471"],
    ],
    action: "Fill booking NXS-24118",
  },
  ar: {
    file: "تأكيد حجز MSC.pdf",
    reading: "قرأه المساعد",
    fields: [
      ["السفينة / الرحلة", "MSC ISABELLA · 412E"],
      ["ميناء الشحن", "جدة (SAJED)"],
      ["ميناء التفريغ", "شنغهاي (CNSHA)"],
      ["الحاويات", "2 × 40HC"],
      ["موعد الإغلاق", "17 أكتوبر 2026، 12:00"],
      ["رقم حجز الخط الملاحي", "MSCJED4471"],
    ],
    action: "تعبئة الحجز NXS-24118",
  },
} as const;

export function DocumentReadShot({ locale, className }: { locale: Locale; className?: string }) {
  const t = docCopy[locale];
  return (
    <ShotFrame locale={locale} className={className}>
      <div className="grid grid-cols-[0.8fr_1.2fr] gap-4 p-4 sm:p-5">
        {/* A page of the PDF, sketched */}
        <div className="rounded-lg border border-fog-200 bg-fog-50 p-3">
          <p className="flex items-center gap-1.5 truncate text-[10.5px] font-medium text-fog-600">
            <FileText className="h-3.5 w-3.5 shrink-0 text-red-500" />
            {t.file}
          </p>
          <div className="mt-3 space-y-1.5">
            {[90, 70, 82, 55, 76, 64, 88, 48].map((w, i) => (
              <span key={i} className={cn("block h-1.5 rounded-full", i === 2 || i === 5 ? "bg-spark-300" : "bg-fog-200")} style={{ width: `${w}%` }} />
            ))}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-1.5">
            <span className="h-6 rounded bg-fog-200/70" />
            <span className="h-6 rounded bg-spark-100" />
          </div>
        </div>

        <div>
          <p className="flex items-center gap-1.5 text-[11px] font-semibold text-spark-600">
            <Wand2 className="h-3.5 w-3.5" />
            {t.reading}
          </p>
          <ul className="mt-2 divide-y divide-fog-100 rounded-lg border border-fog-200">
            {t.fields.map(([label, value]) => (
              <li key={label} className="flex items-center justify-between gap-3 px-2.5 py-1.5">
                <span className="text-[10.5px] text-fog-500">{label}</span>
                <span className="flex items-center gap-1.5 text-[10.5px] font-medium">
                  {value}
                  <Check className="h-3 w-3 text-spark-500" strokeWidth={3} />
                </span>
              </li>
            ))}
          </ul>
          <span className="mt-3 inline-flex rounded-full bg-ink-900 px-3.5 py-1.5 text-[11px] font-semibold text-white">{t.action}</span>
        </div>
      </div>
    </ShotFrame>
  );
}

/* ─── 3. The day's brief: what needs attention, tailored to the role ─── */

const briefCopy = {
  en: {
    title: "Today",
    sub: "Good morning, Aisyah · Operations",
    items: [
      { tone: "red", label: "2 delivered shipments never invoiced", value: "MYR 18,400" },
      { tone: "amber", label: "3 follow-ups due today", value: "" },
      { tone: "amber", label: "Booking past SI with no master B/L", value: "NXS-24109" },
      { tone: "teal", label: "5 arrivals this week", value: "" },
      { tone: "slate", label: "Quotation expiring tomorrow", value: "PT Nusantara Foods" },
    ],
    ask: "Tap any line and the assistant takes it from there",
  },
  ar: {
    title: "اليوم",
    sub: "صباح الخير، سارة · العمليات",
    items: [
      { tone: "red", label: "شحنتان سُلّمتا ولم تُصدر فواتيرهما", value: "SAR 18,400" },
      { tone: "amber", label: "3 متابعات مستحقة اليوم", value: "" },
      { tone: "amber", label: "حجز تجاوز تعليمات الشحن بلا بوليصة رئيسية", value: "NXS-24109" },
      { tone: "teal", label: "5 شحنات تصل هذا الأسبوع", value: "" },
      { tone: "slate", label: "عرض سعر ينتهي غداً", value: "مصنع الخليج للأغذية" },
    ],
    ask: "اضغط أي سطر ويكمل المساعد معك من هناك",
  },
} as const;

const dot: Record<string, string> = {
  red: "bg-red-500",
  amber: "bg-spark-400",
  teal: "bg-spark-500",
  slate: "bg-fog-400",
};

export function TodayBriefShot({ locale, className }: { locale: Locale; className?: string }) {
  const t = briefCopy[locale];
  return (
    <ShotFrame locale={locale} className={className}>
      <div className="p-4 sm:p-5">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-spark-50 text-spark-500 ring-1 ring-spark-100">
            <Sun className="h-4 w-4" />
          </span>
          <div>
            <p className="font-display text-[15px] font-bold">{t.title}</p>
            <p className="text-[10.5px] text-fog-500">{t.sub}</p>
          </div>
        </div>
        <ul className="mt-3 space-y-1.5">
          {t.items.map((it) => (
            <li key={it.label} className="flex items-center gap-2.5 rounded-lg border border-fog-200 px-2.5 py-2">
              <span className={cn("h-2 w-2 shrink-0 rounded-full", dot[it.tone])} />
              <span className="flex-1 text-[11px] font-medium">{it.label}</span>
              {it.value ? <bdi className="text-[10.5px] text-fog-500">{it.value}</bdi> : null}
            </li>
          ))}
        </ul>
        <p className="mt-3 flex items-center gap-1.5 text-[10.5px] text-fog-500">
          <Bot className="h-3.5 w-3.5 text-spark-500" />
          {t.ask} {arrowFor(locale)}
        </p>
      </div>
    </ShotFrame>
  );
}

/* ─── 4. Guided company setup: an ordered checklist with a progress bar ─── */

const setupCopy = {
  en: {
    title: "Let's set up Nexus Freight",
    progress: "6 of 10 done",
    steps: [
      ["Company name (English & Arabic)", true],
      ["Registration no.", true],
      ["Document numbering", true],
      ["Logo", true],
      ["Address", true],
      ["Contact details", true],
      ["Tax no. (SST)", false],
      ["Bank details", false],
      ["Team & roles", false],
      ["Charge types", false],
    ] as const,
    ask: "Next: your SST number. It prints on every invoice. Paste your registration certificate and I'll fill it in.",
    choices: ["Paste a certificate", "Type it", "Skip for now"],
  },
  ar: {
    title: "لنجهّز شركة نكسس للشحن",
    progress: "6 من 10 مكتملة",
    steps: [
      ["اسم الشركة (عربي وإنجليزي)", true],
      ["رقم السجل التجاري", true],
      ["ترقيم المستندات", true],
      ["الشعار", true],
      ["العنوان", true],
      ["بيانات التواصل", true],
      ["الرقم الضريبي", false],
      ["البيانات البنكية", false],
      ["الفريق والأدوار", false],
      ["أنواع الرسوم", false],
    ] as const,
    ask: "التالي: الرقم الضريبي. يُطبع على كل فاتورة. ألصق شهادة التسجيل في ضريبة القيمة المضافة وأعبّئه عنك.",
    choices: ["ألصق الشهادة", "أكتبه بنفسي", "لاحقاً"],
  },
};

export function SetupShot({ locale, className }: { locale: Locale; className?: string }) {
  const t = setupCopy[locale];
  return (
    <ShotFrame locale={locale} className={className}>
      <div className="p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="font-display text-[15px] font-bold">{t.title}</p>
          <span className="text-[10.5px] font-medium text-spark-700">{t.progress}</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-fog-100">
          <div className="h-full w-[60%] rounded-full bg-spark-500" />
        </div>
        <ul className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5">
          {t.steps.map(([label, done]) => (
            <li key={label} className={cn("flex items-center gap-1.5 text-[10.5px]", done ? "text-fog-500" : "font-medium text-ink-900")}>
              {done ? (
                <Check className="h-3 w-3 shrink-0 text-spark-500" strokeWidth={3} />
              ) : (
                <CircleDashed className="h-3 w-3 shrink-0 text-spark-500" />
              )}
              {label}
            </li>
          ))}
        </ul>
        <div className="mt-3 flex gap-2.5 rounded-xl bg-fog-50 p-3 ring-1 ring-fog-200">
          <Bot className="mt-0.5 h-4 w-4 shrink-0 text-spark-500" />
          <div>
            <p className="text-[11px] leading-relaxed">{t.ask}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {t.choices.map((c, i) => (
                <span
                  key={c}
                  className={cn(
                    "rounded-full px-2.5 py-1 text-[10px] font-medium",
                    i === 0 ? "bg-ink-900 text-white" : "bg-white text-fog-600 ring-1 ring-fog-200",
                  )}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ShotFrame>
  );
}
