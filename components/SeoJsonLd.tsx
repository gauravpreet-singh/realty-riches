import { siteDescription, siteName, siteUrl } from "@/lib/seo";

type Props = {
  type?: "home" | "breadcrumb";
  breadcrumbs?: Array<{ name: string; url: string }>;
};

export default function SeoJsonLd({ type = "home", breadcrumbs = [] }: Props) {
  const graph =
    type === "home"
      ? [
          {
            "@type": "Organization",
            "@id": `${siteUrl}/#organization`,
            name: siteName,
            url: siteUrl,
            description: siteDescription,
          },
          {
            "@type": "WebSite",
            "@id": `${siteUrl}/#website`,
            url: siteUrl,
            name: siteName,
            description: siteDescription,
            publisher: { "@id": `${siteUrl}/#organization` },
          },
        ]
      : [
          {
            "@type": "BreadcrumbList",
            itemListElement: breadcrumbs.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: item.name,
              item: item.url,
            })),
          },
        ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  );
}
