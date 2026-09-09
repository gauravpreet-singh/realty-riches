export type MarketMetric = {
  label: string;
  value: string;
  description: string;
};

export type MarketSource = {
  name: string;
  url: string;
  accessed: string;
};

export type LocationMarketData = {
  locationSlug: string;

  marketPosition: string;

  metrics: MarketMetric[];

  demandDrivers: string[];

  developmentSignals: string[];

  buyerFit: string[];

  buyerWatchouts: string[];

  reraGuidance: string;

  planningGuidance: string;

  lastUpdated: string;

  sources: MarketSource[];
};

export const locationMarketData: LocationMarketData[] = [
  {
    locationSlug: "mohali",

    marketPosition:
      "A mature Tricity residential market with established sectors, employment access and multiple housing formats.",

    metrics: [
      {
        label: "Market Type",
        value: "Established",
        description:
          "Established residential sectors alongside continuing development activity.",
      },
      {
        label: "Property Formats",
        value: "Apartments · Villas · Plots",
        description:
          "Buyers can evaluate multiple residential formats depending on location and budget.",
      },
      {
        label: "Planning Framework",
        value: "GMADA",
        description:
          "Development should be evaluated against the applicable GMADA planning framework.",
      },
    ],

    demandDrivers: [
      "Proximity to Chandigarh and the wider Tricity employment ecosystem.",
      "Established residential sectors and supporting social infrastructure.",
      "Availability of apartments, independent homes and plots across different micro-markets.",
    ],

    developmentSignals: [
      "GMADA maintains approved planning documents for the SAS Nagar area.",
      "Infrastructure and land-development activity should be evaluated at the sector or project level rather than assuming uniform development across Mohali.",
    ],

    buyerFit: [
      "End-users looking for access to Chandigarh and Mohali employment hubs.",
      "Families comparing established sectors with newer residential developments.",
      "Buyers who want to compare apartments, villas and plots.",
    ],

    buyerWatchouts: [
      "Verify the exact sector and development authority jurisdiction.",
      "Check project-specific RERA registration where applicable.",
      "Do not assume infrastructure timelines from broader-area development plans.",
      "Compare actual project access and surrounding development rather than relying only on a location name.",
    ],

    reraGuidance:
      "For applicable projects, verify registration and project details directly through the Punjab RERA project search before making a booking decision.",

    planningGuidance:
      "Use the applicable GMADA master plan and project-level approvals to understand the planning context of a property.",

    lastUpdated: "September 2026",

    sources: [
      {
        name: "GMADA — Approved Master Plans",
        url: "https://gmada.gov.in/en/master-plans/approved-master-plans",
        accessed: "September 2026",
      },
      {
        name: "Punjab RERA — Registered Projects",
        url: "https://rera.punjab.gov.in/reraindex/publicview/projectinfo",
        accessed: "September 2026",
      },
    ],
  },

  {
    locationSlug: "new-chandigarh",

    marketPosition:
      "A planned-growth residential area where buyers should evaluate the relationship between master planning, infrastructure delivery and individual projects.",

    metrics: [
      {
        label: "Market Type",
        value: "Planned Growth",
        description:
          "A developing residential environment with planning context that should be examined before purchase.",
      },
      {
        label: "Property Formats",
        value: "Apartments · Villas · Plots",
        description:
          "Multiple residential formats are present across the broader New Chandigarh market.",
      },
      {
        label: "Planning Framework",
        value: "GMADA",
        description:
          "New Chandigarh has an approved GMADA planning framework.",
      },
    ],

    demandDrivers: [
      "Planned-development character and proximity to Chandigarh.",
      "Availability of newer residential communities.",
      "Potential appeal for buyers seeking newer housing stock and larger-format developments.",
    ],

    developmentSignals: [
      "GMADA lists an approved New Chandigarh 2008–2031 master plan.",
      "GMADA also publishes development and infrastructure information for New Chandigarh.",
    ],

    buyerFit: [
      "Buyers prioritising newer developments.",
      "Families looking for larger residential communities.",
      "Buyers willing to evaluate development timelines alongside the property itself.",
    ],

    buyerWatchouts: [
      "Separate planned-area potential from currently delivered infrastructure.",
      "Check the actual approach road and surrounding occupied development.",
      "Verify project approvals and RERA status.",
      "Check possession commitments against the latest project documentation.",
    ],

    reraGuidance:
      "Verify the specific project's registration, promoter information, quarterly updates and other available records through Punjab RERA.",

    planningGuidance:
      "Use the New Chandigarh master plan as planning context, but evaluate the individual project's current execution separately.",

    lastUpdated: "September 2026",

    sources: [
      {
        name: "GMADA — Approved Master Plans",
        url: "https://gmada.gov.in/en/master-plans/approved-master-plans",
        accessed: "September 2026",
      },
      {
        name: "Punjab RERA — Registered Projects",
        url: "https://rera.punjab.gov.in/reraindex/publicview/projectinfo",
        accessed: "September 2026",
      },
    ],
  },

  {
    locationSlug: "kharar",

    marketPosition:
      "A residential market where buyers should pay particular attention to connectivity, local infrastructure and project-level approvals.",

    metrics: [
      {
        label: "Market Type",
        value: "Growth Corridor",
        description:
          "A growing residential area connected to the wider Mohali and Chandigarh region.",
      },
      {
        label: "Property Formats",
        value: "Apartments · Villas · Plots",
        description:
          "Different housing formats are available across the broader Kharar market.",
      },
      {
        label: "Planning Framework",
        value: "GMADA",
        description:
          "GMADA maintains an approved Kharar 2031 master plan.",
      },
    ],

    demandDrivers: [
      "Connectivity toward Mohali and Chandigarh.",
      "Availability of comparatively varied residential formats.",
      "Continued development across the wider Kharar planning area.",
    ],

    developmentSignals: [
      "GMADA publishes an approved Kharar 2031 master plan.",
      "Current GMADA notices include infrastructure and land-development activity within the wider region.",
    ],

    buyerFit: [
      "First-time buyers comparing multiple residential formats.",
      "Families prioritising connectivity and usable housing space.",
      "Buyers evaluating newer developments against established neighbourhoods.",
    ],

    buyerWatchouts: [
      "Evaluate the exact road and neighbourhood rather than the broader Kharar label.",
      "Check drainage, approach roads and surrounding development.",
      "Verify RERA registration where applicable.",
      "Review project documentation before paying a booking amount.",
    ],

    reraGuidance:
      "Use the Punjab RERA project search to verify registered projects and available project information.",

    planningGuidance:
      "Review the applicable Kharar master-plan context and then assess the individual project's current physical development.",

    lastUpdated: "September 2026",

    sources: [
      {
        name: "GMADA — Kharar Master Plan",
        url: "https://www.gmada.gov.in/en/master-plansapproved-master-plansgmadakharar-2031/plan",
        accessed: "September 2026",
      },
      {
        name: "Punjab RERA — Registered Projects",
        url: "https://rera.punjab.gov.in/reraindex/publicview/projectinfo",
        accessed: "September 2026",
      },
    ],
  },

  {
    locationSlug: "zirakpur",

    marketPosition:
      "A high-connectivity residential market where buyers should carefully distinguish between location convenience and project quality.",

    metrics: [
      {
        label: "Market Type",
        value: "High-Connectivity",
        description:
          "A major residential and connectivity-oriented market in the Tricity region.",
      },
      {
        label: "Property Formats",
        value: "Apartments · Villas · Plots",
        description:
          "Multiple residential formats exist across the wider Zirakpur area.",
      },
      {
        label: "Planning Framework",
        value: "GMADA",
        description:
          "GMADA maintains an approved Zirakpur 2031 master plan.",
      },
    ],

    demandDrivers: [
      "Connectivity toward Chandigarh, Panchkula and the airport corridor.",
      "Large supply of apartment-led residential development.",
      "Strong relevance for buyers who prioritise regional connectivity.",
    ],

    developmentSignals: [
      "GMADA publishes an approved Zirakpur 2031 master plan.",
      "Project-level due diligence is especially important because the broader location contains many individual developments.",
    ],

    buyerFit: [
      "Commuters prioritising regional connectivity.",
      "Buyers comparing apartment communities.",
      "Investors or end-users evaluating rental and resale considerations alongside liveability.",
    ],

    buyerWatchouts: [
      "Evaluate traffic and actual travel times during peak hours.",
      "Check project-specific approvals and RERA information.",
      "Review maintenance charges and community occupancy.",
      "Assess water, drainage, parking and access-road conditions.",
    ],

    reraGuidance:
      "Verify the specific project through Punjab RERA rather than relying on developer marketing material alone.",

    planningGuidance:
      "Use the Zirakpur master plan for broader planning context and project-level documentation for purchase decisions.",

    lastUpdated: "September 2026",

    sources: [
      {
        name: "GMADA — Zirakpur Master Plan",
        url: "https://www.gmada.gov.in/en/master-plansapproved-master-plansgmadazirakpur-2031/plan",
        accessed: "September 2026",
      },
      {
        name: "Punjab RERA — Registered Projects",
        url: "https://rera.punjab.gov.in/reraindex/publicview/projectinfo",
        accessed: "September 2026",
      },
    ],
  },
];

export function getLocationMarketData(slug: string) {
  return locationMarketData.find(
    (item) => item.locationSlug === slug
  );
}

