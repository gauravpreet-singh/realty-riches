"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { properties } from "@/data/properties";
import {
  getCompareProperties,
} from "@/components/CompareProperties";

export default function ComparePage() {
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  const loadCompareProperties = () => {
    setCompareIds(getCompareProperties());
  };

  useEffect(() => {
    setMounted(true);
    loadCompareProperties();

    window.addEventListener(
      "compare-properties-changed",
      loadCompareProperties
    );

    return () => {
      window.removeEventListener(
        "compare-properties-changed",
        loadCompareProperties
      );
    };
  }, []);

  const compareProperties = compareIds
    .map((id) =>
      properties.find((property) => property.id === id)
    )
    .filter(
      (
        property
      ): property is (typeof properties)[number] =>
        Boolean(property)
    );

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* ===================================================== */}
      {/* HEADER */}
      {/* ===================================================== */}

      <section className="border-b border-white/10 pt-36 pb-14">
        <div className="container-custom">
          <p className="mb-4 text-sm uppercase tracking-[0.25em] text-[#d4af37]">
            Compare
          </p>

          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
            Compare properties.
            <span className="gold-text">
              {" "}Choose with confidence.
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-400">
            Put your shortlisted properties side by side
            and make a more informed decision.
          </p>
        </div>
      </section>

      {/* ===================================================== */}
      {/* CONTENT */}
      {/* ===================================================== */}

      <section className="section-padding">
        <div className="container-custom">
          {!mounted ? (
            <div className="py-24 text-center text-zinc-600">
              Loading comparison...
            </div>
          ) : compareProperties.length < 2 ? (
            <EmptyCompareState />
          ) : (
            <ComparisonTable
              compareProperties={compareProperties}
            />
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

/* ========================================================= */
/* EMPTY STATE */
/* ========================================================= */

function EmptyCompareState() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] px-6 py-24 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/10 text-2xl text-zinc-500">
        ⇄
      </div>

      <h2 className="mt-7 text-2xl font-semibold">
        Add properties to compare
      </h2>

      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-zinc-500">
        Select at least two properties to compare their
        price, size, configuration, location and other
        important details side by side.
      </p>

      <Link
        href="/properties"
        className="mt-7 inline-flex rounded-xl bg-[#d4af37] px-6 py-3.5 text-sm font-medium text-black transition hover:bg-[#e5c158]"
      >
        Explore Properties
      </Link>
    </div>
  );
}

/* ========================================================= */
/* COMPARISON TABLE */
/* ========================================================= */

function ComparisonTable({
  compareProperties,
}: {
  compareProperties: (typeof properties)[number][];
}) {
  return (
    <div>
      {/* Table header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-zinc-500">
            Comparing{" "}
            <span className="font-medium text-white">
              {compareProperties.length}
            </span>{" "}
            properties
          </p>

          <p className="mt-1 text-xs text-zinc-600">
            Scroll horizontally to see all properties.
          </p>
        </div>

        <button
          type="button"
          onClick={clearComparison}
          className="w-fit text-sm text-[#d4af37] transition hover:text-[#e5c158] hover:underline"
        >
          Clear comparison
        </button>
      </div>

      {/* Scroll container */}
      <div className="overflow-x-auto rounded-3xl border border-white/10">
        <table className="w-full min-w-[900px] border-collapse">
          {/* ================================================= */}
          {/* PROPERTY HEADERS */}
          {/* ================================================= */}

          <thead>
            <tr>
              <th className="w-48 min-w-48 bg-black p-5 text-left align-top text-xs font-medium uppercase tracking-wider text-zinc-600">
                Property
              </th>

              {compareProperties.map((property) => (
                <th
                  key={property.id}
                  className="min-w-[240px] border-l border-white/10 bg-black p-5 text-left align-top"
                >
                  <Link
                    href={`/properties/${property.id}`}
                    className="group block"
                  >
                    <div className="relative overflow-hidden rounded-xl">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>

                    <p className="mt-4 text-xs font-normal text-zinc-500">
                      {property.location}
                    </p>

                    <h2 className="mt-1 text-lg font-semibold text-white transition group-hover:text-[#d4af37]">
                      {property.title}
                    </h2>

                    <p className="mt-2 text-xl font-semibold text-[#d4af37]">
                      ₹{formatPrice(property.price)}
                    </p>
                  </Link>
                </th>
              ))}
            </tr>
          </thead>

          {/* ================================================= */}
          {/* DETAILS */}
          {/* ================================================= */}

          <tbody>
            <ComparisonTableRow
              label="Property Type"
              properties={compareProperties}
              getValue={(property) =>
                property.propertyType
              }
            />

            <ComparisonTableRow
              label="Area"
              properties={compareProperties}
              getValue={(property) =>
                `${property.area.toLocaleString()} sq ft`
              }
            />

            <ComparisonTableRow
              label="Bedrooms"
              properties={compareProperties}
              getValue={(property) =>
                property.bedrooms > 0
                  ? `${property.bedrooms} BHK`
                  : "—"
              }
            />

            <ComparisonTableRow
              label="Bathrooms"
              properties={compareProperties}
              getValue={(property) =>
                property.bathrooms > 0
                  ? property.bathrooms.toString()
                  : "—"
              }
            />

            <ComparisonTableRow
              label="Possession"
              properties={compareProperties}
              getValue={(property) =>
                property.possession || "—"
              }
            />

            <ComparisonTableRow
              label="Location"
              properties={compareProperties}
              getValue={(property) =>
                property.location
              }
            />

            <ComparisonTableRow
              label="Key Features"
              properties={compareProperties}
              getValue={(property) =>
                property.features.length > 0
                  ? property.features.slice(0, 3).join(" • ")
                  : "—"
              }
            />

            <ComparisonTableRow
              label="Amenities"
              properties={compareProperties}
              getValue={(property) =>
                property.amenities.length > 0
                  ? property.amenities.slice(0, 3).join(" • ")
                  : "—"
              }
            />

            {/* View Property */}
            <tr className="border-t border-white/10">
              <td className="bg-black p-5 text-sm font-medium text-zinc-500">
                Action
              </td>

              {compareProperties.map((property) => (
                <td
                  key={`action-${property.id}`}
                  className="border-l border-white/10 bg-white/[0.02] p-5"
                >
                  <Link
                    href={`/properties/${property.id}`}
                    className="inline-flex rounded-xl bg-[#d4af37] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#e5c158]"
                  >
                    View Property →
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ========================================================= */
/* COMPARISON ROW */
/* ========================================================= */

function ComparisonTableRow({
  label,
  properties: compareProperties,
  getValue,
}: {
  label: string;
  properties: (typeof properties)[number][];
  getValue: (
    property: (typeof properties)[number]
  ) => string;
}) {
  return (
    <tr className="border-t border-white/10">
      <td className="bg-black p-5 text-sm font-medium text-zinc-500">
        {label}
      </td>

      {compareProperties.map((property) => (
        <td
          key={`${label}-${property.id}`}
          className="border-l border-white/10 bg-white/[0.02] p-5 text-sm leading-6 text-zinc-300"
        >
          {getValue(property)}
        </td>
      ))}
    </tr>
  );
}

/* ========================================================= */
/* CLEAR COMPARISON */
/* ========================================================= */

function clearComparison() {
  localStorage.removeItem(
    "realty-riches-compare-properties"
  );

  window.dispatchEvent(
    new Event("compare-properties-changed")
  );
}

/* ========================================================= */
/* PRICE FORMATTER */
/* ========================================================= */

function formatPrice(price: number) {
  if (price >= 10000000) {
    return `${(price / 10000000).toFixed(2)} Cr`;
  }

  if (price >= 100000) {
    return `${(price / 100000).toFixed(2)} Lakh`;
  }

  return price.toLocaleString("en-IN");
}

