import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/section";
import { Faq, type FaqItem } from "@/components/ui/faq";
import { PricingTiers } from "@/components/pricing/pricing-tiers";
import { Compare } from "@/components/home/compare";
import { Cta } from "@/components/home/cta";
import type { Locale } from "@/lib/i18n";
import { getLocale } from "@/lib/locale-server";

const copy = {
  en: {
    metaTitle: "Pricing",
    metaDescription:
      "Routel plans for freight forwarders: Free, Starter ($79/mo), Growth ($149/mo) and Enterprise (let's talk).",
    eyebrow: "Pricing",
    title: "Plans that grow with the number of people, not the number of shipments",
    description: "No per-shipment fees. Pick the plan that matches your team and add users as you grow.",
    faqTitle: "Questions we get asked",
    faqs: [
      {
        q: "What do I get on the Free plan?",
        a: "A single admin user, up to 3 bookings total (a lifetime cap, not monthly) with up to 2 invoices per booking — enough to try Routel on real shipments before you commit.",
      },
      {
        q: "What happens when I outgrow a plan?",
        a: "Nothing is hidden. Every page in the product is visible on every plan — anything beyond your tier shows a lock icon and an upgrade prompt instead of the real page, so you always see the whole product.",
      },
      {
        q: "Is the AI assistant an add-on?",
        a: "No — the full assistant is included in Growth and Enterprise. On Free and Starter it helps the admin set the company up for the first 30 days. It uses the same permissions as your users' roles and never saves anything without a confirmation.",
      },
      {
        q: "Which currencies are supported?",
        a: "Two per company: your base currency (for example MYR or IDR) and USD. Every invoice and document is issued in one of the two, and the books keep both.",
      },
      {
        q: "Can we migrate from spreadsheets or another system?",
        a: "Talk to us when you request a demo — our team can help bring over your customers, vendors and route rates.",
      },
      {
        q: "Where is Routel hosted?",
        a: "Free, Starter and Growth run on a shared Routel server with your own isolated database. Enterprise gets a fully dedicated server. Ask us about regional hosting requirements when you request a demo.",
      },
      {
        q: "What does 'user' mean?",
        a: "A named login with one of six roles — Admin, Management, Accounting, Operations, Sales or Pricing — that decides what they see and do. Free is single-admin only; Starter and up add staff accounts with role-based permissions.",
      },
    ],
  },
  ar: {
    metaTitle: "الأسعار",
    metaDescription:
      "باقات Routel لشركات الشحن: المجانية، والانطلاق ($79 شهرياً)، والنمو ($149 شهرياً)، والمؤسسات (لنتحدث).",
    eyebrow: "الأسعار",
    title: "باقات تنمو مع عدد الأشخاص، لا مع عدد الشحنات",
    description: "لا رسوم على كل شحنة. اختر الباقة المناسبة لفريقك وأضف المستخدمين مع نموّك.",
    faqTitle: "أسئلة تصلنا كثيراً",
    faqs: [
      {
        q: "ماذا أحصل عليه في الباقة المجانية؟",
        a: "مستخدم واحد بصلاحية المدير، وحتى 3 حجوزات إجمالاً (حد طوال مدة الاستخدام، وليس شهرياً)، مع حتى فاتورتين لكل حجز — وهذا يكفي لتجربة Routel على شحنات حقيقية قبل أن تلتزم.",
      },
      {
        q: "ماذا يحدث عندما أتجاوز حدود باقتي؟",
        a: "لا شيء مخفي. كل صفحات المنتج ظاهرة في كل الباقات — وما يتجاوز باقتك يظهر عليه رمز قفل ودعوة للترقية بدلاً من الصفحة الفعلية، لترى المنتج كاملاً دائماً.",
      },
      {
        q: "هل المساعد الذكي إضافة منفصلة؟",
        a: "لا — المساعد الكامل مشمول في باقتي النمو والمؤسسات، وفي الباقتين المجانية والانطلاق يساعد المدير في تجهيز الشركة خلال أول 30 يوماً. يعمل بنفس صلاحيات أدوار مستخدميك، ولا يحفظ أي شيء دون تأكيد.",
      },
      {
        q: "ما العملات المدعومة؟",
        a: "عملتان: الريال السعودي والدولار الأمريكي. تصدر كل فاتورة ومستند بإحداهما، وتحتفظ الدفاتر المحاسبية بالعملتين معاً، مع ضريبة القيمة المضافة 15% على الفواتير الضريبية.",
      },
      {
        q: "هل يمكننا الانتقال من جداول البيانات أو من نظام آخر؟",
        a: "تحدّث إلينا عندما تطلب عرضاً تجريبياً — يمكن لفريقنا المساعدة في نقل عملائك ومورّديك وأسعار خطوطك.",
      },
      {
        q: "أين تتم استضافة Routel؟",
        a: "تعمل باقات المجانية والانطلاق والنمو على خادم Routel مشترك مع قاعدة بيانات معزولة خاصة بك. أما باقة المؤسسات فتحصل على خادم مخصص بالكامل. اسألنا عن متطلبات الاستضافة الإقليمية عندما تطلب عرضاً تجريبياً.",
      },
      {
        q: "ماذا نعني بـ«المستخدم»؟",
        a: "حساب دخول باسم شخص محدد، له أحد ستة أدوار — المدير، أو الإدارة العليا، أو المحاسبة، أو العمليات، أو المبيعات، أو التسعير — يحدد ما يراه وما يمكنه فعله. الباقة المجانية لمستخدم واحد بصلاحية المدير فقط؛ ومن باقة الانطلاق فما فوق تُضاف حسابات للموظفين مع صلاحيات حسب الدور.",
      },
    ],
  },
} satisfies Record<
  Locale,
  {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    title: string;
    description: string;
    faqTitle: string;
    faqs: FaqItem[];
  }
>;

export async function generateMetadata(): Promise<Metadata> {
  const t = copy[await getLocale()];
  return { title: t.metaTitle, description: t.metaDescription };
}

export default async function PricingPage() {
  const t = copy[await getLocale()];
  return (
    <>
      <Section className="pb-10 pt-16 sm:pt-24">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.description} />
        <div className="mt-14">
          <PricingTiers />
        </div>
      </Section>

      <Compare />

      <Section className="py-16 sm:py-20">
        <SectionHeading title={t.faqTitle} />
        <Faq items={t.faqs} className="mt-10" />
      </Section>
      <div className="pt-16">
        <Cta />
      </div>
    </>
  );
}
