import Image from "next/image";
import { CERTIFICATIONS } from "@/lib/content/certifications";
import { cn } from "@/lib/utils";

type CertGridProps = {
  variant?: "grid" | "strip";
  className?: string;
};

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
          <li key={c.slug} title={c.full}>
            <div className="flex h-14 w-32 items-center justify-center rounded-lg bg-white px-4">
              <Image
                src={c.logo}
                alt={c.full}
                width={140}
                height={56}
                className="h-9 w-auto object-contain"
              />
            </div>
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
        <li
          key={c.slug}
          className="group flex flex-col items-center gap-4 rounded-xl border border-black/10 bg-white p-6 text-center transition-all hover:-translate-y-0.5 hover:border-brand-red hover:shadow-md"
        >
          <div className="flex h-16 w-full items-center justify-center">
            <Image
              src={c.logo}
              alt={c.full}
              width={160}
              height={64}
              className="h-full w-auto object-contain"
            />
          </div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-foreground">
            {c.short}
          </p>
        </li>
      ))}
    </ul>
  );
}
