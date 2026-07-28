# Phase 1 Data Model: SEO Foundations & Migration Continuity

Derived from `spec.md`'s Key Entities. Field names are illustrative for
planning; exact Payload field configs are produced during implementation.
No new Payload collections are introduced — every entity below extends the
existing `pages` / `service-pages` collections or exists purely as
in-memory data derived from them at render/build time (never persisted
separately, per constitution Principle VIII).

## Page SEO Metadata (new localized field group on `pages` and `service-pages`)

Added as a `meta` group field alongside each collection's existing
`title`/`slug`/`blocks`/`publicationStatus` fields — not a new collection,
since it's just more curated content on an existing publishable unit.

| Field | Type | Notes |
|---|---|---|
| `meta.title` | text, localized | Optional. Falls back to an auto-generated value (page heading + site name) when blank (FR-003) |
| `meta.description` | textarea, localized | Optional. Falls back to an auto-generated summary when blank (FR-003) |
| `meta.ogImage` | text | Optional path under `/images/` (same convention as the Hero block's `imageSrc`). Falls back to one sitewide default image when blank |

**Validation rules**: No field is required — every page must still render
valid, non-empty search metadata even when an editor leaves these blank
(Edge Case: blank title/description). `meta.ogImage`, if set, must be a
path Next.js's image pipeline can resolve, same as `imageSrc` today.

**Relationships**: None — read directly off the same `pages`/`service-pages`
document each page component already fetches via `findContentPage()`; no
second query.

## Redirect Rule (static configuration, not a database entity)

The old-site → new-site URL mapping. Deliberately **not** modeled as a
Payload collection (research.md §4) — it's a fixed, one-time list, held as
a plain array in `next.config.ts`.

| Field | Type | Notes |
|---|---|---|
| `source` | path string | Old-site URL path, one entry per locale variant that existed |
| `destination` | path string | Corresponding new-site path |
| `permanent` | boolean | Always `true` (HTTP 301) — this is a completed migration, not a temporary reroute |

**Validation rules**: Every URL present in the old site's live
`page-sitemap.xml` (11 URLs, confirmed during the audit — see
contracts/seo-metadata-contracts.md) must appear as a `source` in this list,
across every locale variant it existed under. Covered by a Vitest test that
asserts the full old-site URL list has no unmapped entries (FR-008,
Edge Case: URL with no direct equivalent → mapped to nearest living page).

## Structured Data Declaration (derived, not persisted)

Not stored anywhere — each shape below is computed at render time from data
that already exists, and rendered as a `<script type="application/ld+json">`
tag. Listed here because spec.md calls them out as a Key Entity, even though
there is no schema to migrate.

| Declaration | Derived from | Notes |
|---|---|---|
| Organization / WebSite | Static site identity (name, logo, URL) | Same on every page — sitewide, not per-page content |
| BreadcrumbList | The page's resolved slug/position in `site-chrome` nav | One per page, reflecting actual navigation position |
| FAQPage | The exact `faq-items` query result `PageFaq` already renders for that page | Must never diverge from the visible Q&A (FR-012) |
| Service (VPS/Dedicated/Colocation) | `meta.title`/`meta.description` plus, for VPS, the same live `ProductCatalogProvider` call the pricing-cards block already makes | Price fields omitted entirely when live pricing is unavailable or not yet wired in for that page (FR-013, constitution Principle VIII/IX) |

**State transitions**: None — recomputed fresh on every render from
current, live data; there is no stored/cached "structured data" state to
transition.
