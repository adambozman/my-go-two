import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabaseAnon = Deno.env.get("SUPABASE_ANON_KEY")!;

    // Verify user
    const userClient = createClient(supabaseUrl, supabaseAnon, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user }, error: authError } = await userClient.auth.getUser();
    if (authError || !user) throw new Error("Unauthorized");

    const { prompt } = await req.json();
    if (!prompt || typeof prompt !== "string") throw new Error("Prompt is required");

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    // Generate image using AI
    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image",
        messages: [
          {
            role: "user",
            content: `Generate a beautiful, high-quality lifestyle photograph for a saved product card titled "${prompt}". Keep it broadly useful, product-forward, and inclusive. Style: warm golden-hour editorial lifestyle photography with soft natural lighting, intimate and inviting. Absolutely no text, labels, or words in the image.`,
          },
        ],
        modalities: ["image", "text"],
      }),
    });

    if (!aiResponse.ok) {
      const status = aiResponse.status;
      if (status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded, try again shortly." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI gateway error: ${status}`);
    }

    const aiResult = await aiResponse.json();
    const imageData = aiResult.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    if (!imageData) throw new Error("No image generated");

    // Extract base64 data
    const base64Match = imageData.match(/^data:image\/(\w+);base64,(.+)$/);
    if (!base64Match) throw new Error("Invalid image data format");

    const ext = base64Match[1];
    const base64 = base64Match[2];
    const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));

    // Upload to storage using service role client
    const adminClient = createClient(supabaseUrl, supabaseServiceKey);
    const fileName = `${user.id}/${crypto.randomUUID()}.${ext}`;

    const { error: uploadError } = await adminClient.storage
      .from("card-images")
      .upload(fileName, bytes, {
        contentType: `image/${ext}`,
        upsert: false,
      });

    if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`);

    const { data: urlData } = adminClient.storage
      .from("card-images")
      .getPublicUrl(fileName);

    return new Response(
      JSON.stringify({ image_url: urlData.publicUrl }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("generate-card-image error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
// Codebase classification: runtime saved-product-card image generation edge function.
