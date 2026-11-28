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
      "ROUTEL plans: Free, Basic (USD 199/mo), Growth (USD 499/mo), Carrier & Agencies (USD 899/mo) and Enterprise (from USD 1,499/mo); in Saudi Arabia SAR 699, 1,799, 3,299 and from 5,499; in Qatar billed in QAR at the USD price. Unlimited users, no implementation fees, and a 14-day free trial.",
    eyebrow: "Pricing",
    title: "One platform, priced by what your company does",
    description: "No per-shipment fees, no per-user fees and no implementation fees. Pick the plan that matches your activities, and open new modules when you need them. Prices in dollars, in Saudi riyals for Saudi Arabia, and billed in Qatari riyals (QAR) in Qatar.",
    faqTitle: "Questions we get asked",
    faqs: [
      {
        q: "How does the free trial work?",
        a: "Every new account starts with 14 days on Growth, with everything in it, including AI document reading for 30 documents. After the trial, the account moves to the free version: one activity, 5 bookings a month, one user and a preliminary invoice.",
      },
      {
        q: "What is a preliminary invoice?",
        a: "On the free version, ROUTEL issues a preliminary invoice without the title “tax invoice”. The tax invoice is issued from your approved billing system, and you link it to the booking by its number or its file. On the paid plans, the tax invoice is issued inside ROUTEL.",
      },
      {
        q: "Is there a limit on users?",
        a: "No. Every paid plan has unlimited users; the admin sets the roles and users from Admin. Plans differ by activities and by what costs us, never by the number of users.",
      },
      {
        q: "Are there implementation fees?",
        a: "No, on any plan. The assistant sets the company up by chat. Enterprise adds data migration from your old system and tailored training.",
      },
      {
        q: "What does the Enterprise plan include?",
        a: "Every activity, and with it: several branches or companies with one sign-in and a group dashboard; a dedicated server; data migration from your old system and tailored training; and integrations built for you.",
      },
      {
        q: "Is there a discount for founding customers or yearly billing?",
        a: "Yes. The first 20 companies get 30% off for the first year, and paying yearly gives you one month free.",
      },
      {
        q: "Which currencies are supported?",
        a: "Two per company: your base currency (SAR, MYR or IDR today, and QAR for companies in Qatar; other currencies on request) and USD. Every invoice and document is issued in one of the two, and the books keep both. In Saudi Arabia, tax invoices carry VAT at 15%.",
      },
      {
        q: "Can we migrate from spreadsheets or another system?",
        a: "Yes. Talk to us when you request a demo, and we can bring over your business partners and route rates. On Enterprise, migration from your old system is part of the plan.",
      },
    ],
  },
  ar: {
    metaTitle: "الأسعار",
    metaDescription:
      "خطط ROUTEL: المجانية، والأساسية (199 دولاراً شهرياً)، والنمو والتوسع (499)، والناقل والوكالات (899)، والمؤسسات (من 1,499)؛ وفي السعودية 699 و1,799 و3,299 ومن 5,499 ريالاً سعودياً؛ وفي قطر بالريال القطري بما يعادل سعر الدولار. بلا حد للمستخدمين، وبلا رسوم تطبيق، وتجربة مجانية 14 يوماً.",
    eyebrow: "الأسعار",
    title: "منصة واحدة، بسعر يناسب نشاط شركتك",
    description: "لا رسوم على كل شحنة، ولا على كل مستخدم، ولا رسوم تطبيق. اختر الخطة التي تناسب أنشطتك، وافتح الوحدات الجديدة حين تحتاجها. الأسعار بالدولار، وبالريال السعودي للسعودية، وتُفوتر بالريال القطري (QAR) في قطر.",
    faqTitle: "أسئلة تصلنا كثيراً",
    faqs: [
      {
        q: "كيف تعمل التجربة المجانية؟",
        a: "يبدأ كل حساب جديد بـ 14 يوماً على خطة النمو والتوسع بكل مميزاتها، ومعها قراءة 30 مستنداً بالذكاء الاصطناعي. بعد التجربة ينتقل الحساب إلى النسخة المجانية: نشاط واحد، و5 حجوزات شهرياً، ومستخدم واحد، وفاتورة مبدئية.",
      },
      {
        q: "ما الفاتورة المبدئية؟",
        a: "في النسخة المجانية يصدر ROUTEL فاتورة مبدئية بلا عنوان «فاتورة ضريبية». والفاتورة الضريبية تصدرها شركتك من نظام الفوترة المعتمد لديها، وتربطها بالحجز برقمها أو بملفها. وفي الخطط المدفوعة تصدر الفاتورة الضريبية داخل ROUTEL.",
      },
      {
        q: "هل هناك حد للمستخدمين؟",
        a: "لا. كل الخطط المدفوعة بلا حد للمستخدمين، ويحدد المدير الأدوار والمستخدمين من صفحة الإدارة. تختلف الخطط بالأنشطة وبما يكلّفنا فعلاً، لا بعدد المستخدمين.",
      },
      {
        q: "هل هناك رسوم تطبيق؟",
        a: "لا، في أي خطة. يجهّز المساعد الشركة بالمحادثة. وتضيف خطة المؤسسات نقل البيانات من النظام القديم وتدريباً مخصصاً.",
      },
      {
        q: "ماذا تشمل خطة المؤسسات؟",
        a: "كل الأنشطة، ومعها: فروع أو شركات متعددة بتسجيل دخول واحد ولوحة للمجموعة؛ وخادم خاص؛ ونقل البيانات من النظام القديم وتدريب مخصص؛ وتكاملات خاصة بالعميل.",
      },
      {
        q: "هل يوجد خصم للعملاء المؤسسين أو للدفع السنوي؟",
        a: "نعم. تحصل أول 20 شركة على خصم 30% في السنة الأولى، ويمنحك الدفع السنوي شهراً مجاناً.",
      },
      {
        q: "ما العملات المدعومة؟",
        a: "عملتان لكل شركة: عملتها الأساسية (الريال السعودي أو الرينغيت الماليزي أو الروبية الإندونيسية اليوم، والريال القطري للشركات في قطر، وعملات أخرى عند الطلب) والدولار الأمريكي. تصدر كل فاتورة ومستند بإحداهما، وتحتفظ الدفاتر المحاسبية بالعملتين معاً. وفي السعودية تحمل الفواتير الضريبية ضريبة القيمة المضافة 15%.",
      },
      {
        q: "هل يمكننا الانتقال من جداول البيانات أو من نظام آخر؟",
        a: "نعم. تحدّث إلينا حين تطلب عرضاً تجريبياً، ويمكننا نقل شركاء أعمالك وأسعار مساراتك. وفي خطة المؤسسات نقل البيانات من النظام القديم جزء من الخطة.",
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
