import { Section, SectionHeading } from "@/components/ui/section";
import { Faq, type FaqItem } from "@/components/ui/faq";
import { getLocale } from "@/lib/locale-server";
import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

type Copy = { eyebrow: string; title: string; items: FaqItem[] };

const copy: Record<Locale, Copy> = {
  en: {
    eyebrow: "Questions",
    title: "What forwarders ask before they switch",
    items: [
      { q: "Does Routel work in Arabic?", a: "Yes. The whole interface works in Arabic and English and mirrors right to left, and the AI assistant is multilingual: it answers in whatever language you write in." },
      { q: "Which currencies and taxes does it handle?", a: "Each deployment uses its country's base currency plus USD, with that country's tax: VAT in Saudi Arabia, SST in Malaysia and PPN in Indonesia, each with its own tax report. Qatari riyals (QAR) are available for companies in Qatar, and other currencies on request. Invoices print as bilingual tax invoices; ZATCA-compliant e-invoicing for Saudi Arabia (Fatoora), with the QR code." },
      { q: "Can we try it before we pay?", a: "Yes. Every new account starts with a 14-day free trial of Growth, with AI document reading for 30 documents, and then moves to the free version. Or request a demo and we'll run your own shipments through ROUTEL with you." },
      { q: "Will the AI change our data on its own?", a: "No. The assistant proposes and you confirm: nothing is saved until a person approves it, it works within the user's own permissions, and every action it carries out is logged." },
      { q: "How long does setup take?", a: "The assistant walks an admin through the company setup step by step, about ten minutes for the essentials." },
      { q: "Can our customers track their shipments?", a: "Yes, on a public page with no login. They need two things, the booking, B/L or container number plus their company name or account ID, and they see the status timeline only." },
    ],
  },
  ar: {
    eyebrow: "أسئلة",
    title: "ما تسأله شركات الشحن قبل الانتقال",
    items: [
      { q: "هل يعمل Routel بالعربية؟", a: "نعم. الواجهة كاملة بالعربية والإنجليزية باتجاه من اليمين إلى اليسار، والمساعد الذكي متعدد اللغات: يجيبك باللغة التي تكتب بها." },
      { q: "ما العملات والضرائب التي يدعمها؟", a: "كل نسخة تعمل بالعملة الأساسية لبلدها مع الدولار الأمريكي، وبضريبة ذلك البلد: ضريبة المبيعات والخدمات (SST) في ماليزيا، وضريبة القيمة المضافة (PPN) في إندونيسيا، وضريبة القيمة المضافة 15% في السعودية، ولكل منها تقريرها. والريال القطري (QAR) متاح للشركات في قطر، وعملات أخرى عند الطلب. وتُطبع الفواتير «فاتورة ضريبية» باللغتين؛ وفي السعودية فوترة إلكترونية متوافقة مع متطلبات هيئة الزكاة والضريبة والجمارك (فاتورة)، برمز QR." },
      { q: "هل يمكن التجربة قبل الدفع؟", a: "نعم. كل حساب جديد يبدأ بتجربة مجانية 14 يوماً على خطة النمو والتوسع، ومعها قراءة 30 مستنداً بالذكاء الاصطناعي، ثم ينتقل إلى النسخة المجانية. أو اطلب عرضاً تجريبياً ونشغّل معك شحناتك أنت على ROUTEL." },
      { q: "هل يغيّر المساعد الذكي بياناتنا من تلقاء نفسه؟", a: "لا. المساعد يقترح وأنت تؤكد: لا شيء يُحفظ قبل موافقة شخص، ويعمل ضمن صلاحيات المستخدم نفسه، وكل عملية ينفذها مسجّلة." },
      { q: "كم يستغرق تجهيز النظام؟", a: "يرشد المساعد مدير النظام خطوة بخطوة في تجهيز بيانات الشركة، ويستغرق الأساسي نحو عشر دقائق." },
      { q: "هل يستطيع عملاؤنا تتبّع شحناتهم؟", a: "نعم، من صفحة عامة دون تسجيل دخول. يحتاجون معلومتين: رقم الحجز أو البوليصة أو الحاوية، مع اسم الشركة أو رقم الحساب، ويرون تسلسل الحالة فقط." },
    ],
  },
};

/** The home page's FAQ, also published as FAQPage structured data. */
export async function HomeFaq() {
  const locale = await getLocale();
  const t = copy[locale];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        inLanguage: locale,
        mainEntity: t.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
      {
        "@type": "SoftwareApplication",
        name: "Routel",
        url: locale === "ar" ? `${site.url}/ar` : site.url,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        inLanguage: ["en", "ar"],
      },
    ],
  };
  return (
    <Section id="faq">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} />
      <Faq items={t.items} className="mt-12" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </Section>
  );
}
