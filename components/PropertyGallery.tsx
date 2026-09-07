"use client";

import { useState } from "react";

type PropertyGalleryProps = {
  image: string;
  images?: string[];
  video?: string;
  title: string;
};

type GalleryItem =
  | {
      type: "image";
      src: string;
    }
  | {
      type: "video";
      src: string;
      poster: string;
    };

export default function PropertyGallery({
  image,
  images = [],
  video,
  title,
}: PropertyGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const galleryItems: GalleryItem[] = [
    {
      type: "image",
      src: image,
    },

    ...images
      .filter((src) => src !== image)
      .map((src) => ({
        type: "image" as const,
        src,
      })),

    ...(video
      ? [
          {
            type: "video" as const,
            src: video,
            poster: image,
          },
        ]
      : []),
  ];

  const activeItem = galleryItems[activeIndex];

  const nextImage = () => {
    setActiveIndex(
      (current) => (current + 1) % galleryItems.length
    );
  };

  const previousImage = () => {
    setActiveIndex(
      (current) =>
        (current - 1 + galleryItems.length) %
        galleryItems.length
    );
  };

  return (
    <>
      {/* ================================================= */}
      {/* MAIN GALLERY */}
      {/* ================================================= */}

      <div className="space-y-3">

        {/* Main viewer */}

        <div
          className="group relative aspect-[16/9] cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
          onClick={() => setLightboxOpen(true)}
        >

          {activeItem.type === "image" ? (
            <img
              src={activeItem.src}
              alt={title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.01]"
            />
          ) : (
            <div className="relative h-full w-full">

              <video
                controls
                poster={activeItem.poster}
                className="h-full w-full object-cover"
                onClick={(event) => event.stopPropagation()}
              >
                <source
                  src={activeItem.src}
                  type="video/mp4"
                />
              </video>

            </div>
          )}

          {/* Counter */}

          <div className="absolute left-5 top-5 rounded-full bg-black/75 px-4 py-2 text-xs backdrop-blur">
            {activeIndex + 1} / {galleryItems.length}
          </div>

          {/* Expand */}

          <button
            onClick={(event) => {
              event.stopPropagation();
              setLightboxOpen(true);
            }}
            className="absolute right-5 top-5 rounded-full bg-black/75 px-4 py-2 text-sm backdrop-blur transition hover:bg-black"
            aria-label="Open full screen gallery"
          >
            ⛶
          </button>

          {/* Previous */}

          {galleryItems.length > 1 && (
            <button
              onClick={(event) => {
                event.stopPropagation();
                previousImage();
              }}
              className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 text-xl backdrop-blur transition hover:bg-[#d4af37] hover:text-black"
              aria-label="Previous image"
            >
              ‹
            </button>
          )}

          {/* Next */}

          {galleryItems.length > 1 && (
            <button
              onClick={(event) => {
                event.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 text-xl backdrop-blur transition hover:bg-[#d4af37] hover:text-black"
              aria-label="Next image"
            >
              ›
            </button>
          )}

        </div>

        {/* ================================================= */}
        {/* THUMBNAILS */}
        {/* ================================================= */}

        {galleryItems.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-2">

            {galleryItems.map((item, index) => (

              <button
                key={`${item.type}-${item.src}-${index}`}
                onClick={() => setActiveIndex(index)}
                className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border-2 transition ${
                  activeIndex === index
                    ? "border-[#d4af37]"
                    : "border-white/10 hover:border-white/30"
                }`}
              >

                {item.type === "image" ? (
                  <img
                    src={item.src}
                    alt={`${title} ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <>
                    <video
                      muted
                      preload="metadata"
                      poster={item.poster}
                      className="h-full w-full object-cover"
                    >
                      <source
                        src={item.src}
                        type="video/mp4"
                      />
                    </video>

                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d4af37] text-sm text-black">
                        ▶
                      </span>
                    </div>
                  </>
                )}

              </button>

            ))}

          </div>
        )}

      </div>

      {/* ================================================= */}
      {/* LIGHTBOX */}
      {/* ================================================= */}

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4"
          onClick={() => setLightboxOpen(false)}
        >

          {/* Close */}

          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute right-6 top-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xl transition hover:bg-white/20"
            aria-label="Close gallery"
          >
            ×
          </button>

          {/* Previous */}

          {galleryItems.length > 1 && (
            <button
              onClick={(event) => {
                event.stopPropagation();
                previousImage();
              }}
              className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl transition hover:bg-[#d4af37] hover:text-black md:left-8"
              aria-label="Previous"
            >
              ‹
            </button>
          )}

          {/* Content */}

          <div
            className="relative flex max-h-[90vh] max-w-7xl items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >

            {activeItem.type === "image" ? (
              <img
                src={activeItem.src}
                alt={title}
                className="max-h-[85vh] max-w-full rounded-xl object-contain"
              />
            ) : (
              <video
                controls
                autoPlay
                poster={activeItem.poster}
                className="max-h-[85vh] max-w-full rounded-xl"
              >
                <source
                  src={activeItem.src}
                  type="video/mp4"
                />
              </video>
            )}

          </div>

          {/* Next */}

          {galleryItems.length > 1 && (
            <button
              onClick={(event) => {
                event.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl transition hover:bg-[#d4af37] hover:text-black md:right-8"
              aria-label="Next"
            >
              ›
            </button>
          )}

          {/* Counter */}

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-sm text-zinc-300 backdrop-blur">
            {activeIndex + 1} / {galleryItems.length}
          </div>

        </div>
      )}
    </>
  );
}