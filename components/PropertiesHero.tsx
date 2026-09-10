import Image from "next/image";

type PropertiesHeroProps = {
  image?: string;
};

export default function PropertiesHero({
  image = "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=85",
}: PropertiesHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[#080909]">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
        {/* LEFT CONTENT */}
        <div className="flex min-h-[430px] items-center px-6 py-20 lg:px-12 xl:px-16">
          <div className="max-w-xl">
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.3em] text-[#d4af37]">
              Premium Properties
            </p>

            <h1 className="font-serif text-5xl font-medium leading-[1.02] tracking-tight text-white md:text-6xl xl:text-7xl">
              Find a property that
              <span className="mt-2 block text-[#d4af37]">
                fits your life.
              </span>
            </h1>

            <p className="mt-7 max-w-lg text-base leading-7 text-zinc-400 md:text-lg">
              Explore carefully selected apartments, villas, plots and
              homes across Mohali, Chandigarh, Kharar and New Chandigarh.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-zinc-400">
                Verified opportunities
              </div>

              <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-zinc-400">
                Buyer-first guidance
              </div>

              <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-zinc-400">
                RERA verification
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative min-h-[330px] overflow-hidden lg:min-h-[430px]">
          <Image
            src={image}
            alt="Premium residential property"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />

          {/* Image overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#080909] via-transparent to-transparent lg:from-[#080909]/30" />

          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#080909] to-transparent" />

          {/* Image label */}
          <div className="absolute bottom-6 right-6 rounded-full border border-white/15 bg-black/50 px-4 py-2 text-xs text-white/70 backdrop-blur-md">
            Realty Riches
          </div>
        </div>
      </div>
    </section>
  );
}