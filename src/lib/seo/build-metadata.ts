import type { Metadata } from 'next'
import { routing, type AppLocale } from '@/i18n/routing'
import { buildFallbackDescription, buildFallbackTitle } from './fallback'
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from './site'

/**
 * The project's internal locale keys (`ua`/`en`/`pl`, used for routing —
 * see src/i18n/routing.ts) are not themselves valid hreflang/BCP47 language
 * codes: Ukrainian's real code is `uk`, not `ua` (`ua` is a country-style
 * abbreviation, not a language tag). This is the one place that mapping
 * happens — every hreflang/og:locale value in this module goes through it.
 */
const HREFLANG: Record<AppLocale, string> = { ua: 'uk', en: 'en', pl: 'pl' }
const OG_LOCALE: Record<AppLocale, string> = { ua: 'uk_UA', en: 'en_US', pl: 'pl_PL' }

/**
 * Deliberately not `next-intl/navigation`'s `getPathname` — that helper
 * transitively imports `next/navigation` (a client/server-component-only
 * module), which doesn't resolve under a plain Vitest node environment and
 * would force mocking just to unit-test this pure logic. `routing.ts`'s
 * `localePrefix: 'as-needed'` has simple, fully-specified semantics (only
 * the default locale is ever unprefixed; this project defines no
 * per-locale pathname translations), so a few lines here fully replicate
 * it without the extra dependency. Exported for reuse by src/app/sitemap.ts,
 * which needs the same locale-to-path resolution.
 */
export function localizedPathname(pathname: string, locale: AppLocale): string {
  if (locale === routing.defaultLocale) return pathname
  return pathname === '/' ? `/${locale}` : `/${locale}${pathname}`
}

interface MetaFields {
  title?: string | null
  description?: string | null
  ogImage?: string | null
}

interface BuildPageMetadataParams {
  /** The page's own internal `title` field (fallback source — see fallback.ts) */
  pageTitle: string
  /** The page's `meta` group, if any (editor-authored — always wins when set) */
  meta?: MetaFields | null
  locale: AppLocale
  /** Locale-agnostic pathname, e.g. `/` for the homepage or `/vps` for a slug page */
  pathname: string
}

/**
 * The same title-resolution rule `buildPageMetadata` uses for `<title>`,
 * exported so other call sites that need the page's effective title (e.g.
 * the breadcrumb label in page.tsx/[slug]/page.tsx) stay consistent with it
 * instead of re-deriving their own label.
 */
export function resolvePageTitle(pageTitle: string, meta?: MetaFields | null): string {
  return meta?.title?.trim() || buildFallbackTitle(pageTitle)
}

/**
 * Shared `generateMetadata()` builder for both `[locale]/page.tsx` (home)
 * and `[locale]/[slug]/page.tsx` (every other page) — title/description/
 * canonical/hreflang (FR-001–FR-005) plus Open Graph/Twitter (FR-014,
 * added in US5 on top of this same function, see build-metadata.test.ts).
 */
export function buildPageMetadata({ pageTitle, meta, locale, pathname }: BuildPageMetadataParams): Metadata {
  const title = resolvePageTitle(pageTitle, meta)
  const description = meta?.description?.trim() || buildFallbackDescription(pageTitle)
  const ogImage = meta?.ogImage?.trim() || DEFAULT_OG_IMAGE

  const languages: Record<string, string> = {}
  for (const loc of routing.locales) {
    languages[HREFLANG[loc]] = `${SITE_URL}${localizedPathname(pathname, loc)}`
  }
  languages['x-default'] = `${SITE_URL}${localizedPathname(pathname, routing.defaultLocale)}`

  const canonicalUrl = `${SITE_URL}${localizedPathname(pathname, locale)}`
  const imageUrl = ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale],
      type: 'website',
      images: [{ url: imageUrl }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  }
}
