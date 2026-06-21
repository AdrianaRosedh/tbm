import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    // AVIF first (best compression), WebP fallback — smaller bytes on mobile.
    formats: ["image/avif", "image/webp"],
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
