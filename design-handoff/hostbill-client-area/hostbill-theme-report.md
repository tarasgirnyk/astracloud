\# Звіт: SCSS-структура теми HostBill «2019»



Дата аналізу: 2026-07-17. Тема: `/home/hostbill/public\_html/templates/2019/` (еталон, read-only розвідка).

Примітка про доступ: файли теми належать `hostbill:nginx` (mode 770); читання виконувалось через групу `nginx` (`sg nginx`), у яку доданий SSH-користувач `tgirnyk` (нова група ще не активна в поточній сесії — після relogin `sg` не знадобиться).



\---



\## A. variables.scss



Розмір: 10 048 байт, 371 рядок. Останні зміни: 2024-04-09.



\### A.1. Структура файлу



Файл складається з двох блоків:



1\. \*\*«Custom variables»\*\* (рядки 3–32, між коментарями `//Start custom variables` / `//End custom variables`) — це змінні з суфіксом `!default`, які \*\*HostBill перезаписує з адмінки\*\* (див. розділ F/I): брендові кольори, шрифт, розміри, вимикачі. Саме цей блок — API теми для кастомізації.

2\. \*\*Решта файлу\*\* — прямі перевизначення Bootstrap 4-змінних без `!default` (тобто фіксовані для теми, адмінка їх не чіпає).



\### A.2. Повний вміст



```scss

@import "vendor/bootstrap/\_functions"; //fix missing "add" function

//Start custom variables



$brand-primary: #3891F2 !default;

$brand-secondary: #9BA0B3 !default;

$brand-success: #2DC76B !default;

$brand-info: #3891F2 !default;

$brand-warning: #F6BB42 !default;

$brand-danger: #D9252E !default;

$link-color: #3891F2 !default;

$navbar-height: 72px !default;

$navbar-bg: #FFFFFF !default;

$navbar-border-color: #EBECF0 !default;

$navbar-border-width: 1px !default;

$navbar-item-color: #AFB2C1 !default;

$menu-width: 250px !default;

$menu-bg: #464851 !default;

$menu-item-color: #9BA0B3 !default;

$enable-preloader: true !default;

$enable-transitions: true !default;

$enable-rounded: true !default;

$font-family-base: "Rubik", Arial, sans-serif !important !default;

$font-size-base: 1rem !default;

$body-bg: #FFFFFF !default;

$body-color: #373A3C !default;

$section-main-max-width: 1400px !default;

$border-width: 1px !default;

$border-radius: 0.43rem !default;

$border-color: #EBECF0 !default;



//End custom variables



$gray-dark: #373a3c;

$gray: #464851;

$gray-light: #9799A6;

$gray-lighter: #EBECF0;



$white: #fff;

$gray-100: #f8f9fa;

$gray-200: #EBECF0;

$gray-300: #dee2e6;

$gray-400: #ced4da;

$gray-500: #AFB2C1;

$gray-600: #6c757d;

$gray-700: #495057;

$gray-800: #343a40;

$gray-900: #212529;

$black: #000;



$blue: #3891F2;

$indigo: #6610f2;

$purple: #7C69CD;

$pink: #e83e8c;

$red: #D9252E;

$orange: #fd7e14;

$yellow: #F6BB42;

$green: #2DC76B;

$teal: #20c997;

$cyan: #17a2b8;



$primary: $brand-primary;

$secondary: $brand-secondary;

$success: $brand-success;

$info: $brand-info;

$warning: $brand-warning;

$danger: $brand-danger;

$light: $gray-100;

$dark: $gray-800;



$theme-colors: (

&#x20;       "primary": $primary,

&#x20;       "secondary": $brand-secondary,

&#x20;       "default": $gray-400,

&#x20;       "success": $success,

&#x20;       "info": $info,

&#x20;       "warning": $warning,

&#x20;       "danger": $danger,

&#x20;       "light": $light,

&#x20;       "dark": $dark

);



$enable-flex: true;

$enable-shadows: false;

$enable-gradients: false;

$enable-hover-media-query: true;

$enable-grid-classes: true;

$enable-print-styles: true;



$image-base-width: 48px;



$info-item-height: 50px;



$icon-info-color: #9BA0B3;



$grid-breakpoints: (

&#x20;       xs: 0,

&#x20;       sm: 544px,

&#x20;       md: 768px,

&#x20;       lg: 992px,

&#x20;       xl: 1200px

);



$container-max-widths: (

&#x20;       sm: 576px,

&#x20;       md: 720px,

&#x20;       lg: 940px,

&#x20;       xl: 1140px

);



$menu-item-size: 0.83rem;

$menu-item-weight: 400;



$link-decoration: none;

$link-hover-color: darken($link-color, 20%);

$link-hover-decoration: none;



$text-secondary: $gray;

$text-light-gray: $gray-500;

$text-muted: $gray-light;



$line-height-base: 1.45;



$font-weight-light: 300;

$font-weight-normal: 400;

$font-weight-bold: 500;



$font-size-lg: $font-size-base \* 1.1;

$font-size-sm: $font-size-base \* .85;

$font-size-xs: $font-size-base \* .6;



$font-size-h1: $font-size-base \* 1.71;

$font-size-h2: $font-size-base \* 1.5;

$font-size-h3: $font-size-base \* 1.29;

$font-size-h4: $font-size-base \* 1.14;

$font-size-h5: $font-size-base \* 1;

$font-size-h6: $font-size-base \* 0.93;



$border-width: 0.07rem;

$border-radius: 0.43rem;

$border-color: $gray-lighter;

$border-radius-lg: $border-radius \* 1.2;

$border-radius-sm: $border-radius \* 0.8;



$table-cell-padding: .75rem;

$table-sm-cell-padding: .3rem;



$table-bg: transparent;

$table-bg-accent: rgba(0, 0, 0, .05);

$table-bg-hover: rgba(0, 0, 0, .075);

$table-bg-active: $table-bg-hover;



$table-border-width: $border-width;

$table-border-color: $border-color;



$table-head-bg: rgba(235, 236, 240, 0.2);

$table-head-color: #464851;

$table-head-size: 13px;



$table-font-size: 14px;



$form-group-margin-bottom: 15px;



$input-btn-padding-y-sm: .25rem;

$input-btn-padding-x-sm: .5rem;

$input-btn-font-size-sm: $font-size-sm;



$input-padding-y-sm: $input-btn-padding-y-sm;

$input-padding-x-sm: $input-btn-padding-x-sm;

$input-font-size-sm: $input-btn-font-size-sm;



$input-btn-line-height: $line-height-base;



$input-line-height: $input-btn-line-height;



$input-btn-padding-y-lg: .5rem;

$input-btn-padding-x-lg: 1rem;

$input-btn-font-size-lg: $font-size-lg;



$input-padding-y-lg: $input-btn-padding-y-lg;

$input-padding-x-lg: $input-btn-padding-x-lg;

$input-font-size-lg: $input-btn-font-size-lg;



$input-padding-x: .8rem;

$input-padding-y: .6rem;

$input-line-height: 1.25;

$input-bg: $body-bg;

$input-bg-disabled: $gray-lighter;

$input-color: $gray-700;



$input-box-shadow: none;

$input-border-color: $gray-300;

$input-color-placeholder: $gray-500;



$input-btn-border-width: $border-width;



$input-border-width: $input-btn-border-width;

$input-height-border: $input-border-width \* 2;



$input-height: add($input-line-height \* 1em, add($input-padding-y \* 2, $input-height-border, false));

$input-height-sm: add($input-line-height \* 1em, add($input-padding-y-sm \* 2, $input-height-border, false));

$input-height-lg: add($input-line-height \* 1em, add($input-padding-y-lg \* 2, $input-height-border, false));



$input-hover-bg: $input-bg;

$input-hover-border-color: darken($input-border-color, 10%);

$input-hover-color: $input-color;



$input-focus-bg: $input-bg;

$input-focus-border-color: darken($input-border-color, 20%);

$input-focus-color: $input-color;



$btn-padding-x: 1rem;

$btn-padding-y: .6rem;

$btn-padding-x-sm: .5rem;

$btn-padding-y-sm: .25rem;

$btn-padding-x-lg: 1.5rem;

$btn-padding-y-lg: .75rem;

$btn-line-height: 1.25;

$btn-font-weight: $font-weight-normal;

$btn-box-shadow: none;

$btn-focus-width: .2rem;

$btn-focus-box-shadow: none;

$btn-disabled-opacity: .65;

$btn-active-box-shadow: inset 0 3px 5px rgba($black, .125);



$btn-default-color: #fff;

$btn-default-bg: $brand-secondary;

$btn-default-border: $gray-light;

$btn-primary-color: #fff;

$btn-primary-bg: $brand-primary;

$btn-primary-border: $btn-primary-bg;

$btn-secondary-color: $btn-default-color;

$btn-secondary-bg: $btn-default-bg;

$btn-secondary-border: $btn-default-border;

$btn-info-color: #fff;

$btn-info-bg: $brand-info;

$btn-info-border: $btn-info-bg;

$btn-success-color: #fff;

$btn-success-bg: $brand-success;

$btn-success-border: $btn-success-bg;



$dropdown-min-width: 160px;

$dropdown-padding-y: 5px;

$dropdown-margin-top: 2px;

$dropdown-bg: $white;

$dropdown-border-color: $gray-200;

$dropdown-border-radius: $border-radius;

$dropdown-border-width: $border-width;

$dropdown-divider-bg: $gray-200;

$dropdown-box-shadow: 0 2px 8px 0 rgba(70, 72, 81, 0.10);

$dropdown-link-color: rgba(155, 160, 179, 1);

$dropdown-link-hover-color: darken($gray-dark, 5%);

$dropdown-link-hover-bg: darken($dropdown-bg, 5%);

$dropdown-link-active-color: rgba(155, 160, 179, 1);

$dropdown-link-active-bg: darken($dropdown-bg, 5%);

$dropdown-link-disabled-color: $gray-light;

$dropdown-item-padding-x: 20px;

$dropdown-header-color: $gray-light;

$dropdown-transition: all .15s linear;



$zindex-navbar: 1000;

$zindex-dropdown: 995;

$zindex-popover: 1060;

$zindex-tooltip: 1070;

$zindex-navbar-fixed: 1030;

$zindex-navbar-sticky: 1030;

$zindex-modal-bg: 1040;

$zindex-modal: 1050;

$zindex-main-overlay: 850;



$navbar-item-border-color: $navbar-border-color;

$navbar-search-transition: opacity .3s;



$pagination-color: $gray-600;



$card-spacer-x: 1.5rem;

$card-spacer-y: 1rem;

$card-border-width: 1px;

$card-border-radius: $border-radius;

$card-border-color: $border-color;

$card-border-radius-inner: $card-border-radius;

$card-cap-bg: #fff;

$card-bg: $body-bg;

$card-head-bg: rgba(235, 236, 240, 0.2);

$card-head-color: $gray-800;

$card-link-hover-color: #fff;

$card-img-overlay-padding: 1.25rem;

$card-deck-margin: .625rem;

$card-columns-sm-up-column-gap: 1.25rem;



$tooltip-max-width: 200px;

$tooltip-color: #fff;

$tooltip-bg: $brand-primary;

$tooltip-opacity: .9;

$tooltip-padding-y: 3px;

$tooltip-padding-x: 8px;

$tooltip-margin: 3px;

$tooltip-arrow-width: 5px;

$tooltip-arrow-color: $tooltip-bg;



$popover-bg: $brand-primary;

$popover-max-width: 276px;

$popover-border-width: 0;

$popover-border-color: transparent;

$popover-box-shadow: 0 5px 30px -5px rgba(37, 45, 51, .5);

$popover-content-padding-x: 15px;

$popover-content-padding-y: 9px;

$popover-arrow-width: 10px;

$popover-arrow-color: $popover-bg;

$popover-arrow-outer-width: ($popover-arrow-width + 1px);

$popover-arrow-outer-color: fade-in($popover-border-color, .05);



$modal-lg: 900px;

$modal-md: 600px;

$modal-sm: 300px;

$modal-inner-padding: 2rem;

$modal-dialog-margin: 10px;

$modal-dialog-sm-up-margin-y: 30px;

$modal-title-padding: 2rem;

$modal-title-line-height: $line-height-base;

$modal-content-bg: #fff;

$modal-content-border-color: none;

$modal-content-border-width: 0;

$modal-content-xs-box-shadow: 0 3px 9px rgba(0, 0, 0, .5);

$modal-content-sm-up-box-shadow: 0 5px 15px rgba(0, 0, 0, .5);

$modal-backdrop-bg: #464851;

$modal-backdrop-opacity: .6;

$modal-header-border-color: none;

$modal-footer-border-color: none;

$modal-header-border-width: none;

$modal-footer-border-width: none;



$modal-transition: all .1s linear;



$alert-success-bg: lighten($brand-success, 45%);

$alert-success-text: $brand-success;

$alert-success-border: darken($alert-success-bg, 4%);



$alert-info-bg: lighten($brand-primary, 38%);

$alert-info-text: $brand-primary;

$alert-info-border: darken($alert-info-bg, 4%);



$alert-warning-bg: lighten($brand-warning, 32%);

$alert-warning-text: $brand-warning;

$alert-warning-border: darken($alert-warning-bg, 4%);



$alert-danger-bg: lighten($brand-danger, 45%);

$alert-danger-text: $brand-danger;

$alert-danger-border: darken($alert-danger-bg, 4%);



$progress-bg: #eee;

$progress-bar-color: $primary;

$progress-border-radius: $border-radius;

$progress-box-shadow: inset 0 .1rem .1rem rgba(0, 0, 0, .1);



$progress-bar-bg: $brand-primary;

$progress-bar-success-bg: $brand-success;

$progress-bar-warning-bg: $brand-warning;

$progress-bar-danger-bg: $brand-danger;

$progress-bar-info-bg: $brand-info;



$breadcrumb-bg: $gray-lighter;

$breadcrumb-divider-color: $gray-500;

$breadcrumb-active-color: $gray-500;

$breadcrumb-divider: ">";



$sidebar-transition: all 0.3s ease;

$panel-body-padding: 20px;



$pageloader-duration: 1.8s;

$pageloader-dimension: 3em;

```



\### A.3. Перевизначені Bootstrap-змінні (згруповано)



\*\*Кольорова система Bootstrap 4:\*\* `$white`, `$gray-100`…`$gray-900`, `$black`, `$blue`, `$indigo`, `$purple`, `$pink`, `$red`, `$orange`, `$yellow`, `$green`, `$teal`, `$cyan`, `$primary`, `$secondary`, `$success`, `$info`, `$warning`, `$danger`, `$light`, `$dark`, мапа `$theme-colors` (з нестандартним ключем `"default"`).



\*\*Прапорці:\*\* `$enable-flex`, `$enable-shadows`, `$enable-gradients`, `$enable-hover-media-query`, `$enable-grid-classes`, `$enable-print-styles`, `$enable-rounded`.



\*\*Сітка (нестандартні брейкпоінти!):\*\* `$grid-breakpoints` — `sm: 544px` замість стокових 576px; `$container-max-widths`.



\*\*Типографіка:\*\* `$font-family-base` (з вбудованим `!important` — нетипово!), `$font-size-base`, `$line-height-base`, `$font-weight-light/normal/bold` (bold = \*\*500\*\*, не 700), `$font-size-lg/sm/xs`, `$font-size-h1…h6` (синтаксис Bootstrap 3 стилю; у BS4 це `$h1-font-size`), `$link-\*`, `$text-muted`.



\*\*Компоненти:\*\* таблиці (`$table-\*`), форми (`$input-\*`, включно з legacy BS3-іменами `$input-color-placeholder`, `$input-bg-disabled`), кнопки (`$btn-\*`, включно з BS3-іменами `$btn-default-\*`, `$btn-primary-bg` тощо), дропдауни (`$dropdown-\*`), z-index (`$zindex-\*`), картки (`$card-\*`), тултіпи/поповери, модалки (`$modal-\*`), алерти (BS3-імена `$alert-success-bg` тощо), прогрес-бари (BS3-імена `$progress-bar-\*-bg`), хлібні крихти (`$breadcrumb-\*`), пагінація.



\*\*Власні (не Bootstrap) змінні теми:\*\* `$brand-\*` (BS3-легасі, аліаси на BS4 `$primary`…), `$navbar-height/bg/border-\*/item-color`, `$menu-width/bg/item-color/item-size/item-weight`, `$section-main-max-width`, `$enable-preloader`, `$enable-transitions`, `$image-base-width`, `$info-item-height`, `$icon-info-color`, `$text-secondary`, `$text-light-gray`, `$sidebar-transition`, `$panel-body-padding`, `$pageloader-\*`, `$table-head-\*`, `$table-font-size`, `$card-head-\*`, `$dropdown-margin-top`, `$navbar-search-transition`, `$zindex-main-overlay`, `$modal-title-padding`.



\---



\## B. app.scss / main.scss



\### B.1. app.scss — єдина точка входу (597 байт, повний вміст)



```scss

@import "fonts";

@import "variables";

@import "vendor/bootstrap/bootstrap";

@import "rtl";

@import "vendor/datepicker";

@import "vendor/pnotify";

@import "vendor/search";

@import "vendor/jRating.jquery";

@import "vendor/fontawesome";

@import "vendor/chosen";

@import "vendor/intlTelInput";

@import "vendor/photoswipe";

@import "vendor/prism";

@import "main";

@import "responsive";

@import "migration\_bootstrap";

@import "migration\_styles";

@import "migration\_cloudhosting";

@import "migration\_dnsservice";

@import "migration\_reseller";

@import "migration\_orderpages";

@import "migration\_upgrades";

```



Порядок каскаду: шрифти → змінні → \*\*весь Bootstrap 4 (vendored копія у `src/scss/vendor/bootstrap/`)\*\* → RTL-фікси → вендорні бібліотеки (datepicker, PNotify, search, jRating, FontAwesome, Chosen, intlTelInput, PhotoSwipe, Prism) → `main` (стилі теми) → `responsive` → сім `migration\_\*` файлів (перекривають усе попереднє, тому мають найвищий пріоритет каскаду).



\### B.2. main.scss — НЕ друга точка входу



Важливе уточнення до постановки задачі: \*\*main.scss не є самостійною точкою входу.\*\* Це найбільший partial-файл теми (71 816 байт, 3 759 рядків), який імпортується з app.scss на 14-й позиції. Він не має власного блоку `@import` SCSS-залежностей і використовує змінні/міксини, визначені раніше в каскаді app.scss — окремо він не скомпілюється. Точка входу одна: `app.scss` (це підтверджує і `configuration.json`: `"app\_scss": "src/scss/app.scss"`).



Вміст main.scss (за структурою, повний текст завеликий для звіту):



\* `@font-face` Material Icons + клас `.material-icons` (з розмірними модифікаторами `size-xs`…`size-hg`);

\* міксин `badge-styles($type)` — \*\*статусні бейджі за назвами статусів HostBill\*\* (`badge-Active`, `badge-Paid`, `badge-Unpaid`, `badge-Suspended`, `label-Cancelled`…) — кольори статусів рахунків/послуг/тікетів зашиті тут;

\* placeholder `%form-control-styles`, міксин `button-styles($type)`, placeholder `%card-styles` — базові «атоми» теми;

\* utility-класи (`.pull-left/right`, `.overflow-\*`, `.btn-w-25/50/75/100` + адаптивні варіанти);

\* глобальний layout: `body` (flex-колонка), `.body-content .section-main` (max-width 1400px, відступ під фіксований navbar), `.footer-content`;

\* прелоадер (`.pageloader-wrapper`, `#preloader`);

\* типографіка (h1–h6, посилання);

\* кастомні чекбокси/радіо через `::after` (з приміткою, що у Firefox не працює);

\* компоненти: `.form-control`, `select`, дропдауни, модалки (кастомна анімація fade), `.form-credentials` (логін-форма), perfect-scrollbar (`.ps`), \*\*`.sidebar` (ліве меню)\*\*, алерти, \*\*`.navbar` (верхня панель з пошуком, кошиком, балансом)\*\*, `.breadcrumb`, тікети/коментарі, `.section-account` (списки/деталі послуг), кошик, файл-аплоад (`#fileupload`, dropzone), `.section-netstat`, knowledgebase/announcements.



Супутні partial-и: `responsive.scss` (268 рядків, медіа-правила) і `rtl.scss` (470 рядків, right-to-left підтримка).



\---



\## C. fonts.scss



4 072 байти. Містить \*\*тільки\*\* 9 блоків `@font-face` однієї родини \*\*Rubik\*\* — self-hosted, без Google Fonts / CDN. Шляхи відносні до скомпільованого CSS: `../fonts/Rubik/…` → фактично `dist/fonts/Rubik/`. Формати в кожному блоці: `.eot` (+ `?#iefix`), `local()`, `.woff2`, `.woff`, `.ttf` — стек часів підтримки IE.



| Накреслення | weight | style |

|---|---|---|

| Rubik-Regular | normal (400) | normal |

| Rubik-Italic | normal | italic |

| Rubik-Light | 300 | normal |

| Rubik-LightItalic | 300 | italic |

| Rubik-Medium | 500 | normal |

| Rubik-MediumItalic | 500 | italic |

| Rubik-Bold | bold (700) | normal |

| Rubik-BoldItalic | bold | italic |

| Rubik-BlackItalic | 900 | italic |



Типовий приклад блоку:



```scss

@font-face {

&#x20; font-family: 'Rubik';

&#x20; src: url('../fonts/Rubik/Rubik-Regular.eot');

&#x20; src: local('Rubik'), local('Rubik-Regular'),

&#x20; url('../fonts/Rubik/Rubik-Regular.eot?#iefix') format('embedded-opentype'),

&#x20; url('../fonts/Rubik/Rubik-Regular.woff2') format('woff2'),

&#x20; url('../fonts/Rubik/Rubik-Regular.woff') format('woff'),

&#x20; url('../fonts/Rubik/Rubik-Regular.ttf') format('truetype');

&#x20; font-weight: normal;

&#x20; font-style: normal;

}

```



Друга родина — \*\*Material Icons\*\* — підключається не тут, а на початку `main.scss` (`dist/fonts/Materialicons/`). Каталог `dist/fonts/` містить 3 підпапки (Rubik, Materialicons + ще одна, ймовірно FontAwesome).



Зауваження: `$font-family-base` оголошений як `"Rubik", Arial, sans-serif !important !default` — `!important` вшитий прямо у значення змінної, тобто \*\*font-family у скомпільованому CSS усюди йде з `!important`\*\*. Це ускладнить перевизначення шрифту зовнішньою дизайн-системою без перекомпіляції.



\---



\## D. Підключення CSS у header



`header.tpl` (21 рядок) — це лише «збирач»: інклюдить `header.shared.tpl`, потім меню (top logged/notlogged, sub-top, left custom/logged/notlogged) і відкриває `.body-content > .section-main`. \*\*Жодного CSS у header.tpl немає.\*\*



Увесь `<head>` — у `header.shared.tpl` (173 рядки). Порядок завантаження ресурсів:



1\. Фавіконки (7 `<link rel="icon/apple-touch-icon">`, шляхи через `{themeconfig}` з дефолтами `dist/favicons/…`).

2\. \*\*Єдиний stylesheet:\*\*

&#x20;  ```smarty

&#x20;  <link rel="stylesheet" type="text/css"

&#x20;    href="{themeconfig prefix=$template\_dir section=css variable=file\_css default="dist/css/app.min.css"}?v={$hb\_version}">

&#x20;  ```

&#x20;  Тобто за замовчуванням віддається `dist/css/app.min.css`, але themeconfig-змінна \*\*`file\_css`\*\* (зберігається в налаштуваннях теми HostBill, у БД) може підмінити його на інший файл — саме так підключається `dist/css/custom.min.css` після кастомізації в адмінці.

3\. Інлайновий `<style>` з themeconfig-змінною \*\*`custom\_css`\*\* (текстове поле «Custom CSS» з адмінки, дефолт — порожньо).

4\. `<script>` з jsLang, потім `dist/js/main.min.js?v={$hb\_version}` (єдиний JS-бандл, 908 КБ min).

5\. Інлайновий `<script>` з themeconfig `custom\_js`; GTM head/body; чат-ембед; PNotify-конфіг; `{userheader}` (хук HostBill для довільних вставок).



\*\*Висновки по пункту:\*\* окремих `<link>` на `custom.min.css` чи `custom\_darkmode.min.css` у шаблонах НЕМАЄ — `grep` по всіх `.tpl` теми не знайшов жодної згадки. Ці файли підключаються лише через підміну однієї змінної `file\_css`. Браузер завжди отримує рівно один CSS-файл + інлайн-блок custom\_css.



\---



\## E. Стан збірки



`find` по всій темі на `Gruntfile.js`, `Gruntfile.coffee`, `package.json`, `package-lock.json`, `node\_modules`, `.grunt`, `gulpfile.js`, `webpack\*`, `\*.config.js`:



\*\*Не знайдено нічого. Порожній результат.\*\*



Тобто в темі немає жодної Node/Grunt/Gulp/Webpack-інфраструктури. Але збірковий механізм існує — він \*\*вбудований у сам HostBill (server-side, PHP)\*\*: `configuration/configuration.json` містить блок



```json

"src": { "path\_scss": "src/scss/", "app\_scss": "src/scss/app.scss" }

```



— HostBill-адмінка («Theme customization») сама компілює `src/scss/app.scss` (PHP SCSS-компілятором, типу scssphp), підставляючи значення змінних із секції `styles` конфігурації, і кладе результат у `dist/css/custom.min.css`, після чого виставляє `file\_css`. Секція `styles` у configuration.json експонує саме той блок «custom variables» з variables.scss: `enable-preloader`, `enable-transitions`, `enable-rounded`, `font-family-base`, `font-size-base`, `body-bg`, `body-color`, `section-main-max-width`, `border-width/radius/color`, `brand-primary/secondary/success/info/warning/danger` + опції `gravatars-tickets`, `sidebar-state`, `position-popups`.



Наявність несмінімізованих `app.css` + чотирьох `.map`-файлів у `dist/css` свідчить, що оригінальну збірку робив вендор (HostBill) у себе; на цьому сервері фронтенд-тулчейну немає.



\---



\## F. dist/css



```

\-rwxrwx---. 1 hostbill nginx    1 809 463  Apr  9  2024  app.css

\-rwxrwx---. 1 hostbill nginx      265 641  Apr  9  2024  app.css.map

\-rwxrwx---. 1 hostbill nginx      570 069  Apr  9  2024  app.min.css      ← дефолтний робочий CSS

\-rwxrwx---. 1 hostbill nginx      232 910  Apr  9  2024  app.min.css.map

\-rwxrwx---. 1 hostbill nginx      462 577  Mar 19  2024  custom\_darkmode.min.css

\-rwxrwx---  1 hostbill hostbill   462 577  Mar 19  2024  custom.min.css

```



Ключові факти:



\* \*\*`custom.min.css` і `custom\_darkmode.min.css` побайтово ідентичні\*\* (md5 `0bf88e67538699420431bd7c8d5aad0c` в обох). Попри назву «darkmode», це \*\*світла\*\* збірка: `body { … color:#373a3c; background-color:#ffffff }`.

\* `custom.min.css` — не «порожня заготовка під кастом», а \*\*повна перекомпільована збірка всієї теми\*\* (\~462 КБ): починається з тих самих `@font-face` Rubik, далі весь Bootstrap + стилі теми. Це продукт server-side компіляції з розділу E, згенерований 2024-03-19 (ймовірно, хтось зберігав налаштування кастомізації/дарк-моду в адмінці, але з дефолтними або майже дефолтними кольорами).

\* Різниця розміру з `app.min.css` (462 КБ проти 570 КБ) пояснюється іншим мінімізатором: вендорний `app.min.css` пройшов агресивнішу пост-обробку (`#fff`, без пробілів), а PHP-компілятор пише `#ffffff` і зберігає пробіли після ком — тобто custom-файл «мінімізований» слабше, але читабельніший.

\* Виправлення до очікування в задачі: файл `custom.min.css` має нетипову групу `hostbill` (а не `nginx`, як усе інше) і не має SELinux-мітки (немає крапки в правах) — його явно генерував/копіював інший процес, ніж деплой теми.

\* Який файл реально віддається браузеру — залежить від значення themeconfig `file\_css` у БД HostBill (див. розділ D). Якщо воно не перевизначене — працює `app.min.css`.



\---



\## G. Інвентар .tpl-екранів кабінету



\### Авторизація / вхід / реєстрація

| Файл | Призначення |

|---|---|

| `login.tpl` | сторінка входу |

| `signup.tpl` | реєстрація нового клієнта |

| `mfa.tpl` | другий фактор (2FA) при вході |

| `userselect.tpl` | вибір акаунта (мультиакаунт/контакти) |

| `ajax.login.tpl`, `ajax.loginform.tpl` | ajax-варіанти форми входу |

| `ajax.signup.tpl` | ajax-реєстрація |

| `bannedip.tpl` | заглушка «IP заблоковано» |

| `badbrowser.tpl` | заглушка для noscript/старих браузерів |

| `maintenance.tpl` | режим обслуговування |



\### Дашборд / профіль (`clientarea/` + корінь)

| Файл | Призначення |

|---|---|

| `clientarea.tpl` | обгортка-роутер клієнтського кабінету |

| `clientarea/dashboard.tpl` | головний дашборд кабінету |

| `clientarea/overview.tpl` | зведення акаунта |

| `clientarea/editdetails.tpl` | редагування даних профілю |

| `clientarea/changepassword.tpl` | зміна пароля |

| `clientarea/settings.tpl` | налаштування акаунта |

| `clientarea/emails.tpl` | історія надісланих email |

| `clientarea/history.tpl` | журнал дій/логінів |

| `clientarea/ipaccess.tpl` | обмеження доступу за IP |

| `clientarea/delete.tpl` | видалення акаунта (GDPR) |

| `clientarea/portal\_notifications.tpl` | сповіщення порталу |

| `clientarea/top\_nav.tpl` | верхня навігація розділу профілю |

| `drawclientinfo.tpl` | блок-картка інформації про клієнта |

| `profiles.tpl`, `ajax.profiles.tpl` | платіжні профілі (збережені методи) |

| `contacts/contacts.tpl` | список контактів/суб-акаунтів |

| `contacts/add\_edit.tpl` | додавання/редагування контакту |

| `contacts/add\_edit\_team.tpl` | керування командою (team-акаунти) |

| `contacts/privileges.tpl` | права доступу контакту |

| `contacts/changepassword.tpl` | зміна пароля контакту |



\### Послуги та домени (`services/` + корінь)

| Файл | Призначення |

|---|---|

| `services/services.tpl` | список послуг клієнта |

| `services/service\_details.tpl` | сторінка деталей послуги |

| `services/services.vps.tpl` | список/подання VPS-послуг |

| `services/service\_billing2.tpl` | білінг-блок послуги (новіший варіант) |

| `service\_billing.tpl` | білінг-блок послуги (кореневий/старіший) |

| `services/service\_upgrades.tpl` | апгрейди/даунгрейди послуги |

| `services/service\_forms.tpl` | додаткові форми модулів послуги |

| `services/cancelationrequest.tpl` | запит на скасування послуги |

| `services/domains.tpl` | список доменів |

| `services/domain\_details.tpl` | деталі домену (NS, EPP, контакти) |

| `services/left\_nav\_service.tpl` | ліва навігація сторінки послуги |

| `services/left\_nav\_domain.tpl` | ліва навігація сторінки домену |

| `services/default\_widget.tpl` | дефолтний віджет модуля послуги |

| `ajax.services.tpl` (ajax/) | ajax-список послуг |

| `ajax.domains.tpl` (ajax/) | ajax-список доменів |

| `ajax.netstat.tpl`, `netstat.tpl` | статистика мережі/трафіку послуги |

| `contract.tpl`, `contracts.tpl`, `ajax.contracts.tpl` | договори клієнта |



\### Білінг і рахунки (`clientarea/` + корінь + `ajax/`)

| Файл | Призначення |

|---|---|

| `invoice.tpl` | перегляд/друк рахунку |

| `clientarea/invoices.tpl` | список рахунків |

| `estimate.tpl` | перегляд кошторису (estimate) |

| `clientarea/estimates.tpl` | список кошторисів |

| `clientarea/addfunds.tpl` | поповнення балансу |

| `clientarea/creditcard.tpl` | додавання/керування карткою |

| `clientarea/ccprocessing.tpl` | процесинг картки (3DS/редиректи) |

| `clientarea/ach.tpl` | платежі ACH |

| `clientarea/creditlogs.tpl` | журнал руху кредитів |

| `clientarea/creditreceipts.tpl` | квитанції про поповнення |

| `clientarea/transfers.tpl` | банківські перекази |

| `clientarea/paymenetfailed.tpl` | екран невдалої оплати |

| `clientarea/thankyou.tpl` | екран успішної оплати |

| `components/billing\_header.tpl` | шапка білінг-сторінок |

| `components/creditcard.tpl` | компонент форми картки |

| `ajax/ajax.invoices.tpl`, `ajax.estimates.tpl`, `ajax.creditlogs.tpl`, `ajax.creditreceipts.tpl`, `ajax.transfers.tpl`, `ajax.history.tpl`, `ajax.emails.tpl`, `ajax.gateway.tpl`, `ajax.portal\_notifications.tpl` | ajax-таблиці відповідних списків |



\### Підтримка й тікети (`support/` + корінь)

| Файл | Призначення |

|---|---|

| `support.tpl` | хаб розділу підтримки |

| `support/listtickets.tpl` | список тікетів |

| `support/viewticket.tpl` | перегляд тікета з листуванням |

| `support/ajax.viewticket.tpl` | ajax-оновлення тікета |

| `support/addticket.tpl` | створення тікета |

| `support/rateticket.tpl` | оцінка якості відповіді |

| `support/reportreply.tpl`, `support/reportticket.tpl` | скарга на відповідь/тікет |

| `tickets.tpl`, `ajax.tickets.tpl` | список тікетів (кореневий/ajax) |

| `knowledgebase.tpl`, `ajax.knowledgebasevote.tpl` (ajax/) | база знань + голосування за статті |

| `annoucements.tpl` | новини/оголошення |

| `chat.tpl` | вбудований чат |

| `downloads.tpl`, `ajax.downloads.tpl` | розділ завантажень |



\### Кошик і замовлення (`cart.tpl`, `components/cart/`, `overrides/`)

| Файл | Призначення |

|---|---|

| `cart.tpl` | каркас сторінки замовлення |

| `components/cart/cart.head.tpl` / `cart.foot.tpl` | шапка/підвал кошика |

| `components/cart/cart.nav.tpl`, `cart.progress.tpl` | навігація та прогрес-бар кроків |

| `components/cart/cart.sidemenu.tpl` | бічне меню кошика (підсумок) |

| `components/cart/cart.currencies.tpl` | перемикач валют |

| `components/cart/ajax.cart.summary.tpl` | ajax-підсумок кошика |

| `components/cart/ajax.checkdomain.tpl`, `ajax.namesuggestions.tpl` | перевірка домену, пропозиції імен |

| `overrides/cart.tpl`, `cart0.tpl`–`cart4.tpl` | кроки majстра замовлення (0 — вибір продукту … 4 — підтвердження) |

| `overrides/cart0\_vps.tpl`, `cart0\_dedicated.tpl` | спеціалізовані перші кроки для VPS/dedicated |

| `overrides/products.tpl` | сітка продуктів на orderpage |

| `overrides/order\_upgrade.tpl` | замовлення апгрейду |

| `overrides/upgrade\_forms/\*.tpl` (11 шт.) | елементи конфігуратора: slider, select, qty, checkbox, radio тощо |

| `overrides/addcreditcard.tpl`, `entercvv.tpl` | платіжні форми в процесі замовлення |

| `overrides/dedicated\_client\_list.tpl`, `common\_contacts.tpl`, `file\_upload\_form.tpl` | допоміжні форми замовлення |



\### Партнерка (`affiliates/`)

| Файл | Призначення |

|---|---|

| `affiliates.tpl` | хаб партнерської програми |

| `affiliates/details.tpl` | дані партнера |

| `affiliates/commissions.tpl`, `commission\_plans.tpl`, `ajax.commissions.tpl` | комісії та плани |

| `affiliates/payouts.tpl`, `ajax.payouts.tpl` | виплати |

| `affiliates/vouchers.tpl`, `addvoucher.tpl` | промокоди |

| `affiliates/invite.tpl` | запрошення рефералів |

| `affiliates/top\_nav.tpl` | навігація розділу |



\### Каркас, меню, решта

| Файл | Призначення |

|---|---|

| `header.shared.tpl` | `<head>`: мета, фавіконки, CSS, JS, конфіги |

| `header.tpl` | збирач шапки: head + меню + відкриття layout |

| `footer.tpl` | підвал + закриття layout |

| `menus/menu.top.logged.tpl` / `menu.top.notlogged.tpl` | верхній navbar (за станом сесії) |

| `menus/menu-sub.top.tpl` | другорядна верхня панель |

| `menus/menu.left.logged.tpl` / `menu.left.notlogged.tpl` | лівий sidebar |

| `menus/menu.left.custom.tpl`, `menu.left.dropdown.tpl` | кастомне ліве меню з tpl\_config |

| `components/breadcrumbs.tpl` | хлібні крихти |

| `components/pagination.tpl` | пагінація таблиць |

| `components/editlabel\_modal.tpl` | модалка перейменування (label) |

| `root.tpl`, `blank.tpl`, `ajax.blank.tpl`, `widget.tpl` | службові обгортки |

| `404.tpl`, `infopage.tpl` | помилка 404, довільна інфо-сторінка |

| `ajax.clientarea.tpl` | ajax-обгортка кабінету |



Разом: \~120 `.tpl`-файлів. Каталог `plugins/` містить не шаблони, а Smarty-плагіни PHP (`function.clientservices.php`, `outputfilter.footer.php` тощо) + `smarty\_variables.json`.



\---



\## H. Призначення migration\_\*.scss



Сім файлів, які підключаються \*\*останніми\*\* в app.scss. Загальна ідея: тема «2019» відмальовує новим Bootstrap 4-каскадом старий HTML, який HostBill генерує з часів попередніх тем (Bootstrap 2/3-розмітка модулів, orderpages, віджетів) — ці файли «мігрують» легасі-розмітку на нову систему. За вмістом:



| Файл | Розмір | За що відповідає |

|---|---|---|

| `migration\_bootstrap.scss` | 1.7 КБ | реалізує \*\*Bootstrap 2-сітку `.span1`–`.span12`\*\* (міксини `make-grid-columns`/`float-grid-columns`) поверх BS4-змінних — для модулів, що досі рендерять `span\*`-класи |

| `migration\_styles.scss` | 11 КБ | глобальні шими: розтягує `%form-control-styles` на \*\*всі\*\* `select`/`input` без класу `.form-control`, інші загальні легасі-стилі |

| `migration\_cloudhosting.scss` | 29.7 КБ (найбільший) | стилі модуля Cloud Hosting: `.cloud`, `.wbox`/`.widget` (старі «widget box»-контейнери), форми в них |

| `migration\_dnsservice.scss` | 3.1 КБ | модуль DNS-менеджера (`#dns-service`), форми записів DNS |

| `migration\_reseller.scss` | 2.2 КБ | реселерські екрани: фікси `html.loading`, таблиць у `.account-content .widget` |

| `migration\_orderpages.scss` | 5.8 КБ | старі orderpage-шаблони замовлення (`.orderpage.orderpage-onestep\_cloudconfig` та ін.) |

| `migration\_upgrades.scss` | 1.9 КБ | екрани апгрейдів: `.upgrade-grid` — перетворення легасі-таблиці на CSS Grid |



Практичний наслідок: у скомпільованому CSS ці правила стоять у кінці й перемагають у каскаді; будь-яка адаптація повинна або зберегти їх (бо модулі HostBill досі віддають `wbox`/`span\*`/старі orderpages), або свідомо відмовитись від підтримки відповідних модулів.



\---



\## I. Спостереження, що впливають на стратегію адаптації



1\. \*\*Точка входу одна — `app.scss`; main.scss лише partial.\*\* Зовнішню дизайн-систему найпростіше заводити через модифікацію каскаду app.scss (до/після `main`) або через змінні.



2\. \*\*Двоканальний механізм кастомізації вже вбудований у HostBill\*\* і його варто використовувати, а не обходити:

&#x20;  \* змінні блоку «custom variables» (variables.scss, `!default`) експортовані в адмінку через `configuration.json → sections.styles`; при зміні HostBill сам server-side перекомпільовує `src/scss/app.scss` → `dist/css/custom.min.css` і перемикає themeconfig `file\_css`;

&#x20;  \* текстові поля `custom\_css`/`custom\_js` вставляються інлайном у `<head>` кожної сторінки.

&#x20;  Отже, дизайн-токени зовнішньої системи, які лягають у наявні змінні (кольори, радіуси, бордери, base-шрифт/розмір), можна донести без жодної правки файлів. Все, що виходить за межі цих \~20 змінних, потребує правки SCSS + перекомпіляції.



3\. \*\*Браузер отримує рівно один CSS-файл\*\* (`file\_css`, дефолт `app.min.css`) + інлайн custom\_css. Немає окремого підключення custom.min.css/darkmode у шаблонах — легенда про «окремий custom.min.css у header» не підтвердилась. Підміна CSS = підміна одного значення конфігурації, що зручно для A/B-перемикання старої/нової збірки.



4\. \*\*«Darkmode» — фікція в поточному стані:\*\* `custom\_darkmode.min.css` байт-у-байт дорівнює `custom.min.css` і містить світлу палітру (`background-color:#ffffff`). Справжньої темної теми в 2019 немає — якщо дизайн-система вимагає dark mode, його доведеться будувати з нуля.



5\. \*\*Жодного фронтенд-тулчейну на сервері\*\* (нема package.json/Grunt/Gulp/node\_modules). Локальну перекомпіляцію доведеться або робити через адмінку HostBill (обмежено змінними), або розгортати власний зовнішній пайплайн (dart-sass збере, але див. п. 8 про legacy-синтаксис).



6\. \*\*Bootstrap 4 вендорено в `src/scss/vendor/bootstrap/`\*\* (не npm-залежність), поряд — стилі 9 сторонніх бібліотек (FontAwesome, Chosen, PNotify, datepicker, intlTelInput, PhotoSwipe, Prism, jRating, search). Усе компілюється в один бандл. Дизайн-системі доведеться співіснувати з класами BS4 і цих бібліотек.



7\. \*\*Багато легасі-шарів у каскаді:\*\* BS3-імена змінних (`$brand-\*`, `$btn-default-\*`, `$alert-\*-bg`), BS2-сітка `.span\*` у migration\_bootstrap, класи `.wbox/.widget` зі старих тем, RTL-файл. Статусні кольори (Paid/Unpaid/Active/Suspended…) зашиті в міксин `badge-styles` у main.scss — мапінг статусів на кольори дизайн-системи робити саме там.



8\. \*\*Ризики компіляції сучасним Sass:\*\* код написаний під старий компілятор — ділення через `/` (`$pageloader-dimension/2`, `$font-size-base / 1.4`), `lighten()/darken()`, `@import` (deprecated у dart-sass 3.0). Перша ж спроба зібрати сучасним dart-sass дасть шквал deprecation-попереджень, а `/`-ділення може зламатись. Або збирати legacy-сумісним компілятором (як робить сам HostBill), або планувати механічну міграцію синтаксису.



9\. \*\*`!important` вшитий у `$font-family-base`\*\* — font-family в усьому CSS з `!important`; типографіку зовнішньої системи без перекомпіляції не перебити інлайн-custom\_css нормальним способом.



10\. \*\*Нестандартні брейкпоінти\*\* (`sm: 544px` замість 576px) і власний layout-каркас (фіксований navbar 72px, sidebar 250px, `.section-main` max-width 1400px, з жорсткими `@media (min/max-width: 993/994px)` у main.scss) — сітку дизайн-системи треба звіряти з цими значеннями, а не зі стоковим Bootstrap.



11\. \*\*Шрифти self-hosted\*\* (Rubik ×9 накреслень + Material Icons + FontAwesome у `dist/fonts/`), без CDN. Заміна на шрифт дизайн-системи = новий fonts.scss + файли у `dist/fonts/` + перевірка `font-weight: 500`-конвенції (тема трактує «bold» як 500).



12\. \*\*Іконки — Material Icons (ліга-шрифт)\*\* з розмірними класами `size-xs…hg` + FontAwesome. Якщо дизайн-система має власний іконопак, міграція торкнеться розмітки `.tpl` (текстові лігатури в тегах), а не лише CSS.



13\. \*\*Артефакти збірки датовані:\*\* `app.\*` — 2024-04-09, `custom\*` — 2024-03-19; SCSS-сирці — теж 2024-04-09. Сирці й дистрибутив синхронні, можна вважати `src/scss` достовірним джерелом поточного вигляду.



14\. \*\*Права файлів:\*\* усе `hostbill:nginx` 770; аномалія — `dist/css/custom.min.css` з групою `hostbill` і без SELinux-контексту (створений іншим процесом). Будь-який зовнішній пайплайн має писати файли зі збереженням власника/групи/контексту, інакше nginx перестане їх віддавати.



15\. \*\*Обсяг роботи по шаблонах:\*\* \~120 `.tpl` (включно з ajax-фрагментами і 16 override-ами кроків кошика). Розмітка щедро використовує util-класи теми (`mg-\*`, `btn-w-\*`, `.section-\*`), тож повний перехід на класи зовнішньої дизайн-системи — це правка шаблонів, а «рескін через змінні» — правка лише SCSS.

