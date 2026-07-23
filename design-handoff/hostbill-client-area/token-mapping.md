# Astra Cloud → HostBill «2019» — мапінг токенів

Джерела: `astra-tokens-report.md` (дизайн-система) + `hostbill-theme-report.md` (тема).
Мета: точні відповідності «Astra CSS-змінна → HostBill SCSS-змінна», щоб адаптація спиралась на факти, а не на здогади.

Позначення рівня:
- **[A] адмінка** — змінна є в блоці «custom variables» (`!default`) і доступна в Theme customization без правки файлів. HostBill сам перекомпілює.
- **[S] SCSS** — потрібна правка `src/scss/` + власний компілятор (серверний компілятор HostBill цю змінну не експонує).
- **[T] tpl/main** — потребує правки шаблонів або `main.scss` (виходить за межі змінних).

---

## 1. Кольори — базова палітра бренду

| Astra токен | Значення | → HostBill змінна | Рівень | Примітка |
|---|---|---|---|---|
| `--brand-primary` (`--orange-500`) | `#ff7016` | `$brand-primary` | **[A]** | Головна заміна: синій `#3891F2` → orange. Тягне за собою `$primary`, `$btn-primary-bg`, `$link-color` (через ланцюг). |
| `--brand-primary-hover` (`--orange-600`) | `#e85c05` | (немає прямої) | [S] | Bootstrap рахує hover як `darken($primary,7.5%)`. Astra hover = `brightness(1.06)`, не darken. Для точності — правка міксина кнопки в main.scss ([T]). |
| `--brand-primary-active` (`--orange-700`) | `#c04a02` | (немає прямої) | [S] | Аналогічно; active = `darken(...,10%)` за замовч. |
| `--status-success` | `#29c46a` | `$brand-success` | **[A]** | Astra зеленіший за стоковий `#2DC76B`. |
| `--status-warning` (`--orange-400`) | `#ff8a3d` | `$brand-warning` | **[A]** | Увага: Astra warning — теж помаранчевий відтінок; візуально близький до primary. Перевір, щоб warning не зливався з CTA. |
| `--status-danger` | `#ef4757` | `$brand-danger` | **[A]** | Заміна `#D9252E`. |
| `--status-info` (`--cyan-500`) | `#1fc9bd` | `$brand-info` | **[A]** | Cyan. АЛЕ: у темі `$brand-info` = `$brand-primary` (синій використовувався і як info). Розчепити. |
| `--text-on-light-muted` (`--gray-500`) | `#6c6e78` | `$brand-secondary` | **[A]** | Astra не має яскравого «secondary» кольору — secondary-кнопки в Astra білі з бордером. Мапимо на muted-сірий як найближче; справжній вигляд secondary-кнопки — через [T]. |

### Важливо про `$brand-info`
У темі `$brand-info: $brand-primary` — тобто info та primary були одним синім. У Astra це різні кольори (info = cyan, primary = orange). Обов'язково задати info окремим значенням, інакше info-елементи стануть помаранчевими.

### Заборонене (правила бренду з readme Astra)
- cyan/violet — **лише декор** (glow, градієнти), ніколи текст і ніколи фон кнопок. Не мапити на `$primary`/`$link-color`.
- Не лишати Bootstrap-синій ніде як акцент.

---

## 2. Поверхні та текст

| Astra токен | Значення | → HostBill | Рівень | Примітка |
|---|---|---|---|---|
| `--surface-light` (`--paper`) | `#faf9f5` | `$body-bg` | **[A]** | Теплий off-white — ключова відмінність від стокового `#fff`. |
| `--text-on-light` (`--gray-900`) | `#17181c` | `$body-color` | **[A]** | Заміна `#373A3C`. |
| `--surface-card` | `#ffffff` | `$card-bg` (=`$body-bg` зараз) | [S] | Картки в Astra білі на теплому фоні — контраст важливий. Зараз `$card-bg: $body-bg`, тобто картка зіллється з фоном. Розчепити: `$card-bg: #fff`. |
| `--border-on-light` (`--gray-200`) | `#e3e2dc` | `$border-color` | **[A]** | Hairline-бордер. Заміна `#EBECF0`. |
| `--surface-dark-raised` (`--navy-800`) | `#10162e` | `$menu-bg` | **[A]** | Ліве меню в Astra логічно робити dark navy. Зараз `#464851` (сірий). |
| `--surface-card` | `#ffffff` | `$navbar-bg` | **[A]** | Верхній navbar білий — вже так; лишити. |

---

## 3. Радіуси

Astra: інпути 10px, картки 16px, pill (999px) для кнопок/бейджів/табів.
HostBill: єдиний `$border-radius: 0.43rem` (~6.9px), `$enable-rounded: true`.

| Astra | → HostBill | Рівень | Примітка |
|---|---|---|---|
| `--radius-md` 10px (інпути) | `$border-radius` → `0.625rem` | **[A]** | 10px = 0.625rem. Базовий радіус теми. |
| `--radius-lg` 16px (картки) | `$card-border-radius` → `1rem` | [S] | Зараз `= $border-radius`. Розчепити на 16px. |
| `--radius-pill` 999px (кнопки) | `$btn-border-radius: 999px` | [S] | Змінної нема в custom-блоці; додати в SCSS. Ключова риса Astra-кнопки. |

---

## 4. Типографіка

Astra: Unbounded (заголовки, 500-800) + Inter (текст, 400-800), Google Fonts CDN.
HostBill: Rubik self-hosted, `$font-weight-bold: 500` (тема трактує bold як 500!), `!important` вшитий у `$font-family-base`.

| Astra | → HostBill | Рівень | Примітка |
|---|---|---|---|
| `--font-body` Inter | `$font-family-base` | [A] частково | Можна вписати назву в адмінці, АЛЕ файли не завантажаться і `!important`-конфлікт лишиться. Реально — [S]/[T]. |
| `--font-display` Unbounded | (немає) | [T] | Тема не розділяє шрифт заголовків і тексту. Для Unbounded на h1–h6 — правка типографіки в main.scss. |
| Inter 400 = body | `$font-size-base: 1rem` | [A] | Розмір базовий збігається (1rem = 17px Astra body-md близько; Astra 1.0625rem). |
| Ваги 400-800 | `$font-weight-bold: 500` | [S] | ⚠️ Тема вважає bold=500. Astra використовує 600/700/800. Перевизначити ваги, інакше заголовки будуть тонкими. |

**Рішення по шрифтах:** качати woff2 (Unbounded 500/600/700/800 + Inter 400/500/600/700), класти в `dist/fonts/`, переписати `fonts.scss` (замінити 9 блоків Rubik на нові @font-face), прибрати `!important` з `$font-family-base` або узгодити каскад. CDN не використовувати (кабінет не має залежати від зовнішнього).

---

## 5. Тіні

Astra: двошарова м'яка тінь карток. HostBill: `$enable-shadows: false`, картки без тіней (лише бордер).

| Astra | → HostBill | Рівень |
|---|---|---|
| `--shadow-card` `0 1px 2px rgba(20,20,30,.04), 0 8px 24px rgba(20,20,30,.06)` | правка `%card-styles` / `.card` у main.scss | [T] |
| `--shadow-popover` `0 12px 32px rgba(10,12,25,.18)` | `$dropdown-box-shadow`, `$modal-content-*-box-shadow` | [S] |

`$enable-shadows` лишити false (щоб не вмикати тіні глобально на все), тіні карток додати точково.

---

## 6. Кнопки — найбільша структурна відмінність

| Аспект | Astra | HostBill зараз | Дія |
|---|---|---|---|
| Форма | pill 999px | `$border-radius` ~7px | `$btn-border-radius: 999px` [S] |
| Фон primary | `--gradient-orange` (лінійний градієнт) | суцільний `$brand-primary` | `$enable-gradients` або кастомний фон у міксині [T]; градієнт `linear-gradient(135deg,#ff8a3d,#e85c05)` |
| Hover | `brightness(1.06)` | `darken(...,7.5%)` | правка міксина кнопки [T] |
| Press | `scale(0.97)` | зсув тіні | `transform: scale(.97)` [T] |
| Вага тексту | 600 (`--text-button`) | `$btn-font-weight: 400` | `$btn-font-weight: 600` [S] |
| Secondary | білий фон + бордер | сірий фон (`$brand-secondary`) | окремий стиль [T] |

Це найпомітніша для ока різниця. Без неї кнопки лишаться «прямокутно-плоскими hostbill», навіть якщо колір правильний.

---

## 7. Статусні бейджі (Paid/Active/Suspended…)

Зашиті в міксин `badge-styles($type)` у `main.scss` — за назвами статусів HostBill. Мапити на Astra-тони (патерн Badge: тонований фон 8-14% + насичений текст):

| Статус HostBill | Astra тон | Значення |
|---|---|---|
| Active / Paid | success | фон `rgba(41,196,106,.12)`, текст `#1e9d52` |
| Unpaid / Overdue | danger | фон `rgba(239,71,87,.12)`, текст `#d92f3f` |
| Suspended / Pending | warning | фон `rgba(255,138,61,.14)`, текст `#e06a1a` |
| Cancelled / Terminated | neutral | фон `--gray-100 #efeee8`, текст `--gray-700` |

Рівень [T] — правка main.scss.

---

## 8. Що НЕ мапиться (проєктувати з токенів)

Astra не має, а HostBill потребує: загальна Table (не pricing), Pagination, Breadcrumbs, Alert, Dropdown-menu, Progress, disabled-стани форм. Будувати з Astra-токенів (кольори + spacing + radius + патерн Badge для алертів). Джерело значень — розділ E звіту Astra.

---

## 9. Брейкпоінти — звіряти, не замінювати

| | Astra | HostBill |
|---|---|---|
| Мобільний поріг | 768px | `md: 768px` ✓ збіг |
| sm | 640px | `sm: 544px` ✗ розбіжність |
| Планшет | 900/1024px | `lg: 992px` |

HostBill має нестандартний `sm: 544px` (не 576px) і жорсткі `@media 993/994px` у main.scss під фіксований navbar 72px / sidebar 250px. **Не замінювати сітку Astra наосліп** — звіряти з цими значеннями.

---

## Підсумок обсягу

- **Тільки адмінка [A]:** ~10 змінних → ~40-50% враження (кольори + фон + базовий радіус + меню-фон). Нуль коду.
- **+ SCSS [S]:** pill-кнопки, розчеплення card/info, радіуси, ваги шрифтів → ще ~25%. Потрібен власний компілятор.
- **+ tpl/main [T]:** градієнти, тіні карток, шрифт заголовків, badge-статуси, шапка/сайдбар, нові компоненти → решта. Основний обсяг ручної роботи.
