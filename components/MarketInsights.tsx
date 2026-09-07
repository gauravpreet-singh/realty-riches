const insights = [
  {
    category: "Market",
    title: "Mohali Property Market — 2026",
    description:
      "Explore current trends, popular locations and buyer demand across Mohali.",
  },
  {
    category: "Guide",
    title: "What Can ₹1 Crore Buy in Mohali?",
    description:
      "A practical look at apartments, plots and houses within a ₹1 crore budget.",
  },
  {
    category: "Investment",
    title: "Mohali vs Kharar",
    description:
      "Understanding the differences between two popular property markets.",
  },
];

export default function MarketInsights() {
  return (
    <section id="insights" className="section-padding bg-[#111111]">

      <div className="container-custom">

        <p className="text-sm uppercase tracking-[0.25em] text-[#d4af37]">
          Knowledge
        </p>

        <h2 className="mt-3 text-4xl font-semibold md:text-5xl">
          Market Insights
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">

          {insights.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/10 bg-[#0b0b0b] p-7 transition hover:border-[#d4af37]/50"
            >

              <p className="text-xs uppercase tracking-widest text-[#d4af37]">
                {item.category}
              </p>

              <h3 className="mt-5 text-2xl font-medium">
                {item.title}
              </h3>

              <p className="mt-4 leading-7 text-zinc-400">
                {item.description}
              </p>

              <button className="mt-7 text-sm text-white hover:text-[#d4af37]">
                Read insight →
              </button>

            </article>
          ))}

        </div>

      </div>

    </section>
  );
}