import Link from "next/link";

import type { Location } from "@/data/locations";

type LocationCardProps = {
  location: Location;
};

export default function LocationCard({
  location,
}: LocationCardProps) {
  return (
    <Link
      href={`/locations/${location.slug}`}
      className="group block overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] transition duration-500 hover:-translate-y-1 hover:border-[#d4af37]/40"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={location.image}
          alt={location.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        {location.featured && (
          <div className="absolute left-5 top-5 rounded-full border border-[#d4af37]/40 bg-black/70 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-[#d4af37] backdrop-blur">
            Featured
          </div>
        )}

        <div className="absolute bottom-5 left-5 right-5">
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">
            {location.region}
          </p>

          <h3 className="mt-1 text-2xl font-semibold text-white md:text-3xl">
            {location.name}
          </h3>
        </div>
      </div>

      <div className="p-6">
        <p className="text-sm leading-6 text-zinc-500">
          {location.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {location.propertyTypes.map((type) => (
            <span
              key={type}
              className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-zinc-400"
            >
              {type}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
          <span className="text-sm text-zinc-500">
            Explore location
          </span>

          <span className="text-sm text-[#d4af37] transition group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

