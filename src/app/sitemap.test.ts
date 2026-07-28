import { describe, expect, it } from 'vitest'
import { buildSitemapEntries } from './sitemap'

describe('buildSitemapEntries', () => {
  const docs = [
    { slug: 'home', updatedAt: '2026-07-20T10:00:00.000Z' },
    { slug: 'vps', updatedAt: '2026-07-22T12:00:00.000Z' },
  ]

  it('emits one entry per locale (ua/en/pl) for every published document', () => {
    const entries = buildSitemapEntries(docs)
    expect(entries).toHaveLength(docs.length * 3)
  })

  it('resolves the "home" slug to the root path, unprefixed for ua', () => {
    const entries = buildSitemapEntries(docs)
    expect(entries.some((e) => e.url === 'http://localhost:3000/')).toBe(true)
    expect(entries.some((e) => e.url === 'http://localhost:3000/en')).toBe(true)
    expect(entries.some((e) => e.url === 'http://localhost:3000/pl')).toBe(true)
  })

  it('resolves a regular slug under each locale prefix', () => {
    const entries = buildSitemapEntries(docs)
    expect(entries.some((e) => e.url === 'http://localhost:3000/vps')).toBe(true)
    expect(entries.some((e) => e.url === 'http://localhost:3000/en/vps')).toBe(true)
    expect(entries.some((e) => e.url === 'http://localhost:3000/pl/vps')).toBe(true)
  })

  it("uses the document's own updatedAt as lastModified for every locale entry", () => {
    const entries = buildSitemapEntries(docs)
    const vpsEntries = entries.filter((e) => e.url.includes('/vps'))
    for (const entry of vpsEntries) {
      expect(entry.lastModified).toEqual(new Date('2026-07-22T12:00:00.000Z'))
    }
  })

  it('returns an empty sitemap when there are no published documents', () => {
    expect(buildSitemapEntries([])).toEqual([])
  })
})
