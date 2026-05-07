export const SITE = {
  name: "TBM Carriers",
  tagline:
    "Delivering reliable, end-to-end transportation solutions with a commitment to quality, consistency, and trust.",
  email: "contact@tbmcarriers.com",
  copyrightYear: 2026,
  foundedYear: 1999,
} as const;

export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Compliance", href: "/compilance" },
  { label: "Contact", href: "/contact" },
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
