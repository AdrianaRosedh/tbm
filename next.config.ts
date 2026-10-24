import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * Content Security Policy. No nonce by design: this is a (mostly) static
 * marketing site, and nonce-based CSP forces every page into dynamic rendering
 * (per Next's CSP guide) — a real perf/caching cost for no gain here.
 * `'unsafe-inline'` is required for Next's hydration bootstrap scripts,
 * next/font's injected <style>, and the many inline style attributes (incl.
 * motion transforms). `'unsafe-eval'` is dev-only (React uses eval for
 * debugging; it is not used in production). Everything is same-origin except
 * Vercel Analytics / Speed Insights.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com${
    isDev ? " 'unsafe-eval'" : ""
  }`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data:",
  "font-src 'self'",
  "connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

// Applied to every response. HSTS matches Vercel's own default; the rest close
// the gaps a bare Vercel deploy leaves open (sniffing, framing, referrer leak,
// unused browser features).
const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Don't advertise the framework/version.
  poweredByHeader: false,
  images: {
    // AVIF first (best compression), WebP fallback — smaller bytes on mobile.
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  // Legacy Shopify URLs (the current tbmcarriers.com) → their new homes, so
  // Google's indexed pages + sitelinks survive the domain cutover instead of
  // 404-ing. Inert on vercel.app; they fire once the domain points here.
  // (308 permanent — `/services` then forwards to the homepage services section.)
  async redirects() {
    return [
      { source: "/pages/contact", destination: "/contact", permanent: true },
      { source: "/pages/about", destination: "/about", permanent: true },
      { source: "/pages/compliance", destination: "/compliance", permanent: true },
      { source: "/pages/services", destination: "/services", permanent: true },
      { source: "/pages/get-a-quote", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
