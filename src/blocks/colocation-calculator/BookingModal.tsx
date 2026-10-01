'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { createPortal } from 'react-dom'
import { useTranslations } from 'next-intl'
import styles from './styles.module.css'

export interface BookingConfiguration {
  units: number
  power: string
  ip: string
  speed: string
  monthlyTotal: number
  setupTotal: number
  currency: string
}

export function BookingModal({ configuration }: { configuration: BookingConfiguration }) {
  const t = useTranslations('colocationBooking')
  const [open, setOpen] = useState(false)
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const close = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', close)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener('keydown', close)
    }
  }, [open])

  async function submit(event: FormEvent) {
    event.preventDefault()
    setStatus('submitting')
    try {
      const response = await fetch('/api/colocation-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, email, configuration }),
      })
      if (!response.ok) throw new Error('Request failed')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <button
        className={styles.bookingButton}
        type="button"
        onClick={() => {
          setStatus('idle')
          setOpen(true)
        }}
      >
        {t('button')}
      </button>
      {open
        ? createPortal(
            <div
              className={styles.modalBackdrop}
              role="presentation"
              onClick={() => setOpen(false)}
            >
              <div
                className={styles.modal}
                role="dialog"
                aria-modal="true"
                aria-label={t('title')}
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  className={styles.modalClose}
                  type="button"
                  aria-label={t('close')}
                  onClick={() => setOpen(false)}
                >
                  ×
                </button>
                <h3>{t('title')}</h3>
                {status === 'success' ? (
                  <p>{t('success')}</p>
                ) : (
                  <form onSubmit={submit}>
                    <label htmlFor="booking-email">{t('email')}</label>
                    <input
                      id="booking-email"
                      type="email"
                      required
                      maxLength={200}
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@example.com"
                    />
                    <label htmlFor="booking-phone">{t('phone')}</label>
                    <input
                      id="booking-phone"
                      type="tel"
                      required
                      maxLength={200}
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder="+380 XX XXX XX XX"
                    />
                    {status === 'error' ? <p className={styles.formError}>{t('error')}</p> : null}
                    <button
                      className={styles.bookingButton}
                      type="submit"
                      disabled={status === 'submitting'}
                    >
                      {status === 'submitting' ? t('submitting') : t('submit')}
                    </button>
                  </form>
                )}
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  )
}
