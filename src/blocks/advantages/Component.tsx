export interface AdvantagesBlockProps {
  blockType: 'advantages'
  tone?: 'dark' | 'light' | null
  eyebrow?: string | null
  heading: string
  description?: string | null
  bullets?: { text: string }[] | null
  tagline?: string | null
  grid?: { icon?: string | null; title: string; text: string }[] | null
}

export function Advantages({
  tone = 'dark',
  eyebrow,
  heading,
  description,
  bullets,
  tagline,
  grid,
}: AdvantagesBlockProps) {
  const isLight = tone === 'light'

  return (
    <section
      style={{
        background: isLight ? 'var(--gray-100)' : 'var(--gradient-navy)',
        padding: 'var(--section-padding-y) 0',
      }}
    >
      <div className="ac-container">
        <div style={isLight ? { textAlign: 'center' } : undefined}>
          {eyebrow ? (
            <span
              style={{
                font: 'var(--text-eyebrow)',
                letterSpacing: 'var(--tracking-eyebrow)',
                color: 'var(--accent-cyan)',
                textTransform: 'uppercase',
              }}
            >
              {eyebrow}
            </span>
          ) : null}
          <h2
            style={{
              font: 'var(--text-display-lg)',
              color: isLight ? 'var(--text-on-light)' : 'var(--text-on-dark)',
              margin: eyebrow ? '14px 0 20px' : '0 0 20px',
            }}
          >
            {heading}
          </h2>
          {description ? (
            <p style={{ font: 'var(--text-body-md)', color: 'var(--text-on-dark-muted)', margin: '0 0 20px' }}>
              {description}
            </p>
          ) : null}
          {bullets?.length ? (
            <ul
              style={{
                margin: '0 0 20px',
                paddingLeft: 20,
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                font: 'var(--text-body-md)',
                color: 'var(--text-on-dark)',
              }}
            >
              {bullets.map((bullet, i) => (
                <li key={i}>{bullet.text}</li>
              ))}
            </ul>
          ) : null}
          {tagline ? (
            <p style={{ font: '600 1.0625rem/1.5 var(--font-display)', color: 'var(--text-on-dark)' }}>{tagline}</p>
          ) : null}
        </div>

        {grid?.length ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 'var(--space-8)',
              marginTop: 'var(--space-12)',
            }}
          >
            {grid.map((item, i) => (
              <div
                key={i}
                style={{
                  padding: 'var(--space-6)',
                  borderRadius: 'var(--radius-lg)',
                  background: 'var(--white)',
                  border: '1px solid var(--border-on-light)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(255,112,22,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 20,
                  }}
                >
                  {item.icon}
                </div>
                <h4 style={{ font: 'var(--text-ui-label)', color: 'var(--text-on-light)', fontSize: 17 }}>
                  {item.title}
                </h4>
                <p style={{ font: 'var(--text-body-sm)', color: 'var(--text-on-light-muted)', margin: 0 }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}
