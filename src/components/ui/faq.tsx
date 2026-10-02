import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export type FaqItem = { q: string; a: string };

export function Faq({ items, className }: { items: FaqItem[]; className?: string }) {
  return (
    <Reveal className={cn("mx-auto grid max-w-4xl gap-x-10 gap-y-8 sm:grid-cols-2", className)}>
      {items.map((f) => (
        <div key={f.q}>
          <h3 className="font-display text-[16px] font-semibold text-ink-900">{f.q}</h3>
          <p className="mt-2 text-sm leading-relaxed text-fog-600">{f.a}</p>
        </div>
      ))}
    </Reveal>
  );
}
