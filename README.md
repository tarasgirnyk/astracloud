# Astra Cloud

Next.js + embedded Payload CMS site for Astra Cloud (VPS/dedicated/colocation
hosting), trilingual (UA default, EN, PL). See `docs/GRILL_NOTES.md` and
`specs/001-project-foundation/` for the original architecture decisions.

## Prerequisites

- Node.js ≥ 20
- pnpm (`npm install -g pnpm` if missing)
- Docker Desktop (running)
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
- `HOSTBILL_*` — only needed for `pnpm billing:check`; leave blank otherwise

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
`slug` + `locale`, safe to re-run after editing. Run with:

```bash
pnpm payload run scripts/<file>.ts
```

(Not `node scripts/...` — `payload run` is what resolves the `@/` path
aliases and loads `.env`; a plain `node` invocation will fail on both.)

Recommended order on a fresh database (content pages first, so the
homepage's nav/footer links resolve to real pages — though nothing will
actually break if you run them in a different order, since links are plain
`href` strings, not enforced relations):

1. `seed-about.ts` — "Про нас" (`/about`)
2. `seed-legal-pages.ts` — Terms, Privacy, Refund Policy, SLA, Legal Section (`/terms`, `/privacy`, `/refund-policy`, `/sla`, `/legal`)
3. `seed-documents.ts` — "Документи" (`/documents`)
4. `seed-vps.ts` — VPS product page (`/vps`)
5. `seed-colocation.ts` — Colocation product page (`/colocation`)
6. `seed-homepage.ts` — home page + `site-chrome` global (nav/footer/logo links to all of the above)

`lexical-helpers.ts` is a shared helper (not runnable on its own) used by
`seed-about.ts`, `seed-legal-pages.ts`, and `seed-colocation.ts` to build
Payload's Lexical richText JSON (paragraphs/headings/lists/tables) by hand.

`process-mascot-image.mjs` is a one-off image utility (background removal +
resize) — not part of the seed flow, only needed if reprocessing that image.

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

## Deploy note

No production deploy target is configured yet — this repo has only been
run locally so far. `docs/GRILL_NOTES.md` has the original deployment
strategy discussion if you're picking that up next.
