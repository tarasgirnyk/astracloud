import type { CollectionConfig } from 'payload'

/**
 * Reusable FAQ questions, extracted into their own collection (rather than
 * duplicated inline in every page's `faq` block, as the homepage/VPS/
 * Dedicated pages did before) specifically because a meaningful share of
 * real support-ticket questions apply to more than one page. Each item is
 * tagged directly with the page(s) it belongs to via `pages` — an editor
 * picks a service page (VPS, Dedicated, Colocation) or, more generally, any
 * page at all. Whichever pages are selected automatically render this item
 * as part of an FAQ section right before the footer on that page (see
 * src/components/PageFaq.tsx) — no manual block placement needed.
 */
export const FaqItems: CollectionConfig = {
  slug: 'faq-items',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'pages', 'order', 'publicationStatus'],
    description:
      'Tag each question with the page(s) it should appear on. It renders automatically as an FAQ section right before the footer on every page selected.',
  },
  fields: [
    {
      name: 'key',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Stable identifier used by seed scripts to update this item idempotently (e.g. "vps-root-ssh"). Not shown publicly.',
      },
    },
    { name: 'question', type: 'text', required: true, localized: true },
    { name: 'answer', type: 'textarea', required: true, localized: true },
    {
      name: 'pages',
      type: 'relationship',
      // Service pages listed first so editors reach VPS/Dedicated/Colocation
      // quickly; "Pages" covers every other page (About, Partnerka, home, …).
      relationTo: ['service-pages', 'pages'],
      hasMany: true,
      required: true,
      admin: {
        description: 'Which page(s) this question appears on.',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Sort order (ascending) among the FAQ items on the same page.',
      },
    },
    {
      name: 'publicationStatus',
      type: 'select',
      required: true,
      defaultValue: 'published',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
    },
  ],
}
