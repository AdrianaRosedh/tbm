/**
 * TBM brand mark — the ellipse with a forward "sail/arrow" in negative space.
 * A faithful recreation of the logo icon (swap in the exact vector any time —
 * keep the viewBox and it drops straight in). Ellipse uses currentColor so it
 * can be tinted via text-* utilities; the sail stays white.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 38"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <ellipse cx="32" cy="19" rx="31" ry="18" fill="currentColor" />
      <path
        d="M17 8.5C36 12 49 15.5 60 19C49 22.5 36 26 17 29.5C24 22 24 16 17 8.5Z"
        fill="#fff"
      />
    </svg>
  );
}
