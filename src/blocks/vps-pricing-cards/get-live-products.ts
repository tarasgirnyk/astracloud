import { revalidateTag, unstable_cache } from 'next/cache'
import { getProductCatalogProvider, type ProductCategory, type ProductSummary } from '@/billing-adapter/ports'

const REVALIDATE_SECONDS = 600
// Admin-only convenience (category picker) — categories change far less
// often than prices, and staleness here has no customer-facing cost.
const CATEGORIES_REVALIDATE_SECONDS = 1800

/**
 * Cache tag naming is shared with the manual revalidate route
 * (src/app/api/revalidate-vps-pricing/route.ts) — keep the two in sync.
 */
export function vpsPricingCacheTag(hostbillCategoryId: string): string {
  return `hostbill-vps-pricing:${hostbillCategoryId}`
}

export function hostbillCategoriesCacheTag(): string {
  return 'hostbill-categories'
}

/**
 * Live HostBill product list for one category, filtered to only
 * visible/active products — this is the public-facing card list. Behind a
 * short time-based cache — not stored as CMS content (constitution
 * Principle VIII: prices are always fetched live, never duplicated into
 * Payload). The cache exists only to avoid hitting HostBill on every
 * visitor request; `pnpm` operators can force an immediate refresh via the
 * revalidate route after changing a price in HostBill, instead of waiting
 * out the TTL.
 */
export async function getCachedVpsProducts(hostbillCategoryId: string): Promise<ProductSummary[]> {
  const cached = unstable_cache(
    async (categoryId: string) => getProductCatalogProvider().listProducts({ categoryId, visible: true }),
    ['vps-pricing-cards', hostbillCategoryId],
    { revalidate: REVALIDATE_SECONDS, tags: [vpsPricingCacheTag(hostbillCategoryId)] },
  )
  return cached(hostbillCategoryId)
}

/**
 * Unfiltered product list for one category — used by the admin's
 * "recommended product" picker, which should show inactive/hidden products
 * too (an editor picking a recommendation benefits from seeing everything
 * in the category, even if a hidden product won't actually get a badge on
 * the public page). Tagged the same as the public list so one "revalidate"
 * click refreshes both.
 */
export async function getCachedProductsForAdmin(hostbillCategoryId: string): Promise<ProductSummary[]> {
  const cached = unstable_cache(
    async (categoryId: string) => getProductCatalogProvider().listProducts({ categoryId }),
    ['vps-pricing-cards-admin', hostbillCategoryId],
    { revalidate: REVALIDATE_SECONDS, tags: [vpsPricingCacheTag(hostbillCategoryId)] },
  )
  return cached(hostbillCategoryId)
}

/**
 * HostBill order-page/category list — powers the admin's category
 * dropdown (see HostbillCategorySelect.tsx). Longer TTL than pricing since
 * this is an admin-only convenience, not something a site visitor waits on.
 */
export async function getCachedCategories(): Promise<ProductCategory[]> {
  const cached = unstable_cache(
    async () => getProductCatalogProvider().listCategories(),
    ['vps-pricing-cards-categories'],
    { revalidate: CATEGORIES_REVALIDATE_SECONDS, tags: [hostbillCategoriesCacheTag()] },
  )
  return cached()
}

/**
 * Shared by both cache-refresh entry points — the secret-guarded public
 * route (src/app/api/revalidate-vps-pricing/route.ts, for curl/automation)
 * and the Payload admin endpoint (session-authenticated, for the "Оновити
 * ціни зараз" button on the block) — so the invalidation semantics
 * (`{ expire: 0 }`, see get-live-products.ts's own history) only live once.
 * Also refreshes the categories cache, since one button press is meant to
 * bring everything HostBill-related in the admin up to date at once.
 */
export function revalidateVpsPricingCache(hostbillCategoryId: string): void {
  revalidateTag(vpsPricingCacheTag(hostbillCategoryId), { expire: 0 })
  revalidateTag(hostbillCategoriesCacheTag(), { expire: 0 })
}
