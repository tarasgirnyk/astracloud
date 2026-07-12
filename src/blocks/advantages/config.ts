import type { Block } from 'payload'

/**
 * "Надійна інфраструктура" dark section — intro copy + a 6-item icon grid.
 * Icons are plain-text/emoji per the design-handoff brief (flagged
 * placeholder for a real icon set — see design-handoff README "Iconography").
 */
export const AdvantagesBlock: Block = {
  slug: 'advantages',
  labels: {
    singular: 'Advantages section',
    plural: 'Advantages sections',
  },
  fields: [
    {
      name: 'tone',
      type: 'select',
      defaultValue: 'dark',
      options: [
        { label: 'Dark (navy gradient)', value: 'dark' },
        { label: 'Light (gray)', value: 'light' },
      ],
    },
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    {
      name: 'bullets',
      type: 'array',
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    {
      name: 'tagline',
      type: 'text',
      admin: { description: 'Short bold closing line under the bullet list.' },
    },
    {
      name: 'grid',
      type: 'array',
      admin: { description: '6-item icon+title+text grid rendered below the intro copy.' },
      fields: [
        { name: 'icon', type: 'text', admin: { description: 'Emoji glyph, e.g. 💸' } },
        { name: 'title', type: 'text', required: true },
        { name: 'text', type: 'textarea', required: true },
      ],
    },
  ],
}
