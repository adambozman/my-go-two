import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

async function sendInviteEmail(inviterName: string, inviteeEmail: string, inviteLink: string) {
  const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
  if (!LOVABLE_API_KEY) {
    console.error("LOVABLE_API_KEY not configured, skipping email");
    return;
  }

  const html = `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 40px 24px; background: #ffffff;">
      <div style="text-align: center; margin-bottom: 32px;">
        <span style="font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
          <span style="color: #2F5F6D;">Go</span><span style="color: #D9654F;">Two</span>
        </span>
      </div>
      <h1 style="color: #2F5F6D; font-size: 22px; font-weight: 600; text-align: center; margin-bottom: 16px;">
        You've Been Invited to Connect
      </h1>
      <p style="color: #6b7280; font-size: 15px; line-height: 1.6; text-align: center; margin-bottom: 32px;">
        <strong>${inviterName}</strong> wants to share their preferences with you on GoTwo — so they always know exactly what you love.
      </p>
      <div style="text-align: center; margin-bottom: 32px;">
        <a href="${inviteLink}" style="display: inline-block; background: #2F5F6D; color: #f6e2d4; padding: 14px 36px; border-radius: 999px; text-decoration: none; font-weight: 600; font-size: 15px;">
          Accept Invitation
        </a>
      </div>
      <p style="color: #9ca3af; font-size: 13px; text-align: center; line-height: 1.5;">
        Don't have an account yet? The link above will guide you through creating one.
      </p>
    </div>
  `;

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const projectRef = supabaseUrl.replace("https://", "").replace(".supabase.co", "");

    const response = await fetch(`https://api.lovable.dev/api/v1/email/${projectRef}/send`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: inviteeEmail,
        subject: `${inviterName} invited you to connect on GoTwo`,
        html,
        purpose: "transactional",
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Email send failed:", response.status, errText);
    } else {
      console.log("Invite email sent to", inviteeEmail);
    }
  } catch (e) {
    console.error("Email send error:", e);
  }
}

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

    const { action, invite_id, inviter_id, invitee_email } = await req.json();

    if (action === "send-invite-email") {
      // Send invitation email to the invitee
      if (!invitee_email) {
        return new Response(JSON.stringify({ error: "Missing invitee_email" }), { status: 400, headers: corsHeaders });
      }

      // Get inviter's display name
      const { data: profile } = await supabase
        .from("profiles")
        .select("display_name")
        .eq("user_id", user.id)
        .single();

      const inviterName = profile?.display_name || user.email || "Someone";
      const origin = req.headers.get("origin") || req.headers.get("referer")?.replace(/\/+$/, "") || "https://mygotwo.com";
      const inviteLink = `${origin}/connect?invite=${user.id}`;

      await sendInviteEmail(inviterName, invitee_email, inviteLink);

      return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
    }

    if (action === "accept-by-email") {
      const { data: pending } = await supabase
        .from("couples")
        .select("*")
        .eq("invitee_email", user.email)
        .eq("status", "pending")
        .is("invitee_id", null);

      if (!pending || pending.length === 0) {
        return new Response(JSON.stringify({ error: "No pending invites found" }), { status: 404, headers: corsHeaders });
      }

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
      if (inviter_id === user.id) {
        return new Response(JSON.stringify({ error: "Cannot link to yourself" }), { status: 400, headers: corsHeaders });
      }

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
