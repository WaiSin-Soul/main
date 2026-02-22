import { redirect } from "next/navigation";
import { createClient } from "../lib/supabase-server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  // Read session first (cookie-backed), then user
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect("/login");

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) redirect("/login");

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  const roleFromProfile = String(profile?.role ?? "")
    .trim()
    .toLowerCase();
  const roleFromMeta = String(
    user.app_metadata?.role ??
      user.user_metadata?.role ??
      (user.app_metadata?.is_admin ? "admin" : ""),
  )
    .trim()
    .toLowerCase();

  const isAdmin = roleFromProfile === "admin" || roleFromMeta === "admin";

  if (!isAdmin) {
    redirect("/");
  }

  return <>{children}</>;
}
