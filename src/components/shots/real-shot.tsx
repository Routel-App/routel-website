import Image from "next/image";
import type { CSSProperties } from "react";
import { Maximize2 } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { screenCaption, screenOpen, screens, type ScreenName } from "@/lib/screens";
import { cn } from "@/lib/utils";

/** A region of the 1600×1000 screenshot, in its pixels, measured on the English (left-sidebar) screen. */
export type Crop = { x: number; y: number; w: number; h: number };

const SRC_W = 1600;
const SRC_H = 1000;

/**
 * The Arabic app is the English one mirrored (sidebar on the right), so the
 * same region sits at the mirrored x there.
 */
function placed(c: Crop, locale: Locale) {
  const x = locale === "ar" ? SRC_W - c.x - c.w : c.x;
  return {
    ratio: `${c.w} / ${c.h}`,
    width: `${(SRC_W / c.w) * 100}%`,
    left: `${(-x / c.w) * 100}%`,
    top: `${(-c.y / c.h) * 100}%`,
  };
}

/**
 * A real screenshot of the app, in the page's language, framed the same way
 * everywhere: rounded, a hairline border, no heavy shadow, and a small
 * caption saying it is the real screen with demo data. Lazy-loaded unless
 * `eager` (only for a picture above the fold).
 *
 * `crop` shows one region of the screen at a readable size (the main
 * content, without the sidebar) instead of the whole window shrunk to fit;
 * `cropMobile` is a tighter region for phones. A cropped screen links to the
 * whole screenshot, which opens full size.
 */
export function RealShot({
  name,
  locale,
  className,
  sizes = "(min-width: 1024px) 760px, 100vw",
  caption = true,
  eager = false,
  tone = "light",
  crop,
  cropMobile,
}: {
  name: ScreenName;
  locale: Locale;
  className?: string;
  sizes?: string;
  caption?: boolean;
  eager?: boolean;
  tone?: "light" | "dark";
  crop?: Crop;
  cropMobile?: Crop;
}) {
  const s = screens[name][locale];
  const src = `/screens/${name}-${locale}.webp`;
  const frame = cn("overflow-hidden rounded-xl border bg-white", tone === "dark" ? "border-white/15" : "border-fog-200");

  let picture;
  if (crop) {
    const d = placed(crop, locale);
    const m = placed(cropMobile ?? crop, locale);
    const vars = {
      "--shot-ar": d.ratio,
      "--shot-w": d.width,
      "--shot-l": d.left,
      "--shot-t": d.top,
      "--shot-ar-m": m.ratio,
      "--shot-w-m": m.width,
      "--shot-l-m": m.left,
      "--shot-t-m": m.top,
    } as CSSProperties;
    picture = (
      <a href={src} target="_blank" rel="noopener" className={cn(frame, "group relative block")} style={vars} aria-label={`${s.label}: ${screenOpen[locale]}`}>
        <span className="relative block aspect-[var(--shot-ar-m)] overflow-hidden sm:aspect-[var(--shot-ar)]">
          <Image
            src={src}
            alt={s.alt}
            width={SRC_W}
            height={SRC_H}
            sizes="(min-width: 1024px) 1400px, 200vw"
            loading={eager ? "eager" : "lazy"}
            className="absolute left-[var(--shot-l-m)] top-[var(--shot-t-m)] h-auto w-[var(--shot-w-m)] max-w-none sm:left-[var(--shot-l)] sm:top-[var(--shot-t)] sm:w-[var(--shot-w)]"
          />
        </span>
        <span className="absolute bottom-2.5 end-2.5 inline-flex items-center gap-1.5 rounded-full bg-ink-900/85 px-2.5 py-1 text-[11.5px] font-semibold text-white opacity-90 shadow-card transition-opacity group-hover:opacity-100">
          <Maximize2 className="h-3.5 w-3.5" />
          {screenOpen[locale]}
        </span>
      </a>
    );
  } else {
    picture = (
      <div className={frame}>
        <Image src={src} alt={s.alt} width={SRC_W} height={SRC_H} sizes={sizes} loading={eager ? "eager" : "lazy"} className="block h-auto w-full" />
      </div>
    );
  }

  return (
    <figure className={cn("min-w-0", className)}>
      {picture}
      {caption ? (
        <figcaption className={cn("mt-2.5 flex items-center gap-2 text-[12px]", tone === "dark" ? "text-white/55" : "text-fog-500")}>
          <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-spark-400" />
          <span className={cn("font-semibold", tone === "dark" ? "text-white/80" : "text-fog-700")}>{s.label}</span>
          <span aria-hidden>·</span>
          <span>{screenCaption[locale]}</span>
        </figcaption>
      ) : null}
    </figure>
  );
}
