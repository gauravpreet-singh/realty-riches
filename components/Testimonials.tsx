const testimonials = [
  {
    quote:
      "The process was transparent and we were able to compare several properties before deciding.",
    name: "Aman S.",
    location: "Mohali",
  },
  {
    quote:
      "The video walkthroughs were extremely helpful. We could shortlist properties before visiting.",
    name: "Rahul K.",
    location: "Chandigarh",
  },
  {
    quote:
      "Very professional experience from the initial enquiry to the property visit.",
    name: "Simran K.",
    location: "Kharar",
  },
];

export default function Testimonials() {
  return (
    <section className="section-padding">

      <div className="container-custom">

        <div className="text-center">

          <p className="text-sm uppercase tracking-[0.25em] text-[#d4af37]">
            Buyer experiences
          </p>

          <h2 className="mt-3 text-4xl font-semibold md:text-5xl">
            What buyers say
          </h2>

        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">

          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="rounded-2xl border border-white/10 bg-[#111111] p-8"
            >

              <div className="text-[#d4af37]">
                ★★★★★
              </div>

              <p className="mt-6 leading-7 text-zinc-300">
                "{testimonial.quote}"
              </p>

              <div className="mt-7">
                <p className="font-medium">
                  {testimonial.name}
                </p>

                <p className="text-sm text-zinc-500">
                  {testimonial.location}
                </p>
              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}