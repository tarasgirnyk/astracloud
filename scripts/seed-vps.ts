/**
 * Seeds the VPS product page at /vps (ua/en/pl — unified slug).
 * Follows design-handoff/project/templates/vps/vps.html block-by-block.
 *
 * The pricing-cards block is fully live now — no per-plan CMS content at
 * all (constitution Principle VIII). It only stores which HostBill category
 * to list (id "1", the real "Linux VPS" category, confirmed against the
 * live HostBill instance) and, optionally, which product to badge as
 * recommended. Name, price, and specs all come from HostBill at render
 * time — see Component.tsx / get-live-products.ts.
 *
 * Run with: pnpm payload run scripts/seed-vps.ts
 */
import { getPayload } from 'payload'
import config from '../payload.config.ts'
import { seedLocalizedDoc } from './seed-locale-helpers.ts'

type Locale = 'ua' | 'en' | 'pl'

const SLUG = 'vps'

const vpsPricingCardsCopy: Record<Locale, { eyebrow: string; heading: string; subheading: string }> = {
  ua: {
    eyebrow: 'VPS-сервери',
    heading: 'Оберіть свою орбіту',
    subheading: 'NVMe-диски, миттєве розгортання та цілодобовий моніторинг у кожному тарифі.',
  },
  en: {
    eyebrow: 'VPS Servers',
    heading: 'Choose your orbit',
    subheading: 'NVMe drives, instant deployment, and round-the-clock monitoring in every plan.',
  },
  pl: {
    eyebrow: 'Serwery VPS',
    heading: 'Wybierz swoją orbitę',
    subheading: 'Dyski NVMe, błyskawiczne wdrożenie i całodobowy monitoring w każdej taryfie.',
  },
}

function vpsPricingCardsBlock(locale: Locale) {
  return {
    blockType: 'vps-pricing-cards',
    ...vpsPricingCardsCopy[locale],
    hostbillCategoryId: '1',
  }
}

const partners = [
  { name: 'GigaTrans', href: 'https://gigatrans.ua' },
  { name: 'IX' },
  { name: 'Галком', href: 'https://galcom.net.ua' },
  { name: 'Türk Telekom International', href: 'https://www.turktelekomint.com' },
]

const pagesByLocale: Record<Locale, Record<string, unknown>[]> = {
  ua: [
    {
      blockType: 'hero',
      heading: 'VPS-сервери для швидких і стабільних проєктів',
      subheading:
        'Запускайте сайти, CRM, додатки та бізнес-рішення на потужній інфраструктурі з гнучким масштабуванням ресурсів.',
      tagline: 'Повний контроль, швидкий старт і стабільна робота 24/7',
      imageSrc: '/images/vps_page.png',
      imageFit: 'contain',
    },
    { blockType: 'partners', title: 'Нам довіряють', partners },
    vpsPricingCardsBlock('ua'),
    {
      blockType: 'consultation',
      tone: 'light',
      splitCard: true,
      badgeLabel: '⚙️ Індивідуальний підхід',
      heading: 'Не знаєте, що обрати?',
      subheading: 'Ми швидко підкажемо оптимальний тариф під ваш проєкт і бюджет.',
      ctaLabel: 'Отримати консультацію',
      ctaHref: '#contact',
      microcopy: "Безкоштовно · без зобов'язань",
      illustrationSrc: '/images/mascot-contact-us.png',
    },
    {
      blockType: 'architecture',
      heading: 'Стабільність і надійність, закладені в архітектурі',
      subheading: 'KVM-віртуалізація з розподіленим сховищем Ceph',
      description:
        'Ваші VPS працюють на базі KVM-віртуалізації, що забезпечує повну ізоляцію ресурсів і стабільну продуктивність. Для зберігання даних використовується розподілене сховище Ceph, яке гарантує високу надійність і доступність інформації.',
      checklistLabel: 'Що це дає вам',
      checklist: [
        { text: 'Повна ізоляція кожного VPS' },
        { text: 'Гарантовані ресурси без впливу інших користувачів' },
        { text: 'Висока відмовостійкість завдяки розподіленому сховищу' },
        { text: 'Захист даних при збоях обладнання' },
        { text: 'Стабільна продуктивність навіть під навантаженням' },
        { text: 'Можливість масштабування без втрати даних' },
      ],
    },
    {
      blockType: 'advantages',
      tone: 'light',
      heading: 'Чому обирають Astra Cloud',
      grid: [
        {
          icon: '🛡️',
          title: '30-денна гарантія повернення грошей',
          text: 'Якщо ви купите у нас VDS-сервер і щось не сподобається, ми застрахуємо вас від втрати грошей. Ми повернемо гроші за послугу протягом перших 30 днів використання.',
        },
        {
          icon: '🎧',
          title: 'Компетентна техпідтримка',
          text: 'Кваліфіковані спеціалісти цілодобово контролюють роботу нашої інфраструктури, щоб ваші сервіси працювали безперервно та стабільно.',
        },
        {
          icon: '💽',
          title: 'NVMe-диски для максимальної швидкодії',
          text: 'Завдяки сучасним NVMe-накопичувачам ваші сайти, бази даних та бізнес-додатки працюють значно швидше, забезпечуючи миттєвий доступ до даних і високу продуктивність навіть під навантаженням.',
        },
        {
          icon: '📊',
          title: 'Контроль серверів у реальному часі',
          text: 'Отримуйте актуальну інформацію про стан VPS безпосередньо в особистому кабінеті — продуктивність, ресурси та доступність у будь-який момент.',
        },
        {
          icon: '🚀',
          title: 'Швидка активація VPS',
          text: 'Ваш сервер готовий до роботи вже через кілька хвилин після оплати — без ручних затримок і очікування. Ви одразу отримуєте доступ і можете запускати свої проєкти.',
        },
        {
          icon: '🗄️',
          title: 'Автоматичне резервне копіювання',
          text: 'Ваші дані захищені завдяки регулярним резервним копіям, що дозволяє швидко відновити систему у разі збоїв або помилок.',
        },
      ],
    },
  ],
  en: [
    {
      blockType: 'hero',
      heading: 'VPS servers for fast, stable projects',
      subheading:
        'Run websites, CRMs, apps, and business solutions on powerful infrastructure with flexible resource scaling.',
      tagline: 'Full control, a fast start, and stable operation 24/7',
      imageSrc: '/images/vps_page.png',
      imageFit: 'contain',
    },
    { blockType: 'partners', title: 'Trusted by', partners },
    vpsPricingCardsBlock('en'),
    {
      blockType: 'consultation',
      tone: 'light',
      splitCard: true,
      badgeLabel: '⚙️ Custom approach',
      heading: "Not sure what to choose?",
      subheading: "We'll quickly suggest the right plan for your project and budget.",
      ctaLabel: 'Get a consultation',
      ctaHref: '#contact',
      microcopy: 'Free · no obligations',
      illustrationSrc: '/images/mascot-contact-us.png',
    },
    {
      blockType: 'architecture',
      heading: 'Stability and reliability, built into the architecture',
      subheading: 'KVM virtualization with distributed Ceph storage',
      description:
        'Your VPS runs on KVM virtualization, which ensures full resource isolation and stable performance. Data is stored on distributed Ceph storage, guaranteeing high reliability and availability.',
      checklistLabel: 'What this means for you',
      checklist: [
        { text: 'Full isolation for every VPS' },
        { text: "Guaranteed resources, unaffected by other users" },
        { text: 'High fault tolerance thanks to distributed storage' },
        { text: 'Data protection in case of hardware failure' },
        { text: 'Stable performance even under load' },
        { text: 'Scalability with no data loss' },
      ],
    },
    {
      blockType: 'advantages',
      tone: 'light',
      heading: 'Why choose Astra Cloud',
      grid: [
        {
          icon: '🛡️',
          title: '30-day money-back guarantee',
          text: "If you buy a VDS server from us and something doesn't work out, you're covered — we'll refund you within the first 30 days of use.",
        },
        {
          icon: '🎧',
          title: 'Competent technical support',
          text: 'Qualified specialists monitor our infrastructure around the clock, so your services keep running smoothly and reliably.',
        },
        {
          icon: '💽',
          title: 'NVMe drives for maximum speed',
          text: 'Modern NVMe drives make your websites, databases, and business apps significantly faster, with instant data access and high performance even under load.',
        },
        {
          icon: '📊',
          title: 'Real-time server monitoring',
          text: 'Get up-to-date information about your VPS right in your account — performance, resources, and availability at any moment.',
        },
        {
          icon: '🚀',
          title: 'Fast VPS activation',
          text: 'Your server is ready within minutes of payment — no manual delays or waiting. You get instant access and can start your projects right away.',
        },
        {
          icon: '🗄️',
          title: 'Automatic backups',
          text: 'Your data is protected by regular backups, letting you restore your system quickly in case of failures or errors.',
        },
      ],
    },
  ],
  pl: [
    {
      blockType: 'hero',
      heading: 'Serwery VPS dla szybkich i stabilnych projektów',
      subheading:
        'Uruchamiaj strony, CRM-y, aplikacje i rozwiązania biznesowe na wydajnej infrastrukturze z elastycznym skalowaniem zasobów.',
      tagline: 'Pełna kontrola, szybki start i stabilna praca 24/7',
      imageSrc: '/images/vps_page.png',
      imageFit: 'contain',
    },
    { blockType: 'partners', title: 'Zaufali nam', partners },
    vpsPricingCardsBlock('pl'),
    {
      blockType: 'consultation',
      tone: 'light',
      splitCard: true,
      badgeLabel: '⚙️ Indywidualne podejście',
      heading: 'Nie wiesz, co wybrać?',
      subheading: 'Szybko podpowiemy optymalną taryfę dla Twojego projektu i budżetu.',
      ctaLabel: 'Umów konsultację',
      ctaHref: '#contact',
      microcopy: 'Bezpłatnie · bez zobowiązań',
      illustrationSrc: '/images/mascot-contact-us.png',
    },
    {
      blockType: 'architecture',
      heading: 'Stabilność i niezawodność wbudowane w architekturę',
      subheading: 'Wirtualizacja KVM z rozproszoną pamięcią masową Ceph',
      description:
        'Twoje VPS działają w oparciu o wirtualizację KVM, która zapewnia pełną izolację zasobów i stabilną wydajność. Do przechowywania danych wykorzystywana jest rozproszona pamięć masowa Ceph, gwarantująca wysoką niezawodność i dostępność informacji.',
      checklistLabel: 'Co to Ci daje',
      checklist: [
        { text: 'Pełna izolacja każdego VPS' },
        { text: 'Gwarantowane zasoby, niezależne od innych użytkowników' },
        { text: 'Wysoka odporność na awarie dzięki rozproszonej pamięci masowej' },
        { text: 'Ochrona danych w przypadku awarii sprzętu' },
        { text: 'Stabilna wydajność nawet pod obciążeniem' },
        { text: 'Możliwość skalowania bez utraty danych' },
      ],
    },
    {
      blockType: 'advantages',
      tone: 'light',
      heading: 'Dlaczego Astra Cloud',
      grid: [
        {
          icon: '🛡️',
          title: '30-dniowa gwarancja zwrotu pieniędzy',
          text: 'Jeśli kupisz u nas serwer VDS i coś Ci się nie spodoba, jesteś zabezpieczony przed utratą pieniędzy — zwrócimy je w ciągu pierwszych 30 dni użytkowania.',
        },
        {
          icon: '🎧',
          title: 'Kompetentne wsparcie techniczne',
          text: 'Wykwalifikowani specjaliści całodobowo nadzorują naszą infrastrukturę, aby Twoje usługi działały nieprzerwanie i stabilnie.',
        },
        {
          icon: '💽',
          title: 'Dyski NVMe dla maksymalnej szybkości',
          text: 'Dzięki nowoczesnym dyskom NVMe Twoje strony, bazy danych i aplikacje biznesowe działają znacznie szybciej, zapewniając błyskawiczny dostęp do danych i wysoką wydajność nawet pod obciążeniem.',
        },
        {
          icon: '📊',
          title: 'Monitorowanie serwerów w czasie rzeczywistym',
          text: 'Otrzymuj aktualne informacje o stanie VPS bezpośrednio w panelu klienta — wydajność, zasoby i dostępność w każdej chwili.',
        },
        {
          icon: '🚀',
          title: 'Szybka aktywacja VPS',
          text: 'Twój serwer jest gotowy do pracy już kilka minut po płatności — bez ręcznych opóźnień i oczekiwania. Od razu otrzymujesz dostęp i możesz uruchamiać swoje projekty.',
        },
        {
          icon: '🗄️',
          title: 'Automatyczne kopie zapasowe',
          text: 'Twoje dane są chronione dzięki regularnym kopiom zapasowym, co pozwala szybko przywrócić system w razie awarii lub błędów.',
        },
      ],
    },
  ],
}

const titleByLocale: Record<Locale, string> = {
  ua: 'VPS сервери',
  en: 'VPS Servers',
  pl: 'Serwery VPS',
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
  console.log(`✔ vps page (/${SLUG}, ua/en/pl)`)

  console.log('Done.')
}

try {
  await main()
  process.exit(0)
} catch (err) {
  console.error(err)
  process.exit(1)
}
