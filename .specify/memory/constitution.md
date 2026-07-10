<!--
Sync Impact Report
==================
Version change: [TEMPLATE] → 1.0.0 (initial ratification)
Modified principles: N/A (first fill from template placeholders)
Added sections:
  - Core Principles I-IX (HostBill Isolation, Least-Privilege Credentials &
    Secret Handling, Webhook Integrity, Stable Internal Identity, No
    Cardholder Data, Simplicity Over Cleverness, Quality Gates Without Code
    Review, Content as Curated Data, Scope Discipline)
  - Technology Stack & Environments
  - Development Workflow
  - Governance (amendment procedure, versioning policy, compliance review)
Removed sections: none (template placeholders only)
Templates requiring updates:
  - .specify/templates/plan-template.md: ✅ reviewed, no changes needed
    (Constitution Check gate is dynamic/generic, no hardcoded principle names)
  - .specify/templates/spec-template.md: ✅ reviewed, no changes needed
  - .specify/templates/tasks-template.md: ✅ reviewed, no changes needed
  - .specify/templates/commands/*.md: N/A (directory does not exist in this
    project; command guidance lives in .claude/skills/speckit-*/SKILL.md,
    which are generic and not principle-specific)
  - docs/GRILL_NOTES.md: kept as-is (historical record of how these
    principles were reached); this constitution is now the authoritative
    source going forward
Follow-up TODOs: none — all placeholders resolved from the grill-me session
recorded in docs/GRILL_NOTES.md.
-->

# AstraCloud Constitution

## Core Principles

### I. HostBill Isolation
HostBill is a billing-engine implementation detail, never the core of the system.
All HostBill-specific knowledge (API calls, field names, webhook payload shapes)
MUST live in a single isolated module (`billing-adapter/adapters/hostbill/`). No
other module — frontend, provisioning, notifications, or any future
client-portal — MAY call the HostBill API directly or import from that adapter
directory; they interact only through domain-shaped ports (e.g.
`ClientProvider`, `InvoiceProvider`, `OrderProvider`, `ProductCatalogProvider`).
**Rationale**: HostBill can be replaced, upgraded, or reconfigured without a
rewrite of the rest of the system, and the blast radius of any HostBill API
quirk is contained to one place an agent or admin can audit in isolation.

### II. Least-Privilege Credentials & Secret Handling
Every HostBill API key MUST be scoped to the minimum set of methods the
consuming feature actually needs at the time it is built (e.g.
`portal-readonly` for catalog/currency/email-existence checks,
`portal-actions` added only when the checkout feature is implemented).
Enabling all methods on a key ("Enable all") is prohibited. All secrets
(API keys, webhook secrets, DB credentials, Payload secret) MUST live only in
`.env` (git-ignored) locally or a secret manager in production, and MUST NEVER
be committed to git, written into a tracked file (including `.env.example`,
which holds only empty placeholder keys), or pasted into a chat/agent
conversation. Any credential that is exposed by any of these means MUST be
treated as compromised and rotated immediately, regardless of whether it was
also fixed in place.
**Rationale**: A team without in-house engineers cannot rely on code review to
catch credential leaks; the process itself must make leaking hard and
rotating cheap.

### III. Webhook Integrity
Every inbound HostBill webhook MUST be verified against its signature
(`secret`, `HB-Hook`, `HB-Timestamp`) before any processing occurs; an
unverified webhook is rejected, not logged as handled. Webhook handlers MUST
be idempotent, keyed by the HostBill event ID, so redelivery of the same event
never duplicates an action (e.g., a second provisioning trigger or a second
notification).
**Rationale**: Webhooks are the only asynchronous, externally-triggered entry
point into the system; unverified or non-idempotent handling is a direct path
to spoofed or duplicated financial/state changes.

### IV. Stable Internal Identity
The system's internal `userId` MUST NEVER be equal to or interchangeable with
a HostBill `client ID`. A dedicated mapping table
(`client_identity_map(internal_user_id, hostbill_client_id, email, ...)`) MUST
exist from the first commit that creates HostBill clients, even before any
internal authentication system exists. All internal records (orders, audit
data, future notifications) reference `internal_user_id`, never the HostBill
ID directly.
**Rationale**: Retrofitting an identity indirection layer after real customer
data exists is expensive and risky; establishing it before the client-portal
and its own authentication arrive means that feature can attach a real login
to an existing record instead of migrating IDs across every table.

### V. No Cardholder Data
Payment card data (number, CVV, or equivalent) MUST NEVER be received,
processed, or stored by any part of this system. Checkout completes via
redirect to a HostBill/payment-gateway hosted payment page; card tokenization
calls, where genuinely required, happen only inside `billing-adapter`, and
only when a specific flow requires a token — never for a one-time charge.
**Rationale**: Keeping cardholder data entirely outside the system's trust
boundary removes an entire class of compliance and breach risk that a team
without dedicated security engineering cannot reasonably carry.

### VI. Simplicity Over Cleverness
Every architecture and infrastructure decision MUST be justified against the
team's actual composition: administrators/DevOps plus AI coding agents, no
in-house software engineers. Where a simpler option meets the requirement, it
MUST be chosen over a more "correct" or "scalable" one designed for a team
that does not exist here. Concretely, and unless a documented need forces a
change: one Next.js application with Payload CMS embedded in the same
process (no separate CMS service), no separate microservices, no message
queue (Redis/BullMQ) until real webhook volume or latency demonstrates the
need, and staging environments are not introduced unless a specific,
articulated risk requires one.
**Rationale**: Every additional moving part (service, queue, environment) is
something this team has to operate and debug alone; unused flexibility is a
maintenance cost paid daily for a benefit that may never be needed.

### VII. Quality Gates Without Code Review
Because no in-house engineer performs code review, automated gates MUST
substitute for it: TypeScript strict mode is non-negotiable;
`eslint-plugin-boundaries` (or equivalent) MUST technically enforce the
module-isolation rule in Principle I, including within the single-application
monolith of Principle VI; Semgrep (or equivalent SAST) MUST run in CI; and
`billing-adapter` and any future payment/identity code MUST carry
higher-than-default test coverage. Security-critical areas (billing,
authentication) are candidates for periodic human or fractional-senior review
even though day-to-day development is agent-driven.
**Rationale**: Tooling is the only reviewer this project reliably has; it must
be configured to actually catch the mistakes a human reviewer would have
caught.

### VIII. Content as Curated Data
Content pages (homepage, VPS/Dedicated/Colocation landing pages, the generic
`simple` template) MUST model their composition as a Payload `blocks` array,
not fixed per-page fields, so an editor can add, remove, or reorder blocks
without code changes. The set of selectable block types per page MUST be
curated and limited to what the design handoff (`design-handoff/project/
templates/*.dc.html`) actually specifies — no speculative block types built
ahead of a real mockup. Each reusable block (Hero, TrustBar, FAQ,
ConsultationCTA, etc.) is defined exactly once as a field config plus
component and reused across pages; page-specific data blocks (e.g. pricing
tables) hold only a marketing wrapper in the CMS and fetch live prices/specs
from HostBill through `billing-adapter` at render time, never duplicating
billing data as CMS content. Checkout and the client-portal are NOT
block-composed: they are fixed application code (wizard state machines, data
tables), because their structure is a business-process constraint, not
editorial content — an editor must not be able to rearrange a payment flow by
dragging blocks.
**Rationale**: Block flexibility is valuable exactly where content changes
independently of code, and actively dangerous where correctness of a flow
(payment, account data) depends on a fixed structure.

### IX. Scope Discipline
Each shippable increment is scoped to what has an actual, current design
mockup and business need — not what might be useful later. Concretely at
present: the client-portal is out of scope until its own design handoff
exists (checkout redirects to the existing HostBill client area unchanged);
physical/virtual server provisioning automation is out of scope (the system's
responsibility ends at order/invoice creation and status display after a
webhook); and pages without a mockup (Colocation, Dedicated Server) are
temporarily served from the generic `simple` template rather than having
bespoke pages built ahead of their design. Each page or capability is
implemented as its own spec-kit feature, in the order: Foundation → Homepage
→ VPS page → Checkout → Simple template — never as one large undifferentiated
feature.
**Rationale**: Building ahead of a real mockup or a confirmed need produces
work that has to be redone once the actual design or requirement arrives, and
hides the true size of what's left to build.

## Technology Stack & Environments

- **Application**: one Next.js (App Router) application with Payload CMS
  embedded in the same process; PostgreSQL as the only datastore. No
  Redis/BullMQ until real load justifies it (Principle VI).
- **Internationalization**: UA (default, no URL prefix), EN (`/en/`), PL
  (`/pl/`) — path-based routing, full i18n schema in place from the start,
  even though only UA copy is translated for initial launch.
- **Currency**: UAH/USD/EUR display switcher is required (confirmed content
  requirement), synchronized between site header and checkout.
- **Local development**: the application runs un-containerized for fast
  iteration and native debugging; PostgreSQL runs in Docker locally.
- **Production**: self-hosted on Astra's own infrastructure (no external
  PaaS). PostgreSQL runs in Docker in production too, pinned to the same
  image/version as local, to eliminate version drift as a variable. The
  application process runs under a process manager (pm2 or a systemd unit)
  behind an Nginx/Caddy reverse proxy (TLS termination, routing); whether the
  application itself is containerized in production is decided at
  implementation time and need not match the local setup. No staging
  environment — only local and production, by deliberate choice.
- **CI/CD**: GitHub Actions. Deploys run an explicit sequence — pull code,
  run pending Payload/Postgres migrations, build, restart the process —
  migrations MUST run before restart, never as a manual afterthought.
  Production server SSH credentials are supplied by the human operator as
  GitHub Secrets; they are referenced by name in workflows, never obtained or
  handled in an agent conversation.

## Development Workflow

- Every page or capability is planned and built as its own spec-kit feature
  (`/speckit-specify` → `/speckit-plan` → `/speckit-tasks` →
  `/speckit-implement`), sized as a small, independently testable increment —
  never as one undifferentiated "build the whole site" effort.
- API key scope expansion follows the same discipline as feature scope:
  a new HostBill API method is enabled on a key only when the feature that
  needs it is actually being implemented, not provisioned in advance for a
  later phase.
- `docs/GRILL_NOTES.md` records the reasoning and context behind the
  decisions in this constitution and MAY be consulted for historical
  context, but this constitution is the authoritative, current statement of
  project rules — where the two conflict, this constitution wins and
  `GRILL_NOTES.md` should be updated to match.

## Governance

This constitution supersedes any ad hoc practice or prior informal agreement
for this project. Amendments require: (1) the proposed change written out
with its rationale, (2) an explicit version bump following the policy below,
and (3) propagation of any consequential changes to dependent templates
(`.specify/templates/*.md`) and this file's own Sync Impact Report.

**Versioning policy**: MAJOR for backward-incompatible removals or
redefinitions of a principle; MINOR for a new principle or materially
expanded guidance; PATCH for clarification or wording fixes that do not
change what is required.

**Compliance review**: because this project has no in-house engineering
team, compliance cannot rely on habitual code review. Each spec-kit feature's
plan MUST pass the Constitution Check gate before implementation begins, and
the `billing-adapter` module in particular is a standing candidate for
periodic review by a human or fractional-senior engineer, even under an
otherwise fully agent-driven development model.

**Version**: 1.0.0 | **Ratified**: 2026-07-10 | **Last Amended**: 2026-07-10
