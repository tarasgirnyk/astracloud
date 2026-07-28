# Feature Specification: SEO Foundations & Migration Continuity

**Feature Branch**: `002-seo-foundations`

**Created**: 2026-07-28

**Status**: Draft

**Input**: User description: "SEO-аудит і ТЗ на впровадження SEO best practices для нового Next.js/Payload сайту Astra Cloud. Виявлено: production-домен cloud.astra.in.ua зараз обслуговує СТАРИЙ WordPress+Elementor+Yoast сайт, який вже проіндексований Google (реальні title/description, OG-теги, hreflang uk/en-US, JSON-LD Organization/WebSite/BreadcrumbList, Yoast sitemap з 11 URL). Новий Next.js+Payload застосунок у цьому репозиторії — ще не задеплоєний повний редизайн, який має замінити старий сайт на тому самому домені. У новому коді: статичний хардкоджений `title: 'Astra Cloud'` без per-page generateMetadata (кожна сторінка й локаль отримують однаковий title, meta description відсутній); немає canonical; немає hreflang, хоча сайт тримовний (UA/EN/PL); `/sitemap.xml` і `/robots.txt` повертають 404; немає жодного JSON-LD (Organization/WebSite/Product/FAQPage/Breadcrumb), попри ~270 засіяних FAQ-елементів; немає Open Graph/Twitter Card; немає GSC/GA4; частина зображень не оптимізована (raw <img> замість next/image, 2 зображення без alt); шрифти Google Fonts підключені через render-blocking @import замість next/font. Слаги старого сайту (WordPress-стиль: /kolokacziya/, /vydilenyj-server/, /pro-nas-2/, /pp/, /tos/ тощо) НЕ збігаються зі слагами нового сайту (/colocation, /dedicated, /about, /privacy, /terms) — це міграція на тому самому проіндексованому домені, а не запуск з нуля: без карти 301-редиректів і збереження hreflang/canonical/sitemap є ризик обвалу трафіку й позицій. Поза межами: keyword research/контент-стратегія, платні кампанії, нарощування посилань."

## User Scenarios & Testing *(mandatory)*

<!--
  This feature protects and extends the SEO standing of an already-indexed,
  already-ranking production domain (cloud.astra.in.ua) through a full
  platform migration (WordPress/Elementor/Yoast → Next.js/Payload). Every
  story below is written from the standpoint of "does an organic
  visitor/search engine lose anything when the new site goes live", not
  "build SEO from zero" — there is existing search equity to protect first,
  then extend.
-->

### User Story 1 - A page keeps its unique identity in search results after the migration (Priority: P1) 🎯 MVP

An editor publishes or updates a page (homepage, VPS, Dedicated, Colocation,
About, legal pages, FAQ) in the admin. A search engine crawling that page's
Ukrainian, English, or Polish variant sees a distinct, descriptive title and
description for that specific page and locale — never the same generic
title every other page on the site shows — plus a canonical URL and links to
the equivalent page in the other two locales.

**Why this priority**: Today every single page and locale on the new build
renders the identical hardcoded title with no description at all. Launching
this as-is onto an already-indexed domain is the single most damaging thing
that can happen: Google already has better titles/descriptions on file from
the old site, and replacing them with one identical string sitewide reads as
a severe quality regression, tanking click-through rate and rankings across
every page simultaneously. Nothing else in this feature matters if this is
not fixed first.

**Independent Test**: Can be fully tested by opening any two distinct
published pages (e.g. `/vps` and `/about`) in each of the three locales and
confirming each of the resulting six page loads has its own `<title>`,
`<meta description>`, a self-referencing canonical tag, and hreflang links to
the other two locale variants — with no two pages sharing the same title.

**Acceptance Scenarios**:

1. **Given** a published page with editor-supplied title/description text,
   **When** the page is requested in any of the three locales, **Then** the
   rendered `<title>` and `<meta description>` reflect that page's own
   content for that locale, not a sitewide default.
2. **Given** a published page where the editor left the title/description
   fields blank, **When** the page is requested, **Then** the system renders
   a sensible auto-generated fallback (derived from the page's own heading
   and the site name) rather than an empty tag or the old sitewide generic
   title.
3. **Given** any published page, **When** its HTML is inspected, **Then** it
   contains exactly one canonical link pointing to its own locale URL and
   hreflang alternates for `ua`, `en`, `pl`, and `x-default`.

---

### User Story 2 - A visitor or search engine following an old link still reaches the right page (Priority: P1) 🎯 MVP

Someone clicks a bookmarked link, an old backlink from another site, or a
still-cached search result pointing at one of the 11 known old-site URLs
(e.g. `/kolokacziya/`, `/vydilenyj-server/`, `/pro-nas-2/`, `/pp/`, `/tos/`,
their `/en/` variants, etc.). Instead of hitting a 404, they land on the
corresponding page of the new site.

**Why this priority**: The old site is genuinely indexed and has accumulated
whatever backlink and ranking equity it has since 2020. Every old URL that
now 404s instead of redirecting throws that equity away permanently and
sends real visitors to a dead end on launch day. This must exist before the
new site takes over the production domain, not as a follow-up.

**Independent Test**: Can be fully tested by requesting every URL from the
old site's known sitemap (all locale variants) against the new deployment
and confirming each one returns a redirect to a live page, never a 404.

**Acceptance Scenarios**:

1. **Given** an old-site URL that has a direct equivalent on the new site,
   **When** it is requested, **Then** the response is a permanent redirect
   to that equivalent page, preserving the visitor's locale where the old
   URL encoded one.
2. **Given** the old site's homepage URL, **When** requested, **Then** it
   redirects to the new homepage rather than round-tripping through an
   intermediate page.
3. **Given** an old-site URL with no reasonable new-site equivalent (if any
   surface during implementation), **When** requested, **Then** it redirects
   to the closest relevant living page (e.g. the parent section or
   homepage) rather than 404ing.

---

### User Story 3 - Search engines can discover every published page without being told about it by hand (Priority: P2)

A search engine (or an operator manually requesting re-indexing) fetches the
site's sitemap and robots file to learn which pages exist across all three
locales and which parts of the site (admin, API) it should leave alone.

**Why this priority**: Without a sitemap, discovery of new or updated pages
depends entirely on crawl-based link following, which is slower and less
reliable — especially right after a platform migration when the crawler's
prior map of the site (built from the old WordPress URLs) is now stale.
Ranks just behind Stories 1–2 because it's an accelerant for those, not a
replacement for having correct per-page metadata and redirects in place.

**Independent Test**: Can be fully tested by requesting `/sitemap.xml` and
`/robots.txt` and confirming the sitemap lists every currently published
page in all three locales (and only published ones), and robots.txt permits
public routes while disallowing admin/API routes.

**Acceptance Scenarios**:

1. **Given** a set of published and draft pages, **When** the sitemap is
   requested, **Then** it lists only the published pages, in every locale
   they're published in.
2. **Given** the admin and internal API routes, **When** robots.txt is
   requested, **Then** those routes are listed as disallowed while public
   page routes are not.
3. **Given** a page is unpublished after having been in the sitemap,
   **When** the sitemap is next requested, **Then** that page no longer
   appears in it.

---

### User Story 4 - A page qualifies for enhanced search result presentation (Priority: P3)

A search engine parses a page's structured data and understands it well
enough to potentially show an enhanced result: company identity for the
site overall, a breadcrumb trail for any page, question/answer pairs for
pages carrying FAQ content, and service details (name, description, and
current price where one exists) for the VPS/Dedicated/Colocation pages.

**Why this priority**: This is pure upside — richer search listings improve
click-through rate — but it depends on Stories 1–2 already being correct
(there's no point marking up structured data on a page search engines are
about to be confused about via a title regression or a broken redirect).
The ~270 seeded FAQ items in particular are a real content asset currently
invisible to search engines as anything other than plain text.

**Independent Test**: Can be fully tested by running any published page's
HTML through a structured-data validator and confirming it recognizes
Organization/WebSite markup sitewide, breadcrumb markup on every page, FAQ
markup on every page rendering `PageFaq`, and service markup on VPS/
Dedicated/Colocation pages — with zero validation errors.

**Acceptance Scenarios**:

1. **Given** any page on the site, **When** its structured data is
   validated, **Then** it declares the Astra Cloud organization and site
   identity with no errors.
2. **Given** a page that renders FAQ items, **When** its structured data is
   validated, **Then** the declared questions and answers match exactly what
   a visitor sees on the page.
3. **Given** the VPS page, **When** its structured data is validated,
   **Then** the declared price matches the currently live HostBill price,
   never a stale or hardcoded number.
4. **Given** HostBill is unreachable when a service page renders, **When**
   its structured data is validated, **Then** it omits price information
   gracefully rather than publishing stale or fabricated data.

---

### User Story 5 - A shared link shows a real preview instead of a blank one (Priority: P3)

Someone shares a page link in a messenger, social network, or chat tool. The
resulting preview card shows that page's own title, description, and a
real image — not a blank card or the site's generic logo on every single
page regardless of what was shared.

**Why this priority**: Social/messenger sharing is a real traffic and trust
channel for a hosting company (support links, promo posts), but it's lower
stakes than organic search continuity — a blank preview card is a missed
opportunity, not a ranking regression.

**Independent Test**: Can be fully tested by pasting any published page's
URL into a link-preview debugging tool and confirming a distinct title,
description, and image render for that specific page.

**Acceptance Scenarios**:

1. **Given** any published page, **When** its URL is fetched by a social
   preview crawler, **Then** the returned Open Graph and Twitter Card tags
   reflect that page's own title, description, and a real image.

---

### User Story 6 - Pages load fast and stay visually stable while this work ships (Priority: P4)

A visitor on a typical mobile connection opens the homepage or VPS page.
Text renders using the site's real fonts without a layout jump once the
fonts finish loading, and content images arrive appropriately sized and
compressed rather than as unoptimized originals.

**Why this priority**: Page experience is a confirmed, if secondary, search
ranking input, and today's render-blocking external font import and mixed
raw-`<img>` usage measurably hurt it. It's ordered last because it's an
incremental improvement to pages that must already have correct metadata,
redirects, and structured data — polish on a foundation, not the
foundation itself.

**Independent Test**: Can be fully tested by loading the homepage and VPS
page on a throttled mobile connection and confirming no visible text
re-layout after fonts load, and that content images are served at
reasonable, responsive sizes rather than raw upload dimensions.

**Acceptance Scenarios**:

1. **Given** the homepage or VPS page, **When** it loads on a mobile
   connection, **Then** the Core Web Vitals thresholds Google classifies as
   "Good" are met for Largest Contentful Paint and Cumulative Layout Shift.
2. **Given** a content image that conveys information (e.g. the VPS hero
   image), **When** the page renders, **Then** the image carries descriptive
   alt text and is served through the site's optimized image pipeline.

### Edge Cases

- What happens when an editor leaves a page's title/description blank? →
  covered by Story 1's fallback behavior; the page must never ship with an
  empty or sitewide-duplicate title.
- What happens when the same content page exists in only one or two of the
  three locales (translation not yet done)? → the existing content-model
  fallback (untranslated locale falls back to Ukrainian copy) applies to
  SEO metadata too; hreflang/canonical must still resolve to a real,
  renderable URL for every locale, not a 404.
- What happens to an old-site URL for a page that no longer has any
  equivalent at all on the new site? → redirect to the nearest living
  parent/section page or the homepage, never a dead 404.
- What happens when HostBill is unreachable at render time for a service
  page's structured data? → degrade gracefully (omit price), consistent
  with how the existing live-pricing UI already handles HostBill being
  unreachable; never publish stale or fabricated price data.
- What happens to the old site's stale post-sitemap/category-sitemap
  (blog/category URLs with no real content behind them)? → out of scope to
  recreate; they are not to be redirected into fabricated new-site content,
  only the 11 real content URLs and their locale variants need mapping.
- What happens when a page is unpublished or deleted after launch? → it
  must drop out of the sitemap and, if it was one of the original
  redirect-mapped old URLs, the redirect must still point somewhere live
  (not become a new 404).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST render a unique, page- and locale-specific
  `<title>` and meta description for every published page, sourced from
  editor-authored content, replacing the current sitewide static title.
- **FR-002**: System MUST provide editors a way to author (and optionally
  override) a page's search title and description per locale from the
  admin interface, independent of the page's visible on-page heading copy.
- **FR-003**: System MUST generate a sensible fallback title and description
  for any page/locale where the editor has not supplied one, so no page
  ever ships with empty or duplicate search metadata.
- **FR-004**: System MUST render a self-referencing canonical URL on every
  page.
- **FR-005**: System MUST render hreflang alternate links for `ua`, `en`,
  `pl`, and `x-default` on every page, pointing to the corresponding locale
  variant of that same page.
- **FR-006**: System MUST serve a sitemap listing every currently published
  page across all three locales, and MUST exclude unpublished/draft pages.
- **FR-007**: System MUST serve a robots file that permits crawling of
  public page routes and disallows the admin interface and internal API
  routes.
- **FR-008**: System MUST maintain a redirect map that permanently redirects
  every known old-site URL (all locale variants present on the old site) to
  its corresponding new-site page, applied before the new site replaces the
  old one on the production domain.
- **FR-009**: System MUST redirect any old-site URL without a direct new-site
  equivalent to the nearest relevant living page rather than returning a
  not-found response.
- **FR-010**: System MUST render Organization and WebSite structured data
  identifying Astra Cloud on every page.
- **FR-011**: System MUST render breadcrumb structured data on every page
  reflecting that page's actual position in the site's navigation.
- **FR-012**: System MUST render FAQ structured data on every page that
  displays FAQ items, exactly matching the questions and answers visible to
  a visitor on that page.
- **FR-013**: System MUST render service/product structured data on the
  VPS, Dedicated, and Colocation pages, reflecting the currently live price
  and specs from HostBill at render time, and MUST omit price data rather
  than publish stale or fabricated values when live pricing is unavailable.
- **FR-014**: System MUST render Open Graph and Twitter Card metadata
  (title, description, image, locale) per page and locale, using a real
  representative image rather than a single sitewide default.
- **FR-015**: System MUST allow configuring a search-engine verification
  token and an analytics measurement ID per environment without a code
  change.
- **FR-016**: System MUST serve content images that convey information with
  descriptive alt text and through the site's optimized, responsive image
  pipeline; purely decorative images are exempt from the alt-text
  requirement.
- **FR-017**: System MUST load the site's web fonts in a way that does not
  block first content rendering and does not shift already-rendered text
  once fonts finish loading.

### Key Entities

- **Page SEO Metadata**: Per-page, per-locale search title, search
  description, and (optionally) a dedicated share image, editable
  independently of the page's on-page heading/body copy; falls back to an
  auto-generated value when left blank.
- **Redirect Rule**: A mapping from an old-site source path (per locale
  variant it existed under) to a new-site destination path, applied as a
  permanent redirect.
- **Structured Data Declaration**: The Organization/WebSite identity, and,
  per page, its breadcrumb position, its FAQ question/answer set (where
  applicable), and its service name/description/current price (where
  applicable) — always derived from the same content and live pricing the
  visible page already shows, never authored or duplicated separately.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Every published page, in every locale it's published in, has
  a title and description that is unique across the entire site — zero
  exact duplicates when compared page-to-page.
- **SC-002**: 100% of the old site's known indexed URLs (all locale
  variants) resolve to a live, relevant page on the new site in a single
  redirect hop — zero old links reaching a not-found page.
- **SC-003**: All published pages are discoverable from a single submitted
  sitemap, and search engines report the new domain as successfully
  crawled and indexed within two weeks of launch.
- **SC-004**: Every page carrying FAQ content and every VPS/Dedicated/
  Colocation page validates with zero errors in a structured-data
  validator and is eligible for the corresponding enhanced search result
  type.
- **SC-005**: Sharing any published page's link in a messenger or social
  platform shows that page's own title, description, and a real image —
  never a blank or generic sitewide preview.
- **SC-006**: The homepage and VPS page meet Google's "Good" thresholds for
  Largest Contentful Paint and Cumulative Layout Shift on a throttled
  mobile connection.
- **SC-007**: Organic search traffic and keyword ranking positions for the
  new domain, measured for the four weeks following launch, show no
  sustained drop relative to the four weeks preceding launch.

## Assumptions

- The new Next.js/Payload site will launch on the same production domain
  (`cloud.astra.in.ua`) that currently serves the old WordPress site,
  replacing it in place — this is a migration, not a new-domain launch.
- A Google Search Console property and analytics account already exist for
  this domain (the old site runs Google Site Kit); this feature configures
  and re-verifies against the existing domain rather than creating new
  accounts from scratch.
- Editors will supply per-page search titles/descriptions at content-
  authoring time going forward; the auto-generated fallback exists so
  launch is never blocked on backfilling every existing page by hand, not
  as the intended long-term state for high-traffic pages.
- Only the old site's 11 real content URLs (and their locale variants) need
  redirect mapping; the stale, effectively-unused post/category sitemaps
  are not recreated or redirected into fabricated content.
- Structured data for Colocation and Dedicated pages degrades to
  description-only service markup (no live price) for as long as those
  pages remain on the generic template without a live HostBill pricing
  block wired in — consistent with those pages' current implementation
  state — and gains price data automatically once they do.
- Keyword research, content strategy, paid search/social campaigns, and
  backlink outreach are explicitly out of scope for this feature; it
  covers technical/on-page SEO and migration continuity only.
