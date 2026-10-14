"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

/**
 * Scroll reveals, done in CSS (globals.css, "Reveal").
 *
 * The server renders content fully visible. The inline script in the root
 * layout adds `js` to <html> before first paint, and only then are
 * [data-reveal] elements held back until an IntersectionObserver marks them
 * `is-in`. So a page without JavaScript, a crawler or a link preview always
 * sees the whole page; prefers-reduced-motion skips the motion entirely; and
 * if the scripts never run, a CSS failsafe shows everything after 3.5s.
 */

const observers = new Map<number, IntersectionObserver>();

function observerFor(amount: number) {
  document.documentElement.classList.add("reveal-ready");
  let io = observers.get(amount);
  if (!io) {
    io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-in");
          io!.unobserve(e.target);
        }
      },
      { threshold: amount, rootMargin: "0px 0px -6% 0px" },
    );
    observers.set(amount, io);
  }
  return io;
}

function useRevealRef<T extends HTMLElement>(amount: number) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-in");
      return;
    }
    const io = observerFor(amount);
    io.observe(el);
    return () => io.unobserve(el);
  }, [amount]);
  return ref;
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds to wait once in view. */
  delay?: number;
  /** Trigger once this share of the element is in view (0..1). */
  amount?: number;
};

/** Fades and lifts children into view the first time they scroll on screen. */
export function Reveal({ children, className, delay = 0, amount = 0.2 }: RevealProps) {
  const ref = useRevealRef<HTMLDivElement>(amount);
  const style = delay ? ({ "--reveal-delay": `${Math.round(delay * 1000)}ms` } as CSSProperties) : undefined;
  return (
    <div ref={ref} data-reveal="" className={className} style={style}>
      {children}
    </div>
  );
}

type GroupProps = {
  children: ReactNode;
  className?: string;
  /** Seconds between consecutive <RevealItem> children. */
  stagger?: number;
  amount?: number;
};

/** Staggers the reveal of each direct <RevealItem> child. */
export function RevealGroup({ children, className, stagger = 0.08, amount = 0.15 }: GroupProps) {
  const ref = useRevealRef<HTMLDivElement>(amount);
  let i = 0;
  const items = Children.map(children, (child) => {
    if (!isValidElement(child) || child.type !== RevealItem) return child;
    const index = i++;
    return cloneElement(child as ReactElement<ItemProps>, { __delayMs: Math.round(index * stagger * 1000) + 50 });
  });
  return (
    <div ref={ref} data-reveal-group="" className={className}>
      {items}
    </div>
  );
}

type ItemProps = { children: ReactNode; className?: string; __delayMs?: number };

export function RevealItem({ children, className, __delayMs = 0 }: ItemProps) {
  return (
    <div
      data-reveal-item=""
      className={cn(className)}
      style={{ "--reveal-delay": `${__delayMs}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

/**
 * Plays a shot's [data-step] parts in order (each sets its own --step) the
 * first time it scrolls into view, e.g. the assistant chat: request, tool
 * calls, then the proposal. The wrapper itself doesn't move. Same rules as
 * Reveal: visible without JS, static with prefers-reduced-motion.
 */
export function Replay({ children, className, amount = 0.35 }: { children: ReactNode; className?: string; amount?: number }) {
  const ref = useRevealRef<HTMLDivElement>(amount);
  return (
    <div ref={ref} data-replay="" className={className}>
      {children}
    </div>
  );
}
