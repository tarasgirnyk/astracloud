import Image from 'next/image'
import Link from 'next/link'

export interface HeroBlockProps {
  blockType: 'hero'
  heading: string
  subheading?: string | null
  ctaLabel?: string | null
  ctaHref?: string | null
}

export function Hero({ heading, subheading, ctaLabel, ctaHref }: HeroBlockProps) {
  return (
    <section
      style={{
        background: 'var(--gradient-hero)',
        padding: 'var(--space-32) 0 var(--space-24)',
      }}
    >
      <div
        className="ac-container"
        style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.9fr',
          gap: 'var(--space-16)',
          alignItems: 'center',
        }}
      >
        <div>
          <h1
            style={{
              font: '800 3.5rem/1.05 var(--font-display)',
              letterSpacing: 'var(--tracking-display)',
              color: 'var(--text-on-dark)',
            }}
          >
            {heading}
          </h1>
          {subheading ? (
            <p
              style={{
                font: 'var(--text-body-lg)',
                color: 'var(--text-on-dark-muted)',
                maxWidth: 480,
                margin: '24px 0 0',
              }}
            >
              {subheading}
            </p>
          ) : null}
          {ctaLabel && ctaHref ? (
            <div style={{ display: 'flex', gap: 16, marginTop: 36 }}>
              <Link
                href={ctaHref}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '16px 32px',
                  borderRadius: 'var(--radius-pill)',
                  font: '600 17px/1 var(--font-body)',
                  backgroundImage: 'var(--gradient-orange)',
                  color: 'var(--brand-primary-text)',
                  textDecoration: 'none',
                }}
              >
                {ctaLabel}
              </Link>
            </div>
          ) : null}
        </div>
        <div
          style={{
            position: 'relative',
            height: 380,
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
          }}
        >
          <Image
            src="/images/hero3.png"
            alt=""
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 45vw"
            priority
          />
        </div>
      </div>
    </section>
  )
}
