"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SavePropertyButton, {
  getSavedProperties,
} from "@/components/SavedProperties";
import { properties } from "@/data/properties";

export default function SavedPropertiesPage() {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  const loadSavedProperties = () => {
    setSavedIds(getSavedProperties());
  };

  useEffect(() => {
    setMounted(true);
    loadSavedProperties();

    window.addEventListener(
      "saved-properties-changed",
      loadSavedProperties
    );

    return () => {
      window.removeEventListener(
        "saved-properties-changed",
        loadSavedProperties
      );
    };
  }, []);

  const savedProperties = properties.filter((property) =>
    savedIds.includes(property.id)
  );

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Header */}
      <section className="border-b border-white/10 pt-36 pb-14">
        <div className="container-custom">
          <p className="mb-4 text-sm uppercase tracking-[0.25em] text-[#d4af37]">
            Your Properties
          </p>

          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
                Properties you've
                <span className="gold-text"> saved.</span>
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-400">
                Keep track of the properties you're considering
                and come back to them whenever you're ready.
              </p>
            </div>

            {mounted && savedProperties.length > 0 && (
              <div className="shrink-0 rounded-full border border-white/10 px-5 py-2.5 text-sm text-zinc-400">
                <span className="text-white">
                  {savedProperties.length}
                </span>{" "}
                {savedProperties.length === 1
                  ? "property"
                  : "properties"}{" "}
                saved
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom">
          {!mounted ? (
            <div className="py-24 text-center text-zinc-600">
              Loading saved properties...
            </div>
          ) : savedProperties.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {savedProperties.map((property) => (
                <SavedPropertyCard
                  key={property.id}
                  property={property}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

/* ========================================================= */
/* SAVED PROPERTY CARD */
/* ========================================================= */

function SavedPropertyCard({
  property,
}: {
  property: (typeof properties)[number];
}) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition duration-300 hover:-translate-y-1 hover:border-[#d4af37]/40">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Link href={`/properties/${property.id}`}>
          <img
            src={property.image}
            alt={property.title}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        </Link>

        {/* Property type */}
        <div className="absolute left-4 top-4 rounded-full bg-black/75 px-3 py-1.5 text-xs font-medium backdrop-blur">
          {property.propertyType}
        </div>

        {/* Save button */}
        <SavePropertyButton
          propertyId={property.id}
          showLabel={false}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/75 text-white backdrop-blur-md transition hover:border-[#d4af37] hover:text-[#d4af37]"
        />

        {/* Video */}
        {property.video && (
          <div className="absolute bottom-4 left-4 rounded-full bg-[#d4af37] px-3 py-1.5 text-xs font-medium text-black">
            ▶ Video
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-sm text-zinc-500">
          {property.location}
        </p>

        <Link href={`/properties/${property.id}`}>
          <h2 className="mt-2 text-xl font-semibold transition hover:text-[#d4af37]">
            {property.title}
          </h2>
        </Link>

        <p className="mt-3 text-2xl font-semibold text-[#d4af37]">
          ₹{formatPrice(property.price)}
        </p>

        {/* Stats */}
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/10 pt-4 text-sm text-zinc-400">
          <span>
            {property.area.toLocaleString()} sq ft
          </span>

          {property.bedrooms > 0 && (
            <span>{property.bedrooms} BHK</span>
          )}

          {property.bathrooms > 0 && (
            <span>{property.bathrooms} Bath</span>
          )}
        </div>

        {/* Features */}
        <div className="mt-4 flex flex-wrap gap-2">
          {property.features.slice(0, 3).map((feature) => (
            <span
              key={feature}
              className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-500"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-5 flex gap-2 border-t border-white/10 pt-4">
          <Link
            href={`/properties/${property.id}`}
            className="flex-1 rounded-xl border border-white/10 px-4 py-3 text-center text-sm text-zinc-300 transition hover:border-[#d4af37] hover:text-[#d4af37]"
          >
            View Property
          </Link>

          <Link
            href={`/schedule-visit?property=${property.id}`}
            className="flex-1 rounded-xl bg-[#d4af37] px-4 py-3 text-center text-sm font-medium text-black transition hover:bg-[#e5c158]"
          >
            Schedule Visit
          </Link>
        </div>
      </div>
    </article>
  );
}

/* ========================================================= */
/* EMPTY STATE */
/* ========================================================= */

function EmptyState() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] px-6 py-24 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/10 text-3xl text-zinc-500">
        ♡
      </div>

      <h2 className="mt-7 text-2xl font-semibold">
        No saved properties yet
      </h2>

      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-zinc-500">
        When you find a property you like, tap the heart
        icon to save it here and compare your options later.
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

