# Quickstart: Validating Project Foundation

Manual end-to-end validation matching `spec.md`'s acceptance scenarios and
success criteria. No browser-automation framework is used for this feature —
these are steps a human (or agent, driving a browser tool) runs directly.

## Prerequisites

- Node.js ≥ 20, pnpm, Docker installed.
- Repository cloned; `.env` populated from `.env.example`
  (`HOSTBILL_PORTAL_READONLY_API_ID`/`KEY` set to a valid, rotated,
  read-only-scoped key — see constitution Principle II).

## Setup

```bash
docker compose up -d          # starts PostgreSQL only
pnpm install
pnpm dev                       # starts the Next.js + embedded Payload app
```

## Validate User Story 1 — operator edits content, sees it live (P1)

1. Open `http://localhost:3000/admin`.
2. Create the first administrator account (Payload's built-in first-user
   flow) and log in.
3. Open the `Pages` collection, create (or open) the homepage document, add
   a `Hero` block with a heading, subheading, and CTA.
4. Set publication status to published, save.
5. Open `http://localhost:3000/` in a new tab.
   - **Expected**: the Hero heading/subheading/CTA entered in step 3 appear
     on the page, alongside a real Header and Footer (not default Next.js
     boilerplate), matching the design system's tokens (colors, typography).
6. Go back to the admin, change the heading text, save.
7. Reload `http://localhost:3000/`.
   - **Expected**: the new heading appears — no code change, no restart.

This validates FR-001, FR-002, FR-003, FR-004 and SC-001.

## Validate User Story 2 — consistent, multi-language site shell (P2)

1. On `http://localhost:3000/`, locate the language selector in the header.
   - **Expected**: Ukrainian, English, and Polish are all listed.
2. Switch to English.
   - **Expected**: the address changes to include `/en/`; the page still
     renders (falling back to Ukrainian text where no translation exists yet
     is acceptable at this stage).
3. Switch to Polish; confirm the same behavior under `/pl/`.
4. Locate the currency selector; confirm UAH, USD, and EUR are all listed and
   selectable (display-only at this stage — no live price conversion is
   expected yet).

This validates FR-005, FR-006 and SC-002, SC-003.

## Validate User Story 3 — billing connectivity smoke test (P3)

```bash
pnpm run billing:check   # or the equivalent script wired to
                          # hostbill-connectivity-check.ts
```

- **Expected (valid credentials)**: the command prints a non-empty list of
  products retrieved from HostBill and exits successfully.
- **Expected (invalid/missing credentials)**: the command exits with a clear
  failure message — it MUST NOT report success.

This validates FR-008 and SC-004.

## Validate quality gates (supports Principle VII / FR-011)

```bash
pnpm lint         # includes eslint-plugin-boundaries
pnpm typecheck
pnpm test         # Vitest
pnpm build
```

All four MUST pass locally before pushing; the same steps run in
`.github/workflows/ci.yml` on every push to `main` — check the Actions tab
for a green run after pushing.

## Validate no cardholder-data surface (FR-010 / SC-005)

Manual design review: confirm no page, admin field, or route introduced by
this feature accepts, transmits, or stores a card number or CVV. (Expected
trivially true — this feature has no payment UI at all.)
