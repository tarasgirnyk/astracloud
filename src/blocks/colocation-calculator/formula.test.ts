import { describe, expect, it } from 'vitest'
import {
  DEFAULT_ELECTRICITY_FORMULA,
  evaluateElectricityFormula,
  validateElectricityFormula,
} from './formula'

const variables = { powerW: 200, hoursPerDay: 24, daysPerMonth: 30, pricePerKwh: 18.7 }

describe('electricity formula', () => {
  it('calculates the default monthly electricity price', () => {
    expect(evaluateElectricityFormula(DEFAULT_ELECTRICITY_FORMULA, variables)).toBeCloseTo(1897.2)
  })

  it('supports parentheses and operator precedence', () => {
    expect(evaluateElectricityFormula('(powerW / 1000) * (hoursPerDay + 1)', variables)).toBe(5)
  })

  it('rejects unknown variables and unsafe syntax', () => {
    expect(validateElectricityFormula('process.exit()')).toBe('Невідома змінна: process')
    expect(validateElectricityFormula('powerW ** 2')).not.toBe(true)
  })
})
