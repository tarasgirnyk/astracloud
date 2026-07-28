import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { PageBlocks, type PageBlock } from '@/components/PageBlocks'
import { PageFaq } from '@/components/PageFaq'
import { findContentPage } from '@/lib/find-content-page'
import { buildPageMetadata } from '@/lib/seo/build-metadata'
import { breadcrumbJsonLd } from '@/lib/seo/json-ld'
import type { AppLocale } from '@/i18n/routing'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const payload = await getPayload({ config })
  const result = await findContentPage(payload, 'home', locale)
  if (!result) return {}

  return buildPageMetadata({
    pageTitle: result.page.title,
    meta: result.page.meta,
    locale: locale as AppLocale,
    pathname: '/',
  })
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const payload = await getPayload({ config })

  const result = await findContentPage(payload, 'home', locale)
  const blocks = (result?.page.blocks ?? []) as PageBlock[]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd({ locale: locale as AppLocale, pathname: '/' })) }}
      />
      <PageBlocks blocks={blocks} />
      {result ? <PageFaq collection={result.collection} id={result.page.id} /> : null}
    </>
  )
}
