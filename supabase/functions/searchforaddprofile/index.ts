import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type DemoProfile = {
  email: string;
  password: string;
  display_name: string;
  gender: "female" | "male" | "non-binary";
  age: number;
  birthday: string;
  phone_raw: string;
};

type SearchResult = {
  user_id: string;
  display_name: string;
  discovery_avatar_url: string | null;
  match_type: "name" | "phone" | "email";
};

type AuthUserSummary = {
  id: string;
  email: string | null;
  user_metadata?: Record<string, unknown> | null;
};

type ShareTokenRow = {
  id: string;
  token: string;
  channel: string;
  expires_at: string;
  owner_user_id?: string;
  is_active?: boolean;
  used_count?: number;
};

const demoProfiles: DemoProfile[] = [
  {
    email: "abby.demo@gotwo.local",
    password: "GoTwoDemo!2026",
    display_name: "abby",
    gender: "female",
    age: 29,
    birthday: "1997-04-18",
    phone_raw: "(312) 555-0188",
  },
  {
    email: "jules.demo@gotwo.local",
    password: "GoTwoDemo!2026",
    display_name: "jules",
    gender: "non-binary",
    age: 33,
    birthday: "1993-11-07",
    phone_raw: "(312) 555-0199",
  },
];

function normalizePhone(value: string | null | undefined) {
  return (value ?? "").replace(/\D/g, "");
}

function normalizeUsername(value: string | null | undefined) {
  return (value ?? "").trim().replace(/^@+/, "");
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

async function sendInviteEmail(inviterName: string, inviteeEmail: string, inviteLink: string) {
  const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");
  if (!lovableApiKey) {
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
        <strong>${inviterName}</strong> wants to connect with you on GoTwo.
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
        "Authorization": `Bearer ${lovableApiKey}`,
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
    }
  } catch (error: unknown) {
    console.error("Email send error:", error);
  }
}

async function createNotification(
  supabase: any,
  userId: string,
  title: string,
  body: string,
  type = "partner",
) {
  await supabase.from("notifications").insert({
    user_id: userId,
    title,
    body,
    type,
    is_read: false,
  });
}

async function getDisplayName(
  supabase: any,
  userId: string,
) {
  const { data } = await supabase
    .from("profiles")
    .select("display_name")
    .eq("user_id", userId)
    .maybeSingle();

  return data?.display_name?.trim() || "Someone";
}

async function findAuthUserByEmail(
  supabase: any,
  email: string,
  excludeUserId?: string,
) {
  const normalized = email.trim().toLowerCase();
  if (!normalized) return null;

  let page = 1;
  const perPage = 200;

  while (page <= 100) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage });
    if (error) throw error;

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

async function findAuthUsersByIds(
  supabase: any,
  userIds: string[],
) {
  const wantedIds = new Set(userIds.filter(Boolean));
  const usersById = new Map<string, AuthUserSummary>();
  if (wantedIds.size === 0) return usersById;

  let page = 1;
  const perPage = 200;

  while (page <= 100 && usersById.size < wantedIds.size) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage });
    if (error) throw error;

    for (const candidate of data.users) {
      if (wantedIds.has(candidate.id)) {
        usersById.set(candidate.id, {
          id: candidate.id,
          email: candidate.email ?? null,
          user_metadata: (candidate.user_metadata ?? null) as Record<string, unknown> | null,
        });
      }
    }

    if (data.users.length < perPage || data.users.length === 0) break;
    page += 1;
  }

  return usersById;
}

function getDisplayNameFromAuthUser(user: AuthUserSummary | undefined) {
  if (!user) return "User";

  const metadataName = typeof user.user_metadata?.display_name === "string"
    ? user.user_metadata.display_name.trim()
    : "";
  if (metadataName) return metadataName;

  const emailName = typeof user.email === "string" && user.email.includes("@")
    ? user.email.split("@")[0].trim()
    : "";
  return emailName || "User";
}

async function ensureDemoProfiles(supabase: any) {
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

    const { error: profileError } = await supabase.from("profiles").upsert({
      user_id: demoUser.id,
      display_name: demo.display_name,
      gender: demo.gender,
      age: demo.age,
      birthday: demo.birthday,
    }, { onConflict: "user_id" });
    if (profileError) throw new Error(`Failed profile upsert for ${demo.email}: ${profileError.message}`);

    const { error: settingsError } = await supabase.from("user_discovery_settings").upsert({
      user_id: demoUser.id,
      allow_name_discovery: true,
      allow_phone_discovery: true,
      share_avatar_in_discovery: false,
    }, { onConflict: "user_id" });
    if (settingsError) throw new Error(`Failed discovery settings upsert for ${demo.email}: ${settingsError.message}`);

    const { error: contactsError } = await supabase.from("user_discovery_contacts").upsert({
      user_id: demoUser.id,
      phone_raw: demo.phone_raw,
    }, { onConflict: "user_id" });
    if (contactsError) throw new Error(`Failed discovery contacts upsert for ${demo.email}: ${contactsError.message}`);
  }
}

async function searchUsers(
  supabase: any,
  requesterId: string,
  query: string,
) {
  const rawQuery = String(query ?? "").trim();
  if (!rawQuery) return [] as SearchResult[];

  const collapsedQuery = rawQuery.replace(/\s+/g, " ");
  const normalizedPhone = normalizePhone(rawQuery);
  const normalizedEmail = rawQuery.toLowerCase();
  const normalizedUsername = normalizeUsername(rawQuery);

  const nameIds = new Set<string>();
  const phoneIds = new Set<string>();
  const emailIds = new Set<string>();

  const { data: nameMatches } = await supabase
    .from("profiles")
    .select("user_id, display_name, avatar_url")
    .ilike("display_name", `%${collapsedQuery}%`)
    .limit(25);

  for (const match of nameMatches ?? []) {
    if (match.user_id && match.user_id !== requesterId) nameIds.add(match.user_id);
  }

  if (normalizedPhone) {
    const { data: phoneMatches } = await supabase
      .from("user_discovery_contacts")
      .select("user_id")
      .eq("phone_search_normalized", normalizedPhone)
      .limit(25);
    for (const match of phoneMatches ?? []) {
      if (match.user_id && match.user_id !== requesterId) phoneIds.add(match.user_id);
    }
  }

  if (normalizedEmail.includes("@")) {
    const emailMatch = await findAuthUserByEmail(supabase, normalizedEmail, requesterId);
    if (emailMatch?.id) emailIds.add(emailMatch.id);
  }

  if (normalizedUsername) {
    const { data: usernameMatches } = await supabase
      .from("profiles")
      .select("user_id")
      .ilike("display_name", normalizedUsername)
      .limit(25);
    for (const match of usernameMatches ?? []) {
      if (match.user_id && match.user_id !== requesterId) nameIds.add(match.user_id);
    }
  }

  const candidateIds = [...new Set([...nameIds, ...phoneIds, ...emailIds])];
  if (candidateIds.length === 0) return [] as SearchResult[];

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

  const authUsersById = await findAuthUsersByIds(supabase, candidateIds);
  const profilesByUserId = new Map((profiles ?? []).map((row) => [row.user_id, row]));

  const settingsByUserId = new Map((settings ?? []).map((row) => [row.user_id, row]));

  return candidateIds
    .map((userId) => {
      const profile = profilesByUserId.get(userId);
      const prefs = settingsByUserId.get(userId);
      const authUser = authUsersById.get(userId);
      const matchedByPhone = phoneIds.has(userId);
      const matchedByName = nameIds.has(userId);
      const matchedByEmail = emailIds.has(userId);

      const canUsePhone = matchedByPhone && (prefs?.allow_phone_discovery ?? true);
      const canUseName = matchedByName && (prefs?.allow_name_discovery ?? true);
      const canUseEmail = matchedByEmail;

      if (!canUsePhone && !canUseName && !canUseEmail) return null;

      return {
        user_id: userId,
        display_name: profile?.display_name ?? getDisplayNameFromAuthUser(authUser),
        discovery_avatar_url: prefs?.share_avatar_in_discovery ? profile?.avatar_url ?? null : null,
        match_type: canUseEmail ? "email" : canUsePhone ? "phone" : "name",
      } as SearchResult;
    })
    .filter((value): value is SearchResult => Boolean(value))
    .slice(0, 25);
}

async function createConnectionRequest(
  supabase: any,
  requesterId: string,
  targetUserId: string,
) {
  if (!targetUserId) {
    return { success: false, error: "Missing target_user_id", statusCode: 400 };
  }

  if (targetUserId === requesterId) {
    return { success: false, error: "Cannot connect to yourself", statusCode: 400 };
  }

  const { data: existing } = await supabase
    .from("couples")
    .select("id, status, inviter_id, invitee_id")
    .or(`and(inviter_id.eq.${requesterId},invitee_id.eq.${targetUserId}),and(inviter_id.eq.${targetUserId},invitee_id.eq.${requesterId})`)
    .limit(1);

  if (existing && existing.length > 0) {
    const current = existing[0];
    return {
      success: true,
      status: current.status === "accepted" ? "already_connected" : "pending_exists",
      couple_id: current.id,
      statusCode: 200,
    };
  }

  const { data: inserted, error } = await supabase
    .from("couples")
    .insert({
      inviter_id: requesterId,
      invitee_id: targetUserId,
      invitee_email: null,
      status: "pending",
    })
    .select("id")
    .single();

  if (error) {
    return { success: false, error: error.message, statusCode: 400 };
  }

  await supabase.from("notifications").insert({
    user_id: targetUserId,
    title: "New Connection Invite",
    body: "You received a connection invite on GoTwo.",
    type: "partner",
    is_read: false,
  });

  await supabase.from("notifications").insert({
    user_id: requesterId,
    title: "Invitation Sent",
    body: "Your connection request has been sent.",
    type: "general",
    is_read: false,
  });

  return {
    success: true,
    status: "invite_sent",
    couple_id: inserted?.id ?? null,
    statusCode: 200,
  };
}

async function createConnectionShareToken(
  supabase: any,
  ownerUserId: string,
  channel: string,
  daysValid: number,
) {
  const validChannel = channel === "link" ? "link" : "qr";
  const validDays = Math.max(daysValid, 1);

  const { data, error } = await supabase
    .from("connection_share_tokens")
    .insert({
      owner_user_id: ownerUserId,
      channel: validChannel,
      expires_at: new Date(Date.now() + validDays * 24 * 60 * 60 * 1000).toISOString(),
    })
    .select("id, token, channel, expires_at")
    .single();

  if (error || !data) {
    throw new Error(error?.message || "Could not create a connection share token");
  }

  return data as ShareTokenRow;
}

async function sendConnectionInvite(
  supabase: any,
  requesterId: string,
  payload: Record<string, unknown>,
  req: Request,
) {
  const inviteeEmail = typeof payload.invitee_email === "string" ? payload.invitee_email.trim().toLowerCase() : "";
  const inviteePhone = typeof payload.invitee_phone === "string" ? payload.invitee_phone.trim() : "";
  const inviteeUsername = typeof payload.invitee_username === "string" ? payload.invitee_username.trim() : "";
  let inviteLink = typeof payload.invite_link === "string" ? payload.invite_link.trim() : "";

  if (!inviteeEmail && !inviteePhone && !inviteeUsername) {
    throw new Error("Missing invite target");
  }

  if (!inviteLink) {
    const shareToken = await createConnectionShareToken(
      supabase,
      requesterId,
      "link",
      Number(payload.days_valid ?? 30),
    );
    const origin = req.headers.get("origin")
      || req.headers.get("referer")?.replace(/\/+$/, "")
      || "https://mygotwo.com";
    inviteLink = `${origin}/connect?token=${shareToken.token}`;
  }

  const inviterName = await getDisplayName(supabase, requesterId);

  if (inviteeEmail) {
    await sendInviteEmail(inviterName, inviteeEmail, inviteLink);
    const inviteeUser = await findAuthUserByEmail(supabase, inviteeEmail);
    if (inviteeUser?.id) {
      await createNotification(
        supabase,
        inviteeUser.id,
        "New Connection Invite",
        `${inviterName} wants to connect with you on GoTwo!`,
        "partner",
      );
    }
  }

  await createNotification(
    supabase,
    requesterId,
    "Invitation Sent",
    inviteeEmail ? `Your invitation to ${inviteeEmail} has been sent.` : "Your invite link is ready to send.",
    "general",
  );

  return { success: true, invite_link: inviteLink };
}

async function getPendingInvites(
  supabase: any,
  userId: string,
  email: string | null,
) {
  const { data, error } = await supabase
    .from("couples")
    .select("*")
    .eq("status", "pending")
    .or(`invitee_id.eq.${userId},and(invitee_email.eq.${email},invitee_id.is.null)`);

  if (error) throw new Error(error.message);
  return data ?? [];
}

async function acceptInvite(
  supabase: ReturnType<typeof createClient>,
  userId: string,
  inviteId: string,
) {
  const { data: couple } = await supabase
    .from("couples")
    .select("*")
    .eq("id", inviteId)
    .eq("status", "pending")
    .maybeSingle();

  const { error } = await supabase
    .from("couples")
    .update({ invitee_id: userId, status: "accepted" })
    .eq("id", inviteId)
    .eq("status", "pending");

  if (error) throw new Error(error.message);

  if (couple?.inviter_id) {
    const accepterName = await getDisplayName(supabase, userId);
    await createNotification(
      supabase,
      couple.inviter_id,
      "Connection Accepted!",
      `${accepterName} accepted your invitation and is now connected with you.`,
      "partner",
    );
  }

  return { success: true };
}

async function acceptInvitesByEmail(
  supabase: ReturnType<typeof createClient>,
  userId: string,
  email: string | null,
) {
  if (!email) throw new Error("Missing email");

  const { data: pending, error: pendingError } = await supabase
    .from("couples")
    .select("*")
    .eq("invitee_email", email)
    .eq("status", "pending")
    .is("invitee_id", null);

  if (pendingError) throw new Error(pendingError.message);
  if (!pending || pending.length === 0) {
    throw new Error("No pending invites found");
  }

  const { error } = await supabase
    .from("couples")
    .update({ invitee_id: userId, status: "accepted" })
    .eq("invitee_email", email)
    .eq("status", "pending");

  if (error) throw new Error(error.message);

  const accepterName = await getDisplayName(supabase, userId);
  for (const couple of pending) {
    await createNotification(
      supabase,
      couple.inviter_id,
      "Connection Accepted!",
      `${accepterName} accepted your invitation and is now connected with you.`,
      "partner",
    );
  }

  return { success: true, accepted: pending.length };
}

async function linkByInviter(
  supabase: ReturnType<typeof createClient>,
  userId: string,
  email: string | null,
  inviterId: string,
) {
  if (!inviterId) throw new Error("Missing inviter_id");
  if (inviterId === userId) throw new Error("Cannot link to yourself");

  const { data: existing } = await supabase
    .from("couples")
    .select("id")
    .or(`and(inviter_id.eq.${inviterId},invitee_id.eq.${userId}),and(inviter_id.eq.${userId},invitee_id.eq.${inviterId})`)
    .eq("status", "accepted");

  if (existing && existing.length > 0) {
    return { success: true, status: "already_connected" };
  }

  const { error } = await supabase.from("couples").insert({
    inviter_id: inviterId,
    invitee_id: userId,
    invitee_email: email,
    status: "accepted",
  });

  if (error) throw new Error(error.message);

  const connectorName = await getDisplayName(supabase, userId);
  const inviterName = await getDisplayName(supabase, inviterId);

  await createNotification(
    supabase,
    inviterId,
    "New Connection!",
    `${connectorName} connected with you via your invite link.`,
    "partner",
  );

  await createNotification(
    supabase,
    userId,
    "Connected!",
    `You're now connected with ${inviterName}.`,
    "partner",
  );

  return { success: true, status: "connected" };
}

async function linkByToken(
  supabase: ReturnType<typeof createClient>,
  userId: string,
  email: string | null,
  rawToken: string,
) {
  if (!rawToken) throw new Error("Missing token");

  const { data: tokenRow, error: tokenError } = await supabase
    .from("connection_share_tokens")
    .select("id, token, owner_user_id, expires_at, is_active, used_count")
    .eq("token", rawToken)
    .eq("is_active", true)
    .gte("expires_at", new Date().toISOString())
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (tokenError || !tokenRow) {
    throw new Error("Invalid or expired token");
  }

  if (tokenRow.owner_user_id === userId) {
    throw new Error("Cannot use your own QR token");
  }

  const { data: existing } = await supabase
    .from("couples")
    .select("id, status")
    .or(`and(inviter_id.eq.${tokenRow.owner_user_id},invitee_id.eq.${userId}),and(inviter_id.eq.${userId},invitee_id.eq.${tokenRow.owner_user_id})`)
    .limit(1);

  await supabase
    .from("connection_share_tokens")
    .update({ used_count: Number(tokenRow.used_count ?? 0) + 1 })
    .eq("id", tokenRow.id);

  if (existing && existing.length > 0) {
    return {
      success: true,
      status: existing[0].status === "accepted" ? "already_connected" : "pending_exists",
      couple_id: existing[0].id,
    };
  }

  const { data: inserted, error } = await supabase
    .from("couples")
    .insert({
      inviter_id: tokenRow.owner_user_id,
      invitee_id: userId,
      invitee_email: email,
      status: "pending",
    })
    .select("id")
    .single();

  if (error) throw new Error(error.message);

  const scannerName = await getDisplayName(supabase, userId);
  const ownerName = await getDisplayName(supabase, tokenRow.owner_user_id);

  await createNotification(
    supabase,
    tokenRow.owner_user_id,
    "New Connection Invite",
    `${scannerName} scanned your QR code and sent a connection invite.`,
    "partner",
  );

  await createNotification(
    supabase,
    userId,
    "Invite Sent",
    `Your connection invite to ${ownerName} has been sent.`,
    "general",
  );

  return { success: true, status: "invite_sent", couple_id: inserted?.id ?? null };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "No auth" }), { status: 401, headers: corsHeaders });
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: authData, error: authError } = await supabase.auth.getUser(token);
    if (authError || !authData.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: corsHeaders });
    }

    const payload = await req.json().catch(() => ({}));
    const actionName = String(payload?.action ?? "search").trim().toLowerCase();

    if (actionName === "seed-demo-profiles") {
      await ensureDemoProfiles(supabase);
      return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
    }

    if (actionName === "create-connection-request") {
      const targetUserId = String(payload?.target_user_id ?? "").trim();
      const result = await createConnectionRequest(supabase, authData.user.id, targetUserId);
      if (!result.success) {
        return new Response(JSON.stringify({ error: result.error }), { status: result.statusCode, headers: corsHeaders });
      }
      return new Response(
        JSON.stringify({ success: true, status: result.status, couple_id: result.couple_id }),
        { headers: corsHeaders },
      );
    }

    if (actionName === "create-connection-share-token") {
      const shareToken = await createConnectionShareToken(
        supabase,
        authData.user.id,
        String(payload?.channel ?? "qr"),
        Number(payload?.days_valid ?? 30),
      );
      return new Response(JSON.stringify({ success: true, share_token: shareToken }), { headers: corsHeaders });
    }

    if (actionName === "send-invite-email") {
      const result = await sendConnectionInvite(supabase, authData.user.id, payload, req);
      return new Response(JSON.stringify(result), { headers: corsHeaders });
    }

    if (actionName === "get-pending") {
      const pending = await getPendingInvites(supabase, authData.user.id, authData.user.email ?? null);
      return new Response(JSON.stringify({ pending }), { headers: corsHeaders });
    }

    if (actionName === "accept-invite") {
      const inviteId = String(payload?.invite_id ?? "").trim();
      const result = await acceptInvite(supabase, authData.user.id, inviteId);
      return new Response(JSON.stringify(result), { headers: corsHeaders });
    }

    if (actionName === "accept-by-email") {
      const result = await acceptInvitesByEmail(supabase, authData.user.id, authData.user.email ?? null);
      return new Response(JSON.stringify(result), { headers: corsHeaders });
    }

    if (actionName === "link-by-inviter") {
      const inviterId = String(payload?.inviter_id ?? "").trim();
      const result = await linkByInviter(supabase, authData.user.id, authData.user.email ?? null, inviterId);
      return new Response(JSON.stringify(result), { headers: corsHeaders });
    }

    if (actionName === "link-by-token") {
      const result = await linkByToken(
        supabase,
        authData.user.id,
        authData.user.email ?? null,
        String(payload?.token ?? "").trim(),
      );
      return new Response(JSON.stringify(result), { headers: corsHeaders });
    }

    const searchQuery = String(payload?.query ?? "").trim();
    let users = await searchUsers(supabase, authData.user.id, searchQuery);

    if (users.length === 0 && /(abby|jules|gotwo\.local)/i.test(searchQuery)) {
      await ensureDemoProfiles(supabase);
      users = await searchUsers(supabase, authData.user.id, searchQuery);
    }

    return new Response(JSON.stringify({ users }), { headers: corsHeaders });
  } catch (error: unknown) {
    return new Response(JSON.stringify({ error: getErrorMessage(error) }), { status: 500, headers: corsHeaders });
  }
});
