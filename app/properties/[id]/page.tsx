import Link from "next/link";
import { notFound } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { properties } from "@/data/properties";
import PropertyGallery from "@/components/PropertyGallery";
import EmiCalculator from "@/components/EmiCalculator";
import LocationSection from "@/components/LocationSection";

type PropertyPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PropertyPage({
  params,
}: PropertyPageProps) {
  const { id } = await params;
  
  const property = properties.find(
    (property) => property.id === id
  );

  if (!property) {
    notFound();
  }

const whatsappNumber = "919530900022";

const message = encodeURIComponent(
  `Hi Realty Riches, I'm interested in ${property.title} in ${property.location}. Please share more details.`
);

const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
  return (
    <main className="min-h-screen bg-black text-white">

      <Navbar />

      {/* ===================================================== */}
      {/* TOP */}
      {/* ===================================================== */}

      <section className="border-b border-white/10 pt-32">

        <div className="container-custom">

          {/* Back */}

          <Link
            href="/properties"
            className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-[#d4af37]"
          >
            ← Back to properties
          </Link>

          {/* Title */}

          <div className="mb-10">

            <p className="text-sm text-zinc-500">
              {property.location}
            </p>

            <h1 className="mt-3 max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
              {property.title}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-4">

              <span className="text-3xl font-semibold text-[#d4af37]">
                ₹{formatPrice(property.price)}
              </span>

              <span className="h-5 w-px bg-white/20" />

              <span className="text-sm text-zinc-400">
                {property.propertyType}
              </span>

              {property.possession && (
                <>
                  <span className="h-5 w-px bg-white/20" />

                  <span className="text-sm text-zinc-400">
                    {property.possession}
                  </span>
                </>
              )}

            </div>

          </div>

          {/* ================================================= */}
          {/* GALLERY */}
          {/* ================================================= */}

          <div className="pb-12">
  <PropertyGallery
    image={property.image}
    images={property.images}
    video={property.video}
    title={property.title}
  />
</div>

        </div>
      </section>

      {/* ===================================================== */}
      {/* PROPERTY CONTENT */}
      {/* ===================================================== */}

      <section className="section-padding">

        <div className="container-custom">

          <div className="grid gap-12 lg:grid-cols-[1fr_360px]">

            {/* ================================================= */}
            {/* LEFT */}
            {/* ================================================= */}

            <div>

              {/* Specifications */}

              <div className="border-b border-white/10 pb-10">

                <h2 className="text-2xl font-semibold">
                  Property Overview
                </h2>

                <div className="mt-7 grid grid-cols-2 gap-4 md:grid-cols-4">

                  <Specification
                    label="Property Type"
                    value={property.propertyType}
                  />

                  <Specification
                    label="Area"
                    value={`${property.area.toLocaleString()} sq ft`}
                  />

                  {property.bedrooms > 0 && (
                    <Specification
                      label="Bedrooms"
                      value={`${property.bedrooms} BHK`}
                    />
                  )}

                  {property.bathrooms > 0 && (
                    <Specification
                      label="Bathrooms"
                      value={property.bathrooms.toString()}
                    />
                  )}

                </div>

              </div>

              {/* Description */}

              <div className="border-b border-white/10 py-10">

                <h2 className="text-2xl font-semibold">
                  About this property
                </h2>

                <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-400">
                  {property.description}
                </p>

              </div>

              {/* Features */}

              <div className="border-b border-white/10 py-10">

                <h2 className="text-2xl font-semibold">
                  Key Features
                </h2>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">

                  {property.features.map((feature) => (

                    <div
                      key={feature}
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4"
                    >

                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#d4af37]/10 text-[#d4af37]">
                        ✓
                      </span>

                      <span className="text-sm text-zinc-300">
                        {feature}
                      </span>

                    </div>

                  ))}

                </div>

              </div>

              {/* Amenities */}

              <div className="py-10">

                <h2 className="text-2xl font-semibold">
                  Amenities
                </h2>

                <div className="mt-6 flex flex-wrap gap-3">

                  {property.amenities.map((amenity) => (

                    <span
                      key={amenity}
                      className="rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-400"
                    >
                      {amenity}
                    </span>

                  ))}

                </div>

              </div>

            </div>
            {/* ================================================= */}
{/* EMI CALCULATOR */}
{/* ================================================= */}

<div className="w-full max-w-6xl">
  <EmiCalculator propertyPrice={property.price} />
</div>

            {/* ================================================= */}
            {/* RIGHT ACTION PANEL */}
            {/* ================================================= */}

            <div>

              <div className="sticky top-28 rounded-2xl border border-white/10 bg-white/[0.03] p-6">

                <p className="text-sm text-zinc-500">
                  Interested in this property?
                </p>

                <h2 className="mt-2 text-2xl font-semibold">
                  Let's help you take the next step.
                </h2>

                {/* Price */}

                <div className="mt-6 rounded-xl bg-black p-4">

                  <p className="text-xs uppercase tracking-wider text-zinc-500">
                    Listed Price
                  </p>

                  <p className="mt-1 text-2xl font-semibold text-[#d4af37]">
                    ₹{formatPrice(property.price)}
                  </p>

                </div>

                {/* Schedule */}

                <Link
                  href={`/schedule-visit?property=${property.id}`}
                  className="mt-4 flex w-full items-center justify-center rounded-xl bg-[#d4af37] px-5 py-4 font-medium text-black transition hover:bg-[#e5c158]"
                >
                  Schedule a Visit
                </Link>

                {/* AI */}

                <button
                  className="mt-3 w-full rounded-xl border border-[#d4af37]/50 px-5 py-4 text-sm font-medium text-[#d4af37] transition hover:bg-[#d4af37]/10"
                >
                  Ask AI About This Property
                </button>

                {/* WhatsApp */}

<a
  href={whatsappUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="mt-3 flex w-full items-center justify-center rounded-xl bg-[#25D366] px-5 py-3.5 font-medium text-white transition hover:opacity-90"
>
  Chat on WhatsApp
</a>

                <p className="mt-5 text-center text-xs leading-5 text-zinc-600">
                  No pressure. Get property details,
                  availability and assistance from our team.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ===================================================== */}
      {/* LOCATION */}
      {/* ===================================================== */}

     <LocationSection
  location={property.location}
  city={property.city}
/>

      <Footer />

    </main>
  );
}


/* ========================================================= */
/* SPECIFICATION COMPONENT */
/* ========================================================= */

function Specification({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">

      <p className="text-xs uppercase tracking-wider text-zinc-600">
        {label}
      </p>

      <p className="mt-2 text-sm font-medium text-zinc-200">
        {value}
      </p>

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