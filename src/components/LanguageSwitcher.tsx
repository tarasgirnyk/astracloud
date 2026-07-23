'use client'

import { useEffect, useRef, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import type { AppLocale } from '@/i18n/routing'

const LABELS: Record<AppLocale, string> = { ua: 'UA', en: 'EN', pl: 'PL' }

export interface LanguageSwitcherProps {
  locales: readonly AppLocale[]
}

/** Reads supportedLocales from the SiteChrome global (passed down by the
 * layout) and generates next-intl locale links for the current page — see
 * research.md §2 and data-model.md. Click-to-toggle dropdown (not
 * hover-only, unlike the "Компанія" nav dropdown) so it also works on
 * touch devices. */
export function LanguageSwitcher({ locales }: LanguageSwitcherProps) {
  const pathname = usePathname()
  const currentLocale = useLocale() as AppLocale
  const t = useTranslations('chrome')
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onClickOutside)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen])

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={t('languageLabel')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          font: 'var(--text-ui-label)',
          color: 'var(--text-on-light)',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
        }}
      >
        {LABELS[currentLocale]} <span style={{ fontSize: 10 }}>▾</span>
      </button>

      {isOpen ? (
        <div
          role="listbox"
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: 12,
            minWidth: 80,
            zIndex: 20,
            background: 'var(--white)',
            border: '1px solid var(--border-on-light)',
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            padding: 8,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {locales.map((locale) => (
            <Link
              key={locale}
              href={pathname}
              locale={locale}
              onClick={() => setIsOpen(false)}
              aria-current={locale === currentLocale ? 'true' : undefined}
              role="option"
              style={{
                font: 'var(--text-ui-label)',
                color: locale === currentLocale ? 'var(--brand-primary)' : 'var(--text-on-light)',
                textDecoration: 'none',
                padding: '8px 12px',
                borderRadius: 'var(--radius-sm)',
                whiteSpace: 'nowrap',
              }}
            >
              {LABELS[locale]}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  )
}
