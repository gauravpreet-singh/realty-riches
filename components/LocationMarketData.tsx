import { getLocationMarketData } from "@/data/locationMarketData";

type LocationMarketDataProps = {
  locationSlug: string;
};

export default function LocationMarketData({
  locationSlug,
}: LocationMarketDataProps) {
  const marketData = getLocationMarketData(locationSlug);

  if (!marketData) {
    return null;
  }

  return (
    <section className="border-y border-white/10 bg-white/[0.02]">
      <div className="container-custom section-padding">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.25em] text-[#d4af37]">
            Market Snapshot
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
            Understand the market before you buy.
          </h2>

          <p className="mt-5 text-base leading-8 text-zinc-400">
            {marketData.marketPosition}
          </p>
        </div>

        {/* Metrics */}
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {marketData.metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-2xl border border-white/10 bg-black p-6"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                {metric.label}
              </p>

              <p className="mt-3 text-xl font-semibold text-[#d4af37]">
                {metric.value}
              </p>

              <p className="mt-3 text-sm leading-6 text-zinc-500">
                {metric.description}
              </p>
            </div>
          ))}
        </div>

        {/* Buyer intelligence */}
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-black p-7">
            <p className="text-sm font-semibold text-white">
              What is driving the area
            </p>

            <ul className="mt-5 space-y-4">
              {marketData.demandDrivers.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-6 text-zinc-400"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d4af37]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black p-7">
            <p className="text-sm font-semibold text-white">
              Development signals
            </p>

            <ul className="mt-5 space-y-4">
              {marketData.developmentSignals.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-6 text-zinc-400"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d4af37]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Buyer fit / watchouts */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
            <p className="text-sm font-semibold text-white">
              Who may find this location suitable
            </p>

            <ul className="mt-5 space-y-3">
              {marketData.buyerFit.map((item) => (
                <li
                  key={item}
                  className="text-sm leading-6 text-zinc-400"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-[#d4af37]/20 bg-[#d4af37]/[0.04] p-7">
            <p className="text-sm font-semibold text-[#d4af37]">
              Buyer watchouts
            </p>

            <ul className="mt-5 space-y-3">
              {marketData.buyerWatchouts.map((item) => (
                <li
                  key={item}
                  className="text-sm leading-6 text-zinc-400"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Verification */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-black p-7">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-white">
                RERA verification
              </p>

              <p className="mt-3 text-sm leading-7 text-zinc-500">
                {marketData.reraGuidance}
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                Planning context
              </p>

              <p className="mt-3 text-sm leading-7 text-zinc-500">
                {marketData.planningGuidance}
              </p>
            </div>
          </div>
        </div>

        {/* Sources */}
        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">
              Data transparency
            </p>

            <p className="mt-2 text-xs text-zinc-600">
              Last reviewed: {marketData.lastUpdated}
            </p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {marketData.sources.map((source) => (
              <a
                key={source.url}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-zinc-500 transition hover:text-[#d4af37]"
              >
                {source.name} ↗
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

