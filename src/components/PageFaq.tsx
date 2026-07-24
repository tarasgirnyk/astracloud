import { getLocale } from 'next-intl/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Accordion, type AccordionItem } from '@/components/Accordion'

const HEADING: Record<'ua' | 'en' | 'pl', string> = {
  ua: 'Питання та відповіді',
  en: 'Frequently Asked Questions',
  pl: 'Pytania i odpowiedzi',
}

/**
 * Auto-injected FAQ section rendered right before the footer (both
 * [locale]/page.tsx and [locale]/[slug]/page.tsx render it as the last
 * thing in their tree, right before <PageBlocks>'s sibling children close
 * and the layout's <footer> begins) — driven entirely by which FAQ Items
 * documents are tagged with this page via their `pages` relationship (see
 * src/collections/FaqItems.ts). No block/placeholder needs to be added to
 * the page's own content to use it — tagging in the admin is enough.
 */
export async function PageFaq({ collection, id }: { collection: 'pages' | 'service-pages'; id: number }) {
  const locale = (await getLocale()) as 'ua' | 'en' | 'pl'
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'faq-items',
    locale,
    where: {
      and: [
        { publicationStatus: { equals: 'published' } },
        { pages: { equals: { relationTo: collection, value: id } } },
      ],
    },
    sort: 'order',
    limit: 200,
  })

  if (!result.docs.length) return null

  const items: AccordionItem[] = result.docs.map((doc) => ({ question: doc.question, answer: doc.answer }))

  return (
    <section style={{ padding: 'var(--section-padding-y) 0', background: 'var(--paper)' }}>
      <div className="ac-container">
        <h2
          style={{
            font: 'var(--text-display-lg)',
            color: 'var(--text-on-light)',
            textAlign: 'center',
            marginBottom: 'var(--space-10)',
          }}
        >
          {HEADING[locale]}
        </h2>
        <Accordion items={items} />
      </div>
    </section>
  )
}
