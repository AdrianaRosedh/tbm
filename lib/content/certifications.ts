/**
 * Certifications & partnerships. Used on /home (logo strip), /about, and /compilance.
 */

export type CertificationItem = {
  slug: string;
  short: string;
  full: string;
  description: string;
  logo: string;
};

export const CERTIFICATIONS: readonly CertificationItem[] = [
  {
    slug: "ctpat",
    short: "C-TPAT",
    full: "Customs Trade Partnership Against Terrorism",
    description:
      "U.S. Customs and Border Protection program securing the international supply chain against terrorism. Members get expedited processing at the border.",
    logo: "/brand/ctpat-logo.jpg",
  },
  {
    slug: "fast",
    short: "FAST",
    full: "Free and Secure Trade",
    description:
      "Joint U.S./Mexico/Canada program for expedited cross-border commercial shipments through dedicated FAST lanes.",
    logo: "/brand/fast-logo.jpg",
  },
  {
    slug: "smartway",
    short: "SmartWay",
    full: "SmartWay Transport Partner",
    description:
      "EPA program recognizing carriers that measure and improve fuel efficiency and reduce emissions across their fleets.",
    logo: "/brand/smartway-logo.jpg",
  },
  {
    slug: "oea",
    short: "OEA",
    full: "Operador Económico Autorizado",
    description:
      "Mexico's Authorized Economic Operator program — equivalent to C-TPAT — granting trusted-trader status and faster customs.",
    logo: "/brand/oea-logo.jpg",
  },
  {
    slug: "smsdc",
    short: "SWMSDC",
    full: "Southwest Minority Supplier Development Council",
    description:
      "Certified minority-owned business through the National Minority Supplier Development Council network.",
    logo: "/brand/soutwest-logo.jpg",
  },
  {
    slug: "carb",
    short: "CARB",
    full: "California Air Resources Board",
    description:
      "Compliant with CARB regulations for clean truck operations on California highways.",
    logo: "/brand/california-air-resources-logo.jpg",
  },
] as const;
