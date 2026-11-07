import { createClient } from "@supabase/supabase-js";
export function adminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase server environment is missing");
  return createClient(url, key, { auth: { persistSession: false } });
}
export function allowed(email?: string | null) {
  const list = (process.env.ADMIN_EMAILS || "").split(",").map(x => x.trim().toLowerCase()).filter(Boolean);
  return !!email && list.includes(email.toLowerCase());
}
