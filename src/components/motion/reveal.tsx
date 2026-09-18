"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ComponentProps, ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay },
  }),
};

type RevealProps = Omit<ComponentProps<typeof motion.div>, "children"> & {
  children: ReactNode;
  delay?: number;
  /** Trigger once the element is this far into view (0..1). */
  amount?: number;
};

/**
 * Fades and lifts children into view the first time they scroll on screen.
 * Small, quick and respectful of prefers-reduced-motion.
 */
export function Reveal({ children, delay = 0, amount = 0.25, ...rest }: RevealProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={rest.className}>{children}</div>;
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={revealVariants}
      custom={delay}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

const groupVariants: Variants = {
  hidden: {},
  visible: (stagger: number = 0.08) => ({ transition: { staggerChildren: stagger, delayChildren: 0.05 } }),
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

type GroupProps = Omit<ComponentProps<typeof motion.div>, "children"> & {
  children: ReactNode;
  stagger?: number;
  amount?: number;
};

/** Staggers the reveal of each direct <RevealItem> child. */
export function RevealGroup({ children, stagger = 0.08, amount = 0.2, ...rest }: GroupProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={rest.className}>{children}</div>;
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={groupVariants}
      custom={stagger}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, ...rest }: Omit<ComponentProps<typeof motion.div>, "children"> & { children: ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={rest.className}>{children}</div>;
  return (
    <motion.div variants={itemVariants} {...rest}>
      {children}
    </motion.div>
  );
}
