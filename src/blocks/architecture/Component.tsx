export interface ArchitectureBlockProps {
  blockType: 'architecture'
  heading: string
  subheading?: string | null
  description?: string | null
  checklistLabel?: string | null
  checklist?: { text: string }[] | null
}

export function Architecture({
  heading,
  subheading,
  description,
  checklistLabel,
  checklist,
}: ArchitectureBlockProps) {
  return (
    <section style={{ background: 'var(--gradient-navy)', padding: 'var(--section-padding-y) 0' }}>
      <div className="ac-container">
        <h2 style={{ font: 'var(--text-display-lg)', color: 'var(--text-on-dark)', margin: '0 0 24px' }}>
          {heading}
        </h2>
        {subheading ? (
          <h3 style={{ font: 'var(--text-display-sm)', color: 'var(--text-on-dark)', margin: '0 0 12px' }}>
            {subheading}
          </h3>
        ) : null}
        {description ? (
          <p style={{ font: 'var(--text-body-md)', color: 'var(--text-on-dark-muted)', margin: '0 0 24px' }}>
            {description}
          </p>
        ) : null}
        {checklistLabel ? (
          <h4 style={{ font: 'var(--text-ui-label)', color: 'var(--text-on-dark)', margin: '0 0 14px' }}>
            {checklistLabel}
          </h4>
        ) : null}
        {checklist?.length ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px 32px' }}>
            {checklist.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
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
                <span style={{ font: 'var(--text-body-sm)', color: 'var(--text-on-dark)' }}>{item.text}</span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}
