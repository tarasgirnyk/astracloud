import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { PageBlocks, type PageBlock } from '@/components/PageBlocks'
import { findContentPage } from '@/lib/find-content-page'

export default async function GenericPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const payload = await getPayload({ config })

  const page = await findContentPage(payload, slug, locale)
  if (!page) {
    notFound()
  }

  const blocks = (page.blocks ?? []) as PageBlock[]

  return <PageBlocks blocks={blocks} />
}
