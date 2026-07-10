# Phase 0 Research: Project Foundation

All technology *choices* are already fixed by `.specify/memory/constitution.md`
(no `NEEDS CLARIFICATION` markers remain in Technical Context). What's below
resolves the *operational* decisions needed to actually build within those
choices — the "how", not the "what".

## 1. Embedding Payload CMS inside the Next.js app

**Decision**: Use Payload's official Next.js integration, mounting Payload's
admin UI and REST/GraphQL routes under a `(payload)` route group, alongside a
`(frontend)` route group for the public site, both inside one `src/app/`
tree and one deploy process.

**Rationale**: This is Payload's documented, supported pattern for exactly
the "no separate CMS service" requirement in constitution Principle VI — it
avoids running two Node processes, two deploy targets, or a network hop
between site and CMS.

**Alternatives considered**: A standalone Payload service behind its own API,
consumed by Next.js over HTTP — rejected, since it reintroduces the extra
moving part Principle VI explicitly avoids, for no benefit at this scale.

## 2. Locale routing (UA default without prefix, `/en/`, `/pl/`)

**Decision**: Use `next-intl` with `localePrefix: 'as-needed'`, which serves
the default locale (Ukrainian) at the bare path and other locales under their
own prefix — exactly the routing behavior decided in the grill-me session.

**Rationale**: This is a well-documented, widely used App Router i18n library
that already solves locale detection, redirects, and prefix handling; hand-
rolling equivalent middleware would be a small amount of code now but an
ongoing maintenance surface with more edge cases (bots, missing-locale
fallback, trailing slashes) than it looks like at first glance — not a good
trade for a team without in-house engineers to own bespoke routing logic.

**Alternatives considered**: Custom Next.js middleware doing manual path
rewriting — rejected per the rationale above; Payload's built-in field
localization — not a substitute, since that solves per-field content
variants, not URL routing, and is used together with `next-intl`, not instead
of it.

## 3. HostBill API client shape

**Decision**: A small typed fetch wrapper in
`billing-adapter/adapters/hostbill/hostbill-client.ts` that POSTs
`api_id`, `api_key`, `call=<methodName>`, plus method parameters, to
`HOSTBILL_API_URL`, and parses the JSON response. Each port method
(e.g. `ProductCatalogProvider.listProducts()`) calls this client with the
specific HostBill `call` name and maps the response into the port's own
domain shape — callers outside `billing-adapter` never see raw HostBill
field names.

**Rationale**: HostBill's API is a single flat endpoint distinguished by a
`call` parameter, not a REST resource tree — a thin, purpose-built wrapper is
simpler and more auditable than adopting a generic third-party HTTP client
library for this.

**Alternatives considered**: No maintained third-party HostBill SDK for
Node/TypeScript was found worth adopting; hand-writing a thin wrapper is the
simplest correct option here (in the spirit of Principle VI).

## 4. Payload `blocks` field with a curated, page-specific block list

**Decision**: The `Pages` collection's content field is a Payload `blocks`
array whose `blocks:` option lists only currently-approved block configs
(just `HeroBlock` in this feature). Adding a block type to that array later
(e.g. when the VPS-page feature adds `VpsPricingTableBlock`) is the
mechanism for growing the curated list — never a generic "any block
anywhere" field.

**Rationale**: Matches constitution Principle VIII directly: editors can
compose already-approved blocks without code changes, but no block type
exists that wasn't built against a real design mockup.

**Alternatives considered**: Fixed group fields per page (rejected during the
grill-me session — see `docs/GRILL_NOTES.md` decision 11 — because it would
require a code change every time an existing block type needs to be added to
a page that didn't have it yet).

## 5. Header/Footer as a Payload Global, not a block

**Decision**: Site-wide chrome (header nav, language list, currency list,
footer content) is modeled as a single Payload **Global** (`SiteChrome`), not
as blocks inside a page's array.

**Rationale**: Header/Footer are singletons that exist once for the whole
site, not repeatable, orderable content units — Payload Globals are the
purpose-built primitive for exactly this, and using `blocks` for something
that only ever appears once per site would be modeling data as content
composition where it isn't.

**Alternatives considered**: A "Header" and "Footer" block type usable inside
every page's blocks array — rejected as unnecessary indirection for something
that is never actually optional, reordered, or repeated per page.

## 6. Enforcing HostBill isolation with `eslint-plugin-boundaries`

**Decision**: Define element types in the ESLint config — `billing-adapter`
(the whole folder), `billing-adapter-ports` (just `billing-adapter/ports/`),
and `app` (everything else) — with a rule forbidding any `app`-type file from
importing `billing-adapter/adapters/**` directly, while allowing imports from
`billing-adapter/ports/**`.

**Rationale**: This turns constitution Principle I from a written rule into a
lint error, which is the whole point of Principle VII (quality gates
substituting for code review) — a violation fails CI, not "gets caught if
someone happens to notice."

**Alternatives considered**: Relying on code review/convention alone —
rejected outright; it's exactly what Principle VII says not to rely on.

## 7. Test framework: Vitest

**Decision**: Vitest for unit and integration tests, colocated as `*.test.ts`
next to the source file under test. No end-to-end browser test framework is
introduced in this feature.

**Rationale**: Vitest is ESM-native, fast, and has first-class TypeScript
support with minimal configuration — a good fit for a Next.js/Payload
TypeScript codebase. Colocating tests keeps the "what does this file do" and
"how do we know it works" answers next to each other, which matters more for
an agent-driven team than a deep, mirrored `tests/` tree convention.

**Alternatives considered**: Jest — viable but slower and needs more
ESM-interop configuration for this stack; Playwright/E2E — deferred, since
`quickstart.md`'s manual validation steps cover this feature's acceptance
scenarios without needing a browser-automation framework yet.

## 8. Migrations

**Decision**: Use Payload's own migration CLI (`payload migrate:create` /
`payload migrate`) as the single migration mechanism, including for the
custom `client_identity_map` table (added via a hand-written migration file
alongside Payload's auto-generated schema migrations).

**Rationale**: One migration tool and one migration history for both
CMS-schema changes and custom application tables is simpler to operate than
running two separate migration systems side by side — consistent with
Principle VI.

**Alternatives considered**: A separate migration tool (e.g. `node-pg-migrate`)
just for `client_identity_map` — rejected; not worth the operational overhead
of two migration histories for one small custom table.

## 9. CI workflow scope for this feature

**Decision**: `.github/workflows/ci.yml` runs on every push to `main`:
install dependencies, lint (including `eslint-plugin-boundaries`), type-check,
run Vitest, run Semgrep, and build. No deploy step yet — deploying to the
real server is explicitly out of scope for this feature (per `spec.md`
Assumptions); that arrives once the server exists and its SSH secret is
added to GitHub.

**Rationale**: Matches constitution Principle VII (automated gates in place
from the start) without getting ahead of infrastructure (a real server) that
doesn't exist yet.

**Alternatives considered**: Building the deploy workflow now with placeholder
secrets — rejected; there is nothing to deploy to yet, and a workflow that
can't actually run end-to-end isn't validated by anything.
