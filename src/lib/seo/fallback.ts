import { SITE_NAME } from './site'

/**
 * A page's own `meta.title`/`meta.description` (see data-model.md) always
 * wins when set. These fallbacks exist so a page never ships with an empty
 * or sitewide-duplicate title (spec.md Edge Case, FR-003) — derived from
 * the page's own `title` field (required on both `Pages` and
 * `ServicePages`, always present regardless of which blocks a page uses;
 * not every page has a Hero block to pull a heading from — legal pages,
 * for example, are `simple-content` only). Note `title` is not itself
 * localized (see collection comments), so this fallback is not
 * locale-specific text — it's a safety net that guarantees every page has
 * a distinct, non-empty title, not a substitute for editors filling in a
 * real per-locale `meta.title`.
 */
export function buildFallbackTitle(pageTitle: string): string {
  const title = pageTitle.trim()
  if (!title) return SITE_NAME
  return `${title} — ${SITE_NAME}`
}

export function buildFallbackDescription(pageTitle: string): string {
  const title = pageTitle.trim()
  if (!title) return SITE_NAME
  return `${title} — ${SITE_NAME}.`
}
