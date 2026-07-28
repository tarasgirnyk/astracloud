# Contracts: SEO Foundations & Migration Continuity

These are the public contracts this feature exposes — to search engines, to
old inbound links, and to link-preview crawlers. Nothing here is a
programmatic API between internal modules.

## 1. Redirect map (old WordPress site → new site)

Source: the old site's live Yoast sitemap
(`https://cloud.astra.in.ua/page-sitemap.xml`, 11 URLs) plus its `/en/`
variants, confirmed during the audit to follow the pattern `/en/<same-slug>/`
(verified directly against `/en/vps/`, `/en/kolokacziya/`, and
`/en/pro-nas-2/`, all of which resolve on the live old site rather than
404ing). The old site never exposed a `pl` variant, so there is nothing to
map for Polish.

| Old UA path | Old EN path | New UA path | New EN path (`/en/...`) | New PL path (`/pl/...`) |
|---|---|---|---|---|
| `/` | `/en/` | `/` | `/en` | `/pl` |
| `/pro-nas-2/` | `/en/pro-nas-2/` | `/about` | `/en/about` | `/pl/about` |
| `/r-policy/` | `/en/r-policy/` | `/refund-policy` | `/en/refund-policy` | `/pl/refund-policy` |
| `/sla/` | `/en/sla/` | `/sla` | `/en/sla` | `/pl/sla` |
| `/pp/` | `/en/pp/` | `/privacy` | `/en/privacy` | `/pl/privacy` |
| `/kolokacziya/` | `/en/kolokacziya/` | `/colocation` | `/en/colocation` | `/pl/colocation` |
| `/tos/` | `/en/tos/` | `/terms` | `/en/terms` | `/pl/terms` |
| `/vydilenyj-server/` | `/en/vydilenyj-server/` | `/dedicated` | `/en/dedicated` | `/pl/dedicated` |
| `/dokumenty/` | `/en/dokumenty/` | `/documents` | `/en/documents` | `/pl/documents` |
| `/l-section/` | `/en/l-section/` | `/legal` | `/en/legal` | `/pl/legal` |
| `/vps/` | `/en/vps/` | `/vps` | `/en/vps` | `/pl/vps` |

Every `Old UA path` and `Old EN path` cell above is a required `source` in
`next.config.ts`'s `redirects()`, each mapped `permanent: true` to its `New`
counterpart on the same row. There is no old-site page without a direct
new-site equivalent (all 11 map 1:1) — the Edge Case ("no reasonable
equivalent → redirect to nearest living page") has no known instance today,
but the redirect list's test coverage (see below) must still fail loudly if
a future old URL is ever discovered unmapped, rather than silently 404ing.

**Test contract**: a Vitest test loads this table (or the `next.config.ts`
array directly) and asserts every `source` path is present exactly once and
every `destination` resolves to a real route in the app — run as part of
this project's existing `pnpm test` gate.

## 2. `/sitemap.xml`

Contract: for every `published` document in `pages` and `service-pages`,
one `<url>` entry per locale it's published in (`ua` unprefixed, `en` under
`/en`, `pl` under `/pl`), each with `lastmod` reflecting the document's own
`updatedAt`. Draft documents MUST NOT appear. Unpublishing a previously-live
page MUST remove it from the next sitemap response (no caching staler than
the page-publication cache window already used elsewhere in the app).

## 3. `/robots.txt`

Contract: `Allow: /` for all public frontend routes; `Disallow: /admin` and
`Disallow: /api` (mirroring `proxy.ts`'s existing matcher exclusions); a
`Sitemap:` directive pointing at `/sitemap.xml`.

## 4. Per-page `<head>` contract

Every rendered page (both `[locale]/page.tsx` and `[locale]/[slug]/page.tsx`)
MUST emit, for its own locale:
- Exactly one `<title>` and one `<meta name="description">`, sourced from
  that page's own `meta.title`/`meta.description` (or their fallback).
- Exactly one `<link rel="canonical">` pointing at that page's own
  locale URL.
- `<link rel="alternate" hreflang="...">` for `ua`, `en`, `pl`, and
  `x-default`, each pointing at that same page's URL in the corresponding
  locale.
- Open Graph (`og:title`, `og:description`, `og:image`, `og:locale`,
  `og:url`, `og:type=website`) and `twitter:card=summary_large_image` tags,
  matching the same title/description/image as above.

## 5. Structured data contract (per page, where applicable)

- Every page: one `Organization` and one `WebSite` JSON-LD block (identical
  sitewide) plus one `BreadcrumbList` block reflecting that page's actual
  nav position.
- Every page rendering `PageFaq` (i.e. it has at least one tagged,
  published `faq-items` document): one `FAQPage` JSON-LD block whose
  `mainEntity` list exactly matches the questions/answers `PageFaq` rendered
  for that same request — never a superset, subset, or stale copy.
- VPS/Dedicated/Colocation pages: one `Service` JSON-LD block. Price fields
  (`offers`) are present only when a live product price was successfully
  fetched for that render; otherwise `offers` is omitted entirely rather
  than populated with a stale or placeholder value.

All structured data MUST validate with zero errors/warnings in a standard
structured-data validator (Success Criterion SC-004).
