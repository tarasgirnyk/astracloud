/**
 * Seeds the VPS product page at /vps (ua/en/pl — unified slug).
 * Follows design-handoff/project/templates/vps/vps.html block-by-block.
 *
 * The pricing-cards block is intentionally static (no fields, no per-locale
 * content) — a placeholder for a future HostBill-driven pricing widget, per
 * explicit instruction; it's inserted identically on every locale page.
 *
 * Run with: pnpm payload run scripts/seed-vps.ts
 */
import { getPayload } from 'payload'
import config from '../payload.config.ts'

type Locale = 'ua' | 'en' | 'pl'

const SLUG = 'vps'

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
      imageSrc: '/images/img-vps.png',
      imageFit: 'contain',
    },
    { blockType: 'partners', title: 'Нам довіряють', partners },
    { blockType: 'vps-pricing-cards' },
    {
      blockType: 'consultation',
      tone: 'light',
      heading: 'Не знаєте, що обрати?',
      subheading: 'Ми швидко підкажемо оптимальний тариф під ваш проєкт і бюджет.',
      ctaLabel: 'Отримати консультацію',
      ctaHref: '#contact',
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
    {
      blockType: 'faq',
      heading: 'Питання та відповіді',
      items: [
        {
          question: 'Що таке VPS і чим він відрізняється від віртуального хостингу?',
          answer:
            'VPS — це віртуальний сервер з виділеними ресурсами (CPU, RAM, диск) та повним root-доступом, на відміну від хостингу, де ресурси та налаштування спільні для багатьох користувачів.',
        },
        {
          question: 'Які переваги VPS перед виділеним сервером?',
          answer:
            'VPS дешевший, швидше розгортається та легко масштабується, залишаючись достатньо потужним для більшості проєктів без витрат на фізичне обладнання.',
        },
        {
          question: 'Чи підходить VPS для сайту з високим трафіком?',
          answer: 'Так, за потреби ви можете обрати тариф з більшою кількістю ресурсів або перейти на вищий план без втрати даних.',
        },
        {
          question: 'Чи можна змінити тариф VPS після покупки?',
          answer: 'Так, тариф можна підвищити або знизити в будь-який момент через особистий кабінет.',
        },
        {
          question: 'Як швидко активується сервер після оплати?',
          answer: 'Сервер готовий до роботи вже через кілька хвилин після підтвердження оплати.',
        },
        {
          question: 'Яка операційна система доступна для встановлення на VPS?',
          answer: 'Основні дистрибутиви Linux (Ubuntu, Debian, CentOS) та Windows Server — повний перелік доступний у кабінеті при замовленні.',
        },
        {
          question: 'Чи є доступ root/administrator до VPS?',
          answer: 'Так, ви отримуєте повний root- або адміністраторський доступ до свого сервера.',
        },
        {
          question: 'Чи робляться резервні копії VPS і як часто?',
          answer: 'Так, резервні копії створюються автоматично за регулярним розкладом, кількість включених копій залежить від тарифу.',
        },
        {
          question: 'Який захист від DDoS атак на VPS?',
          answer: 'Усі сервери захищені базовою системою фільтрації DDoS-трафіку на рівні мережі дата-центру.',
        },
        {
          question: 'Чи підтримується IPv6 на VPS?',
          answer: 'Так, IPv6 доступний за замовчуванням для всіх тарифів VPS.',
        },
        {
          question: 'Чи підходить VPS для запуску ігрових серверів або ботів?',
          answer: 'Так, VPS добре підходить для ігрових серверів, ботів та інших фонових процесів, що потребують стабільної роботи 24/7.',
        },
        {
          question: 'Чи можна розміщувати кілька сайтів на одному VPS?',
          answer: 'Так, за наявності достатніх ресурсів ви можете розмістити кілька сайтів або проєктів на одному сервері.',
        },
        {
          question: 'Яка швидкість дисків і який тип сховища використовується?',
          answer: 'Використовуються NVMe-накопичувачі з розподіленим сховищем Ceph, що забезпечує високу швидкість і надійність зберігання даних.',
        },
        {
          question: 'Чи надається технічна підтримка 24/7 і що вона включає?',
          answer: 'Так, підтримка доступна цілодобово та охоплює питання з налаштування, доступності сервера й технічних збоїв.',
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
      imageSrc: '/images/img-vps.png',
      imageFit: 'contain',
    },
    { blockType: 'partners', title: 'Trusted by', partners },
    { blockType: 'vps-pricing-cards' },
    {
      blockType: 'consultation',
      tone: 'light',
      heading: "Not sure what to choose?",
      subheading: "We'll quickly suggest the right plan for your project and budget.",
      ctaLabel: 'Get a consultation',
      ctaHref: '#contact',
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
    {
      blockType: 'faq',
      heading: 'Frequently Asked Questions',
      items: [
        {
          question: "What is a VPS and how is it different from shared hosting?",
          answer:
            'A VPS is a virtual server with dedicated resources (CPU, RAM, disk) and full root access, unlike hosting, where resources and settings are shared among many users.',
        },
        {
          question: 'What are the advantages of a VPS over a dedicated server?',
          answer:
            "A VPS is cheaper, deploys faster, and scales easily, while remaining powerful enough for most projects without the cost of physical hardware.",
        },
        {
          question: 'Is a VPS suitable for a high-traffic website?',
          answer: 'Yes — if needed, you can choose a plan with more resources or upgrade to a higher plan without losing data.',
        },
        {
          question: 'Can I change my VPS plan after purchase?',
          answer: 'Yes, you can upgrade or downgrade your plan at any time through your account.',
        },
        {
          question: 'How quickly is the server activated after payment?',
          answer: 'The server is ready to use within minutes of payment confirmation.',
        },
        {
          question: 'Which operating systems are available for a VPS?',
          answer: 'The major Linux distributions (Ubuntu, Debian, CentOS) and Windows Server — the full list is available in your account when ordering.',
        },
        {
          question: 'Do I get root/administrator access to my VPS?',
          answer: 'Yes, you get full root or administrator access to your server.',
        },
        {
          question: 'Are VPS backups made, and how often?',
          answer: 'Yes, backups are created automatically on a regular schedule; the number of included backups depends on the plan.',
        },
        {
          question: 'What DDoS protection does the VPS have?',
          answer: "All servers are protected by baseline DDoS traffic filtering at the data center's network level.",
        },
        {
          question: 'Is IPv6 supported on a VPS?',
          answer: 'Yes, IPv6 is available by default on all VPS plans.',
        },
        {
          question: 'Is a VPS suitable for running game servers or bots?',
          answer: 'Yes, a VPS is well suited for game servers, bots, and other background processes that need to run stably 24/7.',
        },
        {
          question: 'Can I host multiple websites on one VPS?',
          answer: 'Yes, as long as there are sufficient resources, you can host multiple sites or projects on a single server.',
        },
        {
          question: 'What disk speed and storage type is used?',
          answer: 'NVMe drives with distributed Ceph storage are used, providing high speed and reliable data storage.',
        },
        {
          question: 'Is 24/7 technical support provided, and what does it cover?',
          answer: 'Yes, support is available around the clock and covers configuration questions, server availability, and technical issues.',
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
      imageSrc: '/images/img-vps.png',
      imageFit: 'contain',
    },
    { blockType: 'partners', title: 'Zaufali nam', partners },
    { blockType: 'vps-pricing-cards' },
    {
      blockType: 'consultation',
      tone: 'light',
      heading: 'Nie wiesz, co wybrać?',
      subheading: 'Szybko podpowiemy optymalną taryfę dla Twojego projektu i budżetu.',
      ctaLabel: 'Umów konsultację',
      ctaHref: '#contact',
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
    {
      blockType: 'faq',
      heading: 'Pytania i odpowiedzi',
      items: [
        {
          question: 'Czym jest VPS i czym różni się od hostingu współdzielonego?',
          answer:
            'VPS to serwer wirtualny z dedykowanymi zasobami (CPU, RAM, dysk) i pełnym dostępem root, w przeciwieństwie do hostingu, gdzie zasoby i ustawienia są współdzielone przez wielu użytkowników.',
        },
        {
          question: 'Jakie są zalety VPS w porównaniu z serwerem dedykowanym?',
          answer:
            'VPS jest tańszy, szybciej się uruchamia i łatwo się skaluje, pozostając wystarczająco wydajnym dla większości projektów bez kosztów fizycznego sprzętu.',
        },
        {
          question: 'Czy VPS nadaje się do strony o dużym ruchu?',
          answer: 'Tak, w razie potrzeby możesz wybrać taryfę z większą ilością zasobów lub przejść na wyższy plan bez utraty danych.',
        },
        {
          question: 'Czy mogę zmienić taryfę VPS po zakupie?',
          answer: 'Tak, taryfę można podwyższyć lub obniżyć w dowolnym momencie przez panel klienta.',
        },
        {
          question: 'Jak szybko aktywowany jest serwer po płatności?',
          answer: 'Serwer jest gotowy do pracy już kilka minut po potwierdzeniu płatności.',
        },
        {
          question: 'Jaki system operacyjny można zainstalować na VPS?',
          answer: 'Główne dystrybucje Linuksa (Ubuntu, Debian, CentOS) oraz Windows Server — pełna lista dostępna w panelu klienta podczas zamawiania.',
        },
        {
          question: 'Czy jest dostęp root/administrator do VPS?',
          answer: 'Tak, otrzymujesz pełny dostęp root lub administratora do swojego serwera.',
        },
        {
          question: 'Czy tworzone są kopie zapasowe VPS i jak często?',
          answer: 'Tak, kopie zapasowe tworzone są automatycznie według regularnego harmonogramu, liczba dołączonych kopii zależy od taryfy.',
        },
        {
          question: 'Jaka jest ochrona przed atakami DDoS na VPS?',
          answer: 'Wszystkie serwery są chronione podstawowym systemem filtrowania ruchu DDoS na poziomie sieci centrum danych.',
        },
        {
          question: 'Czy VPS obsługuje IPv6?',
          answer: 'Tak, IPv6 jest domyślnie dostępny we wszystkich taryfach VPS.',
        },
        {
          question: 'Czy VPS nadaje się do uruchamiania serwerów gier lub botów?',
          answer: 'Tak, VPS dobrze nadaje się do serwerów gier, botów i innych procesów w tle wymagających stabilnej pracy 24/7.',
        },
        {
          question: 'Czy mogę umieścić kilka stron na jednym VPS?',
          answer: 'Tak, przy wystarczających zasobach możesz umieścić kilka stron lub projektów na jednym serwerze.',
        },
        {
          question: 'Jaka jest szybkość dysków i jaki typ pamięci masowej jest używany?',
          answer: 'Wykorzystywane są dyski NVMe z rozproszoną pamięcią masową Ceph, co zapewnia wysoką szybkość i niezawodność przechowywania danych.',
        },
        {
          question: 'Czy zapewniacie wsparcie techniczne 24/7 i co ono obejmuje?',
          answer: 'Tak, wsparcie dostępne jest całodobowo i obejmuje kwestie konfiguracji, dostępności serwera oraz problemów technicznych.',
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
      blocks: pagesByLocale[locale],
      publicationStatus: 'published' as const,
    }

    if (existing.docs[0]) {
      await payload.update({ collection: 'pages', id: existing.docs[0].id, data })
      console.log(`✔ vps page updated (${locale}, /${SLUG})`)
    } else {
      await payload.create({ collection: 'pages', data })
      console.log(`✔ vps page created (${locale}, /${SLUG})`)
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
