import { describe, expect, it } from 'vitest'
import { buildFallbackTitle, buildFallbackDescription } from './fallback'

describe('SEO metadata fallback (used when meta.title/meta.description are blank)', () => {
  it('builds a page-specific title from the page heading, never a bare generic string', () => {
    const title = buildFallbackTitle('VPS-сервери для швидких і стабільних проєктів')
    expect(title).toContain('VPS-сервери для швидких і стабільних проєктів')
    expect(title).toContain('Astra Cloud')
  })

  it('produces distinct titles for distinct headings (no sitewide duplicate)', () => {
    const vpsTitle = buildFallbackTitle('VPS-сервери для швидких і стабільних проєктів')
    const aboutTitle = buildFallbackTitle('Про нас')
    expect(vpsTitle).not.toBe(aboutTitle)
  })

  it('never returns an empty title, even for a blank heading', () => {
    expect(buildFallbackTitle('')).toBe('Astra Cloud')
    expect(buildFallbackTitle('   ')).toBe('Astra Cloud')
  })

  it('builds a non-empty, page-specific description', () => {
    const description = buildFallbackDescription('VPS-сервери для швидких і стабільних проєктів')
    expect(description.length).toBeGreaterThan(0)
    expect(description).toContain('VPS-сервери для швидких і стабільних проєктів')
  })

  it('never returns an empty description, even for a blank heading', () => {
    expect(buildFallbackDescription('')).toBe('Astra Cloud')
  })
})
