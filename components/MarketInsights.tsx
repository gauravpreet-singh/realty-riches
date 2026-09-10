import Link from "next/link";
import { ArrowUpRight, BookOpen, MapPin } from "lucide-react";

import { marketInsights } from "@/data/marketInsights";

export default function MarketInsights() {
  const featuredInsights = marketInsights.slice(0, 3);

  return (
    <section className="border-t border-white/10 bg-[#080909] px-6 py-24">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">

          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-[#d4af37]" />

              <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#d4af37]">
                Market Insights
              </p>
            </div>

            <h2 className="font-serif text-4xl font-medium leading-tight text-white md:text-5xl">
              Understand the market.
              <span className="block text-[#d4af37]">
                Make a richer decision.
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-zinc-500">
              Buyer-focused insights on locations, infrastructure,
              property types and the factors that can influence a
              real-estate decision.
            </p>
          </div>

          <Link
            href="/market-insights"
            className="
              group inline-flex w-fit items-center gap-3
              rounded-full
              border border-white/10
              px-5 py-3
              text-sm font-medium
              text-zinc-300
              transition
              hover:border-[#d4af37]/40
              hover:text-[#d4af37]
            "
          >
            Explore all insights

            <span
              className="
                flex h-8 w-8 items-center justify-center
                rounded-full
                border border-white/10
                transition
                group-hover:border-[#d4af37]/40
              "
            >
              <ArrowUpRight size={15} />
            </span>
          </Link>
        </div>

        {/* INSIGHTS */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {featuredInsights.map((insight, index) => (
            <InsightPreview
              key={insight.slug ?? index}
              insight={insight}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

function InsightPreview({
  insight,
}: {
  insight: any;
}) {
  return (
    <Link
      href={`/market-insights/${insight.slug}`}
      className="
        group relative overflow-hidden
        rounded-[22px]
        border border-white/10
        bg-[#0d0f0f]
        transition-all duration-500
        hover:-translate-y-1
        hover:border-white/20
      "
    >
      {/* IMAGE */}
      {insight.image ? (
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={insight.image}
            alt={insight.title}
            className="
              h-full w-full object-cover
              transition-transform duration-700
              group-hover:scale-[1.04]
            "
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          {/* CATEGORY */}
          <div className="absolute left-4 top-4">
            <span
              className="
                rounded-full
                border border-white/10
                bg-black/60
                px-3 py-1.5
                text-[10px]
                font-medium
                uppercase
                tracking-[0.14em]
                text-white/80
                backdrop-blur-md
              "
            >
              {insight.category || "Market Insight"}
            </span>
          </div>
        </div>
      ) : (
        <div className="flex aspect-[16/10] items-center justify-center bg-gradient-to-br from-[#171918] to-[#0b0c0c]">
          <BookOpen
            size={38}
            strokeWidth={1}
            className="text-[#d4af37]/50"
          />
        </div>
      )}

      {/* CONTENT */}
      <div className="p-6">

        {/* LOCATION */}
        {insight.location && (
          <div className="flex items-center gap-2 text-xs text-zinc-600">
            <MapPin size={13} />
            {insight.location}
          </div>
        )}

        <h3
          className="
            mt-3
            font-serif
            text-[25px]
            font-medium
            leading-[1.12]
            text-white
            transition-colors
            group-hover:text-[#e5c158]
          "
        >
          {insight.title}
        </h3>

        {insight.excerpt && (
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-500">
            {insight.excerpt}
          </p>
        )}

        <div className="mt-6 flex items-center justify-between">
          <span className="text-xs uppercase tracking-[0.16em] text-zinc-600">
            Read insight
          </span>

          <span
            className="
              flex h-9 w-9 items-center justify-center
              rounded-full
              border border-white/10
              text-zinc-400
              transition-all duration-300
              group-hover:border-[#d4af37]/50
              group-hover:bg-[#d4af37]
              group-hover:text-black
            "
          >
            <ArrowUpRight size={16} />
          </span>
        </div>
      </div>
    </Link>
  );
}