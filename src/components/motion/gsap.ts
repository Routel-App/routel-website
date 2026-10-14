"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

/**
 * GSAP, registered once for the whole site. Animated components import
 * from here, not from "gsap" directly.
 *
 * House rules for motion (see CLAUDE.md, "keep motion subtle"):
 * - Content is in the server HTML in its final, readable state. Animations
 *   start from that state (gsap.from / timelines that end where the markup
 *   is), so without JavaScript nothing is missing.
 * - Wrap every timeline in `gsap.matchMedia()` with REDUCED / MOTION_OK:
 *   with prefers-reduced-motion nothing moves, the final frame stays.
 * - Loops pause off screen (ScrollTrigger toggleActions or onToggle).
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const REDUCED = "(prefers-reduced-motion: reduce)";

/** Pauses a looping timeline while its element is off screen. */
export function playWhileVisible(tl: gsap.core.Timeline, trigger: Element) {
  return ScrollTrigger.create({
    trigger,
    start: "top bottom",
    end: "bottom top",
    onToggle: (self) => (self.isActive ? tl.play() : tl.pause()),
  });
}

export { gsap, ScrollTrigger, useGSAP };
