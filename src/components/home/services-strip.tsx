import Link from "@/components/i18n/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { getServices } from "@/lib/services";
import { getLocale } from "@/lib/locale-server";
import type { Locale } from "@/lib/i18n";

const copy = {
  en: { title: "One operating system for every line of the trade", all: "All solutions" },
  ar: { title: "نظام تشغيل واحد لكل أنشطة الشحن", all: "كل الحلول" },
} satisfies Record<Locale, Record<string, string>>;

/** Under the hero: the services Routel runs, each one a link. */
export async function ServicesStrip() {
  const locale = await getLocale();
  const t = copy[locale];
  const services = getServices(locale);
  return (
    <section className="border-y border-fog-200 bg-fog-50 py-12 sm:py-14">
      <Container>
        <Reveal className="flex flex-wrap items-end justify-between gap-3">
          <p className="font-display text-xl font-bold text-ink-900 sm:text-2xl">{t.title}</p>
          <Link href="/solutions" className="inline-flex items-center gap-1 text-[14px] font-semibold text-spark-700 hover:text-spark-800">
            {t.all}
            <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
          </Link>
        </Reveal>
        <RevealGroup className="mt-7 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5" stagger={0.03}>
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <RevealItem key={s.slug}>
                <Link
                  href={s.href}
                  className="flex h-full items-center gap-3 rounded-xl bg-white px-3.5 py-3 shadow-card ring-1 ring-fog-200 transition-colors hover:ring-spark-300"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink-900 text-spark-400">
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                  </span>
                  <span className="min-w-0 text-[13px] font-semibold leading-snug text-ink-900">{s.name}</span>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
