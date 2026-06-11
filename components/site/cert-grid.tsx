import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { JumpLink } from "./jump-link";
import { CERTIFICATIONS } from "@/lib/content/certifications";
import { cn } from "@/lib/utils";

type CertGridProps = {
  variant?: "grid" | "strip";
  className?: string;
};

/**
 * Certification badges. Every badge jumps to the compliance section's program
 * detail (#compliance on the one-page site) — proof, not decoration.
 */
export function CertGrid({ variant = "grid", className }: CertGridProps) {
  if (variant === "strip") {
    return (
      <ul
        className={cn(
          "flex flex-wrap items-center justify-center gap-4 sm:gap-6",
          className
        )}
      >
        {CERTIFICATIONS.map((c) => (
          <li key={c.slug}>
            <JumpLink
              to="compliance"
              title={c.full}
              className="group flex h-16 w-36 items-center justify-center rounded-xl border border-black/10 bg-white px-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-red/50 hover:shadow-md"
            >
              <Image
                src={c.logo}
                alt={c.full}
                width={140}
                height={56}
                className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </JumpLink>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul
      className={cn(
        "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6",
        className
      )}
    >
      {CERTIFICATIONS.map((c) => (
        <li key={c.slug}>
          <JumpLink
            to="compliance"
            className="group flex h-full flex-col items-center gap-4 rounded-2xl border border-black/10 bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/50 hover:shadow-lg hover:shadow-brand-indigo/10"
          >
            <div className="flex h-16 w-full items-center justify-center">
              <Image
                src={c.logo}
                alt={c.full}
                width={160}
                height={64}
                className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="mt-auto">
              <p className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-widest text-foreground">
                {c.short}
                <ArrowUpRight
                  className="h-3 w-3 text-brand-red opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                  aria-hidden="true"
                />
              </p>
              <p className="mt-1 line-clamp-3 text-[11px] leading-snug text-fg-muted">
                {c.blurb}
              </p>
            </div>
          </JumpLink>
        </li>
      ))}
    </ul>
  );
}
