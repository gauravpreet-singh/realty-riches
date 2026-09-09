"use client";

import { FormEvent, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type VerificationResult = {
  found: boolean;
  project?: {
    projectName: string;
    registrationNumber: string;
    promoterName: string;
    district: string;
    projectType: string;
    projectLocation: string;
  };
  message?: string;
};

export default function ReraVerificationPage() {
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [loading, setLoading] = useState(false);

  const verifyRera = async (event: FormEvent) => {
    event.preventDefault();

    const value = registrationNumber.trim();

    if (!value) {
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(
        `/api/rera/verify?registrationNumber=${encodeURIComponent(value)}`
      );

      const data = await response.json();

      setResult(data);
    } catch {
      setResult({
        found: false,
        message:
          "We couldn't complete the verification. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="border-b border-white/10 pt-36 pb-20">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm uppercase tracking-[0.25em] text-[#d4af37]">
              Buyer Verification Centre
            </p>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">
              Verify a{" "}
              <span className="gold-text">RERA registration.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
              Enter a Punjab RERA registration number and check the
              registration details against the official RERA records.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-2xl">
            <form
              onSubmit={verifyRera}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-6"
            >
              <label
                htmlFor="rera-number"
                className="mb-3 block text-sm font-medium"
              >
                RERA Registration Number
              </label>

              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id="rera-number"
                  value={registrationNumber}
                  onChange={(event) =>
                    setRegistrationNumber(event.target.value)
                  }
                  placeholder="e.g. PBRERA-SAS81-PR0735"
                  className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-[#d4af37]"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-xl bg-[#d4af37] px-6 py-3.5 text-sm font-medium text-black transition hover:bg-[#e5c158] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? "Verifying..." : "Verify Now"}
                </button>
              </div>

              <p className="mt-3 text-xs leading-5 text-zinc-600">
                Verification is based on publicly available Punjab RERA
                registration information.
              </p>
            </form>
          </div>
        </div>
      </section>

      {result && (
        <section className="section-padding">
          <div className="container-custom">
            <div className="mx-auto max-w-3xl">
              {result.found && result.project ? (
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-lg font-bold text-black">
                      ✓
                    </div>

                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
                        RERA Registration Found
                      </p>

                      <h2 className="mt-2 text-2xl font-semibold">
                        {result.project.projectName}
                      </h2>
                    </div>
                  </div>

                  <div className="mt-8 grid gap-5 sm:grid-cols-2">
                    <VerificationField
                      label="Registration Number"
                      value={result.project.registrationNumber}
                    />

                    <VerificationField
                      label="Promoter"
                      value={result.project.promoterName}
                    />

                    <VerificationField
                      label="District"
                      value={result.project.district}
                    />

                    <VerificationField
                      label="Project Type"
                      value={result.project.projectType}
                    />

                    <div className="sm:col-span-2">
                      <VerificationField
                        label="Project Location"
                        value={result.project.projectLocation}
                      />
                    </div>
                  </div>

                  <div className="mt-8 border-t border-emerald-500/10 pt-6">
                    <p className="text-xs leading-6 text-zinc-500">
                      A registration record was found in the Punjab RERA
                      dataset. This verification confirms the registration
                      record; it does not by itself confirm title, construction
                      quality, possession, approvals, pricing or investment
                      suitability.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.04] p-8 text-center">
                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-red-500/30 text-red-400">
                    !
                  </div>

                  <h2 className="mt-5 text-2xl font-semibold">
                    Registration not found
                  </h2>

                  <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-zinc-500">
                    {result.message ||
                      "We couldn't find a matching Punjab RERA registration number."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {!result && (
        <section className="section-padding">
          <div className="container-custom">
            <div className="mx-auto max-w-3xl">
              <div className="grid gap-4 sm:grid-cols-3">
                <InfoCard
                  number="01"
                  title="Enter"
                  text="Enter the RERA registration number."
                />

                <InfoCard
                  number="02"
                  title="Verify"
                  text="We check the available Punjab RERA record."
                />

                <InfoCard
                  number="03"
                  title="Review"
                  text="Review the project and promoter details."
                />
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}

function VerificationField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.16em] text-zinc-600">
        {label}
      </p>

      <p className="mt-2 break-words text-sm leading-6 text-zinc-200">
        {value}
      </p>
    </div>
  );
}

function InfoCard({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
      <p className="text-xs tracking-[0.2em] text-[#d4af37]">{number}</p>
      <h3 className="mt-4 font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-zinc-500">{text}</p>
    </div>
  );
}
