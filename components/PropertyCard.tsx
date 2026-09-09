import Link from "next/link";
import { Property } from "@/data/properties";
import SavePropertyButton from "@/components/SavedProperties";
import ComparePropertyButton from "@/components/CompareProperties";

type PropertyCardProps = {
  property: Property;
};

export default function PropertyCard({
  property,
}: PropertyCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition duration-300 hover:-translate-y-1 hover:border-[#d4af37]/40">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {property.rera?.registered && property.rera?.verified && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-400">
            <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-bold text-black">
              ✓
            </span>
            RERA Registered
          </span>
        )}
        <Link
          href={`/properties/${property.id}`}
          className="block h-full w-full"
        >
          <img
            src={property.image}
            alt={property.title}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        </Link>
        
        {/* Save */}
        <SavePropertyButton
          propertyId={property.id}
          showLabel={false}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white backdrop-blur-md transition hover:border-[#d4af37] hover:text-[#d4af37]"
        />

        {/* Property Type */}
        <div className="absolute left-4 top-4 rounded-full bg-black/75 px-3 py-1.5 text-xs font-medium backdrop-blur">
          {property.propertyType}
        </div>

        {/* Video Badge */}
        {property.video && (
          <div className="absolute right-16 top-4 rounded-full bg-[#d4af37] px-3 py-1.5 text-xs font-medium text-black">
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
        <Link
          href={`/properties/${property.id}`}
          className="block"
        >
          <h3 className="mt-2 text-xl font-semibold transition group-hover:text-[#d4af37]">
            {property.title}
          </h3>
        </Link>

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
          {property.features
            .slice(0, 3)
            .map((feature) => (
              <span
                key={feature}
                className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-500"
              >
                {feature}
              </span>
            ))}
        </div>

        {/* Actions */}
        <div className="mt-5 flex gap-3 border-t border-white/10 pt-4">
          <Link
            href={`/properties/${property.id}`}
            className="flex-1 rounded-xl bg-[#d4af37] px-4 py-3 text-center text-sm font-medium text-black transition hover:bg-[#e5c158]"
          >
            View Property
          </Link>

          <ComparePropertyButton
            propertyId={property.id}
            className="flex-1 rounded-xl border border-white/10 px-4 py-3 text-sm text-zinc-400 transition hover:border-[#d4af37] hover:text-[#d4af37]"
          />
        </div>
      </div>
    </article>
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

