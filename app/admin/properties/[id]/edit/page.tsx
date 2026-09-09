import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import EditPropertyForm from "@/components/admin/EditPropertyForm";
import PropertyMediaManager from "@/components/admin/PropertyMediaManager";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditPropertyPage({
  params,
}: PageProps) {
  const { id } = await params;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: property, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !property) {
    notFound();
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
            Edit Property
          </h1>

          <p className="mt-2 text-sm text-white/50">
            Update property information and publishing status.
          </p>
        </div>

        <div className="mt-10">
          <EditPropertyForm property={property} />
        </div>
        <div className="mt-8">
          <PropertyMediaManager propertyId={property.id} />
        </div>
      </div>
    </main>
  );
}

