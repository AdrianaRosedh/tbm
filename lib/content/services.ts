/**
 * Authoritative service list. Used by /home (preview grid) and /services (full).
 * Icon names map to lucide-react exports.
 */

export type ServiceItem = {
  slug: string;
  title: string;
  short: string;
  full?: string;
  icon:
    | "Truck"
    | "Warehouse"
    | "Headphones"
    | "Wrench"
    | "Satellite"
    | "MapPin"
    | "Building2"
    | "PackageSearch";
};

export const SERVICES: readonly ServiceItem[] = [
  {
    slug: "border-crossing",
    title: "Border Crossing",
    short:
      "Door-to-door service handled exclusively by TBM drivers — security, consistency, and accountability at every stage.",
    full: "Our cross-border operations are handled end-to-end by TBM drivers and TBM-owned equipment. No third-party handoffs at the border, no chain-of-custody gaps. C-TPAT, FAST, and OEA certifications keep your loads in the expedited lane.",
    icon: "Truck",
  },
  {
    slug: "distribution-warehousing",
    title: "Distribution & Warehousing",
    short:
      "Bonded carrier services with access to warehousing and cross-dock solutions for streamlined logistics.",
    full: "Bonded warehousing on both sides of the border, cross-dock operations for fast turnaround, and inventory visibility through our partner systems. Designed for high-volume retail, automotive, and industrial flows.",
    icon: "Warehouse",
  },
  {
    slug: "customer-service",
    title: "Customer Service",
    short:
      "A dedicated CSR is your single point of contact — clear communication, timely updates, consistent support.",
    full: "Every account is paired with a dedicated Customer Service Representative who knows your shipments, your routes, and your stakeholders. One number, one inbox, real answers.",
    icon: "Headphones",
  },
  {
    slug: "shops",
    title: "Fleet Maintenance",
    short:
      "Certified technicians and state-of-the-art facilities deliver maintenance and repairs that keep our fleet reliable.",
    full: "Our in-house shops perform DOT inspections, preventative maintenance, and full-service repairs across the fleet. Certified technicians, factory-grade equipment, and a parts inventory that keeps trucks rolling.",
    icon: "Wrench",
  },
  {
    slug: "gps-tracking",
    title: "Real-Time Tracking",
    short:
      "Continuous shipment monitoring with advanced tracking technology — real-time visibility across our North American network.",
    full: "GPS tracking on every truck, AI-powered driver-facing and road-facing cameras, and proactive alerts for deviations or delays. You see what we see.",
    icon: "Satellite",
  },
  {
    slug: "location",
    title: "Locations",
    short:
      "Asset-based operations with terminals on both sides of the U.S.–Mexico border for seamless cross-border logistics.",
    full: "Asset-based means we own the trucks, the trailers, the terminals, and the maintenance facilities. That's the difference between a broker promising service and a carrier delivering it.",
    icon: "MapPin",
  },
] as const;

export const SERVICE_FEATURES = [
  {
    title: "Logistics Solutions",
    body: "Customized transportation tailored to your operational needs — staffing, logistics management, and scalable support that adapts as your business changes.",
  },
  {
    title: "TBM Intermodal",
    body: "Secure, cost-effective intermodal solutions integrated with Ferromex's Pacific-coast rail network. High-capacity transport with consistent transit times across Mexico.",
  },
  {
    title: "Door-to-Door Service",
    body: "Fully integrated door-to-door transportation across Mexico, the U.S., and Canada — minimizing handling, reducing cost, and lowering damage risk.",
  },
] as const;

export const SERVICES_AI = {
  eyebrow: "Technology",
  headline: "Utilizing AI to simplify your Carta Porte",
  body: "Mexico's Carta Porte mandate adds real complexity to cross-border freight — wrong fields trigger rejections, audits, and detentions. Our AI tooling auto-fills compliance documents, validates against the latest SAT requirements, and flags issues before the load leaves the dock.",
  image: "/brand/tbm-c-9090.jpg",
} as const;

export const SERVICES_TECH = {
  eyebrow: "Operations",
  headline: "Technology that powers our operations",
  items: [
    {
      title: "Real-time tracking & telematics",
      body: "GPS tracking and AI-powered telematics deliver continuous visibility, live status updates, and tighter operational control across every shipment.",
    },
    {
      title: "Integrated TMS",
      body: "Our transportation management system handles dispatch, freight brokerage, and asset management in one place — optimizing fleet utilization and streamlining day-to-day operations.",
    },
  ],
} as const;
