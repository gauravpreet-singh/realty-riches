"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyFilters from "@/components/PropertyFilters";
import PropertyCard from "@/components/PropertyCard";

import { properties } from "@/data/properties";

export default function PropertiesPage() {
  const searchParams = useSearchParams();

  /*
   * Read filters coming from the homepage
   * or location pages.
   *
   * Examples:
   *
   * /properties?location=mohali
   * /properties?location=new-chandigarh
   * /properties?location=kharar&type=Apartment
   * /properties?location=mohali&bedrooms=3&maxPrice=10000000
   */

 const initialLocation =
  searchParams.get("location") || "";

const [location, setLocation] =
  useState(initialLocation);

  const initialType =
    searchParams.get("type") || "";

  const initialBedrooms =
    searchParams.get("bedrooms") || "";

  const initialMaxPrice =
    searchParams.get("maxPrice") || "";

  const [search, setSearch] =
    useState(initialLocation);

  const [propertyType, setPropertyType] =
    useState(initialType);

  const [maxPrice, setMaxPrice] =
    useState(initialMaxPrice);

  const [bedrooms, setBedrooms] =
    useState(initialBedrooms);

  const [sort, setSort] =
    useState("newest");

  /*
   * Filter properties
   */

  const filteredProperties = useMemo(() => {
  let result = properties.filter((property) => {
    const searchText =
      search.trim().toLowerCase();

    const matchesSearch =
      !searchText ||
      property.title
        .toLowerCase()
        .includes(searchText) ||
      property.location
        .toLowerCase()
        .includes(searchText) ||
      property.city
        .toLowerCase()
        .includes(searchText);

    const matchesLocation =
      !location ||
      property.locationSlug === location;

    const matchesType =
      !propertyType ||
      property.propertyType.toLowerCase() ===
        propertyType.toLowerCase();

    const matchesPrice =
      !maxPrice ||
      property.price <= Number(maxPrice);

    const matchesBedrooms =
      !bedrooms ||
      property.bedrooms >= Number(bedrooms);

    return (
      matchesSearch &&
      matchesLocation &&
      matchesType &&
      matchesPrice &&
      matchesBedrooms
    );
  });

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
  location,
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
  setLocation("");
  setPropertyType("");
  setMaxPrice("");
  setBedrooms("");
  setSort("newest");
};

  return (
    <main className="min-h-screen bg-black text-white">

      {/* ================================================= */}
      {/* NAVBAR */}
      {/* ================================================= */}

      <Navbar />

      {/* ================================================= */}
      {/* PAGE HEADER */}
      {/* ================================================= */}

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

      {/* ================================================= */}
      {/* MAIN CONTENT */}
      {/* ================================================= */}

      <section className="section-padding">
        <div className="container-custom">

          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">

            {/* ================================================= */}
            {/* LEFT FILTER SIDEBAR */}
            {/* ================================================= */}

          <PropertyFilters
  search={search}
  setSearch={setSearch}

  location={location}
  setLocation={setLocation}

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

              {/* ================================================= */}
              {/* RESULTS HEADER */}
              {/* ================================================= */}

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

                {(search ||
                  propertyType ||
                  maxPrice ||
                  bedrooms) && (
                  <button
                    type="button"
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
                    type="button"
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
                    <PropertyCard
                      key={property.id}
                      property={property}
                    />
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

