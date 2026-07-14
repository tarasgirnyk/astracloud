import { getTranslations } from 'next-intl/server'
import { getCachedVpsProducts } from './get-live-products'

export interface VpsPricingCardsBlockProps {
  blockType: 'vps-pricing-cards'
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

export async function VpsPricingCards({ hostbillCategoryId, recommendedProductId }: VpsPricingCardsBlockProps) {
  const t = await getTranslations('vpsPricingCards')

  let products: Awaited<ReturnType<typeof getCachedVpsProducts>> = []
  try {
    products = await getCachedVpsProducts(hostbillCategoryId)
  } catch {
    // HostBill unreachable or misconfigured — render an empty grid with a
    // note below rather than failing the whole page.
  }

  const sortedProducts = [...products].sort((a, b) => a.fromPrice.amount - b.fromPrice.amount)

  return (
    <section id="vps" style={{ padding: 'var(--section-padding-y) 0', background: 'var(--paper)' }}>
      <div className="ac-container">
        <h2
          style={{
            font: 'var(--text-display-lg)',
            color: 'var(--text-on-light)',
            textAlign: 'center',
            margin: '0 0 var(--space-10)',
          }}
        >
          Тарифи на сервери VPS
        </h2>

        {sortedProducts.length === 0 ? (
          <p style={{ textAlign: 'center', font: 'var(--text-body-sm)', color: 'var(--text-on-light-muted)' }}>
            Тарифи тимчасово недоступні.
          </p>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 'var(--space-6)',
            }}
          >
            {sortedProducts.map((product) => {
              const isRecommended = Boolean(recommendedProductId) && product.id === recommendedProductId
              return (
                <div
                  key={product.id}
                  style={{
                    position: 'relative',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    background: 'var(--white)',
                    boxShadow: isRecommended ? '0 0 0 3px var(--brand-primary), var(--shadow-card)' : 'var(--shadow-card)',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {isRecommended && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        padding: '6px 0',
                        textAlign: 'center',
                        backgroundImage: 'var(--gradient-orange)',
                        color: 'var(--brand-primary-text)',
                        font: 'var(--text-caption)',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: 'var(--tracking-eyebrow)',
                      }}
                    >
                      {t('recommendedBadge')}
                    </div>
                  )}
                  <div
                    style={{
                      background: 'var(--navy-950)',
                      padding: 18,
                      paddingTop: isRecommended ? 36 : 18,
                      textAlign: 'center',
                    }}
                  >
                    <span
                      style={{
                        font: 'var(--text-ui-label)',
                        color: 'var(--white)',
                        textTransform: 'uppercase',
                        letterSpacing: 'var(--tracking-eyebrow)',
                      }}
                    >
                      {product.name}
                    </span>
                  </div>
                  <div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
                    <div>
                      <span style={{ font: '800 2.25rem/1 var(--font-display)', color: 'var(--text-on-light)' }}>
                        {formatPrice(product.fromPrice.amount)}
                      </span>
                      <span style={{ font: 'var(--text-ui-label)', color: 'var(--text-on-light-muted)' }}>
                        {' '}
                        {product.fromPrice.currency}
                      </span>
                      <div style={{ font: 'var(--text-caption)', color: 'var(--text-on-light-muted)', marginTop: 4 }}>
                        per month
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {product.specs.map((spec, i) => {
                        const key = `specLabels.${spec.label}`
                        const label = t.has(key) ? t(key) : spec.label
                        return (
                          <div
                            key={i}
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              gap: 12,
                              padding: '8px 0',
                              borderBottom: i < product.specs.length - 1 ? '1px solid var(--border-on-light)' : 'none',
                              font: 'var(--text-body-sm)',
                              color: 'var(--text-on-light-muted)',
                            }}
                          >
                            <span>{label}</span>
                            <span style={{ textAlign: 'right' }}>{spec.value}</span>
                          </div>
                        )
                      })}
                    </div>
                    <a
                      href="#"
                      style={{
                        marginTop: 'auto',
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
