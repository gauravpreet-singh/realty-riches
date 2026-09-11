"use client";

import { FormEvent, Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { properties } from "@/data/properties";

export default function ScheduleVisitPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-black text-white">
          <Navbar />
          <section className="pt-36 pb-20">
            <div className="container-custom max-w-4xl">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center text-zinc-400">
                Loading visit scheduler...
              </div>
            </div>
          </section>
          <Footer />
        </main>
      }
    >
      <ScheduleVisitContent />
    </Suspense>
  );
}

function ScheduleVisitContent() {
  const searchParams = useSearchParams();

  const propertyId = searchParams.get("property");

  const property = properties.find(
    (item) => item.id === propertyId
  );

  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    message: "",
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    /*
     * For now this is frontend-only.
     *
     * Later we'll send this to our backend/database
     * and notify Realty Riches.
     */

    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-black text-white">

      <Navbar />

      <section className="pt-36 pb-20">

        <div className="container-custom max-w-4xl">

          {/* Back */}

          <Link
            href={
              property
                ? `/properties/${property.id}`
                : "/properties"
            }
            className="text-sm text-zinc-500 transition hover:text-[#d4af37]"
          >
            ← Back to property
          </Link>

          {/* Header */}

          <div className="mt-10">

            <p className="text-sm uppercase tracking-[0.25em] text-[#d4af37]">
              Realty Riches
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              Schedule a property visit
            </h1>

            <p className="mt-5 max-w-2xl text-zinc-400">
              Choose a convenient time and our team will
              get in touch to confirm your visit.
            </p>

          </div>

          {/* Property */}

          {property && (
            <div className="mt-8 flex gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">

              <img
                src={property.image}
                alt={property.title}
                className="h-24 w-32 rounded-xl object-cover"
              />

              <div>

                <p className="text-sm text-zinc-500">
                  {property.location}
                </p>

                <h2 className="mt-1 font-semibold">
                  {property.title}
                </h2>

                <p className="mt-2 text-[#d4af37]">
                  ₹{formatPrice(property.price)}
                </p>

              </div>

            </div>
          )}

          {/* Success */}

          {submitted ? (

            <div className="mt-10 rounded-2xl border border-[#d4af37]/30 bg-[#d4af37]/5 p-10 text-center">

              <div className="text-4xl">
                ✓
              </div>

              <h2 className="mt-5 text-2xl font-semibold">
                Request received
              </h2>

              <p className="mx-auto mt-3 max-w-md text-zinc-400">
                Thank you. Our team will contact you shortly
                to confirm your property visit.
              </p>

              <Link
                href={
                  property
                    ? `/properties/${property.id}`
                    : "/properties"
                }
                className="mt-7 inline-flex rounded-full bg-[#d4af37] px-6 py-3 font-medium text-black"
              >
                Back to Property
              </Link>

            </div>

          ) : (

            /* Form */

            <form
              onSubmit={handleSubmit}
              className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8"
            >

              <div className="grid gap-6 md:grid-cols-2">

                {/* Name */}

                <div>
                  <label className="text-sm text-zinc-400">
                    Full Name
                  </label>

                  <input
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name: e.target.value,
                      })
                    }
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 outline-none focus:border-[#d4af37]"
                    placeholder="Your name"
                  />
                </div>

                {/* Phone */}

                <div>
                  <label className="text-sm text-zinc-400">
                    Phone Number
                  </label>

                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        phone: e.target.value,
                      })
                    }
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 outline-none focus:border-[#d4af37]"
                    placeholder="+91"
                  />
                </div>

                {/* Email */}

                <div>
                  <label className="text-sm text-zinc-400">
                    Email
                  </label>

                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        email: e.target.value,
                      })
                    }
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 outline-none focus:border-[#d4af37]"
                    placeholder="you@example.com"
                  />
                </div>

                {/* Date */}

                <div>
                  <label className="text-sm text-zinc-400">
                    Preferred Date
                  </label>

                  <input
                    required
                    type="date"
                    value={form.date}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        date: e.target.value,
                      })
                    }
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-[#d4af37]"
                  />
                </div>

                {/* Time */}

                <div>
                  <label className="text-sm text-zinc-400">
                    Preferred Time
                  </label>

                  <select
                    required
                    value={form.time}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        time: e.target.value,
                      })
                    }
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 outline-none focus:border-[#d4af37]"
                  >
                    <option value="">
                      Select time
                    </option>

                    <option value="Morning">
                      Morning
                    </option>

                    <option value="Afternoon">
                      Afternoon
                    </option>

                    <option value="Evening">
                      Evening
                    </option>
                  </select>
                </div>

              </div>

              {/* Message */}

              <div className="mt-6">

                <label className="text-sm text-zinc-400">
                  Message
                </label>

                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      message: e.target.value,
                    })
                  }
                  className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-black px-4 py-3 outline-none focus:border-[#d4af37]"
                  placeholder="Anything you'd like us to know?"
                />

              </div>

              {/* Submit */}

              <button
                type="submit"
                className="mt-7 w-full rounded-xl bg-[#d4af37] px-6 py-4 font-medium text-black transition hover:bg-[#e5c158]"
              >
                Request Property Visit
              </button>

              <p className="mt-4 text-center text-xs text-zinc-600">
                Your information will only be used to
                respond to your property enquiry.
              </p>

            </form>

          )}

        </div>

      </section>

      <Footer />

    </main>
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