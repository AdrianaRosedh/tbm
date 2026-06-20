/**
 * English dictionary — the single source of truth for locale-varying text.
 * It re-bundles the existing content modules (so English stays exactly as it
 * was) and adds a `ui` namespace for the micro-copy that lived inline in
 * components. The Spanish dictionary in `es.ts` mirrors this shape.
 *
 * Locale-INVARIANT data (emails, phones, addresses, logos, slugs) stays in
 * site.ts and is shared across locales — only text that changes per language
 * lives here.
 */
import { HOME } from "./home";
import { ABOUT } from "./about";
import {
  SERVICES,
  SERVICE_FEATURES,
  SERVICES_AI,
  SERVICES_TECH,
} from "./services";
import { CERTIFICATIONS } from "./certifications";
import { COMPLIANCE_LEAD, COMPLIANCE_PRACTICES } from "./compliance";

export const EN = {
  home: HOME,
  about: ABOUT,
  services: SERVICES,
  serviceFeatures: SERVICE_FEATURES,
  servicesAi: SERVICES_AI,
  servicesTech: SERVICES_TECH,
  certifications: CERTIFICATIONS,
  complianceLead: COMPLIANCE_LEAD,
  compliancePractices: COMPLIANCE_PRACTICES,

  /** Navigation labels (paired with hrefs/sections in site.ts NAV_ITEMS). */
  nav: {
    home: "Home",
    knowUs: "Know Us",
    networkServices: "Network & Services",
    compliance: "Compliance & Security",
    contact: "Contact Us",
  },

  /** Shared micro-copy that used to be hardcoded in components. */
  ui: {
    contactSales: "Contact Sales",
    emailSales: "Email Sales",
    trackShipment: "Track Shipment",
    ourServices: "Our Services",
    seeAllServices: "See all services",
    learnAboutUs: "Learn About Us",
    learnMore: "Learn more",
    learnMoreAbout: "Learn more about",
    serviceOverview: "Overview",
    serviceHighlights: "Highlights",
    moreServices: "More services",
    allServices: "All services",
    scrollToExplore: "Scroll to explore",
    backToTop: "Back to top",
    menu: "Main menu",
    close: "Close",
    language: "Language",
    // Hero
    heroLocations: "Locations across North America",
    // Stats live in home.stats
    // Contact overlay
    contactEyebrow: "Contact",
    contactTitle: "Talk to a real person, in either country",
    contactSubtitle:
      "One number, one inbox, one accountable team — on both sides of the border.",
    replyWithin: "We reply within 24 hours",
    regionUS: "United States",
    regionMX: "Mexico",
    // FAQ
    stillHaveQuestion: "Still have a question?",
    // Footer
    footerNavHeading: "Navigate",
    footerCertHeading: "Certified & trusted across North America",
    footerSecurityLink: "See how our security program works",
    // Network map
    networkExplore: "Explore",
    networkPlanLane: "Plan a lane",
    // Certifications strip CTA
    partnershipsCerts: "Partnerships and certifications",
    // Section headers hardcoded in the homepage body
    servicesHeadline: "Efficiency and reliability built into every shipment",
    servicesCommitment:
      "Every shipment receives the attention it deserves — no matter the size.",
    integratedEyebrow: "Integrated Logistics Solutions",
    integratedHeadline: "Designed for performance and reliability",
    complianceHeadline: "Two programs, one security playbook",
    complianceIntro:
      "As a trusted C-TPAT/OEA member, TBM Carriers meets rigorous security standards to ensure the integrity, reliability, and safety of international trade operations across North America.",
    emailSafetyTeam: "Email our safety team",
    featuredService: "Featured Service",
    tagline:
      "Delivering reliable, end-to-end transportation solutions with a commitment to quality, consistency, and trust.",
    footerCtaEyebrow: "Cross-border since",
    footerCtaHeadlineA: "Ready to ship with",
    footerCtaHeadlineB: "confidence?",
    footerCtaBody:
      "Talk to our cross-border specialists — we reply within 24 hours.",
    allRightsReserved: "All rights reserved.",
    operatingSince: "Operating since",
    track: "Track",
    // Screen-reader / control labels
    openMenu: "Open menu",
    skipToContent: "Skip to content",
    mobileNav: "Mobile navigation",
    showOnMap: "show on the network map",
    certifications: "Certifications",
    highlights: "TBM highlights",
    contactByEmail: "Contact sales by email",
    copyPhone: "Copy phone number",
    salesSubject: "Sales inquiry — TBM Carriers",
  },

  /** Interactive network-map labels (filters, lane planner, results). */
  map: {
    all: "All",
    explore: "Explore",
    planLane: "Plan a lane",
    groups: {
      terminal: "Terminals & HQ",
      dropyard: "Drop Yards",
      crossing: "Border Crossings",
      office: "Offices & Shops",
    },
    roles: {
      hq: "Headquarters",
      terminal: "Terminal",
      dropyard: "Drop yard",
      crossing: "Border crossing",
      office: "Office",
      maintenance: "Maintenance shop",
    },
    tapOrigin: "Tap an origin city",
    thenDestination: "on the map, then a destination.",
    originColon: "Origin:",
    nowTapDestination: "— now tap a destination.",
    reset: "Reset",
    resetLane: "Reset lane",
    viaPrefix: "via the",
    viaSuffix: "gateway",
    miAbbr: "mi",
    kmAbbr: "km",
    dayShort: "day",
    daysShort: "days",
    estTransit: "est. transit",
    getFirmQuote: "Get a firm quote",
    laneQuoteSubject: "Lane quote",
    planFootnote:
      "Planning estimates from standard full-truckload driving times — your dedicated CSR confirms exact schedules and pricing.",
    planCaption: "Lane planner — tap two cities to sketch a route",
    captionTerminals: "terminals & HQ",
    captionDropYards: "drop yards",
    captionCrossings: "border crossings",
    captionOffices: "offices & shops",
    captionCorridors: "flowing lines trace our signature corridors",
  },
} as const;

/** Recursively widen literal types so the Spanish dictionary can supply its
 *  own strings while still being checked for structural completeness.
 *  Stays readonly so the `as const` English source assigns cleanly. */
type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends readonly (infer U)[]
        ? readonly Widen<U>[]
        : { readonly [K in keyof T]: Widen<T[K]> };

export type Dictionary = Widen<typeof EN>;
