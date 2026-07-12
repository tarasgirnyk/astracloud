import type { Block } from 'payload'

/**
 * "Нам довіряють" strip — logo resolution is static (see Component.tsx's
 * PARTNER_LOGOS map), matching the Hero block's precedent of hardcoded
 * image paths rather than a Payload upload field for brand assets that
 * rarely change.
 */
export const PartnersBlock: Block = {
  slug: 'partners',
  labels: {
    singular: 'Partners strip',
    plural: 'Partners strips',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'partners',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'href', type: 'text' },
      ],
    },
  ],
}
