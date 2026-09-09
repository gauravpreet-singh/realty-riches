"use client";

import { locations } from "@/data/locations";

type PropertyFiltersProps = {
  search: string;
  setSearch: (value: string) => void;

  location: string;
  setLocation: (value: string) => void;

  propertyType: string;
  setPropertyType: (value: string) => void;

  maxPrice: string;
  setMaxPrice: (value: string) => void;

  bedrooms: string;
  setBedrooms: (value: string) => void;

  sort: string;
  setSort: (value: string) => void;
};

export default function PropertyFilters({
  search,
  setSearch,

  location,
  setLocation,

  propertyType,
  setPropertyType,

  maxPrice,
  setMaxPrice,

  bedrooms,
  setBedrooms,

  sort,
  setSort,
}: PropertyFiltersProps) {
  const clearFilters = () => {
    setSearch("");
    setLocation("");
    setPropertyType("");
    setMaxPrice("");
    setBedrooms("");
    setSort("newest");
  };

  return (
    <aside className="sticky top-28 h-fit rounded-2xl border border-white/10 bg-white/[0.03] p-6">

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          Filters
        </h2>

        <button
          type="button"
          onClick={clearFilters}
          className="text-xs text-[#d4af37] hover:underline"
        >
          Clear all
        </button>
      </div>

      {/* Search */}
      <div className="border-b border-white/10 pb-6">
        <label className="mb-2 block text-xs uppercase tracking-wider text-zinc-500">
          Search
        </label>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Property name or keyword"
          className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm outline-none transition focus:border-[#d4af37]"
        />
      </div>

      {/* Location */}
      <div className="border-b border-white/10 py-6">
        <label className="mb-3 block text-sm font-medium">
          Location
        </label>

        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-zinc-300 outline-none transition focus:border-[#d4af37]"
        >
          <option value="">
            All Locations
          </option>

          {locations.map((item) => (
            <option
              key={item.slug}
              value={item.slug}
            >
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* Property Type */}
      <div className="border-b border-white/10 py-6">
        <label className="mb-4 block text-sm font-medium">
          Property Type
        </label>

        <div className="space-y-3">
          {["Apartment", "Villa", "Plot"].map((type) => (
            <label
              key={type}
              className="flex cursor-pointer items-center gap-3 text-sm text-zinc-400"
            >
              <input
                type="radio"
                name="propertyType"
                value={type}
                checked={propertyType === type}
                onChange={(e) =>
                  setPropertyType(e.target.value)
                }
                className="accent-[#d4af37]"
              />

              {type}
            </label>
          ))}
        </div>
      </div>

      {/* Budget */}
      <div className="border-b border-white/10 py-6">
        <label className="mb-4 block text-sm font-medium">
          Maximum Budget
        </label>

        <select
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm outline-none"
        >
          <option value="">
            Any Budget
          </option>

          <option value="7500000">
            ₹75 Lakh
          </option>

          <option value="10000000">
            ₹1 Crore
          </option>

          <option value="15000000">
            ₹1.5 Crore
          </option>

          <option value="20000000">
            ₹2 Crore
          </option>
        </select>
      </div>

      {/* Bedrooms */}
      <div className="border-b border-white/10 py-6">
        <label className="mb-4 block text-sm font-medium">
          Bedrooms
        </label>

        <div className="grid grid-cols-3 gap-2">
          {["2", "3", "4"].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() =>
                setBedrooms(
                  bedrooms === value ? "" : value
                )
              }
              className={`rounded-lg border px-3 py-2 text-sm transition ${
                bedrooms === value
                  ? "border-[#d4af37] bg-[#d4af37] text-black"
                  : "border-white/10 text-zinc-400 hover:border-white/30"
              }`}
            >
              {value}+
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div className="pt-6">
        <label className="mb-3 block text-sm font-medium">
          Sort By
        </label>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-sm outline-none"
        >
          <option value="newest">
            Recommended
          </option>

          <option value="price-low">
            Price: Low to High
          </option>

          <option value="price-high">
            Price: High to Low
          </option>
        </select>
      </div>
    </aside>
  );
}

