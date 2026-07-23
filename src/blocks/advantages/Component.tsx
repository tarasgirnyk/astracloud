import { Fragment, type ReactNode } from 'react'

export interface AdvantagesBlockProps {
  blockType: 'advantages'
  tone?: 'dark' | 'light' | null
  centered?: boolean | null
  splitLayout?: boolean | null
  eyebrow?: string | null
  heading: string
  description?: string | null
  accent?: 'orange' | 'cyan' | 'violet' | null
  bullets?: { text: string }[] | null
  tagline?: string | null
  statsBar?: { value: string; label: string }[] | null
  grid?: { icon?: string | null; title: string; text: string }[] | null
}

// Curated SVG set for the centered variant's grid — icon field also
// accepts a raw emoji (the original/default variant's format), so any
// value not found here just renders as-is.
const ICONS: Record<string, ReactNode> = {
  target: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  ),
  lock: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <rect x="4.5" y="11" width="15" height="9" rx="2" />
      <path d="M8 11V7.5a4 4 0 0 1 8 0V11" />
    </svg>
  ),
  gauge: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path d="M4 15a8 8 0 1 1 16 0" />
      <path d="M12 15l4-5" />
      <path d="M12 15h.01" />
    </svg>
  ),
  trend: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path d="M4 17l5-5 4 4 7-8" />
      <path d="M15 8h5v5" />
    </svg>
  ),
  headset: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path d="M4 13a8 8 0 0 1 16 0" />
      <rect x="3.5" y="13" width="4" height="6" rx="1.2" />
      <rect x="16.5" y="13" width="4" height="6" rx="1.2" />
      <path d="M20 19v1a2 2 0 0 1-2 2h-3" />
    </svg>
  ),
  shield: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path d="M12 3.5l7 2.8v5.6c0 4.6-3 7.8-7 8.9-4-1.1-7-4.3-7-8.9V6.3z" />
      <path d="M9 12l2 2 4-4.2" />
    </svg>
  ),
  // Split-layout variant's grid icons.
  refund: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10Z" />
      <path d="M9.5 12l1.8 1.8L15 10" />
    </svg>
  ),
  support: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0-1.4 0l-1 1a1 1 0 0 0 0 1.4l1 1a1 1 0 0 0 1.4 0l1-1a1 1 0 0 0 0-1.4Z" />
      <path d="M3 21l3.5-1 8-8-2.5-2.5-8 8Z" />
      <path d="M17 3l4 4-2 2-4-4Z" />
    </svg>
  ),
  speed: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
    </svg>
  ),
  monitor: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19V9M11 19V5M18 19v-7" />
    </svg>
  ),
  launch: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 19 4a12.88 12.88 0 0 1-2.16 8A22 22 0 0 1 13 14Z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  ),
  backup: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
      <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
    </svg>
  ),
}

function CheckBadge({ tone, size = 20 }: { tone: 'cyan' | 'orange'; size?: number }) {
  const bg = tone === 'cyan' ? 'rgba(62,230,216,0.12)' : 'rgba(255,112,22,0.14)'
  const stroke = tone === 'cyan' ? 'var(--accent-cyan)' : 'var(--brand-primary)'
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" style={{ flex: 'none' }}>
      <circle cx="10" cy="10" r="9" fill={bg} />
      <path d="M6 10.2l2.6 2.6L14.5 7" stroke={stroke} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const ACCENT_BG: Record<string, string> = {
  orange: 'rgba(255, 112, 22, 0.12)',
  cyan: 'rgba(62, 230, 216, 0.12)',
  violet: 'rgba(139, 108, 247, 0.12)',
}
const ACCENT_COLOR: Record<string, string> = {
  orange: 'var(--brand-primary)',
  cyan: 'var(--accent-cyan)',
  violet: 'var(--accent-violet)',
}

export function Advantages({
  tone = 'dark',
  centered,
  splitLayout,
  eyebrow,
  heading,
  description,
  accent,
  bullets,
  tagline,
  statsBar,
  grid,
}: AdvantagesBlockProps) {
  const isLight = tone === 'light'

  if (splitLayout) {
    return (
      <section style={{ background: 'var(--gradient-navy)', padding: 'var(--section-padding-y) 0' }}>
        <style>{`
          @media (max-width: 900px) {
            .advantages-split { flex-direction: column !important; }
            .advantages-split > * { flex: 1 1 auto !important; width: 100% !important; }
          }
        `}</style>
        <div className="ac-container">
          <div className="advantages-split" style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-16)' }}>
            <div style={{ flex: '1 1 400px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
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

              <h2 style={{ font: 'var(--text-display-md)', color: 'var(--text-on-dark)', margin: 0 }}>{heading}</h2>

              {description ? (
                <p style={{ font: 'var(--text-body-md)', color: 'var(--text-on-dark-muted)', margin: 0, maxWidth: '46ch' }}>
                  {description}
                </p>
              ) : null}

              {bullets?.length ? (
                <ul
                  style={{
                    listStyle: 'none',
                    margin: 'var(--space-2) 0 0',
                    padding: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-3)',
                  }}
                >
                  {bullets.map((bullet, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                      <CheckBadge tone="cyan" />
                      <span style={{ font: '400 1.0625rem/1.5 var(--font-body)', color: 'var(--text-on-dark)' }}>
                        {bullet.text}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {tagline ? (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    marginTop: 'var(--space-2)',
                    paddingTop: 'var(--space-5)',
                    borderTop: '1px solid var(--border-on-dark)',
                  }}
                >
                  <CheckBadge tone="orange" size={22} />
                  <p style={{ font: '600 1.125rem/1.4 var(--font-display)', color: 'var(--text-on-dark)', margin: 0 }}>
                    {tagline}
                  </p>
                </div>
              ) : null}
            </div>

            {grid?.length ? (
              <div
                style={{
                  flex: '1.35 1 520px',
                  minWidth: 0,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
                  gap: 'var(--space-5)',
                  alignContent: 'start',
                }}
              >
                {grid.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      padding: 'var(--space-6)',
                      borderRadius: 'var(--radius-lg)',
                      background: 'var(--surface-card-dark)',
                      border: '1px solid var(--border-on-dark)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 12,
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 'var(--radius-md)',
                        background: 'rgba(255, 112, 22, 0.12)',
                        color: 'var(--brand-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {item.icon && ICONS[item.icon] ? ICONS[item.icon] : item.icon}
                    </div>
                    <h4 style={{ font: '600 1.0625rem/1.3 var(--font-body)', color: 'var(--text-on-dark)', margin: 0 }}>
                      {item.title}
                    </h4>
                    <p style={{ font: '400 0.9375rem/1.55 var(--font-body)', color: 'var(--text-on-dark-muted)', margin: 0 }}>
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>
    )
  }

  if (centered) {
    const accentKey = accent ?? 'orange'
    return (
      <section
        style={{
          background: isLight ? 'var(--gray-100)' : 'var(--gradient-navy)',
          padding: 'var(--section-padding-y) 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <style>{`
          @keyframes advantages-card-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
          @media (max-width: 768px) {
            .advantages-grid { grid-template-columns: 1fr !important; }
          }
          @media (max-width: 640px) {
            .advantages-stats { flex-direction: column !important; align-items: stretch !important; }
            .advantages-stat-divider { display: none !important; }
          }
        `}</style>

        <div
          style={{
            position: 'absolute',
            top: -120,
            right: -80,
            width: 420,
            height: 420,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,112,22,0.16) 0%, rgba(255,112,22,0) 70%)',
            pointerEvents: 'none',
          }}
        />

        <div className="ac-container" style={{ position: 'relative' }}>
          <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto' }}>
            {eyebrow ? (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-pill)',
                  border: '1px solid var(--border-on-dark)',
                  background: 'rgba(255,255,255,0.03)',
                  font: '600 0.8125rem/1 var(--font-body)',
                  color: 'var(--text-on-dark-muted)',
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                  marginBottom: 'var(--space-5)',
                }}
              >
                {eyebrow}
              </div>
            ) : null}

            <h2
              style={{
                font: 'var(--text-display-lg)',
                color: 'var(--text-on-dark)',
                margin: '0 0 var(--space-5)',
              }}
            >
              {heading}
            </h2>

            {description ? (
              <p style={{ font: 'var(--text-body-md)', color: 'var(--text-on-dark-muted)', margin: 0 }}>
                {description}
              </p>
            ) : null}
          </div>

          {statsBar?.length ? (
            <div
              className="advantages-stats"
              style={{
                display: 'flex',
                flexWrap: 'nowrap',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 'var(--space-4)',
                marginTop: 'var(--space-12)',
                padding: 'var(--space-5) var(--space-6)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-on-dark)',
                background: 'rgba(255,255,255,0.02)',
              }}
            >
              {statsBar.map((stat, i) => (
                <Fragment key={i}>
                  {i > 0 ? (
                    <div
                      className="advantages-stat-divider"
                      style={{ width: 1, alignSelf: 'stretch', background: 'var(--border-on-dark)', flexShrink: 0 }}
                    />
                  ) : null}
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, whiteSpace: 'nowrap' }}>
                    <span style={{ font: '700 1.5rem/1 var(--font-display)', color: 'var(--text-on-dark)' }}>
                      {stat.value}
                    </span>
                    <span style={{ font: '400 0.875rem/1.3 var(--font-body)', color: 'var(--text-on-dark-muted)' }}>
                      {stat.label}
                    </span>
                  </div>
                </Fragment>
              ))}
            </div>
          ) : null}

          {grid?.length ? (
            <div
              className="advantages-grid"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-6)', marginTop: 'var(--space-12)' }}
            >
              {grid.map((item, i) => (
                <div
                  key={i}
                  style={{
                    padding: 'var(--space-6)',
                    borderRadius: 'var(--radius-lg)',
                    background: 'var(--surface-card-dark)',
                    border: '1px solid var(--border-on-dark)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-4)',
                    position: 'relative',
                    animation: 'advantages-card-in 0.5s var(--ease-standard) backwards',
                    animationDelay: `${i * 0.06}s`,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 'var(--radius-md)',
                        background: ACCENT_BG[accentKey],
                        color: ACCENT_COLOR[accentKey],
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {item.icon && ICONS[item.icon] ? ICONS[item.icon] : item.icon}
                    </div>
                    <span style={{ font: '600 0.8125rem/1 var(--font-body)', color: 'var(--text-on-dark-muted)', opacity: 0.5 }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h4 style={{ font: '600 1.0625rem/1.3 var(--font-body)', color: 'var(--text-on-dark)', margin: 0 }}>
                    {item.title}
                  </h4>
                  <p style={{ font: '400 0.9375rem/1.5 var(--font-body)', color: 'var(--text-on-dark-muted)', margin: 0 }}>
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

  return (
    <section
      style={{
        background: isLight ? 'var(--gray-100)' : 'var(--gradient-navy)',
        padding: 'var(--section-padding-y) 0',
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .advantages-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
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
            className="advantages-grid"
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
