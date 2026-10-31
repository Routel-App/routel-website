import { ArrowRight, Bot, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import Link from "@/components/i18n/link";
import { Reveal } from "@/components/motion/reveal";
import { getLocale } from "@/lib/locale-server";
import type { Locale } from "@/lib/i18n";
import { ShipSide } from "@/components/motion/sprites";

const copy = {
  en: {
    badge: "New",
    eyebrow: "Air freight, consolidation and arrival notices are live",
    title: "The Maritime & Logistics Operating System, run by AI.",
    lead: "ROUTEL brings every line of a shipping and logistics business onto one platform, from the first quotation to the general ledger. Its AI assistant automates the daily work of your company: it reads the carrier's documents, prepares bookings, waybills and invoices, and acts only when a person confirms.",
    demo: "Request a demo",
    solutions: "Explore solutions",
    trust: "Running live for freight companies in Saudi Arabia, Malaysia and Indonesia",
    statLead: "The AI assistant can run",
    statValue: "91",
    statLabel: "of the system's own actions",
    statRead: "49 read",
    statWrite: "42 write, after you confirm",
    chat: "Book 2 × 40HC Jeddah → Shanghai for Al Noor",
    chatReply: "Booking proposed · confirm to save",
  },
  ar: {
    badge: "جديد",
    eyebrow: "الشحن الجوي والتجميع وإشعارات الوصول متاحة الآن",
    title: "نظام التشغيل البحري واللوجستي، يقوده الذكاء الاصطناعي.",
    lead: "يجمع ROUTEL كل خطوط أعمال شركات الشحن والخدمات اللوجستية على منصة واحدة، من أول عرض سعر حتى دفتر الأستاذ. ومساعده الذكي يؤتمت العمل اليومي لشركتك: يقرأ مستندات الناقل، ويجهّز الحجوزات والبوالص والفواتير، ولا ينفّذ إلا بعد تأكيد شخص.",
    demo: "اطلب عرضاً تجريبياً",
    solutions: "استكشف الحلول",
    trust: "يعمل مباشرة لدى شركات شحن في السعودية وماليزيا وإندونيسيا",
    statLead: "يستطيع المساعد الذكي تنفيذ",
    statValue: "91",
    statLabel: "إجراءً من إجراءات النظام نفسه",
    statRead: "49 للقراءة",
    statWrite: "42 للكتابة، بعد تأكيدك",
    chat: "احجز 2 × 40HC من جدة إلى شنغهاي للنور",
    chatReply: "حجز مقترح · أكّد للحفظ",
  },
} satisfies Record<Locale, Record<string, string>>;

/** Greys for the other containers, so the booking's orange one is the only colour in the scene. */
const greys = ["#d9d9d6", "#bdbdb8", "#9d9d98", "#e9e9e6", "#6f6f6a", "#c9c9c5"];

/** A large, monochrome container ship with one orange container, cropped by the frame. */
function HeroScene() {
  const slots = Array.from({ length: 9 }, (_, col) =>
    [0, 1, 2, 3, 4].map((row) => ({ col, row, color: greys[(col * 3 + row * 5) % greys.length], hero: col === 5 && row === 4 })),
  ).flat();
  return (
    <svg viewBox="0 0 900 620" className="h-full w-full" aria-hidden>
      <defs>
        <pattern id="hero-dots" width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill="#bdbdb8" />
        </pattern>
        <radialGradient id="hero-globe-fade">
          <stop offset="0.5" stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </radialGradient>
        <mask id="hero-globe-mask">
          <circle cx="600" cy="250" r="300" fill="url(#hero-globe-fade)" />
        </mask>
        <linearGradient id="hero-sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#f3f3f1" />
        </linearGradient>
      </defs>
      <rect width="900" height="620" fill="url(#hero-sky)" />
      <rect width="900" height="620" fill="url(#hero-dots)" mask="url(#hero-globe-mask)" opacity="0.75" />
      {/* the trade lane */}
      <path d="M40 300 C 240 120, 520 80, 880 120" fill="none" stroke="#f7941d" strokeWidth="2" strokeDasharray="2 9" strokeLinecap="round" />
      <circle cx="880" cy="120" r="6" fill="#f7941d" />
      <circle cx="880" cy="120" r="16" fill="#f7941d" opacity="0.16" />
      <circle cx="40" cy="300" r="5" fill="#121316" />
      {/* quay crane, in grey */}
      <g fill="none" stroke="#9d9d98" strokeWidth="9" strokeLinecap="round">
        <path d="M120 600 V180 M190 600 V180 M120 300 L190 240 M120 240 L190 300 M120 420 L190 360 M120 360 L190 420" />
        <path d="M40 170 H700" strokeWidth="13" />
        <path d="M120 180 L700 170 M190 180 L40 170" strokeWidth="3" opacity="0.7" />
      </g>
      <rect x="430" y="172" width="54" height="22" rx="3" fill="#6f6f6a" />
      <line x1="457" x2="457" y1="194" y2="250" stroke="#6f6f6a" strokeWidth="3" />
      <rect x="425" y="250" width="64" height="7" rx="2" fill="#6f6f6a" />
      {/* sea */}
      <rect x="0" y="560" width="900" height="60" fill="#e9e9e6" />
      <g transform="translate(250 560) scale(1.55)">
        <ShipSide x={0} y={0} length={620} slots={slots} />
      </g>
      <path d="M0 574 q30 -7 60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0" fill="none" stroke="#c9c9c5" strokeWidth="2" />
    </svg>
  );
}

export async function Hero() {
  const locale = await getLocale();
  const t = copy[locale];
  return (
    <section className="relative overflow-hidden bg-white">
      <div aria-hidden className="grid-fade absolute inset-0" />
      <Container className="relative grid items-center gap-12 pb-16 pt-12 sm:pb-24 sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:pt-20">
        <div>
          <Reveal>
            <Link
              href="/solutions"
              className="group inline-flex items-center gap-2 rounded-full bg-fog-50 py-1.5 pe-4 ps-1.5 text-[13px] font-medium text-ink-900 ring-1 ring-inset ring-fog-200 transition-colors hover:bg-fog-100"
            >
              <span className="inline-flex items-center gap-1 rounded-full bg-spark-400 px-2.5 py-0.5 text-[11.5px] font-semibold text-ink-950">
                <Sparkles className="h-3 w-3" />
                {t.badge}
              </span>
              {t.eyebrow}
              <ArrowRight className="h-3.5 w-3.5 text-spark-600 transition-transform ltr:group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
            </Link>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="font-display mt-6 max-w-2xl text-balance text-[2.6rem] font-extrabold leading-[1.03] text-ink-900 sm:text-[3.4rem] lg:text-[4rem]">
              {t.title}
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-fog-600">{t.lead}</p>
          </Reveal>
          <Reveal delay={0.18} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/demo" size="lg" variant="inverse">
              {t.demo}
              <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
            </Button>
            <Button href="/solutions" size="lg" variant="secondary">
              {t.solutions}
            </Button>
          </Reveal>
          <Reveal delay={0.24}>
            <p className="mt-10 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-fog-500">{t.trust}</p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="relative">
          <div className="relative aspect-[900/620] w-full overflow-hidden rounded-[28px] bg-white ring-1 ring-fog-200">
            <HeroScene />
          </div>
          {/* The figure card, Kpler-style, floating over the scene's corner */}
          <div className="absolute -bottom-6 start-4 w-[230px] rounded-2xl bg-white/95 p-4 shadow-float ring-1 ring-fog-200 backdrop-blur sm:start-8 sm:w-[260px] sm:p-5">
            <p className="text-[12.5px] font-medium text-fog-600">{t.statLead}</p>
            <p className="font-display mt-1 text-5xl font-extrabold leading-none text-ink-900">{t.statValue}</p>
            <p className="mt-1.5 text-[13px] font-medium text-ink-900">{t.statLabel}</p>
            <svg viewBox="0 0 200 40" className="mt-3 h-8 w-full" aria-hidden>
              <path d="M0 34 C 30 30, 45 12, 70 18 S 110 36, 130 22 S 170 4, 200 6" fill="none" stroke="#f7941d" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M0 34 C 30 30, 45 12, 70 18 S 110 36, 130 22 S 170 4, 200 6 V40 H0 Z" fill="#f7941d" opacity="0.1" />
            </svg>
            <div className="mt-2 flex gap-3 text-[11.5px] text-fog-600">
              <span className="inline-flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-fog-400" />{t.statRead}</span>
              <span className="inline-flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-spark-500" />{t.statWrite}</span>
            </div>
          </div>
          {/* The assistant at work, top corner */}
          <div className="absolute end-3 top-4 hidden max-w-[270px] rounded-2xl bg-ink-900 p-3 text-white shadow-float sm:block sm:end-6 sm:top-6">
            <p className="flex items-start gap-2 text-[12px] leading-snug">
              <Bot className="mt-0.5 h-4 w-4 shrink-0 text-spark-400" />
              <span dir="auto">{t.chat}</span>
            </p>
            <p className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-2 py-1 text-[11px] font-semibold text-spark-200">
              <Check className="h-3 w-3" strokeWidth={3} />
              {t.chatReply}
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
