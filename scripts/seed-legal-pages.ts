/**
 * Seeds Terms of Use, Privacy Policy, Refund Policy, SLA, and the Legal
 * Section page (ua/en/pl), each at the SAME slug across locales (see
 * seed-about.ts for why: LanguageSwitcher swaps only the locale segment,
 * so per-locale slugs 404 on language switch).
 *
 * Copy is original text written from the substantive provisions published
 * at cloud.astra.in.ua/tos, /pp, /r-policy, /sla, /l-section (specific
 * rules, numbers, deadlines) — not a reproduction of those pages' prose —
 * in the same brand voice established for the rest of the site (formal
 * "ви", confident, concrete). These are legal/policy pages: treat this as
 * a first draft and have it reviewed before relying on it as the binding
 * version.
 *
 * Run with: pnpm payload run scripts/seed-legal-pages.ts
 */
import { getPayload } from 'payload'
import config from '../payload.config.ts'
import { bulletListNode, headingNode, paragraphNode, richTextDoc } from './lexical-helpers.ts'

type Locale = 'ua' | 'en' | 'pl'
type Section = { heading?: string; paragraphs: string[]; listItems?: string[] }

const locales: Locale[] = ['ua', 'en', 'pl']

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

// ---------------------------------------------------------------------------
// Terms of Use
// ---------------------------------------------------------------------------
const termsUa = block('Умови користування', [
  {
    paragraphs: [
      'Користуючись послугами Astra Cloud, ви погоджуєтесь із цими умовами та зобов\'язуєтесь дотримуватися правил використання інфраструктури.',
    ],
  },
  {
    heading: 'Використання послуг',
    paragraphs: [
      'Ресурси надаються в межах обраного тарифного плану та мають використовуватися відповідно до законодавства України.',
    ],
  },
  {
    heading: 'Заборонена діяльність',
    paragraphs: ['Забороняється використовувати послуги для:'],
    listItems: [
      'протиправної діяльності або дій, що порушують законодавство України',
      'розповсюдження шкідливого програмного забезпечення',
      'мережевих атак чи спроб несанкціонованого доступу',
      'дій, що можуть негативно вплинути на стабільність інфраструктури',
    ],
  },
  {
    heading: 'Призупинення послуг',
    paragraphs: [
      'У разі порушення цих умов Astra Cloud має право обмежити або призупинити надання послуг.',
    ],
  },
  {
    heading: 'Відповідальність клієнта',
    paragraphs: ['Клієнт самостійно відповідає за захист облікових даних та безпеку власної інформації.'],
  },
  {
    heading: 'Оплата',
    paragraphs: [
      'Послуги оплачуються за тарифами обраного плану на умовах передоплати за обраний період.',
      'У разі затримки оплати надання послуг може бути призупинено або припинено без додаткового попередження.',
    ],
  },
  {
    heading: 'Скасування послуг',
    paragraphs: [
      'Клієнт може скасувати послугу до початку наступного розрахункового періоду. Скасування не звільняє від зобов\'язань за вже надані послуги.',
    ],
  },
  {
    heading: 'Повернення коштів',
    paragraphs: ['Повернення коштів здійснюється відповідно до Політики повернення коштів.'],
  },
  {
    heading: 'Відповідальність провайдера',
    paragraphs: [
      'Astra Cloud не несе відповідальності за дії третіх осіб чи перебої, що виникли поза межами її контролю.',
    ],
  },
  {
    heading: 'Зміни умов',
    paragraphs: ['Astra Cloud залишає за собою право змінювати ці умови з попереднім повідомленням.'],
  },
  {
    heading: 'Контакти',
    paragraphs: ['Україна, м. Львів.'],
  },
])

const termsEn = block('Terms of Use', [
  {
    paragraphs: [
      'By using Astra Cloud services, you agree to these terms and undertake to follow the rules for using our infrastructure.',
    ],
  },
  {
    heading: 'Using the Services',
    paragraphs: ['Resources are provided within the limits of your selected plan and must be used in accordance with Ukrainian law.'],
  },
  {
    heading: 'Prohibited Use',
    paragraphs: ['You may not use the services for:'],
    listItems: [
      'unlawful activity or actions that violate Ukrainian legislation',
      'distributing malicious software',
      'network attacks or unauthorized access attempts',
      'actions that could negatively affect infrastructure stability',
    ],
  },
  {
    heading: 'Suspension of Services',
    paragraphs: ['Astra Cloud may restrict or suspend services in the event of a breach of these terms.'],
  },
  {
    heading: 'Client Responsibility',
    paragraphs: ["Clients are responsible for protecting their access credentials and securing their own data."],
  },
  {
    heading: 'Payment',
    paragraphs: [
      'Services are billed at the rates of the selected plan on a prepayment basis for the chosen period.',
      'Late payment may result in suspension or termination of services without further notice.',
    ],
  },
  {
    heading: 'Cancellation',
    paragraphs: [
      'You may cancel a service before the next billing period begins. Cancellation does not waive obligations for services already provided.',
    ],
  },
  {
    heading: 'Refunds',
    paragraphs: ['Refunds are handled in accordance with the Refund Policy.'],
  },
  {
    heading: "Provider's Liability",
    paragraphs: ["Astra Cloud is not liable for the actions of third parties or disruptions beyond its reasonable control."],
  },
  {
    heading: 'Changes to These Terms',
    paragraphs: ['Astra Cloud reserves the right to amend these terms with prior notice.'],
  },
  {
    heading: 'Contacts',
    paragraphs: ['Lviv, Ukraine.'],
  },
])

const termsPl = block('Regulamin', [
  {
    paragraphs: [
      'Korzystając z usług Astra Cloud, akceptujecie niniejszy regulamin i zobowiązujecie się przestrzegać zasad korzystania z infrastruktury.',
    ],
  },
  {
    heading: 'Korzystanie z usług',
    paragraphs: ['Zasoby udostępniane są w ramach wybranego planu taryfowego i muszą być wykorzystywane zgodnie z prawem ukraińskim.'],
  },
  {
    heading: 'Zabroniona działalność',
    paragraphs: ['Zabrania się wykorzystywania usług do:'],
    listItems: [
      'działań niezgodnych z prawem ukraińskim',
      'rozpowszechniania złośliwego oprogramowania',
      'ataków sieciowych lub prób nieautoryzowanego dostępu',
      'działań mogących negatywnie wpłynąć na stabilność infrastruktury',
    ],
  },
  {
    heading: 'Zawieszenie usług',
    paragraphs: ['W przypadku naruszenia regulaminu Astra Cloud może ograniczyć lub zawiesić świadczenie usług.'],
  },
  {
    heading: 'Odpowiedzialność klienta',
    paragraphs: ['Klient samodzielnie odpowiada za ochronę danych dostępowych oraz bezpieczeństwo własnych danych.'],
  },
  {
    heading: 'Płatności',
    paragraphs: [
      'Usługi są rozliczane według stawek wybranego planu na zasadzie przedpłaty za wybrany okres.',
      'W przypadku opóźnienia w płatności świadczenie usług może zostać zawieszone lub zakończone bez dodatkowego powiadomienia.',
    ],
  },
  {
    heading: 'Anulowanie usług',
    paragraphs: [
      'Klient może anulować usługę przed rozpoczęciem kolejnego okresu rozliczeniowego. Anulowanie nie zwalnia z zobowiązań za usługi już zrealizowane.',
    ],
  },
  {
    heading: 'Zwroty',
    paragraphs: ['Zwroty realizowane są zgodnie z Polityką zwrotów.'],
  },
  {
    heading: 'Odpowiedzialność dostawcy',
    paragraphs: ['Astra Cloud nie ponosi odpowiedzialności za działania osób trzecich ani przerwy powstałe poza jej kontrolą.'],
  },
  {
    heading: 'Zmiany regulaminu',
    paragraphs: ['Astra Cloud zastrzega sobie prawo do zmiany niniejszego regulaminu z wyprzedzeniem.'],
  },
  {
    heading: 'Kontakt',
    paragraphs: ['Lwów, Ukraina.'],
  },
])

// ---------------------------------------------------------------------------
// Privacy Policy
// ---------------------------------------------------------------------------
const privacyUa = block('Політика конфіденційності', [
  {
    paragraphs: [
      'Astra Cloud поважає право користувачів на конфіденційність та забезпечує захист персональних даних відповідно до законодавства України.',
      'Користуючись сервісами Astra Cloud, ви погоджуєтесь з умовами цієї політики.',
    ],
  },
  {
    heading: 'Які дані ми збираємо',
    paragraphs: ['Ми можемо збирати такі дані:'],
    listItems: [
      "ім'я та контактні дані (email, телефон)",
      'платіжну інформацію (через платіжні системи)',
      'IP-адресу та технічні дані підключення',
      'дані облікового запису та історію використання сервісів',
    ],
  },
  {
    heading: 'Як ми використовуємо дані',
    paragraphs: ['Зібрані дані використовуються для:'],
    listItems: [
      'надання та підтримки сервісів',
      'обробки платежів',
      "зв'язку з клієнтом",
      'забезпечення безпеки та запобігання зловживанням',
      'покращення якості послуг',
    ],
  },
  {
    heading: 'Захист даних',
    paragraphs: [
      'Astra Cloud застосовує технічні та організаційні заходи для захисту інформації від несанкціонованого доступу, втрати або зміни.',
    ],
  },
  {
    heading: 'Передача даних третім особам',
    paragraphs: ['Дані можуть передаватися третім сторонам виключно для:'],
    listItems: ['обробки платежів', 'виконання вимог законодавства України', 'забезпечення роботи сервісів'],
  },
  {
    heading: 'Зберігання даних',
    paragraphs: ['Дані зберігаються протягом строку, необхідного для надання послуг та виконання зобов\'язань.'],
  },
  {
    heading: 'Права користувача',
    paragraphs: ['Користувач має право:'],
    listItems: [
      'отримати інформацію про свої дані',
      'вимагати їх зміну або видалення',
      'обмежити обробку даних у передбачених законом випадках',
    ],
  },
  {
    heading: 'Контакти',
    paragraphs: ['З питань конфіденційності звертайтеся: support@astra.in.ua'],
  },
])

const privacyEn = block('Privacy Policy', [
  {
    paragraphs: [
      "Astra Cloud respects users' right to privacy and protects personal data in accordance with Ukrainian law.",
      'By using Astra Cloud services, you agree to the terms of this policy.',
    ],
  },
  {
    heading: 'What Data We Collect',
    paragraphs: ['We may collect:'],
    listItems: [
      'name and contact details (email, phone)',
      'payment information (via payment systems)',
      'IP address and technical connection data',
      'account data and service usage history',
    ],
  },
  {
    heading: 'How We Use Data',
    paragraphs: ['Collected data is used to:'],
    listItems: [
      'provide and support the services',
      'process payments',
      'communicate with clients',
      'ensure security and prevent abuse',
      'improve service quality',
    ],
  },
  {
    heading: 'Data Protection',
    paragraphs: [
      'Astra Cloud applies technical and organizational measures to protect information from unauthorized access, loss, or alteration.',
    ],
  },
  {
    heading: 'Sharing Data with Third Parties',
    paragraphs: ['Data may be shared with third parties only to:'],
    listItems: ['process payments', 'comply with Ukrainian legal requirements', 'ensure the services operate'],
  },
  {
    heading: 'Data Retention',
    paragraphs: ['Data is retained for as long as necessary to provide the services and fulfil our obligations.'],
  },
  {
    heading: 'Your Rights',
    paragraphs: ['You have the right to:'],
    listItems: [
      'obtain information about your data',
      'request its correction or deletion',
      'restrict processing in cases provided for by law',
    ],
  },
  {
    heading: 'Contacts',
    paragraphs: ['For privacy questions, contact: support@astra.in.ua'],
  },
])

const privacyPl = block('Polityka prywatności', [
  {
    paragraphs: [
      'Astra Cloud szanuje prawo użytkowników do prywatności i chroni dane osobowe zgodnie z prawem ukraińskim.',
      'Korzystając z usług Astra Cloud, akceptujecie warunki niniejszej polityki.',
    ],
  },
  {
    heading: 'Jakie dane zbieramy',
    paragraphs: ['Możemy zbierać:'],
    listItems: [
      'imię i dane kontaktowe (e-mail, telefon)',
      'informacje płatnicze (za pośrednictwem systemów płatności)',
      'adres IP i techniczne dane połączenia',
      'dane konta i historię korzystania z usług',
    ],
  },
  {
    heading: 'Jak wykorzystujemy dane',
    paragraphs: ['Zebrane dane wykorzystujemy do:'],
    listItems: [
      'świadczenia i wsparcia usług',
      'przetwarzania płatności',
      'kontaktu z klientem',
      'zapewnienia bezpieczeństwa i zapobiegania nadużyciom',
      'poprawy jakości usług',
    ],
  },
  {
    heading: 'Ochrona danych',
    paragraphs: [
      'Astra Cloud stosuje środki techniczne i organizacyjne w celu ochrony informacji przed nieuprawnionym dostępem, utratą lub zmianą.',
    ],
  },
  {
    heading: 'Przekazywanie danych osobom trzecim',
    paragraphs: ['Dane mogą być przekazywane osobom trzecim wyłącznie w celu:'],
    listItems: ['przetwarzania płatności', 'spełnienia wymogów prawa ukraińskiego', 'zapewnienia działania usług'],
  },
  {
    heading: 'Przechowywanie danych',
    paragraphs: ['Dane są przechowywane przez okres niezbędny do świadczenia usług i wypełnienia zobowiązań.'],
  },
  {
    heading: 'Prawa użytkownika',
    paragraphs: ['Użytkownik ma prawo do:'],
    listItems: [
      'uzyskania informacji o swoich danych',
      'żądania ich poprawienia lub usunięcia',
      'ograniczenia przetwarzania danych w przypadkach przewidzianych prawem',
    ],
  },
  {
    heading: 'Kontakt',
    paragraphs: ['W sprawach dotyczących prywatności: support@astra.in.ua'],
  },
])

// ---------------------------------------------------------------------------
// Refund Policy
// ---------------------------------------------------------------------------
const refundUa = block('Політика повернення коштів', [
  {
    paragraphs: ['Кожен запит на повернення коштів розглядається індивідуально відповідно до умов послуги та законодавства України.'],
  },
  {
    heading: 'Коли можливе повернення',
    listItems: [
      'помилкова або дубльована оплата',
      'Astra Cloud не змогла надати замовлену послугу',
      'замовлення скасовано до фактичного надання послуги',
    ],
    paragraphs: [],
  },
  {
    heading: 'Коли повернення неможливе',
    listItems: [
      'послугу вже активовано, надано або частково використано',
      'проблема виникла з причин поза контролем Astra Cloud',
      'клієнт порушив умови користування',
    ],
    paragraphs: [],
  },
  {
    heading: 'Як подати запит',
    paragraphs: [
      'Зверніться в службу підтримки, вказавши номер замовлення, деталі оплати та причину запиту на повернення.',
    ],
  },
  {
    heading: 'Розгляд запиту',
    paragraphs: [
      'Запит опрацьовується протягом розумного строку після отримання всієї необхідної інформації. Кошти повертаються тим самим способом оплати, який було використано, якщо не узгоджено інше.',
      'Комісії платіжних систем та банків можуть не підлягати поверненню, якщо інше не передбачено окремо.',
    ],
  },
  {
    heading: 'Виключення',
    paragraphs: [
      'Astra Cloud залишає за собою право відмовити у поверненні коштів у разі шахрайства, зловживання послугою або порушення законодавства України.',
    ],
  },
  {
    heading: 'Контакти',
    paragraphs: ['Питання щодо повернення коштів: cloud@astra.in.ua'],
  },
])

const refundEn = block('Refund Policy', [
  {
    paragraphs: ['Every refund request is reviewed individually, in line with the relevant service terms and Ukrainian law.'],
  },
  {
    heading: 'When a Refund May Be Issued',
    listItems: [
      'an erroneous or duplicate payment',
      'Astra Cloud was unable to provide the ordered service',
      'the order was cancelled before the service was actually provided',
    ],
    paragraphs: [],
  },
  {
    heading: 'When a Refund Is Not Available',
    listItems: [
      'the service has already been activated, provided, or partially used',
      'the issue arose from circumstances beyond Astra Cloud\'s control',
      'the client breached the Terms of Use',
    ],
    paragraphs: [],
  },
  {
    heading: 'How to Request a Refund',
    paragraphs: ['Contact support with your order number, payment details, and the reason for your request.'],
  },
  {
    heading: 'Processing',
    paragraphs: [
      'Requests are processed within a reasonable time after we receive all the necessary information. Refunds are issued via the same payment method originally used, unless otherwise agreed.',
      'Payment-system and bank fees may not be refundable unless otherwise stated.',
    ],
  },
  {
    heading: 'Exclusions',
    paragraphs: [
      'Astra Cloud reserves the right to decline a refund in cases of fraud, service abuse, or violation of Ukrainian law.',
    ],
  },
  {
    heading: 'Contacts',
    paragraphs: ['Refund inquiries: cloud@astra.in.ua'],
  },
])

const refundPl = block('Polityka zwrotów', [
  {
    paragraphs: ['Każdy wniosek o zwrot jest rozpatrywany indywidualnie, zgodnie z warunkami usługi i prawem ukraińskim.'],
  },
  {
    heading: 'Kiedy możliwy jest zwrot',
    listItems: [
      'błędna lub podwójna płatność',
      'Astra Cloud nie była w stanie zrealizować zamówionej usługi',
      'zamówienie zostało anulowane przed faktycznym wykonaniem usługi',
    ],
    paragraphs: [],
  },
  {
    heading: 'Kiedy zwrot nie jest możliwy',
    listItems: [
      'usługa została już aktywowana, dostarczona lub częściowo wykorzystana',
      'problem wynikł z przyczyn niezależnych od Astra Cloud',
      'klient naruszył regulamin',
    ],
    paragraphs: [],
  },
  {
    heading: 'Jak złożyć wniosek',
    paragraphs: ['Skontaktujcie się z pomocą techniczną, podając numer zamówienia, dane płatności i powód wniosku o zwrot.'],
  },
  {
    heading: 'Rozpatrywanie wniosku',
    paragraphs: [
      'Wniosek jest rozpatrywany w rozsądnym terminie po otrzymaniu wszystkich niezbędnych informacji. Zwrot następuje tą samą metodą płatności, która została pierwotnie użyta, chyba że uzgodniono inaczej.',
      'Opłaty systemów płatności i banków mogą nie podlegać zwrotowi, chyba że ustalono inaczej.',
    ],
  },
  {
    heading: 'Wyjątki',
    paragraphs: [
      'Astra Cloud zastrzega sobie prawo do odmowy zwrotu w przypadku oszustwa, nadużycia usługi lub naruszenia prawa ukraińskiego.',
    ],
  },
  {
    heading: 'Kontakt',
    paragraphs: ['Pytania dotyczące zwrotów: cloud@astra.in.ua'],
  },
])

// ---------------------------------------------------------------------------
// SLA
// ---------------------------------------------------------------------------
const slaUa = block('SLA — угода про рівень обслуговування', [
  {
    paragraphs: ['Astra Cloud гарантує рівень доступності послуг, визначений нижче, та цілодобовий технічний супровід.'],
  },
  {
    heading: 'Гарантії доступності',
    listItems: ['щомісячна доступність — не менше 98%', 'річна доступність — не менше 99%'],
    paragraphs: [
      'Доступність розраховується на основі фактичної роботи сервісу за відповідний період.',
    ],
  },
  {
    heading: 'Планове технічне обслуговування',
    paragraphs: [
      "Роботи для підтримки стабільності та безпеки інфраструктури проводяться в періоди найменшого навантаження, про що клієнти повідомляються завчасно. Час планового обслуговування не враховується при розрахунку доступності.",
    ],
  },
  {
    heading: 'Технічна підтримка',
    paragraphs: ['Підтримка доступна цілодобово та включає моніторинг інфраструктури, реагування на інциденти й технічні консультації.'],
  },
  {
    heading: 'Що не враховується в розрахунку доступності',
    listItems: ['дії третіх осіб', 'мережеві атаки', 'обставини поза розумним контролем провайдера'],
    paragraphs: [],
  },
  {
    heading: 'Обмеження відповідальності',
    paragraphs: [
      'Astra Cloud не відповідає за непрямі збитки, втрачений прибуток чи втрату даних, окрім випадків, окремо передбачених умовами послуги.',
    ],
  },
  {
    heading: 'Зміни угоди',
    paragraphs: ['Astra Cloud залишає за собою право змінювати умови цієї угоди з попереднім повідомленням.'],
  },
])

const slaEn = block('SLA — Service Level Agreement', [
  {
    paragraphs: ['Astra Cloud guarantees the service availability levels set out below, along with around-the-clock technical support.'],
  },
  {
    heading: 'Availability Guarantees',
    listItems: ['monthly availability — at least 98%', 'annual availability — at least 99%'],
    paragraphs: ['Availability is calculated based on actual service uptime for the relevant period.'],
  },
  {
    heading: 'Planned Maintenance',
    paragraphs: [
      'Work to maintain infrastructure stability and security is performed during low-traffic periods, with advance notice to clients. Planned maintenance time is not counted against the availability calculation.',
    ],
  },
  {
    heading: 'Technical Support',
    paragraphs: ['Support is available 24/7 and includes infrastructure monitoring, incident response, and technical consultations.'],
  },
  {
    heading: 'Excluded from the Availability Calculation',
    listItems: ['third-party actions', 'network attacks', 'circumstances beyond the provider\'s reasonable control'],
    paragraphs: [],
  },
  {
    heading: 'Limitation of Liability',
    paragraphs: [
      'Astra Cloud is not liable for indirect damages, lost profit, or data loss, except where separately provided for in the service terms.',
    ],
  },
  {
    heading: 'Changes to This Agreement',
    paragraphs: ['Astra Cloud reserves the right to amend this agreement with prior notice.'],
  },
])

const slaPl = block('SLA — umowa o poziomie usług', [
  {
    paragraphs: ['Astra Cloud gwarantuje poziom dostępności usług określony poniżej oraz całodobowe wsparcie techniczne.'],
  },
  {
    heading: 'Gwarancje dostępności',
    listItems: ['dostępność miesięczna — nie mniej niż 98%', 'dostępność roczna — nie mniej niż 99%'],
    paragraphs: ['Dostępność obliczana jest na podstawie rzeczywistego działania usługi w danym okresie.'],
  },
  {
    heading: 'Planowe prace konserwacyjne',
    paragraphs: [
      'Prace mające na celu utrzymanie stabilności i bezpieczeństwa infrastruktury prowadzone są w okresach najmniejszego obciążenia, o czym klienci są informowani z wyprzedzeniem. Czas planowych prac konserwacyjnych nie jest wliczany do obliczenia dostępności.',
    ],
  },
  {
    heading: 'Wsparcie techniczne',
    paragraphs: ['Wsparcie dostępne jest całodobowo i obejmuje monitorowanie infrastruktury, reagowanie na incydenty oraz konsultacje techniczne.'],
  },
  {
    heading: 'Co nie jest wliczane do obliczenia dostępności',
    listItems: ['działania osób trzecich', 'ataki sieciowe', 'okoliczności pozostające poza rozsądną kontrolą dostawcy'],
    paragraphs: [],
  },
  {
    heading: 'Ograniczenie odpowiedzialności',
    paragraphs: [
      'Astra Cloud nie ponosi odpowiedzialności za szkody pośrednie, utracone zyski ani utratę danych, z wyjątkiem przypadków odrębnie przewidzianych w warunkach usługi.',
    ],
  },
  {
    heading: 'Zmiany umowy',
    paragraphs: ['Astra Cloud zastrzega sobie prawo do zmiany niniejszej umowy z wyprzedzeniem.'],
  },
])

// ---------------------------------------------------------------------------
// Legal Section
// ---------------------------------------------------------------------------
const legalUa = block('Юридична інформація', [
  {
    paragraphs: ['Ця сторінка містить реквізити компанії та посилання на всі юридичні документи Astra Cloud.'],
  },
  {
    heading: 'Реквізити компанії',
    listItems: ['Astra Cloud — провайдер хмарної інфраструктури та дата-центр рішень', 'Україна, м. Львів'],
    paragraphs: [],
  },
  {
    heading: 'Контакти',
    listItems: ['cloud@astra.in.ua — загальні питання', 'abuse@astra.in.ua — зловживання та безпека', '063 636 3448'],
    paragraphs: [],
  },
  {
    heading: 'Документи',
    listItems: ['Умови користування', 'Політика конфіденційності', 'Політика повернення коштів', 'SLA'],
    paragraphs: [],
  },
  {
    heading: 'Обмеження надання послуг',
    paragraphs: ['Astra Cloud залишає за собою право обмежити або припинити надання послуг у разі:'],
    listItems: ['спаму', 'фішингу', 'розповсюдження шкідливого програмного забезпечення', 'мережевих зловживань', 'протиправної діяльності', 'порушення умов користування'],
  },
  {
    heading: 'Оплата та спори',
    paragraphs: [
      'Платежі обробляються через авторизовані платіжні системи. Запити на повернення коштів та спірні питання розглядаються індивідуально відповідно до умов послуги та Політики повернення коштів.',
    ],
  },
])

const legalEn = block('Legal Information', [
  {
    paragraphs: ['This page lists Astra Cloud\'s company details and links to all of its legal documents.'],
  },
  {
    heading: 'Company Details',
    listItems: ['Astra Cloud — a cloud infrastructure and data center provider', 'Lviv, Ukraine'],
    paragraphs: [],
  },
  {
    heading: 'Contacts',
    listItems: ['cloud@astra.in.ua — general inquiries', 'abuse@astra.in.ua — abuse and security', '+380 63 636 3448'],
    paragraphs: [],
  },
  {
    heading: 'Documents',
    listItems: ['Terms of Use', 'Privacy Policy', 'Refund Policy', 'SLA'],
    paragraphs: [],
  },
  {
    heading: 'Service Restrictions',
    paragraphs: ['Astra Cloud reserves the right to restrict or terminate services in cases of:'],
    listItems: ['spam', 'phishing', 'malware distribution', 'network abuse', 'unlawful activity', 'violation of the Terms of Use'],
  },
  {
    heading: 'Payments and Disputes',
    paragraphs: [
      'Payments are processed through authorized payment systems. Refund requests and disputes are reviewed individually in accordance with the service terms and the Refund Policy.',
    ],
  },
])

const legalPl = block('Informacje prawne', [
  {
    paragraphs: ['Ta strona zawiera dane firmy Astra Cloud oraz odnośniki do wszystkich jej dokumentów prawnych.'],
  },
  {
    heading: 'Dane firmy',
    listItems: ['Astra Cloud — dostawca infrastruktury chmurowej i rozwiązań data center', 'Lwów, Ukraina'],
    paragraphs: [],
  },
  {
    heading: 'Kontakt',
    listItems: ['cloud@astra.in.ua — sprawy ogólne', 'abuse@astra.in.ua — nadużycia i bezpieczeństwo', '+380 63 636 3448'],
    paragraphs: [],
  },
  {
    heading: 'Dokumenty',
    listItems: ['Regulamin', 'Polityka prywatności', 'Polityka zwrotów', 'SLA'],
    paragraphs: [],
  },
  {
    heading: 'Ograniczenia świadczenia usług',
    paragraphs: ['Astra Cloud zastrzega sobie prawo do ograniczenia lub zakończenia świadczenia usług w przypadku:'],
    listItems: ['spamu', 'phishingu', 'rozpowszechniania złośliwego oprogramowania', 'nadużyć sieciowych', 'działalności niezgodnej z prawem', 'naruszenia regulaminu'],
  },
  {
    heading: 'Płatności i spory',
    paragraphs: [
      'Płatności są przetwarzane za pośrednictwem autoryzowanych systemów płatności. Wnioski o zwrot i spory rozpatrywane są indywidualnie zgodnie z warunkami usługi i Polityką zwrotów.',
    ],
  },
])

// ---------------------------------------------------------------------------
const pages: {
  slug: string
  titles: Record<Locale, string>
  contentByLocale: Record<Locale, ReturnType<typeof block>>
}[] = [
  {
    slug: 'terms',
    titles: { ua: 'Умови користування', en: 'Terms of Use', pl: 'Regulamin' },
    contentByLocale: { ua: termsUa, en: termsEn, pl: termsPl },
  },
  {
    slug: 'privacy',
    titles: { ua: 'Політика конфіденційності', en: 'Privacy Policy', pl: 'Polityka prywatności' },
    contentByLocale: { ua: privacyUa, en: privacyEn, pl: privacyPl },
  },
  {
    slug: 'refund-policy',
    titles: { ua: 'Політика повернення коштів', en: 'Refund Policy', pl: 'Polityka zwrotów' },
    contentByLocale: { ua: refundUa, en: refundEn, pl: refundPl },
  },
  {
    slug: 'sla',
    titles: { ua: 'SLA', en: 'SLA', pl: 'SLA' },
    contentByLocale: { ua: slaUa, en: slaEn, pl: slaPl },
  },
  {
    slug: 'legal',
    titles: { ua: 'Юридична інформація', en: 'Legal Information', pl: 'Informacje prawne' },
    contentByLocale: { ua: legalUa, en: legalEn, pl: legalPl },
  },
]

async function main() {
  const payload = await getPayload({ config })

  for (const page of pages) {
    for (const locale of locales) {
      const existing = await payload.find({
        collection: 'pages',
        where: { and: [{ slug: { equals: page.slug } }, { locale: { equals: locale } }] },
        limit: 1,
      })

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: any = {
        title: page.titles[locale],
        slug: page.slug,
        locale,
        blocks: [page.contentByLocale[locale]],
        publicationStatus: 'published' as const,
      }

      if (existing.docs[0]) {
        await payload.update({ collection: 'pages', id: existing.docs[0].id, data })
        console.log(`✔ /${page.slug} updated (${locale})`)
      } else {
        await payload.create({ collection: 'pages', data })
        console.log(`✔ /${page.slug} created (${locale})`)
      }
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
