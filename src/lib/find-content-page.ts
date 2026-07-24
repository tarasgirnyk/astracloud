import type { Payload } from 'payload'

/**
 * Looks up a published page by slug in the requested locale, checking
 * `pages` (generic content) first, then `service-pages` (VPS, Colocation —
 * HostBill-bound product pages). Both collections use native Payload
 * localization (one document per slug, not one per locale), so `locale` is
 * passed as a top-level option — it selects which locale's values Payload
 * resolves for localized fields, it's not a `where` filter.
 *
 * Returns which collection matched alongside the doc — callers need it to
 * query FaqItems tagged with this exact page (see PageFaq.tsx), since
 * FaqItems.pages is a polymorphic relationship keyed by collection + id.
 */
export async function findContentPage(payload: Payload, slug: string, locale: string) {
  const pagesResult = await payload.find({
    collection: 'pages',
    where: {
      and: [{ slug: { equals: slug } }, { publicationStatus: { equals: 'published' } }],
    },
    locale: locale as 'ua' | 'en' | 'pl',
    limit: 1,
  })
  if (pagesResult.docs[0]) {
    return { page: pagesResult.docs[0], collection: 'pages' as const }
  }

  const servicePagesResult = await payload.find({
    collection: 'service-pages',
    where: {
      and: [{ slug: { equals: slug } }, { publicationStatus: { equals: 'published' } }],
    },
    locale: locale as 'ua' | 'en' | 'pl',
    limit: 1,
  })
  if (servicePagesResult.docs[0]) {
    return { page: servicePagesResult.docs[0], collection: 'service-pages' as const }
  }

  return null
}
