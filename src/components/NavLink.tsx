'use client'

import { usePathname } from 'next/navigation'
import type { CSSProperties, ReactNode } from 'react'

export interface NavLinkProps {
  href: string
  children: ReactNode
  style?: CSSProperties
}

/** Header/mobile nav link — highlights orange with an underline when its
 * href matches the current URL. `href` values from the CMS already include
 * the locale prefix (e.g. "/en/vps"), so this compares against the plain
 * (non-locale-stripped) `next/navigation` pathname, not next-intl's. */
export function NavLink({ href, children, style }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <a
      href={href}
      style={{
        ...style,
        ...(isActive
          ? { color: 'var(--brand-primary)', textDecoration: 'underline', textUnderlineOffset: 4, fontWeight: 600 }
          : null),
      }}
    >
      {children}
    </a>
  )
}
