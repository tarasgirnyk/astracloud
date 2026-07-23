import { ConsultationModal } from '@/components/ConsultationModal'

export interface ConsultationBlockProps {
  blockType: 'consultation'
  tone?: 'dark' | 'light' | null
  heading: string
  subheading?: string | null
  ctaLabel?: string | null
  ctaHref?: string | null
  splitCard?: boolean | null
  badgeLabel?: string | null
  microcopy?: string | null
  illustrationSrc?: string | null
  illustrationPlaceholder?: string | null
}

export function Consultation({
  tone = 'dark',
  heading,
  subheading,
  ctaLabel,
  splitCard,
  badgeLabel,
  microcopy,
  illustrationSrc,
  illustrationPlaceholder,
}: ConsultationBlockProps) {
  const isLight = tone === 'light'

  if (splitCard) {
    const hasIllustration = Boolean(illustrationSrc || illustrationPlaceholder)

    return (
      <section style={{ background: 'var(--gray-100)', padding: 'var(--section-padding-y) 0' }}>
        <style>{`
          @media (max-width: 768px) {
            .consultation-card { grid-template-columns: 1fr !important; padding: var(--space-8) var(--space-6) !important; }
          }
        `}</style>
        <div className="ac-container">
          <div
            className="consultation-card"
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-xl)',
              background: 'var(--gradient-navy)',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: hasIllustration ? '1.1fr 0.9fr' : '1fr',
              alignItems: hasIllustration ? 'stretch' : 'center',
              gap: 'var(--space-16)',
              padding: 'var(--space-16)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(60% 90% at 85% 20%, rgba(139,108,247,0.28) 0%, transparent 60%), radial-gradient(50% 70% at 10% 100%, rgba(255,112,22,0.18) 0%, transparent 65%)',
                pointerEvents: 'none',
              }}
            />

            <div style={{ position: 'relative', zIndex: 1 }}>
              {badgeLabel ? (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-pill)',
                    font: 'var(--text-caption)',
                    background: 'rgba(255,255,255,0.1)',
                    color: 'var(--white)',
                  }}
                >
                  {badgeLabel}
                </span>
              ) : null}

              <h2
                style={{
                  font: 'var(--text-display-lg)',
                  color: 'var(--text-on-dark)',
                  margin: badgeLabel ? '18px 0 0' : 0,
                  maxWidth: 480,
                }}
              >
                {heading}
              </h2>

              {subheading ? (
                <p style={{ font: 'var(--text-body-md)', color: 'var(--text-on-dark-muted)', margin: '14px 0 0', maxWidth: 420 }}>
                  {subheading}
                </p>
              ) : null}

              {ctaLabel ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginTop: 32, flexWrap: 'wrap' }}>
                  <ConsultationModal triggerLabel={ctaLabel} />
                  {microcopy ? (
                    <span style={{ font: 'var(--text-body-sm)', color: 'var(--text-on-dark-muted)' }}>{microcopy}</span>
                  ) : null}
                </div>
              ) : null}
            </div>

            {hasIllustration ? (
              illustrationSrc ? (
                // eslint-disable-next-line @next/next/no-img-element -- stretches to the card's own height, not worth next/image config here
                <img
                  src={illustrationSrc}
                  alt=""
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    width: '100%',
                    height: '100%',
                    minHeight: 280,
                    objectFit: 'contain',
                  }}
                />
              ) : (
                <div
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    border: '1.5px dashed var(--border-on-dark)',
                    borderRadius: 'var(--radius-lg)',
                    height: 280,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    padding: 24,
                    boxShadow: 'var(--glow-violet)',
                  }}
                >
                  <span style={{ font: 'var(--text-body-sm)', color: 'var(--text-on-dark-muted)' }}>
                    {illustrationPlaceholder}
                  </span>
                </div>
              )
            ) : null}
          </div>
        </div>
      </section>
    )
  }

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
        {ctaLabel ? (
          <div style={{ marginTop: 30, display: 'flex', justifyContent: 'center' }}>
            <ConsultationModal triggerLabel={ctaLabel} />
          </div>
        ) : null}
      </div>
    </section>
  )
}
