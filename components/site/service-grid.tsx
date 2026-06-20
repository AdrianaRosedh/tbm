"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type MouseEvent } from "react";
import { ArrowRight } from "lucide-react";
import { type ServiceItem } from "@/lib/content/services";
import { useContent, useLocale } from "@/lib/i18n-client";
import { SnapCarousel } from "./snap-carousel";
import { SpotlightCard } from "./spotlight-card";
import { ServiceDetailDialog } from "./service-detail-dialog";
import { cn } from "@/lib/utils";

type ServiceGridProps = {
  /** "bento" = asymmetric (feature spans 2x2). "preview" = simple 3-card row. */
  variant?: "bento" | "preview";
  className?: string;
};

export function ServiceGrid({ variant = "bento", className }: ServiceGridProps) {
  const c = useContent();
  const base = useLocale() === "es" ? "/es" : "";
  const SERVICES = c.services;

  // A plain left-click opens the quick-view popup; the cards stay real links so
  // crawlers, cmd/middle-click, and no-JS still reach /services/[slug].
  const [openService, setOpenService] = useState<ServiceItem | null>(null);
  const openPopup = (e: MouseEvent, service: ServiceItem) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    setOpenService(service);
  };

  const gridClass =
    variant === "preview"
      ? cn(
          "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-md:-mx-4 max-md:flex max-md:snap-x max-md:snap-mandatory max-md:overflow-x-auto max-md:[touch-action:pan-x] max-md:overscroll-x-contain max-md:px-4 max-md:pb-3 max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden",
          className
        )
      : cn(
          "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:auto-rows-fr lg:grid-cols-3 max-md:-mx-4 max-md:flex max-md:snap-x max-md:snap-mandatory max-md:overflow-x-auto max-md:[touch-action:pan-x] max-md:overscroll-x-contain max-md:px-4 max-md:pb-3 max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden",
          className
        );

  // Bento: feature card spans 2 cols × 2 rows on md+, rest fill in.
  const isPreview = variant === "preview";
  const cards = isPreview ? SERVICES.slice(0, 3) : SERVICES;
  const [feature, ...rest] = cards;

  return (
    <>
      <SnapCarousel label={c.ui.ourServices} className={gridClass}>
        {isPreview ? (
          cards.map((service) => (
            <ServiceCard
              key={service.slug}
              service={service}
              base={base}
              onOpen={openPopup}
            />
          ))
        ) : (
          <>
            <SpotlightCard
              as="li"
              className="max-md:w-[88vw] max-md:shrink-0 max-md:snap-center rounded-2xl border border-white/10 bg-brand-indigo p-6 text-white transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/40 hover:shadow-2xl hover:shadow-brand-indigo-deep/50 sm:col-span-2 sm:p-8 lg:row-span-2 md:p-10"
              glow="color-mix(in oklab, var(--color-brand-red) 26%, transparent)"
            >
              <Link
                href={`${base}/services/${feature.slug}`}
                onClick={(e) => openPopup(e, feature)}
                aria-haspopup="dialog"
                prefetch={false}
                className="group/lm flex h-full flex-col"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg shadow-brand-red/20 ring-1 ring-brand-red/30 transition-transform duration-300 group-hover/spot:scale-105">
                  <Image
                    src={feature.image}
                    alt=""
                    width={131}
                    height={131}
                    className="h-16 w-16 object-contain"
                  />
                </div>
                <p className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-brand-red-bright">
                  {c.ui.featuredService}
                </p>
                <h3 className="mt-3 max-w-md font-heading text-3xl font-extrabold uppercase tracking-wider text-balance md:text-4xl">
                  {feature.title}
                </h3>
                <p className="mt-4 max-w-md text-base leading-relaxed text-fg-subtle md:text-lg">
                  {feature.full ?? feature.short}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-brand-red-bright transition-colors group-hover/lm:text-[#ff8a6e]">
                  {c.ui.learnMore}
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover/lm:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </SpotlightCard>

            {rest.map((service) => (
              <ServiceCard
                key={service.slug}
                service={service}
                base={base}
                onOpen={openPopup}
              />
            ))}
          </>
        )}
      </SnapCarousel>

      <ServiceDetailDialog
        service={openService}
        onClose={() => setOpenService(null)}
      />
    </>
  );
}

function ServiceCard({
  service,
  base,
  onOpen,
}: {
  service: ServiceItem;
  base: string;
  onOpen: (e: MouseEvent, service: ServiceItem) => void;
}) {
  const { ui } = useContent();
  return (
    <SpotlightCard
      as="li"
      className="max-md:w-[82vw] max-md:shrink-0 max-md:snap-center rounded-2xl border border-black/5 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/40 hover:shadow-xl hover:shadow-brand-indigo/10 lg:p-8"
      glow="color-mix(in oklab, var(--color-brand-red) 12%, transparent)"
    >
      <Link
        href={`${base}/services/${service.slug}`}
        onClick={(e) => onOpen(e, service)}
        aria-haspopup="dialog"
        prefetch={false}
        className="group/lm flex h-full flex-col"
      >
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
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-brand-red transition-opacity group-hover/lm:opacity-70">
          {ui.learnMore}
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover/lm:translate-x-1"
            aria-hidden="true"
          />
        </span>
      </Link>
    </SpotlightCard>
  );
}
