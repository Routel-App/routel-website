import { cn } from "@/lib/utils";

/**
 * Routel wordmark. The mark is a route: two waypoints joined by a curve,
 * inside a rounded tile. Drawn inline so it inherits color and needs no asset.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("h-8 w-8", className)}>
      <rect width="32" height="32" rx="9" className="fill-ink-900" />
      <path
        d="M9.5 21.5c0-4.5 3-6 6.5-6s6.5-1.5 6.5-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        className="text-teal-300"
      />
      <circle cx="9.5" cy="22" r="2.6" className="fill-white" />
      <circle cx="22.5" cy="9.5" r="2.6" className="fill-teal-300" />
    </svg>
  );
}

export function Logo({ className, inverse = false }: { className?: string; inverse?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className={cn("font-display text-[19px] font-bold tracking-tight", inverse ? "text-white" : "text-ink-900")}>
        Routel
      </span>
    </span>
  );
}
