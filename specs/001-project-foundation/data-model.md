# Phase 1 Data Model: Project Foundation

Derived from `spec.md`'s Key Entities, expressed as the concrete shapes this
feature introduces. Field names are illustrative for planning; exact Payload
field configs are produced during implementation.

## Page (Payload collection: `pages`)

Represents a publishable unit of content (this feature proves the model with
the homepage; other pages arrive in later features).

| Field | Type | Notes |
|---|---|---|
| `title` | text | Internal reference name, not necessarily rendered |
| `slug` | text (unique per locale) | Used to resolve the page's address |
| `locale` | one of `ua` / `en` / `pl` | Drives which address prefix the page is served under (FR-006) |
| `blocks` | blocks array | Curated list — only `Hero` in this feature (Principle VIII) |
| `publicationStatus` | `draft` \| `published` | Only published pages are visible to visitors |

**Validation rules**: `slug` MUST be unique within a given `locale`. `blocks`
MUST only contain block types from the collection's curated allow-list — this
is enforced structurally by Payload's `blocks` field configuration, not by
custom validation code.

**Relationships**: None yet in this feature (a Page does not reference other
entities below).

## Content Section / Block: Hero (Payload block config: `hero`)

The one concrete block type delivered in this feature, proving the
edit-and-see-it-live loop (User Story 1).

| Field | Type | Notes |
|---|---|---|
| `heading` | text | Required |
| `subheading` | text | Optional |
| `ctaLabel` | text | Optional — if present, `ctaHref` becomes required |
| `ctaHref` | text | Optional, required only if `ctaLabel` is set |

**Validation rules**: `heading` is required (a Hero with no heading is not a
valid block instance). `ctaLabel`/`ctaHref` are a pair — one without the other
is invalid.

**State transitions**: None — a block instance's fields are simply edited and
saved; there is no separate lifecycle/status per block (the page's own
`publicationStatus` governs visibility).

## Site Chrome (Payload global: `site-chrome`, not per-page)

Represents the header/footer content shared by every page (FR-004, FR-005).
Modeled as a Payload Global rather than a collection, since exactly one
instance exists for the whole site (see `research.md` §5).

| Field | Type | Notes |
|---|---|---|
| `navLinks` | array of `{ label, href }` | Header navigation |
| `footerColumns` | array of `{ title, links: [{ label, href }] }` | Footer content |
| `supportedLocales` | fixed list: `ua`, `en`, `pl` | Drives the language selector (not editor-configurable in this feature) |
| `supportedCurrencies` | fixed list: `UAH`, `USD`, `EUR` | Drives the currency selector (display-only in this feature — no live conversion yet) |

**Validation rules**: None beyond required sub-fields on each array item.

## Customer Identity Link (custom table, not a Payload collection: `client_identity_map`)

Internal record connecting a stable internal identifier to a HostBill
customer record (constitution Principle IV). Created via a hand-written
migration in this feature even though nothing yet writes to it — the table
must exist before any feature (Checkout) starts creating HostBill clients.

| Column | Type | Notes |
|---|---|---|
| `internal_user_id` | UUID, primary key | Generated when a row is first created |
| `hostbill_client_id` | integer, unique | HostBill's own client ID |
| `email` | text | The email associated with the HostBill client at creation time |
| `created_at` | timestamp | Set on insert |

**Validation rules**: `hostbill_client_id` MUST be unique — one internal
identity per HostBill client. No row is created by this feature; the table
exists empty, ready for the Checkout feature to populate it.

**Relationships**: Future features (Checkout, client-portal) will reference
`internal_user_id` from their own tables instead of `hostbill_client_id`
directly (Principle IV) — no such referencing table exists yet in this
feature's scope.
