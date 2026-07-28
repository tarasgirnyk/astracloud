import { describe, expect, it } from 'vitest'
import { redirectMap } from './redirect-map'

// The old-site URL list this coverage test guards against was captured live
// from https://cloud.astra.in.ua/page-sitemap.xml (11 UA URLs, each with a
// trailing slash on the old site) plus their confirmed /en/<same-slug>/
// variants (Edge Case: every old URL must be mapped) — see
// contracts/seo-metadata-contracts.md. Listed here WITHOUT trailing slashes
// since Next.js strips them (its own internal `/:path+/` -> `/:path+`
// redirect runs before any custom redirect is checked — confirmed live via
// .next/routes-manifest.json during implementation).
// Excludes '/', '/sla', and '/vps' deliberately: for these three, the old
// and new paths are identical once normalized (the old site's slug already
// matches the new site's), so there is nothing to redirect (Next.js
// rejects a same-source/destination entry) — see the dedicated test below.
const OLD_UA_PATHS = [
  '/pro-nas-2',
  '/r-policy',
  '/pp',
  '/kolokacziya',
  '/tos',
  '/vydilenyj-server',
  '/dokumenty',
  '/l-section',
]

const NEW_ROUTES = new Set([
  '/',
  '/about',
  '/refund-policy',
  '/sla',
  '/privacy',
  '/colocation',
  '/terms',
  '/dedicated',
  '/documents',
  '/legal',
  '/vps',
])

describe('redirectMap: coverage against every known old-site URL', () => {
  it('maps every old UA path exactly once', () => {
    for (const oldPath of OLD_UA_PATHS) {
      const matches = redirectMap.filter((entry) => entry.source === oldPath)
      expect(matches, `expected exactly one redirect for ${oldPath}`).toHaveLength(1)
    }
  })

  it('maps every old EN path (/en/<same-slug>) exactly once', () => {
    for (const oldPath of OLD_UA_PATHS) {
      const enPath = `/en${oldPath}`
      const matches = redirectMap.filter((entry) => entry.source === enPath)
      expect(matches, `expected exactly one redirect for ${enPath}`).toHaveLength(1)
    }
  })

  it('has no entry for paths already identical once normalized (homepage, /sla, /vps, both locales)', () => {
    for (const noOpPath of ['/', '/en', '/sla', '/en/sla', '/vps', '/en/vps']) {
      expect(redirectMap.some((entry) => entry.source === noOpPath), `unexpected entry for ${noOpPath}`).toBe(false)
    }
  })

  it('every destination resolves to a real app route', () => {
    for (const entry of redirectMap) {
      const withoutLocalePrefix = entry.destination.replace(/^\/(en|pl)(\/|$)/, '/')
      expect(NEW_ROUTES.has(withoutLocalePrefix), `unexpected destination: ${entry.destination}`).toBe(true)
    }
  })

  it('no source carries a trailing slash (Next.js strips it before matching — see redirect-map.ts)', () => {
    for (const entry of redirectMap) {
      expect(entry.source.endsWith('/'), `source should not end with '/': ${entry.source}`).toBe(false)
    }
  })

  it('every entry is a permanent (301) redirect', () => {
    for (const entry of redirectMap) {
      expect(entry.permanent).toBe(true)
    }
  })

  it('has no duplicate source entries', () => {
    const sources = redirectMap.map((entry) => entry.source)
    expect(new Set(sources).size).toBe(sources.length)
  })

  it('no entry redirects a path to itself', () => {
    for (const entry of redirectMap) {
      expect(entry.source).not.toBe(entry.destination)
    }
  })
})
