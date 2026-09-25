import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Unbounded, Inter, Golos_Text, Manrope } from 'next/font/google'
import Script from 'next/script'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { SUPPORTED_LOCALES } from '@/globals/SiteChrome'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { NavLink } from '@/components/NavLink'
import { organizationJsonLd, websiteJsonLd } from '@/lib/seo/json-ld'
import '@/components/tokens.css'

/**
 * Last-resort fallback only — every real page under this layout defines its
 * own `generateMetadata` (see page.tsx / [slug]/page.tsx and
 * src/lib/seo/build-metadata.ts), which fully overrides this. This value is
 * only ever seen on a route with no page-level metadata (e.g. the 404 page
 * for an unmatched slug) — it must never again be the title search engines
 * see on a real, published page (specs/002-seo-foundations).
 */
export const metadata: Metadata = {
  title: 'Astra Cloud',
  // Sitewide, like `verification` below. favicon.ico sits at the public/
  // root because browsers (and the Payload admin) request /favicon.ico
  // directly; the PNG sizes live in public/favicons/.
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicons/favicon_16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicons/favicon_32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicons/favicon_96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicons/favicon_apple_192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/favicons/favicon_apple_72.png', sizes: '72x72' },
      { url: '/favicons/favicon_apple_144.png', sizes: '144x144' },
      { url: '/favicons/favicon_180.png', sizes: '180x180' },
    ],
  },
  // Sitewide (not page-specific), so it belongs on the layout, not
  // build-metadata.ts — Next.js merges parent-layout metadata fields a
  // page's own generateMetadata doesn't set, so this still applies on every
  // page despite each one overriding title/description. Omitted entirely
  // (not an empty string) when unset, so local/dev/CI builds never ship a
  // production verification token — research.md §9.
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
}

/**
 * Self-hosted, preloaded replacements for the render-blocking Google Fonts
 * `@import` previously in tokens.css (research.md §7) — `subsets` include
 * `cyrillic` (Ukrainian, most of this site's content) and `latin-ext`
 * (Polish diacritics), not just `latin`. No `variable` option: next/font
 * registers each font's `@font-face` under its real family name (e.g.
 * "Unbounded"), so tokens.css's existing `--font-display`/`--font-body`
 * values keep working completely unchanged.
 */
const unbounded = Unbounded({ weight: ['500', '600', '700', '800'], subsets: ['latin', 'latin-ext', 'cyrillic'] })
const inter = Inter({ weight: ['400', '500', '600', '700', '800'], subsets: ['latin', 'latin-ext', 'cyrillic'] })
const golosText = Golos_Text({ weight: ['400', '500', '600', '700'], subsets: ['cyrillic'] })
const manrope = Manrope({ weight: ['400', '500', '600', '700'], subsets: ['latin', 'latin-ext'] })

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
  const siteChrome = await payload.findGlobal({ slug: 'site-chrome', locale: locale as 'ua' | 'en' | 'pl' })

  const navLinks = siteChrome.navLinks ?? []
  const footerColumns = siteChrome.footerColumns ?? []

  return (
    <html lang={locale}>
      <body
        className={`${unbounded.className} ${inter.className} ${golosText.className} ${manrope.className}`}
        style={{ margin: 0 }}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
        />
        {/* Google Tag Manager — one container shared with the HostBill
            storefront (cp.astra.in.ua), which loads the same GTM ID from its
            theme's header.shared.tpl. GA4 and every other tag are configured
            inside the container, never loaded directly here, or pageviews
            would be counted twice. Omitted entirely when unset. */}
        {process.env.NEXT_PUBLIC_GTM_ID ? (
          <>
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
                height="0"
                width="0"
                style={{ display: 'none', visibility: 'hidden' }}
              />
            </noscript>
            <Script id="gtm-init" strategy="afterInteractive">
              {`
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
              `}
            </Script>
          </>
        ) : null}
        {/* HelpCrunch live chat — the same widget as on the HostBill storefront
            (cp.astra.in.ua), so a visitor keeps one conversation across both
            sites. Omitted entirely when unset, like GTM above. */}
        {process.env.NEXT_PUBLIC_HELPCRUNCH_ORGANIZATION && process.env.NEXT_PUBLIC_HELPCRUNCH_APP_ID ? (
          <Script id="helpcrunch-init" strategy="afterInteractive">
            {`
              window.helpcrunchSettings = {
                organization: '${process.env.NEXT_PUBLIC_HELPCRUNCH_ORGANIZATION}',
                appId: '${process.env.NEXT_PUBLIC_HELPCRUNCH_APP_ID}',
              };
              (function(w,d){var hS=w.helpcrunchSettings;if(!hS||!hS.organization){return;}var widgetSrc='https://embed.helpcrunch.com/sdk.js';w.HelpCrunch=function(){w.HelpCrunch.q.push(arguments)};w.HelpCrunch.q=[];function r(){if (d.querySelector('script[src="' + widgetSrc + '"')) { return; }var s=d.createElement('script');s.async=1;s.type='text/javascript';s.src=widgetSrc;(d.body||d.head).appendChild(s);}if(d.readyState === 'complete'||hS.loadImmediately){r();} else if(w.attachEvent){w.attachEvent('onload',r)}else{w.addEventListener('load',r,false)}})(window, document)
            `}
          </Script>
        ) : null}
        <NextIntlClientProvider locale={locale} messages={messages}>
          <style>{`
            .nav-dropdown { position: relative; }
            .nav-dropdown .nav-dropdown-menu { display: none; }
            .nav-dropdown:hover .nav-dropdown-menu { display: flex; }
            .nav-dropdown-menu a:hover { background: var(--surface-light); }
            .nav-burger { display: none; }
            .mobile-nav-toggle { display: none; }
            .mobile-nav-panel { display: none; }
            #mobile-nav-toggle:checked ~ .mobile-nav-panel { display: flex; }
            @media (max-width: 768px) {
              .main-nav { display: none !important; }
              .nav-burger {
                display: flex; flex-direction: column; justify-content: center; gap: 5px;
                width: 26px; height: 20px; cursor: pointer; background: none; border: none;
                padding: 0; margin-left: auto;
              }
              .nav-burger span { display: block; height: 2px; width: 100%; background: var(--text-on-light); border-radius: 2px; }
              .mobile-nav-panel {
                flex-direction: column; padding: 8px var(--container-padding) 20px;
                background: var(--white); border-top: 1px solid var(--border-on-light);
              }
              .mobile-nav-panel a {
                color: var(--text-on-light); text-decoration: none; font: var(--text-ui-label);
                padding: 12px 4px; border-bottom: 1px solid var(--border-on-light);
              }
              .footer-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>

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
            <input type="checkbox" id="mobile-nav-toggle" className="mobile-nav-toggle" />
            <div
              className="ac-container"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                minHeight: 76,
                paddingTop: 14,
                paddingBottom: 14,
                gap: '16px 24px',
                flexWrap: 'wrap',
              }}
            >
              <Link href="/" style={{ display: 'flex', lineHeight: 0 }}>
                <Image
                  src="/images/astra-cloud-logo.png"
                  alt="Astra Cloud"
                  width={150}
                  height={50}
                  style={{
                    height: 50,
                    width: 'auto',
                    filter: 'invert(1) brightness(0.3) sepia(1) hue-rotate(190deg) saturate(0)',
                  }}
                />
              </Link>
              <nav
                className="main-nav"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 24,
                  flexWrap: 'wrap',
                  font: 'var(--text-ui-label)',
                  color: 'var(--text-on-light)',
                }}
              >
                {navLinks.map((link, navIndex) =>
                  link.children?.length ? (
                    <div className="nav-dropdown" key={`nav-${navIndex}`}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
                        {link.label} <span style={{ fontSize: 10 }}>▾</span>
                      </span>
                      <div
                        className="nav-dropdown-menu"
                        style={{
                          flexDirection: 'column',
                          position: 'absolute',
                          top: '100%',
                          left: 0,
                          paddingTop: 12,
                          minWidth: 240,
                          zIndex: 20,
                        }}
                      >
                        <div
                          style={{
                            background: 'var(--white)',
                            border: '1px solid var(--border-on-light)',
                            borderRadius: 'var(--radius-md)',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                            padding: 8,
                            display: 'flex',
                            flexDirection: 'column',
                          }}
                        >
                          {link.children.map((child, childIndex) => (
                            <NavLink
                              key={`nav-${navIndex}-child-${childIndex}`}
                              href={child.href}
                              style={{
                                color: 'var(--text-on-light)',
                                textDecoration: 'none',
                                padding: '8px 12px',
                                borderRadius: 'var(--radius-sm)',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {child.label}
                            </NavLink>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <NavLink
                      key={`nav-${navIndex}`}
                      href={link.href}
                      style={{ color: 'inherit', textDecoration: 'none' }}
                    >
                      {link.label}
                    </NavLink>
                  ),
                )}
              </nav>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  font: 'var(--text-caption)',
                  color: 'var(--text-on-light-muted)',
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ color: 'var(--text-on-light)' }}>
                  <LanguageSwitcher locales={SUPPORTED_LOCALES} />
                </div>
                {siteChrome.cabinetLabel && siteChrome.cabinetHref ? (
                  <a
                    href={siteChrome.cabinetHref}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '8px 16px',
                      borderRadius: 'var(--radius-pill)',
                      font: '600 14px/1 var(--font-body)',
                      backgroundImage: 'var(--gradient-orange)',
                      color: 'var(--brand-primary-text)',
                      textDecoration: 'none',
                    }}
                  >
                    {siteChrome.cabinetLabel}
                  </a>
                ) : null}
              </div>
              <label htmlFor="mobile-nav-toggle" className="nav-burger" aria-label="Меню">
                <span></span>
                <span></span>
                <span></span>
              </label>
            </div>
            <div className="mobile-nav-panel">
              {navLinks.flatMap((link, navIndex) => [
                <NavLink key={`mobile-nav-${navIndex}`} href={link.href}>
                  {link.label}
                </NavLink>,
                ...(link.children ?? []).map((child, childIndex) => (
                  <NavLink key={`mobile-nav-${navIndex}-child-${childIndex}`} href={child.href}>
                    {child.label}
                  </NavLink>
                )),
              ])}
            </div>
          </header>

          <main>{children}</main>

          <footer style={{ background: 'var(--navy-950)', padding: 'var(--space-16) 0 var(--space-10)' }}>
            <div className="ac-container">
              <div
                className="footer-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: `1.3fr repeat(${Math.max(footerColumns.length, 1)}, 1fr)`,
                  gap: 'var(--space-10)',
                  paddingBottom: 'var(--space-10)',
                  borderBottom: '1px solid var(--border-on-dark)',
                }}
              >
                <div>
                  <Link href="/" style={{ display: 'inline-flex', lineHeight: 0 }}>
                    <Image
                      src="/images/astra-cloud-logo.png"
                      alt="Astra Cloud"
                      width={100}
                      height={28}
                      style={{ height: 28, width: 'auto', marginBottom: 14 }}
                    />
                  </Link>
                  {siteChrome.footerAddress ? (
                    <p style={{ font: 'var(--text-body-sm)', color: 'var(--text-on-dark-muted)' }}>
                      {siteChrome.footerAddress}
                    </p>
                  ) : null}
                </div>
                {footerColumns.map((column, columnIndex) => (
                  <div
                    key={`footer-col-${columnIndex}`}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 10,
                      font: 'var(--text-body-sm)',
                      color: 'var(--text-on-dark-muted)',
                    }}
                  >
                    <span style={{ color: 'var(--text-on-dark)', font: 'var(--text-ui-label)', marginBottom: 4 }}>
                      {column.title}
                    </span>
                    {(column.links ?? []).map((link, linkIndex) => (
                      <a
                        key={`footer-col-${columnIndex}-link-${linkIndex}`}
                        href={link.href}
                        style={{ color: 'inherit', textDecoration: 'none' }}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                ))}
              </div>
              {siteChrome.copyrightText ? (
                <p
                  style={{
                    font: 'var(--text-caption)',
                    color: 'var(--gray-500)',
                    textAlign: 'center',
                    paddingTop: 'var(--space-6)',
                  }}
                >
                  {siteChrome.copyrightText}
                </p>
              ) : null}
            </div>
          </footer>
        </NextIntlClientProvider>
        <script>{`
          document.addEventListener('click', function (e) {
            const anchor = e.target.closest('a[href^="#"]')
            if (!anchor) return
            const id = anchor.getAttribute('href').slice(1)
            if (!id) return
            const target = document.getElementById(id)
            if (!target) return
            e.preventDefault()
            target.scrollIntoView({ behavior: 'smooth', block: 'start' })
            history.pushState(null, '', '#' + id)
          })
        `}</script>
      </body>
    </html>
  )
}
