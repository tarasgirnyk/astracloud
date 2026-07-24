import type { Block } from 'payload'

/**
 * Zigzag step-by-step section (checkerboard text/image rows, alternating
 * sides) — introduced for the "Партнерка" (affiliate/referral) page's
 * "Що потрібно зробити?" section (see design-handoff/project/templates/
 * referral/Referral.dc.html). Step numbers are derived from array position
 * (01, 02, 03…), matching the Advantages block's centered-variant grid
 * convention, rather than stored per item.
 */
export const StepsBlock: Block = {
  slug: 'steps',
  labels: {
    singular: 'Steps section',
    plural: 'Steps sections',
  },
  fields: [
    { name: 'eyebrow', type: 'text', localized: true },
    { name: 'heading', type: 'text', required: true, localized: true },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        { name: 'text', type: 'textarea', required: true, localized: true },
        {
          name: 'imageSrc',
          type: 'text',
          admin: { description: 'Path under /images/. Left empty renders a dashed placeholder.' },
        },
      ],
    },
  ],
}
