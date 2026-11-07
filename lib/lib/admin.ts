import { createClient } from "@supabase/supabase-js";

export function adminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Supabase configuration missing");
  }

  return createClient(url, key, {
    auth: { persistSession: false }
  });
}

export function allowed(email?: string | null) {
  const admins = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map(email => email.trim().toLowerCase());

  return !!email && admins.includes(email.toLowerCase());
}
