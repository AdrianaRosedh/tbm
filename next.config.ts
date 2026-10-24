import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Vercel injects its Toolbar / Live feedback (preview comments) from
// vercel.live + Pusher — on PREVIEW deployments only, never production. Allow
// those origins only there, so the production policy stays as tight as it can.
// Resolved per deployment at build time via VERCEL_ENV.
const onPreview = process.env.VERCEL_ENV === "preview";
const live = (directive: string, ...previewOnly: string[]) =>
  onPreview ? [directive, ...previewOnly].join(" ") : directive;

/**
 * Content Security Policy. No nonce by design: this is a (mostly) static
 * marketing site, and nonce-based CSP forces every page into dynamic rendering
 * (per Next's CSP guide) — a real perf/caching cost for no gain here.
 * `'unsafe-inline'` is required for Next's hydration bootstrap scripts,
 * next/font's injected <style>, and the many inline style attributes (incl.
 * motion transforms). `'unsafe-eval'` is dev-only (React uses eval for
 * debugging; it is not used in production). External origins are limited to
 * Vercel Analytics / Speed Insights (+ the preview-only Toolbar above).
 */
const csp = [
  "default-src 'self'",
  live(
    `script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com${
      isDev ? " 'unsafe-eval'" : ""
    }`,
    "https://vercel.live"
  ),
  live("style-src 'self' 'unsafe-inline'", "https://vercel.live"),
  live("img-src 'self' blob: data:", "https://vercel.live", "https://vercel.com"),
  live("font-src 'self'", "https://vercel.live", "https://assets.vercel.com"),
  live(
    "connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com",
    "https://vercel.live",
    "wss://*.pusher.com",
    "https://*.pusher.com"
  ),
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  live("frame-src 'self'", "https://vercel.live"),
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
