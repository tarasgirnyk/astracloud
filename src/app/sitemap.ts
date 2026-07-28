import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { routing } from '@/i18n/routing'
import { localizedPathname } from '@/lib/seo/build-metadata'
import { SITE_URL } from '@/lib/seo/site'

interface SlugDoc {
  slug: string
  updatedAt: string
}

/**
 * Pure entry-building logic, separated from the Payload query below so it's
 * unit-testable without mocking Payload (see sitemap.test.ts). One `<url>`
 * per locale per published document (contracts/seo-metadata-contracts.md
 * §2) — every locale always resolves to a real, renderable page (untranslated
 * locales fall back to Ukrainian copy, never 404), so no per-locale
 * "is it translated" filtering is needed.
 */
export function buildSitemapEntries(docs: SlugDoc[]): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []
  for (const doc of docs) {
    const pathname = doc.slug === 'home' ? '/' : `/${doc.slug}`
    for (const locale of routing.locales) {
      entries.push({
        url: `${SITE_URL}${localizedPathname(pathname, locale)}`,
        lastModified: new Date(doc.updatedAt),
      })
    }
  }
  return entries
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config })

  const [pagesResult, servicePagesResult] = await Promise.all([
    payload.find({
      collection: 'pages',
      where: { publicationStatus: { equals: 'published' } },
      limit: 0,
      select: { slug: true, updatedAt: true },
    }),
    payload.find({
      collection: 'service-pages',
      where: { publicationStatus: { equals: 'published' } },
      limit: 0,
      select: { slug: true, updatedAt: true },
    }),
  ])

  return buildSitemapEntries([...pagesResult.docs, ...servicePagesResult.docs])
}
