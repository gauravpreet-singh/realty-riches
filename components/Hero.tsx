"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { locations } from "@/data/locations";

export default function Hero() {
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const propertiesUrl =
    `/properties?location=${encodeURIComponent(location)}` +
    `&type=${encodeURIComponent(propertyType)}` +
    `&bedrooms=${encodeURIComponent(bedrooms)}` +
    `&maxPrice=${encodeURIComponent(maxPrice)}`;

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2000&q=85')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/65" />

      <div className="container-custom relative z-10 pt-20">
        <div className="max-w-5xl">

          {/* Eyebrow */}
          <p className="mb-5 text-sm font-medium uppercase tracking-[0.3em] text-[#d4af37]">
            Premium Real Estate
          </p>

          {/* Heading */}
          <h1 className="text-5xl font-semibold leading-tight tracking-tight md:text-7xl">
            Find a place
            <br />
            <span className="gold-text">you'll love.</span>
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-300">
            Discover homes, apartments, plots and investment opportunities
            across Mohali, Chandigarh and surrounding areas.
          </p>

          {/* ===================================================== */}
          {/* SEARCH PANEL */}
          {/* ===================================================== */}

          <div className="mt-10 rounded-2xl border border-white/10 bg-black/75 p-4 backdrop-blur-xl">

            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_0.8fr_1fr_auto]">

              {/* Location */}
              <div className="rounded-xl bg-white/10 px-5 py-4">

                <label className="block text-xs text-zinc-400">
                  Location
                </label>

                <div className="relative mt-1">
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full appearance-none bg-transparent pr-8 text-lg text-white outline-none cursor-pointer"
                  >
                  <option value="" className="bg-black">
                    All locations
                  </option>

                  {locations.map((item) => (
                    <option
                      key={item.slug}
                      value={item.slug}
                      className="bg-black"
                    >
                      {item.name}
                    </option>
                  ))}
                  </select>

                  <ChevronDown
                    size={18}
                    className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-zinc-400"
                  />
                </div>

              </div>

              {/* Property Type */}
              <div className="rounded-xl bg-white/10 px-5 py-4">

                <label className="block text-xs text-zinc-400">
                  Property Type
                </label>

                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="mt-1 w-full bg-transparent text-white outline-none"
                >
                  <option value="" className="bg-black">
                    All types
                  </option>

                  <option value="Apartment" className="bg-black">
                    Apartment
                  </option>

                  <option value="Villa" className="bg-black">
                    Villa
                  </option>

                  <option value="Plot" className="bg-black">
                    Plot
                  </option>

                  <option value="House" className="bg-black">
                    House
                  </option>
                </select>

              </div>

              {/* BHK */}
              <div className="rounded-xl bg-white/10 px-5 py-4">

                <label className="block text-xs text-zinc-400">
                  BHK
                </label>

                <select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="mt-1 w-full bg-transparent text-white outline-none"
                >
                  <option value="" className="bg-black">
                    Any
                  </option>

                  <option value="1" className="bg-black">
                    1+ BHK
                  </option>

                  <option value="2" className="bg-black">
                    2+ BHK
                  </option>

                  <option value="3" className="bg-black">
                    3+ BHK
                  </option>

                  <option value="4" className="bg-black">
                    4+ BHK
                  </option>
                </select>

              </div>

              {/* Budget */}
              <div className="rounded-xl bg-white/10 px-5 py-4">

                <label className="block text-xs text-zinc-400">
                  Max Budget
                </label>

                <select
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="mt-1 w-full bg-transparent text-white outline-none"
                >
                  <option value="" className="bg-black">
                    Any budget
                  </option>

                  <option value="5000000" className="bg-black">
                    ₹50 Lakh
                  </option>

                  <option value="7500000" className="bg-black">
                    ₹75 Lakh
                  </option>

                  <option value="10000000" className="bg-black">
                    ₹1 Crore
                  </option>

                  <option value="15000000" className="bg-black">
                    ₹1.5 Crore
                  </option>

                  <option value="20000000" className="bg-black">
                    ₹2 Crore
                  </option>
                </select>

              </div>

              {/* Search Button */}
              <Link
                href={propertiesUrl}
                className="flex min-h-[64px] items-center justify-center rounded-xl bg-[#d4af37] px-7 font-medium text-black transition hover:bg-[#e5c158]"
              >
                Explore
              </Link>

            </div>
          </div>

          {/* ===================================================== */}
          {/* QUICK SEARCH */}
          {/* ===================================================== */}

          <div className="mt-7 flex flex-wrap items-center gap-3">

            <span className="mr-2 text-xs uppercase tracking-wider text-zinc-500">
              Popular:
            </span>

            {[
              {
                label: "Apartments",
                type: "Apartment",
              },
              {
                label: "Plots",
                type: "Plot",
              },
              {
                label: "Villas",
                type: "Villa",
              },
              {
                label: "3 BHK",
                bedrooms: "3",
              },
            ].map((item) => {

              const params = new URLSearchParams();

              if (item.type) {
                params.set("type", item.type);
              }

              if (item.bedrooms) {
                params.set("bedrooms", item.bedrooms);
              }

              return (
                <Link
                  key={item.label}
                  href={`/properties?${params.toString()}`}
                  className="rounded-full border border-white/20 px-5 py-2 text-sm text-zinc-300 transition hover:border-[#d4af37] hover:text-[#d4af37]"
                >
                  {item.label}
                </Link>
              );
            })}

          </div>

        </div>
      </div>
    </section>
  );
}