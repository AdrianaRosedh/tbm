import {
  Building2,
  Headphones,
  MapPin,
  PackageSearch,
  Satellite,
  Truck,
  Warehouse,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { SERVICES, type ServiceItem } from "@/lib/content/services";
import { cn } from "@/lib/utils";

const ICONS: Record<ServiceItem["icon"], LucideIcon> = {
  Truck,
  Warehouse,
  Headphones,
  Wrench,
  Satellite,
  MapPin,
  Building2,
  PackageSearch,
};

type ServiceGridProps = {
  /** "bento" = asymmetric (feature spans 2x2). "preview" = simple 3-card row. */
  variant?: "bento" | "preview";
  className?: string;
};

export function ServiceGrid({ variant = "bento", className }: ServiceGridProps) {
  if (variant === "preview") {
    return (
      <ul
        className={cn(
          "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
          className
        )}
      >
        {SERVICES.slice(0, 3).map((service) => (
          <ServiceCard
            key={service.slug}
            service={service}
            Icon={ICONS[service.icon]}
          />
        ))}
      </ul>
    );
  }

  // Bento: feature card spans 2 cols × 2 rows on md+, rest fill in
  const [feature, ...rest] = SERVICES;
  const FeatureIcon = ICONS[feature.icon];

  return (
    <ul
      className={cn(
        "grid grid-cols-1 gap-6 md:auto-rows-fr md:grid-cols-3",
        className
      )}
    >
      <li className="group relative overflow-hidden rounded-2xl border border-white/10 bg-brand-indigo p-8 text-white transition-all hover:-translate-y-1 hover:border-brand-red/40 hover:shadow-2xl md:col-span-2 md:row-span-2 md:p-10">
        {/* Decorative gradient accent */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-60 [background:radial-gradient(circle_at_85%_15%,rgba(228,67,46,0.18),transparent_55%)]"
          aria-hidden="true"
        />
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-red text-white">
          <FeatureIcon className="h-7 w-7" aria-hidden="true" />
        </div>
        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
          Featured Service
        </p>
        <h3 className="mt-3 max-w-md font-display text-3xl font-bold uppercase tracking-wider text-balance md:text-4xl">
          {feature.title}
        </h3>
        <p className="mt-4 max-w-md text-base leading-relaxed text-fg-subtle md:text-lg">
          {feature.full ?? feature.short}
        </p>
      </li>

      {rest.map((service) => (
        <ServiceCard
          key={service.slug}
          service={service}
          Icon={ICONS[service.icon]}
        />
      ))}
    </ul>
  );
}

function ServiceCard({
  service,
  Icon,
}: {
  service: ServiceItem;
  Icon: LucideIcon;
}) {
  return (
    <li className="group relative overflow-hidden rounded-2xl border border-black/5 bg-white p-6 transition-all hover:-translate-y-1 hover:border-brand-red/40 hover:shadow-xl lg:p-8">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-indigo text-white transition-colors group-hover:bg-brand-red">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 className="mt-6 font-display text-xl font-bold uppercase tracking-wider">
        {service.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-fg-muted">
        {service.short}
      </p>
    </li>
  );
}
