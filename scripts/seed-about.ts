/**
 * Seeds the "About Us" page at /about (ua, no prefix), /en/about, /pl/about.
 * The slug is intentionally the SAME across all three locales — matching
 * the "home" page's convention — because LanguageSwitcher swaps only the
 * locale segment of the current path, not the slug; per-locale slugs (e.g.
 * ua "pro-nas" vs en "about") made switching languages 404.
 *
 * Copy is original prose written from the factual claims on
 * https://cloud.astra.in.ua/pro-nas-2/ (services offered, infrastructure
 * qualities, target customers, support, location/contacts) — not a
 * reproduction of that page's text — in the same brand voice established
 * for the homepage (formal "ви", confident, concrete over hypey).
 *
 * Run with: pnpm payload run scripts/seed-about.ts
 */
import { getPayload } from 'payload'
import config from '../payload.config.ts'
import { bulletListNode, headingNode, paragraphNode, richTextDoc } from './lexical-helpers.ts'

type Locale = 'ua' | 'en' | 'pl'
type Section = { heading?: string; paragraphs: string[]; listItems?: string[] }

const SLUG = 'about'

// Previous (locale-specific) slugs this script used before the fix above —
// kept only so this run can clean up the stray docs it created.
const staleSlugByLocale: Record<Locale, string | null> = {
  ua: 'pro-nas',
  en: null,
  pl: 'o-nas',
}

function block(pageTitle: string, sections: Section[]) {
  return {
    blockType: 'simple-content',
    pageTitle,
    content: richTextDoc(
      sections.flatMap((s) => [
        ...(s.heading ? [headingNode('h3', s.heading)] : []),
        ...s.paragraphs.map((text) => paragraphNode(text)),
        ...(s.listItems?.length ? [bulletListNode(s.listItems)] : []),
      ]),
    ),
  }
}

const aboutUa = block('Про нас', [
  {
    paragraphs: [
      'Astra Cloud — провайдер хмарної інфраструктури та дата-центр рішень в Україні. Ми пропонуємо повний спектр послуг для бізнесу та ІТ-проєктів: від віртуальних серверів до колокації власного обладнання.',
      'Свою інфраструктуру ми будуємо з акцентом на стабільність, продуктивність та безпеку — щоб ви могли впевнено розгортати й масштабувати сервіси, не турбуючись про інфраструктурні ризики.',
    ],
  },
  {
    heading: 'Наші послуги',
    paragraphs: [
      'Ми надаємо віртуальні сервери (VPS), оренду виділених серверів та колокацію обладнання — обираєте формат, який відповідає вашим завданням і бюджету.',
    ],
  },
  {
    heading: 'Наша інфраструктура',
    paragraphs: [
      "Стабільне мережеве з'єднання, низька затримка та передбачувана доступність — інфраструктура постійно моніториться, щоб відповідати високим стандартам якості.",
    ],
  },
  {
    heading: 'Кому ми допомагаємо',
    paragraphs: [
      'Наші клієнти — бізнеси, розробники, стартапи та онлайн-сервіси, яким потрібна надійна робота та гнучкість ресурсів. Рішення адаптуються від невеликих задач до високонавантажених систем.',
    ],
  },
  {
    heading: 'Підтримка',
    paragraphs: [
      'Технічна підтримка доступна цілодобово — ми на зв\'язку, щоб оперативно відповісти на запитання та підтримати стабільність ваших сервісів.',
    ],
  },
  {
    heading: 'Контакти',
    paragraphs: ['Україна, м. Львів.'],
    listItems: ['063 636 3448', 'cloud@astra.in.ua'],
  },
])

const aboutEn = block('About Us', [
  {
    paragraphs: [
      'Astra Cloud is a cloud infrastructure and data center provider based in Ukraine. We offer a full range of services for businesses and IT projects — from virtual servers to colocation for your own hardware.',
      'We build our infrastructure around stability, performance, and security, so you can deploy and scale your services with confidence, without worrying about infrastructure risk.',
    ],
  },
  {
    heading: 'Our Services',
    paragraphs: [
      'We provide virtual private servers (VPS), dedicated server rentals, and equipment colocation — pick the format that fits your needs and budget.',
    ],
  },
  {
    heading: 'Our Infrastructure',
    paragraphs: [
      'Stable network connectivity, low latency, and predictable uptime — our infrastructure is continuously monitored to meet a high quality standard.',
    ],
  },
  {
    heading: 'Who We Help',
    paragraphs: [
      'Our clients are businesses, developers, startups, and online services that need reliable operation and flexible resources. Our solutions scale from small tasks to high-load systems.',
    ],
  },
  {
    heading: 'Support',
    paragraphs: [
      "Technical support is available around the clock — we're on hand to answer questions quickly and keep your services running smoothly.",
    ],
  },
  {
    heading: 'Contacts',
    paragraphs: ['Lviv, Ukraine.'],
    listItems: ['+380 63 636 3448', 'cloud@astra.in.ua'],
  },
])

const aboutPl = block('O nas', [
  {
    paragraphs: [
      'Astra Cloud to dostawca infrastruktury chmurowej i rozwiązań data center na Ukrainie. Oferujemy pełen zakres usług dla biznesu i projektów IT — od serwerów wirtualnych po kolokację własnego sprzętu.',
      'Naszą infrastrukturę budujemy z naciskiem na stabilność, wydajność i bezpieczeństwo — abyście mogli pewnie wdrażać i skalować usługi, nie martwiąc się o ryzyko infrastrukturalne.',
    ],
  },
  {
    heading: 'Nasze usługi',
    paragraphs: [
      'Oferujemy serwery wirtualne (VPS), wynajem serwerów dedykowanych oraz kolokację sprzętu — wybierzcie format dopasowany do Waszych potrzeb i budżetu.',
    ],
  },
  {
    heading: 'Nasza infrastruktura',
    paragraphs: [
      'Stabilne połączenie sieciowe, niskie opóźnienia i przewidywalna dostępność — infrastruktura jest stale monitorowana, aby spełniać wysoki standard jakości.',
    ],
  },
  {
    heading: 'Komu pomagamy',
    paragraphs: [
      'Naszymi klientami są firmy, programiści, startupy i serwisy online, które potrzebują niezawodnego działania i elastyczności zasobów. Nasze rozwiązania skalują się od małych zadań po systemy o dużym obciążeniu.',
    ],
  },
  {
    heading: 'Wsparcie',
    paragraphs: [
      'Wsparcie techniczne jest dostępne całodobowo — jesteśmy do dyspozycji, aby szybko odpowiedzieć na pytania i utrzymać stabilność Waszych usług.',
    ],
  },
  {
    heading: 'Kontakt',
    paragraphs: ['Lwów, Ukraina.'],
    listItems: ['+380 63 636 3448', 'cloud@astra.in.ua'],
  },
])

const contentByLocale: Record<Locale, ReturnType<typeof block>> = {
  ua: aboutUa,
  en: aboutEn,
  pl: aboutPl,
}

const titleByLocale: Record<Locale, string> = {
  ua: 'Про нас',
  en: 'About Us',
  pl: 'O nas',
}

async function main() {
  const payload = await getPayload({ config })
  const locales: Locale[] = ['ua', 'en', 'pl']

  for (const locale of locales) {
    const staleSlug = staleSlugByLocale[locale]
    if (staleSlug) {
      const stale = await payload.find({
        collection: 'pages',
        where: { and: [{ slug: { equals: staleSlug } }, { locale: { equals: locale } }] },
        limit: 1,
      })
      if (stale.docs[0]) {
        await payload.delete({ collection: 'pages', id: stale.docs[0].id })
        console.log(`  (removed stale /${staleSlug} doc for ${locale})`)
      }
    }

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
      console.log(`✔ about page updated (${locale}, /${SLUG})`)
    } else {
      await payload.create({ collection: 'pages', data })
      console.log(`✔ about page created (${locale}, /${SLUG})`)
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
