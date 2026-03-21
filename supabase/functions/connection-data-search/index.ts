import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
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

type SearchEntryRow = {
  id: string;
  user_id: string;
  entry_name: string;
  group_name: string;
  card_key: string;
};

type ConnectionRow = {
  id: string;
  inviter_id: string;
  invitee_id: string | null;
  display_label: string | null;
  status: string;
};

function matchesQuery(row: SearchEntryRow, query: string) {
  const needle = query.toLowerCase();
  return (
    (row.group_name || "").toLowerCase().includes(needle) ||
    (row.entry_name || "").toLowerCase().includes(needle)
  );
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

    const userId = authData.user.id;
    const payload = await req.json().catch(() => ({}));
    const action = String(payload?.action ?? "home-search").trim().toLowerCase();
    const rawQuery = String(payload?.query ?? "").trim();
    const scope = String(payload?.scope ?? "everyone").trim();
    const limit = Math.max(1, Math.min(Number(payload?.limit ?? 20), 50));

    if (action !== "home-search") {
      return new Response(JSON.stringify({ error: "Unknown action" }), { status: 400, headers: corsHeaders });
    }

    if (!rawQuery) {
      return new Response(JSON.stringify({ my_entries: [], circle_entries: [] }), { headers: corsHeaders });
    }

    const { data: couplesData, error: couplesError } = await supabase
      .from("couples")
      .select("id, inviter_id, invitee_id, display_label, status")
      .or(`inviter_id.eq.${userId},invitee_id.eq.${userId}`)
      .eq("status", "accepted");

    if (couplesError) {
      return new Response(JSON.stringify({ error: couplesError.message }), { status: 400, headers: corsHeaders });
    }

    const liveConnections = ((couplesData || []) as ConnectionRow[])
      .map((row) => {
        const partnerId = row.inviter_id === userId ? row.invitee_id : row.inviter_id;
        if (!partnerId) return null;
        return {
          couple_id: row.id,
          partner_id: partnerId,
          owner_label: row.display_label || "Connection",
        };
      })
      .filter((value): value is { couple_id: string; partner_id: string; owner_label: string } => Boolean(value));

    const includeSelf = scope === "everyone" || scope === "self";
    const scopedConnections =
      scope === "everyone"
        ? liveConnections
        : scope === "self"
          ? []
          : liveConnections.filter((connection) => connection.partner_id === scope);

    let myEntries: SearchEntryRow[] = [];
    if (includeSelf) {
      const { data: myData, error: myError } = await supabase
        .from("card_entries")
        .select("id, user_id, entry_name, group_name, card_key")
        .eq("user_id", userId)
        .or(`group_name.ilike.%${rawQuery}%,entry_name.ilike.%${rawQuery}%`)
        .limit(limit);

      if (myError) {
        return new Response(JSON.stringify({ error: myError.message }), { status: 400, headers: corsHeaders });
      }
      myEntries = (myData || []) as SearchEntryRow[];
    }

    const circleEntries: Array<SearchEntryRow & { owner_label: string }> = [];
    for (const connection of scopedConnections) {
      const { data: sharedData, error: sharedError } = await (supabase as unknown as RpcClient).rpc("get_connection_visible_card_entries", {
        p_couple_id: connection.couple_id,
        p_owner_user_id: connection.partner_id,
        p_connection_user_id: userId,
      });

      if (sharedError) {
        return new Response(JSON.stringify({ error: sharedError.message }), { status: 400, headers: corsHeaders });
      }

      const rows = ((Array.isArray(sharedData) ? sharedData : []) as SearchEntryRow[])
        .filter((row) => matchesQuery(row, rawQuery))
        .slice(0, limit)
        .map((row) => ({ ...row, owner_label: connection.owner_label }));

      circleEntries.push(...rows);
    }

    return new Response(
      JSON.stringify({
        my_entries: myEntries,
        circle_entries: circleEntries.slice(0, limit * Math.max(1, scopedConnections.length || 1)),
      }),
      { headers: corsHeaders },
    );
  } catch (e: unknown) {
    return new Response(JSON.stringify({ error: getErrorMessage(e) }), { status: 500, headers: corsHeaders });
  }
});
