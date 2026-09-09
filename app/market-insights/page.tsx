import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MarketInsightCard from "@/components/MarketInsightCard";

import { marketInsights } from "@/data/marketInsights";

export default function MarketInsightsPage() {
  const featuredInsight = marketInsights.find(
    (insight) => insight.featured
  );

  const otherInsights = marketInsights.filter(
    (insight) => !insight.featured
  );

  const categories = [
    "Buying Guide",
    "Location Guide",
    "Finance",
    "Buyer Guide",
    "Due Diligence",
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}

      <section className="border-b border-white/10 pt-36 pb-20">
        <div className="container-custom">
          <div className="max-w-4xl">

            <p className="mb-5 text-sm uppercase tracking-[0.25em] text-[#d4af37]">
              Market Insights
            </p>

            <h1 className="text-4xl font-semibold tracking-tight md:text-6xl lg:text-7xl">
              Real estate,
              <span className="gold-text">
                {" "}explained for buyers.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
              Understand properties, locations, financing
              and the decisions that matter before you buy.
            </p>

          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* FEATURED INSIGHT */}
      {/* ================================================= */}

      {featuredInsight && (
        <section className="section-padding">
          <div className="container-custom">

            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.22em] text-[#d4af37]">
                Featured insight
              </p>
            </div>

            <Link
              href={`/market-insights/${featuredInsight.slug}`}
              className="group grid overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] transition duration-500 hover:border-[#d4af37]/40 lg:grid-cols-2"
            >
              {/* Image */}

              <div className="relative min-h-[320px] overflow-hidden lg:min-h-[500px]">
                <img
                  src={featuredInsight.image}
                  alt={featuredInsight.title}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              </div>

              {/* Content */}

              <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">

                <p className="text-xs uppercase tracking-[0.2em] text-[#d4af37]">
                  {featuredInsight.category}
                </p>

                <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
                  {featuredInsight.title}
                </h2>

                <p className="mt-6 max-w-xl text-base leading-7 text-zinc-500">
                  {featuredInsight.excerpt}
                </p>

                <div className="mt-8 flex items-center gap-4">
                  <span className="rounded-xl bg-[#d4af37] px-5 py-3 text-sm font-medium text-black">
                    Read Insight
                  </span>

                  <span className="text-sm text-zinc-600">
                    {featuredInsight.readTime}
                  </span>
                </div>

              </div>
            </Link>

          </div>
        </section>
      )}

      {/* ================================================= */}
      {/* INSIGHTS */}
      {/* ================================================= */}

      <section className="border-t border-white/10 py-24">
        <div className="container-custom">

          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">

            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-[#d4af37]">
                Buyer knowledge
              </p>

              <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
                Latest insights
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-zinc-500">
              Practical guides designed to help you ask
              better questions and make better decisions.
            </p>

          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {otherInsights.map((insight) => (
              <MarketInsightCard
                key={insight.slug}
                insight={insight}
              />
            ))}

          </div>

        </div>
      </section>

      {/* ================================================= */}
      {/* TOPICS */}
      {/* ================================================= */}

      <section className="border-y border-white/10 py-24">
        <div className="container-custom">

          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">

            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-[#d4af37]">
                Explore by topic
              </p>

              <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
                Learn what matters.
              </h2>

              <p className="mt-5 max-w-md text-sm leading-7 text-zinc-500">
                Start with the topic that matches where you
                are in your property-buying journey.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">

              {categories.map((category, index) => (
                <Link
                  key={category}
                  href={`/market-insights?category=${encodeURIComponent(
                    category
                  )}`}
                  className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-[#d4af37]/30"
                >
                  <div className="flex items-center gap-4">

                    <span className="text-xs tracking-[0.2em] text-[#d4af37]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="text-sm font-medium text-zinc-300 transition group-hover:text-white">
                      {category}
                    </span>

                  </div>

                  <span className="text-[#d4af37] transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              ))}

            </div>

          </div>

        </div>
      </section>

      {/* ================================================= */}
      {/* BUYER CTA */}
      {/* ================================================= */}

      <section className="py-24">
        <div className="container-custom">

          <div className="rounded-3xl border border-[#d4af37]/20 bg-[#d4af37]/[0.04] px-6 py-16 text-center md:px-12">

            <p className="text-xs uppercase tracking-[0.22em] text-[#d4af37]">
              Turn knowledge into action
            </p>

            <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
              Found something worth exploring?
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-zinc-500">
              Browse properties, compare your shortlist and
              take the next step when you're ready.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

              <Link
                href="/properties"
                className="inline-flex justify-center rounded-xl bg-[#d4af37] px-6 py-3.5 text-sm font-medium text-black transition hover:bg-[#e5c158]"
              >
                Explore Properties →
              </Link>

              <Link
                href="/compare"
                className="inline-flex justify-center rounded-xl border border-white/10 px-6 py-3.5 text-sm font-medium text-white transition hover:border-white/30"
              >
                Compare Properties
              </Link>

            </div>

          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}

