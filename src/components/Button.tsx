'use client'

import type { CSSProperties, MouseEventHandler, ReactNode } from 'react'

export interface ButtonProps {
  children: ReactNode
  /** Visual treatment. `primary` (orange gradient) is the only CTA color in the system. */
  variant?: 'primary' | 'secondary' | 'ghost' | 'ghost-dark' | 'dark'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  icon?: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
  style?: CSSProperties
  type?: 'button' | 'submit' | 'reset'
}

const sizeStyles: Record<NonNullable<ButtonProps['size']>, CSSProperties> = {
  sm: { padding: '8px 16px', font: '600 14px/1 var(--font-body)' },
  md: { padding: '12px 24px', font: 'var(--text-button)' },
  lg: { padding: '16px 32px', font: '600 17px/1 var(--font-body)' },
}

function variantStyle(variant: NonNullable<ButtonProps['variant']>): CSSProperties {
  switch (variant) {
    case 'secondary':
      return {
        background: 'var(--white)',
        color: 'var(--text-on-light)',
        border: '1px solid var(--border-on-light)',
      }
    case 'ghost':
      return {
        background: 'transparent',
        color: 'var(--text-on-light)',
        border: '1px solid transparent',
      }
    case 'ghost-dark':
      return {
        background: 'transparent',
        color: 'var(--text-on-dark)',
        border: '1px solid var(--border-on-dark)',
      }
    case 'dark':
      return {
        background: 'var(--navy-950)',
        color: 'var(--white)',
        border: 'none',
      }
    case 'primary':
    default:
      return {
        backgroundImage: 'var(--gradient-orange)',
        color: 'var(--brand-primary-text)',
        border: 'none',
      }
  }
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  icon = null,
  onClick,
  style,
  type = 'button',
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        borderRadius: 'var(--radius-pill)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        transition:
          'transform var(--duration-fast) var(--ease-standard), filter var(--duration-fast) var(--ease-standard)',
        ...sizeStyles[size],
        ...variantStyle(variant),
        ...style,
      }}
      onMouseDown={(e) => {
        if (!disabled) e.currentTarget.style.transform = 'scale(0.97)'
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'scale(1)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)'
        e.currentTarget.style.filter = 'none'
      }}
      onMouseEnter={(e) => {
        if (!disabled) e.currentTarget.style.filter = 'brightness(1.06)'
      }}
    >
      {icon}
      {children}
    </button>
  )
}
