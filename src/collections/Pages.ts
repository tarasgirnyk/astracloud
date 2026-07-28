import type { CollectionConfig } from 'payload'
import { HeroBlock } from '@/blocks/hero/config'
import { PartnersBlock } from '@/blocks/partners/config'
import { ServicesBlock } from '@/blocks/services/config'
import { AdvantagesBlock } from '@/blocks/advantages/config'
import { PricingBlock } from '@/blocks/pricing/config'
import { FaqBlock } from '@/blocks/faq/config'
import { FaqIndexBlock } from '@/blocks/faq-index/config'
import { ConsultationBlock } from '@/blocks/consultation/config'
import { SimpleContentBlock } from '@/blocks/simple-content/config'
import { DocumentsBlock } from '@/blocks/documents/config'
import { StepsBlock } from '@/blocks/steps/config'

/**
 * Generic content pages (homepage, About, legal pages, Documents) — one
 * document per slug, translated via Payload's native field localization
 * (`localized: true` on each block's text fields), not one document per
 * locale. Product pages tied to HostBill (VPS, Colocation) live in the
 * separate `ServicePages` collection instead — see its own file for why.
 *
 * `blocks` is a curated list — it grows as features add their own approved
 * block types (constitution Principle VIII); it never becomes "any block
 * anywhere".
 */
export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'publicationStatus'],
  },
  access: {
    read: () => true,
  },
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
      unique: true,
      admin: {
        description: 'Used to resolve the page\'s address, e.g. "home". Same for every locale.',
      },
    },
    {
      name: 'meta',
      type: 'group',
      admin: {
        description:
          'Search-engine title/description for this page. Leave blank to use an auto-generated fallback (page heading + site name) — see src/lib/seo/fallback.ts.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
          admin: { description: 'Search-result title. Falls back to an auto-generated value when blank.' },
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
          admin: { description: 'Search-result description. Falls back to an auto-generated value when blank.' },
        },
        {
          name: 'ogImage',
          type: 'text',
          admin: {
            description:
              'Path under /images/ used for social share previews (Open Graph/Twitter). Falls back to the sitewide default image when blank.',
          },
        },
      ],
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
        FaqIndexBlock,
        ConsultationBlock,
        SimpleContentBlock,
        DocumentsBlock,
        StepsBlock,
      ],
    },
    {
      name: 'publicationStatus',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      // Shared across all locales (not localized) — publishing this
      // document publishes every locale at once. Untranslated localized
      // fields fall back to `defaultLocale` (ua) rather than rendering
      // empty — see payload.config.ts's `localization.fallback`.
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
    },
  ],
}
