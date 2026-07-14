import type { Block } from 'payload'
import { validateCtaHref } from '@/blocks/hero/config'

export const ConsultationBlock: Block = {
  slug: 'consultation',
  labels: {
    singular: 'Consultation CTA',
    plural: 'Consultation CTAs',
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
    { name: 'heading', type: 'text', required: true, localized: true },
    { name: 'subheading', type: 'text', localized: true },
    { name: 'ctaLabel', type: 'text', localized: true },
    {
      name: 'ctaHref',
      type: 'text',
      admin: {
        condition: (_data, siblingData) => Boolean(siblingData?.ctaLabel),
        description: 'Required once a CTA label is set.',
      },
      validate: (
        value: string | null | undefined,
        { siblingData }: { siblingData: { ctaLabel?: string | null } },
      ) => validateCtaHref(value, siblingData),
    },
  ],
}
