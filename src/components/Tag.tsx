'use client'

import type { CSSProperties, MouseEventHandler, ReactNode } from 'react'

export interface TagProps {
  children: ReactNode
  selected?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  style?: CSSProperties
}

export function Tag({ children, selected = false, onClick, style }: TagProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '8px 16px',
        borderRadius: 'var(--radius-md)',
        font: 'var(--text-ui-label)',
        cursor: 'pointer',
        border: selected ? '1px solid var(--brand-primary)' : '1px solid var(--border-on-light)',
        background: selected ? 'rgba(255, 112, 22, 0.08)' : 'var(--white)',
        color: selected ? 'var(--orange-600)' : 'var(--text-on-light)',
        transition: 'background var(--duration-fast) var(--ease-standard)',
        ...style,
      }}
    >
      {children}
    </button>
  )
}
