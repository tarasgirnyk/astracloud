import Image from 'next/image'

export interface PartnersBlockProps {
  blockType: 'partners'
  title?: string | null
  partners?: { name: string; href?: string | null }[] | null
}

const PARTNER_LOGOS: Record<string, { src: string; width: number; height: number }> = {
  GigaTrans: { src: '/images/partners/gigatrans.svg', width: 133, height: 61 },
  IX: { src: '/images/partners/ix-partner.svg', width: 59, height: 39 },
  Галком: { src: '/images/partners/galcom.png', width: 133, height: 59 },
  'Türk Telekom International': { src: '/images/partners/turk-telekom-intl.png', width: 133, height: 44 },
}

export function Partners({ title, partners }: PartnersBlockProps) {
  if (!partners?.length) return null

  return (
    <section
      style={{
        padding: 'var(--space-8) 0',
        borderTop: '1px solid var(--border-on-light)',
        borderBottom: '1px solid var(--border-on-light)',
      }}
    >
      <div className="ac-container">
        {title ? (
          <p
            style={{
              textAlign: 'center',
              font: 'var(--text-caption)',
              color: 'var(--text-on-light-muted)',
              textTransform: 'uppercase',
              letterSpacing: 'var(--tracking-eyebrow)',
              marginBottom: 24,
            }}
          >
            {title}
          </p>
        ) : null}
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 28,
          }}
        >
          {partners.map((partner) => {
            const logo = PARTNER_LOGOS[partner.name]
            const content = logo ? (
              <Image
                src={logo.src}
                alt={partner.name}
                width={logo.width}
                height={logo.height}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  filter: 'grayscale(1) opacity(0.5)',
                  transition: 'filter 0.2s ease',
                }}
              />
            ) : (
              <span style={{ font: 'var(--text-ui-label)', color: 'var(--text-on-light-muted)' }}>
                {partner.name}
              </span>
            )
            return partner.href ? (
              <a key={partner.name} href={partner.href} target="_blank" rel="noopener noreferrer">
                {content}
              </a>
            ) : (
              <span key={partner.name}>{content}</span>
            )
          })}
        </div>
      </div>
    </section>
  )
}
