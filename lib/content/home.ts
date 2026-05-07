export const HOME = {
  hero: {
    eyebrow: "Operating since 1999",
    headline: "Delivering Quality & Reliability",
    subhead:
      "Safe, secure, and reliable freight transportation across the United States, Mexico, and Canada.",
    bgImage: "/brand/TBM-1.jpg",
  },

  stats: [
    { value: "1,200+", label: "Cities (US, CA & MX)" },
    { value: "25,000+", label: "Loads Annually" },
    { value: "500+", label: "Employees" },
  ],

  about: {
    eyebrow: "About Us",
    headline: "Operating since 1999, serving the USMCA region",
    body: [
      "TBM Carriers is a cross-border logistics provider connecting the United States, Mexico, and Canada with door-to-door service handled exclusively by our drivers.",
      "Our asset-based network — terminals on both sides of the border, certified maintenance facilities, and a 24/7 support team — delivers consistency, security, and accountability at every stage.",
    ],
    image: "/brand/tbm-c-2.jpg",
  },

  howItWorks: {
    eyebrow: "How It Works",
    headline: "Three steps to a reliable shipment",
    steps: [
      {
        n: "01",
        title: "Request a Quote",
        body: "Tell us your origin, destination, and commodity. Our specialists respond within 24 hours.",
        image: "/brand/tbm-q.jpg",
      },
      {
        n: "02",
        title: "Provide Details",
        body: "Share your shipment specs, schedule, and any compliance requirements. We handle the paperwork.",
        image: "/brand/tbm-e.jpg",
      },
      {
        n: "03",
        title: "Make It Happen",
        body: "GPS-tracked, AI-monitored loads delivered with consistent communication from a dedicated CSR.",
        image: "/brand/tbm-r.jpg",
      },
    ],
  },

  crossBorder: {
    eyebrow: "Cross-Border Logistics Solutions",
    headline: "Integrated, asset-based, cost-optimized",
    subhead:
      "Three pillars behind cross-border freight that doesn't get stuck at the border.",
    pillars: [
      {
        title: "Asset-based + integrated",
        body: "Our own trucks, drivers, and terminals — supported by 25+ C-TPAT-certified partner carriers for surge capacity. Fewer handoffs, fewer surprises, faster transit.",
      },
      {
        title: "Seamless international network",
        body: "Coordinated origin-to-destination handoffs that minimize cargo handling, lower operating cost, and reduce damage and theft risk across the U.S.–Mexico–Canada corridor.",
      },
      {
        title: "Ferromex intermodal integration",
        body: "Partnership with Ferromex plugs Mexico's intermodal rail network into your supply chain — scalable, efficient, and cost-optimized for high-volume lanes.",
      },
    ],
  },

  crossDock: {
    eyebrow: "Cross-Border Dock Operations",
    headline:
      "Simplify your shipping experience with cross-border docking",
    body: "Bonded cross-dock facilities at the major U.S./Mexico gateways let us consolidate, deconsolidate, and re-route in minutes — not days. The result: shorter transit windows, lower handling cost, and tighter compliance on both sides of the line.",
    image: "/brand/tbm-back-team.jpg",
  },

  network: {
    eyebrow: "Our Network",
    headline:
      "Cross-border coverage across key North American trade corridors",
    body: "Strategically positioned at major U.S.–Mexico gateways, our network supports secure, efficient, and high-performance cross-border logistics.",
    crossings: [
      { us: "Otay Mesa, CA", mx: "Tijuana, B.C." },
      { us: "Calexico, CA", mx: "Mexicali, B.C." },
      { us: "Nogales, AZ", mx: "Nogales, Son." },
      { us: "Del Rio, TX", mx: "Cd. Acuña, Coah." },
      { us: "Eagle Pass, TX", mx: "Piedras Negras, Coah." },
      { us: "Laredo, TX", mx: "Nuevo Laredo, Tamps." },
      { us: "El Paso, TX", mx: "Ciudad Juárez, Chih." },
    ],
  },

  whyUs: {
    eyebrow: "We check every box",
    headline:
      "End-to-end logistics solutions designed to deliver reliability, coverage, and confidence across every shipment.",
    features: [
      {
        title: "Fast & Expert Solutions",
        body: "Decades of cross-border expertise translate into faster clearing, fewer delays, and predictable transit times.",
        icon: "Zap",
      },
      {
        title: "Safety & Reliability",
        body: "C-TPAT, FAST, and SmartWay certified, with continuous AI-powered monitoring across every load.",
        icon: "ShieldCheck",
      },
      {
        title: "Wide-Reaching Service",
        body: "Coverage across 1,200+ cities through asset-based terminals and a vetted partner network.",
        icon: "Globe2",
      },
      {
        title: "24/7 Support",
        body: "A dedicated CSR is your single point of contact, available around the clock with real-time updates.",
        icon: "Headphones",
      },
    ],
  },

  finalCta: {
    eyebrow: "Ship with confidence",
    headline: "Reliable, secure, and efficient logistics solutions across North America.",
    bgImage: "/brand/tbm-t.jpg",
  },
} as const;
