import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { site } from "@/lib/site";

const facts = [
  "12 modules, one login",
  "MYR and USD books",
  "5 roles, enforced everywhere",
  "Sea freight FCL, end to end",
  "Live P&L with net income",
  "Carrier-style House B/L",
  "Arabic and English assistant",
  "Human confirmation on every write",
];

/**
 * Sits directly under the hero. Top padding reserves room for the mockup
 * that overhangs from the dark hero above.
 */
export function ProofStrip() {
  return (
    <div className="border-b border-fog-200 bg-white pt-36 sm:pt-48">
      <Container>
        <Reveal className="text-center">
          <p className="text-sm text-fog-600">
            Built inside <span className="font-semibold text-ink-900">{site.company}</span>, a freight forwarder in Malaysia,
            and used on real shipments before it had a name.
          </p>
        </Reveal>
      </Container>
      <div className="marquee-mask mt-6 overflow-hidden pb-8">
        <ul className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]" aria-hidden>
          {[...facts, ...facts].map((f, i) => (
            <li
              key={i}
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
