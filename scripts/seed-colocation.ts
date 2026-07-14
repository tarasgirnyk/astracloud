/**
 * Seeds the Colocation page at /colocation (ua/en/pl — unified slug).
 * Hero matches the VPS page's hero style but with no CTA button, per
 * instruction. Body copy is original prose written from the factual
 * claims/pricing published at cloud.astra.in.ua/kolokacziya/ (service
 * description, features, and the full pricing table) — not a reproduction
 * of that page's text — in the established brand voice. The pricing table
 * is real business data (prices, service names), reorganized into a clean
 * 4-column table and entered as a native Lexical table so it's editable
 * directly in the admin's rich-text field, styled with our design tokens
 * (see SimpleContent's .lexical-table CSS).
 *
 * Run with: pnpm payload run scripts/seed-colocation.ts
 */
import { getPayload } from 'payload'
import config from '../payload.config.ts'
import { seedLocalizedDoc } from './seed-locale-helpers.ts'
import {
  bulletListNode,
  headingNode,
  paragraphNode,
  richTextDoc,
  tableCellNode,
  tableNode,
  tableRowNode,
} from './lexical-helpers.ts'

type Locale = 'ua' | 'en' | 'pl'

const SLUG = 'colocation'

interface PriceRow {
  label: string
  lviv2: string
  lviv1: string
  install: string
}

interface PriceSection {
  title: string
  rows: PriceRow[]
}

// Source figures from cloud.astra.in.ua/kolokacziya/'s pricing table — the
// numbers themselves don't need translation, only the row labels do.
const SECTIONS_UA: PriceSection[] = [
  {
    title: 'Гарантоване живлення (до 0.4 кВт)',
    rows: [
      { label: 'До 100 Вт', lviv2: '1 346,40', lviv1: '1 504,80', install: '1 000,00' },
      { label: 'До 200 Вт', lviv2: '2 692,80', lviv1: '3 009,60', install: '1 000,00' },
      { label: 'До 300 Вт', lviv2: '4 039,20', lviv1: '4 514,40', install: '1 000,00' },
      { label: 'До 400 Вт', lviv2: '5 385,60', lviv1: '6 019,20', install: '1 000,00' },
      { label: 'До 500 Вт', lviv2: '6 732,00', lviv1: '7 524,00', install: '2 000,00' },
      { label: 'До 600 Вт', lviv2: '8 078,40', lviv1: '9 028,80', install: '2 000,00' },
      { label: 'До 700 Вт', lviv2: '9 424,80', lviv1: '9 424,80', install: '2 000,00' },
      { label: 'До 800 Вт', lviv2: '10 771,20', lviv1: '10 771,20', install: '2 000,00' },
      { label: 'До 900 Вт', lviv2: '12 117,60', lviv1: '12 117,60', install: '2 000,00' },
    ],
  },
  {
    title: 'Розміщення в стійці',
    rows: [{ label: 'Розміщення в стійці 1U', lviv2: '500,00', lviv1: '600,00', install: '1 000,00' }],
  },
  {
    title: 'Гарантоване живлення (до 5 кВт)',
    rows: [
      { label: 'До 1 кВт', lviv2: '13 464,00', lviv1: '15 048,00', install: '5 000,00' },
      { label: 'До 1.5 кВт', lviv2: '20 196,00', lviv1: '22 572,00', install: '5 000,00' },
      { label: 'До 2 кВт', lviv2: '26 928,00', lviv1: '30 096,00', install: '5 000,00' },
      { label: 'До 3 кВт', lviv2: '40 392,00', lviv1: '45 144,00', install: '5 000,00' },
      { label: 'До 5 кВт', lviv2: '39 600,00', lviv1: '40 000,00', install: '10 000,00' },
    ],
  },
  {
    title: 'Оренда стійки',
    rows: [{ label: 'Оренда стійки 42U', lviv2: '6 000,00', lviv1: '6 000,00', install: '3 000,00' }],
  },
  {
    title: 'Інтернет послуги',
    rows: [
      { label: '100 Мбіт/с (негарантований)', lviv2: '0,00', lviv1: '0,00', install: '–' },
      { label: '1000 Мбіт/с (негарантований)', lviv2: '500,00', lviv1: '500,00', install: '–' },
      { label: '100 Мбіт/с (гарантований)', lviv2: '500,00', lviv1: '500,00', install: '–' },
      { label: '1000 Мбіт/с (гарантований)', lviv2: '4 000,00', lviv1: '4 000,00', install: '–' },
    ],
  },
  {
    title: 'IP-адреси (додаткові блоки)',
    rows: [
      { label: '/30', lviv2: '150,00', lviv1: '150,00', install: '100,00' },
      { label: '/29', lviv2: '300,00', lviv1: '300,00', install: '100,00' },
      { label: '/28', lviv2: '500,00', lviv1: '500,00', install: '100,00' },
      { label: '/27', lviv2: '950,00', lviv1: '950,00', install: '200,00' },
      { label: '/26', lviv2: '1 750,00', lviv1: '1 750,00', install: '200,00' },
      { label: '/25', lviv2: '3 200,00', lviv1: '3 200,00', install: '200,00' },
    ],
  },
  {
    title: 'Додаткові послуги',
    rows: [
      { label: 'Технічне обслуговування патчкорду', lviv2: '150,00', lviv1: '150,00', install: '1 000,00' },
      { label: 'Розміщення патч-панелі', lviv2: '500,00', lviv1: '500,00', install: '1 000,00' },
      { label: 'Виклик спеціаліста (до 2 год)', lviv2: '500,00', lviv1: '500,00', install: '–' },
      { label: 'Виклик у нічний час (22:00–8:00)', lviv2: '2 000,00', lviv1: '2 000,00', install: '–' },
    ],
  },
]

const SECTION_TITLES_EN: Record<string, string> = {
  'Гарантоване живлення (до 0.4 кВт)': 'Guaranteed power (up to 0.4 kW)',
  'Розміщення в стійці': 'Rack placement',
  'Гарантоване живлення (до 5 кВт)': 'Guaranteed power (up to 5 kW)',
  'Оренда стійки': 'Rack rental',
  'Інтернет послуги': 'Internet services',
  'IP-адреси (додаткові блоки)': 'IP addresses (additional blocks)',
  'Додаткові послуги': 'Additional services',
}
const SECTION_TITLES_PL: Record<string, string> = {
  'Гарантоване живлення (до 0.4 кВт)': 'Gwarantowane zasilanie (do 0,4 kW)',
  'Розміщення в стійці': 'Umieszczenie w szafie',
  'Гарантоване живлення (до 5 кВт)': 'Gwarantowane zasilanie (do 5 kW)',
  'Оренда стійки': 'Wynajem szafy',
  'Інтернет послуги': 'Usługi internetowe',
  'IP-адреси (додаткові блоки)': 'Adresy IP (dodatkowe pule)',
  'Додаткові послуги': 'Usługi dodatkowe',
}

const ROW_LABELS_EN: Record<string, string> = {
  'До 100 Вт': 'Up to 100 W',
  'До 200 Вт': 'Up to 200 W',
  'До 300 Вт': 'Up to 300 W',
  'До 400 Вт': 'Up to 400 W',
  'До 500 Вт': 'Up to 500 W',
  'До 600 Вт': 'Up to 600 W',
  'До 700 Вт': 'Up to 700 W',
  'До 800 Вт': 'Up to 800 W',
  'До 900 Вт': 'Up to 900 W',
  'Розміщення в стійці 1U': '1U rack space',
  'До 1 кВт': 'Up to 1 kW',
  'До 1.5 кВт': 'Up to 1.5 kW',
  'До 2 кВт': 'Up to 2 kW',
  'До 3 кВт': 'Up to 3 kW',
  'До 5 кВт': 'Up to 5 kW',
  'Оренда стійки 42U': '42U rack rental',
  '100 Мбіт/с (негарантований)': '100 Mbit/s (unmetered, best-effort)',
  '1000 Мбіт/с (негарантований)': '1000 Mbit/s (unmetered, best-effort)',
  '100 Мбіт/с (гарантований)': '100 Mbit/s (guaranteed)',
  '1000 Мбіт/с (гарантований)': '1000 Mbit/s (guaranteed)',
  'Технічне обслуговування патчкорду': 'Patch cord maintenance',
  'Розміщення патч-панелі': 'Patch panel placement',
  'Виклик спеціаліста (до 2 год)': 'On-site technician call-out (up to 2 h)',
  'Виклик у нічний час (22:00–8:00)': 'Night-time call-out (22:00–8:00)',
}
const ROW_LABELS_PL: Record<string, string> = {
  'До 100 Вт': 'Do 100 W',
  'До 200 Вт': 'Do 200 W',
  'До 300 Вт': 'Do 300 W',
  'До 400 Вт': 'Do 400 W',
  'До 500 Вт': 'Do 500 W',
  'До 600 Вт': 'Do 600 W',
  'До 700 Вт': 'Do 700 W',
  'До 800 Вт': 'Do 800 W',
  'До 900 Вт': 'Do 900 W',
  'Розміщення в стійці 1U': 'Miejsce w szafie 1U',
  'До 1 кВт': 'Do 1 kW',
  'До 1.5 кВт': 'Do 1,5 kW',
  'До 2 кВт': 'Do 2 kW',
  'До 3 кВт': 'Do 3 kW',
  'До 5 кВт': 'Do 5 kW',
  'Оренда стійки 42U': 'Wynajem szafy 42U',
  '100 Мбіт/с (негарантований)': '100 Mbit/s (bez gwarancji)',
  '1000 Мбіт/с (негарантований)': '1000 Mbit/s (bez gwarancji)',
  '100 Мбіт/с (гарантований)': '100 Mbit/s (gwarantowane)',
  '1000 Мбіт/с (гарантований)': '1000 Mbit/s (gwarantowane)',
  'Технічне обслуговування патчкорду': 'Konserwacja patchcorda',
  'Розміщення патч-панелі': 'Umieszczenie panelu krosowego',
  'Виклик спеціаліста (до 2 год)': 'Wezwanie specjalisty (do 2 godz.)',
  'Виклик у нічний час (22:00–8:00)': 'Wezwanie nocne (22:00–8:00)',
}

function translateSections(sections: PriceSection[], titles: Record<string, string>, labels: Record<string, string>): PriceSection[] {
  return sections.map((s) => ({
    title: titles[s.title] ?? s.title,
    rows: s.rows.map((r) => ({ ...r, label: labels[r.label] ?? r.label })),
  }))
}

function buildPriceTable(sections: PriceSection[], headers: [string, string, string, string]) {
  const rows = [
    tableRowNode([
      tableCellNode(headers[0], { header: true }),
      tableCellNode(headers[1], { header: true }),
      tableCellNode(headers[2], { header: true }),
      tableCellNode(headers[3], { header: true }),
    ]),
  ]
  for (const section of sections) {
    rows.push(tableRowNode([tableCellNode(section.title, { header: true, colSpan: 4 })]))
    for (const row of section.rows) {
      rows.push(tableRowNode([tableCellNode(row.label), tableCellNode(row.lviv2), tableCellNode(row.lviv1), tableCellNode(row.install)]))
    }
  }
  return tableNode(rows)
}

function heroBlock(heading: string, subheading: string, tagline: string) {
  return {
    blockType: 'hero',
    heading,
    subheading,
    tagline,
    imageSrc: '/images/mascot-colocation.png',
    imageFit: 'contain',
  }
}

function colocationUa() {
  return [
    heroBlock(
      'Колокація',
      "Розмістіть власне серверне обладнання у надійному дата-центрі — від одного пристрою до цілої стійки.",
      'Захист від перебоїв живлення, перегріву та відмов обладнання',
    ),
    {
      blockType: 'simple-content',
      content: richTextDoc([
        paragraphNode(
          'Astra Cloud розміщує обладнання клієнтів у власних дата-центрах у Львові — ДЦ Львів 1 та ДЦ Львів 2. Обладнання захищене від перебоїв живлення, перегріву та інших аварійних ситуацій цілодобовим моніторингом і резервними системами.',
        ),
        paragraphNode('ДЦ Львів 1 дає змогу розмістити обладнання в приміщенні колишнього бомбосховища.'),
        headingNode('h3', 'Що входить у послугу'),
        bulletListNode([
          'Розміщення обладнання будь-якого розміру — від 1U до цілих стійок',
          "Два незалежних джерела живлення з резервуванням (ДБЖ, дизель-генератори)",
          'Цілодобова робота 24/7/365',
          'Система кондиціонування для контролю температури та вологості',
          'Канали Інтернету від 100 Мбіт/с до 10 Гбіт/с',
          'Надання білих IP-адрес',
        ]),
        headingNode('h3', 'Тарифи на колокацію'),
        paragraphNode('Ціни вказано в гривнях на місяць, ПДВ включено.'),
        buildPriceTable(SECTIONS_UA, ['Послуга', 'ДЦ Львів 2', 'ДЦ Львів 1', 'Інсталяція']),
      ]),
    },
  ]
}

function colocationEn() {
  const sections = translateSections(SECTIONS_UA, SECTION_TITLES_EN, ROW_LABELS_EN)
  return [
    heroBlock(
      'Colocation',
      'Host your own server hardware in a reliable data center — from a single device to a full rack.',
      'Protection from power outages, overheating, and equipment failure',
    ),
    {
      blockType: 'simple-content',
      content: richTextDoc([
        paragraphNode(
          "Astra Cloud hosts clients' equipment in its own data centers in Lviv — DC Lviv 1 and DC Lviv 2. Equipment is protected from power outages, overheating, and other incidents through round-the-clock monitoring and redundant systems.",
        ),
        paragraphNode('DC Lviv 1 lets you host your equipment inside a former bomb shelter.'),
        headingNode('h3', "What's Included"),
        bulletListNode([
          'Equipment of any size — from 1U to full racks',
          'Two independent power feeds with redundancy (UPS, diesel generators)',
          'Round-the-clock operation, 24/7/365',
          'Climate control for temperature and humidity',
          'Internet channels from 100 Mbit/s to 10 Gbit/s',
          'Public (white) IP addresses',
        ]),
        headingNode('h3', 'Colocation Pricing'),
        paragraphNode('Prices are in Ukrainian hryvnia per month, VAT included.'),
        buildPriceTable(sections, ['Service', 'DC Lviv 2', 'DC Lviv 1', 'Installation']),
      ]),
    },
  ]
}

function colocationPl() {
  const sections = translateSections(SECTIONS_UA, SECTION_TITLES_PL, ROW_LABELS_PL)
  return [
    heroBlock(
      'Kolokacja',
      'Umieść własny sprzęt serwerowy w niezawodnym centrum danych — od jednego urządzenia po całą szafę.',
      'Ochrona przed przerwami w zasilaniu, przegrzaniem i awariami sprzętu',
    ),
    {
      blockType: 'simple-content',
      content: richTextDoc([
        paragraphNode(
          'Astra Cloud umieszcza sprzęt klientów we własnych centrach danych we Lwowie — CD Lwów 1 i CD Lwów 2. Sprzęt jest chroniony przed przerwami w zasilaniu, przegrzaniem i innymi awariami dzięki całodobowemu monitoringowi i systemom redundantnym.',
        ),
        paragraphNode('CD Lwów 1 pozwala umieścić sprzęt w pomieszczeniu dawnego schronu przeciwbombowego.'),
        headingNode('h3', 'Co obejmuje usługa'),
        bulletListNode([
          'Umieszczenie sprzętu dowolnego rozmiaru — od 1U po całe szafy',
          'Dwa niezależne źródła zasilania z redundancją (UPS, generatory diesla)',
          'Praca całodobowa 24/7/365',
          'System klimatyzacji kontrolujący temperaturę i wilgotność',
          'Łącza internetowe od 100 Mbit/s do 10 Gbit/s',
          'Udostępnienie publicznych adresów IP',
        ]),
        headingNode('h3', 'Cennik kolokacji'),
        paragraphNode('Ceny podane w hrywnach ukraińskich za miesiąc, z VAT.'),
        buildPriceTable(sections, ['Usługa', 'CD Lwów 2', 'CD Lwów 1', 'Instalacja']),
      ]),
    },
  ]
}

const pagesByLocale: Record<Locale, Record<string, unknown>[]> = {
  ua: colocationUa(),
  en: colocationEn(),
  pl: colocationPl(),
}

const titleByLocale: Record<Locale, string> = {
  ua: 'Колокація',
  en: 'Colocation',
  pl: 'Kolokacja',
}

async function main() {
  const payload = await getPayload({ config })
  const locales: Locale[] = ['ua', 'en', 'pl']

  await seedLocalizedDoc(
    payload,
    'service-pages',
    SLUG,
    Object.fromEntries(
      locales.map((locale) => [
        locale,
        {
          title: titleByLocale.ua, // admin-only label, not localized — see ServicePages.ts
          slug: SLUG,
          blocks: pagesByLocale[locale],
          publicationStatus: 'published' as const,
        },
      ]),
    ) as unknown as Record<Locale, Record<string, unknown>>,
  )
  console.log(`✔ colocation page (/${SLUG}, ua/en/pl)`)

  console.log('Done.')
}

try {
  await main()
  process.exit(0)
} catch (err) {
  console.error(err)
  process.exit(1)
}
