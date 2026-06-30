"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { Reveal } from "./reveal";
import { TextReveal } from "./text-reveal";

// Defer the 770-line interactive map: its JS loads on the client, off the
// initial bundle / critical path, so it no longer blocks first paint or hogs
// the main thread during load. The pinned 250vh / h-dvh structure already
// reserves all of its space, so nothing shifts (CLS stays 0); the static
// (reduced-motion) path gets a same-height skeleton while it loads.
const NetworkMap = dynamic(
  () => import("./network-map").then((m) => m.NetworkMap),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden="true"
        className="relative mx-auto mt-6 min-h-[max(18rem,calc(100dvh-18rem))] w-full rounded-2xl border border-white/5 bg-white/[0.02]"
      />
    ),
  }
);

type NetworkRevealProps = {
  eyebrow: string;
  headline: string;
  body: string;
};

/**
 * Pinned entrance for the interactive network map — the map's "Drive moment".
 * As you scroll: the card swells from a centered miniature to fill the frame,
 * corridors fade-draw, all 33 markers cascade in west→east, then the legend
 * lights and the map is fully interactive. Reduced motion renders the plain
 * header + map.
 */
export function NetworkReveal(props: NetworkRevealProps) {
  const reduce = useReducedMotion();
  if (reduce) return <StaticNetwork {...props} />;
  return <PinnedNetwork {...props} />;
}

function StaticNetwork({ eyebrow, headline, body }: NetworkRevealProps) {
  return (
    <div className="mx-auto w-full max-w-screen-2xl px-4 py-16 md:px-8 md:py-24">
      <Reveal>
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red">
          {eyebrow}
        </p>
        <TextReveal
          as="h2"
          text={headline}
          className="mt-3 max-w-3xl font-heading text-display-sm font-extrabold tracking-tight sm:text-display-md"
        />
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-fg-muted md:text-lg">
          {body}
        </p>
      </Reveal>
      <div className="mx-auto mt-12 w-full max-w-5xl">
        <NetworkMap />
      </div>
    </div>
  );
}

function PinnedNetwork({ eyebrow, headline, body }: NetworkRevealProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    restDelta: 0.0005,
  });

  // Entrance: miniature card grows to full frame in the first ~third; the
  // cascade completes by ~0.72, leaving the rest of the pin as settled,
  // fully-interactive map time.
  const scale = useTransform(progress, [0, 0.3], [0.72, 1]);
  const headerY = useTransform(progress, [0.28, 0.55], [0, -10]);
  // The subtext sits lowest in the header; once the map swells up under it the
  // two collide. Fade the subtext out as the map grows so it never overlaps —
  // the title stays put.
  const bodyOpacity = useTransform(progress, [0.1, 0.28], [1, 0]);

  return (
    <div ref={wrapRef} className="relative h-[250vh]">
      <div className="sticky top-0 flex h-dvh flex-col overflow-hidden">
        {/* Header — compact, recedes once the map takes the frame.
            pointer-events-none: it overlays the card's legend row at some
            heights and must never swallow clicks meant for the map. */}
        <motion.div
          style={{ y: headerY }}
          className="pointer-events-none relative z-10 mx-auto w-full max-w-screen-2xl px-4 pt-24 md:px-8 md:pt-28"
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-brand-red md:text-xs md:tracking-[0.25em]">
            {eyebrow}
          </p>
          <TextReveal
            as="h2"
            text={headline}
            className="mt-2 max-w-3xl font-display text-[1.45rem] font-extrabold leading-tight tracking-tight sm:text-display-sm md:mt-3 md:text-display-md"
          />
          <motion.p
            style={{ opacity: bodyOpacity }}
            className="mt-2 max-w-2xl text-xs leading-relaxed text-fg-muted md:mt-3 md:text-sm"
          >
            {body}
          </motion.p>
        </motion.div>

        {/* The map swells to fill the frame, then populates on scroll */}
        <div className="relative z-0 flex min-h-0 flex-1 items-center px-3 pb-6 sm:px-4 md:px-6">
          <motion.div
            style={{ scale }}
            className="mx-auto w-full max-w-[100rem] origin-center will-change-transform"
          >
            <NetworkMap
              revealProgress={progress}
              frameCap="max(16rem, calc(100dvh - 29rem))"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
