import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * Window chrome shared by the marketing "screenshots" in this folder. These
 * are stylised illustrations, not captures of the real app: simplified on
 * purpose, with illustrative data — Saudi on the Arabic site, Malaysian /
 * Indonesian on the English one.
 */
export function ShotFrame({
  locale,
  tone = "light",
  url = "app.routel.app",
  className,
  children,
}: {
  locale: Locale;
  tone?: "light" | "dark";
  url?: string;
  className?: string;
  children: ReactNode;
}) {
  const dark = tone === "dark";
  return (
    <div
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={cn(
        "min-w-0 max-w-full overflow-hidden rounded-2xl border shadow-float",
        dark ? "border-white/10 bg-ink-900 text-white" : "border-fog-200 bg-white text-ink-900",
        className,
      )}
    >
      <div
        dir="ltr"
        className={cn(
          "flex items-center gap-3 border-b px-4 py-2.5",
          dark ? "border-white/10 bg-white/[0.03]" : "border-fog-200 bg-fog-50",
        )}
      >
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className={cn("h-2.5 w-2.5 rounded-full", dark ? "bg-white/15" : "bg-fog-300")} />
          ))}
        </div>
        <span
          className={cn(
            "mx-auto rounded-md px-3 py-0.5 font-mono text-[11px]",
            dark ? "bg-white/[0.06] text-white/50" : "bg-white text-fog-500 ring-1 ring-fog-200",
          )}
        >
          {url}
        </span>
      </div>
      {children}
    </div>
  );
}

/** Keeps a run of left-to-right text (amounts, codes, percentages) intact inside Arabic. */
export function Ltr({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <bdi dir="ltr" className={className}>
      {children}
    </bdi>
  );
}

export const arrowFor = (locale: Locale) => (locale === "ar" ? "←" : "→");
