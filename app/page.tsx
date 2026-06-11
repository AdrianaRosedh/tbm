import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Globe2,
  Headphones,
  ShieldCheck,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { TheDrive } from "@/components/site/the-drive";
import { CertMarquee } from "@/components/site/cert-marquee";
import { CrossingChips } from "@/components/site/crossing-chips";
import { MarqueeBand } from "@/components/site/marquee-band";
import { NetworkMap } from "@/components/site/network-map";
import { ParallaxLayer } from "@/components/site/parallax";
import { Reveal } from "@/components/site/reveal";
import { ServiceGrid } from "@/components/site/service-grid";
import { SpotlightCard } from "@/components/site/spotlight-card";
import { ContactSalesLink } from "@/components/site/site-links";
import { StatCounter } from "@/components/site/stat-counter";
import { TextReveal } from "@/components/site/text-reveal";
import { CertGrid } from "@/components/site/cert-grid";
import { ABOUT } from "@/lib/content/about";
import { HOME } from "@/lib/content/home";
import { SERVICES_TECH, SERVICE_FEATURES } from "@/lib/content/services";
import { SITE, TECH_PARTNERS } from "@/lib/content/site";
import { cn, mailtoHref } from "@/lib/utils";

const WHY_US_ICONS: Record<string, LucideIcon> = {
  Zap,
  ShieldCheck,
  Globe2,
  Headphones,
};

export default function Home() {
  return (
    <>
      {/* HERO — full first screen: content centers, stats dock at the fold */}
      <section className="grain relative isolate flex min-h-[calc(100dvh-4.5rem)] flex-col overflow-hidden md:min-h-[calc(100dvh-5rem)]">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <ParallaxLayer amount={56} scale={1.12}>
            <Image
              src={HOME.hero.bgImage}
              alt=""
              fill
              loading="eager"
              fetchPriority="high"
              sizes="100vw"
              className="object-cover"
            />
          </ParallaxLayer>
          <div className="absolute inset-0 bg-brand-indigo/85" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-indigo/50 via-transparent to-brand-indigo-deep/85" />
          {/* Aurora glows */}
          <div className="animate-aurora absolute -left-24 top-1/4 h-[30rem] w-[30rem] rounded-full bg-brand-red/20 blur-3xl" />
          <div className="animate-float-slow absolute -right-10 top-0 h-[26rem] w-[26rem] rounded-full bg-[#3a2f6b]/50 blur-3xl" />
          {/* Texture */}
          <div className="bg-grid absolute inset-0 opacity-[0.18]" />
          <div className="grain-layer absolute inset-0 opacity-[0.06] mix-blend-overlay" />
          {/* Top vignette so the glass header blends */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-brand-indigo-deep/60 to-transparent" />
        </div>

        <div className="relative mx-auto flex w-full max-w-screen-2xl flex-1 flex-col justify-center px-4 py-12 text-white md:py-10 md:px-8">
          <div className="animate-rise">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/90 backdrop-blur-sm sm:px-4 sm:text-[11px] sm:tracking-[0.22em]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-red" />
              </span>
              {HOME.hero.eyebrow}
            </span>
          </div>
          <h1
            className="animate-rise mt-6 max-w-4xl font-display text-display-md font-black leading-[0.95] tracking-[-0.02em] text-balance sm:text-display-lg [@media(min-height:1000px)]:lg:text-display-xl"
            style={{ animationDelay: "60ms" }}
          >
            {HOME.hero.headline}
          </h1>
          <p
            className="animate-rise mt-6 max-w-xl text-base leading-relaxed text-fg-subtle md:text-lg"
            style={{ animationDelay: "140ms" }}
          >
            {HOME.hero.subhead}
          </p>
          <div
            className="animate-rise mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4"
            style={{ animationDelay: "220ms" }}
          >
            <ContactSalesLink
              className={cn(
                buttonVariants(),
                "shine-hover group h-12 gap-2 rounded-full px-8 text-base shadow-lg shadow-brand-red/25 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-brand-red/30 active:scale-[0.98]"
              )}
            >
              Contact Sales
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </ContactSalesLink>
            <Link
              href="/services"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 text-base font-medium backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10 active:scale-[0.98]"
            >
              Our Services
              <ArrowUpRight className="h-4 w-4 text-brand-red transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Scroll cue */}
          <div className="mt-10 hidden items-center gap-3 text-xs uppercase tracking-[0.2em] text-fg-subtle md:flex">
            <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1">
              <span className="animate-scroll-cue h-1.5 w-1 rounded-full bg-brand-red" />
            </span>
            Scroll to explore
          </div>
        </div>

        {/* Stats strip — animated counters */}
        <div className="glass relative border-t border-white/10">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-red/50 to-transparent"
          />
          <div className="mx-auto grid w-full max-w-screen-2xl grid-cols-3 divide-x divide-white/10 px-4 py-8 md:px-8">
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

      {/* KINETIC BAND */}
      <MarqueeBand words={HOME.kinetic} />

      {/* ABOUT BAND */}
      <section id="know-us" className="scroll-mt-24 bg-white py-16 md:py-24 lg:py-32">
        <div className="mx-auto grid w-full max-w-screen-2xl grid-cols-1 items-center gap-12 px-4 lg:grid-cols-2 md:px-8">
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
            <ParallaxLayer amount={36}>
              <Image
                src={HOME.about.image}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </ParallaxLayer>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red">
              {HOME.about.eyebrow}
            </p>
            <TextReveal
              as="h2"
              text={HOME.about.headline}
              className="mt-3 font-display text-display-sm font-extrabold tracking-tight sm:text-display-md"
            />
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

      {/* KNOW US — mission, vision, history (from the About page, elevated here) */}
      <section className="bg-muted/30 py-16 md:py-24 lg:py-32">
        <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-8">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red">
              {ABOUT.mvh.eyebrow}
            </p>
            <TextReveal
              as="h2"
              text={ABOUT.mvh.headline}
              className="mt-3 max-w-3xl font-display text-display-sm font-extrabold tracking-tight sm:text-display-md"
            />
          </Reveal>
          <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 max-md:-mx-4 max-md:flex max-md:snap-x max-md:snap-mandatory max-md:overflow-x-auto max-md:px-4 max-md:pb-3 max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden">
            {ABOUT.mvh.items.map((item, i) => (
              <Reveal as="li" key={item.label} delay={i * 0.08} className="max-md:w-[82vw] max-md:shrink-0 max-md:snap-center">
                <SpotlightCard
                  className="h-full rounded-2xl border border-black/5 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/30 hover:shadow-xl hover:shadow-brand-indigo/10"
                  glow="color-mix(in oklab, var(--color-brand-red) 12%, transparent)"
                >
                  <span className="font-display text-sm font-extrabold tracking-[0.3em] text-brand-red/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
                    {item.label}
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-fg-muted">
                    {item.body}
                  </p>
                </SpotlightCard>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* CROSS-BORDER LOGISTICS SOLUTIONS */}
      <section className="bg-muted/30 py-16 md:py-24 lg:py-32">
        <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-8">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red">
              {HOME.crossBorder.eyebrow}
            </p>
            <TextReveal
              as="h2"
              text={HOME.crossBorder.headline}
              className="mt-3 max-w-2xl font-display text-display-sm font-extrabold tracking-tight sm:text-display-md"
            />
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-fg-muted md:text-lg">
              {HOME.crossBorder.subhead}
            </p>
          </Reveal>
          <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 max-md:-mx-4 max-md:flex max-md:snap-x max-md:snap-mandatory max-md:overflow-x-auto max-md:px-4 max-md:pb-3 max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden">
            {HOME.crossBorder.pillars.map((pillar, i) => (
              <Reveal as="li" key={pillar.title} delay={i * 0.08} className="max-md:w-[82vw] max-md:shrink-0 max-md:snap-center">
                <SpotlightCard
                  className="h-full rounded-2xl border border-black/5 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/30 hover:shadow-xl hover:shadow-brand-indigo/10 lg:p-8"
                  glow="color-mix(in oklab, var(--color-brand-red) 12%, transparent)"
                >
                  <span className="mb-5 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-red/10 font-display text-sm font-extrabold text-brand-red">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-xl font-extrabold uppercase tracking-wider">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-fg-muted">
                    {pillar.body}
                  </p>
                </SpotlightCard>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* THE DRIVE — pinned truck cinematic (falls back to the vertical
          journey under prefers-reduced-motion) */}
      <TheDrive
        eyebrow={HOME.journey.eyebrow}
        headline={HOME.journey.headline}
        body={HOME.journey.body}
        stages={HOME.journey.stages}
      />

      {/* CROSS-BORDER DOCK OPERATIONS */}
      <section className="bg-white py-16 md:py-24 lg:py-32">
        <div className="mx-auto grid w-full max-w-screen-2xl grid-cols-1 items-center gap-12 px-4 lg:grid-cols-2 md:px-8">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red">
              {HOME.crossDock.eyebrow}
            </p>
            <TextReveal
              as="h2"
              text={HOME.crossDock.headline}
              className="mt-3 font-display text-display-sm font-extrabold tracking-tight sm:text-display-md"
            />
            <p className="mt-5 text-base leading-relaxed text-fg-muted md:text-lg">
              {HOME.crossDock.body}
            </p>
          </Reveal>
          <Reveal
            delay={0.1}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted"
          >
            <ParallaxLayer amount={36}>
              <Image
                src={HOME.crossDock.image}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </ParallaxLayer>
          </Reveal>
        </div>
      </section>

      {/* TEXAS / U.S. FREIGHT BAND */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <ParallaxLayer amount={48} scale={1.12}>
            <Image
              src={HOME.texasBand.bgImage}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
          </ParallaxLayer>
          <div className="absolute inset-0 bg-brand-indigo/85" />
        </div>
        <div className="relative mx-auto flex max-w-screen-2xl flex-col items-center px-4 py-20 text-center text-white md:py-28 md:px-8">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red">
              {HOME.texasBand.eyebrow}
            </p>
            <h2 className="mt-4 mx-auto max-w-3xl font-display text-display-sm font-extrabold tracking-tight text-balance sm:text-display-md">
              {HOME.texasBand.headline}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-fg-subtle md:text-lg">
              {HOME.texasBand.body}
            </p>
            <Link
              href="/contact"
              className={cn(
                buttonVariants(),
                "mt-10 h-12 rounded-full px-8 text-base transition-all hover:bg-primary/85 active:scale-[0.98]"
              )}
            >
              Contact Us
            </Link>
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
            <h2 className="mt-3 max-w-2xl font-display text-display-sm font-extrabold tracking-tight text-balance sm:text-display-md">
              {HOME.howItWorks.headline}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-fg-subtle md:text-lg">
              {HOME.howItWorks.body}
            </p>
          </Reveal>
          <ol className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3 max-md:-mx-4 max-md:flex max-md:snap-x max-md:snap-mandatory max-md:overflow-x-auto max-md:px-4 max-md:pb-3 max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden">
            {HOME.howItWorks.steps.map((step, i) => (
              <Reveal as="li" key={step.n} delay={i * 0.1} className="max-md:w-[82vw] max-md:shrink-0 max-md:snap-center">
                <SpotlightCard
                  className="h-full rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/40"
                  glow="color-mix(in oklab, var(--color-brand-red) 20%, transparent)"
                >
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <Image
                      src={step.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover/spot:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-indigo via-brand-indigo/40 to-transparent" />
                  </div>
                  <div className="relative p-6 lg:p-8">
                    <span className="absolute -top-4 left-6 inline-flex h-8 items-center rounded-full bg-brand-red px-4 text-[10px] font-bold uppercase tracking-[0.2em] lg:left-8">
                      Step {step.n}
                    </span>
                    <h3 className="font-display text-2xl font-extrabold uppercase tracking-wider">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-fg-subtle">{step.body}</p>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* NETWORK */}
      <section
        id="network"
        className="scroll-mt-28 bg-white py-16 md:py-24 lg:py-32"
      >
        <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-8">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red">
              {HOME.network.eyebrow}
            </p>
            <TextReveal
              as="h2"
              text={HOME.network.headline}
              className="mt-3 max-w-3xl font-display text-display-sm font-extrabold tracking-tight sm:text-display-md"
            />
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-fg-muted md:text-lg">
              {HOME.network.body}
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mx-auto mt-12 w-full max-w-5xl">
            <NetworkMap />
          </Reveal>
          <CrossingChips className="mt-12" />
        </div>
      </section>

      {/* SERVICES (BENTO) */}
      <section id="services" className="scroll-mt-24 bg-muted/30 py-16 md:py-24 lg:py-32">
        <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-8">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red">
              Our Services
            </p>
            <TextReveal
              as="h2"
              text="Efficiency and reliability built into every shipment"
              className="mt-3 max-w-2xl font-display text-display-sm font-extrabold tracking-tight sm:text-display-md"
            />
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

          {/* Integrated solutions + technology (from the Services page, elevated here) */}
          <Reveal className="mt-20">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red">
              Integrated Logistics Solutions
            </p>
            <TextReveal
              as="h3"
              text="Designed for performance and reliability"
              className="mt-3 max-w-3xl font-display text-display-sm font-extrabold tracking-tight"
            />
          </Reveal>
          <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 max-md:-mx-4 max-md:flex max-md:snap-x max-md:snap-mandatory max-md:overflow-x-auto max-md:px-4 max-md:pb-3 max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden">
            {SERVICE_FEATURES.map((feature, i) => (
              <Reveal as="li" key={feature.title} delay={i * 0.08} className="max-md:w-[82vw] max-md:shrink-0 max-md:snap-center">
                <SpotlightCard
                  className="h-full rounded-2xl border border-black/5 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/30 hover:shadow-lg hover:shadow-brand-indigo/10 lg:p-8"
                  glow="color-mix(in oklab, var(--color-brand-red) 12%, transparent)"
                >
                  <span className="font-display text-sm font-extrabold tracking-[0.3em] text-brand-red">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="mt-3 font-display text-xl font-extrabold uppercase tracking-wider">
                    {feature.title}
                  </h4>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                    {feature.body}
                  </p>
                </SpotlightCard>
              </Reveal>
            ))}
          </ul>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {SERVICES_TECH.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <SpotlightCard
                  className="h-full rounded-2xl border border-black/5 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/30 hover:shadow-lg hover:shadow-brand-indigo/10 lg:p-8"
                  glow="color-mix(in oklab, var(--color-brand-red) 12%, transparent)"
                >
                  <h4 className="font-display text-lg font-extrabold uppercase tracking-wider">
                    {item.title}
                  </h4>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                    {item.body}
                  </p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15} className="mt-12">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-fg-subtle">
              Powered by industry-leading platforms
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-10 opacity-80 grayscale transition-[opacity,filter] hover:opacity-100 hover:grayscale-0">
              {TECH_PARTNERS.map((p) => (
                <Image
                  key={p.name}
                  src={p.logo}
                  alt={p.name}
                  width={140}
                  height={48}
                  className="h-9 w-auto"
                />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-white py-16 md:py-24 lg:py-32">
        <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-8">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red">
              {HOME.whyUs.eyebrow}
            </p>
            <TextReveal
              as="h2"
              text={HOME.whyUs.headline}
              className="mt-3 max-w-3xl font-display text-display-sm font-extrabold tracking-tight sm:text-display-md"
            />
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-fg-muted md:text-lg">
              {HOME.whyUs.body}
            </p>
          </Reveal>
          <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 max-md:-mx-4 max-md:flex max-md:snap-x max-md:snap-mandatory max-md:overflow-x-auto max-md:px-4 max-md:pb-3 max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden">
            {HOME.whyUs.features.map((feature, i) => {
              const Icon = WHY_US_ICONS[feature.icon];
              return (
                <Reveal as="li" key={feature.title} delay={i * 0.08} y={16} className="max-md:w-[82vw] max-md:shrink-0 max-md:snap-center">
                  <SpotlightCard
                    className="h-full rounded-2xl border border-black/5 bg-muted/30 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/30 hover:shadow-lg hover:shadow-brand-indigo/10"
                    glow="color-mix(in oklab, var(--color-brand-red) 12%, transparent)"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red ring-1 ring-brand-red/20 transition-transform duration-300 group-hover/spot:scale-110">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-extrabold uppercase tracking-wider">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                      {feature.body}
                    </p>
                  </SpotlightCard>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* CERT MARQUEE */}
      <section className="grain relative isolate overflow-hidden bg-brand-indigo py-16 text-white md:py-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="bg-grid absolute inset-0 opacity-[0.15]" />
          <div className="grain-layer absolute inset-0 opacity-[0.05] mix-blend-overlay" />
        </div>
        <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-8">
          <Reveal className="text-center">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red">
              Partners & Certifications
            </p>
            <TextReveal
              as="h2"
              text="The credentials that keep your freight in the fast lane"
              className="mx-auto mt-3 max-w-2xl font-display text-display-sm font-extrabold tracking-tight"
            />
          </Reveal>
          <div className="mt-10">
            <CertMarquee />
          </div>
          <p className="mt-8 text-center">
            <Link
              href="/compilance"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-fg-subtle transition-colors hover:text-brand-red"
            >
              See how our security program works
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </p>
        </div>
      </section>


      {/* COMPLIANCE & SECURITY — certified, audit-ready (full detail on /compilance) */}
      <section id="compliance" className="scroll-mt-24 bg-white py-16 md:py-24 lg:py-32">
        <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-8">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red">
              Compliance & Security
            </p>
            <TextReveal
              as="h2"
              text="Two programs, one security playbook"
              className="mt-3 font-display text-display-sm font-extrabold tracking-tight sm:text-display-md"
            />
            <p className="mt-5 text-base leading-relaxed text-fg-muted md:text-lg">
              As a trusted C-TPAT/OEA member, TBM Carriers meets rigorous
              security standards to ensure the integrity, reliability, and
              safety of international trade operations across North America.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <CertGrid variant="strip" />
          </Reveal>
          <Reveal
            delay={0.15}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm"
          >
            <a
              href={mailtoHref(
                SITE.safetyEmail,
                "Compliance / C-TPAT inquiry — TBM Carriers"
              )}
              className="font-medium text-brand-red underline-offset-4 hover:underline"
            >
              Email our safety team
            </a>
            <Link
              href="/compilance"
              className="group inline-flex items-center gap-1.5 font-medium text-fg-muted transition-colors hover:text-brand-red"
            >
              Partnerships and certifications
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <ParallaxLayer amount={48} scale={1.12}>
            <Image
              src={HOME.finalCta.bgImage}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
          </ParallaxLayer>
          <div className="absolute inset-0 bg-brand-indigo-deep/85" />
        </div>
        <div className="relative mx-auto flex max-w-screen-2xl flex-col items-center px-4 py-24 text-center text-white md:px-8 md:py-32">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red">
              {HOME.finalCta.eyebrow}
            </p>
            <h2 className="mt-4 max-w-3xl font-display text-display-sm font-extrabold tracking-tight text-balance sm:text-display-md">
              {HOME.finalCta.headline}
            </h2>
            <ContactSalesLink
              className={cn(
                buttonVariants(),
                "shine-hover group mt-10 h-12 gap-2 rounded-full px-8 text-base transition-all hover:bg-primary/90 active:scale-[0.98]"
              )}
            >
              Contact Sales
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </ContactSalesLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
