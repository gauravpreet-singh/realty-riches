import Link from "next/link";

type Breadcrumb = {
  name: string;
  href: string;
};

type BreadcrumbsProps = {
  items: Breadcrumb[];
};

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${process.env.NEXT_PUBLIC_SITE_URL || ""}${item.href}`,
    })),
  };

  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex flex-wrap items-center gap-2 text-sm text-zinc-500"
      >
        {items.map((item, index) => (
          <div key={item.href} className="flex items-center gap-2">
            {index > 0 && <span>/</span>}

            {index === items.length - 1 ? (
              <span className="text-zinc-300">{item.name}</span>
            ) : (
              <Link
                href={item.href}
                className="transition hover:text-[#d4af37]"
              >
                {item.name}
              </Link>
            )}
          </div>
        ))}
      </nav>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
    </>
  );
}