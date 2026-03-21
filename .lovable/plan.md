

# Apply Missing Database Migrations

## Problem
The codebase contains 30+ migration files that were never applied to the live database. The last applied migration is `20260321163258`, but critical migrations like `20260320183000` (discovery functions, share tokens) and `20260321113000` (refreshed discovery functions) were never executed. This is why search and connection features are broken.

## What's Missing (Key Items)
- **`connection_share_tokens` table** — does not exist
- **`search_discoverable_users`** RPC function — does not exist
- **`create_connection_request`** RPC function — does not exist
- **`issue_connection_share_token`** RPC function — does not exist
- **`create_connection_invite_from_token`** RPC function — does not exist
- Several other migrations for calendar, sharing, feeds, etc.

## Plan

### Step 1: Create a single consolidated migration
Use the migration tool to create one migration that applies all missing database objects. This will use `IF NOT EXISTS` and `CREATE OR REPLACE` to be safe against partial state. Key contents:

1. **`connection_share_tokens` table** with RLS policies
2. **4 RPC functions**: `search_discoverable_users`, `create_connection_request`, `issue_connection_share_token`, `create_connection_invite_from_token`
3. **Service role policies** on `user_discovery_settings` and `user_discovery_contacts` (needed for the SECURITY DEFINER functions to read discovery data)
4. **Schema reload**: `NOTIFY pgrst, 'reload schema'`

I will also scan the other unapplied migrations (calendar, sharing, feeds, etc.) and include any missing schema objects in the same consolidated migration.

### Step 2: Redeploy `searchforaddprofile` edge function
Trigger a redeploy so the edge function picks up the now-existing RPC functions.

### Step 3: Verify
Run a test query against `search_discoverable_users` to confirm Abby is discoverable.

## Technical Notes
- The migration tool both creates the file AND executes the SQL against the database
- Using `CREATE TABLE IF NOT EXISTS` and `CREATE OR REPLACE FUNCTION` ensures idempotency
- The `user_discovery_settings` and `user_discovery_contacts` tables already exist (created by migration `20260321163258`), so we only need to add the missing service_role policies and the `connection_share_tokens` table

