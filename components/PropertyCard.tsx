"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Bath,
  BedDouble,
  Check,
  Heart,
  MapPin,
  Ruler,
} from "lucide-react";
import type { BuyerProperty } from "@/lib/properties";

type PropertyCardProps = {
  property: BuyerProperty;
};

export default function PropertyCard({ property }: PropertyCardProps) {
  const propertyUrl = `/properties/${property.id}`;

  const hasRera =
    property.rera?.registered &&
    Boolean(property.rera.registrationNumber);

  const isReraVerified =
    property.rera?.registered &&
    property.rera?.verified;

  const formattedPrice = formatPrice(property.price);
  const areaUnit = property.propertyType === "Plot" ? "sq. yd" : "sq ft";

  return (
    <article
      className="
        group relative overflow-hidden rounded-[22px]
        border border-white/10
        bg-[#0d0f0f]
        shadow-[0_20px_60px_rgba(0,0,0,0.25)]
        transition-all duration-500
        hover:-translate-y-1
        hover:border-white/20
        hover:shadow-[0_28px_80px_rgba(0,0,0,0.4)]
      "
    >
      {/* IMAGE */}
      <div className="relative aspect-[1.38/1] overflow-hidden bg-[#151717]">
        <Link
          href={propertyUrl}
          aria-label={`View ${property.title}`}
          className="absolute inset-0 z-0"
        >
          {property.image ? (
            <img
              src={property.image}
              alt={property.title}
              className="
                h-full w-full object-cover
                transition-transform duration-700
                group-hover:scale-[1.045]
              "
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-zinc-800 to-zinc-950" />
          )}
        </Link>

        {/* IMAGE GRADIENT */}
        <div
          className="
            pointer-events-none absolute inset-0
            bg-gradient-to-t
            from-black/65 via-black/5 to-black/20
          "
        />

        {/* RERA BADGE */}
        {hasRera && (
          <div className="absolute left-4 top-4 z-20">
            <div
              className="
                inline-flex items-center gap-2
                rounded-full
                border border-emerald-400/35
                bg-[#07140f]/90
                px-3.5 py-2
                shadow-[0_8px_25px_rgba(0,0,0,0.25)]
                backdrop-blur-xl
              "
            >
              <span
                className="
                  flex h-5 w-5 items-center justify-center
                  rounded-full
                  bg-emerald-400
                  text-[11px]
                  font-black
                  text-[#062015]
                  shadow-[0_0_14px_rgba(52,211,153,0.35)]
                "
              >
                <Check size={13} strokeWidth={3} />
              </span>

              <span className="text-[12px] font-semibold tracking-wide text-emerald-300">
                RERA Registered
              </span>

              {isReraVerified && (
                <span className="hidden border-l border-emerald-400/20 pl-2 text-[10px] uppercase tracking-[0.12em] text-emerald-400/70 sm:inline">
                  Verified
                </span>
              )}
            </div>
          </div>
        )}

        {/* PROPERTY TYPE */}
        <div className="absolute left-4 bottom-4 z-10">
          <span
            className="
              inline-flex items-center
              rounded-full
              border border-white/10
              bg-black/75
              px-4 py-2
              text-xs font-medium
              text-white
              backdrop-blur-xl
            "
          >
            {property.propertyType}
          </span>
        </div>

        {/* SAVE */}
        <button
          type="button"
          aria-label={`Save ${property.title}`}
          className="
  absolute right-4 top-4 z-20
  flex h-12 w-12 items-center justify-center
  rounded-full
  border border-white/15
  bg-black/65
  text-white
  backdrop-blur-xl
  transition-all duration-300
  hover:scale-105
  hover:border-[#d4af37]/50
  hover:bg-black/85
  hover:text-[#d4af37]
"
        >
          <Heart
            size={20}
            strokeWidth={1.8}
          />
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-6">
        {/* LOCATION + PRICE */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-2">
            <MapPin
              size={15}
              strokeWidth={1.8}
              className="shrink-0 text-zinc-500"
            />

            <span className="truncate text-sm text-zinc-400">
              {property.location}
              {property.city && property.city !== property.location
                ? `, ${property.city}`
                : ""}
            </span>
          </div>

          <span className="shrink-0 text-lg font-semibold tracking-tight text-[#d4af37]">
            {formattedPrice}
          </span>
        </div>

        {/* TITLE */}
        <Link href={propertyUrl} className="block">
          <h2
            className="
              mt-4
              font-serif
              text-[27px]
              font-medium
              leading-[1.08]
              tracking-tight
              text-white
              transition-colors
              duration-300
              group-hover:text-[#e5c158]
            "
          >
            {property.title}
          </h2>
        </Link>

        {/* DESCRIPTION */}
        {property.description && (
          <p
            className="
              mt-4
              line-clamp-2
              text-sm
              leading-6
              text-zinc-500
            "
          >
            {property.description}
          </p>
        )}

        {/* DETAILS */}
        <div
          className="
            mt-6
            grid grid-cols-3
            divide-x divide-white/10
            rounded-2xl
            border border-white/10
            bg-white/[0.025]
            py-4
          "
        >
          <PropertyDetail
            icon={<Ruler size={18} strokeWidth={1.5} />}
            value={`${property.area.toLocaleString()} ${areaUnit}`}
          />

          <PropertyDetail
            icon={<BedDouble size={18} strokeWidth={1.5} />}
            value={
              property.bedrooms
                ? `${property.bedrooms} BHK`
                : "—"
            }
          />

          <PropertyDetail
            icon={<Bath size={18} strokeWidth={1.5} />}
            value={
              property.bathrooms
                ? `${property.bathrooms} Baths`
                : "—"
            }
          />
        </div>

        {/* FOOTER */}
        <div className="mt-5 flex items-center justify-between">
          <Link
            href={propertyUrl}
            className="
              inline-flex items-center gap-2
              text-sm font-medium
              text-[#d4af37]
              transition-colors
              hover:text-[#e5c158]
            "
          >
            View Details

            <span
              className="
                flex h-9 w-9 items-center justify-center
                rounded-full
                border border-[#d4af37]/50
                transition-all duration-300
                group-hover:bg-[#d4af37]
                group-hover:text-black
              "
            >
              <ArrowUpRight size={17} />
            </span>
          </Link>

          {/* COMPARE */}
          <button
            type="button"
            className="
              rounded-full
              border border-white/10
              px-3.5 py-2
              text-xs
              text-zinc-500
              transition-all
              hover:border-white/20
              hover:text-white
            "
          >
            Compare
          </button>
        </div>
      </div>
    </article>
  );
}

function PropertyDetail({
  icon,
  value,
}: {
  icon: React.ReactNode;
  value: string;
}) {
  return (
    <div className="flex min-w-0 flex-col items-center gap-2 px-2 text-center">
      <span className="text-zinc-400">{icon}</span>

      <span className="truncate text-xs text-zinc-400">
        {value}
      </span>
    </div>
  );
}

function formatPrice(price: number) {
  if (!price) return "Price on request";

  if (price >= 10_000_000) {
    return `₹${(price / 10_000_000).toFixed(2).replace(/\.00$/, "")} Cr`;
  }

  if (price >= 100_000) {
    return `₹${(price / 100_000).toFixed(1).replace(/\.0$/, "")} L`;
  }

  return `₹${price.toLocaleString("en-IN")}`;
}