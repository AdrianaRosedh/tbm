"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type SnapCarouselProps = {
  /** Classes for the track itself (keep the existing grid + snap classes here). */
  className?: string;
  children: ReactNode;
  /** Accessible name for the dot control. */
  label?: string;
  /** Dot palette for the section behind it. */
  tone?: "onLight" | "onDark";
};

/**
 * Mobile carousel scaffold. Renders the existing snap `<ul>`/`<ol>` track
 * exactly as-is (so the md+ grid is untouched) and adds an app-style page-dot
 * indicator beneath it on mobile only. Dots reflect the snapped card and
 * tap-to-scroll. On md+ the dots are `display:none`, so desktop/iPad render
 * identically — the DOM just gains one hidden element.
 */
export function SnapCarousel({
  className,
  children,
  label = "Carousel",
  tone = "onLight",
}: SnapCarouselProps) {
  const ref = useRef<HTMLUListElement>(null);
  const count = Children.count(children);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const cards = Array.from(el.children) as HTMLElement[];
      if (!cards.length) return;
      const mid = el.getBoundingClientRect().left + el.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      cards.forEach((card, i) => {
        const r = card.getBoundingClientRect();
        const d = Math.abs(r.left + r.width / 2 - mid);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setActive(best);
    };
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      el.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [count]);

  const go = (i: number) => {
    const el = ref.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (!el || !card) return;
    const delta =
      card.getBoundingClientRect().left -
      el.getBoundingClientRect().left -
      (el.clientWidth - card.clientWidth) / 2;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <>
      <ul ref={ref} className={className}>
        {children}
      </ul>
      {count > 1 && (
        <div
          role="tablist"
          aria-label={label}
          className="mt-5 flex items-center justify-center md:hidden"
        >
          {Array.from({ length: count }).map((_, i) => {
            const on = i === active;
            return (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={on}
                aria-label={`${label}: ${i + 1} of ${count}`}
                onClick={() => go(i)}
                className="flex h-9 items-center px-1.5"
              >
                <span
                  className={cn(
                    "block h-2 rounded-full transition-all duration-300",
                    on
                      ? "w-6 bg-brand-red"
                      : tone === "onDark"
                        ? "w-2 bg-white/30"
                        : "w-2 bg-brand-indigo/25"
                  )}
                />
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}
