"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Mail, RotateCcw } from "lucide-react";
import {
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import {
  MAP_DOTS_CA,
  MAP_DOTS_MX,
  MAP_DOTS_US,
  MAP_PROJECTION,
  MAP_VIEW,
} from "@/lib/content/network-map";
import {
  GATEWAY_PAIRS,
  NETWORK_CORRIDORS,
  NETWORK_LOCATIONS,
  type NetworkLocation,
  type NetworkRole,
} from "@/lib/content/network-locations";
import { ContactSalesLink } from "./site-links";
import { useContent } from "@/lib/i18n-client";
import { cn } from "@/lib/utils";

type GroupKey = "terminal" | "dropyard" | "crossing" | "office";
type Mode = "explore" | "plan";

/** Marker colors per asset group (labels come from the locale dictionary). */
const GROUP_COLORS: Record<GroupKey, string> = {
  terminal: "#e4432e",
  dropyard: "#ffb066",
  crossing: "#8fa2ff",
  office: "#ffffff",
};

const GROUP_KEYS: readonly GroupKey[] = [
  "terminal",
  "dropyard",
  "crossing",
  "office",
];

const ROLE_TO_GROUP: Record<NetworkRole, GroupKey> = {
  hq: "terminal",
  terminal: "terminal",
  dropyard: "dropyard",
  crossing: "crossing",
  office: "office",
  maintenance: "office",
};

/** The custom event other components dispatch to spotlight a location. */
export const FOCUS_LOCATION_EVENT = "tbm:focus-location";

/** Surface-road distance ≈ great-circle × detour factor. */
const ROAD_FACTOR = 1.18;
/** Standard FTL solo-driver planning speeds, miles per day. */
const MILES_PER_DAY_FAST = 550;
const MILES_PER_DAY_SLOW = 450;

function primaryGroup(roles: readonly NetworkRole[]): GroupKey {
  if (roles.includes("hq") || roles.includes("terminal")) return "terminal";
  if (roles.includes("dropyard")) return "dropyard";
  if (roles.includes("office") || roles.includes("maintenance")) return "office";
  return "crossing";
}

function projectX(lon: number) {
  return (lon - MAP_PROJECTION.lonMin) * MAP_PROJECTION.kx;
}
function projectY(lat: number) {
  return (MAP_PROJECTION.latMax - lat) * MAP_PROJECTION.ky;
}

function haversineMiles(
  a: { lat: number; lon: number },
  b: { lat: number; lon: number }
) {
  const R = 3958.8;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

/** Midpoint-smoothed quadratic path through a polyline. */
function smoothPath(pts: readonly (readonly [number, number])[]) {
  if (pts.length < 2) return "";
  const f = (n: number) => n.toFixed(2);
  let d = `M ${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const midX = (pts[i][0] + pts[i + 1][0]) / 2;
    const midY = (pts[i][1] + pts[i + 1][1]) / 2;
    d += ` Q ${f(pts[i][0])} ${f(pts[i][1])} ${f(midX)} ${f(midY)}`;
  }
  const last = pts[pts.length - 1];
  d += ` L ${f(last[0])} ${f(last[1])}`;
  return d;
}

type Marker = NetworkLocation & { x: number; y: number; group: GroupKey };

/**
 * Interactive dot-matrix map of TBM's North American network.
 * Explore mode: hover/tap markers, filter by asset type, watch freight flow
 * along signature corridors. Plan mode: tap origin + destination to sketch a
 * lane — cross-border routes go through the best twin-city gateway — with
 * distance and transit estimates and a prefilled Contact Sales handoff.
 */
export function NetworkMap({
  className,
  revealProgress,
  frameCap,
}: {
  className?: string;
  /** 0..1 scroll progress: corridors fade-draw, markers cascade west->east,
   *  legend lights up. Omit for the always-on (contact page) behavior. */
  revealProgress?: MotionValue<number>;
  /** CSS max-height for the map box — the pinned reveal passes a tighter
   *  cap so the card never overlaps the scene header. */
  frameCap?: string;
}) {
  const reduce = useReducedMotion();
  const t = useContent().map;
  const containerRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<GroupKey | "all">("all");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>("explore");
  const [originId, setOriginId] = useState<string | null>(null);
  const [destId, setDestId] = useState<string | null>(null);
  // Once the visitor interacts, the idle auto-tour stops for good.
  const [engaged, setEngaged] = useState(false);

  // Scroll-reveal: markers cascade in west->east within [0.3, 0.9] of the
  // provided progress; corridors and legend gate on thresholds.
  const fallbackProgress = useMotionValue(1);
  const reveal = revealProgress ?? fallbackProgress;
  const revealing = !!revealProgress && !reduce;
  const [revealCount, setRevealCount] = useState(revealing ? 0 : Infinity);
  const [corridorsOn, setCorridorsOn] = useState(!revealing);
  const [legendOn, setLegendOn] = useState(!revealing);

  const markers = useMemo<Marker[]>(
    () =>
      NETWORK_LOCATIONS.map((loc) => ({
        ...loc,
        x: projectX(loc.lon),
        y: projectY(loc.lat),
        group: primaryGroup(loc.roles),
      })),
    []
  );

  const byId = useMemo(() => {
    const m = new Map<string, Marker>();
    for (const mk of markers) m.set(mk.id, mk);
    return m;
  }, [markers]);

  // West->east cascade order, grouped: terminals, drop yards, crossings, offices.
  const revealRank = useMemo(() => {
    const groupRank: Record<GroupKey, number> = {
      terminal: 0,
      dropyard: 1,
      crossing: 2,
      office: 3,
    };
    const sorted = [...markers].sort(
      (a, b) => groupRank[a.group] - groupRank[b.group] || a.lon - b.lon
    );
    const rank = new Map<string, number>();
    sorted.forEach((m, i) => rank.set(m.id, i));
    return rank;
  }, [markers]);

  useMotionValueEvent(reveal, "change", (v) => {
    if (!revealing) return;
    // Cascade runs 0.25→0.72 so the tail of the pin is settled map time.
    const prog = Math.min(1, Math.max(0, (v - 0.25) / 0.47));
    setRevealCount(Math.floor(prog * markers.length));
    setCorridorsOn(v > 0.18);
    setLegendOn(v > 0.5);
  });

  const corridors = useMemo(
    () =>
      NETWORK_CORRIDORS.map((c) => ({
        id: c.id,
        name: c.name,
        d: smoothPath(
          c.stops.map((id) => {
            const m = byId.get(id);
            return m ? ([m.x, m.y] as const) : ([0, 0] as const);
          })
        ),
      })),
    [byId]
  );

  const counts = useMemo(() => {
    const c: Record<GroupKey, number> = {
      terminal: 0,
      dropyard: 0,
      crossing: 0,
      office: 0,
    };
    for (const loc of NETWORK_LOCATIONS) {
      const seen = new Set<GroupKey>();
      for (const role of loc.roles) seen.add(ROLE_TO_GROUP[role]);
      for (const g of seen) c[g]++;
    }
    return c;
  }, []);

  /** Planned lane: stops, geometry, distance, and transit estimate. */
  const lane = useMemo(() => {
    const origin = originId ? byId.get(originId) : null;
    const dest = destId ? byId.get(destId) : null;
    if (!origin || !dest) return null;

    let stops: Marker[] = [origin, dest];
    let gateway: { us: Marker; mx: Marker } | null = null;

    if (origin.country !== dest.country) {
      let best: { us: Marker; mx: Marker; total: number } | null = null;
      for (const [usId, mxId] of GATEWAY_PAIRS) {
        const us = byId.get(usId);
        const mx = byId.get(mxId);
        if (!us || !mx) continue;
        const nearOrigin = origin.country === "US" ? us : mx;
        const nearDest = dest.country === "US" ? us : mx;
        const total =
          haversineMiles(origin, nearOrigin) +
          haversineMiles(nearOrigin, nearDest) +
          haversineMiles(nearDest, dest);
        if (!best || total < best.total) best = { us, mx, total };
      }
      if (best) {
        gateway = { us: best.us, mx: best.mx };
        const first = origin.country === "US" ? best.us : best.mx;
        const second = origin.country === "US" ? best.mx : best.us;
        stops = [origin, first, second, dest];
      }
    }

    let great = 0;
    for (let i = 0; i < stops.length - 1; i++) {
      great += haversineMiles(stops[i], stops[i + 1]);
    }
    const miles = Math.round(great * ROAD_FACTOR);
    const km = Math.round(miles * 1.609);
    const daysMin = Math.max(1, Math.ceil(miles / MILES_PER_DAY_FAST));
    const crossBorder = !!gateway;
    const daysMax = Math.max(
      daysMin,
      Math.ceil(miles / MILES_PER_DAY_SLOW) + (crossBorder ? 1 : 0)
    );

    return {
      origin,
      dest,
      gateway,
      d: smoothPath(stops.map((s) => [s.x, s.y] as const)),
      miles,
      km,
      daysMin,
      daysMax,
    };
  }, [originId, destId, byId]);

  // External spotlight requests (e.g. the homepage crossing chips).
  useEffect(() => {
    const onFocus = (e: Event) => {
      const id = (e as CustomEvent<{ id?: string }>).detail?.id;
      if (typeof id !== "string") return;
      setEngaged(true);
      setFilter("all");
      setActiveId(id);
      containerRef.current?.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "nearest",
      });
    };
    window.addEventListener(FOCUS_LOCATION_EVENT, onFocus);
    return () => window.removeEventListener(FOCUS_LOCATION_EVENT, onFocus);
  }, [reduce]);

  // Idle auto-tour: spotlight one location at a time while in view,
  // until the visitor interacts. Skipped under reduced motion.
  useEffect(() => {
    if (reduce || engaged || mode !== "explore") return;
    if (revealing && revealCount < markers.length) return;
    const el = containerRef.current;
    if (!el) return;
    let idx = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          interval = setInterval(() => {
            setActiveId(markers[idx % markers.length].id);
            idx++;
          }, 3000);
        } else {
          clearInterval(interval);
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearInterval(interval);
    };
  }, [reduce, engaged, mode, markers, revealing, revealCount]);

  const active = markers.find((m) => m.id === activeId) ?? null;

  const matches = (m: Marker) =>
    filter === "all" || m.roles.some((r) => ROLE_TO_GROUP[r] === filter);

  const engage = () => setEngaged(true);

  const switchMode = (next: Mode) => {
    engage();
    setMode(next);
    setActiveId(null);
    if (next === "explore") {
      setOriginId(null);
      setDestId(null);
    }
  };

  const resetLane = () => {
    setOriginId(null);
    setDestId(null);
  };

  const handleMarkerClick = (id: string) => {
    engage();
    if (mode === "explore") {
      setActiveId((a) => (a === id ? null : id));
      return;
    }
    // Plan mode selection flow
    if (!originId) {
      setOriginId(id);
    } else if (!destId) {
      if (id === originId) {
        setOriginId(null);
      } else {
        setDestId(id);
      }
    } else {
      setOriginId(id);
      setDestId(null);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "grain relative isolate overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-brand-indigo-deep via-brand-indigo to-brand-indigo-deep p-5 text-white sm:p-7 md:p-9",
        className
      )}
    >
      {/* Backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-aurora absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand-red/15 blur-3xl" />
        <div className="grain-layer absolute inset-0 opacity-[0.05] mix-blend-overlay" />
      </div>

      {/* Legend / filters / mode */}
      <div
        className={cn(
          "flex flex-wrap items-center gap-2 transition-all duration-700",
          legendOn ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <button
          type="button"
          onClick={() => {
            engage();
            setFilter("all");
          }}
          aria-pressed={filter === "all"}
          className={cn(
            "h-9 rounded-full border px-4 text-xs font-semibold uppercase tracking-wider transition-colors",
            filter === "all"
              ? "border-brand-red bg-brand-red text-white"
              : "border-white/15 bg-white/[0.04] text-fg-subtle hover:border-white/40 hover:text-white"
          )}
        >
          {t.all}
        </button>
        {GROUP_KEYS.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => {
              engage();
              setFilter((f) => (f === key ? "all" : key));
            }}
            aria-pressed={filter === key}
            className={cn(
              "inline-flex h-9 items-center gap-2 rounded-full border px-4 text-xs font-semibold uppercase tracking-wider transition-colors",
              filter === key
                ? "border-white/60 bg-white/10 text-white"
                : "border-white/15 bg-white/[0.04] text-fg-subtle hover:border-white/40 hover:text-white"
            )}
          >
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: GROUP_COLORS[key] }}
            />
            {t.groups[key]}
            <span className="tabular-nums text-fg-subtle">{counts[key]}</span>
          </button>
        ))}

        {/* Mode toggle */}
        <div className="ml-auto flex items-center rounded-full border border-white/15 bg-white/[0.04] p-1">
          {(["explore", "plan"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => switchMode(m)}
              aria-pressed={mode === m}
              className={cn(
                "h-7 rounded-full px-3.5 text-[11px] font-semibold uppercase tracking-wider transition-colors",
                mode === m
                  ? "bg-brand-red text-white"
                  : "text-fg-subtle hover:text-white"
              )}
            >
              {m === "explore" ? t.explore : t.planLane}
            </button>
          ))}
        </div>
      </div>

      {/* Map — height capped to the viewport; width must stay `auto` so the
          max-height transfers through the locked aspect ratio (markers are
          %-positioned, so the ratio must hold exactly). */}
      <div
        className="relative mx-auto mt-6 max-h-[max(18rem,calc(100dvh-18rem))]"
        style={{
          aspectRatio: `${MAP_VIEW.w} / ${MAP_VIEW.h}`,
          ...(frameCap ? { maxHeight: frameCap } : {}),
        }}
        onPointerEnter={engage}
      >
        <svg
          viewBox={`0 0 ${MAP_VIEW.w} ${MAP_VIEW.h}`}
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <g fill="rgba(255,255,255,0.07)">
            {MAP_DOTS_CA.map(([x, y], i) => (
              <circle key={`ca-${i}`} cx={x} cy={y} r={0.24} />
            ))}
          </g>
          <g fill="rgba(255,255,255,0.16)">
            {MAP_DOTS_US.map(([x, y], i) => (
              <circle key={`us-${i}`} cx={x} cy={y} r={0.26} />
            ))}
          </g>
          <g fill="rgba(255,138,110,0.28)">
            {MAP_DOTS_MX.map(([x, y], i) => (
              <circle key={`mx-${i}`} cx={x} cy={y} r={0.26} />
            ))}
          </g>

          {/* Signature freight corridors */}
          <g
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(
              "pointer-events-none transition-opacity duration-1000",
              !corridorsOn ? "opacity-0" : lane ? "opacity-30" : "opacity-100"
            )}
          >
            {corridors.map((c) => (
              <g key={c.id}>
                <path d={c.d} stroke="rgba(228,67,46,0.16)" strokeWidth={0.85} />
                <path
                  d={c.d}
                  stroke="rgba(255,138,110,0.85)"
                  strokeWidth={0.28}
                  strokeDasharray="1.1 2.3"
                  className={reduce ? undefined : "animate-corridor"}
                >
                  <title>{c.name}</title>
                </path>
              </g>
            ))}
          </g>

          {/* Planned lane */}
          {lane && (
            <g fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d={lane.d} stroke="rgba(255,255,255,0.2)" strokeWidth={0.95} />
              <path
                d={lane.d}
                stroke="#ffffff"
                strokeWidth={0.32}
                strokeDasharray="1.1 2.3"
                className={reduce ? undefined : "animate-corridor"}
              />
            </g>
          )}
        </svg>

        {/* Markers */}
        <div className="absolute inset-0">
          {markers.map((m) => {
            const on = matches(m);
            const isActive = activeId === m.id;
            const isOrigin = originId === m.id;
            const isDest = destId === m.id;
            return (
              <button
                key={m.id}
                type="button"
                aria-label={`${m.name} — ${m.roles.map((r) => t.roles[r]).join(", ")}`}
                onMouseEnter={() => {
                  engage();
                  setActiveId(m.id);
                }}
                onMouseLeave={() => setActiveId((a) => (a === m.id ? null : a))}
                onFocus={() => {
                  engage();
                  setActiveId(m.id);
                }}
                onBlur={() => setActiveId((a) => (a === m.id ? null : a))}
                onClick={() => handleMarkerClick(m.id)}
                className={cn(
                  "absolute -translate-x-1/2 -translate-y-1/2 rounded-full p-2 transition-all duration-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red",
                  (revealRank.get(m.id) ?? 0) >= revealCount
                    ? "pointer-events-none scale-0 opacity-0"
                    : on
                      ? "scale-100 opacity-100"
                      : "pointer-events-none opacity-20"
                )}
                style={{
                  left: `${(m.x / MAP_VIEW.w) * 100}%`,
                  top: `${(m.y / MAP_VIEW.h) * 100}%`,
                }}
                tabIndex={on ? 0 : -1}
              >
                <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                  {!reduce && on && (
                    <span
                      className={cn(
                        "absolute inline-flex h-full w-full rounded-full opacity-50",
                        isActive || isOrigin || isDest
                          ? "animate-ping"
                          : "animate-pulse-glow"
                      )}
                      style={{ backgroundColor: GROUP_COLORS[m.group] }}
                    />
                  )}
                  <span
                    className={cn(
                      "relative inline-flex h-full w-full rounded-full",
                      isOrigin
                        ? "ring-[3px] ring-white"
                        : isDest
                          ? "ring-[3px] ring-brand-red"
                          : "ring-2 ring-brand-indigo-deep/60"
                    )}
                    style={{
                      backgroundColor: GROUP_COLORS[m.group],
                      boxShadow:
                        isActive || isOrigin || isDest
                          ? `0 0 14px 3px ${GROUP_COLORS[m.group]}66`
                          : undefined,
                    }}
                  />
                </span>
              </button>
            );
          })}

          {/* Tooltip */}
          {active && (
            <div
              role="status"
              className={cn(
                "pointer-events-none absolute z-10 w-max max-w-[15rem] -translate-x-1/2 rounded-xl border border-white/15 bg-brand-indigo-deep/95 px-3.5 py-2.5 shadow-2xl shadow-black/40 backdrop-blur-sm",
                active.y / MAP_VIEW.h < 0.22
                  ? "translate-y-3"
                  : "-translate-y-[calc(100%+0.75rem)]"
              )}
              style={{
                left: `min(max(${(active.x / MAP_VIEW.w) * 100}%, 18%), 82%)`,
                top: `${(active.y / MAP_VIEW.h) * 100}%`,
              }}
            >
              <p className="flex items-center gap-2 font-display text-sm font-extrabold uppercase tracking-wider">
                <span
                  aria-hidden="true"
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: GROUP_COLORS[active.group] }}
                />
                {active.name}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-fg-subtle">
                {active.roles.map((r) => t.roles[r]).join(" · ")}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Lane planner panel */}
      {mode === "plan" && (
        <div
          aria-live="polite"
          className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5"
        >
          {!lane ? (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-fg-subtle">
                {!originId ? (
                  <>
                    <span className="font-semibold text-white">
                      {t.tapOrigin}
                    </span>{" "}
                    {t.thenDestination}
                  </>
                ) : (
                  <>
                    {t.originColon}{" "}
                    <span className="font-semibold text-white">
                      {byId.get(originId)?.name}
                    </span>{" "}
                    {t.nowTapDestination}
                  </>
                )}
              </p>
              {originId && (
                <button
                  type="button"
                  onClick={resetLane}
                  className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/15 px-4 text-xs font-semibold uppercase tracking-wider text-fg-subtle transition-colors hover:border-white/40 hover:text-white"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  {t.reset}
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="font-display text-base font-extrabold uppercase tracking-wider sm:text-lg">
                    {lane.origin.name}{" "}
                    <span aria-hidden="true" className="text-brand-red">
                      →
                    </span>{" "}
                    {lane.dest.name}
                  </p>
                  {lane.gateway && (
                    <p className="mt-1 text-xs text-fg-subtle">
                      {t.viaPrefix} {lane.gateway.us.name} ↔{" "}
                      {lane.gateway.mx.name}
                      {t.viaSuffix ? ` ${t.viaSuffix}` : ""}
                    </p>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                  <p className="text-sm">
                    <span className="font-display text-xl font-extrabold tabular-nums text-brand-red sm:text-2xl">
                      {lane.miles.toLocaleString()}
                    </span>{" "}
                    <span className="text-fg-subtle">
                      {t.miAbbr} ({lane.km.toLocaleString()} {t.kmAbbr})
                    </span>
                  </p>
                  <p className="text-sm">
                    <span className="font-display text-xl font-extrabold tabular-nums text-brand-red sm:text-2xl">
                      {lane.daysMin === lane.daysMax
                        ? `~${lane.daysMin}`
                        : `${lane.daysMin}–${lane.daysMax}`}
                    </span>{" "}
                    <span className="text-fg-subtle">
                      {lane.daysMax > 1 ? t.daysShort : t.dayShort} {t.estTransit}
                    </span>
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <ContactSalesLink
                    subject={`${t.laneQuoteSubject}: ${lane.origin.name} → ${lane.dest.name}`}
                    className="shine-hover inline-flex h-10 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98]"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    {t.getFirmQuote}
                  </ContactSalesLink>
                  <button
                    type="button"
                    onClick={resetLane}
                    aria-label={t.resetLane}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-fg-subtle transition-colors hover:border-white/40 hover:text-white"
                  >
                    <RotateCcw className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <p className="mt-3 text-[11px] leading-relaxed text-fg-subtle">
                {t.planFootnote}
              </p>
            </>
          )}
        </div>
      )}

      {/* Caption */}
      <p
        className={cn(
          "mt-5 text-center text-[11px] uppercase tracking-[0.2em] text-fg-subtle transition-opacity duration-700",
          legendOn ? "opacity-100" : "opacity-0"
        )}
      >
        {mode === "plan"
          ? t.planCaption
          : `${counts.terminal} ${t.captionTerminals} · ${counts.dropyard} ${t.captionDropYards} · ${counts.crossing} ${t.captionCrossings} · ${counts.office} ${t.captionOffices} — ${t.captionCorridors}`}
      </p>
    </div>
  );
}
