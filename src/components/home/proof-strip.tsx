import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { site } from "@/lib/site";

const facts = [
  "Runs a working forwarder's daily operations",
  "Sea freight FCL jobs end to end",
  "Books computed live from source transactions",
  "Carrier-style House B/L generation",
  "Human-in-the-loop AI on every write action",
];

export function ProofStrip() {
  return (
    <div className="border-y border-fog-200 bg-white">
      <Container className="py-8">
        <Reveal className="flex flex-col items-center gap-5 md:flex-row md:justify-between">
          <p className="text-center text-sm text-fog-600 md:text-left">
            Built inside <span className="font-semibold text-ink-900">{site.company}</span>, a freight forwarder in Malaysia,
            and used on real shipments before it had a name.
          </p>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-medium text-fog-500 md:justify-end">
            {facts.slice(0, 3).map((f) => (
              <li key={f} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                {f}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </div>
  );
}
