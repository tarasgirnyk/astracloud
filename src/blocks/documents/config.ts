import type { Block } from 'payload'

/**
 * "Документи" page — page header matches the "simple" template (title bar,
 * then body). Body is a document list (each with View + Download links) on
 * the left and an embedded viewer widget on the right that swaps to
 * whichever document was last clicked "View". Files are static assets
 * under public/documents/ (company registration/certification paperwork
 * rarely changes), same precedent as Hero's hardcoded image path.
 */
export const DocumentsBlock: Block = {
  slug: 'documents',
  labels: {
    singular: 'Documents page',
    plural: 'Documents pages',
  },
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'intro', type: 'textarea' },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'fileUrl',
          type: 'text',
          required: true,
          admin: { description: 'Path under /documents/, e.g. /documents/certificate.jpg' },
        },
      ],
    },
    {
      name: 'viewLinkLabel',
      type: 'text',
      admin: { description: 'Label for each document\'s "view" link, e.g. "View".' },
    },
    {
      name: 'downloadLinkLabel',
      type: 'text',
      admin: { description: 'Label for each document\'s "download" link, e.g. "Download".' },
    },
  ],
}
