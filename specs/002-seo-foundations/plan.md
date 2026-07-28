# Implementation Plan: SEO Foundations & Migration Continuity

**Branch**: `002-seo-foundations` | **Date**: 2026-07-28 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/002-seo-foundations/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Give every page on the not-yet-deployed Next.js/Payload rebuild real,
per-page, per-locale search metadata (title, description, canonical,
hreflang), a live sitemap and robots file, structured data (Organization/
WebSite/BreadcrumbList/FAQPage/Service), Open Graph/Twitter Card tags, and a
301 redirect map from all 11 of the old WordPress site's indexed URLs —
because this feature ships onto an already-indexed, already-ranking
production domain (`cloud.astra.in.ua`), not a greenfield launch. Also
migrates the render-blocking Google Fonts `@import` to `next/font` and adds
missing `alt` text on the two remaining content images. Every mechanism
uses Next.js's native Metadata API and this project's existing Payload
content model — no new dependencies, no new collections, no redirect-
management UI (constitution Principle VI).

## Technical Context

**Language/Version**: TypeScript (strict mode), Node.js ≥ 20 — unchanged
from the established project baseline.

**Primary Dependencies**: Next.js 16 App Router native Metadata API
(`generateMetadata`, `alternates.canonical`/`alternates.languages`,
`app/sitemap.ts`, `app/robots.ts`, `next.config.ts` `redirects()`),
`next/font/google` (replacing the current CSS `@import`), the existing
Payload CMS collections (`pages`, `service-pages`, `faq-items`) extended
with new localized fields, the existing `billing-adapter` `ports/
product-catalog-provider.port.ts` (reused, not duplicated, for live VPS
pricing in structured data). No new npm dependency is added.

**Storage**: PostgreSQL via Payload (unchanged) — new localized `meta.*`
fields added to `pages`/`service-pages` via a hand-written migration; no new
tables (redirects and structured data are not persisted, see data-model.md).

**Testing**: Vitest (existing convention, colocated `*.test.ts`) — new unit
tests for the title/description fallback logic, the JSON-LD builder
functions, and a coverage test asserting every old-site URL in the redirect
map is present.

**Target Platform**: Linux server (self-hosted, per constitution) for
production; local development on Windows, unchanged.

**Project Type**: Single Next.js application with Payload embedded
(unchanged — no new service, no frontend/backend split).

**Performance Goals**: Homepage and `/vps` page meet Google's "Good"
Core Web Vitals thresholds for Largest Contentful Paint and Cumulative
Layout Shift on a throttled mobile connection (SC-006) — driven primarily
by the `next/font` migration, not a general performance rework.

**Constraints**: Structured-data price fields MUST be sourced live from the
existing `ProductCatalogProvider` port at render time — never authored or
cached separately as CMS content (Principle VIII); no new Payload Media/
Upload collection is introduced for Open Graph images (reuses the existing
text-path convention, research.md §6); the redirect map is a static,
one-time list, not a new editorial system (Principle VI); `eslint-plugin-
boundaries` must continue to pass unchanged — nothing in this feature
imports `billing-adapter/adapters/hostbill/**` directly.

**Scale/Scope**: 11 old-site URLs × up to 2 old locale variants each (the
old site never exposed a Polish variant) to redirect; ~2 page collections
(`pages`, `service-pages`) gaining a `meta` field group; structured data on
every published page plus richer Service markup on 1 page today (`/vps`,
the only one with a live pricing block wired in) with Colocation/Dedicated
degrading gracefully until their own pricing blocks exist.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|---|---|---|
| I. HostBill Isolation | PASS | Service JSON-LD's live price is read via the existing `ProductCatalogProvider` port only; no new or direct import of `billing-adapter/adapters/hostbill/**` |
| II. Least-Privilege Credentials & Secret Handling | PASS | No new HostBill API method/scope introduced; the GSC verification token and GA measurement ID are non-secret, environment-scoped values, following the existing `.env` pattern |
| III. Webhook Integrity | N/A | No webhook is received or processed by this feature |
| IV. Stable Internal Identity | N/A | No user/client identity is involved |
| V. No Cardholder Data | N/A | No payment surface is touched or introduced |
| VI. Simplicity Over Cleverness | PASS | Redirects are a static `next.config.ts` array, not a new Payload collection/admin UI; sitemap/robots use Next.js's native file conventions, not a hand-rolled route or new dependency; OG images reuse the existing text-path convention rather than introducing a Media/Upload collection |
| VII. Quality Gates Without Code Review | PASS | New metadata-fallback and JSON-LD builder logic gets Vitest unit tests; the redirect map gets a coverage test; existing TypeScript strict / `eslint-plugin-boundaries` / Semgrep / CI gates apply unchanged |
| VIII. Content as Curated Data | PASS | `meta.title`/`meta.description`/`meta.ogImage` are added as ordinary curated fields on the existing `pages`/`service-pages` collections, not a new content type; Service JSON-LD price is fetched live at render time exactly like the visible pricing cards, never duplicated into CMS content |
| IX. Scope Discipline | PASS | Colocation/Dedicated Service JSON-LD intentionally degrades to description-only (no price) as long as those pages remain on the generic `simple` template without a live pricing block, matching their actual current state rather than building ahead of it; keyword research, content strategy, paid campaigns, and backlink outreach remain explicitly out of scope per spec.md Assumptions |

No violations — Complexity Tracking table is not needed.

## Project Structure

### Documentation (this feature)

```text
specs/002-seo-foundations/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md         # Phase 1 output (/speckit-plan command)
├── quickstart.md         # Phase 1 output (/speckit-plan command)
├── contracts/             # Phase 1 output (/speckit-plan command)
│   └── seo-metadata-contracts.md
└── tasks.md               # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)

```text
next.config.ts                          # + async redirects() — the 11-URL
                                          # old→new map (contracts/
                                          # seo-metadata-contracts.md)

src/
├── app/
│   ├── sitemap.ts                       # NEW — Next.js sitemap convention,
│   │                                      queries pages/service-pages
│   ├── robots.ts                        # NEW — Next.js robots convention
│   └── (frontend)/
│       └── [locale]/
│           ├── layout.tsx               # next/font loaders applied here;
│           │                              static `metadata` kept only as
│           │                              fallback for routes with no
│           │                              page-level generateMetadata
│           ├── page.tsx                 # + generateMetadata (homepage)
│           └── [slug]/
│               └── page.tsx             # + generateMetadata (all other pages)
│
├── collections/
│   ├── Pages.ts                         # + `meta` field group
│   └── ServicePages.ts                  # + `meta` field group
│
├── lib/
│   └── seo/
│       ├── build-metadata.ts             # NEW — shared title/description/
│       │                                    canonical/hreflang/OG builder,
│       │                                    used by both page.tsx files
│       ├── json-ld.ts                    # NEW — organizationJsonLd(),
│       │                                    websiteJsonLd(),
│       │                                    breadcrumbJsonLd(),
│       │                                    faqPageJsonLd(), serviceJsonLd()
│       └── *.test.ts                     # Vitest — fallback logic, JSON-LD
│                                            shape, redirect-map coverage
│
├── components/
│   └── tokens.css                       # @import removed (font loading
│                                          moves to next/font in layout.tsx;
│                                          existing --font-display/--font-body
│                                          values are unchanged)
│
└── blocks/
    ├── hero/Component.tsx                # alt text added to the content
    │                                       image (vps_page.png usage)
    └── consultation/Component.tsx         # alt text added to
                                            mascot-contact-us.png (or
                                            wherever it actually renders)

design-handoff/project/tokens/typography.css   # @import removed to match
                                                 tokens.css (source of truth,
                                                 research.md §7)
```

**Structure Decision**: No new top-level module and no change to the
single-application structure. `src/lib/seo/` is a new sibling of the
existing `src/lib/` helpers (`find-content-page.ts`,
`send-consultation-email.ts`) — plain, dependency-free TypeScript modules
consumed by the page components, following the same pattern already used
for `find-content-page.ts`. `sitemap.ts`/`robots.ts` are placed at the
`src/app` root (not inside `(frontend)` or `(payload)`) because Next.js
resolves these metadata-route files relative to the `app` directory
regardless of route grouping, and both must cover the whole site, not one
route group.

## Complexity Tracking

*No violations — table intentionally omitted.*
