export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">

      <div className="container-custom py-16">

        <div className="grid gap-10 md:grid-cols-4">

          <div className="md:col-span-2">

            <div className="text-xl font-bold">
              <span className="gold-text">REALTY RICHES</span>
                <div className="text-[10px] tracking-[0.2em] text-zinc-500">
    BUILDERS & ADVISORS
  </div>
            </div>

            <p className="mt-5 max-w-md leading-7 text-zinc-500">
              Helping buyers discover better properties across Mohali,
              Chandigarh and surrounding areas.
            </p>

          </div>

          <div>
            <h3 className="font-medium">Explore</h3>

            <div className="mt-5 flex flex-col gap-3 text-sm text-zinc-500">
              <a href="#properties">Properties</a>
              <a href="#locations">Locations</a>
              <a href="#insights">Market Insights</a>
              <a href="#about">About Us</a>
            </div>
          </div>

          <div>
            <h3 className="font-medium">Contact</h3>

            <div className="mt-5 flex flex-col gap-3 text-sm text-zinc-500">
              <a href="tel:+919530900022">Call us</a>
              <a href="#">WhatsApp</a>
              <a href="#">Schedule a visit</a>
            </div>
          </div>

        </div>

        <div className="mt-16 border-t border-white/10 pt-7 text-sm text-zinc-600">
          © 2026 Realty Riches Builders and Advisors. All rights reserved.
        </div>

      </div>

    </footer>
  );
}