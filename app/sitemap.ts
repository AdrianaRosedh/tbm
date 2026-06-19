import type { MetadataRoute } from "next";
import { SITE } from "@/lib/content/site";
import { SERVICES } from "@/lib/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  // One-page site: /about, /services, /compilance and /contact are folded
  // into the homepage (they 308-redirect to its sections). The canonical "/"
  // plus the standalone service landing pages and legal pages belong here.
  const services: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${SITE.url}/services/${s.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

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
    ...services,
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
