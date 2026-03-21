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

async function findAuthUserByEmail(
  supabase: ReturnType<typeof createClient>,
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
  supabase: ReturnType<typeof createClient>,
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

async function ensureDemoProfiles(supabase: ReturnType<typeof createClient>) {
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
  supabase: ReturnType<typeof createClient>,
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
  supabase: ReturnType<typeof createClient>,
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
