export default function PropertyVideos() {
  const videos = [
    {
      title: "3 BHK Apartment — Sector 125",
      image:
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80",
    },
    {
      title: "Residential Plot — Sector 66B",
      image:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80",
    },
    {
      title: "Luxury Villa — Kharar",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
    },
  ];

  return (
    <section className="section-padding">

      <div className="container-custom">

        <p className="text-sm uppercase tracking-[0.25em] text-[#d4af37]">
          See it before you visit
        </p>

        <h2 className="mt-3 text-4xl font-semibold md:text-5xl">
          Property Videos
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">

          {videos.map((video) => (
            <div
              key={video.title}
              className="group relative aspect-[9/14] overflow-hidden rounded-2xl"
            >

              <img
                src={video.image}
                alt={video.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-xl text-black">
                  ▶
                </div>
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-xl font-medium">
                  {video.title}
                </h3>
              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}