import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { PageBlocks, type PageBlock } from '@/components/PageBlocks'
import { PageFaq } from '@/components/PageFaq'
import { findContentPage } from '@/lib/find-content-page'

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

  return (
    <>
      <PageBlocks blocks={blocks} />
      <PageFaq collection={collection} id={page.id} />
    </>
  )
}
