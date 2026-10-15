"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { ArrowRight, Check } from "lucide-react";
import Link from "@/components/i18n/link";
import { cn } from "@/lib/utils";

export type TourItem = {
  id: string;
  icon: ReactNode;
  title: string;
  short: string;
  body: string;
  bullets: string[];
  href: string;
  cta: string;
  panel: ReactNode;
};

/** Seconds each tab stays before the tour moves on by itself. */
const DWELL = 8;

/**
 * The product tour's tabs. Moves to the next tab on its own while the tour
 * is on screen (paused on hover or keyboard focus, stopped for good once the
 * visitor picks a tab, never with prefers-reduced-motion). The progress bar's
 * CSS animation is the clock: its end advances the tab, so pausing it pauses
 * the tour. Every panel is in the HTML; only the active one is shown.
 */
export function TourTabs({ items, label }: { items: TourItem[]; label: string }) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [hold, setHold] = useState(false);
  const [inView, setInView] = useState(false);
  const [motionOk, setMotionOk] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const uid = useId();

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setMotionOk(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Phones: keep the active chip in view inside the scrolling row (never scrolls the page).
  useEffect(() => {
    const tab = tabs.current[active];
    const row = tab?.parentElement;
    if (!tab || !row || row.scrollWidth <= row.clientWidth) return;
    const t = tab.getBoundingClientRect();
    const r = row.getBoundingClientRect();
    if (t.left < r.left || t.right > r.right) {
      row.scrollBy({ left: t.left - r.left - (r.width - t.width) / 2, behavior: motionOk ? "smooth" : "auto" });
    }
  }, [active, motionOk]);

  const running = auto && motionOk;
  const playing = running && inView && !hold;

  function pick(i: number, focus = false) {
    setActive(i);
    setAuto(false);
    if (focus) tabs.current[i]?.focus();
  }

  function onKey(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    const rtl = document.documentElement.dir === "rtl";
    const next = { ArrowDown: 1, ArrowUp: -1, ArrowRight: rtl ? -1 : 1, ArrowLeft: rtl ? 1 : -1 } as Record<string, number>;
    if (e.key in next) {
      e.preventDefault();
      pick((i + next[e.key] + items.length) % items.length, true);
    } else if (e.key === "Home" || e.key === "End") {
      e.preventDefault();
      pick(e.key === "Home" ? 0 : items.length - 1, true);
    }
  }

  return (
    <div
      ref={root}
      className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-12"
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocusCapture={() => setHold(true)}
      onBlurCapture={() => setHold(false)}
    >
      {/* Tabs: a scrolling chip row on phones, a vertical list with the active tab opened on large screens. */}
      <div
        role="tablist"
        aria-label={label}
        aria-orientation="vertical"
        className="-mx-5 flex min-w-0 snap-x gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
      >
        {items.map((item, i) => {
          const on = i === active;
          return (
            <button
              key={item.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              id={`${uid}-tab-${i}`}
              role="tab"
              type="button"
              aria-selected={on}
              aria-controls={`${uid}-panel-${i}`}
              tabIndex={on ? 0 : -1}
              onClick={() => pick(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={cn(
                "group relative shrink-0 snap-start overflow-hidden rounded-2xl text-start transition-[background-color,box-shadow] duration-300",
                "px-4 py-3 lg:px-5 lg:py-4",
                on ? "bg-white shadow-card ring-1 ring-fog-200" : "ring-1 ring-transparent hover:bg-white/70 lg:ring-0",
              )}
            >
              <span className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 [&_svg]:h-[18px] [&_svg]:w-[18px]",
                    on ? "bg-ink-900 text-spark-300" : "bg-white text-fog-600 ring-1 ring-fog-200",
                  )}
                >
                  {item.icon}
                </span>
                <span className="min-w-0">
                  <span className={cn("block whitespace-nowrap text-[15px] font-semibold", on ? "text-ink-900" : "text-fog-700")}>{item.title}</span>
                  <span className="hidden text-[13px] text-fog-500 lg:block">{item.short}</span>
                </span>
              </span>

              {/* The opened tab's story, large screens only (phones read it under the tabs). */}
              <span
                className={cn(
                  "hidden overflow-hidden transition-[grid-template-rows,opacity] duration-500 lg:grid",
                  on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                )}
              >
                <span className="min-h-0">
                  <span className="mt-3 block text-[14px] leading-relaxed text-fog-600">{item.body}</span>
                </span>
              </span>

              {/* Progress: the clock that moves the tour on. */}
              {on && running ? (
                <span aria-hidden className="absolute inset-x-0 bottom-0 h-[3px] bg-fog-100">
                  <span
                    key={`${active}-${String(auto)}`}
                    className="block h-full origin-[left_center] bg-spark-400 rtl:origin-[right_center]"
                    style={{
                      animation: `tour-progress ${DWELL}s linear forwards`,
                      animationPlayState: playing ? "running" : "paused",
                    }}
                    onAnimationEnd={() => setActive((a) => (a + 1) % items.length)}
                  />
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      <div className="min-w-0">
        {items.map((item, i) => (
          <div
            key={item.id}
            id={`${uid}-panel-${i}`}
            role="tabpanel"
            aria-labelledby={`${uid}-tab-${i}`}
            hidden={i !== active}
            className="tour-panel"
          >
            {/* Phones and tablets: the story above the picture. */}
            <p className="mb-5 text-[15px] leading-relaxed text-fog-600 lg:hidden">{item.body}</p>
            <div className="relative overflow-hidden rounded-3xl bg-[linear-gradient(135deg,var(--color-fog-100),var(--color-spark-50))] p-3 sm:p-6 lg:p-8">
              <div aria-hidden className="grid-fade pointer-events-none absolute inset-0" />
              <div className="relative">{item.panel}</div>
            </div>
            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <ul className="grid gap-2 sm:grid-cols-3 sm:gap-4">
                {item.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-[13.5px] leading-snug text-fog-700">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-spark-500" />
                    {b}
                  </li>
                ))}
              </ul>
              <Link
                href={item.href}
                className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-spark-700 hover:text-spark-800"
              >
                {item.cta}
                <ArrowRight className="h-4 w-4 transition-transform ltr:group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
