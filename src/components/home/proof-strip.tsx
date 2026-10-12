import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { getLocale } from "@/lib/locale-server";
import type { Locale } from "@/lib/i18n";

const copy = {
  en: {
    introBefore: "Built inside ",
    introStrong: "a working freight forwarder in Malaysia",
    introAfter: ", and used on real shipments before it had a name.",
    facts: [
      "19 modules, one login",
      "MYR and USD books",
      "6 roles, enforced everywhere",
      "Sea freight FCL, end to end",
      "Live P&L with net income",
      "Carrier-style House B/L",
      "Arabic and English assistant",
      "Human confirmation on every write",
    ],
  },
  ar: {
    introBefore: "بُني داخل ",
    introStrong: "شركة شحن عاملة في ماليزيا",
    introAfter: "، واستُخدم على شحنات حقيقية قبل أن يحمل اسماً.",
    facts: [
      "19 وحدة بتسجيل دخول واحد",
      "دفاتر بالـ MYR والـ USD",
      "6 أدوار مطبّقة في كل مكان",
      "شحن بحري FCL من البداية إلى النهاية",
      "P&L مباشرة مع صافي الدخل",
      "بوليصة شحن فرعية (HBL) بأسلوب شركات الملاحة",
      "مساعد بالعربية والإنجليزية",
      "تأكيد بشري على كل عملية حفظ",
    ],
  },
} satisfies Record<Locale, { introBefore: string; introStrong: string; introAfter: string; facts: string[] }>;

/**
 * Sits directly under the hero. Top padding reserves room for the mockup
 * that overhangs from the dark hero above.
 */
export async function ProofStrip() {
  const locale = await getLocale();
  const t = copy[locale];
  const facts = t.facts;
  return (
    <div className="border-b border-fog-200 bg-white pt-36 sm:pt-48">
      <Container>
        <Reveal className="text-center">
          <p className="text-sm text-fog-600">
            {t.introBefore}
            <span className="font-semibold text-ink-900">{t.introStrong}</span>
            {t.introAfter}
          </p>
        </Reveal>
      </Container>
      <div className="marquee-mask mt-6 overflow-hidden pb-8">
        <ul dir="ltr" className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]" aria-hidden>
          {[...facts, ...facts].map((f, i) => (
            <li
              key={i}
              dir={locale === "ar" ? "rtl" : undefined}
              className="flex items-center gap-2 whitespace-nowrap rounded-full border border-fog-200 bg-fog-50 px-4 py-2 text-[13px] font-medium text-fog-700"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
              {f}
            </li>
          ))}
        </ul>
        <ul className="sr-only">
          {facts.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
