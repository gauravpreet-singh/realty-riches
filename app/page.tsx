import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedProperties from "@/components/FeaturedProperties";
import Locations from "@/components/Locations";
import PropertyVideos from "@/components/PropertyVideos";
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

      <PropertyVideos />

      <MarketInsights />

      <Testimonials />

      <AboutSection />

      <Footer />
    </main>
  );
}