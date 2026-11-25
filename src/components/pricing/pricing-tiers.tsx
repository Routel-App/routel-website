import { Check, Gift, Infinity as InfinityIcon, Sparkles, Wrench } from "lucide-react";
import { PricingGrid } from "./pricing-grid";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n";
import { getLocale } from "@/lib/locale-server";

export type Tier = {
  slug: string;
  name: string;
  who: string;
  /** The price in each list: US dollars, and Saudi riyals for Saudi Arabia. */
  price: { sar: string; usd: string };
  period: string;
  features: string[];
  cta: string;
  href: string;
  highlighted?: boolean;
};

export type Currency = "sar" | "usd";

export type Copy = {
  tiers: Tier[];
  currency: Record<Currency, string>;
  currencyNote: string;
  badge: string;
  essentialsTitle: string;
  essentials: string[];
  messages: Array<{ title: string; text: string }>;
  trial: { eyebrow: string; title: string; text: string; points: string[]; after: string; cta: string };
  founding: { title: string; text: string };
  yearly: { title: string; text: string };
};

/**
 * The approved plans (docs/routel-central.md, section 2, in the Routel
 * system repository: structure approved by the founder on 2026-11-18). That
 * file is the source of truth: when it changes, change this one to match,
 * in both languages. Prices are in Saudi riyals, as that file gives them, and
 * in US dollars; Qatar is billed in Qatari riyals at the USD price.
 * Plans differ by activities and by what costs us (AI, a dedicated server,
 * government links), never by the number of users.
 */
const copy: Record<Locale, Copy> = {
  en: {
    tiers: [
      {
        slug: "free",
        name: "Free",
        who: "A first look, on real work.",
        price: { sar: "SAR 0", usd: "USD 0" },
        period: "free version",
        features: [
          "One activity: sea, air or land transport",
          "5 bookings a month, renewed every month",
          "One user",
          "A preliminary invoice (the tax invoice comes from your approved billing system)",
          "The company setup assistant only",
          "Printouts carry “Made with Routel”",
          "Support: the user guide",
        ],
        cta: "Start free",
        href: "/demo?plan=free",
      },
      {
        slug: "basic",
        name: "Basic",
        who: "A company with one activity.",
        price: { sar: "SAR 699", usd: "USD 199" },
        period: "per month",
        features: [
          "One activity: sea, air, land transport or warehouse",
          "The essentials, complete",
          "The AI assistant for company setup and questions, with a small allowance for document reading",
          "Support: the guide, the assistant and e-mail",
        ],
        cta: "Request a demo",
        href: "/demo?plan=basic",
      },
      {
        slug: "growth",
        name: "Growth",
        who: "A company with more than one activity.",
        price: { sar: "SAR 1,799", usd: "USD 499" },
        period: "per month",
        features: [
          "Every freight and logistics activity: sea, air, consolidation and LCL, arrival notice and delivery order, land transport, warehouse, and inventory (3PL)",
          "Document reading and checking by AI",
          "E-mail sync",
          "HR and payroll",
          "Support: with WhatsApp in working hours",
        ],
        cta: "Request a demo",
        href: "/demo?plan=growth",
        highlighted: true,
      },
      {
        slug: "carrier",
        name: "Carrier & Agencies",
        who: "NVOCCs, shipping agencies and customs brokers.",
        price: { sar: "SAR 3,299", usd: "USD 899" },
        period: "per month",
        features: [
          "Everything in Growth",
          "NVOCC: Bills of Lading in your name, demurrage and detention, agents and profit share",
          "Customs clearance and shipping agency",
          "Government links (FASAH, CEISA, uCustoms) and the electronic B/L when available",
          "Support: priority",
        ],
        cta: "Request a demo",
        href: "/demo?plan=carrier",
      },
      {
        slug: "enterprise",
        name: "Enterprise",
        who: "Groups and branches, and anyone who needs a dedicated server.",
        price: { sar: "From SAR 5,499", usd: "From USD 1,499" },
        period: "per month",
        features: [
          "Every activity",
          "Several branches or companies with one sign-in, and a group dashboard",
          "A dedicated server",
          "Data migration from your old system, and tailored training",
          "Integrations built for you",
          "Support: an account manager and a service-level agreement",
        ],
        cta: "Contact sales",
        href: "/demo?plan=enterprise",
      },
    ],
    currency: { sar: "Saudi Arabia · SAR", usd: "USD" },
    currencyNote: "Prices in US dollars, and in Saudi riyals for Saudi Arabia. In Qatar, plans are billed in Qatari riyals (QAR) at the equivalent of the USD price.",
    badge: "Recommended",
    essentialsTitle: "The essentials, in every paid plan",
    essentials: [
      "Bookings and Bills of Lading",
      "Quotations",
      "Bilingual tax invoice with the QR code; ZATCA-compliant e-invoicing for Saudi Arabia (Fatoora)",
      "Collections and payments",
      "Accounting and reports",
      "Business partners",
      "Documents",
      "Public tracking",
      "Arabic and English",
    ],
    messages: [
      { title: "Unlimited users", text: "On every paid plan. The admin sets the roles and users from Admin." },
      { title: "No implementation fees", text: "On every plan. Set up by chat with the assistant." },
      { title: "One company per subscription", text: "One commercial registration. Branches and groups are on Enterprise." },
    ],
    trial: {
      eyebrow: "Start free",
      title: "14 days on Growth, with everything in it",
      text: "Every new account starts with a 14-day trial of Growth, including AI document reading for 30 documents. A counter runs from 30 down.",
      points: ["Every activity open", "AI reads 30 documents", "E-mail sync"],
      after: "After the trial, your account moves to the free version: one activity, 5 bookings a month, one user and a preliminary invoice.",
      cta: "Start free",
    },
    founding: { title: "Founding customers", text: "The first 20 companies get 30% off for the first year." },
    yearly: { title: "Pay yearly", text: "One month free." },
  },
  ar: {
    tiers: [
      {
        slug: "free",
        name: "المجانية",
        who: "نظرة أولى، على عمل حقيقي.",
        price: { sar: "0 ريال", usd: "0 دولار" },
        period: "نسخة مجانية",
        features: [
          "نشاط واحد: بحري أو جوي أو نقل بري",
          "5 حجوزات شهرياً، تتجدد كل شهر",
          "مستخدم واحد",
          "فاتورة مبدئية (الفاتورة الضريبية من نظام الفوترة المعتمد لديك)",
          "مساعد إعداد الشركة فقط",
          "المطبوعات عليها «صُنع بـ Routel»",
          "الدعم: الدليل",
        ],
        cta: "ابدأ مجاناً",
        href: "/demo?plan=free",
      },
      {
        slug: "basic",
        name: "الأساسية",
        who: "شركة بنشاط واحد.",
        price: { sar: "699 ريال", usd: "199 دولار" },
        period: "شهرياً",
        features: [
          "نشاط واحد: بحري أو جوي أو نقل بري أو مستودع",
          "الأساسيات كاملة",
          "المساعد الذكي لإعداد الشركة والأسئلة، وحصة صغيرة لقراءة المستندات",
          "الدعم: الدليل والمساعد والبريد",
        ],
        cta: "اطلب عرضاً تجريبياً",
        href: "/demo?plan=basic",
      },
      {
        slug: "growth",
        name: "النمو والتوسع",
        who: "شركة بأكثر من نشاط.",
        price: { sar: "1,799 ريال", usd: "499 دولار" },
        period: "شهرياً",
        features: [
          "كل أنشطة الشحن واللوجستيات: البحري، والجوي، والتجميع LCL، وإشعار الوصول وأمر التسليم، والنقل البري، والمستودع، والمخزون (3PL)",
          "قراءة المستندات والتحقق منها بالذكاء الاصطناعي",
          "مزامنة البريد",
          "الموارد البشرية والرواتب",
          "الدعم: ومعه واتساب في ساعات العمل",
        ],
        cta: "اطلب عرضاً تجريبياً",
        href: "/demo?plan=growth",
        highlighted: true,
      },
      {
        slug: "carrier",
        name: "الناقل والوكالات",
        who: "NVOCC والوكالات الملاحية والمخلّصون.",
        price: { sar: "3,299 ريال", usd: "899 دولار" },
        period: "شهرياً",
        features: [
          "كل ما في النمو والتوسع",
          "NVOCC: البوليصة باسم الشركة، والأرضيات والتأخير، والوكلاء وتقاسم الربح",
          "التخليص الجمركي والوكالات الملاحية",
          "الربط الحكومي (فسح، CEISA، uCustoms) والبوليصة الإلكترونية عند توفرها",
          "الدعم: أولوية",
        ],
        cta: "اطلب عرضاً تجريبياً",
        href: "/demo?plan=carrier",
      },
      {
        slug: "enterprise",
        name: "المؤسسات",
        who: "المجموعات والفروع، ومن يحتاج سيرفراً خاصاً.",
        price: { sar: "من 5,499 ريال", usd: "من 1,499 دولار" },
        period: "شهرياً",
        features: [
          "كل الأنشطة",
          "فروع أو شركات متعددة بتسجيل دخول واحد، ولوحة للمجموعة",
          "سيرفر خاص",
          "نقل البيانات من النظام القديم، وتدريب مخصص",
          "تكاملات خاصة بالعميل",
          "الدعم: مدير حساب واتفاقية مستوى خدمة",
        ],
        cta: "تواصل مع المبيعات",
        href: "/demo?plan=enterprise",
      },
    ],
    currency: { sar: "السعودية · ريال سعودي", usd: "دولار" },
    currencyNote: "الأسعار بالدولار الأمريكي، وبالريال السعودي للسعودية. وفي قطر تُفوتر الخطط بالريال القطري (QAR) بما يعادل سعرها بالدولار.",
    badge: "الموصى بها",
    essentialsTitle: "الأساسيات في كل الخطط المدفوعة",
    essentials: [
      "الحجوزات والبوالص",
      "عروض الأسعار",
      "فاتورة ضريبية ثنائية اللغة برمز QR، وفوترة إلكترونية متوافقة مع متطلبات هيئة الزكاة والضريبة والجمارك (فاتورة)",
      "التحصيل والسداد",
      "المحاسبة والتقارير",
      "شركاء الأعمال",
      "المستندات",
      "التتبّع العام",
      "العربية والإنجليزية",
    ],
    messages: [
      { title: "بلا حد للمستخدمين", text: "في كل الخطط المدفوعة. المدير يحدد الأدوار والمستخدمين من الإدارة." },
      { title: "بلا رسوم تطبيق", text: "في كل الخطط. التجهيز بالمحادثة مع المساعد." },
      { title: "اشتراك لشركة واحدة", text: "سجل تجاري واحد. الفروع والمجموعات في خطة المؤسسات." },
    ],
    trial: {
      eyebrow: "ابدأ مجاناً",
      title: "14 يوماً على النمو والتوسع، بكل مميزاتها",
      text: "كل حساب جديد يبدأ بتجربة 14 يوماً على خطة النمو والتوسع، ومعها قراءة 30 مستنداً بالذكاء الاصطناعي. يظهر لك عدّاد يبدأ من 30 حتى ينتهي.",
      points: ["كل الأنشطة مفتوحة", "الذكاء الاصطناعي يقرأ 30 مستنداً", "مزامنة البريد"],
      after: "بعد التجربة ينتقل حسابك إلى النسخة المجانية: نشاط واحد، و5 حجوزات شهرياً، ومستخدم واحد، وفاتورة مبدئية.",
      cta: "ابدأ مجاناً",
    },
    founding: { title: "العملاء المؤسسون", text: "أول 20 شركة تحصل على خصم 30% للسنة الأولى." },
    yearly: { title: "الدفع السنوي", text: "شهر مجاناً." },
  },
};

const allSlugs = copy.en.tiers.map((t) => t.slug);

/** Plan display names keyed by the `?plan=` slug used in demo links. */
export function planName(slug: string, locale: Locale): string | undefined {
  const s = slug.toLowerCase();
  if (!allSlugs.includes(s)) return undefined;
  return copy[locale].tiers.find((t) => t.slug === s)?.name;
}

export async function PricingTiers() {
  const locale = await getLocale();
  const t = copy[locale];
  return (
    <div>
      <PricingGrid t={t} initial="usd" />

      {/* The three messages: users, fees, one company */}
      <div className="mt-8 grid gap-3 md:grid-cols-3">
        {t.messages.map((m, i) => {
          const Icon = [InfinityIcon, Wrench, Check][i];
          return (
            <div key={m.title} className="flex items-start gap-3 rounded-2xl bg-white p-4 ring-1 ring-fog-200">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-spark-50 text-spark-700 ring-1 ring-spark-200">
                <Icon className="h-4.5 w-4.5" />
              </span>
              <span>
                <span className="block text-[13.5px] font-semibold text-ink-900">{m.title}</span>
                <span className="block text-[13px] leading-relaxed text-fog-600">{m.text}</span>
              </span>
            </div>
          );
        })}
      </div>

      {/* The essentials */}
      <div className="mt-8 rounded-2xl bg-fog-50 p-5 ring-1 ring-fog-200 sm:p-6">
        <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-fog-500">{t.essentialsTitle}</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {t.essentials.map((e) => (
            <li key={e} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[13px] font-medium text-ink-900 ring-1 ring-fog-200">
              <Check className="h-3.5 w-3.5 text-spark-600" strokeWidth={3} />
              {e}
            </li>
          ))}
        </ul>
      </div>

      {/* The trial */}
      <div className="mt-8 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <div className="relative overflow-hidden rounded-3xl bg-ink-900 p-6 text-white sm:p-8">
          <div aria-hidden className="absolute -end-20 -top-20 h-64 w-64 rounded-full bg-spark-400/20 blur-3xl" />
          <p className="relative inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[12px] font-semibold text-spark-200 ring-1 ring-inset ring-white/10">
            <Sparkles className="h-3.5 w-3.5" />
            {t.trial.eyebrow}
          </p>
          <h3 className="font-display relative mt-4 text-2xl font-bold">{t.trial.title}</h3>
          <p className="relative mt-3 max-w-xl text-[15px] leading-relaxed text-white/70">{t.trial.text}</p>
          <ul className="relative mt-4 flex flex-wrap gap-2">
            {t.trial.points.map((p) => (
              <li key={p} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[12.5px] font-medium text-white ring-1 ring-inset ring-white/10">
                <Check className="h-3.5 w-3.5 text-spark-300" strokeWidth={3} />
                {p}
              </li>
            ))}
          </ul>
          <p className="relative mt-5 max-w-xl text-[13.5px] leading-relaxed text-white/55">{t.trial.after}</p>
          <div className="relative mt-6">
            <Button href="/demo?plan=free" variant="inverse">
              {t.trial.cta}
            </Button>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="flex items-start gap-3 rounded-2xl bg-spark-50 p-5 ring-1 ring-spark-200">
            <Gift className="mt-0.5 h-5 w-5 shrink-0 text-spark-600" />
            <p className="text-[14px] leading-relaxed text-ink-900">
              <span className="font-semibold">{t.founding.title}.</span> {t.founding.text}
            </p>
          </div>
          <div className="rounded-2xl bg-white p-5 ring-1 ring-fog-200">
            <p className="text-[14px] font-semibold text-ink-900">{t.yearly.title}</p>
            <p className="mt-0.5 text-[13.5px] leading-relaxed text-fog-600">{t.yearly.text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
