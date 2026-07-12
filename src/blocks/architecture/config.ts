import type { Block } from 'payload'

/**
 * Dark "architecture" section — heading/sub-heading/description, then a
 * small label over a 3-column checkmark grid. Matches the "Стабільність і
 * надійність..." section of the VPS product page template.
 */
export const ArchitectureBlock: Block = {
  slug: 'architecture',
  labels: {
    singular: 'Architecture section',
    plural: 'Architecture sections',
  },
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'subheading', type: 'text' },
    { name: 'description', type: 'textarea' },
    { name: 'checklistLabel', type: 'text' },
    {
      name: 'checklist',
      type: 'array',
      fields: [{ name: 'text', type: 'text', required: true }],
    },
  ],
}
