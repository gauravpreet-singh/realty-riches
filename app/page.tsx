import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedProperties from "@/components/FeaturedProperties";
import Locations from "@/components/Locations";
import MarketInsights from "@/components/MarketInsights";
import Testimonials from "@/components/Testimonials";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <Hero />

      <FeaturedProperties />

      <Locations />

      <MarketInsights />

      <Testimonials />

      <AboutSection />

      <Footer />
    </main>
  );
}