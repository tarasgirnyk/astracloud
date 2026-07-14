'use client'

import { useEffect, useState } from 'react'
import { FieldLabel, useField, useFormFields } from '@payloadcms/ui'
import type { TextFieldClientComponent } from 'payload'

interface HostbillProduct {
  id: string
  name: string
}

/**
 * Dropdown for `recommendedProductId`, cascading off the sibling
 * `hostbillCategoryId` field's current (possibly-unsaved) form value —
 * same sibling-path technique as RevalidatePricingButton.tsx. Lists every
 * product in that category (not just visible ones — see
 * get-live-products.ts's getCachedProductsForAdmin), so an editor can pick
 * a recommendation even for a currently-hidden product; the public page
 * only shows the badge if that product is actually visible at render time.
 */
export const RecommendedProductSelect: TextFieldClientComponent = ({ path }) => {
  const { value, setValue } = useField<string>({ path })

  const categoryPath = path.split('.').slice(0, -1).concat('hostbillCategoryId').join('.')
  const categoryId = useFormFields(([fields]) => fields?.[categoryPath]?.value) as string | undefined

  const [products, setProducts] = useState<HostbillProduct[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!categoryId) {
      setProducts(null)
      setError(null)
      return
    }

    let cancelled = false
    setProducts(null)
    setError(null)

    fetch(`/api/service-pages/hostbill-products?categoryId=${encodeURIComponent(categoryId)}`)
      .then((res) => res.json())
      .then((data: { success?: boolean; products?: HostbillProduct[]; error?: string }) => {
        if (cancelled) return
        if (data.success && data.products) {
          setProducts(data.products)
        } else {
          setError(data.error ?? 'Не вдалося завантажити тарифи')
        }
      })
      .catch(() => {
        if (!cancelled) setError('Помилка мережі під час завантаження тарифів')
      })

    return () => {
      cancelled = true
    }
  }, [categoryId])

  if (!categoryId) {
    return (
      <div className="field-type text">
        <FieldLabel label="Рекомендований тариф" />
        <p style={{ color: 'var(--theme-elevation-400)', fontSize: 13 }}>
          Спочатку оберіть HostBill категорію вище.
        </p>
      </div>
    )
  }

  return (
    <div className="field-type text">
      <FieldLabel label="Рекомендований тариф" />
      {error && <p style={{ color: 'var(--theme-error-500)', fontSize: 13 }}>{error}</p>}
      <select
        value={value ?? ''}
        onChange={(e) => setValue(e.target.value || null)}
        disabled={!products}
        style={{ width: '100%', maxWidth: 420, height: 40 }}
      >
        <option value="">{products ? '— Немає —' : 'Завантаження…'}</option>
        {products?.map((product) => (
          <option key={product.id} value={product.id}>
            {product.name} (id: {product.id})
          </option>
        ))}
      </select>
    </div>
  )
}
