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
  if (!rawQuery) return [];

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
  if (candidateIds.length === 0) return [];

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

  const settingsByUserId = new Map((settings ?? []).map((row) => [row.user_id, row]));

  return (profiles ?? [])
    .map((profile) => {
      const prefs = settingsByUserId.get(profile.user_id);
      const matchedByPhone = phoneIds.has(profile.user_id);
      const matchedByName = nameIds.has(profile.user_id);
      const matchedByEmail = emailIds.has(profile.user_id);

      const canUsePhone = matchedByPhone && (prefs?.allow_phone_discovery ?? true);
      const canUseName = matchedByName && (prefs?.allow_name_discovery ?? true);
      const canUseEmail = matchedByEmail;

      if (!canUsePhone && !canUseName && !canUseEmail) return null;

      return {
        user_id: profile.user_id,
        display_name: profile.display_name ?? "User",
        discovery_avatar_url: prefs?.share_avatar_in_discovery ? profile.avatar_url : null,
        match_type: canUseEmail ? "email" : canUsePhone ? "phone" : "name",
      };
    })
    .filter((value): value is NonNullable<typeof value> => Boolean(value))
    .slice(0, 25);
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
    const { data: authData, error: userError } = await supabase.auth.getUser(token);
    if (userError || !authData.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: corsHeaders });
    }

    const { action, query } = await req.json().catch(() => ({ action: "search", query: "" }));
    const actionName = String(action ?? "search").trim().toLowerCase();

    if (actionName === "seed-demo-profiles") {
      await ensureDemoProfiles(supabase);
      return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
    }

    const searchQuery = String(query ?? "").trim();
    let users = await searchUsers(supabase, authData.user.id, searchQuery);

    if (users.length === 0 && /(abby|jules|gotwo\.local)/i.test(searchQuery)) {
      await ensureDemoProfiles(supabase);
      users = await searchUsers(supabase, authData.user.id, searchQuery);
    }

    return new Response(JSON.stringify({ users }), { headers: corsHeaders });
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), { status: 500, headers: corsHeaders });
  }
});

