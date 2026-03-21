import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function normalizePhone(value: string | null | undefined) {
  return (value ?? "").replace(/\D/g, "");
}

function normalizeUsername(value: string | null | undefined) {
  return (value ?? "").trim().replace(/^@+/, "");
}

const DEMO_SEED_VERSION = "visual-demo-v1";

const demoProfiles = [
  {
    slug: "abby",
    email: "abby.demo@gotwo.local",
    password: "GoTwoDemo!2026",
    display_name: "abby",
    gender: "female",
    age: 29,
    birthday: "1997-04-18",
    anniversary: "2022-09-12",
    phone_raw: "(312) 555-0188",
    profile_answers: {
      daily_vibe: "Classic with a modern edge",
      style_focus: "Everyday comfort with polished details",
      preferred_fit: "Relaxed but structured",
    },
    ai_personalization: {
      persona_summary: "Effortless, polished, and detail-oriented.",
      recommended_brands: ["Madewell", "Everlane", "Nike"],
    },
    cards: [
      { card_key: "style-fit__everyday__tops", group_name: "Style & Fit", entry_name: "Everyday Tops", field_values: { size: "M", fabrics: "Cotton, linen", colors: "Cream, navy" } },
      { card_key: "style-fit__everyday__footwear", group_name: "Style & Fit", entry_name: "Daily Footwear", field_values: { size: "8.5", style: "Low-profile sneakers", avoid: "Chunky soles" } },
      { card_key: "food-drink__coffee__order", group_name: "Food & Drink", entry_name: "Coffee Order", field_values: { drink: "Iced oat milk latte", size: "Medium", sweetness: "Light" } },
      { card_key: "food-drink__restaurants__favorites", group_name: "Food & Drink", entry_name: "Favorite Restaurants", field_values: { cuisine: "Italian, sushi", dislikes: "Very spicy" } },
      { card_key: "personal__skincare__routine", group_name: "Personal", entry_name: "Skincare Routine", field_values: { cleanser: "Gentle cream", moisturizer: "Fragrance-free", sunscreen: "SPF 50" } },
      { card_key: "gifts-wishlist__wishlist__products", group_name: "Gifts & Wishlist", entry_name: "Wish List", field_values: { top_pick: "Leather weekender", backup_pick: "Gold hoop earrings" } },
      { card_key: "home-living__decor__style", group_name: "Home & Living", entry_name: "Home Decor", field_values: { style: "Soft minimal", colors: "Warm neutrals" } },
      { card_key: "entertainment-interests__music__playlist", group_name: "Entertainment & Interests", entry_name: "Music Playlist", field_values: { genres: "Indie pop, neo soul", artist: "Maggie Rogers" } },
    ],
  },
  {
    slug: "jules",
    email: "jules.demo@gotwo.local",
    password: "GoTwoDemo!2026",
    display_name: "jules",
    gender: "non-binary",
    age: 33,
    birthday: "1993-11-07",
    anniversary: "2020-06-21",
    phone_raw: "(312) 555-0199",
    profile_answers: {
      daily_vibe: "Sporty and creative",
      style_focus: "Athletic comfort + statement pieces",
      preferred_fit: "Relaxed and layered",
    },
    ai_personalization: {
      persona_summary: "Athleisure-forward, creative, and practical.",
      recommended_brands: ["Lululemon", "Uniqlo", "On"],
    },
    cards: [
      { card_key: "style-fit__athletic__tops", group_name: "Style & Fit", entry_name: "Athletic Tops", field_values: { size: "L", fit: "Relaxed", preferred: "Breathable blends" } },
      { card_key: "style-fit__athletic__footwear", group_name: "Style & Fit", entry_name: "Training Shoes", field_values: { size: "10.5", support: "Neutral", avoid: "Narrow toe boxes" } },
      { card_key: "food-drink__meal__favorites", group_name: "Food & Drink", entry_name: "Meal Preferences", field_values: { favorites: "Rice bowls, ramen", avoid: "Mushrooms" } },
      { card_key: "food-drink__snacks__favorites", group_name: "Food & Drink", entry_name: "Snack Picks", field_values: { favorites: "Sea salt popcorn, dark chocolate" } },
      { card_key: "personal__grooming__routine", group_name: "Personal", entry_name: "Grooming Routine", field_values: { hair: "Curl cream + diffuser", body: "Unscented body wash" } },
      { card_key: "gifts-wishlist__gifts__ideas", group_name: "Gifts & Wishlist", entry_name: "Gift Ideas", field_values: { best: "Concert tickets", backup: "Wireless headphones" } },
      { card_key: "home-living__kitchen__must-haves", group_name: "Home & Living", entry_name: "Kitchen Must-Haves", field_values: { coffee: "Pour-over setup", cookware: "Cast iron skillet" } },
      { card_key: "entertainment-interests__events__favorites", group_name: "Entertainment & Interests", entry_name: "Events", field_values: { favorites: "Live music, art walks, comedy nights" } },
    ],
  },
];

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

async function createNotification(
  supabase: ReturnType<typeof createClient>,
  userId: string,
  title: string,
  body: string,
  type: string = "partner"
) {
  try {
    await supabase.from("notifications").insert({
      user_id: userId,
      title,
      body,
      type,
      is_read: false,
    });
  } catch (e) {
    console.error("Failed to create notification:", e);
  }
}

async function findAuthUserByEmail(
  supabase: ReturnType<typeof createClient>,
  email: string,
  excludeUserId?: string,
) {
  const normalized = email.trim().toLowerCase();
  if (!normalized) return null;

  let page = 1;
  const perPage = 200;

  // Keep paging until exhausted so older test/demo accounts are still discoverable.
  while (page <= 100) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage });
    if (error) {
      throw error;
    }

    const found = data.users.find((candidate) => {
      if (!candidate.email) return false;
      if (excludeUserId && candidate.id === excludeUserId) return false;
      return candidate.email.toLowerCase() === normalized;
    });

    if (found) return found;
    if (data.users.length < perPage || data.users.length === 0) break;
    page += 1;
  }

  return null;
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

    const {
      action,
      invite_id,
      inviter_id,
      invitee_email,
      invitee_phone,
      invitee_username,
      invite_link,
      query,
      target_user_id,
      token,
      channel,
      days_valid,
    } = await req.json();

    const normalizeActionName = (value: unknown) =>
      String(value ?? "")
        .trim()
        .toLowerCase()
        .replace(/_/g, "-");

    const rawAction = normalizeActionName(action);
    const actionAliases: Record<string, string> = {
      "send-invite": "send-invite-email",
      "send-invite-link": "send-invite-email",
      "search-user": "search-users",
      "search": "search-users",
      "discover-users": "search-users",
      "search-discoverable-users": "search-users",
      "create-connection": "create-connection-request",
      "create-share-token": "create-connection-share-token",
      "create-share-link-token": "create-connection-share-token",
      "accept-invitation": "accept-invite",
      "accept-all-email-invites": "accept-by-email",
      "get-pending-invites": "get-pending",
      "link-by-invite": "link-by-inviter",
    };
    const actionName = actionAliases[rawAction] ?? (rawAction || (query ? "search-users" : rawAction));

    // Helper to get display name
    const getDisplayName = async (userId: string) => {
      const { data } = await supabase
        .from("profiles")
        .select("display_name")
        .eq("user_id", userId)
        .single();
      return data?.display_name || "Someone";
    };

    if (actionName === "seed-demo-profiles") {
      const userIds: string[] = [];

      for (const demo of demoProfiles) {
        let demoUser = await findAuthUserByEmail(supabase, demo.email);
        if (!demoUser) {
          const { data: created, error: createError } = await supabase.auth.admin.createUser({
            email: demo.email,
            password: demo.password,
            email_confirm: true,
            user_metadata: { display_name: demo.display_name },
          });
          if (createError || !created.user) {
            throw new Error(createError?.message || `Failed to create demo user ${demo.email}`);
          }
          demoUser = created.user;
        }

        userIds.push(demoUser.id);

        const { error: profileError } = await supabase.from("profiles").upsert({
          user_id: demoUser.id,
          display_name: demo.display_name,
          gender: demo.gender,
          age: demo.age,
          birthday: demo.birthday,
          anniversary: demo.anniversary,
        }, { onConflict: "user_id" });
        if (profileError) {
          throw new Error(`Failed to upsert profile for ${demo.email}: ${profileError.message}`);
        }

        const { error: discoverySettingsError } = await supabase.from("user_discovery_settings").upsert({
          user_id: demoUser.id,
          allow_name_discovery: true,
          allow_phone_discovery: true,
          share_avatar_in_discovery: false,
        }, { onConflict: "user_id" });
        if (discoverySettingsError) {
          throw new Error(`Failed to upsert discovery settings for ${demo.email}: ${discoverySettingsError.message}`);
        }

        const { error: discoveryContactsError } = await supabase.from("user_discovery_contacts").upsert({
          user_id: demoUser.id,
          phone_raw: demo.phone_raw,
        }, { onConflict: "user_id" });
        if (discoveryContactsError) {
          throw new Error(`Failed to upsert discovery contact for ${demo.email}: ${discoveryContactsError.message}`);
        }

        const { error: preferencesError } = await supabase.from("user_preferences").upsert({
          user_id: demoUser.id,
          onboarding_complete: true,
          favorites: { style: true, food: true, gifts: true },
          dislikes: { loud_logos: true, low_quality_fabric: true },
          brands: demo.ai_personalization.recommended_brands,
          places: ["Local favorites", "Saved list"],
          style_preferences: { mood: demo.profile_answers.daily_vibe },
          profile_answers: demo.profile_answers,
          ai_personalization: demo.ai_personalization,
        }, { onConflict: "user_id" });
        if (preferencesError) {
          throw new Error(`Failed to upsert preferences for ${demo.email}: ${preferencesError.message}`);
        }

        const { error: deleteSeededCardsError } = await supabase
          .from("card_entries")
          .delete()
          .eq("user_id", demoUser.id)
          .contains("field_values", { _seed_profile: DEMO_SEED_VERSION });
        if (deleteSeededCardsError) {
          throw new Error(`Failed to clear seeded cards for ${demo.email}: ${deleteSeededCardsError.message}`);
        }

        const { error: insertCardsError } = await supabase.from("card_entries").insert(
          demo.cards.map((card) => ({
            user_id: demoUser!.id,
            card_key: card.card_key,
            group_name: card.group_name,
            entry_name: card.entry_name,
            field_values: {
              ...card.field_values,
              _seed_profile: DEMO_SEED_VERSION,
              _seed_slug: demo.slug,
            },
          })),
        );
        if (insertCardsError) {
          throw new Error(`Failed to seed cards for ${demo.email}: ${insertCardsError.message}`);
        }
      }

      await createNotification(
        supabase,
        user.id,
        "Demo profiles ready",
        "Two demo profiles are now available in Add Connection search.",
        "general",
      );

      return new Response(
        JSON.stringify({
          success: true,
          seed_version: DEMO_SEED_VERSION,
          users: demoProfiles.map((demo, index) => ({
            user_id: userIds[index],
            display_name: demo.display_name,
            email: demo.email,
            phone: demo.phone_raw,
          })),
        }),
        { headers: corsHeaders },
      );
    }

    if (actionName === "send-invite-email") {
      if (!invitee_email && !invitee_phone && !invitee_username) {
        return new Response(JSON.stringify({ error: "Missing invite target" }), { status: 400, headers: corsHeaders });
      }

      const inviterName = await getDisplayName(user.id);
      const origin = req.headers.get("origin") || req.headers.get("referer")?.replace(/\/+$/, "") || "https://mygotwo.com";
      const resolvedInviteLink = invite_link || `${origin}/connect?invite=${user.id}`;

      if (invitee_email) {
        await sendInviteEmail(inviterName, invitee_email, resolvedInviteLink);
      }

      // If invitee already has an account, create an in-app notification for them
      const normalizedInviteEmail = invitee_email ? String(invitee_email).trim().toLowerCase() : null;
      let inviteeUser:
        | { id: string; email?: string | null }
        | null = null;
      if (normalizedInviteEmail) {
        try {
          inviteeUser = await findAuthUserByEmail(supabase, normalizedInviteEmail);
        } catch (lookupError) {
          console.error("Invite email lookup failed:", lookupError);
        }
      }
      if (inviteeUser) {
        await createNotification(
          supabase,
          inviteeUser.id,
          "New Connection Invite",
          `${inviterName} wants to connect with you on GoTwo!`,
          "partner"
        );
      }

      // Notify the inviter that the invite was sent
      await createNotification(
        supabase,
        user.id,
        "Invitation Sent",
        normalizedInviteEmail
          ? `Your invitation to ${normalizedInviteEmail} has been sent.`
          : "Your invite link is ready to send.",
        "general"
      );

      return new Response(JSON.stringify({ success: true, invite_link: resolvedInviteLink }), { headers: corsHeaders });
    }

    if (actionName === "search-users") {
      const rawQuery = String(query ?? "").trim();
      if (!rawQuery) {
        return new Response(JSON.stringify({ users: [] }), { headers: corsHeaders });
      }

      const normalizedPhone = normalizePhone(rawQuery);
      const normalizedEmail = rawQuery.toLowerCase();
      const normalizedUsername = normalizeUsername(rawQuery);
      const nameIds = new Set<string>();
      const phoneIds = new Set<string>();
      const emailIds = new Set<string>();

      const { data: nameMatches } = await supabase
        .from("profiles")
        .select("user_id, display_name, avatar_url")
        .ilike("display_name", `%${rawQuery}%`)
        .limit(15);

      for (const match of nameMatches ?? []) {
        if (match.user_id && match.user_id !== user.id) {
          nameIds.add(match.user_id);
        }
      }

      if (normalizedPhone) {
        const { data: phoneMatches } = await supabase
          .from("user_discovery_contacts")
          .select("user_id")
          .eq("phone_search_normalized", normalizedPhone)
          .limit(10);

        for (const match of phoneMatches ?? []) {
          if (match.user_id && match.user_id !== user.id) {
            phoneIds.add(match.user_id);
          }
        }
      }

      if (normalizedEmail.includes("@")) {
        try {
          const emailMatch = await findAuthUserByEmail(supabase, normalizedEmail, user.id);
          if (emailMatch?.id) {
            emailIds.add(emailMatch.id);
          }
        } catch (lookupError) {
          console.error("Search email lookup failed:", lookupError);
        }
      }

      if (normalizedUsername) {
        const { data: usernameMatches } = await supabase
          .from("profiles")
          .select("user_id")
          .ilike("display_name", normalizedUsername)
          .limit(10);

        for (const match of usernameMatches ?? []) {
          if (match.user_id && match.user_id !== user.id) {
            nameIds.add(match.user_id);
          }
        }
      }

      const candidateIds = [...new Set([...nameIds, ...phoneIds, ...emailIds])];
      if (candidateIds.length === 0) {
        return new Response(JSON.stringify({ users: [] }), { headers: corsHeaders });
      }

      const [{ data: profiles }, { data: settings }] = await Promise.all([
        supabase
          .from("profiles")
          .select("user_id, display_name, avatar_url")
          .in("user_id", candidateIds),
        supabase
          .from("user_discovery_settings")
          .select("user_id, allow_name_discovery, allow_phone_discovery, share_avatar_in_discovery")
          .in("user_id", candidateIds),
      ]);

      const settingsByUserId = new Map(
        (settings ?? []).map((row) => [row.user_id, row]),
      );

      const users = (profiles ?? [])
        .map((profile) => {
          const prefs = settingsByUserId.get(profile.user_id);
          const matchedByPhone = phoneIds.has(profile.user_id);
          const matchedByName = nameIds.has(profile.user_id);
          const matchedByEmail = emailIds.has(profile.user_id);
          const canUsePhone = matchedByPhone && Boolean(prefs?.allow_phone_discovery);
          const canUseName = matchedByName && (prefs?.allow_name_discovery ?? true);
          const canUseEmail = matchedByEmail;

          if (!canUsePhone && !canUseName && !canUseEmail) {
            return null;
          }

          return {
            user_id: profile.user_id,
            display_name: profile.display_name ?? "User",
            discovery_avatar_url: prefs?.share_avatar_in_discovery ? profile.avatar_url : null,
            match_type: canUseEmail ? "email" : canUsePhone ? "phone" : "name",
          };
        })
        .filter((value): value is NonNullable<typeof value> => Boolean(value))
        .slice(0, 10);

      return new Response(JSON.stringify({ users }), { headers: corsHeaders });
    }

    if (actionName === "create-connection-request") {
      if (!target_user_id) {
        return new Response(JSON.stringify({ error: "Missing target_user_id" }), { status: 400, headers: corsHeaders });
      }

      if (target_user_id === user.id) {
        return new Response(JSON.stringify({ error: "Cannot connect to yourself" }), { status: 400, headers: corsHeaders });
      }

      const { data: existing } = await supabase
        .from("couples")
        .select("id, status, inviter_id, invitee_id")
        .or(`and(inviter_id.eq.${user.id},invitee_id.eq.${target_user_id}),and(inviter_id.eq.${target_user_id},invitee_id.eq.${user.id})`)
        .limit(1);

      if (existing && existing.length > 0) {
        const current = existing[0];
        return new Response(
          JSON.stringify({
            success: true,
            status: current.status === "accepted" ? "already_connected" : "pending_exists",
            couple_id: current.id,
          }),
          { headers: corsHeaders },
        );
      }

      const { data: inserted, error } = await supabase
        .from("couples")
        .insert({
          inviter_id: user.id,
          invitee_id: target_user_id,
          invitee_email: null,
          status: "pending",
        })
        .select("id")
        .single();

      if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 400, headers: corsHeaders });
      }

      const inviterName = await getDisplayName(user.id);

      await createNotification(
        supabase,
        target_user_id,
        "New Connection Invite",
        `${inviterName} sent you a connection invite on GoTwo.`,
        "partner",
      );

      await createNotification(
        supabase,
        user.id,
        "Invitation Sent",
        "Your connection request has been sent.",
        "general",
      );

      return new Response(
        JSON.stringify({ success: true, status: "invite_sent", couple_id: inserted?.id ?? null }),
        { headers: corsHeaders },
      );
    }

    if (actionName === "create-connection-share-token") {
      const validChannel = channel === "link" ? "link" : "qr";
      const validDays = Math.max(Number(days_valid ?? 30), 1);

      const { data: inserted, error } = await supabase
        .from("connection_share_tokens")
        .insert({
          owner_user_id: user.id,
          channel: validChannel,
          expires_at: new Date(Date.now() + validDays * 24 * 60 * 60 * 1000).toISOString(),
        })
        .select("token, channel, expires_at")
        .single();

      if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 400, headers: corsHeaders });
      }

      return new Response(JSON.stringify({ success: true, share_token: inserted }), { headers: corsHeaders });
    }

    if (actionName === "accept-by-email") {
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

      // Notify all inviters that their invitation was accepted
      const accepterName = await getDisplayName(user.id);
      for (const couple of pending) {
        await createNotification(
          supabase,
          couple.inviter_id,
          "Connection Accepted! 🎉",
          `${accepterName} accepted your invitation and is now connected with you.`,
          "partner"
        );
      }

      return new Response(JSON.stringify({ success: true, accepted: pending.length }), { headers: corsHeaders });
    }

    if (actionName === "accept-invite") {
      const { data: couple } = await supabase
        .from("couples")
        .select("*")
        .eq("id", invite_id)
        .eq("status", "pending")
        .single();

      const { error } = await supabase
        .from("couples")
        .update({ invitee_id: user.id, status: "accepted" })
        .eq("id", invite_id)
        .eq("status", "pending");

      if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 400, headers: corsHeaders });
      }

      // Notify the inviter
      if (couple) {
        const accepterName = await getDisplayName(user.id);
        await createNotification(
          supabase,
          couple.inviter_id,
          "Connection Accepted! 🎉",
          `${accepterName} accepted your invitation and is now connected with you.`,
          "partner"
        );
      }

      return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
    }

    if (actionName === "link-by-inviter") {
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

      // Notify both parties of the new connection
      const connectorName = await getDisplayName(user.id);
      const inviterName = await getDisplayName(inviter_id);

      await createNotification(
        supabase,
        inviter_id,
        "New Connection! 🎉",
        `${connectorName} connected with you via your invite link.`,
        "partner"
      );

      await createNotification(
        supabase,
        user.id,
        "Connected! 🎉",
        `You're now connected with ${inviterName}.`,
        "partner"
      );

      return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
    }

    if (actionName === "link-by-token") {
      if (!token) {
        return new Response(JSON.stringify({ error: "Missing token" }), { status: 400, headers: corsHeaders });
      }

      const { data: tokenRow, error: tokenError } = await supabase
        .from("connection_share_tokens")
        .select("id, owner_user_id, expires_at, is_active, used_count")
        .eq("token", token)
        .eq("is_active", true)
        .gte("expires_at", new Date().toISOString())
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (tokenError || !tokenRow) {
        return new Response(JSON.stringify({ error: "Invalid or expired token" }), { status: 404, headers: corsHeaders });
      }

      if (tokenRow.owner_user_id === user.id) {
        return new Response(JSON.stringify({ error: "Cannot use your own QR token" }), { status: 400, headers: corsHeaders });
      }

      const { data: existing } = await supabase
        .from("couples")
        .select("id, status, inviter_id, invitee_id")
        .or(`and(inviter_id.eq.${tokenRow.owner_user_id},invitee_id.eq.${user.id}),and(inviter_id.eq.${user.id},invitee_id.eq.${tokenRow.owner_user_id})`)
        .limit(1);

      if (existing && existing.length > 0) {
        await supabase
          .from("connection_share_tokens")
          .update({ used_count: tokenRow.used_count + 1 })
          .eq("id", tokenRow.id);

        return new Response(
          JSON.stringify({
            success: true,
            status: existing[0].status === "accepted" ? "already_connected" : "pending_exists",
            couple_id: existing[0].id,
          }),
          { headers: corsHeaders },
        );
      }

      const { data: inserted, error } = await supabase
        .from("couples")
        .insert({
          inviter_id: tokenRow.owner_user_id,
          invitee_id: user.id,
          invitee_email: user.email ?? null,
          status: "pending",
        })
        .select("id")
        .single();

      if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 400, headers: corsHeaders });
      }

      await supabase
        .from("connection_share_tokens")
        .update({ used_count: tokenRow.used_count + 1 })
        .eq("id", tokenRow.id);

      const scannerName = await getDisplayName(user.id);
      const ownerName = await getDisplayName(tokenRow.owner_user_id);

      await createNotification(
        supabase,
        tokenRow.owner_user_id,
        "New Connection Invite",
        `${scannerName} scanned your QR code and sent a connection invite.`,
        "partner",
      );

      await createNotification(
        supabase,
        user.id,
        "Invite Sent",
        `Your connection invite to ${ownerName} has been sent.`,
        "general",
      );

      return new Response(
        JSON.stringify({ success: true, status: "invite_sent", couple_id: inserted?.id ?? null }),
        { headers: corsHeaders },
      );
    }

    if (actionName === "get-pending") {
      const { data } = await supabase
        .from("couples")
        .select("*")
        .eq("status", "pending")
        .or(`invitee_id.eq.${user.id},and(invitee_email.eq.${user.email},invitee_id.is.null)`);

      return new Response(JSON.stringify({ pending: data ?? [] }), { headers: corsHeaders });
    }

    return new Response(
      JSON.stringify({ error: "Unknown action", received_action: rawAction || null }),
      { status: 400, headers: corsHeaders },
    );
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: corsHeaders });
  }
});
