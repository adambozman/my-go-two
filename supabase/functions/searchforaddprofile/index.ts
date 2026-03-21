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

    const found = data.users.find((candidate: any) => {
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
  viewerClient: any,
  adminClient: any,
  requesterId: string,
  query: string,
) {
  const rawQuery = String(query ?? "").trim();
  if (!rawQuery) return [] as SearchResult[];

  const normalizedEmail = rawQuery.toLowerCase();
  const emailIds = new Set<string>();

  if (normalizedEmail.includes("@")) {
    const emailMatch = await findAuthUserByEmail(adminClient, normalizedEmail, requesterId);
    if (emailMatch?.id) emailIds.add(emailMatch.id);
  }

  const { data: discoverableRows, error: discoverableError } = await viewerClient.rpc("search_discoverable_users", {
    p_query: rawQuery,
    p_limit: 25,
  });
  if (discoverableError) {
    throw new Error(discoverableError.message);
  }

  const rpcResults = (Array.isArray(discoverableRows) ? discoverableRows : [])
    .filter((row): row is SearchResult => Boolean(row?.user_id))
    .map((row) => ({
      user_id: String(row.user_id),
      display_name: row.display_name ?? "User",
      discovery_avatar_url: row.discovery_avatar_url ?? null,
      match_type: row.match_type === "phone" ? "phone" : "name",
    }));

  const combinedById = new Map<string, SearchResult>();
  for (const row of rpcResults) {
    if (row.user_id !== requesterId) combinedById.set(row.user_id, row);
  }

  if (emailIds.size > 0) {
    const candidateIds = [...emailIds];
    const [{ data: profiles }, { data: settings }] = await Promise.all([
      adminClient
        .from("profiles")
        .select("user_id, display_name, avatar_url")
        .in("user_id", candidateIds),
      adminClient
        .from("user_discovery_settings")
        .select("user_id, share_avatar_in_discovery")
        .in("user_id", candidateIds),
    ]);

    const authUsersById = await findAuthUsersByIds(adminClient, candidateIds);
    const profilesByUserId = new Map((profiles ?? []).map((row) => [row.user_id, row]));
    const settingsByUserId = new Map((settings ?? []).map((row) => [row.user_id, row]));

    for (const userId of candidateIds) {
      if (combinedById.has(userId) || userId === requesterId) continue;
      const profile = profilesByUserId.get(userId);
      const prefs = settingsByUserId.get(userId);
      const authUser = authUsersById.get(userId);
      combinedById.set(userId, {
        user_id: userId,
        display_name: profile?.display_name ?? getDisplayNameFromAuthUser(authUser),
        discovery_avatar_url: prefs?.share_avatar_in_discovery ? profile?.avatar_url ?? null : null,
        match_type: "email",
      });
    }
  }

  return Array.from(combinedById.values()).slice(0, 25);
}

async function createConnectionRequest(
  viewerClient: any,
  targetUserId: string,
) {
  const { data, error } = await viewerClient.rpc("create_connection_request", {
    p_target_user_id: targetUserId,
  });
  if (error) {
    return { success: false, error: error.message, statusCode: 400 };
  }
  const first = Array.isArray(data) ? data[0] : null;
  return {
    success: true,
    status: first?.request_status ?? "invite_sent",
    couple_id: first?.couple_id ?? null,
    statusCode: 200,
  };
}

async function createConnectionShareToken(
  viewerClient: any,
  channel: string,
  daysValid: number,
) {
  const { data, error } = await viewerClient.rpc("issue_connection_share_token", {
    p_channel: channel,
    p_days_valid: Math.max(daysValid, 1),
  });
  const first = Array.isArray(data) ? data[0] : null;
  if (error || !first) {
    throw new Error(error?.message || "Could not create a connection share token");
  }

  return first as ShareTokenRow;
}

async function sendConnectionInvite(
  viewerClient: any,
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
      viewerClient,
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
  supabase: any,
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
  supabase: any,
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
  supabase: any,
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
  viewerClient: any,
  rawToken: string,
) {
  if (!rawToken) throw new Error("Missing token");

  const { data, error } = await viewerClient.rpc("create_connection_invite_from_token", {
    p_token: rawToken,
  });
  if (error) throw new Error(error.message);
  const first = Array.isArray(data) ? data[0] : null;
  return {
    success: true,
    status: first?.result ?? "invite_sent",
    couple_id: first?.couple_id ?? null,
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "No auth" }), { status: 401, headers: corsHeaders });
    }

    const adminClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
    const viewerClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } },
    );

    const token = authHeader.replace("Bearer ", "");
    const { data: authData, error: authError } = await adminClient.auth.getUser(token);
    if (authError || !authData.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: corsHeaders });
    }

    const payload = await req.json().catch(() => ({}));
    const actionName = String(payload?.action ?? "search").trim().toLowerCase();

    if (actionName === "seed-demo-profiles") {
      await ensureDemoProfiles(adminClient);
      return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
    }

    if (actionName === "create-connection-request") {
      const targetUserId = String(payload?.target_user_id ?? "").trim();
      const result = await createConnectionRequest(viewerClient, targetUserId);
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
        viewerClient,
        String(payload?.channel ?? "qr"),
        Number(payload?.days_valid ?? 30),
      );
      return new Response(JSON.stringify({ success: true, share_token: shareToken }), { headers: corsHeaders });
    }

    if (actionName === "send-invite-email") {
      const result = await sendConnectionInvite(viewerClient, adminClient, authData.user.id, payload, req);
      return new Response(JSON.stringify(result), { headers: corsHeaders });
    }

    if (actionName === "get-pending") {
      const pending = await getPendingInvites(adminClient, authData.user.id, authData.user.email ?? null);
      return new Response(JSON.stringify({ pending }), { headers: corsHeaders });
    }

    if (actionName === "accept-invite") {
      const inviteId = String(payload?.invite_id ?? "").trim();
      const result = await acceptInvite(adminClient, authData.user.id, inviteId);
      return new Response(JSON.stringify(result), { headers: corsHeaders });
    }

    if (actionName === "accept-by-email") {
      const result = await acceptInvitesByEmail(adminClient, authData.user.id, authData.user.email ?? null);
      return new Response(JSON.stringify(result), { headers: corsHeaders });
    }

    if (actionName === "link-by-inviter") {
      const inviterId = String(payload?.inviter_id ?? "").trim();
      const result = await linkByInviter(adminClient, authData.user.id, authData.user.email ?? null, inviterId);
      return new Response(JSON.stringify(result), { headers: corsHeaders });
    }

    if (actionName === "link-by-token") {
      const result = await linkByToken(viewerClient, String(payload?.token ?? "").trim());
      return new Response(JSON.stringify(result), { headers: corsHeaders });
    }

    const searchQuery = String(payload?.query ?? "").trim();
    let users = await searchUsers(viewerClient, adminClient, authData.user.id, searchQuery);

    if (users.length === 0 && /(abby|jules|gotwo\.local)/i.test(searchQuery)) {
      await ensureDemoProfiles(adminClient);
      users = await searchUsers(viewerClient, adminClient, authData.user.id, searchQuery);
    }

    return new Response(JSON.stringify({ users }), { headers: corsHeaders });
  } catch (error: unknown) {
    return new Response(JSON.stringify({ error: getErrorMessage(error) }), { status: 500, headers: corsHeaders });
  }
});
