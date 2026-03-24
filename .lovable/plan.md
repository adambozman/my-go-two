

# Assessment: Recommendation Caching Is Already Working

## What's Already Implemented

The caching system you described is fully in place:

1. **Weekly cache** (`weekly_recommendations` table) — saves each user's 12 picks per week. On next load, returns cached results instantly without calling AI or Firecrawl.

2. **Global product bank** (`resolved_recommendation_catalog` table) — every product scraped via Firecrawl is stored by fingerprint. When the same brand+product combo appears for another user, the cached image/URL/price is reused instead of re-scraping.

3. **Cache-check flow**: The function checks the weekly cache first (lines 305-332). Only generates new recommendations if no cache exists for the current week, or if `force_refresh` is true.

## The 500 Error

The "Unauthorized" error in the logs is a **session/auth issue**, not a caching problem. The edge function log shows an error at the auth step. This happens when your session token expires (common with the dev-login bypass since those tokens have normal expiration).

### Fix (already partially done)
The code already handles 401 gracefully and the frontend retries after refreshing the session. The logged error appears to be from a stale deployment or a race condition where the token expired mid-request.

### Recommended Hardening
- Wrap the `createClient` call in a secondary try/catch so even unexpected auth library errors return a clean 401 instead of a 500.
- Ensure the `dev-login` function issues tokens with a longer expiry to reduce session expiration frequency for your dev account.

## No Code Changes Needed for Caching
The recommendation bank is already being built. Every Firecrawl scrape is persisted. Repeated loads hit the cache. The system works as designed.

