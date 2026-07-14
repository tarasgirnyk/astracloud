import { createHostbillProductCatalogProvider } from '../adapters/hostbill/hostbill-product-catalog-provider.adapter'
import type { ProductCatalogProvider } from './product-catalog-provider.port'

/**
 * The one place outside `adapters/hostbill/` allowed to import it directly —
 * this file lives in `ports/`, not under `src/app`, so it isn't subject to
 * the `eslint-plugin-boundaries` rule that blocks `app`-type code from
 * reaching into `billing-adapter/adapters/**` (constitution Principle I).
 * Everything under `src/app` (pages, blocks, route handlers) must call this
 * factory instead of importing the adapter module itself.
 */
export function getProductCatalogProvider(): ProductCatalogProvider {
  return createHostbillProductCatalogProvider()
}
