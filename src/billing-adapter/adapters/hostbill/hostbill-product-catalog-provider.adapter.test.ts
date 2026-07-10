import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { BillingAdapterError } from '@/billing-adapter/ports/errors'
import { createHostbillProductCatalogProvider } from './hostbill-product-catalog-provider.adapter'

const ORIGINAL_ENV = { ...process.env }

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

describe('HostBill ProductCatalogProvider adapter', () => {
  beforeEach(() => {
    process.env.HOSTBILL_API_URL = 'https://cp.astra.in.ua/admin/api.php'
    process.env.HOSTBILL_PORTAL_READONLY_API_ID = 'test-id'
    process.env.HOSTBILL_PORTAL_READONLY_API_KEY = 'test-key'
  })

  afterEach(() => {
    process.env = { ...ORIGINAL_ENV }
    vi.unstubAllGlobals()
  })

  it('maps a successful getOrderPages response into ProductCategory[] (contract: listCategories)', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        jsonResponse({
          success: true,
          categories: [{ id: '1', name: 'Linux VPS', slug: 'linux-vps' }],
        }),
      ),
    )

    const provider = createHostbillProductCatalogProvider()
    const categories = await provider.listCategories()

    expect(categories).toEqual([{ id: '1', name: 'Linux VPS', slug: 'linux-vps' }])
  })

  it('maps a successful getProducts response into ProductSummary[] (contract: listProducts, scoped by category)', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        jsonResponse({
          success: true,
          // Confirmed against the real HostBill instance: products are
          // keyed by ID, pricing is a flat "m" (monthly) field — not a
          // per-currency breakdown.
          products: {
            7: { id: '7', name: 'VPS Standart', m: '750.00' },
          },
        }),
      ),
    )

    const provider = createHostbillProductCatalogProvider()
    const products = await provider.listProducts({ categoryId: '1' })

    expect(products).toEqual([{ id: '7', name: 'VPS Standart', fromPrice: { amount: 750, currency: 'UAH' } }])
  })

  it('throws a BillingAdapterError (not a raw HostBill payload) when HostBill reports failure', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(jsonResponse({ success: false, error: 'Invalid API credentials' })),
    )

    const provider = createHostbillProductCatalogProvider()

    await expect(provider.listProducts({ categoryId: '1' })).rejects.toBeInstanceOf(BillingAdapterError)
  })

  it('throws a "connection" BillingAdapterError when HostBill is unreachable', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('fetch failed')))

    const provider = createHostbillProductCatalogProvider()

    await expect(provider.listProducts({ categoryId: '1' })).rejects.toMatchObject({
      billingCause: 'connection',
    })
  })
})
