import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { HeroMockup } from "./hero-mockup";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="grid-fade absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(71_188_172/0.18),transparent)]"
      />

      <Container className="grid items-center gap-14 pb-24 pt-14 sm:pt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pb-32 lg:pt-24">
        <div className="max-w-xl">
          <Reveal>
            <Eyebrow>
              <Sparkles className="h-3.5 w-3.5 text-spark-500" />
              Now with an AI assistant that speaks Arabic and English
            </Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display mt-6 text-balance text-[2.6rem] font-extrabold leading-[1.02] text-ink-900 sm:text-6xl lg:text-[4.1rem]">
              Run your freight forwarding business from one place.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-fog-600">
              Routel takes a job from quotation to booking, Bill of Lading, invoice and live P&amp;L, with every number
              flowing into books that stay current on their own. No journal entries, no spreadsheets on the side.
            </p>
          </Reveal>
          <Reveal delay={0.24} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/demo" size="lg">
              Request a demo
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/docs" size="lg" variant="secondary">
              Read the docs
            </Button>
          </Reveal>
          <Reveal delay={0.32}>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-fog-200 pt-6">
              {[
                ["12", "modules, one login"],
                ["MYR · USD", "multi-currency books"],
                ["5", "roles, enforced everywhere"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="font-display text-xl font-bold text-ink-900">{v}</dt>
                  <dd className="mt-0.5 text-xs leading-snug text-fog-500">{l}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="relative mb-14 lg:mb-8 lg:pl-6">
          <HeroMockup />
        </div>
      </Container>
    </section>
  );
}
