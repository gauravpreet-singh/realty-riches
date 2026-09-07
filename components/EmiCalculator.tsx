"use client";

import { useMemo, useState } from "react";

type EmiCalculatorProps = {
  propertyPrice: number;
};

export default function EmiCalculator({
  propertyPrice,
}: EmiCalculatorProps) {
  const [downPaymentPercent, setDownPaymentPercent] =
    useState(20);

  const [interestRate, setInterestRate] = useState(8.5);

  const [loanTenure, setLoanTenure] = useState(20);

  const downPayment =
    (propertyPrice * downPaymentPercent) / 100;

  const loanAmount = propertyPrice - downPayment;

  const emi = useMemo(() => {
    const monthlyRate = interestRate / 12 / 100;
    const months = loanTenure * 12;

    if (loanAmount <= 0) {
      return 0;
    }

    if (monthlyRate === 0) {
      return loanAmount / months;
    }

    return (
      (loanAmount *
        monthlyRate *
        Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1)
    );
  }, [loanAmount, interestRate, loanTenure]);

  const totalPayment = emi * loanTenure * 12;

  const totalInterest =
    totalPayment - loanAmount;

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="border-b border-white/10 p-6 md:p-8">

        <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#d4af37]">
          Finance
        </p>

        <h2 className="mt-2 text-2xl font-semibold md:text-3xl">
          Estimate your EMI
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
          Adjust the details below to estimate your
          monthly home loan payment.
        </p>

      </div>

      {/* ================================================= */}
      {/* CALCULATOR BODY */}
      {/* ================================================= */}

      <div className="p-6 md:p-8">

        <div className="grid gap-8 lg:grid-cols-2">

          {/* ================================================= */}
          {/* LEFT — INPUTS */}
          {/* ================================================= */}

          <div className="space-y-7">

            {/* Property Price */}

            <div>

              <div className="mb-2 flex items-center justify-between">

                <label className="text-sm font-medium text-zinc-300">
                  Property Price
                </label>

              </div>

              <div className="flex h-14 items-center rounded-xl border border-white/10 bg-black px-4">

                <span className="mr-2 text-zinc-500">
                  ₹
                </span>

                <span className="text-lg font-medium text-white">
                  {formatIndianNumber(propertyPrice)}
                </span>

              </div>

            </div>

            {/* Down Payment */}

            <div>

              <div className="mb-3 flex items-center justify-between">

                <label className="text-sm font-medium text-zinc-300">
                  Down Payment
                </label>

                <span className="text-sm font-medium text-[#d4af37]">
                  {downPaymentPercent}%
                </span>

              </div>

              <div className="flex h-14 items-center rounded-xl border border-white/10 bg-black px-4">

                <span className="mr-2 text-zinc-500">
                  ₹
                </span>

                <span className="flex-1 text-lg font-medium text-white">
                  {formatIndianNumber(
                    Math.round(downPayment)
                  )}
                </span>

              </div>

              <input
                type="range"
                min="10"
                max="70"
                step="5"
                value={downPaymentPercent}
                onChange={(e) =>
                  setDownPaymentPercent(
                    Number(e.target.value)
                  )
                }
                className="mt-4 w-full accent-[#d4af37]"
              />

              <div className="mt-2 flex justify-between text-xs text-zinc-600">
                <span>10%</span>
                <span>40%</span>
                <span>70%</span>
              </div>

            </div>

            {/* Interest Rate */}

            <div>

              <label className="mb-3 block text-sm font-medium text-zinc-300">
                Interest Rate
              </label>

              <div className="flex h-14 items-center rounded-xl border border-white/10 bg-black px-4">

                <input
                  type="number"
                  min="1"
                  max="20"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) =>
                    setInterestRate(
                      Number(e.target.value)
                    )
                  }
                  className="min-w-0 flex-1 bg-transparent text-lg font-medium text-white outline-none"
                />

                <span className="ml-2 text-zinc-500">
                  % p.a.
                </span>

              </div>

            </div>

            {/* Loan Tenure */}

            <div>

              <label className="mb-3 block text-sm font-medium text-zinc-300">
                Loan Tenure
              </label>

              <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">

                {[5, 10, 15, 20, 25, 30].map(
                  (years) => (
                    <button
                      key={years}
                      type="button"
                      onClick={() =>
                        setLoanTenure(years)
                      }
                      className={`rounded-xl border px-2 py-3 text-sm transition ${
                        loanTenure === years
                          ? "border-[#d4af37] bg-[#d4af37] text-black"
                          : "border-white/10 bg-black text-zinc-400 hover:border-white/30"
                      }`}
                    >
                      {years}y
                    </button>
                  )
                )}

              </div>

            </div>

          </div>

          {/* ================================================= */}
          {/* RIGHT — RESULT */}
          {/* ================================================= */}

          <div className="flex flex-col rounded-2xl border border-white/10 bg-black p-6 md:p-8">

            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Estimated Monthly EMI
            </p>

            <div className="mt-3">

              <span className="text-4xl font-semibold tracking-tight text-[#d4af37] md:text-5xl">
                ₹{formatIndianNumber(Math.round(emi))}
              </span>

              <span className="ml-2 text-sm text-zinc-500">
                / month
              </span>

            </div>

            {/* Divider */}

            <div className="my-7 h-px bg-white/10" />

            {/* Loan */}

            <div className="flex items-center justify-between">

              <span className="text-sm text-zinc-500">
                Loan Amount
              </span>

              <span className="text-sm font-medium text-white">
                ₹{formatIndianNumber(
                  Math.round(loanAmount)
                )}
              </span>

            </div>

            {/* Down Payment */}

            <div className="mt-5 flex items-center justify-between">

              <span className="text-sm text-zinc-500">
                Down Payment
              </span>

              <span className="text-sm font-medium text-white">
                ₹{formatIndianNumber(
                  Math.round(downPayment)
                )}
              </span>

            </div>

            {/* Interest */}

            <div className="mt-5 flex items-center justify-between">

              <span className="text-sm text-zinc-500">
                Total Interest
              </span>

              <span className="text-sm font-medium text-white">
                ₹{formatIndianNumber(
                  Math.round(totalInterest)
                )}
              </span>

            </div>

            {/* Total */}

            <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-5">

              <span className="text-sm text-zinc-400">
                Total Payment
              </span>

              <span className="text-sm font-semibold text-white">
                ₹{formatIndianNumber(
                  Math.round(totalPayment)
                )}
              </span>

            </div>

            {/* CTA */}

            <button
              type="button"
              className="mt-auto pt-8 text-left text-sm text-[#d4af37] transition hover:text-[#e5c158]"
            >
              Need help understanding your EMI? →
            </button>

          </div>

        </div>

        {/* Disclaimer */}

        <p className="mt-8 text-xs leading-5 text-zinc-600">
          EMI calculations are indicative and based on
          the values entered above. Actual rates, loan
          eligibility and repayment terms depend on the
          lender and borrower profile.
        </p>

      </div>

    </div>
  );
}

/* ========================================================= */
/* INDIAN NUMBER FORMAT */
/* ========================================================= */

function formatIndianNumber(value: number) {
  return value.toLocaleString("en-IN");
}