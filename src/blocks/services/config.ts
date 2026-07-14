import type { Block } from 'payload'

/**
 * "Наші послуги" section — one shared heading over N full-width split
 * service cards (VPS, Colocation, Dedicated in the source design, but the
 * list itself is editor-repeatable, not hardcoded to 3).
 */
export const ServicesBlock: Block = {
  slug: 'services',
  labels: {
    singular: 'Services section',
    plural: 'Services sections',
  },
  fields: [
    { name: 'heading', type: 'text', required: true, localized: true },
    { name: 'subheading', type: 'text', localized: true },
    {
      name: 'services',
      type: 'array',
      fields: [
        {
          name: 'anchorId',
          type: 'text',
          admin: { description: 'Used as the card\'s in-page anchor, e.g. "vps".' },
        },
        { name: 'eyebrow', type: 'text', localized: true },
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'description', type: 'textarea', required: true, localized: true },
        {
          name: 'bullets',
          type: 'array',
          admin: { description: 'Optional short bullet list under the description.' },
          fields: [{ name: 'text', type: 'text', required: true, localized: true }],
        },
        { name: 'ctaLabel', type: 'text', localized: true },
        { name: 'ctaHref', type: 'text' },
        {
          name: 'checklist',
          type: 'array',
          admin: { description: 'Right-column checkmark list.' },
          fields: [{ name: 'text', type: 'text', required: true, localized: true }],
        },
      ],
    },
  ],
}
