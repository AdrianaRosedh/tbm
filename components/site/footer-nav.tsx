"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { OPEN_CONTACT_EVENT } from "./contact-overlay";
import { NAV_ITEMS } from "@/lib/content/site";

/**
 * Footer primary-navigation links. Mirrors the header: overlay items
 * ("Contact Us") open the contact popup instead of navigating to a page,
 * so the one-page site behaves consistently from the footer too.
 */
export function FooterNavItems() {
  const linkClass =
    "group inline-flex items-center gap-1.5 text-fg-subtle transition-colors hover:text-white";

  return (
    <>
      {NAV_ITEMS.map((item) => {
        const inner = (
          <>
            <ArrowRight
              className="h-3.5 w-3.5 -translate-x-1 text-brand-red opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
              aria-hidden="true"
            />
            <span className="-ml-5 transition-all duration-300 group-hover:ml-0">
              {item.label}
            </span>
          </>
        );

        return (
          <li key={item.href}>
            {item.overlay ? (
              <button
                type="button"
                onClick={() =>
                  window.dispatchEvent(new CustomEvent(OPEN_CONTACT_EVENT))
                }
                className={linkClass}
              >
                {inner}
              </button>
            ) : (
              <Link href={item.href} className={linkClass}>
                {inner}
              </Link>
            )}
          </li>
        );
      })}
    </>
  );
}
