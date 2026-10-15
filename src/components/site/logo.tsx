import { cn } from "@/lib/utils";

/** Brand orange from the supplied logo artwork. */
export const LOGO_ORANGE = "#F7941D";

/**
 * ROUTEL wordmark, traced from the supplied artwork (2000×333 grid, 55-unit
 * strokes). Letters use currentColor so the same mark works on light and
 * dark surfaces; the square accent above the L is always brand orange.
 */
export function Wordmark({ className, title = "Routel" }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 2000 333" role="img" aria-label={title} className={cn("h-6 w-auto", className)}>
      <g fill="currentColor">
        {/* R */}
        <rect x="0" y="0" width="279" height="55" />
        <rect x="224" y="55" width="55" height="113" />
        <rect x="0" y="168" width="279" height="54" />
        <rect x="0" y="222" width="55" height="111" />
        <polygon points="91,222 168,222 279,333 202,333" />
        {/* O */}
        <rect x="313" y="0" width="333" height="55" />
        <rect x="313" y="55" width="55" height="223" />
        <rect x="591" y="55" width="55" height="223" />
        <rect x="313" y="278" width="333" height="55" />
        {/* U */}
        <rect x="668" y="0" width="55" height="278" />
        <rect x="946" y="0" width="55" height="278" />
        <rect x="668" y="278" width="333" height="55" />
        {/* T */}
        <rect x="1023" y="0" width="385" height="55" />
        <rect x="1184" y="55" width="55" height="278" />
        {/* E */}
        <rect x="1426" y="0" width="277" height="55" />
        <rect x="1426" y="55" width="55" height="278" />
        <rect x="1426" y="139" width="228" height="55" />
        <rect x="1426" y="278" width="277" height="55" />
        {/* L */}
        <rect x="1721" y="77" width="55" height="256" />
        <rect x="1721" y="278" width="279" height="55" />
      </g>
      <rect x="1721" y="0" width="55" height="55" fill={LOGO_ORANGE} />
    </svg>
  );
}

/**
 * The icon: the L glyph with its orange accent, as supplied (234×274). The
 * glyph is currentColor so it reads on light and dark surfaces; the square
 * is always brand orange. app/icon.svg and app/apple-icon.png carry the same
 * drawing for the browser tab.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 234 274" aria-hidden="true" className={cn("h-8 w-auto", className)}>
      <rect x="0" y="0" width="69" height="69" fill={LOGO_ORANGE} />
      <g fill="currentColor">
        <rect x="0" y="69" width="69" height="205" />
        <rect x="69" y="205" width="165" height="69" />
      </g>
    </svg>
  );
}

export function Logo({ className, inverse = false }: { className?: string; inverse?: boolean }) {
  return (
    <span className={cn("inline-flex items-center", inverse ? "text-white" : "text-ink-900", className)}>
      <Wordmark className="h-[22px]" />
    </span>
  );
}
