import { getTranslations } from 'next-intl/server'
import { getCachedVpsProducts, getCachedCategories } from './get-live-products'
import { getHostbillOrderUrl } from '@/billing-adapter/adapters/hostbill/hostbill-storefront-url'

export interface VpsPricingCardsBlockProps {
  blockType: 'vps-pricing-cards'
  eyebrow?: string | null
  heading: string
  subheading?: string | null
  hostbillCategoryId: string
  recommendedProductId?: string | null
}

const PAYMENT_LOGOS: Record<string, string> = {
  Mastercard: '/images/payment/mastercard.svg',
  VISA: '/images/payment/visa.svg',
  Bitcoin: '/images/payment/bitcoin.svg',
  PayPal: '/images/payment/paypal.svg',
}

function formatPrice(amount: number): string {
  return Number.isInteger(amount) ? amount.toString() : amount.toFixed(2)
}

export async function VpsPricingCards({
  eyebrow,
  heading,
  subheading,
  hostbillCategoryId,
  recommendedProductId,
}: VpsPricingCardsBlockProps) {
  const t = await getTranslations('vpsPricingCards')

  let products: Awaited<ReturnType<typeof getCachedVpsProducts>> = []
  try {
    products = await getCachedVpsProducts(hostbillCategoryId)
  } catch {
    // HostBill unreachable or misconfigured — render an empty grid with a
    // note below rather than failing the whole page.
  }

  // The order link needs the category's slug, not its numeric id (HostBill
  // redirects to the login form otherwise) — fetched live alongside the
  // products rather than duplicated into Payload, same as everything else
  // on this block (constitution Principle VIII).
  let categorySlug: string | undefined
  try {
    const categories = await getCachedCategories()
    categorySlug = categories.find((category) => category.id === hostbillCategoryId)?.slug
  } catch {
    // Falls back to '#' below via getHostbillOrderUrl's own guard.
  }

  const sortedProducts = [...products].sort((a, b) => a.fromPrice.amount - b.fromPrice.amount)

  return (
    <section id="vps" style={{ padding: 'var(--section-padding-y) 0', background: 'var(--paper)' }}>
      <style>{`
        @media (max-width: 900px) {
          .vps-pricing-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .vps-pricing-grid { grid-template-columns: 1fr !important; }
          .vps-pricing-card { transform: none !important; }
        }
      `}</style>
      <div className="ac-container">
        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 56px' }}>
          {eyebrow ? (
            <div
              style={{
                font: 'var(--text-ui-label)',
                color: 'var(--orange-600)',
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
                marginBottom: 12,
              }}
            >
              {eyebrow}
            </div>
          ) : null}
          <h2 style={{ font: '700 40px/1.15 var(--font-display)', color: 'var(--text-on-light)', margin: '0 0 12px' }}>
            {heading}
          </h2>
          {subheading ? (
            <p style={{ font: 'var(--text-body-md)', color: 'var(--text-on-light-muted)', margin: 0 }}>{subheading}</p>
          ) : null}
        </div>

        {sortedProducts.length === 0 ? (
          <p style={{ textAlign: 'center', font: 'var(--text-body-sm)', color: 'var(--text-on-light-muted)' }}>
            Тарифи тимчасово недоступні.
          </p>
        ) : (
          <div
            className="vps-pricing-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 'var(--space-6)',
              alignItems: 'start',
              paddingTop: 24,
            }}
          >
            {sortedProducts.map((product) => {
              const isRecommended = Boolean(recommendedProductId) && product.id === recommendedProductId
              const labelColor = isRecommended ? 'var(--orange-600)' : 'var(--text-on-light-muted)'

              return (
                <div
                  key={product.id}
                  className="vps-pricing-card"
                  style={{
                    position: 'relative',
                    borderRadius: 'var(--radius-lg)',
                    padding: '32px 28px',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 520,
                    background: isRecommended
                      ? 'linear-gradient(180deg, rgba(255,112,22,0.05), var(--surface-card) 140px)'
                      : 'var(--surface-card)',
                    border: isRecommended ? '2px solid var(--orange-600)' : '1px solid var(--border-on-light)',
                    boxShadow: isRecommended ? '0 16px 44px rgba(255,112,22,0.3)' : 'var(--shadow-card)',
                    transform: isRecommended ? 'translateY(-16px)' : undefined,
                  }}
                >
                  {isRecommended && (
                    <div
                      style={{
                        position: 'absolute',
                        top: -14,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundImage: 'var(--gradient-orange)',
                        color: '#fff',
                        font: '600 12px/1 var(--font-body)',
                        padding: '6px 16px',
                        borderRadius: 'var(--radius-pill)',
                        boxShadow: '0 4px 16px rgba(255,112,22,0.45)',
                        whiteSpace: 'nowrap',
                        textAlign: 'center',
                      }}
                    >
                      {t('recommendedBadge')}
                    </div>
                  )}

                  <div
                    style={{
                      font: 'var(--text-ui-label)',
                      color: labelColor,
                      textTransform: 'uppercase',
                      letterSpacing: '0.02em',
                      marginBottom: 16,
                      textAlign: 'center',
                    }}
                  >
                    {product.name}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <span
                      style={{
                        font: '700 32px/1 var(--font-display)',
                        color: 'var(--text-on-light)',
                        textAlign: 'center',
                      }}
                    >
                      {formatPrice(product.fromPrice.amount)}
                    </span>
                    <span style={{ font: 'var(--text-body-sm)', color: 'var(--text-on-light-muted)', textAlign: 'center' }}>
                      {t('pricePeriod', {
                        currency: t.has(`currencies.${product.fromPrice.currency}`)
                          ? t(`currencies.${product.fromPrice.currency}`)
                          : product.fromPrice.currency,
                      })}
                    </span>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 0,
                      marginBottom: 32,
                      marginTop: 28,
                      paddingTop: 20,
                      borderTop: '1px solid var(--border-on-light)',
                    }}
                  >
                    {product.specs.map((spec, i) => {
                      const key = `specLabels.${spec.label}`
                      const label = t.has(key) ? t(key) : spec.label
                      return (
                        <div
                          key={i}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 12,
                            padding: '11px 0',
                            borderBottom: '1px solid var(--border-on-light)',
                          }}
                        >
                          <span style={{ font: 'var(--text-body-sm)', color: 'var(--text-on-light-muted)', whiteSpace: 'nowrap' }}>
                            {label}
                          </span>
                          <span
                            style={{
                              font: '600 14px/1.2 var(--font-body)',
                              color: 'var(--text-on-light)',
                              textAlign: 'right',
                              whiteSpace: 'nowrap',
                              flexShrink: 0,
                            }}
                          >
                            {spec.value}
                          </span>
                        </div>
                      )
                    })}
                  </div>

                  <div style={{ marginTop: 'auto', width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <a
                      href={categorySlug ? getHostbillOrderUrl(categorySlug, product.id) : '#'}
                      style={{
                        minWidth: 180,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 44,
                        borderRadius: 'var(--radius-pill)',
                        font: 'var(--text-button)',
                        backgroundImage: 'var(--gradient-orange)',
                        color: 'var(--brand-primary-text)',
                        textDecoration: 'none',
                      }}
                    >
                      Замовити
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: 'var(--space-12)' }}>
          <p
            style={{
              font: 'var(--text-caption)',
              color: 'var(--text-on-light-muted)',
              textTransform: 'uppercase',
              letterSpacing: 'var(--tracking-eyebrow)',
              marginBottom: 20,
            }}
          >
            Методи оплати
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            {Object.entries(PAYMENT_LOGOS).map(([name, src]) => (
              <span
                key={name}
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
                {/* eslint-disable-next-line @next/next/no-img-element -- static demo strip, not worth next/image config here */}
                <img src={src} alt={name} style={{ height: 24, width: 'auto' }} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
