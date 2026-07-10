# Feature Specification: Project Foundation

**Feature Branch**: `001-project-foundation`

**Created**: 2026-07-10

**Status**: Draft

**Input**: User description: "Фундамент — базова інфраструктура проєкту AstraCloud перед побудовою окремих сторінок. Next.js застосунок із вбудованим Payload CMS, PostgreSQL; інтеграція дизайн-системи в реальні компоненти; CMS-схема з полем blocks (курований список, починаючи з Hero + спільний Header/Footer); мовна архітектура UA/EN/PL; перемикач валют UAH/USD/EUR у хедері; каркас billing-adapter з портами і HostBill-адаптером, що реально під'єднується для smoke-тесту; таблиця client_identity_map; docker-compose для Postgres; базовий GitHub Actions workflow. Критерії прийомки: видно реальний Header/Footer + Hero на сайті, адмінка дозволяє редагувати контент і бачити зміни на сайті, білінг-адаптер реально з'єднується з HostBill, CI запускається на push."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Operator publishes a content change without a code deployment (Priority: P1) 🎯 MVP

An operator (administrator/DevOps staff member, not a software engineer) logs into a
content administration interface and edits a page's introductory section — heading,
subheading, and call-to-action — and sees that change reflected on the public site.

**Why this priority**: This is the core value proposition the entire project depends
on: every later page (homepage, VPS, checkout) assumes an operator can change content
without a developer or agent editing code. If this loop doesn't work end-to-end, no
later feature can be trusted to work either.

**Independent Test**: Can be fully tested by logging into the administration
interface, editing the introductory section's heading text, and observing the
updated text on the public site — with no code change or redeploy in between.

**Acceptance Scenarios**:

1. **Given** the administration interface is available and an operator account
   exists, **When** the operator logs in and edits the homepage's introductory
   heading, **Then** the updated heading appears on the public homepage.
2. **Given** no content has yet been entered for a section, **When** a visitor
   loads the homepage, **Then** the shared header and footer are still visible and
   correctly branded, independent of whether the introductory section has content.

---

### User Story 2 - Visitor sees a consistent, multi-language-ready site shell (Priority: P2)

A visitor loads any page of the site and sees a consistent header and footer, with
working language (Ukrainian/English/Polish) and currency (UAH/USD/EUR) selectors.

**Why this priority**: Establishes the "site shell" every future page is built
inside. Without it, no later page's visual design can be validated in context, and
language/currency switching — required across the whole site — would otherwise be
rebuilt per page.

**Independent Test**: Can be fully tested by loading the site and confirming the
header/footer, language selector, and currency selector are present and functional,
independent of any specific page's content.

**Acceptance Scenarios**:

1. **Given** a visitor is on any page, **When** they view the header, **Then** they
   see a language selector (Ukrainian/English/Polish) and a currency selector
   (UAH/USD/EUR).
2. **Given** a visitor switches the language selector to English, **When** the page
   reloads, **Then** the address reflects the English version of that page, even if
   the displayed text still falls back to Ukrainian where no translation exists yet.

---

### User Story 3 - Operator confirms billing connectivity before customer-facing billing features are built (Priority: P3)

An operator triggers an automated check confirming the platform can retrieve real
product/catalog data from the billing system, using credentials limited to
read-only access.

**Why this priority**: De-risks every future billing-dependent feature (pricing
tables, checkout) by proving connectivity early and cheaply, with no write access
and no customer data exposure, before anything customer-facing is built on top.

**Independent Test**: Can be fully tested by running the connectivity check and
confirming it returns real product data from the billing system.

**Acceptance Scenarios**:

1. **Given** valid read-only billing credentials are configured, **When** the
   connectivity check runs, **Then** it successfully retrieves a list of products
   from the billing system.
2. **Given** the billing credentials are missing or invalid, **When** the
   connectivity check runs, **Then** it reports a clear failure rather than
   silently proceeding.

---

### Edge Cases

- What happens when an operator attempts to log in with incorrect credentials? The
  system rejects the attempt with a clear error message.
- How does the system handle a page viewed in a language with no translated content
  yet? It falls back to the Ukrainian content for that page (see Assumptions).
- What happens if the billing system is unreachable when the connectivity check
  runs? The check reports a clear, visible failure rather than appearing to succeed.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST provide an administration interface where an
  authorized operator can create the first administrator account and log in.
- **FR-002**: The system MUST allow an authorized operator to create and edit a
  page's introductory section content (heading, subheading, call-to-action) through
  the administration interface.
- **FR-003**: The system MUST reflect content changes made through the
  administration interface on the publicly viewable site without requiring a code
  change or redeployment.
- **FR-004**: The system MUST display a consistent site header and footer, matching
  the approved visual design, on every page.
- **FR-005**: The system MUST offer a language selector supporting Ukrainian
  (default), English, and Polish, and a currency selector supporting UAH, USD, and
  EUR, visible in the header on every page.
- **FR-006**: The system MUST support distinct, navigable addresses for each
  supported language (Ukrainian at the site root, English and Polish under their
  own path), even where translated content is not yet available for a given page.
- **FR-007**: The system MUST restrict which types of content sections an operator
  can add to a page to a pre-approved list matching the delivered design, rather
  than allowing arbitrary new section types to be invented without a corresponding
  design.
- **FR-008**: The system MUST be able to verify, on demand, that it can retrieve
  real product/catalog data from the billing system using credentials limited to
  read-only access.
- **FR-009**: The system MUST maintain an internal record linking each billing-
  system customer record to a stable internal identifier, established
  independently of any future customer-login feature.
- **FR-010**: The system MUST NOT expose any interface for entering or storing
  payment card data as part of this feature.
- **FR-011**: The system MUST automatically verify code quality (formatting, type
  checking, build success) each time a change is proposed, before that change can
  be considered complete.

### Key Entities

- **Page**: A publishable unit of content (e.g., the homepage) composed of an
  ordered list of content sections. Key attributes: language, ordered list of
  sections, publication status.
- **Content Section ("block")**: A single, reusable, pre-approved type of content
  unit (e.g., the introductory/hero section) with its own editable fields. Key
  attributes: section type, field values, position within a page.
- **Customer Identity Link**: An internal record connecting a stable internal
  identifier to a corresponding billing-system customer record. Key attributes:
  internal identifier, billing-system reference, associated contact (e.g., email).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: An operator with no prior training on this specific system can locate
  the homepage's introductory section in the administration interface and
  successfully change its heading text within 5 minutes of first login.
- **SC-002**: 100% of pages on the site display an identical, correctly branded
  header and footer, verified by visual comparison against the approved design.
- **SC-003**: A visitor can identify and successfully switch both the language and
  currency shown in the header, from any page, without encountering broken
  navigation or an error.
- **SC-004**: The billing-system connectivity check succeeds in retrieving real
  product data at least once, confirmed before any billing-data-dependent feature
  begins development.
- **SC-005**: Zero instances of payment card data being entered, transmitted
  through, or stored as part of this feature (verified by design review, since no
  such interface exists in this feature's scope).

## Assumptions

- Technology stack, hosting approach, and API-credential scoping are fixed by the
  project constitution (`.specify/memory/constitution.md`) and
  `docs/GRILL_NOTES.md`; this specification describes required observable behavior,
  not the implementation that produces it.
- Only Ukrainian content is expected to be fully translated at this stage; English
  and Polish pages may fall back to Ukrainian text where translations don't yet
  exist, per prior agreement.
- This feature covers exactly one example content section (the homepage
  introductory/hero section) end-to-end, as proof that the content-editing loop
  works; building out the homepage's remaining sections is separate, later work.
- "Operator" refers to the same non-engineering staff (administrators/DevOps) who
  will use the administration interface day to day — there is no separate,
  dedicated content team.
- No end-customer-facing account creation, login, or personal dashboard is in scope
  for this feature.
- Server provisioning, the VPS/Dedicated/Colocation pages, and checkout are
  explicitly out of scope for this feature and are planned as separate, later
  features.
