"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Delay in seconds before animation starts */
  delay?: number;
  /** Vertical offset in px (default 24) */
  y?: number;
  className?: string;
  /** Forwarded to motion.div if you need to set a tag-equivalent */
  as?: "div" | "section" | "li" | "ol" | "ul";
} & Pick<HTMLMotionProps<"div">, "id" | "role" | "aria-label">;

const EASING = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
  ...rest
}: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    const Tag = as;
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  const Comp = motion[as];

  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: EASING }}
      {...rest}
    >
      {children}
    </Comp>
  );
}
