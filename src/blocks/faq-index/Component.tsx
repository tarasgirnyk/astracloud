import { getLocale } from 'next-intl/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Accordion, type AccordionItem } from '@/components/Accordion'

export interface FaqIndexBlockProps {
  blockType: 'faq-index'
  heading?: string | null
}

/**
 * Every published FAQ Items document, in one flat list — the "see
 * everything" page (/faq), independent of which specific page(s) each item
 * is also tagged to render on automatically (see PageFaq.tsx).
 */
export async function FaqIndex({ heading }: FaqIndexBlockProps) {
  const locale = (await getLocale()) as 'ua' | 'en' | 'pl'
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'faq-items',
    locale,
    where: { publicationStatus: { equals: 'published' } },
    sort: 'order',
    limit: 500,
  })

  if (!result.docs.length) return null

  const items: AccordionItem[] = result.docs.map((doc) => ({ question: doc.question, answer: doc.answer }))

  return (
    <section style={{ padding: 'var(--section-padding-y) 0', background: 'var(--paper)' }}>
      <div className="ac-container">
        {heading ? (
          <h1
            style={{
              font: 'var(--text-display-lg)',
              color: 'var(--text-on-light)',
              textAlign: 'center',
              marginBottom: 'var(--space-10)',
            }}
          >
            {heading}
          </h1>
        ) : null}
        <Accordion items={items} />
      </div>
    </section>
  )
}
