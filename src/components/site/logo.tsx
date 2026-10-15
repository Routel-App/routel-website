import { cn } from "@/lib/utils";

/** Brand colours, sampled from the supplied logo artwork. */
export const LOGO_ORANGE = "#F7941D";
/** The letters of the black logo (light surfaces) and the white logo (dark surfaces). */
export const LOGO_BLACK = "#000000";
export const LOGO_WHITE = "#E7E8E9";

/**
 * ROUTEL wordmark, traced pixel for pixel from the supplied artwork
 * (1666×273, 69-unit strokes). Letters use currentColor so the same mark
 * serves as the black logo and the white logo; the square at the top of
 * the L is always brand orange.
 */
export function Wordmark({ className, title = "Routel" }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 1666 273" role="img" aria-label={title} className={cn("h-6 w-auto", className)}>
      <g fill="currentColor">
        {/* R: open at the top left, as drawn */}
        <rect x="0" y="0" width="233" height="69" />
        <rect x="164" y="69" width="69" height="54" />
        <rect x="0" y="123" width="233" height="69" />
        <rect x="0" y="192" width="69" height="81" />
        <polygon points="75,192 172,192 253,273 156,273" />
        {/* O */}
        <rect x="276" y="0" width="273" height="69" />
        <rect x="276" y="69" width="69" height="136" />
        <rect x="480" y="69" width="69" height="136" />
        <rect x="276" y="205" width="273" height="68" />
        {/* U */}
        <rect x="572" y="0" width="69" height="205" />
        <rect x="776" y="0" width="69" height="205" />
        <rect x="572" y="205" width="273" height="68" />
        {/* T */}
        <rect x="867" y="0" width="311" height="69" />
        <rect x="985" y="69" width="69" height="204" />
        {/* E */}
        <rect x="1205" y="0" width="196" height="69" />
        <rect x="1205" y="69" width="69" height="136" />
        <rect x="1205" y="102" width="196" height="69" />
        <rect x="1205" y="205" width="196" height="68" />
        {/* L */}
        <rect x="1432" y="69" width="69" height="204" />
        <rect x="1432" y="205" width="233" height="68" />
      </g>
      <rect x="1432" y="0" width="69" height="69" fill={LOGO_ORANGE} />
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

/** The logo: black letters on light surfaces, the white logo's letters on dark ones. */
export function Logo({ className, inverse = false }: { className?: string; inverse?: boolean }) {
  return (
    <span className={cn("inline-flex items-center", className)} style={{ color: inverse ? LOGO_WHITE : LOGO_BLACK }}>
      <Wordmark className="h-[22px]" />
    </span>
  );
}
