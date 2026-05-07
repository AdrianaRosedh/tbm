"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";

type StatCounterProps = {
  /** e.g. "1,200+" or "25,000+" — digits + optional suffix */
  value: string;
  label: string;
};

/**
 * Parses "1,200+" → { target: 1200, suffix: "+" }
 * Parses "25,000" → { target: 25000, suffix: "" }
 */
function parseValue(value: string) {
  const match = value.match(/^([\d,.]+)(.*)$/);
  if (!match) return { target: 0, suffix: value };
  return {
    target: parseFloat(match[1].replace(/,/g, "")),
    suffix: match[2] ?? "",
  };
}

export function StatCounter({ value, label }: StatCounterProps) {
  const { target, suffix } = parseValue(value);
  const reduce = useReducedMotion();

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 70, damping: 25, mass: 1 });
  const display = useTransform(spring, (latest) =>
    Math.round(latest).toLocaleString() + suffix
  );

  useEffect(() => {
    if (inView) mv.set(target);
  }, [inView, target, mv]);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center gap-1.5 px-2 py-1 text-center sm:gap-2 sm:px-4 sm:py-0"
    >
      <p className="font-display text-2xl font-bold tabular-nums tracking-tight text-brand-red sm:text-display-sm md:text-display-md">
        {reduce ? value : <motion.span>{display}</motion.span>}
      </p>
      <p className="text-[10px] uppercase tracking-widest text-fg-subtle sm:text-xs">
        {label}
      </p>
    </div>
  );
}
