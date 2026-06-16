"use client";

import Image from "next/image";
import { type ServiceItem } from "@/lib/content/services";
import { useContent } from "@/lib/i18n-client";
import { SpotlightCard } from "./spotlight-card";
import { cn } from "@/lib/utils";

type ServiceGridProps = {
  /** "bento" = asymmetric (feature spans 2x2). "preview" = simple 3-card row. */
  variant?: "bento" | "preview";
  className?: string;
};

export function ServiceGrid({ variant = "bento", className }: ServiceGridProps) {
  const c = useContent();
  const SERVICES = c.services;
  if (variant === "preview") {
    return (
      <ul
        className={cn(
          "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-md:-mx-4 max-md:flex max-md:snap-x max-md:snap-mandatory max-md:overflow-x-auto max-md:px-4 max-md:pb-3 max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden",
          className
        )}
      >
        {SERVICES.slice(0, 3).map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </ul>
    );
  }

  // Bento: feature card spans 2 cols × 2 rows on md+, rest fill in
  const [feature, ...rest] = SERVICES;

  return (
    <ul
      className={cn(
        "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:auto-rows-fr lg:grid-cols-3 max-md:-mx-4 max-md:flex max-md:snap-x max-md:snap-mandatory max-md:overflow-x-auto max-md:px-4 max-md:pb-3 max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden",
        className
      )}
    >
      <SpotlightCard
        as="li"
        className="max-md:w-[88vw] max-md:shrink-0 max-md:snap-center rounded-2xl border border-white/10 bg-brand-indigo p-6 text-white transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/40 hover:shadow-2xl hover:shadow-brand-indigo-deep/50 sm:col-span-2 sm:p-8 lg:row-span-2 md:p-10"
        glow="color-mix(in oklab, var(--color-brand-red) 26%, transparent)"
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
        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
          {c.ui.featuredService}
        </p>
        <h3 className="mt-3 max-w-md font-display text-3xl font-extrabold uppercase tracking-wider text-balance md:text-4xl">
          {feature.title}
        </h3>
        <p className="mt-4 max-w-md text-base leading-relaxed text-fg-subtle md:text-lg">
          {feature.full ?? feature.short}
        </p>
      </SpotlightCard>

      {rest.map((service) => (
        <ServiceCard key={service.slug} service={service} />
      ))}
    </ul>
  );
}

function ServiceCard({ service }: { service: ServiceItem }) {
  return (
    <SpotlightCard
      as="li"
      className="max-md:w-[82vw] max-md:shrink-0 max-md:snap-center rounded-2xl border border-black/5 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/40 hover:shadow-xl hover:shadow-brand-indigo/10 lg:p-8"
      glow="color-mix(in oklab, var(--color-brand-red) 12%, transparent)"
    >
      <Image
        src={service.image}
        alt=""
        width={131}
        height={131}
        className="h-16 w-16 object-contain transition-transform duration-300 group-hover/spot:scale-110"
      />
      <h3 className="mt-5 font-display text-xl font-extrabold uppercase tracking-wider">
        {service.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-fg-muted">
        {service.short}
      </p>
    </SpotlightCard>
  );
}
