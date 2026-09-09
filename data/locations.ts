export type Location = {
  slug: string;
  name: string;
  region: string;
  description: string;
  longDescription: string;
  propertyTypes: string[];
  highlights: string[];
  considerations: string[];
  connectivity: string[];
  image: string;
  featured?: boolean;
};

export const locations: Location[] = [
  {
    slug: "new-chandigarh",
    name: "New Chandigarh",
    region: "Mohali",
    description:
      "A planned residential destination with premium housing, green surroundings and expanding connectivity.",
    longDescription:
      "New Chandigarh is a developing residential destination for buyers looking beyond established urban areas. The location offers a mix of apartments, villas and plots, with newer residential developments and access to the wider Chandigarh–Mohali region.",
    propertyTypes: ["Apartments", "Villas", "Plots"],
    highlights: [
      "Planned development",
      "Premium residential projects",
      "Growing connectivity",
    ],
    considerations: [
      "Compare connectivity based on your daily commute",
      "Understand the development status of the surrounding area",
      "Check possession timelines for under-construction projects",
    ],
    connectivity: [
      "Chandigarh",
      "Mohali",
      "Major road corridors",
      "Healthcare and education destinations",
    ],
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
    featured: true,
  },

  {
    slug: "kharar",
    name: "Kharar",
    region: "Mohali",
    description:
      "A rapidly developing residential market offering a wide range of homes across different budgets.",
    longDescription:
      "Kharar has become an important residential market within the wider Mohali region. Buyers can find apartments, plots and independent housing across a range of configurations and price points.",
    propertyTypes: ["Apartments", "Plots", "Houses"],
    highlights: [
      "Multiple housing options",
      "Growing infrastructure",
      "Strong Chandigarh connectivity",
    ],
    considerations: [
      "Evaluate peak-hour commute times",
      "Compare established areas with newer developments",
      "Check road access and everyday conveniences around the property",
    ],
    connectivity: [
      "Chandigarh",
      "Mohali",
      "Kharar–Landran corridor",
      "Major road connections",
    ],
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85",
    featured: true,
  },

  {
    slug: "mohali",
    name: "Mohali",
    region: "SAS Nagar",
    description:
      "A mature urban market combining established sectors, modern residential developments and strong connectivity.",
    longDescription:
      "Mohali combines established residential sectors with newer developments across the city. Its urban infrastructure, commercial activity and proximity to Chandigarh make it an important market for both end-use and long-term residential buyers.",
    propertyTypes: ["Apartments", "Villas", "Plots"],
    highlights: [
      "Established infrastructure",
      "IT and commercial ecosystem",
      "Strong connectivity",
    ],
    considerations: [
      "Compare individual sectors rather than treating Mohali as one market",
      "Consider proximity to workplaces and daily destinations",
      "Evaluate property age and surrounding development",
    ],
    connectivity: [
      "Chandigarh",
      "Kharar",
      "Zirakpur",
      "Airport Road",
    ],
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85",
    featured: true,
  },

  {
    slug: "zirakpur",
    name: "Zirakpur",
    region: "Mohali",
    description:
      "A high-growth residential corridor known for its connectivity to Chandigarh, Panchkula and the airport.",
    longDescription:
      "Zirakpur sits at an important junction connecting Chandigarh, Panchkula, Mohali and the airport-side corridors. The area has a broad residential inventory ranging from apartments to plots and other property formats.",
    propertyTypes: ["Apartments", "Plots", "Commercial"],
    highlights: [
      "Airport connectivity",
      "Highway access",
      "Large residential inventory",
    ],
    considerations: [
      "Assess traffic and commute patterns",
      "Check access roads around the specific project",
      "Compare development quality between projects",
    ],
    connectivity: [
      "Chandigarh",
      "Panchkula",
      "Chandigarh International Airport",
      "Major highways",
    ],
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85",
  },

  {
    slug: "chandigarh",
    name: "Chandigarh",
    region: "Chandigarh",
    description:
      "India's renowned planned city with established neighbourhoods, infrastructure and a strong residential ecosystem.",
    longDescription:
      "Chandigarh is a highly planned urban environment with established residential neighbourhoods and mature infrastructure. Buyers can evaluate properties across different sectors while considering factors such as location, property age, amenities and connectivity.",
    propertyTypes: ["Apartments", "Houses", "Plots"],
    highlights: [
      "Planned city",
      "Established infrastructure",
      "Premium residential areas",
    ],
    considerations: [
      "Compare individual sectors carefully",
      "Consider property age and condition",
      "Evaluate availability of parking and other practical requirements",
    ],
    connectivity: [
      "Mohali",
      "Panchkula",
      "Chandigarh railway station",
      "Chandigarh International Airport",
    ],
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
  },

  {
    slug: "airport-road",
    name: "Airport Road",
    region: "Mohali",
    description:
      "A strategically positioned corridor connecting residential developments with the airport and major roads.",
    longDescription:
      "The Airport Road corridor has attracted residential and commercial development because of its strategic position within the wider Mohali region. Buyers can evaluate newer projects while considering connectivity and surrounding infrastructure.",
    propertyTypes: ["Apartments", "Plots", "Commercial"],
    highlights: [
      "Airport proximity",
      "Major road connectivity",
      "New development",
    ],
    considerations: [
      "Verify actual travel times for your routine",
      "Review surrounding development",
      "Check project access and internal infrastructure",
    ],
    connectivity: [
      "Chandigarh International Airport",
      "Mohali",
      "Chandigarh",
      "Major road corridors",
    ],
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=85",
  },

  {
    slug: "aerocity",
    name: "Aerocity",
    region: "Mohali",
    description:
      "A modern residential and commercial destination positioned along the airport-side growth corridor.",
    longDescription:
      "Aerocity is positioned within the airport-side development corridor of Mohali. The area offers opportunities across residential and commercial property categories and can appeal to buyers looking for newer developments.",
    propertyTypes: ["Apartments", "Plots", "Commercial"],
    highlights: [
      "Strategic location",
      "Modern development",
      "Airport-side corridor",
    ],
    considerations: [
      "Compare project-level infrastructure",
      "Check access during peak traffic",
      "Evaluate surrounding commercial and residential development",
    ],
    connectivity: [
      "Chandigarh International Airport",
      "Mohali",
      "Chandigarh",
      "Major road corridors",
    ],
    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1600&q=85",
  },

  {
    slug: "sector-115",
    name: "Sector 115",
    region: "Mohali",
    description:
      "A growing residential area offering access to expanding infrastructure and a broad range of housing options.",
    longDescription:
      "Sector 115 is part of the expanding residential areas around Mohali. Buyers can find different property formats while comparing accessibility, surrounding development and the practical requirements of everyday living.",
    propertyTypes: ["Apartments", "Plots", "Houses"],
    highlights: [
      "Residential growth",
      "Multiple housing options",
      "Mohali connectivity",
    ],
    considerations: [
      "Review the immediate surroundings of each project",
      "Check road access and commute requirements",
      "Compare available amenities and infrastructure",
    ],
    connectivity: [
      "Mohali",
      "Kharar",
      "Chandigarh",
      "Major connecting roads",
    ],
    image:
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1600&q=85",
  },
];

