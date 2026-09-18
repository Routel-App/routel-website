import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "inverse" | "inverse-ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[background-color,color,box-shadow,transform] duration-200 ease-out select-none disabled:opacity-60 disabled:pointer-events-none active:translate-y-px";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink-900 text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.08)] hover:bg-ink-800 hover:shadow-float",
  secondary:
    "bg-white text-ink-900 ring-1 ring-fog-200 hover:ring-fog-300 hover:bg-fog-50 shadow-card",
  ghost: "text-ink-900 hover:bg-fog-100",
  inverse:
    "bg-teal-400 text-ink-950 hover:bg-teal-300 shadow-[0_0_0_1px_rgb(255_255_255/0.06),0_12px_32px_-12px_rgb(71_188_172/0.6)]",
  "inverse-ghost": "text-white/90 ring-1 ring-white/15 hover:bg-white/10 hover:ring-white/25",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[15px]",
};

type StyleProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type LinkButtonProps = StyleProps & { href: string } & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;
type NativeButtonProps = StyleProps & { href?: undefined } & Omit<ComponentProps<"button">, "className" | "children">;

export type ButtonProps = LinkButtonProps | NativeButtonProps;

function classesFor({ variant = "primary", size = "md", className }: StyleProps) {
  return cn(base, variants[variant], sizes[size], className);
}

export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { variant, size, className, children, href, ...rest } = props;
    return (
      <Link href={href} className={classesFor({ variant, size, className, children })} {...rest}>
        {children}
      </Link>
    );
  }
  const { variant, size, className, children, type = "button", ...rest } = props;
  return (
    <button type={type} className={classesFor({ variant, size, className, children })} {...rest}>
      {children}
    </button>
  );
}
