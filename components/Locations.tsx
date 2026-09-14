import Link from "next/link";

const locations = [
  {
    name: "Mohali",
    slug: "mohali",
    description: "Explore properties in Mohali",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "Kharar",
    slug: "kharar",
    description: "Explore properties in Kharar",
    image:
      "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "Chandigarh",
    slug: "chandigarh",
    description: "Explore properties in Chandigarh",
    image:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "New Chandigarh",
    slug: "new-chandigarh",
    description: "Explore properties in New Chandigarh",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80",
  },
];

export default function Locations() {
  return (
    <section id="locations" className="section-padding bg-[#111111]">
      <div className="container-custom">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-[#d4af37]">
            Explore Locations
          </p>

          <h2 className="mt-3 text-4xl font-semibold md:text-5xl">
            Find your next neighbourhood.
          </h2>

          <p className="mt-4 max-w-2xl text-zinc-400">
            Explore properties across Mohali, Kharar, Chandigarh and New
            Chandigarh. Discover homes, apartments, villas and plots in
            neighbourhoods that fit your lifestyle and budget.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {locations.map((location) => (
            <Link
              key={location.name}
              href={`/locations/${location.slug}`}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl"
              aria-label={`View properties in ${location.name}`}
            >
              <img
                src={location.image}
                alt={`Properties in ${location.name}`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              <div className="absolute bottom-6 left-6">
                <h3 className="text-2xl font-medium">
                  {location.name}
                </h3>

                <p className="mt-2 text-sm text-zinc-300">
                  {location.description} →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}