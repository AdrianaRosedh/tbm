"use client";

import { type ReactNode } from "react";
import { OPEN_CONTACT_EVENT } from "./contact-overlay";

/**
 * Opens the contact popup from anywhere (works on every route — the overlay
 * lives in the root layout). Replaces the old links to the /contact page.
 */
export function ContactPopupLink({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() =>
        window.dispatchEvent(new CustomEvent(OPEN_CONTACT_EVENT))
      }
      className={className}
    >
      {children}
    </button>
  );
}
