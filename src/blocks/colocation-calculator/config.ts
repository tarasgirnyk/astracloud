import type { Block, Field } from 'payload'
import { DEFAULT_ELECTRICITY_FORMULA, validateElectricityFormula } from './formula'

const optionFields: Field[] = [
  { name: 'label', type: 'text', required: true, localized: true },
  { name: 'value', type: 'number', required: true, min: 0 },
  { name: 'monthlyPrice', type: 'number', required: true, min: 0, defaultValue: 0 },
]

const powerOptionFields: Field[] = [
  { name: 'label', type: 'text', required: true, localized: true },
  { name: 'value', type: 'number', required: true, min: 0, label: 'Power (W)' },
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
        { name: 'monthlyPricePerUnit', type: 'number', required: true, min: 0, defaultValue: 1000 },
      ],
    },
    {
      name: 'installationPrice',
      type: 'number',
      required: true,
      min: 0,
      defaultValue: 1000,
      admin: {
        description:
          'Fixed one-time installation price. It is not multiplied by the number of rack units.',
      },
    },
    {
      name: 'electricitySettings',
      type: 'group',
      label: 'Electricity calculation',
      admin: {
        description: 'Formula: power (W) / 1000 × hours per day × days per month × price per kWh.',
      },
      fields: [
        {
          name: 'pricePerKwh',
          type: 'number',
          required: true,
          min: 0,
          defaultValue: 18.7,
          label: 'Price, UAH/kWh',
        },
        {
          name: 'hoursPerDay',
          type: 'number',
          required: true,
          min: 0,
          max: 24,
          defaultValue: 24,
          label: 'Hours per day',
        },
        {
          name: 'daysPerMonth',
          type: 'number',
          required: true,
          min: 1,
          max: 31,
          defaultValue: 30,
          label: 'Days per month',
        },
        {
          name: 'formula',
          type: 'text',
          required: true,
          defaultValue: DEFAULT_ELECTRICITY_FORMULA,
          validate: validateElectricityFormula,
          label: 'Formula',
          admin: {
            description:
              'Available variables: powerW, hoursPerDay, daysPerMonth, pricePerKwh. Operators: +, -, *, / and parentheses.',
          },
        },
      ],
    },
    {
      name: 'powerOptions',
      type: 'array',
      required: true,
      minRows: 1,
      label: 'Power supply options',
      admin: {
        description: 'Потужність у ватах. Ціна автоматично обчислюється за формулою.',
        components: { Field: '@/blocks/colocation-calculator/AdminOptionsTable#AdminOptionsTable' },
      },
      fields: powerOptionFields,
    },
    {
      name: 'ipOptions',
      type: 'array',
      required: true,
      minRows: 1,
      label: 'IP address options',
      admin: {
        description: 'Кількість публічних IP та фіксована місячна ціна.',
        components: { Field: '@/blocks/colocation-calculator/AdminOptionsTable#AdminOptionsTable' },
      },
      fields: optionFields,
    },
    {
      name: 'speedOptions',
      type: 'array',
      required: true,
      minRows: 1,
      label: 'Internet speed options',
      admin: {
        description: 'Швидкість підключення та фіксована місячна ціна.',
        components: { Field: '@/blocks/colocation-calculator/AdminOptionsTable#AdminOptionsTable' },
      },
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
        {
          name: 'monthlySuffix',
          type: 'text',
          required: true,
          localized: true,
          defaultValue: '/ місяць',
        },
        { name: 'vatNote', type: 'text', localized: true },
        {
          name: 'calculationDetails',
          type: 'text',
          required: true,
          localized: true,
          defaultValue: 'Деталі розрахунку',
        },
      ],
    },
    {
      name: 'backupForSeed',
      type: 'ui',
      admin: {
        components: {
          Field: '@/blocks/colocation-calculator/BackupButton#BackupButton',
        },
      },
    },
  ],
}
