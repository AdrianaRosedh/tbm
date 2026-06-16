import type { MetadataRoute } from "next";
import { SITE } from "@/lib/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  // One-page site: /about, /services, /compilance and /contact are folded
  // into the homepage (they 308-redirect to its sections), so only the
  // canonical "/" plus the standalone legal pages belong in the sitemap.
  return [
    {
      url: SITE.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages: { en: SITE.url, es: `${SITE.url}/es` } },
    },
    {
      url: `${SITE.url}/es`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: { languages: { en: SITE.url, es: `${SITE.url}/es` } },
    },
    {
      url: `${SITE.url}/privacy-policy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE.url}/terms-and-conditions`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
