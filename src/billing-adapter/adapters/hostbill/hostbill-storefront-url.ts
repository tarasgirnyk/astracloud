/**
 * Builds a HostBill order link for a specific product — `cart/<category
 * slug>/?id=<id>` on this instance's storefront template. The category slug
 * is required: without it HostBill redirects straight to the login form
 * instead of the cart (confirmed against the dev instance). "Замовити"
 * hands checkout off to HostBill directly this way. Separate from
 * HOSTBILL_API_URL (the admin/api.php endpoint the server-side adapters
 * call) — this is the customer-facing portal domain the browser navigates
 * to (currently a dev VM, see .env.example).
 *
 * No custom draft-order checkout flow exists yet (would need
 * HOSTBILL_PORTAL_ACTIONS_* and the Pay Now plugin — see
 * hostbill-checkout-api-findings memory); this is the interim link.
 */
export function getHostbillOrderUrl(categorySlug: string, productId: string): string {
  const storefrontUrl = process.env.HOSTBILL_STOREFRONT_URL
  if (!storefrontUrl) return '#'

  const base = storefrontUrl.endsWith('/') ? storefrontUrl : `${storefrontUrl}/`
  return `${base}cart/${encodeURIComponent(categorySlug)}/?id=${encodeURIComponent(productId)}`
}

/**
 * Expands the portable `/affiliates/signup` sentinel — the path CMS content
 * authors write for the "Зареєструватися" CTA on the Партнерка (affiliate
 * program) page — into an absolute HostBill storefront URL at render time,
 * reading the same HOSTBILL_STOREFRONT_URL env var as getHostbillOrderUrl
 * above. Any other href (in-page anchor, relative site path) passes through
 * unchanged; this only rewrites that one specific sentinel so a plain string
 * field on the Hero block config doesn't need to hardcode a per-environment
 * domain (dev VM vs. prod).
 */
export function resolveHostbillHref(href: string | null | undefined): string | null | undefined {
  if (href !== '/affiliates/signup') return href

  const storefrontUrl = process.env.HOSTBILL_STOREFRONT_URL
  if (!storefrontUrl) return '#'

  const base = storefrontUrl.endsWith('/') ? storefrontUrl : `${storefrontUrl}/`
  return `${base}affiliates/signup`
}
