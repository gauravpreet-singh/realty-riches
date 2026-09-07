import Link from "next/link";
import { Property } from "@/data/properties";

type PropertyCardProps = {
  property: Property;
};

export default function PropertyCard({
  property,
}: PropertyCardProps) {
  return (
    <Link
      href={`/properties/${property.id}`}
      className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition duration-300 hover:-translate-y-1 hover:border-[#d4af37]/40"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">

        <img
          src={property.image}
          alt={property.title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />

        {/* Property Type */}
        <div className="absolute left-4 top-4 rounded-full bg-black/75 px-3 py-1.5 text-xs font-medium backdrop-blur">
          {property.propertyType}
        </div>

        {/* Video Badge */}
        {property.video && (
          <div className="absolute right-4 top-4 rounded-full bg-[#d4af37] px-3 py-1.5 text-xs font-medium text-black">
            ▶ Video
          </div>
        )}

        {/* Possession */}
        {property.possession && (
          <div className="absolute bottom-4 left-4 rounded-full bg-black/75 px-3 py-1.5 text-xs backdrop-blur">
            {property.possession}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">

        {/* Location */}
        <p className="text-sm text-zinc-500">
          {property.location}
        </p>

        {/* Title */}
        <h3 className="mt-2 text-xl font-semibold transition group-hover:text-[#d4af37]">
          {property.title}
        </h3>

        {/* Price */}
        <p className="mt-3 text-2xl font-semibold text-[#d4af37]">
          ₹{formatPrice(property.price)}
        </p>

        {/* Stats */}
        <div className="mt-5 flex flex-wrap gap-4 border-t border-white/10 pt-4 text-sm text-zinc-400">

          <span>
            {property.area.toLocaleString()} sq ft
          </span>

          {property.bedrooms > 0 && (
            <span>
              {property.bedrooms} BHK
            </span>
          )}

          {property.bathrooms > 0 && (
            <span>
              {property.bathrooms} Bath
            </span>
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

        {/* View Property */}
        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">

          <span className="text-sm text-zinc-400 transition group-hover:text-white">
            View Property
          </span>

          <span className="text-lg text-[#d4af37] transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>

        </div>

      </div>
    </Link>
  );
}


/* Price formatter */
function formatPrice(price: number) {
  if (price >= 10000000) {
    return `${(price / 10000000).toFixed(2)} Cr`;
  }

  if (price >= 100000) {
    return `${(price / 100000).toFixed(2)} Lakh`;
  }

  return price.toLocaleString("en-IN");
}