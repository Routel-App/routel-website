import { ArrowRight, CloudOff, ListChecks, Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Replay, Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { getLocale } from "@/lib/locale-server";
import type { Locale } from "@/lib/i18n";
import { AssistantChatShot } from "@/components/shots/ai-shots";
import { PromptTyper } from "@/components/motion/prompt-typer";

const guaranteeIcons = [ShieldCheck, Lock, CloudOff, ListChecks];

const copy = {
  en: {
    eyebrow: "AI Assistant · built into Routel",
    title: "Meet your AI operations co-worker.",
    lead: "Routel's assistant sets up your company in a ten-minute chat, then works alongside your team: it creates quotations, bookings and invoices, records payments and answers “who owes us most?” from live data, in any language. It proposes every change on a card and you confirm it before anything is saved.",
    cta: "See the assistant at work",
    capabilities: [
      "Sets your company up in a ten-minute chat",
      "Quotations, bookings and invoices from booking charges",
      "Receipts, AP payments and credit notes",
      "House B/Ls, notes, tasks and follow-ups",
      "Answers from live data: aging, P&L, cash, lane margins",
      "Reads PDFs and photos: confirmations, invoices, certificates",
      "A daily brief of what needs you, by role",
      "Undo for 10 minutes, and a full audit log",
    ],
    guarantees: [
      {
        title: "Propose, then confirm",
        text: "The model never writes on its own. Every change shows on a card with the exact fields and amounts, and only the Confirm button saves.",
      },
      {
        title: "Same rules as the screens",
        text: "It has exactly the permissions of the signed-in user and calls the same functions as the screens: validation, credit limits, numbering.",
      },
      {
        title: "Nothing stored at the AI provider",
        text: "Requests are sent with storage turned off, and uploaded files are treated as untrusted.",
      },
      {
        title: "Full audit trail",
        text: "Every confirmed action is logged: who did what, and the outcome. Safe actions can be undone for 10 minutes.",
      },
    ],
  },
  ar: {
    eyebrow: "المساعد الذكي · مدمج في Routel",
    title: "مساعدك الذكي في العمليات.",
    lead: "مساعد Routel يجهّز شركتك في محادثة مدتها عشر دقائق، ثم يعمل مع فريقك: ينشئ عروض الأسعار والحجوزات والفواتير، ويسجّل الدفعات، ويجيب على «مين أكثر عميل يطلبنا فلوس؟» من بياناتك الحية، وبأي لغة. وكل تغيير يعرضه عليك في بطاقة، ولا يُحفظ شيء قبل تأكيدك.",
    cta: "شاهد المساعد وهو يعمل",
    capabilities: [
      "يجهّز شركتك في محادثة مدتها عشر دقائق",
      "عروض الأسعار والحجوزات والفواتير من بنود الحجز",
      "سندات القبض ودفعات الموردين والإشعارات الدائنة",
      "بوالص الشحن الفرعية والملاحظات والمهام والمتابعات",
      "يجيب من بياناتك الحية: أعمار الديون، الأرباح والخسائر، النقد، هوامش المسارات",
      "يقرأ ملفات PDF والصور: تأكيدات الحجز والفواتير والشهادات",
      "ملخص يومي لما يحتاج اهتمامك، حسب دورك",
      "تراجع خلال 10 دقائق، وسجل تدقيق كامل",
    ],
    guarantees: [
      {
        title: "يقترح، ثم تؤكد",
        text: "النموذج لا يكتب من تلقاء نفسه أبداً. كل تغيير يظهر في بطاقة بالحقول والمبالغ بالضبط، وزر التأكيد وحده يحفظ.",
      },
      {
        title: "نفس قواعد الشاشات",
        text: "له صلاحيات المستخدم المسجّل نفسها بالضبط، ويستدعي نفس وظائف الشاشات: التحقق وحدود الائتمان والترقيم.",
      },
      {
        title: "لا شيء يُحفظ لدى مزوّد الذكاء الاصطناعي",
        text: "تُرسل الطلبات مع إيقاف التخزين، وتُعامل الملفات المرفوعة على أنها غير موثوقة.",
      },
      {
        title: "سجل تدقيق كامل",
        text: "كل عملية مؤكدة مسجلة: من فعل ماذا، وما النتيجة. والعمليات الآمنة يمكن التراجع عنها خلال 10 دقائق.",
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
          <Replay>
            <AssistantChatShot locale={locale} tone="dark" className="mx-auto max-w-[500px]" />
          </Replay>
        </Reveal>
      </div>

      <Reveal className="relative mt-20">
        <PromptTyper />
      </Reveal>

      <RevealGroup className="relative mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
        {t.guarantees.map((g, i) => {
          const Icon = guaranteeIcons[i];
          return (
            <RevealItem
              key={g.title}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-6 backdrop-blur-sm transition-colors hover:bg-white/[0.06]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06] text-spark-300 ring-1 ring-inset ring-white/10">
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
