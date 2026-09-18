import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";
import { Reveal } from "@/components/motion/reveal";

type Tone = "light" | "muted" | "cream" | "teal" | "dark";

type SectionProps = ComponentProps<"section"> & {
  tone?: Tone;
  bleed?: boolean;
};

const toneBg: Record<Tone, string> = {
  light: "bg-white",
  muted: "bg-fog-50",
  cream: "bg-spark-50",
  teal: "bg-teal-50",
  dark: "bg-ink-950 text-white",
};

export function Section({ tone = "light", bleed = false, className, children, ...props }: SectionProps) {
  return (
    <section className={cn("relative py-20 sm:py-28", toneBg[tone], className)} {...props}>
      {bleed ? children : <Container>{children}</Container>}
    </section>
  );
}

type EyebrowTone = "teal" | "spark" | "ink" | "dark";

const eyebrowTone: Record<EyebrowTone, string> = {
  teal: "bg-teal-100 text-teal-800",
  spark: "bg-spark-100 text-spark-600",
  ink: "bg-fog-100 text-fog-700",
  dark: "bg-white/10 text-teal-200 ring-1 ring-inset ring-white/10",
};

export function Eyebrow({
  children,
  tone = "teal",
  className,
}: {
  children: ReactNode;
  tone?: EyebrowTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12.5px] font-semibold",
        eyebrowTone[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

type HeadingProps = {
  eyebrow?: string;
  eyebrowTone?: EyebrowTone;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  eyebrowTone: et,
  title,
  description,
  align = "center",
  tone = "light",
  className,
}: HeadingProps) {
  const dark = tone === "dark";
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <Eyebrow tone={et ?? (dark ? "dark" : "teal")} className="mb-4">
          {eyebrow}
        </Eyebrow>
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
