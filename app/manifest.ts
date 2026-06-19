import type { MetadataRoute } from "next";
import { SITE } from "@/lib/content/site";

/** Web app manifest — install metadata + mobile theme color. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} — Cross-border logistics`,
    short_name: SITE.name,
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0f0b26",
    theme_color: "#0f0b26",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
      { src: "/icons/192", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/512", sizes: "512x512", type: "image/png", purpose: "any" },
      {
        src: "/icons/512",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    // Long-press the installed app icon → quick actions (in-scope only).
    shortcuts: [
      {
        name: "Contact Sales",
        short_name: "Contact",
        url: "/?contact=open",
        icons: [{ src: "/icons/192", sizes: "192x192", type: "image/png" }],
      },
      {
        name: "Our Network",
        short_name: "Network",
        url: "/#network",
        icons: [{ src: "/icons/192", sizes: "192x192", type: "image/png" }],
      },
    ],
  };
}
