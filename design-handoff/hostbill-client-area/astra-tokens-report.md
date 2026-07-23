# Astra Cloud — звіт з аналізу дизайн-системи (design-handoff)

Дата аналізу: 2026-07-17. Джерело: `C:\Users\pc1\Documents\sdd\AstraCloud\design-handoff\`.
Мета: підготовка до адаптації клієнтського кабінету HostBill під дизайн-систему Astra Cloud.

---

## A. Структура design-handoff (дерево)

```
design-handoff/
├── README.md                          # інструкція для coding-агентів (handoff-бандл з Claude Design)
└── project/
    ├── readme.md                      # головна документація дизайн-системи
    ├── SKILL.md                       # portable skill-визначення бренду
    ├── styles.css                     # кореневий стиль — імпортує 4 файли токенів
    ├── _adherence.oxlintrc.json       # службовий lint-конфіг
    ├── _ds_bundle.js                  # службовий бандл
    ├── _ds_manifest.json              # маніфест дизайн-системи
    ├── .claude/settings.local.json
    ├── tokens/
    │   ├── colors.css                 # кольори (base + semantic + градієнти)
    │   ├── typography.css             # шрифти, шкала, tracking (+ Google Fonts @import)
    │   ├── spacing.css                # відступи, радіуси, тіні, glow, motion, layout
    │   └── base.css                   # ресети + .ac-container
    ├── assets/
    │   ├── img/                       # hero1-astronaut.png, hero1.jpg, hero2.jpg, hero3.png,
    │   │                              # img_vps.png, p_col.png, p_dedicated.jpg, p_vps.jpg
    │   └── logo/
    │       ├── astra-cloud-logo.png   # основний логотип
    │       ├── flags/                 # gb.svg, pl.svg, ua.svg
    │       ├── bitcoin.svg, mastercard.svg, paypal.svg, visa.svg
    │       ├── galcom.png, gigatrans.svg, ix-partner.svg, turk-telekom-intl.png
    ├── components/
    │   ├── core/        Button, Badge, Tag, Card        (.jsx + .d.ts + .prompt.md)
    │   ├── forms/       Input, Select, Checkbox, Radio, Switch
    │   ├── navigation/  Tabs
    │   ├── feedback/    Accordion, Dialog, Tooltip
    │   └── data/        PricingTable
    ├── guidelines/                    # HTML-специмени (довідкові картки)
    │   ├── brand/       logo, mascot-placeholder, section-rhythm
    │   ├── colors/      navy-scale, neon-accents, neutrals-surfaces, orange-cta
    │   ├── spacing/     elevation, radius-scale, spacing-scale
    │   └── type/        body-inter, display-unbounded, type-scale
    ├── templates/
    │   ├── homepage/    Homepage.dc.html + ds-base.js + support.js
    │   ├── simple/      simple.html
    │   ├── vps/         vps.html
    │   └── vps_checkout/ vps_checkout.html   # найближчий референс для кабінету HostBill
    ├── scraps/          logo-on-dark.png
    └── uploads/         home.txt (копі-дек UA), оригінал логотипа, скріншот конкурента
```

---

## B. Кольори

Джерело: `project/tokens/colors.css`. Система: CSS custom properties у `:root` — базова палітра + семантичні аліаси.

### Базова палітра

| Токен | Значення | Роль |
|---|---|---|
| `--navy-950` | `#05070f` | найглибший navy (низ градієнтів, dark-секції) |
| `--navy-900` | `#0a0e1f` | основний dark-фон |
| `--navy-800` | `#10162e` | картки/raised на dark |
| `--navy-700` | `#171f42` | верх hero-градієнта |
| `--navy-600` | `#212b57` | допоміжний |
| `--navy-500` | `#2d3a70` | допоміжний |
| `--cyan-300` | `#7cf3ea` | неон-декор (світлий) |
| `--cyan-400` | `#3ee6d8` | основний cyan-акцент |
| `--cyan-500` | `#1fc9bd` | темніший cyan (info) |
| `--violet-300` | `#b6a3ff` | неон-декор (світлий) |
| `--violet-400` | `#8b6cf7` | основний violet-акцент |
| `--violet-500` | `#6d45e8` | темніший violet |
| `--orange-300` | `#ffb37a` | світлий orange |
| `--orange-400` | `#ff8a3d` | orange (warning, верх градієнта CTA) |
| `--orange-500` | `#ff7016` | **головний CTA-колір** |
| `--orange-600` | `#e85c05` | hover CTA |
| `--orange-700` | `#c04a02` | active CTA |
| `--black` | `#0b0c10` | чорний |
| `--white` | `#ffffff` | білий |
| `--paper` | `#faf9f5` | теплий off-white — фон light-секцій (не чисто-білий!) |
| `--paper-raised` | `#ffffff` | картки на paper |
| `--gray-900` | `#17181c` | основний текст на light |
| `--gray-700` | `#43454d` | — |
| `--gray-500` | `#6c6e78` | muted-текст на light |
| `--gray-300` | `#c8c8d0` | напр. фон вимкненого Switch |
| `--gray-200` | `#e3e2dc` | бордери на light |
| `--gray-100` | `#efeee8` | фон Tabs-контейнера, hover у списках |

### Семантичні аліаси

| Токен | Значення | Роль |
|---|---|---|
| `--surface-dark` | `var(--navy-900)` | dark-фон секцій |
| `--surface-dark-raised` | `var(--navy-800)` | піднята поверхня на dark |
| `--surface-light` | `var(--paper)` = `#faf9f5` | light-фон секцій |
| `--surface-card` | `var(--paper-raised)` = `#ffffff` | картки на light |
| `--surface-card-dark` | `var(--navy-800)` | картки на dark |
| `--text-on-light` | `var(--gray-900)` = `#17181c` | основний текст |
| `--text-on-light-muted` | `var(--gray-500)` = `#6c6e78` | приглушений текст |
| `--text-on-dark` | `#ffffff` | текст на dark |
| `--text-on-dark-muted` | `#aeb3c8` | приглушений текст на dark |
| `--border-on-light` | `var(--gray-200)` = `#e3e2dc` | 1px hairline на light |
| `--border-on-dark` | `rgba(255,255,255,0.12)` | 1px hairline на dark |
| `--brand-primary` | `var(--orange-500)` = `#ff7016` | primary / CTA |
| `--brand-primary-hover` | `var(--orange-600)` = `#e85c05` | hover |
| `--brand-primary-active` | `var(--orange-700)` = `#c04a02` | active |
| `--brand-primary-text` | `#ffffff` | текст на primary |
| `--accent-cyan` | `var(--cyan-400)` = `#3ee6d8` | декоративний акцент |
| `--accent-violet` | `var(--violet-400)` = `#8b6cf7` | декоративний акцент |
| `--status-success` | `#29c46a` | success |
| `--status-warning` | `var(--orange-400)` = `#ff8a3d` | warning |
| `--status-danger` | `#ef4757` | danger / помилки форм |
| `--status-info` | `var(--cyan-500)` = `#1fc9bd` | info |

### Градієнти

| Токен | Значення |
|---|---|
| `--gradient-navy` | `linear-gradient(180deg, --navy-800 0%, --navy-950 100%)` |
| `--gradient-hero` | `radial-gradient(120% 140% at 15% 0%, --navy-700 0%, --navy-900 45%, --navy-950 100%)` |
| `--gradient-accent` | `linear-gradient(120deg, --violet-400 0%, --cyan-400 100%)` |
| `--gradient-orange` | `linear-gradient(135deg, --orange-400 0%, --orange-600 100%)` — фон primary-кнопок |

Ключові правила з readme: **orange — єдиний CTA/акцентний колір** на обох типах поверхонь; cyan/violet — лише декорація (glow, градієнти), **ніколи не текст**; light-фон — теплий `#faf9f5`, ніколи чисто-білий.

---

## C. Типографіка

Джерело: `project/tokens/typography.css`.

### Родини

| Роль | Токен | Родини |
|---|---|---|
| Заголовки/display | `--font-display` | **Unbounded** (fallback: Manrope, sans-serif) |
| Body/UI | `--font-body` | **Inter** (fallback: Golos Text, sans-serif) |

**Походження шрифтів: CDN Google Fonts, локальних файлів немає** (у бандлі — жодного .woff/.woff2/.ttf/.otf). URL з `typography.css`:

```
https://fonts.googleapis.com/css2?family=Unbounded:wght@500;600;700;800&family=Inter:wght@400;500;600;700;800&family=Golos+Text:wght@400;500;600;700&family=Manrope:wght@400;500;600;700&display=swap
```

Ваги: Unbounded 500/600/700/800; Inter 400/500/600/700/800. Readme прямо каже: якщо бренд ліцензує статичні файли — замінити `@import` на локальні `@font-face` у тому ж файлі.

### Шкала (шорткат-токени `font:` = вага / розмір / line-height / родина)

| Токен | Значення | Призначення |
|---|---|---|
| `--size-display-xl` | `clamp(2.75rem, 2.1rem + 2.6vw, 4.5rem)` | адаптивний h1 |
| `--size-display-lg` | `clamp(2.25rem, 1.8rem + 1.8vw, 3.375rem)` | адаптивний h2 |
| `--size-display-md` | `clamp(1.75rem, 1.5rem + 1vw, 2.375rem)` | адаптивний h3 |
| `--text-display-xl` | `700 3.5rem/1.05` Unbounded | статичний h1 (fallback) |
| `--text-display-lg` | `700 2.75rem/1.08` Unbounded | h2 |
| `--text-display-md` | `600 2rem/1.15` Unbounded | h3 |
| `--text-display-sm` | `600 1.5rem/1.25` Unbounded | h4, заголовки діалогів |
| `--text-body-lg` | `400 1.1875rem/1.6` Inter | лід-абзаци |
| `--text-body-md` | `400 1.0625rem/1.6` Inter | основний текст (дефолт body) |
| `--text-body-sm` | `400 0.9375rem/1.5` Inter | дрібний текст, таблиці, форми |
| `--text-caption` | `500 0.8125rem/1.4` Inter | підписи, бейджі |
| `--text-eyebrow` | `700 0.8125rem/1.2` Inter | eyebrow-лейбли |
| `--text-ui-label` | `600 0.9375rem/1.3` Inter | UI-лейбли, кнопки табів, лейбли форм |
| `--text-button` | `600 1rem/1` Inter | кнопки (md) |
| `--text-mono-figure` | `600 1rem/1` Inter | цифри у прайс-таблицях |

### Letter-spacing

| Токен | Значення | Примітка |
|---|---|---|
| `--tracking-eyebrow` | `0.08em` | тільки для eyebrow |
| `--tracking-display` | `-0.01em` | заголовки; Unbounded широкий за замовчуванням — tracking тримати нейтрально-щільним, ніколи не додатнім |

`base.css`: body отримує `font: var(--text-body-md)`, h1–h4 — `--font-display` + `--tracking-display`; для form-елементів примусово `--font-body`.

---

## D. Радіуси / тіні / відступи / брейкпоінти

Джерело: `project/tokens/spacing.css`.

### Відступи (шкала 4px)

| Токен | px |
|---|---|
| `--space-1` | 4 |
| `--space-2` | 8 |
| `--space-3` | 12 |
| `--space-4` | 16 |
| `--space-5` | 20 |
| `--space-6` | 24 |
| `--space-8` | 32 |
| `--space-10` | 40 |
| `--space-12` | 48 |
| `--space-16` | 64 |
| `--space-20` | 80 |
| `--space-24` | 96 |
| `--space-32` | 128 |

### Layout

| Токен | Значення |
|---|---|
| `--container-max` | `1200px` (клас `.ac-container` у base.css) |
| `--container-padding` | `20px` |
| `--section-padding-y` | `clamp(64px, 9vw, 128px)` |
| `--section-gap` | `var(--space-32)` = 128px |

### Радіуси

| Токен | Значення | Використання |
|---|---|---|
| `--radius-sm` | `6px` | тултіпи |
| `--radius-md` | `10px` | інпути, теги, акордеон, пункти дропдауна |
| `--radius-lg` | `16px` | картки, діалоги, таблиці, дропдаун-панелі |
| `--radius-xl` | `24px` | великі блоки |
| `--radius-pill` | `999px` | кнопки, бейджі, таби, switch, select-тригер |

Правило з readme: pill — лише для кнопок/тегів/бейджів; ніколи не повністю квадратне і не «все-pill».

### Тіні та glow

| Токен | Значення |
|---|---|
| `--shadow-card` | `0 1px 2px rgba(20,20,30,.04), 0 8px 24px rgba(20,20,30,.06)` |
| `--shadow-card-hover` | `0 4px 10px rgba(20,20,30,.06), 0 16px 32px rgba(20,20,30,.10)` |
| `--shadow-popover` | `0 12px 32px rgba(10,12,25,.18)` |
| `--glow-cyan` | `0 0 48px rgba(62,230,216,.35)` — «тінь» на dark-секціях |
| `--glow-violet` | `0 0 48px rgba(139,108,247,.35)` |
| `--glow-orange` | `0 0 32px rgba(255,112,22,.4)` |

На dark-поверхнях глибина передається glow, а не тінню.

### Motion

| Токен | Значення |
|---|---|
| `--ease-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` |
| `--duration-fast` | `120ms` (hover/press) |
| `--duration-standard` | `200ms` (таби, акордеон) |
| `--duration-slow` | `320ms` |

### Брейкпоінти

**Формальних токенів брейкпоінтів немає.** У шаблонах — ad-hoc media queries:

- `max-width: 1024px` (vps.html)
- `max-width: 900px` — checkout-грід `1fr 380px` → одна колонка (vps_checkout.html)
- `max-width: 768px` — головний мобільний поріг: ховається desktop-nav, з'являється бургер, footer в одну колонку, h1 → 1.75rem (усі шаблони)
- `max-width: 640px` — addon-грід в одну колонку, вужчі wizard-кроки (vps_checkout.html)

---

## E. Компоненти

Компоненти — React JSX з inline-стилями (прототипи, не production), кожен з `.d.ts` та `.prompt.md`. Стани hover/active реалізовані JS-обробниками — при переносі в Bootstrap їх треба відтворити у CSS.

### Button (`components/core/Button.jsx`)
- **Форма:** `border-radius: pill`; розміри: sm `8px 16px` / `600 14px/1`; md `12px 24px` / `--text-button`; lg `16px 32px` / `600 17px/1`. `inline-flex`, gap 8px (іконка+текст).
- **Варіанти:**
  - `primary` (дефолт): фон `--gradient-orange`, текст білий, без бордера.
  - `secondary`: фон `--white`, текст `--text-on-light`, бордер `1px --border-on-light`.
  - `ghost`: прозорий фон, бордер прозорий, текст `--text-on-light`.
  - `ghost-dark`: прозорий фон, бордер `1px --border-on-dark`, текст білий.
  - `dark`: фон `--navy-950`, текст білий.
- **Стани:** hover → `filter: brightness(1.06)` (без зміни кольору!); press → `transform: scale(0.97)`; disabled → `opacity: 0.45`, `cursor: not-allowed`. Transition `--duration-fast` + `--ease-standard`. Окремого focus-стилю немає (прогалина).

### Badge (`components/core/Badge.jsx`)
- Pill, паддінг `4px 12px`, `--text-caption`, `inline-flex` gap 6px.
- Тони: `orange` — фон `rgba(255,112,22,.12)`, текст `--orange-600`; `cyan` — `rgba(62,230,216,.14)` / `--cyan-500`; `violet` — `rgba(139,108,247,.14)` / `--violet-500`; `neutral` — `--gray-100)` / `--text-on-light`; `on-dark` — `rgba(255,255,255,.1)` / білий. Статичний, без станів.

### Tag — фільтр-чіп (`components/core/Tag.jsx`)
- Кнопка, радіус `--radius-md`, паддінг `8px 16px`, `--text-ui-label`.
- Default: фон білий, бордер `--border-on-light`, текст `--text-on-light`.
- Selected: бордер `--brand-primary`, фон `rgba(255,112,22,.08)`, текст `--orange-600`.

### Card (`components/core/Card.jsx`)
- Радіус `--radius-lg` (16px), паддінг 32px (дефолт), бордер 1px hairline.
- `light`: фон `--surface-card` (білий), бордер `--border-on-light`, тінь `--shadow-card`.
- `dark`: фон `--surface-card-dark` (navy-800), бордер `--border-on-dark`, **без тіні**.

### Input (`components/forms/Input.jsx`)
- Паддінг `12px 16px`, радіус `--radius-md` (10px), фон білий, шрифт `--text-body-md`, бордер `1px --border-on-light`.
- Focus: бордер → `--brand-primary` (orange). Error: бордер → `--status-danger`, повідомлення `--text-caption` кольору danger. Лейбл: `--text-ui-label`, gap 6px. Disabled-стан не описаний.

### Select (`components/forms/Select.jsx`)
- Кастомний дропдаун. Тригер: pill, паддінг `6px 10px`, білий фон, hairline-бордер, `--text-body-sm`, шеврон-стрілка (обертається на 180° при відкритті); підтримує прапорці (18×13px).
- Панель: білий фон, радіус `--radius-lg`, `--shadow-popover`, паддінг 6px, зсув 6px від тригера, z-index 100.
- Пункти: радіус `--radius-md`, паддінг `6px 10px`; hover → фон `--gray-100`; selected → текст `--brand-primary`, фон `rgba(255,112,22,.08)`.

### Checkbox (`components/forms/Checkbox.jsx`)
- 20×20px, радіус 6px; unchecked: бордер `1.5px --border-on-light`, білий фон; checked: фон `--brand-primary`, білий галочка-SVG, без бордера. Лейбл `--text-body-sm`, gap 10px.

### Radio (`components/forms/Radio.jsx`)
- 20×20px, круг; unchecked: бордер `1.5px --border-on-light`; checked: бордер `6px solid --brand-primary` (кільце), білий центр.

### Switch (`components/forms/Switch.jsx`)
- 44×26px, pill, паддінг 3px; on: фон `--brand-primary`; off: фон `--gray-300`. Тумб 20px, білий, тінь `0 1px 2px rgba(0,0,0,.2)`. Transition `--duration-standard`.

### Tabs (`components/navigation/Tabs.jsx`)
- Сегментований контрол: контейнер — фон `--gray-100`, pill, паддінг 4px, gap 4px.
- Кнопка: паддінг `10px 20px`, pill, `--text-ui-label`; активна — білий фон + `--shadow-card` + `--text-on-light`; неактивна — прозора, текст `--text-on-light-muted`.

### Accordion (`components/feedback/Accordion.jsx`)
- Айтеми з gap 8px; кожен: білий фон, бордер hairline, радіус `--radius-md`.
- Кнопка-питання: паддінг `18px 20px`, `--text-ui-label`; іконка «+» у колі 24px (фон `--gray-100`), обертається на 45° при відкритті. Відповідь: `--text-body-sm`, muted, паддінг `0 20px 18px`.

### Dialog (`components/feedback/Dialog.jsx`)
- Оверлей `rgba(5,7,15,.55)`, z-index 1000, клік поза вікном закриває.
- Вікно: білий фон, радіус `--radius-lg`, паддінг 32px, max-width 440px (90% ширини), `--shadow-popover`. Заголовок `--text-display-sm`.

### Tooltip (`components/feedback/Tooltip.jsx`)
- Фон `--navy-950`, білий текст, паддінг `6px 12px`, радіус `--radius-sm`, `--text-caption`, `--shadow-popover`; позиція зверху по центру, зсув 8px.

### PricingTable (`components/data/PricingTable.jsx`)
- Обгортка: радіус `--radius-lg`, hairline-бордер, білий фон, `overflow-x: auto`.
- Thead: фон `--gray-100`, `--text-ui-label`, muted-текст, паддінг `16px 20px`.
- Рядки: `border-top` hairline; highlight-рядок — фон `rgba(255,112,22,.06)`. Ціна: `700 17px/1` Inter. Кнопка «Замовити» в рядку: pill, `8px 20px`, `--gradient-orange`.

**Alert-компонента немає** — для HostBill доведеться зпроєктувати з наявних токенів (`--status-*` + патерн Badge: тонований фон 8–14% + насичений текст).

---

## F. Ассети (шляхи відносно design-handoff/)

**Шрифти:** локальних файлів (.woff/.woff2/.ttf/.otf) **немає** — усе з Google Fonts CDN (див. розділ C).

**Логотипи:**
- `project/assets/logo/astra-cloud-logo.png` — основний логотип (cloud + rocket, navy/white)
- `project/scraps/logo-on-dark.png` — варіант на темному
- `project/uploads/cropped-cropped-astra-cloud-logo-site_5-e1692808077337-195x65.png` — оригінал з сайту (195×65)

**Прапорці (перемикач мов):**
- `project/assets/logo/flags/ua.svg`, `flags/gb.svg`, `flags/pl.svg`

**Платіжні системи:**
- `project/assets/logo/visa.svg`, `mastercard.svg`, `paypal.svg`, `bitcoin.svg`

**Партнери:**
- `project/assets/logo/gigatrans.svg`, `ix-partner.svg`, `galcom.png`, `turk-telekom-intl.png`

**Зображення (hero/послуги):**
- `project/assets/img/hero1-astronaut.png`, `hero1.jpg`, `hero2.jpg`, `hero3.png`, `img_vps.png`, `p_col.png`, `p_dedicated.jpg`, `p_vps.jpg`

**Іконок (SVG-сет) немає** — у шаблонах емодзі-плейсхолдери (💸 🛠️ ⚡ …), позначені в readme як «замінити перед релізом»; кандидати — Lucide/Heroicons.

---

## G. Спостереження для перенесення в Bootstrap-тему HostBill

1. **Технологія системи: чистий CSS custom properties** (`:root`-змінні у 4 файлах `tokens/`), без Tailwind, без SCSS, без style-dictionary/JSON-токенів. Це зручно для HostBill: файли `tokens/*.css` можна підключити майже без змін і мапити Bootstrap-змінні на них (у Bootstrap 5 — перевизначити `--bs-*`; у Bootstrap 3/4 темах HostBill — перевизначити SCSS/LESS-змінні значеннями токенів).
2. **Компоненти — React-прототипи з inline-стилями**, а не CSS-класи. Готового CSS для кнопок/форм немає — стилі треба переписати класами, знявши значення з `.jsx` (усі зафіксовані в розділі E). Стани hover/press зроблені JS-ом (`brightness(1.06)` / `scale(0.97)`) — у темі відтворювати через `:hover`/`:active`.
3. **Найближчий референс для кабінету — `project/templates/vps_checkout/vps_checkout.html`**: там уже є патерни «кабінетного» UI — wizard-кроки, двоколонковий checkout-грід (`1fr 380px`), сайдбар-summary, мобільна навігація з бургером.
4. **Повнота токенів:** кольори, типографіка, spacing, радіуси, тіні, motion — повні й консистентні. **Прогалини:**
   - немає токенів брейкпоінтів (лише ad-hoc 640/768/900/1024 у шаблонах; 768px — головний мобільний поріг);
   - немає focus-ring стилю (Input має orange-бордер на focus, але кнопки/таби — жодного видимого focus; для доступності треба додати);
   - немає компонентів Alert, Table (загального, не pricing), Pagination, Breadcrumbs, Dropdown-menu, Progress — типових для HostBill; проєктувати з токенів;
   - немає disabled-станів для форм (тільки Button);
   - немає іконок і темної/світлої теми як перемикача — «dark» це секційний патерн маркетингового сайту, кабінет логічно робити на light-поверхні (`--paper` фон + білі картки), dark лишити для хедера/футера чи сайдбара.
5. **Ключові правила бренду, які легко порушити в Bootstrap-темі:**
   - фон сторінки — `#faf9f5` (теплий), **не** `#fff` і не сірий Bootstrap;
   - orange — єдиний акцент; не використовувати Bootstrap-синій `primary`; success/danger/info — свої (`#29c46a` / `#ef4757` / `#1fc9bd`);
   - cyan/violet — тільки декор (glow/градієнти), ніколи текст і ніколи кнопки;
   - кнопки — pill (`999px`) з градієнтом `--gradient-orange`, hover — brightness, не darken;
   - картки — білі, hairline-бордер `#e3e2dc` + м'яка двошарова тінь; без кольорових лівих бордерів;
   - заголовки — Unbounded (tracking -0.01em), решта — Inter; шрифти з Google Fonts CDN (якщо кабінет має працювати без зовнішніх CDN — треба самостійно захостити woff2, у бандлі файлів немає);
   - радіуси: інпути 10px, картки 16px, pill лише для кнопок/бейджів/табів.
6. **Мова/тон:** формальне «ви», стримані космічні жарти, без емодзі в реальному копі — актуально для текстів кабінету.
7. **Маскот:** зображення астронавта-маскота не існує — не генерувати; у кабінеті просто не використовувати або лишити плейсхолдер.
