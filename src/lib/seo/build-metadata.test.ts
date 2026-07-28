import { describe, expect, it } from 'vitest'
import { buildPageMetadata } from './build-metadata'

describe('buildPageMetadata: canonical + hreflang', () => {
  it('builds a self-referencing canonical URL for the requested locale', () => {
    const metadata = buildPageMetadata({ pageTitle: 'VPS', locale: 'en', pathname: '/vps' })
    expect(metadata.alternates?.canonical).toBe('http://localhost:3000/en/vps')
  })

  it('builds an unprefixed canonical URL for the default (ua) locale', () => {
    const metadata = buildPageMetadata({ pageTitle: 'VPS', locale: 'ua', pathname: '/vps' })
    expect(metadata.alternates?.canonical).toBe('http://localhost:3000/vps')
  })

  it('declares hreflang using real BCP47 codes, not the internal "ua" routing key', () => {
    const metadata = buildPageMetadata({ pageTitle: 'VPS', locale: 'ua', pathname: '/vps' })
    const languages = metadata.alternates?.languages as Record<string, string>
    expect(languages.uk).toBe('http://localhost:3000/vps')
    expect(languages.ua).toBeUndefined()
  })

  it('declares hreflang alternates for all three locales plus x-default', () => {
    const metadata = buildPageMetadata({ pageTitle: 'VPS', locale: 'ua', pathname: '/vps' })
    const languages = metadata.alternates?.languages as Record<string, string>
    expect(languages.uk).toBe('http://localhost:3000/vps')
    expect(languages.en).toBe('http://localhost:3000/en/vps')
    expect(languages.pl).toBe('http://localhost:3000/pl/vps')
    expect(languages['x-default']).toBe('http://localhost:3000/vps')
  })

  it("uses the page's own meta.title/meta.description when set, ignoring the fallback", () => {
    const metadata = buildPageMetadata({
      pageTitle: 'VPS',
      meta: { title: 'Custom VPS Title', description: 'Custom description' },
      locale: 'ua',
      pathname: '/vps',
    })
    expect(metadata.title).toBe('Custom VPS Title')
    expect(metadata.description).toBe('Custom description')
  })

  it('falls back to a page-specific, non-empty title/description when meta is blank', () => {
    const metadata = buildPageMetadata({ pageTitle: 'Про нас', meta: null, locale: 'ua', pathname: '/about' })
    expect(metadata.title).toContain('Про нас')
    expect(metadata.description).toBeTruthy()
  })
})

describe('buildPageMetadata: Open Graph / Twitter Card', () => {
  it('populates Open Graph and Twitter tags with the resolved title/description/image', () => {
    const metadata = buildPageMetadata({
      pageTitle: 'VPS',
      meta: { title: 'VPS Title', description: 'VPS description', ogImage: '/images/vps_page.png' },
      locale: 'en',
      pathname: '/vps',
    })
    expect(metadata.openGraph?.title).toBe('VPS Title')
    expect(metadata.openGraph?.description).toBe('VPS description')
    expect(metadata.openGraph?.url).toBe('http://localhost:3000/en/vps')
    expect(metadata.twitter).toMatchObject({ card: 'summary_large_image', title: 'VPS Title' })
  })

  it('falls back to the sitewide default image when meta.ogImage is unset', () => {
    const metadata = buildPageMetadata({ pageTitle: 'VPS', locale: 'ua', pathname: '/vps' })
    const images = metadata.openGraph?.images as Array<{ url: string }>
    expect(images[0]?.url).toContain('/images/')
  })
})
