export interface RedirectEntry {
  source: string
  destination: string
  permanent: boolean
}

/**
 * Old WordPress site (cloud.astra.in.ua, still live in production as of
 * this feature) → new Next.js/Payload site. Captured live from the old
 * site's Yoast sitemap (https://cloud.astra.in.ua/page-sitemap.xml, 11
 * URLs, all of which carry a trailing slash on the old site) plus its
 * confirmed `/en/<same-slug>/` English variants (verified directly against
 * `/en/vps/`, `/en/kolokacziya/`, and `/en/pro-nas-2/`, none of which 404 on
 * the live old site) — see contracts/seo-metadata-contracts.md for the full
 * derivation. The old site never exposed a Polish variant, so there is
 * nothing to redirect there.
 *
 * Deliberately a static array, not a Payload collection (research.md §4,
 * constitution Principle VI) — this is a fixed, one-time migration list,
 * not an ongoing editorial concern.
 *
 * Sources are written WITHOUT a trailing slash even though every real old
 * URL has one: Next.js registers its own internal `/:path+/` → `/:path+`
 * redirect with `priority: true` (confirmed in `.next/routes-manifest.json`),
 * which strips any trailing slash before custom `redirects()` entries are
 * ever checked. A source ending in `/` here would simply never match —
 * confirmed live during implementation (see quickstart.md validation).
 *
 * Four of the eleven old URLs have no entry here at all: the UA and EN
 * homepages (old `/`/`/en/`), plus `/sla` and `/vps` (in both locales) —
 * for these, the old site's slug already matches the new site's slug
 * (`sla`, `vps`), so once Next's internal redirect strips the old site's
 * trailing slash, the path is already identical to the new-site route.
 * Next.js rejects a redirect whose source and destination are the same, so
 * these four genuinely need no entry, not a missed one (see
 * redirect-map.test.ts's explicit checks for this).
 */
export const redirectMap: RedirectEntry[] = [
  { source: '/pro-nas-2', destination: '/about', permanent: true },
  { source: '/en/pro-nas-2', destination: '/en/about', permanent: true },
  { source: '/r-policy', destination: '/refund-policy', permanent: true },
  { source: '/en/r-policy', destination: '/en/refund-policy', permanent: true },
  { source: '/pp', destination: '/privacy', permanent: true },
  { source: '/en/pp', destination: '/en/privacy', permanent: true },
  { source: '/kolokacziya', destination: '/colocation', permanent: true },
  { source: '/en/kolokacziya', destination: '/en/colocation', permanent: true },
  { source: '/tos', destination: '/terms', permanent: true },
  { source: '/en/tos', destination: '/en/terms', permanent: true },
  { source: '/vydilenyj-server', destination: '/dedicated', permanent: true },
  { source: '/en/vydilenyj-server', destination: '/en/dedicated', permanent: true },
  { source: '/dokumenty', destination: '/documents', permanent: true },
  { source: '/en/dokumenty', destination: '/en/documents', permanent: true },
  { source: '/l-section', destination: '/legal', permanent: true },
  { source: '/en/l-section', destination: '/en/legal', permanent: true },
]
