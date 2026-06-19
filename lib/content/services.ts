/**
 * Authoritative service list. Used by /home (preview grid) and /services (full).
 * Icon names map to lucide-react exports.
 */

export type ServiceItem = {
  slug: string;
  title: string;
  short: string;
  full?: string;
  /** TBM brand icon (131×131 PNG from the brand kit) */
  image: string;
};

export const SERVICES: readonly ServiceItem[] = [
  {
    slug: "border-crossing",
    title: "Border Crossing",
    short:
      "Door-to-door cross-border service managed by TBM drivers, ensuring security, consistency, and full accountability at every stage.",
    full: "Our cross-border operations are handled end-to-end by TBM drivers and TBM-owned equipment. No third-party handoffs at the border, no chain-of-custody gaps. C-TPAT, FAST, and OEA certifications keep your loads in the expedited lane.",
    image: "/brand/icons/icon-border-crossing.png",
  },
  {
    slug: "distribution-warehousing",
    title: "Distribution & Warehousing",
    short:
      "Bonded carrier services with flexible warehousing and cross-dock solutions to support efficient distribution and inventory flow.",
    full: "Bonded warehousing on both sides of the border, cross-dock operations for fast turnaround, and inventory visibility through our partner systems. Designed for high-volume retail, automotive, and industrial flows.",
    image: "/brand/icons/icon-warehousing.png",
  },
  {
    slug: "customer-service",
    title: "Customer Service",
    short:
      "A dedicated service representative serves as your single point of contact, ensuring clear communication, timely updates, and consistent support.",
    full: "Every account is paired with a dedicated Customer Service Representative who knows your shipments, your routes, and your stakeholders. One number, one inbox, real answers.",
    image: "/brand/icons/icon-customer-service.png",
  },
  {
    slug: "shops",
    title: "Fleet Maintenance",
    short:
      "State-of-the-art maintenance facilities staffed by certified technicians, ensuring optimal fleet performance, reliability, and safety.",
    full: "Our in-house shops perform DOT inspections, preventative maintenance, and full-service repairs across the fleet. Certified technicians, factory-grade equipment, and a parts inventory that keeps trucks rolling.",
    image: "/brand/icons/icon-fleet-maintenance.png",
  },
  {
    slug: "gps-tracking",
    title: "Real-Time Tracking",
    short:
      "Continuous shipment monitoring with advanced tracking technology, providing real-time visibility and enhanced security across our network.",
    full: "GPS tracking on every truck, AI-powered driver-facing and road-facing cameras, and proactive alerts for deviations or delays. You see what we see.",
    image: "/brand/icons/icon-tracking.png",
  },
  {
    slug: "location",
    title: "Locations",
    short:
      "Asset-based operations with terminals on both sides of the U.S.–Mexico border, enabling seamless cross-border logistics and greater control over your freight.",
    full: "Asset-based means we own the trucks, the trailers, the terminals, and the maintenance facilities. That's the difference between a broker promising service and a carrier delivering it.",
    image: "/brand/icons/icon-locations.png",
  },
] as const;

/**
 * Extra, EN-only depth for the standalone service landing pages
 * (/services/[slug]). Kept separate from SERVICES so it doesn't enter the
 * bilingual dictionary shape — Spanish landing pages are a later addition.
 * Every point is grounded in facts already published on the site (certs,
 * gateways, asset-based model, tech partners) — review for voice before scaling.
 */
export const SERVICE_DETAILS: Record<
  string,
  { keyword: string; highlights: readonly string[] }
> = {
  "border-crossing": {
    keyword: "Cross-border freight & border crossing",
    highlights: [
      "TBM drivers and TBM-owned tractors and trailers move freight end-to-end — no third-party handoffs at the border.",
      "C-TPAT, FAST, and OEA certified, keeping eligible loads in the expedited lanes.",
      "Coverage across the major U.S.–Mexico gateways: Laredo, Otay Mesa, El Paso, Nogales, and Calexico.",
      "Carta Porte and customs paperwork validated with AI tooling before the load leaves the dock.",
    ],
  },
  "distribution-warehousing": {
    keyword: "Bonded warehousing & distribution",
    highlights: [
      "Bonded warehousing on both sides of the border.",
      "Cross-dock operations for fast, low-touch transloading.",
      "Inventory visibility through integrated partner systems.",
      "Built for high-volume retail, automotive, and industrial flows.",
    ],
  },
  "customer-service": {
    keyword: "Dedicated logistics customer service",
    highlights: [
      "A dedicated Customer Service Representative assigned to your account.",
      "One number, one inbox — bilingual support on both sides of the border.",
      "Proactive updates on status, ETAs, and exceptions.",
    ],
  },
  shops: {
    keyword: "In-house fleet maintenance",
    highlights: [
      "In-house DOT inspections and preventative maintenance.",
      "Certified technicians and factory-grade equipment.",
      "Maintenance facilities positioned across the network to keep trucks rolling.",
    ],
  },
  "gps-tracking": {
    keyword: "Real-time freight tracking & visibility",
    highlights: [
      "GPS tracking on every truck via Samsara telematics.",
      "AI-powered driver- and road-facing cameras.",
      "Proactive alerts for route deviations and delays.",
    ],
  },
  location: {
    keyword: "Asset-based cross-border network",
    highlights: [
      "Asset-based: TBM owns the trucks, trailers, terminals, and shops.",
      "Terminals on both sides of the U.S.–Mexico border.",
      "Greater control and accountability over every load.",
    ],
  },
};

export const SERVICE_FEATURES = [
  {
    title: "Logistics Solutions",
    body: "Customized transportation solutions tailored to your operational needs — including staffing, logistics management, and scalable support designed to adapt to evolving business demands.",
  },
  {
    title: "TBM Intermodal",
    body: "Secure, cost-effective intermodal solutions integrated with Ferromex's Pacific-coast rail network, connecting key terminals across Mexico — high-capacity transport, consistent transit times, and reduced emissions.",
  },
  {
    title: "Door-to-Door Service",
    body: "Fully integrated door-to-door transportation across Mexico, the U.S., and Canada — minimizing handling, reducing costs, and lowering the risk of damage.",
  },
] as const;

export const SERVICES_AI = {
  eyebrow: "Technology",
  headline: "Utilizing AI to simplify your Carta Porte",
  body: "Mexico's Carta Porte mandate adds real complexity to cross-border freight — wrong fields trigger rejections, audits, and detentions. Our AI tooling auto-fills compliance documents, validates against the latest SAT requirements, and flags issues before the load leaves the dock.",
  image: "/brand/tbm-back-girl.jpg",
} as const;

export const SERVICES_TECH = {
  eyebrow: "Operations",
  headline: "Technology that powers our operations",
  items: [
    {
      partner: "Samsara",
      title: "Real-time tracking & telematics",
      body: "Real-time GPS tracking and telematics deliver continuous visibility, live updates, and improved operational control across every shipment.",
    },
    {
      partner: "McLeod",
      title: "Integrated TMS",
      body: "An integrated transportation management system (TMS) supports dispatch, freight brokerage, and asset management — optimizing efficiency and streamlining operations.",
    },
  ],
} as const;
