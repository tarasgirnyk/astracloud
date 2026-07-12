'use client'

import { useState } from 'react'

export interface AccordionItem {
  question: string
  answer: string
}

export interface AccordionProps {
  items: AccordionItem[]
}

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {items.map((item, index) => {
        const isOpen = openIndex === index
        return (
          <div
            key={index}
            style={{
              border: '1px solid var(--border-on-light)',
              borderRadius: 'var(--radius-md)',
              background: 'var(--white)',
              overflow: 'hidden',
            }}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 16,
                padding: '18px 20px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                font: 'var(--text-ui-label)',
                color: 'var(--text-on-light)',
              }}
            >
              {item.question}
              <span
                style={{
                  flex: 'none',
                  fontSize: 18,
                  transform: isOpen ? 'rotate(45deg)' : 'none',
                  transition: 'transform var(--duration-standard) var(--ease-standard)',
                  color: 'var(--brand-primary)',
                }}
              >
                +
              </span>
            </button>
            {isOpen ? (
              <p
                style={{
                  margin: 0,
                  padding: '0 20px 18px',
                  font: 'var(--text-body-sm)',
                  color: 'var(--text-on-light-muted)',
                }}
              >
                {item.answer}
              </p>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
