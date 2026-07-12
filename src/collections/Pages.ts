import type { CollectionConfig } from 'payload'
import { HeroBlock } from '@/blocks/hero/config'
import { PartnersBlock } from '@/blocks/partners/config'
import { ServicesBlock } from '@/blocks/services/config'
import { AdvantagesBlock } from '@/blocks/advantages/config'
import { PricingBlock } from '@/blocks/pricing/config'
import { FaqBlock } from '@/blocks/faq/config'
import { ConsultationBlock } from '@/blocks/consultation/config'
import { SimpleContentBlock } from '@/blocks/simple-content/config'
import { DocumentsBlock } from '@/blocks/documents/config'
import { ArchitectureBlock } from '@/blocks/architecture/config'
import { VpsPricingCardsBlock } from '@/blocks/vps-pricing-cards/config'
import { routing } from '@/i18n/routing'

/**
 * Content pages. `blocks` is a curated list — it grows as features add their
 * own approved block types (constitution Principle VIII); it never becomes
 * "any block anywhere".
 */
export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'locale', 'publicationStatus'],
  },
  access: {
    read: () => true,
  },
  indexes: [
    {
      // slug MUST be unique per locale, not globally — see data-model.md
      fields: ['slug', 'locale'],
      unique: true,
    },
  ],
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Internal reference name — not necessarily rendered on the page.',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      admin: {
        description: 'Used to resolve the page\'s address, e.g. "home".',
      },
    },
    {
      name: 'locale',
      type: 'select',
      required: true,
      defaultValue: routing.defaultLocale,
      options: routing.locales.map((locale) => ({ label: locale.toUpperCase(), value: locale })),
    },
    {
      name: 'blocks',
      type: 'blocks',
      blocks: [
        HeroBlock,
        PartnersBlock,
        ServicesBlock,
        AdvantagesBlock,
        PricingBlock,
        FaqBlock,
        ConsultationBlock,
        SimpleContentBlock,
        DocumentsBlock,
        ArchitectureBlock,
        VpsPricingCardsBlock,
      ],
    },
    {
      name: 'publicationStatus',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
    },
  ],
}
