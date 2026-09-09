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

type Property = {
  id: string;
  title: string;
  slug: string;
  property_type: string;
  location: string;
  location_slug: string;
  city: string;
  price: number;
  area: number;
  bedrooms: number | null;
  bathrooms: number | null;
  description: string;
  possession: string | null;
  rera_registration_number: string | null;
  status: string;
  featured: boolean;
};

export default function EditPropertyForm({
  property,
}: {
  property: Property;
}) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    title: property.title,
    propertyType: property.property_type,
    location: property.location,
    city: property.city,
    price: String(property.price),
    area: String(property.area),
    bedrooms:
      property.bedrooms !== null
        ? String(property.bedrooms)
        : "",
    bathrooms:
      property.bathrooms !== null
        ? String(property.bathrooms)
        : "",
    description: property.description,
    possession: property.possession ?? "",
    reraRegistrationNumber:
      property.rera_registration_number ?? "",
    status: property.status,
    featured: property.featured,
  });

  function updateField(
    field: keyof typeof form,
    value: string | boolean
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setSuccess("");
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    const supabase = createClient();

    const selectedLocation = locations.find(
      (location) => location.name === form.location
    );

    const { error } = await supabase
      .from("properties")
      .update({
        title: form.title.trim(),
        property_type: form.propertyType,
        location: form.location,
        location_slug:
          selectedLocation?.slug ??
          property.location_slug,
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
        possession:
          form.possession.trim() || null,
        rera_registration_number:
          form.reraRegistrationNumber.trim() || null,
        status: form.status,
        featured: form.featured,
      })
      .eq("id", property.id);

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess("Property updated successfully.");
    setLoading(false);

    router.refresh();
  }

  async function changeStatus(status: string) {
    setLoading(true);
    setError("");
    setSuccess("");

    const supabase = createClient();

    const { error } = await supabase
      .from("properties")
      .update({ status })
      .eq("id", property.id);

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setForm((current) => ({
      ...current,
      status,
    }));

    setSuccess(
      `Property moved to ${status}.`
    );

    setLoading(false);

    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      {/* Status */}
      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold">
              Publishing
            </h2>

            <p className="mt-1 text-sm text-white/40">
              Control whether buyers can see this property.
            </p>
          </div>

          <StatusBadge status={form.status} />
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-5">
          {[
            "draft",
            "published",
            "sold",
            "unavailable",
            "archived",
          ].map((status) => (
            <button
              key={status}
              type="button"
              disabled={loading}
              onClick={() => changeStatus(status)}
              className={`rounded-xl border px-4 py-3 text-sm capitalize transition ${
                form.status === status
                  ? "border-[#d4af37]/60 bg-[#d4af37]/10 text-[#d4af37]"
                  : "border-white/10 text-white/50 hover:border-white/20 hover:text-white"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </section>

      {/* Basic Information */}
      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
        <SectionTitle
          title="Basic Information"
          description="Core information about the property."
        />

        <div className="mt-7 grid gap-5">
          <Field label="Property Title" required>
            <input
              required
              value={form.title}
              onChange={(e) =>
                updateField("title", e.target.value)
              }
              className={inputClass}
            />
          </Field>

          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Property Type" required>
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

            <Field label="Location" required>
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

          <Field label="City" required>
            <input
              required
              value={form.city}
              onChange={(e) =>
                updateField("city", e.target.value)
              }
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
              className={inputClass}
            />
          </Field>
        </div>
      </section>

      {/* Description */}
      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
        <SectionTitle
          title="Description"
          description="Information buyers will see."
        />

        <div className="mt-7">
          <textarea
            required
            rows={8}
            value={form.description}
            onChange={(e) =>
              updateField(
                "description",
                e.target.value
              )
            }
            className={`${inputClass} resize-y`}
          />
        </div>
      </section>

      {/* Additional */}
      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
        <SectionTitle
          title="Additional Details"
          description="Possession, RERA and featured status."
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
              className="h-4 w-4"
            />

            <span className="text-sm text-white/70">
              Feature this property
            </span>
          </label>
        </div>
      </section>

      {/* Feedback */}
      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-400">
          {success}
        </div>
      )}

      {/* Save */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-[#d4af37] px-7 py-3 text-sm font-semibold text-black transition hover:bg-[#e2c45c] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save Changes"}
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

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const styles: Record<string, string> = {
    draft:
      "border-white/10 bg-white/5 text-white/50",
    published:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
    sold:
      "border-blue-500/20 bg-blue-500/10 text-blue-400",
    unavailable:
      "border-orange-500/20 bg-orange-500/10 text-orange-400",
    archived:
      "border-red-500/20 bg-red-500/10 text-red-400",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1.5 text-xs capitalize ${
        styles[status] ?? styles.draft
      }`}
    >
      {status}
    </span>
  );
}

const inputClass =
  "w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#d4af37]/60";

