"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from "motion/react";
import { BorderJourney } from "./border-journey";
import { cn } from "@/lib/utils";

type Stage = { n: string; title: string; body: string };

type TheDriveProps = {
  eyebrow: string;
  headline: string;
  body: string;
  stages: readonly Stage[];
};

/** vw offset of the first billboard inside the world */
const WORLD_PAD = 60;
/** where the parked truck sits, vw from the left */
const TRUCK_X = 12;

/**
 * "The Drive" — a pinned, scroll-driven cinematic. TBM's rig holds the road
 * while the world drives past: parallax mesas, a streaming lane line, the
 * five journey stages as roadside billboards, and a flag-hung border gate
 * between stages 03 and 04. Wheels roll with scroll; speed-lines breathe
 * with scroll velocity. Reduced motion falls back to the vertical journey.
 */
export function TheDrive(props: TheDriveProps) {
  // The pinned scroll cinematic is heavy main-thread work (scroll listeners +
  // per-frame transforms), so it runs only on tablet/desktop with motion
  // enabled. Phones and reduced-motion users get the lighter — but still
  // cinematic — vertical journey. SSR renders the fallback (no mobile CLS);
  // the full scene mounts post-hydration on desktop only.
  const [full, setFull] = useState(false);
  useEffect(() => {
    const decide = () =>
      setFull(
        window.matchMedia("(min-width: 768px)").matches &&
          !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    decide();
    const mq = window.matchMedia("(min-width: 768px)");
    mq.addEventListener("change", decide);
    return () => mq.removeEventListener("change", decide);
  }, []);
  return full ? <DriveScene {...props} /> : <BorderJourney {...props} />;
}

function DriveScene({ eyebrow, headline, body, stages }: TheDriveProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  // Phones: slightly shorter ride per stage, and the active card parks
  // dead-center (10vw); desktop centers wider cards at 33vw.
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  const perStage = isMobile ? 68 : 78;
  const cardTarget = isMobile ? 10 : 33;
  // Billboard spacing must exceed card width (86vw on phones), or adjacent
  // cards physically overlap: one full screen per stage on mobile.
  const spacing = isMobile ? 100 : 72;

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    restDelta: 0.0005,
  });

  // Choreography: when stage i is active (p = i/(n-1)), its card sits exactly
  // at `cardTarget` vw from the left — centered on phones, balanced on desktop.
  const worldX = useTransform(
    progress,
    (v) =>
      `${cardTarget - WORLD_PAD - v * (stages.length - 1) * spacing}vw`
  );
  const midX = useTransform(progress, (v) => `${-v * 26}vw`);
  const farX = useTransform(progress, (v) => `${-v * 9}vw`);
  const dashOffset = useTransform(progress, (v) => -v * 3200);
  const wheelRotate = useTransform(progress, (v) => v * 2880);

  // Drive in from off-screen, drive off at the end.
  const truckX = useTransform(
    progress,
    [0, 0.055, 0.94, 1],
    ["-58vw", `${TRUCK_X}vw`, `${TRUCK_X}vw`, "118vw"]
  );

  // Speed-lines pulse with scroll velocity.
  const velocity = useVelocity(progress);
  const speedRaw = useTransform(velocity, (v) =>
    Math.min(Math.abs(v) * 5, 1)
  );
  const speed = useSpring(speedRaw, { stiffness: 200, damping: 40 });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(
      stages.length - 1,
      Math.max(0, Math.round(v * (stages.length - 1)))
    );
    setActive(idx);
  });

  // Border gate sits between stages 03 and 04.
  const gateLeft = WORLD_PAD + 2.5 * spacing;

  return (
    <section
      ref={wrapRef}
      aria-label={headline}
      style={{ height: `${100 + stages.length * perStage}vh` }}
      className="relative bg-brand-indigo"
    >
      <div className="sticky top-0 flex h-dvh flex-col overflow-hidden text-white">
        {/* Sky */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-indigo-deep via-brand-indigo to-brand-indigo" />
          <div className="bg-grid absolute inset-0 opacity-[0.14]" />
          <div className="animate-aurora absolute -left-24 top-8 h-96 w-96 rounded-full bg-brand-red/15 blur-3xl" />
          <div className="animate-float-slow absolute right-0 top-1/4 h-80 w-80 rounded-full bg-[#3a2f6b]/45 blur-3xl" />
          <div className="grain-layer absolute inset-0 opacity-[0.05] mix-blend-overlay" />
        </div>

        {/* Header — same words, new stage */}
        <div className="relative z-10 mx-auto w-full max-w-screen-2xl px-4 pt-16 md:px-8 md:pt-20">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-brand-red-bright md:text-xs md:tracking-[0.25em]">
            {eyebrow}
          </p>
          <h2 className="mt-2 max-w-2xl font-display text-[1.45rem] font-extrabold leading-tight tracking-tight sm:text-display-sm md:mt-3 md:text-display-md">
            {headline}
          </h2>
          <p className="mt-2 max-w-xl text-xs leading-relaxed text-fg-subtle md:mt-3 md:text-sm lg:max-w-2xl">
            {body}
          </p>

          {/* Route ticks */}
          <div className="mt-4 flex items-center gap-0 md:mt-6">
            {stages.map((s, i) => (
              <div key={s.n} className="flex items-center">
                <span
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full border transition-all duration-500 md:h-9 md:w-9",
                    i <= active
                      ? "border-brand-red bg-brand-red text-white shadow-[0_0_14px_2px_rgba(228,67,46,0.45)]"
                      : "border-white/20 bg-transparent"
                  )}
                >
                  {i <= active && <Check className="h-3.5 w-3.5 md:h-4 md:w-4" strokeWidth={3} />}
                </span>
                {i < stages.length - 1 && (
                  <span className="relative mx-1 h-px w-6 overflow-hidden rounded-full bg-white/15 sm:w-10 md:w-14">
                    <span
                      className={cn(
                        "absolute inset-y-0 left-0 rounded-full bg-brand-red transition-all duration-500",
                        i < active ? "w-full" : "w-0"
                      )}
                    />
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Scene */}
        <div className="relative z-0 min-h-0 flex-1">
          {/* Far mesas */}
          <motion.div
            aria-hidden="true"
            style={{ x: farX }}
            className="absolute bottom-[118px] left-0 flex h-40 w-[300vw] opacity-50 md:h-56"
          >
            {[0, 1, 2].map((k) => (
              <MesaStrip key={k} className="h-full w-1/3 shrink-0 text-[#241d4d]" />
            ))}
          </motion.div>
          {/* Mid ridges */}
          <motion.div
            aria-hidden="true"
            style={{ x: midX }}
            className="absolute bottom-[112px] left-0 flex h-28 w-[400vw] opacity-80 md:h-40"
          >
            {[0, 1, 2, 3].map((k) => (
              <MesaStrip
                key={k}
                variant="mid"
                className="h-full w-1/4 shrink-0 text-[#1a1440]"
              />
            ))}
          </motion.div>

          {/* World: billboards + border gate */}
          <motion.div
            style={{ x: worldX }}
            className="absolute inset-y-0 left-0 w-[600vw]"
          >
            {/* Border gate between 03 and 04 */}
            <div
              aria-hidden="true"
              className="absolute bottom-[110px]"
              style={{ left: `${gateLeft}vw` }}
            >
              <BorderGate />
            </div>

            {stages.map((stage, i) => (
              <div
                key={stage.n}
                className="absolute top-[38%] w-[min(360px,86vw)] -translate-y-1/2 md:top-4 md:w-[min(400px,30vw)] md:translate-y-0 [@media(max-height:820px)]:md:w-[min(360px,26vw)]"
                style={{ left: `${WORLD_PAD + i * spacing}vw` }}
              >
                {/* Gantry hanger (desktop) — cards hang overhead, truck owns the road */}
                <div
                  aria-hidden="true"
                  className="absolute -top-3 left-1/2 hidden h-3 w-1 -translate-x-1/2 bg-[#0d0a24] ring-1 ring-white/10 md:block"
                />
                <div
                  className={cn(
                    "rounded-2xl border bg-brand-indigo-deep/80 p-5 backdrop-blur-md transition-all duration-500",
                    i === active
                      ? "border-brand-red/50 shadow-[0_18px_50px_-12px_rgba(228,67,46,0.35)]"
                      : "border-white/10"
                  )}
                >
                  <div className="mb-[14px] flex items-center gap-3">
                    <span
                      className="shrink-0 text-[11px] text-brand-red-bright md:text-xs"
                      style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400 }}
                    >
                      {["I", "II", "III", "IV", "V", "VI"][i]}
                    </span>
                    <hr className="flex-1 border-t-[0.5px] border-white/20" />
                  </div>
                  <h3 className="mt-2 font-display text-lg font-extrabold tracking-tight md:text-xl">
                    {stage.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-fg-subtle md:text-sm">
                    {stage.body}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Speed lines */}
          <motion.div
            aria-hidden="true"
            style={{ opacity: speed }}
            className="absolute bottom-[150px] left-[2vw] flex w-[34vw] flex-col gap-3 md:bottom-[170px]"
          >
            <span className="h-0.5 w-3/4 rounded-full bg-gradient-to-l from-white/35 to-transparent" />
            <span className="ml-6 h-0.5 w-2/3 rounded-full bg-gradient-to-l from-white/25 to-transparent" />
            <span className="h-0.5 w-1/2 rounded-full bg-gradient-to-l from-white/15 to-transparent" />
          </motion.div>

          {/* The rig */}
          <motion.div
            style={{ x: truckX }}
            className="absolute bottom-[104px] left-0 w-[min(80vw,440px)] md:w-[min(38vw,520px)] [@media(max-height:820px)]:md:w-[min(32vw,440px)]"
          >
            <TruckSVG wheelRotate={wheelRotate} />
          </motion.div>

          {/* Road */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[110px] bg-[#0c0a20]"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-white/20" />
            <svg
              className="absolute inset-x-0 top-1/2 h-2 w-full -translate-y-1/2"
              preserveAspectRatio="none"
              viewBox="0 0 1000 4"
            >
              <motion.line
                x1="0"
                y1="2"
                x2="1000"
                y2="2"
                stroke="rgba(255,255,255,0.32)"
                strokeWidth="1.6"
                strokeDasharray="16 22"
                style={{ strokeDashoffset: dashOffset }}
              />
            </svg>
            <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-b from-transparent to-black/40" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */

function MesaStrip({
  className,
  variant = "far",
}: {
  className?: string;
  variant?: "far" | "mid";
}) {
  const d =
    variant === "far"
      ? "M0 160 L60 90 L130 130 L210 60 L300 140 L380 100 L470 150 L560 80 L650 135 L740 95 L830 150 L920 70 L1000 140 L1000 160 Z"
      : "M0 160 L80 120 L160 150 L260 105 L340 150 L450 115 L540 155 L640 110 L730 150 L840 120 L920 155 L1000 125 L1000 160 Z";
  return (
    <svg
      viewBox="0 0 1000 160"
      preserveAspectRatio="none"
      className={className}
    >
      <path d={d} fill="currentColor" />
    </svg>
  );
}

function BorderGate() {
  return (
    <div className="relative flex h-44 w-[280px] items-end justify-center md:h-56 md:w-[360px]">
      {/* posts */}
      <div className="absolute bottom-0 left-2 h-full w-3 rounded-t bg-[#0d0a24] ring-1 ring-white/10" />
      <div className="absolute bottom-0 right-2 h-full w-3 rounded-t bg-[#0d0a24] ring-1 ring-white/10" />
      {/* beam */}
      <div className="absolute left-0 right-0 top-0 h-10 rounded-lg border border-white/10 bg-brand-indigo-deep/90 shadow-lg md:h-12">
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-brand-red via-[#ff8a6e] to-brand-red" />
        <div className="flex h-full items-center justify-center gap-4 md:gap-6">
          <Image
            src="/brand/eua-flag-tbm.jpg"
            alt=""
            width={28}
            height={16}
            className="h-4 w-7 rounded-[2px] object-cover ring-1 ring-white/20 md:h-5 md:w-8"
          />
          <span className="h-2 w-2 rounded-full bg-brand-red" />
          <Image
            src="/brand/mx-flag-tbm.jpg"
            alt=""
            width={28}
            height={16}
            className="h-4 w-7 rounded-[2px] object-cover ring-1 ring-white/20 md:h-5 md:w-8"
          />
        </div>
      </div>
      {/* hanging stripes */}
      <div className="absolute left-1/2 top-10 h-12 w-px -translate-x-1/2 bg-white/15 md:top-12" />
    </div>
  );
}

function Wheel({
  cx,
  cy,
  r,
  rotate,
}: {
  cx: number;
  cy: number;
  r: number;
  rotate: MotionValue<number>;
}) {
  return (
    <motion.g
      style={{ rotate, transformBox: "fill-box", transformOrigin: "center" }}
    >
      <circle cx={cx} cy={cy} r={r} fill="#14121f" />
      <circle cx={cx} cy={cy} r={r - 2} fill="none" stroke="#2a2740" strokeWidth="3" />
      <circle cx={cx} cy={cy} r={r * 0.52} fill="#9aa0b5" />
      {[0, 45, 90, 135].map((a) => (
        <rect
          key={a}
          x={cx - 1.6}
          y={cy - r * 0.5}
          width={3.2}
          height={r}
          rx={1.6}
          fill="#5a607a"
          transform={`rotate(${a} ${cx} ${cy})`}
        />
      ))}
      <circle cx={cx} cy={cy} r={3.4} fill="#d9dcea" />
    </motion.g>
  );
}

function TruckSVG({
  wheelRotate,
}: {
  wheelRotate: MotionValue<number>;
}) {
  return (
    <div className="animate-float [animation-duration:3.2s]">
      <svg viewBox="0 0 620 232" className="w-full drop-shadow-[0_24px_30px_rgba(0,0,0,0.45)]">
        {/* ── Trailer ── */}
        <rect x="14" y="34" width="346" height="130" rx="10" fill="#131031" stroke="rgba(255,255,255,0.14)" />
        <rect x="14" y="34" width="346" height="14" rx="7" fill="rgba(255,255,255,0.06)" />
        {/* rear doors (left = rear, truck faces right) */}
        <line x1="30" y1="44" x2="30" y2="154" stroke="rgba(255,255,255,0.10)" strokeWidth="2" />
        <line x1="44" y1="44" x2="44" y2="154" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
        {/* brand stripe */}
        <rect x="14" y="150" width="346" height="5" fill="#e4432e" />
        {/* TBM logo on the trailer */}
        <image
          href="/brand/TBM-2.png"
          x="92"
          y="64"
          width="226"
          height="70"
          preserveAspectRatio="xMidYMid meet"
        />
        {/* trailer chassis + skirt */}
        <rect x="26" y="164" width="322" height="10" rx="4" fill="#0c0a20" />
        <rect x="190" y="172" width="118" height="8" rx="4" fill="#0c0a20" opacity="0.7" />
        {/* tail light */}
        <rect x="14" y="138" width="5" height="12" rx="2" fill="#ff5a3c" />

        {/* ── Tractor ── */}
        {/* chassis */}
        <rect x="352" y="158" width="252" height="14" rx="5" fill="#0c0a20" />
        {/* exhaust stack */}
        <rect x="366" y="44" width="9" height="116" rx="4" fill="#9aa0b5" />
        <rect x="364" y="40" width="13" height="8" rx="3" fill="#c9cede" />
        {/* sleeper + cab */}
        <path
          d="M384 162 V66 q0 -12 12 -12 h96 q12 0 12 12 v96 Z"
          fill="#e4432e"
        />
        {/* hood */}
        <path
          d="M504 162 v-50 q0 -10 10 -10 h54 q16 0 22 14 l8 22 q3 8 3 14 v10 Z"
          fill="#e4432e"
        />
        <path d="M504 112 h64 q14 0 20 12" stroke="rgba(0,0,0,0.18)" strokeWidth="4" fill="none" />
        {/* cab shading */}
        <rect x="384" y="54" width="120" height="10" rx="5" fill="rgba(255,255,255,0.16)" />
        {/* window */}
        <path d="M468 70 h32 q8 0 8 8 v26 h-40 Z" fill="#cfd9ff" />
        <path d="M468 70 h12 v34 h-12 Z" fill="rgba(255,255,255,0.55)" />
        {/* door line + handle */}
        <line x1="452" y1="70" x2="452" y2="158" stroke="rgba(0,0,0,0.2)" strokeWidth="3" />
        <rect x="458" y="116" width="16" height="4" rx="2" fill="rgba(0,0,0,0.3)" />
        {/* mirror */}
        <line x1="508" y1="78" x2="520" y2="70" stroke="#14121f" strokeWidth="3" />
        <rect x="518" y="62" width="6" height="14" rx="2" fill="#14121f" />
        {/* grille + bumper */}
        <rect x="592" y="120" width="10" height="34" rx="3" fill="#1b1830" />
        <rect x="588" y="152" width="26" height="12" rx="4" fill="#c9c9d4" />
        {/* headlight */}
        <rect x="596" y="124" width="7" height="9" rx="2" fill="#ffe9b0" />
        {/* fuel tank */}
        <rect x="392" y="166" width="64" height="18" rx="9" fill="#9aa0b5" />

        {/* ── Wheels ── */}
        <Wheel cx={92} cy={196} r={26} rotate={wheelRotate} />
        <Wheel cx={152} cy={196} r={26} rotate={wheelRotate} />
        <Wheel cx={404} cy={196} r={27} rotate={wheelRotate} />
        <Wheel cx={462} cy={196} r={27} rotate={wheelRotate} />
        <Wheel cx={566} cy={196} r={27} rotate={wheelRotate} />

        {/* ground shadow */}
        <ellipse cx="310" cy="226" rx="280" ry="6" fill="rgba(0,0,0,0.35)" />
      </svg>
    </div>
  );
}
