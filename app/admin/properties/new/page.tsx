import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PropertyForm from "@/components/admin/PropertyForm";

export default async function NewPropertyPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <Link
          href="/admin/properties"
          className="text-sm text-white/40 transition hover:text-white"
        >
          ← Properties
        </Link>

        <div className="mt-5">
          <p className="text-xs uppercase tracking-[0.25em] text-[#d4af37]">
            Realty Riches
          </p>

          <h1 className="mt-2 text-3xl font-semibold">
            Add Property
          </h1>

          <p className="mt-2 text-sm text-white/50">
            Create a new property listing.
          </p>
        </div>

        <div className="mt-10">
          <PropertyForm />
        </div>
      </div>
    </main>
  );
}

