# CiteDesk — Support answers, with sources

A working HACK-P380 support knowledge system using synthetic Orbit Workspace content. React/TypeScript, Express, PostgreSQL, deterministic source-backed extraction. No paid AI service required.

## Run locally (Node 24)

Dependencies are already installed in this workspace. For a fresh copy:

```powershell
npm install
Copy-Item .env.example .env
# Edit .env: set your own DEMO_ADMIN_EMAIL and a unique DEMO_ADMIN_PASSWORD (12+ characters).
npm run db:seed
npm start
```

Open http://localhost:4000. The development server serves both website and API on the same origin. A local, ignored `.env` has been prepared with a random admin password for this workspace; view it privately in your editor to sign in. No password is documented or committed. Changing the environment password does not reset an already-provisioned user.

Default database: embedded PostgreSQL via PGlite, persisted in `data/`. Run only one application/seed process against that directory at a time. Startup applies idempotent schema creation and inserts missing seed articles without overwriting edits. Stop the app before running the standalone seed. For conventional PostgreSQL, configure DATABASE_URL; see compose.yaml. The external PostgreSQL path has not been exercised here.

## Working routes

Public: `/`, `/help`, `/help/articles/:slug`, `/assistant`, `/about-demo`. Admin: `/admin/login`, `/admin`, `/admin/articles`, `/admin/articles/new`, `/admin/articles/:id/edit`, `/admin/questions`, `/admin/feedback`.

Search uses PostgreSQL full-text search; category/product filters and pagination are persisted in the URL. Chat selects a relevant currently published article and returns its exact Steps passage with a real section citation. It records a minimized question, answer and evidence version. Feedback can be updated per anonymous cookie. Admin sessions and all admin authorization are enforced on the server. Publishing, editing and archiving change subsequent public retrieval immediately.

## Checks

```powershell
npm run typecheck
npm run lint
npm test
npm run build
npx playwright install chromium
npm run test:e2e
npm audit
```

E2E tests use local `.env` credentials for admin workflows; without those values admin tests skip. Browser tests create synthetic articles and archive them, and submit real questions/feedback. Tests use temporary in-memory PostgreSQL, separate from the demo database. Screenshots are saved under `test-results/`.

## Production

`npm run build`, configure NODE_ENV=production, DATABASE_URL and HTTPS PUBLIC_BASE_URL (or Render's RENDER_EXTERNAL_URL), provision an admin separately, then `npm start`. Production startup refuses an insecure origin or missing PostgreSQL connection. A same-origin TLS reverse proxy is required; the app listens on its configured port on all interfaces in production. Do not expose the Vite development server publicly.

For Render, `render.yaml` defines a Node web service and a PostgreSQL database. Connect this repository as a Render Blueprint and enter `ADMIN_BOOTSTRAP_EMAIL` and a unique `ADMIN_BOOTSTRAP_PASSWORD` of at least 16 characters in Render's private environment prompts. The account is created only while the users table is empty; remove the bootstrap password from Render's environment after the first successful login. Render provides the HTTPS URL and database connection. The free PostgreSQL plan expires after 30 days and has no backups, so export or upgrade it before a longer-lived deployment. Google sign-in remains optional and requires separate OAuth configuration.

## Submission documents

Original authoritative specifications remain in `source/`. See `docs/ARCHITECTURE.md`, `docs/SECURITY.md`, `docs/EVALUATION.md`, `docs/DEMO_SCRIPT.md`, `docs/VALIDATION.md`, and `docs/CHECKLIST.md` for implementation decisions and measured limitations.

## Known scope limitations

This is a hackathon application, not a security certification. No generative AI provider, external support tickets, real billing or customer integrations. Retrieval is conservative keyword extraction, not semantic reasoning. No product/category taxonomy management screen, dedicated search analytics, historical revisions, or admin audit viewer. Styling uses custom semantic CSS and controlled React forms rather than Tailwind/React Hook Form/TanStack Query. Database access uses parameterized SQL rather than an ORM; initial schema creation is idempotent but not a versioned migration framework. Audit inserts are separate from article mutation transactions. Structured request logging, exhaustive accessibility auditing and distributed rate limiting remain production work. Do not claim all specification acceptance criteria are complete.

## Video-directed design update

The user's follow-up video supersedes the kit's default visual recommendations. The interface now uses a warm paper/olive/rust palette, Georgia headings, system Tahoma body text, custom SVG control symbols, flat ruled article/topic lists and restrained square corners. Decorative Lucide icons, dotted backgrounds, rainbow topic cards, shadows, colored answer stripes and hover movement were removed. The homepage example calls the actual chat API and displays only returned evidence. `/privacy` and `/terms` disclose the demo's actual storage, retention, cookies and limitations. Loading states use static skeletons with screen-reader status text.

Verified after the redesign: typecheck, lint, build, 20 API tests and six desktop/mobile browser tests passed. See docs/video-review/REVIEW.md.

## Minimal welcome page

`/` is now the plain welcome screen with the supplied data-rain background in the site's rust/olive palette, CiteDesk name, short description, Login and Explore without signing in. The existing full public homepage and live demo remain at `/explore`. Login opens the existing administrator sign-in; visitors can browse and ask questions without an account. A pause/resume control and static reduced-motion rendering keep the decorative effect optional. No Tailwind or shadcn migration was needed for the provided self-contained canvas component. See docs/LANDING_TEMPLATE.md.

## Optional Google administrator sign-in

Google sign-in is implemented alongside email/password authentication. Locally, set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET and GOOGLE_ADMIN_EMAILS in your private `.env`, register `http://localhost:4000/api/auth/google/callback` in Google Cloud, stop the embedded database server, run `npm run admin:google`, then restart. On Render, set the same three variables privately on the web service and register `https://citedesk.onrender.com/api/auth/google/callback`; the explicitly allowlisted accounts are provisioned on startup if missing. Existing non-admin roles stay unchanged. No public admin registration is added. Full setup and verification limitations: [docs/GOOGLE_SIGN_IN.md](docs/GOOGLE_SIGN_IN.md). Real Google account login requires your own OAuth credentials and has not yet been verified here.
