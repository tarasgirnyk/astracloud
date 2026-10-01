import { getPayload } from 'payload'
import config from '../payload.config.ts'

const LOCALES = ['ua', 'en', 'pl'] as const
const USABLE_IPS: Record<string, number> = {
  '/30': 1,
  '/29': 5,
  '/28': 13,
  '/27': 29,
  '/26': 61,
  '/25': 125,
}

async function main() {
  const payload = await getPayload({ config })

  for (const locale of LOCALES) {
    const result = await payload.find({
      collection: 'service-pages',
      locale,
      limit: 1,
      depth: 0,
      where: { slug: { equals: 'colocation' } },
    })
    const page = result.docs[0]
    if (!page) throw new Error('Colocation page not found')

    const blocks = (page.blocks ?? []).map((block) => {
      if (block.blockType !== 'colocation-calculator') return block

      const ipOptions = (block.ipOptions ?? [])
        .filter((option) => !(option.value === 2 && option.label?.startsWith('/30')))
        .map((option) => {
          const subnet = Object.keys(USABLE_IPS).find((prefix) => option.label?.startsWith(prefix))
          if (!subnet) return option
          const usable = USABLE_IPS[subnet]!
          return { ...option, value: usable, label: `${subnet} · ${usable} usable IP` }
        })

      return { ...block, ipOptions }
    })

    await payload.update({
      collection: 'service-pages',
      id: page.id,
      locale,
      data: { blocks },
    })
  }

  console.log('✔ Colocation IP options updated in UA/EN/PL')
}

await main()
process.exit(0)
