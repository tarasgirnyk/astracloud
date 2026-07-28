import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo/site'

/**
 * Mirrors proxy.ts's matcher exclusions (public frontend routes only —
 * admin/API are never meant to be crawled), per
 * contracts/seo-metadata-contracts.md §3.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
