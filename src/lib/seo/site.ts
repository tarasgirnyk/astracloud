/**
 * Sitewide SEO constants — shared by canonical/hreflang URL building,
 * sitemap.xml, robots.txt, JSON-LD (Organization/WebSite), and Open Graph
 * fallbacks. `SITE_URL` MUST have no trailing slash (callers append their
 * own leading `/`).
 */
export const SITE_NAME = 'Astra Cloud'

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, '')

export const DEFAULT_OG_IMAGE = '/images/astra-cloud-logo.png'
