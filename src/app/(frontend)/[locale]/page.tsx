import { getPayload } from 'payload'
import config from '@payload-config'
import { PageBlocks, type PageBlock } from '@/components/PageBlocks'
import { PageFaq } from '@/components/PageFaq'
import { findContentPage } from '@/lib/find-content-page'

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const payload = await getPayload({ config })

  const result = await findContentPage(payload, 'home', locale)
  const blocks = (result?.page.blocks ?? []) as PageBlock[]

  return (
    <>
      <PageBlocks blocks={blocks} />
      {result ? <PageFaq collection={result.collection} id={result.page.id} /> : null}
    </>
  )
}
