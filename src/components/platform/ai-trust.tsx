import { CloudOff, FileWarning, KeyRound, ListChecks, MousePointerClick } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import type { Locale } from "@/lib/i18n";

/** The assistant's safety guarantees, as listed in the product's docs/ai-assistant.md. */
const copy = {
  en: {
    eyebrow: "Safety",
    title: "Built to be trusted with real operations",
    items: [
      { title: "Propose, then confirm", text: "The model never writes on its own. Only the Confirm button saves." },
      { title: "Role-based", text: "The assistant has exactly the permissions of the signed-in user." },
      { title: "Nothing stored at the AI provider", text: "Requests are sent with storage turned off, so your data isn't kept by the AI provider." },
      { title: "Uploaded files are untrusted", text: "After reading one, tools that keep state across conversations, like memory, refuse to run." },
      { title: "Full audit trail", text: "Every action carried out through the assistant is logged: who did what, and the outcome." },
    ],
  },
  ar: {
    eyebrow: "الأمان",
    title: "مصمم لتأتمنه على عمليات حقيقية",
    items: [
      { title: "يقترح، ثم تؤكد", text: "النموذج لا يكتب من تلقاء نفسه أبداً. زر التأكيد وحده يحفظ." },
      { title: "حسب الدور", text: "للمساعد صلاحيات المستخدم المسجّل نفسها بالضبط." },
      { title: "لا شيء يُحفظ لدى مزوّد الذكاء الاصطناعي", text: "تُرسل الطلبات مع إيقاف التخزين، فلا يحتفظ مزوّد الذكاء الاصطناعي ببياناتك." },
      { title: "الملفات المرفوعة غير موثوقة", text: "بعد قراءة أي ملف، ترفض الأدوات التي تحتفظ بحالة بين المحادثات، مثل الذاكرة، أن تعمل." },
      { title: "سجل تدقيق كامل", text: "كل عملية تُنفَّذ عبر المساعد مسجّلة: من فعل ماذا، وما النتيجة." },
    ],
  },
} satisfies Record<Locale, { eyebrow: string; title: string; items: Array<{ title: string; text: string }> }>;

const icons = [MousePointerClick, KeyRound, CloudOff, FileWarning, ListChecks];

export function AiTrust({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <Section tone="dark" className="py-16 sm:py-20">
      <SectionHeading eyebrow={t.eyebrow} tone="dark" title={t.title} />
      <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5" stagger={0.06}>
        {t.items.map((item, i) => {
          const Icon = icons[i];
          return (
            <RevealItem key={item.title} className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.06] text-spark-300 ring-1 ring-inset ring-white/10">
                <Icon className="h-4.5 w-4.5" strokeWidth={1.75} />
              </span>
              <h3 className="font-display mt-4 text-[15px] font-semibold text-white">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/65">{item.text}</p>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
