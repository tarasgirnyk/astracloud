/**
 * One-off/idempotent seed for the homepage content (site-chrome global +
 * the "home" page in ua/en/pl), sourced from
 * design-handoff/project/templates/homepage/Homepage.dc.html and
 * design-handoff/project/uploads/home.txt. EN/PL copy is an AI translation
 * of the Ukrainian source (no professional translator was available at
 * seed time) — safe to overwrite in the admin as real translations land.
 *
 * Run with: node --env-file=.env --experimental-strip-types scripts/seed-homepage.ts
 */
import { getPayload } from 'payload'
import config from '../payload.config.ts'
import { seedLocalizedDoc } from './seed-locale-helpers.ts'

type Locale = 'ua' | 'en' | 'pl'

const siteChromeByLocale: Record<Locale, Record<string, unknown>> = {
  ua: {
    navLinks: [
      { label: 'VPS сервери', href: '/vps' },
      { label: 'Виділений сервер', href: '/dedicated' },
      { label: 'Колокація', href: '/colocation' },
      {
        label: 'Компанія',
        href: '#',
        children: [
          { label: 'Про нас', href: '/about' },
          { label: 'Документи', href: '/documents' },
          { label: 'Умови користування', href: '/terms' },
          { label: 'Політика конфіденційності', href: '/privacy' },
          { label: 'Політика повернення коштів', href: '/refund-policy' },
        ],
      },
    ],
    cabinetLabel: 'Кабінет',
    footerColumns: [
      {
        title: 'Клієнтам',
        links: [
          { label: 'Про нас', href: '/about' },
          { label: 'Умови користування', href: '/terms' },
          { label: 'Політика конфіденційності', href: '/privacy' },
          { label: 'Політика повернення коштів', href: '/refund-policy' },
        ],
      },
      {
        title: 'Legal',
        links: [
          { label: 'SLA', href: '/sla' },
          { label: 'Legal Section', href: '/legal' },
        ],
      },
      {
        title: 'Контакти',
        links: [
          { label: '063 636 3448', href: 'tel:+380636363448' },
          { label: 'cloud@astra.in.ua', href: 'mailto:cloud@astra.in.ua' },
          { label: 'abuse@astra.in.ua', href: 'mailto:abuse@astra.in.ua' },
        ],
      },
    ],
    footerAddress: 'Україна, м. Львів.',
    copyrightText: '© 2026 Astra Cloud. Всі права захищені.',
  },
  en: {
    navLinks: [
      { label: 'VPS Servers', href: '/en/vps' },
      { label: 'Dedicated Server', href: '/en/dedicated' },
      { label: 'Colocation', href: '/en/colocation' },
      {
        label: 'Company',
        href: '#',
        children: [
          { label: 'About Us', href: '/en/about' },
          { label: 'Documents', href: '/en/documents' },
          { label: 'Terms of Use', href: '/en/terms' },
          { label: 'Privacy Policy', href: '/en/privacy' },
          { label: 'Refund Policy', href: '/en/refund-policy' },
        ],
      },
    ],
    cabinetLabel: 'Client Area',
    footerColumns: [
      {
        title: 'Customers',
        links: [
          { label: 'About Us', href: '/en/about' },
          { label: 'Terms of Use', href: '/en/terms' },
          { label: 'Privacy Policy', href: '/en/privacy' },
          { label: 'Refund Policy', href: '/en/refund-policy' },
        ],
      },
      {
        title: 'Legal',
        links: [
          { label: 'SLA', href: '/en/sla' },
          { label: 'Legal Section', href: '/en/legal' },
        ],
      },
      {
        title: 'Contacts',
        links: [
          { label: '+380 63 636 3448', href: 'tel:+380636363448' },
          { label: 'cloud@astra.in.ua', href: 'mailto:cloud@astra.in.ua' },
          { label: 'abuse@astra.in.ua', href: 'mailto:abuse@astra.in.ua' },
        ],
      },
    ],
    footerAddress: 'Lviv, Ukraine.',
    copyrightText: '© 2026 Astra Cloud. All rights reserved.',
  },
  pl: {
    navLinks: [
      { label: 'Serwery VPS', href: '/pl/vps' },
      { label: 'Serwer dedykowany', href: '/pl/dedicated' },
      { label: 'Kolokacja', href: '/pl/colocation' },
      {
        label: 'Firma',
        href: '#',
        children: [
          { label: 'O nas', href: '/pl/about' },
          { label: 'Dokumenty', href: '/pl/documents' },
          { label: 'Regulamin', href: '/pl/terms' },
          { label: 'Polityka prywatności', href: '/pl/privacy' },
          { label: 'Polityka zwrotów', href: '/pl/refund-policy' },
        ],
      },
    ],
    cabinetLabel: 'Panel klienta',
    footerColumns: [
      {
        title: 'Klienci',
        links: [
          { label: 'O nas', href: '/pl/about' },
          { label: 'Regulamin', href: '/pl/terms' },
          { label: 'Polityka prywatności', href: '/pl/privacy' },
          { label: 'Polityka zwrotów', href: '/pl/refund-policy' },
        ],
      },
      {
        title: 'Legal',
        links: [
          { label: 'SLA', href: '/pl/sla' },
          { label: 'Legal Section', href: '/pl/legal' },
        ],
      },
      {
        title: 'Kontakt',
        links: [
          { label: '+380 63 636 3448', href: 'tel:+380636363448' },
          { label: 'cloud@astra.in.ua', href: 'mailto:cloud@astra.in.ua' },
          { label: 'abuse@astra.in.ua', href: 'mailto:abuse@astra.in.ua' },
        ],
      },
    ],
    footerAddress: 'Lwów, Ukraina.',
    copyrightText: '© 2026 Astra Cloud. Wszelkie prawa zastrzeżone.',
  },
}

// HostBill client area — same URL for every locale (HostBill itself isn't
// localized per-path here).
const cabinetHref = 'https://cp.astra.in.ua/clientarea/'

function servicesUa() {
  return {
    blockType: 'services',
    heading: 'Наші послуги',
    subheading: 'Все, що потрібно для реалізації Ваших проектів.',
    services: [
      {
        anchorId: 'vps',
        eyebrow: 'Масштабується',
        title: 'VPS / VDS сервери',
        description:
          'Виділені ресурси без витрат на фізичне обладнання — від тестових середовищ до продакшн-сервісів.',
        bullets: [
          { text: 'Швидкий запуск сервера за кілька хвилин' },
          { text: 'Ізольоване середовище з гарантованими ресурсами' },
          { text: 'Оптимальне співвідношення ціни та продуктивності' },
        ],
        ctaLabel: 'Дізнатися більше',
        ctaHref: '/vps',
        checklist: [
          { text: '30-денна гарантія повернення грошей' },
          { text: 'Компетентна техпідтримка' },
          { text: 'NVMe-диски для максимальної швидкодії' },
          { text: 'Контроль серверів у реальному часі' },
          { text: 'Швидка активація VPS' },
          { text: 'Автоматичне резервне копіювання' },
        ],
        pricingTableHostbillCategoryId: '1',
      },
      {
        anchorId: 'dedicated',
        eyebrow: 'Повний контроль',
        title: 'Оренда виділеного сервера',
        description:
          'Отримайте продуктивний фізичний сервер без витрат на купівлю та обслуговування обладнання. Ми забезпечуємо інфраструктуру, моніторинг і підтримку, а ви зосереджуєтесь на розвитку свого бізнесу.',
        ctaLabel: 'Дізнатися більше',
        ctaHref: '/dedicated',
        checklist: [
          { text: 'Виділена продуктивність' },
          { text: 'Повний контроль' },
          { text: 'Висока стабільність' },
          { text: 'Готовність до зростання' },
          { text: 'Професійна підтримка' },
          { text: 'Надійна інфраструктура' },
        ],
        pricingTableHostbillCategoryId: '3',
      },
      {
        anchorId: 'colocation',
        eyebrow: 'Розміщуйте обладнання в нас',
        title: 'Колокація',
        description:
          "Розмістіть власне серверне обладнання в професійному дата-центрі та забудьте про ризики, пов'язані з перебоями електроживлення, нестабільним інтернетом чи перегрівом обладнання.",
        ctaLabel: 'Дізнатися більше',
        ctaHref: '/colocation',
        checklist: [
          { text: 'Резервоване електроживлення з ДБЖ та генераторами' },
          { text: 'Підтримання оптимальної температури та вологості' },
          { text: 'Високошвидкісний доступ до мережі Інтернет' },
          { text: 'Фізична безпека та контроль доступу' },
          { text: 'Цілодобовий моніторинг інфраструктури' },
          { text: 'Технічна підтримка 24/7' },
        ],
        // Explicit null: this array item's row id gets reused (by position,
        // see preserveIds in seed-locale-helpers.ts) from whatever service
        // used to sit at this index — after reordering dedicated before
        // colocation, that stale row still carried dedicated's category id,
        // rendering its pricing table twice. Omitting the field leaves the
        // stale value in place; it must be nulled explicitly.
        pricingTableHostbillCategoryId: null,
      },
    ],
    paymentMethodsLabel: 'Методи оплати',
    paymentMethods: [{ name: 'Mastercard' }, { name: 'VISA' }, { name: 'Bitcoin' }, { name: 'PayPal' }],
  }
}

function servicesEn() {
  return {
    blockType: 'services',
    heading: 'Our Services',
    subheading: 'Everything you need to bring your projects to life.',
    services: [
      {
        anchorId: 'vps',
        eyebrow: 'Scalable',
        title: 'VPS / VDS Servers',
        description:
          'Dedicated resources without the cost of physical hardware — from test environments to production services.',
        bullets: [
          { text: 'Launch a server in minutes' },
          { text: 'Isolated environment with guaranteed resources' },
          { text: 'Best price-to-performance ratio' },
        ],
        ctaLabel: 'Learn more',
        ctaHref: '/en/vps',
        checklist: [
          { text: '30-day money-back guarantee' },
          { text: 'Competent technical support' },
          { text: 'NVMe drives for maximum speed' },
          { text: 'Real-time server monitoring' },
          { text: 'Fast VPS activation' },
          { text: 'Automatic backups' },
        ],
        pricingTableHostbillCategoryId: '1',
      },
      {
        anchorId: 'dedicated',
        eyebrow: 'Full control',
        title: 'Dedicated Server Rental',
        description:
          'Get a powerful physical server without the cost of purchasing and maintaining hardware. We provide the infrastructure, monitoring, and support, so you can focus on growing your business.',
        ctaLabel: 'Learn more',
        ctaHref: '/en/dedicated',
        checklist: [
          { text: 'Dedicated performance' },
          { text: 'Full control' },
          { text: 'High stability' },
          { text: 'Ready to scale' },
          { text: 'Professional support' },
          { text: 'Reliable infrastructure' },
        ],
        pricingTableHostbillCategoryId: '3',
      },
      {
        anchorId: 'colocation',
        eyebrow: 'Host your equipment with us',
        title: 'Colocation',
        description:
          'Place your own server hardware in a professional data center and forget about power outages, unstable internet, or equipment overheating.',
        ctaLabel: 'Learn more',
        ctaHref: '/en/colocation',
        checklist: [
          { text: 'Redundant power with UPS and generators' },
          { text: 'Optimal temperature and humidity control' },
          { text: 'High-speed internet access' },
          { text: 'Physical security and access control' },
          { text: '24/7 infrastructure monitoring' },
          { text: '24/7 technical support' },
        ],
        pricingTableHostbillCategoryId: null,
      },
    ],
    paymentMethodsLabel: 'Payment Methods',
    paymentMethods: [{ name: 'Mastercard' }, { name: 'VISA' }, { name: 'Bitcoin' }, { name: 'PayPal' }],
  }
}

function servicesPl() {
  return {
    blockType: 'services',
    heading: 'Nasze usługi',
    subheading: 'Wszystko, czego potrzebujesz do realizacji Twoich projektów.',
    services: [
      {
        anchorId: 'vps',
        eyebrow: 'Skalowalne',
        title: 'Serwery VPS / VDS',
        description:
          'Dedykowane zasoby bez kosztów fizycznego sprzętu — od środowisk testowych po usługi produkcyjne.',
        bullets: [
          { text: 'Szybkie uruchomienie serwera w kilka minut' },
          { text: 'Izolowane środowisko z gwarantowanymi zasobami' },
          { text: 'Optymalny stosunek ceny do wydajności' },
        ],
        ctaLabel: 'Dowiedz się więcej',
        ctaHref: '/pl/vps',
        checklist: [
          { text: '30-dniowa gwarancja zwrotu pieniędzy' },
          { text: 'Kompetentne wsparcie techniczne' },
          { text: 'Dyski NVMe dla maksymalnej szybkości' },
          { text: 'Monitorowanie serwerów w czasie rzeczywistym' },
          { text: 'Szybka aktywacja VPS' },
          { text: 'Automatyczne kopie zapasowe' },
        ],
        pricingTableHostbillCategoryId: '1',
      },
      {
        anchorId: 'dedicated',
        eyebrow: 'Pełna kontrola',
        title: 'Wynajem serwera dedykowanego',
        description:
          'Otrzymaj wydajny serwer fizyczny bez kosztów zakupu i utrzymania sprzętu. Zapewniamy infrastrukturę, monitoring i wsparcie, a Ty skupiasz się na rozwoju swojego biznesu.',
        ctaLabel: 'Dowiedz się więcej',
        ctaHref: '/pl/dedicated',
        checklist: [
          { text: 'Dedykowana wydajność' },
          { text: 'Pełna kontrola' },
          { text: 'Wysoka stabilność' },
          { text: 'Gotowość do skalowania' },
          { text: 'Profesjonalne wsparcie' },
          { text: 'Niezawodna infrastruktura' },
        ],
        pricingTableHostbillCategoryId: '3',
      },
      {
        anchorId: 'colocation',
        eyebrow: 'Umieść u nas swój sprzęt',
        title: 'Kolokacja',
        description:
          'Umieść własny sprzęt serwerowy w profesjonalnym centrum danych i zapomnij o ryzyku związanym z przerwami w zasilaniu, niestabilnym internetem czy przegrzewaniem sprzętu.',
        ctaLabel: 'Dowiedz się więcej',
        ctaHref: '/pl/colocation',
        checklist: [
          { text: 'Redundantne zasilanie z UPS i generatorami' },
          { text: 'Utrzymanie optymalnej temperatury i wilgotności' },
          { text: 'Szybki dostęp do internetu' },
          { text: 'Bezpieczeństwo fizyczne i kontrola dostępu' },
          { text: 'Całodobowy monitoring infrastruktury' },
          { text: 'Wsparcie techniczne 24/7' },
        ],
        pricingTableHostbillCategoryId: null,
      },
    ],
    paymentMethodsLabel: 'Metody płatności',
    paymentMethods: [{ name: 'Mastercard' }, { name: 'VISA' }, { name: 'Bitcoin' }, { name: 'PayPal' }],
  }
}

function advantagesUa() {
  return {
    blockType: 'advantages',
    splitLayout: true,
    eyebrow: 'Чому обирають Astra Cloud',
    heading: 'Надійна інфраструктура для вашого бізнесу 24/7',
    description:
      'Ми забезпечуємо стабільну роботу серверного обладнання власного сучасного дата-центру, що гарантує високу відмовостійкість і безперервну доступність сервісів.',
    bullets: [
      { text: 'Резервне електроживлення та автономні системи живлення' },
      { text: 'Ефективне охолодження серверної зали та точний клімат-контроль' },
      { text: "Дубльовані канали зв'язку з високою пропускною здатністю" },
      { text: 'Постійний моніторинг інфраструктури 24/7' },
    ],
    tagline: 'Ваші сервіси працюють — ми гарантуємо їхню стабільність.',
    grid: [
      {
        icon: 'refund',
        title: '30-денна гарантія повернення грошей',
        text: 'Якщо щось не сподобається — повернемо гроші протягом перших 30 днів.',
      },
      {
        icon: 'support',
        title: 'Компетентна техпідтримка',
        text: 'Кваліфіковані спеціалісти цілодобово контролюють роботу інфраструктури.',
      },
      {
        icon: 'speed',
        title: 'NVMe-диски для максимальної швидкості',
        text: 'Миттєвий доступ до даних і висока продуктивність навіть під навантаженням.',
      },
      {
        icon: 'monitor',
        title: 'Контроль серверів у реальному часі',
        text: 'Продуктивність, ресурси та доступність — прямо в особистому кабінеті.',
      },
      {
        icon: 'launch',
        title: 'Швидка активація VPS',
        text: 'Сервер готовий до роботи вже через кілька хвилин після оплати.',
      },
      {
        icon: 'backup',
        title: 'Автоматичне резервне копіювання',
        text: 'Регулярні резервні копії дозволяють швидко відновити систему.',
      },
    ],
  }
}

function advantagesEn() {
  return {
    blockType: 'advantages',
    splitLayout: true,
    eyebrow: 'Why choose Astra Cloud',
    heading: 'Reliable infrastructure for your business, 24/7',
    description:
      'We ensure stable operation of the server hardware in our own modern data center, guaranteeing high fault tolerance and continuous service availability.',
    bullets: [
      { text: 'Backup power and autonomous power systems' },
      { text: 'Efficient server room cooling and precise climate control' },
      { text: 'Redundant high-bandwidth network links' },
      { text: 'Continuous 24/7 infrastructure monitoring' },
    ],
    tagline: "Your services keep running — we guarantee their stability.",
    grid: [
      {
        icon: 'refund',
        title: '30-day money-back guarantee',
        text: "If something doesn't work out, we'll refund you within the first 30 days.",
      },
      {
        icon: 'support',
        title: 'Competent technical support',
        text: 'Qualified specialists monitor the infrastructure around the clock.',
      },
      {
        icon: 'speed',
        title: 'NVMe drives for maximum speed',
        text: 'Instant data access and high performance even under load.',
      },
      {
        icon: 'monitor',
        title: 'Real-time server monitoring',
        text: 'Performance, resources, and availability — right in your account.',
      },
      {
        icon: 'launch',
        title: 'Fast VPS activation',
        text: 'Your server is ready to work within minutes of payment.',
      },
      {
        icon: 'backup',
        title: 'Automatic backups',
        text: 'Regular backups let you restore your system quickly.',
      },
    ],
  }
}

function advantagesPl() {
  return {
    blockType: 'advantages',
    splitLayout: true,
    eyebrow: 'Dlaczego Astra Cloud',
    heading: 'Niezawodna infrastruktura dla Twojego biznesu 24/7',
    description:
      'Zapewniamy stabilną pracę sprzętu serwerowego we własnym nowoczesnym centrum danych, co gwarantuje wysoką odporność na awarie i nieprzerwaną dostępność usług.',
    bullets: [
      { text: 'Zasilanie awaryjne i autonomiczne systemy zasilania' },
      { text: 'Skuteczne chłodzenie serwerowni i precyzyjna kontrola klimatu' },
      { text: 'Redundantne łącza sieciowe o wysokiej przepustowości' },
      { text: 'Ciągły monitoring infrastruktury 24/7' },
    ],
    tagline: 'Twoje usługi działają — gwarantujemy ich stabilność.',
    grid: [
      {
        icon: 'refund',
        title: '30-dniowa gwarancja zwrotu pieniędzy',
        text: 'Jeśli coś Ci się nie spodoba, zwrócimy pieniądze w ciągu pierwszych 30 dni.',
      },
      {
        icon: 'support',
        title: 'Kompetentne wsparcie techniczne',
        text: 'Wykwalifikowani specjaliści całodobowo nadzorują infrastrukturę.',
      },
      {
        icon: 'speed',
        title: 'Dyski NVMe dla maksymalnej szybkości',
        text: 'Błyskawiczny dostęp do danych i wysoka wydajność nawet pod obciążeniem.',
      },
      {
        icon: 'monitor',
        title: 'Monitorowanie serwerów w czasie rzeczywistym',
        text: 'Wydajność, zasoby i dostępność — bezpośrednio w panelu klienta.',
      },
      {
        icon: 'launch',
        title: 'Szybka aktywacja VPS',
        text: 'Twój serwer jest gotowy do pracy już kilka minut po płatności.',
      },
      {
        icon: 'backup',
        title: 'Automatyczne kopie zapasowe',
        text: 'Regularne kopie zapasowe pozwalają szybko przywrócić system.',
      },
    ],
  }
}

function faqUa() {
  return {
    blockType: 'faq',
    heading: 'Питання та відповіді',
    items: [
      {
        question: 'Що таке виділений сервер?',
        answer: 'Фізичний сервер у повному розпорядженні одного клієнта — без поділу ресурсів з іншими.',
      },
      {
        question: 'Яка різниця між VPS та виділеним сервером?',
        answer: 'VPS — віртуальний розділ фізичного сервера; виділений сервер — окрема фізична машина цілком.',
      },
      {
        question: 'Чи надаєте ви тестовий період?',
        answer: 'Так, діє 30-денна гарантія повернення грошей на VDS-сервери.',
      },
      {
        question: 'Як швидко активується сервер після оплати?',
        answer: 'Сервер готовий до роботи вже через кілька хвилин після оплати.',
      },
      {
        question: 'Яка операційна система доступна для встановлення?',
        answer: 'Основні дистрибутиви Linux та Windows Server — деталі уточнюйте в кабінеті.',
      },
      { question: 'Чи є у вас технічна підтримка?', answer: 'Так, технічна підтримка доступна 24/7.' },
      {
        question: 'Що таке колокація (Colocation)?',
        answer: 'Розміщення власного серверного обладнання клієнта в нашому дата-центрі.',
      },
      { question: 'Які способи оплати ви приймаєте?', answer: 'Mastercard, VISA, Bitcoin та PayPal.' },
      {
        question: 'Як здійснюється резервне копіювання?',
        answer: 'Автоматично, за регулярним розкладом, з можливістю швидкого відновлення.',
      },
    ],
  }
}

function faqEn() {
  return {
    blockType: 'faq',
    heading: 'Frequently Asked Questions',
    items: [
      {
        question: 'What is a dedicated server?',
        answer: "A physical server entirely at one client's disposal — resources are not shared with anyone else.",
      },
      {
        question: "What's the difference between VPS and a dedicated server?",
        answer:
          'A VPS is a virtual partition of a physical server; a dedicated server is an entire separate physical machine.',
      },
      {
        question: 'Do you offer a trial period?',
        answer: 'Yes, VDS servers come with a 30-day money-back guarantee.',
      },
      {
        question: 'How quickly is a server activated after payment?',
        answer: 'The server is ready to use within minutes of payment.',
      },
      {
        question: 'Which operating systems are available?',
        answer: 'The major Linux distributions and Windows Server — check your account for details.',
      },
      { question: 'Do you offer technical support?', answer: 'Yes, technical support is available 24/7.' },
      {
        question: 'What is colocation?',
        answer: "Hosting a client's own server hardware in our data center.",
      },
      { question: 'What payment methods do you accept?', answer: 'Mastercard, VISA, Bitcoin, and PayPal.' },
      {
        question: 'How are backups handled?',
        answer: 'Automatically, on a regular schedule, with fast recovery available.',
      },
    ],
  }
}

function faqPl() {
  return {
    blockType: 'faq',
    heading: 'Pytania i odpowiedzi',
    items: [
      {
        question: 'Czym jest serwer dedykowany?',
        answer:
          'Fizyczny serwer pozostający w pełnej dyspozycji jednego klienta — bez współdzielenia zasobów z innymi.',
      },
      {
        question: 'Jaka jest różnica między VPS a serwerem dedykowanym?',
        answer: 'VPS to wirtualna część fizycznego serwera; serwer dedykowany to cała odrębna maszyna fizyczna.',
      },
      {
        question: 'Czy oferujecie okres próbny?',
        answer: 'Tak, na serwery VDS obowiązuje 30-dniowa gwarancja zwrotu pieniędzy.',
      },
      {
        question: 'Jak szybko aktywowany jest serwer po opłaceniu?',
        answer: 'Serwer jest gotowy do pracy już kilka minut po płatności.',
      },
      {
        question: 'Jaki system operacyjny można zainstalować?',
        answer: 'Główne dystrybucje Linuksa oraz Windows Server — szczegóły w panelu klienta.',
      },
      { question: 'Czy oferujecie wsparcie techniczne?', answer: 'Tak, wsparcie techniczne jest dostępne 24/7.' },
      {
        question: 'Czym jest kolokacja?',
        answer: 'Umieszczenie własnego sprzętu serwerowego klienta w naszym centrum danych.',
      },
      { question: 'Jakie metody płatności akceptujecie?', answer: 'Mastercard, VISA, Bitcoin oraz PayPal.' },
      {
        question: 'Jak wygląda tworzenie kopii zapasowych?',
        answer: 'Automatycznie, według regularnego harmonogramu, z możliwością szybkiego przywrócenia.',
      },
    ],
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
      heading: 'Ваші дані — наша хмара',
      subheading:
        'Хмарні рішення для вашого бізнесу. Надійне збереження даних та висока продуктивність у будь-якій точці світу.',
      ctaLabel: 'Наші послуги',
      ctaHref: '#services',
    },
    { blockType: 'partners', title: 'Нам довіряють', partners },
    servicesUa(),
    {
      blockType: 'consultation',
      tone: 'light',
      splitCard: true,
      badgeLabel: '⚙️ Індивідуальний підхід',
      heading: 'Потрібна допомога з вибором?',
      subheading: 'Наші менеджери допоможуть підібрати оптимальне рішення для вашого проєкту.',
      ctaLabel: 'Отримати консультацію',
      ctaHref: '#contact',
      microcopy: "Безкоштовно · без зобов'язань",
      illustrationSrc: '/images/mascot-contact-us.png',
    },
    advantagesUa(),
    faqUa(),
  ],
  en: [
    {
      blockType: 'hero',
      heading: 'Your data — our cloud',
      subheading:
        'Cloud solutions for your business. Reliable data storage and high performance anywhere in the world.',
      ctaLabel: 'Our Services',
      ctaHref: '#services',
    },
    { blockType: 'partners', title: 'Trusted by', partners },
    servicesEn(),
    {
      blockType: 'consultation',
      tone: 'light',
      splitCard: true,
      badgeLabel: '⚙️ Custom approach',
      heading: 'Need help choosing?',
      subheading: 'Our managers will help you find the optimal solution for your project.',
      ctaLabel: 'Get a consultation',
      ctaHref: '#contact',
      microcopy: 'Free · no obligations',
      illustrationSrc: '/images/mascot-contact-us.png',
    },
    advantagesEn(),
    faqEn(),
  ],
  pl: [
    {
      blockType: 'hero',
      heading: 'Twoje dane — nasza chmura',
      subheading:
        'Rozwiązania chmurowe dla Twojego biznesu. Niezawodne przechowywanie danych i wysoka wydajność w dowolnym miejscu na świecie.',
      ctaLabel: 'Nasze usługi',
      ctaHref: '#services',
    },
    { blockType: 'partners', title: 'Zaufali nam', partners },
    servicesPl(),
    {
      blockType: 'consultation',
      tone: 'light',
      splitCard: true,
      badgeLabel: '⚙️ Indywidualne podejście',
      heading: 'Potrzebujesz pomocy w wyborze?',
      subheading: 'Nasi menedżerowie pomogą dobrać optymalne rozwiązanie dla Twojego projektu.',
      ctaLabel: 'Umów konsultację',
      ctaHref: '#contact',
      microcopy: 'Bezpłatnie · bez zobowiązań',
      illustrationSrc: '/images/mascot-contact-us.png',
    },
    advantagesPl(),
    faqPl(),
  ],
}

async function main() {
  const payload = await getPayload({ config })
  const locales: Locale[] = ['ua', 'en', 'pl']

  for (const locale of locales) {
    await payload.updateGlobal({
      slug: 'site-chrome',
      locale,
      data: { ...siteChromeByLocale[locale], cabinetHref },
    })
    console.log(`✔ site-chrome updated (${locale})`)
  }

  // Block shapes here are built dynamically per locale (see the
  // `*Ua`/`*En`/`*Pl` factories above) rather than typed against Payload's
  // generated discriminated union — a type assertion is the pragmatic
  // choice for a one-off seed script, not app code.
  await seedLocalizedDoc(
    payload,
    'pages',
    'home',
    Object.fromEntries(
      locales.map((locale) => [
        locale,
        {
          title: 'Home', // admin-only label, not localized — see Pages.ts
          slug: 'home',
          blocks: pagesByLocale[locale],
          publicationStatus: 'published' as const,
        },
      ]),
    ) as unknown as Record<Locale, Record<string, unknown>>,
  )
  console.log('✔ home page (ua/en/pl)')

  console.log('Done.')
}

// `payload run` dynamic-imports this file and exits as soon as the import
// promise settles — without a top-level await, that happens before this
// async work finishes, so the process exits silently before any output.
try {
  await main()
  process.exit(0)
} catch (err) {
  console.error(err)
  process.exit(1)
}
