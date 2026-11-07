import { redirect } from "next/navigation";
import { createClient } from "@/lib/server";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="rounded-xl border border-white/10 bg-zinc-950 p-8">
        <h1 className="text-3xl font-bold">
          Welcome to MovieWatch!
        </h1>

        <p className="mt-4 text-zinc-400">
          Signed in as: {user.email}
        </p>
      </div>
    </main>
  );
}