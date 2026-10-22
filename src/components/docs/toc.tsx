"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type TocItem = { id: string; text: string };

/**
 * "On this page": the page's sections, with the one being read highlighted.
 * Rendered as a sticky column on wide screens; the doc page also shows the
 * same list folded under the title on narrower ones.
 */
export function Toc({ items, label }: { items: TocItem[]; label: string }) {
  const [active, setActive] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    if (els.length === 0) return;
    const onScroll = () => {
      // The last heading that has passed the reading line (just under the sticky bars).
      const line = 140;
      let current = els[0].id;
      for (const el of els) {
        if (el.getBoundingClientRect().top - line <= 0) current = el.id;
        else break;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  if (items.length < 2) return null;
  return (
    <nav aria-label={label} className="text-[13px]">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-fog-500">{label}</p>
      <ul className="space-y-0.5 border-s border-fog-200">
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              className={cn(
                "-ms-px block border-s-2 py-1 ps-3 transition-colors",
                active === i.id ? "border-spark-500 font-semibold text-ink-900" : "border-transparent text-fog-600 hover:text-ink-900",
              )}
            >
              {i.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
