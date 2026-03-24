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

    // Generate a magic link — this gives us a valid OTP token
    const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
      type: "magiclink",
      email: normalizedEmail,
    });
    if (linkError) throw linkError;

    // Extract the token_hash and use it
    const actionLink = linkData?.properties?.action_link;
    if (!actionLink) throw new Error("Failed to generate link");

    // Parse the token from the action link URL
    const url = new URL(actionLink);
    const token_hash = url.searchParams.get("token") || url.hash?.match(/token=([^&]+)/)?.[1];
    
    // Return the full action link for client-side verification
    return new Response(JSON.stringify({ 
      action_link: actionLink,
      email: normalizedEmail,
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
