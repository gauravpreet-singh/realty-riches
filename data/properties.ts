export type Property = {
  id: string;
  title: string;
  location: string;
  city: string;
  price: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  propertyType: "Apartment" | "Villa" | "Plot";
  image: string;
  images?: string[];
  video?: string;
  features: string[];
  amenities: string[];
  possession?: string;
  description: string;
};

export const properties: Property[] = [
  {
  id: "sector-125-3bhk",

  title: "Premium 3 BHK Apartment",

  location: "Sector 125, Mohali",

  city: "Mohali",

  price: 9500000,

  area: 1525,

  bedrooms: 3,

  bathrooms: 3,

  propertyType: "Apartment",

  image:
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",

  images: [
    "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1600&q=85",

    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85",

    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=85",
  ],

  video: "/videos/property-1.mp4",

  features: [
    "Gated Society",
    "24h Power Backup",
    "Dedicated Parking",
  ],

  amenities: [
    "Club House",
    "Gym",
    "Swimming Pool",
    "Security",
    "Children's Play Area",
  ],

  possession: "May 2027",

  description:
    "A spacious premium 3 BHK apartment located in Sector 125, Mohali, offering modern interiors, excellent connectivity and a secure gated community.",
},

  {
    id: "kharar-luxury-villa",
    title: "Modern Luxury Villa",
    location: "Kharar, Punjab",
    city: "Kharar",
    price: 14500000,
    area: 2450,
    bedrooms: 4,
    bathrooms: 4,
    propertyType: "Villa",

    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",

    features: [
      "Private Parking",
      "Garden",
      "Modern Interiors",
    ],

    amenities: [
      "Private Garden",
      "Modular Kitchen",
      "Security",
      "Terrace",
    ],

    description:
      "A modern luxury villa designed for families looking for spacious living, contemporary interiors and convenient access to Chandigarh and Mohali.",
  },

  {
    id: "new-chandigarh-apartment",
    title: "Luxury 3 BHK Residence",
    location: "New Chandigarh",
    city: "New Chandigarh",
    price: 11000000,
    area: 1850,
    bedrooms: 3,
    bathrooms: 3,
    propertyType: "Apartment",

    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",

    features: [
      "Premium Location",
      "Club House",
      "Covered Parking",
    ],

    amenities: [
      "Gym",
      "Swimming Pool",
      "Club House",
      "Security",
    ],

    possession: "Ready to Move",

    description:
      "Premium 3 BHK residence in New Chandigarh with modern amenities, spacious layouts and excellent connectivity to Chandigarh.",
  },
];