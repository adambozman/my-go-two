import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const DEV_EMAILS = ["adam.bozman@gmail.com"];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "content-type",
        "Access-Control-Allow-Methods": "POST",
      },
    });
  }

  try {
    const { email } = await req.json();
    if (!email || !DEV_EMAILS.includes(email.toLowerCase().trim())) {
      return new Response(JSON.stringify({ error: "Not authorized" }), {
        status: 403,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Generate a magic link and extract the token
    const { data, error } = await supabaseAdmin.auth.admin.generateLink({
      type: "magiclink",
      email: email.toLowerCase().trim(),
    });

    if (error) throw error;

    // Return the hashed token so the client can verify it instantly
    const token = data?.properties?.hashed_token;
    if (!token) throw new Error("No token generated");

    return new Response(JSON.stringify({ token, email: email.toLowerCase().trim() }), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }
});
