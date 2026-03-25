import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/json",
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

type DemoCardEntrySeed = {
  card_key: string;
  group_name: string;
  entry_name: string;
  field_values: Record<string, string>;
  image_url?: string | null;
};

type DemoContentSeed = {
  anniversary?: string | null;
  favorites: Record<string, unknown>;
  dislikes: Record<string, unknown>;
  brands: Record<string, unknown>;
  style_preferences: Record<string, unknown>;
  profile_answers: Record<string, string | string[]>;
  ai_personalization: Record<string, unknown>;
  weekly_recommendations: Array<Record<string, unknown>>;
  card_entries: DemoCardEntrySeed[];
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

type AppSupabaseClient = ReturnType<typeof createClient>;

type ProfileIdentityRow = {
  user_id: string;
  display_name: string | null;
  avatar_url?: string | null;
};

type DiscoverySettingsRow = {
  user_id: string;
  allow_name_discovery?: boolean | null;
  allow_phone_discovery?: boolean | null;
  share_avatar_in_discovery?: boolean | null;
};

type DiscoveryContactRow = {
  user_id: string | null;
};

type SearchRpcRow = {
  user_id: string;
  display_name: string | null;
  discovery_avatar_url: string | null;
  match_type: string | null;
};

type ConnectionRequestRow = {
  couple_id?: string | null;
  request_status?: string | null;
};

type LinkByTokenRow = {
  result?: string | null;
  couple_id?: string | null;
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

const demoContentByEmail: Record<string, DemoContentSeed> = {
  "abby.demo@gotwo.local": {
    anniversary: "2021-09-12",
    favorites: {
      likes: ["gold jewelry", "clean girl beauty", "weekend travel", "matcha", "sushi", "romantic dinners"],
      stores: ["Aritzia", "Sezane", "Reformation", "Nordstrom", "Mejuri"],
      experiences: ["spa day", "coastal weekend", "wine tasting", "chef's tasting menu"],
    },
    dislikes: {
      colors: ["neon orange", "lime green"],
      gifts: ["novelty mugs", "cheap fleece throws"],
      textures: ["scratchy wool", "plasticky faux leather"],
    },
    brands: {
      loves: ["Aritzia", "Reformation", "Sezane", "Mejuri", "Veja"],
      open_to: ["Lululemon", "Jenni Kayne", "Dagne Dover"],
      avoid: ["Fashion Nova", "Shein"],
    },
    style_preferences: {
      vibe: ["classic", "minimalist", "polished"],
      palette: ["ivory", "navy", "camel", "soft black"],
      silhouettes: ["tailored trousers", "silk tank", "cropped cardigan", "structured coat"],
    },
    profile_answers: {
      "sf-01": ["classic", "minimalist", "trendy"],
      "sf-02": "navy",
      "sf-04": "tailored",
      "sf-06": ["sneakers", "boots", "heels"],
      "sf-10": ["luxury", "sustainable", "high-street"],
      "sf-13": "put-together",
      "sf-14": "fresh",
      "sf-17": "balanced",
      "fd-02": "japanese",
      "fd-04": "iced",
      "fd-06": "dine-out",
      "fd-07": "cocktails",
      "fd-09": "sometimes",
      "tot-03": "Yes",
      "tot-06": "Yes",
      "tot-16": "Yes",
      "tot-21": "Yes",
      "tot-25": "Yes",
      "tot-29": "Yes",
      "tot-43": "Savory",
      "tot-45": "Takeout",
      "tot-48": "Sushi",
      "tot-54": "Neutrals",
      "tot-56": "Boots",
      "tot-58": "Gold",
      "tot-60": "Blazer",
      "tot-63": "Morning Person",
      "tot-64": "Coffee",
      "tot-67": "Text",
      "tot-73": "Beach",
      "tot-76": "Luxury Hotel",
      "tot-79": "Total Relaxation",
      "tot-83": "Small Gathering",
      "tot-89": "Quality Time",
    },
    ai_personalization: {
      persona_summary:
        "A polished, feminine dresser who leans classic and clean with soft luxury touches. Abby gravitates toward elevated basics, gold jewelry, fresh beauty staples, romantic dinners, and gifts that feel thoughtful rather than loud.",
      recommended_brands: ["Aritzia", "Reformation", "Sezane", "Mejuri", "Veja", "Jenni Kayne"],
      recommended_stores: ["Nordstrom", "Shopbop", "Anthropologie"],
      style_keywords: ["polished", "minimal", "soft luxury", "coastal", "romantic"],
    },
    weekly_recommendations: [
      {
        name: "Small leather shoulder bag",
        brand: "Coach",
        price: "$295",
        category: "clothes",
        hook: "An everyday polish piece she would actually carry.",
        why: "Fits Abby's love of elevated basics, soft neutrals, and quietly luxe accessories.",
        image_url: null,
        source_kind: "demo-seed",
        source_version: "demo-abby-v1",
      },
      {
        name: "Silk pajama short set",
        brand: "Lunya",
        price: "$178",
        category: "home",
        hook: "Comfort that still feels chic and giftable.",
        why: "She likes refined comfort and gifts that feel thoughtful, useful, and a little indulgent.",
        image_url: null,
        source_kind: "demo-seed",
        source_version: "demo-abby-v1",
      },
      {
        name: "Gold huggie earrings",
        brand: "Mejuri",
        price: "$98",
        category: "clothes",
        hook: "A safe win for her everyday jewelry stack.",
        why: "Her profile leans heavily toward gold jewelry, polished styling, and repeat-wear pieces.",
        image_url: null,
        source_kind: "demo-seed",
        source_version: "demo-abby-v1",
      },
      {
        name: "Weekend coastal hotel getaway",
        brand: "Mr & Mrs Smith",
        price: "$450+",
        category: "home",
        hook: "A romantic experience pick instead of another object.",
        why: "She likes beach travel, quality time, luxury hotels, and experiences with a calm polished feel.",
        image_url: null,
        source_kind: "demo-seed",
        source_version: "demo-abby-v1",
      },
    ],
    card_entries: [
      {
        card_key: "clothing-tops",
        group_name: "Favorite tops",
        entry_name: "Silk tanks and fitted knits",
        field_values: {
          "Favorite silhouettes": "Silk shell, ribbed knit, slim cardigan",
          Colors: "Ivory, navy, camel",
          "Avoid details": "Oversized logos, neon trim",
        },
      },
      {
        card_key: "shoe-sneakers",
        group_name: "Sneakers",
        entry_name: "Clean white everyday sneakers",
        field_values: {
          Brand: "Veja, New Balance",
          Material: "Smooth leather or suede accents",
          Notes: "Minimal branding, not chunky",
        },
      },
      {
        card_key: "jewelry-necklaces",
        group_name: "Jewelry",
        entry_name: "Delicate gold layers",
        field_values: {
          Metal: "Yellow gold",
          Style: "Fine layered chains",
          "Avoid": "Bulky statement pieces",
        },
      },
      {
        card_key: "coffee-order",
        group_name: "Coffee order",
        entry_name: "Vanilla iced oat latte",
        field_values: {
          Size: "Medium",
          Sweetness: "Lightly sweet",
          Notes: "Extra shot if it is a long day",
        },
      },
      {
        card_key: "favorite-restaurants",
        group_name: "Restaurants",
        entry_name: "Sushi nights and cozy Italian",
        field_values: {
          "Favorite cuisine": "Japanese, Italian",
          "Go-to order": "Spicy tuna crispy rice, cacio e pepe",
          Occasion: "Date night or celebratory dinner",
        },
      },
      {
        card_key: "birthday-preferences",
        group_name: "Birthday gifts",
        entry_name: "Thoughtful over flashy",
        field_values: {
          "Best gift energy": "Thoughtful, polished, useful",
          "Avoid": "Gag gifts, anything cluttered",
          "Perfect plan": "Dinner reservation and one beautiful item",
        },
      },
      {
        card_key: "wish-list",
        group_name: "Wish list",
        entry_name: "Weekend bag and silk pajamas",
        field_values: {
          "Most wanted": "Structured weekend bag, silk sleep set",
          "Price comfort": "$100-$350",
          Why: "Would use both constantly",
        },
      },
      {
        card_key: "scent-perfume",
        group_name: "Fragrance",
        entry_name: "Fresh skin scent",
        field_values: {
          Notes: "Musk, bergamot, soft floral",
          Intensity: "Clean and close to skin",
          Avoid: "Heavy gourmand or syrupy vanilla",
        },
      },
    ],
  },
  "jules.demo@gotwo.local": {
    favorites: {
      likes: ["design books", "matcha", "tech accessories", "vinyl", "travel gear"],
      stores: ["Uniqlo", "Muji", "Apple", "Patagonia"],
      experiences: ["gallery shows", "city weekends", "coffee crawls"],
    },
    dislikes: {
      colors: ["hot pink"],
      gifts: ["loud novelty decor"],
      textures: ["itchy wool"],
    },
    brands: {
      loves: ["Uniqlo", "Muji", "Patagonia", "Apple"],
      open_to: ["COS", "Everlane"],
      avoid: ["Fast-fashion impulse buys"],
    },
    style_preferences: {
      vibe: ["minimalist", "functional", "modern"],
      palette: ["black", "olive", "stone", "ink"],
      silhouettes: ["overshirts", "wide trousers", "performance outerwear"],
    },
    profile_answers: {
      "sf-01": ["minimalist", "sporty"],
      "sf-02": "black",
      "sf-04": "relaxed",
      "fd-02": "mediterranean",
      "fd-04": "tea",
      "tot-12": "Yes",
      "tot-21": "Yes",
      "tot-26": "Yes",
      "tot-55": "Minimalist",
      "tot-59": "Brand New",
      "tot-64": "Tea",
      "tot-72": "Console",
      "tot-74": "Flight",
      "tot-83": "Small Gathering",
    },
    ai_personalization: {
      persona_summary:
        "A clean modern minimalist with a practical streak. Jules likes well-designed gear, subtle style, strong coffee shops, and gifts that feel useful, calm, and beautifully made.",
      recommended_brands: ["Uniqlo", "Muji", "Patagonia", "Apple", "COS"],
      recommended_stores: ["Apple", "REI", "Muji"],
      style_keywords: ["modern", "functional", "clean", "design-minded"],
    },
    weekly_recommendations: [
      {
        name: "Technical daypack",
        brand: "Bellroy",
        price: "$159",
        category: "tech",
        hook: "Sleek enough for work, practical enough for daily carry.",
        why: "Matches Jules' love of functional design and useful gear.",
        image_url: null,
        source_kind: "demo-seed",
        source_version: "demo-jules-v1",
      },
      {
        name: "Portable espresso maker",
        brand: "Wacaco",
        price: "$149",
        category: "home",
        hook: "A design-forward gift for coffee rituals.",
        why: "Jules loves coffee, travel, and compact useful objects.",
        image_url: null,
        source_kind: "demo-seed",
        source_version: "demo-jules-v1",
      },
    ],
    card_entries: [
      {
        card_key: "brand-preferences-nb",
        group_name: "Favorite brands",
        entry_name: "Minimal modern staples",
        field_values: {
          Brands: "Uniqlo, Muji, COS, Patagonia",
          Notes: "Practical, clean lines, durable fabrics",
        },
      },
      {
        card_key: "tech-phone",
        group_name: "Tech",
        entry_name: "Apple ecosystem all the way",
        field_values: {
          Devices: "iPhone, AirPods, MacBook",
          Notes: "Loves clean design and interoperability",
        },
      },
      {
        card_key: "coffee-tea",
        group_name: "Drink order",
        entry_name: "Matcha and pour-over",
        field_values: {
          Favorites: "Ceremonial matcha, bright pour-over coffee",
          Notes: "No super sugary drinks",
        },
      },
    ],
  },
};

function getCurrentWeekStartKey() {
  const now = new Date();
  const weekStart = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() - ((now.getUTCDay() + 6) % 7),
  ));
  return weekStart.toISOString().slice(0, 10);
}

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
  supabase: AppSupabaseClient,
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
  supabase: AppSupabaseClient,
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
  supabase: AppSupabaseClient,
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
  supabase: AppSupabaseClient,
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

async function resolveConnectionIdentity(
  adminClient: AppSupabaseClient,
  targetUserId: string,
  coupleId?: string | null,
) {
  if (!targetUserId) {
    return { display_name: "Connection", avatar_url: null as string | null };
  }

  const { data: profile } = await adminClient
    .from("profiles")
    .select("display_name, avatar_url")
    .eq("user_id", targetUserId)
    .maybeSingle();

  const authUsers = await findAuthUsersByIds(adminClient, [targetUserId]);
  const authUser = authUsers.get(targetUserId);
  const displayName = profile?.display_name?.trim() || getDisplayNameFromAuthUser(authUser);
  const avatarUrl = profile?.avatar_url ?? null;

  if (coupleId && (displayName || avatarUrl)) {
    const updatePayload: Record<string, string> = {};
    if (displayName) updatePayload.display_label = displayName;
    if (avatarUrl) updatePayload.photo_url = avatarUrl;
    if (Object.keys(updatePayload).length > 0) {
      await adminClient
        .from("couples")
        .update(updatePayload)
        .eq("id", coupleId);
    }
  }

  return {
    display_name: displayName || "Connection",
    avatar_url: avatarUrl,
  };
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

async function seedDemoProfileContent(
  supabase: AppSupabaseClient,
  demoUserId: string,
  demo: DemoProfile,
) {
  const seed = demoContentByEmail[demo.email];
  if (!seed) return;

  const { error: preferenceError } = await supabase.from("user_preferences").upsert({
    user_id: demoUserId,
    favorites: seed.favorites,
    dislikes: seed.dislikes,
    brands: seed.brands,
    style_preferences: seed.style_preferences,
    profile_answers: seed.profile_answers,
    ai_personalization: seed.ai_personalization,
    onboarding_complete: true,
  }, { onConflict: "user_id" });
  if (preferenceError) {
    throw new Error(`Failed preference upsert for ${demo.email}: ${preferenceError.message}`);
  }

  if (seed.anniversary) {
    const { error: anniversaryError } = await supabase
      .from("profiles")
      .update({ anniversary: seed.anniversary })
      .eq("user_id", demoUserId);
    if (anniversaryError) {
      throw new Error(`Failed anniversary seed for ${demo.email}: ${anniversaryError.message}`);
    }
  }

  const { error: deleteCardsError } = await supabase
    .from("card_entries")
    .delete()
    .eq("user_id", demoUserId);
  if (deleteCardsError) {
    throw new Error(`Failed clearing card entries for ${demo.email}: ${deleteCardsError.message}`);
  }

  if (seed.card_entries.length > 0) {
    const { error: cardInsertError } = await supabase.from("card_entries").insert(
      seed.card_entries.map((entry) => ({
        user_id: demoUserId,
        card_key: entry.card_key,
        group_name: entry.group_name,
        entry_name: entry.entry_name,
        field_values: entry.field_values,
        image_url: entry.image_url ?? null,
      })),
    );
    if (cardInsertError) {
      throw new Error(`Failed card entry seed for ${demo.email}: ${cardInsertError.message}`);
    }
  }

  const { error: recommendationError } = await supabase.from("weekly_recommendations").upsert({
    user_id: demoUserId,
    week_start: getCurrentWeekStartKey(),
    generated_at: new Date().toISOString(),
    products: seed.weekly_recommendations,
  }, { onConflict: "user_id,week_start" });
  if (recommendationError) {
    throw new Error(`Failed weekly recommendations seed for ${demo.email}: ${recommendationError.message}`);
  }
}

async function ensureDemoProfiles(supabase: AppSupabaseClient) {
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

    await seedDemoProfileContent(supabase, demoUser.id, demo);
  }
}

async function searchDiscoverableUsersFallback(
  adminClient: AppSupabaseClient,
  requesterId: string,
  rawQuery: string,
  limit = 25,
) {
  const normalizedQuery = rawQuery.trim();
  const normalizedUsername = normalizeUsername(rawQuery).toLowerCase();
  const normalizedPhone = normalizePhone(rawQuery);

  const candidateByUserId = new Map<string, SearchResult>();

  const upsertCandidate = (
    userId: string,
    displayName: string | null | undefined,
    avatarUrl: string | null | undefined,
    shareAvatar: boolean | null | undefined,
    matchType: SearchResult["match_type"],
  ) => {
    if (!userId || userId === requesterId) return;
    if (candidateByUserId.has(userId)) return;
    candidateByUserId.set(userId, {
      user_id: userId,
      display_name: displayName?.trim() || "User",
      discovery_avatar_url: shareAvatar ? avatarUrl ?? null : null,
      match_type: matchType,
    });
  };

  const profileQueries: Array<Promise<{ data: ProfileIdentityRow[] | null; error: { message: string } | null }>> = [
    adminClient
      .from("profiles")
      .select("user_id, display_name, avatar_url")
      .ilike("display_name", `%${normalizedQuery}%`)
      .limit(limit),
  ];
  if (normalizedUsername && normalizedUsername !== normalizedQuery.toLowerCase()) {
    profileQueries.push(
      adminClient
        .from("profiles")
        .select("user_id, display_name, avatar_url")
        .ilike("display_name", `%${normalizedUsername}%`)
        .limit(limit),
    );
  }

  const profileResults = await Promise.all(profileQueries);
  for (const result of profileResults) {
    if (result.error) throw new Error(result.error.message);
  }

  const nameCandidatesById = new Map<string, ProfileIdentityRow>();
  for (const result of profileResults) {
    for (const row of result.data ?? []) {
      if (row?.user_id && row.user_id !== requesterId) {
        nameCandidatesById.set(row.user_id, row);
      }
    }
  }

  let phoneMatchedIds: string[] = [];
  if (normalizedPhone) {
    const { data: phoneRows, error: phoneError } = await adminClient
      .from("user_discovery_contacts")
      .select("user_id")
      .eq("phone_search_normalized", normalizedPhone)
      .limit(limit);
    if (phoneError) throw new Error(phoneError.message);
    phoneMatchedIds = (phoneRows ?? [])
      .map((row) => row.user_id)
      .filter((id: string | null | undefined) => Boolean(id) && id !== requesterId);
  }

  const allCandidateIds = Array.from(new Set<string>([
    ...Array.from(nameCandidatesById.keys()),
    ...phoneMatchedIds,
  ]));
  if (allCandidateIds.length === 0) {
    return [];
  }

  const [{ data: settingsRows, error: settingsError }, { data: profileRowsByIds, error: profileRowsByIdsError }] = await Promise.all([
    adminClient
      .from("user_discovery_settings")
      .select("user_id, allow_name_discovery, allow_phone_discovery, share_avatar_in_discovery")
      .in("user_id", allCandidateIds),
    adminClient
      .from("profiles")
      .select("user_id, display_name, avatar_url")
      .in("user_id", allCandidateIds),
  ]);
  if (settingsError) throw new Error(settingsError.message);
  if (profileRowsByIdsError) throw new Error(profileRowsByIdsError.message);

  const settingsById = new Map((settingsRows ?? []).map((row) => [row.user_id, row] as const));
  const profilesById = new Map((profileRowsByIds ?? []).map((row) => [row.user_id, row] as const));

  for (const userId of phoneMatchedIds) {
    const profile = profilesById.get(userId) ?? nameCandidatesById.get(userId);
    const settings = settingsById.get(userId);
    const allowPhone = settings?.allow_phone_discovery ?? false;
    const shareAvatar = settings?.share_avatar_in_discovery ?? false;
    if (!allowPhone) continue;
    upsertCandidate(userId, profile?.display_name, profile?.avatar_url, shareAvatar, "phone");
  }

  for (const [userId, profile] of nameCandidatesById) {
    const settings = settingsById.get(userId);
    const allowName = settings?.allow_name_discovery ?? true;
    const shareAvatar = settings?.share_avatar_in_discovery ?? false;
    if (!allowName) continue;
    upsertCandidate(userId, profile?.display_name, profile?.avatar_url, shareAvatar, "name");
  }

  const exactName = normalizedQuery.toLowerCase();
  return Array.from(candidateByUserId.values())
    .sort((a, b) => {
      const aName = (a.display_name ?? "").toLowerCase();
      const bName = (b.display_name ?? "").toLowerCase();
      const aScore = a.match_type === "phone"
        ? 0
        : (aName === exactName ? 1 : (aName.startsWith(exactName) ? 2 : 3));
      const bScore = b.match_type === "phone"
        ? 0
        : (bName === exactName ? 1 : (bName.startsWith(exactName) ? 2 : 3));
      if (aScore !== bScore) return aScore - bScore;
      return aName.localeCompare(bName);
    })
    .slice(0, Math.max(limit, 1));
}

async function searchUsers(
  viewerClient: AppSupabaseClient,
  adminClient: AppSupabaseClient,
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

  let discoverableRows: unknown[] = [];
  const { data: discoverableData, error: discoverableError } = await viewerClient.rpc("search_discoverable_users", {
    p_query: rawQuery,
    p_limit: 25,
  });
  if (discoverableError) {
    const rpcErrorMessage = String(discoverableError.message ?? "");
    const isMissingSearchRpc = /search_discoverable_users/i.test(rpcErrorMessage) && /schema cache/i.test(rpcErrorMessage);
    if (!isMissingSearchRpc) {
      throw new Error(rpcErrorMessage);
    }
    console.error("search_discoverable_users RPC missing. Falling back to direct table search path.", rpcErrorMessage);
    discoverableRows = await searchDiscoverableUsersFallback(adminClient, requesterId, rawQuery, 25);
  } else if (Array.isArray(discoverableData)) {
    discoverableRows = discoverableData;
  }

  const rpcResults = (discoverableRows as SearchRpcRow[])
    .filter((row): row is SearchResult => Boolean(row?.user_id))
    .map((row) => ({
      user_id: String(row.user_id),
      display_name: row.display_name ?? "User",
      discovery_avatar_url: row.discovery_avatar_url ?? null,
      match_type: row.match_type === "phone" ? "phone" : "name",
    }));

  const combinedById = new Map<string, SearchResult>();
  for (const row of rpcResults) {
    if (row.user_id !== requesterId) combinedById.set(row.user_id, row as SearchResult);
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
    const profilesByUserId = new Map((profiles ?? []).map((row) => [row.user_id, row] as const));
    const settingsByUserId = new Map((settings ?? []).map((row) => [row.user_id, row] as const));

    for (const userId of candidateIds) {
      if (combinedById.has(userId) || userId === requesterId) continue;
      const profile = profilesByUserId.get(userId);
      const prefs = settingsByUserId.get(userId);
      const authUser = authUsersById.get(userId);
      combinedById.set(userId, {
        user_id: userId,
        display_name: profile?.display_name ?? getDisplayNameFromAuthUser(authUser),
        discovery_avatar_url: prefs?.share_avatar_in_discovery ? profile?.avatar_url ?? null : null,
        match_type: "email" as const,
      });
    }
  }

  return Array.from(combinedById.values()).slice(0, 25);
}

async function createConnectionRequest(
  viewerClient: AppSupabaseClient,
  adminClient: AppSupabaseClient,
  requesterId: string,
  targetUserId: string,
  connectionDisplayName?: string | null,
  connectionAvatarUrl?: string | null,
) {
  const { data, error } = await viewerClient.rpc("create_connection_request", {
    p_target_user_id: targetUserId,
  });
  if (error) {
    return { success: false, error: error.message, statusCode: 400 };
  }
  const first = Array.isArray(data) ? data[0] as ConnectionRequestRow | null : null;

  const coupleId = first?.couple_id ?? null;
  if (coupleId) {
    const safeDisplayLabel = (connectionDisplayName ?? "").trim();
    const safePhotoUrl = (connectionAvatarUrl ?? "").trim();

    // Keep couples.display_label/photo_url populated so pending connections still render
    // the selected person's identity without relying on private profile reads.
    if (safeDisplayLabel || safePhotoUrl) {
      const updatePayload: Record<string, string> = {};
      if (safeDisplayLabel) updatePayload.display_label = safeDisplayLabel;
      if (safePhotoUrl) updatePayload.photo_url = safePhotoUrl;

      await adminClient
        .from("couples")
        .update(updatePayload)
        .eq("id", coupleId)
        .eq("inviter_id", requesterId);
    }
  }

  return {
    success: true,
    status: first?.request_status ?? "invite_sent",
    couple_id: coupleId,
    statusCode: 200,
  };
}

async function createConnectionShareToken(
  viewerClient: AppSupabaseClient,
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
  viewerClient: AppSupabaseClient,
  supabase: AppSupabaseClient,
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
  supabase: AppSupabaseClient,
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
  supabase: AppSupabaseClient,
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
  supabase: AppSupabaseClient,
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
  supabase: AppSupabaseClient,
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
  viewerClient: AppSupabaseClient,
  rawToken: string,
) {
  if (!rawToken) throw new Error("Missing token");

  const { data, error } = await viewerClient.rpc("create_connection_invite_from_token", {
    p_token: rawToken,
  });
  if (error) throw new Error(error.message);
  const first = Array.isArray(data) ? data[0] as LinkByTokenRow | null : null;
  return {
    success: true,
    status: first?.result ?? "invite_sent",
    couple_id: first?.couple_id ?? null,
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const payload = await req.json().catch(() => ({}));
    const actionName = String(payload?.action ?? "search").trim().toLowerCase();
    const authHeader = req.headers.get("Authorization");
    const adminClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    if (!authHeader && actionName === "seed-demo-profiles") {
      await ensureDemoProfiles(adminClient);
      return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
    }

    if (!authHeader) {
      return new Response(JSON.stringify({ error: "No auth" }), { status: 401, headers: corsHeaders });
    }

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

    if (actionName === "seed-demo-profiles") {
      await ensureDemoProfiles(adminClient);
      return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
    }

    if (actionName === "create-connection-request") {
      const targetUserId = String(payload?.target_user_id ?? "").trim();
      const result = await createConnectionRequest(
        viewerClient,
        adminClient,
        authData.user.id,
        targetUserId,
        typeof payload?.connection_display_name === "string" ? payload.connection_display_name : null,
        typeof payload?.connection_avatar_url === "string" ? payload.connection_avatar_url : null,
      );
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

    if (actionName === "resolve-connection-identity") {
      const targetUserId = String(payload?.target_user_id ?? "").trim();
      const coupleId = String(payload?.couple_id ?? "").trim();
      const identity = await resolveConnectionIdentity(adminClient, targetUserId, coupleId || null);
      return new Response(JSON.stringify({ success: true, identity }), { headers: corsHeaders });
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
