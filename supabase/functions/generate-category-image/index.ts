import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { categoryKey, gender, imagePrompt } = await req.json();

    if (!categoryKey || !gender || !imagePrompt) {
      throw new Error("Missing required fields: categoryKey, gender, imagePrompt");
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Generate image via AI
    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3.1-flash-image-preview",
        messages: [
          {
            role: "user",
            content: `Generate a beautiful editorial lifestyle photograph: ${imagePrompt}. Style: golden-hour photography, soft natural lighting, intimate feel, warm tones. Absolutely no text, labels, or words in the image.`,
          },
        ],
        modalities: ["image", "text"],
      }),
    });

    if (!resp.ok) {
      const status = resp.status;
      if (status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited, try again later" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`Image generation failed: ${status}`);
    }

    const result = await resp.json();
    const imgData = result.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    if (!imgData) throw new Error("No image data in AI response");

    const m = imgData.match(/^data:image\/(\w+);base64,(.+)$/);
    if (!m) throw new Error("Invalid image data format");

    const ext = m[1];
    const bytes = Uint8Array.from(atob(m[2]), (c) => c.charCodeAt(0));

    // Upload to storage
    const admin = createClient(supabaseUrl, supabaseServiceKey);
    const path = `${gender}/${categoryKey}.${ext}`;

    await admin.storage.from("category-images").upload(path, bytes, {
      contentType: `image/${ext}`,
      upsert: true,
    });

    const { data } = admin.storage.from("category-images").getPublicUrl(path);
    const imageUrl = data.publicUrl;

    // Upsert into category_images table
    await admin.from("category_images").upsert(
      { category_key: categoryKey, gender, image_url: imageUrl },
      { onConflict: "category_key,gender" }
    );

    return new Response(JSON.stringify({ image_url: imageUrl }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-category-image error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
