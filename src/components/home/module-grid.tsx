"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "@/components/i18n/link";
import { cn } from "@/lib/utils";

export type GridModule = { slug: string; name: string; short: string; icon: ReactNode; area: string };
export type GridArea = { id: string; label: string };

/**
 * Every module as a compact card, with area chips to narrow the grid.
 * All cards stay in the HTML; filtering only hides the others.
 */
export function ModuleGrid({ modules, areas, allLabel }: { modules: GridModule[]; areas: GridArea[]; allLabel: string }) {
  const [area, setArea] = useState("all");
  const chips = [{ id: "all", label: allLabel }, ...areas];
  return (
    <div>
      <div role="group" className="flex flex-wrap justify-center gap-2">
        {chips.map((c) => {
          const on = c.id === area;
          const count = c.id === "all" ? modules.length : modules.filter((m) => m.area === c.id).length;
          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={on}
              onClick={() => setArea(c.id)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
                on ? "bg-ink-900 text-white" : "bg-white text-fog-700 ring-1 ring-fog-200 hover:bg-fog-50",
              )}
            >
              {c.label}
              <span className={cn("rounded-full px-1.5 text-[11px] tabular-nums", on ? "bg-white/15" : "bg-fog-100 text-fog-500")}>{count}</span>
            </button>
          );
        })}
      </div>

      <ul key={area} className="module-grid mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((m, i) => {
          const shown = area === "all" || m.area === area;
          const ai = m.slug === "ai-assistant";
          return (
            <li key={m.slug} hidden={!shown} style={{ "--i": i } as CSSProperties}>
              <Link
                href={`/platform/${m.slug}`}
                className={cn(
                  "group flex h-full items-center gap-4 rounded-2xl border bg-white p-4 transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-float",
                  ai ? "border-spark-200 hover:border-spark-300" : "border-fog-200 hover:border-fog-300",
                )}
              >
                <span
                  className={cn(
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 ring-inset transition-colors duration-300 [&_svg]:h-5 [&_svg]:w-5",
                    ai
                      ? "bg-spark-50 text-spark-600 ring-spark-200/70"
                      : "bg-spark-50 text-spark-700 ring-spark-100 group-hover:bg-ink-900 group-hover:text-spark-300 group-hover:ring-ink-900",
                  )}
                >
                  {m.icon}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-[15.5px] font-semibold text-ink-900">{m.name}</span>
                  <span className="mt-0.5 block text-[13px] leading-snug text-fog-500">{m.short}</span>
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-fog-300 transition-[color,transform] duration-300 group-hover:text-ink-900" />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
