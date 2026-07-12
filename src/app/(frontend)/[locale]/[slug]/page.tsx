import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { PageBlocks, type PageBlock } from '@/components/PageBlocks'

export default async function GenericPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'pages',
    where: {
      and: [
        { slug: { equals: slug } },
        { locale: { equals: locale } },
        { publicationStatus: { equals: 'published' } },
      ],
    },
    limit: 1,
  })

  const page = result.docs[0]
  if (!page) {
    notFound()
  }

  const blocks = (page.blocks ?? []) as PageBlock[]

  return <PageBlocks blocks={blocks} />
}
