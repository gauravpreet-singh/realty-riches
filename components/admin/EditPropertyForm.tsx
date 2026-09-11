"use client";

import { FormEvent, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowUpDown,
  Baby,
  Building2,
  Camera,
  Car,
  Dumbbell,
  Footprints,
  Lightbulb,
  LucideIcon,
  ShieldCheck,
  Sparkles,
  TreePine,
  Trees,
  Waves,
  X,
  Zap,
} from "lucide-react";
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

type Amenity = {
  id?: string;
  amenity: string;
  icon: string;
};

const amenityIcons: { name: string; label: string; icon: LucideIcon }[] = [
  { name: "waves", label: "Swimming Pool", icon: Waves },
  { name: "dumbbell", label: "Gym", icon: Dumbbell },
  { name: "car", label: "Parking", icon: Car },
  { name: "trees", label: "Garden", icon: Trees },
  { name: "tree-pine", label: "Park", icon: TreePine },
  { name: "building-2", label: "Club House", icon: Building2 },
  { name: "shield-check", label: "Security", icon: ShieldCheck },
  { name: "camera", label: "CCTV", icon: Camera },
  { name: "zap", label: "Power Backup", icon: Zap },
  { name: "arrow-up-down", label: "Lift", icon: ArrowUpDown },
  { name: "baby", label: "Kids Play Area", icon: Baby },
  { name: "footprints", label: "Jogging Track", icon: Footprints },
  { name: "lightbulb", label: "Street Lighting", icon: Lightbulb },
  { name: "sparkles", label: "Other", icon: Sparkles },
];

const defaultIconForAmenity = (amenity: string) => {
  const value = amenity.toLowerCase();

  if (value.includes("pool")) return "waves";
  if (value.includes("gym")) return "dumbbell";
  if (value.includes("park") || value.includes("garden")) return "trees";
  if (value.includes("parking")) return "car";
  if (value.includes("security")) return "shield-check";
  if (value.includes("cctv") || value.includes("camera")) return "camera";
  if (value.includes("backup")) return "zap";
  if (value.includes("lift") || value.includes("elevator")) return "arrow-up-down";
  if (value.includes("kid") || value.includes("play area")) return "baby";
  if (value.includes("jog")) return "footprints";
  if (value.includes("club")) return "building-2";

  return "sparkles";
};

function getAmenityIcon(name: string): LucideIcon {
  return amenityIcons.find((item) => item.name === name)?.icon ?? Sparkles;
}

export default function EditPropertyForm({
  property,
}: {
  property: Property;
}) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [amenitiesLoading, setAmenitiesLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [newAmenity, setNewAmenity] = useState("");
  const [newAmenityIcon, setNewAmenityIcon] = useState("sparkles");

  const [form, setForm] = useState({
    title: property.title,
    propertyType: property.property_type,
    location: property.location,
    city: property.city,
    price: String(property.price),
    area: String(property.area),
    bedrooms: property.bedrooms !== null ? String(property.bedrooms) : "",
    bathrooms: property.bathrooms !== null ? String(property.bathrooms) : "",
    description: property.description,
    possession: property.possession ?? "",
    reraRegistrationNumber: property.rera_registration_number ?? "",
    status: property.status,
    featured: property.featured,
  });

  useEffect(() => {
    async function loadAmenities() {
      setAmenitiesLoading(true);

      const supabase = createClient();
      const { data, error } = await supabase
        .from("property_amenities")
        .select("id, amenity, icon")
        .eq("property_id", property.id)
        .order("id");

      if (error) {
        setError(`Unable to load amenities: ${error.message}`);
        setAmenitiesLoading(false);
        return;
      }

      setAmenities(
        (data ?? []).map((item) => ({
          id: item.id,
          amenity: item.amenity,
          icon: item.icon || defaultIconForAmenity(item.amenity),
        }))
      );
      setAmenitiesLoading(false);
    }

    loadAmenities();
  }, [property.id]);

  function updateField(field: keyof typeof form, value: string | boolean) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setSuccess("");
  }

  function addAmenity() {
    const value = newAmenity.trim();
    if (!value) return;

    setAmenities((current) => [
      ...current,
      {
        amenity: value,
        icon: newAmenityIcon,
      },
    ]);

    setNewAmenity("");
    setNewAmenityIcon("sparkles");
    setShowIconPicker(false);
    setSuccess("");
  }

  function removeAmenity(index: number) {
    setAmenities((current) => current.filter((_, itemIndex) => itemIndex !== index));
    setSuccess("");
  }

  function updateAmenity(index: number, field: keyof Amenity, value: string) {
    setAmenities((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item
      )
    );
    setSuccess("");
  }

  async function saveAmenities(supabase: ReturnType<typeof createClient>) {
    const { error: deleteError } = await supabase
      .from("property_amenities")
      .delete()
      .eq("property_id", property.id);

    if (deleteError) throw deleteError;

    if (amenities.length === 0) return;

    const rows = amenities
      .map((item) => ({
        property_id: property.id,
        amenity: item.amenity.trim(),
        icon: item.icon,
      }))
      .filter((item) => item.amenity.length > 0);

    if (rows.length === 0) return;

    const { error: insertError } = await supabase
      .from("property_amenities")
      .insert(rows);

    if (insertError) throw insertError;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
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
        location_slug: selectedLocation?.slug ?? property.location_slug,
        city: form.city.trim(),
        price: Number(form.price),
        area: Number(form.area),
        bedrooms: form.bedrooms ? Number(form.bedrooms) : null,
        bathrooms: form.bathrooms ? Number(form.bathrooms) : null,
        description: form.description.trim(),
        possession: form.possession.trim() || null,
        rera_registration_number: form.reraRegistrationNumber.trim() || null,
        status: form.status,
        featured: form.featured,
      })
      .eq("id", property.id);

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    try {
      await saveAmenities(supabase);
    } catch (amenityError) {
      setError(
        amenityError instanceof Error
          ? `Property saved, but amenities could not be saved: ${amenityError.message}`
          : "Property saved, but amenities could not be saved."
      );
      setLoading(false);
      return;
    }

    setSuccess("Property and amenities updated successfully.");
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

    setSuccess(`Property moved to ${status}.`);
    setLoading(false);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Status */}
      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold">Publishing</h2>
            <p className="mt-1 text-sm text-white/40">
              Control whether buyers can see this property.
            </p>
          </div>
          <StatusBadge status={form.status} />
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-5">
          {["draft", "published", "sold", "unavailable", "archived"].map(
            (status) => (
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
            )
          )}
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
              onChange={(e) => updateField("title", e.target.value)}
              className={inputClass}
            />
          </Field>

          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Property Type" required>
              <select
                value={form.propertyType}
                onChange={(e) => updateField("propertyType", e.target.value)}
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
                    (location) => location.name === e.target.value
                  );

                  updateField("location", e.target.value);

                  if (selected) {
                    updateField("city", selected.name);
                  }
                }}
                className={inputClass}
              >
                <option value="">Select location</option>
                {locations.map((location) => (
                  <option key={location.slug} value={location.name}>
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
              onChange={(e) => updateField("city", e.target.value)}
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
              onChange={(e) => updateField("price", e.target.value)}
              className={inputClass}
            />
          </Field>

          <Field label="Area (sq.ft)" required>
            <input
              required
              type="number"
              min="1"
              value={form.area}
              onChange={(e) => updateField("area", e.target.value)}
              className={inputClass}
            />
          </Field>

          <Field label="Bedrooms">
            <input
              type="number"
              min="0"
              value={form.bedrooms}
              onChange={(e) => updateField("bedrooms", e.target.value)}
              className={inputClass}
            />
          </Field>

          <Field label="Bathrooms">
            <input
              type="number"
              min="0"
              value={form.bathrooms}
              onChange={(e) => updateField("bathrooms", e.target.value)}
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
            onChange={(e) => updateField("description", e.target.value)}
            className={`${inputClass} resize-y`}
          />
        </div>
      </section>

      {/* Amenities */}
      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
        <SectionTitle
          title="Amenities"
          description="Add buyer-facing amenities and choose an icon for each one."
        />

        <div className="mt-7 space-y-4">
          {amenitiesLoading ? (
            <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-5 text-sm text-white/40">
              Loading amenities...
            </div>
          ) : amenities.length === 0 ? (
            <div className="rounded-xl border border-dashed border-white/10 bg-black/20 px-4 py-8 text-center text-sm text-white/35">
              No amenities added yet.
            </div>
          ) : (
            amenities.map((item, index) => {
              const Icon = getAmenityIcon(item.icon);

              return (
                <div
                  key={`${item.id ?? "new"}-${index}`}
                  className="rounded-xl border border-white/10 bg-black/20 p-4"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#d4af37]/20 bg-[#d4af37]/10 text-[#d4af37]">
                      <Icon size={19} strokeWidth={1.7} />
                    </div>

                    <input
                      value={item.amenity}
                      onChange={(e) =>
                        updateAmenity(index, "amenity", e.target.value)
                      }
                      className={`${inputClass} flex-1`}
                      placeholder="Amenity name"
                    />

                    <select
                      value={item.icon}
                      onChange={(e) =>
                        updateAmenity(index, "icon", e.target.value)
                      }
                      className={`${inputClass} sm:w-48`}
                      aria-label={`Icon for ${item.amenity || "amenity"}`}
                    >
                      {amenityIcons.map((option) => (
                        <option key={option.name} value={option.name}>
                          {option.label}
                        </option>
                      ))}
                    </select>

                    <button
                      type="button"
                      onClick={() => removeAmenity(index)}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-500/20 text-red-400 transition hover:border-red-500/40 hover:bg-red-500/10"
                      aria-label={`Remove ${item.amenity}`}
                    >
                      <X size={17} />
                    </button>
                  </div>
                </div>
              );
            })
          )}

          <div className="rounded-xl border border-white/10 bg-black/20 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/50">
                {(() => {
                  const Icon = getAmenityIcon(newAmenityIcon);
                  return <Icon size={19} strokeWidth={1.7} />;
                })()}
              </div>

              <input
                value={newAmenity}
                onChange={(e) => setNewAmenity(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addAmenity();
                  }
                }}
                className={`${inputClass} flex-1`}
                placeholder="e.g. Swimming Pool"
              />

              <button
                type="button"
                onClick={() => setShowIconPicker((current) => !current)}
                className="rounded-xl border border-white/10 px-4 py-3 text-sm text-white/70 transition hover:border-[#d4af37]/40 hover:text-[#d4af37]"
              >
                Choose Icon
              </button>

              <button
                type="button"
                onClick={addAmenity}
                disabled={!newAmenity.trim()}
                className="rounded-xl bg-[#d4af37] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#e2c45c] disabled:cursor-not-allowed disabled:opacity-40"
              >
                + Add Amenity
              </button>
            </div>

            {showIconPicker && (
              <div className="mt-4 grid grid-cols-2 gap-2 border-t border-white/10 pt-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {amenityIcons.map((option) => {
                  const Icon = option.icon;
                  const selected = newAmenityIcon === option.name;

                  return (
                    <button
                      key={option.name}
                      type="button"
                      onClick={() => {
                        setNewAmenityIcon(option.name);
                        setShowIconPicker(false);
                      }}
                      className={`flex items-center gap-2 rounded-xl border px-3 py-3 text-left text-xs transition ${
                        selected
                          ? "border-[#d4af37]/60 bg-[#d4af37]/10 text-[#d4af37]"
                          : "border-white/10 text-white/50 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      <Icon size={16} />
                      <span>{option.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
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
              onChange={(e) => updateField("possession", e.target.value)}
              placeholder="May 2027"
              className={inputClass}
            />
          </Field>

          <Field label="RERA Registration Number">
            <input
              value={form.reraRegistrationNumber}
              onChange={(e) =>
                updateField("reraRegistrationNumber", e.target.value)
              }
              placeholder="PBRERA-SAS81-PR0000"
              className={inputClass}
            />
          </Field>

          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => updateField("featured", e.target.checked)}
              className="h-4 w-4"
            />
            <span className="text-sm text-white/70">Feature this property</span>
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
          disabled={loading || amenitiesLoading}
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
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-1 text-sm text-white/40">{description}</p>
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
  children: ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-white/70">
        {label}
        {required && <span className="ml-1 text-[#d4af37]">*</span>}
      </label>
      {children}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    draft: "border-white/10 bg-white/5 text-white/50",
    published: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
    sold: "border-blue-500/20 bg-blue-500/10 text-blue-400",
    unavailable: "border-orange-500/20 bg-orange-500/10 text-orange-400",
    archived: "border-red-500/20 bg-red-500/10 text-red-400",
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
