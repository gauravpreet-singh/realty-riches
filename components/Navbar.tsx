"use client";

import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="container-custom">
        <div className="flex h-20 items-center justify-between">
          
          <a href="#" className="text-xl font-bold tracking-tight">
            <span className="gold-text">REALTY RICHES</span>
              <div className="text-[10px] tracking-[0.2em] text-zinc-500">
    BUILDERS & ADVISORS
  </div>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            <a
  href="/properties"
  className="text-sm text-zinc-300 transition hover:text-white"
>
  Properties
</a>

            <a href="#locations" className="text-sm text-zinc-300 hover:text-white">
              Locations
            </a>

            <a href="#insights" className="text-sm text-zinc-300 hover:text-white">
              Market Insights
            </a>

            <a href="#about" className="text-sm text-zinc-300 hover:text-white">
              About
            </a>

            <button className="rounded-full border border-[#d4af37] px-5 py-2 text-sm text-[#d4af37] transition hover:bg-[#d4af37] hover:text-black">
              Ask AI
            </button>
          </nav>

          <button
            onClick={() => setOpen(!open)}
            className="text-2xl md:hidden"
          >
            ☰
          </button>
        </div>

        {open && (
          <nav className="border-t border-white/10 py-5 md:hidden">
            <div className="flex flex-col gap-5">
              <a href="#properties">Properties</a>
              <a href="#locations">Locations</a>
              <a href="#insights">Market Insights</a>
              <a href="#about">About</a>
              <button className="w-fit rounded-full border border-[#d4af37] px-5 py-2 text-[#d4af37]">
                Ask AI
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}