import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "No auth" }), { status: 401, headers: corsHeaders });
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser(authHeader.replace("Bearer ", ""));
    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: corsHeaders });
    }

    const { action, invite_id, inviter_id } = await req.json();

    if (action === "accept-by-email") {
      // Find pending invites for this user's email
      const { data: pending } = await supabase
        .from("couples")
        .select("*")
        .eq("invitee_email", user.email)
        .eq("status", "pending")
        .is("invitee_id", null);

      if (!pending || pending.length === 0) {
        return new Response(JSON.stringify({ error: "No pending invites found" }), { status: 404, headers: corsHeaders });
      }

      // Accept all pending invites for this email
      const { error } = await supabase
        .from("couples")
        .update({ invitee_id: user.id, status: "accepted" })
        .eq("invitee_email", user.email)
        .eq("status", "pending");

      if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 400, headers: corsHeaders });
      }

      return new Response(JSON.stringify({ success: true, accepted: pending.length }), { headers: corsHeaders });
    }

    if (action === "accept-invite") {
      // Accept a specific invite by ID
      const { error } = await supabase
        .from("couples")
        .update({ invitee_id: user.id, status: "accepted" })
        .eq("id", invite_id)
        .eq("status", "pending");

      if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 400, headers: corsHeaders });
      }
      return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
    }

    if (action === "link-by-inviter") {
      // Link via QR code / invite link — create a couple record and auto-accept
      if (inviter_id === user.id) {
        return new Response(JSON.stringify({ error: "Cannot link to yourself" }), { status: 400, headers: corsHeaders });
      }

      // Check if already linked
      const { data: existing } = await supabase
        .from("couples")
        .select("id")
        .or(`and(inviter_id.eq.${inviter_id},invitee_id.eq.${user.id}),and(inviter_id.eq.${user.id},invitee_id.eq.${inviter_id})`)
        .eq("status", "accepted");

      if (existing && existing.length > 0) {
        return new Response(JSON.stringify({ error: "Already connected" }), { status: 400, headers: corsHeaders });
      }

      const { error } = await supabase.from("couples").insert({
        inviter_id: inviter_id,
        invitee_id: user.id,
        invitee_email: user.email,
        status: "accepted",
      });

      if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 400, headers: corsHeaders });
      }
      return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
    }

    if (action === "get-pending") {
      // Get pending invites for this user's email (bypasses RLS)
      const { data } = await supabase
        .from("couples")
        .select("*")
        .eq("invitee_email", user.email)
        .eq("status", "pending")
        .is("invitee_id", null);

      return new Response(JSON.stringify({ pending: data ?? [] }), { headers: corsHeaders });
    }

    return new Response(JSON.stringify({ error: "Unknown action" }), { status: 400, headers: corsHeaders });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: corsHeaders });
  }
});
