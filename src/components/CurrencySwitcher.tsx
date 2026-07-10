'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

export interface CurrencySwitcherProps {
  currencies: readonly string[]
}

/**
 * Display-only for this feature — no live price conversion yet (see
 * docs/GRILL_NOTES.md decision 8 and spec.md Assumptions). Selecting a
 * currency here does not yet affect any price shown elsewhere on the site.
 */
export function CurrencySwitcher({ currencies }: CurrencySwitcherProps) {
  const [selected, setSelected] = useState(currencies[0])
  const t = useTranslations('chrome')

  return (
    <select
      value={selected}
      onChange={(e) => setSelected(e.target.value)}
      aria-label={t('currencyLabel')}
      style={{
        font: 'var(--text-ui-label)',
        background: 'transparent',
        color: 'var(--text-on-dark)',
        border: '1px solid var(--border-on-dark)',
        borderRadius: 'var(--radius-md)',
        padding: '4px 8px',
      }}
    >
      {currencies.map((currency) => (
        <option key={currency} value={currency} style={{ color: 'var(--text-on-light)' }}>
          {currency}
        </option>
      ))}
    </select>
  )
}
