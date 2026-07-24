# Astra Cloud

Next.js + embedded Payload CMS site for Astra Cloud (VPS/dedicated/colocation
hosting), trilingual (UA default, EN, PL). See `docs/GRILL_NOTES.md` and
`specs/001-project-foundation/` for the original architecture decisions.

## Prerequisites

- Node.js ≥ 20
- pnpm (`npm install -g pnpm` if missing)
- Docker Desktop (running) — **local dev only**, runs Postgres in a
  container; production does **not** use Docker, see "Production
  deployment" below
- Git, with SSH access to this repo already configured on the machine

## First-time setup on a new machine

```bash
git clone git@github.com:tarasgirnyk/astracloud.git
cd astracloud
cp .env.example .env
```

Fill in `.env`:
- `PAYLOAD_SECRET` — any random string (e.g. `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
- `DATABASE_URL` — leave as-is (`postgres://postgres:postgres@localhost:5433/astracloud`), matches `docker-compose.yml`
- `AGENT_ADMIN_EMAIL` / `AGENT_ADMIN_PASSWORD` — pick your own admin login; you'll use these to create the first Payload user at `/admin` on first run
- `HOSTBILL_*` — **required** for the VPS page to show real tariffs (name/price/specs are 100% live — see "Live pricing" below) and for the two HostBill dropdowns in the admin (category picker, recommended-product picker); the site still runs without them, but `/vps` shows "Тарифи тимчасово недоступні" and those dropdowns come up empty
- `REVALIDATE_SECRET` — any random string; only needed if you'll force-refresh the pricing cache from outside the admin (see "Live pricing" below) — the in-admin "Оновити ціни" button doesn't use it

Then:

```bash
docker compose up -d      # starts Postgres on localhost:5433
pnpm install
pnpm payload migrate      # applies everything in src/migrations/ — see below
pnpm dev                  # http://localhost:3000, admin at /admin
```

Open `http://localhost:3000/admin` and create the first admin user (use the
`AGENT_ADMIN_EMAIL`/`AGENT_ADMIN_PASSWORD` you set in `.env`) — Payload's
built-in first-user flow.

**If the database is fresh** (no content yet), run the seed scripts — see
below — after migrating, before or after creating the admin user (order
between those two doesn't matter).

## Content model

Two Payload collections hold page content, both using Payload's **native
field-level localization** (`localized: true` on text fields — one document
per slug, not one document per locale; see `payload.config.ts`'s
`localization` config):

- **`pages`** — generic content: homepage, About, legal pages, Documents.
- **`service-pages`** — product pages tied to HostBill (VPS, Colocation) —
  kept as a separate collection because they carry HostBill-specific fields
  (`hostbillCategoryId`, `recommendedProductId` — see "Live pricing" below)
  a plain content page never will.

In the admin, each document has a locale switcher (top of the edit view).
Block structure (which blocks exist, how many, in what order — e.g. FAQ
item count) is **shared** across all three locales; only the text fields
inside each block differ per locale. `publicationStatus` is shared too —
publishing a document publishes every locale at once. A locale with no
translated value yet falls back to the Ukrainian (`ua`, `defaultLocale`)
copy instead of rendering empty.

## Migrations

Location: `src/migrations/` (one `.ts` + matching `.json` schema-snapshot
file per migration, registered in `src/migrations/index.ts`).

```bash
pnpm payload migrate           # apply all pending migrations
pnpm payload migrate:status    # see what's applied vs pending
pnpm payload migrate:create <name>   # generate a new migration from a config change
```

**Known gotcha:** `migrate:create` sometimes needs to ask an interactive
question ("is this column new or renamed?") via an arrow-key prompt. That
prompt doesn't work over a piped/non-interactive shell (e.g. when an agent
runs it) — the command hangs and produces no migration file. If that
happens, either run it yourself in a real interactive terminal, or write
the migration by hand (see any of the `.ts` files in `src/migrations/` from
2026-07-12 for the pattern: a `db.execute(sql\`...\`)` in `up`/`down`) — in
that case you also need to hand-write the matching `.json` snapshot (copy
the most recent one and patch just the changed columns) so future
`migrate:create` runs have an accurate baseline to diff against.

## Seed scripts

Location: `scripts/seed-*.ts`. Each one is **idempotent** — it upserts by
`slug` (one document, written once per locale — see "Content model" above),
safe to re-run after editing. The per-locale write logic (and the tricky
part: preserving array/block row `id`s across locale writes, so writing the
`en` copy doesn't blow away the `ua` copy's rows) lives once in
`scripts/seed-locale-helpers.ts`'s `seedLocalizedDoc()`, used by every
script below. Run with:

```bash
pnpm payload run scripts/<file>.ts
```

(Not `node scripts/...` — `payload run` is what resolves the `@/` path
aliases and loads `.env`; a plain `node` invocation will fail on both.)

Recommended order on a fresh database (content/service pages first, so the
homepage's nav/footer links resolve to real pages, and so `seed-faq-items.ts`
can find the pages it tags — it looks each one up by slug and throws if the
page doesn't exist yet):

1. `seed-about.ts` — "Про нас" (`/about`) — `pages` collection
2. `seed-legal-pages.ts` — Terms, Privacy, Refund Policy, SLA, Legal Section (`/terms`, `/privacy`, `/refund-policy`, `/sla`, `/legal`) — `pages` collection
3. `seed-documents.ts` — "Документи" (`/documents`) — `pages` collection
4. `seed-vps.ts` — VPS product page (`/vps`) — `service-pages` collection
5. `seed-dedicated.ts` — Dedicated Server product page (`/dedicated`) — `service-pages` collection
6. `seed-colocation.ts` — Colocation product page (`/colocation`) — `service-pages` collection
7. `seed-partnerka.ts` — Партнерка/affiliate program page (`/partnerka`) + its "Партнерка" nav link — `pages` collection
8. `seed-homepage.ts` — home page + `site-chrome` global (nav/footer/logo links to all of the above) — `pages` collection
9. `seed-faq-page.ts` — general FAQ page (`/faq`) with a single `faq-index` block that lists every published FAQ item at render time — `pages` collection
10. `seed-faq-nav.ts` — adds the "FAQ" link to the `site-chrome` nav dropdown and footer column (run after `seed-faq-page.ts`, whose page it links to)
11. `seed-faq-items.ts` — the actual FAQ question/answer content (~270 items from real support tickets), each tagged with the page(s) it should render on; run **last**, since it looks up `home`/`vps`/`dedicated`/`partnerka` by slug and fails if any of them aren't seeded yet — items then render automatically via `PageFaq` right before the footer on every page they're tagged with, no block placement needed

`seed-all.ts` runs all 11 scripts above in this exact order, stopping at the
first failure (each script's exit code is checked before moving on). It only
spawns child processes — no Payload/`@/` imports of its own — so unlike the
scripts above, run it with plain `node`, not `payload run`:

```bash
node --experimental-strip-types scripts/seed-all.ts
```

`lexical-helpers.ts` is a shared helper (not runnable on its own) used by
`seed-about.ts`, `seed-legal-pages.ts`, and `seed-colocation.ts` to build
Payload's Lexical richText JSON (paragraphs/headings/lists/tables) by hand.

`process-mascot-image.mjs` is a one-off image utility (background removal +
resize) — not part of the seed flow, only needed if reprocessing that image.

## Live pricing (HostBill)

The VPS page's pricing cards (`src/blocks/vps-pricing-cards/`) are **fully
live** — HostBill is the only source of truth for which tariffs exist,
their name, price, and specs. Nothing about a tariff is authored in
Payload; adding, hiding, or editing a product in HostBill is the only way
to change what's shown here (constitution Principle VIII). The block itself
holds only two fields:

- **`hostbillCategoryId`** — HostBill's `getOrderPages` category `id` (e.g.
  `"1"` for "Linux VPS"). Picked from a live dropdown in the admin
  (`HostbillCategorySelect.tsx`), not free-typed.
- **`recommendedProductId`** — optional; highlights one card with a
  "Рекомендовано"/"Recommended"/"Zalecany" badge and an accent border, if
  that product is currently visible. Picked from a second dropdown
  (`RecommendedProductSelect.tsx`) that cascades off the category above.

Details:
- **Visibility**: only products HostBill marks visible show on the public
  page. HostBill's own `visible` *request* parameter on `getProducts` is a
  documented no-op against the real instance (confirmed: identical response
  with or without it) — filtering happens client-side in the adapter
  against each product's own `visible: "0"|"1"` field in the response (see
  `hostbill-product-catalog-provider.adapter.ts`).
- **Specs**: parsed live from HostBill's `description` field (format:
  `"CPU:1 Core<br>RAM:1 Gb<br>..."`, parsed by `parse-description.ts`,
  malformed segments skipped rather than thrown on — this format isn't
  schema-enforced in HostBill). Labels (`CPU`/`RAM`/`NVME`/`Internet`/
  `Traffic`/`Backup`) are translated via `src/i18n/messages/{ua,en,pl}.json`
  under `vpsPricingCards.specLabels`; an unrecognized label (typo or new
  field added in HostBill) is shown as-is rather than dropped or erroring.
  Values are never translated (locale-agnostic numbers/units).
- **Caching** (`get-live-products.ts`, all `unstable_cache`):
  - `getCachedVpsProducts()` — the public card list (visible only), 10-min window.
  - `getCachedProductsForAdmin()` — unfiltered product list for the
    recommended-product dropdown (an editor should see hidden products too
    when picking one), same 10-min window, same cache tag as the line above.
  - `getCachedCategories()` — the category dropdown, 30-min window (admin-only
    convenience; staleness here doesn't affect site visitors).
  If HostBill is unreachable, the section shows "Тарифи тимчасово
  недоступні" instead of failing the page.
- **Manual refresh** — two ways to force an immediate refresh instead of
  waiting out the cache window:
  - In the admin: the "Оновити ціни з HostBill зараз" button on the block
    (session-authenticated; refreshes both the pricing/products cache *and*
    the categories cache for that category in one click).
  - From outside the admin (e.g. scripted right after editing HostBill):
    ```bash
    curl -X POST "http://localhost:3000/api/revalidate-vps-pricing?secret=$REVALIDATE_SECRET&categoryId=1"
    ```
    `REVALIDATE_SECRET` is set in `.env` (see `.env.example`) — only needed
    for this external route, not for the in-admin button.
- Everything under `src/app`/`src/blocks` must go through
  `billing-adapter/ports` (e.g. `getProductCatalogProvider()` from
  `ports/product-catalog-provider.factory.ts`) — never import
  `billing-adapter/adapters/hostbill/**` directly; `eslint-plugin-boundaries`
  enforces this. The two admin-only endpoints backing the dropdowns
  (`GET /api/service-pages/hostbill-categories`,
  `GET /api/service-pages/hostbill-products?categoryId=`) live in
  `src/collections/ServicePages.ts` alongside the revalidate endpoint.

## Day-to-day

```bash
pnpm dev              # dev server, Turbopack, hot reload
pnpm lint             # eslint (includes eslint-plugin-boundaries)
pnpm typecheck        # tsc --noEmit
pnpm test             # vitest
pnpm build            # production build
```

All four of `lint`/`typecheck`/`test`/`build` must pass before pushing — CI
runs the same checks on every push to `main` (`.github/workflows/ci.yml`).

## Production deployment

Self-hosted on our own server (not a PaaS), no staging environment — only
local and production. Unlike local dev, **production Postgres is a native
install, not a Docker container** — Docker is dev-only (see Prerequisites
above). The app itself runs "bare" under a process manager, behind Nginx
as reverse proxy + TLS terminator. There's no `deploy.yml` GitHub Actions
workflow yet, so treat the steps below as a manual runbook.

### 1. Server prerequisites

- Ubuntu/Debian (or equivalent) with root/sudo access
- Node.js ≥ 20 (CI/dev use Node 24 — matching that avoids version drift)
- pnpm 11 (`corepack enable && corepack prepare pnpm@11 --activate`)
- PostgreSQL 16, installed natively (**not** Docker):
  ```bash
  sudo apt update
  sudo apt install -y postgresql-16
  sudo systemctl enable --now postgresql
  ```
- Nginx (`sudo apt install -y nginx`)
- Certbot for Let's Encrypt (`sudo apt install -y certbot python3-certbot-nginx`)
- Git

### 2. Create the database

```bash
sudo -u postgres psql <<'SQL'
CREATE USER astracloud WITH PASSWORD 'CHANGE_ME';
CREATE DATABASE astracloud OWNER astracloud;
SQL
```

Postgres listens on its default port `5432` here (the `5433` mapping in
`docker-compose.yml` only exists to dodge a port clash with another local
project's container — irrelevant on a dedicated server).

### 3. Clone and configure the app

```bash
git clone git@github.com:tarasgirnyk/astracloud.git
cd astracloud
cp .env.example .env
```

Fill in `.env` for production:
- `DATABASE_URL=postgres://astracloud:CHANGE_ME@localhost:5432/astracloud`
- `PAYLOAD_SECRET` — a fresh random string (**do not** reuse the local-dev
  one): `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- `AGENT_ADMIN_EMAIL` / `AGENT_ADMIN_PASSWORD` — real admin credentials for
  the first `/admin` login
- `HOSTBILL_API_URL`, `HOSTBILL_STOREFRONT_URL` (`https://cp.astra.in.ua/`,
  with the trailing slash), `HOSTBILL_PORTAL_READONLY_API_ID/KEY`,
  `HOSTBILL_WEBHOOK_SECRET` — real HostBill values, not placeholders
- `REVALIDATE_SECRET` — a fresh random string
- `GMAIL_SMTP_USER`, `GMAIL_SMTP_APP_PASSWORD`, `CONSULTATION_RECIPIENT_EMAIL`
  — see the comments in `.env.example` for how to generate the Gmail app
  password

### 4. Install, migrate, build

```bash
pnpm install --frozen-lockfile
pnpm payload migrate      # applies src/migrations/ against the live DB
pnpm build                # production build into .next/
```

If the database is fresh, run the seed scripts (see "Seed scripts" above)
after migrating.

### 5. Run as a service (systemd)

`next start` (not `next dev`) serves the production build; by default it
listens on port 3000. Run it under a systemd unit so it survives reboots
and restarts on crash:

`/etc/systemd/system/astracloud.service`:
```ini
[Unit]
Description=Astra Cloud (Next.js + Payload)
After=network.target postgresql.service

[Service]
Type=simple
User=astracloud
WorkingDirectory=/srv/astracloud
EnvironmentFile=/srv/astracloud/.env
Environment=NODE_ENV=production
Environment=PORT=3000
ExecStart=/usr/bin/pnpm start
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now astracloud
sudo systemctl status astracloud     # verify it's up on :3000
```

(Run the app as a dedicated non-root `astracloud` user, not root —
`sudo useradd -r -s /bin/false astracloud` and `chown` the deploy
directory to it before enabling the unit.)

### 6. Nginx reverse proxy + TLS

`/etc/nginx/sites-available/astracloud`:
```nginx
server {
    listen 80;
    server_name astra.in.ua www.astra.in.ua;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Next.js static assets are content-hashed — cache them hard.
    location /_next/static/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/astracloud /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
sudo certbot --nginx -d astra.in.ua -d www.astra.in.ua   # provisions TLS,
                                                            # rewrites the
                                                            # server block
                                                            # to redirect
                                                            # :80 → :443
```

Swap `astra.in.ua` / `www.astra.in.ua` for the real production hostname(s)
before running this.

### 7. Deploying an update

Always migrate **before** restarting the process, never restart first:

```bash
cd /srv/astracloud
git pull
pnpm install --frozen-lockfile
pnpm payload migrate
pnpm build
sudo systemctl restart astracloud
```

`docs/GRILL_NOTES.md` has the original deployment strategy discussion
(point 12) if you're picking up CI/CD automation (`deploy.yml`) next.
