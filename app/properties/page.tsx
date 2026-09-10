import { Suspense } from "react";
import PropertyListing from "./PropertyListing";
import { getPublishedProperties } from "@/lib/properties";

export const dynamic = "force-dynamic";

export default async function PropertiesPage() {
  const properties = await getPublishedProperties();

  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-black px-6 pb-20 pt-32 text-white">
          <div className="mx-auto max-w-7xl">
            <div className="h-10 w-48 animate-pulse rounded bg-white/10" />

            <div className="mt-4 h-5 w-96 max-w-full animate-pulse rounded bg-white/5" />

            <div className="mt-10 h-32 animate-pulse rounded-2xl bg-white/5" />

            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-96 animate-pulse rounded-2xl bg-white/5"
                />
              ))}
            </div>
          </div>
        </main>
      }
    >
      <PropertyListing properties={properties} />
    </Suspense>
  );
}