import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { AssistantChatShot, DocumentReadShot, SetupShot, TodayBriefShot } from "@/components/shots/ai-shots";
import type { Locale } from "@/lib/i18n";

const copy = {
  en: {
    eyebrow: "See it work",
    title: "From setup on day one to the work of every day",
    description:
      "It sets your company up in a ten-minute chat, then does the daily work with your team: ask for the outcome and it proposes every change on a card for you to confirm.",
    captions: [
      ["Sets your company up by chat", "An ordered checklist with a progress bar; it explains each item, asks, and fills in what it reads from a pasted document."],
      ["Calls tools in sequence", "Each step it takes is listed as it runs; the proposal at the end is what gets saved."],
      ["Reads the paperwork", "A carrier confirmation becomes booking fields you can check at a glance."],
      ["Starts your day", "A Today card for your role, with the money that would otherwise slip through."],
    ],
  },
  ar: {
    eyebrow: "شاهده يعمل",
    title: "من تجهيز الشركة في يومها الأول إلى عمل كل يوم",
    description:
      "يجهّز شركتك في محادثة مدتها عشر دقائق، ثم ينجز العمل اليومي مع فريقك: اطلب النتيجة، ويعرض كل تغيير في بطاقة لتؤكده.",
    captions: [
      ["يجهّز شركتك بالمحادثة", "قائمة مرتبة وشريط تقدّم؛ يشرح كل بند ويسأل، ويعبّئ ما يقرؤه من أي مستند تلصقه."],
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
  const [setup, chat, doc, brief] = t.captions;
  return (
    <Section className="py-16 sm:py-20">
      <SectionHeading eyebrow={t.eyebrow} eyebrowTone="spark" title={t.title} description={t.description} />
      <div className="mt-12 grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div className="grid min-w-0 gap-10">
          <Reveal className="min-w-0">
            <SetupShot locale={locale} className="max-w-[520px]" />
            <Caption title={setup[0]} text={setup[1]} />
          </Reveal>
          <Reveal delay={0.06} className="min-w-0">
            <AssistantChatShot locale={locale} className="max-w-[480px]" />
            <Caption title={chat[0]} text={chat[1]} />
          </Reveal>
        </div>
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
