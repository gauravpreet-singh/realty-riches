import { properties } from "@/data/properties";
import PropertyCard from "./PropertyCard";

export default function FeaturedProperties() {
  return (
    <section id="properties" className="section-padding bg-[#0b0b0b]">

      <div className="container-custom">

        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-[#d4af37]">
              Curated for you
            </p>

            <h2 className="mt-3 text-4xl font-semibold md:text-5xl">
              Featured Properties
            </h2>
          </div>

          <button className="w-fit text-sm text-zinc-400 hover:text-[#d4af37]">
            View all properties →
          </button>

        </div>

        <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">

          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
            />
          ))}

        </div>

      </div>

    </section>
  );
}