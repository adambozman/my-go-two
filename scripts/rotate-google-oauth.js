#!/usr/bin/env node

const SUPABASE_ACCESS_TOKEN = process.env.SUPABASE_ACCESS_TOKEN;
const SUPABASE_PROJECT_REF = process.env.SUPABASE_PROJECT_REF;
const GOOGLE_OAUTH_CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID;
const GOOGLE_OAUTH_CLIENT_SECRET = process.env.GOOGLE_OAUTH_CLIENT_SECRET;

const required = [
  ["SUPABASE_ACCESS_TOKEN", SUPABASE_ACCESS_TOKEN],
  ["SUPABASE_PROJECT_REF", SUPABASE_PROJECT_REF],
  ["GOOGLE_OAUTH_CLIENT_ID", GOOGLE_OAUTH_CLIENT_ID],
  ["GOOGLE_OAUTH_CLIENT_SECRET", GOOGLE_OAUTH_CLIENT_SECRET],
];

const missing = required.filter(([, value]) => !value).map(([name]) => name);
if (missing.length) {
  console.error(`Missing required env vars: ${missing.join(", ")}`);
  process.exit(1);
}

const endpoint = `https://api.supabase.com/v1/projects/${SUPABASE_PROJECT_REF}/config/auth`;

const authHeaders = {
  Authorization: `Bearer ${SUPABASE_ACCESS_TOKEN}`,
  "Content-Type": "application/json",
};

const expectOk = async (response, label) => {
  if (response.ok) return;
  const body = await response.text();
  throw new Error(`${label} failed (${response.status}): ${body}`);
};

const main = async () => {
  const beforeResponse = await fetch(endpoint, { headers: authHeaders });
  await expectOk(beforeResponse, "Read current auth config");
  const before = await beforeResponse.json();

  const payload = {
    external_google_enabled: true,
    external_google_client_id: GOOGLE_OAUTH_CLIENT_ID,
    external_google_secret: GOOGLE_OAUTH_CLIENT_SECRET,
  };

  const updateResponse = await fetch(endpoint, {
    method: "PATCH",
    headers: authHeaders,
    body: JSON.stringify(payload),
  });
  await expectOk(updateResponse, "Update Google OAuth config");
  const after = await updateResponse.json();

  const success =
    after.external_google_enabled === true &&
    after.external_google_client_id === GOOGLE_OAUTH_CLIENT_ID;

  if (!success) {
    throw new Error("Google OAuth verification failed after update.");
  }

  console.log("Google OAuth rotation complete.");
  console.log(`Previous client id: ${before.external_google_client_id || "(none)"}`);
  console.log(`Current client id: ${after.external_google_client_id}`);
};

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
