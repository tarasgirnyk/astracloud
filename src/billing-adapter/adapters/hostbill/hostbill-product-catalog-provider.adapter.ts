import { BillingAdapterError } from '../../ports/errors.ts'
import type {
  CurrencyOption,
  ProductCatalogProvider,
  ProductDetails,
  ProductSummary,
} from '../../ports/product-catalog-provider.port.ts'
import { callHostbill } from './hostbill-client.ts'
import { getHostbillReadonlyConfig } from './hostbill.config.ts'

interface HostbillProductRaw {
  id: string
  name: string
  pricing?: Record<string, { monthly?: string }>
}

interface HostbillGetProductsResponse {
  products?: Record<string, HostbillProductRaw>
}

interface HostbillGetCurrenciesResponse {
  currencies?: Record<string, { code: string; isdefault?: string }>
}

function toProductSummary(raw: HostbillProductRaw): ProductSummary {
  const firstCurrency = raw.pricing ? Object.entries(raw.pricing)[0] : undefined
  const amount = firstCurrency?.[1]?.monthly ? Number.parseFloat(firstCurrency[1].monthly) : 0
  const currency = firstCurrency?.[0] ?? 'UAH'

  return {
    id: raw.id,
    name: raw.name,
    fromPrice: { amount, currency },
  }
}

/**
 * The only HostBill-backed port implementation this feature exercises
 * end-to-end (User Story 3). Everything HostBill-shaped (the `products`
 * object keyed by ID, raw pricing strings, etc.) is translated into the
 * port's own domain shape here and never leaks past this file.
 */
export function createHostbillProductCatalogProvider(): ProductCatalogProvider {
  const config = getHostbillReadonlyConfig()

  return {
    async listProducts({ groupSlug }) {
      const response = await callHostbill<HostbillGetProductsResponse>(config, 'getProducts', {
        ...(groupSlug ? { groupname: groupSlug } : {}),
      })

      if (!response.products) {
        throw new BillingAdapterError('invalid_response', 'HostBill getProducts response had no "products" field')
      }

      return Object.values(response.products).map(toProductSummary)
    },

    async getProductDetails(productId) {
      const response = await callHostbill<HostbillGetProductsResponse>(config, 'getProducts', {
        id: productId,
      })

      const raw = response.products ? Object.values(response.products)[0] : undefined
      if (!raw) {
        throw new BillingAdapterError('not_found', `HostBill has no product with id "${productId}"`)
      }

      const summary = toProductSummary(raw)
      return {
        ...summary,
        specs: {},
        billingCycles: raw.pricing ? Object.keys(raw.pricing) : [],
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
