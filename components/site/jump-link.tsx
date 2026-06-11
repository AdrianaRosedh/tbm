"use client";

import { type ComponentProps } from "react";

type JumpLinkProps = { to: string } & Omit<
  ComponentProps<"a">,
  "href" | "onClick"
>;

/**
 * In-page anchor link for the one-page site. When the target section exists
 * on the current page (the homepage) it smooth-scrolls to it; otherwise the
 * `/#id` href lets the browser navigate home and land on the section. Use
 * this for content CTAs that used to point at the now-folded detail pages.
 */
export function JumpLink({ to, children, ...rest }: JumpLinkProps) {
  return (
    <a
      href={`/#${to}`}
      onClick={(e) => {
        const el = document.getElementById(to);
        if (!el) return; // not on the homepage — follow the href instead
        e.preventDefault();
        const reduce = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;
        el.scrollIntoView({
          behavior: reduce ? "auto" : "smooth",
          block: "start",
        });
        history.replaceState(null, "", `/#${to}`);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
