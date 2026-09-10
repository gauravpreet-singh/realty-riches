import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import type { BuyerProperty } from "@/lib/properties";

type FeaturedPropertiesProps = {
  properties: BuyerProperty[];
};

export default function FeaturedProperties({
  properties,
}: FeaturedPropertiesProps) {
  return (
    <section className="section-padding">
      <div className="container-custom">

        {/* Section header */}
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[#d4af37]">
              Featured Properties
            </p>

            <h2 className="font-serif text-4xl font-semibold text-white md:text-5xl">
              Properties worth{" "}
              <span className="text-[#d4af37]">looking at.</span>
            </h2>

            <p className="mt-4 max-w-2xl text-gray-400">
              A curated selection of properties currently available through
              Realty Riches.
            </p>
          </div>

          <Link
            href="/properties"
            className="hidden text-sm font-medium text-[#d4af37] transition hover:text-[#e5c158] md:block"
          >
            View All Properties →
          </Link>
        </div>

        {/* Properties */}
        {properties.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {properties.slice(0, 3).map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-[#0d0f0f] px-6 py-16 text-center">
            <p className="font-serif text-2xl text-white">
              Featured properties coming soon.
            </p>

            <p className="mt-3 text-sm text-gray-400">
              We are currently adding properties to our featured collection.
            </p>

            <Link
              href="/properties"
              className="mt-6 inline-block text-sm font-medium text-[#d4af37] hover:text-[#e5c158]"
            >
              Browse all properties →
            </Link>
          </div>
        )}

        {/* Mobile CTA */}
        <div className="mt-8 md:hidden">
          <Link
            href="/properties"
            className="text-sm font-medium text-[#d4af37] hover:text-[#e5c158]"
          >
            View All Properties →
          </Link>
        </div>

      </div>
    </section>
  );
}