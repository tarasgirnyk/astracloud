import { describe, expect, it } from 'vitest'
import { organizationJsonLd, websiteJsonLd, breadcrumbJsonLd, faqPageJsonLd, serviceJsonLd } from './json-ld'

describe('organizationJsonLd / websiteJsonLd', () => {
  it('declares the Astra Cloud organization identity', () => {
    const org = organizationJsonLd()
    expect(org['@type']).toBe('Organization')
    expect(org.name).toBe('Astra Cloud')
    expect(org.url).toBe('http://localhost:3000')
  })

  it('declares the sitewide WebSite identity', () => {
    const site = websiteJsonLd()
    expect(site['@type']).toBe('WebSite')
    expect(site.url).toBe('http://localhost:3000')
  })
})

describe('breadcrumbJsonLd', () => {
  it('declares a single-item breadcrumb for the homepage', () => {
    const breadcrumb = breadcrumbJsonLd({ locale: 'ua', pathname: '/' })
    expect(breadcrumb['@type']).toBe('BreadcrumbList')
    expect(breadcrumb.itemListElement).toHaveLength(1)
    expect(breadcrumb.itemListElement[0]?.position).toBe(1)
  })

  it('declares a two-item breadcrumb (Home > page) for a non-home page', () => {
    const breadcrumb = breadcrumbJsonLd({ locale: 'en', pathname: '/vps', label: 'VPS' })
    expect(breadcrumb.itemListElement).toHaveLength(2)
    expect(breadcrumb.itemListElement[1]?.name).toBe('VPS')
    expect(breadcrumb.itemListElement[1]?.item).toBe('http://localhost:3000/en/vps')
  })
})

describe('faqPageJsonLd', () => {
  it('mirrors the exact questions/answers passed in, same order, no drift', () => {
    const items = [
      { question: 'Q1', answer: 'A1' },
      { question: 'Q2', answer: 'A2' },
    ]
    const faq = faqPageJsonLd(items)
    expect(faq).not.toBeNull()
    expect(faq?.['@type']).toBe('FAQPage')
    expect(faq?.mainEntity).toHaveLength(2)
    expect(faq?.mainEntity[0]).toMatchObject({
      '@type': 'Question',
      name: 'Q1',
      acceptedAnswer: { '@type': 'Answer', text: 'A1' },
    })
    expect(faq?.mainEntity[1]?.name).toBe('Q2')
  })

  it('returns null for an empty FAQ list (nothing to mark up)', () => {
    expect(faqPageJsonLd([])).toBeNull()
  })
})

describe('serviceJsonLd', () => {
  it('omits offers/price when no live product is supplied (HostBill unreachable or not wired up)', () => {
    const service = serviceJsonLd({ name: 'VPS', description: 'VPS hosting', url: 'http://localhost:3000/vps' })
    expect(service['@type']).toBe('Service')
    expect(service.offers).toBeUndefined()
  })

  it('includes offers/price when a live product is supplied', () => {
    const service = serviceJsonLd({
      name: 'VPS',
      description: 'VPS hosting',
      url: 'http://localhost:3000/vps',
      product: { fromPrice: { amount: 199, currency: 'UAH' } },
    })
    expect(service.offers).toMatchObject({
      '@type': 'Offer',
      price: 199,
      priceCurrency: 'UAH',
    })
  })

  it('marks the offer OutOfStock when HostBill says the product is out of stock', () => {
    const service = serviceJsonLd({
      name: 'VPS',
      description: 'VPS hosting',
      url: 'http://localhost:3000/vps',
      product: { fromPrice: { amount: 150, currency: 'UAH' }, inStock: false },
    })
    expect(service.offers?.availability).toBe('https://schema.org/OutOfStock')
  })

  it('never fabricates a price when the product has none', () => {
    const service = serviceJsonLd({
      name: 'Colocation',
      description: 'Colocation hosting',
      url: 'http://localhost:3000/colocation',
      product: undefined,
    })
    expect(service.offers).toBeUndefined()
  })
})
