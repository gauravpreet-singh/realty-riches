import Link from "next/link";
import { notFound } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";

import { locations } from "@/data/locations";
import { properties } from "@/data/properties";
import LocationMarketData from "@/components/LocationMarketData";

type LocationPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return locations.map((location) => ({
    slug: location.slug,
  }));
}

export default async function LocationPage({
  params,
}: LocationPageProps) {
  const { slug } = await params;

  const location = locations.find(
    (item) => item.slug === slug
  );

  if (!location) {
    notFound();
  }

  const locationProperties = properties.filter( (property) => property.locationSlug === location.slug );

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[620px] overflow-hidden pt-20">
        <img
          src={location.image}
          alt={location.name}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

        <div className="container-custom relative flex min-h-[620px] items-end pb-20">
          <div className="max-w-4xl">
            <p className="text-sm uppercase tracking-[0.25em] text-[#d4af37]">
              {location.region}
            </p>

            <h1 className="mt-4 text-5xl font-semibold tracking-tight md:text-7xl">
              {location.name}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
              {location.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {location.propertyTypes.map((type) => (
                <span
                  key={type}
                  className="rounded-full border border-white/20 bg-black/30 px-4 py-2 text-sm text-zinc-200 backdrop-blur"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-[1fr_420px]">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-[#d4af37]">
                Location overview
              </p>

              <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
                Understand the area before you buy.
              </h2>

              <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-400">
                {location.longDescription}
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-7">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
                Property formats
              </p>

              <div className="mt-5 space-y-4">
                {location.propertyTypes.map((type) => (
                  <div
                    key={type}
                    className="flex items-center justify-between border-b border-white/10 pb-4 last:border-0 last:pb-0"
                  >
                    <span className="text-sm text-zinc-300">
                      {type}
                    </span>

                    <span className="text-[#d4af37]">
                      →
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Consider */}
      <section className="border-y border-white/10 bg-white/[0.015] py-24">
        <div className="container-custom">
          <div className="mb-12">
            <p className="text-xs uppercase tracking-[0.22em] text-[#d4af37]">
              Buyer perspective
            </p>

            <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
              Why buyers consider {location.name}.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {location.highlights.map(
              (highlight, index) => (
                <div
                  key={highlight}
                  className="rounded-2xl border border-white/10 bg-black p-7"
                >
                  <span className="text-xs tracking-[0.2em] text-[#d4af37]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="mt-5 text-xl font-semibold">
                    {highlight}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-zinc-500">
                    Explore the specific project and
                    surrounding area before making a
                    decision.
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Connectivity */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-[#d4af37]">
                Connectivity
              </p>

              <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
                What is around {location.name}?
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-500">
                Use these as starting points when evaluating
                the location. Exact travel times and distances
                should be verified for the individual property.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {location.connectivity.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#d4af37]/30 text-sm text-[#d4af37]">
                    →
                  </span>

                  <span className="text-sm text-zinc-300">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Buyer Considerations */}
      <section className="border-y border-white/10 py-24">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-[#d4af37]">
                Before you buy
              </p>

              <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
                Questions worth asking.
              </h2>
            </div>

            <div className="space-y-3">
              {location.considerations.map(
                (item, index) => (
                  <div
                    key={item}
                    className="flex gap-5 rounded-2xl border border-white/10 bg-white/[0.02] p-6"
                  >
                    <span className="text-sm text-[#d4af37]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <p className="text-sm leading-6 text-zinc-300">
                      {item}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>
<LocationMarketData locationSlug={location.slug} />
      {/* Properties */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-[#d4af37]">
                Properties
              </p>

              <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
                Properties in {location.name}.
              </h2>
            </div>

            <Link
              href={`/properties?location=${location.slug}`}
              className="text-sm text-[#d4af37] transition hover:text-[#e5c158]"
            >
              View all properties →
            </Link>
          </div>

          {locationProperties.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {locationProperties
                .slice(0, 6)
                .map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                  />
                ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] px-6 py-20 text-center">
              <h3 className="text-xl font-semibold">
                Properties coming soon.
              </h3>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-zinc-500">
                We are building the property inventory
                for this location. Explore all available
                properties in the meantime.
              </p>

              <Link
                href="/properties"
                className="mt-6 inline-flex rounded-xl bg-[#d4af37] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#e5c158]"
              >
                Explore Properties
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 py-24">
        <div className="container-custom">
          <div className="rounded-3xl border border-[#d4af37]/20 bg-[#d4af37]/[0.04] px-6 py-16 text-center md:px-12">
            <p className="text-xs uppercase tracking-[0.22em] text-[#d4af37]">
              Continue your search
            </p>

            <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
              Ready to explore properties in{" "}
              {location.name}?
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-zinc-500">
              Shortlist properties, compare your options
              and make a more informed buying decision.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href={`/properties?location=${location.slug}`}
                className="inline-flex justify-center rounded-xl bg-[#d4af37] px-6 py-3.5 text-sm font-medium text-black transition hover:bg-[#e5c158]"
              >
                Explore {location.name} Properties
              </Link>

              <Link
                href="/compare"
                className="inline-flex justify-center rounded-xl border border-white/10 px-6 py-3.5 text-sm font-medium text-white transition hover:border-white/30"
              >
                Compare Properties
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

