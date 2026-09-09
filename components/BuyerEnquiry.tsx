"use client";

import { FormEvent, useState } from "react";

type BuyerEnquiryProps = {
  propertyId: string;
  propertyTitle: string;
  propertyLocation: string;
  propertyPrice: number;
};

export default function BuyerEnquiry({
  propertyId,
  propertyTitle,
  propertyLocation,
  propertyPrice,
}: BuyerEnquiryProps) {
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    budget: "",
    bedrooms: "",
    purpose: "",
    preferredLocation: "",
    message: "",
  });

  const updateField = (
    field: keyof typeof form,
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Frontend-only for now.
    // Later this will be replaced with an API request.

    const enquiry = {
      propertyId,
      propertyTitle,
      propertyLocation,
      propertyPrice,
      buyer: form,
      createdAt: new Date().toISOString(),
    };

    console.log("Buyer enquiry:", enquiry);

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-3xl border border-[#d4af37]/20 bg-white/[0.03] p-8 text-center md:p-12">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#d4af37]/10 text-2xl text-[#d4af37]">
          ✓
        </div>

        <h2 className="mt-6 text-2xl font-semibold">
          Enquiry received
        </h2>

        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-zinc-500">
          Thank you for your interest in{" "}
          <span className="text-zinc-300">
            {propertyTitle}
          </span>
          . Our team will get in touch with you shortly.
        </p>

        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-7 text-sm text-[#d4af37] hover:underline"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
      {/* Header */}
      <div className="border-b border-white/10 p-6 md:p-8">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#d4af37]">
          Enquire
        </p>

        <h2 className="mt-2 text-2xl font-semibold md:text-3xl">
          Interested in this property?
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500">
          Tell us a little about what you're looking for and
          our team will help you with the next steps.
        </p>
      </div>

      <div className="grid lg:grid-cols-[0.7fr_1.3fr]">
        {/* Property summary */}
        <div className="border-b border-white/10 bg-black/30 p-6 lg:border-b-0 lg:border-r md:p-8">
          <p className="text-xs uppercase tracking-wider text-zinc-600">
            You're enquiring about
          </p>

          <h3 className="mt-3 text-xl font-semibold text-white">
            {propertyTitle}
          </h3>

          <p className="mt-2 text-sm text-zinc-500">
            {propertyLocation}
          </p>

          <p className="mt-5 text-2xl font-semibold text-[#d4af37]">
            ₹{formatPrice(propertyPrice)}
          </p>

          <div className="my-7 h-px bg-white/10" />

          <div className="space-y-4 text-sm">
            <InfoRow
              label="Property ID"
              value={propertyId}
            />

            <InfoRow
              label="Location"
              value={propertyLocation}
            />
          </div>

          <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <p className="text-xs leading-5 text-zinc-600">
              Your enquiry will be associated with this
              property automatically.
            </p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 md:p-8"
        >
          <div className="grid gap-5 md:grid-cols-2">
            {/* Name */}
            <Field
              label="Full Name"
              required
            >
              <input
                required
                value={form.name}
                onChange={(e) =>
                  updateField("name", e.target.value)
                }
                placeholder="Your name"
                className="h-12 w-full rounded-xl border border-white/10 bg-black px-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-[#d4af37]/60"
              />
            </Field>

            {/* Phone */}
            <Field
              label="Phone Number"
              required
            >
              <input
                required
                type="tel"
                value={form.phone}
                onChange={(e) =>
                  updateField("phone", e.target.value)
                }
                placeholder="+91 98765 43210"
                className="h-12 w-full rounded-xl border border-white/10 bg-black px-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-[#d4af37]/60"
              />
            </Field>

            {/* Email */}
            <Field label="Email Address">
              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  updateField("email", e.target.value)
                }
                placeholder="you@example.com"
               className="h-12 w-full rounded-xl border border-white/10 bg-black px-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-[#d4af37]/60"
              />
            </Field>

            {/* Budget */}
            <Field label="Budget">
              <select
                value={form.budget}
                onChange={(e) =>
                  updateField("budget", e.target.value)
                }
                className="h-12 w-full rounded-xl border border-white/10 bg-black px-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-[#d4af37]/60"
              >
                <option value="">Select budget</option>
                <option value="Under ₹75 Lakh">
                  Under ₹75 Lakh
                </option>
                <option value="₹75 Lakh – ₹1 Crore">
                  ₹75 Lakh – ₹1 Crore
                </option>
                <option value="₹1 – ₹1.5 Crore">
                  ₹1 – ₹1.5 Crore
                </option>
                <option value="₹1.5 – ₹2 Crore">
                  ₹1.5 – ₹2 Crore
                </option>
                <option value="₹2 Crore+">
                  ₹2 Crore+
                </option>
              </select>
            </Field>

            {/* Bedrooms */}
            <Field label="Preferred BHK">
              <select
                value={form.bedrooms}
                onChange={(e) =>
                  updateField("bedrooms", e.target.value)
                }
                className="h-12 w-full rounded-xl border border-white/10 bg-black px-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-[#d4af37]/60"
              >
                <option value="">Select BHK</option>
                <option value="1 BHK">1 BHK</option>
                <option value="2 BHK">2 BHK</option>
                <option value="3 BHK">3 BHK</option>
                <option value="4 BHK">4 BHK</option>
                <option value="5+ BHK">5+ BHK</option>
              </select>
            </Field>

            {/* Purpose */}
            <Field label="Purpose">
              <select
                value={form.purpose}
                onChange={(e) =>
                  updateField("purpose", e.target.value)
                }
                className="h-12 w-full rounded-xl border border-white/10 bg-black px-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-[#d4af37]/60"
              >
                <option value="">Select purpose</option>
                <option value="Self Use">
                  Self Use
                </option>
                <option value="Investment">
                  Investment
                </option>
                <option value="Second Home">
                  Second Home
                </option>
              </select>
            </Field>

            {/* Preferred Location */}
            <div className="md:col-span-2">
              <Field label="Preferred Location">
                <input
                  value={form.preferredLocation}
                  onChange={(e) =>
                    updateField(
                      "preferredLocation",
                      e.target.value
                    )
                  }
                  placeholder="e.g. Mohali, New Chandigarh"
                  className="h-12 w-full rounded-xl border border-white/10 bg-black px-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-[#d4af37]/60"
                />
              </Field>
            </div>

            {/* Message */}
            <div className="md:col-span-2">
              <Field label="Message">
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) =>
                    updateField("message", e.target.value)
                  }
                  placeholder="Tell us what you'd like to know..."
                  className="h-12 w-full rounded-xl border border-white/10 bg-black px-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-[#d4af37]/60 resize-none py-3"
                />
              </Field>
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-5 text-zinc-600">
              By submitting this form, you agree to be
              contacted by Realty Riches regarding this
              enquiry.
            </p>

            <button
              type="submit"
              className="shrink-0 rounded-xl bg-[#d4af37] px-7 py-3.5 text-sm font-medium text-black transition hover:bg-[#e5c158]"
            >
              Send Enquiry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-zinc-300">
        {label}

        {required && (
          <span className="ml-1 text-[#d4af37]">*</span>
        )}
      </label>

      {children}
    </div>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-zinc-600">
        {label}
      </span>

      <span className="text-right text-zinc-300">
        {value}
      </span>
    </div>
  );
}

function formatPrice(price: number) {
  if (price >= 10000000) {
    return `${(price / 10000000).toFixed(2)} Cr`;
  }

  if (price >= 100000) {
    return `${(price / 100000).toFixed(2)} Lakh`;
  }

  return price.toLocaleString("en-IN");
}

