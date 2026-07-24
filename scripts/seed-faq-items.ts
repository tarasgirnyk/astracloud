/**
 * Seeds the FaqItems collection from design-handoff/documents/faq-astra-cloud.md
 * — ~270 real HostBill support tickets (2023-10 — 2026-07), classified by the
 * team into Компанія/VPS/Дедік/multi-category questions. Each item is
 * tagged with the actual page slug(s) it should render on (home/vps/
 * dedicated/…) rather than an abstract category — the `pages` field on
 * FaqItems is a polymorphic relationship (see FaqItems.ts), and PageFaq.tsx
 * auto-renders a matching FAQ section right before the footer on every
 * tagged page, no manual block placement needed.
 *
 * Deduplication note: the source doc's "§4 Питання на стику кількох
 * напрямків" section restates several questions already answered in detail
 * under §1–§3 (e.g. root SSH, Spamhaus PBL, RDNS, cancellation/refunds) —
 * rather than seeding near-duplicate entries, each §1–§3 item that §4 flags
 * as cross-cutting is tagged here with every applicable page directly, so
 * it appears once, on every page it's relevant to.
 *
 * Each item is idempotently keyed (`key`) so re-running this script updates
 * existing docs instead of duplicating them.
 *
 * Run with: pnpm payload run scripts/seed-faq-items.ts
 */
import { getPayload } from 'payload'
import config from '../payload.config.ts'

// Slugs living in the generic `pages` collection.
const PAGE_SLUGS = new Set(['home', 'partnerka'])
// Slugs living in `service-pages`.
const SERVICE_PAGE_SLUGS = new Set(['vps', 'dedicated'])

type Copy = { question: string; answer: string }

interface FaqSeedItem {
  key: string
  pages: string[]
  order: number
  ua: Copy
  en: Copy
  pl: Copy
}

const items: FaqSeedItem[] = [
  {
    key: 'company-datacenters',
    pages: ['home'],
    order: 10,
    ua: {
      question: 'Де розташовані ваші дата-центри?',
      answer:
        'Основна локація — Львів, Львівська область (2 дата-центри). Для міжнародного транзиту/пірингу є присутність у Варшаві (Польща).',
    },
    en: {
      question: 'Where are your data centers located?',
      answer:
        'Our primary location is Lviv, Lviv Oblast (2 data centers). For international transit/peering, we also have a presence in Warsaw, Poland.',
    },
    pl: {
      question: 'Gdzie znajdują się Wasze centra danych?',
      answer:
        'Główna lokalizacja to Lwów, obwód lwowski (2 centra danych). Dla międzynarodowego tranzytu/peeringu posiadamy również obecność w Warszawie, w Polsce.',
    },
  },
  {
    key: 'company-colocation-pricing',
    pages: ['home'],
    order: 20,
    ua: {
      question: 'Яка у вас цінова політика для колокації власного обладнання?',
      answer:
        "Доступні формати від 1U до повної стійки (42U), включно з 1/3 та 1/2 стійки. Живлення — фіксована потужність з щомісячною оплатою або облік по лічильнику з коефіцієнтом PUE ≈1.9. Резервування живлення — ДБЖ + генератор, за потреби — два незалежні ДБЖ (A+B). Канали зв'язку — від 10 Мбіт/с до 10 Гбіт/с, можливе оголошення власного ASN та підмереж клієнта через BGP. Комерційну пропозицію готуємо індивідуально, зазвичай за 1–3 робочих дні.",
    },
    en: {
      question: 'What is your pricing policy for colocating your own equipment?',
      answer:
        "Formats are available from 1U up to a full rack (42U), including 1/3 and 1/2 rack. Power is billed either as a fixed capacity with a monthly fee, or metered with a PUE ratio of ≈1.9. Power redundancy is UPS + generator, and two independent UPS units (A+B) on request. Network uplinks range from 10 Mbps to 10 Gbps, and you can announce your own ASN and client subnets via BGP. We prepare a commercial offer individually, usually within 1–3 business days.",
    },
    pl: {
      question: 'Jaka jest Wasza polityka cenowa dla kolokacji własnego sprzętu?',
      answer:
        'Dostępne formaty od 1U do pełnej szafy (42U), w tym 1/3 i 1/2 szafy. Zasilanie rozliczane jest jako stała moc z opłatą miesięczną albo według licznika ze współczynnikiem PUE ≈1.9. Redundancja zasilania to UPS + generator, a na życzenie — dwa niezależne UPS-y (A+B). Łącza sieciowe — od 10 Mbit/s do 10 Gbit/s, możliwe jest ogłaszanie własnego ASN i podsieci klienta przez BGP. Ofertę handlową przygotowujemy indywidualnie, zwykle w ciągu 1–3 dni roboczych.',
    },
  },
  {
    key: 'company-ip-leasing',
    pages: ['home'],
    order: 30,
    ua: {
      question: 'Чи можна замовити IP-адреси окремо, без сервера (IP-лізинг)?',
      answer:
        'Ні. Пул IP-адрес надається лише як додаткова опція для клієнтів колокації/виділених серверів — окремо в оренду не здається.',
    },
    en: {
      question: 'Can I order IP addresses separately, without a server (IP leasing)?',
      answer:
        'No. IP address pools are only available as an add-on for colocation or dedicated server clients — they are not leased separately.',
    },
    pl: {
      question: 'Czy można zamówić adresy IP osobno, bez serwera (leasing IP)?',
      answer:
        'Nie. Pula adresów IP jest dostępna wyłącznie jako dodatkowa opcja dla klientów kolokacji/serwerów dedykowanych — nie jest wynajmowana osobno.',
    },
  },
  {
    key: 'company-payment-methods',
    pages: ['home'],
    order: 40,
    ua: {
      question: 'Які способи оплати ви приймаєте?',
      answer:
        'Базово — банківські картки через LiqPay. PayPal і Stripe напряму не підтримуються (обмеження для українського бізнесу). Для міжнародних клієнтів доступна оплата криптовалютою (USDT TRC20) та сервіс Paddle/PaddlePay, через який також доступний PayPal.',
    },
    en: {
      question: 'What payment methods do you accept?',
      answer:
        "The default option is bank cards via LiqPay. PayPal and Stripe are not supported directly due to restrictions for Ukrainian businesses. For international clients we also accept cryptocurrency (USDT TRC20) and Paddle/PaddlePay, which also gives you access to PayPal.",
    },
    pl: {
      question: 'Jakie metody płatności akceptujecie?',
      answer:
        'Podstawową opcją są karty bankowe przez LiqPay. PayPal i Stripe nie są obsługiwane bezpośrednio ze względu na ograniczenia dla ukraińskich firm. Dla klientów zagranicznych dostępna jest również płatność kryptowalutą (USDT TRC20) oraz usługa Paddle/PaddlePay, przez którą dostępny jest też PayPal.',
    },
  },
  {
    key: 'company-vps-dedicated-payment-issues',
    pages: ['home', 'vps', 'dedicated'],
    order: 50,
    ua: {
      question: 'Чому не проходить оплата іноземною/міжнародною карткою?',
      answer:
        "LiqPay вимагає проходження 3D Secure, і частина закордонних банків (Revolut, Wise, Payoneer, картки не з України) цю перевірку не підтримують — платіж автоматично відхиляється на стороні банку. Це стосується оплати будь-якої послуги (VPS, виділеного сервера чи колокації). Спробуйте іншу картку (бажано українського банку) або скористайтесь криптовалютою чи Paddle.",
    },
    en: {
      question: 'Why does payment with a foreign/international card fail?',
      answer:
        "LiqPay requires 3D Secure verification, and some foreign banks (Revolut, Wise, Payoneer, non-Ukrainian cards) don't support this check — the payment is automatically declined on the bank's side. This applies to payment for any service (VPS, dedicated server, or colocation). Try a different card (preferably from a Ukrainian bank), or use cryptocurrency or Paddle instead.",
    },
    pl: {
      question: 'Dlaczego płatność zagraniczną/międzynarodową kartą się nie powiodła?',
      answer:
        'LiqPay wymaga weryfikacji 3D Secure, a część zagranicznych banków (Revolut, Wise, Payoneer, karty spoza Ukrainy) nie obsługuje tej weryfikacji — płatność jest automatycznie odrzucana po stronie banku. Dotyczy to płatności za dowolną usługę (VPS, serwer dedykowany czy kolokacja). Spróbujcie innej karty (najlepiej ukraińskiego banku) albo skorzystajcie z kryptowaluty lub Paddle.',
    },
  },
  {
    key: 'company-affiliate-program',
    pages: ['home', 'partnerka'],
    order: 60,
    ua: {
      question: 'Чи є реферальна або партнерська програма?',
      answer:
        'Так! Ми запустили партнерську програму для тих, хто готовий рекомендувати Astra Cloud і отримувати за це винагороду. Усі умови та механіка приєднання — на сторінці «Партнерка». Якщо у вас особливі умови співпраці на думці або проєкт з великою аудиторією — звертайтеся до служби підтримки, обговоримо індивідуально.',
    },
    en: {
      question: 'Do you have a referral or affiliate program?',
      answer:
        'Yes! We\'ve launched an affiliate program for anyone ready to recommend Astra Cloud and get rewarded for it. All the terms and how to join are on our "Affiliate Program" page. If you have a specific partnership in mind or a project with a large audience, reach out to support — we\'ll work out individual terms.',
    },
    pl: {
      question: 'Czy macie program poleceń lub program partnerski?',
      answer:
        'Tak! Uruchomiliśmy program partnerski dla każdego, kto jest gotów polecać Astra Cloud i otrzymywać za to wynagrodzenie. Wszystkie warunki i sposób dołączenia znajdziecie na stronie „Program partnerski”. Jeśli macie na myśli szczególne warunki współpracy albo projekt z dużą widownią — skontaktujcie się z pomocą techniczną, omówimy to indywidualnie.',
    },
  },
  {
    key: 'partnerka-what-is-it',
    pages: ['partnerka'],
    order: 500,
    ua: {
      question: 'Що таке реферальна програма?',
      answer:
        'Система, у якій ви, як клієнт Astra Cloud, отримуєте винагороду за залучення нових користувачів, що купують послуги хостингу.',
    },
    en: {
      question: 'What is the referral program?',
      answer:
        'A system where you, as an Astra Cloud client, get rewarded for bringing in new users who purchase hosting services.',
    },
    pl: {
      question: 'Czym jest program poleceń?',
      answer:
        'System, w którym Wy, jako klient Astra Cloud, otrzymujecie wynagrodzenie za przyciągnięcie nowych użytkowników, którzy kupują usługi hostingowe.',
    },
  },
  {
    key: 'partnerka-how-to-promote',
    pages: ['partnerka'],
    order: 510,
    ua: {
      question: 'Як рекламувати своє реферальне посилання?',
      answer:
        'Спосіб просування залежить від майданчика: соціальні мережі, месенджери, власний сайт, блог чи відеоканал. Головне — щоб посилання виглядало органічно і було корисним для аудиторії.',
    },
    en: {
      question: 'How do I promote my referral link?',
      answer:
        'The way you promote it depends on the platform: social media, messengers, your own website, blog, or video channel. The main thing is that the link feels organic and useful to your audience.',
    },
    pl: {
      question: 'Jak promować swój link polecający?',
      answer:
        'Sposób promocji zależy od platformy: media społecznościowe, komunikatory, własna strona, blog czy kanał wideo. Najważniejsze, aby link wyglądał naturalnie i był przydatny dla odbiorców.',
    },
  },
  {
    key: 'partnerka-withdraw-payout',
    pages: ['partnerka'],
    order: 520,
    ua: {
      question: 'Як вивести партнерську виплату?',
      answer:
        'Кошти можна використати для оплати власних послуг або вивести на зовнішню платіжну систему після досягнення мінімальної суми — 1000 грн.',
    },
    en: {
      question: 'How do I withdraw my affiliate payout?',
      answer:
        'You can use the funds to pay for your own services, or withdraw them to an external payment system once you reach the minimum amount — 1000 UAH.',
    },
    pl: {
      question: 'Jak wypłacić prowizję partnerską?',
      answer:
        'Środki można wykorzystać na opłacenie własnych usług lub wypłacić na zewnętrzny system płatności po osiągnięciu minimalnej kwoty — 1000 UAH.',
    },
  },
  {
    key: 'partnerka-referred-benefit',
    pages: ['partnerka'],
    order: 530,
    ua: {
      question: 'Яку вигоду отримає реферал?',
      answer:
        'Кожен запрошений отримає знижку 15% на будь-яку послугу в перший платіжний цикл (28 днів). Знижка за реферальною програмою не підсумовується зі знижкою за промокодом: якщо промокод дає меншу або таку саму знижку, діє реферальна; якщо більшу — активується лише промокод.',
    },
    en: {
      question: 'What benefit does the referred person get?',
      answer:
        "Everyone you refer gets a 15% discount on any service for their first billing cycle (28 days). The referral discount doesn't stack with a promo code discount: if the promo code gives a smaller or equal discount, the referral discount applies; if it gives a bigger one, only the promo code is applied.",
    },
    pl: {
      question: 'Jaką korzyść otrzyma polecona osoba?',
      answer:
        'Każda polecona przez Was osoba otrzyma 15% zniżki na dowolną usługę w pierwszym cyklu rozliczeniowym (28 dni). Zniżka z programu poleceń nie sumuje się ze zniżką z kodu promocyjnego: jeśli kod promocyjny daje mniejszą lub taką samą zniżkę, obowiązuje zniżka z polecenia; jeśli większą — aktywowany zostaje tylko kod promocyjny.',
    },
  },
  {
    key: 'company-tos',
    pages: ['home'],
    order: 70,
    ua: {
      question: 'Які правила використання серверів (TOS)?',
      answer:
        'Заборонено: спам, сканування портів, DDoS-атаки (вхідні й вихідні), розміщення незаконного контенту, порушення авторських прав, зломи/фішинг/ботнети/шкідливе ПЗ, продаж зброї/наркотиків/підроблених документів. За скаргу або потрапляння IP у Spamhaus через дії клієнта сервер може бути заблокований без повернення коштів. Торренти самі собою дозволені, якщо це не порушує авторське право і не викликає скарг.',
    },
    en: {
      question: 'What are the server usage rules (TOS)?',
      answer:
        "Prohibited: spam, port scanning, DDoS attacks (inbound and outbound), hosting illegal content, copyright infringement, hacking/phishing/botnets/malware, and selling weapons, drugs, or forged documents. A server may be suspended without a refund following a complaint or if its IP lands on Spamhaus due to the client's actions. Torrents themselves are allowed as long as they don't infringe copyright or generate complaints.",
    },
    pl: {
      question: 'Jakie są zasady korzystania z serwerów (TOS)?',
      answer:
        'Zabronione: spam, skanowanie portów, ataki DDoS (przychodzące i wychodzące), hosting nielegalnych treści, naruszanie praw autorskich, włamania/phishing/botnety/złośliwe oprogramowanie oraz sprzedaż broni, narkotyków lub podrobionych dokumentów. Za skargę lub umieszczenie IP na liście Spamhaus z winy klienta serwer może zostać zablokowany bez zwrotu kosztów. Same torrenty są dozwolone, o ile nie naruszają praw autorskich i nie powodują skarg.',
    },
  },
  {
    key: 'company-abuse-complaints',
    pages: ['home'],
    order: 80,
    ua: {
      question: 'Як ви реагуєте на скарги про зловживання (abuse/DMCA/фішинг)?',
      answer:
        'Скарги (зокрема від Cloudflare Trust & Safety чи інших дата-центрів) опрацьовуються оперативно: сайт/акаунт порушника блокується, скаржнику надсилається підтвердження. Партнерів-реселерів просимо пересилати повний текст скарги для прозорості.',
    },
    en: {
      question: 'How do you handle abuse complaints (abuse/DMCA/phishing)?',
      answer:
        'Complaints (including from Cloudflare Trust & Safety or other data centers) are handled promptly: the offending site/account is suspended, and the complainant receives confirmation. We ask reseller partners to forward the full complaint text for transparency.',
    },
    pl: {
      question: 'Jak reagujecie na skargi dotyczące nadużyć (abuse/DMCA/phishing)?',
      answer:
        'Skargi (w tym od Cloudflare Trust & Safety lub innych centrów danych) są rozpatrywane niezwłocznie: strona/konto naruszające zasady zostaje zablokowane, a skarżący otrzymuje potwierdzenie. Prosimy partnerów-resellerów o przesyłanie pełnej treści skargi dla zachowania przejrzystości.',
    },
  },
  {
    key: 'company-trial-period',
    pages: ['home'],
    order: 90,
    ua: {
      question: 'Чи надаєте тестовий/пробний період?',
      answer:
        'Так, надаємо — умови розглядаємо індивідуально залежно від послуги та ваших потреб. Звертайтеся до служби підтримки, і ми підберемо оптимальний варіант.',
    },
    en: {
      question: 'Do you offer a trial period?',
      answer:
        "Yes, we do — terms are considered individually depending on the service and your needs. Contact support and we'll find the best option for you.",
    },
    pl: {
      question: 'Czy oferujecie okres próbny?',
      answer:
        'Tak, oferujemy — warunki rozpatrujemy indywidualnie, w zależności od usługi i Waszych potrzeb. Skontaktujcie się z pomocą techniczną, a dobierzemy optymalny wariant.',
    },
  },
  {
    key: 'company-support-hours',
    pages: ['home'],
    order: 100,
    ua: {
      question: 'Які години роботи технічної підтримки?',
      answer: 'За телефоном підтримка доступна з 9:00 до 22:00. У месенджерах та по електронній пошті — цілодобово, 24/7.',
    },
    en: {
      question: 'What are your technical support hours?',
      answer: 'Phone support is available from 9:00 AM to 10:00 PM. Via messengers and email, support is available around the clock, 24/7.',
    },
    pl: {
      question: 'Jakie są godziny pracy wsparcia technicznego?',
      answer: 'Wsparcie telefoniczne jest dostępne od 9:00 do 22:00. W komunikatorach i mailowo wsparcie działa całodobowo, 24/7.',
    },
  },
  {
    key: 'company-prozorro',
    pages: ['home'],
    order: 110,
    ua: {
      question: 'Чи берете участь у державних закупівлях (Prozorro)?',
      answer: 'Так, компанія отримує та опрацьовує тендерні запрошення, зокрема на послуги колокації для держпідприємств.',
    },
    en: {
      question: 'Do you participate in public procurement (Prozorro)?',
      answer: 'Yes, the company receives and processes tender invitations, including for colocation services for state enterprises.',
    },
    pl: {
      question: 'Czy bierzecie udział w zamówieniach publicznych (Prozorro)?',
      answer: 'Tak, firma otrzymuje i realizuje zaproszenia przetargowe, w tym na usługi kolokacji dla przedsiębiorstw państwowych.',
    },
  },
  {
    key: 'company-cancel-refund',
    pages: ['home', 'vps', 'dedicated'],
    order: 120,
    ua: {
      question: 'Як скасувати послугу та чи повертають гроші за невикористаний період?',
      answer:
        'Запит подається через розділ «Білінг» в особистому кабінеті — саме момент подання запиту є точкою відліку для розрахунку часткового повернення. Якщо є неоплачені інвойси, спершу потрібно їх закрити або звернутись у підтримку. Повернення коштів можливе після місяця користування послугою; залишок за невикористаний період рахуємо за запитом і зараховуємо на баланс. Після запиту на видалення послуга ще кілька днів доступна для відновлення, потім видаляється остаточно.',
    },
    en: {
      question: 'How do I cancel a service, and do you refund the unused period?',
      answer:
        'Submit a request via the "Billing" section in your client area — the moment the request is submitted is the reference point for calculating a partial refund. If there are unpaid invoices, settle them first or contact support. Refunds are available after one month of using the service; the remaining balance for the unused period is calculated on request and credited to your account. After a deletion request, the service stays recoverable for a few more days before being permanently removed.',
    },
    pl: {
      question: 'Jak anulować usługę i czy zwracacie pieniądze za niewykorzystany okres?',
      answer:
        'Zgłoszenie należy złożyć w sekcji „Billing” w panelu klienta — moment złożenia wniosku jest punktem odniesienia do obliczenia częściowego zwrotu. Jeśli są niezapłacone faktury, należy je najpierw uregulować lub skontaktować się z pomocą techniczną. Zwrot środków jest możliwy po miesiącu korzystania z usługi; pozostałą kwotę za niewykorzystany okres obliczamy na życzenie i zaliczamy na saldo konta. Po zgłoszeniu usunięcia usługa jest jeszcze przez kilka dni dostępna do przywrócenia, a potem zostaje usunięta ostatecznie.',
    },
  },
  {
    key: 'vps-location-network',
    pages: ['vps'],
    order: 210,
    ua: {
      question: 'Де фізично розташовані VPS-сервери і яка мережа?',
      answer:
        'Львів. Основний пул адрес — 91.245.76.0/24; для окремих випадків (наприклад, заміни заблокованих IP) використовується додатковий пул 95.141.245.0/24.',
    },
    en: {
      question: 'Where are VPS servers physically located, and what network do they use?',
      answer:
        'Lviv. The primary address pool is 91.245.76.0/24; for specific cases (e.g. replacing a blocked IP), an additional pool, 95.141.245.0/24, is used.',
    },
    pl: {
      question: 'Gdzie fizycznie znajdują się serwery VPS i jaka jest sieć?',
      answer:
        'Lwów. Główna pula adresów to 91.245.76.0/24; w szczególnych przypadkach (np. wymiana zablokowanego IP) używana jest dodatkowa pula 95.141.245.0/24.',
    },
  },
  {
    key: 'vps-tariff-differences',
    pages: ['vps'],
    order: 220,
    ua: {
      question: 'Чим відрізняються тарифи VPS (Nano/Micro/Standard/Premium/Maximum)?',
      answer:
        'Різниця в CPU, RAM, обсязі диска, швидкості каналу (100 Мбіт/с на молодших тарифах → 1–2.5 Гбіт/с на старших) та лімітом трафіку. Починаючи з VPS Standard трафік безлімітний; на Nano/Micro є ліміт.',
    },
    en: {
      question: "What's the difference between the VPS plans (Nano/Micro/Standard/Premium/Maximum)?",
      answer:
        'They differ in CPU, RAM, disk size, uplink speed (100 Mbps on entry plans up to 1–2.5 Gbps on higher ones), and traffic limits. Starting from VPS Standard, traffic is unlimited; Nano and Micro have a traffic cap.',
    },
    pl: {
      question: 'Czym różnią się plany VPS (Nano/Micro/Standard/Premium/Maximum)?',
      answer:
        'Różnią się CPU, RAM-em, ilością dysku, prędkością łącza (100 Mbit/s w niższych planach do 1–2,5 Gbit/s w wyższych) oraz limitem transferu. Począwszy od VPS Standard transfer jest nielimitowany; w Nano/Micro obowiązuje limit.',
    },
  },
  {
    key: 'vps-traffic-limit',
    pages: ['vps'],
    order: 230,
    ua: {
      question: 'Що відбувається після вичерпання ліміту трафіку?',
      answer:
        'Швидкість падає до 10 Мбіт/с до кінця розрахункового періоду. Можна докупити додатковий обсяг — орієнтовно 100–150 грн за 1 ТБ, діє лише до кінця поточного періоду.',
    },
    en: {
      question: 'What happens after the traffic limit is used up?',
      answer:
        'Speed drops to 10 Mbps until the end of the billing period. You can purchase extra traffic — roughly 100–150 UAH per 1 TB, valid only until the end of the current period.',
    },
    pl: {
      question: 'Co się dzieje po wyczerpaniu limitu transferu?',
      answer:
        'Prędkość spada do 10 Mbit/s do końca okresu rozliczeniowego. Można dokupić dodatkowy transfer — orientacyjnie 100–150 UAH za 1 TB, ważny tylko do końca bieżącego okresu.',
    },
  },
  {
    key: 'vps-root-ssh',
    pages: ['vps'],
    order: 240,
    ua: {
      question: 'Чому я не можу зайти по SSH під root?',
      answer:
        'Це свідоме рішення з міркувань безпеки, а не недогляд. Сучасні cloud-init образи (Ubuntu 22+, Debian 12+, AlmaLinux) вимикають прямий вхід під root за замовчуванням — це стандартна практика захисту сервера від брутфорс-атак і несанкціонованого доступу. За потреби ви можете самостійно активувати root-вхід: виконайте команду sudo passwd root, потім у файлі /etc/ssh/sshd_config встановіть PermitRootLogin yes і перезапустіть службу sshd.',
    },
    en: {
      question: "Why can't I log in via SSH as root?",
      answer:
        'This is a deliberate security decision, not an oversight. Modern cloud-init images (Ubuntu 22+, Debian 12+, AlmaLinux) disable direct root login by default — a standard practice to protect the server from brute-force attacks and unauthorized access. If you need it, you can enable root login yourself: run sudo passwd root, then set PermitRootLogin yes in /etc/ssh/sshd_config and restart the sshd service.',
    },
    pl: {
      question: 'Dlaczego nie mogę zalogować się przez SSH jako root?',
      answer:
        'To świadoma decyzja ze względów bezpieczeństwa, a nie przeoczenie. Nowoczesne obrazy cloud-init (Ubuntu 22+, Debian 12+, AlmaLinux) domyślnie wyłączają bezpośrednie logowanie jako root — to standardowa praktyka ochrony serwera przed atakami brute-force i nieautoryzowanym dostępem. W razie potrzeby możecie samodzielnie włączyć logowanie root: wykonajcie sudo passwd root, następnie w pliku /etc/ssh/sshd_config ustawcie PermitRootLogin yes i zrestartujcie usługę sshd.',
    },
  },
  {
    key: 'vps-reinstall-os',
    pages: ['vps'],
    order: 250,
    ua: { question: 'Як перевстановити ОС або обрати іншу?', answer: 'Через особистий кабінет — функція «Reset»/перевстановлення.' },
    en: {
      question: 'How do I reinstall the OS or choose a different one?',
      answer: 'Through your client area — use the "Reset"/reinstall function.',
    },
    pl: {
      question: 'Jak przeinstalować system operacyjny lub wybrać inny?',
      answer: 'Przez panel klienta — za pomocą funkcji „Reset”/reinstalacja.',
    },
  },
  {
    key: 'vps-custom-config',
    pages: ['vps'],
    order: 260,
    ua: {
      question: 'Чи можна замовити кастомну конфігурацію VPS (нетипове співвідношення CPU/RAM/диска)?',
      answer:
        'Повноцінного конфігуратора немає. Точково можна докупити додатковий диск або RAM за окремим прайсом, або узгодити нестандартний тариф індивідуально через підтримку.',
    },
    en: {
      question: 'Can I order a custom VPS configuration (non-standard CPU/RAM/disk ratio)?',
      answer:
        "There's no full self-service configurator. You can add extra disk space or RAM at a separate price, or arrange a custom plan individually through support.",
    },
    pl: {
      question: 'Czy można zamówić niestandardową konfigurację VPS (nietypowy stosunek CPU/RAM/dysku)?',
      answer:
        'Nie ma pełnego konfiguratora do samodzielnego użycia. Można dokupić dodatkowy dysk lub RAM w osobnej cenie albo indywidualnie uzgodnić niestandardowy plan przez pomoc techniczną.',
    },
  },
  {
    key: 'vps-additional-ip',
    pages: ['vps'],
    order: 270,
    ua: {
      question: 'Чи можна замовити додаткові IP на VPS?',
      answer: 'Так, кількість залежить від тарифу: на VPS Standard доступно до +2 додаткових IP, на VPS Premium — до +4.',
    },
    en: {
      question: 'Can I order additional IPs for a VPS?',
      answer: 'Yes, the number depends on the plan: up to +2 additional IPs on VPS Standard, and up to +4 on VPS Premium.',
    },
    pl: {
      question: 'Czy można zamówić dodatkowe adresy IP do VPS?',
      answer: 'Tak, liczba zależy od planu: do +2 dodatkowych IP w VPS Standard i do +4 w VPS Premium.',
    },
  },
  {
    key: 'vps-server-offline',
    pages: ['vps'],
    order: 280,
    ua: {
      question: 'Сервер недоступний / офлайн — як швидко це вирішується?',
      answer:
        'Типове рішення — перезавантаження з боку підтримки. Якщо мережевий доступ відсутній, скористайтесь «Терміналом»/VNC в особистому кабінеті — це працює навіть без мережі.',
    },
    en: {
      question: 'My server is unreachable/offline — how quickly is this resolved?',
      answer:
        'The typical fix is a reboot performed by support. If network access is unavailable, use the "Terminal"/VNC feature in your client area — it works even without network connectivity.',
    },
    pl: {
      question: 'Serwer jest niedostępny/offline — jak szybko jest to rozwiązywane?',
      answer:
        'Typowym rozwiązaniem jest restart wykonany przez wsparcie. Jeśli dostęp sieciowy jest niedostępny, skorzystajcie z funkcji „Terminal”/VNC w panelu klienta — działa nawet bez sieci.',
    },
  },
  {
    key: 'vps-autopay',
    pages: ['vps'],
    order: 290,
    ua: {
      question: 'Чи є автоматичне списання оплати з картки?',
      answer:
        'Функція автосписання з прив\'язаної картки — на етапі тестування. Стандартно щомісяця формується інвойс, який або оплачується вручну, або автоматично закривається з попередньо поповненого балансу.',
    },
    en: {
      question: 'Is there automatic card payment (autopay)?',
      answer:
        'Autopay from a linked card is currently in testing. By default, an invoice is generated every month, which you either pay manually or which is settled automatically from a pre-topped-up balance.',
    },
    pl: {
      question: 'Czy istnieje automatyczne pobieranie płatności z karty?',
      answer:
        'Funkcja automatycznego pobierania z zapisanej karty jest obecnie w fazie testów. Standardowo co miesiąc generowana jest faktura, którą opłacacie ręcznie albo która jest automatycznie rozliczana z wcześniej doładowanego salda.',
    },
  },
  {
    key: 'vps-dedicated-spamhaus',
    pages: ['vps', 'dedicated'],
    order: 300,
    ua: {
      question: 'IP потрапив у Spamhaus (PBL) — це проблема?',
      answer:
        'Здебільшого йдеться про Spamhaus PBL (Policy Block List) — стандартна практика для нових/динамічних діапазонів хостингів. Це не означає, що IP «заблокований за спам», і не впливає на роботу сервісів, окрім вихідної пошти (SMTP). Підтримка подає запит на delisting вручну і зазвичай знімає лістинг протягом 10–20 хвилин. Політика однакова для VPS і виділених серверів.',
    },
    en: {
      question: 'My IP is listed on Spamhaus (PBL) — is that a problem?',
      answer:
        'This is usually about Spamhaus PBL (Policy Block List) — standard practice for new or dynamic hosting IP ranges. It does not mean the IP is "blocked for spam," and it doesn\'t affect service operation except outbound mail (SMTP). Support submits a manual delisting request and it\'s usually cleared within 10–20 minutes. The same policy applies to both VPS and dedicated servers.',
    },
    pl: {
      question: 'Mój adres IP trafił na listę Spamhaus (PBL) — czy to problem?',
      answer:
        'Zazwyczaj chodzi o Spamhaus PBL (Policy Block List) — standardowa praktyka dla nowych lub dynamicznych zakresów IP hostingowych. Nie oznacza to, że IP jest „zablokowane za spam”, i nie wpływa na działanie usług poza wychodzącą pocztą (SMTP). Wsparcie zgłasza ręczny wniosek o usunięcie z listy, co zwykle trwa 10–20 minut. Ta sama polityka dotyczy zarówno VPS, jak i serwerów dedykowanych.',
    },
  },
  {
    key: 'vps-transfer-owner',
    pages: ['vps'],
    order: 310,
    ua: {
      question: 'Чи можна передати VPS іншому клієнту (зміна власника)?',
      answer: 'Так, підтримка може перенести послугу на обліковий запис іншого клієнта.',
    },
    en: {
      question: 'Can I transfer a VPS to another client (change of ownership)?',
      answer: "Yes, support can move the service to another client's account.",
    },
    pl: {
      question: 'Czy można przenieść VPS na innego klienta (zmiana właściciela)?',
      answer: 'Tak, wsparcie może przenieść usługę na konto innego klienta.',
    },
  },
  {
    key: 'vps-dedicated-rdns',
    pages: ['vps', 'dedicated'],
    order: 320,
    ua: {
      question: 'Як налаштувати RDNS/PTR запис?',
      answer:
        'Самообслуговування в кабінеті відсутнє — в обох випадках (VPS і виділений сервер) запис вносить мережевий адміністратор за зверненням у підтримку.',
    },
    en: {
      question: 'How do I set up an RDNS/PTR record?',
      answer:
        "There's no self-service option in the client area — for both VPS and dedicated servers, the record is added by our network administrator upon a support request.",
    },
    pl: {
      question: 'Jak skonfigurować rekord RDNS/PTR?',
      answer:
        'W panelu klienta nie ma opcji samoobsługowej — zarówno dla VPS, jak i serwerów dedykowanych, rekord dodaje nasz administrator sieci po zgłoszeniu do wsparcia.',
    },
  },
  {
    key: 'dedicated-hardware',
    pages: ['dedicated'],
    order: 410,
    ua: {
      question: 'На якому обладнанні базуються виділені сервери?',
      answer:
        'Виключно серверне обладнання рівня enterprise — Dell R640/R340 з процесорами Intel Xeon Gold/Silver, серверна RAM (ECC), диски SAS SSD/HDD. Десктопні процесори (i3/i5/i7/i9) більше не використовуються для збірки нових серверів.',
    },
    en: {
      question: 'What hardware are dedicated servers built on?',
      answer:
        'Exclusively enterprise-grade server hardware — Dell R640/R340 with Intel Xeon Gold/Silver processors, server-grade ECC RAM, and SAS SSD/HDD drives. Desktop-class processors (i3/i5/i7/i9) are no longer used for new server builds.',
    },
    pl: {
      question: 'Na jakim sprzęcie oparte są serwery dedykowane?',
      answer:
        'Wyłącznie na sprzęcie serwerowym klasy enterprise — Dell R640/R340 z procesorami Intel Xeon Gold/Silver, serwerowym RAM-em ECC i dyskami SAS SSD/HDD. Procesory klasy desktopowej (i3/i5/i7/i9) nie są już używane do budowy nowych serwerów.',
    },
  },
  {
    key: 'dedicated-provisioning-time',
    pages: ['dedicated'],
    order: 420,
    ua: {
      question: 'Скільки часу займає підготовка (збірка) сервера?',
      answer: 'Заявлено до 2 тижнів; на практиці, якщо потрібні комплектуючі вже є в наявності — 2–7 днів.',
    },
    en: {
      question: 'How long does server provisioning (build) take?',
      answer: 'Up to 2 weeks as stated; in practice, if the required components are already in stock, it takes 2–7 days.',
    },
    pl: {
      question: 'Ile czasu zajmuje przygotowanie (montaż) serwera?',
      answer: 'Deklarowany czas to do 2 tygodni; w praktyce, jeśli potrzebne komponenty są dostępne od ręki, zajmuje to 2–7 dni.',
    },
  },
  {
    key: 'dedicated-additional-ip',
    pages: ['dedicated'],
    order: 430,
    ua: {
      question: 'Які додаткові IP доступні для виділеного сервера?',
      answer: 'Тільки пулами: /30 (1 корисна IP серед broadcast/gateway), /29 (5 корисних), /28 тощо — з відповідною вартістю за розмір пулу.',
    },
    en: {
      question: 'What additional IPs are available for a dedicated server?',
      answer: 'Only as pools: /30 (1 usable IP alongside broadcast/gateway), /29 (5 usable), /28 and so on — priced according to the pool size.',
    },
    pl: {
      question: 'Jakie dodatkowe IP są dostępne dla serwera dedykowanego?',
      answer:
        'Tylko w postaci puli: /30 (1 użyteczne IP obok broadcast/gateway), /29 (5 użytecznych), /28 itd. — z odpowiednią ceną za rozmiar puli.',
    },
  },
  {
    key: 'dedicated-windows-license',
    pages: ['dedicated'],
    order: 440,
    ua: {
      question: 'Чи надається ліцензія Windows на виділеному сервері?',
      answer: 'Ні, ліцензії Microsoft (SPLA чи інші) компанія не продає й не активує. Можна встановити тільки trial-версію або власну ліцензію клієнта.',
    },
    en: {
      question: 'Is a Windows license provided on a dedicated server?',
      answer:
        "No, we don't sell or activate Microsoft licenses (SPLA or otherwise). You can only install a trial version or bring your own license.",
    },
    pl: {
      question: 'Czy na serwerze dedykowanym udostępniana jest licencja Windows?',
      answer:
        'Nie, nie sprzedajemy ani nie aktywujemy licencji Microsoft (SPLA ani innych). Można zainstalować wyłącznie wersję próbną lub własną licencję klienta.',
    },
  },
  {
    key: 'dedicated-remote-management',
    pages: ['dedicated'],
    order: 450,
    ua: {
      question: 'Як я можу самостійно керувати «залізом» (перевстановити ОС тощо)?',
      answer: 'Через віддалену консоль управління (iDRAC у Dell R640, або аналог ILO) — доступ надається після збірки сервера.',
    },
    en: {
      question: 'How can I manage the hardware myself (reinstall the OS, etc.)?',
      answer: 'Through a remote management console (iDRAC on Dell R640, or an ILO equivalent) — access is granted once the server is built.',
    },
    pl: {
      question: 'Jak mogę samodzielnie zarządzać sprzętem (przeinstalować system itd.)?',
      answer: 'Poprzez zdalną konsolę zarządzania (iDRAC w Dell R640 lub odpowiednik ILO) — dostęp jest przyznawany po zmontowaniu serwera.',
    },
  },
  {
    key: 'dedicated-root-access',
    pages: ['dedicated'],
    order: 460,
    ua: {
      question: 'Root-доступ на виділеному сервері теж вимкнено?',
      answer: 'Так, на образах AlmaLinux root вимкнений за замовчуванням так само, як і на VPS; активується вручну через sudo.',
    },
    en: {
      question: 'Is root access disabled on dedicated servers too?',
      answer: 'Yes, on AlmaLinux images root is disabled by default just like on VPS; it can be enabled manually via sudo.',
    },
    pl: {
      question: 'Czy dostęp root na serwerze dedykowanym również jest wyłączony?',
      answer: 'Tak, na obrazach AlmaLinux dostęp root jest domyślnie wyłączony, tak samo jak w VPS; można go włączyć ręcznie przez sudo.',
    },
  },
]

async function resolvePageRef(payload: Awaited<ReturnType<typeof getPayload>>, slug: string) {
  if (PAGE_SLUGS.has(slug)) {
    const result = await payload.find({ collection: 'pages', where: { slug: { equals: slug } }, limit: 1 })
    if (!result.docs[0]) throw new Error(`pages/${slug} not found — seed it first`)
    return { relationTo: 'pages' as const, value: result.docs[0].id }
  }
  if (SERVICE_PAGE_SLUGS.has(slug)) {
    const result = await payload.find({ collection: 'service-pages', where: { slug: { equals: slug } }, limit: 1 })
    if (!result.docs[0]) throw new Error(`service-pages/${slug} not found — seed it first`)
    return { relationTo: 'service-pages' as const, value: result.docs[0].id }
  }
  throw new Error(`Unknown page slug "${slug}" — add it to PAGE_SLUGS or SERVICE_PAGE_SLUGS`)
}

async function main() {
  const payload = await getPayload({ config })

  for (const item of items) {
    const existing = await payload.find({ collection: 'faq-items', where: { key: { equals: item.key } }, limit: 1 })
    const pages = await Promise.all(item.pages.map((slug) => resolvePageRef(payload, slug)))
    const shared = { key: item.key, pages, order: item.order, publicationStatus: 'published' as const }

    let doc = existing.docs[0]
    if (doc) {
      doc = await payload.update({ collection: 'faq-items', id: doc.id, locale: 'ua', data: { ...shared, ...item.ua } })
    } else {
      doc = await payload.create({ collection: 'faq-items', locale: 'ua', data: { ...shared, ...item.ua } })
    }
    await payload.update({ collection: 'faq-items', id: doc.id, locale: 'en', data: item.en })
    await payload.update({ collection: 'faq-items', id: doc.id, locale: 'pl', data: item.pl })
    console.log(`✔ ${item.key}`)
  }

  console.log(`Done. Seeded ${items.length} FAQ items.`)
}

try {
  await main()
  process.exit(0)
} catch (err) {
  console.error(err)
  process.exit(1)
}
