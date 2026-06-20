"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, X } from "lucide-react";
import { ContactPopupLink } from "./contact-popup-link";
import { SnapCarousel } from "./snap-carousel";
import {
  SERVICE_DETAILS,
  SERVICE_DETAILS_ES,
  type ServiceItem,
} from "@/lib/content/services";
import { useContent, useLocale } from "@/lib/i18n-client";
import { cn } from "@/lib/utils";

type ServiceGridProps = {
  /** "bento" = asymmetric (feature spans 2x2). "preview" = simple 3-card row. */
  variant?: "bento" | "preview";
  className?: string;
};

type Ui = ReturnType<typeof useContent>["ui"];
type Detail = { keyword: string; highlights: readonly string[] } | undefined;
type Origin = { x: number; y: number };

const SPRING = { type: "spring", stiffness: 260, damping: 30 } as const;

/**
 * Service cards that *grow* into their detail view. A plain click expands the
 * clicked card into a full panel (centered on desktop, full-screen on mobile)
 * via an explicit FLIP transform from the card's on-screen rect — robust at any
 * scroll position. Cards stay real links to /services/[slug] so crawlers,
 * cmd/middle-click, and no-JS still reach the SEO pages. Reduced motion fades.
 */
export function ServiceGrid({ variant = "bento", className }: ServiceGridProps) {
  const c = useContent();
  const locale = useLocale();
  const base = locale === "es" ? "/es" : "";
  const reduce = !!useReducedMotion();
  const SERVICES = c.services;

  const [selected, setSelected] = useState<ServiceItem | null>(null);
  const [origin, setOrigin] = useState<Origin>({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);
  useEffect(() => setMounted(true), []);

  const openCard = (e: MouseEvent, service: ServiceItem) => {
    // Let modified clicks (new tab) and no-JS fall through to the page.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    const el = e.currentTarget as HTMLElement;
    triggerRef.current = el;
    const card = el.closest("li") ?? el;
    const r = card.getBoundingClientRect();
    setOrigin({
      x: r.left + r.width / 2 - window.innerWidth / 2,
      y: r.top + r.height / 2 - window.innerHeight / 2,
    });
    setSelected(service);
  };
  const close = () => setSelected(null);

  // Scroll-lock + ESC while open; restore focus to the card on close.
  useEffect(() => {
    if (!selected) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      triggerRef.current?.focus?.();
    };
  }, [selected]);

  const detail: Detail = selected
    ? (locale === "es" ? SERVICE_DETAILS_ES : SERVICE_DETAILS)[selected.slug]
    : undefined;

  const isPreview = variant === "preview";
  const trackClass = cn(
    isPreview
      ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      : "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:auto-rows-fr lg:grid-cols-3",
    "max-md:-mx-4 max-md:flex max-md:snap-x max-md:snap-mandatory max-md:overflow-x-auto max-md:[touch-action:pan-x] max-md:overscroll-x-contain max-md:px-4 max-md:pb-3 max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden",
    className
  );

  const cards = isPreview ? SERVICES.slice(0, 3) : SERVICES;
  const [feature, ...rest] = cards;

  return (
    <>
      <SnapCarousel label={c.ui.ourServices} className={trackClass}>
        {isPreview ? (
          cards.map((s) => (
            <ServiceCard
              key={s.slug}
              service={s}
              ui={c.ui}
              reduce={reduce}
              onOpen={openCard}
              hrefBase={base}
            />
          ))
        ) : (
          <>
            <ServiceCard
              service={feature}
              ui={c.ui}
              reduce={reduce}
              onOpen={openCard}
              hrefBase={base}
              featured
            />
            {rest.map((s) => (
              <ServiceCard
                key={s.slug}
                service={s}
                ui={c.ui}
                reduce={reduce}
                onOpen={openCard}
                hrefBase={base}
              />
            ))}
          </>
        )}
      </SnapCarousel>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {selected && (
              <ExpandedService
                key={selected.slug}
                service={selected}
                detail={detail}
                ui={c.ui}
                reduce={reduce}
                origin={origin}
                onClose={close}
              />
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}

function ServiceCard({
  service,
  ui,
  reduce,
  onOpen,
  hrefBase,
  featured = false,
}: {
  service: ServiceItem;
  ui: Ui;
  reduce: boolean;
  onOpen: (e: MouseEvent, service: ServiceItem) => void;
  hrefBase: string;
  featured?: boolean;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const onMove = (e: PointerEvent<HTMLLIElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <li
      ref={ref}
      onPointerMove={onMove}
      className={cn(
        "group/spot relative overflow-hidden rounded-2xl transition-[transform,box-shadow,border-color] duration-300",
        // Lift + big shadow are a desktop (grid) affordance only — inside the
        // mobile carousel the horizontal scroller would clip them.
        !reduce && "md:hover:-translate-y-1",
        featured
          ? "max-md:w-[88vw] max-md:shrink-0 max-md:snap-center border border-white/10 bg-brand-indigo p-6 text-white hover:border-brand-red/40 md:hover:shadow-2xl md:hover:shadow-brand-indigo-deep/50 sm:col-span-2 sm:p-8 lg:row-span-2 md:p-10"
          : "max-md:w-[82vw] max-md:shrink-0 max-md:snap-center border border-black/5 bg-white p-6 hover:border-brand-red/40 md:hover:shadow-xl md:hover:shadow-brand-indigo/10 lg:p-8"
      )}
    >
      {/* Pointer-following spotlight + top highlight line */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          background: `radial-gradient(360px circle at var(--mx,50%) var(--my,0%), color-mix(in oklab, var(--color-brand-red) ${
            featured ? 26 : 12
          }%, transparent), transparent 62%)`,
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-red/50 to-transparent opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
      />

      <a
        href={`${hrefBase}/services/${service.slug}`}
        onClick={(e) => onOpen(e, service)}
        aria-haspopup="dialog"
        className="relative z-10 flex h-full flex-col"
      >
        {featured ? (
          <>
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg shadow-brand-red/20 ring-1 ring-brand-red/30 transition-transform duration-300 group-hover/spot:scale-105">
              <Image
                src={service.image}
                alt=""
                width={131}
                height={131}
                className="h-16 w-16 object-contain"
              />
            </div>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-brand-red-bright">
              {ui.featuredService}
            </p>
            <h3 className="mt-3 max-w-md font-heading text-3xl font-extrabold uppercase tracking-wider text-balance md:text-4xl">
              {service.title}
            </h3>
            <p className="mt-4 max-w-md text-base leading-relaxed text-fg-subtle md:text-lg">
              {service.full ?? service.short}
            </p>
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-brand-red-bright">
              {ui.learnMore}
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover/spot:translate-x-1"
                aria-hidden="true"
              />
            </span>
          </>
        ) : (
          <>
            <Image
              src={service.image}
              alt=""
              width={131}
              height={131}
              className="h-16 w-16 object-contain transition-transform duration-300 group-hover/spot:scale-110"
            />
            <h3 className="mt-5 font-heading text-xl font-extrabold uppercase tracking-wider">
              {service.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-fg-muted">
              {service.short}
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-brand-red">
              {ui.learnMore}
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover/spot:translate-x-1"
                aria-hidden="true"
              />
            </span>
          </>
        )}
      </a>
    </li>
  );
}

function ExpandedService({
  service,
  detail,
  ui,
  reduce,
  origin,
  onClose,
}: {
  service: ServiceItem;
  detail: Detail;
  ui: Ui;
  reduce: boolean;
  origin: Origin;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  // Desktop grows from the clicked card; mobile rises as a bottom sheet.
  const [isDesktop] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 640px)").matches
  );
  const collapsed = isDesktop
    ? { opacity: 0, scale: 0.28, x: origin.x, y: origin.y }
    : { y: "100%" };
  const open = isDesktop
    ? { opacity: 1, scale: 1, x: 0, y: 0 }
    : { y: 0 };

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="svc-expanded-title"
    >
      <motion.div
        className="absolute inset-0 bg-brand-indigo-deep/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      />

      <motion.div
        initial={reduce ? { opacity: 0 } : collapsed}
        animate={reduce ? { opacity: 1 } : open}
        exit={reduce ? { opacity: 0 } : collapsed}
        transition={reduce ? { duration: 0.2 } : SPRING}
        style={{ transformOrigin: "center" }}
        className="relative z-10 flex max-h-[85dvh] w-full flex-col overflow-y-auto overflow-x-hidden rounded-t-3xl bg-brand-indigo-deep text-white shadow-2xl sm:max-h-[88dvh] sm:max-w-2xl sm:rounded-3xl sm:border sm:border-white/10"
      >
        {/* Decorative glow — clipped so it never causes overflow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-t-3xl sm:rounded-3xl"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-brand-indigo via-brand-indigo-deep to-brand-indigo-deep" />
          <div className="animate-aurora absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand-red/20 blur-3xl" />
          <div className="bg-grid absolute inset-0 opacity-[0.12]" />
          <div className="grain-layer absolute inset-0 opacity-[0.06] mix-blend-overlay" />
        </div>

        <div className="relative flex flex-col px-6 pb-[max(env(safe-area-inset-bottom),1.5rem)] pt-3 sm:px-8 sm:pt-8">
          {/* Grab handle — the mobile bottom-sheet affordance */}
          <div
            aria-hidden="true"
            className="mx-auto mb-4 h-1.5 w-10 shrink-0 rounded-full bg-white/25 sm:hidden"
          />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={ui.close}
            className="absolute right-4 top-4 inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white backdrop-blur-sm transition-all hover:border-brand-red hover:bg-brand-red active:scale-95"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>

          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg shadow-brand-red/20 ring-1 ring-brand-red/30">
            <Image
              src={service.image}
              alt=""
              width={131}
              height={131}
              className="h-11 w-11 object-contain"
            />
          </div>

          {detail?.keyword && (
            <p className="mt-5 pr-12 text-xs font-semibold uppercase tracking-[0.25em] text-brand-red-bright">
              {detail.keyword}
            </p>
          )}
          <h2
            id="svc-expanded-title"
            className="mt-2 font-heading text-2xl font-extrabold uppercase tracking-wider sm:text-3xl"
          >
            {service.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-fg-subtle sm:text-base">
            {service.full ?? service.short}
          </p>

          {detail?.highlights && (
            <ul className="mt-6 space-y-3">
              {detail.highlights.map((h) => (
                <li
                  key={h}
                  className="flex gap-3 text-sm leading-relaxed text-fg-subtle"
                >
                  <Check
                    className="mt-0.5 h-5 w-5 shrink-0 text-brand-red-bright"
                    aria-hidden="true"
                  />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-8">
            <ContactPopupLink
              onClick={onClose}
              className="shine-hover inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-lg shadow-brand-red/25 transition-all hover:bg-primary/90 active:scale-[0.98] sm:text-base"
            >
              {ui.contactSales}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ContactPopupLink>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
