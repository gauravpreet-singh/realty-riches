import Link from "next/link";
import { notFound } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MarketInsightCard from "@/components/MarketInsightCard";

import { marketInsights } from "@/data/marketInsights";

type InsightPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return marketInsights.map((insight) => ({
    slug: insight.slug,
  }));
}

export default async function InsightPage({
  params,
}: InsightPageProps) {
  const { slug } = await params;

  const insight = marketInsights.find(
    (item) => item.slug === slug
  );

  if (!insight) {
    notFound();
  }

  const relatedInsights = marketInsights
    .filter((item) => item.slug !== insight.slug)
    .filter((item) => item.category === insight.category)
    .slice(0, 3);

  const fallbackRelatedInsights = marketInsights
    .filter((item) => item.slug !== insight.slug)
    .slice(0, 3);

  const displayedRelatedInsights =
    relatedInsights.length > 0
      ? relatedInsights
      : fallbackRelatedInsights;

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}

      <section className="border-b border-white/10 pt-36 pb-14">
        <div className="container-custom">
          <div className="max-w-4xl">

            <Link
              href="/market-insights"
              className="text-xs uppercase tracking-[0.22em] text-[#d4af37] transition hover:text-[#e5c158]"
            >
              ← Market Insights
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-[#d4af37]/30 bg-[#d4af37]/[0.05] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-[#d4af37]">
                {insight.category}
              </span>

              <span className="text-xs text-zinc-600">
                {insight.readTime}
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-6xl lg:text-7xl">
              {insight.title}
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
              {insight.excerpt}
            </p>

          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* FEATURED IMAGE */}
      {/* ================================================= */}

      <section className="section-padding pb-0">
        <div className="container-custom">
          <div className="overflow-hidden rounded-3xl border border-white/10">
            <img
              src={insight.image}
              alt={insight.title}
              className="aspect-[16/8] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* ARTICLE */}
      {/* ================================================= */}

      <section className="section-padding">
        <div className="container-custom">

          <div className="grid gap-16 lg:grid-cols-[1fr_320px]">

            {/* Article content */}

            <article className="max-w-3xl">

              <p className="text-lg leading-8 text-zinc-300">
                {insight.introduction}
              </p>

              <div className="mt-12 space-y-12">

                {insight.sections.map(
                  (section, index) => (
                    <section key={section.heading}>

                      <div className="flex gap-4">

                        <span className="mt-1 text-xs tracking-[0.2em] text-[#d4af37]">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <div className="flex-1">

                          <h2 className="text-2xl font-semibold md:text-3xl">
                            {section.heading}
                          </h2>

                          <div className="mt-5 space-y-5">
                            {section.paragraphs.map(
                              (paragraph) => (
                                <p
                                  key={paragraph}
                                  className="text-base leading-8 text-zinc-400"
                                >
                                  {paragraph}
                                </p>
                              )
                            )}
                          </div>

                          {section.bullets &&
                            section.bullets.length > 0 && (
                              <ul className="mt-6 space-y-3">
                                {section.bullets.map(
                                  (bullet) => (
                                    <li
                                      key={bullet}
                                      className="flex gap-3 text-sm leading-6 text-zinc-400"
                                    >
                                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d4af37]" />

                                      <span>
                                        {bullet}
                                      </span>
                                    </li>
                                  )
                                )}
                              </ul>
                            )}

                        </div>
                      </div>

                    </section>
                  )
                )}

              </div>

              {/* Key Takeaway */}

              <div className="mt-16 rounded-3xl border border-[#d4af37]/20 bg-[#d4af37]/[0.04] p-7 md:p-9">

                <p className="text-xs uppercase tracking-[0.22em] text-[#d4af37]">
                  Key takeaway
                </p>

                <p className="mt-4 text-lg leading-8 text-zinc-200">
                  {insight.keyTakeaway}
                </p>

              </div>

            </article>

            {/* ================================================= */}
            {/* SIDEBAR */}
            {/* ================================================= */}

            <aside className="lg:sticky lg:top-28 lg:h-fit">

              <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-7">

                <p className="text-xs uppercase tracking-[0.22em] text-[#d4af37]">
                  Buyer checklist
                </p>

                <h2 className="mt-3 text-xl font-semibold">
                  Before you decide
                </h2>

                <div className="mt-6 space-y-4">

                  {insight.checklist.map(
                    (item, index) => (
                      <div
                        key={item}
                        className="flex gap-3"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#d4af37]/30 text-[10px] text-[#d4af37]">
                          {index + 1}
                        </span>

                        <p className="text-sm leading-6 text-zinc-400">
                          {item}
                        </p>
                      </div>
                    )
                  )}

                </div>

              </div>

              {/* CTA */}

              <div className="mt-5 rounded-3xl border border-white/10 bg-white/[0.02] p-7">

                <p className="text-sm font-medium text-white">
                  Ready to explore?
                </p>

                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  Apply what you've learned to real
                  properties.
                </p>

                <Link
                  href="/properties"
                  className="mt-5 inline-flex w-full justify-center rounded-xl bg-[#d4af37] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#e5c158]"
                >
                  Explore Properties →
                </Link>

              </div>

            </aside>

          </div>

        </div>
      </section>

      {/* ================================================= */}
      {/* RELATED INSIGHTS */}
      {/* ================================================= */}

      <section className="border-t border-white/10 py-24">
        <div className="container-custom">

          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.22em] text-[#d4af37]">
              Keep learning
            </p>

            <h2 className="mt-3 text-3xl font-semibold md:text-5xl">
              Related insights
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {displayedRelatedInsights.map(
              (relatedInsight) => (
                <MarketInsightCard
                  key={relatedInsight.slug}
                  insight={relatedInsight}
                />
              )
            )}

          </div>

        </div>
      </section>

      {/* ================================================= */}
      {/* FINAL CTA */}
      {/* ================================================= */}

      <section className="border-t border-white/10 py-24">
        <div className="container-custom">

          <div className="rounded-3xl border border-[#d4af37]/20 bg-[#d4af37]/[0.04] px-6 py-16 text-center md:px-12">

            <p className="text-xs uppercase tracking-[0.22em] text-[#d4af37]">
              Realty Riches
            </p>

            <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
              Research first.
              <span className="gold-text">
                {" "}Decide with confidence.
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-zinc-500">
              Explore properties, compare your shortlist
              and use the information that matters to make
              a better decision.
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

