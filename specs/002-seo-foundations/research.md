# Research: SEO Foundations & Migration Continuity

Every decision below follows constitution Principle VI (Simplicity Over
Cleverness): prefer Next.js's built-in facilities and this project's
existing patterns over new dependencies, new collections, or new
infrastructure, unless a specific requirement genuinely forces it.

## 1. Per-page metadata (title, description, canonical, hreflang)

**Decision**: Use Next.js App Router's native `generateMetadata` export,
added to `src/app/(frontend)/[locale]/page.tsx` and
`src/app/(frontend)/[locale]/[slug]/page.tsx` (replacing the current static
`export const metadata` in `layout.tsx`, which stays only as a last-resort
fallback for routes with no page-level metadata, e.g. the 404 page).
Canonical and hreflang are populated via the `alternates` field of the
returned `Metadata` object (`alternates.canonical`, `alternates.languages`).

**Rationale**: This is exactly what the Metadata API is for; no library
adds anything Next.js doesn't already provide. Title/description source
from new localized fields on the existing `pages`/`service-pages`
collections (see data-model.md), read via the same `findContentPage()`
lookup the page component already performs — no second content fetch.

**Alternatives considered**: A third-party SEO plugin/package (e.g. a
Yoast-style abstraction) — rejected, there is no equivalent-maturity
package for Next.js App Router and it would duplicate what `generateMetadata`
already does natively. A single shared `generateMetadata` in `layout.tsx`
covering all locales/pages identically — rejected, that's the current bug
being fixed (one generic title sitewide).

## 2. hreflang scope: which locales

**Decision**: Emit `ua`, `en`, `pl`, and `x-default` (pointing at the `ua`
URL, since `ua` is the unprefixed default locale) on every page.

**Rationale**: The site is fully trilingual per `src/i18n/routing.ts`, even
though the old WordPress site only ever declared `uk`/`en-US`. Declaring
all three from day one avoids a second migration once Polish content is
complete, and an untranslated locale still resolves to a real page (falling
back to Ukrainian copy, per the existing localization fallback), so there is
no dead hreflang target to avoid.

**Alternatives considered**: Matching the old site's `uk`/`en-US` only,
adding `pl` later — rejected, it just defers work with no benefit, and
research shows `en` (not `en-US`) is the correct value here since the
content isn't US-specific.

## 3. Sitemap and robots

**Decision**: Use Next.js's native metadata-route file conventions —
`src/app/sitemap.ts` (exporting a function returning `MetadataRoute.Sitemap`)
and `src/app/robots.ts` (returning `MetadataRoute.Robots`) — placed at the
app root (outside the `(frontend)`/`(payload)` route groups, since route
groups don't affect URL resolution and Next.js resolves these files
relative to the `app` directory regardless of grouping). `sitemap.ts` fetches
every `published` document from `pages` and `service-pages`, across all
three locales, resolving each to its actual locale-prefixed URL.

**Rationale**: This is a built-in Next.js convention — zero new
dependencies, automatically served at `/sitemap.xml` and `/robots.txt`,
and it can read live Payload data at request time exactly like any other
server component, so it never drifts from what's actually published.

**Alternatives considered**: A static `public/sitemap.xml` — rejected, it
would immediately go stale as pages are published/unpublished, which is
precisely the problem being fixed. A Payload-generated sitemap via a custom
endpoint — rejected, no benefit over the native Next.js convention, which
already integrates with `unstable_cache`/revalidation the same way the rest
of the app does.

## 4. 301 redirects from the old WordPress URLs

**Decision**: A static array in `next.config.ts`'s `async redirects()`,
each entry `{ source, destination, permanent: true }`. The mapping (see
contracts/seo-metadata-contracts.md for the full table) covers all 11 old
URLs found in the old site's live `page-sitemap.xml`
(`https://cloud.astra.in.ua/page-sitemap.xml`, fetched during the audit)
and their locale variants.

**Rationale**: 11 URLs is a small, fixed, one-time mapping known in full at
build time — Next.js's `redirects()` is the simplest mechanism that
satisfies this exactly, handled at the routing layer before any
render/DB work happens. A dynamic, Payload-managed "Redirects" collection
would be over-engineering for a fixed, one-time migration list (constitution
Principle VI); it can be revisited later only if redirect needs become an
ongoing editorial task, which they are not today.

**Alternatives considered**: A Payload `redirects` collection with an
admin UI — rejected per Principle VI (no current need for editors to add
redirects on an ongoing basis); a middleware-based redirect table —
rejected, `next.config.ts` redirects are resolved earlier and don't need
custom matching logic for a static 1:1 map.

**Open verification item** (not a spec ambiguity — a data-gathering task
for implementation): the old site's hreflang only advertised `uk` and
`en-US`; the exact old-site English URL for each of the 11 pages (e.g.
whether it's `/en/vps/` or another pattern) needs to be confirmed against
the live old site per-page during implementation, the same way the
homepage's `/en/` variant was already confirmed.

## 5. Structured data (JSON-LD)

**Decision**: A small set of pure builder functions in
`src/lib/seo/json-ld.ts` (`organizationJsonLd()`, `websiteJsonLd()`,
`breadcrumbJsonLd(path)`, `faqPageJsonLd(items)`,
`serviceJsonLd(page, product?)`), each returning a plain object serialized
via `JSON.stringify` into a `<script type="application/ld+json">` tag
rendered from the page/layout server components. `faqPageJsonLd` consumes
the exact same `faq-items` query result `PageFaq` already renders (no
second data source, so markup can never drift from visible content).
`serviceJsonLd` for VPS accepts an optional live product summary from the
existing `ProductCatalogProvider` port (the same call the pricing-cards
block already makes) and omits price fields entirely when it's unavailable
or the page has no live pricing wired in yet (Colocation/Dedicated, still on
the generic template per constitution Principle IX).

**Rationale**: Hand-written builder functions are simple, fully typed,
trivially unit-testable (Vitest, matching this project's existing test
convention), and require no new dependency — `schema-dts` or similar
typing-only packages were considered but add a dependency for what a dozen
lines of TypeScript interfaces already cover in this small a surface.

**Alternatives considered**: A JSON-LD generator library — rejected, no
material benefit at this scope. Duplicating price into a CMS field for the
schema — explicitly rejected, it's the exact anti-pattern Principle VIII
prohibits (billing data must never be duplicated as CMS content).

## 6. Open Graph / Twitter Card image

**Decision**: A per-page, optional `ogImage` field (text path under
`/images/`, same convention as the existing Hero block's `imageSrc` field),
with a single sitewide default (e.g. the existing logo or hero artwork)
used when a page doesn't set one.

**Rationale**: Matches the project's current, deliberate choice to not run
a Payload Media/Upload collection yet (images today are static files under
`public/images/`, referenced by path). Introducing an Upload collection
purely for OG images would be new infrastructure for a single-field need —
out of proportion per Principle VI. This can be revisited if/when a Media
collection is introduced for other reasons.

**Alternatives considered**: A Payload `upload` field type (new Media
collection) — rejected for now, no other current requirement needs it.

## 7. Font loading (`next/font` migration)

**Decision**: Replace the render-blocking
`@import url('https://fonts.googleapis.com/...')` in
`src/components/tokens.css` (and its source of truth,
`design-handoff/project/tokens/typography.css`) with `next/font/google`
loaders for Unbounded, Inter, Golos Text, and Manrope, applied via
`className` on the root layout's `<body>` (not the `variable` option) —
because `next/font` self-hosts each font under its original font-family
name, `tokens.css`'s existing `--font-display: "Unbounded", "Manrope",
sans-serif` / `--font-body: "Inter", "Golos Text", sans-serif` values keep
working unchanged; only the loading mechanism changes, not any design-token
value.

**Rationale**: Satisfies spec Story 6 (no render-blocking external request,
no layout shift from late-arriving fonts) with zero change to the visual
design tokens — `next/font` was built precisely to replace this exact
`@import` pattern.

**Alternatives considered**: Self-hosting the font files manually via
`@font-face` in `tokens.css` — rejected, `next/font` does the same thing
with automatic subsetting, preloading, and `font-display` handling built in,
for less hand-maintained code.

## 8. Remaining raw `<img>` usage / alt text

**Decision**: Add descriptive `alt` text to the two identified
content-meaning images (`vps_page.png` hero image, `mascot-contact-us.png`)
in their respective block components. Leave the existing, explicitly
justified raw-`<img>` exceptions (documented inline via the
`eslint-disable-next-line @next/next/no-img-element` comments, e.g. the
Hero block's full-bleed image that `next/image`'s `fill`/`objectFit` can't
express without a pre-sized box) as raw `<img>` — the constraint is
genuinely about layout, not something this feature should re-litigate — but
still require `alt` text on every one of them.

**Rationale**: Matches spec Story 6 exactly: alt text is required for
content-meaning images regardless of which image mechanism renders them;
`next/image` adoption is only pursued where it doesn't conflict with an
already-documented layout constraint.

**Alternatives considered**: Forcing every remaining raw `<img>` onto
`next/image` — rejected where a prior, documented layout reason exists;
re-litigating that decision is out of scope for an SEO feature.

## 9. Search Console / analytics wiring

**Decision**: A search-engine verification meta tag and an analytics
measurement ID, both read from environment variables
(`GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`) and rendered
conditionally (omitted entirely if unset, so local/dev builds don't ship a
production verification tag or send analytics events).

**Rationale**: Matches this project's existing `.env`-based configuration
pattern (constitution Principle II) for values that aren't secrets but are
still environment-specific; no code change is needed to point at the
existing Google Search Console property / Site Kit account already
associated with this domain (confirmed live on the old site).

**Alternatives considered**: Hardcoding the verification tag — rejected,
breaks the local/dev vs. production distinction and requires a code change
to rotate.
