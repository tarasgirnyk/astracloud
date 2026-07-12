import type { Block } from 'payload'

/**
 * Static demo pricing cards for the VPS product page — intentionally NOT
 * editable in the admin and NOT translated per-locale (same content on
 * every locale). This is a placeholder for a future HostBill-driven
 * pricing integration; until then it's just inserted as-is, per the
 * design mockup (design-handoff/project/templates/vps/vps.html).
 */
export const VpsPricingCardsBlock: Block = {
  slug: 'vps-pricing-cards',
  labels: {
    singular: 'VPS pricing cards (static demo)',
    plural: 'VPS pricing cards (static demo)',
  },
  fields: [],
}
