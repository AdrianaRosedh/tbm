export const SITE = {
  name: "TBM Carriers",
  tagline:
    "Delivering reliable, end-to-end transportation solutions with a commitment to quality, consistency, and trust.",
  description:
    "Cross-border logistics across the United States, Mexico, and Canada. Operating since 1999.",
  email: "contact@tbmcarriers.com",
  safetyEmail: "safety@tbmcarriers.com",
  // Click-to-send "Contact Sales" target. Kept in code, never rendered as text.
  // Change this if your sales inbox differs.
  salesEmail: "sales@tbmcarriers.com",
  copyrightYear: 2026,
  foundedYear: 1999,
  trackingUrl: "https://tms-tbmc.loadtracking.com:5690/login",
  /** Production URL — override via NEXT_PUBLIC_SITE_URL when domain swap lands. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://tbm-ashen.vercel.app",
  /** Public social profiles — surfaced in the Organization JSON-LD (sameAs)
   *  and the footer. Add Instagram/X here when those handles go live. */
  sameAs: [
    "https://www.linkedin.com/company/tbmcarriers/",
    "https://www.facebook.com/p/TBM-Carriers-100064104397674/",
  ],
} as const;

export type NavItem = {
  label: string;
  /** Key into the locale dictionary's `nav` for the localized label. */
  labelKey: "home" | "knowUs" | "networkServices" | "compliance" | "contact";
  href: string;
  external?: boolean;
  /** Opens the full-screen contact overlay instead of navigating */
  overlay?: boolean;
  /** Home-page section id this item scroll-spies against */
  section?: string;
};

/**
 * One-page navigation: items anchor to homepage sections (the detail pages
 * remain live for SEO/deep links). "Contact Us" opens the overlay.
 */
export const NAV_ITEMS: readonly NavItem[] = [
  { label: "Home", labelKey: "home", href: "/", section: "top" },
  { label: "Know Us", labelKey: "knowUs", href: "/#know-us", section: "know-us" },
  { label: "Network & Services", labelKey: "networkServices", href: "/#network", section: "network" },
  { label: "Compliance & Security", labelKey: "compliance", href: "/#compliance", section: "compliance" },
  { label: "Contact Us", labelKey: "contact", href: "/contact", overlay: true },
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
    phones: ["+1 (210) 732-3400", "+1 (800) 826-3705"],
  },
  {
    region: "Mexico",
    legalName: "TBM Carriers México S.A. de C.V.",
    address: ["Madero 1590", "Col. Nueva", "Mexicali, México 21000"],
    phones: ["+52 (686) 555-7029", "+52 (800) 732-7506"],
  },
] as const;

export const FACILITIES = {
  us: {
    region: "United States",
    legalName: "TBM Carriers Inc. / TBM Logistics",
    headquarters: {
      name: "Headquarters",
      address: ["5718 University Heights Blvd, Suite 204", "San Antonio, TX 78249"],
    },
    terminals: [
      { city: "Calexico, CA", address: "363 Nina Lee Ln, Calexico, CA 92231" },
      { city: "Nogales, AZ", address: undefined },
      { city: "Del Rio, TX", address: "108 Frontera Rd, Del Rio, TX 78840" },
      { city: "Laredo, TX", address: "8402 Killam Industrial Blvd, Laredo, TX 78405" },
    ],
    dropYards: [
      "Ferndale, WA",
      "Otay Mesa, CA",
      "El Paso, TX",
      "Hopkinsville, KY",
      "Charlotte, NC",
      "Linwood, NC",
      "Indianapolis, IN",
      "Batesville, IN",
      "Channahon, IL",
      "Troy, OH",
      "Detroit, MI",
      "Atlanta, GA",
      "Dallas, TX",
    ],
    borderCrossings: [
      "Otay Mesa, CA",
      "Tecate, CA",
      "Calexico, CA",
      "Nogales, AZ",
      "El Paso, TX",
      "Del Rio, TX",
      "Eagle Pass, TX",
      "Laredo, TX",
      "Blaine, WA",
      "Sweet Grass, MT",
      "Detroit, MI",
      "Port Huron, MI",
      "Lewiston, NY",
      "Champlain, NY",
    ],
  },
  mx: {
    region: "Mexico",
    legalName: "TBM Carriers México S.A. de C.V.",
    headquartersCity: "Mexicali, B.C.",
    /** Operational facilities with street addresses */
    facilities: [
      {
        city: "Mexicali, B.C.",
        address: "Carretera Aeropuerto 4001, Col. Abelardo",
      },
      {
        city: "Cd. Acuña, Coah.",
        address: "Carretera Acuña–Zaragoza",
      },
      {
        city: "Piedras Negras, Coah.",
        address: "Ampliación Blvd. Venustiano Carranza 301, CP 26170",
      },
      {
        city: "Nuevo Laredo, Tamps.",
        address: "Carretera Nuevo Laredo–Piedras Negras Km 12.3",
      },
      {
        city: "Querétaro, Qro.",
        address: "Blvd. Bernardo Quintana #7001, Torre A1, Piso 8",
      },
    ],
    /** Corporate sales & operations offices */
    offices: [
      {
        city: "Mexicali, B.C. (Corporate)",
        address: "Av. Madero #1590, Col. Nueva, CP 21000",
      },
      {
        city: "Saltillo, Coah.",
        address: "Blvd. José Narro Robles #494 Int. 1, Col. Los Rodríguez, CP 25207",
      },
      {
        city: "Querétaro, Qro.",
        address: "Av. Industrialización No 7, Oficina 302, Fracc. Zona Industrial, CP 76160",
      },
    ],
    /** Border terminals */
    terminals: [
      "Tecate, B.C.",
      "Mexicali, B.C.",
      "Nogales, Son.",
      "Cd. Acuña, Coah.",
      "Piedras Negras, Coah.",
      "Nuevo Laredo, Tamps.",
    ],
    maintenance: ["Mexicali, B.C.", "Cd. Acuña, Coah.", "Nuevo Laredo, Tamps."],
  },
} as const;

export const DEPARTMENTS = [
  {
    name: "Sales",
    icon: "/brand/TBM-iconos-sales.png",
    contacts: [
      { name: "Gerardo Villarreal", email: "gerardo.villarreal@tbmcarriers.com" },
      { name: "Gilberto Mejia", email: "gilberto.mejia@tbmcarriers.com" },
    ],
  },
  {
    name: "Customer Service",
    icon: "/brand/TBM-iconos-custumer.png",
    contacts: [
      { name: "Eva Pamela Jimenez", email: "evap.jimenez@tbmcarriers.com" },
    ],
  },
  {
    name: "Human Resources",
    icon: "/brand/TBM-iconos-hr.png",
    contacts: [{ name: "HR Department", email: "recruit@tbmcarriers.com" }],
  },
] as const;

export const TECH_PARTNERS = [
  { name: "Samsara", logo: "/brand/tbm-samsara.avif" },
  { name: "SmartDrive", logo: "/brand/tbm-smartdrive.avif" },
  { name: "McLeod", logo: "/brand/tbm-mcload.avif" },
] as const;
