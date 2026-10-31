# CiteDesk Hackathon Codex Starter Kit

This folder is a **planning and prompting kit, not a completed application**.

## Included
- `CODEX_MASTER_PROMPT.md` — complete one-paste instruction for Codex.
- `source/01-PRD.md` — product specification, required workflows, seed/evaluation plan, criteria.
- `source/02-Design-Document.md` — visual identity and page-by-page UI/UX design.
- `source/03-Tech-Stack.md` — architecture, security, API, data model, testing and deployment.

## How to use
1. Extract this kit at the root of your existing/new repository.
2. Open that repository in Codex.
3. Paste `CODEX_MASTER_PROMPT.md` into Codex. It instructs Codex to inspect the repo and read all three source documents **before coding**, then build/test the complete website.
4. Supply your own local PostgreSQL setup and environment variables when Codex requests them. Do not paste or commit real production keys into the source files.
5. Use the generated app's README and the hackathon demo script to run and present it.

## Safety note
Security instructions and automated tests reduce risk; no prompt alone can guarantee a secure app. Never deploy the demo with shared sample credentials or expose real customer information.
