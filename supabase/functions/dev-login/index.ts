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

    // Generate a magic link server-side (no password change = no token revocation)
    const { data: linkData, error: linkError } = await admin.auth.admin.generateLink({
      type: "magiclink",
      email: normalizedEmail,
    });
    if (linkError) throw linkError;

    // Extract token_hash from the action link properties
    const tokenHash = linkData?.properties?.hashed_token;
    if (!tokenHash) throw new Error("No token hash returned from generateLink");

    // Verify the OTP to get a full session
    const anon = createClient(supabaseUrl, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { data: verifyData, error: verifyError } = await anon.auth.verifyOtp({
      token_hash: tokenHash,
      type: "magiclink",
    });
    if (verifyError) throw verifyError;
    if (!verifyData.session) throw new Error("No session returned for dev login");

    return new Response(
      JSON.stringify({
        access_token: verifyData.session.access_token,
        refresh_token: verifyData.session.refresh_token,
        expires_at: verifyData.session.expires_at,
        token_type: verifyData.session.token_type,
      }),
      { status: 200, headers: corsHeaders },
    );
  } catch (err: any) {
    console.error("Dev login error:", err?.message ?? err);
    return new Response(
      JSON.stringify({ error: err?.message ?? "Dev login failed" }),
      { status: 500, headers: corsHeaders },
    );
  }
});
