import type { MetadataRoute } from "next";
import { getPublishedProperties } from "@/lib/properties";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

const staticRoutes = [
  "/",
  "/properties",
  "/locations",
  "/market-insights",
  "/emi-calculator",
  "/compare",
  "/rera-verification",
  "/locations/mohali",
  "/locations/chandigarh",
  "/locations/kharar",
  "/locations/new-chandigarh",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  let properties: Awaited<ReturnType<typeof getPublishedProperties>> = [];

  try {
    properties = await getPublishedProperties();
  } catch {
    // Keep sitemap generation available if Supabase is temporarily unavailable.
  }

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "/" || route === "/properties" ? "daily" : "weekly",
    priority: route === "/" ? 1 : route === "/properties" ? 0.95 : 0.75,
  }));

  const propertyEntries: MetadataRoute.Sitemap = properties
    .filter((property) => property.slug)
    .map((property) => ({
      url: `${siteUrl}/properties/${property.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }));

  return [...staticEntries, ...propertyEntries];
}
