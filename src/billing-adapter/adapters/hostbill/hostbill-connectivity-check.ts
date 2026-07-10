import { createHostbillProductCatalogProvider } from './hostbill-product-catalog-provider.adapter.ts'

/**
 * Manual smoke test for User Story 3 (quickstart.md): proves the platform
 * can retrieve real product data from HostBill using only the
 * `portal-readonly` scoped key, before anything customer-facing is built on
 * top of billing data. Run with `pnpm billing:check`.
 */
async function main() {
  console.log('Checking HostBill connectivity (portal-readonly key)...')

  const provider = createHostbillProductCatalogProvider()
  const products = await provider.listProducts({})

  if (products.length === 0) {
    console.error('Connected, but HostBill returned zero products — check the account has active products.')
    process.exitCode = 1
    return
  }

  console.log(`✔ Connected. Retrieved ${products.length} product(s) from HostBill:`)
  for (const product of products) {
    console.log(`  - ${product.name} (id: ${product.id}) — from ${product.fromPrice.amount} ${product.fromPrice.currency}`)
  }
}

main().catch((error: unknown) => {
  console.error('✘ HostBill connectivity check failed:')
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
