type LocationSectionProps = {
  location: string;
  city: string;
};

export default function LocationSection({
  location,
  city,
}: LocationSectionProps) {
  const mapQuery = encodeURIComponent(`${location}, ${city}, Punjab, India`);

  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  return (
    <section className="border-t border-white/10 py-20 md:py-24">
      <div className="container-custom">
        {/* Header */}
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.25em] text-[#d4af37]">
            Location
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Live where everything
            <span className="gold-text"> connects.</span>
          </h2>

          <p className="mt-4 text-base leading-7 text-zinc-500">
            Explore the location, surrounding area and connectivity
            before making your decision.
          </p>
        </div>

        {/* Location content */}
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.5fr_0.7fr]">
          {/* Map */}
          <div className="group relative min-h-[360px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] md:min-h-[460px]">
            <iframe
              title={`Map showing ${location}`}
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              className="absolute inset-0 h-full w-full border-0 grayscale-[0.3] opacity-90 transition duration-500 group-hover:grayscale-0 group-hover:opacity-100"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Map label */}
            <div className="absolute left-4 top-4 rounded-xl border border-white/10 bg-black/80 px-4 py-3 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-wider text-zinc-500">
                Property Location
              </p>

              <p className="mt-1 text-sm font-medium text-white">
                {location}
              </p>
            </div>
          </div>

          {/* Right information */}
          <div className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-7">
            <p className="text-xs uppercase tracking-[0.2em] text-[#d4af37]">
              Area
            </p>

            <h3 className="mt-3 text-2xl font-semibold">
              {location}
            </h3>

            <p className="mt-2 text-sm text-zinc-500">
              {city}, Punjab
            </p>

            <div className="my-7 h-px bg-white/10" />

            {/* Connectivity */}
            <div>
              <h4 className="text-sm font-medium text-white">
                Why this location?
              </h4>

              <div className="mt-5 space-y-4">
                <LocationPoint
                  icon="⌖"
                  title="Well connected"
                  description="Convenient access to major roads and surrounding areas."
                />

                <LocationPoint
                  icon="◈"
                  title="Established surroundings"
                  description="Residential and lifestyle infrastructure nearby."
                />

                <LocationPoint
                  icon="↗"
                  title="Growth potential"
                  description="Located in an evolving real estate market."
                />
              </div>
            </div>

            {/* Directions */}
            <div className="mt-auto pt-8">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#d4af37] px-5 py-4 text-sm font-medium text-black transition hover:bg-[#e5c158]"
              >
                Get Directions
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Buyer note */}
        <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4">
          <p className="text-sm leading-6 text-zinc-500">
            <span className="font-medium text-zinc-300">
              Buyer tip:
            </span>{" "}
            Before booking a property, we recommend visiting the
            location at different times of the day to understand
            traffic, surroundings and connectivity.
          </p>
        </div>
      </div>
    </section>
  );
}

function LocationPoint({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#d4af37]/20 bg-[#d4af37]/10 text-sm text-[#d4af37]">
        {icon}
      </div>

      <div>
        <p className="text-sm font-medium text-zinc-200">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-zinc-600">
          {description}
        </p>
      </div>
    </div>
  );
}

