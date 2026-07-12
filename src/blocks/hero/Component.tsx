import type { CSSProperties } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { HeroParticles } from './HeroParticles'
import { SHOOTING_STARS, STAR_GLOWS, STARS } from './starfield'

export interface HeroBlockProps {
  blockType: 'hero'
  heading: string
  subheading?: string | null
  tagline?: string | null
  imageSrc?: string | null
  imageFit?: 'cover' | 'contain' | null
  ctaLabel?: string | null
  ctaHref?: string | null
}

export function Hero({
  heading,
  subheading,
  tagline,
  imageSrc,
  imageFit,
  ctaLabel,
  ctaHref,
}: HeroBlockProps) {
  return (
    <section
      style={{
        background: 'var(--gradient-hero)',
        padding: 'var(--space-32) 0 var(--space-24)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style>{`
        .hero-nebula { position:absolute; border-radius:50%; filter:blur(70px); animation:hero-nebula-pulse 14s ease-in-out infinite alternate; }
        .hero-nebula--purple { width:45vw; height:45vw; top:-20%; left:-10%; background:radial-gradient(circle, rgba(139,92,246,0.16) 0%, transparent 70%); animation-duration:14s; }
        .hero-nebula--blue { width:40vw; height:40vw; top:0%; right:-15%; background:radial-gradient(circle, rgba(59,130,246,0.14) 0%, transparent 65%); animation-duration:18s; animation-delay:-5s; }
        .hero-nebula--orange { width:30vw; height:30vw; bottom:-15%; left:35%; background:radial-gradient(circle, rgba(255,112,22,0.10) 0%, transparent 65%); animation-duration:20s; animation-delay:-9s; }
        @keyframes hero-nebula-pulse { 0% { opacity:0.6; transform:scale(1); } 100% { opacity:1; transform:scale(1.08); } }
        .hero-star { position:absolute; border-radius:50%; background:#fff; animation:hero-twinkle linear infinite; }
        @keyframes hero-twinkle { 0%, 100% { opacity:0.15; } 50% { opacity:1; } }
        .hero-star-glow { position:absolute; width:3px; height:3px; border-radius:50%; background:var(--glow-color, #fff); box-shadow:0 0 6px 2px var(--glow-color, #fff), 0 0 14px 4px color-mix(in srgb, var(--glow-color, #fff) 40%, transparent); animation:hero-glow-pulse ease-in-out infinite; }
        @keyframes hero-glow-pulse { 0%, 100% { opacity:0.3; transform:scale(1); } 50% { opacity:1; transform:scale(1.4); } }
        .hero-shooting-star { position:absolute; width:2px; height:2px; background:#fff; border-radius:50%; animation:hero-shoot linear infinite; opacity:0; }
        .hero-shooting-star::after { content:''; position:absolute; top:50%; transform:translateY(-50%); right:2px; width:100px; height:1px; background:linear-gradient(to left, rgba(255,255,255,0.8), transparent); }
        @keyframes hero-shoot { 0% { opacity:0; transform:translateX(0) translateY(0); } 5% { opacity:1; } 30% { opacity:0; transform:translateX(260px) translateY(70px); } 100% { opacity:0; transform:translateX(260px) translateY(70px); } }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns:1fr !important; }
          .hero-title { font-size:2.25rem !important; }
          .hero-image { height:240px !important; }
        }
      `}</style>

      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <div className="hero-nebula hero-nebula--purple" />
        <div className="hero-nebula hero-nebula--blue" />
        <div className="hero-nebula hero-nebula--orange" />

        {STARS.map((star, i) => (
          <div
            key={`star-${i}`}
            className="hero-star"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: star.size,
              height: star.size,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}

        {STAR_GLOWS.map((glow, i) => (
          <div
            key={`glow-${i}`}
            className="hero-star-glow"
            style={
              {
                top: `${glow.top}%`,
                left: `${glow.left}%`,
                animationDelay: `${glow.delay}s`,
                animationDuration: `${glow.duration}s`,
                '--glow-color': glow.color,
              } as CSSProperties
            }
          />
        ))}

        {SHOOTING_STARS.map((shootingStar, i) => (
          <div
            key={`shoot-${i}`}
            className="hero-shooting-star"
            style={{
              top: `${shootingStar.top}%`,
              left: `${shootingStar.left}%`,
              animationDuration: `${shootingStar.duration}s`,
              animationDelay: `${shootingStar.delay}s`,
            }}
          />
        ))}

        <HeroParticles />
      </div>

      <div
        className="ac-container hero-grid"
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.9fr',
          gap: 'var(--space-16)',
          alignItems: 'center',
        }}
      >
        <div>
          <h1
            className="hero-title"
            style={{
              font: '800 3.5rem/1.05 var(--font-display)',
              letterSpacing: 'var(--tracking-display)',
              color: 'var(--text-on-dark)',
              margin: 0,
            }}
          >
            {heading}
          </h1>
          {subheading ? (
            <p
              style={{
                font: 'var(--text-body-lg)',
                color: 'var(--text-on-dark-muted)',
                maxWidth: 520,
                margin: '24px 0 0',
              }}
            >
              {subheading}
            </p>
          ) : null}
          {tagline ? (
            <p
              style={{
                font: 'var(--text-body-md)',
                color: 'var(--text-on-dark-muted)',
                margin: '14px 0 0',
              }}
            >
              {tagline}
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
          className="hero-image"
          style={{
            position: 'relative',
            height: 380,
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
          }}
        >
          <Image
            src={imageSrc ?? '/images/hero3.png'}
            alt=""
            fill
            style={{ objectFit: imageFit ?? 'cover' }}
            sizes="(max-width: 768px) 100vw, 45vw"
            priority
          />
        </div>
      </div>
    </section>
  )
}
