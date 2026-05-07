import Image from "next/image";
import Link from "next/link";
import {
  Globe2,
  Headphones,
  ShieldCheck,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { CertMarquee } from "@/components/site/cert-marquee";
import { Reveal } from "@/components/site/reveal";
import { ServiceGrid } from "@/components/site/service-grid";
import { StatCounter } from "@/components/site/stat-counter";
import { HOME } from "@/lib/content/home";
import { cn } from "@/lib/utils";

const WHY_US_ICONS: Record<string, LucideIcon> = {
  Zap,
  ShieldCheck,
  Globe2,
  Headphones,
};

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={HOME.hero.bgImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-brand-indigo/85" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-indigo-deep/70" />
        </div>

        <div className="relative mx-auto flex min-h-[80dvh] w-full max-w-screen-2xl flex-col justify-center px-4 py-20 text-white md:py-24 md:px-8">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-brand-red">
            {HOME.hero.eyebrow}
          </p>
          <h1 className="mt-6 max-w-4xl font-display text-display-md font-bold leading-[0.95] tracking-[-0.02em] text-balance sm:text-display-lg lg:text-display-xl">
            {HOME.hero.headline}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-fg-subtle md:text-lg">
            {HOME.hero.subhead}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/get-a-quote"
              className={cn(
                buttonVariants(),
                "h-12 rounded-full px-8 text-base transition-all hover:bg-primary/85 active:scale-[0.98]"
              )}
            >
              Get a Quote
            </Link>
            <Link
              href="/services"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 text-base font-medium backdrop-blur-sm transition-all hover:bg-white/10 active:scale-[0.98]"
            >
              Our Services
            </Link>
          </div>
        </div>

        {/* Stats strip — animated counters */}
        <div className="relative border-t border-white/10 bg-brand-indigo-deep/80 backdrop-blur-md">
          <div className="mx-auto grid w-full max-w-screen-2xl grid-cols-3 divide-x divide-white/10 px-4 py-8 md:py-10 md:px-8">
            {HOME.stats.map((stat) => (
              <StatCounter
                key={stat.label}
                value={stat.value}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT BAND */}
      <section className="bg-white py-16 md:py-24 lg:py-32">
        <div className="mx-auto grid w-full max-w-screen-2xl grid-cols-1 items-center gap-12 px-4 lg:grid-cols-2 md:px-8">
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
            <Image
              src={HOME.about.image}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red">
              {HOME.about.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-display-sm font-bold tracking-tight text-balance sm:text-display-md">
              {HOME.about.headline}
            </h2>
            {HOME.about.body.map((p, i) => (
              <p
                key={i}
                className="mt-5 text-base leading-relaxed text-fg-muted md:text-lg"
              >
                {p}
              </p>
            ))}
            <Link
              href="/about"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "mt-8 h-11 rounded-full px-6 transition-all active:scale-[0.98]"
              )}
            >
              Learn About Us
            </Link>
          </Reveal>
        </div>
      </section>

      {/* CROSS-BORDER LOGISTICS SOLUTIONS */}
      <section className="bg-muted/30 py-16 md:py-24 lg:py-32">
        <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-8">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red">
              {HOME.crossBorder.eyebrow}
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-display-sm font-bold tracking-tight text-balance sm:text-display-md">
              {HOME.crossBorder.headline}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-fg-muted md:text-lg">
              {HOME.crossBorder.subhead}
            </p>
          </Reveal>
          <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {HOME.crossBorder.pillars.map((pillar, i) => (
              <Reveal as="li" key={pillar.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-black/5 bg-white p-8 transition-colors hover:border-brand-red/30">
                  <h3 className="font-display text-xl font-bold uppercase tracking-wider">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-fg-muted">
                    {pillar.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* CROSS-BORDER DOCK OPERATIONS */}
      <section className="bg-white py-16 md:py-24 lg:py-32">
        <div className="mx-auto grid w-full max-w-screen-2xl grid-cols-1 items-center gap-12 px-4 lg:grid-cols-2 md:px-8">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red">
              {HOME.crossDock.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-display-sm font-bold tracking-tight text-balance sm:text-display-md">
              {HOME.crossDock.headline}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-fg-muted md:text-lg">
              {HOME.crossDock.body}
            </p>
          </Reveal>
          <Reveal
            delay={0.1}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted"
          >
            <Image
              src={HOME.crossDock.image}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-brand-indigo py-16 text-white md:py-24 lg:py-32">
        <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-8">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red">
              {HOME.howItWorks.eyebrow}
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-display-sm font-bold tracking-tight text-balance sm:text-display-md">
              {HOME.howItWorks.headline}
            </h2>
          </Reveal>
          <ol className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
            {HOME.howItWorks.steps.map((step, i) => (
              <Reveal as="li" key={step.n} delay={i * 0.1}>
                <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm transition-colors hover:border-brand-red/40">
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <Image
                      src={step.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-indigo via-brand-indigo/40 to-transparent" />
                  </div>
                  <div className="relative p-8">
                    <span className="absolute -top-4 left-8 inline-flex h-8 items-center rounded-full bg-brand-red px-4 text-[10px] font-bold uppercase tracking-[0.2em]">
                      Step {step.n}
                    </span>
                    <h3 className="font-display text-2xl font-bold uppercase tracking-wider">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-fg-subtle">{step.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* NETWORK */}
      <section className="bg-white py-16 md:py-24 lg:py-32">
        <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-8">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red">
              {HOME.network.eyebrow}
            </p>
            <h2 className="mt-3 max-w-3xl font-display text-display-sm font-bold tracking-tight text-balance sm:text-display-md">
              {HOME.network.headline}
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-fg-muted md:text-lg">
              {HOME.network.body}
            </p>
          </Reveal>
          <Reveal
            delay={0.1}
            className="relative mx-auto mt-12 aspect-square w-full max-w-3xl overflow-hidden rounded-2xl bg-muted"
          >
            <Image
              src="/brand/map-tbm-logistics.jpg"
              alt="TBM Carriers North American network map"
              fill
              sizes="(max-width: 1024px) 100vw, 768px"
              className="object-cover"
            />
          </Reveal>
          <ul className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {HOME.network.crossings.map((c, i) => (
              <Reveal
                as="li"
                key={`${c.us}-${c.mx}`}
                delay={i * 0.04}
                y={12}
              >
                <div className="flex items-center justify-between gap-3 rounded-lg border border-black/5 bg-muted/40 px-5 py-3 text-sm transition-colors hover:border-brand-red/30 hover:bg-muted/60">
                  <span className="font-medium">{c.us}</span>
                  <span aria-hidden="true" className="text-brand-red">
                    ↔
                  </span>
                  <span className="text-fg-muted">{c.mx}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* SERVICES (BENTO) */}
      <section className="bg-muted/30 py-16 md:py-24 lg:py-32">
        <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-8">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red">
              Our Services
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-display-sm font-bold tracking-tight text-balance sm:text-display-md">
              Every shipment receives the attention it deserves — no matter the
              size
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <ServiceGrid />
          </Reveal>
          <div className="mt-12 flex justify-center">
            <Link
              href="/services"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-11 rounded-full px-6 transition-all active:scale-[0.98]"
              )}
            >
              See all services
            </Link>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-white py-16 md:py-24 lg:py-32">
        <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-8">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red">
              {HOME.whyUs.eyebrow}
            </p>
            <h2 className="mt-3 max-w-3xl font-display text-display-sm font-bold tracking-tight text-balance sm:text-display-md">
              {HOME.whyUs.headline}
            </h2>
          </Reveal>
          <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {HOME.whyUs.features.map((feature, i) => {
              const Icon = WHY_US_ICONS[feature.icon];
              return (
                <Reveal as="li" key={feature.title} delay={i * 0.08} y={16}>
                  <div className="h-full rounded-2xl border border-black/5 bg-muted/30 p-6 transition-colors hover:border-brand-red/30">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-bold uppercase tracking-wider">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                      {feature.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* CERT MARQUEE */}
      <section className="bg-brand-indigo py-16 text-white">
        <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-8">
          <p className="text-center text-xs font-medium uppercase tracking-[0.25em] text-brand-red">
            Partners & Certifications
          </p>
          <div className="mt-8">
            <CertMarquee />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={HOME.finalCta.bgImage}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-brand-indigo-deep/85" />
        </div>
        <div className="relative mx-auto flex max-w-screen-2xl flex-col items-center px-4 py-24 text-center text-white md:px-8 md:py-32">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red">
              {HOME.finalCta.eyebrow}
            </p>
            <h2 className="mt-4 max-w-3xl font-display text-display-sm font-bold tracking-tight text-balance sm:text-display-md">
              {HOME.finalCta.headline}
            </h2>
            <Link
              href="/get-a-quote"
              className={cn(
                buttonVariants(),
                "mt-10 h-12 rounded-full px-8 text-base transition-all hover:bg-primary/85 active:scale-[0.98]"
              )}
            >
              Get a Quote
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
