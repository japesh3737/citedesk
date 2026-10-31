# CiteDesk — Design Document

**Product:** CiteDesk — *Support answers, with sources.*  
**Design thesis:** Calm, premium, trustworthy support software that makes evidence visible.  
**Audience:** Hackathon judges, visitors trying to solve issues, content administrators.  
**Relationship:** Implements the user journeys and constraints in `01-PRD.md`.

## 1. Creative direction

Design a polished SaaS product, not a generic AI chat clone. Visually communicate **clarity, editorial credibility, and ease of use**. The interface should look professionally art-directed and be genuinely usable in both laptop demo and on mobile.

**Keywords:** editorial precision, spacious, welcoming, reliable, polished, technical yet human.

**Avoid:** gaudy AI/neon effects, generic purple gradients, intense glassmorphism, noisy dashboards, decorative fake accuracy scores, flashing elements, excessive animation, empty “coming soon” cards, emoji-heavy corporate UI and dead-end buttons.

Suggested distinctive motif: **Evidence line** — a fine teal connector between an answer sentence and its source card. It subtly reinforces “reason → source” without misleading the user about AI certainty.

## 2. Design system

### Core palette

| Token | Hex | Usage |
|---|---|---|
| `ink` | `#0B1220` | Heading text, dark sidebar, hero text |
| `slate` | `#475569` | Secondary text |
| `muted` | `#64748B` | Metadata/captions |
| `canvas` | `#F7F9FC` | Application background |
| `surface` | `#FFFFFF` | Cards, overlays, inputs |
| `line` | `#E2E8F0` | Borders/separators |
| `brand` | `#2563EB` | Main action buttons, links, focus accents |
| `brand-hover` | `#1D4ED8` | Hover state |
| `evidence` | `#0F766E` | Grounded source tags, cite links |
| `evidence-soft` | `#ECFDF5` | Citation background |
| `warning` | `#B45309` | Insufficient-source messaging |
| `warning-soft` | `#FFFBEB` | Fallback background |
| `danger` | `#B91C1C` | Error/destructive actions |

Create semantic CSS variables for foreground, borders, background, muted, brand and focus so contrast can be audited and future themes changed without rewriting all components. Do not imply a reassuring green state when an answer is unsupported.

### Typography
- Heading: `Plus Jakarta Sans` (or system fallback; don't block rendering for fonts).
- Body: `Inter` or system UI font.
- Code / IDs: `JetBrains Mono` or system monospace.
- Use strong type scale: hero 52–64px on large screens (clamp down to ~36px mobile), page H1 32–40px, section H2 24–28px, body 15–16px/1.6, labels 13–14px.
- Prefer sentence-case labels, logical information hierarchy and short descriptive titles.

### Spacing, components and visual texture
- 8px-based spacing rhythm (4/8/12/16/24/32/48/64/96).
- Public content maximum width ~1200px; reading column ~720px; admin main ~1360px.
- Card radius 16px, buttons 10–12px, input 10px, pill chips fully rounded.
- Soft and restrained shadows; borders and spacing carry hierarchy.
- Use Lucide icons, consistent line weight; avoid random iconography.
- Selected category chips and source references have clearly differentiated states.
- Original illustrations may be simple inline SVG/CSS abstract document-and-search motifs, never a copyrighted screenshot presented as original.

## 3. Information architecture

```text
PUBLIC
/
  hero search + Ask AI
  popular categories, featured articles, how citations work, demo notice
/help
  searchable article index + filters
/help/articles/:slug
  article detail, section anchors, related articles
/assistant
  source-grounded chat + source panel + feedback
/about-demo
  explains fictional sample data and AI limitations

ADMIN
/admin/login
/admin
  dashboard KPIs, questions, feedback, missing topics
/admin/articles
  searchable table, statuses, actions
/admin/articles/new
/admin/articles/:id/edit
/admin/questions
  recent sanitized requests, supported/unanswered filters
/admin/feedback
  ratings and optional comments
/admin/settings (optional)
  display settings; no UI to reveal secrets

SYSTEM
/not-found, /error, loading/empty/error components
```

If additional routes exist, keep them consistent and documented; avoid redundant navigation.

## 4. Public homepage — flagship screen

**Visual goal:** Visitors understand within five seconds that CiteDesk answers support questions using citable documentation.

1. **Top bar:** Compact monogram/document-mark + CiteDesk, links `Help Center`, `Ask AI`, `How it works`, `Admin` (separate), right-aligned primary `Ask a question` button. Sticky but low-profile.
2. **Hero:** Editorial two-column desktop, one-column mobile; eyebrow `ARTICLE-BACKED SUPPORT`, H1 “Answers you can trace back to the source.” Short subheading about approved documentation and honest uncertainty. Wide search field with key hint `/`, adjacent `Ask AI` CTA. On the right, tasteful composed illustration: question card → concise answer → attached cited article card. Illustration should remain an illustration, not fake live output.
3. **Trust strip:** “20+ sample articles,” “Clickable source references,” “Honest no-answer fallback.” Do not display unmeasured AI accuracy or “verified by security experts.”
4. **Browse topics:** Grid of 5–6 cards (Account, Security, Billing, Team, Integrations, Troubleshooting) with icons, descriptive single line, article counts from DB.
5. **Featured help:** 3–6 article cards; updated metadata and product chips.
6. **How it works:** Search → Read → Ask and verify; three clean steps.
7. **Footer:** Demo disclosure, privacy note, links and simulated contact-support guidance.

**Suggested microcopy:** “Find the article. See the evidence. Keep moving.”

## 5. Knowledge explorer `/help`

- Desktop: search input across top, fixed/sticky left filter rail 220–250px (category, product), main result region with count and sort. Mobile: search full width and drawer/sheet for filters.
- Result row/card: title, 1–2 lines excerpt, category/product chip, last-reviewed, link to article. Search-term highlights safely rendered as text nodes, never user-generated HTML.
- Debounce ~250–350ms, Cancel/abort prior requests to prevent stale search; URL query parameters retain search state for share/back navigation.
- States: initial recommended articles; loading skeleton; no-result screen offering simpler terms or assistant; error with Retry.
- Keyboard focus should be obvious; no auto-focus stealing when results load.

## 6. Article detail `/help/articles/:slug`

- Breadcrumb: Home / Help / Category / Article.
- H1, short summary, category + product, published/last reviewed metadata, labeled `Fictional demo content` where policy/integration is synthetic.
- Main reading column with copyable section links, bullets/numbered steps/callouts, safe code formatting if appropriate; TOC on right for desktop, collapsible TOC mobile.
- Sticky “Ask CiteDesk about this article” action that passes only article context ID, not privileged data.
- “Was this article helpful?” optional simple metric if implemented separately from answer feedback; do not conflate counts.
- Related article cards below; archive should remove public visibility immediately.

## 7. AI assistant `/assistant` — most important presentation screen

Desktop layout suggestion:

```text
┌──────────────────────────────────────────────────────────────────────────┐
│ CiteDesk / Ask AI                        DEMO: fictional documentation   │
├────────────────────────────────────────────────────┬─────────────────────┤
│ Conversation                                       │ Sources             │
│                                                    │                     │
│ User: How do I download an invoice?                │ KB-012              │
│                                                    │ Download an invoice │
│ AI: Open Billing > Invoices ... [1]                │ § Download steps    │
│                                                    │ View source →       │
│ Was this helpful? [Yes] [No]                       │                     │
│                                                    │ Answer mode:        │
│ [ Ask a support question...                ] [↗]   │ Article-backed      │
└────────────────────────────────────────────────────┴─────────────────────┘
```

- Centered welcome state with simple assistant mark, heading “What can we help you find?”, suggestions from seeded content.
- Chat message surfaces: visitor lightly tinted, assistant white with subtle left evidence bar. Use line length comfortable for reading.
- On each grounded answer: clearly labeled `Based on approved articles`, numbered citation chips, expandable source cards with title, section, snippet and a real internal link. Citation numbers map exactly to response data. Show answer mode if relevant: `Extractive demo mode` or `AI summary of retrieved articles`.
- For unsupported answer: amber-bordered inline state “I couldn't find enough approved documentation to answer that reliably.” Offer `Browse help articles`, `Contact support (demo)`, and “Try rephrasing.” No fake citation chips.
- Assistant input: multiline with controlled length, send button disabled while empty, keyboard `Enter` submit / `Shift+Enter` newline, input counter when near limit, message error retries.
- `Helpful` / `Not helpful` buttons after each answer; an optional small textarea appears for reasons. Provide saved/error state.
- Do not render Markdown/HTML from the LLM unsanitized; source titles/snippets are escaped.
- Mobile: source cards appear inline under each answer or accessible in a drawer. No tiny split pane or horizontal scrolling.
- For API latency, use subtle skeleton dots/“Searching approved articles…”; never imply hidden reasoning or fabricate agent steps.

## 8. Admin shell / dashboard

- Dark `ink` left sidebar on desktop, white content canvas. Logo, compact nav with Dashboard / Articles / Questions / Feedback / Sign out. Collapse to accessible drawer on mobile.
- Admin header: `Knowledge operations`, date label, signed-in role, add-article CTA; no fake notification badge.
- Four summary metric cards: published articles, unanswered questions, feedback helpfulness rate, questions this week. Real database-derived aggregations and consistent time range.
- Below: `Recent support questions` table, `Knowledge gaps` ranked list (unanswered themes), `Recent feedback` panel. If little data, show helpful empty states instead of inventing chart data.
- Keep charts limited and readable; include textual labels and accessible table alternatives where practical.
- Add clear `Demo analytics` disclaimer for synthetic-seeded events.

### Article table and editor
- Table headers title, category, product, status, updated, action; sortable or filtered as feasible.
- Status indicators neutral/green/amber as appropriate; never rely on color alone.
- Editor responsive two-pane desktop (form + live article preview); single-column mobile; manual or autosave only if reliable. Validation messages are adjacent to fields.
- Explicit status controls `Save draft`, `Publish`, `Archive`; confirmation modal for archive; success toast after server acknowledges.
- Preview must not make drafts publicly discoverable; render in authenticated admin route only.

## 9. Interaction inventory (every visible control must work)

- Navigation links navigate to implemented routes.
- Hero search queries real backend and passes query to Help explorer.
- Category/product filters update results; Reset clears them.
- Search submit handles empty and high-length input responsibly.
- Suggested chat questions start actual server requests.
- Sources jump to correct article anchors; stale source shows helpful state.
- Feedback persists to database and acknowledges submission.
- Admin login/logout uses backend sessions; invalid credentials display generic errors.
- Create/edit/publish/archive actions persist and refresh counts, search index, chat retrieval.
- Tables paginate/filter; empty and error views remain usable.
- All destructive actions need explicit affordance/confirmation; no inert “Export” buttons unless implemented.

## 10. Motion and micro-interactions

- Smooth but restrained: 160–220ms fades/translations for buttons, cards, panels; hover slight lift (~2px) on cards; focus rings immediate.
- Hero entrance optional 350–500ms and reduced-motion friendly.
- Skeletons for loading; success/error feedback no excessive animation.
- Respect `prefers-reduced-motion`; do not hide content pending scroll animation; no scroll-jacking.
- Desktop performance must remain good on typical student laptops and public demo Wi-Fi.

## 11. Responsive breakpoints and interaction patterns

- Small mobile 320–479px: single-column, sticky input if viewport permits, accessible bottom spacing with software keyboard.
- Mobile 480–767px: 1–2 grid columns, stacked chat sources.
- Tablet 768–1023px: optional compact sidebar/filter drawer.
- Desktop >=1024px: multi-column home and AI source rail, admin sidebar and tables.
- Tables overflow within their own scroll containers; no entire-screen horizontal overflow.

## 12. Accessible and trustworthy language

- Support direct labels such as `View source`, `This answer was helpful`, `Not enough approved information`.
- Avoid “AI thinks” / “100% correct” / “guaranteed safe” / fake certifications.
- Label simulated content, AI-generated summaries and fictional product policies.
- Cite links and source snippets should be obvious in both high and low contrast.
- All controls receive visible focus and descriptive accessible names; status messages use polite live regions where appropriate.

## 13. Screen acceptance checklist

- [ ] Home is editorial, readable, responsive and introduces source-backed help in <5 seconds.
- [ ] Search has meaningful real results, filters and all states.
- [ ] Article view is structured and safely rendered, citations jump to actual sections.
- [ ] Assistant has complete success, feedback and unsupported-answer states.
- [ ] Admin routes are coherent, secure, non-decorative and functional.
- [ ] Every visible button and menu works or is explicitly labeled disabled for a valid reason.
- [ ] Mobile and desktop screenshots match the same design system, without broken overflow.
- [ ] Color contrast, focus, keyboard navigation and reduced motion have been tested.

## 14. Design QA/demo screenshot plan

Capture and inspect at least: home desktop and mobile, Help filtered result, sourced answer with citations, unsupported query state, article detail, admin dashboard, article editor. Check actual text clipping, focus state and small-screen chat composer. Any user-facing promise shown in screenshot must be backed by a working feature or clearly labeled simulated.
