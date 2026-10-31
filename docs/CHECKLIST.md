# Implementation checklist
- Preserve and read all five specifications.
- PostgreSQL persistence, schema, idempotent articles and environment-provisioned admin.
- Validated public APIs, published-only search, conservative extraction, feedback.
- Cookie sessions, role checks, origin CSRF defense, throttling, headers, redaction.
- Responsive public and admin routes with real mutations.
- API/evaluation tests, build, typecheck, lint, browser checks and audit.
- Accurate setup, architecture, security, evaluation and demo documentation.

Decision: use PGlite PostgreSQL locally because Docker is unavailable; use pg when DATABASE_URL is set. Keep original specifications intact; document deviations separately.

## Observed completion
- Implemented and checked: persistent seed, public/admin APIs, extraction, feedback, role/session controls, public/admin UI, 20 API checks, four browser flows, build/typecheck/lint/audit, HTTP evaluation and submission docs.
- Deferred or unverified: optional provider, taxonomy management, search analytics, full audit/revision UI, versioned migrations, transactional audit coupling, exhaustive accessibility/security review, external PostgreSQL and HTTPS deployment. See README for complete limitations.
