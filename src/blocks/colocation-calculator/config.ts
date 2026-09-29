import type { Block, Field } from 'payload'

const optionFields: Field[] = [
  { name: 'label', type: 'text', required: true, localized: true },
  { name: 'value', type: 'number', required: true, min: 0 },
  { name: 'monthlyPrice', type: 'number', required: true, min: 0, defaultValue: 0 },
]

export const ColocationCalculatorBlock: Block = {
  slug: 'colocation-calculator',
  labels: {
    singular: 'Colocation calculator',
    plural: 'Colocation calculators',
  },
  fields: [
    { name: 'heading', type: 'text', required: true, localized: true },
    { name: 'subheading', type: 'textarea', localized: true },
    {
      name: 'unitSettings',
      type: 'group',
      label: 'Rack units (U)',
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'minimum', type: 'number', required: true, min: 1, defaultValue: 1 },
        { name: 'maximum', type: 'number', required: true, min: 1, defaultValue: 42 },
        { name: 'defaultValue', type: 'number', required: true, min: 1, defaultValue: 1 },
        { name: 'monthlyPricePerUnit', type: 'number', required: true, min: 0, defaultValue: 500 },
      ],
    },
    {
      name: 'installationPrice',
      type: 'number',
      required: true,
      min: 0,
      defaultValue: 1000,
      admin: { description: 'Fixed one-time installation price. It is not multiplied by the number of rack units.' },
    },
    {
      name: 'powerOptions',
      type: 'array',
      required: true,
      minRows: 1,
      label: 'Power supply options',
      admin: { description: 'value is the power limit in watts.' },
      fields: optionFields,
    },
    {
      name: 'ipOptions',
      type: 'array',
      required: true,
      minRows: 1,
      label: 'IP address options',
      admin: { description: 'value is the number of usable/public IP addresses.' },
      fields: optionFields,
    },
    {
      name: 'speedOptions',
      type: 'array',
      required: true,
      minRows: 1,
      label: 'Internet speed options',
      admin: { description: 'value is the connection speed in Mbit/s.' },
      fields: optionFields,
    },
    {
      name: 'labels',
      type: 'group',
      label: 'Interface labels',
      fields: [
        { name: 'power', type: 'text', required: true, localized: true },
        { name: 'ip', type: 'text', required: true, localized: true },
        { name: 'speed', type: 'text', required: true, localized: true },
        { name: 'monthlyTotal', type: 'text', required: true, localized: true },
        { name: 'setupTotal', type: 'text', required: true, localized: true },
        { name: 'currency', type: 'text', required: true, localized: true, defaultValue: 'грн' },
        { name: 'monthlySuffix', type: 'text', required: true, localized: true, defaultValue: '/ місяць' },
        { name: 'vatNote', type: 'text', localized: true },
      ],
    },
  ],
}
