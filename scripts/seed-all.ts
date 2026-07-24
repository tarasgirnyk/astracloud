/**
 * Runs every seed script in this folder, in the dependency order documented
 * in README.md's "Seed scripts" section — content/service pages first, then
 * the home page + nav, then the FAQ page/nav, then FAQ item content last
 * (seed-faq-items.ts looks up pages by slug and fails if they don't exist
 * yet). Stops at the first failure rather than continuing past a broken
 * dependency.
 *
 * Each seed script is idempotent (see README), so re-running this after the
 * database already has content is safe — it just upserts.
 *
 * This script only spawns child processes (no Payload/`@/` imports of its
 * own), so it can run directly with plain node:
 *
 *   node --experimental-strip-types scripts/seed-all.ts
 *
 * Each child invocation still goes through `pnpm payload run`, same as
 * running a single seed script by hand — see README.md's "Seed scripts".
 */
import { spawnSync } from 'node:child_process'

const SEED_ORDER = [
  'seed-about.ts',
  'seed-legal-pages.ts',
  'seed-documents.ts',
  'seed-vps.ts',
  'seed-dedicated.ts',
  'seed-colocation.ts',
  'seed-partnerka.ts',
  'seed-homepage.ts',
  'seed-faq-page.ts',
  'seed-faq-nav.ts',
  'seed-faq-items.ts',
]

for (const file of SEED_ORDER) {
  console.log(`\n=== ${file} ===`)
  const result = spawnSync(`pnpm payload run scripts/${file}`, {
    stdio: 'inherit',
    shell: true,
  })

  if (result.status !== 0) {
    console.error(`\n✘ ${file} failed (exit code ${result.status ?? 'unknown'}) — stopping.`)
    process.exit(result.status ?? 1)
  }
}

console.log('\n✔ All seed scripts completed.')
