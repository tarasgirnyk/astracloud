import { Fragment } from 'react'
import { getTranslations } from 'next-intl/server'
import { PricingTable, type PricingColumn, type PricingRow } from '@/components/PricingTable'
import { getCachedVpsProducts, getCachedCategories } from '@/blocks/vps-pricing-cards/get-live-products'
import { getHostbillOrderUrl } from '@/billing-adapter/adapters/hostbill/hostbill-storefront-url'

export interface ServiceItem {
  anchorId?: string | null
  eyebrow?: string | null
  title: string
  description: string
  bullets?: { text: string }[] | null
  ctaLabel?: string | null
  ctaHref?: string | null
  checklist?: { text: string }[] | null
  pricingTableHostbillCategoryId?: string | null
}

export interface ServicesBlockProps {
  blockType: 'services'
  heading: string
  subheading?: string | null
  services?: ServiceItem[] | null
  paymentMethodsLabel?: string | null
  paymentMethods?: { name: string }[] | null
}

// Same logos/style as the VPS page's payment-methods row (vps-pricing-cards
// Component.tsx) — kept in sync manually since each block owns its own copy.
const PAYMENT_LOGOS: Record<string, string> = {
  Mastercard: '/images/payment/mastercard.svg',
  VISA: '/images/payment/visa.svg',
  Bitcoin: '/images/payment/bitcoin.svg',
  PayPal: '/images/payment/paypal.svg',
}

function Checkmark() {
  return (
    <span
      style={{
        flex: 'none',
        width: 24,
        height: 24,
        borderRadius: '50%',
        background: 'var(--brand-primary)',
        color: 'var(--white)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 13,
        lineHeight: 1,
      }}
    >
      ✓
    </span>
  )
}

function formatPrice(amount: number): string {
  return Number.isInteger(amount) ? amount.toString() : amount.toFixed(2)
}

/**
 * Live/cached price table for a service card (same HostBill-backed cache as
 * vps-pricing-cards — see get-live-products.ts) — renders in the compact
 * table layout used by the (static) Pricing block, rather than that block's
 * card grid, per the "table under the VPS card" request.
 */
async function ServicePricingTable({ hostbillCategoryId }: { hostbillCategoryId: string }) {
  const t = await getTranslations('vpsPricingCards')

  let products: Awaited<ReturnType<typeof getCachedVpsProducts>> = []
  try {
    products = await getCachedVpsProducts(hostbillCategoryId)
  } catch {
    // HostBill unreachable or misconfigured — render nothing rather than
    // failing the whole page (same fallback as vps-pricing-cards).
  }

  if (!products.length) {
    return null
  }

  // Order link needs the category's slug, not its numeric id (HostBill
  // redirects to the login form otherwise) — same lookup as
  // vps-pricing-cards' Component.tsx.
  let categorySlug: string | undefined
  try {
    const categories = await getCachedCategories()
    categorySlug = categories.find((category) => category.id === hostbillCategoryId)?.slug
  } catch {
    // Falls back to '#' below via getHostbillOrderUrl's own guard.
  }

  const columns: PricingColumn[] = [
    { key: 'plan', label: t('columns.plan') },
    { key: 'cpu', label: t('specLabels.CPU') },
    { key: 'ram', label: t('specLabels.RAM') },
    { key: 'disk', label: t('columns.disk') },
    { key: 'price', label: t('columns.price') },
    { key: 'order', label: '' },
  ]

  const rows: PricingRow[] = [...products]
    .sort((a, b) => a.fromPrice.amount - b.fromPrice.amount)
    .map((product) => {
      const orderHref = categorySlug ? getHostbillOrderUrl(categorySlug, product.id) : undefined
      // HostBill doesn't return every spec for every category (e.g. RAM/disk
      // are configurable-at-order for dedicated servers, not fixed) — when a
      // spec is missing, show a "select" link to the order page instead of a
      // bare dash, using the same order URL as the order button.
      const specCell = (label: string) => {
        const value = product.specs.find((spec) => spec.label === label)?.value
        return value ? { value } : { value: t('selectCta'), href: orderHref }
      }
      const cpu = specCell('CPU')
      const ram = specCell('RAM')
      const disk = specCell('NVME')
      const currency = t.has(`currencies.${product.fromPrice.currency}`)
        ? t(`currencies.${product.fromPrice.currency}`)
        : product.fromPrice.currency

      return {
        plan: product.name,
        cpu: cpu.value,
        cpuHref: cpu.href,
        ram: ram.value,
        ramHref: ram.href,
        disk: disk.value,
        diskHref: disk.href,
        price: `${formatPrice(product.fromPrice.amount)} ${t('pricePeriod', { currency })}`,
        order: t('orderCta'),
        orderHref,
      }
    })

  return <PricingTable columns={columns} rows={rows} />
}

export async function Services({
  heading,
  subheading,
  services,
  paymentMethodsLabel,
  paymentMethods,
}: ServicesBlockProps) {
  const items = services ?? []

  return (
    <section id="services" style={{ padding: 'var(--section-padding-y) 0', scrollMarginTop: 'var(--space-16)' }}>
      <style>{`
        @media (max-width: 768px) {
          .service-card { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <div className="ac-container">
        <h2
          style={{
            font: 'var(--text-display-lg)',
            color: 'var(--text-on-light)',
            textAlign: 'center',
            margin: '0 0 var(--space-4)',
          }}
        >
          {heading}
        </h2>
        {subheading ? (
          <p
            style={{
              font: 'var(--text-body-lg)',
              color: 'var(--text-on-light-muted)',
              textAlign: 'center',
              maxWidth: 560,
              margin: '0 auto var(--space-10)',
            }}
          >
            {subheading}
          </p>
        ) : null}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'calc(var(--section-padding-y) / 3)' }}>
          {items.map((service, index) => (
            <Fragment key={service.anchorId ?? index}>
              <div
                id={service.anchorId ?? undefined}
                className="service-card"
                style={{
                  border: '1px solid var(--brand-primary)',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--white)',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 'var(--space-16)',
                  alignItems: 'center',
                  padding: 'var(--space-8)',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  {service.eyebrow ? (
                    <span
                      style={{
                        font: 'var(--text-eyebrow)',
                        letterSpacing: 'var(--tracking-eyebrow)',
                        color: 'var(--brand-primary)',
                        textTransform: 'uppercase',
                      }}
                    >
                      {service.eyebrow}
                    </span>
                  ) : null}
                  <h3 style={{ font: 'var(--text-display-sm)', color: 'var(--text-on-light)' }}>{service.title}</h3>
                  <p style={{ font: 'var(--text-body-sm)', color: 'var(--text-on-light-muted)' }}>
                    {service.description}
                  </p>
                  {service.bullets?.length ? (
                    <ul
                      style={{
                        margin: 0,
                        paddingLeft: 18,
                        font: 'var(--text-body-sm)',
                        color: 'var(--text-on-light-muted)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 6,
                      }}
                    >
                      {service.bullets.map((bullet, i) => (
                        <li key={i}>{bullet.text}</li>
                      ))}
                    </ul>
                  ) : null}
                  {service.ctaLabel && service.ctaHref ? (
                    <a
                      href={service.ctaHref}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 8,
                        padding: '12px 24px',
                        borderRadius: 'var(--radius-pill)',
                        font: 'var(--text-button)',
                        backgroundImage: 'var(--gradient-orange)',
                        color: 'var(--brand-primary-text)',
                        textDecoration: 'none',
                        width: 'fit-content',
                      }}
                    >
                      {service.ctaLabel}
                    </a>
                  ) : null}
                </div>
                {service.checklist?.length ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {service.checklist.map((item, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <Checkmark />
                        <span style={{ font: 'var(--text-body-sm)', color: 'var(--text-on-light)' }}>
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
              {service.pricingTableHostbillCategoryId ? (
                <ServicePricingTable hostbillCategoryId={service.pricingTableHostbillCategoryId} />
              ) : null}
            </Fragment>
          ))}
        </div>

        {paymentMethods?.length ? (
          <div style={{ textAlign: 'center', marginTop: 'var(--space-12)' }}>
            {paymentMethodsLabel ? (
              <p
                style={{
                  font: 'var(--text-caption)',
                  color: 'var(--text-on-light-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: 'var(--tracking-eyebrow)',
                  marginBottom: 20,
                }}
              >
                {paymentMethodsLabel}
              </p>
            ) : null}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
              {paymentMethods.map((method) => {
                const logo = PAYMENT_LOGOS[method.name]
                return (
                  <span
                    key={method.name}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: 44,
                      padding: '0 20px',
                      border: '1px solid var(--border-on-light)',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--white)',
                    }}
                  >
                    {logo ? (
                      // eslint-disable-next-line @next/next/no-img-element -- static logo strip, matches vps-pricing-cards
                      <img src={logo} alt={method.name} style={{ height: 24, width: 'auto' }} />
                    ) : (
                      <span style={{ font: 'var(--text-ui-label)', color: 'var(--text-on-light)' }}>
                        {method.name}
                      </span>
                    )}
                  </span>
                )
              })}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
