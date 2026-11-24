import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import { screenCaption, screens, type ScreenName } from "@/lib/screens";
import { cn } from "@/lib/utils";

/**
 * A real screenshot of the app, in the page's language, framed the same way
 * everywhere: rounded, a hairline border, no heavy shadow, and a small
 * caption saying it is the real screen with demo data. Lazy-loaded unless
 * `eager` (only for a picture above the fold).
 */
export function RealShot({
  name,
  locale,
  className,
  sizes = "(min-width: 1024px) 760px, 100vw",
  caption = true,
  eager = false,
  tone = "light",
}: {
  name: ScreenName;
  locale: Locale;
  className?: string;
  sizes?: string;
  caption?: boolean;
  eager?: boolean;
  tone?: "light" | "dark";
}) {
  const s = screens[name][locale];
  return (
    <figure className={cn("min-w-0", className)}>
      <div className={cn("overflow-hidden rounded-xl border bg-white", tone === "dark" ? "border-white/15" : "border-fog-200")}>
        <Image
          src={`/screens/${name}-${locale}.webp`}
          alt={s.alt}
          width={1600}
          height={1000}
          sizes={sizes}
          loading={eager ? "eager" : "lazy"}
          className="block h-auto w-full"
        />
      </div>
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
