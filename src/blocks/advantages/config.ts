import type { Block } from 'payload'

/**
 * "Надійна інфраструктура" dark section — intro copy + a 6-item icon grid.
 * Icons are plain-text/emoji per the design-handoff brief, OR one of the
 * curated SVG icon keys in Component.tsx's ICONS map (target/lock/gauge/
 * trend/headset/shield) — see design-handoff README "Iconography".
 */
export const AdvantagesBlock: Block = {
  slug: 'advantages',
  labels: {
    singular: 'Advantages section',
    plural: 'Advantages sections',
  },
  fields: [
    {
      name: 'tone',
      type: 'select',
      defaultValue: 'dark',
      options: [
        { label: 'Dark (navy gradient)', value: 'dark' },
        { label: 'Light (gray)', value: 'light' },
      ],
    },
    {
      name: 'centered',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description:
          'Centered variant: center-aligned intro, eyebrow rendered as a pill badge, a decorative glow blob, and richer grid cards (numbered, dark surface, SVG icons). Independent of "tone" so it can\'t change other instances of this block.',
      },
    },
    {
      name: 'splitLayout',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description:
          'Split-layout variant: intro copy and the grid sit side by side (wraps to stacked on narrow screens), bullets get a check-badge icon, the tagline gets a top divider + check-badge, and grid cards use a dark surface with SVG icons. Independent of "tone"/"centered" so it can\'t change other instances of this block.',
      },
    },
    { name: 'eyebrow', type: 'text', localized: true },
    { name: 'heading', type: 'text', required: true, localized: true },
    { name: 'description', type: 'textarea', localized: true },
    {
      name: 'accent',
      type: 'select',
      defaultValue: 'orange',
      admin: { description: 'Icon tint for the centered variant\'s grid cards. No effect otherwise.' },
      options: [
        { label: 'Orange', value: 'orange' },
        { label: 'Cyan', value: 'cyan' },
        { label: 'Violet', value: 'violet' },
      ],
    },
    {
      name: 'bullets',
      type: 'array',
      fields: [{ name: 'text', type: 'text', required: true, localized: true }],
    },
    {
      name: 'tagline',
      type: 'text',
      localized: true,
      admin: { description: 'Short bold closing line under the bullet list.' },
    },
    {
      name: 'statsBar',
      type: 'array',
      admin: {
        description:
          'Optional stat strip under the intro copy (centered variant only), e.g. "24/7 — моніторинг та підтримка".',
      },
      fields: [
        { name: 'value', type: 'text', required: true, localized: true },
        { name: 'label', type: 'text', required: true, localized: true },
      ],
    },
    {
      name: 'grid',
      type: 'array',
      admin: { description: '6-item icon+title+text grid rendered below the intro copy.' },
      fields: [
        {
          name: 'icon',
          type: 'text',
          admin: {
            description:
              'Emoji glyph (e.g. 💸), or one of the ICONS keys: target/lock/gauge/trend/headset/shield (centered variant) / refund/support/speed/monitor/launch/backup (split-layout variant).',
          },
        },
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'text', type: 'textarea', required: true, localized: true },
      ],
    },
  ],
}
