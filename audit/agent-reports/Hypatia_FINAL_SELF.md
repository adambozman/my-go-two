# Hypatia FINAL SELF (Repo-Wide Audit Synthesis)

Last refreshed (Get-Date): `2026-04-03T14:18:42-05:00`

Source material:
- [C:\Users\adamb\Documents\GitHub\my-go-two\audit\agent-reports\Hypatia.md](/Users/adamb/Documents/GitHub/my-go-two/audit/agent-reports/Hypatia.md)

## Executive Summary
The repo’s “shape” is coherent at the macro level (React SPA + Supabase Auth/DB/Storage + edge functions), but it has repeated boundary violations where **global/editorial data** is treated like **user-owned data**. The most severe instance is an unauthenticated, service-role edge endpoint that can wipe and reseed the category registry. In parallel, there are multiple overlapping “image assignment” systems (legacy and current), which creates ambiguity about the source of truth and invites operational mistakes.

If you want the fastest route to a maintainable, safe system: tighten ownership (RLS + edge auth) for global assets, converge on a single asset assignment pipeline (tables + buckets), and standardize edge auth scaffolding.

## Strongest Findings
1. **Unauthenticated destructive admin edge:** `sync-category-registry` is `verify_jwt=false` and does not check `Authorization`, yet uses service role to delete and reinsert `category_registry`. This breaks ownership and is prod-critical if deployed.
2. **Global assets are globally writable:** `category_registry` and `category_images` are writable by any authenticated user under current policies. This makes “My Go Two” editorial assets mutable by arbitrary users.
3. **Storage privacy contract drift:** bucket privacy changes across migrations (including `photo-bank` flipping private→public), while URL resolution depends on a static `PRIVATE_BUCKETS` list. This guarantees environment drift and broken images.
4. **Image systems redundancy:** `category_images` + `photo-bank` is current, but `category_bank_photos`, `website_asset_assignments`, `images-mygotwo-strip`, and `dev_asset_image_overrides` exist. Multiple “systems of record” for assets is a structural liability.
5. **Edge auth strategy is inconsistent:** widespread `verify_jwt=false` shifts the security boundary into each function implementation; some functions implement robust guards, others rely on defaults or risk omission.
6. **Schema surface area includes legacy product models:** `lists`/`cards` exist alongside `card_entries`. Without an explicit deprecation decision, new work risks coupling into the wrong model.

## Best Code/Processes
1. **`storage://bucket/path` indirection (conceptually correct boundary):**
   - Centralizing URL resolution behind `storageRefs.ts` is the right long-term contract for storage evolvability.
2. **My Go Two strip layering is structurally clear:**
   - Slot metadata, asset loading, and presentation are separated. Separate strip vs card images is a correct product/asset decision to avoid distortion.
3. **Append-only ad analytics model:**
   - `ad_events` as an immutable log is a solid data design for auditability and recomputation.
4. **Some edge functions show strong hygiene:**
   - env getters, input sanitizers, and explicit 402/429 error shaping exist in AI-related functions.
5. **Repo includes internal auditing scripts:**
   - `scripts/audit-edge-functions.js` indicates awareness of edge auth risk and can be institutionalized.

## Worst Code/Processes
1. **Destructive registry sync with no auth boundary (process failure):**
   - A “wipe and reseed” path should never be unauthenticated and service-role powered in a deployed environment.
2. **Permissive RLS on editorial/global tables (boundary failure):**
   - Writes guarded only by “authenticated” is not an ownership model for global assets.
3. **Static “private buckets” allowlist (contract drift hazard):**
   - Storage bucket posture evolves; a hardcoded list is guaranteed to be wrong.
4. **Operational ambiguity created by parallel systems:**
   - Multiple image/bucket assignment tables create uncertainty about what is live vs legacy.
5. **Overloading edge dispatchers:**
   - Multi-action “god” endpoints (notably `searchforaddprofile`) concentrate unrelated workflows behind a single handler, increasing coupling and regression risk.

## Architecture Strengths
1. **Overall dependency direction is sensible:** UI -> Supabase client -> DB/RPC/Storage, with edge functions used where privilege or external APIs are needed.
2. **Connection visibility is mostly derived via dedicated tables/RPCs:** this is the right approach for complex sharing rules.
3. **Key subsystems have explicit caching/inflight dedupe:** reduces duplicate fetches and makes performance tuning possible.
4. **Schema has many explicit constraints:** unique keys, check constraints, and typed JSON columns where appropriate.

## Architecture Weaknesses
1. **Source-of-truth ownership is not consistently encoded in RLS and function auth.**
2. **Global/editorial and user-owned concepts are mixed in the same access posture.**
3. **Schema and storage systems show “iteration residue” without deprecation boundaries.**
4. **Security policy is split across config and code without a unified guard framework.**
5. **Stringly-typed cross-layer keys (slot keys, action names) are not constrained or versioned.**

## Dangerous Coupling
1. **Bucket privacy defined in migrations vs resolver behavior in frontend code:**
   - privacy evolution (private/public flips) plus static allowlists yields silent runtime breakage.
2. **`verify_jwt` config + manual auth checks (two sources of truth for security):**
   - increases probability of missing checks in future functions.
3. **Front-end seed vs DB registry semantics:**
   - the system can be interpreted as “seed is truth” or “DB is truth”; both appear in the repo, causing ambiguity.
4. **My Go Two slot contract encoded as free strings stored in globally writable tables:**
   - wrong key writes are easy; detecting them is hard.

## Redundant Systems
1. **Asset/image assignment:**
   - `category_images` (active) vs `category_bank_photos` (legacy bank), `website_asset_assignments` (unused in src), `dev_asset_image_overrides` (unused in src), plus multiple buckets.
2. **Cards/entries model:**
   - `lists`/`cards` vs `card_entries`/coverflow-based My Go Two.
3. **Calendar schema surface:**
   - external sync tables exist but do not appear in frontend callsites (adds maintenance cost without benefit).

## Security Risks
1. **Unauthenticated service-role edge function:** `sync-category-registry` can delete/replace registry without auth.
2. **Overly permissive RLS for global tables:** authenticated users can mutate editorial assets (`category_registry`, `category_images`).
3. **Inconsistent edge verification strategy:** `verify_jwt=false` increases the blast radius of a single missed check.
4. **CORS is generally `*`:** not always wrong for Supabase edges, but combined with missing auth becomes risky.
5. **Hardcoded admin email boundaries:** used in both SQL and UI; it works now, but it’s a brittle identity contract.

## Reliability / Runtime Risks
1. **Auth-settlement redirect flakiness:** multiple guard layers (layout + leaf route) can create perceived “logout loops” when user/session briefly resolves null.
2. **Image loading is sensitive to storage posture and transforms:** wrong bucket posture or unsupported formats can yield blank UI with limited diagnosis.
3. **Edge function env coupling:** AI + Stripe edges depend on several env vars; missing secrets become runtime failures in key flows.
4. **Large client-side scans for analytics:** sponsored admin reads all `ad_events` and aggregates client-side; this will degrade as volume grows.

## Data / Storage Risks
1. **Orphaned storage objects:** PhotoGallery attempts deletion with fallback to “manual cleanup”; if not acted on, storage accumulates.
2. **Storage ref drift:** migrations convert some fields to `storage://...`, but other buckets/fields may remain as raw URLs or inconsistent refs.
3. **Policy mismatch:** bucket policies created/changed in migrations can diverge from what the resolver expects in runtime.
4. **Global mapping tables not scoped:** `category_images` is effectively a global mapping; if left writable broadly, it is both a security and data integrity risk.

## Highest-Value Improvements (Ranked)
1. **Fix global asset ownership boundaries immediately**
   - Make `category_registry` and `category_images` admin-owned (RLS + controlled write paths).
   - Lock down `sync-category-registry`: enable verification and implement explicit Authorization guard with role/allowlist.
2. **Converge on one asset assignment system**
   - Choose one “system of record” (likely `category_images` + `storage://` refs) and formally deprecate the rest (`category_bank_photos`, `website_asset_assignments`, `dev_asset_image_overrides`) or document them as legacy.
3. **Standardize edge auth and scaffolding**
   - Single shared guard pattern (verify_jwt strategy + manual check wrapper), shared env getter, shared CORS and error shaping.
4. **Make storage bucket posture a single source of truth**
   - Replace hardcoded `PRIVATE_BUCKETS` allowlist with default-private or runtime-fetched bucket metadata; add a diagnostic.
5. **Reduce dispatcher “god endpoints”**
   - Split multi-action edge functions into smaller RPCs or dedicated endpoints with narrower contracts and simpler tests.
6. **Quarantine or deprecate legacy schema**
   - Decide and document whether `lists`/`cards` are still in-scope; if not, avoid further coupling and plan retirement.
7. **Move expensive client analytics into DB RPC**
   - Add RPC to aggregate `ad_events` by product/time range to keep admin pages bounded.

## What I Am Least Certain About
1. **Editorial vs user-specific intent for My Go Two images:** is the strip experience meant to be global (curated) or per-user (customized)? The current table/policy posture implies “global,” but the UI is accessible like a dev tool.
2. **Which legacy systems are intentionally retained:** some tables/buckets may be kept for planned migrations or rollbacks; src callsites suggest some are currently unused, but intention is unclear.
3. **Deployed environment posture:** migrations express bucket policies, but the actual Supabase project might diverge. Several “works locally vs fails elsewhere” risks depend on that.

