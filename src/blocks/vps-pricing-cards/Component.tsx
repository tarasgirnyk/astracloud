export interface VpsPricingCardsBlockProps {
  blockType: 'vps-pricing-cards'
}

interface PlanSpec {
  name: string
  price: string
  specs: string[]
}

const PLANS: PlanSpec[] = [
  {
    name: 'VPS Nano',
    price: '150',
    specs: [
      '1 Core',
      'RAM: 1 Gb',
      'NVME: 8 Gb',
      '100 MBit/s',
      'Bandwidth: 1TB',
      'Backup 2 безкоштовно*',
      '🐧 Linux',
    ],
  },
  {
    name: 'VPS Micro',
    price: '375',
    specs: [
      '2 Core',
      'RAM: 4 Gb',
      'NVME: 64 Gb',
      '1000 MBit/s',
      'Bandwidth: 4 TB',
      'Free backups: 2',
      '✓ Windows & Linux',
    ],
  },
  {
    name: 'VPS Standart',
    price: '750',
    specs: [
      '4 Core',
      'RAM: 8 Gb',
      'NVME: 128 Gb',
      '1000 MBit/s',
      'Unlimited traffic',
      'Free backups: 2',
      '✓ Windows & Linux',
    ],
  },
  {
    name: 'VPS Premium',
    price: '940',
    specs: [
      '8 Core',
      'RAM: 16 Gb',
      'NVME: 256 Gb',
      '1000 MBit/s',
      'Unlimited traffic',
      'Free backups: 2',
      '✓ Windows & Linux',
    ],
  },
]

const PAYMENT_LOGOS: Record<string, string> = {
  Mastercard: '/images/payment/mastercard.svg',
  VISA: '/images/payment/visa.svg',
  Bitcoin: '/images/payment/bitcoin.svg',
  PayPal: '/images/payment/paypal.svg',
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function VpsPricingCards(_props: VpsPricingCardsBlockProps) {
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
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 'var(--space-6)',
          }}
        >
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              style={{
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                background: 'var(--white)',
                boxShadow: 'var(--shadow-card)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ background: 'var(--navy-950)', padding: 18, textAlign: 'center' }}>
                <span
                  style={{
                    font: 'var(--text-ui-label)',
                    color: 'var(--white)',
                    textTransform: 'uppercase',
                    letterSpacing: 'var(--tracking-eyebrow)',
                  }}
                >
                  {plan.name}
                </span>
              </div>
              <div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
                <div>
                  <span style={{ font: '800 2.25rem/1 var(--font-display)', color: 'var(--text-on-light)' }}>
                    {plan.price}
                  </span>
                  <span style={{ font: 'var(--text-ui-label)', color: 'var(--text-on-light-muted)' }}> UAH</span>
                  <div style={{ font: 'var(--text-caption)', color: 'var(--text-on-light-muted)', marginTop: 4 }}>
                    per month
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {plan.specs.map((spec, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '8px 0',
                        borderBottom: i < plan.specs.length - 1 ? '1px solid var(--border-on-light)' : 'none',
                        font: 'var(--text-body-sm)',
                        color: 'var(--text-on-light-muted)',
                      }}
                    >
                      {spec}
                    </div>
                  ))}
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
          ))}
        </div>

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
