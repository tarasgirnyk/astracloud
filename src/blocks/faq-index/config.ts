import type { Block } from 'payload'

/**
 * Renders every published FAQ Items document, grouped by category — the
 * content for the general /faq page. See src/collections/FaqItems.ts for
 * why the questions live in their own collection rather than inline here.
 */
export const FaqIndexBlock: Block = {
  slug: 'faq-index',
  labels: {
    singular: 'FAQ index (all questions)',
    plural: 'FAQ indexes',
  },
  fields: [{ name: 'heading', type: 'text', localized: true }],
}
