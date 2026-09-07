"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyFilters from "@/components/PropertyFilters";
import { properties } from "@/data/properties";

export default function PropertiesPage() {
  const searchParams = useSearchParams();

  /*
   * Read filters coming from the homepage.
   *
   * Example:
   * /properties?location=Mohali&type=Apartment&bedrooms=3&maxPrice=10000000
   */

  const initialLocation = searchParams.get("location") || "";
  const initialType = searchParams.get("type") || "";
  const initialBedrooms = searchParams.get("bedrooms") || "";
  const initialMaxPrice = searchParams.get("maxPrice") || "";

  const [search, setSearch] = useState(initialLocation);
  const [propertyType, setPropertyType] = useState(initialType);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);
  const [bedrooms, setBedrooms] = useState(initialBedrooms);
  const [sort, setSort] = useState("newest");

  /*
   * Filter properties
   */

  const filteredProperties = useMemo(() => {
    let result = properties.filter((property) => {
      // Search / Location
      const searchText = search.trim().toLowerCase();

      const matchesSearch =
        !searchText ||
        property.title.toLowerCase().includes(searchText) ||
        property.location.toLowerCase().includes(searchText) ||
        property.city.toLowerCase().includes(searchText);

      // Property type
      const matchesType =
        !propertyType ||
        property.propertyType.toLowerCase() ===
          propertyType.toLowerCase();

      // Maximum budget
      const matchesPrice =
        !maxPrice ||
        property.price <= Number(maxPrice);

      // Bedrooms
      const matchesBedrooms =
        !bedrooms ||
        property.bedrooms >= Number(bedrooms);

      return (
        matchesSearch &&
        matchesType &&
        matchesPrice &&
        matchesBedrooms
      );
    });

    /*
     * Sorting
     */

    if (sort === "price-low") {
      result = [...result].sort(
        (a, b) => a.price - b.price
      );
    }

    if (sort === "price-high") {
      result = [...result].sort(
        (a, b) => b.price - a.price
      );
    }

    return result;
  }, [
    search,
    propertyType,
    maxPrice,
    bedrooms,
    sort,
  ]);

  /*
   * Clear all filters
   */

  const clearFilters = () => {
    setSearch("");
    setPropertyType("");
    setMaxPrice("");
    setBedrooms("");
    setSort("newest");
  };

  return (
    <main className="min-h-screen bg-black text-white">

      {/* NAVBAR */}
      <Navbar />

      {/* PAGE HEADER */}
      <section className="border-b border-white/10 pt-36 pb-14">
        <div className="container-custom">

          <p className="mb-4 text-sm uppercase tracking-[0.25em] text-[#d4af37]">
            Realty Riches
          </p>

          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
            Find a property that
            <span className="gold-text">
              {" "}fits your life.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
            Explore carefully selected apartments, villas,
            plots and homes across Mohali, Chandigarh,
            New Chandigarh and surrounding areas.
          </p>

        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="section-padding">

        <div className="container-custom">

          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">

            {/* ================================================= */}
            {/* LEFT FILTER SIDEBAR */}
            {/* ================================================= */}

            <PropertyFilters
              search={search}
              setSearch={setSearch}

              propertyType={propertyType}
              setPropertyType={setPropertyType}

              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}

              bedrooms={bedrooms}
              setBedrooms={setBedrooms}

              sort={sort}
              setSort={setSort}
            />

            {/* ================================================= */}
            {/* RIGHT PROPERTY RESULTS */}
            {/* ================================================= */}

            <div>

              {/* Results header */}

              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <p className="text-sm text-zinc-500">
                    Showing{" "}
                    <span className="text-white">
                      {filteredProperties.length}
                    </span>{" "}
                    properties
                  </p>
                </div>

                {/* Mobile/desktop clear button */}

                {(search ||
                  propertyType ||
                  maxPrice ||
                  bedrooms) && (
                  <button
                    onClick={clearFilters}
                    className="w-fit text-sm text-[#d4af37] hover:underline"
                  >
                    Clear all filters
                  </button>
                )}

              </div>

              {/* ================================================= */}
              {/* NO RESULTS */}
              {/* ================================================= */}

              {filteredProperties.length === 0 ? (

                <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-24 text-center">

                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/10 text-2xl">
                    🔍
                  </div>

                  <h2 className="mt-6 text-2xl font-semibold">
                    No properties found
                  </h2>

                  <p className="mx-auto mt-3 max-w-md text-zinc-500">
                    We couldn't find properties matching
                    your current filters. Try changing your
                    location, budget or property type.
                  </p>

                  <button
                    onClick={clearFilters}
                    className="mt-6 rounded-full bg-[#d4af37] px-6 py-3 text-sm font-medium text-black transition hover:bg-[#e5c158]"
                  >
                    Clear Filters
                  </button>

                </div>

              ) : (

                /* ================================================= */
                /* PROPERTY GRID */
                /* ================================================= */

                <div className="grid gap-6 md:grid-cols-2">

                  {filteredProperties.map((property) => (

                    <Link
                      key={property.id}
                      href={`/properties/${property.id}`}
                      className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition duration-300 hover:-translate-y-1 hover:border-[#d4af37]/40"
                    >

                      {/* IMAGE */}

                      <div className="relative aspect-[4/3] overflow-hidden">

                        <img
                          src={property.image}
                          alt={property.title}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        />

                        {/* Property type */}

                        <div className="absolute left-4 top-4 rounded-full bg-black/75 px-3 py-1.5 text-xs font-medium backdrop-blur">
                          {property.propertyType}
                        </div>

                        {/* Video */}

                        {property.video && (
                          <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-[#d4af37] px-3 py-1.5 text-xs font-medium text-black">
                            ▶ Video
                          </div>
                        )}

                        {/* Possession */}

                        {property.possession && (
                          <div className="absolute bottom-4 left-4 rounded-full bg-black/75 px-3 py-1.5 text-xs backdrop-blur">
                            {property.possession}
                          </div>
                        )}

                      </div>

                      {/* PROPERTY CONTENT */}

                      <div className="p-5">

                        {/* Location */}

                        <p className="text-sm text-zinc-500">
                          {property.location}
                        </p>

                        {/* Title */}

                        <h2 className="mt-2 text-xl font-semibold transition group-hover:text-[#d4af37]">
                          {property.title}
                        </h2>

                        {/* Price */}

                        <p className="mt-3 text-2xl font-semibold text-[#d4af37]">
                          ₹
                          {(
                            property.price / 10000000
                          ).toFixed(2)}{" "}
                          Cr
                        </p>

                        {/* Property stats */}

                        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/10 pt-4 text-sm text-zinc-400">

                          <span>
                            {property.area.toLocaleString()} sq ft
                          </span>

                          {property.bedrooms > 0 && (
                            <span>
                              {property.bedrooms} BHK
                            </span>
                          )}

                          {property.bathrooms > 0 && (
                            <span>
                              {property.bathrooms} Bath
                            </span>
                          )}

                        </div>

                        {/* Features */}

                        <div className="mt-4 flex flex-wrap gap-2">

                          {property.features
                            .slice(0, 3)
                            .map((feature) => (
                              <span
                                key={feature}
                                className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-500"
                              >
                                {feature}
                              </span>
                            ))}

                        </div>

                        {/* CTA */}

                        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">

                          <span className="text-sm text-zinc-400">
                            View property
                          </span>

                          <span className="text-[#d4af37] transition-transform group-hover:translate-x-1">
                            →
                          </span>

                        </div>

                      </div>

                    </Link>

                  ))}

                </div>

              )}

            </div>

          </div>

        </div>

      </section>

      <Footer />

    </main>
  );
}