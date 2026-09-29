export interface CalculatorOption {
  value: number
  monthlyPrice: number
}

export interface CalculatorSelection {
  units: number
  monthlyPricePerUnit: number
  installationPrice: number
  power: CalculatorOption
  ip: CalculatorOption
  speed: CalculatorOption
}

export function calculateColocationPrice(selection: CalculatorSelection) {
  return {
    monthly:
      selection.units * selection.monthlyPricePerUnit +
      selection.power.monthlyPrice +
      selection.ip.monthlyPrice +
      selection.speed.monthlyPrice,
    setup: selection.installationPrice,
  }
}
