import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { getLocale } from "@/lib/locale-server";
import type { Locale } from "@/lib/i18n";

const copy = {
  en: {
    title: "See a real booking go from quote to ledger, on your numbers.",
    points: ["Your routes and rates", "A real booking, end to end", "Live in twenty minutes"],
    demo: "Request a demo",
    docs: "Browse the docs",
  },
  ar: {
    title: "شاهد حجزاً حقيقياً ينتقل من عرض السعر إلى دفتر الأستاذ، بأرقامك أنت.",
    points: ["مساراتك وأسعارك", "حجز حقيقي من البداية إلى النهاية", "جاهز للعمل خلال عشرين دقيقة"],
    demo: "اطلب عرضاً تجريبياً",
    docs: "تصفّح التوثيق",
  },
} satisfies Record<Locale, { title: string; points: string[]; demo: string; docs: string }>;

/**
 * White card that straddles the boundary into the dark footer. The lower
 * half of this section is painted in the footer colour so the card appears
 * to sit across the seam.
 */
export async function Cta() {
  const locale = await getLocale();
  const t = copy[locale];
  return (
    <section className="relative pt-6">
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-ink-950" />
      <Container className="relative">
        <Reveal className="grid items-center gap-8 rounded-3xl border border-fog-200 bg-white p-8 shadow-float sm:p-10 lg:grid-cols-[1.4fr_auto] lg:p-12">
          <div>
            <h2 className="font-display text-balance text-2xl font-bold leading-[1.1] text-ink-900 sm:text-3xl lg:text-[2.35rem]">
              {t.title}
            </h2>
            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
              {t.points.map((p) => (
                <li key={p} className="flex items-center gap-2 text-sm text-fog-600">
                  <Check className="h-4 w-4 text-teal-600" strokeWidth={2.5} />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Button href="/demo" size="lg">
              {t.demo}
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/docs" size="lg" variant="secondary">
              {t.docs}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
