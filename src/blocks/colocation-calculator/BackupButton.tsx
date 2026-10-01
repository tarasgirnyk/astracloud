'use client'

import { useState } from 'react'
import { Button, toast } from '@payloadcms/ui'
import type { UIFieldClientComponent } from 'payload'

export const BackupButton: UIFieldClientComponent = () => {
  const [loading, setLoading] = useState(false)

  const saveBackup = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/service-pages/backup-colocation-calculator', {
        method: 'POST',
      })
      const data = (await response.json()) as { error?: string; path?: string; success?: boolean }
      if (!response.ok || !data.success) throw new Error(data.error ?? 'Не вдалося створити backup')
      toast.success(`Backup створено: ${data.path}`)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Не вдалося створити backup')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Button buttonStyle="secondary" size="small" disabled={loading} onClick={saveBackup}>
        {loading ? 'Збереження…' : 'Зберегти калькулятор у backup для seed'}
      </Button>
      <p style={{ color: 'var(--theme-elevation-500)', fontSize: 13, marginTop: 6 }}>
        Спочатку збережіть сторінку. Backup фіксує останні збережені значення UA, EN та PL.
      </p>
    </div>
  )
}
