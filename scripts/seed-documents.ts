/**
 * Seeds the "Документи" (Documents) page at /documents (ua/en/pl — unified
 * slug, same reasoning as seed-about.ts).
 *
 * The two files listed here (a certification image and the company's
 * accession-agreement PDF) were downloaded from cloud.astra.in.ua's public
 * uploads and are hosted locally at public/documents/ — these are official
 * company paperwork, not text content, so they're embedded as-is (not
 * rewritten). UI labels/descriptions are original text.
 *
 * Run with: pnpm payload run scripts/seed-documents.ts
 */
import { getPayload } from 'payload'
import config from '../payload.config.ts'
import { seedLocalizedDoc } from './seed-locale-helpers.ts'

type Locale = 'ua' | 'en' | 'pl'

const SLUG = 'documents'

const CERTIFICATE_URL = '/documents/atestat.jpg'
const AGREEMENT_URL = '/documents/dogovir-pryyednannya-fop-2025.pdf'

function documentsUa() {
  return {
    blockType: 'documents',
    heading: 'Документи',
    intro: 'Офіційні документи компанії Astra Cloud — доступні для перегляду та завантаження.',
    items: [
      { title: 'Атестат', fileUrl: CERTIFICATE_URL },
      { title: "Договір приєднання (ФОП Жовнір Ю.І., 2025)", fileUrl: AGREEMENT_URL },
    ],
    viewLinkLabel: 'Переглянути',
    downloadLinkLabel: 'Завантажити',
  }
}

function documentsEn() {
  return {
    blockType: 'documents',
    heading: 'Documents',
    intro: "Astra Cloud's official company documents — available to view and download.",
    items: [
      { title: 'Certificate', fileUrl: CERTIFICATE_URL },
      { title: 'Accession Agreement (FOP Zhovnir Yu.I., 2025)', fileUrl: AGREEMENT_URL },
    ],
    viewLinkLabel: 'View',
    downloadLinkLabel: 'Download',
  }
}

function documentsPl() {
  return {
    blockType: 'documents',
    heading: 'Dokumenty',
    intro: 'Oficjalne dokumenty firmy Astra Cloud — dostępne do przeglądania i pobrania.',
    items: [
      { title: 'Certyfikat', fileUrl: CERTIFICATE_URL },
      { title: 'Umowa przystąpienia (FOP Żownir J.I., 2025)', fileUrl: AGREEMENT_URL },
    ],
    viewLinkLabel: 'Zobacz',
    downloadLinkLabel: 'Pobierz',
  }
}

const contentByLocale: Record<Locale, ReturnType<typeof documentsUa>> = {
  ua: documentsUa(),
  en: documentsEn(),
  pl: documentsPl(),
}

const titleByLocale: Record<Locale, string> = {
  ua: 'Документи',
  en: 'Documents',
  pl: 'Dokumenty',
}

async function main() {
  const payload = await getPayload({ config })
  const locales: Locale[] = ['ua', 'en', 'pl']

  await seedLocalizedDoc(
    payload,
    'pages',
    SLUG,
    Object.fromEntries(
      locales.map((locale) => [
        locale,
        {
          title: titleByLocale.ua, // admin-only label, not localized — see Pages.ts
          slug: SLUG,
          blocks: [contentByLocale[locale]],
          publicationStatus: 'published' as const,
        },
      ]),
    ) as unknown as Record<Locale, Record<string, unknown>>,
  )
  console.log(`✔ documents page (/${SLUG}, ua/en/pl)`)

  console.log('Done.')
}

try {
  await main()
  process.exit(0)
} catch (err) {
  console.error(err)
  process.exit(1)
}
