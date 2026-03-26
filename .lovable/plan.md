

## Fix: Stop repeated logouts during development

**Problem**: The `dev-login` edge function resets your password on every login call. Supabase treats password changes as a security event and revokes all refresh tokens. The 60-second subscription check timer then tries to refresh the session, gets "Refresh Token Not Found", and kicks you to login.

**Solution**: Rewrite `dev-login` to use `admin.auth.admin.generateLink()` instead of password rotation. This creates a magic link token server-side without touching the password, so existing sessions stay valid.

### Changes

**1. Rewrite `supabase/functions/dev-login/index.ts`**
- Remove the `updateUserById` password reset logic
- Use `admin.auth.admin.generateLink({ type: 'magiclink', email })` to get a one-time token
- Extract the token from the link and use `admin.auth.admin.getUserById` + sign-in via the OTP token approach
- Alternative simpler approach: keep the password-set approach but only do it once (check if a known static dev password is already set), or better yet, just use `generateLink` to produce a session without password changes

**Concrete new flow:**
1. Verify email is in `DEV_EMAILS`
2. Find user via `listUsers`
3. Call `generateLink({ type: 'magiclink', email })` — this returns an `action_link` containing a token hash
4. Parse the token from the link, then call `admin.auth.admin.verifyOtp()` or extract the hashed token and use `supabase.auth.verifyOtp({ token_hash, type: 'magiclink' })` to get a session
5. Return `access_token` and `refresh_token` — no password touched, no token revocation

**2. No client-side changes needed** — `Login.tsx` already calls `supabase.auth.setSession()` with the returned tokens, which will continue to work.

