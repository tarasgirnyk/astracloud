import { describe, expect, it } from 'vitest'
import { validateCtaHref } from './config'

describe('Hero block: ctaHref validation', () => {
  it('passes when there is no CTA label at all', () => {
    expect(validateCtaHref(undefined, {})).toBe(true)
  })

  it('passes when both ctaLabel and ctaHref are set', () => {
    expect(validateCtaHref('/vps', { ctaLabel: 'Обрати послугу' })).toBe(true)
  })

  it('fails when ctaLabel is set but ctaHref is missing', () => {
    expect(validateCtaHref(undefined, { ctaLabel: 'Обрати послугу' })).not.toBe(true)
  })

  it('fails when ctaLabel is set but ctaHref is an empty string', () => {
    expect(validateCtaHref('', { ctaLabel: 'Обрати послугу' })).not.toBe(true)
  })

  it('passes when ctaHref is set without a ctaLabel (label optional)', () => {
    expect(validateCtaHref('/vps', {})).toBe(true)
  })
})
