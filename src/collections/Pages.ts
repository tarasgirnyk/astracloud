import type { CollectionConfig } from 'payload'
import { HeroBlock } from '@/blocks/hero/config'
import { routing } from '@/i18n/routing'

/**
 * Content pages. `blocks` is intentionally restricted to HeroBlock only —
 * the curated list grows as later features add their own approved block
 * types (constitution Principle VIII); it never becomes "any block anywhere".
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
      blocks: [HeroBlock],
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
