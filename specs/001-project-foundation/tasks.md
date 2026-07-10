---
description: "Task list for Project Foundation (001-project-foundation)"
---

# Tasks: Project Foundation

**Input**: Design documents from `/specs/001-project-foundation/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Tests**: Constitution Principle VII requires elevated test coverage specifically
for `billing-adapter`; test tasks are included for User Story 3 (billing-adapter)
and for the one data-integrity rule called out in `data-model.md` (Hero block's
CTA field pairing). Tests are not otherwise mandated for this feature.

**Organization**: Tasks are grouped by user story to enable independent
implementation and testing of each story, per `spec.md`'s priorities (US1 > US2 > US3).

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- Exact file paths are per `plan.md`'s Project Structure section

## Path Conventions

Single project (per `plan.md` Structure Decision): `src/` at repository root,
Payload embedded in the same Next.js app — no `backend/`/`frontend/` split.
Tests are colocated as `*.test.ts` next to the source they cover.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic tooling

- [X] T001 Create the Next.js (App Router) project with TypeScript strict mode enabled, per `plan.md` Project Structure, at the repository root
- [X] T002 [P] Install and wire Payload CMS into the Next.js app via its native Next.js integration: `payload.config.ts` at repo root, `(payload)` route group with `admin/[[...segments]]/page.tsx` and `api/[...slug]/route.ts` under `src/app/`
- [X] T003 [P] Configure Payload's PostgreSQL database adapter; create `docker-compose.yml` at repo root running PostgreSQL only, pinned to the version decided in `research.md` §8
- [X] T004 [P] Configure ESLint with `eslint-plugin-boundaries`: define `billing-adapter`, `billing-adapter-ports`, and `app` element types, and forbid `app`-type files from importing `billing-adapter/adapters/**` (per `research.md` §6 and constitution Principle I)
- [X] T005 [P] Configure Vitest for the project (colocated `*.test.ts` files, TypeScript support)
- [X] T006 Verify `.env.example` matches the variables used by this feature (`HOSTBILL_API_URL`, `HOSTBILL_PORTAL_READONLY_API_ID`, `HOSTBILL_PORTAL_READONLY_API_KEY`, `HOSTBILL_WEBHOOK_SECRET`, `DATABASE_URL`, `PAYLOAD_SECRET`) and update it if any are missing

**Checkpoint**: Toolchain in place — Foundational work can begin.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T007 Set up `next-intl` locale routing with `localePrefix: 'as-needed'` (Ukrainian default with no URL prefix, English at `/en/`, Polish at `/pl/`) in `src/i18n/routing.ts` and `src/app/(frontend)/middleware.ts`, per `research.md` §2
- [X] T008 [P] Create message dictionaries `src/i18n/messages/ua.json`, `en.json`, `pl.json`, with English/Polish falling back to Ukrainian for any missing key
- [X] T009 [P] Port design-system tokens (`colors.css`, `typography.css`, `spacing.css`, `base.css`) from `design-handoff/project/tokens/` into `src/components/tokens.css`
- [X] T010 [P] Port the `Button`, `Card`, `Badge`, and `Tag` components from `design-handoff/project/components/` into `src/components/` as real React components (needed by Hero and the shared header/footer)
- [X] T011 Create the `SiteChrome` Payload global (`navLinks`, `footerColumns`, `supportedLocales`, `supportedCurrencies`) in `src/globals/SiteChrome.ts`, per `data-model.md`
- [X] T012 Create the shared `(frontend)` layout rendering Header/Footer from the `SiteChrome` global, design-system styled, in `src/app/(frontend)/[locale]/layout.tsx` (depends on T009, T010, T011)
- [X] T013 Create the `client_identity_map` migration (`internal_user_id` UUID PK, `hostbill_client_id` integer unique, `email`, `created_at`) using Payload's migration CLI, per `data-model.md` and `research.md` §8
- [X] T014 Set up the GitHub Actions CI workflow (`lint`, `typecheck`, `test`, `build`, Semgrep) in `.github/workflows/ci.yml`, triggered on push to `main`, per `research.md` §9

**Checkpoint**: Foundation ready — user story implementation can now begin (US1/US2/US3 can proceed in parallel).

---

## Phase 3: User Story 1 - Operator publishes a content change without a code deployment (Priority: P1) 🎯 MVP

**Goal**: An operator can edit a Hero section's content in the admin interface and see the change live on the homepage, with no code change or redeploy.

**Independent Test**: Log into `/admin`, edit the homepage's Hero heading, reload the public homepage, confirm the new heading appears.

### Tests for User Story 1

- [X] T015 [P] [US1] Unit test for Hero block field validation (a `ctaLabel` without a `ctaHref` is invalid, and vice versa) in `src/blocks/hero/config.test.ts`

### Implementation for User Story 1

- [X] T016 [P] [US1] Create the Hero block field config (`heading` required, `subheading` optional, `ctaLabel`/`ctaHref` paired) in `src/blocks/hero/config.ts`
- [X] T017 [US1] Create the Hero React render component, design-system styled, in `src/blocks/hero/Component.tsx` (depends on T009, T010, T016)
- [X] T018 [US1] Create the `Pages` collection (`title`, `slug` unique per `locale`, `locale`, `blocks: [HeroBlock]`, `publicationStatus`) in `src/collections/Pages.ts` (depends on T016)
- [X] T019 [US1] Register the `Pages` collection, `SiteChrome` global, and Hero block in `payload.config.ts` (depends on T011, T017, T018)
- [X] T020 [US1] Create the homepage route rendering the `Pages` collection's `blocks` array in `src/app/(frontend)/[locale]/page.tsx` (depends on T012, T019)

**Checkpoint**: User Story 1 fully functional and testable independently — an operator can create the first admin account, edit Hero content, and see it live.

---

## Phase 4: User Story 2 - Visitor sees a consistent, multi-language-ready site shell (Priority: P2)

**Goal**: Every page shows a working language selector (UA/EN/PL) and currency selector (UAH/USD/EUR) in the header.

**Independent Test**: Load any page, switch the language selector to English, confirm the address updates to `/en/...` and the page still renders; confirm the currency selector lists UAH/USD/EUR.

### Implementation for User Story 2

- [X] T021 [P] [US2] Implement the language selector, reading `supportedLocales` from the `SiteChrome` global and generating `next-intl` locale links, in `src/components/LanguageSwitcher.tsx`
- [X] T022 [P] [US2] Implement the currency selector (display-only at this stage), reading `supportedCurrencies` from the `SiteChrome` global, in `src/components/CurrencySwitcher.tsx`
- [X] T023 [US2] Wire `LanguageSwitcher` and `CurrencySwitcher` into the shared header in `src/app/(frontend)/[locale]/layout.tsx` (depends on T012, T021, T022)
- [X] T024 [US2] Verify Ukrainian-fallback rendering when a locale's message key is missing, adjusting `src/i18n/routing.ts` if needed (depends on T007, T008)

**Checkpoint**: User Stories 1 AND 2 both work independently.

---

## Phase 5: User Story 3 - Operator confirms billing connectivity before customer-facing billing features are built (Priority: P3)

**Goal**: A read-only connectivity check proves the platform can retrieve real product data from HostBill.

**Independent Test**: Run the connectivity check script; confirm it returns real product data with valid credentials, and a clear failure with invalid/missing credentials.

### Tests for User Story 3

- [X] T025 [P] [US3] Contract test for `ProductCatalogProvider.listProducts` against `contracts/billing-adapter-ports.md`, in `src/billing-adapter/adapters/hostbill/hostbill-product-catalog-provider.adapter.test.ts`

### Implementation for User Story 3

- [X] T026 [P] [US3] Define the `billing-adapter` ports (`ClientProvider`, `InvoiceProvider`, `OrderProvider`, `ProductCatalogProvider`, `BillingAdapterError`) per `contracts/billing-adapter-ports.md`, in `src/billing-adapter/ports/`
- [X] T027 [US3] Implement the low-level HostBill API client (`api_id`/`api_key` POST + `call` parameter, JSON response parsing) in `src/billing-adapter/adapters/hostbill/hostbill-client.ts` (depends on T026)
- [X] T028 [US3] Implement the HostBill-backed `ProductCatalogProvider` adapter (`listProducts`, `getProductDetails`, `listCurrencies`) in `src/billing-adapter/adapters/hostbill/hostbill-product-catalog-provider.adapter.ts` (depends on T025, T027)
- [X] T029 [US3] Implement the connectivity smoke-test script (calls `listProducts`, prints a clear success/failure result) in `src/billing-adapter/adapters/hostbill/hostbill-connectivity-check.ts`, and add a `billing:check` script to `package.json` (depends on T028)

**Checkpoint**: All three user stories independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Verification and cleanup spanning all three user stories

- [X] T030 [P] Verify `eslint-plugin-boundaries` actually fails the build if a file outside `billing-adapter` imports `billing-adapter/adapters/hostbill/*` directly (write and then remove a deliberate violation to confirm the lint rule catches it)
- [X] T031 [P] Security review: confirm no field in any Payload collection or global introduced by this feature accepts payment card data (FR-010 / SC-005)
- [X] T032 Run through `quickstart.md` end-to-end (all three user stories plus the quality-gate commands) and fix anything that doesn't match the documented expected outcome
- [X] T033 Final `pnpm lint && pnpm typecheck && pnpm test && pnpm build` pass, and confirm the GitHub Actions run is green on `main`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational completion; US1, US2, US3 have no dependencies on each other and can proceed in parallel
- **Polish (Phase 6)**: Depends on all three user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) — no dependency on US2/US3
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) — shares the layout file (T012) with US1 but is otherwise independent; T023 touches the same file as T012, so sequence US2's layout edit after US1 merges if worked in parallel by different people
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) — fully independent (different files entirely from US1/US2)

### Within Each User Story

- Tests (where included) before implementation
- Block/port config before the component/adapter that uses it
- Collection/global registration before the route that renders it

---

## Parallel Example: Foundational Phase

```bash
# After T007 (locale routing) is underway, these can run together:
Task: "Create message dictionaries ua.json/en.json/pl.json in src/i18n/messages/"
Task: "Port design-system tokens into src/components/tokens.css"
Task: "Port Button/Card/Badge/Tag components into src/components/"
```

## Parallel Example: User Story 3

```bash
# T025 and T026 touch different files and can run together:
Task: "Contract test for ProductCatalogProvider.listProducts in .../hostbill-product-catalog-provider.adapter.test.ts"
Task: "Define billing-adapter ports in src/billing-adapter/ports/"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL — blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: run the User Story 1 section of `quickstart.md`
5. This alone proves the core value proposition (edit content, see it live) — demo-able before US2/US3 exist

### Incremental Delivery

1. Setup + Foundational → foundation ready
2. Add User Story 1 → validate independently → this is the MVP
3. Add User Story 2 → validate independently (site shell fully functional)
4. Add User Story 3 → validate independently (billing connectivity proven)
5. Phase 6 polish → confirm everything together via `quickstart.md`

### Parallel Team Strategy

With more than one person/agent available:

1. Complete Setup + Foundational together first (it blocks everything)
2. Once Foundational is done: one person/agent takes US1, another takes US3 (fully independent); US2 can follow either, but its layout-file edit (T023) should be sequenced after US1's (T012 creator) to avoid a merge conflict on the same file

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- This feature deliberately implements only the `ProductCatalogProvider` port end-to-end (US3); `ClientProvider`, `OrderProvider`, and `InvoiceProvider` are defined (T026) but not called by anything yet — that's correct per `contracts/billing-adapter-ports.md`, not an oversight
- Commit after each task or logical group
- Stop at any checkpoint to validate a story independently before continuing
- Avoid: same-file conflicts across parallel tasks, cross-story dependencies that break independence

---

## Implementation Notes (deviations found while building)

- **T007**: Next.js 16 renamed the `middleware.ts` file convention to
  `proxy.ts` — the file lives at `src/proxy.ts`, not `src/app/(frontend)/middleware.ts`
  as originally sketched. Same `next-intl` logic either way.
- **T007**: `localeDetection: false` was added to `src/i18n/routing.ts`
  beyond the original plan — without it, next-intl auto-redirected a
  browser with an English `Accept-Language` header away from the Ukrainian
  homepage at `/`, which contradicts "UA is the default, not just whichever
  locale content-negotiation picks."
- **T013**: The migration file
  (`src/migrations/20260710_100352_client_identity_map.ts`) ended up
  containing Payload's entire initial schema (this was genuinely the
  project's first migration) *plus* the hand-written `client_identity_map`
  table — not a migration containing only that one table. `payload.config.ts`
  was also changed to `push: false` so local dev and production both go
  through migrations only, with no drift between them.
- **T004**: The boundaries rule's `import/resolver` uses the plain `node`
  resolver, not `eslint-import-resolver-typescript` as first tried — the
  latter's native `unrs-resolver` binding fails to load on at least one
  Windows dev machine used on this project (likely a missing VC++ runtime).
  Trade-off: relative-path imports into `billing-adapter/adapters/**` are
  caught (verified live in T030); a violation written via the `@/*` alias
  would not be. Revisit if that gap turns out to matter in practice.
- **T027/T029**: `billing-adapter`'s own internal imports use relative paths
  with explicit `.ts` extensions (not the `@/*` alias), and
  `allowImportingTsExtensions` was added to `tsconfig.json` — needed so
  `hostbill-connectivity-check.ts` can run standalone via
  `node --experimental-strip-types`, which doesn't resolve path aliases or
  TS-only syntax like constructor parameter properties (see
  `BillingAdapterError` in `src/billing-adapter/ports/errors.ts`).
- **T029 — real-world result**: the connectivity check runs successfully
  against `https://cp.astra.in.ua/admin/api.php` but HostBill currently
  returns `{"success": false}` with no error detail for `getProducts`. This
  almost always means the `portal-readonly` API key doesn't have
  `getProducts` enabled yet (or has an IP restriction blocking this
  machine) — action item for whoever manages the HostBill API key
  settings, not a code defect. The check correctly reports this as a clear
  failure (FR-008), which is exactly what it's for.
