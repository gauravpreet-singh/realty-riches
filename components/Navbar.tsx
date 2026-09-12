"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Properties", href: "/properties" },
  { label: "Locations", href: "/locations" },
  { label: "Market Insights", href: "/market-insights" },
  { label: "Compare", href: "/compare" },
  { label: "Saved", href: "/saved" },
  { label: "RERA Verify", href: "/rera-verification" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === "/properties") {
      return (
        pathname === "/properties" ||
        pathname.startsWith("/properties/")
      );
    }

    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#080909]/95 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-[82px] items-center justify-between">

          {/* BRAND */}
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-3"
            aria-label="Realty Riches home"
          >
            {/* Supplied Realty Riches icon */}
            <Image
              src="/realty-riches-header-icon.png"
              alt="Realty Riches"
              width={512}
              height={512}
              priority
              className="h-14 w-14 rounded-xl object-contain"
            />

            {/* Brand text */}
            <div className="leading-none">
              <div className="font-serif text-[22px] font-semibold tracking-tight text-white transition group-hover:text-[#d4af37]">
                Realty Riches
              </div>

              <div className="mt-1.5 text-[10px] font-medium tracking-[0.16em] text-[#d4af37]">
                BUILDERS AND ADVISORS
              </div>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden items-center gap-6 xl:flex">
            {navItems.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative py-3 text-[13px] transition ${
                    active
                      ? "text-[#d4af37]"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {item.label}

                  {active && (
                    <span className="absolute inset-x-0 -bottom-0.5 mx-auto h-px bg-[#d4af37]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* DESKTOP CTA */}
          <div className="hidden lg:block">
            <Link
              href="/schedule-visit"
              className="inline-flex items-center gap-2 rounded-xl border border-[#d4af37] px-5 py-3 text-sm font-medium text-[#d4af37] transition hover:bg-[#d4af37] hover:text-black"
            >
              <CalendarIcon />
              Schedule a Visit
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={
              mobileOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={mobileOpen}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-300 transition hover:border-white/20 hover:text-white lg:hidden"
          >
            <span className="sr-only">
              {mobileOpen ? "Close menu" : "Open menu"}
            </span>

            <div className="space-y-1.5">
              <span
                className={`block h-px w-5 bg-current transition ${
                  mobileOpen ? "translate-y-[3.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px w-5 bg-current transition ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-px w-5 bg-current transition ${
                  mobileOpen
                    ? "-translate-y-[3.5px] -rotate-45"
                    : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* MOBILE NAVIGATION */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#080909] lg:hidden">
          <div className="mx-auto max-w-7xl px-6 py-5">
            <nav className="flex flex-col">
              {navItems.map((item) => {
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`border-b border-white/5 py-4 text-base transition ${
                      active
                        ? "text-[#d4af37]"
                        : "text-zinc-300 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{item.label}</span>

                      {active && (
                        <span className="text-[10px] tracking-wider text-[#d4af37]">
                          CURRENT
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}

              <Link
                href="/schedule-visit"
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl border border-[#d4af37] px-5 py-3.5 text-sm font-medium text-[#d4af37] transition hover:bg-[#d4af37] hover:text-black"
              >
                <CalendarIcon />
                Schedule a Visit
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path d="M16 2v4M8 2v4M3 9h18" />
      <path d="M8 13h2M14 13h2M8 17h2" />
    </svg>
  );
}
