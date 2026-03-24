import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const DEV_EMAILS = ["adam.bozman@gmail.com"];

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST",
  "Content-Type": "application/json",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email } = await req.json();
    if (!email || !DEV_EMAILS.includes(email.toLowerCase().trim())) {
      return new Response(JSON.stringify({ error: "Not authorized" }), {
        status: 403,
        headers: corsHeaders,
      });
    }

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const normalizedEmail = email.toLowerCase().trim();

    // Find the user
    const { data: { users }, error: listError } = await supabaseAdmin.auth.admin.listUsers();
    if (listError) throw listError;

    const user = users.find((u: any) => u.email === normalizedEmail);
    if (!user) throw new Error("Dev user not found. Sign up first.");

    // Generate a magic link to get a valid hashed_token for OTP verification
    const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
      type: "magiclink",
      email: normalizedEmail,
    });
    if (linkError) throw linkError;

    const hashedToken = linkData?.properties?.hashed_token;
    if (!hashedToken) throw new Error("No hashed token generated");

    // Now verify the OTP server-side to get a full session
    const anonClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
    );

    const { data: sessionData, error: verifyError } = await anonClient.auth.verifyOtp({
      email: normalizedEmail,
      token: hashedToken,
      type: "magiclink",
    });

    if (verifyError) throw verifyError;
    if (!sessionData?.session) throw new Error("No session returned");

    return new Response(JSON.stringify({
      access_token: sessionData.session.access_token,
      refresh_token: sessionData.session.refresh_token,
    }), {
      headers: corsHeaders,
    });
  } catch (err: any) {
    console.error("Dev login error:", err.message);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: corsHeaders,
    });
  }
});
