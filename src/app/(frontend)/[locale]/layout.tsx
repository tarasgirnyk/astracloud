import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import Image from 'next/image'
import { routing } from '@/i18n/routing'
import { SUPPORTED_CURRENCIES, SUPPORTED_LOCALES } from '@/globals/SiteChrome'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { CurrencySwitcher } from '@/components/CurrencySwitcher'
import '@/components/tokens.css'

export const metadata: Metadata = {
  title: 'Astra Cloud',
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const messages = await getMessages()
  const payload = await getPayload({ config })
  const siteChrome = await payload.findGlobal({ slug: 'site-chrome' })

  return (
    <html lang={locale}>
      <body style={{ margin: 0 }}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <header
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 50,
              background: 'rgba(250,249,245,0.92)',
              backdropFilter: 'blur(8px)',
              borderBottom: '1px solid var(--border-on-light)',
            }}
          >
            <div
              className="ac-container"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-8)',
                padding: 'var(--space-3) 0',
              }}
            >
              <Image
                src="/images/astra-cloud-logo.png"
                alt="Astra Cloud"
                width={150}
                height={50}
                style={{
                  height: 40,
                  width: 'auto',
                  filter: 'invert(1) brightness(0.3) sepia(1) hue-rotate(190deg) saturate(0)',
                }}
              />
              <nav style={{ display: 'flex', gap: 'var(--space-6)', flex: 1 }}>
                {(siteChrome.navLinks ?? []).map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    style={{
                      font: 'var(--text-ui-label)',
                      color: 'var(--text-on-light)',
                      textDecoration: 'none',
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                <div style={{ color: 'var(--text-on-light)' }}>
                  <LanguageSwitcher locales={SUPPORTED_LOCALES} />
                </div>
                <CurrencySwitcher currencies={SUPPORTED_CURRENCIES} />
              </div>
            </div>
          </header>

          <main>{children}</main>

          <footer style={{ background: 'var(--navy-950)', padding: 'var(--space-16) 0 var(--space-10)' }}>
            <div
              className="ac-container"
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${Math.max(siteChrome.footerColumns?.length ?? 1, 1)}, 1fr)`,
                gap: 'var(--space-10)',
              }}
            >
              {(siteChrome.footerColumns ?? []).map((column) => (
                <div key={column.title}>
                  <h4
                    style={{
                      font: 'var(--text-ui-label)',
                      color: 'var(--text-on-dark)',
                      marginBottom: 'var(--space-3)',
                    }}
                  >
                    {column.title}
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 'var(--space-2)' }}>
                    {(column.links ?? []).map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          style={{ font: 'var(--text-body-sm)', color: 'var(--text-on-dark-muted)' }}
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
