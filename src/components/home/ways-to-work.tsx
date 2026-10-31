import { Bot, FileText, Globe2, Mail, MonitorSmartphone, UserPlus } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { getLocale } from "@/lib/locale-server";
import type { Locale } from "@/lib/i18n";

const copy = {
  en: {
    eyebrow: "Ways to work",
    title: "The same records, wherever the work happens",
    lead: "Your team, your customers and your mailbox all meet the same booking: in the web app, in a chat with the assistant, in the e-mail, or on a page your customer opens without a login.",
    items: [
      { title: "The web app", text: "Every page in Arabic and English, right to left when it's Arabic, in the browser on desktop or phone." },
      { title: "A chat with the assistant", text: "Ask in a sentence, in any language; it answers from the system and acts after you confirm." },
      { title: "Your mailbox", text: "Microsoft 365 or Zoho, synced: e-mails link to their booking, and AI reads the attachments." },
      { title: "Documents from the system", text: "Booking confirmations, B/Ls and invoices as PDF, kept under the booking; arrival notices and delivery orders go out by e-mail from ROUTEL." },
      { title: "Tracking for your customers", text: "A public page: booking, B/L or container number plus the company name, and the status timeline. No login." },
      { title: "Self-service forms", text: "Public links for a credit application and for partner registration, waiting for your approval." },
    ],
  },
  ar: {
    eyebrow: "طرق العمل",
    title: "السجلات نفسها، أينما كان العمل",
    lead: "فريقك وعملاؤك وبريدك يلتقون على الحجز نفسه: في التطبيق، أو في محادثة مع المساعد، أو في البريد، أو في صفحة يفتحها عميلك دون تسجيل دخول.",
    items: [
      { title: "التطبيق على الويب", text: "كل الصفحات بالعربية والإنجليزية، من اليمين إلى اليسار بالعربية، في المتصفح على الكمبيوتر أو الجوال." },
      { title: "محادثة مع المساعد", text: "اطلب بجملة وبأي لغة، فيجيبك من النظام وينفّذ بعد تأكيدك." },
      { title: "بريدك", text: "مزامنة Microsoft 365 أو Zoho: الرسائل ترتبط بحجزها، والذكاء الاصطناعي يقرأ المرفقات." },
      { title: "مستندات من النظام", text: "تأكيدات الحجز والبوالص والفواتير بصيغة PDF محفوظة تحت الحجز، وإشعارات الوصول وأوامر التسليم تُرسل بالبريد من ROUTEL." },
      { title: "تتبّع لعملائك", text: "صفحة عامة: رقم الحجز أو البوليصة أو الحاوية مع اسم الشركة، ويظهر تسلسل الحالة. دون تسجيل دخول." },
      { title: "نماذج الخدمة الذاتية", text: "روابط عامة لطلب الائتمان ولتسجيل الشركاء، تنتظر موافقتك." },
    ],
  },
} satisfies Record<Locale, { eyebrow: string; title: string; lead: string; items: Array<{ title: string; text: string }> }>;

const icons = [MonitorSmartphone, Bot, Mail, FileText, Globe2, UserPlus];

/** How people reach ROUTEL's records, after Kpler's "data delivery to fit your operations". */
export async function WaysToWork() {
  const t = copy[await getLocale()];
  return (
    <Section tone="muted">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.lead} />
      <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
        {t.items.map((it, i) => {
          const Icon = icons[i];
          return (
            <RevealItem key={it.title} className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-fog-200">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-spark-50 text-spark-700 ring-1 ring-spark-200">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <p className="font-display mt-4 text-[16.5px] font-bold text-ink-900">{it.title}</p>
              <p className="mt-1.5 text-[14px] leading-relaxed text-fog-600">{it.text}</p>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
