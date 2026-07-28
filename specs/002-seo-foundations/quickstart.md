# Quickstart: Validating SEO Foundations & Migration Continuity

Manual end-to-end validation matching `spec.md`'s acceptance scenarios and
success criteria. No new tooling is introduced for this feature — a browser
(or a browser-automation tool) plus this project's existing `pnpm` scripts
are all that's needed.

## Prerequisites

- `pnpm dev` running locally (`docker compose up -d` first for Postgres, per
  the main README) with at least one published page in each collection
  (`pages`, `service-pages`) and at least one published `faq-items` document
  tagged to a real page.
- Access to the live old site (`https://cloud.astra.in.ua`) for comparison —
  no credentials needed, it's public.

## Validate User Story 1 — pages keep a distinct identity per locale (P1)

1. Open two different published pages locally, e.g. `http://localhost:3000/vps`
   and `http://localhost:3000/about`.
2. View source (or inspect `document.title` / `<meta name="description">`)
   on each.
   - **Expected**: each page has its own title and description — not the
     same string on both, and not empty.
3. Repeat for the `/en/vps` and `/pl/vps` variants of the same page.
   - **Expected**: each locale variant has its own canonical URL pointing at
     itself, and hreflang links to the `ua`/`en`/`pl`/`x-default` variants
     of that same page.
4. Open a page whose `meta.title`/`meta.description` fields are left blank
   in the admin.
   - **Expected**: a sensible non-empty title/description still renders
     (the auto-generated fallback), not an empty tag and not the old
     sitewide generic title.

This validates FR-001–FR-005 and SC-001.

## Validate User Story 2 — old links still resolve (P1)

Request every path from contracts/seo-metadata-contracts.md's redirect
table against the local build, e.g.:

```bash
curl -I http://localhost:3000/kolokacziya/
curl -I http://localhost:3000/en/vydilenyj-server/
curl -I http://localhost:3000/pro-nas-2/
```

- **Expected**: each returns a `301` with a `Location` header pointing at
  the corresponding new path (`/colocation`, `/en/dedicated`, `/about`),
  never a `404`.

This validates FR-008, FR-009 and SC-002.

## Validate User Story 3 — sitemap and robots (P2)

```bash
curl http://localhost:3000/sitemap.xml
curl http://localhost:3000/robots.txt
```

- **Expected (sitemap)**: one entry per published page per locale it's
  published in; a page you set to `draft` in the admin disappears from the
  next request.
- **Expected (robots)**: public routes allowed, `/admin` and `/api`
  disallowed, a `Sitemap:` line present.

This validates FR-006, FR-007 and SC-003.

## Validate User Story 4 — structured data (P3)

1. Load a page with FAQ content (e.g. `/vps`) and extract its
   `<script type="application/ld+json">` blocks.
2. Compare the `FAQPage` block's questions/answers against what actually
   renders in the visible FAQ accordion on the same page.
   - **Expected**: identical set, same order.
3. Run the same page's HTML through a structured-data validator.
   - **Expected**: zero errors; `Organization`, `WebSite`, `BreadcrumbList`,
     `FAQPage`, and (on `/vps`) `Service` are all recognized.
4. Temporarily make HostBill unreachable (or check behavior when the
   pricing block already shows "Тарифи тимчасово недоступні") and re-check
   the `/vps` page's structured data.
   - **Expected**: the `Service` block's `offers`/price field is omitted
     entirely, not stale or fabricated.

This validates FR-010–FR-013 and SC-004.

## Validate User Story 5 — social share preview (P3)

Paste a published page's local or staging URL into any Open Graph/Twitter
Card preview debugging tool.

- **Expected**: that page's own title, description, and a real image
  render — not blank, not the sitewide default on every page.

This validates FR-014 and SC-005.

## Validate User Story 6 — fonts and images (P4)

1. Load the homepage and `/vps` on a throttled mobile network profile.
2. Watch for visible text reflow once web fonts finish loading.
   - **Expected**: none — no flash-of-unstyled-text layout jump.
3. Inspect the VPS hero image and the mascot image for `alt` text.
   - **Expected**: both carry descriptive (non-empty) `alt` attributes.
4. Confirm Largest Contentful Paint and Cumulative Layout Shift fall within
   Google's "Good" thresholds for both pages.

This validates FR-016, FR-017 and SC-006.

## Validate quality gates (Principle VII)

```bash
pnpm lint         # includes eslint-plugin-boundaries — confirms Service
                  # JSON-LD's price data still only flows through
                  # billing-adapter/ports, never adapters/hostbill directly
pnpm typecheck
pnpm test         # Vitest — includes the redirect-map coverage test and
                  # metadata-fallback unit tests added by this feature
pnpm build
```

All four MUST pass locally before pushing, matching CI.

## Post-launch check (SC-007, outside the local dev loop)

After this feature deploys and takes over `cloud.astra.in.ua` from the old
WordPress site: confirm the existing Google Search Console property shows
the new sitemap submitted and crawled, and monitor organic traffic/ranking
positions for four weeks against the four weeks prior — no sustained drop
expected if Stories 1–3 hold.
