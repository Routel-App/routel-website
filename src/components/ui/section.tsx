import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";
import { Reveal } from "@/components/motion/reveal";

type SectionProps = ComponentProps<"section"> & {
  /** Dark "ink" surface. */
  tone?: "light" | "muted" | "dark";
  bleed?: boolean;
};

export function Section({ tone = "light", bleed = false, className, children, ...props }: SectionProps) {
  return (
    <section
      className={cn(
        "relative py-20 sm:py-28",
        tone === "muted" && "bg-fog-50",
        tone === "dark" && "bg-ink-950 text-white",
        className,
      )}
      {...props}
    >
      {bleed ? children : <Container>{children}</Container>}
    </section>
  );
}

type HeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
};

export function SectionHeading({ eyebrow, title, description, align = "center", tone = "light", className }: HeadingProps) {
  const dark = tone === "dark";
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p
          className={cn(
            "mb-3 text-[13px] font-semibold uppercase tracking-[0.14em]",
            dark ? "text-teal-300" : "text-teal-600",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "font-display text-balance text-3xl font-bold leading-[1.08] sm:text-4xl lg:text-[2.75rem]",
          dark ? "text-white" : "text-ink-900",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className={cn("mt-4 text-pretty text-base leading-relaxed sm:text-lg", dark ? "text-white/70" : "text-fog-600")}>
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-fog-200 bg-white px-3 py-1 text-xs font-medium text-fog-700 shadow-card",
        className,
      )}
    >
      {children}
    </span>
  );
}
