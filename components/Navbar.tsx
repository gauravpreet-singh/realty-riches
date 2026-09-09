"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  {
    label: "Properties",
    href: "/properties",
  },
  {
    label: "Locations",
    href: "/locations",
  },
  {
    label: "Market Insights",
    href: "/market-insights",
  },
  {
    label: "EMI Calculator",
    href: "/emi-calculator",
  },
  {
    label: "Compare",
    href: "/compare",
  },
  {
    label: "Saved",
    href: "/saved",
  },
  { 
    label: "RERA Verify", 
    href: "/rera-verification" 
  },
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
      return pathname === "/properties" ||
        pathname.startsWith("/properties/");
    }

    return pathname === href ||
      pathname.startsWith(`${href}/`);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="container-custom">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group flex flex-col leading-none"
            aria-label="Realty Riches home"
          >
            <span className="text-lg font-semibold tracking-[0.18em] text-[#d4af37] transition group-hover:text-[#e5c158]">
              REALTY RICHES
            </span>

            <span className="mt-1 text-[9px] font-medium tracking-[0.3em] text-zinc-500">
              BUILDERS & ADVISORS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative py-2 text-sm transition ${active
                    ? "text-[#d4af37]"
                    : "text-zinc-400 hover:text-white"
                    }`}
                >
                  {item.label}

                  {active && (
                    <span className="absolute inset-x-0 -bottom-1 mx-auto h-px bg-[#d4af37]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Link
              href="/schedule-visit"
              className="inline-flex items-center rounded-xl bg-[#d4af37] px-5 py-3 text-sm font-medium text-black transition hover:bg-[#e5c158]"
            >
              Schedule a Visit
            </Link>
          </div>

          {/* Mobile Menu Button */}
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
                className={`block h-px w-5 bg-current transition ${mobileOpen
                  ? "translate-y-[3.5px] rotate-45"
                  : ""
                  }`}
              />

              <span
                className={`block h-px w-5 bg-current transition ${mobileOpen ? "opacity-0" : ""
                  }`}
              />

              <span
                className={`block h-px w-5 bg-current transition ${mobileOpen
                  ? "-translate-y-[3.5px] -rotate-45"
                  : ""
                  }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-black lg:hidden">
          <div className="container-custom py-5">
            <nav className="flex flex-col">
              {navItems.map((item) => {
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`border-b border-white/5 py-4 text-base transition ${active
                      ? "text-[#d4af37]"
                      : "text-zinc-300 hover:text-white"
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{item.label}</span>

                      {active && (
                        <span className="text-xs text-[#d4af37]">
                          CURRENT
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}

              <Link
                href="/schedule-visit"
                className="mt-5 inline-flex items-center justify-center rounded-xl bg-[#d4af37] px-5 py-3.5 text-sm font-medium text-black transition hover:bg-[#e5c158]"
              >
                Schedule a Visit
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
