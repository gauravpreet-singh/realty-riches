"use client";

import {
  BedDouble,
  Home,
  MapPin,
  RotateCcw,
  Search,
  SlidersHorizontal,
  WalletCards,
} from "lucide-react";

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
  const activeFilters = [
    search,
    location,
    propertyType,
    maxPrice,
    bedrooms,
  ].filter(Boolean).length;

  const clearFilters = () => {
    setSearch("");
    setLocation("");
    setPropertyType("");
    setMaxPrice("");
    setBedrooms("");
    setSort("newest");
  };

  return (
    <div
      className="
        overflow-hidden rounded-[22px]
        border border-white/10
        bg-[#0d0f0f]
        shadow-[0_20px_60px_rgba(0,0,0,0.25)]
      "
    >
      <div className="border-b border-white/10 px-5 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="
                flex h-9 w-9 items-center justify-center
                rounded-xl border border-[#d4af37]/20
                bg-[#d4af37]/10 text-[#d4af37]
              "
            >
              <SlidersHorizontal size={17} />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-white">
                Find Your Property
              </h2>
              <p className="mt-0.5 text-[11px] text-zinc-500">
                Refine your search
              </p>
            </div>
          </div>

          {activeFilters > 0 && (
            <span
              className="
                flex h-6 min-w-6 items-center justify-center rounded-full
                bg-[#d4af37] px-2 text-[10px] font-bold text-black
              "
            >
              {activeFilters}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-6 p-5">
        <FilterGroup label="Search">
          <div className="relative">
            <Search
              size={16}
              className="
                pointer-events-none absolute left-3.5 top-1/2
                -translate-y-1/2 text-zinc-500
              "
            />
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search properties..."
              className="
                h-11 w-full rounded-xl border border-white/10
                bg-black/30 pl-10 pr-4 text-sm text-white outline-none
                placeholder:text-zinc-600 transition
                focus:border-[#d4af37]/50 focus:bg-black/50
                focus:ring-1 focus:ring-[#d4af37]/20
              "
            />
          </div>
        </FilterGroup>

        <FilterGroup label="Location" icon={<MapPin size={13} />}>
          <select
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            className={selectClassName}
          >
            <option value="">All locations</option>
            {locations.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
        </FilterGroup>

        <FilterGroup label="Property Type" icon={<Home size={13} />}>
          <select
            value={propertyType}
            onChange={(event) => setPropertyType(event.target.value)}
            className={selectClassName}
          >
            <option value="">All property types</option>
            <option value="Apartment">Apartments</option>
            <option value="Villa">Villas</option>
            <option value="Plot">Plots</option>
          </select>
        </FilterGroup>

        <FilterGroup label="Maximum Budget" icon={<WalletCards size={13} />}>
          <select
            value={maxPrice}
            onChange={(event) => setMaxPrice(event.target.value)}
            className={selectClassName}
          >
            <option value="">Any budget</option>
            <option value="7500000">₹75 Lakh</option>
            <option value="10000000">₹1 Crore</option>
            <option value="15000000">₹1.5 Crore</option>
            <option value="20000000">₹2 Crore</option>
            <option value="30000000">₹3 Crore</option>
          </select>
        </FilterGroup>

        <FilterGroup label="Bedrooms" icon={<BedDouble size={13} />}>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: "", label: "Any" },
              { value: "2", label: "2+" },
              { value: "3", label: "3+" },
              { value: "4", label: "4+" },
            ].map((item) => {
              const active = bedrooms === item.value;

              return (
                <button
                  key={item.value || "any"}
                  type="button"
                  onClick={() => setBedrooms(item.value)}
                  className={`
                    h-10 rounded-xl border text-xs font-medium
                    transition-all duration-200
                    ${
                      active
                        ? "border-[#d4af37]/60 bg-[#d4af37]/10 text-[#d4af37]"
                        : "border-white/10 bg-black/20 text-zinc-500 hover:border-white/20 hover:text-white"
                    }
                  `}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </FilterGroup>

        <FilterGroup label="Sort By">
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className={selectClassName}
          >
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </FilterGroup>
      </div>

      <div className="border-t border-white/10 p-4">
        <button
          type="button"
          onClick={clearFilters}
          className="
            flex h-11 w-full items-center justify-center gap-2
            rounded-xl border border-white/10 bg-white/[0.025]
            text-xs font-medium text-zinc-400 transition-all
            hover:border-[#d4af37]/30 hover:bg-[#d4af37]/5
            hover:text-[#d4af37]
          "
        >
          <RotateCcw size={14} />
          Reset Filters
        </button>
      </div>
    </div>
  );
}

function FilterGroup({
  label,
  icon,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2.5 flex items-center gap-1.5">
        {icon && <span className="text-zinc-600">{icon}</span>}
        <label className="text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-500">
          {label}
        </label>
      </div>
      {children}
    </div>
  );
}

const selectClassName = `
  h-11 w-full appearance-none rounded-xl
  border border-white/10 bg-[#111313]
  px-3.5 text-sm text-zinc-300 outline-none transition
  focus:border-[#d4af37]/50 focus:bg-black
  focus:ring-1 focus:ring-[#d4af37]/20
`;
