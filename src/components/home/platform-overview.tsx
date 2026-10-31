import { Bot, Check, Clock, Landmark, Layers, Lock, Repeat2, Ship } from "lucide-react";
import Link from "@/components/i18n/link";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { getServices } from "@/lib/services";
import { getLocale } from "@/lib/locale-server";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const copy = {
  en: {
    eyebrow: "What ROUTEL is",
    title: "One operating system for the whole shipment",
    lead: "ROUTEL runs a shipping and logistics company on one system. One core carries every shipment from the quotation to the ledger; each service opens as a module for what your company does; an AI assistant does the daily work; and the books are written as the work happens.",
    layers: {
      ai: { label: "AI assistant", text: "Calls the system's own actions: reads, drafts, and writes after you confirm" },
      modules: { label: "Services, opened by activity", live: "Live", soon: "Next" },
      core: { label: "The core", steps: ["Quotation", "Booking", "B/L", "Invoice", "Payment", "Ledger"] },
      base: { label: "Partners · documents · e-mail · roles and permissions · tax · two currencies" },
    },
    pillars: [
      { title: "One record per shipment", text: "Quotation, booking, carrier booking, B/L, charges, invoices and documents under one booking number. One place to check, one status everyone sees." },
      { title: "Modules by activity", text: "Sea, air, LCL and import release today; NVOCC, land transport, warehousing, agency, customs and 3PL next. Each opens from Business activities and stays off until you need it." },
      { title: "An AI that does the work", text: "It reads the carrier's confirmation, the vendor's bill and the line's notice, and prepares the booking, the B/L and the invoice. Nothing is saved until a person confirms." },
      { title: "Books kept as you go", text: "Every invoice, payment and cost posts to the general ledger when it's recorded, with the country's tax and its report. Month end stops being a project." },
    ],
    outcomes: [
      { title: "No retyping", text: "Documents read by AI into the record." },
      { title: "One version of the truth", text: "Operations and finance on the same booking." },
      { title: "Control", text: "Every AI write confirmed by a person and logged." },
      { title: "Grow by activity", text: "Open a module when you add a service." },
    ],
  },
  ar: {
    eyebrow: "ما هو ROUTEL",
    title: "نظام تشغيل واحد للشحنة كلها",
    lead: "يشغّل ROUTEL شركة الشحن والخدمات اللوجستية على نظام واحد. نواة واحدة تحمل كل شحنة من عرض السعر حتى دفتر الأستاذ، وكل خدمة تُفتح وحدةً حسب نشاط شركتك، ومساعد ذكي ينجز العمل اليومي، والدفاتر تُكتب لحظة وقوع العمل.",
    layers: {
      ai: { label: "المساعد الذكي", text: "يستدعي إجراءات النظام نفسه: يقرأ ويجهّز، ويكتب بعد تأكيدك" },
      modules: { label: "الخدمات، تُفتح حسب النشاط", live: "متاحة", soon: "القادمة" },
      core: { label: "النواة", steps: ["عرض السعر", "الحجز", "البوليصة", "الفاتورة", "الدفعة", "الدفاتر"] },
      base: { label: "الشركاء · المستندات · البريد · الأدوار والصلاحيات · الضريبة · عملتان" },
    },
    pillars: [
      { title: "سجل واحد لكل شحنة", text: "عرض السعر والحجز وحجز الناقل والبوليصة والرسوم والفواتير والمستندات تحت رقم حجز واحد. مكان واحد للمراجعة، وحالة واحدة يراها الجميع." },
      { title: "وحدات حسب النشاط", text: "البحري والجوي والتجميع وإشعار الوصول اليوم، ثم NVOCC والنقل البري والمستودعات والوكالات والتخليص و3PL. كل وحدة تُفتح من الأنشطة التجارية، وتبقى مقفلة حتى تحتاجها." },
      { title: "ذكاء اصطناعي ينجز العمل", text: "يقرأ تأكيد الناقل وفاتورة المورد وإشعار الخط، ويجهّز الحجز والبوليصة والفاتورة. ولا يُحفظ شيء قبل أن يؤكده شخص." },
      { title: "دفاتر تُكتب وأنت تعمل", text: "كل فاتورة ودفعة وتكلفة تُرحَّل إلى دفتر الأستاذ لحظة تسجيلها، بضريبة الدولة وتقريرها. ونهاية الشهر لم تعد مشروعاً." },
    ],
    outcomes: [
      { title: "بلا إعادة كتابة", text: "المستندات يقرؤها الذكاء الاصطناعي إلى السجل." },
      { title: "نسخة واحدة من الحقيقة", text: "العمليات والمالية على الحجز نفسه." },
      { title: "السيطرة", text: "كل كتابة بالذكاء الاصطناعي يؤكدها شخص وتُسجَّل." },
      { title: "توسّع حسب النشاط", text: "افتح وحدة حين تضيف خدمة." },
    ],
  },
} as const;

const pillarIcons = [Ship, Layers, Bot, Landmark];
const outcomeIcons = [Repeat2, Check, Lock, Layers];

/**
 * Explains the system before the story and the comparisons: the layers
 * (assistant, modules, core, foundations) as a diagram, four pillars and
 * four outcomes. After the "one platform" sections of CargoWise and SOFT,
 * in ROUTEL's own facts.
 */
export async function PlatformOverview() {
  const locale: Locale = await getLocale();
  const t = copy[locale];
  const services = getServices(locale);
  return (
    <Section id="what-is-routel">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.lead} />

      <div className="mt-14 grid items-start gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
        {/* The layers */}
        <Reveal className="rounded-3xl bg-fog-50 p-4 ring-1 ring-fog-200 sm:p-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3 rounded-2xl bg-ink-900 p-4 text-white">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-spark-400 text-ink-950">
                <Bot className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-display text-[15px] font-bold">{t.layers.ai.label}</span>
                <span className="block text-[12.5px] leading-snug text-white/65">{t.layers.ai.text}</span>
              </span>
            </div>

            <div className="rounded-2xl bg-white p-4 ring-1 ring-fog-200">
              <p className="text-[11.5px] font-semibold uppercase tracking-[0.12em] text-fog-500">{t.layers.modules.label}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {services.map((s) => {
                  const Icon = s.icon;
                  const live = s.status === "live";
                  return (
                    <li key={s.slug}>
                      <Link
                        href={s.href}
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12.5px] font-medium transition-colors",
                          live ? "bg-spark-50 text-ink-900 ring-1 ring-spark-200 hover:bg-spark-100" : "border border-dashed border-fog-300 bg-fog-50 text-fog-600 hover:bg-fog-100",
                        )}
                      >
                        {live ? <Icon className="h-3.5 w-3.5 text-spark-600" /> : <Clock className="h-3.5 w-3.5 text-fog-400" />}
                        {s.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="rounded-2xl bg-white p-4 ring-1 ring-fog-200">
              <p className="text-[11.5px] font-semibold uppercase tracking-[0.12em] text-fog-500">{t.layers.core.label}</p>
              <ol className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
                {t.layers.core.steps.map((step, i) => (
                  <li key={step} className="relative rounded-xl bg-fog-50 px-2 py-2.5 text-center ring-1 ring-fog-100">
                    <span className="block font-display text-[11px] font-bold text-spark-600">{i + 1}</span>
                    <span className="block text-[12.5px] font-semibold text-ink-900">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-2xl border border-dashed border-fog-300 px-4 py-3 text-center text-[12.5px] font-medium text-fog-600">
              {t.layers.base.label}
            </div>
          </div>
        </Reveal>

        {/* Four pillars */}
        <RevealGroup className="grid gap-x-8 gap-y-8 sm:grid-cols-2" stagger={0.06}>
          {t.pillars.map((p, i) => {
            const Icon = pillarIcons[i];
            return (
              <RevealItem key={p.title}>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink-900 text-spark-400">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <p className="font-display mt-4 text-[17px] font-bold text-ink-900">{p.title}</p>
                <p className="mt-1.5 text-[14px] leading-relaxed text-fog-600">{p.text}</p>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>

      {/* Outcomes */}
      <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-fog-200 ring-1 ring-fog-200 sm:grid-cols-2 lg:grid-cols-4" stagger={0.05}>
        {t.outcomes.map((o, i) => {
          const Icon = outcomeIcons[i];
          return (
            <RevealItem key={o.title} className="flex items-start gap-3 bg-white p-5">
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-spark-600" />
              <span>
                <span className="block font-display text-[15px] font-bold text-ink-900">{o.title}</span>
                <span className="block text-[13px] leading-relaxed text-fog-600">{o.text}</span>
              </span>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
