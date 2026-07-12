import type { Block } from 'payload'
import { EXPERIMENTAL_TableFeature, lexicalEditor } from '@payloadcms/richtext-lexical'

/**
 * Generic single-column text page (page header + policy-style content) —
 * matches design-handoff/project/templates/simple/simple.html. Reusable for
 * About Us, Terms of Use, Privacy Policy, Refund Policy, etc.: any page
 * that's just a title and a block of free-form text.
 *
 * `pageTitle` is optional so this block can also serve as a body-only
 * section after a Hero block already carries the page's H1 (e.g. the
 * Colocation page) without rendering a duplicate title bar.
 *
 * The content editor adds the table feature (off by default in Payload) so
 * editors can build pricing/spec tables directly in this field.
 */
export const SimpleContentBlock: Block = {
  slug: 'simple-content',
  labels: {
    singular: 'Simple content page',
    plural: 'Simple content pages',
  },
  fields: [
    { name: 'pageTitle', type: 'text' },
    {
      name: 'content',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [...defaultFeatures, EXPERIMENTAL_TableFeature()],
      }),
    },
  ],
}
