import { siteUrl } from "@/lib/seo";

type LocationJsonLdProps = {
  name: string;
  description: string;
  slug: string;
};

export default function LocationJsonLd({
  name,
  description,
  slug,
}: LocationJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Place",
    name,
    description,
    url: `${siteUrl}/locations/${slug}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}