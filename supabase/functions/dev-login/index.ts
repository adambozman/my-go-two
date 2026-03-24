import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const DEV_EMAILS = ["adam.bozman@gmail.com"];

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { email } = await req.json();
    const normalizedEmail = String(email ?? "").toLowerCase().trim();

    if (!DEV_EMAILS.includes(normalizedEmail)) {
      return new Response(JSON.stringify({ error: "Not authorized" }), {
        status: 403,
        headers: corsHeaders,
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

    const admin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { data: usersData, error: listError } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
    if (listError) throw listError;

    const matchedUser = usersData.users.find(
      (u) => (u.email ?? "").toLowerCase().trim() === normalizedEmail,
    );

    if (!matchedUser) {
      return new Response(JSON.stringify({ error: "Dev user not found" }), {
        status: 404,
        headers: corsHeaders,
      });
    }

    const tempPassword = `dev-${crypto.randomUUID()}-A9!`;

    const { error: updateError } = await admin.auth.admin.updateUserById(matchedUser.id, {
      password: tempPassword,
      email_confirm: true,
    });
    if (updateError) throw updateError;

    const anon = createClient(supabaseUrl, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { data: signInData, error: signInError } = await anon.auth.signInWithPassword({
      email: normalizedEmail,
      password: tempPassword,
    });

    if (signInError) throw signInError;
    if (!signInData.session) throw new Error("No session returned for dev login");

    return new Response(
      JSON.stringify({
        access_token: signInData.session.access_token,
        refresh_token: signInData.session.refresh_token,
        expires_at: signInData.session.expires_at,
        token_type: signInData.session.token_type,
      }),
      {
        status: 200,
        headers: corsHeaders,
      },
    );
  } catch (err: any) {
    console.error("Dev login error:", err?.message ?? err);

    return new Response(
      JSON.stringify({
        error: err?.message ?? "Dev login failed",
      }),
      {
        status: 500,
        headers: corsHeaders,
      },
    );
  }
});
