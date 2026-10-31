import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/section";
import { Faq, type FaqItem } from "@/components/ui/faq";
import { PricingTiers } from "@/components/pricing/pricing-tiers";
import { Versus } from "@/components/home/versus";
import { Cta } from "@/components/home/cta";
import type { Locale } from "@/lib/i18n";
import { getLocale } from "@/lib/locale-server";

const copy = {
  en: {
    metaTitle: "Pricing",
    metaDescription:
      "Routel plans: Basic ($149/mo), Freight Forwarder ($249/mo), Freight Forwarder Growth ($499/mo) and Enterprise (from $1,499/mo), with 3PL and NVOCC plans coming.",
    eyebrow: "Pricing",
    title: "One platform, priced by what your company does",
    description: "No per-shipment fees. Pick the plan that matches your activities, add users as you grow, and open new modules when you need them.",
    faqTitle: "Questions we get asked",
    faqs: [
      {
        q: "Can we try it before we pay?",
        a: "Yes. Request a demo and we'll run your own shipments through ROUTEL with you, before you choose a plan. Plans start at $149 a month.",
      },
      {
        q: "Which plan includes the AI assistant?",
        a: "Freight Forwarder Growth and Enterprise. On the other plans it helps the admin set the company up for the first 30 days. It works with the same permissions as your users' roles and never saves anything without a person's confirmation.",
      },
      {
        q: "What does \"coming soon\" mean for 3PL and NVOCC?",
        a: "Those plans cover services Routel is rolling out: warehouse receipts, land transport and inventory for 3PL; Bills of Lading in your own name, demurrage and detention, agents, shipping agency and customs brokerage for NVOCC. Their prices are set. Register interest and we'll open them to you first.",
      },
      {
        q: "Is there a discount for founding customers or yearly billing?",
        a: "Yes. The first 20 companies get 30% off with their price locked for two years, and paying yearly gives you two months free.",
      },
      {
        q: "Which currencies are supported?",
        a: "Two per company: your base currency (SAR, MYR or IDR) and USD. Every invoice and document is issued in one of the two, and the books keep both.",
      },
      {
        q: "Can we migrate from spreadsheets or another system?",
        a: "Yes. Talk to us when you request a demo, and our team can bring over your business partners and route rates.",
      },
      {
        q: "Where is Routel hosted?",
        a: "Each company runs on its own deployment with its own database. Enterprise gets a fully dedicated server. Ask us about regional hosting requirements when you request a demo.",
      },
    ],
  },
  ar: {
    metaTitle: "الأسعار",
    metaDescription:
      "باقات Routel: الأساسية ($149 شهرياً)، ووكيل الشحن ($249)، ووكيل الشحن Growth ($499)، والمؤسسات (من $1,499)، وباقتا 3PL وNVOCC قريباً.",
    eyebrow: "الأسعار",
    title: "منصة واحدة، بسعر يناسب نشاط شركتك",
    description: "لا رسوم على كل شحنة. اختر الباقة التي تناسب أنشطتك، وأضف المستخدمين مع نموّك، وافتح الوحدات الجديدة حين تحتاجها.",
    faqTitle: "أسئلة تصلنا كثيراً",
    faqs: [
      {
        q: "هل يمكن التجربة قبل الدفع؟",
        a: "نعم. اطلب عرضاً تجريبياً ونشغّل معك شحناتك أنت على ROUTEL قبل أن تختار باقتك. تبدأ الباقات من 149 دولاراً شهرياً.",
      },
      {
        q: "أي باقة تشمل المساعد الذكي؟",
        a: "وكيل الشحن Growth والمؤسسات. وفي الباقات الأخرى يساعد المدير في تجهيز الشركة خلال أول 30 يوماً. يعمل بنفس صلاحيات أدوار مستخدميك، ولا يحفظ أي شيء دون تأكيد شخص.",
      },
      {
        q: "ماذا تعني «قريباً» في باقتي 3PL وNVOCC؟",
        a: "تغطي هاتان الباقتان خدمات يطلقها Routel تباعاً: إيصالات المستودع والنقل البري والمخزون في 3PL، وبوالص الشحن باسم شركتك والأرضيات والتأخير والوكلاء والوكالة الملاحية والتخليص الجمركي في NVOCC. أسعارهما محددة، سجّل اهتمامك وسنفتحهما لك أولاً.",
      },
      {
        q: "هل يوجد خصم للعملاء المؤسسين أو للدفع السنوي؟",
        a: "نعم. أول 20 شركة تحصل على خصم 30% مع تثبيت السعر لسنتين، والدفع السنوي يمنحك شهرين مجاناً.",
      },
      {
        q: "ما العملات المدعومة؟",
        a: "عملتان: الريال السعودي والدولار الأمريكي. تصدر كل فاتورة ومستند بإحداهما، وتحتفظ الدفاتر المحاسبية بالعملتين معاً، مع ضريبة القيمة المضافة 15% على الفواتير الضريبية.",
      },
      {
        q: "هل يمكننا الانتقال من جداول البيانات أو من نظام آخر؟",
        a: "نعم. تحدّث إلينا حين تطلب عرضاً تجريبياً، ويمكن لفريقنا نقل شركاء أعمالك وأسعار مساراتك.",
      },
      {
        q: "أين تتم استضافة Routel؟",
        a: "تعمل كل شركة على نشر خاص بها بقاعدة بيانات مستقلة، وتحصل باقة المؤسسات على خادم مخصص بالكامل. اسألنا عن متطلبات الاستضافة الإقليمية حين تطلب عرضاً تجريبياً.",
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

      <Versus />

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
