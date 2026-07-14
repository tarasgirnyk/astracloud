'use client'

import { useState } from 'react'
import { Button, toast, useFormFields } from '@payloadcms/ui'
import type { UIFieldClientComponent } from 'payload'

/**
 * Admin-only "refresh now" for the VPS pricing cache (see get-live-products.ts).
 * Reads the sibling `hostbillCategoryId` field's current value from form
 * state (by swapping the last path segment — this field and that one live
 * in the same block row) and calls the Payload endpoint below, which is
 * authenticated by the admin session, not the public route's shared secret.
 */
export const RevalidatePricingButton: UIFieldClientComponent = ({ path }) => {
  const [loading, setLoading] = useState(false)

  const siblingPath = path.split('.').slice(0, -1).concat('hostbillCategoryId').join('.')
  const categoryId = useFormFields(([fields]) => fields?.[siblingPath]?.value) as string | undefined

  const handleClick = async () => {
    if (!categoryId) {
      toast.error('Спочатку заповніть і збережіть "Hostbill Category Id".')
      return
    }

    setLoading(true)
    try {
      const response = await fetch(
        `/api/pages/revalidate-vps-pricing?categoryId=${encodeURIComponent(categoryId)}`,
        { method: 'POST' },
      )
      const data = (await response.json()) as { success?: boolean; error?: string }
      if (response.ok && data.success) {
        toast.success(`Кеш тарифів оновлено (категорія ${categoryId}).`)
      } else {
        toast.error(data.error ?? 'Не вдалося оновити кеш тарифів.')
      }
    } catch {
      toast.error('Мережева помилка під час оновлення кешу.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button buttonStyle="secondary" size="small" disabled={loading} onClick={handleClick}>
      {loading ? 'Оновлення…' : 'Оновити ціни з HostBill зараз'}
    </Button>
  )
}
