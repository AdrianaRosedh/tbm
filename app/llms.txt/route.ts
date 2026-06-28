import { SITE, OFFICES } from "@/lib/content/site";
import { SERVICES } from "@/lib/content/services";

/**
 * /llms.txt — a curated, AI-readable map of the site (llmstxt.org convention).
 * Generative engines (ChatGPT, Perplexity, Google AI Overviews, Claude, etc.)
 * can read this to understand TBM and cite it accurately. Built from real site
 * content + SITE.url, so it tracks the live domain (incl. the future cutover).
 *
 * Deliberately omits the as-yet-unverified marketing stats (cities/loads/
 * employees) and the flagged phone number so AI never cites shaky figures.
 */
export const dynamic = "force-static";

export async function GET() {
  const url = SITE.url;
  const us = OFFICES[0];
  const mx = OFFICES[1];

  const services = SERVICES.map(
    (s) => `- [${s.title}](${url}/services/${s.slug}): ${s.short}`
  ).join("\n");

  const socials = SITE.sameAs
    .map((s) => {
      const label = s.includes("linkedin")
        ? "LinkedIn"
        : s.includes("facebook")
          ? "Facebook"
          : "Social";
      return `- ${label}: ${s}`;
    })
    .join("\n");

  const body = `# TBM Carriers

> Asset-based cross-border logistics carrier moving freight across the United States, Mexico, and Canada. Operating since ${SITE.foundedYear}, with TBM-owned trucks, trailers, terminals, and maintenance shops on both sides of the U.S.–Mexico border — no third-party handoffs at the crossing.

TBM Carriers is a C-TPAT / FAST / OEA-certified, asset-based carrier specializing in cross-border (USMCA) freight. Door-to-door moves are handled end-to-end by TBM drivers and TBM-owned equipment, backed by bonded warehousing, in-house fleet maintenance, real-time GPS tracking, and AI-assisted Carta Porte / customs documentation.

## Services
${services}

## Company
- [About](${url}/about): Company story, mission, and the asset-based model (operating since ${SITE.foundedYear}).
- [Compliance & Security](${url}/compliance): C-TPAT / OEA security program, certifications, and operating standards.
- [Network & Coverage](${url}/network): Terminals, drop yards, border crossings, and signature corridors across the USMCA region.
- [Contact](${url}/contact): Offices, phone numbers, and sales contact.

## Key facts
- Founded ${SITE.foundedYear}; asset-based — owns its trucks, trailers, terminals, and maintenance shops.
- Coverage: United States, Mexico, and Canada (cross-border USMCA freight).
- Certifications: C-TPAT, FAST, OEA, SmartWay, CARB; certified minority-owned business (SWMSDC).
- Border gateways: Laredo, Otay Mesa, El Paso, Nogales, and Calexico (and additional U.S.–Mexico crossings).
- Technology: Samsara (GPS/telematics), McLeod (TMS), and Ferromex (Pacific-coast intermodal rail).
- U.S. office: ${us.legalName} — San Antonio, TX. Mexico office: ${mx.legalName} — Mexicali, Baja California.
- Sales: ${SITE.salesEmail}

## Links
- Website: ${url}
- Spanish site (es-MX): ${url}/es
${socials}
- Sitemap: ${url}/sitemap.xml
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
