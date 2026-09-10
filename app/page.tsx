import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedProperties from "@/components/FeaturedProperties";
import Locations from "@/components/Locations";
import MarketInsights from "@/components/MarketInsights";
import Testimonials from "@/components/Testimonials";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import { getFeaturedProperties } from "@/lib/properties";

export default async function Home() {
  const featuredProperties = await getFeaturedProperties();

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <Hero />

      <FeaturedProperties properties={featuredProperties} />

      <Locations />

      <MarketInsights />

      <Testimonials />

      <AboutSection />

      <Footer />
    </main>
  );
}