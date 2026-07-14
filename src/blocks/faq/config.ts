import type { Block } from 'payload'

export const FaqBlock: Block = {
  slug: 'faq',
  labels: {
    singular: 'FAQ section',
    plural: 'FAQ sections',
  },
  fields: [
    { name: 'heading', type: 'text', required: true, localized: true },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'question', type: 'text', required: true, localized: true },
        { name: 'answer', type: 'textarea', required: true, localized: true },
      ],
    },
  ],
}
