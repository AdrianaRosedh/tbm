import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Globe2,
  Headphones,
  ShieldCheck,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { TheDrive } from "@/components/site/the-drive";
import { CertMarquee } from "@/components/site/cert-marquee";
import { Faq } from "@/components/site/faq";
import { CrossingChips } from "@/components/site/crossing-chips";
import { MarqueeBand } from "@/components/site/marquee-band";
import { NetworkReveal } from "@/components/site/network-reveal";
import { ParallaxLayer } from "@/components/site/parallax";
import { ParallaxDrift } from "@/components/site/parallax-drift";
import { StepProgress } from "@/components/site/step-progress";
import { Reveal } from "@/components/site/reveal";
import { ServiceGrid } from "@/components/site/service-grid";
import { SnapCarousel } from "@/components/site/snap-carousel";
import { SpotlightCard } from "@/components/site/spotlight-card";
import { ContactPopupLink } from "@/components/site/contact-popup-link";
import { JumpLink } from "@/components/site/jump-link";
import { StatCounter } from "@/components/site/stat-counter";
import { TextReveal } from "@/components/site/text-reveal";
import { SITE, TECH_PARTNERS } from "@/lib/content/site";
import { getContent, type Locale } from "@/lib/i18n";
import { cn, mailtoHref } from "@/lib/utils";

const KNOW_US_PILLAR_ICONS: readonly LucideIcon[] = [ShieldCheck, Wrench, Building2];

const WHY_US_ICONS: Record<string, LucideIcon> = {
  Zap,
  ShieldCheck,
  Globe2,
  Headphones,
};

export function SiteHome({ locale }: { locale: Locale }) {
  // Alias each dictionary slice back to the names the JSX already uses, so the
  // page body is identical across locales and English stays byte-for-byte.
  const c = getContent(locale);
  const HOME = c.home;
  const ABOUT = c.about;
  const COMPLIANCE_PRACTICES = c.compliancePractices;
  const SERVICES_AI = c.servicesAi;
  const SERVICES_TECH = c.servicesTech;
  const SERVICE_FEATURES = c.serviceFeatures;
  const ui = c.ui;
  const nav = c.nav;
  return (
    <>
      {/* HERO — full first screen: content centers, stats dock at the fold */}
      <section className="grain relative isolate flex min-h-dvh flex-col overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <ParallaxLayer amount={56} scale={1.12}>
            <Image
              src={HOME.hero.bgImage}
              alt=""
              fill
              priority
              quality={72}
              sizes="100vw"
              className="hero-pan object-cover motion-reduce:animate-none"
            />
          </ParallaxLayer>
          {/* Scrim — dark enough for legible text, light enough to let the
              highway light-trails show through (was a flat 85% that hid it). */}
          <div className="absolute inset-0 bg-brand-indigo/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-indigo-deep/90 via-brand-indigo/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-indigo-deep via-brand-indigo/25 to-transparent" />
          {/* Aurora glows */}
          <div className="animate-aurora absolute -left-24 top-1/4 h-[30rem] w-[30rem] rounded-full bg-brand-red/20 blur-3xl" />
          <div className="animate-float-slow absolute -right-10 top-0 h-[26rem] w-[26rem] rounded-full bg-[#3a2f6b]/50 blur-3xl" />
          {/* Texture */}
          <div className="bg-grid absolute inset-0 opacity-[0.18]" />
          <div className="grain-layer absolute inset-0 opacity-[0.06] mix-blend-overlay" />
          {/* Top vignette so the glass header blends */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-brand-indigo-deep/60 to-transparent" />
        </div>

        <div className="relative mx-auto flex w-full max-w-screen-2xl flex-1 flex-col justify-center px-4 pb-10 pt-28 text-white md:pb-10 md:pt-32 md:px-8">
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
            className="animate-rise mt-8 max-w-5xl font-heading text-display-lg font-black uppercase leading-[0.95] tracking-[-0.02em] text-brand-red-bright sm:text-display-xl lg:text-display-2xl"
            style={{ animationDelay: "60ms" }}
          >
            {HOME.hero.headline}
          </h1>
          <p
            className="animate-rise mt-7 max-w-xl text-base leading-relaxed text-fg-subtle md:text-lg"
            style={{ animationDelay: "140ms" }}
          >
            {HOME.hero.subhead}
          </p>
          <div
            className="animate-rise mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4"
            style={{ animationDelay: "220ms" }}
          >
            <ContactPopupLink
              className={cn(
                buttonVariants(),
                "shine-hover group h-12 gap-2 rounded-full pl-7 pr-3 text-base font-semibold shadow-[0_12px_36px_-10px_rgba(213,61,40,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_48px_-10px_rgba(213,61,40,0.9)] active:translate-y-0 active:scale-[0.98] max-sm:w-full"
              )}
            >
              {ui.contactSales}
              <span className="grid size-7 place-items-center rounded-full bg-white/20 transition-all duration-300 group-hover:translate-x-0.5 group-hover:bg-white/30">
                <ArrowRight className="h-4 w-4" />
              </span>
            </ContactPopupLink>
            <JumpLink
              to="services"
              className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.06] pl-7 pr-3 font-display text-base font-medium text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/45 hover:bg-white/[0.12] active:translate-y-0 active:scale-[0.98] sm:w-auto"
            >
              {ui.ourServices}
              <span className="grid size-7 place-items-center rounded-full bg-white/10 transition-all duration-300 group-hover:bg-brand-red">
                <ArrowUpRight className="h-4 w-4 text-brand-red-bright transition-colors duration-300 group-hover:text-white" />
              </span>
            </JumpLink>
          </div>

          {/* Scroll cue */}
          <div className="mt-10 hidden items-center gap-3 text-xs uppercase tracking-[0.2em] text-fg-subtle md:flex">
            <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1">
              <span className="animate-scroll-cue h-1.5 w-1 rounded-full bg-brand-red" />
            </span>
            {ui.scrollToExplore}
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
                alt="A row of TBM Carriers' blue tractors lined up at a terminal"
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
              className="mt-3 font-heading text-display-sm font-extrabold tracking-tight sm:text-display-md"
            />
            {HOME.about.body.map((p, i) => (
              <p
                key={i}
                className="mt-5 text-base leading-relaxed text-fg-muted md:text-lg"
              >
                {p}
              </p>
            ))}
            <JumpLink
              to="about"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "mt-8 h-11 rounded-full px-6 transition-all active:scale-[0.98]"
              )}
            >
              {ui.learnAboutUs}
            </JumpLink>
          </Reveal>
        </div>
      </section>

      {/* KNOW US — mission, vision, history (from the About page, elevated here) */}
      <section id="about" className="scroll-mt-24 bg-muted/30 py-16 md:py-24 lg:py-32">
        <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-8">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red">
              {ABOUT.mvh.eyebrow}
            </p>
            <TextReveal
              as="h2"
              text={ABOUT.mvh.headline}
              className="mt-3 max-w-3xl font-heading text-display-sm font-extrabold tracking-tight sm:text-display-md"
            />
          </Reveal>
          <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 max-md:-mx-4 max-md:flex max-md:snap-x max-md:snap-mandatory max-md:overflow-x-auto max-md:[touch-action:pan-x] max-md:overscroll-x-contain max-md:px-4 max-md:pb-3 max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden">
            {ABOUT.mvh.items.map((item, i) => (
              <Reveal as="li" key={item.label} delay={i * 0.08} className="max-md:w-[82vw] max-md:shrink-0 max-md:snap-center">
                <ParallaxDrift index={i}>
                <SpotlightCard
                  className="h-full rounded-2xl border border-black/5 bg-white p-8 transition-all duration-300 md:hover:-translate-y-1 hover:border-brand-red/30 md:hover:shadow-xl hover:shadow-brand-indigo/10"
                  glow="color-mix(in oklab, var(--color-brand-red) 12%, transparent)"
                >
                  <div className="mb-[18px] flex items-center gap-3">
                    <span
                      className="shrink-0 text-sm text-brand-indigo/70"
                      style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400 }}
                    >
                      {["I", "II", "III", "IV", "V", "VI"][i]}
                    </span>
                    <hr className="flex-1 border-t-[0.5px] border-black/15" />
                  </div>
                  <p className="mt-3 text-base font-semibold uppercase tracking-[0.25em] text-brand-red">
                    {item.label}
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-fg-muted">
                    {item.body}
                  </p>
                </SpotlightCard>
                </ParallaxDrift>
              </Reveal>
            ))}
          </ul>

          {/* Built on expertise — the About pillars, elevated here */}
          <Reveal className="mt-20">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red">
              {ABOUT.pillarsIntro.eyebrow}
            </p>
            <TextReveal
              as="h3"
              text={ABOUT.pillarsIntro.headline}
              className="mt-3 max-w-3xl font-heading text-display-sm font-extrabold tracking-tight"
            />
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-fg-muted md:text-lg">
              {ABOUT.pillarsIntro.body}
            </p>
          </Reveal>
          <SnapCarousel
            label={ABOUT.pillarsIntro.eyebrow}
            className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 max-md:-mx-4 max-md:flex max-md:snap-x max-md:snap-mandatory max-md:overflow-x-auto max-md:[touch-action:pan-x] max-md:overscroll-x-contain max-md:px-4 max-md:pb-3 max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden"
          >
            {ABOUT.pillars.map((pillar, i) => {
              const Icon = KNOW_US_PILLAR_ICONS[i];
              return (
                <Reveal as="li" key={pillar.title} delay={i * 0.08} className="max-md:w-[82vw] max-md:shrink-0 max-md:snap-center">
                  <ParallaxDrift index={i}>
                  <SpotlightCard
                    className="h-full rounded-2xl border border-black/5 bg-white p-6 transition-all duration-300 md:hover:-translate-y-1 hover:border-brand-red/30 md:hover:shadow-lg hover:shadow-brand-indigo/10 lg:p-8"
                    glow="color-mix(in oklab, var(--color-brand-red) 12%, transparent)"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red ring-1 ring-brand-red/20 transition-transform duration-300 group-hover/spot:scale-110">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h4 className="mt-6 font-heading text-xl font-extrabold tracking-tight">
                      {pillar.title}
                    </h4>
                    <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                      {pillar.body}
                    </p>
                  </SpotlightCard>
                  </ParallaxDrift>
                </Reveal>
              );
            })}
          </SnapCarousel>
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
              className="mt-3 max-w-2xl font-heading text-display-sm font-extrabold tracking-tight sm:text-display-md"
            />
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-fg-muted md:text-lg">
              {HOME.crossBorder.subhead}
            </p>
          </Reveal>
          <ul className="mt-12 grid grid-cols-1 gap-6 md:hidden max-md:-mx-4 max-md:flex max-md:snap-x max-md:snap-mandatory max-md:overflow-x-auto max-md:[touch-action:pan-x] max-md:overscroll-x-contain max-md:px-4 max-md:pb-3 max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden">
            {HOME.crossBorder.pillars.map((pillar, i) => (
              <Reveal as="li" key={pillar.title} delay={i * 0.08} className="max-md:w-[82vw] max-md:shrink-0 max-md:snap-center">
                <SpotlightCard
                  className="h-full rounded-2xl border border-black/5 bg-white p-6 transition-all duration-300 md:hover:-translate-y-1 hover:border-brand-red/30 md:hover:shadow-xl hover:shadow-brand-indigo/10 lg:p-8"
                  glow="color-mix(in oklab, var(--color-brand-red) 12%, transparent)"
                >
                  <span className="mb-5 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-red/10 font-display text-sm font-extrabold text-brand-indigo">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-heading text-xl font-extrabold tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-fg-muted">
                    {pillar.body}
                  </p>
                </SpotlightCard>
              </Reveal>
            ))}
          </ul>

          {/* Desktop: the pillars stack as a scroll deck */}
          <div className="mt-12 hidden md:block">
            {HOME.crossBorder.pillars.map((pillar, i) => (
              <div key={pillar.title} className="h-[56vh]">
                <div className="sticky" style={{ top: `${7.5 + i * 1.75}rem` }}>
                  <SpotlightCard
                    className="relative overflow-hidden rounded-3xl border border-black/5 bg-white p-10 shadow-[0_24px_70px_-30px_rgba(15,11,38,0.35)] lg:p-14"
                    glow="color-mix(in oklab, var(--color-brand-red) 10%, transparent)"
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-red/10 font-display text-sm font-extrabold text-brand-indigo">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-6 max-w-3xl font-heading text-display-sm font-extrabold tracking-tight">
                      {pillar.title}
                    </h3>
                    <p className="mt-4 max-w-2xl text-base leading-relaxed text-fg-muted lg:text-lg">
                      {pillar.body}
                    </p>
                  </SpotlightCard>
                </div>
              </div>
            ))}
          </div>
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
              className="mt-3 font-heading text-display-sm font-extrabold tracking-tight sm:text-display-md"
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
                alt="A TBM Carriers tractor-trailer backed into a numbered loading dock"
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
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red-bright">
              {HOME.texasBand.eyebrow}
            </p>
            <h2 className="mt-4 mx-auto max-w-3xl font-heading text-display-sm font-extrabold tracking-tight text-balance sm:text-display-md">
              {HOME.texasBand.headline}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-fg-subtle md:text-lg">
              {HOME.texasBand.body}
            </p>
            <ContactPopupLink
              className={cn(
                buttonVariants(),
                "mt-10 h-12 rounded-full px-8 text-base transition-all hover:bg-primary/85 active:scale-[0.98]"
              )}
            >
              {nav.contact}
            </ContactPopupLink>
          </Reveal>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-brand-indigo py-16 text-white md:py-24 lg:py-32">
        <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-8">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red-bright">
              {HOME.howItWorks.eyebrow}
            </p>
            <h2 className="mt-3 max-w-2xl font-heading text-display-sm font-extrabold tracking-tight text-balance sm:text-display-md">
              {HOME.howItWorks.headline}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-fg-subtle md:text-lg">
              {HOME.howItWorks.body}
            </p>
          </Reveal>
          <ol className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3 max-md:-mx-4 max-md:flex max-md:snap-x max-md:snap-mandatory max-md:overflow-x-auto max-md:[touch-action:pan-x] max-md:overscroll-x-contain max-md:px-4 max-md:pb-3 max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden">
            {HOME.howItWorks.steps.map((step, i) => (
              <Reveal as="li" key={step.n} delay={i * 0.1} className="max-md:w-[82vw] max-md:shrink-0 max-md:snap-center">
                <ParallaxDrift index={i}>
                <SpotlightCard
                  className="h-full rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm transition-all duration-300 md:hover:-translate-y-1 hover:border-brand-red/40"
                  glow="color-mix(in oklab, var(--color-brand-red) 20%, transparent)"
                >
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <ParallaxLayer amount={20}>
                      <Image
                        src={step.image}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover/spot:scale-105"
                      />
                    </ParallaxLayer>
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-indigo via-brand-indigo/40 to-transparent" />
                  </div>
                  <div className="relative p-6 lg:p-8">
                    <span className="absolute -top-4 left-6 inline-flex h-8 items-center rounded-full bg-brand-red px-4 text-[10px] font-bold uppercase tracking-[0.2em] lg:left-8">
                      Step {step.n}
                    </span>
                    <h3 className="font-heading text-2xl font-extrabold tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-fg-subtle">{step.body}</p>
                  </div>
                </SpotlightCard>
                </ParallaxDrift>
              </Reveal>
            ))}
          </ol>
          <StepProgress steps={3} className="mt-12" />
        </div>
      </section>

      {/* NETWORK */}
      <section id="network" className="scroll-mt-28 bg-white">
        <NetworkReveal
          eyebrow={HOME.network.eyebrow}
          headline={HOME.network.headline}
          body={HOME.network.body}
        />
        <div className="mx-auto w-full max-w-screen-2xl px-4 pb-16 pt-6 md:px-8 md:pb-24 md:pt-10">
          <CrossingChips />
          <div className="mt-10 text-center">
            <Link
              href={locale === "es" ? "/es/network" : "/network"}
              className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-brand-red transition-opacity hover:opacity-70"
            >
              {ui.learnMoreAbout} {nav.networkServices}
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES (BENTO) */}
      <section id="services" className="scroll-mt-24 bg-muted/30 py-16 md:py-24 lg:py-32">
        <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-8">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red">
              {ui.ourServices}
            </p>
            <TextReveal
              as="h2"
              text={ui.servicesHeadline}
              className="mt-3 max-w-2xl font-heading text-display-sm font-extrabold tracking-tight sm:text-display-md"
            />
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-fg-muted md:text-lg">
              {ui.servicesCommitment}
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <ServiceGrid />
          </Reveal>

          {/* Integrated solutions + technology (from the Services page, elevated here) */}
          <Reveal className="mt-20">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red">
              {ui.integratedEyebrow}
            </p>
            <TextReveal
              as="h3"
              text={ui.integratedHeadline}
              className="mt-3 max-w-3xl font-heading text-display-sm font-extrabold tracking-tight"
            />
          </Reveal>
          <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 max-md:-mx-4 max-md:flex max-md:snap-x max-md:snap-mandatory max-md:overflow-x-auto max-md:[touch-action:pan-x] max-md:overscroll-x-contain max-md:px-4 max-md:pb-3 max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden">
            {SERVICE_FEATURES.map((feature, i) => (
              <Reveal as="li" key={feature.title} delay={i * 0.08} className="max-md:w-[82vw] max-md:shrink-0 max-md:snap-center">
                <SpotlightCard
                  className="h-full rounded-2xl border border-black/5 bg-white p-6 transition-all duration-300 md:hover:-translate-y-1 hover:border-brand-red/30 md:hover:shadow-lg hover:shadow-brand-indigo/10 lg:p-8"
                  glow="color-mix(in oklab, var(--color-brand-red) 12%, transparent)"
                >
                  <span className="font-display text-sm font-extrabold tracking-[0.3em] text-brand-red">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="mt-3 font-heading text-xl font-extrabold tracking-tight">
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
                <ParallaxDrift index={i}>
                <SpotlightCard
                  className="h-full rounded-2xl border border-black/5 bg-white p-6 transition-all duration-300 md:hover:-translate-y-1 hover:border-brand-red/30 md:hover:shadow-lg hover:shadow-brand-indigo/10 lg:p-8"
                  glow="color-mix(in oklab, var(--color-brand-red) 12%, transparent)"
                >
                  <span className="font-display text-sm font-extrabold tracking-[0.2em] text-brand-red">
                    {item.partner}
                  </span>
                  <h4 className="mt-2 font-display text-lg font-extrabold tracking-tight">
                    {item.title}
                  </h4>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                    {item.body}
                  </p>
                </SpotlightCard>
                </ParallaxDrift>
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

          {/* Utilizing AI to simplify Carta Porte (from the Services page) */}
          <div className="mt-20 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red">
                {SERVICES_AI.eyebrow}
              </p>
              <TextReveal
                as="h3"
                text={SERVICES_AI.headline}
                className="mt-3 font-heading text-display-sm font-extrabold tracking-tight"
              />
              <p className="mt-5 text-base leading-relaxed text-fg-muted md:text-lg">
                {SERVICES_AI.body}
              </p>
            </Reveal>
            <Reveal
              delay={0.1}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted"
            >
              <ParallaxLayer amount={32}>
                <Image
                  src={SERVICES_AI.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-left"
                />
              </ParallaxLayer>
            </Reveal>
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
            <TextReveal
              as="h2"
              text={HOME.whyUs.headline}
              className="mt-3 max-w-3xl font-heading text-display-sm font-extrabold tracking-tight sm:text-display-md"
            />
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-fg-muted md:text-lg">
              {HOME.whyUs.body}
            </p>
          </Reveal>
          <SnapCarousel
            label={HOME.whyUs.eyebrow}
            className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 max-md:-mx-4 max-md:flex max-md:snap-x max-md:snap-mandatory max-md:overflow-x-auto max-md:[touch-action:pan-x] max-md:overscroll-x-contain max-md:px-4 max-md:pb-3 max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden"
          >
            {HOME.whyUs.features.map((feature, i) => {
              const Icon = WHY_US_ICONS[feature.icon];
              return (
                <Reveal as="li" key={feature.title} delay={i * 0.08} y={16} className="max-md:w-[82vw] max-md:shrink-0 max-md:snap-center">
                  <ParallaxDrift index={i}>
                  <SpotlightCard
                    className="h-full rounded-2xl border border-black/5 bg-muted/30 p-6 transition-all duration-300 md:hover:-translate-y-1 hover:border-brand-red/30 md:hover:shadow-lg hover:shadow-brand-indigo/10"
                    glow="color-mix(in oklab, var(--color-brand-red) 12%, transparent)"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red ring-1 ring-brand-red/20 transition-transform duration-300 group-hover/spot:scale-110">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-extrabold tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                      {feature.body}
                    </p>
                  </SpotlightCard>
                  </ParallaxDrift>
                </Reveal>
              );
            })}
          </SnapCarousel>
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
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red-bright">
              Partners & Certifications
            </p>
            <TextReveal
              as="h2"
              text="The credentials that keep your freight in the fast lane"
              className="mx-auto mt-3 max-w-2xl font-heading text-display-sm font-extrabold tracking-tight"
            />
          </Reveal>
          <div className="mt-10">
            <CertMarquee />
          </div>
          <p className="mt-8 text-center">
            <JumpLink
              to="compliance"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-fg-subtle transition-colors hover:text-brand-red"
            >
              {ui.footerSecurityLink}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </JumpLink>
          </p>
        </div>
      </section>


      {/* COMPLIANCE & SECURITY — certified, audit-ready (full detail on /compilance) */}
      <section id="compliance" className="scroll-mt-24 bg-white py-16 md:py-24 lg:py-32">
        <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-8">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red">
              {nav.compliance}
            </p>
            <TextReveal
              as="h2"
              text={ui.complianceHeadline}
              className="mt-3 font-heading text-display-sm font-extrabold tracking-tight sm:text-display-md"
            />
            <p className="mt-5 text-base leading-relaxed text-fg-muted md:text-lg">
              {ui.complianceIntro}
            </p>
          </Reveal>
          <ul className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-x-10 gap-y-4 text-left sm:grid-cols-2">
            {COMPLIANCE_PRACTICES.map((practice, i) => (
              <Reveal
                as="li"
                key={practice}
                delay={i * 0.05}
                y={12}
                className="flex items-start gap-3 text-sm leading-relaxed text-fg-muted"
              >
                <span
                  aria-hidden="true"
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red"
                />
                <span>{practice}</span>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.1} className="mt-10 text-center">
            <Link
              href={locale === "es" ? "/es/compliance" : "/compliance"}
              className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-brand-red transition-opacity hover:opacity-70"
            >
              {ui.partnershipsCerts}
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </Reveal>
          <Reveal
            delay={0.15}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm"
          >
            <a
              href="tel:+12107323400;ext=5310"
              className="font-medium tabular-nums text-fg-muted transition-colors hover:text-brand-red"
            >
              +1 (210) 732-3400 ext. 5310
            </a>
            <a
              href={mailtoHref(
                SITE.safetyEmail,
                "Compliance / C-TPAT inquiry — TBM Carriers"
              )}
              className="font-medium text-brand-red underline-offset-4 hover:underline"
            >
              {ui.emailSafetyTeam}
            </a>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-24 bg-muted/30 py-16 md:py-24 lg:py-32">
        <Faq />
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
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red-bright">
              {HOME.finalCta.eyebrow}
            </p>
            <h2 className="mt-4 max-w-3xl font-heading text-display-sm font-extrabold tracking-tight text-balance sm:text-display-md">
              {HOME.finalCta.headline}
            </h2>
            <ContactPopupLink
              className={cn(
                buttonVariants(),
                "shine-hover group mt-10 h-12 gap-2 rounded-full px-8 text-base transition-all hover:bg-primary/90 active:scale-[0.98]"
              )}
            >
              {ui.contactSales}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </ContactPopupLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
