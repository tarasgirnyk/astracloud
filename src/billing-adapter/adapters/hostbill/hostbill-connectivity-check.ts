import { createHostbillProductCatalogProvider } from './hostbill-product-catalog-provider.adapter.ts'

/**
 * Manual smoke test for User Story 3 (quickstart.md): proves the platform
 * can retrieve real product data from HostBill using only the
 * `portal-readonly` scoped key, before anything customer-facing is built on
 * top of billing data. Run with `pnpm billing:check`.
 *
 * HostBill's `getProducts` is scoped by category, so this first lists
 * categories (`getOrderPages`) and then products within the first one that
 * actually has products — proving the full real-world call shape, not just
 * a bare "can we reach the server" check.
 */
async function main() {
  console.log('Checking HostBill connectivity (portal-readonly key)...')

  const provider = createHostbillProductCatalogProvider()

  const categories = await provider.listCategories()
  if (categories.length === 0) {
    console.error('Connected, but HostBill returned zero categories — check the account has product categories.')
    process.exitCode = 1
    return
  }
  console.log(`✔ Connected. Retrieved ${categories.length} categor${categories.length === 1 ? 'y' : 'ies'} from HostBill.`)

  const categoryWithProducts = categories.find((category) => category.slug) ?? categories[0]
  if (!categoryWithProducts) {
    console.error('No category available to list products from.')
    process.exitCode = 1
    return
  }

  const products = await provider.listProducts({ categoryId: categoryWithProducts.id })

  if (products.length === 0) {
    console.log(`  (category "${categoryWithProducts.name}" has no products — trying is still a success)`)
    return
  }

  console.log(`✔ Retrieved ${products.length} product(s) from category "${categoryWithProducts.name}":`)
  for (const product of products) {
    console.log(`  - ${product.name} (id: ${product.id}) — from ${product.fromPrice.amount} ${product.fromPrice.currency}`)
  }
}

main().catch((error: unknown) => {
  console.error('✘ HostBill connectivity check failed:')
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
