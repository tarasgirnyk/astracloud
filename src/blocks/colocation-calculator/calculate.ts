export interface CalculatorOption {
  value: number
  monthlyPrice: number
}

export interface PowerOption {
  value: number
}

export interface CalculatorSelection {
  units: number
  monthlyPricePerUnit: number
  installationPrice: number
  electricityPricePerKwh: number
  hoursPerDay: number
  daysPerMonth: number
  electricityFormula?: string
  power: PowerOption
  ip: CalculatorOption
  speed: CalculatorOption
}

function round(value: number, precision: number) {
  const factor = 10 ** precision
  return Math.round((value + Number.EPSILON) * factor) / factor
}

export function calculateColocationPrice(selection: CalculatorSelection) {
  const rackUnits = round(selection.units * selection.monthlyPricePerUnit, 2)
  const electricity = round(
    evaluateElectricityFormula(selection.electricityFormula ?? DEFAULT_ELECTRICITY_FORMULA, {
      powerW: selection.power.value,
      hoursPerDay: selection.hoursPerDay,
      daysPerMonth: selection.daysPerMonth,
      pricePerKwh: selection.electricityPricePerKwh,
    }),
    2,
  )
  const monthly = round(
    rackUnits + electricity + selection.ip.monthlyPrice + selection.speed.monthlyPrice,
    2,
  )

  return {
    monthly,
    setup: selection.installationPrice,
    breakdown: {
      rackUnits,
      electricity,
      ip: selection.ip.monthlyPrice,
      speed: selection.speed.monthlyPrice,
    },
  }
}
import { DEFAULT_ELECTRICITY_FORMULA, evaluateElectricityFormula } from './formula'
