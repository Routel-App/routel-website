import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { AssistantChatShot, DocumentReadShot, TodayBriefShot } from "@/components/shots/ai-shots";
import type { Locale } from "@/lib/i18n";

const copy = {
  en: {
    eyebrow: "See it work",
    title: "One request, several tools, one confirmation",
    description:
      "Ask for the outcome. The assistant opens the booking, reads the vendor bill, adds the cost and drafts the invoice, then waits for your click.",
    captions: [
      ["Calls tools in sequence", "Each step it takes is listed as it runs; the proposal at the end is what gets saved."],
      ["Reads the paperwork", "A carrier confirmation becomes booking fields you can check at a glance."],
      ["Starts your day", "A Today card for your role, with the money that would otherwise slip through."],
    ],
  },
  ar: {
    eyebrow: "شاهده يعمل",
    title: "طلب واحد، عدة أدوات، تأكيد واحد",
    description:
      "اطلب النتيجة. يفتح المساعد الحجز، ويقرأ فاتورة المورد، ويضيف التكلفة، ويجهّز الفاتورة، ثم ينتظر ضغطتك.",
    captions: [
      ["يستدعي الأدوات بالتسلسل", "تظهر كل خطوة ينفذها أولاً بأول، والمقترح في النهاية هو ما يُحفظ."],
      ["يقرأ المستندات", "تأكيد الخط الملاحي يتحول إلى حقول حجز تراجعها بنظرة واحدة."],
      ["يبدأ يومك معك", "بطاقة «اليوم» حسب دورك، ومعها المبالغ التي كانت ستضيع بصمت."],
    ],
  },
} satisfies Record<Locale, { eyebrow: string; title: string; description: string; captions: string[][] }>;

function Caption({ title, text }: { title: string; text: string }) {
  return (
    <div className="mt-4 max-w-md">
      <p className="font-display text-[15px] font-semibold text-ink-900">{title}</p>
      <p className="mt-1 text-sm leading-relaxed text-fog-600">{text}</p>
    </div>
  );
}

/** Marketing shots of the assistant, shown on /platform/ai-assistant under the hero. */
export function AiShowcase({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const [chat, doc, brief] = t.captions;
  return (
    <Section className="py-16 sm:py-20">
      <SectionHeading eyebrow={t.eyebrow} eyebrowTone="spark" title={t.title} description={t.description} />
      <div className="mt-12 grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <Reveal className="min-w-0">
          <AssistantChatShot locale={locale} className="mx-auto max-w-[480px]" />
          <Caption title={chat[0]} text={chat[1]} />
        </Reveal>
        <div className="grid min-w-0 gap-10">
          <Reveal delay={0.08} className="min-w-0">
            <DocumentReadShot locale={locale} />
            <Caption title={doc[0]} text={doc[1]} />
          </Reveal>
          <Reveal delay={0.14} className="min-w-0">
            <TodayBriefShot locale={locale} className="max-w-[480px]" />
            <Caption title={brief[0]} text={brief[1]} />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
