"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { Reveal } from "./reveal";
import { TextReveal } from "./text-reveal";
import { cn } from "@/lib/utils";

type Stage = {
  n: string;
  title: string;
  body: string;
};

type BorderJourneyProps = {
  eyebrow: string;
  headline: string;
  body: string;
  stages: readonly Stage[];
};

/**
 * Scroll-driven freight journey. A brand-gradient rail draws itself as the
 * visitor scrolls, a glowing tracker rides its tip, and each stage card
 * reveals from alternating sides (desktop) along the line.
 */
export function BorderJourney({
  eyebrow,
  headline,
  body,
  stages,
}: BorderJourneyProps) {
  const railRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 0.75", "end 0.55"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });
  const tipTop = useTransform(progress, (v) => `${Math.min(v, 1) * 100}%`);

  return (
    <section className="grain relative isolate overflow-hidden bg-brand-indigo py-16 text-white md:py-24 lg:py-32">
      {/* Backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 opacity-[0.18]" />
        <div className="animate-aurora absolute -right-24 top-10 h-[26rem] w-[26rem] rounded-full bg-brand-red/15 blur-3xl" />
        <div className="animate-float-slow absolute -left-24 bottom-10 h-[24rem] w-[24rem] rounded-full bg-[#3a2f6b]/45 blur-3xl" />
        <div className="grain-layer absolute inset-0 opacity-[0.05] mix-blend-overlay" />
      </div>

      <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red-bright">
            {eyebrow}
          </p>
          <TextReveal
            as="h2"
            text={headline}
            className="mt-3 font-heading text-display-sm font-extrabold tracking-tight sm:text-display-md"
          />
          <p className="mt-5 text-base leading-relaxed text-fg-subtle md:text-lg">
            {body}
          </p>
        </Reveal>

        <div className="relative mx-auto mt-16 max-w-5xl md:mt-20">
          {/* Static rail */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-4 top-0 w-px bg-white/10 md:left-1/2 md:-translate-x-1/2"
          />
          {/* Drawn progress rail */}
          <motion.div
            aria-hidden="true"
            style={{ scaleY: reduce ? 1 : progress }}
            className="absolute bottom-0 left-4 top-0 w-px origin-top bg-gradient-to-b from-brand-red via-[#ff8a6e] to-brand-red md:left-1/2 md:-translate-x-1/2"
          />
          {/* Tracker tip */}
          {!reduce && (
            <motion.div
              aria-hidden="true"
              style={{ top: tipTop }}
              className="absolute left-4 z-10 -translate-x-1/2 -translate-y-1/2 md:left-1/2"
            >
              <span className="relative flex h-4 w-4">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red opacity-60" />
                <span className="relative inline-flex h-4 w-4 rounded-full bg-brand-red shadow-[0_0_18px_4px_rgba(228,67,46,0.55)]" />
              </span>
            </motion.div>
          )}

          <ol ref={railRef} className="space-y-10 md:space-y-20">
            {stages.map((stage, i) => {
              const left = i % 2 === 0;
              return (
                <li key={stage.n} className="relative pl-11 md:pl-0">
                  {/* Node dot on the rail */}
                  <motion.span
                    aria-hidden="true"
                    initial={reduce ? false : { scale: 0.4, opacity: 0.35 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.7 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-4 top-7 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-brand-red bg-brand-indigo md:left-1/2"
                  />
                  <div
                    className={cn(
                      "md:w-[calc(50%-3.5rem)]",
                      left ? "" : "md:ml-auto"
                    )}
                  >
                    <Reveal
                      variant={left ? "right" : "left"}
                      y={36}
                      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm transition-colors duration-300 hover:border-brand-red/40 sm:p-7 md:p-8"
                    >
                      <span className="font-display text-sm font-extrabold tracking-[0.3em] text-brand-red-bright">
                        {stage.n}
                      </span>
                      <h3 className="mt-3 font-heading text-xl font-extrabold tracking-tight md:text-2xl">
                        {stage.title}
                      </h3>
                      <p className="mt-3 leading-relaxed text-fg-subtle">
                        {stage.body}
                      </p>
                      {/* Hover hairline */}
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-red/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      />
                    </Reveal>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
