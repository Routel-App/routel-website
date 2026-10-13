import { ArrowRight, FileSearch, Languages, Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { getLocale } from "@/lib/locale-server";
import type { Locale } from "@/lib/i18n";
import { AssistantChatShot } from "@/components/shots/ai-shots";

const guaranteeIcons = [ShieldCheck, Lock, Languages, FileSearch];

const copy = {
  en: {
    eyebrow: "AI Assistant",
    title: "An AI assistant that calls tools and runs operations automatically.",
    lead: "Most “AI features” summarise. Routel’s assistant is wired into the same actions as the screens: ask for the outcome and it opens the booking, reads the attached document, adds the cost, drafts the invoice and runs the report, then waits for your click before anything is saved.",
    cta: "See the assistant at work",
    capabilities: [
      "Quotations, bookings and booking charges",
      "Draft and finalize invoices, receipts and vendor payments",
      "Credit notes, House B/Ls, tasks and follow-ups",
      "Reads B/Ls, booking confirmations and vendor invoices",
      "Turns a registration certificate into a business partner",
      "Imports a whole rate sheet as route rates",
      "P&L, aging, tax summary and cash position, as an answer or a file",
      "A daily brief of what needs you, by role",
    ],
    guarantees: [
      {
        title: "Runs on its own, you decide",
        text: "Searches and reports run straight away. Anything that creates or changes a record appears as a card and is saved only when you confirm.",
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
    title: "مساعد ذكي يستدعي أدوات وينفّذ عمليات تلقائيًا.",
    lead: "معظم «ميزات الذكاء الاصطناعي» تكتفي بالتلخيص. أما مساعد Routel فمربوط بالإجراءات نفسها الموجودة في الشاشات: اطلب النتيجة، فيفتح الحجز، ويقرأ المستند المرفق، ويضيف التكلفة، ويجهّز الفاتورة، ويستخرج التقرير، ثم ينتظر ضغطتك قبل حفظ أي شيء.",
    cta: "شاهد المساعد وهو يعمل",
    capabilities: [
      "عروض الأسعار والحجوزات وبنود الحجز",
      "مسودات الفواتير واعتمادها، وسندات القبض، ودفعات الموردين",
      "الإشعارات الدائنة، وبوالص الشحن الفرعية، والمهام، والمتابعات",
      "يقرأ البوالص وتأكيدات الحجز وفواتير الموردين",
      "يحوّل السجل التجاري إلى شريك أعمال جديد",
      "يستورد جدول أسعار كاملاً كأسعار مسارات",
      "الأرباح والخسائر، وأعمار الديون، والملخص الضريبي، والوضع النقدي، كإجابة أو كملف",
      "ملخص يومي لما يحتاج اهتمامك، حسب دورك",
    ],
    guarantees: [
      {
        title: "ينفّذ تلقائياً، والقرار لك",
        text: "البحث والتقارير تُنفَّذ فوراً. وأي إنشاء أو تعديل لسجل يظهر كبطاقة، ولا يُحفظ إلا بعد تأكيدك.",
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
            <Button href="/platform/ai-assistant" variant="inverse">
              {t.cta}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Reveal>
        </div>

        <Reveal amount={0.15} className="relative">
          <AssistantChatShot locale={locale} tone="dark" className="mx-auto max-w-[500px]" />
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
