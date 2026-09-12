import Link from "next/link";
import {
  ArrowUpDown,
  Baby,
  Building2,
  Camera,
  Car,
  Dumbbell,
  Footprints,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  TreePine,
  Trees,
  Waves,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyGallery from "@/components/PropertyGallery";
import PropertyVideos from "@/components/PropertyVideos";
import EmiCalculator from "@/components/EmiCalculator";
import LocationSection from "@/components/LocationSection";
import NearbyPlaces from "@/components/NearbyPlaces";
import WhatsAppFloating from "@/components/WhatsAppFloating";

import { getPublishedPropertyById } from "@/lib/properties";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export const dynamic = "force-dynamic";

export default async function PropertyDetailPage({ params }: Props) {
  const { id } = await params;

  const property = await getPublishedPropertyById(id);

  if (!property) {
    notFound();
  }

  const areaUnit = property.propertyType === "Plot" ? "sq. yd" : "sq ft";

  const whatsappNumber = "919530900022";

  const message = encodeURIComponent(
    `Hi Realty Riches, I'm interested in ${property.title} in ${property.location}. Please share more details.`
  );

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <main className="min-h-screen bg-black pb-24 text-white">  
    <Navbar />
      <div className="mx-auto max-w-7xl px-6 pt-28">

        {/* Back */}
        <Link
          href="/properties"
          className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-[#d4af37]"
        >
          ← Back to properties
        </Link>

        {/* Gallery */}
        <PropertyGallery
          image={property.image}
          title={property.title}
          images={property.images ?? [property.image]}
        />

        {/* Main content */}
        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_360px]">

          {/* LEFT */}
          <div className="min-w-0">

            {/* Property heading */}
            <div className="border-b border-white/10 pb-10">
              <p className="text-sm uppercase tracking-[0.2em] text-[#c9a45c]">
                {property.propertyType}
              </p>

              <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">
                {property.title}
              </h1>

              <p className="mt-4 text-lg text-zinc-400">
                {property.location}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-300">
                  ₹{formatPrice(property.price)}
                </span>

                <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-300">
                  {property.area.toLocaleString()} {areaUnit}
                </span>

                {property.bedrooms > 0 && (
                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-300">
                    {property.bedrooms} BHK
                  </span>
                )}

                {property.bathrooms > 0 && (
                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-300">
                    {property.bathrooms} Bathrooms
                  </span>
                )}

                {property.possession && (
                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-300">
                    Possession: {property.possession}
                  </span>
                )}
              </div>
            </div>

            {/* About */}
            <section className="border-b border-white/10 py-10">
              <h2 className="text-2xl font-semibold">
                About this property
              </h2>

              <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-400">
                {property.description}
              </p>
            </section>

            {/* Features */}
            {property.features.length > 0 && (
              <section className="border-b border-white/10 py-10">
                <h2 className="text-2xl font-semibold">
                  Key Features
                </h2>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {property.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#d4af37]/10 text-[#d4af37]">
                        ✓
                      </span>

                      <span className="text-sm text-zinc-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Amenities */}
            {(property.amenityDetails?.length ?? property.amenities.length) > 0 && (
              <section className="border-b border-white/10 py-10">
                <h2 className="text-2xl font-semibold">
                  Amenities
                </h2>

                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {(property.amenityDetails?.length
                    ? property.amenityDetails
                    : property.amenities.map((name) => ({
                        name,
                        icon: "sparkles",
                      })))
                    .map((amenity) => {
                      const Icon = getAmenityIcon(amenity.icon);

                      return (
                        <div
                          key={amenity.name}
                          className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.025] p-4 transition hover:border-[#d4af37]/30 hover:bg-white/[0.045]"
                        >
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#d4af37]/20 bg-[#d4af37]/10 text-[#d4af37] transition group-hover:bg-[#d4af37]/15">
                            <Icon className="h-5 w-5" strokeWidth={1.7} />
                          </div>

                          <span className="text-sm font-medium text-zinc-300">
                            {amenity.name}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </section>
            )}

            {/* Nearby places */}
            {property.nearby && property.nearby.length > 0 && (
              <section className="py-10">
                <NearbyPlaces places={property.nearby} />
              </section>
            )}

            {/* EMI Calculator */}
            <section className="border-t border-white/10 py-14">
              <div className="mb-8">
                <p className="text-sm uppercase tracking-[0.25em] text-[#c9a45c]">
                  Affordability
                </p>

                <h2 className="mt-3 text-3xl font-semibold">
                  Can you afford this property?
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-500">
                  Estimate your monthly EMI based on the property price,
                  loan amount, interest rate and tenure.
                </p>
              </div>

              <EmiCalculator
                propertyPrice={property.price}
              />
            </section>

            {/* Property video */}
            {property.video && (
              <section className="border-t border-white/10 py-14">
                <p className="text-sm uppercase tracking-[0.25em] text-[#c9a45c]">
                  See it before you visit
                </p>

                <h2 className="mt-3 text-3xl font-semibold">
                  Property Walkthrough
                </h2>

                <div className="mt-8">
                  <PropertyVideos
                    videos={[property.video]}
                    title="Property Walkthrough"
                  />
                </div>
              </section>
            )}
          </div>

          {/* RIGHT ACTION PANEL */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">

              <p className="text-sm text-zinc-500">
                Interested in this property?
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                Let's help you take the next step.
              </h2>

              {/* Price */}
              <div className="mt-6 rounded-xl bg-black p-4">
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  Starting Price
                </p>

                <p className="mt-1 text-3xl font-semibold text-[#d4af37]">
                  ₹{formatPrice(property.price)}
                </p>
              </div>

              {/* Possession */}
              {property.possession && (
                <p className="mt-4 text-sm text-zinc-500">
                  Possession:{" "}
                  <span className="text-zinc-300">
                    {property.possession}
                  </span>
                </p>
              )}

              {/* RERA */}
              {property.rera && (
                <div className="mt-5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                  <p className="text-sm font-medium text-emerald-400">
                    RERA Registered
                  </p>

                  <p className="mt-1 text-xs text-zinc-400">
                    {property.rera.registrationNumber}
                  </p>
                </div>
              )}

              {/* Schedule */}
              <Link
                href={`/schedule-visit?property=${property.id}`}
                className="mt-6 flex w-full items-center justify-center rounded-xl bg-[#c9a45c] px-5 py-4 font-semibold text-black transition hover:bg-[#d8b875]"
              >
                Schedule a Visit
              </Link>

              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-4 font-semibold text-white transition hover:opacity-90"
              >
                <WhatsAppIcon />
                Chat on WhatsApp
              </a>

              <p className="mt-5 text-center text-xs leading-5 text-zinc-600">
                No pressure. Get property details, availability and
                assistance from our team.
              </p>
            </div>
          </aside>
        </div>
      </div>
{/* LOCATION / MAP */}
    <LocationSection
      location={property.location}
      city={property.city}
    />

    <Footer />
      {/* Floating WhatsApp */}
      <WhatsAppFloating
        phoneNumber={whatsappNumber}
        message={`Hi Realty Riches, I'm interested in ${property.title} in ${property.location}. Please share more details.`}
      />
    </main>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5 fill-current"
    >
      <path d="M20.52 3.48A11.82 11.82 0 0 0 12.05 0C5.52 0 .2 5.31.2 11.85c0 2.09.55 4.13 1.59 5.93L.1 24l6.38-1.67a11.85 11.85 0 0 0 5.57 1.41h.01c6.53 0 11.85-5.31 11.85-11.85 0-3.17-1.23-6.15-3.39-8.41ZM12.06 21.7h-.01a9.83 9.83 0 0 1-5.01-1.37l-.36-.21-3.78.99 1.01-3.68-.23-.38a9.83 9.83 0 1 1 8.38 4.65Zm5.4-7.37c-.3-.15-1.78-.88-2.05-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.18.2-.35.23-.65.08-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.5-1.78-1.68-2.08-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.68-1.63-.93-2.23-.25-.59-.5-.51-.68-.52h-.58c-.2 0-.53.08-.81.38-.28.3-1.06 1.04-1.06 2.54s1.09 2.95 1.24 3.15c.15.2 2.14 3.27 5.19 4.58.73.31 1.3.49 1.75.63.74.24 1.41.2 1.94.12.59-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.08-.13-.28-.2-.58-.35Z" />
    </svg>
  );
}

function getAmenityIcon(iconName?: string): LucideIcon {
  const icons: Record<string, LucideIcon> = {
    waves: Waves,
    dumbbell: Dumbbell,
    car: Car,
    trees: Trees,
    "tree-pine": TreePine,
    "building-2": Building2,
    "shield-check": ShieldCheck,
    camera: Camera,
    zap: Zap,
    "arrow-up-down": ArrowUpDown,
    baby: Baby,
    footprints: Footprints,
    lightbulb: Lightbulb,
    sparkles: Sparkles,
  };

  return icons[iconName ?? "sparkles"] ?? Sparkles;
}

function formatPrice(price: number) {
  if (price >= 10000000) {
    return `${(price / 10000000).toFixed(2)} Cr`;
  }

  if (price >= 100000) {
    return `${(price / 100000).toFixed(2)} L`;
  }

  return price.toLocaleString("en-IN");
}