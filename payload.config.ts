import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'

import { Users } from '@/collections/Users'
import { Pages } from '@/collections/Pages'
import { SiteChrome } from '@/globals/SiteChrome'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET ?? '',
  admin: {
    user: Users.slug,
  },
  editor: lexicalEditor(),
  collections: [Users, Pages],
  globals: [SiteChrome],
  // Site-wide chrome (SiteChrome global) is localized via Payload's native
  // field localization — distinct from Pages, which model locale as
  // separate documents (research.md §2: the two mechanisms are meant to be
  // used together, not as alternatives to each other).
  localization: {
    locales: ['ua', 'en', 'pl'],
    defaultLocale: 'ua',
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
