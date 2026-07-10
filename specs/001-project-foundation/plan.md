# Implementation Plan: Project Foundation

**Branch**: `001-project-foundation` | **Date**: 2026-07-10 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-project-foundation/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Stand up the single-application platform (Next.js + embedded Payload CMS +
PostgreSQL) that every later AstraCloud page depends on: a real, design-system-
styled site shell (Header/Footer, language/currency selectors), one working
CMS-editable content block (Hero) proving the edit-and-see-it-live loop, an
isolated `billing-adapter` with a read-only HostBill connection smoke test, the
`client_identity_map` table, local Postgres via Docker Compose, and a GitHub
Actions CI workflow. Technology choices are fixed by
`.specify/memory/constitution.md`; this plan works out the concrete structure
and operational decisions needed to build to that spec.

## Technical Context

**Language/Version**: TypeScript (strict mode), Node.js ≥ 20

**Primary Dependencies**: Next.js (App Router), Payload CMS (embedded via its
native Next.js integration, not a separate service), `next-intl` (locale
routing), a thin hand-written HostBill API client (no third-party HostBill
SDK exists worth depending on)

**Storage**: PostgreSQL (via Payload's Postgres database adapter)

**Testing**: Vitest for unit/integration tests (fast, ESM-native, first-class
TypeScript support); no end-to-end test framework introduced in this feature —
`quickstart.md` serves as the manual end-to-end validation script instead

**Target Platform**: Linux server (self-hosted, per constitution) for
production; local development on the operator's machine (Windows), app
un-containerized locally, PostgreSQL in Docker

**Project Type**: Single web application (Next.js app with Payload embedded in
the same process — not a frontend/backend split, per constitution Principle VI)

**Performance Goals**: No specific target beyond standard responsive web-app
expectations; this feature is about proving the architecture works, not about
load — revisit if a later feature's traffic demands it

**Constraints**: Must be operable and debuggable by administrators/DevOps
staff with AI-agent assistance and no in-house software engineers (constitution
Principle VI); no Redis/BullMQ, no separate CMS service, no staging
environment; TypeScript strict mode and `eslint-plugin-boundaries` enforced
from the first commit (Principle VII)

**Scale/Scope**: One content page type proven end-to-end (homepage, Hero block
only) plus the shared site shell; a handful of internal operators as CMS
users; production visitor traffic is modest at this stage (marketing site, not
yet under load)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|---|---|---|
| I. HostBill Isolation | PASS | `billing-adapter/adapters/hostbill/` is the only module calling the HostBill API; rest of the app sees only `ports/` |
| II. Least-Privilege Credentials & Secret Handling | PASS | Only the `portal-readonly` key is used in this feature (product-catalog smoke test); secrets live in `.env` only, never `.env.example` or git |
| III. Webhook Integrity | N/A | No webhook is received in this feature's scope — introduced later in the Checkout feature |
| IV. Stable Internal Identity | PASS | `client_identity_map` table created via a Payload/Postgres migration in this feature, ahead of any feature that actually creates HostBill clients |
| V. No Cardholder Data | PASS | No payment surface exists in this feature |
| VI. Simplicity Over Cleverness | PASS | Single Next.js app, Payload embedded in-process, no Redis/BullMQ, no staging environment |
| VII. Quality Gates Without Code Review | PASS | TypeScript strict mode, `eslint-plugin-boundaries`, Semgrep, and elevated `billing-adapter` test coverage are set up as part of this feature's CI workflow |
| VIII. Content as Curated Data | PASS | `Pages` collection uses a `blocks` array restricted to a curated list (Hero only, for now); Header/Footer are a Payload Global, not a per-page block, since they are site-wide singletons |
| IX. Scope Discipline | PASS | VPS/Dedicated/Colocation pages, checkout, client-portal, and provisioning are explicitly out of scope (see spec.md Assumptions) |

No violations — Complexity Tracking table is not needed.

## Project Structure

### Documentation (this feature)

```text
specs/001-project-foundation/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md         # Phase 1 output (/speckit-plan command)
├── contracts/            # Phase 1 output (/speckit-plan command)
└── tasks.md              # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)

```text
payload.config.ts            # Root Payload config: collections, globals, blocks, db adapter
next.config.ts
docker-compose.yml            # PostgreSQL only (local dev)
.env.example
.github/
└── workflows/
    └── ci.yml                 # lint + typecheck + build (+ Semgrep) on push to main

src/
├── app/
│   ├── (frontend)/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx     # Header/Footer chrome, pulls Site Chrome global
│   │   │   └── page.tsx        # Homepage — renders Pages collection's blocks array
│   │   └── middleware.ts       # next-intl locale routing (ua default, no prefix; /en/, /pl/)
│   └── (payload)/               # Payload's own admin UI + REST/GraphQL routes
│       ├── admin/[[...segments]]/page.tsx
│       └── api/[...slug]/route.ts
│
├── collections/
│   └── Pages.ts                 # blocks-array content collection (curated block list)
│
├── globals/
│   └── SiteChrome.ts             # Header/Footer nav, language list, currency list
│
├── blocks/
│   └── hero/
│       ├── config.ts             # Payload block field config
│       └── Component.tsx          # React render component (design-system styled)
│
├── components/                    # Design-system components ported from design-handoff/
│   ├── Button.tsx
│   ├── Badge.tsx
│   ├── Card.tsx
│   ├── ... (Tag, Input, Select, Checkbox, Radio, Switch, Tabs, Accordion,
│   │        Dialog, Tooltip, PricingTable — ported as needed by later features)
│   └── tokens.css                 # From design-handoff/project/tokens/
│
├── billing-adapter/
│   ├── ports/
│   │   ├── client-provider.port.ts
│   │   ├── invoice-provider.port.ts
│   │   ├── order-provider.port.ts
│   │   ├── product-catalog-provider.port.ts
│   │   └── index.ts
│   └── adapters/
│       └── hostbill/
│           ├── hostbill-client.ts                       # low-level API_ID/API_KEY caller
│           ├── hostbill-product-catalog-provider.adapter.ts
│           ├── hostbill.config.ts
│           └── hostbill-connectivity-check.ts             # smoke test (US3)
│
├── db/
│   └── migrations/
│       └── ...                                            # includes client_identity_map
│
└── i18n/
    ├── routing.ts                                          # locale config (ua/en/pl)
    └── messages/
        ├── ua.json
        ├── en.json                                          # falls back to ua.json where absent
        └── pl.json

*.test.ts                                                    # colocated with source (Vitest)
```

**Structure Decision**: Single project (per constitution Principle VI — no
`backend/`/`frontend/` split). Payload lives inside the same Next.js app via
its official Next.js integration, using the `(payload)` route group convention
so its admin UI and auto-generated REST/GraphQL routes coexist with the public
`(frontend)` route group under one process and one deploy artifact.
`billing-adapter` is a top-level sibling of `app/`, not nested under it, making
the "no direct HostBill imports outside this folder" rule easy for
`eslint-plugin-boundaries` to enforce with a simple path-based rule. Tests are
colocated next to the source they cover (`*.test.ts`) rather than in a mirrored
`tests/` tree, so operators/agents editing a file also see its test right next
to it.
