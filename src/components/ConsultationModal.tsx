'use client'

import { useEffect, useState, type CSSProperties, type FormEvent } from 'react'
import { useTranslations } from 'next-intl'

export interface ConsultationModalProps {
  triggerLabel: string
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

const inputStyle: CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: 'var(--radius-md)',
  border: '1px solid var(--border-on-light)',
  font: 'var(--text-body-sm)',
  color: 'var(--text-on-light)',
  background: 'var(--white)',
}

const labelStyle: CSSProperties = {
  font: 'var(--text-ui-label)',
  color: 'var(--text-on-light)',
  marginBottom: 6,
  display: 'block',
}

/** Trigger button + modal form for "Отримати консультацію" — submits to
 * /api/consultation-request, which forwards it to the team inbox via Gmail
 * SMTP (see send-consultation-email.ts). Self-contained so each Consultation
 * block instance can render its own independently. */
export function ConsultationModal({ triggerLabel }: ConsultationModalProps) {
  const t = useTranslations('consultationModal')
  const [isOpen, setIsOpen] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  function reset() {
    setStatus('idle')
    setName('')
    setPhone('')
    setEmail('')
    setMessage('')
  }

  function close() {
    setIsOpen(false)
    if (status !== 'submitting') reset()
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('submitting')
    try {
      const res = await fetch('/api/consultation-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, message }),
      })
      if (!res.ok) throw new Error('request failed')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px 32px',
          borderRadius: 'var(--radius-pill)',
          font: '600 17px/1 var(--font-body)',
          backgroundImage: 'var(--gradient-orange)',
          color: 'var(--brand-primary-text)',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        {triggerLabel}
      </button>

      {isOpen ? (
        <div
          role="presentation"
          onClick={close}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(10, 14, 26, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            zIndex: 1000,
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={triggerLabel}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'var(--white)',
              borderRadius: 'var(--radius-lg)',
              padding: 32,
              width: '100%',
              maxWidth: 440,
              maxHeight: '90vh',
              overflowY: 'auto',
              position: 'relative',
              textAlign: 'left',
            }}
          >
            <button
              type="button"
              onClick={close}
              aria-label={t('closeLabel')}
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                width: 32,
                height: 32,
                borderRadius: '50%',
                border: 'none',
                background: 'var(--gray-100)',
                color: 'var(--text-on-light)',
                cursor: 'pointer',
                fontSize: 18,
                lineHeight: 1,
              }}
            >
              ×
            </button>

            <h3 style={{ font: 'var(--text-display-sm)', color: 'var(--text-on-light)', margin: '0 0 24px', paddingRight: 32 }}>
              {triggerLabel}
            </h3>

            {status === 'success' ? (
              <p style={{ font: 'var(--text-body-md)', color: 'var(--text-on-light)' }}>{t('successMessage')}</p>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={labelStyle} htmlFor="consultation-name">
                    {t('nameLabel')}
                  </label>
                  <input
                    id="consultation-name"
                    type="text"
                    required
                    maxLength={200}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('namePlaceholder')}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle} htmlFor="consultation-phone">
                    {t('phoneLabel')}
                  </label>
                  <input
                    id="consultation-phone"
                    type="tel"
                    required
                    maxLength={200}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t('phonePlaceholder')}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle} htmlFor="consultation-email">
                    {t('emailLabel')}
                  </label>
                  <input
                    id="consultation-email"
                    type="email"
                    required
                    maxLength={200}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('emailPlaceholder')}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle} htmlFor="consultation-message">
                    {t('messageLabel')}
                  </label>
                  <textarea
                    id="consultation-message"
                    required
                    maxLength={5000}
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t('messagePlaceholder')}
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                </div>

                {status === 'error' ? (
                  <p style={{ font: 'var(--text-body-sm)', color: 'var(--red-600, #dc2626)', margin: 0 }}>
                    {t('errorMessage')}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '14px 32px',
                    borderRadius: 'var(--radius-pill)',
                    font: '600 16px/1 var(--font-body)',
                    backgroundImage: 'var(--gradient-orange)',
                    color: 'var(--brand-primary-text)',
                    border: 'none',
                    cursor: status === 'submitting' ? 'default' : 'pointer',
                    opacity: status === 'submitting' ? 0.7 : 1,
                  }}
                >
                  {status === 'submitting' ? t('submittingLabel') : t('submitLabel')}
                </button>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </>
  )
}
