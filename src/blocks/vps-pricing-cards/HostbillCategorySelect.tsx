'use client'

import { useEffect, useState } from 'react'
import { FieldLabel, useField } from '@payloadcms/ui'
import type { TextFieldClientComponent } from 'payload'

interface HostbillCategory {
  id: string
  name: string
}

/**
 * Replaces the plain text input for `hostbillCategoryId` with a dropdown of
 * real HostBill category names — the field itself stays a plain `text`
 * column in the schema (no migration needed for this), only its admin
 * representation changes. Category list comes from
 * GET /api/service-pages/hostbill-categories (cached ~30 min server-side).
 */
export const HostbillCategorySelect: TextFieldClientComponent = ({ path }) => {
  const { value, setValue } = useField<string>({ path })
  const [categories, setCategories] = useState<HostbillCategory[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    fetch('/api/service-pages/hostbill-categories')
      .then((res) => res.json())
      .then((data: { success?: boolean; categories?: HostbillCategory[]; error?: string }) => {
        if (cancelled) return
        if (data.success && data.categories) {
          setCategories(data.categories)
        } else {
          setError(data.error ?? 'Не вдалося завантажити категорії')
        }
      })
      .catch(() => {
        if (!cancelled) setError('Помилка мережі під час завантаження категорій')
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="field-type text">
      <FieldLabel label="HostBill категорія" required />
      {error && <p style={{ color: 'var(--theme-error-500)', fontSize: 13 }}>{error}</p>}
      <select
        value={value ?? ''}
        onChange={(e) => setValue(e.target.value)}
        disabled={!categories}
        style={{ width: '100%', maxWidth: 420, height: 40 }}
      >
        <option value="">{categories ? '— Оберіть категорію —' : 'Завантаження…'}</option>
        {categories?.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name} (id: {category.id})
          </option>
        ))}
      </select>
    </div>
  )
}
