import Link from "next/link";

import type { MarketInsight } from "@/data/marketInsights";

type MarketInsightCardProps = {
  insight: MarketInsight;
};

export default function MarketInsightCard({
  insight,
}: MarketInsightCardProps) {
  return (
    <Link
      href={`/market-insights/${insight.slug}`}
      className="group block overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] transition duration-500 hover:-translate-y-1 hover:border-[#d4af37]/40"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={insight.image}
          alt={insight.title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

        {/* Category */}
        <div className="absolute left-5 top-5 rounded-full border border-[#d4af37]/30 bg-black/70 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-[#d4af37] backdrop-blur">
          {insight.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs text-zinc-600">
            {insight.readTime}
          </span>

          <span className="text-xs text-zinc-600">
            Realty Riches
          </span>
        </div>

        <h3 className="mt-4 text-xl font-semibold leading-7 transition group-hover:text-[#d4af37]">
          {insight.title}
        </h3>

        <p className="mt-3 text-sm leading-6 text-zinc-500">
          {insight.excerpt}
        </p>

        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
          <span className="text-sm text-zinc-400 transition group-hover:text-white">
            Read insight
          </span>

          <span className="text-[#d4af37] transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

