import type { Block } from 'payload'

/**
 * VPS product page pricing cards — fully live, no per-plan CMS content
 * (constitution Principle VIII: never duplicate billing data into Payload).
 * Every visible product in `hostbillCategoryId`'s HostBill category becomes
 * a card at render time (name, price, and specs all come from HostBill);
 * adding/hiding/deactivating a tariff in HostBill is the only way to
 * change what's shown here — see get-live-products.ts and Component.tsx.
 */
export const VpsPricingCardsBlock: Block = {
  slug: 'vps-pricing-cards',
  labels: {
    singular: 'VPS pricing cards',
    plural: 'VPS pricing cards',
  },
  fields: [
    { name: 'eyebrow', type: 'text', localized: true, admin: { description: 'Small label above the heading (e.g. "VPS-сервери").' } },
    { name: 'heading', type: 'text', required: true, localized: true },
    { name: 'subheading', type: 'text', localized: true },
    {
      name: 'hostbillCategoryId',
      type: 'text',
      required: true,
      admin: {
        description:
          'HostBill order-page/category ID (the "id" field from the getOrderPages API call) that this block lists live products from.',
        components: {
          Field: '@/blocks/vps-pricing-cards/HostbillCategorySelect#HostbillCategorySelect',
        },
      },
    },
    {
      name: 'recommendedProductId',
      type: 'text',
      admin: {
        description:
          'Optional HostBill product ID to highlight with a "Recommended" badge — only shows if that product is currently visible in HostBill.',
        components: {
          Field: '@/blocks/vps-pricing-cards/RecommendedProductSelect#RecommendedProductSelect',
        },
      },
    },
    {
      name: 'revalidatePricingButton',
      type: 'ui',
      admin: {
        components: {
          Field: '@/blocks/vps-pricing-cards/RevalidatePricingButton#RevalidatePricingButton',
        },
      },
    },
  ],
}
