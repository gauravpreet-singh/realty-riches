import type { NearbyPlace } from "@/data/properties";

type NearbyPlacesProps = {
  places?: NearbyPlace[];
};

const icons: Record<string, string> = {
  Education: "⌂",
  Healthcare: "+",
  Shopping: "◇",
  Airport: "✈",
  Connectivity: "↗",
  Highway: "⇢",
};

export default function NearbyPlaces({
  places,
}: NearbyPlacesProps) {
  if (!places || places.length === 0) {
    return null;
  }

  return (
    <div className="border-b border-white/10 py-10">
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.2em] text-[#d4af37]">
          Nearby
        </p>

        <h2 className="mt-2 text-2xl font-semibold md:text-3xl">
          Everything you need,
          <span className="gold-text"> within reach.</span>
        </h2>

        <p className="mt-3 text-sm leading-6 text-zinc-500">
          Approximate distances to important locations around
          the property.
        </p>
      </div>

      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {places.map((place) => (
          <div
            key={`${place.category}-${place.name}`}
            className="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-[#d4af37]/30 hover:bg-white/[0.04]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d4af37]/20 bg-[#d4af37]/10 text-sm text-[#d4af37]">
                {icons[place.category] || "•"}
              </div>

              <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-zinc-500">
                {place.distance}
              </span>
            </div>

            <p className="mt-5 text-xs uppercase tracking-wider text-zinc-600">
              {place.category}
            </p>

            <h3 className="mt-1 text-sm font-medium text-zinc-200 transition group-hover:text-white">
              {place.name}
            </h3>
          </div>
        ))}
      </div>

      <p className="mt-5 text-xs leading-5 text-zinc-600">
        Distances are approximate and provided for general
        guidance. Actual travel distance and time may vary
        depending on the route and traffic conditions.
      </p>
    </div>
  );
}

