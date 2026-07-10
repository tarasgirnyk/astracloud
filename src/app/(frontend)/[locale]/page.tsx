import { getPayload } from 'payload'
import config from '@payload-config'
import { Hero, type HeroBlockProps } from '@/blocks/hero/Component'

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'pages',
    where: {
      and: [
        { slug: { equals: 'home' } },
        { locale: { equals: locale } },
        { publicationStatus: { equals: 'published' } },
      ],
    },
    limit: 1,
  })

  const page = result.docs[0]
  const blocks = (page?.blocks ?? []) as HeroBlockProps[]

  return (
    <>
      {blocks.map((block, index) => {
        if (block.blockType === 'hero') {
          return <Hero key={index} {...block} />
        }
        return null
      })}
    </>
  )
}
