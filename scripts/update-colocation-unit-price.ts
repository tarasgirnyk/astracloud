import { getPayload } from 'payload'
import config from '../payload.config.ts'

const UNIT_PRICE = 1000
const PRICE_TEXT = '1 000,00'
const LOCALES = ['ua', 'en', 'pl'] as const
const ROW_LABELS = new Set(['Розміщення в стійці 1U', '1U rack space', 'Miejsce w szafie 1U'])

type JsonNode = { children?: JsonNode[]; text?: string; [key: string]: unknown }

function textOf(node: JsonNode): string {
  return `${node.text ?? ''}${node.children?.map(textOf).join('') ?? ''}`
}

function updatePriceTable(node: JsonNode): JsonNode {
  if (node.type === 'tablerow' && node.children?.some((child) => ROW_LABELS.has(textOf(child)))) {
    return {
      ...node,
      children: node.children.map((cell, index) =>
        index === 1 || index === 2 ? replaceText(cell, PRICE_TEXT) : cell,
      ),
    }
  }
  return node.children ? { ...node, children: node.children.map(updatePriceTable) } : node
}

function replaceText(node: JsonNode, text: string): JsonNode {
  if (typeof node.text === 'string') return { ...node, text }
  return node.children
    ? { ...node, children: node.children.map((child) => replaceText(child, text)) }
    : node
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
      if (block.blockType === 'colocation-calculator') {
        return {
          ...block,
          unitSettings: { ...block.unitSettings, monthlyPricePerUnit: UNIT_PRICE },
        }
      }
      if (block.blockType === 'simple-content') {
        return { ...block, content: updatePriceTable(block.content as JsonNode) }
      }
      return block
    })

    await payload.update({
      collection: 'service-pages',
      id: page.id,
      locale,
      data: { blocks },
    })
  }

  console.log(`✔ Colocation 1U price updated to ${UNIT_PRICE} UAH in UA/EN/PL`)
}

await main()
process.exit(0)
