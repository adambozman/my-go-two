import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const jsonResponse = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const getRequiredEnv = (name: string): string => {
  const value = Deno.env.get(name)?.trim();
  if (!value) throw new Error(`${name} is not set`);
  return value;
};

type RpcClient = {
  rpc: (
    fn: string,
    args: Record<string, unknown>,
  ) => Promise<{ data: unknown; error: { message: string } | null }>;
};

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

type SearchSavedProductCardRow = {
  id: string;
  user_id: string;
  card_title: string;
  subcategory_label: string;
  product_card_key: string;
};

type ConnectionRow = {
  id: string;
  inviter_id: string;
  invitee_id: string | null;
  display_label: string | null;
  status: string;
};

function matchesQuery(row: SearchSavedProductCardRow, query: string) {
  const needle = query.toLowerCase();
  return (
    (row.subcategory_label || "").toLowerCase().includes(needle) ||
    (row.card_title || "").toLowerCase().includes(needle)
  );
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const supabaseUrl = getRequiredEnv("SUPABASE_URL");
    const serviceRoleKey = getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY");
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return jsonResponse({ error: "No auth" }, 401);
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: authData, error: authError } = await supabase.auth.getUser(token);
    if (authError || !authData.user) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }

    const userId = authData.user.id;
    const payload = await req.json().catch(() => ({}));
    const action = String(payload?.action ?? "home-search").trim().toLowerCase();
    const rawQuery = String(payload?.query ?? "").trim();
    const scope = String(payload?.scope ?? "everyone").trim();
    const limit = Math.max(1, Math.min(Number(payload?.limit ?? 20), 50));

    if (action !== "home-search") {
      return jsonResponse({ error: "Unknown action" }, 400);
    }

    if (!rawQuery) {
      return jsonResponse({ my_saved_product_cards: [], connection_saved_product_cards: [] });
    }

    const { data: userConnectionsData, error: userConnectionsError } = await supabase
      .from("user_connections")
      .select("id, inviter_id, invitee_id, display_label, status")
      .or(`inviter_id.eq.${userId},invitee_id.eq.${userId}`)
      .eq("status", "accepted");

    if (userConnectionsError) {
      return jsonResponse({ error: userConnectionsError.message }, 400);
    }

    const liveConnections = ((userConnectionsData || []) as ConnectionRow[])
      .map((row) => {
        const connectionUserId = row.inviter_id === userId ? row.invitee_id : row.inviter_id;
        if (!connectionUserId) return null;
        return {
          user_connection_id: row.id,
          connection_user_id: connectionUserId,
          owner_label: row.display_label || "Connection",
        };
      })
      .filter((value): value is { user_connection_id: string; connection_user_id: string; owner_label: string } => Boolean(value));

    const includeSelf = scope === "everyone" || scope === "self";
    const scopedConnections =
      scope === "everyone"
        ? liveConnections
        : scope === "self"
          ? []
          : liveConnections.filter((connection) => connection.connection_user_id === scope);

    let mySavedProductCards: SearchSavedProductCardRow[] = [];
    if (includeSelf) {
      const { data: myData, error: myError } = await supabase
        .from("saved_product_cards")
        .select("id, user_id, card_title, subcategory_label, product_card_key")
        .eq("user_id", userId)
        .or(`subcategory_label.ilike.%${rawQuery}%,card_title.ilike.%${rawQuery}%`)
        .limit(limit);

      if (myError) {
        return jsonResponse({ error: myError.message }, 400);
      }
      mySavedProductCards = (myData || []) as SearchSavedProductCardRow[];
    }

    const connectionSavedProductCards: Array<SearchSavedProductCardRow & { owner_label: string }> = [];
    for (const connection of scopedConnections) {
      const { data: sharedData, error: sharedError } = await (supabase as unknown as RpcClient).rpc("get_connection_visible_saved_product_cards", {
        p_user_connection_id: connection.user_connection_id,
        p_owner_user_id: connection.connection_user_id,
        p_connection_user_id: userId,
      });

      if (sharedError) {
        return jsonResponse({ error: sharedError.message }, 400);
      }

      const rows = ((Array.isArray(sharedData) ? sharedData : []) as SearchSavedProductCardRow[])
        .filter((row) => matchesQuery(row, rawQuery))
        .slice(0, limit)
        .map((row) => ({ ...row, owner_label: connection.owner_label }));

      connectionSavedProductCards.push(...rows);
    }

    return jsonResponse({
      my_saved_product_cards: mySavedProductCards,
      connection_saved_product_cards: connectionSavedProductCards.slice(0, limit * Math.max(1, scopedConnections.length || 1)),
    });
  } catch (e: unknown) {
    const message = getErrorMessage(e);
    const status = /is not set/i.test(message) ? 503 : 500;
    return jsonResponse({ error: message }, status);
  }
});

// Codebase classification: runtime connection search edge function.
