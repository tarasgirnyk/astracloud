'use client'

import { useLocale, useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import type { AppLocale } from '@/i18n/routing'

const LABELS: Record<AppLocale, string> = { ua: 'UA', en: 'EN', pl: 'PL' }

export interface LanguageSwitcherProps {
  locales: readonly AppLocale[]
}

/** Reads supportedLocales from the SiteChrome global (passed down by the
 * layout) and generates next-intl locale links for the current page — see
 * research.md §2 and data-model.md. */
export function LanguageSwitcher({ locales }: LanguageSwitcherProps) {
  const pathname = usePathname()
  const currentLocale = useLocale() as AppLocale
  const t = useTranslations('chrome')

  return (
    <div role="group" aria-label={t('languageLabel')} style={{ display: 'flex', gap: 8 }}>
      {locales.map((locale) => (
        <Link
          key={locale}
          href={pathname}
          locale={locale}
          aria-current={locale === currentLocale ? 'true' : undefined}
          style={{
            font: 'var(--text-ui-label)',
            color: locale === currentLocale ? 'var(--brand-primary)' : 'var(--text-on-dark)',
            textDecoration: 'none',
          }}
        >
          {LABELS[locale]}
        </Link>
      ))}
    </div>
  )
}
