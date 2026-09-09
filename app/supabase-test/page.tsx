import { createClient } from "@/lib/supabase/server";

export default async function SupabaseTestPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .limit(1);

  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-semibold">
          Supabase Connection Test
        </h1>

        {error ? (
          <div className="mt-8 rounded-xl border border-red-500/30 bg-red-500/10 p-6">
            <p className="font-medium text-red-400">
              Connection reached Supabase
            </p>

            <pre className="mt-4 overflow-auto text-sm text-red-300">
              {JSON.stringify(error, null, 2)}
            </pre>
          </div>
        ) : (
          <div className="mt-8 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-6">
            <p className="font-medium text-emerald-400">
              Supabase connected successfully.
            </p>

            <pre className="mt-4 overflow-auto text-sm text-emerald-300">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}