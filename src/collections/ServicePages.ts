import type { CollectionConfig } from 'payload'
import { HeroBlock } from '@/blocks/hero/config'
import { PartnersBlock } from '@/blocks/partners/config'
import { AdvantagesBlock } from '@/blocks/advantages/config'
import { FaqBlock } from '@/blocks/faq/config'
import { ConsultationBlock } from '@/blocks/consultation/config'
import { ArchitectureBlock } from '@/blocks/architecture/config'
import { SimpleContentBlock } from '@/blocks/simple-content/config'
import { VpsPricingCardsBlock } from '@/blocks/vps-pricing-cards/config'
import {
  getCachedCategories,
  getCachedProductsForAdmin,
  revalidateVpsPricingCache,
} from '@/blocks/vps-pricing-cards/get-live-products'

/**
 * Product/service pages tied to billing data (VPS, Colocation) — kept apart
 * from the generic `Pages` collection because they carry HostBill-specific
 * fields (hostbillCategoryId/hostbillProductId, see vps-pricing-cards) that
 * a plain content page never will. One document per slug (same native
 * `localized: true` model as `Pages`), not one per locale.
 */
export const ServicePages: CollectionConfig = {
  slug: 'service-pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'publicationStatus'],
  },
  access: {
    read: () => true,
  },
  endpoints: [
    {
      path: '/revalidate-vps-pricing',
      method: 'post',
      // Backs the "Оновити ціни з HostBill зараз" button on the
      // vps-pricing-cards block (RevalidatePricingButton.tsx). Authenticated
      // by the admin session (req.user), not a shared secret — that's the
      // public curl/automation route, src/app/api/revalidate-vps-pricing.
      handler: async (req) => {
        if (!req.user) {
          return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 })
        }

        const categoryId = req.searchParams.get('categoryId')
        if (!categoryId) {
          return Response.json({ success: false, error: 'Missing "categoryId" query param' }, { status: 400 })
        }

        revalidateVpsPricingCache(categoryId)
        return Response.json({ success: true, revalidated: true, categoryId })
      },
    },
    {
      path: '/hostbill-categories',
      method: 'get',
      // Backs HostbillCategorySelect.tsx's dropdown — admin-session-only,
      // same auth pattern as the revalidate endpoint above.
      handler: async (req) => {
        if (!req.user) {
          return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 })
        }

        try {
          const categories = await getCachedCategories()
          return Response.json({ success: true, categories })
        } catch (error) {
          return Response.json(
            { success: false, error: error instanceof Error ? error.message : 'Failed to list categories' },
            { status: 502 },
          )
        }
      },
    },
    {
      path: '/hostbill-products',
      method: 'get',
      // Backs RecommendedProductSelect.tsx's cascading dropdown — lists ALL
      // products in the category (not just visible ones), so an editor can
      // see and pick a recommendation even for a currently-hidden product.
      handler: async (req) => {
        if (!req.user) {
          return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 })
        }

        const categoryId = req.searchParams.get('categoryId')
        if (!categoryId) {
          return Response.json({ success: false, error: 'Missing "categoryId" query param' }, { status: 400 })
        }

        try {
          const products = await getCachedProductsForAdmin(categoryId)
          return Response.json({
            success: true,
            products: products.map((product) => ({ id: product.id, name: product.name })),
          })
        } catch (error) {
          return Response.json(
            { success: false, error: error instanceof Error ? error.message : 'Failed to list products' },
            { status: 502 },
          )
        }
      },
    },
  ],
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Internal reference name — not necessarily rendered on the page.',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Used to resolve the page\'s address, e.g. "vps". Same for every locale.',
      },
    },
    {
      name: 'blocks',
      type: 'blocks',
      blocks: [
        HeroBlock,
        PartnersBlock,
        VpsPricingCardsBlock,
        ConsultationBlock,
        ArchitectureBlock,
        AdvantagesBlock,
        FaqBlock,
        SimpleContentBlock,
      ],
    },
    {
      name: 'publicationStatus',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      // Shared across all locales (not localized) — see Pages.ts for the
      // same note on fallback-to-ua behavior for untranslated fields.
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
    },
  ],
}
