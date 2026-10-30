import { Check, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";
import { getLocale } from "@/lib/locale-server";

type Tier = {
  slug: string;
  name: string;
  blurb: string;
  price: string;
  period: string;
  features: string[];
  /** Planned items, shown under the features with a "coming" mark. */
  soon?: string[];
  cta: string;
  highlighted?: boolean;
};

type Copy = {
  live: Tier[];
  coming: Tier[];
  badge: string;
  comingBadge: string;
  soonLabel: string;
  comingTitle: string;
  comingLead: string;
  founding: { title: string; text: string };
  extras: Array<{ title: string; text: string }>;
};

/**
 * The approved plans and prices (docs/routel-central.md, section 2, in the
 * Routel system repository, approved 2026-10-29). That file is the source of
 * truth: when it changes, change this one to match, in both languages. Plans
 * whose modules aren't built yet are listed as coming, with "register
 * interest" instead of a sign-up.
 */
const copy: Record<Locale, Copy> = {
  en: {
    live: [
      {
        slug: "free",
        name: "Free",
        blurb: "Try Routel on real shipments before you commit.",
        price: "$0",
        period: "forever",
        features: ["3 bookings, lifetime", "Up to 2 invoices per booking", "One admin user", "AI setup assistant for your first 30 days"],
        cta: "Get started free",
      },
      {
        slug: "basic",
        name: "Basic",
        blurb: "One company, one user: everything needed to run the work and invoice it.",
        price: "$149",
        period: "per month",
        features: ["One company, one user", "The essentials to run the work and issue its invoices", "Without the AI assistant and e-mail sync"],
        cta: "Request a demo",
      },
      {
        slug: "forwarder",
        name: "Freight Forwarder",
        blurb: "For a forwarding team on sea or air.",
        price: "$249",
        period: "per month",
        features: ["Sea or air freight forwarding", "Up to 5 users with role-based access"],
        cta: "Request a demo",
      },
      {
        slug: "pro",
        name: "Freight Forwarder Pro",
        blurb: "Every mode, run with the AI assistant.",
        price: "$499",
        period: "per month",
        features: [
          "Sea and air freight forwarding",
          "Consolidation and LCL",
          "The AI assistant: does the work by chat and reads documents",
          "E-mail sync with Microsoft 365 and Zoho",
          "Up to 15 users",
        ],
        soon: ["Land transport", "Warehouse receipts"],
        cta: "Request a demo",
        highlighted: true,
      },
      {
        slug: "enterprise",
        name: "Enterprise",
        blurb: "Your own server, for groups and large operations.",
        price: "From $1,499",
        period: "per month",
        features: ["A dedicated server and database", "Every module your activities need"],
        cta: "Contact sales",
      },
    ],
    coming: [
      {
        slug: "3pl",
        name: "3PL: Warehousing & Distribution",
        blurb: "For a company that runs warehouses and distribution without international freight.",
        price: "$499",
        period: "per month",
        features: [],
        soon: ["Warehouse receipts and CFS", "Land transport with proof of delivery", "Inventory held for your clients"],
        cta: "Register interest",
      },
      {
        slug: "nvocc",
        name: "NVOCC, Customs & Agencies",
        blurb: "For carriers' agents, NVOCCs and customs brokers.",
        price: "$899",
        period: "per month",
        features: [],
        soon: ["Bills of Lading in your own name", "Demurrage and detention", "Agents and profit share", "Shipping agency", "Customs brokerage with HS code suggestions"],
        cta: "Register interest",
      },
    ],
    badge: "Most complete",
    comingBadge: "Coming soon",
    soonLabel: "At launch",
    comingTitle: "Coming next",
    comingLead: "Plans for the services Routel is rolling out. The price is set; register interest and we'll open them to you first.",
    founding: { title: "Founding customers", text: "The first 20 companies get 30% off, with their price locked for two years." },
    extras: [
      { title: "Pay yearly", text: "Two months free." },
      { title: "Extra user", text: "$29 per month." },
      { title: "Usage", text: "AI document reading beyond your plan's allowance is billed by use." },
    ],
  },
  ar: {
    live: [
      {
        slug: "free",
        name: "المجانية",
        blurb: "جرّب Routel على شحنات حقيقية قبل أن تلتزم.",
        price: "$0",
        period: "مجاناً دائماً",
        features: ["3 حجوزات طوال مدة الاستخدام", "حتى فاتورتين لكل حجز", "مستخدم واحد بصلاحية المدير", "مساعد الإعداد الذكي لأول 30 يوماً"],
        cta: "ابدأ مجاناً",
      },
      {
        slug: "basic",
        name: "الأساسية",
        blurb: "شركة واحدة بمستخدم واحد: كل ما يلزم لتشغيل العمل وإصدار فواتيره.",
        price: "$149",
        period: "شهرياً",
        features: ["شركة واحدة بمستخدم واحد", "الأساسيات لتشغيل العمل وإصدار فواتيره", "بدون المساعد الذكي ومزامنة البريد"],
        cta: "اطلب عرضاً تجريبياً",
      },
      {
        slug: "forwarder",
        name: "وكيل الشحن",
        blurb: "لفريق شحن يعمل بحراً أو جواً.",
        price: "$249",
        period: "شهرياً",
        features: ["الشحن البحري أو الجوي", "حتى 5 مستخدمين بصلاحيات حسب الدور"],
        cta: "اطلب عرضاً تجريبياً",
      },
      {
        slug: "pro",
        name: "وكيل الشحن Pro",
        blurb: "كل أنماط الشحن، يديرها المساعد الذكي معك.",
        price: "$499",
        period: "شهرياً",
        features: [
          "الشحن البحري والجوي",
          "التجميع والشحن الجزئي LCL",
          "المساعد الذكي: ينجز العمل بالمحادثة ويقرأ المستندات",
          "مزامنة البريد مع Microsoft 365 وZoho",
          "حتى 15 مستخدماً",
        ],
        soon: ["النقل البري", "إيصالات المستودع"],
        cta: "اطلب عرضاً تجريبياً",
        highlighted: true,
      },
      {
        slug: "enterprise",
        name: "المؤسسات",
        blurb: "خادمك الخاص، للمجموعات والعمليات الكبيرة.",
        price: "من $1,499",
        period: "شهرياً",
        features: ["خادم وقاعدة بيانات مخصصة لك", "كل الوحدات التي تحتاجها أنشطتك"],
        cta: "تواصل مع المبيعات",
      },
    ],
    coming: [
      {
        slug: "3pl",
        name: "3PL: المستودعات والتوزيع",
        blurb: "لشركة نشاطها المستودعات والتوزيع دون شحن دولي.",
        price: "$499",
        period: "شهرياً",
        features: [],
        soon: ["إيصالات المستودع ومحطة الحاويات CFS", "النقل البري مع إثبات التسليم", "المخزون المحفوظ لعملائك"],
        cta: "سجّل اهتمامك",
      },
      {
        slug: "nvocc",
        name: "NVOCC والتخليص والوكالات",
        blurb: "لوكلاء الخطوط والناقلين غير المالكين للسفن والمخلّصين الجمركيين.",
        price: "$899",
        period: "شهرياً",
        features: [],
        soon: ["بوالص شحن باسم شركتك", "الأرضيات والتأخير", "الوكلاء وتقاسم الربح", "الوكالة الملاحية", "التخليص الجمركي مع اقتراح رموز HS"],
        cta: "سجّل اهتمامك",
      },
    ],
    badge: "الأشمل",
    comingBadge: "قريباً",
    soonLabel: "عند الإطلاق",
    comingTitle: "القادم",
    comingLead: "باقات الخدمات التي يطلقها Routel تباعاً. السعر محدد، سجّل اهتمامك وسنفتحها لك أولاً.",
    founding: { title: "العملاء المؤسسون", text: "أول 20 شركة تحصل على خصم 30%، مع تثبيت السعر لسنتين." },
    extras: [
      { title: "الدفع السنوي", text: "شهران مجاناً." },
      { title: "مستخدم إضافي", text: "29 دولاراً شهرياً." },
      { title: "حسب الاستخدام", text: "قراءة المستندات بالذكاء الاصطناعي فوق حد باقتك تُحتسب حسب الاستخدام." },
    ],
  },
};

const allSlugs = [...copy.en.live, ...copy.en.coming].map((t) => t.slug);

/** Plan display names keyed by the `?plan=` slug used in demo links. */
export function planName(slug: string, locale: Locale): string | undefined {
  const s = slug.toLowerCase();
  if (!allSlugs.includes(s)) return undefined;
  return [...copy[locale].live, ...copy[locale].coming].find((t) => t.slug === s)?.name;
}

function TierCard({ t, badge, soonLabel, coming }: { t: Tier; badge?: string; soonLabel: string; coming?: boolean }) {
  const dark = t.highlighted;
  return (
    <div
      className={cn(
        "relative flex h-full flex-col rounded-2xl border p-6",
        dark ? "border-ink-900 bg-ink-900 text-white shadow-float" : coming ? "border-dashed border-fog-300 bg-fog-50 text-ink-900" : "border-fog-200 bg-white text-ink-900 shadow-card",
      )}
    >
      {badge ? (
        <span className={cn("absolute -top-3 start-6 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide", coming ? "bg-ink-900 text-white" : "bg-spark-400 text-ink-950")}>
          {badge}
        </span>
      ) : null}
      <h3 className="font-display text-lg font-bold leading-tight">{t.name}</h3>
      <p className={cn("mt-1.5 text-[13px] leading-relaxed", dark ? "text-white/65" : "text-fog-600")}>{t.blurb}</p>
      <div className="mt-5">
        <p className="font-display text-3xl font-bold" dir="ltr" style={{ textAlign: "start" }}>{t.price}</p>
        <p className={cn("mt-1 text-xs", dark ? "text-white/55" : "text-fog-500")}>{t.period}</p>
      </div>
      <ul className="mt-5 flex-1 space-y-2.5">
        {t.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-[13.5px]">
            <Check className={cn("mt-0.5 h-4 w-4 shrink-0", dark ? "text-spark-300" : "text-spark-600")} strokeWidth={2.5} />
            <span className={dark ? "text-white/85" : "text-fog-700"}>{f}</span>
          </li>
        ))}
        {t.soon?.length ? (
          <li className={cn("pt-1 text-[11px] font-semibold uppercase tracking-[0.1em]", dark ? "text-white/45" : "text-fog-500")}>{soonLabel}</li>
        ) : null}
        {t.soon?.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-[13.5px]">
            <Clock className={cn("mt-0.5 h-4 w-4 shrink-0", dark ? "text-white/40" : "text-fog-400")} strokeWidth={2} />
            <span className={dark ? "text-white/60" : "text-fog-600"}>{f}</span>
          </li>
        ))}
      </ul>
      <Button href={`/demo?plan=${t.slug}`} variant={dark ? "inverse" : "secondary"} className="mt-7 w-full">
        {t.cta}
      </Button>
    </div>
  );
}

export async function PricingTiers({ withComing = true }: { withComing?: boolean }) {
  const locale = await getLocale();
  const t = copy[locale];
  return (
    <div>
      <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5" stagger={0.06}>
        {t.live.map((tier) => (
          <RevealItem key={tier.slug} className="h-full">
            <TierCard t={tier} badge={tier.highlighted ? t.badge : undefined} soonLabel={t.soonLabel} />
          </RevealItem>
        ))}
      </RevealGroup>

      <div className="mt-8 grid gap-3 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="flex items-start gap-3 rounded-2xl bg-spark-50 p-4 ring-1 ring-spark-200">
          <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-spark-600" />
          <p className="text-[13.5px] leading-relaxed text-ink-900">
            <span className="font-semibold">{t.founding.title}.</span> {t.founding.text}
          </p>
        </div>
        {t.extras.map((e) => (
          <div key={e.title} className="rounded-2xl bg-white p-4 ring-1 ring-fog-200">
            <p className="text-[13.5px] font-semibold text-ink-900">{e.title}</p>
            <p className="mt-0.5 text-[13px] leading-relaxed text-fog-600">{e.text}</p>
          </div>
        ))}
      </div>

      {withComing ? (
        <div className="mt-16">
          <h3 className="font-display text-2xl font-bold text-ink-900">{t.comingTitle}</h3>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-fog-600">{t.comingLead}</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {t.coming.map((tier) => (
              <TierCard key={tier.slug} t={tier} badge={t.comingBadge} soonLabel={t.soonLabel} coming />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
