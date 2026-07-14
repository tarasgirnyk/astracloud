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

    expect(products).toEqual([
      { id: '7', name: 'VPS Standart', fromPrice: { amount: 750, currency: 'UAH' }, specs: [] },
    ])
  })

  it('parses the raw "Label:Value<br>..." description into specs, dropping malformed segments', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        jsonResponse({
          success: true,
          products: {
            5: {
              id: '5',
              name: 'VPS Nano',
              m: '150.00',
              description: 'CPU:1 Core<br>RAM:1 Gb<br><ul></ul>',
            },
          },
        }),
      ),
    )

    const provider = createHostbillProductCatalogProvider()
    const [product] = await provider.listProducts({ categoryId: '1' })

    expect(product?.specs).toEqual([
      { label: 'CPU', value: '1 Core' },
      { label: 'RAM', value: '1 Gb' },
    ])
  })

  it('filters out products with visible:"0" when visible:true is requested (client-side — HostBill\'s own visible request param is a no-op)', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        jsonResponse({
          success: true,
          products: {
            5: { id: '5', name: 'VPS Nano', m: '150.00', visible: '1' },
            22: { id: '22', name: 'VPS Custom', m: '0.00', visible: '0' },
          },
        }),
      ),
    )

    const provider = createHostbillProductCatalogProvider()
    const visibleOnly = await provider.listProducts({ categoryId: '1', visible: true })

    expect(visibleOnly.map((p) => p.id)).toEqual(['5'])
  })

  it('returns every product, visible or not, when visible is omitted', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        jsonResponse({
          success: true,
          products: {
            5: { id: '5', name: 'VPS Nano', m: '150.00', visible: '1' },
            22: { id: '22', name: 'VPS Custom', m: '0.00', visible: '0' },
          },
        }),
      ),
    )

    const provider = createHostbillProductCatalogProvider()
    const all = await provider.listProducts({ categoryId: '1' })

    expect(all.map((p) => p.id).sort()).toEqual(['22', '5'])
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
