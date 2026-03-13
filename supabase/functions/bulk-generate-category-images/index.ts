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
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const admin = createClient(supabaseUrl, supabaseServiceKey);

    // Get all active registry rows
    const { data: rows, error: fetchError } = await admin
      .from("category_registry")
      .select("key, genders, image_prompt_male, image_prompt_female, image_prompt_nonbinary")
      .eq("is_active", true);

    if (fetchError) throw fetchError;
    if (!rows || rows.length === 0) {
      return new Response(JSON.stringify({ total_attempted: 0, total_success: 0, total_failed: 0, failed_keys: [] }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Build work list
    const genderPromptMap: Record<string, "image_prompt_male" | "image_prompt_female" | "image_prompt_nonbinary"> = {
      male: "image_prompt_male",
      female: "image_prompt_female",
      "non-binary": "image_prompt_nonbinary",
    };

    const jobs: { categoryKey: string; gender: string; imagePrompt: string }[] = [];
    for (const row of rows) {
      for (const g of row.genders) {
        const promptCol = genderPromptMap[g];
        const prompt = promptCol ? (row as any)[promptCol] : null;
        if (prompt) {
          jobs.push({ categoryKey: row.key, gender: g, imagePrompt: prompt });
        }
      }
    }

    // Use streaming response for live progress
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        let success = 0;
        let failed = 0;
        const failedKeys: string[] = [];

        for (let i = 0; i < jobs.length; i++) {
          const job = jobs[i];
          try {
            const resp = await fetch(`${supabaseUrl}/functions/v1/generate-category-image`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${supabaseServiceKey}`,
              },
              body: JSON.stringify(job),
            });

            if (resp.ok) {
              success++;
            } else {
              failed++;
              failedKeys.push(`${job.categoryKey}:${job.gender}`);
            }
            // Consume body
            await resp.text();
          } catch {
            failed++;
            failedKeys.push(`${job.categoryKey}:${job.gender}`);
          }

          // Send progress
          const progress = JSON.stringify({
            type: "progress",
            completed: i + 1,
            total: jobs.length,
            success,
            failed,
          });
          controller.enqueue(encoder.encode(progress + "\n"));

          // Rate limit delay
          if (i < jobs.length - 1) {
            await new Promise((r) => setTimeout(r, 500));
          }
        }

        // Final summary
        const summary = JSON.stringify({
          type: "done",
          total_attempted: jobs.length,
          total_success: success,
          total_failed: failed,
          failed_keys: [],
        });
        controller.enqueue(encoder.encode(summary + "\n"));
        controller.close();
      },
    });

    return new Response(stream, {
      headers: { ...corsHeaders, "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (e) {
    console.error("bulk-generate error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
