export interface ProductCategory {
  id: string
  name: string
  slug: string
}

/**
 * One parsed line from HostBill's product `description` field (raw shape:
 * `"CPU:1 Core<br>RAM:1 Gb<br>..."`) — `label` is translated by the caller
 * via a small i18n dictionary; `value` is shown as-is (locale-agnostic
 * numbers/units), never translated.
 */
export interface ProductSpec {
  label: string
  value: string
}

export interface ProductSummary {
  id: string
  name: string
  fromPrice: { amount: number; currency: string }
  specs: ProductSpec[]
}

export interface ProductDetails extends ProductSummary {
  billingCycles: string[]
}

export interface CurrencyOption {
  code: string
  isDefault: boolean
}

/**
 * The only port this feature actually implements and exercises end-to-end
 * (User Story 3's connectivity smoke test) — see contracts/billing-adapter-ports.md.
 *
 * `listProducts` requires a `categoryId` because HostBill's `getProducts`
 * call is scoped by category — calling it with no category returns
 * `{ success: false }` with no error detail, confirmed against the real
 * HostBill instance. `listCategories()` (HostBill's `getOrderPages` call)
 * is how a caller discovers which category IDs exist.
 */
export interface ProductCatalogProvider {
  listCategories(): Promise<ProductCategory[]>
  /**
   * Pass `true` to list only products the HostBill admin has marked
   * visible/active. Filtered by the adapter itself, client-side, against
   * each product's own `visible` field in the response — HostBill's
   * `getProducts` *request* also accepts a `visible` param per its docs, but
   * it's a no-op against the real instance (confirmed: identical response
   * with or without it). Omit to get everything in the category (used by
   * admin tooling, e.g. the "pick a recommended product" dropdown, which
   * should show inactive products too so an editor can see what's there).
   */
  listProducts(params: { categoryId: string; visible?: boolean }): Promise<ProductSummary[]>
  getProductDetails(params: { categoryId: string; productId: string }): Promise<ProductDetails>
  listCurrencies(): Promise<CurrencyOption[]>
}
