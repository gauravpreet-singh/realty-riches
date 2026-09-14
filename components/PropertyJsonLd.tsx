import { siteUrl } from "@/lib/seo";

type PropertyJsonLdProps = {
  property: {
    title: string;
    description?: string | null;
    image?: string | null;
    price: number;
    propertyType: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
    location?: string | null;
    city?: string | null;
    slug: string;
  };
};

export default function PropertyJsonLd({
  property,
}: PropertyJsonLdProps) {
  const location = property.location || property.city || "Mohali";
  const url = `${siteUrl}/properties/${property.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: property.title,
    description:
      property.description ||
      `${property.propertyType} in ${location} listed by Realty Riches.`,
    image: property.image ? [property.image] : undefined,
    url,
    brand: {
      "@type": "Brand",
      name: "Realty Riches",
    },
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "INR",
      price: property.price,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Realty Riches",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
}