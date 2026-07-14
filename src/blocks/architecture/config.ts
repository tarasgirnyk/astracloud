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
    { name: 'heading', type: 'text', required: true, localized: true },
    { name: 'subheading', type: 'text', localized: true },
    { name: 'description', type: 'textarea', localized: true },
    { name: 'checklistLabel', type: 'text', localized: true },
    {
      name: 'checklist',
      type: 'array',
      fields: [{ name: 'text', type: 'text', required: true, localized: true }],
    },
  ],
}
