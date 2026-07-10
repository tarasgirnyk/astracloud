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
 */
export interface ProductCatalogProvider {
  listProducts(params: { groupSlug?: string }): Promise<ProductSummary[]>
  getProductDetails(productId: string): Promise<ProductDetails>
  listCurrencies(): Promise<CurrencyOption[]>
}
