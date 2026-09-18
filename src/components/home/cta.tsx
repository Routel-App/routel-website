import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

export function Cta() {
  return (
    <section className="pb-24 pt-6">
      <Container>
        <Reveal className="relative overflow-hidden rounded-3xl bg-ink-950 px-6 py-16 text-center text-white sm:px-12 sm:py-20">
          <div aria-hidden className="grid-fade-dark absolute inset-0" />
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-[360px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(71_188_172/0.35),transparent)]"
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-display text-balance text-3xl font-bold leading-[1.08] sm:text-4xl lg:text-5xl">
              See a real job go from quote to ledger in twenty minutes.
            </h2>
            <p className="mt-5 text-pretty text-lg text-white/70">
              We’ll walk you through Routel on your own routes and rates, and show the assistant proposing its first
              invoice.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href="/demo" variant="inverse" size="lg">
                Request a demo
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/docs" variant="inverse-ghost" size="lg">
                Browse the documentation
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
