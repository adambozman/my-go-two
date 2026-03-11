import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { title, category } = await req.json();
    if (!title) throw new Error("Title is required");

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const prompt = `You are building a PRODUCT-SPECIFIC preferences card for a couples app called GoTwo. The user wants to create a card titled "${title}" in the "${category}" category.

This card represents ONE specific product or item. Generate 5-8 product-centric fields. Every card MUST include these standard fields:
- "Brand" (text)
- "Product Name" (text)  
- "Where to Buy" (text)
- "Price Range" (select with options: "Under $10", "$10-$25", "$25-$50", "$50-$100", "$100+")
- "Rating" (select with options: "Love It", "Really Like", "It's Okay", "Want to Switch")
- "Notes" (text)

Then add 1-3 product-specific fields that are unique to "${title}". For example:
- For "Razor": add "Type" (select: Cartridge, Safety, Electric, Straight, Disposable)
- For "Shampoo": add "Hair Type" (select: Straight, Wavy, Curly, Coily)
- For "Sexy Time Candle": add "Scent" (text), "Burn Time" (select: 1-2 hrs, 3-5 hrs, 6+ hrs)

RULES:
- Always include Brand, Product Name, Where to Buy, Price Range, Rating, Notes
- Add 1-3 additional product-specific fields
- Plain English only, no special characters or emoji
- Field names should be 1-4 words
- Select options should be 1-3 words each

Use the provided tool to return the fields.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "user", content: prompt }],
        tools: [
          {
            type: "function",
            function: {
              name: "generate_card_fields",
              description: "Generate fields for a custom preferences card",
              parameters: {
                type: "object",
                properties: {
                  fields: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: { type: "string", description: "Field label, 2-5 words" },
                        type: { type: "string", enum: ["text", "select"] },
                        placeholder: { type: "string", description: "Placeholder text for text fields" },
                        options: {
                          type: "array",
                          items: { type: "string" },
                          description: "Options for select fields, 3-6 items",
                        },
                      },
                      required: ["name", "type"],
                      additionalProperties: false,
                    },
                  },
                },
                required: ["fields"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "generate_card_fields" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const aiResult = await response.json();
    const toolCall = aiResult.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) throw new Error("No tool call in AI response");

    const { fields } = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify({ fields }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("ai-card-fields error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
