import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function AdminPropertiesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: properties, error } = await supabase
    .from("properties")
    .select(
      `
        id,
        title,
        property_type,
        location,
        city,
        price,
        area,
        status,
        featured,
        rera_registration_number,
        created_at
      `
    )
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* Header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/admin"
              className="text-sm text-white/40 transition hover:text-white"
            >
              ← Admin Dashboard
            </Link>

            <h1 className="mt-4 text-3xl font-semibold">
              Properties
            </h1>

            <p className="mt-2 text-sm text-white/50">
              Manage your Realty Riches property listings.
            </p>
          </div>

          <Link
            href="/admin/properties/new"
            className="inline-flex items-center justify-center rounded-xl bg-[#d4af37] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#e2c45c]"
          >
            + Add Property
          </Link>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-8 rounded-xl border border-red-500/20 bg-red-500/10 p-5 text-sm text-red-400">
            Unable to load properties.
            <pre className="mt-3 overflow-auto text-xs">
              {JSON.stringify(error, null, 2)}
            </pre>
          </div>
        )}

        {/* Empty state */}
        {!error && (!properties || properties.length === 0) && (
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-12 text-center">
            <div className="text-4xl">🏠</div>

            <h2 className="mt-5 text-xl font-semibold">
              No properties yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-white/50">
              Add your first property to start building the Realty Riches
              inventory.
            </p>

            <Link
              href="/admin/properties/new"
              className="mt-6 inline-flex rounded-xl bg-[#d4af37] px-5 py-3 text-sm font-semibold text-black"
            >
              Add Your First Property
            </Link>
          </div>
        )}

        {/* Property list */}
        {properties && properties.length > 0 && (
          <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead className="border-b border-white/10 bg-white/[0.03]">
                  <tr className="text-left text-xs uppercase tracking-wider text-white/40">
                    <th className="px-6 py-4">Property</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">RERA</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/10">
                  {properties.map((property) => (
                    <tr
                      key={property.id}
                      className="transition hover:bg-white/[0.025]"
                    >
                      <td className="px-6 py-5">
                        <div className="font-medium">
                          {property.title}
                        </div>

                        <div className="mt-1 text-xs text-white/40">
                          {property.area} sq.ft
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <div className="text-sm">
                          {property.location}
                        </div>

                        <div className="mt-1 text-xs text-white/40">
                          {property.city}
                        </div>
                      </td>

                      <td className="px-6 py-5 text-sm">
                        ₹{Number(property.price).toLocaleString("en-IN")}
                      </td>

                      <td className="px-6 py-5 text-sm text-white/70">
                        {property.property_type}
                      </td>

                      <td className="px-6 py-5">
                        <StatusBadge status={property.status} />
                      </td>

                      <td className="px-6 py-5">
                        {property.rera_registration_number ? (
                          <span className="text-xs text-emerald-400">
                            ✓ Added
                          </span>
                        ) : (
                          <span className="text-xs text-white/30">
                            Not added
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-5 text-right">
                        <Link
                          href={`/admin/properties/${property.id}/edit`}
                          className="text-sm text-[#d4af37] transition hover:text-[#e2c45c]"
                        >
                          Edit →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    draft: "border-white/10 bg-white/5 text-white/50",
    published: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
    sold: "border-blue-500/20 bg-blue-500/10 text-blue-400",
    unavailable: "border-orange-500/20 bg-orange-500/10 text-orange-400",
    archived: "border-red-500/20 bg-red-500/10 text-red-400",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs capitalize ${
        styles[status] ?? styles.draft
      }`}
    >
      {status}
    </span>
  );
}

