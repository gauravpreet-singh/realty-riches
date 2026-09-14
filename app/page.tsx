import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import Hero from "@/components/Hero";
import FeaturedProperties from "@/components/FeaturedProperties";
import Locations from "@/components/Locations";
import MarketInsights from "@/components/MarketInsights";
import Testimonials from "@/components/Testimonials";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import { getFeaturedProperties } from "@/lib/properties";

export const metadata: Metadata = {
  title: "Property in Mohali, Kharar & New Chandigarh",
  description:
    "Find apartments, villas and plots for sale in Mohali, Kharar and New Chandigarh. Explore property listings, compare homes and discover the right location for your next real-estate investment.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Property in Mohali, Kharar & New Chandigarh",
    description:
      "Explore property listings, apartments, villas and plots across Mohali, Kharar and New Chandigarh with Realty Riches.",
    url: "/",
    type: "website",
  },
};
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