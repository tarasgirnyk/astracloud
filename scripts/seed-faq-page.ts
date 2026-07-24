/**
 * Seeds the general FAQ page at /faq (ua, no prefix), /en/faq, /pl/faq — a
 * single `faq-index` block that pulls every published FaqItems document,
 * grouped by category, at render time (see src/blocks/faq-index).
 *
 * Run with: pnpm payload run scripts/seed-faq-page.ts
 */
import { getPayload } from 'payload'
import config from '../payload.config.ts'
import { seedLocalizedDoc } from './seed-locale-helpers.ts'

type Locale = 'ua' | 'en' | 'pl'

const SLUG = 'faq'

const pageTitle: Record<Locale, string> = {
  ua: 'Часті запитання',
  en: 'Frequently Asked Questions',
  pl: 'Najczęściej zadawane pytania',
}

function block(locale: Locale) {
  return { blockType: 'faq-index' as const, heading: pageTitle[locale] }
}

async function main() {
  const payload = await getPayload({ config })

  await seedLocalizedDoc(payload, 'pages', SLUG, {
    ua: { title: pageTitle.ua, slug: SLUG, blocks: [block('ua')], publicationStatus: 'published' },
    en: { title: pageTitle.en, slug: SLUG, blocks: [block('en')], publicationStatus: 'published' },
    pl: { title: pageTitle.pl, slug: SLUG, blocks: [block('pl')], publicationStatus: 'published' },
  })
  console.log(`✔ faq page (/${SLUG}, ua/en/pl)`)
  console.log('Done.')
}

try {
  await main()
  process.exit(0)
} catch (err) {
  console.error(err)
  process.exit(1)
}
