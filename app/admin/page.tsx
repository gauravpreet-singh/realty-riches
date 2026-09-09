import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#d4af37]">
              Realty Riches
            </p>

            <h1 className="mt-2 text-3xl font-semibold">
              Admin Dashboard
            </h1>

            <p className="mt-2 text-sm text-white/50">
              Manage your property listings and media.
            </p>
          </div>

          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:border-white/20 hover:text-white"
            >
              Sign Out
            </button>
          </form>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <DashboardCard
            label="Properties"
            value="0"
            description="Total listings"
          />

          <DashboardCard
            label="Published"
            value="0"
            description="Visible to buyers"
          />

          <DashboardCard
            label="Drafts"
            value="0"
            description="Not yet published"
          />

          <DashboardCard
            label="Sold"
            value="0"
            description="Completed listings"
          />
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
          <h2 className="text-xl font-semibold">
            Property Management
          </h2>

          <p className="mt-2 text-sm text-white/50">
            Property creation and media management will appear here.
          </p>

          <div className="mt-6">
            <a
              href="/admin/properties"
              className="inline-flex rounded-xl bg-[#d4af37] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#e2c45c]"
            >
              Manage Properties
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

function DashboardCard({
  label,
  value,
  description,
}: {
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <p className="text-sm text-white/50">{label}</p>

      <p className="mt-3 text-3xl font-semibold">{value}</p>

      <p className="mt-1 text-xs text-white/30">
        {description}
      </p>
    </div>
  );
}