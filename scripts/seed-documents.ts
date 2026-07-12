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

  for (const locale of locales) {
    const existing = await payload.find({
      collection: 'pages',
      where: { and: [{ slug: { equals: SLUG } }, { locale: { equals: locale } }] },
      limit: 1,
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = {
      title: titleByLocale[locale],
      slug: SLUG,
      locale,
      blocks: [contentByLocale[locale]],
      publicationStatus: 'published' as const,
    }

    if (existing.docs[0]) {
      await payload.update({ collection: 'pages', id: existing.docs[0].id, data })
      console.log(`✔ documents page updated (${locale}, /${SLUG})`)
    } else {
      await payload.create({ collection: 'pages', data })
      console.log(`✔ documents page created (${locale}, /${SLUG})`)
    }
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
