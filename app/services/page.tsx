import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { ServiceGrid } from "@/components/site/service-grid";
import {
  SERVICES_AI,
  SERVICES_TECH,
  SERVICE_FEATURES,
} from "@/lib/content/services";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Services" };

export default function ServicesPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/brand/TBM-C-21.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-brand-indigo/85" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-indigo-deep/70" />
        </div>
        <div className="relative mx-auto flex min-h-[55svh] w-full max-w-7xl flex-col justify-center px-4 py-24 text-white md:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red">
            Our Commitment
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-display-md font-bold leading-[0.95] tracking-[-0.02em] text-balance sm:text-display-lg">
            Every shipment receives the attention it deserves — no matter the
            size
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-fg-subtle md:text-lg">
            Asset-based cross-border logistics, end-to-end. Six service areas,
            one accountable team.
          </p>
        </div>
      </section>

      {/* SERVICE GRID (BENTO) */}
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red">
              Our Services
            </p>
            <h2 className="mt-3 max-w-3xl font-display text-display-sm font-bold tracking-tight text-balance sm:text-display-md">
              What we deliver, every load, every lane
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <ServiceGrid />
          </Reveal>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-brand-indigo py-24 text-white md:py-32">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red">
              Integrated Logistics Solutions
            </p>
            <h2 className="mt-3 max-w-3xl font-display text-display-sm font-bold tracking-tight text-balance sm:text-display-md">
              Designed for performance and reliability
            </h2>
          </Reveal>
          <ul className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {SERVICE_FEATURES.map((feature, i) => (
              <Reveal as="li" key={feature.title} delay={i * 0.1}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm transition-colors hover:border-brand-red/40">
                  <h3 className="font-display text-xl font-bold uppercase tracking-wider">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-fg-subtle">{feature.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* AI / CARTA PORTE */}
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 lg:grid-cols-2 md:px-8">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red">
              {SERVICES_AI.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-display-sm font-bold tracking-tight text-balance sm:text-display-md">
              {SERVICES_AI.headline}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-fg-muted md:text-lg">
              {SERVICES_AI.body}
            </p>
          </Reveal>
          <Reveal
            delay={0.1}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted"
          >
            <Image
              src={SERVICES_AI.image}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* TECHNOLOGY */}
      <section className="bg-muted/30 py-24 md:py-32">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red">
              {SERVICES_TECH.eyebrow}
            </p>
            <h2 className="mt-3 max-w-3xl font-display text-display-sm font-bold tracking-tight text-balance sm:text-display-md">
              {SERVICES_TECH.headline}
            </h2>
          </Reveal>
          <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {SERVICES_TECH.items.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-black/5 bg-white p-8 transition-colors hover:border-brand-red/30">
                  <h3 className="font-display text-xl font-bold uppercase tracking-wider">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-fg-muted">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20 md:py-24">
        <Reveal className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 text-center md:px-8">
          <h2 className="font-display text-display-sm font-bold tracking-tight text-balance sm:text-display-md">
            Move freight. Move confidently.
          </h2>
          <Link
            href="/get-a-quote"
            className={cn(
              buttonVariants(),
              "h-12 rounded-full px-8 text-base hover:bg-primary/85"
            )}
          >
            Get a Quote
          </Link>
        </Reveal>
      </section>
    </>
  );
}
