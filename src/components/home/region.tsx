import { Coins, Languages, QrCode, Receipt } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { getLocale } from "@/lib/locale-server";
import type { Locale } from "@/lib/i18n";
import { LanguageFlip } from "./language-flip";

type Card = { title: string; text: string };

type Copy = {
  eyebrow: string;
  title: string;
  lead: string;
  hint: string;
  cards: [Card, Card, Card, Card];
  countries?: Array<{ name: string; tax: string; money: string }>;
};

const copy: Record<Locale, Copy> = {
  en: {
    eyebrow: "Built for your market",
    title: "Your currency, your tax rules, your language",
    lead: "Each Routel deployment runs in its country's base currency with that country's tax, and the whole interface works in English or Arabic, right to left.",
    hint: "The same booking, both ways",
    cards: [
      { title: "Two currencies, no spreadsheets", text: "Documents use your base currency and USD. Vendor costs in USD convert at the booking's own rate, so profit is right." },
      { title: "Tax by country", text: "SST in Malaysia, PPN in Indonesia, VAT in Saudi Arabia, each with its own rates and its own tax report." },
      { title: "Saudi tax invoices", text: "A bilingual Tax Invoice (or Simplified Tax Invoice) with the ZATCA QR code once it's issued." },
      { title: "Arabic, right to left", text: "Every screen and the AI assistant work in Arabic as well as English, mirrored right to left." },
    ],
    countries: [
      { name: "Malaysia", money: "MYR + USD", tax: "SST 6%" },
      { name: "Indonesia", money: "IDR + USD", tax: "PPN 11%" },
      { name: "Saudi Arabia", money: "SAR + USD", tax: "VAT 15%" },
    ],
  },
  ar: {
    eyebrow: "مصمَّم للسوق السعودي",
    title: "بالريال، وبضريبتك، وبلغتك",
    lead: "يعمل Routel بالريال السعودي والدولار الأمريكي، وبضريبة القيمة المضافة 15%، وبواجهة عربية كاملة من اليمين إلى اليسار، مع الإنجليزية متى احتجتها.",
    hint: "الحجز نفسه باللغتين",
    cards: [
      { title: "الريال والدولار", text: "المستندات بالريال والدولار فقط، وتكاليف الموردين بالدولار تُحوَّل بسعر الحجز نفسه، فيبقى الربح صحيحاً." },
      { title: "ضريبة القيمة المضافة 15%", text: "نسبتا 15% و0% على البنود، مع تقرير ضريبة القيمة المضافة جاهز من الفواتير نفسها." },
      { title: "فاتورة ضريبية برمز QR", text: "«فاتورة ضريبية» أو «فاتورة ضريبية مبسطة» باللغتين، مع رمز QR وفق متطلبات هيئة الزكاة والضريبة والجمارك (ZATCA) بعد إصدارها." },
      { title: "عربي من اليمين إلى اليسار", text: "كل الشاشات والمساعد الذكي تعمل بالعربية كما تعمل بالإنجليزية، باتجاه من اليمين إلى اليسار." },
    ],
  },
};

const icons = [Coins, Receipt, QrCode, Languages];

export async function Region() {
  const locale = await getLocale();
  const t = copy[locale];
  return (
    <section className="relative overflow-hidden bg-ink-950 py-20 text-white sm:py-28" id="region">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="grid-fade-dark absolute inset-0" />
        <div className="absolute -bottom-40 end-0 h-[28rem] w-[28rem] rounded-full bg-spark-400/10 blur-3xl" />
      </div>
      <Container className="relative grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
        <div>
          <Reveal>
            <Eyebrow tone="dark">{t.eyebrow}</Eyebrow>
            <h2 className="font-display mt-4 text-balance text-3xl font-bold leading-[1.1] sm:text-4xl lg:text-[2.75rem]">{t.title}</h2>
            <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-white/65 sm:text-lg">{t.lead}</p>
          </Reveal>
          <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2" stagger={0.07}>
            {t.cards.map((c, i) => {
              const Icon = icons[i];
              return (
                <RevealItem key={c.title} className="rounded-2xl bg-white/[0.04] p-5 ring-1 ring-inset ring-white/10">
                  <Icon className="h-5 w-5 text-teal-300" />
                  <p className="mt-3 font-semibold">{c.title}</p>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-white/60">{c.text}</p>
                </RevealItem>
              );
            })}
          </RevealGroup>
          {t.countries ? (
            <Reveal className="mt-6 flex flex-wrap gap-2">
              {t.countries.map((c) => (
                <span key={c.name} className="inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3.5 py-1.5 text-[13px] ring-1 ring-white/10">
                  <span className="font-semibold">{c.name}</span>
                  <span className="text-white/50">{c.money}</span>
                  <span className="text-teal-300">{c.tax}</span>
                </span>
              ))}
            </Reveal>
          ) : null}
        </div>
        <Reveal delay={0.1}>
          <LanguageFlip start={locale === "ar" ? "ar" : "en"} hint={t.hint} />
        </Reveal>
      </Container>
    </section>
  );
}
