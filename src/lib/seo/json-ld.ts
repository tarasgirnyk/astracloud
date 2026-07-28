import type { AppLocale } from '@/i18n/routing'
import type { ProductSummary } from '@/billing-adapter/ports/product-catalog-provider.port'
import { localizedPathname } from './build-metadata'
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from './site'

const HOME_LABEL: Record<AppLocale, string> = { ua: 'Головна', en: 'Home', pl: 'Strona główna' }

interface OrganizationJsonLd {
  '@context': 'https://schema.org'
  '@type': 'Organization'
  name: string
  url: string
  logo: string
}

export function organizationJsonLd(): OrganizationJsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
  }
}

interface WebsiteJsonLd {
  '@context': 'https://schema.org'
  '@type': 'WebSite'
  name: string
  url: string
}

export function websiteJsonLd(): WebsiteJsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
  }
}

interface BreadcrumbItem {
  '@type': 'ListItem'
  position: number
  name: string
  item: string
}

interface BreadcrumbJsonLd {
  '@context': 'https://schema.org'
  '@type': 'BreadcrumbList'
  itemListElement: BreadcrumbItem[]
}

/**
 * A 2-item breadcrumb (Home > page) for every non-home page, or a
 * single-item one for the homepage itself — matching the minimal pattern
 * the old WordPress site's own BreadcrumbList used (a lone "Головна" item
 * on its homepage). This site's URL structure has no deeper nesting today
 * (every page is a top-level slug), so two levels is a complete, accurate
 * representation, not a simplification of something deeper.
 */
export function breadcrumbJsonLd({
  locale,
  pathname,
  label,
}: {
  locale: AppLocale
  pathname: string
  label?: string
}): BreadcrumbJsonLd {
  const homeUrl = `${SITE_URL}${localizedPathname('/', locale)}`
  const itemListElement: BreadcrumbItem[] = [
    { '@type': 'ListItem', position: 1, name: HOME_LABEL[locale], item: homeUrl },
  ]
  if (pathname !== '/' && label) {
    itemListElement.push({
      '@type': 'ListItem',
      position: 2,
      name: label,
      item: `${SITE_URL}${localizedPathname(pathname, locale)}`,
    })
  }
  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement }
}

interface FaqItem {
  question: string
  answer: string
}

interface FaqPageJsonLd {
  '@context': 'https://schema.org'
  '@type': 'FAQPage'
  mainEntity: Array<{
    '@type': 'Question'
    name: string
    acceptedAnswer: { '@type': 'Answer'; text: string }
  }>
}

/**
 * Mirrors exactly what PageFaq.tsx renders — callers MUST pass the same
 * query result PageFaq already fetched, never a separately-authored list
 * (FR-012: this markup must never diverge from the visible Q&A).
 */
export function faqPageJsonLd(items: FaqItem[]): FaqPageJsonLd | null {
  if (items.length === 0) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

interface ServiceJsonLd {
  '@context': 'https://schema.org'
  '@type': 'Service'
  name: string
  description: string
  url: string
  offers?: {
    '@type': 'Offer'
    price: number
    priceCurrency: string
  }
}

/**
 * `product` is only ever a live `ProductSummary` from the existing
 * `ProductCatalogProvider` port (Principle I — never imported from
 * `billing-adapter/adapters/hostbill` directly here). Omitting `product`
 * (HostBill unreachable, or the page has no live pricing block wired in
 * yet — Colocation/Dedicated, per constitution Principle IX) MUST omit
 * `offers` entirely rather than publish a stale or fabricated price
 * (Principle VIII).
 */
export function serviceJsonLd({
  name,
  description,
  url,
  product,
}: {
  name: string
  description: string
  url: string
  product?: Pick<ProductSummary, 'fromPrice'>
}): ServiceJsonLd {
  const base: ServiceJsonLd = { '@context': 'https://schema.org', '@type': 'Service', name, description, url }
  if (!product) return base
  return {
    ...base,
    offers: {
      '@type': 'Offer',
      price: product.fromPrice.amount,
      priceCurrency: product.fromPrice.currency,
    },
  }
}
