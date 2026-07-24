export interface StepsBlockProps {
  blockType: 'steps'
  eyebrow?: string | null
  heading: string
  items: { text: string; imageSrc?: string | null }[]
}

/**
 * Checkerboard rows (text | image, alternating sides each row) on a light
 * background — see design-handoff/project/templates/referral/Referral.dc.html
 * "Що потрібно зробити?" section, which this reproduces for production.
 */
export function Steps({ eyebrow, heading, items }: StepsBlockProps) {
  if (!items?.length) return null

  return (
    <section style={{ background: 'var(--paper)', padding: 'var(--section-padding-y) 0' }}>
      <style>{`
        .steps-row { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-12); align-items: center; }
        .steps-row > .steps-text { order: 1; }
        .steps-row > .steps-image { order: 2; }
        .steps-row:nth-child(even) > .steps-text { order: 2; }
        .steps-row:nth-child(even) > .steps-image { order: 1; }
        @media (max-width: 768px) {
          .steps-row { grid-template-columns: 1fr !important; }
          .steps-row > .steps-text { order: 1 !important; }
          .steps-row > .steps-image { order: 2 !important; }
        }
      `}</style>
      <div className="ac-container">
        <div style={{ textAlign: 'center' }}>
          {eyebrow ? (
            <span
              style={{
                font: 'var(--text-eyebrow)',
                letterSpacing: 'var(--tracking-eyebrow)',
                color: 'var(--brand-primary)',
                textTransform: 'uppercase',
              }}
            >
              {eyebrow}
            </span>
          ) : null}
          <h2
            style={{
              font: 'var(--text-display-lg)',
              color: 'var(--text-on-light)',
              margin: eyebrow ? '14px 0 var(--space-12)' : '0 0 var(--space-12)',
            }}
          >
            {heading}
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-16)' }}>
          {items.map((item, i) => (
            <div className="steps-row" key={i}>
              <div className="steps-text">
                <span
                  style={{
                    font: '700 3rem/1 var(--font-display)',
                    color: 'rgba(255,112,22,0.4)',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p style={{ font: 'var(--text-body-lg)', color: 'var(--text-on-light)', margin: '12px 0 0' }}>
                  {item.text}
                </p>
              </div>
              <div className="steps-image">
                {item.imageSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element -- must render at its own uploaded aspect ratio, same rationale as hero's image
                  <img src={item.imageSrc} alt="" style={{ width: '100%', height: 'auto', display: 'block' }} />
                ) : (
                  <div
                    style={{
                      border: '1.5px dashed var(--border-on-light)',
                      borderRadius: 'var(--radius-lg)',
                      background: 'rgba(11,12,16,0.02)',
                      minHeight: 260,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      padding: 'var(--space-6)',
                      color: 'var(--text-on-light-muted)',
                      font: 'var(--text-body-sm)',
                    }}
                  >
                    {item.text}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
