import type { Block } from 'payload'

/**
 * A CTA label without a link (or vice versa) is an invalid Hero instance —
 * see data-model.md. Exported standalone so it's testable without spinning
 * up Payload (see config.test.ts).
 */
export function validateCtaHref(
  value: string | null | undefined,
  siblingData: { ctaLabel?: string | null },
): true | string {
  if (siblingData?.ctaLabel && !value) {
    return 'A CTA link is required whenever a CTA label is set.'
  }
  return true
}

/**
 * The one content block delivered in this feature (constitution Principle
 * VIII: curated block list, limited to what's actually in the design
 * mockups — see design-handoff/project/templates/homepage/Homepage.dc.html).
 */
export const HeroBlock: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero',
    plural: 'Hero blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'subheading',
      type: 'text',
    },
    {
      name: 'tagline',
      type: 'text',
      admin: { description: 'Optional short second line under the subheading.' },
    },
    {
      name: 'imageSrc',
      type: 'text',
      defaultValue: '/images/hero3.png',
      admin: { description: 'Path under /images/.' },
    },
    {
      name: 'imageFit',
      type: 'select',
      defaultValue: 'cover',
      options: [
        { label: 'Cover', value: 'cover' },
        { label: 'Contain', value: 'contain' },
      ],
    },
    {
      name: 'ctaLabel',
      type: 'text',
    },
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
