import Image from "next/image";
import { CERTIFICATIONS } from "@/lib/content/certifications";
import { cn } from "@/lib/utils";

type CertMarqueeProps = {
  className?: string;
  /** Duration of one full loop. Default "40s". */
  speed?: string;
};

/**
 * Auto-scrolling horizontal cert logo strip. CSS-only.
 * Pauses on hover, respects prefers-reduced-motion (via globals.css).
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
        className="flex w-max items-center gap-6 animate-marquee group-hover:[animation-play-state:paused]"
        style={{ ["--marquee-duration" as string]: speed }}
      >
        {items.map((c, i) => (
          <div
            key={`${c.slug}-${i}`}
            className="flex h-16 w-36 shrink-0 items-center justify-center rounded-lg bg-white px-4 shadow-sm"
            title={c.full}
            aria-hidden={i >= CERTIFICATIONS.length}
          >
            <Image
              src={c.logo}
              alt={c.full}
              width={140}
              height={56}
              className="h-10 w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
