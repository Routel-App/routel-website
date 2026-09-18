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
 * Square mark for favicons and tiles: the L glyph with its orange accent on
 * an ink tile.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={cn("h-8 w-8", className)}>
      <rect width="64" height="64" rx="16" className="fill-ink-900" />
      <g transform="translate(19 14) scale(0.1)">
        <rect x="0" y="0" width="70" height="70" fill={LOGO_ORANGE} />
        <rect x="0" y="100" width="70" height="260" fill="#fff" />
        <rect x="0" y="290" width="270" height="70" fill="#fff" />
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
