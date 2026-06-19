import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import {
  ContactSalesLink,
  TrackShipmentLink,
} from "@/components/site/site-links";
import { SERVICES, SERVICE_DETAILS } from "@/lib/content/services";
import { SITE } from "@/lib/content/site";

// Only the known service slugs exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  const detail = SERVICE_DETAILS[slug];
  return {
    title: detail?.keyword ?? service.title,
    description: service.short,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      type: "website",
      title: `${service.title} — ${SITE.name}`,
      description: service.short,
      url: `${SITE.url}/services/${slug}`,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const detail = SERVICE_DETAILS[slug];
  const related = SERVICES.filter((s) => s.slug !== slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: service.title,
        description: service.full ?? service.short,
        serviceType: detail?.keyword ?? service.title,
        provider: { "@id": `${SITE.url}/#organization` },
        areaServed: [
          { "@type": "Country", name: "United States" },
          { "@type": "Country", name: "Mexico" },
          { "@type": "Country", name: "Canada" },
        ],
        url: `${SITE.url}/services/${slug}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: `${SITE.url}/#services`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: service.title,
            item: `${SITE.url}/services/${slug}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO */}
      <section className="grain relative isolate overflow-hidden bg-brand-indigo pb-16 pt-28 text-white md:pb-24 md:pt-36">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-indigo-deep via-brand-indigo to-brand-indigo-deep" />
          <div className="bg-grid absolute inset-0 opacity-[0.14]" />
          <div className="animate-aurora absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-red/15 blur-3xl" />
          <div className="grain-layer absolute inset-0 opacity-[0.05] mix-blend-overlay" />
        </div>
        <div className="relative mx-auto w-full max-w-4xl px-4 md:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-fg-subtle"
          >
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/#services" className="transition-colors hover:text-white">
              Services
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-brand-red">{service.title}</span>
          </nav>

          <div className="mt-8 flex items-start gap-5">
            <div className="hidden h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white shadow-lg shadow-brand-red/20 ring-1 ring-brand-red/30 sm:flex">
              <Image
                src={service.image}
                alt=""
                width={131}
                height={131}
                className="h-12 w-12 object-contain"
              />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
                {detail?.keyword ?? "Service"}
              </p>
              <h1 className="mt-3 font-heading text-display-sm font-black uppercase leading-[1.05] tracking-tight sm:text-display-md">
                {service.title}
              </h1>
            </div>
          </div>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-subtle">
            {service.short}
          </p>
        </div>
      </section>

      {/* OVERVIEW + HIGHLIGHTS */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto grid w-full max-w-4xl gap-12 px-4 md:px-8 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="font-heading text-2xl font-extrabold uppercase tracking-wider">
              Overview
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-fg-muted">
              {service.full ?? service.short}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ContactSalesLink className="shine-hover inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-base font-medium text-primary-foreground shadow-lg shadow-brand-red/25 transition-all hover:bg-primary/90 active:scale-[0.98]">
                Contact Sales <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ContactSalesLink>
              <TrackShipmentLink className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-black/10 px-7 text-base font-medium transition-all hover:border-brand-red hover:text-brand-red active:scale-[0.98]">
                Track Shipment
              </TrackShipmentLink>
            </div>
          </div>

          {detail?.highlights && (
            <div className="rounded-2xl border border-black/5 bg-muted/30 p-7">
              <h2 className="font-display text-sm font-extrabold uppercase tracking-[0.2em] text-brand-red">
                Highlights
              </h2>
              <ul className="mt-5 space-y-4">
                {detail.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex gap-3 text-sm leading-relaxed text-fg-muted"
                  >
                    <Check
                      className="mt-0.5 h-5 w-5 shrink-0 text-brand-red"
                      aria-hidden="true"
                    />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* RELATED */}
      <section className="bg-muted/30 py-16 md:py-20">
        <div className="mx-auto w-full max-w-4xl px-4 md:px-8">
          <h2 className="font-heading text-xl font-extrabold uppercase tracking-wider">
            More services
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/services/${r.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-black/5 bg-white p-6 transition-all hover:-translate-y-1 hover:border-brand-red/40 hover:shadow-lg"
                >
                  <Image
                    src={r.image}
                    alt=""
                    width={131}
                    height={131}
                    className="h-12 w-12 object-contain"
                  />
                  <h3 className="mt-4 font-display text-base font-extrabold uppercase tracking-wider">
                    {r.title}
                  </h3>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-red">
                    Learn more
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Link
              href="/#services"
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-fg-muted transition-colors hover:text-brand-red"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
