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
    title: "Shops",
    short:
      "Certified technicians and state-of-the-art facilities deliver fleet maintenance and repairs that keep us reliable.",
    full: "Our in-house shops perform DOT inspections, preventative maintenance, and full-service repairs across the fleet. Certified technicians, factory-grade equipment, and a parts inventory that keeps trucks rolling.",
    icon: "Wrench",
  },
  {
    slug: "gps-tracking",
    title: "GPS Tracking",
    short:
      "Continuous shipment monitoring with AI-powered camera technology — real-time visibility across our network.",
    full: "GPS tracking on every truck, AI-powered driver-facing and road-facing cameras, and proactive alerts for deviations or delays. You see what we see.",
    icon: "Satellite",
  },
  {
    slug: "location",
    title: "Location",
    short:
      "An asset-based company with terminals on both sides of the border for seamless cross-border operations.",
    full: "Asset-based means we own the trucks, the trailers, the terminals, and the maintenance facilities. That's the difference between a broker promising service and a carrier delivering it.",
    icon: "MapPin",
  },
] as const;

export const SERVICE_FEATURES = [
  {
    title: "Logistics Solutions",
    body: "End-to-end coordination for full truckload, less-than-truckload, and specialized freight.",
  },
  {
    title: "TBM Intermodal",
    body: "Rail-friendly intermodal options where time-cost trade-offs make sense.",
  },
  {
    title: "Door-to-Door Service",
    body: "Pickup, cross-border clearance, line haul, and final-mile delivery — under one roof.",
  },
] as const;
