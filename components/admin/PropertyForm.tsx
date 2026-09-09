"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const locations = [
  { slug: "new-chandigarh", name: "New Chandigarh" },
  { slug: "kharar", name: "Kharar" },
  { slug: "mohali", name: "Mohali" },
  { slug: "zirakpur", name: "Zirakpur" },
  { slug: "chandigarh", name: "Chandigarh" },
  { slug: "airport-road", name: "Airport Road" },
  { slug: "aerocity", name: "Aerocity" },
  { slug: "sector-115", name: "Sector 115" },
];

export default function PropertyForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    propertyType: "Apartment",
    location: "",
    city: "",
    price: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    description: "",
    possession: "",
    reraRegistrationNumber: "",
    featured: false,
  });

  function updateField(
    field: keyof typeof form,
    value: string | boolean
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function generateSlug(title: string) {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const supabase = createClient();

    const slug = generateSlug(form.title);

    const { data, error } = await supabase
      .from("properties")
      .insert({
        title: form.title.trim(),
        slug,
        property_type: form.propertyType,
        location: form.location,
        location_slug: locations.find(
          (location) => location.name === form.location
        )?.slug ?? "",
        city: form.city.trim(),
        price: Number(form.price),
        area: Number(form.area),
        bedrooms: form.bedrooms
          ? Number(form.bedrooms)
          : null,
        bathrooms: form.bathrooms
          ? Number(form.bathrooms)
          : null,
        description: form.description.trim(),
        possession: form.possession.trim() || null,
        rera_registration_number:
          form.reraRegistrationNumber.trim() || null,
        featured: form.featured,
        status: "draft",
      })
      .select("id")
      .single();

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push(`/admin/properties/${data.id}/edit`);
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      {/* Basic Information */}
      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
        <SectionTitle
          title="Basic Information"
          description="Core information about the property."
        />

        <div className="mt-7 grid gap-5">
          <Field
            label="Property Title"
            required
          >
            <input
              required
              value={form.title}
              onChange={(e) =>
                updateField("title", e.target.value)
              }
              placeholder="Premium 3 BHK Apartment"
              className={inputClass}
            />
          </Field>

          <div className="grid gap-5 md:grid-cols-2">
            <Field
              label="Property Type"
              required
            >
              <select
                value={form.propertyType}
                onChange={(e) =>
                  updateField(
                    "propertyType",
                    e.target.value
                  )
                }
                className={inputClass}
              >
                <option>Apartment</option>
                <option>Villa</option>
                <option>Plot</option>
              </select>
            </Field>

            <Field
              label="Location"
              required
            >
              <select
                required
                value={form.location}
                onChange={(e) => {
                  const selected = locations.find(
                    (location) =>
                      location.name === e.target.value
                  );

                  updateField(
                    "location",
                    e.target.value
                  );

                  if (selected) {
                    updateField(
                      "city",
                      selected.name
                    );
                  }
                }}
                className={inputClass}
              >
                <option value="">
                  Select location
                </option>

                {locations.map((location) => (
                  <option
                    key={location.slug}
                    value={location.name}
                  >
                    {location.name}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field
            label="City"
            required
          >
            <input
              required
              value={form.city}
              onChange={(e) =>
                updateField("city", e.target.value)
              }
              placeholder="Mohali"
              className={inputClass}
            />
          </Field>
        </div>
      </section>

      {/* Pricing */}
      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
        <SectionTitle
          title="Pricing & Size"
          description="Financial and physical details."
        />

        <div className="mt-7 grid gap-5 md:grid-cols-2">
          <Field label="Price (₹)" required>
            <input
              required
              type="number"
              min="0"
              value={form.price}
              onChange={(e) =>
                updateField("price", e.target.value)
              }
              placeholder="9500000"
              className={inputClass}
            />
          </Field>

          <Field label="Area (sq.ft)" required>
            <input
              required
              type="number"
              min="1"
              value={form.area}
              onChange={(e) =>
                updateField("area", e.target.value)
              }
              placeholder="1525"
              className={inputClass}
            />
          </Field>

          <Field label="Bedrooms">
            <input
              type="number"
              min="0"
              value={form.bedrooms}
              onChange={(e) =>
                updateField(
                  "bedrooms",
                  e.target.value
                )
              }
              placeholder="3"
              className={inputClass}
            />
          </Field>

          <Field label="Bathrooms">
            <input
              type="number"
              min="0"
              value={form.bathrooms}
              onChange={(e) =>
                updateField(
                  "bathrooms",
                  e.target.value
                )
              }
              placeholder="3"
              className={inputClass}
            />
          </Field>
        </div>
      </section>

      {/* Description */}
      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
        <SectionTitle
          title="Description"
          description="Describe the property for buyers."
        />

        <div className="mt-7">
          <textarea
            required
            rows={7}
            value={form.description}
            onChange={(e) =>
              updateField(
                "description",
                e.target.value
              )
            }
            placeholder="Describe the property, its layout, connectivity, surroundings and key advantages..."
            className={`${inputClass} resize-y`}
          />
        </div>
      </section>

      {/* Additional */}
      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
        <SectionTitle
          title="Additional Details"
          description="Possession, RERA and publishing options."
        />

        <div className="mt-7 space-y-5">
          <Field label="Possession">
            <input
              value={form.possession}
              onChange={(e) =>
                updateField(
                  "possession",
                  e.target.value
                )
              }
              placeholder="May 2027"
              className={inputClass}
            />
          </Field>

          <Field label="RERA Registration Number">
            <input
              value={form.reraRegistrationNumber}
              onChange={(e) =>
                updateField(
                  "reraRegistrationNumber",
                  e.target.value
                )
              }
              placeholder="PBRERA-SAS81-PR0000"
              className={inputClass}
            />
          </Field>

          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) =>
                updateField(
                  "featured",
                  e.target.checked
                )
              }
              className="h-4 w-4 rounded"
            />

            <span className="text-sm text-white/70">
              Feature this property
            </span>
          </label>
        </div>
      </section>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() =>
            router.push("/admin/properties")
          }
          className="rounded-xl border border-white/10 px-6 py-3 text-sm text-white/70 transition hover:border-white/20 hover:text-white"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-[#d4af37] px-7 py-3 text-sm font-semibold text-black transition hover:bg-[#e2c45c] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create Property"}
        </button>
      </div>
    </form>
  );
}

function SectionTitle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h2 className="text-lg font-semibold">
        {title}
      </h2>

      <p className="mt-1 text-sm text-white/40">
        {description}
      </p>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-white/70">
        {label}
        {required && (
          <span className="ml-1 text-[#d4af37]">
            *
          </span>
        )}
      </label>

      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#d4af37]/60";

