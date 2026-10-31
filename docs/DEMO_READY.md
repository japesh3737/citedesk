# Hackathon demo readiness

The local demo's core journeys pass: search → read → ask → source → feedback; admin login → draft → edit → reload → publish → public search/chat → archive → disappear.

## Before presenting
1. Run `npm start`, then open http://localhost:4000.
2. Open the ignored `.env` privately to get the local admin credentials. Never project that file or expose its password.
3. Open `/help?q=invoice` and `/assistant` in advance. Use “How do I download invoices?” and “Will you reimburse my flight ticket?” for supported/unsupported examples.
4. Prepare a fictional article with a unique title and slug; save draft, edit its Steps section, reload, publish, search it publicly, ask its unique topic, then archive it.
5. Show `/admin/feedback` and `/admin/questions` after giving feedback. Counts come from the database.
6. Read `docs/DEMO_SCRIPT.md` and `docs/EVALUATION.md` for the presentation and measured sample results.

## Fixed in final testing
- Editor now waits for persisted content before allowing edits; late loading cannot overwrite typed changes. Save/publish/archive buttons disable during a save.
- Feedback changes its status to Saving before each request, so a prior success cannot masquerade as a new saved comment.
- Rate limits return safe JSON messages. General browsing allows 600 requests/minute; chat remains 30/minute and login 10/15 minutes. Fetch clients handle non-JSON server failures gracefully.
- E2E uses an isolated PostgreSQL directory/server on port 4100. Its Vite connection uses a separate port from the live demo.

## Practical limits
No paid/generative AI service, real billing or real ticket integration. Extraction is based on keywords and a small synthetic evaluation set. External PostgreSQL deployment, HTTPS configuration, comprehensive accessibility and independent security auditing remain unverified. Production migration and transactional-audit hardening remain documented work. This is ready for the tested local hackathon story, not a production certification.
