export interface ProductCategory {
  id: string
  name: string
  slug: string
}

export interface ProductSummary {
  id: string
  name: string
  fromPrice: { amount: number; currency: string }
}

export interface ProductDetails extends ProductSummary {
  specs: Record<string, string>
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
  listProducts(params: { categoryId: string }): Promise<ProductSummary[]>
  getProductDetails(params: { categoryId: string; productId: string }): Promise<ProductDetails>
  listCurrencies(): Promise<CurrencyOption[]>
}
