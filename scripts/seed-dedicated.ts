/**
 * Seeds the Dedicated Server page at /dedicated (ua/en/pl — unified slug).
 * Mirrors seed-vps.ts's structure and the design-handoff screenshot for this
 * page. The pricing-cards block is fully live (constitution Principle
 * VIII) — hostbillCategoryId "3" is the real "Dedicated Server" category,
 * confirmed against the live HostBill instance (id=3, slug "-lang-dedic-").
 * Only 2 of its 3 products are currently visible there (Silver id=29, Gold
 * id=26); Platinum (id=27, 7000 UAH) exists but is marked hidden in
 * HostBill — toggle it visible there to show a third card, no code change
 * needed here.
 *
 * Run with: pnpm payload run scripts/seed-dedicated.ts
 */
import { getPayload } from 'payload'
import config from '../payload.config.ts'
import { seedLocalizedDoc } from './seed-locale-helpers.ts'

type Locale = 'ua' | 'en' | 'pl'

const SLUG = 'dedicated'

const partners = [
  { name: 'GigaTrans', href: 'https://gigatrans.ua' },
  { name: 'IX' },
  { name: 'Галком', href: 'https://galcom.net.ua' },
  { name: 'Türk Telekom International', href: 'https://www.turktelekomint.com' },
]

const pricingCardsCopy: Record<Locale, { eyebrow: string; heading: string; subheading: string }> = {
  ua: {
    eyebrow: 'Виділені сервери',
    heading: 'Оберіть конфігурацію сервера',
    subheading: 'Потужне обладнання з гарантованими ресурсами для будь-яких задач.',
  },
  en: {
    eyebrow: 'Dedicated Servers',
    heading: 'Choose your server configuration',
    subheading: 'Powerful hardware with guaranteed resources for any workload.',
  },
  pl: {
    eyebrow: 'Serwery dedykowane',
    heading: 'Wybierz konfigurację serwera',
    subheading: 'Wydajny sprzęt z gwarantowanymi zasobami do każdego zadania.',
  },
}

function pricingCardsBlock(locale: Locale) {
  return {
    blockType: 'vps-pricing-cards',
    ...pricingCardsCopy[locale],
    hostbillCategoryId: '3',
  }
}

function dedicatedUa() {
  return [
    {
      blockType: 'hero',
      heading: 'Оренда виділеного сервера',
      subheading:
        'Отримайте продуктивний фізичний сервер без витрат на купівлю та обслуговування обладнання. Ми забезпечуємо інфраструктуру, моніторинг і підтримку, а ви зосереджуєтесь на розвитку свого бізнесу.',
      tagline: 'Повний контроль, швидкий старт і стабільна робота 24/7',
      imageSrc: '/images/dedic_page1.png',
      imageFit: 'contain',
    },
    { blockType: 'partners', title: 'Нам довіряють', partners },
    pricingCardsBlock('ua'),
    {
      blockType: 'consultation',
      tone: 'light',
      splitCard: true,
      badgeLabel: '⚙️ Індивідуальний підхід',
      heading: 'Потрібна індивідуальна конфігурація?',
      subheading:
        "Створимо серверне рішення під ваші задачі — від підбору заліза до налаштування під навантаження. Менеджер зв'яжеться з вами протягом робочого дня.",
      ctaLabel: 'Отримати консультацію',
      ctaHref: '#contact',
      microcopy: "Безкоштовно · без зобов'язань",
      illustrationSrc: '/images/mascot-contact-us.png',
    },
    {
      blockType: 'advantages',
      tone: 'dark',
      centered: true,
      accent: 'orange',
      eyebrow: 'Виділені сервери',
      heading: 'Переваги для вашого бізнесу',
      description:
        "На відміну від віртуальних серверів, виділений сервер забезпечує повний доступ до фізичного обладнання. Усі процесорні ресурси, оперативна пам'ять та дискова підсистема працюють виключно для вашого проєкту. Це особливо важливо для баз даних, CRM та ERP-систем, віртуалізації, інтернет-магазинів і сервісів із постійним навантаженням, де критичними є стабільність роботи, швидкодія та можливість гнучкого налаштування інфраструктури.",
      statsBar: [
        { value: '24/7', label: 'моніторинг та підтримка' },
        { value: '30 днів', label: 'гарантія повернення коштів' },
        { value: '100%', label: 'виділених ресурсів сервера' },
      ],
      grid: [
        {
          icon: 'target',
          title: 'Виділена продуктивність',
          text: 'Усі ресурси сервера належать тільки вашому проєкту — без оверсейлінгу та впливу інших користувачів.',
        },
        {
          icon: 'lock',
          title: 'Повний контроль',
          text: 'Повний root-доступ і можливість налаштувати сервер під будь-які задачі та середовище.',
        },
        {
          icon: 'gauge',
          title: 'Висока стабільність',
          text: 'Сервер працює передбачувано навіть під навантаженням завдяки ізольованій інфраструктурі.',
        },
        {
          icon: 'trend',
          title: 'Готовність до зростання',
          text: 'Легке масштабування конфігурації під ріст проєкту та збільшення навантаження.',
        },
        {
          icon: 'headset',
          title: 'Професійна підтримка',
          text: 'Допомога з налаштуванням, міграцією та вирішенням технічних питань у будь-який час.',
        },
        {
          icon: 'shield',
          title: 'Надійна інфраструктура',
          text: 'Розміщення в дата-центрі з резервним живленням, охолодженням і цілодобовим моніторингом.',
        },
      ],
    },
  ]
}

function dedicatedEn() {
  return [
    {
      blockType: 'hero',
      heading: 'Dedicated Server Rental',
      subheading:
        'Get a powerful physical server without the cost of purchasing and maintaining hardware. We provide the infrastructure, monitoring, and support, so you can focus on growing your business.',
      tagline: 'Full control, a fast start, and stable operation 24/7',
      imageSrc: '/images/dedic_page1.png',
      imageFit: 'contain',
    },
    { blockType: 'partners', title: 'Trusted by', partners },
    pricingCardsBlock('en'),
    {
      blockType: 'consultation',
      tone: 'light',
      splitCard: true,
      badgeLabel: '⚙️ Custom approach',
      heading: 'Need a custom configuration?',
      subheading:
        "We'll build a server solution around your workload — from picking the hardware to tuning it for your load. A manager will reach out within one business day.",
      ctaLabel: 'Get a consultation',
      ctaHref: '#contact',
      microcopy: 'Free · no obligations',
      illustrationSrc: '/images/mascot-contact-us.png',
    },
    {
      blockType: 'advantages',
      tone: 'dark',
      centered: true,
      accent: 'orange',
      eyebrow: 'Dedicated Servers',
      heading: 'Advantages for your business',
      description:
        'Unlike virtual servers, a dedicated server gives you full access to physical hardware. All CPU resources, RAM, and disk subsystem work exclusively for your project. This matters most for databases, CRM/ERP systems, virtualization, e-commerce, and services under constant load, where stability, speed, and flexible infrastructure configuration are critical.',
      statsBar: [
        { value: '24/7', label: 'monitoring and support' },
        { value: '30 days', label: 'money-back guarantee' },
        { value: '100%', label: 'dedicated server resources' },
      ],
      grid: [
        {
          icon: 'target',
          title: 'Dedicated performance',
          text: "All server resources belong solely to your project — no overselling and no impact from other users.",
        },
        {
          icon: 'lock',
          title: 'Full control',
          text: 'Full root access and the ability to configure the server for any task or environment.',
        },
        {
          icon: 'gauge',
          title: 'High stability',
          text: 'The server performs predictably even under load, thanks to isolated infrastructure.',
        },
        {
          icon: 'trend',
          title: 'Ready to scale',
          text: 'Easily scale the configuration as your project grows and load increases.',
        },
        {
          icon: 'headset',
          title: 'Professional support',
          text: 'Help with setup, migration, and resolving technical issues at any time.',
        },
        {
          icon: 'shield',
          title: 'Reliable infrastructure',
          text: 'Hosted in a data center with backup power, cooling, and round-the-clock monitoring.',
        },
      ],
    },
  ]
}

function dedicatedPl() {
  return [
    {
      blockType: 'hero',
      heading: 'Wynajem serwera dedykowanego',
      subheading:
        'Otrzymaj wydajny serwer fizyczny bez kosztów zakupu i utrzymania sprzętu. Zapewniamy infrastrukturę, monitoring i wsparcie, a Ty skupiasz się na rozwoju swojego biznesu.',
      tagline: 'Pełna kontrola, szybki start i stabilna praca 24/7',
      imageSrc: '/images/dedic_page1.png',
      imageFit: 'contain',
    },
    { blockType: 'partners', title: 'Zaufali nam', partners },
    pricingCardsBlock('pl'),
    {
      blockType: 'consultation',
      tone: 'light',
      splitCard: true,
      badgeLabel: '⚙️ Indywidualne podejście',
      heading: 'Potrzebujesz indywidualnej konfiguracji?',
      subheading:
        'Stworzymy rozwiązanie serwerowe pod Twoje zadania — od doboru sprzętu po konfigurację pod obciążenie. Menedżer skontaktuje się z Tobą w ciągu dnia roboczego.',
      ctaLabel: 'Otrzymaj konsultację',
      ctaHref: '#contact',
      microcopy: 'Bezpłatnie · bez zobowiązań',
      illustrationSrc: '/images/mascot-contact-us.png',
    },
    {
      blockType: 'advantages',
      tone: 'dark',
      centered: true,
      accent: 'orange',
      eyebrow: 'Serwery dedykowane',
      heading: 'Korzyści dla Twojego biznesu',
      description:
        'W odróżnieniu od serwerów wirtualnych, serwer dedykowany zapewnia pełny dostęp do fizycznego sprzętu. Wszystkie zasoby procesora, pamięć RAM i podsystem dyskowy pracują wyłącznie dla Twojego projektu. Ma to szczególne znaczenie dla baz danych, systemów CRM i ERP, wirtualizacji, sklepów internetowych oraz usług o stałym obciążeniu, gdzie kluczowe są stabilność pracy, wydajność i możliwość elastycznej konfiguracji infrastruktury.',
      statsBar: [
        { value: '24/7', label: 'monitoring i wsparcie' },
        { value: '30 dni', label: 'gwarancja zwrotu pieniędzy' },
        { value: '100%', label: 'dedykowanych zasobów serwera' },
      ],
      grid: [
        {
          icon: 'target',
          title: 'Dedykowana wydajność',
          text: 'Wszystkie zasoby serwera należą wyłącznie do Twojego projektu — bez oversellingu i wpływu innych użytkowników.',
        },
        {
          icon: 'lock',
          title: 'Pełna kontrola',
          text: 'Pełny dostęp root i możliwość skonfigurowania serwera do dowolnych zadań i środowiska.',
        },
        {
          icon: 'gauge',
          title: 'Wysoka stabilność',
          text: 'Serwer działa przewidywalnie nawet pod obciążeniem dzięki izolowanej infrastrukturze.',
        },
        {
          icon: 'trend',
          title: 'Gotowość do skalowania',
          text: 'Łatwe skalowanie konfiguracji wraz ze wzrostem projektu i zwiększeniem obciążenia.',
        },
        {
          icon: 'headset',
          title: 'Profesjonalne wsparcie',
          text: 'Pomoc w konfiguracji, migracji i rozwiązywaniu problemów technicznych o każdej porze.',
        },
        {
          icon: 'shield',
          title: 'Niezawodna infrastruktura',
          text: 'Umieszczenie w centrum danych z zasilaniem awaryjnym, chłodzeniem i całodobowym monitoringiem.',
        },
      ],
    },
  ]
}

const pagesByLocale: Record<Locale, Record<string, unknown>[]> = {
  ua: dedicatedUa(),
  en: dedicatedEn(),
  pl: dedicatedPl(),
}

const titleByLocale: Record<Locale, string> = {
  ua: 'Оренда виділеного сервера',
  en: 'Dedicated Server Rental',
  pl: 'Wynajem serwera dedykowanego',
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
  console.log(`✔ dedicated page (/${SLUG}, ua/en/pl)`)

  console.log('Done.')
}

try {
  await main()
  process.exit(0)
} catch (err) {
  console.error(err)
  process.exit(1)
}
