# Google sign-in setup

Google OAuth is implemented server-side using the official google-auth-library. It is optional: existing password login and all public features continue to work without Google credentials. Until configured, the Google control displays an explicit unavailable state.

## Enable it locally

1. In [Google Cloud Console](https://console.cloud.google.com/auth/clients), create an OAuth client of type **Web application**. Configure the OAuth consent screen and, when the app is in testing, add your Google account as a test user.
2. Add this exact authorized redirect URI: `http://localhost:4000/api/auth/google/callback`.
3. Add these values in your private, ignored `.env` file (never in frontend variables or chat):

```dotenv
GOOGLE_CLIENT_ID=your-web-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_ADMIN_EMAILS=your-approved-google-email
```

For several administrators, use a comma-separated allowlist. Each must be a Gmail account or Google Workspace account whose verified token includes its hosted domain. Other externally managed Google-account email addresses are intentionally rejected for account-linking safety.

4. Stop the running application before accessing the embedded database from another process. Run `npm run admin:google` to explicitly provision the allowlisted accounts. This command creates only missing accounts with random, unexposed password hashes; it does not change existing roles or passwords. An existing non-admin cannot be promoted by Google sign-in.
5. Run `npm start`. Open `/admin/login` and choose **Continue with Google**. Login from the landing page opens the same sign-in screen.

For deployment on Render, add `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` and `GOOGLE_ADMIN_EMAILS` as private environment variables on the CiteDesk web service. Register the exact redirect URI `https://citedesk.onrender.com/api/auth/google/callback` in the Google Cloud OAuth web client. Render's HTTPS `RENDER_EXTERNAL_URL` is used automatically when PUBLIC_BASE_URL is not set. On startup, each explicitly allowlisted email is provisioned as an administrator if no account with that email exists. Existing account roles and passwords are preserved. No arbitrary redirect URL is accepted from a request. The client secret stays server-side. No API access scopes, offline access or refresh tokens are requested.

## Flow and access boundaries

A ten-minute server-side OAuth attempt stores a hashed random state, hashed browser-binding cookie, nonce and PKCE verifier. State is consumed atomically exactly once and must match the initiating browser. The callback exchanges the code with Google using the verifier, then verifies ID-token signature, issuer, audience and expiry via Google's library, and checks the nonce and verified email. The account must be both explicitly allowlisted and a pre-provisioned ADMIN. Google subject identifiers are persistently bound to accounts and cannot silently replace an existing binding. Successful authentication regenerates the normal server session. Neither OAuth tokens nor client secrets reach browser storage or logs.

The temporary browser-binding cookie is HttpOnly, SameSite=Lax to permit the Google callback, and Secure in production. The application session keeps its HttpOnly/SameSite=Strict/Secure-in-production settings. Logout revokes the server session. Cancellation, bad state, provider errors and denied accounts return generic sign-in messages without leaking provider details. Expired attempts are purged when a new authorization begins. Token and verification network calls are bounded to ten seconds.

## Verification and limitations

The backend suite tests successful sign-in, PKCE proof, state/browser binding, one-time use, expiry, cancellation, nonce mismatch, unverified email, unapproved account, non-admin roles, identity replacement and missing configuration. Google exchanges are injected test doubles, not real account authentication. Browser tests cover the button's unavailable state and failure feedback plus unchanged password login. A real Google account sign-in remains unverified until the operator supplies valid OAuth credentials and approves the consent screen.

References: [Google OpenID Connect documentation](https://developers.google.com/identity/openid-connect/openid-connect), [official Node.js authentication library](https://cloud.google.com/nodejs/docs/reference/google-auth-library/latest).
