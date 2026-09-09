"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type PropertyImage = {
  id: string;
  property_id: string;
  storage_path: string;
  public_url: string | null;
  display_order: number;
  is_cover: boolean;
};

type PropertyVideo = {
  id: string;
  property_id: string;
  storage_path: string;
  public_url: string | null;
};

type Props = {
  propertyId: string;
};

export default function PropertyMediaManager({ propertyId }: Props) {
  const supabase = createClient();

  const [images, setImages] = useState<PropertyImage[]>([]);
  const [video, setVideo] = useState<PropertyVideo | null>(null);

  const [loading, setLoading] = useState(true);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadMedia();
  }, [propertyId]);

  async function loadMedia() {
    setLoading(true);
    setMessage("");

    const [{ data: imageData, error: imageError }, { data: videoData }] =
      await Promise.all([
        supabase
          .from("property_images")
          .select("*")
          .eq("property_id", propertyId)
          .order("display_order", { ascending: true }),

        supabase
          .from("property_videos")
          .select("*")
          .eq("property_id", propertyId)
          .order("created_at", { ascending: false })
          .limit(1),
      ]);

    if (imageError) {
      setMessage(imageError.message);
    } else {
      setImages(imageData ?? []);
    }

    setVideo(videoData?.[0] ?? null);
    setLoading(false);
  }

  async function handleImageUpload(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const files = Array.from(event.target.files ?? []);

    if (!files.length) return;

    setUploadingImages(true);
    setMessage("");

    try {
      const startOrder = images.length;

      for (let index = 0; index < files.length; index++) {
        const file = files[index];

        if (!file.type.startsWith("image/")) {
          throw new Error(`${file.name} is not a supported image.`);
        }

        if (file.size > 10 * 1024 * 1024) {
          throw new Error(`${file.name} is larger than 10 MB.`);
        }

        const extension =
          file.name.split(".").pop()?.toLowerCase() || "jpg";

        const storagePath =
          `${propertyId}/${crypto.randomUUID()}.${extension}`;

        const { error: uploadError } = await supabase.storage
          .from("property-images")
          .upload(storagePath, file, {
            cacheControl: "3600",
            upsert: false,
            contentType: file.type,
          });

        if (uploadError) {
          throw uploadError;
        }

        const {
          data: { publicUrl },
        } = supabase.storage
          .from("property-images")
          .getPublicUrl(storagePath);

        const { error: dbError } = await supabase
          .from("property_images")
          .insert({
            property_id: propertyId,
            storage_path: storagePath,
            public_url: publicUrl,
            display_order: startOrder + index,
            is_cover: images.length === 0 && index === 0,
          });

        if (dbError) {
          // Clean up the uploaded file if DB insert fails.
          await supabase.storage
            .from("property-images")
            .remove([storagePath]);

          throw dbError;
        }
      }

      setMessage("Images uploaded successfully.");
      await loadMedia();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to upload images."
      );
    } finally {
      setUploadingImages(false);

      // Allow selecting the same files again.
      event.target.value = "";
    }
  }

  async function deleteImage(image: PropertyImage) {
    const confirmed = window.confirm(
      "Delete this image permanently?"
    );

    if (!confirmed) return;

    setMessage("");

    const { error: storageError } = await supabase.storage
      .from("property-images")
      .remove([image.storage_path]);

    if (storageError) {
      setMessage(storageError.message);
      return;
    }

    const { error: dbError } = await supabase
      .from("property_images")
      .delete()
      .eq("id", image.id);

    if (dbError) {
      setMessage(dbError.message);
      return;
    }

    // If deleted image was cover, make first remaining image cover.
    if (image.is_cover) {
      const remaining = images
        .filter((item) => item.id !== image.id)
        .sort((a, b) => a.display_order - b.display_order);

      if (remaining.length > 0) {
        await supabase
          .from("property_images")
          .update({ is_cover: true })
          .eq("id", remaining[0].id);
      }
    }

    setMessage("Image deleted.");
    await loadMedia();
  }

  async function setCoverImage(imageId: string) {
    setMessage("");

    const { error: resetError } = await supabase
      .from("property_images")
      .update({ is_cover: false })
      .eq("property_id", propertyId);

    if (resetError) {
      setMessage(resetError.message);
      return;
    }

    const { error } = await supabase
      .from("property_images")
      .update({ is_cover: true })
      .eq("id", imageId);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Cover image updated.");
    await loadMedia();
  }

  async function moveImage(
    imageId: string,
    direction: "left" | "right"
  ) {
    const sorted = [...images].sort(
      (a, b) => a.display_order - b.display_order
    );

    const currentIndex = sorted.findIndex(
      (image) => image.id === imageId
    );

    if (currentIndex === -1) return;

    const targetIndex =
      direction === "left"
        ? currentIndex - 1
        : currentIndex + 1;

    if (
      targetIndex < 0 ||
      targetIndex >= sorted.length
    ) {
      return;
    }

    const current = sorted[currentIndex];
    const target = sorted[targetIndex];

    const { error } = await supabase
      .from("property_images")
      .update({
        display_order: target.display_order,
      })
      .eq("id", current.id);

    if (error) {
      setMessage(error.message);
      return;
    }

    const { error: targetError } = await supabase
      .from("property_images")
      .update({
        display_order: current.display_order,
      })
      .eq("id", target.id);

    if (targetError) {
      setMessage(targetError.message);
      return;
    }

    await loadMedia();
  }

  async function handleVideoUpload(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    setUploadingVideo(true);
    setMessage("");

    try {
      if (!file.type.startsWith("video/")) {
        throw new Error("Please select a valid video file.");
      }

      if (file.size > 100 * 1024 * 1024) {
        throw new Error("Video must be smaller than 100 MB.");
      }

      // Remove previous video first.
      if (video) {
        await supabase.storage
          .from("property-videos")
          .remove([video.storage_path]);

        await supabase
          .from("property_videos")
          .delete()
          .eq("id", video.id);
      }

      const extension =
        file.name.split(".").pop()?.toLowerCase() || "mp4";

      const storagePath =
        `${propertyId}/${crypto.randomUUID()}.${extension}`;

      const { error: uploadError } = await supabase.storage
        .from("property-videos")
        .upload(storagePath, file, {
          cacheControl: "3600",
          upsert: false,
          contentType: file.type,
        });

      if (uploadError) {
        throw uploadError;
      }

      const {
        data: { publicUrl },
      } = supabase.storage
        .from("property-videos")
        .getPublicUrl(storagePath);

      const { error: dbError } = await supabase
        .from("property_videos")
        .insert({
          property_id: propertyId,
          storage_path: storagePath,
          public_url: publicUrl,
        });

      if (dbError) {
        await supabase.storage
          .from("property-videos")
          .remove([storagePath]);

        throw dbError;
      }

      setMessage("Video uploaded successfully.");
      await loadMedia();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to upload video."
      );
    } finally {
      setUploadingVideo(false);
      event.target.value = "";
    }
  }

  async function deleteVideo() {
    if (!video) return;

    const confirmed = window.confirm(
      "Delete this property video permanently?"
    );

    if (!confirmed) return;

    setMessage("");

    const { error: storageError } = await supabase.storage
      .from("property-videos")
      .remove([video.storage_path]);

    if (storageError) {
      setMessage(storageError.message);
      return;
    }

    const { error: dbError } = await supabase
      .from("property_videos")
      .delete()
      .eq("id", video.id);

    if (dbError) {
      setMessage(dbError.message);
      return;
    }

    setVideo(null);
    setMessage("Video deleted.");
  }

  if (loading) {
    return (
      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <p className="text-sm text-white/50">
          Loading property media...
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <div>
        <h2 className="text-xl font-semibold text-white">
          Property Media
        </h2>

        <p className="mt-1 text-sm text-white/50">
          Upload photos and a walkthrough video for this property.
        </p>
      </div>

      {message && (
        <div className="rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/70">
          {message}
        </div>
      )}

      {/* Images */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="font-medium text-white">
              Property Images
            </h3>

            <p className="text-xs text-white/40">
              The cover image appears first on property cards.
            </p>
          </div>

          <label className="cursor-pointer rounded-lg bg-[#c9a45c] px-4 py-2 text-sm font-medium text-black transition hover:bg-[#d8b875]">
            {uploadingImages ? "Uploading..." : "Upload Images"}

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              multiple
              className="hidden"
              onChange={handleImageUpload}
              disabled={uploadingImages}
            />
          </label>
        </div>

        {images.length === 0 ? (
          <div className="rounded-xl border border-dashed border-white/15 px-6 py-12 text-center">
            <p className="text-sm text-white/40">
              No images uploaded yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {images.map((image, index) => (
              <div
                key={image.id}
                className="group overflow-hidden rounded-xl border border-white/10 bg-black/30"
              >
                <div className="relative aspect-[4/3]">
                  {image.public_url ? (
                    <img
                      src={image.public_url}
                      alt={`Property image ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-white/30">
                      Image unavailable
                    </div>
                  )}

                  {image.is_cover && (
                    <span className="absolute left-2 top-2 rounded-full bg-[#c9a45c] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-black">
                      Cover
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={() => deleteImage(image)}
                    className="absolute right-2 top-2 rounded-full bg-black/70 px-2 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100 hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>

                <div className="flex items-center justify-between gap-2 p-2">
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() =>
                        moveImage(image.id, "left")
                      }
                      disabled={index === 0}
                      className="rounded bg-white/5 px-2 py-1 text-xs text-white/60 disabled:opacity-20"
                    >
                      ←
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        moveImage(image.id, "right")
                      }
                      disabled={index === images.length - 1}
                      className="rounded bg-white/5 px-2 py-1 text-xs text-white/60 disabled:opacity-20"
                    >
                      →
                    </button>
                  </div>

                  {!image.is_cover && (
                    <button
                      type="button"
                      onClick={() =>
                        setCoverImage(image.id)
                      }
                      className="text-xs text-[#c9a45c] hover:underline"
                    >
                      Make cover
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Video */}
      <div className="border-t border-white/10 pt-8">
        <div className="mb-4">
          <h3 className="font-medium text-white">
            Walkthrough Video
          </h3>

          <p className="mt-1 text-xs text-white/40">
            Upload one primary walkthrough video. Uploading a new
            video replaces the existing one.
          </p>
        </div>

        {video?.public_url ? (
          <div className="max-w-3xl overflow-hidden rounded-xl border border-white/10 bg-black">
            <video
              src={video.public_url}
              controls
              className="w-full"
            />

            <div className="flex items-center justify-between border-t border-white/10 p-3">
              <span className="text-xs text-emerald-400">
                Video uploaded
              </span>

              <button
                type="button"
                onClick={deleteVideo}
                className="text-xs text-red-400 hover:underline"
              >
                Delete video
              </button>
            </div>
          </div>
        ) : (
          <label className="inline-flex cursor-pointer rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10">
            {uploadingVideo
              ? "Uploading video..."
              : "Upload Walkthrough Video"}

            <input
              type="file"
              accept="video/mp4,video/webm,video/quicktime"
              className="hidden"
              onChange={handleVideoUpload}
              disabled={uploadingVideo}
            />
          </label>
        )}
      </div>
    </section>
  );
}

