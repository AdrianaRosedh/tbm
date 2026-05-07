export const SITE = {
  name: "TBM Carriers",
  tagline:
    "Delivering reliable, end-to-end transportation solutions with a commitment to quality, consistency, and trust.",
  email: "contact@tbmcarriers.com",
  safetyEmail: "safety@tbmcarriers.com",
  copyrightYear: 2026,
  foundedYear: 1999,
  trackingUrl: "https://tms-tbmc.loadtracking.com:5690/login",
} as const;

export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

export const NAV_ITEMS: readonly NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Logistics Services", href: "/services" },
  { label: "Compliance & Security", href: "/compilance" },
  {
    label: "Shipment Tracking",
    href: "https://tms-tbmc.loadtracking.com:5690/login",
    external: true,
  },
  { label: "Contact Us", href: "/contact" },
] as const;

export const FOOTER_LEGAL_ITEMS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
] as const;

export const OFFICES = [
  {
    region: "United States",
    legalName: "TBM Carriers Inc.",
    address: ["5718 University Heights Blvd, Suite 204", "San Antonio, TX 78249"],
    phones: ["(210) 732-3400", "(800) 826-3705"],
  },
  {
    region: "Mexico",
    legalName: "TBM Carriers México S.A. de C.V.",
    address: ["Madero 1590", "Col. Nueva", "Mexicali, México 21000"],
    phones: ["(686) 555-7029", "(800) 732-7506"],
  },
] as const;

export const DEPARTMENTS = [
  {
    name: "Sales",
    contacts: [
      { name: "Gerardo Villarreal", email: "gerardo@tbmcarriers.com" },
      { name: "Gilberto Mejia", email: "gilberto.mejia@tbmcarriers.com" },
    ],
  },
  {
    name: "Customer Service",
    contacts: [
      { name: "Eva Pamela Jimenez", email: "evap.jimenez@tbmcarriers.com" },
    ],
  },
  {
    name: "Human Resources",
    contacts: [{ name: "HR Department", email: "recruit@tbmcarriers.com" }],
  },
] as const;
