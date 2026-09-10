"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import PropertyFilters from "@/components/PropertyFilters";
import type { BuyerProperty } from "@/lib/properties";
import PropertiesHero from "@/components/PropertiesHero";
import { RotateCcw } from "lucide-react";

type Props = {
    properties: BuyerProperty[];
};

export default function PropertyListing({ properties }: Props) {
    const searchParams = useSearchParams();

    /*
     * Read filters coming from the homepage
     * or location pages.
     *
     * Examples:
     * /properties?location=mohali
     * /properties?location=new-chandigarh
     * /properties?location=kharar&type=Apartment
     * /properties?location=mohali&bedrooms=3&maxPrice=10000000
     */

    const initialLocation = searchParams.get("location") || "";
    const initialType = searchParams.get("type") || "";
    const initialBedrooms = searchParams.get("bedrooms") || "";
    const initialMaxPrice = searchParams.get("maxPrice") || "";

    const [location, setLocation] = useState(initialLocation);
    const [propertyType, setPropertyType] = useState(initialType);
    const [maxPrice, setMaxPrice] = useState(initialMaxPrice);
    const [bedrooms, setBedrooms] = useState(initialBedrooms);

    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("newest");

    const filteredProperties = useMemo(() => {
        const query = search.trim().toLowerCase();

        const filtered = properties.filter((property) => {
            const matchesSearch =
                !query ||
                property.title.toLowerCase().includes(query) ||
                property.location.toLowerCase().includes(query) ||
                property.city.toLowerCase().includes(query);

            const matchesLocation =
                !location || property.locationSlug === location;

            const matchesType =
                !propertyType ||
                property.propertyType.toLowerCase() === propertyType.toLowerCase();

            const matchesMaxPrice =
                !maxPrice || property.price <= Number(maxPrice);

            const matchesBedrooms =
                !bedrooms || property.bedrooms >= Number(bedrooms);

            return (
                matchesSearch &&
                matchesLocation &&
                matchesType &&
                matchesMaxPrice &&
                matchesBedrooms
            );
        });

        return [...filtered].sort((a, b) => {
            switch (sort) {
                case "price-low":
                    return a.price - b.price;

                case "price-high":
                    return b.price - a.price;

                case "newest":
                default:
                    return 0;
            }
        });
    }, [
        properties,
        search,
        location,
        propertyType,
        maxPrice,
        bedrooms,
        sort,
    ]);

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
            {/* Header */}
            <Navbar />
            <PropertiesHero image={properties[0]?.image} />

            {/* Main content */}
            <section className="bg-[#080909] px-6 py-20">
                <div className="mx-auto max-w-7xl">
                    <div className="grid min-w-0 gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
                        {/* Filters */}
                        <aside className="min-w-0">
                            <div className="lg:sticky lg:top-28">
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
                            </div>
                        </aside>

                        {/* Results */}
                        <div className="min-w-0">
                            {/* Results header */}
                            <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                                <div>
                                    <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#d4af37]">
                                        Property Collection
                                    </p>

                                    <div className="mt-2 flex items-baseline gap-2">
                                        <h2 className="font-serif text-3xl text-white">
                                            Properties
                                        </h2>

                                        <span className="text-sm text-zinc-600">
                                            {filteredProperties.length}
                                        </span>
                                    </div>
                                </div>

                                {(search ||
                                    location ||
                                    propertyType ||
                                    maxPrice ||
                                    bedrooms) && (
                                        <button
                                            type="button"
                                            onClick={clearFilters}
                                            className="
        inline-flex w-fit items-center gap-2
        text-xs font-medium
        text-zinc-500
        transition
        hover:text-[#d4af37]
      "
                                        >
                                            <RotateCcw size={13} />
                                            Clear all filters
                                        </button>
                                    )}
                            </div>

                            {/* No results */}
                            {filteredProperties.length === 0 ? (
                                <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-24 text-center">
                                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/10 text-2xl">
                                        🔍
                                    </div>

                                    <h2 className="mt-6 text-2xl font-semibold">
                                        No properties found
                                    </h2>

                                    <p className="mx-auto mt-3 max-w-md text-zinc-500">
                                        We couldn't find properties matching your current
                                        filters. Try changing your location, budget or property
                                        type.
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
                                /* Property grid */
                                <div className="grid min-w-0 gap-6 md:grid-cols-2 xl:grid-cols-3">
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