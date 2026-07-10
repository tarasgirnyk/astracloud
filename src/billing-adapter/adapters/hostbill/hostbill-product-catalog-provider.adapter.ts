import { BillingAdapterError } from '../../ports/errors.ts'
import type {
  CurrencyOption,
  ProductCatalogProvider,
  ProductCategory,
  ProductDetails,
  ProductSummary,
} from '../../ports/product-catalog-provider.port.ts'
import { callHostbill } from './hostbill-client.ts'
import { getHostbillReadonlyConfig } from './hostbill.config.ts'

interface HostbillProductRaw {
  id: string
  name: string
  /** Monthly price, as a decimal string (HostBill's own field name). */
  m?: string
  description?: string
}

interface HostbillGetProductsResponse {
  products?: Record<string, HostbillProductRaw>
}

interface HostbillCategoryRaw {
  id: string
  name: string
  slug: string
}

interface HostbillGetOrderPagesResponse {
  categories?: HostbillCategoryRaw[]
}

interface HostbillGetCurrenciesResponse {
  currencies?: Record<string, { code: string; isdefault?: string }>
}

function toProductSummary(raw: HostbillProductRaw): ProductSummary {
  const amount = raw.m ? Number.parseFloat(raw.m) : 0
  return {
    id: raw.id,
    name: raw.name,
    // HostBill returns pricing in the account's base currency, not a
    // per-currency breakdown — multi-currency display (UAH/USD/EUR
    // switcher) is a separate concern for whichever feature actually
    // renders prices, not this connectivity-proving adapter.
    fromPrice: { amount, currency: 'UAH' },
  }
}

/**
 * The only HostBill-backed port implementation this feature exercises
 * end-to-end (User Story 3). Everything HostBill-shaped (categories as an
 * array, products keyed by ID, raw pricing field names like `m`) is
 * translated into the port's own domain shape here and never leaks past
 * this file.
 *
 * Confirmed against the real HostBill instance: `getProducts` is scoped by
 * category — it requires an `id` parameter (a category ID, from
 * `getOrderPages`) and returns `{ success: false }` with no error detail if
 * called without one. That is not a permissions problem; it looks like one
 * because HostBill doesn't say why a call failed.
 */
export function createHostbillProductCatalogProvider(): ProductCatalogProvider {
  const config = getHostbillReadonlyConfig()

  return {
    async listCategories() {
      const response = await callHostbill<HostbillGetOrderPagesResponse>(config, 'getOrderPages')

      if (!response.categories) {
        throw new BillingAdapterError(
          'invalid_response',
          'HostBill getOrderPages response had no "categories" field',
        )
      }

      return response.categories.map(
        (category): ProductCategory => ({
          id: category.id,
          name: category.name,
          slug: category.slug,
        }),
      )
    },

    async listProducts({ categoryId }) {
      const response = await callHostbill<HostbillGetProductsResponse>(config, 'getProducts', {
        id: categoryId,
      })

      if (!response.products) {
        throw new BillingAdapterError('invalid_response', 'HostBill getProducts response had no "products" field')
      }

      return Object.values(response.products).map(toProductSummary)
    },

    async getProductDetails({ categoryId, productId }) {
      const response = await callHostbill<HostbillGetProductsResponse>(config, 'getProducts', {
        id: categoryId,
      })

      const raw = response.products?.[productId]
      if (!raw) {
        throw new BillingAdapterError(
          'not_found',
          `HostBill has no product "${productId}" in category "${categoryId}"`,
        )
      }

      const summary = toProductSummary(raw)
      const specs: Record<string, string> = {}
      if (raw.description) {
        specs.description = raw.description
      }
      return {
        ...summary,
        specs,
        // Per-cycle pricing (quarterly/annual/etc.) is left empty here —
        // refine when the VPS-page feature actually needs it.
        billingCycles: [],
      } satisfies ProductDetails
    },

    async listCurrencies() {
      const response = await callHostbill<HostbillGetCurrenciesResponse>(config, 'getCurrencies')

      if (!response.currencies) {
        throw new BillingAdapterError('invalid_response', 'HostBill getCurrencies response had no "currencies" field')
      }

      return Object.values(response.currencies).map(
        (currency): CurrencyOption => ({
          code: currency.code,
          isDefault: currency.isdefault === '1' || currency.isdefault === 'true',
        }),
      )
    },
  }
}
