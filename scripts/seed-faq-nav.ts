/**
 * Adds a "FAQ" link to the live site-chrome global — inside the "Компанія"
 * nav dropdown and the "Клієнтам"/"Customers"/"Klienci" footer column — for
 * each locale. A standalone, append-only update (not a full seed-homepage.ts
 * rerun) so it doesn't clobber the /partnerka nav link added separately
 * (see scripts/seed-partnerka.ts), which seed-homepage.ts's own
 * `siteChromeByLocale` only mirrors for future full reseeds.
 *
 * Run with: pnpm payload run scripts/seed-faq-nav.ts
 */
import { getPayload } from 'payload'
import config from '../payload.config.ts'

type Locale = 'ua' | 'en' | 'pl'
const LOCALES: Locale[] = ['ua', 'en', 'pl']

const companyDropdownLabel: Record<Locale, string> = { ua: 'Компанія', en: 'Company', pl: 'Firma' }
const faqLabel: Record<Locale, string> = { ua: 'Часті запитання', en: 'FAQ', pl: 'FAQ' }
const faqHref: Record<Locale, string> = { ua: '/faq', en: '/en/faq', pl: '/pl/faq' }
const footerColumnTitle: Record<Locale, string> = { ua: 'Клієнтам', en: 'Customers', pl: 'Klienci' }

async function main() {
  const payload = await getPayload({ config })

  for (const locale of LOCALES) {
    const chrome = await payload.findGlobal({ slug: 'site-chrome', locale })
    const navLinks = Array.isArray(chrome.navLinks) ? [...chrome.navLinks] : []
    const footerColumns = Array.isArray(chrome.footerColumns) ? [...chrome.footerColumns] : []

    const company = navLinks.find((link) => link?.label === companyDropdownLabel[locale])
    if (company) {
      const children = Array.isArray(company.children) ? [...company.children] : []
      if (!children.some((child) => child?.href === faqHref[locale])) {
        children.push({ label: faqLabel[locale], href: faqHref[locale] })
        company.children = children
      }
    }

    const footerColumn = footerColumns.find((column) => column?.title === footerColumnTitle[locale])
    if (footerColumn) {
      const links = Array.isArray(footerColumn.links) ? [...footerColumn.links] : []
      if (!links.some((link) => link?.href === faqHref[locale])) {
        links.push({ label: faqLabel[locale], href: faqHref[locale] })
        footerColumn.links = links
      }
    }

    await payload.updateGlobal({ slug: 'site-chrome', locale, data: { navLinks, footerColumns } })
    console.log(`✔ faq nav/footer link added for ${locale}`)
  }

  console.log('Done.')
}

try {
  await main()
  process.exit(0)
} catch (err) {
  console.error(err)
  process.exit(1)
}
