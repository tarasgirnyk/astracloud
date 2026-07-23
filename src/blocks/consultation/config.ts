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
    {
      name: 'splitCard',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description:
          'Split-card variant: a dark gradient card floating on the section background, with a badge, larger heading, a CTA + microcopy row, and an optional illustration slot. Independent of "tone" so it can\'t change other instances of this block.',
      },
    },
    {
      name: 'badgeLabel',
      type: 'text',
      localized: true,
      admin: { description: 'Small badge above the heading, e.g. "⚙️ Індивідуальний підхід". Split-card variant only.' },
    },
    {
      name: 'microcopy',
      type: 'text',
      localized: true,
      admin: { description: 'Short note next to the CTA button, e.g. "Безкоштовно · без зобов\'язань". Split-card variant only.' },
    },
    {
      name: 'illustrationSrc',
      type: 'text',
      admin: {
        description:
          'Path under /images/ for the split-card variant\'s right-column illustration. Leave empty to show illustrationPlaceholder instead, or leave both empty to collapse to a single column.',
      },
    },
    {
      name: 'illustrationPlaceholder',
      type: 'textarea',
      localized: true,
      admin: { description: 'Shown in the illustration slot until illustrationSrc is set.' },
    },
  ],
}
