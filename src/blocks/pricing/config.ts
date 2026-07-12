import type { Block } from 'payload'

/**
 * Pricing section — tabs (service type) + decorative filter tags (location/
 * IP/billing-period — not wired to real filtering, matching the source
 * design mockup, which likewise only gives the tabs live state) + a
 * comparison table per tab + a payment-methods row.
 */
export const PricingBlock: Block = {
  slug: 'pricing',
  labels: {
    singular: 'Pricing section',
    plural: 'Pricing sections',
  },
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'subheading', type: 'text' },
    {
      name: 'tabs',
      type: 'array',
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
    {
      name: 'filterTags',
      type: 'array',
      admin: { description: 'Decorative filter chips (location/IP/billing period) — display-only.' },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'selected', type: 'checkbox', defaultValue: false },
      ],
    },
    {
      name: 'columns',
      type: 'array',
      fields: [
        { name: 'key', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
    {
      name: 'rowsByTab',
      type: 'array',
      admin: { description: 'One entry per tab value; each holds that tab\'s pricing rows.' },
      fields: [
        { name: 'tabValue', type: 'text', required: true },
        {
          name: 'rows',
          type: 'array',
          fields: [
            { name: 'plan', type: 'text', required: true },
            { name: 'cpu', type: 'text', required: true },
            { name: 'ram', type: 'text', required: true },
            { name: 'disk', type: 'text', required: true },
            { name: 'price', type: 'text', required: true },
            { name: 'highlighted', type: 'checkbox', defaultValue: false },
          ],
        },
      ],
    },
    {
      name: 'noDataMessage',
      type: 'text',
      admin: { description: 'Shown when the active tab has no pricing rows yet.' },
    },
    { name: 'paymentMethodsLabel', type: 'text' },
    {
      name: 'paymentMethods',
      type: 'array',
      fields: [{ name: 'name', type: 'text', required: true }],
    },
  ],
}
