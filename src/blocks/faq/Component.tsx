import { Accordion } from '@/components/Accordion'

export interface FaqBlockProps {
  blockType: 'faq'
  heading: string
  items?: { question: string; answer: string }[] | null
}

export function Faq({ heading, items }: FaqBlockProps) {
  if (!items?.length) return null

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
          {heading}
        </h2>
        <Accordion items={items} />
      </div>
    </section>
  )
}
