import type { MetadataRoute } from "next";
import { SITE } from "@/lib/content/site";
import { SERVICES } from "@/lib/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  // One-page site: /about, /services, /compilance and /contact are folded
  // into the homepage (they 308-redirect to its sections). The canonical "/"
  // plus the standalone service landing pages and legal pages belong here.
  const services: MetadataRoute.Sitemap = SERVICES.flatMap((s) => {
    const languages = {
      en: `${SITE.url}/services/${s.slug}`,
      es: `${SITE.url}/es/services/${s.slug}`,
    };
    return [
      {
        url: languages.en,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.8,
        alternates: { languages },
      },
      {
        url: languages.es,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.7,
        alternates: { languages },
      },
    ];
  });

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
      url: `${SITE.url}/network`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${SITE.url}/network`,
          es: `${SITE.url}/es/network`,
        },
      },
    },
    {
      url: `${SITE.url}/es/network`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          en: `${SITE.url}/network`,
          es: `${SITE.url}/es/network`,
        },
      },
    },
    {
      url: `${SITE.url}/compliance`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${SITE.url}/compliance`,
          es: `${SITE.url}/es/compliance`,
        },
      },
    },
    {
      url: `${SITE.url}/es/compliance`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          en: `${SITE.url}/compliance`,
          es: `${SITE.url}/es/compliance`,
        },
      },
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
