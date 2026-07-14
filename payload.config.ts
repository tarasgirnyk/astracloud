import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'

import { Users } from '@/collections/Users'
import { Pages } from '@/collections/Pages'
import { ServicePages } from '@/collections/ServicePages'
import { SiteChrome } from '@/globals/SiteChrome'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET ?? '',
  admin: {
    user: Users.slug,
  },
  editor: lexicalEditor(),
  collections: [Users, Pages, ServicePages],
  globals: [SiteChrome],
  // All content collections (Pages, ServicePages) and SiteChrome use
  // Payload's native field localization (`localized: true` per field) — one
  // document per slug, not one document per locale.
  localization: {
    locales: ['ua', 'en', 'pl'],
    defaultLocale: 'ua',
    // `fallback` defaults to true: a localized field with no EN/PL value yet
    // falls back to the `defaultLocale` (ua) value instead of rendering
    // empty — relied on deliberately since `publicationStatus` is shared
    // across all locales (one document, not one per locale).
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
    // Migrations are the only source of schema truth, locally and in
    // production alike (research.md §8) — no dev-mode auto-push, so there's
    // no drift between "how it was built" and "how it deploys".
    push: false,
  }),
  // Payload's own migration CLI reads/writes here — the client_identity_map
  // table is added as a hand-written migration alongside Payload's own
  // generated ones (research.md §8).
  typescript: {
    outputFile: path.resolve(dirname, 'src/payload-types.ts'),
  },
})
