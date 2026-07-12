import type { GlobalConfig } from 'payload'

/**
 * Header/Footer are site-wide singletons, not repeatable content — modeled
 * as a Payload Global, not a block (see research.md §5). `supportedLocales`
 * and `supportedCurrencies` are fixed lists in this feature (display-only
 * selectors); they become editor-configurable only if a real need for that
 * shows up later.
 */
export const SiteChrome: GlobalConfig = {
  slug: 'site-chrome',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navLinks',
      type: 'array',
      localized: true,
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
        {
          name: 'children',
          type: 'array',
          admin: {
            description: 'Optional dropdown sub-items (e.g. "Компанія" submenu).',
          },
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'href', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'cabinetLabel',
      type: 'text',
      localized: true,
      admin: {
        description: 'Header CTA button label (e.g. "Кабінет").',
      },
    },
    {
      name: 'cabinetHref',
      type: 'text',
      admin: {
        description: 'Client portal link. Not locale-specific — the portal itself has no locale yet.',
      },
    },
    {
      name: 'footerColumns',
      type: 'array',
      localized: true,
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'links',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'href', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'footerAddress',
      type: 'text',
      localized: true,
      admin: {
        description: 'Short address line under the footer logo (e.g. "Україна, м. Львів.").',
      },
    },
    {
      name: 'copyrightText',
      type: 'text',
      localized: true,
      admin: {
        description: 'Footer copyright line.',
      },
    },
  ],
}

/** Fixed, not editor-configurable in this feature — see FR-005. */
export const SUPPORTED_LOCALES = ['ua', 'en', 'pl'] as const
export const SUPPORTED_CURRENCIES = ['UAH', 'USD', 'EUR'] as const
