import { describe, expect, it } from 'vitest'
import { calculateColocationPrice } from './calculate'

describe('calculateColocationPrice', () => {
  it('adds per-unit, power, IP and connection charges', () => {
    expect(
      calculateColocationPrice({
        units: 2,
        monthlyPricePerUnit: 1000,
        installationPrice: 1000,
        electricityPricePerKwh: 18.7,
        hoursPerDay: 24,
        daysPerMonth: 30,
        power: { value: 200 },
        ip: { value: 5, monthlyPrice: 300 },
        speed: { value: 1000, monthlyPrice: 500 },
      }),
    ).toEqual({
      monthly: 4697.2,
      setup: 1000,
      breakdown: {
        rackUnits: 2000,
        electricity: 1897.2,
        ip: 300,
        speed: 500,
      },
    })
  })

  it('recalculates electricity from watts and editable tariff settings', () => {
    const result = calculateColocationPrice({
      units: 1,
      monthlyPricePerUnit: 1000,
      installationPrice: 1000,
      electricityPricePerKwh: 10,
      hoursPerDay: 12,
      daysPerMonth: 30,
      electricityFormula: 'powerW / 1000 * hoursPerDay * daysPerMonth * pricePerKwh',
      power: { value: 100 },
      ip: { value: 1, monthlyPrice: 0 },
      speed: { value: 100, monthlyPrice: 0 },
    })

    expect(result.monthly).toBe(1360)
    expect(result.breakdown.electricity).toBe(360)
  })
})
