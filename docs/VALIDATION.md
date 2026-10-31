# Verification record — 31 October 2026

Final relevant checks:

| Command / check | Observed result |
|---|---|
| npm install | Installed; lockfile generated |
| npm run typecheck | PASS, no errors |
| npm run lint | PASS, no errors |
| npm test | PASS, 20/20 tests, Vitest 5.0.5 |
| npm run build | PASS, Vite production bundle |
| npm run test:e2e | PASS, 4/4 Chromium flows at 1440×1000 and 375×812 |
| npm audit | PASS, zero vulnerabilities; dependency-audit.json retained |
| HTTP evaluation | PASS, 13/13 expected source/abstention results |
| Persistent database | Application restarted repeatedly; original articles, admin and recorded questions persisted |
| Visual inspection | Desktop/mobile home, desktop chat and mobile admin screenshots inspected |

Security checks exercised: unauthenticated admin APIs return 401; non-admin role returns 403; expired sessions rejected; logout revoked; HttpOnly/SameSite cookies; incorrect password rejected; absent Origin blocked; malformed JSON, oversize chat and excessive pagination rejected; SQLi treated as text; feedback rejects nonexistent answers; stored question email/number redaction; indirect instruction-bearing article rejected; draft/archive inaccessible publicly; edited content invalidates retrieval; unrelated article context abstains.

Browser checks exercised: home no horizontal overflow at tested widths; search and article reader; sourced answer; source section navigation; feedback persistence acknowledgment; unsupported answer; admin login, create/publish, public visibility, archive disappearance, logout. These are not exhaustive accessibility, XSS, penetration, concurrency or production deployment tests. Manual full keyboard audit, screen-reader assessment, conventional PostgreSQL adapter and HTTPS deployment remain unverified.

Initial failures were corrected: dependency DNS required network-enabled execution; API tests required loopback access; four phrase-normalization retrieval failures; TypeScript database union overload; browser test heading selectors and shared-fixture collisions. Final results above replace those initial failures. Test runner/glob dependency audit findings were fixed via Vitest upgrade and minimatch override, then tests/lint/typecheck rerun. ESLint excludes generated browser outputs to prevent concurrent output-directory traversal errors.

VERDICT: PASS

This verdict applies to the executed checks above, not all aspirational specification criteria. Remaining scope is listed in README and SECURITY.md.

## Video-directed UI follow-up

The reference video was reviewed through sampled frames across its 35.8-second duration and its full-resolution final checklist. Applied paper/rust/olive styling, serif typography, custom symbols, flat ruled topic/article lists, removal of decorative gradients/dots/shadows/hover effects, a live API-backed homepage demo, privacy/terms routes, and accessible static skeleton loading states. Existing backend unchanged.

Final verification: npm run typecheck PASS; npm run lint PASS; npm run build PASS (200 modules); npm test PASS (20/20); npm run test:e2e PASS (6/6, desktop and mobile). Browser checks include live homepage supported/unsupported responses, source anchors, privacy/terms navigation and existing public/admin flows. Desktop/mobile screenshots inspected. This adds actual product interaction in place of the prior staged hero illustration.

VERDICT: PASS

## Whole-site consistency pass

Applied the video direction to admin navigation, dashboard metric summaries, content tables/editor preview, login, reader navigation and search filters. Added active admin navigation, amber unsupported states, and mobile table containment. Automated route audit visits all 15 public/admin route variants at desktop and mobile widths, checks headings and page overflow, and captures screenshots for visual review. Typecheck, lint and build passed; full browser suite passed 8/8. Backend unchanged in this pass.

VERDICT: PASS

## Final end-to-end demo pass

New lifecycle regression verifies draft invisibility, edit persistence after reload, publishing, real public search, new-content extraction with correct source URL, feedback comment visibility in admin, and archive invalidation in search/chat at desktop/mobile widths. Found and fixed an editor hydration race, stale feedback save acknowledgement and unreadable non-JSON throttle errors. General browsing allowance is 600/minute, with stricter chat/login limits retained. Dedicated test server avoids polluting local demo storage.

Observed full browser suite: 10/10 passed. Backend regression: 20/20 passed before final throttle-message change; final rerun follows. Typecheck/lint passed and production build generated. Dependency audit reports zero vulnerabilities. See DEMO_READY.md for rehearsal steps and limits.

Final post-fix rerun: API 20/20 PASS; browser 10/10 PASS; typecheck/lint/build PASS; dependency audit zero vulnerabilities. Live demo restarted with final changes on port 4000. No remaining observed failures in the tested journeys.

VERDICT: PASS

## Supplied data-rain landing template

Implemented a minimal welcome route at `/` with the supplied canvas simulation, recolored to the existing paper/rust/olive theme. Login links to `/admin/login`; Explore without signing in links to the preserved public homepage at `/explore`; direct assistant and legal links work. Added pause/resume and retained reduced-motion static rendering and hidden-tab suspension. Background is decorative, click-through and hidden from assistive technology. No backend changes or new dependencies.

Verification after implementation: build PASS; typecheck PASS; lint PASS; API suite 20/20 PASS; browser suite 14/14 PASS. New browser checks verify nonempty canvas rendering, animation pause/resume, guest/login navigation, no page errors, reduced-motion rendering and 320px overflow. Desktop/mobile welcome screenshots inspected. Existing search/chat/admin lifecycle flows passed on the isolated test server.

VERDICT: PASS

## Optional Google sign-in

Added Continue with Google on the existing login page, server-side OAuth code exchange, official Google ID-token verification, PKCE, nonce and browser-bound single-use state. Only pre-provisioned and explicitly allowlisted administrators can authenticate. Existing roles are preserved; Google subject bindings cannot be silently replaced. Client secret and tokens remain server-side; tokens are not persisted. Privacy notice and setup guide updated.

Verification: typecheck PASS; lint PASS; build PASS; backend tests 30/30 PASS; desktop/mobile browser tests 16/16 PASS. Dependency installation audited 416 packages and reported zero vulnerabilities. Google provider exchanges are simulated in backend tests. Browser tests verify unavailable configuration and safe errors, and existing password/admin flows still work. Mobile sign-in screenshot inspected. Live Google account login is NOT verified: operator OAuth credentials, consent screen and matching redirect registration are still required. See GOOGLE_SIGN_IN.md.

VERDICT: PASS
