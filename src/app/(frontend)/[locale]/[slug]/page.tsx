import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { PageBlocks, type PageBlock } from '@/components/PageBlocks'
import { PageFaq } from '@/components/PageFaq'
import { findContentPage } from '@/lib/find-content-page'
import { buildPageMetadata, resolvePageTitle } from '@/lib/seo/build-metadata'
import { breadcrumbJsonLd, serviceJsonLd } from '@/lib/seo/json-ld'
import { SITE_URL } from '@/lib/seo/site'
import { getCachedVpsProducts } from '@/blocks/vps-pricing-cards/get-live-products'
import type { AppLocale } from '@/i18n/routing'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const payload = await getPayload({ config })
  const result = await findContentPage(payload, slug, locale)
  if (!result) return {}

  return buildPageMetadata({
    pageTitle: result.page.title,
    meta: result.page.meta,
    locale: locale as AppLocale,
    pathname: `/${slug}`,
  })
}

export default async function GenericPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const payload = await getPayload({ config })

  const result = await findContentPage(payload, slug, locale)
  if (!result) {
    notFound()
  }
  const { page, collection } = result

  const blocks = (page.blocks ?? []) as PageBlock[]

  const vpsPricingBlock = blocks.find(
    (block): block is Extract<PageBlock, { blockType: 'vps-pricing-cards' }> => block.blockType === 'vps-pricing-cards',
  )
  let service = null
  if (vpsPricingBlock) {
    let product: Awaited<ReturnType<typeof getCachedVpsProducts>>[number] | undefined
    try {
      const products = await getCachedVpsProducts(vpsPricingBlock.hostbillCategoryId)
      product =
        products.find((p) => p.id === vpsPricingBlock.recommendedProductId) ?? products[0]
    } catch {
      // HostBill unreachable — same graceful-degrade as the pricing block
      // itself; Service JSON-LD below simply omits `offers` (Principle VIII).
    }
    service = serviceJsonLd({
      name: resolvePageTitle(page.title, page.meta),
      description: page.meta?.description ?? '',
      url: `${SITE_URL}${slug === 'home' ? '' : `/${slug}`}`,
      product,
    })
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd({
              locale: locale as AppLocale,
              pathname: `/${slug}`,
              label: resolvePageTitle(page.title, page.meta),
            }),
          ),
        }}
      />
      {service ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
        />
      ) : null}
      <PageBlocks blocks={blocks} />
      <PageFaq collection={collection} id={page.id} />
    </>
  )
}
