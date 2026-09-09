import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocationCard from "@/components/LocationCard";
import { locations } from "@/data/locations";

export default function LocationsPage() {
  const featuredLocations = locations.filter(
    (location) => location.featured
  );

  const otherLocations = locations.filter(
    (location) => !location.featured
  );

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero */}
      <section className="border-b border-white/10 pt-36 pb-20">
        <div className="container-custom">
          <div className="max-w-4xl">
            <p className="mb-5 text-sm uppercase tracking-[0.25em] text-[#d4af37]">
              Explore Locations
            </p>

            <h1 className="text-4xl font-semibold tracking-tight md:text-6xl lg:text-7xl">
              Find the right place
              <span className="gold-text">
                {" "}before finding the right property.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
              Explore the neighbourhoods and growth corridors
              shaping the Chandigarh Tricity real estate market.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Locations */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-[#d4af37]">
                Start here
              </p>

              <h2 className="mt-2 text-3xl font-semibold md:text-4xl">
                Popular locations
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-zinc-500">
              Begin with some of the areas buyers are
              actively exploring across the Tricity region.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredLocations.map((location) => (
              <LocationCard
                key={location.slug}
                location={location}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Other Locations */}
      {otherLocations.length > 0 && (
        <section className="border-t border-white/10 py-20">
          <div className="container-custom">
            <div className="mb-10">
              <p className="text-xs uppercase tracking-[0.22em] text-[#d4af37]">
                More to explore
              </p>

              <h2 className="mt-2 text-3xl font-semibold md:text-4xl">
                Other locations
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {otherLocations.map((location) => (
                <LocationCard
                  key={location.slug}
                  location={location}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Buyer Guidance */}
      <section className="border-t border-white/10 py-24">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-[#d4af37]">
                Buy with context
              </p>

              <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight md:text-5xl">
                A property is only as good as its location.
              </h2>

              <p className="mt-6 max-w-xl text-base leading-7 text-zinc-500">
                Before you shortlist a property, understand
                the neighbourhood around it. Connectivity,
                infrastructure, everyday conveniences and
                future development can all influence the
                quality of a buying decision.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  number: "01",
                  title: "Connectivity",
                  text: "Understand roads, highways and access to major destinations.",
                },
                {
                  number: "02",
                  title: "Everyday Life",
                  text: "Consider schools, healthcare, shopping and essential services.",
                },
                {
                  number: "03",
                  title: "Development",
                  text: "Look beyond today's surroundings and understand the area's growth.",
                },
                {
                  number: "04",
                  title: "Property Fit",
                  text: "Match the location with your budget, lifestyle and long-term goals.",
                },
              ].map((item) => (
                <div
                  key={item.number}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
                >
                  <span className="text-xs tracking-[0.2em] text-[#d4af37]">
                    {item.number}
                  </span>

                  <h3 className="mt-4 text-lg font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-zinc-500">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 py-24">
        <div className="container-custom">
          <div className="rounded-3xl border border-[#d4af37]/20 bg-[#d4af37]/[0.04] px-6 py-16 text-center md:px-12">
            <p className="text-xs uppercase tracking-[0.22em] text-[#d4af37]">
              Ready to explore?
            </p>

            <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
              Find properties in the locations that matter to you.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-zinc-500">
              Browse available properties and start building
              your shortlist.
            </p>

            <Link
              href="/properties"
              className="mt-8 inline-flex rounded-xl bg-[#d4af37] px-6 py-3.5 text-sm font-medium text-black transition hover:bg-[#e5c158]"
            >
              Explore Properties →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

