type PropertyVideosProps = {
  videos: string[];
  title?: string;
};

export default function PropertyVideos({
  videos,
  title = "Property Walkthrough",
}: PropertyVideosProps) {
  if (!videos.length) {
    return null;
  }

  return (
    <section className="section-padding">
      <div className="container-custom">
        <p className="text-sm uppercase tracking-[0.25em] text-[#d4af37]">
          See it before you visit
        </p>

        <h2 className="mt-3 text-4xl font-semibold md:text-5xl">
          {title}
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {videos.map((video, index) => (
            <div
              key={`${video}-${index}`}
              className="overflow-hidden rounded-2xl bg-black"
            >
              <video
                src={video}
                controls
                preload="metadata"
                className="aspect-video w-full object-cover"
              >
                Your browser does not support video playback.
              </video>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

