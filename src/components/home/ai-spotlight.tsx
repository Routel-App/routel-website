import { ArrowRight, FileSearch, Languages, Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { getLocale } from "@/lib/locale-server";
import type { Locale } from "@/lib/i18n";
import { ChatMockup } from "./chat-mockup";

const guaranteeIcons = [ShieldCheck, Lock, Languages, FileSearch];

const copy = {
  en: {
    eyebrow: "AI Assistant",
    title: "An assistant that does the work, not just the talking.",
    lead: "Most “AI features” summarise. Routel’s assistant is wired into the same actions your team performs by hand: it drafts the job, the invoice, the vendor cost or the report, shows you exactly what it will save, and waits for your confirmation.",
    cta: "How the assistant works",
    capabilities: [
      "Create and update jobs and bookings",
      "Generate quotations and route rates",
      "Create customer invoices",
      "Record expenses",
      "Read an uploaded vendor invoice and propose the cost lines",
      "Generate customer and vendor statements as PDF",
      "Run overdue, aging, profitability and cash-position reports",
      "Search and download shipment documents",
    ],
    guarantees: [
      {
        title: "Propose, review, confirm",
        text: "Every write goes through a proposal card. Nothing is saved until a person confirms it. There is no silent auto-execution.",
      },
      {
        title: "Same permissions as the UI",
        text: "The assistant is gated by the same role-based access as every screen. Sales can't post to the ledger by asking nicely.",
      },
      {
        title: "Arabic and English",
        text: "Staff talk to it in whichever language they think in. Mixed sentences work too.",
      },
      {
        title: "Reads your paperwork",
        text: "Upload a vendor invoice and it extracts the line items into a proposed vendor cost, ready to check.",
      },
    ],
  },
  ar: {
    eyebrow: "المساعد الذكي",
    title: "مساعد ينجز العمل، لا يكتفي بالكلام.",
    lead: "معظم «ميزات الذكاء الاصطناعي» تكتفي بالتلخيص. أما مساعد Routel فمرتبط بالإجراءات نفسها التي ينفذها فريقك يدوياً: يُعدّ مسودة ملف الشحن أو الفاتورة أو تكلفة المورّد أو التقرير، ويعرض لك بالضبط ما سيحفظه، ثم ينتظر تأكيدك.",
    cta: "كيف يعمل المساعد",
    capabilities: [
      "إنشاء ملفات الشحن والحجوزات وتحديثها",
      "إعداد عروض الأسعار وأسعار المسارات",
      "إنشاء فواتير العملاء",
      "تسجيل المصروفات",
      "قراءة فاتورة مورّد مرفوعة واقتراح بنود التكلفة",
      "إصدار كشوف حساب العملاء والمورّدين بصيغة PDF",
      "تشغيل تقارير المتأخرات وأعمار الديون والربحية والوضع النقدي",
      "البحث عن مستندات الشحن وتنزيلها",
    ],
    guarantees: [
      {
        title: "اقتراح، ثم مراجعة، ثم تأكيد",
        text: "كل عملية حفظ تمر عبر بطاقة اقتراح. لا يُحفظ شيء حتى يؤكده شخص. لا يوجد تنفيذ تلقائي صامت.",
      },
      {
        title: "الصلاحيات نفسها كما في الواجهة",
        text: "يخضع المساعد للصلاحيات نفسها المبنية على الأدوار في كل شاشة. لا يستطيع فريق المبيعات الترحيل إلى دفتر الأستاذ بمجرد أن يطلب ذلك بلطف.",
      },
      {
        title: "العربية والإنجليزية",
        text: "يتحدث إليه الموظفون باللغة التي يفكرون بها. والجمل التي تمزج اللغتين تعمل أيضاً.",
      },
      {
        title: "يقرأ مستنداتك",
        text: "ارفع فاتورة مورّد وسيستخرج بنودها في تكلفة مورّد مقترحة، جاهزة للمراجعة.",
      },
    ],
  },
} satisfies Record<
  Locale,
  { eyebrow: string; title: string; lead: string; cta: string; capabilities: string[]; guarantees: Array<{ title: string; text: string }> }
>;

export async function AiSpotlight() {
  const locale = await getLocale();
  const t = copy[locale];
  return (
    <Section id="assistant" tone="dark" className="overflow-hidden">
      <div aria-hidden className="grid-fade-dark absolute inset-0 -z-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute -end-40 top-10 h-[560px] w-[560px] rounded-full bg-[radial-gradient(closest-side,rgb(245_133_11/0.14),transparent)]"
      />
      <div className="relative grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div>
          <Reveal>
            <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-spark-300">{t.eyebrow}</p>
            <h2 className="font-display text-balance text-3xl font-bold leading-[1.08] text-white sm:text-4xl lg:text-[2.75rem]">
              {t.title}
            </h2>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-white/70">{t.lead}</p>
          </Reveal>

          <RevealGroup className="mt-8 grid gap-x-8 gap-y-2 sm:grid-cols-2" stagger={0.05}>
            {t.capabilities.map((c) => (
              <RevealItem key={c} className="flex items-start gap-2.5 text-sm text-white/80">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-spark-400" />
                {c}
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1} className="mt-8">
            <Button href="/docs/ai-assistant" variant="inverse">
              {t.cta}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Reveal>
        </div>

        <Reveal amount={0.15} className="relative">
          <ChatMockup />
        </Reveal>
      </div>

      <RevealGroup className="relative mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
        {t.guarantees.map((g, i) => {
          const Icon = guaranteeIcons[i];
          return (
            <RevealItem
              key={g.title}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-6 backdrop-blur-sm transition-colors hover:bg-white/[0.06]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06] text-teal-300 ring-1 ring-inset ring-white/10">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <h3 className="font-display mt-4 text-[16px] font-semibold text-white">{g.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{g.text}</p>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
