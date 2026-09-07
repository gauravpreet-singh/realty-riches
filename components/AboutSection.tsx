export default function AboutSection() {
  return (
    <section id="about" className="section-padding bg-[#111111]">

      <div className="container-custom grid gap-12 md:grid-cols-2 md:items-center">

        <div>

          <p className="text-sm uppercase tracking-[0.25em] text-[#d4af37]">
            About us
          </p>

          <h2 className="mt-4 text-4xl font-semibold md:text-5xl">
            Real estate,
            <br />
            with a better approach.
          </h2>

        </div>

        <div>

          <p className="text-lg leading-8 text-zinc-300">
            We help buyers discover and evaluate residential properties
            across Mohali, Chandigarh and surrounding areas.
          </p>

          <p className="mt-5 leading-7 text-zinc-500">
            Our goal is simple: give buyers better information, better
            property visibility and a more transparent buying experience.
          </p>

          <button className="mt-7 text-[#d4af37]">
            Learn more about us →
          </button>

        </div>

      </div>

    </section>
  );
}