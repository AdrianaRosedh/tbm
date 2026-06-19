import { OFFICES, SITE } from "@/lib/content/site";

/**
 * Site-wide structured data, modeled as a connected schema.org @graph so the
 * crawler reads one coherent entity: the Organization, its two North American
 * offices (LocalBusiness nodes wired back via parentOrganization), and the
 * WebSite. This is what establishes TBM in Google's knowledge graph and makes
 * the offices eligible for local results. The FAQ section adds FAQPage schema.
 *
 * Structured addresses are written explicitly here (the display strings in
 * site.ts aren't broken into locality/region/postal), but phones + email are
 * sourced from site.ts so they never drift.
 */
export function JsonLd() {
  const url = SITE.url;
  const orgId = `${url}/#organization`;
  const logo = `${url}/icons/512`;
  const image = `${url}/opengraph-image`;

  const usAddress = {
    "@type": "PostalAddress",
    streetAddress: "5718 University Heights Blvd, Suite 204",
    addressLocality: "San Antonio",
    addressRegion: "TX",
    postalCode: "78249",
    addressCountry: "US",
  } as const;

  const mxAddress = {
    "@type": "PostalAddress",
    streetAddress: "Madero 1590, Col. Nueva",
    addressLocality: "Mexicali",
    addressRegion: "Baja California",
    postalCode: "21000",
    addressCountry: "MX",
  } as const;

  const services = [
    "Cross-border freight (US–Mexico–Canada)",
    "Border crossing & customs coordination",
    "Distribution & warehousing",
    "Drayage & intermodal",
    "Dedicated & full-truckload transportation",
  ];

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: SITE.name,
        legalName: OFFICES[0].legalName,
        url,
        logo: { "@type": "ImageObject", url: logo, width: 512, height: 512 },
        image,
        description: SITE.description,
        slogan: SITE.tagline,
        foundingDate: String(SITE.foundedYear),
        email: SITE.email,
        telephone: OFFICES[0].phones[0],
        knowsLanguage: ["en", "es"],
        address: [usAddress, mxAddress],
        areaServed: [
          { "@type": "Country", name: "United States" },
          { "@type": "Country", name: "Mexico" },
          { "@type": "Country", name: "Canada" },
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            telephone: OFFICES[0].phones[0],
            email: SITE.salesEmail,
            areaServed: ["US", "MX", "CA"],
            availableLanguage: ["en", "es"],
          },
          {
            "@type": "ContactPoint",
            contactType: "customer service",
            telephone: OFFICES[0].phones[1],
            availableLanguage: ["en", "es"],
          },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Cross-border logistics services",
          itemListElement: services.map((name) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name },
          })),
        },
      },
      {
        "@type": "LocalBusiness",
        "@id": `${url}/#office-us`,
        name: OFFICES[0].legalName,
        parentOrganization: { "@id": orgId },
        url,
        image,
        logo,
        telephone: OFFICES[0].phones[0],
        email: SITE.email,
        address: usAddress,
        areaServed: ["US", "MX", "CA"],
      },
      {
        "@type": "LocalBusiness",
        "@id": `${url}/#office-mx`,
        name: OFFICES[1].legalName,
        parentOrganization: { "@id": orgId },
        url,
        image,
        logo,
        telephone: OFFICES[1].phones[0],
        address: mxAddress,
        areaServed: ["MX", "US"],
      },
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        url,
        name: SITE.name,
        description: SITE.description,
        inLanguage: ["en-US", "es-MX"],
        publisher: { "@id": orgId },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe to inline; no user input is interpolated.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
