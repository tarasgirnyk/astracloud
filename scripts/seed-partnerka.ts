/**
 * Seeds the real "Партнерка" (affiliate/referral program) page content at
 * /partnerka (ua, no prefix), /en/partnerka, /pl/partnerka — hero + the
 * zigzag "Що потрібно зробити?" steps section, reproducing
 * design-handoff/project/templates/referral/Referral.dc.html for
 * production. FAQ items for this page live in the FaqItems collection (see
 * seed-faq-items.ts) and render automatically via PageFaq.tsx — no FAQ
 * block is placed here. Also adds a top-level "Партнерка" nav link to the
 * site-chrome global (after the existing "Компанія" dropdown) for each
 * locale, if not already present.
 *
 * The hero's CTA links to '/affiliates/signup' — a portable sentinel
 * expanded into an absolute HostBill storefront URL at render time (see
 * resolveHostbillHref in src/billing-adapter/adapters/hostbill/
 * hostbill-storefront-url.ts), so it always points at whichever
 * HOSTBILL_STOREFRONT_URL the running environment's .env defines.
 *
 * Run with: node --env-file=.env --experimental-strip-types scripts/seed-partnerka.ts
 */
import { getPayload } from 'payload'
import config from '../payload.config.ts'
import { seedLocalizedDoc } from './seed-locale-helpers.ts'

type Locale = 'ua' | 'en' | 'pl'
const LOCALES: Locale[] = ['ua', 'en', 'pl']

const SLUG = 'partnerka'

const navLabel: Record<Locale, string> = {
  ua: 'Партнерка',
  en: 'Affiliate Program',
  pl: 'Program partnerski',
}

const navHref: Record<Locale, string> = {
  ua: '/partnerka',
  en: '/en/partnerka',
  pl: '/pl/partnerka',
}

const pageTitle: Record<Locale, string> = {
  ua: 'Партнерка',
  en: 'Affiliate Program',
  pl: 'Program partnerski',
}

const hero: Record<
  Locale,
  { heading: string; subheading: string; ctaLabel: string }
> = {
  ua: {
    heading: 'Заробляйте з Astra Cloud',
    subheading:
      'Діліться своїм реферальним посиланням із друзями та підписниками — і отримуйте комісію за кожного нового клієнта.',
    ctaLabel: 'Зареєструватися',
  },
  en: {
    heading: 'Earn with Astra Cloud',
    subheading:
      'Share your referral link with friends and followers — and earn a commission for every new client.',
    ctaLabel: 'Sign up',
  },
  pl: {
    heading: 'Zarabiaj z Astra Cloud',
    subheading:
      'Dziel się swoim linkiem partnerskim ze znajomymi i obserwującymi — i otrzymuj prowizję za każdego nowego klienta.',
    ctaLabel: 'Zarejestruj się',
  },
}

const stepsHeading: Record<Locale, { eyebrow: string; heading: string }> = {
  ua: { eyebrow: 'Без зайвих кроків', heading: 'Що потрібно зробити?' },
  en: { eyebrow: 'No extra steps', heading: 'What do you need to do?' },
  pl: { eyebrow: 'Bez zbędnych kroków', heading: 'Co należy zrobić?' },
}

const stepItems: Record<Locale, { text: string; imageSrc: string }[]> = {
  ua: [
    {
      text: 'Реєструватися окремо не потрібно — посилання вже є у вашому особистому кабінеті.',
      imageSrc: '/images/hero3.png',
    },
    { text: 'Копіюйте посилання і діліться ним, де завгодно.', imageSrc: '/images/pp2.png' },
    {
      text: 'Скористайтеся готовими рекламними банерами з розділу «Реферальна програма» в кабінеті, щоб залучати нових клієнтів було простіше.',
      imageSrc: '/images/pp3.png',
    },
  ],
  en: [
    {
      text: 'No separate registration needed — your link is already in your client area.',
      imageSrc: '/images/hero3.png',
    },
    { text: 'Copy the link and share it anywhere.', imageSrc: '/images/pp2.png' },
    {
      text: 'Use the ready-made promotional banners from the "Affiliate Program" section in your client area to make attracting new clients easier.',
      imageSrc: '/images/pp3.png',
    },
  ],
  pl: [
    {
      text: 'Rejestracja osobno nie jest potrzebna — link jest już dostępny w Waszym panelu klienta.',
      imageSrc: '/images/hero3.png',
    },
    { text: 'Skopiujcie link i dzielcie się nim gdziekolwiek.', imageSrc: '/images/pp2.png' },
    {
      text: 'Skorzystajcie z gotowych banerów reklamowych z sekcji „Program partnerski” w panelu klienta, aby łatwiej przyciągać nowych klientów.',
      imageSrc: '/images/pp3.png',
    },
  ],
}

function heroBlock(locale: Locale) {
  return {
    blockType: 'hero' as const,
    heading: hero[locale].heading,
    subheading: hero[locale].subheading,
    imageSrc: '/images/pp00.png',
    ctaLabel: hero[locale].ctaLabel,
    ctaHref: '/affiliates/signup',
  }
}

function stepsBlock(locale: Locale) {
  return {
    blockType: 'steps' as const,
    eyebrow: stepsHeading[locale].eyebrow,
    heading: stepsHeading[locale].heading,
    items: stepItems[locale],
  }
}

async function main() {
  const payload = await getPayload({ config })

  await seedLocalizedDoc(payload, 'pages', SLUG, {
    ua: {
      title: pageTitle.ua,
      slug: SLUG,
      blocks: [heroBlock('ua'), stepsBlock('ua')],
      publicationStatus: 'published',
    },
    en: {
      title: pageTitle.en,
      slug: SLUG,
      blocks: [heroBlock('en'), stepsBlock('en')],
      publicationStatus: 'published',
    },
    pl: {
      title: pageTitle.pl,
      slug: SLUG,
      blocks: [heroBlock('pl'), stepsBlock('pl')],
      publicationStatus: 'published',
    },
  })
  console.log(`✔ partnerka page (/${SLUG}, ua/en/pl)`)

  for (const locale of LOCALES) {
    const chrome = await payload.findGlobal({ slug: 'site-chrome', locale })
    const navLinks = Array.isArray(chrome.navLinks) ? chrome.navLinks : []

    if (navLinks.some((link) => link?.href === navHref[locale])) {
      console.log(`  (nav link already present for ${locale}, skipping)`)
      continue
    }

    await payload.updateGlobal({
      slug: 'site-chrome',
      locale,
      data: { navLinks: [...navLinks, { label: navLabel[locale], href: navHref[locale] }] },
    })
    console.log(`✔ nav link added for ${locale}`)
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
