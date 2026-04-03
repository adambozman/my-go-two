import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const jsonResponse = (body: Record<string, unknown>, status: number) =>
  new Response(JSON.stringify(body), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    status,
  });

const getRequiredEnv = (name: string): string => {
  const value = Deno.env.get(name)?.trim();
  if (!value) {
    throw new Error(`${name} is not set`);
  }
  return value;
};

const getRequestOrigin = (req: Request): string => {
  const origin = req.headers.get("origin")?.trim();
  if (origin) {
    return origin;
  }

  const siteUrl = Deno.env.get("SITE_URL")?.trim();
  if (siteUrl) {
    return siteUrl;
  }

  return "http://localhost:3000";
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  try {
    const stripeKey = getRequiredEnv("STRIPE_SECRET_KEY");
    const supabaseUrl = getRequiredEnv("SUPABASE_URL");
    const serviceRoleKey = getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY");

    const supabaseClient = createClient(
      supabaseUrl,
      serviceRoleKey,
      { auth: { persistSession: false } }
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return jsonResponse({ error: "No authorization header provided" }, 401);
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) {
      return jsonResponse({ error: `Authentication error: ${userError.message}` }, 401);
    }
    const user = userData.user;
    if (!user?.email) {
      return jsonResponse({ error: "User not authenticated or email not available" }, 401);
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    if (customers.data.length === 0) {
      return jsonResponse({ error: "No Stripe customer found for this user" }, 404);
    }

    const origin = getRequestOrigin(req);
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customers.data[0].id,
      return_url: `${origin}/dashboard/settings`,
    });

    return jsonResponse({ url: portalSession.url }, 200);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unable to open customer portal";
    const status = /is not set/i.test(message) ? 503 : 500;
    return jsonResponse({ error: message }, status);
  }
});
