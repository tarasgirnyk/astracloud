export interface ServiceItem {
  anchorId?: string | null
  eyebrow?: string | null
  title: string
  description: string
  bullets?: { text: string }[] | null
  ctaLabel?: string | null
  ctaHref?: string | null
  checklist?: { text: string }[] | null
}

export interface ServicesBlockProps {
  blockType: 'services'
  heading: string
  subheading?: string | null
  services?: ServiceItem[] | null
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

export function Services({ heading, subheading, services }: ServicesBlockProps) {
  return (
    <section style={{ padding: 'var(--section-padding-y) 0' }}>
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
          {(services ?? []).map((service, index) => (
            <div
              key={service.anchorId ?? index}
              id={service.anchorId ?? undefined}
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
                      <span style={{ font: 'var(--text-body-sm)', color: 'var(--text-on-light)' }}>{item.text}</span>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
