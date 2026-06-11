import Image from "next/image";
import { JumpLink } from "./jump-link";
import { CERTIFICATIONS } from "@/lib/content/certifications";
import { cn } from "@/lib/utils";

type CertMarqueeProps = {
  className?: string;
  /** Duration of one full loop. Default "40s". */
  speed?: string;
};

/**
 * Auto-scrolling certification strip. CSS-only motion; pauses on hover,
 * respects prefers-reduced-motion (via globals.css). Every badge jumps to the
 * compliance section (#compliance) on the one-page site.
 */
export function CertMarquee({ className, speed = "40s" }: CertMarqueeProps) {
  const items = [...CERTIFICATIONS, ...CERTIFICATIONS];

  return (
    <div
      className={cn(
        "group relative overflow-hidden",
        // Edge fades for the dark band
        "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className
      )}
      role="region"
      aria-label="Certifications"
    >
      <div
        className="flex w-max items-stretch gap-5 animate-marquee group-hover:[animation-play-state:paused]"
        style={{ ["--marquee-duration" as string]: speed }}
      >
        {items.map((c, i) => (
          <JumpLink
            key={`${c.slug}-${i}`}
            to="compliance"
            title={c.full}
            aria-hidden={i >= CERTIFICATIONS.length}
            tabIndex={i >= CERTIFICATIONS.length ? -1 : 0}
            className="group/badge flex w-44 shrink-0 flex-col items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/50 hover:shadow-lg hover:shadow-brand-red/10"
          >
            <span className="flex h-12 items-center justify-center">
              <Image
                src={c.logo}
                alt={c.full}
                width={140}
                height={56}
                className="h-10 w-auto object-contain transition-transform duration-300 group-hover/badge:scale-105"
              />
            </span>
            <span className="text-center text-[10px] font-semibold uppercase tracking-widest text-brand-indigo">
              {c.short}
            </span>
          </JumpLink>
        ))}
      </div>
    </div>
  );
}
