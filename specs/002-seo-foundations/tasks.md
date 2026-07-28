---
description: "Task list for SEO Foundations & Migration Continuity (002-seo-foundations)"
---

# Tasks: SEO Foundations & Migration Continuity

**Input**: Design documents from `/specs/002-seo-foundations/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Tests**: Not explicitly requested in `spec.md`. Following this project's
established convention (see `specs/001-project-foundation/tasks.md`), test
tasks are included only for pure, meaningfully-riskable logic: the
title/description fallback rules, the canonical/hreflang builder, the
redirect-map coverage guarantee (Edge Case: every old URL must be mapped),
and the JSON-LD builder shapes (especially the Principle VIII case — price
omitted when live data is unavailable). Rendering/wiring tasks are not
separately tested beyond the existing `pnpm build`/quickstart.md walkthrough.

**Organization**: Tasks are grouped by user story per `spec.md`'s priorities
(US1 = US2 = P1, US3 = P2, US4 = US5 = P3, US6 = P4).

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1–US6)
- Exact file paths are per `plan.md`'s Project Structure section

## Path Conventions

Single project (per `plan.md`): `src/` at repository root, Payload embedded
in the same Next.js app. New SEO-specific logic lives in `src/lib/seo/`,
colocated `*.test.ts` next to the source it covers (existing convention).

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Environment/config scaffolding shared by every story below — no new dependency is installed (research.md: everything uses Next.js's native Metadata API and this project's existing stack).

- [X] T001 [P] Add `NEXT_PUBLIC_SITE_URL`, `GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_GA_MEASUREMENT_ID` to `.env.example` with explanatory comments (research.md §9)
- [X] T002 [P] Create the `src/lib/seo/` directory with an empty `index.ts` barrel export, following the existing `src/lib/` convention (`find-content-page.ts`, `send-consultation-email.ts`)
- [X] T003 [P] Confirm `vitest.config.ts` picks up `src/lib/seo/**/*.test.ts` (it should via the existing colocated-test glob; adjust only if it doesn't)

**Checkpoint**: Scaffolding in place — Foundational work can begin.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T004 [P] Add the `meta` field group (`meta.title` text/localized, `meta.description` textarea/localized, `meta.ogImage` text) to `src/collections/Pages.ts`, per `data-model.md`
- [X] T005 [P] Add the same `meta` field group to `src/collections/ServicePages.ts`, per `data-model.md`
- [X] T006 Hand-write the Payload migration adding the new `meta_*` columns to the `pages` and `service_pages` tables (the README's documented interactive-prompt gotcha applies — write the `.ts` migration and its matching `.json` schema snapshot by hand, copying the most recent snapshot as a base) (depends on T004, T005)
- [X] T007 [P] Create `src/lib/seo/site.ts` exporting `SITE_NAME`, `SITE_URL` (from `NEXT_PUBLIC_SITE_URL`), and `DEFAULT_OG_IMAGE` constants, per research.md §6 and contracts/seo-metadata-contracts.md

**Checkpoint**: Foundation ready — user story implementation can now begin (US1–US6 can proceed largely in parallel; US5 extends a file US1 creates, see Dependencies below).

---

## Phase 3: User Story 1 - A page keeps its unique identity in search results after the migration (Priority: P1) 🎯 MVP

**Goal**: Every published page, in every locale, renders its own title, description, canonical URL, and hreflang alternates — never the sitewide generic title.

**Independent Test**: Load `/vps` and `/about` in all three locales; confirm six distinct title/description pairs, each with a self-referencing canonical and hreflang links to the other two locales.

### Tests for User Story 1

- [X] T008 [P] [US1] Unit test for the title/description fallback rules (blank `meta.title`/`meta.description` → non-empty, page-specific auto-generated value; never the old sitewide string) in `src/lib/seo/fallback.test.ts`
- [X] T009 [P] [US1] Unit test for the canonical/hreflang URL builder (`ua` unprefixed, `en`/`pl` prefixed, `x-default` → `ua`) in `src/lib/seo/build-metadata.test.ts`

### Implementation for User Story 1

- [X] T010 [US1] Create `src/lib/seo/fallback.ts` with `buildFallbackTitle()`/`buildFallbackDescription()` (page heading + `SITE_NAME` from T007), per research.md §1 (depends on T007)
- [X] T011 [US1] Create `src/lib/seo/build-metadata.ts` exporting `buildPageMetadata({ page, collection, locale, pathname })`, returning a Next.js `Metadata` object with title/description (via T010's fallback) and `alternates.canonical`/`alternates.languages` for `ua`/`en`/`pl`/`x-default` (depends on T010; reuses `src/i18n/routing.ts`'s locale list rather than hand-rolling one)
- [X] T012 [P] [US1] Wire `export async function generateMetadata()` into `src/app/(frontend)/[locale]/page.tsx` (homepage), calling `buildPageMetadata()` with the `home` slug's already-fetched document (depends on T011)
- [X] T013 [P] [US1] Wire `export async function generateMetadata()` into `src/app/(frontend)/[locale]/[slug]/page.tsx` (all other pages), calling `buildPageMetadata()` with `findContentPage()`'s result (depends on T011)
- [X] T014 [US1] Reduce `src/app/(frontend)/[locale]/layout.tsx`'s static `export const metadata` to a genuine last-resort sitewide fallback only (used solely when a route has no page-level `generateMetadata`, e.g. the 404 page) (depends on T012, T013)

**Checkpoint**: US1 fully functional and independently testable — quickstart.md "Validate User Story 1" passes.

---

## Phase 4: User Story 2 - A visitor or search engine following an old link still reaches the right page (Priority: P1) 🎯 MVP

**Goal**: Every one of the old WordPress site's 11 indexed URLs (all locale variants) permanently redirects to its new-site equivalent instead of 404ing.

**Independent Test**: Request every URL from contracts/seo-metadata-contracts.md's table against the local build; every one returns a 301 to a live page.

### Tests for User Story 2

- [X] T015 [P] [US2] Unit test asserting every old-site URL (UA and EN variants) from contracts/seo-metadata-contracts.md's table is present exactly once as a redirect `source`, and every `destination` matches a real app route, in `src/lib/seo/redirect-map.test.ts`

### Implementation for User Story 2

- [X] T016 [US2] Create `src/lib/seo/redirect-map.ts` exporting the full redirect array (11 UA + 11 EN entries, `{ source, destination, permanent: true }`) per contracts/seo-metadata-contracts.md's table (depends on T015 existing to validate against)
- [X] T017 [US2] Wire `next.config.ts`'s `async redirects()` to import and return `src/lib/seo/redirect-map.ts`'s array (depends on T016)
- [X] T018 [US2] Manually verify each redirect against the local build per quickstart.md's `curl -I` steps (all 22 old paths); confirm no old URL lacks a reasonable new-site equivalent (Edge Case fallback-to-nearest-page path is not expected to trigger among the known 11, per contracts.md, but check)

**Checkpoint**: US2 fully functional — no old-site URL 404s.

---

## Phase 5: User Story 3 - Search engines can discover every published page without being told about it by hand (Priority: P2)

**Goal**: `/sitemap.xml` lists every published page across all three locales (and only published ones); `/robots.txt` permits public routes and disallows admin/API.

**Independent Test**: Request `/sitemap.xml` and `/robots.txt`; unpublish a page and confirm it drops out of the next sitemap response.

### Tests for User Story 3

- [X] T019 [P] [US3] Unit test for sitemap entry generation (published-only, one entry per locale published in, excludes drafts) against a mocked Payload query result, in `src/app/sitemap.test.ts`

### Implementation for User Story 3

- [X] T020 [US3] Create `src/app/sitemap.ts` (Next.js native convention) querying published `pages` + `service-pages` documents across `ua`/`en`/`pl`, emitting one `<url>` per locale variant with `lastmod` from the document's `updatedAt`, per contracts/seo-metadata-contracts.md §2 (depends on T007's `SITE_URL`)
- [X] T021 [P] [US3] Create `src/app/robots.ts` (Next.js native convention) allowing public routes, disallowing `/admin` and `/api` (mirroring `proxy.ts`'s matcher), with a `Sitemap:` directive, per contracts/seo-metadata-contracts.md §3

**Checkpoint**: US3 fully functional — sitemap/robots serve correctly per quickstart.md.

---

## Phase 6: User Story 4 - A page qualifies for enhanced search result presentation (Priority: P3)

**Goal**: Organization/WebSite/BreadcrumbList markup sitewide; FAQPage markup matching `PageFaq` exactly; Service markup on VPS (and Colocation/Dedicated once they have live pricing) with live-or-omitted pricing.

**Independent Test**: Run any page through a structured-data validator — zero errors; FAQ questions/answers match what's visibly rendered.

### Tests for User Story 4

- [X] T022 [P] [US4] Unit test for `organizationJsonLd()`/`websiteJsonLd()` output shape in `src/lib/seo/json-ld.test.ts`
- [X] T023 [P] [US4] Unit test for `faqPageJsonLd()` exactly mirroring a given FAQ-items array (same questions, same order, no drift) in `src/lib/seo/json-ld.test.ts`
- [X] T024 [P] [US4] Unit test for `serviceJsonLd()`: omits the `offers`/price field when no live product is supplied, includes it when one is (constitution Principle VIII case) in `src/lib/seo/json-ld.test.ts`

### Implementation for User Story 4

- [X] T025 [US4] Create `src/lib/seo/json-ld.ts` with `organizationJsonLd()`, `websiteJsonLd()`, and `breadcrumbJsonLd(path)`, per research.md §5 (depends on T007's `SITE_NAME`/`SITE_URL`)
- [X] T026 [US4] Add `faqPageJsonLd(items)` to `src/lib/seo/json-ld.ts`, accepting the exact same `AccordionItem[]` shape `PageFaq.tsx` already builds (depends on T025)
- [X] T027 [US4] Add `serviceJsonLd(page, product?)` to `src/lib/seo/json-ld.ts`, where `product` is an optional `ProductSummary` from the existing `ProductCatalogProvider` port (never `billing-adapter/adapters/hostbill` directly — Principle I) (depends on T025)
- [X] T028 [US4] Render `organizationJsonLd()` + `websiteJsonLd()` as a `<script type="application/ld+json">` sitewide from `src/app/(frontend)/[locale]/layout.tsx` (depends on T025)
- [X] T029 [US4] Render `breadcrumbJsonLd()` per-page from `src/app/(frontend)/[locale]/page.tsx` and `src/app/(frontend)/[locale]/[slug]/page.tsx`, reflecting each page's actual nav position from the `site-chrome` global (depends on T025)
- [X] T030 [US4] Render `faqPageJsonLd()` from `src/components/PageFaq.tsx` alongside its existing accordion render, reusing the same `payload.find()` result it already fetched — no second query (depends on T026)
- [X] T031 [US4] Render `serviceJsonLd()` on the VPS page by wiring it into `src/app/(frontend)/[locale]/[slug]/page.tsx` (or `src/blocks/vps-pricing-cards/Component.tsx`) using the already-fetched `getCachedVpsProducts()` result (depends on T027)

**Checkpoint**: US4 fully functional — structured data validates with zero errors per quickstart.md.

---

## Phase 7: User Story 5 - A shared link shows a real preview instead of a blank one (Priority: P3)

**Goal**: Open Graph and Twitter Card tags reflect each page's own title/description/image, not a blank or generic sitewide preview.

**Independent Test**: Paste any published page's URL into a link-preview debugging tool; confirm a distinct title/description/image.

### Implementation for User Story 5

- [X] T032 [US5] Extend `src/lib/seo/build-metadata.ts`'s `buildPageMetadata()` (from T011) to also populate `openGraph` (`title`, `description`, `images`, `locale`, `url`, `type: 'website'`) and `twitter` (`card: 'summary_large_image'`) fields, using `meta.ogImage` with fallback to `DEFAULT_OG_IMAGE` from `site.ts` (depends on T011, T007) — implemented directly inside T011 rather than as a separate follow-up edit, since it was more efficient to write `buildPageMetadata()` complete the first time; verified live on `/vps` during US1 validation (og:title/og:image/twitter:card all present)

**Checkpoint**: US5 fully functional — share previews show real per-page content.

---

## Phase 8: User Story 6 - Pages load fast and stay visually stable while this work ships (Priority: P4)

**Goal**: Web fonts load without blocking first paint or causing layout shift; the two remaining content-meaning images carry descriptive alt text.

**Independent Test**: Load the homepage/`/vps` on a throttled mobile connection — no visible text reflow after fonts load; both images have non-empty `alt`.

### Implementation for User Story 6

- [X] T033 [P] [US6] Remove the `@import url('https://fonts.googleapis.com/...')` line from `src/components/tokens.css`, leaving `--font-display`/`--font-body` values unchanged (research.md §7)
- [X] T034 [P] [US6] Remove the same `@import` line from `design-handoff/project/tokens/typography.css` (the source of truth this file is ported from) to keep both in sync
- [X] T035 [US6] Add `next/font/google` loaders for Unbounded, Inter, Golos Text, and Manrope in `src/app/(frontend)/[locale]/layout.tsx`, applying their combined `className` to `<body>` (depends on T033, T034) — subsets include `cyrillic`/`latin-ext`, not just `latin`, since most site content is Ukrainian/Polish; verified live that headings still compute `font-family: Unbounded, Manrope` per tokens.css despite all 4 classNames being applied to `<body>` (descendant elements' own explicit `font-family` always wins over whichever class "wins" on body itself)
- [X] T036 [P] [US6] Add descriptive `alt` text to the VPS hero image render in `src/blocks/hero/Component.tsx` (the `vps_page.png` usage)
- [X] T037 [P] [US6] Add descriptive `alt` text to the mascot image render in `src/blocks/consultation/Component.tsx` (the `illustrationSrc` / `mascot-contact-us.png` usage)

**Checkpoint**: US6 fully functional — no render-blocking font request, both images accessible.

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Wiring the remaining Foundational config into the rendered app, and confirming everything together.

- [X] T038 [P] Render the `GOOGLE_SITE_VERIFICATION` meta tag and `NEXT_PUBLIC_GA_MEASUREMENT_ID` analytics script conditionally in `src/app/(frontend)/[locale]/layout.tsx`, both omitted entirely when their env var is unset (research.md §9) — verification uses Next's built-in `Metadata.verification.google` field (merges through from the layout into every page's own generateMetadata); GA4 uses `next/script` with `afterInteractive` strategy
- [X] T039 Update `README.md`'s "Fill in `.env`" section to document `NEXT_PUBLIC_SITE_URL`, `GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_GA_MEASUREMENT_ID` (both local-dev and production sections)
- [X] T040 Run `pnpm lint` — confirms `eslint-plugin-boundaries` still passes (no new direct `billing-adapter/adapters/hostbill` import); also fixed two pre-existing, unrelated lint blockers discovered along the way (see Implementation Notes)
- [X] T041 Run `pnpm typecheck`
- [X] T042 Run `pnpm test` — 47 tests pass across 7 files (all new Vitest suites plus the full pre-existing suite, no regressions)
- [X] T043 Run `pnpm build` — succeeds; `/robots.txt` and `/sitemap.xml` both compile as static routes
- [X] T044 Execute quickstart.md's full validation walkthrough end-to-end locally (all six user-story sections) — see Implementation Notes for what was verified live vs. deferred

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories
- **User Stories (Phase 3–8)**: All depend on Foundational phase completion
  - US1 and US2 (both P1) can proceed fully in parallel — different files
  - US3 (P2) is independent of US1/US2 — different files
  - US4 depends only on Foundational (T007) — independent of US1/US2/US3
  - **US5 depends on US1's T011** (it extends the same `build-metadata.ts` function) — sequence US5 after US1, not in parallel with it
  - US6 is fully independent of every other story
- **Polish (Phase 9)**: Depends on all desired user stories being complete

### Within Each User Story

- Tests (where included) before implementation
- Foundational/shared files (e.g. `build-metadata.ts`, `json-ld.ts`) before the pages/components that call them
- Story complete and independently checkpointed before moving to the next priority

### Parallel Opportunities

- All Setup tasks (T001–T003) in parallel
- T004/T005/T007 in Foundational in parallel (different files); T006 waits on T004+T005
- Once Foundational completes: US1, US2, US3, US4, and US6 can all start in parallel (different files); US5 must wait for US1's T011
- Within US1: T008/T009 (tests) in parallel; T012/T013 (the two `generateMetadata` wiring tasks) in parallel once T011 lands
- Within US4: T022/T023/T024 (tests) in parallel; T028/T029/T030/T031 (rendering call sites) in parallel once T025–T027 land
- Within US6: T033/T034 in parallel; T036/T037 (the two alt-text edits, different files) in parallel

---

## Parallel Example: User Story 1

```bash
# Launch both fallback/canonical unit tests together:
Task: "Unit test for fallback rules in src/lib/seo/fallback.test.ts"
Task: "Unit test for canonical/hreflang builder in src/lib/seo/build-metadata.test.ts"

# Once build-metadata.ts (T011) exists, wire both page components together:
Task: "generateMetadata in src/app/(frontend)/[locale]/page.tsx"
Task: "generateMetadata in src/app/(frontend)/[locale]/[slug]/page.tsx"
```

---

## Implementation Strategy

### MVP First (User Stories 1 & 2 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL — blocks all stories)
3. Complete Phase 3 (US1) and Phase 4 (US2) — together these are the MVP: the
   migration no longer regresses or breaks the site's existing search
   standing
4. **STOP and VALIDATE**: run quickstart.md's US1/US2 sections independently
5. This is the safe-to-launch floor — everything after is upside, not a
   launch blocker

### Incremental Delivery

1. Setup + Foundational → foundation ready
2. US1 + US2 → validate independently → **safe to take over the production domain**
3. US3 (sitemap/robots) → validate independently → faster re-indexing
4. US4 (structured data) → validate independently → richer search results
5. US5 (OG/Twitter) → validate independently → real share previews
6. US6 (fonts/images) → validate independently → better Core Web Vitals
7. Polish → confirm everything together via quickstart.md

### Parallel Team Strategy

With more than one person/agent available:

1. Complete Setup + Foundational together first (it blocks everything)
2. Once Foundational is done: one agent takes US1 (then US5 once US1's
   `build-metadata.ts` lands), another takes US2, another takes US3+US4,
   another takes US6 — all touch disjoint files except US5's dependency on
   US1's file

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- US5 is the one deliberate exception to story independence: it extends
  US1's `build-metadata.ts` rather than duplicating a second metadata
  builder — sequence it after US1, not in parallel
- Commit after each task or logical group
- Stop at any checkpoint to validate a story independently before continuing
- Avoid: same-file conflicts across parallel tasks, cross-story dependencies
  that break independence beyond the one noted US5 exception

---

## Implementation Notes (deviations found while building)

- **T006**: `payload migrate:create` initially generated a migration that
  tried to re-create the `pages_blocks_steps*` tables from migration
  `20260724_142826_steps_block`, which had already run (batch 17). Root
  cause: `src/migrations/index.ts` listed `steps_block` *before*
  `faq_items_pages_relationship` even though it actually ran *after* it
  (batch 17 vs. 16, confirmed via `payload migrate:status`) — `migrate:create`
  diffs against the last array entry's snapshot, so it was using the older,
  incomplete one. Fixed by reordering `index.ts` to match actual run order;
  this is a pre-existing repo issue, not something this feature introduced,
  but it blocked writing a correct migration until fixed. This feature's own
  migration (`20260728_100850_add_seo_meta_fields`) was then hand-written
  with only the real `meta.*` column changes.
- **T016/T017**: The redirect map initially used trailing-slash sources
  (`/kolokacziya/`) matching the old site's real URLs exactly, but none of
  them fired. Root cause, confirmed via `.next/routes-manifest.json`:
  Next.js registers its own internal `/:path+/` → `/:path+` redirect with
  `priority: true`, which strips any trailing slash *before* custom
  `redirects()` entries are ever checked. Fixed by writing every source
  without a trailing slash. This also revealed that `/sla` and `/vps` (old
  and new slugs happen to be identical) and both homepages need **no**
  redirect entry at all — Next.js rejects a same-source/destination
  redirect, and once the trailing slash is stripped these are already at
  their correct new-site path.
- **T035**: Applying all four `next/font` loaders' `.className` to the same
  `<body>` element means only one "wins" for `<body>`'s own computed
  `font-family` — verified this doesn't matter in practice, since every
  actual text style in `tokens.css` (`--text-display-*`, `--text-body-*`,
  etc.) sets its own explicit `font-family`, which always overrides
  whatever cascades from `<body>`. Confirmed live: an `<h1>` computes
  `font-family: Unbounded, Manrope, sans-serif` exactly as `tokens.css`
  specifies, despite `<body>` itself resolving to `Manrope` alone.
- **T040**: `pnpm lint` initially failed with two categories of errors
  unrelated to this feature's own code: (1) `eslint-disable-next-line
  react/no-danger` comments this feature added referenced a rule that
  isn't configured anywhere in this project (no `eslint-plugin-react` at
  all) — removed the comments; (2) every existing migration file in
  `src/migrations/` (not just this feature's new one) fails
  `@typescript-eslint/no-unused-vars` on its unused `payload`/`req`
  destructured params — a pre-existing, repo-wide gap, not something this
  feature caused. Fixed with a scoped `eslint.config.mjs` override
  (`args: 'none'` for `src/migrations/**/*.ts`), since Payload's
  `migrate:create` always generates the same `{ db, payload, req }`
  signature regardless of which parameters a given migration actually uses.
- **T044**: Live-verified end-to-end locally: US1 (title/description/
  canonical/hreflang/OG/Twitter on `/vps`, `/about`, `/en/vps`), US2 (all
  22 old-site paths, including the 4 no-redirect-needed cases), US3
  (`/sitemap.xml`, `/robots.txt` content), US4 (JSON-LD on `/vps` — live
  375 UAH price — and `/colocation` — no Service/FAQPage, correctly
  degraded), US6 (computed `font-family`, `alt` attributes in rendered
  HTML). Two quickstart.md checks are deferred to a real deployment rather
  than faked locally: SC-006 (Core Web Vitals) needs a Lighthouse/real-
  network run, not a local dev-mode approximation; the structured-data
  validator and social-preview debugger tools need a publicly reachable
  URL, which `localhost` isn't. The HostBill-unreachable degrade path for
  `serviceJsonLd` is covered by its unit test rather than a live simulated
  outage.
