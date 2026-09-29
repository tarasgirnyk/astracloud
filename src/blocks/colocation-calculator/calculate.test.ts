import { describe, expect, it } from 'vitest'
import { calculateColocationPrice } from './calculate'

describe('calculateColocationPrice', () => {
  it('adds per-unit, power, IP and connection charges', () => {
    expect(
      calculateColocationPrice({
        units: 2,
        monthlyPricePerUnit: 500,
        installationPrice: 1000,
        power: { value: 200, monthlyPrice: 2692.8 },
        ip: { value: 5, monthlyPrice: 300 },
        speed: { value: 1000, monthlyPrice: 500 },
      }),
    ).toEqual({ monthly: 4492.8, setup: 1000 })
  })
})
