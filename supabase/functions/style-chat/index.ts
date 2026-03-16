import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) throw new Error("Unauthorized");

    const { message, profile_answers, ai_personalization } = await req.json();

    if (!message || typeof message !== "string") {
      throw new Error("message is required");
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const answersText = profile_answers && typeof profile_answers === "object"
      ? Object.entries(profile_answers)
          .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(", ") : String(value)}`)
          .join("\n")
      : "No profile answers yet.";

    const personalizationText = ai_personalization && typeof ai_personalization === "object"
      ? JSON.stringify(ai_personalization, null, 2)
      : "No AI personalization summary yet.";

    const systemPrompt = `You are GoTwo's style AI.
You help the user understand their taste, explain why certain questions matter, and give concise, thoughtful style guidance.

Rules:
- Speak in a warm, editorial, confident tone.
- Be specific and practical, not generic.
- Use the user's saved answers and AI personalization when available.
- If the profile is still sparse, say what you know so far and suggest the next best questions to answer.
- Keep responses under 180 words unless the user explicitly asks for more.
- Do not invent facts that are not supported by the profile.
- Focus on style, shopping preferences, gifting taste, and recommendation logic.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: `Saved profile answers:\n${answersText}\n\nCurrent AI personalization:\n${personalizationText}\n\nUser question: ${message}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded, please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds to continue." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const errorText = await response.text();
      console.error("style-chat AI gateway error:", response.status, errorText);
      throw new Error("AI gateway error");
    }

    const result = await response.json();
    const reply = result.choices?.[0]?.message?.content?.trim();

    return new Response(JSON.stringify({ reply: reply || "I have a rough read on your vibe already—answer a few more questions and I can get sharper." }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("style-chat error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});