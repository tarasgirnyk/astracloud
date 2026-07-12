export interface ConsultationBlockProps {
  blockType: 'consultation'
  tone?: 'dark' | 'light' | null
  heading: string
  subheading?: string | null
  ctaLabel?: string | null
  ctaHref?: string | null
}

export function Consultation({
  tone = 'dark',
  heading,
  subheading,
  ctaLabel,
  ctaHref,
}: ConsultationBlockProps) {
  const isLight = tone === 'light'

  return (
    <section
      style={{
        background: isLight ? 'var(--gray-100)' : 'var(--gradient-navy)',
        padding: isLight ? 'calc(var(--section-padding-y) / 2) 0' : 'var(--section-padding-y) 0',
      }}
    >
      <div className="ac-container" style={{ textAlign: 'center' }}>
        <h2
          style={{
            font: isLight ? 'var(--text-display-md)' : 'var(--text-display-lg)',
            color: isLight ? 'var(--text-on-light)' : 'var(--text-on-dark)',
          }}
        >
          {heading}
        </h2>
        {subheading ? (
          <p
            style={{
              font: 'var(--text-body-md)',
              color: isLight ? 'var(--text-on-light-muted)' : 'var(--text-on-dark-muted)',
              margin: '16px auto 0',
              maxWidth: 460,
            }}
          >
            {subheading}
          </p>
        ) : null}
        {ctaLabel && ctaHref ? (
          <div style={{ marginTop: 30 }}>
            <a
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
            </a>
          </div>
        ) : null}
      </div>
    </section>
  )
}
