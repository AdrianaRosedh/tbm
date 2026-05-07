import Image from "next/image";
import Link from "next/link";
import { Building2, ShieldCheck, Wrench, type LucideIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { CertGrid } from "@/components/site/cert-grid";
import { Reveal } from "@/components/site/reveal";
import { ABOUT } from "@/lib/content/about";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

const PILLAR_ICONS: readonly LucideIcon[] = [ShieldCheck, Wrench, Building2];

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={ABOUT.hero.bgImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-brand-indigo/85" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-indigo-deep/70" />
        </div>
        <div className="relative mx-auto flex min-h-[55dvh] w-full max-w-screen-2xl flex-col justify-center px-4 py-20 text-white md:py-24 md:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red">
            {ABOUT.hero.eyebrow}
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-display-md font-bold leading-[0.95] tracking-[-0.02em] text-balance sm:text-display-lg">
            {ABOUT.hero.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-fg-subtle md:text-lg">
            {ABOUT.hero.subhead}
          </p>
        </div>
      </section>

      {/* PILLARS */}
      <section className="bg-white py-16 md:py-24 lg:py-32">
        <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-8">
          <ul className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {ABOUT.pillars.map((pillar, i) => {
              const Icon = PILLAR_ICONS[i];
              return (
                <Reveal as="li" key={pillar.title} delay={i * 0.1}>
                  <div className="h-full rounded-2xl border border-black/5 bg-muted/30 p-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h2 className="mt-6 font-display text-2xl font-bold uppercase tracking-wider">
                      {pillar.title}
                    </h2>
                    <p className="mt-3 text-fg-muted">{pillar.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* STORY */}
      <section className="bg-muted/30 py-16 md:py-24 lg:py-32">
        <div className="mx-auto grid w-full max-w-screen-2xl grid-cols-1 items-center gap-12 px-4 lg:grid-cols-2 md:px-8">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red">
              {ABOUT.story.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-display-sm font-bold tracking-tight text-balance sm:text-display-md">
              {ABOUT.story.headline}
            </h2>
            {ABOUT.story.body.map((p, i) => (
              <p
                key={i}
                className="mt-5 text-base leading-relaxed text-fg-muted md:text-lg"
              >
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal delay={0.1} className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
            <Image
              src={ABOUT.story.image}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* FACILITIES */}
      <section className="bg-white py-16 md:py-24 lg:py-32">
        <div className="mx-auto grid w-full max-w-screen-2xl grid-cols-1 items-center gap-12 px-4 lg:grid-cols-2 md:px-8">
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
            <Image
              src={ABOUT.facilities.image}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red">
              {ABOUT.facilities.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-display-sm font-bold tracking-tight text-balance sm:text-display-md">
              {ABOUT.facilities.headline}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-fg-muted md:text-lg">
              {ABOUT.facilities.body}
            </p>
          </Reveal>
        </div>
      </section>

      {/* AI / CARTA PORTE */}
      <section className="bg-brand-indigo py-16 text-white md:py-24 lg:py-32">
        <div className="mx-auto w-full max-w-3xl px-4 text-center md:px-8">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-red">
              {ABOUT.ai.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-display-sm font-bold tracking-tight text-balance sm:text-display-md">
              {ABOUT.ai.headline}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-fg-subtle md:text-lg">
              {ABOUT.ai.body}
            </p>
          </Reveal>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="bg-muted/30 py-16 md:py-24 lg:py-32">
        <div className="mx-auto w-full max-w-screen-2xl px-4 md:px-8">
          <Reveal>
            <p className="text-center text-xs font-medium uppercase tracking-[0.25em] text-brand-red">
              Partnerships & Certifications
            </p>
            <h2 className="mt-3 text-center font-display text-display-sm font-bold tracking-tight text-balance sm:text-display-md">
              Certified by the agencies that matter
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <CertGrid />
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-14 md:py-20 lg:py-24">
        <Reveal className="mx-auto flex max-w-screen-2xl flex-col items-center gap-6 px-4 text-center md:px-8">
          <h2 className="font-display text-display-sm font-bold tracking-tight text-balance sm:text-display-md">
            Ready to ship with confidence?
          </h2>
          <Link
            href="/get-a-quote"
            className={cn(
              buttonVariants(),
              "h-12 rounded-full px-8 text-base transition-all hover:bg-primary/85 active:scale-[0.98]"
            )}
          >
            Get a Quote
          </Link>
        </Reveal>
      </section>
    </>
  );
}
